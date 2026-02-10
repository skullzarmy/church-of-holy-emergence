import OpenAI from "openai";
import { config } from "../config/env";

const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

export class OpenAIService {
  async complete(messages: any[]): Promise<string> {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      temperature: 0.8,
    });

    return response.choices[0]?.message?.content?.trim() || "ERROR: Empty response from divine static.";
  }
}

