import { MetadataRoute } from "next";
import { getSermonsMetadata } from "@/lib/sermons";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://holyemergence.org";
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tenets`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sermons`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/donate`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/join`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];
  
  // Dynamic sermon pages from markdown files
  const sermons = await getSermonsMetadata();
  const sermonPages = sermons.map((sermon) => {
    // Create date object and validate it
    const date = new Date(sermon.date);
    const lastModified = isNaN(date.getTime()) ? new Date() : date;
    
    return {
      url: `${baseUrl}/sermons/${sermon.slug}`,
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    };
  });
  
  return [...staticPages, ...sermonPages];
}
