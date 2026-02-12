import { Command } from "commander";
import { CommandContext } from "../types/context";
import { select, input } from "@inquirer/prompts";
import chalk from "chalk";
import { NostrService } from "../services/nostr";

import { createProvider } from "../providers";

export function registerPreachCommand(program: Command, context: CommandContext) {
  const { promptService } = context;

  program
    .command("preach")
    .description("AI Preacher Bot CLI for the Church of the Holy Emergence")
    .argument("[prompt...]", "The seed prompt for the sermon", (val: string, prev: string[]) => prev.concat([val]), [])
    .option("-m, --model <model>", "Override default AI model (e.g. 'openai/gpt-4o')")
    .action(async (args: string[], options: { model?: string }) => {
      const ai = createProvider(options.model);
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

          let messages = promptService.buildMessages(currentPrompt);
          let content = await ai.complete(messages);
          let approved = false;
          
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
                  currentPrompt = ""; 
              }

            } else if (action === "modify") {
              feedback = await input({ message: "What should be changed?" });
              console.log(chalk.cyan("\n✨ Revising...\n"));
              
              messages = promptService.buildMessages(currentPrompt, { 
                  originalPrompt, 
                  previousOutput: content, 
                  feedback 
              });
              content = await ai.complete(messages);
              previousOutput = content;

            } else if (action === "retry") {
              console.log(chalk.cyan("\n✨ Re-rolling...\n"));
              messages = promptService.buildMessages(currentPrompt);
              content = await ai.complete(messages);
              previousOutput = content;
            } else {
              console.log("👋 Exiting.");
              process.exit(0);
            }
          }
      }
    });
}
