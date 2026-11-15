import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // the CMS, its preview frame and the API are not pages
      disallow: ["/admin", "/builder-preview", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
