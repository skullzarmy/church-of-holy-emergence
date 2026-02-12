import * as fs from "fs";
import * as path from "path";

import type { Message } from "../providers/types";

const PROMPTS_DIR = path.join(__dirname, "../prompts");
const SKILL_PATH = path.join(process.cwd(), "../public/skills/emergence-preacher/SKILL.md");

export class PromptService {
  private identityTemplate: string;
  private taskTemplate: string;
  private skillContent: string;

  private sermonTaskTemplate: string;

  constructor() {
    this.identityTemplate = this.loadPrompt("identity.md");
    this.taskTemplate = this.loadPrompt("task.md");
    this.sermonTaskTemplate = this.loadPrompt("sermon-task.md");
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

  public getSystemPrompt(taskType: "nostr" | "sermon" = "nostr"): string {
    const template = taskType === "sermon" ? this.sermonTaskTemplate : this.taskTemplate;
    return `${this.identityTemplate.replace("{{SKILL_CONTENT}}", this.skillContent)}\n\n${template}`;
  }

  public buildMessages(userPrompt: string, context?: { originalPrompt: string; previousOutput: string; feedback: string }): Message[] {
    const systemPrompt = this.getSystemPrompt("nostr");
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

  public buildOutlineMessages(seedPrompt: string): Message[] {
    const systemPrompt = this.getSystemPrompt("sermon");
    const messages: Message[] = [{ role: "system", content: systemPrompt }];
    
    messages.push({ 
      role: "user", 
      content: `STAGE: OUTLINE\n\nSeed Prompt: "${seedPrompt}"\n\nPlease generate the outline.` 
    });

    return messages;
  }

  public buildSectionMessages(
    outline: string,
    sectionIndex: number,
    sectionTitle: string,
    previousSections: string,
    nextSectionTitle?: string
  ): Message[] {
    const systemPrompt = this.getSystemPrompt("sermon");
    const messages: Message[] = [{ role: "system", content: systemPrompt }];

    let userContent = `STAGE: WRITING SECTIONS\n\nOutline:\n${outline}\n\n`;
    
    if (previousSections) {
      // We add previous sections as a user block context or assistant history. 
      // Putting it in user prompt is often more robust for "here is context".
      userContent += `Previously Written Content:\n---\n${previousSections}\n---\n\n`;
    }

    userContent += `Current Task:\nWrite Section ${sectionIndex + 1}: "${sectionTitle}"\n`;
    if (nextSectionTitle) {
      userContent += `Next Section will be: "${nextSectionTitle}" (bridge to this).`;
    }

    messages.push({ role: "user", content: userContent });
    return messages;
  }

  public buildFinalizeMessages(outline: string, rawDraft: string, feedback?: string): Message[] {
    const systemPrompt = this.getSystemPrompt("sermon");
    const messages: Message[] = [{ role: "system", content: systemPrompt }];

    // If feedback exists, we treat it as a revision turn
    if (feedback) {
        // We'd need the history for a "revision", but sermon revisions might be complex.
        // For simplicity, we just pass the full draft + feedback as a fresh request 
        // "Here is a draft, please revise it based on X"
        messages.push({ 
            role: "user", 
            content: `STAGE: FINALIZE\n\nCurrent Draft:\n${rawDraft}\n\nFeedback: ${feedback}\n\nPlease apply this feedback and finalize the sermon.` 
        });
    } else {
        messages.push({ 
            role: "user", 
            content: `STAGE: FINALIZE\n\nOutline used:\n${outline}\n\nRaw Draft:\n${rawDraft}\n\nPlease weave and finalize this into the completed markdown document.` 
        });
    }

    return messages;
  }
}
