'use client';
import { useQueryClient } from '@tanstack/react-query';
import { Mic, Paperclip, Send, Square } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Simplified props interface
interface ChatPanelProps {
  onSubmit: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  placeholder?: string;
  initialValue?: string;
}

export function ChatPanel({
  onSubmit,
  isLoading,
  disabled = false,
  placeholder = 'Ask anything or @mention a Space',
  initialValue = '',
}: ChatPanelProps) {
  const [input, setInput] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !isLoading && !disabled) {
      onSubmit(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const canSubmit = input.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="mx-auto w-full max-w-4xl p-4">
      <div className="relative">
        <div className="relative flex items-end rounded-xl border border-gray-200 bg-white shadow-sm transition-colors focus-within:border-blue-500">
          {/* Left icons */}
          <div className="flex items-center gap-2 pb-3 pl-4">
            <button
              type="button"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Search">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Focus">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
            <button
              type="button"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Attach">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled || isLoading}
            className="max-h-[120px] min-h-[44px] flex-1 resize-none border-0 bg-transparent px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none"
            rows={1}
          />

          {/* Right icons */}
          <div className="flex items-center gap-2 pr-4 pb-3">
            <button
              type="button"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Attach file">
              <Paperclip className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              title="Voice input">
              <Mic className="h-4 w-4" />
            </button>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={`rounded-lg p-2 transition-all ${
                canSubmit
                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                  : 'cursor-not-allowed bg-gray-100 text-gray-400'
              }`}
              title={isLoading ? 'Stop' : 'Send'}>
              {isLoading ? <Square className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
