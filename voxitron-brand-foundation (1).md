# Voxitron Brand Foundation

**The source of truth for every design decision.** Feed this to Claude, Claude Code, or Bolt at the start of any UI/copy task. If a choice isn't in here, it gets decided here first — not improvised per page. This is what stops the output from looking generic.

Locked: 2026-08-28. Supersedes the "Electric Lime on Navy" spec and the drifted light-blue live palette. One direction, locked.

---

## 1. Positioning (the one sentence everything serves)

**Free answers messages. Voxitron turns messages into bookings.**

Audience: single-owner Lagos diagnostic-centre operators (secondary: real estate agencies). Non-technical, trust-sensitive, WhatsApp-native, too busy to configure anything. A wrong answer costs them real reputation.

The page's job: convince a busy operator that this reliably converts WhatsApp enquiries into bookings **without them lifting a finger**, and that it's safe with patient data.

---

## 2. Personality

**Is:** Direct. Local. Fast. Trustworthy. Quietly technical (the competence shows, it doesn't shout).

**Is not:** Hypey. "Revolutionary." Generic-startup. Cutesy chatbot. Corporate-cold. Silicon-Valley-transplanted.

Litmus test: would a busy 45-year-old Lagos lab owner trust this with their patients' bookings? If a design or line feels like it's aimed at a VC or a US SaaS buyer, it's wrong.

---

## 3. Color

Chosen to dodge all three current AI-default palettes (cream+serif+terracotta, near-black+acid-green, hairline-broadsheet). The system maps to the three parties in every chat: **trust (you), warmth (your customer), calm (the agent).**

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0B1F2A` | Base text, dark sections. Teal-tinted near-black — depth + trust, never pure `#000`. |
| `--paper` | `#FBFAF6` | Primary background. Warm near-white, NOT the `#F4F1EA` AI cream. |
| `--amber` | `#E8890C` | **Primary action + signature.** CTAs, the "replied" tick, key emphasis. Lagos-sun warmth. This is the color people remember. |
| `--amber-press` | `#C9740A` | Hover/pressed state for amber. |
| `--teal` | `#0E7C6B` | Trust / links / secondary. Clinical-confident, medical-adjacent. |
| `--mint` | `#D9F2EA` | Agent reply-bubble tint. Very light, used only for "the machine's" surfaces. |
| `--line` | `#E7E3DA` | Borders/dividers on paper. Warm, low-contrast. |
| `--muted` | `#5B6B72` | Secondary text on paper. |

**Rules**
- Amber is a scalpel, not a bucket. One primary amber action per viewport. If everything's amber, nothing is.
- Never use WhatsApp green (`#25D366`) as a brand color. It's the category default — every clone uses it. WhatsApp green appears ONLY inside a literal WhatsApp-UI mock, never as your brand.
- Dark sections use `--ink` bg with `--paper` text and amber accents. Don't invent new darks per section.
- Contrast floor: body text ≥ 4.5:1. `--muted` on `--paper` passes; don't go lighter.

```css
:root {
  --ink: #0B1F2A;
  --paper: #FBFAF6;
  --amber: #E8890C;
  --amber-press: #C9740A;
  --teal: #0E7C6B;
  --mint: #D9F2EA;
  --line: #E7E3DA;
  --muted: #5B6B72;
}
```

---

## 4. Typography

The display face carries the personality; the body face stays quiet and legible; a mono face does the "instant/technical" work (timestamps, stat figures, the ✓✓). All three are free on Google Fonts.

| Role | Face | Use |
|---|---|---|
| Display | **Bricolage Grotesque** | Headlines, section titles. Characterful, current, not the default Inter/Space Grotesque. Weights 600–800. |
| Body | **Hanken Grotesk** | All running text, UI. Warmer and less ubiquitous than Inter. Weights 400/500/600. |
| Data/Mono | **Space Mono** or **Geist Mono** | Timestamps, stat numbers, the ✓✓ tick, "in seconds". The signature's voice. |

**Type scale** (clamp for fluid): 
- Display XL `clamp(2.5rem, 6vw, 4.5rem)` / 1.05 / weight 800 / letter-spacing -0.02em
- H2 `clamp(1.75rem, 3.5vw, 2.75rem)` / 1.1 / 700
- H3 `1.25rem` / 1.3 / 600
- Body `1.0625rem` / 1.6 / 400
- Small/label `0.8125rem` / 1.4 / 500

**Rules**
- Eyebrows are a system element, not decoration. Use one only where it adds orientation the headline doesn't already give (positioning, a setup line). Never one on *every* section, and never redundant with the headline below it. Rule of thumb: 3-4 on a long homepage, not 7. Overuse (a generic ALL-CAPS label on every block) is a top AI tell.
- No headline line-break gimmicks ("Never leave  a customer  on read." with manual spaces). Let it wrap naturally.
- Numbers in stats and timestamps are always mono. That's what makes "01:04 ✓✓" feel real.

---

## 5. Spacing, layout, shape

- **Space scale** (px): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Section vertical padding: 96 desktop / 64 mobile.
- **Grid**: max content width 1200px. Break the symmetry — not every section is a centered even grid. Alternate: full-bleed, asymmetric 60/40, offset.
- **Radius**: `--r-sm: 8px`, `--r-md: 14px`, `--r-lg: 22px`. Chat bubbles use `--r-lg` with one squared corner (the "tail" side), like a real message.
- **Borders**: 1px `--line` on paper. Avoid heavy shadows; prefer a hairline + subtle warm shadow `0 1px 2px rgba(11,31,42,.06)`.
- **Break the even-grid habit**: the "six features" and "four industries" blocks should NOT be identical symmetric card grids. Vary card size by importance, or make one a wide feature and the rest small.

---

## 6. The signature element — "Replied."

The one memorable device, reused deliberately so the site has a spine:

> A chat line with a **mono timestamp** and a **double-tick `✓✓` that is `--amber`** — showing message-received and replied at the *same* timestamp. The gap is zero. That's the whole product in one glyph.

Where it appears:
- **Hero**: a live-feeling message thread where the reply lands instantly, tick flips to amber on load (one orchestrated motion moment).
- **Stats**: figures set in mono, e.g. reply time rendered as `00:03` not "3 seconds".
- **How-it-works**: each step timestamped.
- **Footer/CTA**: "Message us — replied `✓✓` before you finish reading this."

Everything else stays quiet so this lands. Spend the boldness here and nowhere else.

---

## 7. Motion

Restrained. One orchestrated moment (the hero reply + tick flip). Elsewhere: subtle hover lifts, scroll reveals that default to *visible* (never invisible-on-slow-connection — that bug already bit you). Respect `prefers-reduced-motion`. Extra animation reads as AI; less is more.

---

## 8. Imagery — the proof problem

This is where "looks AI" actually lives. Rules:

- **No generic stock photos of people at laptops/phones.** They're the #1 tell. Remove the Unsplash "pain scene" images or replace with real Voxitron material.
- **Show the real product.** The agent is live end-to-end. Capture real (anonymised) WhatsApp threads and a real dashboard/n8n view. One genuine product screenshot beats any illustration.
- **Honest placeholders only, and few.** A labelled "coming soon" box is better than fake proof — but every one is a hole where trust should be. Prioritise closing them with real captures.
- When you have a first customer: named testimonial + face + centre name + role. Until then, don't fake it — but do add every *true* trust signal you have (Meta tech built-on, NDPA stance, founder names/photos, "built in Lagos").

---

## 9. Voice & copy (anti-AI)

- Nigerian-plain. Short sentences. Active voice. Say what it does, don't sell the doing of it.
- Mirror how customers actually message. Pidgin anchors where natural (*how far*, *abeg*, *wetin*) — but never forced.
- **No em dashes, no arrows** (existing house rule — keep it).
- No "revolutionary / seamless / cutting-edge / unlock / elevate / supercharge." Ban the AI-copy vocabulary.
- Specific > clever. "Booked a 9am scan at 1:04am" beats "24/7 automation."
- Buttons say the exact action and keep the name through the flow: "Chat on WhatsApp" → not "Get started" then "Submit".
- CTAs consistent site-wide: primary = **Chat on WhatsApp** (amber), secondary = **See it reply** / **Book a call** (teal outline).

---

## 10. Anti-AI checklist (run before shipping any page)

- [ ] No generic stock photos of people.
- [ ] Real product shown somewhere above the fold-ish, or an honest labelled placeholder.
- [ ] ALL-CAPS eyebrows used ≤ 2 times on the page.
- [ ] Not every section is a centered even card grid — at least one asymmetric/full-bleed break.
- [ ] The "Replied." signature appears at least twice.
- [ ] No WhatsApp green as a brand color.
- [ ] Palette is only the tokens above — no invented per-section colors.
- [ ] Numbers/timestamps are mono.
- [ ] No banned copy vocabulary; no em dashes/arrows.
- [ ] One primary amber action per viewport.
- [ ] Section order is NOT the default Problem→BeforeAfter→6features→3steps→4industries→FAQ spine. Reorder or merge at least two.

---

## 11. How to use this

Paste sections 3–10 into any UI/copy prompt as "the brand system — follow it exactly." For code work, drop the CSS block into your token file / `globals.css` and make Claude Code derive from it. Update this file (not individual pages) when the brand evolves — one source of truth prevents the drift that produced three different palettes.

**Two calls you can flip in one line if you disagree:**
1. Accent = warm **amber** (energy/differentiation). Flip to clinical **teal-primary** if you want to lean harder on medical-trust over warmth.
2. Display = **Bricolage Grotesque**. Say the word for a more neutral (Hanken-only) or more editorial (serif display) alternative.
