export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  parts: Array<{
    type: 'text' | 'file';
    text?: string;
    url?: string;
    name?: string;
    mediaType?: string;
  }>;
  timestamp?: Date;
}

export interface Attachment {
  url: string;
  name: string;
  contentType: string;
}
