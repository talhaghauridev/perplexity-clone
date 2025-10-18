'use client';
import React, { useState } from 'react';
import { Send, Square, Trash2, RefreshCw, MessageCircle } from 'lucide-react';
import { useChat } from '@/hooks/chat/useChat';

// Your useChat hook (paste your exact code here)

// Test component for your useChat hook
function ChatTester() {
  const [input, setInput] = useState('');
  const [testMessages] = useState([
    'Hello! How are you?',
    'Tell me about React hooks',
    "What's the weather like?",
    'Help me with programming',
    'Explain APIs to me',
    'What is JavaScript?',
  ]);

  const { messages, status, isLoading, error, chatId, sendMessage, stop, clear } = useChat({
    id: null, // Start with new chat
    api: '/api/chat',
    onChatIdReceived: newChatId => {
      console.log('🆕 New chat created with ID:', newChatId);
    },
    onData: chunk => {
      console.log('📡 Streaming chunk:', chunk);
    },
    onFinish: message => {
      console.log('✅ Message completed:', message.content.slice(0, 50) + '...');
    },
    onError: error => {
      console.error('❌ Chat error:', error);
    },
  });

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage(input.trim());
      setInput('');
    }
  };

  const handleTestMessage = (testMsg: string) => {
    if (!isLoading) {
      sendMessage(testMsg);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">useChat Hook Tester</h1>
        <p className="text-gray-600">Testing streaming chat with Next.js App Router API</p>
      </div>

      {/* Status Panel */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <h3 className="mb-3 font-semibold">Chat Status</h3>
        <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
          <div>
            <span className="text-gray-500">Chat ID:</span>
            <div className="font-mono text-xs">
              {chatId ? `${chatId.slice(0, 20)}...` : 'Not created yet'}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Status:</span>
            <div
              className={`font-medium ${
                status === 'streaming'
                  ? 'text-blue-600'
                  : status === 'error'
                    ? 'text-red-600'
                    : status === 'submitted'
                      ? 'text-yellow-600'
                      : 'text-green-600'
              }`}>
              {status}
            </div>
          </div>
          <div>
            <span className="text-gray-500">Messages:</span>
            <div className="font-medium">{messages.length}</div>
          </div>
          <div>
            <span className="text-gray-500">Loading:</span>
            <div className={`font-medium ${isLoading ? 'text-blue-600' : 'text-gray-600'}`}>
              {isLoading ? 'Yes' : 'No'}
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <h3 className="mb-2 font-semibold text-red-800">Error</h3>
          <p className="text-sm text-red-700">{error.message}</p>
        </div>
      )}

      {/* Quick Test Buttons */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Quick Test Messages</h3>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {testMessages.map((msg, index) => (
            <button
              key={index}
              onClick={() => handleTestMessage(msg)}
              disabled={isLoading}
              className="rounded border border-gray-300 bg-white p-2 text-left text-sm transition-colors hover:border-blue-500 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50">
              {msg}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-semibold">
              <MessageCircle className="h-4 w-4" />
              Chat Messages
            </h3>
            <div className="flex gap-2">
              {isLoading && (
                <button
                  onClick={stop}
                  className="flex items-center gap-1 rounded bg-red-600 px-3 py-1 text-sm text-white transition-colors hover:bg-red-700">
                  <Square className="h-3 w-3" />
                  Stop
                </button>
              )}
              <button
                onClick={clear}
                disabled={isLoading}
                className="flex items-center gap-1 rounded bg-gray-600 px-3 py-1 text-sm text-white transition-colors hover:bg-gray-700 disabled:opacity-50">
                <Trash2 className="h-3 w-3" />
                Clear
              </button>
            </div>
          </div>
        </div>

        <div className="max-h-96 space-y-4 overflow-y-auto p-4">
          {messages.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              <MessageCircle className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>No messages yet. Send a message to start testing!</p>
            </div>
          ) : (
            messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                    message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                  }`}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-medium opacity-75">
                      {message.role === 'user' ? 'You' : 'Assistant'}
                    </span>
                    <span className="text-xs opacity-50">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">
                    {message.content}
                    {isLoading &&
                      message === messages[messages.length - 1] &&
                      message.role === 'assistant' && (
                        <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-current opacity-75" />
                      )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            disabled={isLoading}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50">
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold text-blue-800">Testing Instructions</h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p>
            <strong>1. Quick Test:</strong> Click any of the quick test buttons above
          </p>
          <p>
            <strong>2. Custom Message:</strong> Type your own message in the input field
          </p>
          <p>
            <strong>3. Watch the Stream:</strong> See how messages appear character by character
          </p>
          <p>
            <strong>4. Test Controls:</strong> Try stopping mid-stream or clearing the chat
          </p>
          <p>
            <strong>5. Check Console:</strong> Open DevTools to see detailed logging
          </p>
        </div>
      </div>

      {/* API Info */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">API Details</h3>
        <div className="space-y-1 font-mono text-sm">
          <div>
            <strong>Endpoint:</strong> POST /api/chat
          </div>
          <div>
            <strong>Format:</strong> Server-Sent Events (text/event-stream)
          </div>
          <div>
            <strong>Features:</strong> Chat ID generation, contextual responses, streaming
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatTester;

/*
🚀 Setup Instructions:

1. Create the API route:
   - Save the API code to: app/api/chat/route.ts

2. Create this test component:
   - Save this to: app/page.tsx (or any page component)

3. Import your useChat hook:
   - Make sure the import path is correct

4. Run your Next.js app:
   - npm run dev
   - Visit http://localhost:3000

5. Test the features:
   - Click quick test buttons
   - Type custom messages
   - Watch real-time streaming
   - Test stop/clear functionality
   - Check browser console for logs

🎯 What to Expect:
- New chat gets created with unique ID
- Messages stream in real-time
- Contextual responses based on message content
- All callbacks (onData, onFinish, etc.) work
- Clean error handling and abort functionality
*/
