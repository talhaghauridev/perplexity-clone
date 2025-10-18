import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UseChatOptions {
  id?: string | null;
  initialMessages?: Message[];
  onFinish?: (message: Message) => void;
  onError?: (error: Error) => void;
  onData?: (chunk: string) => void;
  onChatIdReceived?: (chatId: string) => void;
  body?: Record<string, any>;
  api?: string;
}

type ChatStatus = 'ready' | 'submitted' | 'streaming' | 'error';

function useChat(options: UseChatOptions = {}) {
  const {
    id: initialId = null,
    initialMessages = [],
    onFinish,
    onError,
    onData,
    onChatIdReceived,
    body = {},
    api = '/api/chat',
  } = options;

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [chatId, setChatId] = useState<string | null>(initialId);
  const [status, setStatus] = useState<ChatStatus>('ready');
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const isLoading = useMemo(() => status === 'submitted' || status === 'streaming', [status]);

  const createMessage = useCallback(
    (role: 'user' | 'assistant', content: string = ''): Message => ({
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: new Date(),
    }),
    []
  );

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      if (!content.trim() || isLoading) return;

      const userMessage = createMessage('user', content.trim());

      setMessages(prev => [...prev, userMessage]);

      setStatus('submitted');
      setError(null);

      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const assistantMessage = createMessage('assistant');
      setMessages(prev => [...prev, assistantMessage]);

      try {
        const response = await fetch(api, {
          method: 'POST',
          body: JSON.stringify({
            chat_id: chatId || null,
            messages: [...messages, userMessage].map(({ id, timestamp, ...msg }) => msg),
            ...body,
          }),
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        if (!response.body) {
          throw new Error('No response body');
        }

        setStatus('streaming');

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedContent = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.trim() === '') continue;

            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              if (data === '[DONE]') {
                setMessages(prev =>
                  prev.map(msg =>
                    msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg
                  )
                );

                if (onFinish) {
                  onFinish({ ...assistantMessage, content: accumulatedContent });
                }
                setStatus('ready');
                abortControllerRef.current = null;
                return;
              }

              try {
                const parsed = JSON.parse(data);

                if (parsed.chat_id && !chatId) {
                  const newChatId = parsed.chat_id;
                  setChatId(newChatId);

                  if (onChatIdReceived) {
                    onChatIdReceived(newChatId);
                  }

                  console.log(`✅ New chat created with ID: ${newChatId}`);
                }

                const contentDelta =
                  parsed.choices?.[0]?.delta?.content ||
                  parsed.content ||
                  parsed.delta?.content ||
                  '';

                if (contentDelta) {
                  accumulatedContent += contentDelta;

                  setMessages(prev =>
                    prev.map(msg =>
                      msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg
                    )
                  );

                  if (onData) {
                    onData(contentDelta);
                  }
                }
              } catch (parseError) {
                console.warn('Failed to parse streaming chunk:', parseError);
              }
            }
          }
        }

        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantMessage.id ? { ...msg, content: accumulatedContent } : msg
          )
        );

        if (onFinish) {
          onFinish({ ...assistantMessage, content: accumulatedContent });
        }

        setStatus('ready');
        abortControllerRef.current = null;
      } catch (err) {
        const error = err as Error;

        if (error.name === 'AbortError') {
          setStatus('ready');
        } else {
          setError(error);
          setStatus('error');
          if (onError) {
            onError(error);
          }
        }

        abortControllerRef.current = null;
      }
    },
    [
      isLoading,
      createMessage,
      messages,
      chatId,
      api,
      body,
      onFinish,
      onData,
      onError,
      onChatIdReceived,
    ]
  );

  const stop = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const clear = useCallback((): void => {
    stop();
    setMessages([]);
    setError(null);
    setStatus('ready');
  }, [stop]);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages,
    status,
    isLoading,
    error,
    chatId,
    sendMessage,
    stop,
    clear,
  };
}

export { useChat };
