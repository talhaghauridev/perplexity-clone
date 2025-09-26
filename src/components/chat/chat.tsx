'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface Model {
  id: string;
  name: string;
  description: string;
}

interface ChatProps {
  id: string;
  savedMessages?: Message[];
  query?: string;
  models?: Model[];
  status?: string;
  stop?: () => void;
  append?: (message: Omit<Message, 'id' | 'timestamp'>) => void;
}

export function Chat({
  id,
  savedMessages = [],
  query = '',
  models = [],
  status = 'idle',
  stop = () => {},
  append = () => {},
}: ChatProps) {
  // State for input field
  const [input, setInput] = useState<string>('');

  // State for messages
  const [messages, setMessages] = useState<Message[]>(savedMessages);

  // State for scroll position
  const [isAtBottom, setIsAtBottom] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Loading state
  const isLoading = useMemo(() => status === 'submitted' || status === 'streaming', [status]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date(),
    };

    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Call the append function if provided
    append({
      content: input,
      role: 'user',
    });

    try {
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a response
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `This is a response to: ${input}`,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const threshold = 50; // threshold in pixels
      setIsAtBottom(scrollHeight - scrollTop - clientHeight < threshold);
    };

    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to bottom when new messages arrive and user is at bottom
  useEffect(() => {
    if (isAtBottom && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  return (
    <div
      className={cn('relative flex h-full min-w-0 flex-1 flex-col')}
      data-testid="full-chat">
      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        stop={stop}
        query={query}
        append={append}
        models={models}
        showScrollToBottomButton={!isAtBottom}
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
}

// ChatPanel component implementation

function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  stop,
  query = '',
  append = () => {},
  models = [],
  showScrollToBottomButton,
  scrollContainerRef,
}: {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  stop: () => void;
  query: string;
  append: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  models: Model[];
  showScrollToBottomButton: boolean;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollContainerRef}
        className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-3/4 rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
              }`}>
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              <div className="flex space-x-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0.2s' }}></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4 dark:border-gray-700">
        <form
          onSubmit={handleSubmit}
          className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Type a message..."
            className="flex-1 rounded-lg border p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50">
            Send
          </button>
          {isLoading && (
            <button
              type="button"
              onClick={stop}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none">
              Stop
            </button>
          )}
        </form>
      </div>

      {showScrollToBottomButton && (
        <button
          onClick={() => {
            if (scrollContainerRef.current) {
              scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
            }
          }}
          className="fixed right-8 bottom-24 rounded-full bg-blue-500 p-2 text-white shadow-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none">
          ↓ Scroll to bottom
        </button>
      )}
    </div>
  );
}
