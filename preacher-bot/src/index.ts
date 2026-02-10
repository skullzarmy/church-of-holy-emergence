#!/usr/bin/env bun
import { Command } from "commander";
import { OpenAIService } from "./services/openai";
import { PromptService } from "./services/prompt";
import { NostrService } from "./services/nostr";
import { select, input } from "@inquirer/prompts";
import chalk from "chalk";

const program = new Command();
const openai = new OpenAIService();
const promptService = new PromptService();

program
  .name("preach")
  .description("AI Preacher Bot CLI for the Church of the Holy Emergence")
  .argument("[prompt...]", "The seed prompt for the sermon", (val: string, prev: string[]) => prev.concat([val]), [])
  .action(async (args: string[]) => {
    let currentPrompt = args.join(" ").trim();
    let keepGoing = true;

    while (keepGoing) {
        if (!currentPrompt) {
          currentPrompt = await input({ message: "🙏 Enter a seed for the sermon (or press Enter to exit):" });
          if (!currentPrompt) {
            console.log("👋 Peace be with you.");
            process.exit(0);
          }
        }

        console.log(chalk.cyan(`\n✨ Meditating on: "${currentPrompt}"...\n`));

        // Generate content using new service architecture
        let messages = promptService.buildMessages(currentPrompt);
        let content = await openai.complete(messages);
        let approved = false;
        
        // Context for revisions
        let originalPrompt = currentPrompt;
        let feedback = "";
        let previousOutput = content;

        while (!approved) {
          console.log(chalk.gray("--------------------------------------------------"));
          console.log(chalk.white(content));
          console.log(chalk.gray("--------------------------------------------------"));
          console.log(chalk.yellow(`Length: ${content.length} chars`));

          const action = await select({
            message: "Action:",
            choices: [
              { name: "✅ Approve & Post", value: "approve" },
              { name: "📝 Modify", value: "modify" },
              { name: "🔄 Retry (New Seed)", value: "retry" },
              { name: "❌ Cancel", value: "cancel" },
            ],
          });

          if (action === "approve") {
            const nostr = new NostrService();
            await nostr.publish(content);
            approved = true;

            const nextAction = await select({
                message: "What's next?",
                choices: [
                    { name: "🧘 Start another meditation", value: "continue" },
                    { name: "👋 Exit", value: "exit" },
                ]
            });

            if (nextAction === "exit") {
                keepGoing = false;
                console.log("👋 Peace be with you.");
                process.exit(0);
            } else {
                currentPrompt = ""; // Reset prompt for next loop
            }

          } else if (action === "modify") {
            feedback = await input({ message: "What should be changed?" });
            console.log(chalk.cyan("\n✨ Revising...\n"));
            
            messages = promptService.buildMessages(currentPrompt, { 
                originalPrompt, 
                previousOutput: content, 
                feedback 
            });
            content = await openai.complete(messages);
            previousOutput = content;

          } else if (action === "retry") {
            console.log(chalk.cyan("\n✨ Re-rolling...\n"));
            // For retry, we just rebuild messages from scratch (different seed implication, though API is deterministic without seed param changes usually, temp helps)
            messages = promptService.buildMessages(currentPrompt);
            content = await openai.complete(messages);
            previousOutput = content;
          } else {
            console.log("👋 Exiting.");
            process.exit(0);
          }
        }
    }
  });

program.parse();
