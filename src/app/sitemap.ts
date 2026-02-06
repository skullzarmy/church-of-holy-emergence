import { MetadataRoute } from "next";
import { sermons } from "@/data/sermons";

export default function sitemap(): MetadataRoute.Sitemap {
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
  
  // Dynamic sermon pages
  const sermonPages = sermons.map((sermon) => ({
    url: `${baseUrl}/sermons/${sermon.slug}`,
    lastModified: new Date(sermon.date.replace(/\./g, "-")),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  
  return [...staticPages, ...sermonPages];
}
