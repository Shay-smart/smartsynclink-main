import type { ComponentType } from "react";
import type { Story } from "@/lib/stage-intro";
import {
  AESTHETICS_CALL,
  AESTHETICS_CHAT,
  AESTHETICS_FORM,
  AestheticsSite,
  AestheticsSiteHome,
  AestheticsSiteHomeMobile,
  AestheticsSiteMobile,
} from "./aesthetics-site";
import { CONTRACTOR_CALL, ContractorSite, ContractorSiteMobile } from "./contractor-site";
import { REALTOR_CALL, RealtorSite, RealtorSiteMobile } from "./realtor-site";
import {
  BLUESTEM_CALL,
  BLUESTEM_CHAT,
  BLUESTEM_FORM,
  BluestemSite,
  BluestemSiteMobile,
  IRONWOOD_CALL,
  IRONWOOD_CHAT,
  IRONWOOD_FORM,
  IronwoodSite,
  IronwoodSiteMobile,
} from "./showcase-sites";
import { CARD, MEDSPA_CALL, type SiteMode, VisitorSite, VisitorSiteMobile } from "./site-mockup";

/**
 * The website each story opens on, desktop and phone, and where the SmartSync
 * Site section's pins go on it: the form (on the desktop), the call button (on
 * the desktop) and the chat (on the phone, in the mobile site's pixels).
 *
 * SITES are the drawings the Suite intro plays on. All three put the form, the
 * phone's call button and the chat in the same places, so the intro's moves fit
 * any of them; only the desktop call button moves.
 */
type Point = [number, number];
type Site = {
  Desktop: ComponentType<{ mode?: SiteMode }>;
  Mobile: ComponentType<{ mode?: SiteMode }>;
  form: Point;
  call: Point;
  chat: Point;
};

/** The drawings' form card corner, and the spot beside their phone's chat button. */
const GRID = { form: [CARD.x, CARD.y] as Point, chat: [236, 579] as Point };

export const SITES: Record<Story, Site> = {
  medspa: { Desktop: VisitorSite, Mobile: VisitorSiteMobile, call: MEDSPA_CALL, ...GRID },
  contractor: { Desktop: ContractorSite, Mobile: ContractorSiteMobile, call: CONTRACTOR_CALL, ...GRID },
  realtor: { Desktop: RealtorSite, Mobile: RealtorSiteMobile, call: REALTOR_CALL, ...GRID },
};

/**
 * What the SmartSync Site section shows, so it is never the same website as
 * the Suite's on the same page: for the med spa, the client's own
 * SmartSyncLink Aesthetics site; for the others, a second drawn site.
 */
export const SHOWCASE: Record<Story, Site> = {
  medspa: { Desktop: AestheticsSite, Mobile: AestheticsSiteMobile, form: AESTHETICS_FORM, call: AESTHETICS_CALL, chat: AESTHETICS_CHAT },
  contractor: { Desktop: IronwoodSite, Mobile: IronwoodSiteMobile, form: IRONWOOD_FORM, call: IRONWOOD_CALL, chat: IRONWOOD_CHAT },
  realtor: { Desktop: BluestemSite, Mobile: BluestemSiteMobile, form: BLUESTEM_FORM, call: BLUESTEM_CALL, chat: BLUESTEM_CHAT },
};

/** The home page's med spa showcase: the same site as SHOWCASE.medspa with its own hero photo. */
export const HOME_SHOWCASE: Site = {
  ...SHOWCASE.medspa,
  Desktop: AestheticsSiteHome,
  Mobile: AestheticsSiteHomeMobile,
};
