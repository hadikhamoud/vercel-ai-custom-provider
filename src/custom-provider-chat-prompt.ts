export type CustomProviderChatPrompt = Array<CustomProviderChatMessage>;

export type CustomProviderChatMessage =
  | CustomProviderSystemMessage
  | CustomProviderUserMessage
  | CustomProviderAssistantMessage
  | CustomProviderToolMessage;

export interface CustomProviderSystemMessage {
  role: 'system';
  content: string;
}

export interface CustomProviderUserMessage {
  role: 'user';
  content: string;
}

export interface CustomProviderAssistantMessage {
  role: 'assistant';
  content: string;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}

export interface CustomProviderToolMessage {
  role: 'tool';
  name: string;
  content: string;
}
