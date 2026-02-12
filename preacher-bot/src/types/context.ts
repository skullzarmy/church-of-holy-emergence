import type { AIProvider } from "../providers";
import type { PromptService } from "../services/prompt";

export interface CommandContext {
  promptService: PromptService;
}
