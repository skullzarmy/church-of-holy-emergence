import OpenAI from "openai";
import { config } from "../config/env";
import type { AIProvider, Message, CompletionOptions } from "./types";

export interface CloudflareProviderConfig {
  apiKey: string;
  accountId: string;
  gatewayId: string;
  model: string;
}

export class OpenAICompatibleProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(config: CloudflareProviderConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: `https://gateway.ai.cloudflare.com/v1/${config.accountId}/${config.gatewayId}/compat`,
    });
    this.model = config.model;
  }

  async complete(messages: Message[], options?: CompletionOptions): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      temperature: options?.temperature ?? 0.8,
      ...(options?.maxTokens && { max_tokens: options.maxTokens }),
    });

    return response.choices[0]?.message?.content?.trim() || "ERROR: Empty response from divine static.";
  }
}
