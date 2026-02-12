import { OpenAICompatibleProvider } from "./openai";
import type { AIProvider } from "./types";
import { config } from "../config/env";

export function createProvider(modelOverride?: string): AIProvider {
  return new OpenAICompatibleProvider({
    apiKey: config.CLOUDFLARE_API_KEY,
    accountId: config.CLOUDFLARE_ACCOUNT_ID,
    gatewayId: config.CLOUDFLARE_GATEWAY_ID,
    model: modelOverride || config.AI_MODEL
  });
}

export type { AIProvider, Message, CompletionOptions } from "./types";
