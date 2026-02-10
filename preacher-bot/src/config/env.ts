import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  OPENAI_API_KEY: z.string({ message: "OPENAI_API_KEY is required" }).min(1, "OPENAI_API_KEY cannot be empty"),
  NOSTR_PRIVATE_KEY: z.string({ message: "NOSTR_PRIVATE_KEY is required" }).min(1, "NOSTR_PRIVATE_KEY cannot be empty"), // nsec or hex
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
