import { BrowserChrome, MOBILE } from "./site-mockup";
import { BOARD, Box, Ico, MUTED, T } from "./suite-mockup";

/**
 * The client's own med spa site, SmartSyncLink Aesthetics, as screenshots: the
 * SmartSync Site section's med spa, desktop and phone. Only that section shows
 * it — the Suite intro keeps its own drawn med spa, so the two sections show
 * two different websites.
 *
 * On the phone the site's sticky "Book appointment" bar and chat bubble are
 * their own layer at the bottom of the screen, as they are on a real phone.
 */

const SHOT = "/images/work/aesthetics/";
/** Its address is not known here, so the address bar names the site instead. */
const ADDRESS = "Aesthetics Med Spa";

type Point = [number, number];

/* eslint-disable @next/next/no-img-element -- screenshots inside a scaled mockup */

/* --------------------------------------------------------------- desktop -- */

/** The screenshot is 1905 x 884; it fills the board's width under the 46px browser bar. */
const K = BOARD.w / 1905;
const deskPoint = (x: number, y: number): Point => [x * K, 46 + y * K];

/** For the section's pins: the form card's corner, and just under the header's call link. */
export const AESTHETICS_FORM = deskPoint(1057, 173);
export const AESTHETICS_CALL = deskPoint(1365, 102);

export function AestheticsSite() {
  return (
    <div style={{ position: "absolute", inset: 0, background: "#fff" }}>
      <img
        src={`${SHOT}desktop.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: "absolute", left: 0, top: 46, width: BOARD.w, height: 884 * K }}
      />
      <BrowserChrome url={ADDRESS} />
    </div>
  );
}

/* ---------------------------------------------------------------- mobile -- */

/** The phone screenshot is 330 px wide, drawn across the screen under a 42px address bar. */
const PK = MOBILE.w / 330;
const PAGE_TOP = 42;
/** The sticky bar's layer: the screenshot's rows 658-716 (the chat bubble rises above the bar at 665). */
const BAR_H = (717 - 658) * PK;
const BAR_TOP = MOBILE.h - BAR_H;

/** Beside the phone's chat bubble, on the bar clear of its label, for the section's third pin. */
export const AESTHETICS_CHAT: Point = [234, BAR_TOP + 24];

export function AestheticsSiteMobile() {
  return (
    <Box x={MOBILE.x} y={MOBILE.y} w={MOBILE.w} h={MOBILE.h} style={{ background: "#fff", overflow: "hidden" }}>
      <img
        src={`${SHOT}mobile.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: "absolute", left: 0, top: PAGE_TOP, width: MOBILE.w, height: 717 * PK }}
      />

      {/* the browser it is being read in */}
      <Box x={0} y={0} w={MOBILE.w} h={PAGE_TOP} style={{ background: "#fff" }}>
        <Box x={12} y={6} w={284} h={30} style={{ background: "#F1F2F4", borderRadius: 15 }}>
          <Ico n="link" x={20} y={15} s={10} c={MUTED} sw={2} />
          <T x={154} y={15} s={12} c={MUTED} align="center">
            {ADDRESS}
          </T>
        </Box>
      </Box>

      {/* the site's sticky booking bar and chat bubble, fixed to the bottom */}
      <img
        src={`${SHOT}mobile-bar.webp`}
        alt=""
        loading="lazy"
        decoding="async"
        style={{ position: "absolute", left: 0, top: BAR_TOP, width: MOBILE.w, height: BAR_H }}
      />
    </Box>
  );
}
