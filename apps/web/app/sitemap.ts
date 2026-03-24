import type { MetadataRoute } from "next";
import { getDetectors, getEvents } from "@/lib/shopify";
import { getSiteUrl } from "@/lib/site";

const STATIC_PATHS: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }> =
  [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/masterclass", priority: 0.95, changeFrequency: "monthly" },
    { path: "/events", priority: 0.95, changeFrequency: "weekly" },
    { path: "/shop", priority: 0.95, changeFrequency: "weekly" },
    { path: "/guides", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about", priority: 0.85, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.8, changeFrequency: "monthly" },
    { path: "/guides/best-metal-detector-for-beginners", priority: 0.85, changeFrequency: "monthly" },
    { path: "/guides/ground-balancing-hot-ground", priority: 0.85, changeFrequency: "monthly" },
    { path: "/guides/how-to-find-gold-nuggets", priority: 0.85, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.35, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.35, changeFrequency: "yearly" },
  ];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const [gear, events] = await Promise.all([getDetectors(), getEvents()]);
  const handles = new Set<string>();
  for (const p of gear) handles.add(p.handle);
  for (const p of events) handles.add(p.handle);

  const shopEntries: MetadataRoute.Sitemap = [...handles].map((handle) => ({
    url: `${base}/shop/${handle}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...shopEntries];
}
