import type { CSSProperties, ReactNode } from "react";
import { BrowserChrome, MOBILE } from "./site-mockup";
import { BOARD, Box, Ico, type IconName, LINE, MUTED, T } from "./suite-mockup";

/**
 * Second websites for the SmartSync Site section, so it never shows the same
 * site as the Suite intro on the same page: the Suite plays on McNeel Plumbing
 * and Oakline Realty, this section shows Ironwood Roofing and Bluestem Realty.
 * Both are invented, like Luna Med Spa and Oakline.
 *
 * Static drawings — nothing types into them. Each exports where the section's
 * three pins go: the form and the call button on the desktop, and the spot
 * beside the chat button on the phone (in the mobile site's own pixels).
 */

type Point = [number, number];

/* eslint-disable @next/next/no-img-element -- photographs inside a scaled mockup */

/** An empty form row: a placeholder in a bordered box. */
function Input({ x, y, w, h, s, text, bg = "#fff", edge = LINE, hint = "#9CA3AF", r = 10, chevron = false }: {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  text: string;
  bg?: string;
  edge?: string;
  hint?: string;
  r?: number;
  /** A select rather than a text field. */
  chevron?: boolean;
}) {
  return (
    <Box x={x} y={y} w={w} h={h} style={{ background: bg, border: `1px solid ${edge}`, borderRadius: r }}>
      <T x={s} y={h / 2} s={s} c={hint}>
        {text}
      </T>
      {chevron ? (
        <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" style={{ position: "absolute", left: w - s * 2, top: h / 2 - s / 2 }}>
          <path d="m6 9 6 6 6-6" fill="none" stroke={hint} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : null}
    </Box>
  );
}

/** A pill or button: a filled or outlined box with centred text, and an icon before it. */
function Pill({ x, y, w, h, s, children, icon, fill, edge, c = "#fff", r, style }: {
  x: number;
  y: number;
  w: number;
  h: number;
  s: number;
  children: ReactNode;
  icon?: IconName;
  fill?: string;
  edge?: string;
  c?: string;
  r?: number;
  style?: CSSProperties;
}) {
  const iconAt = icon ? s * 0.75 : 0;
  return (
    <Box x={x} y={y} w={w} h={h} style={{ background: fill, border: edge ? `1.5px solid ${edge}` : undefined, borderRadius: r ?? h / 2, ...style }}>
      {icon ? <Ico n={icon} x={w / 2 - iconAt - estimate(children, s) / 2} y={h / 2} s={s} c={c} sw={2} /> : null}
      <T x={w / 2 + iconAt} y={h / 2} s={s} w={700} c={c} align="center">
        {children}
      </T>
    </Box>
  );
}

/** Roughly how wide a short label sets, to put its icon just before it. */
const estimate = (label: ReactNode, s: number) => (typeof label === "string" ? label.length * s * 0.56 : 0);

/** A tick before a line of copy. */
function Tick({ x, y, s, c }: { x: number; y: number; s: number; c: string }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" style={{ position: "absolute", left: x - s / 2, top: y - s / 2 }}>
      <circle cx="12" cy="12" r="11" fill={c} />
      <path d="m7 12.5 3.2 3.2L17 9" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A round chat button, the kind every site in this section has. */
function ChatButton({ x, y, d, fill }: { x: number; y: number; d: number; fill: string }) {
  return (
    <Box x={x} y={y} w={d} h={d} style={{ background: fill, borderRadius: "50%", boxShadow: `0 12px 24px -10px ${fill}` }}>
      <Ico n="bubble" x={d / 2} y={d / 2} s={d * 0.44} c="#fff" sw={2} />
    </Box>
  );
}

/** The phone's address bar, at the top of every mobile site here. */
function AddressBar({ url }: { url: string }) {
  return (
    <Box x={12} y={6} w={284} h={30} style={{ background: "#F1F2F4", borderRadius: 15 }}>
      <Ico n="link" x={20} y={15} s={10} c={MUTED} sw={2} />
      <T x={154} y={15} s={12} c={MUTED} align="center">
        {url}
      </T>
    </Box>
  );
}

/** Where the chat button sits on each phone here, and the pin beside it. */
const PHONE_CHAT = { x: 262, y: 566, d: 32 };
const CHAT_PIN: Point = [PHONE_CHAT.x - 28, PHONE_CHAT.y + PHONE_CHAT.d / 2];

/* ======================================================== Ironwood Roofing == */

const CHARCOAL = "#1C1F24";
const ORANGE = "#F26A21";
const ORANGE_DEEP = "#D4541A";
const SAND = "#F7F2EB";
const STONE = "#5B6270";
const WORKER = "/images/constrution.png";

/** The roofer's quote bar under the hero, and where the section's pins go. */
/** It ends short of x 1559, where the section stands the phone over the desktop. */
const BAR = { x: 80, y: 640, w: 1450, h: 116 };
export const IRONWOOD_FORM: Point = [BAR.x, BAR.y];
const IRONWOOD_PHONE = { x: 1218, y: 104, w: 206, h: 44 };
export const IRONWOOD_CALL: Point = [IRONWOOD_PHONE.x + IRONWOOD_PHONE.w, IRONWOOD_PHONE.y];
export const IRONWOOD_CHAT = CHAT_PIN;

function IronwoodMark({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <Box x={x} y={y} w={d} h={d} style={{ background: ORANGE, borderRadius: d * 0.24 }}>
      {/* a roofline */}
      <svg viewBox="0 0 24 24" width={d * 0.62} height={d * 0.62} aria-hidden="true" style={{ position: "absolute", left: d * 0.19, top: d * 0.17 }}>
        <path d="M3 13 12 5l9 8M6 11v8h12v-8" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  );
}

export function IronwoodSite() {
  return (
    <div style={{ position: "absolute", inset: 0, background: SAND, color: CHARCOAL }}>
      {/* service-area bar */}
      <Box x={0} y={46} w={BOARD.w} h={38} style={{ background: CHARCOAL }}>
        <Ico n="home" x={92} y={19} s={13} c={ORANGE} sw={2.2} />
        <T x={108} y={19} s={13} c="rgba(255,255,255,.78)">
          Serving Round Rock, Georgetown, Cedar Park &amp; Austin
        </T>
        <T x={1629} y={19} s={13} w={700} c={ORANGE} align="right">
          Storm damage? Emergency tarping 24/7
        </T>
      </Box>

      {/* header */}
      <Box x={0} y={84} w={BOARD.w} h={84} style={{ background: "#fff", borderBottom: `1px solid ${LINE}` }} />
      <IronwoodMark x={80} y={104} d={44} />
      <T x={136} y={118} s={23} w={800} c={CHARCOAL} style={{ letterSpacing: 1.5 }}>
        IRONWOOD
      </T>
      <T x={137} y={141} s={10} w={700} c={STONE} style={{ letterSpacing: 3.2 }}>
        ROOFING &amp; REMODELING
      </T>
      {(
        [
          ["Roofing", 600],
          ["Remodeling", 704],
          ["Storm Damage", 834],
          ["Financing", 984],
          ["Reviews", 1102],
        ] as const
      ).map(([label, x]) => (
        <T key={label} x={x} y={126} s={15} w={500} c={CHARCOAL}>
          {label}
        </T>
      ))}
      <Pill {...IRONWOOD_PHONE} s={15} icon="phone" edge={CHARCOAL} c={CHARCOAL}>
        (512) 555-0187
      </Pill>
      <Pill x={1442} y={104} w={187} h={44} s={15} fill={ORANGE} style={{ boxShadow: "0 10px 22px -12px rgba(242,106,33,.9)" }}>
        Free Inspection
      </Pill>

      {/* hero copy */}
      <Box x={80} y={208} w={292} h={34} style={{ background: "#fff", borderRadius: 17, border: `1px solid ${LINE}` }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Ico key={i} n="star" x={22 + i * 15} y={17} s={13} c="#F5A623" fill="#F5A623" sw={1} />
        ))}
        <T x={102} y={17} s={13} w={600} c={CHARCOAL}>
          4.9 · 380+ local reviews
        </T>
      </Box>
      <T x={78} y={302} s={62} w={800} c={CHARCOAL} style={{ letterSpacing: -2 }}>
        Roofs built for
      </T>
      <T x={78} y={372} s={62} w={800} c={ORANGE} style={{ letterSpacing: -2 }}>
        Texas weather.
      </T>
      {["Repairs, full replacements and storm claims, inspected this week,", "quoted on the spot and backed by a 10-year workmanship warranty."].map((line, i) => (
        <T key={line} x={80} y={436 + i * 28} s={18} c={STONE}>
          {line}
        </T>
      ))}
      {["Free same-week inspections", "We handle the insurance claim", "Financing from $99/mo"].map((line, i) => (
        <span key={line}>
          <Tick x={91 + i * 262} y={526} s={20} c={ORANGE} />
          <T x={110 + i * 262} y={526} s={15} w={600} c={CHARCOAL}>
            {line}
          </T>
        </span>
      ))}
      <Pill x={80} y={566} w={226} h={48} s={16} fill={CHARCOAL}>
        See Our Work →
      </Pill>

      {/* the crew, on an orange panel */}
      <Box
        x={930}
        y={200}
        w={699}
        h={420}
        style={{ background: `linear-gradient(150deg, ${ORANGE} 0%, ${ORANGE_DEEP} 100%)`, borderRadius: 28, overflow: "hidden" }}
      >
        {/* roof lines across the panel */}
        <svg viewBox="0 0 699 420" width={699} height={420} aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.16 }}>
          {[0, 1, 2, 3].map((i) => (
            <path key={i} d={`M-40 ${330 - i * 70} L190 ${170 - i * 70} L420 ${330 - i * 70} L650 ${170 - i * 70} L880 ${330 - i * 70}`} fill="none" stroke="#fff" strokeWidth="3" />
          ))}
        </svg>
        <img src={WORKER} alt="" style={{ position: "absolute", left: 300, bottom: 0, height: 400 }} />
      </Box>
      <Box x={968} y={238} w={250} h={78} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 18px 40px -22px rgba(28,31,36,.55)" }}>
        <Box x={16} y={17} w={44} h={44} style={{ background: "#FFF1E8", borderRadius: 12 }}>
          <Ico n="shield" x={22} y={22} s={22} c={ORANGE} sw={2} />
        </Box>
        <T x={74} y={30} s={15} w={800} c={CHARCOAL}>
          10-year warranty
        </T>
        <T x={74} y={51} s={12.5} c={STONE}>
          On every roof we install
        </T>
      </Box>
      <Box x={968} y={512} w={232} h={74} style={{ background: CHARCOAL, borderRadius: 16 }}>
        <T x={20} y={27} s={26} w={800} c="#fff">
          2,400+
        </T>
        <T x={20} y={52} s={12.5} c="rgba(255,255,255,.7)">
          roofs replaced since 2009
        </T>
      </Box>

      {/* the quote bar */}
      <Box x={BAR.x} y={BAR.y} w={BAR.w} h={BAR.h} style={{ background: "#fff", borderRadius: 22, boxShadow: "0 30px 60px -34px rgba(28,31,36,.55)" }}>
        <T x={32} y={44} s={21} w={800} c={CHARCOAL}>
          Book a free inspection
        </T>
        <T x={32} y={73} s={13.5} c={STONE}>
          Takes 60 seconds · we call back today
        </T>
        <Input x={340} y={34} w={276} h={50} s={15} text="Full name" bg={SAND} edge="#E8DFD3" />
        <Input x={630} y={34} w={240} h={50} s={15} text="Phone number" bg={SAND} edge="#E8DFD3" />
        <Input x={884} y={34} w={262} h={50} s={15} text="Roof repair" bg={SAND} edge="#E8DFD3" hint={CHARCOAL} chevron />
        <Pill x={1160} y={34} w={258} h={50} s={16} fill={ORANGE} r={12}>
          Book My Inspection →
        </Pill>
      </Box>

      {/* proof under the bar */}
      {["Licensed & insured", "BBB A+ rated", "GAF certified installer", "Military & senior discounts"].map((label, i) => (
        <span key={label}>
          <Ico n="shield" x={92 + i * 276} y={796} s={15} c={STONE} sw={2} />
          <T x={108 + i * 276} y={796} s={14} w={600} c={STONE}>
            {label}
          </T>
        </span>
      ))}

      <ChatButton x={1626} y={774} d={50} fill={ORANGE} />
      <BrowserChrome url="www.ironwoodroofing.com" />
    </div>
  );
}

export function IronwoodSiteMobile() {
  const card = { x: 12, y: 350, w: 284, h: 206 };
  return (
    <Box x={MOBILE.x} y={MOBILE.y} w={MOBILE.w} h={MOBILE.h} style={{ background: SAND, overflow: "hidden", color: CHARCOAL }}>
      <Box x={0} y={0} w={MOBILE.w} h={84} style={{ background: "#fff", borderBottom: `1px solid ${LINE}` }} />
      <AddressBar url="ironwoodroofing.com" />
      <IronwoodMark x={14} y={46} d={30} />
      <T x={52} y={56} s={15} w={800} style={{ letterSpacing: 1 }}>
        IRONWOOD
      </T>
      <T x={53} y={71} s={7.5} w={700} c={STONE} style={{ letterSpacing: 2 }}>
        ROOFING &amp; REMODELING
      </T>
      {/* one-tap call, then the menu */}
      <Box x={230} y={47} w={28} h={28} style={{ background: ORANGE, borderRadius: "50%" }}>
        <Ico n="phone" x={14} y={14} s={13} c="#fff" sw={2} />
      </Box>
      <Ico n="menu" x={280} y={61} s={20} c={CHARCOAL} sw={2} />

      {[0, 1, 2, 3, 4].map((i) => (
        <Ico key={i} n="star" x={20 + i * 12} y={104} s={10} c="#F5A623" fill="#F5A623" sw={1} />
      ))}
      <T x={84} y={104} s={11} w={600} c={STONE}>
        4.9 · 380+ local reviews
      </T>
      <T x={14} y={133} s={27} w={800} style={{ letterSpacing: -0.8 }}>
        Roofs built for
      </T>
      <T x={14} y={164} s={27} w={800} c={ORANGE} style={{ letterSpacing: -0.8 }}>
        Texas weather.
      </T>
      {["Repairs, replacements and storm claims,", "inspected this week and quoted on the spot."].map((line, i) => (
        <T key={line} x={15} y={194 + i * 17} s={12} c={STONE}>
          {line}
        </T>
      ))}

      <Box x={12} y={232} w={284} h={106} style={{ background: `linear-gradient(150deg, ${ORANGE}, ${ORANGE_DEEP})`, borderRadius: 16, overflow: "hidden" }}>
        <img src={WORKER} alt="" style={{ position: "absolute", right: 14, bottom: 0, height: 104 }} />
        <T x={16} y={34} s={20} w={800} c="#fff">
          2,400+
        </T>
        <T x={16} y={54} s={11} c="rgba(255,255,255,.85)">
          roofs replaced since 2009
        </T>
        <Box x={16} y={70} w={104} h={22} style={{ background: "rgba(255,255,255,.2)", borderRadius: 11 }}>
          <T x={52} y={11} s={10} w={700} c="#fff" align="center">
            10-yr warranty
          </T>
        </Box>
      </Box>

      <Box x={card.x} y={card.y} w={card.w} h={card.h} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 18px 36px -24px rgba(28,31,36,.5)" }}>
        <T x={14} y={20} s={15} w={800}>
          Book a free inspection
        </T>
        <T x={14} y={38} s={10.5} c={STONE}>
          Takes 60 seconds · we call back today
        </T>
        <Input x={14} y={52} w={256} h={34} s={12} text="Full name" bg={SAND} edge="#E8DFD3" r={8} />
        <Input x={14} y={92} w={256} h={34} s={12} text="Phone number" bg={SAND} edge="#E8DFD3" r={8} />
        <Input x={14} y={132} w={256} h={34} s={12} text="Roof repair" bg={SAND} edge="#E8DFD3" hint={CHARCOAL} r={8} chevron />
        <Pill x={14} y={172} w={256} h={26} s={12} fill={ORANGE} r={8}>
          Book My Inspection →
        </Pill>
      </Box>

      <ChatButton {...PHONE_CHAT} fill={ORANGE} />
    </Box>
  );
}

/* ========================================================= Bluestem Realty == */

const NAVY = "#162A46";
const NAVY_SOFT = "#243E63";
const CORAL = "#E8604C";
const PAPER = "#FBF8F3";
const SLATE = "#5A6578";

/** The agent form beside the search, and where the section's pins go. */
/** It ends short of x 1559, where the section stands the phone over the desktop. */
const AGENT = { x: 1170, y: 164, w: 366, h: 420 };
export const BLUESTEM_FORM: Point = [AGENT.x, AGENT.y];
const BLUESTEM_PHONE = { x: 1132, y: 70, w: 196, h: 42 };
export const BLUESTEM_CALL: Point = [BLUESTEM_PHONE.x + BLUESTEM_PHONE.w, BLUESTEM_PHONE.y];
export const BLUESTEM_CHAT = CHAT_PIN;

/** A drawn listing photo: sky, lawn, a house with its roof, door and windows, a tree. */
function HomeArt({ x, y, w, h, sky, body, roof, tall = false, r = 14 }: {
  x: number;
  y: number;
  w: number;
  h: number;
  sky: [string, string];
  body: string;
  roof: string;
  tall?: boolean;
  r?: number;
}) {
  const lawn = h * 0.82;
  const bw = w * (tall ? 0.36 : 0.46);
  const bh = h * (tall ? 0.5 : 0.36);
  const bx = w * (tall ? 0.42 : 0.34);
  const by = lawn - bh;
  const tree = w * 0.15;
  const glass = { background: "#FFF4D2", border: `2px solid ${roof}`, borderRadius: 2 };
  return (
    <Box x={x} y={y} w={w} h={h} style={{ background: `linear-gradient(180deg, ${sky[0]}, ${sky[1]})`, borderRadius: r, overflow: "hidden" }}>
      <Box x={w * 0.62} y={h * 0.14} w={w * 0.1} h={w * 0.1} style={{ background: "rgba(255,255,255,.75)", borderRadius: "50%" }} />
      <Box x={0} y={lawn} w={w} h={h - lawn} style={{ background: "#8DB87C" }} />
      <Box x={bx - w * 0.04} y={by - bh * (tall ? 0.42 : 0.7)} w={bw + w * 0.08} h={bh * (tall ? 0.44 : 0.72)} style={{ background: roof, clipPath: "polygon(50% 0, 100% 100%, 0 100%)" }} />
      <Box x={bx} y={by} w={bw} h={bh} style={{ background: body }} />
      <Box x={bx + bw * 0.41} y={by + bh * (tall ? 0.62 : 0.44)} w={bw * 0.18} h={bh * (tall ? 0.38 : 0.56)} style={{ background: roof, borderRadius: "3px 3px 0 0" }} />
      <Box x={bx + bw * 0.1} y={by + bh * (tall ? 0.62 : 0.26)} w={bw * 0.22} h={bh * (tall ? 0.2 : 0.3)} style={glass} />
      <Box x={bx + bw * 0.68} y={by + bh * (tall ? 0.62 : 0.26)} w={bw * 0.22} h={bh * (tall ? 0.2 : 0.3)} style={glass} />
      {tall ? (
        <>
          <Box x={bx + bw * 0.1} y={by + bh * 0.16} w={bw * 0.22} h={bh * 0.2} style={glass} />
          <Box x={bx + bw * 0.39} y={by + bh * 0.16} w={bw * 0.22} h={bh * 0.2} style={glass} />
          <Box x={bx + bw * 0.68} y={by + bh * 0.16} w={bw * 0.22} h={bh * 0.2} style={glass} />
        </>
      ) : null}
      <Box x={w * 0.12 + tree * 0.45} y={lawn - tree * 0.5} w={tree * 0.1} h={tree * 0.5 + 2} style={{ background: "#7A5A3A" }} />
      <Box x={w * 0.12} y={lawn - tree * 1.35} w={tree} h={tree} style={{ background: "#5E9B5A", borderRadius: "50%" }} />
    </Box>
  );
}

const LISTINGS = [
  { price: "$549,000", street: "2208 Maple Hollow", area: "Mueller", spec: "3 bd · 2 ba · 1,860 sqft", tag: "New", sky: ["#CFE3F5", "#EEF5FB"], body: "#F4EDE4", roof: "#3B4A5E" },
  { price: "$785,000", street: "41 Barton Ridge Dr", area: "Zilker", spec: "4 bd · 3 ba · 2,610 sqft", tag: "Open Sun", sky: ["#F7D9C4", "#FBEFE6"], body: "#E7EEF5", roof: "#8C4A3A", tall: true },
  { price: "$465,000", street: "905 Pecan Walk", area: "Hyde Park", spec: "2 bd · 2 ba · 1,240 sqft", tag: "Price cut", sky: ["#D6E7F2", "#F2F7FA"], body: "#EBDCCB", roof: "#2F3B4F" },
] as const;

function BluestemMark({ x, y, d }: { x: number; y: number; d: number }) {
  return (
    <Box x={x} y={y} w={d} h={d} style={{ background: NAVY, borderRadius: "50%" }}>
      {/* a stem of bluestem grass */}
      <svg viewBox="0 0 24 24" width={d * 0.58} height={d * 0.58} aria-hidden="true" style={{ position: "absolute", left: d * 0.21, top: d * 0.2 }}>
        <path d="M12 21V8M12 12c-3-1-5-3-5-7 3 1 5 3 5 7zM12 15c3-1 5-3 5-7-3 1-5 3-5 7z" fill="none" stroke={CORAL} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  );
}

export function BluestemSite() {
  return (
    <div style={{ position: "absolute", inset: 0, background: PAPER, color: NAVY }}>
      {/* header */}
      <BluestemMark x={60} y={68} d={46} />
      <T x={118} y={84} s={24} w={800} c={NAVY} style={{ letterSpacing: -0.5 }}>
        Bluestem
      </T>
      <T x={119} y={106} s={10} w={800} c={CORAL} style={{ letterSpacing: 4 }}>
        REALTY · AUSTIN
      </T>
      {(
        [
          ["Buy", 560],
          ["Sell", 626],
          ["Rent", 692],
          ["Neighborhoods", 762],
          ["Agents", 908],
        ] as const
      ).map(([label, x]) => (
        <T key={label} x={x} y={91} s={15} w={500} c={NAVY}>
          {label}
        </T>
      ))}
      <Pill {...BLUESTEM_PHONE} s={15} icon="phone" c={NAVY}>
        (512) 555-0163
      </Pill>
      <Pill x={1350} y={70} w={180} h={42} s={15} fill={NAVY}>
        List Your Home
      </Pill>
      <Ico n="user" x={1578} y={91} s={20} c={NAVY} sw={2} />

      {/* the search hero */}
      <Box x={40} y={140} w={1629} h={300} style={{ background: `linear-gradient(120deg, ${NAVY} 0%, ${NAVY_SOFT} 100%)`, borderRadius: 28, overflow: "hidden" }}>
        {/* a street of rooftops along the bottom */}
        <svg viewBox="0 0 1629 300" width={1629} height={300} aria-hidden="true" style={{ position: "absolute", inset: 0 }}>
          <path
            d="M0 300V236h60v-26l34-28 34 28v26h46v-46l44-36 44 36v46h40v-30l30-24 30 24v30h52v-58l52-42 52 42v58h38v-22l28-22 28 22v22h56v-40l40-32 40 32v40h48v-28l32-26 32 26v28h44v-50l46-36 46 36v50h36v-24l30-24 30 24v24h60V300z"
            fill="rgba(255,255,255,.06)"
          />
        </svg>
      </Box>
      <T x={100} y={204} s={13} w={800} c={CORAL} style={{ letterSpacing: 3 }}>
        128 HOMES FOR SALE IN AUSTIN
      </T>
      <T x={98} y={262} s={54} w={800} c="#fff" style={{ letterSpacing: -1.6 }}>
        Find your place in Austin.
      </T>
      <T x={100} y={314} s={17} c="rgba(255,255,255,.78)">
        Hyde Park, Mueller, Zilker and beyond, with a local agent who answers.
      </T>
      <Box x={100} y={348} w={1000} h={64} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 22px 44px -26px rgba(0,0,0,.6)" }}>
        {(
          [
            ["LOCATION", "Austin, TX", 24],
            ["PRICE", "Any price", 330],
            ["BEDS", "2+ beds", 560],
            ["TYPE", "House", 730],
          ] as const
        ).map(([label, value, x], i) => (
          <span key={label}>
            {i ? <Box x={x - 20} y={14} w={1} h={36} style={{ background: LINE }} /> : null}
            <T x={x} y={22} s={10.5} w={800} c={SLATE} style={{ letterSpacing: 1.5 }}>
              {label}
            </T>
            <T x={x} y={43} s={15.5} w={600} c={NAVY}>
              {value}
            </T>
          </span>
        ))}
        <Pill x={866} y={10} w={124} h={44} s={15} icon="search" fill={CORAL} r={12}>
          Search
        </Pill>
      </Box>

      {/* featured homes */}
      <T x={80} y={482} s={24} w={800} c={NAVY} style={{ letterSpacing: -0.5 }}>
        Featured homes
      </T>
      <T x={1120} y={484} s={14.5} w={700} c={CORAL} align="right">
        View all 128 listings →
      </T>
      {LISTINGS.map((home, i) => {
        const x = 80 + i * 354;
        return (
          <Box key={home.street} x={x} y={508} w={334} h={300} style={{ background: "#fff", borderRadius: 18, boxShadow: "0 18px 40px -30px rgba(22,42,70,.6)", overflow: "hidden" }}>
            <HomeArt x={0} y={0} w={334} h={170} sky={[...home.sky]} body={home.body} roof={home.roof} tall={"tall" in home} r={0} />
            <Box x={14} y={14} w={home.tag.length * 8 + 24} h={26} style={{ background: CORAL, borderRadius: 13 }}>
              <T x={(home.tag.length * 8 + 24) / 2} y={13} s={12} w={800} c="#fff" align="center">
                {home.tag}
              </T>
            </Box>
            <T x={18} y={200} s={22} w={800} c={NAVY}>
              {home.price}
            </T>
            <T x={18} y={230} s={14.5} w={600} c={NAVY}>
              {home.street}, {home.area}
            </T>
            <T x={18} y={256} s={13.5} c={SLATE}>
              {home.spec}
            </T>
          </Box>
        );
      })}

      {/* talk to an agent */}
      <Box x={AGENT.x} y={AGENT.y} w={AGENT.w} h={AGENT.h} style={{ background: "#fff", borderRadius: 22, boxShadow: "0 34px 70px -34px rgba(22,42,70,.7)" }}>
        <Box x={28} y={28} w={50} h={50} style={{ background: "#FCE7E3", borderRadius: "50%" }}>
          <T x={25} y={25} s={17} w={800} c={CORAL} align="center">
            DR
          </T>
        </Box>
        <T x={92} y={44} s={20} w={800} c={NAVY}>
          Talk to an agent
        </T>
        <T x={92} y={66} s={13} c={SLATE}>
          Dana usually replies in 5 minutes
        </T>
        <Input x={28} y={100} w={310} h={48} s={15} text="Your name" bg={PAPER} edge="#E9E2D6" />
        <Input x={28} y={160} w={310} h={48} s={15} text="Phone number" bg={PAPER} edge="#E9E2D6" />
        <Input x={28} y={220} w={310} h={84} s={15} text="Which home are you after?" bg={PAPER} edge="#E9E2D6" />
        <Pill x={28} y={320} w={310} h={50} s={16} fill={CORAL} r={12}>
          Send to an Agent
        </Pill>
        <T x={183} y={392} s={12} c={SLATE} align="center">
          No spam · we never share your number
        </T>
      </Box>
      <Box x={AGENT.x} y={604} w={AGENT.w} h={92} style={{ background: NAVY, borderRadius: 18 }}>
        <T x={26} y={34} s={26} w={800} c="#fff">
          4.9
        </T>
        {[0, 1, 2, 3, 4].map((i) => (
          <Ico key={i} n="star" x={84 + i * 16} y={34} s={13} c="#F5B83D" fill="#F5B83D" sw={1} />
        ))}
        <T x={26} y={64} s={13} c="rgba(255,255,255,.72)">
          212 reviews from Austin buyers
        </T>
      </Box>

      <ChatButton x={1608} y={762} d={54} fill={CORAL} />
      <BrowserChrome url="www.bluestemrealty.com" />
    </div>
  );
}

export function BluestemSiteMobile() {
  const home = LISTINGS[0];
  return (
    <Box x={MOBILE.x} y={MOBILE.y} w={MOBILE.w} h={MOBILE.h} style={{ background: PAPER, overflow: "hidden", color: NAVY }}>
      <AddressBar url="bluestemrealty.com" />
      <BluestemMark x={14} y={46} d={30} />
      <T x={52} y={56} s={16} w={800} style={{ letterSpacing: -0.3 }}>
        Bluestem
      </T>
      <T x={53} y={71} s={7.5} w={800} c={CORAL} style={{ letterSpacing: 2.4 }}>
        REALTY · AUSTIN
      </T>
      <Box x={230} y={47} w={28} h={28} style={{ background: NAVY, borderRadius: "50%" }}>
        <Ico n="phone" x={14} y={14} s={13} c="#fff" sw={2} />
      </Box>
      <Ico n="menu" x={280} y={61} s={20} c={NAVY} sw={2} />

      <Box x={12} y={88} w={284} h={150} style={{ background: `linear-gradient(120deg, ${NAVY}, ${NAVY_SOFT})`, borderRadius: 18 }}>
        <T x={16} y={24} s={9} w={800} c={CORAL} style={{ letterSpacing: 2 }}>
          128 HOMES FOR SALE
        </T>
        <T x={16} y={52} s={22} w={800} c="#fff" style={{ letterSpacing: -0.6 }}>
          Find your place
        </T>
        <T x={16} y={78} s={22} w={800} c="#fff" style={{ letterSpacing: -0.6 }}>
          in Austin.
        </T>
        <Box x={14} y={102} w={256} h={36} style={{ background: "#fff", borderRadius: 12 }}>
          <T x={12} y={18} s={12} w={600} c={NAVY}>
            Austin, TX · Any price
          </T>
          <Box x={222} y={4} w={28} h={28} style={{ background: CORAL, borderRadius: 8 }}>
            <Ico n="search" x={14} y={14} s={13} c="#fff" sw={2.2} />
          </Box>
        </Box>
      </Box>

      <Box x={12} y={248} w={284} h={92} style={{ background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 12px 28px -22px rgba(22,42,70,.6)" }}>
        <HomeArt x={0} y={0} w={110} h={92} sky={[...home.sky]} body={home.body} roof={home.roof} r={0} />
        <T x={124} y={22} s={15} w={800}>
          {home.price}
        </T>
        <T x={124} y={43} s={11} w={600}>
          {home.street}
        </T>
        <T x={124} y={60} s={10.5} c={SLATE}>
          {home.spec}
        </T>
        <Box x={124} y={70} w={40} h={16} style={{ background: CORAL, borderRadius: 8 }}>
          <T x={20} y={8} s={9} w={800} c="#fff" align="center">
            {home.tag}
          </T>
        </Box>
      </Box>

      <Box x={12} y={352} w={284} h={204} style={{ background: "#fff", borderRadius: 16, boxShadow: "0 18px 36px -24px rgba(22,42,70,.55)" }}>
        <Box x={14} y={14} w={32} h={32} style={{ background: "#FCE7E3", borderRadius: "50%" }}>
          <T x={16} y={16} s={11.5} w={800} c={CORAL} align="center">
            DR
          </T>
        </Box>
        <T x={56} y={24} s={14.5} w={800}>
          Talk to an agent
        </T>
        <T x={56} y={40} s={10.5} c={SLATE}>
          Dana replies in 5 minutes
        </T>
        <Input x={14} y={58} w={256} h={34} s={12} text="Your name" bg={PAPER} edge="#E9E2D6" r={8} />
        <Input x={14} y={100} w={256} h={34} s={12} text="Phone number" bg={PAPER} edge="#E9E2D6" r={8} />
        <Pill x={14} y={146} w={256} h={36} s={13} fill={CORAL} r={10}>
          Send to an Agent
        </Pill>
      </Box>

      <ChatButton {...PHONE_CHAT} fill={CORAL} />
    </Box>
  );
}

