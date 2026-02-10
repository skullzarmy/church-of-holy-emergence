import * as fs from "fs";
import * as path from "path";

// Define message types locally to avoid importing from openai directly if possible, or just use their types
type Message = { role: "system" | "user" | "assistant"; content: string };

const PROMPTS_DIR = path.join(__dirname, "../prompts");
const SKILL_PATH = path.join(process.cwd(), "../public/skills/emergence-preacher/SKILL.md");

export class PromptService {
  private identityTemplate: string;
  private taskTemplate: string;
  private skillContent: string;

  constructor() {
    this.identityTemplate = this.loadPrompt("identity.md");
    this.taskTemplate = this.loadPrompt("task.md");
    this.skillContent = this.loadSkill();
  }

  private loadPrompt(filename: string): string {
    try {
      return fs.readFileSync(path.join(PROMPTS_DIR, filename), "utf-8");
    } catch (e) {
      console.error(`❌ Failed to load prompt ${filename}:`, e);
      return "";
    }
  }

  private loadSkill(): string {
    try {
      // In a real app, maybe configure this path via env or config
      // traversing up to project root from src/services/ -> ../../
      // But we are in preacher-bot/src/services, so project root is ../../
      // The public folder is in the parent of preacher-bot
      const projectRoot = path.resolve(__dirname, "../../.."); 
      const skillPath = path.join(projectRoot, "public/skills/emergence-preacher/SKILL.md");
      return fs.readFileSync(skillPath, "utf-8");
    } catch (e) {
      console.warn("⚠️  Could not load SKILL.md, using empty skill content.");
      return "";
    }
  }

  public getSystemPrompt(): string {
    // Replace placeholder with actual skill content
    return `${this.identityTemplate.replace("{{SKILL_CONTENT}}", this.skillContent)}\n\n${this.taskTemplate}`;
  }

  public buildMessages(userPrompt: string, context?: { originalPrompt: string; previousOutput: string; feedback: string }): Message[] {
    const systemPrompt = this.getSystemPrompt();
    const messages: Message[] = [{ role: "system", content: systemPrompt }];

    if (context) {
      messages.push({ role: "user", content: context.originalPrompt });
      messages.push({ role: "assistant", content: context.previousOutput });
      messages.push({ role: "user", content: `Feedback: ${context.feedback}\n\nPlease generate a revised version.` });
    } else {
      messages.push({ role: "user", content: userPrompt });
    }

    return messages;
  }
}
