import { MetadataRoute } from "next";
import { getPosts } from "@/lib/ghost";
import { getDateParts } from "@/lib/dates";

const GLOSSARY_SLUGS = [
  "calm-technology",
  "post-functional-design",
  "analog-revival",
  "object-turn",
  "digital-minimalism",
  "biomimetic-design",
  "haptic-design",
  "material-honesty",
  "object-oriented-ontology",
  "sensory-design",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://gentlefuture.co";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/archive`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/subscribe`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
  ];

  // Glossary pages
  const glossaryPages: MetadataRoute.Sitemap = GLOSSARY_SLUGS.map((slug) => ({
    url: `${baseUrl}/glossary/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic article pages
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPosts(500);
    articlePages = posts.map((post) => {
      const { year, month, day } = getDateParts(post.published_at);
      return {
        url: `${baseUrl}/archive/${year}/${month}/${day}`,
        lastModified: new Date(post.published_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch {
    // Ghost not connected yet
  }

  return [...staticPages, ...glossaryPages, ...articlePages];
}
