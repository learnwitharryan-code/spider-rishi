import { MetadataRoute } from "next";
import { projects } from "./data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: "https://www.rishisingh.online",
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `https://www.rishisingh.online/projects/${project.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    {
      url: "https://www.rishisingh.online/resume/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.rishisingh.online/support/",
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
