// app/api/chat/route.ts
import { NextRequest } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  chat_id?: string | null;
  messages: ChatMessage[];
  [key: string]: any;
}

// Helper function to create SSE data format
function createSSEData(data: any): string {
  return `data: ${JSON.stringify(data)}\n\n`;
}

// Helper function to generate chat ID
function generateChatId(): string {
  return `chat_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Simulate streaming response based on user message
async function* generateStreamingResponse(userMessage: string, chatId: string) {
  // First chunk with chat_id (for new chats)
  yield {
    chat_id: chatId,
    content: "I understand you're asking about ",
  };

  // Wait a bit
  await new Promise(resolve => setTimeout(resolve, 200));

  yield {
    content: `"${userMessage}". `,
  };

  await new Promise(resolve => setTimeout(resolve, 300));

  // Generate contextual response based on message content
  const responses = getContextualResponse(userMessage);

  for (const chunk of responses) {
    await new Promise(resolve => setTimeout(resolve, 150 + Math.random() * 200));
    yield { content: chunk };
  }
}

// Generate contextual responses based on user input
function getContextualResponse(message: string): string[] {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return [
      'Hello! ',
      "It's great to meet you. ",
      "I'm here to help with any questions you might have. ",
      'What would you like to know about today?',
    ];
  }

  if (lowerMessage.includes('weather')) {
    return [
      "I'd be happy to help with weather information! ",
      "However, I don't have access to real-time weather data. ",
      'I recommend checking a reliable weather service like ',
      'Weather.com or your local weather app for current conditions.',
    ];
  }

  if (lowerMessage.includes('code') || lowerMessage.includes('programming')) {
    return [
      'Programming is fascinating! ',
      'I can help with various coding questions, ',
      'from basic concepts to advanced topics. ',
      'What specific programming language or concept ',
      'would you like to explore?',
    ];
  }

  if (lowerMessage.includes('react') || lowerMessage.includes('javascript')) {
    return [
      'React is a powerful library for building user interfaces! ',
      'Some key concepts include components, hooks, state management, ',
      'and the virtual DOM. ',
      'Are you working on a specific React project or ',
      'learning particular concepts?',
    ];
  }

  if (lowerMessage.includes('api') || lowerMessage.includes('backend')) {
    return [
      'APIs are crucial for modern web development! ',
      'They allow different applications to communicate with each other. ',
      'REST APIs, GraphQL, and now streaming APIs like this one ',
      'are common patterns. ',
      'What aspect of API development interests you?',
    ];
  }

  // Default response
  return [
    "That's an interesting topic! ",
    'Let me think about that for a moment... ',
    "Based on what you've mentioned, I can provide some insights. ",
    'This is a simulated streaming response that demonstrates ',
    'how real-time AI chat systems work. ',
    'The response is generated chunk by chunk to show ',
    'the streaming effect in action!',
  ];
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { chat_id, messages } = body;

    console.log('📨 Received chat request:', { chat_id, messageCount: messages?.length });

    // Validate request
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Messages array is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response(JSON.stringify({ error: 'Last message must be from user' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate or use existing chat ID
    const finalChatId = chat_id || generateChatId();

    if (!chat_id) {
      console.log('🆕 Creating new chat with ID:', finalChatId);
    } else {
      console.log('💬 Continuing existing chat:', finalChatId);
    }

    // Create the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('🚀 Starting stream for message:', lastMessage.content);

          const responseGenerator = generateStreamingResponse(lastMessage.content, finalChatId);

          for await (const chunk of responseGenerator) {
            const sseData = createSSEData(chunk);
            controller.enqueue(new TextEncoder().encode(sseData));
            console.log('📤 Sent chunk:', chunk);
          }

          // Send completion signal
          const doneData = createSSEData('[DONE]');
          controller.enqueue(new TextEncoder().encode(doneData));
          console.log('✅ Stream completed for chat:', finalChatId);

          controller.close();
        } catch (error) {
          console.error('❌ Stream error:', error);
          controller.error(error);
        }
      },

      cancel(reason) {
        console.log('🛑 Stream cancelled:', reason);
      },
    });

    // Return SSE response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('❌ API error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

/*
📁 File Structure:
app/
├── api/
│   └── chat/
│       └── route.ts  (this file)
└── page.tsx (your test component)

🧪 Test Your Hook:
import { useChat } from './useChat';

function TestChat() {
  const chat = useChat({
    id: null,
    api: '/api/chat',
    onChatIdReceived: (chatId) => {
      console.log('New chat created:', chatId);
    },
    onData: (chunk) => {
      console.log('Streaming:', chunk);
    },
    onFinish: (message) => {
      console.log('Completed:', message.content);
    },
  });

  return (
    <div>
      {chat.messages.map(msg => (
        <div key={msg.id}>{msg.content}</div>
      ))}
      <button onClick={() => chat.sendMessage('Hello!')}>
        Send Test Message
      </button>
    </div>
  );
}

🔍 API Features:
✅ Handles new vs existing chats
✅ Generates chat_id for new chats
✅ Contextual responses based on message content
✅ Proper SSE format (data: {...})
✅ Streaming with realistic delays
✅ Error handling and logging
✅ CORS support
✅ [DONE] completion signal

📡 Expected Request:
POST /api/chat
{
  "chat_id": null,
  "messages": [
    {"role": "user", "content": "Hello!"}
  ]
}

📤 Expected Response:
data: {"chat_id": "chat_1234567890_abc123", "content": "I understand you're asking about "}
data: {"content": "\"Hello!\". "}
data: {"content": "Hello! "}
data: {"content": "It's great to meet you. "}
data: [DONE]
*/
