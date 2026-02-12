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
    // Request JSON mode if provider supports it? For now, we rely on prompt instruction.
    // Cloudflare/OpenAI supports response_format: { type: "json_object" } but we need to check provider capabilities.
    // For simplicity, we just parse the string output.
    
    const response = await this.ai.complete(messages, { temperature: 0.7 });
    
    try {
      // Robust JSON parsing (strip markdown code blocks if present)
      const jsonStr = response.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
      const data = JSON.parse(jsonStr) as { title: string; excerpt: string; content: string };
      
      const date = new Date().toISOString().split('T')[0];
      
      return `---
title: "${data.title.replace(/"/g, '\\"')}"
date: "${date}"
excerpt: "${data.excerpt.replace(/"/g, '\\"')}"
transmission: 999
---

${data.content}`;

    } catch (e) {
      console.error("❌ Failed to parse JSON from AI response:", response);
      // Fallback: return raw response if it fails (might be markdown)
      return response;
    }
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
