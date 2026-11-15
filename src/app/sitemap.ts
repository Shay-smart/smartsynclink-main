import type { MetadataRoute } from "next";
import { listIndustries } from "@/lib/industries";
import { listPosts } from "@/lib/posts";
import { listServices } from "@/lib/services";
import { SITE_URL } from "@/lib/site";

// Rebuilt at most hourly, so a new autopilot post shows up the same day.
export const revalidate = 3600;

/**
 * Every public page. The three lists come from the database; each of them
 * already falls back to an empty list when it is unreachable, so the worst a
 * dead database does here is a shorter sitemap, never a failed build.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [industries, services, posts] = await Promise.all([
    listIndustries(),
    listServices(),
    listPosts(),
  ]);

  const page = (path: string, priority: number, lastModified?: string): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModified ? new Date(lastModified) : undefined,
    priority,
  });

  return [
    page("/", 1),
    ...industries.map((i) => page(`/industries/${i.slug}`, 0.9, i.updated_at)),
    page("/solutions", 0.8),
    ...services.map((s) => page(`/solutions/${s.slug}`, 0.8)),
    page("/pricing-table", 0.8),
    page("/transparent-pricing", 0.6),
    page("/portfolio", 0.6),
    page("/blog", 0.7),
    ...posts.map((p) => page(`/blog/${p.slug}`, 0.6, p.updated_at ?? p.published_at ?? undefined)),
    page("/privacy-policy", 0.2),
    page("/terms-and-conditions", 0.2),
    page("/cookie-policy", 0.2),
  ];
}
