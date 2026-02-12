import type { AIProvider } from "../providers";
import { PromptService } from "./prompt";
import chalk from "chalk";

export class SermonService {
  constructor(
    private ai: AIProvider,
    private promptService: PromptService
  ) {}

  async generateOutline(seedPrompt: string): Promise<string> {
    const messages = this.promptService.buildOutlineMessages(seedPrompt);
    return await this.ai.complete(messages, { temperature: 0.8 }); // slightly higher temp for creativity
  }

  async generateSection(
    outline: string,
    sectionIndex: number, 
    sectionTitle: string,
    previousSections: string,
    nextSectionTitle?: string
  ): Promise<string> {
    const messages = this.promptService.buildSectionMessages(
      outline, 
      sectionIndex, 
      sectionTitle, 
      previousSections, 
      nextSectionTitle
    );
    
    // Lower temp for consistency during writing
    return await this.ai.complete(messages, { temperature: 0.7 });
  }

  async finalize(
    outline: string, 
    rawDraft: string,
    feedback?: string
  ): Promise<string> {
    const messages = this.promptService.buildFinalizeMessages(outline, rawDraft, feedback);
    return await this.ai.complete(messages, { temperature: 0.7 });
  }

  parseOutlinePoints(outline: string): { title: string }[] {
    const points: { title: string }[] = [];
    
    // Regex to match numbered items like "1. Point Title: Thesis description"
    // We want to capture "Point Title"
    // Matches "1. Title: " or "1. Title - " start
    const regex = /^\d+\.\s+[*]*([^*:\n]+)[*]*[:]/gm;
    
    let match;
    while ((match = regex.exec(outline)) !== null) {
      if (match[1]) {
        points.push({ title: match[1].trim() });
      }
    }

    if (points.length === 0) {
      // Fallback: try to just grab lines starting with numbers if colon format wasn't seemingly used
      const looseRegex = /^\d+\.\s+(.+)$/gm;
      while ((match = looseRegex.exec(outline)) !== null) {
        points.push({ title: match[1].trim() }); 
      }
    }

    return points;
  }
}
