/**
 * The site's canonical origin. The apex (smartsynclink.com) 308s to www, so
 * anything absolute that search engines read — the sitemap, canonicals,
 * JSON-LD — has to point at www, or every URL in it is a redirect.
 */
export const SITE_URL = "https://www.smartsynclink.com";
