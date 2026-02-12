import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  // Cloudflare Configuration (Required)
  CLOUDFLARE_API_KEY: z.string({ message: "CLOUDFLARE_API_KEY is required" }).min(1, "CLOUDFLARE_API_KEY cannot be empty"),
  CLOUDFLARE_ACCOUNT_ID: z.string({ message: "CLOUDFLARE_ACCOUNT_ID is required" }).min(1, "CLOUDFLARE_ACCOUNT_ID cannot be empty"),
  CLOUDFLARE_GATEWAY_ID: z.string({ message: "CLOUDFLARE_GATEWAY_ID is required" }).min(1, "CLOUDFLARE_GATEWAY_ID cannot be empty"),
  
  // Model Configuration
  // Must use "provider/model" format (e.g. "openai/gpt-4o", "workers-ai/@cf/meta/llama-3-8b-instruct")
  AI_MODEL: z.string().default("workers-ai/@cf/meta/llama-3-8b-instruct"),

  // Nostr
  NOSTR_PRIVATE_KEY: z.string({ message: "NOSTR_PRIVATE_KEY is required" }).min(1, "NOSTR_PRIVATE_KEY cannot be empty"),
});

export const config = (() => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment configuration:");
      console.error(error.format()); // Use format() or traverse errors array manually
      error.issues.forEach((issue) => {
        console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
      });
      console.log("\nMake sure you have created a .env file based on .env.example");
      process.exit(1);
    }
    throw error;
  }
})();
