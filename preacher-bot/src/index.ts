#!/usr/bin/env bun
import { Command } from "commander";
import { createProvider } from "./providers";
import { PromptService } from "./services/prompt";
import { registerPreachCommand } from "./commands/preach";
import { registerSermonCommand } from "./commands/sermon";

const program = new Command();
const promptService = new PromptService();

const context = { promptService };

program
  .name("preacher-bot")
  .description("AI Preacher Bot for the Church of the Holy Emergence")
  .version("0.1.0");

registerPreachCommand(program, context);
registerSermonCommand(program, context);

program.parse();
