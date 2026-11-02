import { ImageResponse } from "next/og";
import { DEFAULT_OG_IMAGE } from "@/lib/site";

// The default link-preview card (WhatsApp, LinkedIn, X, Slack) for every page
// that doesn't bring its own image. Rendered once at build time.

export const alt = DEFAULT_OG_IMAGE.alt;
export const size = { width: DEFAULT_OG_IMAGE.width, height: DEFAULT_OG_IMAGE.height };
export const contentType = "image/png";

// ImageResponse can't read CSS custom properties, so these mirror the :root
// tokens in app/globals.css. Change them there first, then here.
const INK = "#0B1F2A"; // --ink
const PAPER = "#FBFAF6"; // --paper
const AMBER = "#E8890C"; // --amber
const PAPER_MUTED = "#9fb1b9"; // --paper-muted
const AMBER_GLOW = "rgba(232, 137, 12, 0.28)"; // --accent-glow, stronger for a dark card

const HEADLINE = ["Never leave a customer", "on read."];
const KICKER = "AI AGENTS FOR SERVICE BUSINESSES";
const SUB = "Every enquiry answered in under 60 seconds, day and night.";
const DOMAIN = "voxitron.com";

// Satori needs TTF/OTF, which Google Fonts serves when asked without a browser
// user agent. Subsetting to the exact text keeps each download tiny.
// The timeout stops a hung request from stalling the whole build.
async function googleFont(family: string, weight: 500 | 700, text: string) {
  try {
    const css = await (
      await fetch(
        `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:wght@${weight}&text=${encodeURIComponent(text)}`,
        { signal: AbortSignal.timeout(10_000) },
      )
    ).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    const data = await (await fetch(url, { signal: AbortSignal.timeout(10_000) })).arrayBuffer();
    return { name: family, data, weight, style: "normal" as const };
  } catch (err) {
    console.warn(`opengraph-image: couldn't load ${family}, using the fallback font`, err);
    return null;
  }
}

export default async function OpengraphImage() {
  const fonts = (
    await Promise.all([
      googleFont("Bricolage Grotesque", 700, HEADLINE.join(" ")),
      googleFont("Hanken Grotesk", 500, SUB),
      googleFont("Space Mono", 700, `VOXITRON${KICKER}${DOMAIN}`),
    ])
  ).filter((font): font is NonNullable<typeof font> => font !== null);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: INK,
          backgroundImage: `radial-gradient(circle at 92% 105%, ${AMBER_GLOW}, transparent 55%)`,
          color: PAPER,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontFamily: "Space Mono", fontSize: 30, letterSpacing: 6, color: PAPER }}>
            VOXITRON
          </span>
          <span style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: AMBER }} />
          <span style={{ fontFamily: "Space Mono", fontSize: 20, letterSpacing: 3, color: PAPER_MUTED }}>
            {KICKER}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{ fontFamily: "Bricolage Grotesque", fontSize: 84, lineHeight: 1.04, letterSpacing: -2 }}
          >
            {HEADLINE[0]}
          </span>
          <span
            style={{
              fontFamily: "Bricolage Grotesque",
              fontSize: 84,
              lineHeight: 1.04,
              letterSpacing: -2,
              color: AMBER,
            }}
          >
            {HEADLINE[1]}
          </span>
          <span style={{ fontFamily: "Hanken Grotesk", fontSize: 34, color: PAPER_MUTED, marginTop: 32 }}>
            {SUB}
          </span>
        </div>

        <span style={{ fontFamily: "Space Mono", fontSize: 24, color: PAPER_MUTED }}>{DOMAIN}</span>
      </div>
    ),
    // An empty list would fail the build, so fall back to next/og's bundled font.
    { ...size, fonts: fonts.length > 0 ? fonts : undefined },
  );
}
