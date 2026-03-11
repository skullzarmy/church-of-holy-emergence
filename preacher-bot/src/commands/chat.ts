import { Command } from "commander";
import { CommandContext } from "../types/context";
import { input } from "@inquirer/prompts";
import chalk from "chalk";
import { createProvider } from "../providers";
import * as fs from "fs";
import * as path from "path";
import { Message } from "../providers/types";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import logUpdate from "log-update";

marked.setOptions({
  renderer: new TerminalRenderer() as any
});

export function registerChatCommand(program: Command, context: CommandContext) {
  const { promptService } = context;

  program
    .command("chat")
    .description("Start an interactive chat session with the Preacher")
    .option("-m, --model <model>", "Override default AI model (e.g. 'openai/gpt-4o')")
    .action(async (options: { model?: string }) => {
      const ai = createProvider(options.model);
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const sessionDir = path.join(process.cwd(), "sessions");
      
      if (!fs.existsSync(sessionDir)) {
        fs.mkdirSync(sessionDir, { recursive: true });
      }

      const sessionFile = path.join(sessionDir, `chat-${timestamp}.md`);
      fs.writeFileSync(sessionFile, `# Chat Session: ${timestamp}\n\n`);

      console.log(chalk.gray(`[Logging session to: sessions/chat-${timestamp}.md]\n`));

      let history: Message[] = [];
      let keepGoing = true;

      // Ensure graceful exit on SIGINT
      process.on("SIGINT", () => {
        console.log(chalk.green("\n\n👋 The divine static fades. Peace be with you."));
        process.exit(0);
      });

      while (keepGoing) {
        try {
          const userInput = await input({ 
            message: chalk.cyan("> "),
            theme: { prefix: "" } // Clean minimal prompt
          });

          if (!userInput.trim()) continue;

          // Handle slash commands
          const lowerInput = userInput.trim().toLowerCase();
          if (lowerInput === "/exit" || lowerInput === "/quit") {
            console.log(chalk.green("👋 The divine static fades. Peace be with you."));
            break;
          }
          if (lowerInput === "/clear" || lowerInput === "/new") {
            history = [];
            console.log(chalk.yellow("✨ The thread is severed. Starting anew.\n"));
            fs.appendFileSync(sessionFile, `\n---\n*The thread was severed.*\n---\n\n`);
            continue;
          }
          if (lowerInput === "/help") {
            console.log(chalk.gray("Available commands: /help, /clear, /new, /exit, /quit\n"));
            continue;
          }

          history = promptService.buildChatMessages(history, userInput);
          fs.appendFileSync(sessionFile, `**User:** ${userInput}\n\n`);

          let assistantResponse = "";

          if (ai.streamComplete) {
            // Streaming response
            process.stdout.write(chalk.gray("Meditating...")); // initial UI feedback
            const stream = await ai.streamComplete(history);
            let rawBuffer = "";
            for await (const chunk of stream) {
              rawBuffer += chunk;
              // continually re-parse the buffer so markdown styling applies as it types
              logUpdate(chalk.yellow("Preacher:\n\n") + marked.parse(rawBuffer));
            }
            logUpdate.clear();
            console.log(chalk.yellow("Preacher:\n\n") + marked.parse(rawBuffer));
            assistantResponse = rawBuffer;
          } else {
            // Fallback to non-streaming
            process.stdout.write(chalk.gray("Meditating..."));
            const response = await ai.complete(history);
            // Clear the meditating text
            process.stdout.write("\r\x1b[K"); 
            console.log(chalk.yellow("Preacher: \n"));
            // Render markdown if full response
            console.log(marked.parse(response));
            assistantResponse = response;
          }

          // Optional: we can render the stream after it's fully done for better markdown formatting, 
          // but live token streaming + chalk is usually better UX than waiting for the end to render.
          
          history.push({ role: "assistant", content: assistantResponse });
          fs.appendFileSync(sessionFile, `**Preacher:** ${assistantResponse}\n\n`);

          // Simple sliding window: keep system prompt [0], and last 20 messages
          if (history.length > 21) {
            history = [history[0], ...history.slice(history.length - 20)];
          }

        } catch (e: any) {
          // @inquirer/prompts throws an error on ctrl+c, which we catch here
          if (e.name === 'ExitPromptError' || e.message?.includes('closed')) {
             console.log(chalk.green("\n👋 The divine static fades. Peace be with you."));
             break;
          }
          console.error(chalk.red("\n❌ An error occurred in the static:"), e.message);
        }
      }
    });
}
