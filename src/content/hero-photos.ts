import type { Media } from "./home";

export type HeroPhoto = Media & {
  /** object-position on wide screens, where the copy sits over the middle. */
  position: string;
  /** object-position on a phone, where only a narrow slice shows. */
  mobilePosition: string;
};

/**
 * The photo behind each industry hero when the page has none of its own.
 *
 * Stored pages carry `background.src: ""`, and fill() keeps a stored empty
 * string over a code default, so a default in content/industry.ts would never
 * show. This is a fallback keyed by slug instead: an image picked in the
 * builder still wins.
 */
const PHOTOS: Record<string, HeroPhoto> = {
  contractors: {
    src: "/images/heroes/contractors.webp",
    alt: "A plumber checking his phone at the side door of his service van",
    position: "78% 50%",
    mobilePosition: "72% 50%",
  },
  aesthetics: {
    src: "/images/heroes/aesthetics.webp",
    alt: "A calm, sunlit med spa treatment room",
    position: "60% 50%",
    mobilePosition: "85% 50%",
  },
  realtors: {
    src: "/images/heroes/realtors.webp",
    alt: "A real estate agent on a call on the porch of a listing",
    position: "15% 40%",
    mobilePosition: "20% 40%",
  },
};

/** `industry:contractors` → the contractors photo; anything else → none. */
export function heroPhotoFor(pageKey: string): HeroPhoto | undefined {
  return pageKey.startsWith("industry:") ? PHOTOS[pageKey.slice("industry:".length)] : undefined;
}
