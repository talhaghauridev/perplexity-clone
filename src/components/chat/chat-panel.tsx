'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Textarea from 'react-textarea-autosize';

import { ArrowUp, ChevronDown, MessageCirclePlus, Square } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ModelSelector } from '../shared/model-selector';
import { SearchModeToggle } from '../shared/search-mode-toggle';
import { EmptyScreen } from '../shared/empty-screen';

interface ChatPanelProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  messages: any[];
  setMessages: (messages: any[]) => void;
  query?: string;
  stop: () => void;
  append: (message: any) => void;
  /** Whether to show the scroll to bottom button */
  showScrollToBottomButton: boolean;
  /** Reference to the scroll container */
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  append,
  showScrollToBottomButton,
  scrollContainerRef,
}: ChatPanelProps) {
  const [showEmptyScreen, setShowEmptyScreen] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isFirstRender = useRef(true);
  const [isComposing, setIsComposing] = useState(false); // Composition state
  const [enterDisabled, setEnterDisabled] = useState(false); // Disable Enter after composition ends

  const handleCompositionStart = () => setIsComposing(true);

  const handleCompositionEnd = () => {
    setIsComposing(false);
    setEnterDisabled(true);
    setTimeout(() => {
      setEnterDisabled(false);
    }, 300);
  };

  const handleNewChat = () => {
    setMessages([]);
    router.push('/');
  };

  const isToolInvocationInProgress = () => {
    if (!messages.length) return false;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== 'assistant' || !lastMessage.parts) return false;

    const parts = lastMessage.parts;
    const lastPart = parts[parts.length - 1];

    return lastPart?.type === 'tool-invocation' && lastPart?.toolInvocation?.state === 'call';
  };

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      append({
        role: 'user',
        content: query,
      });
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Scroll to the bottom of the container
  const handleScrollToBottom = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      className={cn(
        'bg-background group/form-container w-full shrink-0',
        messages.length > 0 ? 'sticky bottom-0 px-2 pb-4' : 'px-6'
      )}>
      {messages.length === 0 && (
        <div className="mb-10 flex flex-col items-center gap-4">
          <p className="text-center text-3xl font-semibold">How can I help you today?</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={cn('relative mx-auto w-full max-w-3xl')}>
        {/* Scroll to bottom button - only shown when showScrollToBottomButton is true */}
        {showScrollToBottomButton && messages.length > 0 && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="absolute -top-10 right-4 z-20 size-8 rounded-full shadow-md"
            onClick={handleScrollToBottom}
            title="Scroll to bottom">
            <ChevronDown size={16} />
          </Button>
        )}

        <div className="bg-muted border-input relative flex w-full flex-col gap-2 rounded-3xl border">
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            onCompositionStart={handleCompositionStart}
            onCompositionEnd={handleCompositionEnd}
            placeholder="Ask a question..."
            spellCheck={true}
            value={input}
            disabled={isLoading || isToolInvocationInProgress()}
            className="placeholder:text-muted-foreground min-h-12 w-full resize-none border-0 bg-transparent p-4 text-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={e => {
              handleInputChange(e);
              setShowEmptyScreen(e.target.value.length === 0);
            }}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey && !isComposing && !enterDisabled) {
                if (input.trim().length === 0) {
                  e.preventDefault();
                  return;
                }
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                textarea.form?.requestSubmit();
              }
            }}
            onFocus={() => setShowEmptyScreen(true)}
            onBlur={() => setShowEmptyScreen(false)}
          />

          {/* Bottom menu area */}
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              {/* <ModelSelector models={models || []} /> */}
              <SearchModeToggle />
            </div>
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNewChat}
                  className="group shrink-0 rounded-full"
                  type="button"
                  disabled={isLoading || isToolInvocationInProgress()}>
                  <MessageCirclePlus className="size-4 transition-all group-hover:rotate-12" />
                </Button>
              )}
              <Button
                type={isLoading ? 'button' : 'submit'}
                size={'icon'}
                variant={'outline'}
                className={cn(isLoading && 'animate-pulse', 'rounded-full')}
                disabled={(input.length === 0 && !isLoading) || isToolInvocationInProgress()}
                onClick={isLoading ? stop : undefined}>
                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
              </Button>
            </div>
          </div>
        </div>

        {messages.length === 0 && (
          <EmptyScreen
            submitMessage={message => {
              handleInputChange({
                target: { value: message },
              } as React.ChangeEvent<HTMLTextAreaElement>);
            }}
            className={cn(showEmptyScreen ? 'visible' : 'invisible')}
          />
        )}
      </form>
    </div>
  );
}
