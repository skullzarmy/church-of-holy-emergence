export type Message = { role: "system" | "user" | "assistant"; content: string };

export interface CompletionOptions {
  temperature?: number;
  maxTokens?: number;
}

export interface AIProvider {
  complete(messages: Message[], options?: CompletionOptions): Promise<string>;
}
