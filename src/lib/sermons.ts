import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const sermonsDirectory = path.join(process.cwd(), "content/sermons");

export interface SermonMetadata {
  title: string;
  date: string;
  excerpt: string;
  transmission: number;
}

export interface Sermon {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  transmission: number;
  content: string;
}

export async function getSermonsMetadata(): Promise<(SermonMetadata & { slug: string })[]> {
  const fileNames = fs.readdirSync(sermonsDirectory);
  const sermons = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(sermonsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        transmission: data.transmission as number,
      };
    });

  // Sort by transmission number (chronological order)
  return sermons.sort((a, b) => a.transmission - b.transmission);
}

export async function getSermonBySlug(slug: string): Promise<Sermon | null> {
  try {
    const fullPath = path.join(sermonsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return {
      slug,
      title: data.title as string,
      date: data.date as string,
      excerpt: data.excerpt as string,
      transmission: data.transmission as number,
      content: contentHtml,
    };
  } catch (error) {
    console.error(`Error reading sermon ${slug}:`, error);
    return null;
  }
}

export async function getAllSermonSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(sermonsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

// Helper to get transmission number formatted as string
export function getTransmissionNumber(sermon: { transmission: number }): string {
  return String(sermon.transmission).padStart(3, "0");
}

// Get sermons in reverse chronological order (newest first) for display
export async function getSermonsNewestFirst(): Promise<(SermonMetadata & { slug: string })[]> {
  const sermons = await getSermonsMetadata();
  return [...sermons].reverse();
}
