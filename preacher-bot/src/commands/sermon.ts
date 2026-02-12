import { Command } from "commander";
import { CommandContext } from "../types/context";
import { select, input } from "@inquirer/prompts";
import chalk from "chalk";
import { SermonService } from "../services/sermon";
import * as fs from "fs";
import * as path from "path";
import { createProvider } from "../providers";

export function registerSermonCommand(program: Command, context: CommandContext) {
  const { promptService } = context;

  program
    .command("sermon")
    .description("Generate a long-form sermon")
    .argument("[prompt...]", "The seed prompt for the sermon", (val: string, prev: string[]) => prev.concat([val]), [])
    .option("-m, --model <model>", "Override default AI model (e.g. 'openai/gpt-4o')")
    .action(async (args: string[], options: { model?: string }) => {
      const ai = createProvider(options.model);
      const sermonService = new SermonService(ai, promptService);

      // --- SEED PROMPT ---
      let seedPrompt = args.join(" ").trim();
      if (!seedPrompt) {
        seedPrompt = await input({ message: "🙏 Enter a seed for the sermon:" });
      }

      // --- STAGE 1: OUTLINE ---
      console.log(chalk.cyan("\n📋 Generating sermon outline..."));
      let outline = await sermonService.generateOutline(seedPrompt);
      
      let outlineApproved = false;
      while (!outlineApproved) {
        console.log(chalk.gray("--------------------------------------------------"));
        console.log(chalk.white(outline));
        console.log(chalk.gray("--------------------------------------------------"));

        const action = await select({
          message: "Outline Action:",
          choices: [
            { name: "✅ Approve outline", value: "approve" },
            { name: "📝 Modify outline (manual edit not supported yet, regen only)", value: "modify" }, 
            { name: "🔄 Regenerate", value: "retry" },
            { name: "❌ Cancel", value: "cancel" }
          ]
        });

        if (action === "approve") {
          outlineApproved = true;
        } else if (action === "retry") {
          console.log(chalk.cyan("🔄 Regenerating outline..."));
          outline = await sermonService.generateOutline(seedPrompt);
        } else if (action === "modify") {
           seedPrompt = await input({ message: "Enter new instructions/seed:" });
           console.log(chalk.cyan("🔄 Regenerating with new seed..."));
           outline = await sermonService.generateOutline(seedPrompt);
        } else {
          process.exit(0);
        }
      }

      // --- STAGE 2: SECTION-BY-SECTION ---
      const points = sermonService.parseOutlinePoints(outline);
      console.log(chalk.cyan(`\n✍️  Writing ${points.length} sections...\n`));
      
      let sections: string[] = [];
      for (let i = 0; i < points.length; i++) {
        const previousSections = sections.join("\n\n");
        const nextTitle = points[i + 1]?.title;
        const title = points[i]?.title || `Section ${i+1}`;
        
        console.log(chalk.gray(`  Writing "${title}"...`));
        const section = await sermonService.generateSection(
          outline, i, title, previousSections, nextTitle
        );
        sections.push(section);
        console.log(chalk.green(`  ✓ Section ${i+1}/${points.length} complete`));
      }

      // --- STAGE 3: FINALIZE ---
      console.log(chalk.cyan("\n🔮 Weaving final sermon..."));
      const rawDraft = sections.join("\n\n---\n\n");
      let sermon = await sermonService.finalize(outline, rawDraft);

      // --- SAVE TO OUTPUT ---
      const titleMatch = sermon.match(/^title:\s*["']?(.*?)["']?$/m);
      const titleSlug = titleMatch ? titleMatch[1].toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : `sermon-${Date.now()}`;
      
      const outputDir = path.resolve(process.cwd(), "preacher-bot/output");
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }
      
      const outputPath = path.join(outputDir, `${titleSlug}.md`);
      fs.writeFileSync(outputPath, sermon);
      
      console.log(chalk.green(`\n📄 Sermon saved to: ${outputPath}`));

      // --- REVIEW LOOP ---
      let reviewing = true;
      while (reviewing) {
        console.log(chalk.gray("─".repeat(50)));
        console.log(chalk.white(sermon.slice(0, 500) + "...\n(truncated)"));
        console.log(chalk.yellow(`\nLength: ${sermon.length} chars`));
        console.log(chalk.green(`📄 Full file: ${outputPath}`));

        const action = await select({
          message: "Final Action:",
          choices: [
            { name: "✅ Accept & Migrate to website", value: "migrate" },
            { name: "📝 Request Changes", value: "revise" },
            { name: "🗑️  Wipe & Restart", value: "restart" },
            { name: "❌ Exit (keep in output/)", value: "exit" },
          ],
        });

        if (action === "migrate") {
           // Assume project root relative to execution or source
           // Usually process.cwd() is project root when running `bun preach ...`
           // But let's look for content/sermons relative to CWD options
           // Better safe: use relative path from CWD or search up.
           // PREVIOUSLY: path.resolve(__dirname, "../../content/sermons")
           // If CWD is preacher-bot, then ../content/sermons
           // If CWD is root, then content/sermons
           
           // We can try to robustly find it.
           let projectRoot = process.cwd();
           if (path.basename(projectRoot) === "preacher-bot") {
               projectRoot = path.resolve(projectRoot, "..");
           }
           
           const sermonsDir = path.join(projectRoot, "content/sermons");
           if (!fs.existsSync(sermonsDir)) {
               // verify it exists before copying
               console.warn(chalk.yellow(`⚠️  Could not find ${sermonsDir} - creating it.`));
               fs.mkdirSync(sermonsDir, { recursive: true });
           }

           const websitePath = path.join(sermonsDir, `${titleSlug}.md`);
           
           fs.copyFileSync(outputPath, websitePath);
           console.log(chalk.green(`✅ Migrated to: ${websitePath}`));
           
           const next = await select({
             message: "What's next?",
             choices: [
               { name: "🧘 Write another sermon", value: "continue" },
               { name: "👋 Exit", value: "exit" },
             ],
           });
           
           if (next === "exit") {
               reviewing = false;
               process.exit(0);
           } else {
               reviewing = false;
               console.log("To write another, please run the command again.");
               process.exit(0);
           }

        } else if (action === "revise") {
          const feedback = await input({ message: "What should be changed?" });
          console.log(chalk.cyan("\n🔮 Revising sermon..."));
          sermon = await sermonService.finalize(outline, sermon, feedback);
          fs.writeFileSync(outputPath, sermon);
          console.log(chalk.green(`📄 Updated: ${outputPath}`));

        } else if (action === "restart") {
          fs.unlinkSync(outputPath);
          console.log(chalk.yellow("🗑️  Draft deleted."));
          reviewing = false;
          console.log("Please run the command again to start fresh.");
          process.exit(0);

        } else {
          console.log(chalk.gray(`📄 Sermon kept at: ${outputPath}`));
          console.log("👋 Peace be with you.");
          process.exit(0);
        }
      }
    });
}
