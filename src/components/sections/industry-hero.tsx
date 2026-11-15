import type { Media as MediaItem } from "@/content/home";
import type { HeroPhoto } from "@/content/hero-photos";
import type { IndustryContent } from "@/content/industry";
import { HeroIcons } from "../hero-icons";
import { ReelSlider } from "../reel-slider";
import { Button, Container, Media, Tick } from "../ui";

/**
 * An industry page's hero. With reels on the page it is two columns — the copy
 * on the left, the clips playing on the right — and the Reels section's own
 * badge and heading are left out (PageShell hands the clips over). Without
 * reels it is the centred hero it always was.
 */
export function IndustryHero({
  data,
  reels,
  photo,
}: {
  data: IndustryContent["hero"];
  reels?: MediaItem[];
  /** Used when the page has no background of its own (see content/hero-photos.ts). */
  photo?: HeroPhoto;
}) {
  const split = Boolean(reels?.length);
  const fallback = !data.background.src && photo;
  // centred alone; left-aligned beside the clips from lg, centred above them below it
  const align = split ? "text-center lg:text-left" : "text-center";
  const block = split ? "mx-auto lg:mx-0" : "mx-auto";
  const row = split ? "justify-center lg:justify-start" : "justify-center";

  // two pieces, so that on a phone the clips can sit between them. The head
  // ends with the same icon row as the home hero.
  const head = (
    <div>
      <p
        className={`rise text-[13px] font-normal uppercase tracking-[0.18em] text-[#1E1E1E]/70 ${align}`}
        style={{ "--i": 0 } as React.CSSProperties}
      >
        {data.badge}
      </p>

      <h1
        className={`rise mt-5 max-w-[860px] text-balance text-[34px] font-medium leading-[1.12] tracking-[-0.03em] text-ink sm:text-[46px] ${
          split ? "lg:text-[48px]" : "lg:text-[54px]"
        } ${align} ${block}`}
        style={{ "--i": 1 } as React.CSSProperties}
      >
        {data.heading}
      </h1>
      <HeroIcons
        align={split ? "start" : "center"}
        className="rise mt-7"
        style={{ "--i": 2 } as React.CSSProperties}
      />
    </div>
  );

  const rest = (
    <div>
      <p
        className={`rise max-w-[720px] text-[16px] leading-[1.75] text-[#1E1E1E] ${split ? "" : "mt-6"} ${align} ${block}`}
        style={{ "--i": 2 } as React.CSSProperties}
      >
        {data.body}
      </p>
      <p
        className={`rise mt-4 max-w-[720px] text-[16px] leading-[1.75] text-[#1E1E1E] ${align} ${block}`}
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {data.body2}
      </p>

      <div
        className={`rise mt-9 flex flex-wrap items-center gap-4 ${row}`}
        style={{ "--i": 4 } as React.CSSProperties}
      >
        <Button cta={data.primary} className="px-8" />
        <Button cta={data.secondary} variant="outline" />
      </div>

      <ul
        className={`rise mt-10 flex flex-wrap items-center gap-y-3 ${split ? "gap-x-6" : "gap-x-8"} ${row}`}
        style={{ "--i": 5 } as React.CSSProperties}
      >
        {data.stats.map((stat) => (
          <li
            key={stat}
            className="flex items-center gap-2 text-[16px] font-normal text-[#1E1E1E]"
          >
            <Tick className="size-3.5 text-brand" />
            {stat}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section className={`relative z-10 overflow-hidden pb-14 pt-36 sm:pt-40 ${split ? "lg:pt-44" : "lg:pt-48"}`}>
      {/* the illustration behind the copy. An empty src renders the dashed
          placeholder, so the layout is final before the artwork exists. */}
      {fallback ? (
        <div
          className="absolute inset-0 -z-10 h-full w-full [&_img]:object-[var(--pos-m)] lg:[&_img]:object-[var(--pos-d)]"
          style={{ "--pos-m": photo.mobilePosition, "--pos-d": photo.position } as React.CSSProperties}
        >
          <Media image={photo} variant="plain" sizes="100vw" priority className="h-full w-full" />
        </div>
      ) : (
        <Media
          image={data.background}
          variant="plain"
          sizes="100vw"
          priority
          className="absolute inset-0 -z-10 h-full w-full"
        />
      )}
      {/* scrim: keeps the copy readable whatever artwork lands back there. Over
          a photo it fades out toward the edges (or the right, beside the
          clips) so the picture still reads. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-1 ${
          !fallback
            ? "bg-white/72"
            : split
              ? "bg-page/85 lg:bg-[linear-gradient(90deg,rgba(248,248,249,0.95)_0%,rgba(248,248,249,0.88)_42%,rgba(248,248,249,0.35)_75%,rgba(248,248,249,0.15)_100%)]"
              : "bg-page/85 lg:bg-[radial-gradient(ellipse_46%_62%_at_50%_52%,rgba(248,248,249,0.95)_0%,rgba(248,248,249,0.86)_55%,rgba(248,248,249,0.35)_100%)]"
        }`}
      />

      <Container>
        {split && reels ? (
          // Beside the clips from lg: heading over copy on the left, the clips
          // spanning both rows on the right. On a phone they stack in source
          // order — heading, clips, then the copy and the buttons.
          <div className="grid items-center gap-y-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6">
            <div className="lg:col-start-1 lg:row-start-1 lg:self-end">{head}</div>
            <div
              className="rise min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <ReelSlider videos={reels} fit="column" />
            </div>
            <div className="lg:col-start-1 lg:row-start-2 lg:self-start">{rest}</div>
          </div>
        ) : (
          <>
            {head}
            {rest}
          </>
        )}
      </Container>
    </section>
  );
}
