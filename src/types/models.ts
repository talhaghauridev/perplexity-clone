export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  parts?: any[];
}

export interface Model {
  id: string;
  name: string;
  provider: string;
}

export interface ChatSection {
  id: string;
  userMessage: Message;
  assistantMessages: Message[];
}
