# Voxitron: Claude Code Context File

## Project Overview

Voxitron is an **AI agent service agency** that sells three core products:

1. **Speed to Lead Agent**: texts back every missed call in under 60 seconds, 24/7, across SMS, WhatsApp, and email. Targets UK/US trades businesses (plumbing, electrical, HVAC, roofing, salons, clinics, contractors)
2. **Automated Quoting Agent**: collects job details and delivers a branded, professional quote automatically. Same UK/US trades audience as Speed to Lead
3. **WhatsApp Business Agent**: replies to customers, checks stock, books appointments, and takes orders inside WhatsApp, 24/7. Targets Nigerian retail and service businesses nationwide (fashion, food, electronics, salons), not restricted to any one city

This repository is the **Voxitron web platform**: marketing site plus lead capture and a
customer dashboard, being migrated from a 4-page static HTML site into a Next.js app. The
site has a homepage that introduces all three agents, and a dedicated page per agent
(`/speed-to-lead`, `/quoting-agent`, `/whatsapp-agent`) that goes deep on that one
product. The WhatsApp Business Agent's dedicated page carries Nigeria-specific detail
(Naira pricing, testimonials spread across Lagos, Abuja, Port Harcourt); the homepage's
teaser card for it stays general, matching how the other two agents' teaser cards work.

The WhatsApp Business Agent's CTA is different from the other two agents: instead of
routing to the lead form, every CTA on `/whatsapp-agent` (nav, hero, final `#cta`) is a
`wa.me` link so a visitor can message Voxitron's own WhatsApp Business number and see the
agent reply live. This is intentional, it's the most credible demo the product can offer.
Don't change these to a form or `mailto:`.

- **Domain:** `voxitron.com`
- **Contact:** `hello@voxitron.com`

### Migration in progress

This repo is being rebuilt from a static HTML/CSS/JS site into Next.js + Supabase, per
`MASTER_PROMPT.md` in this directory. **Read `MASTER_PROMPT.md` before starting or
resuming any migration work.** It is the source of truth for scope, sequencing, and the
"fully working, nothing half-done" bar every milestone must clear. This file (CLAUDE.md)
documents the target architecture, brand system, and content once the migration lands;
`MASTER_PROMPT.md` documents how to get there without leaving broken pieces behind.

The original static site (`index.html`, `speed-to-lead.html`, `quoting-agent.html`,
`whatsapp-agent.html`, `assets/`) remains in the repo as the content and design reference
until the Next.js app fully replaces it end to end. Do not delete it mid-migration.

---

## Target Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | CSS custom properties (same token system as today), ported into Next.js global CSS or Tailwind config, whichever `MASTER_PROMPT.md` has locked in. No component-level style duplication |
| Database | Supabase (Postgres) |
| Auth | Supabase Auth, for the customer dashboard |
| API | Next.js Route Handlers (`app/api/**/route.ts`), no separate PHP or Node backend |
| Fonts | Google Fonts: Inter (body/display, `--font-inter`) + JetBrains Mono (labels, numbers, kickers, `--font-jetbrains-mono`), loaded via `next/font` |
| Icons | Inline SVG, stroke-based, `currentColor` |
| Animations | Intersection Observer API (scroll fade-ins via `.reveal`), same behavior as today, reimplemented as a small client-side hook/component |
| Forms | Real lead-capture form(s) posting to a Route Handler, which writes to Supabase. The WhatsApp Business Agent page keeps its `wa.me` CTAs instead |
| Hosting | Vercel. Custom domain `voxitron.com` points here via DNS |

**No PHP.** No separate backend service. No Hostinger hPanel static upload flow. Those
are retired by this migration; do not reintroduce them.

The `remotion/` video-generation tool is unaffected by this migration: it remains a
one-time, never-deployed asset pipeline that produces `assets/video/whatsapp-demo.mp4`.
See "Video asset pipeline" below.

---

## File Structure (target, post-migration)

```
landing/
├── app/
│   ├── page.tsx                  # Homepage
│   ├── speed-to-lead/page.tsx
│   ├── quoting-agent/page.tsx
│   ├── whatsapp-agent/page.tsx
│   ├── login/page.tsx            # Supabase Auth login
│   ├── dashboard/page.tsx        # Authenticated customer dashboard (+ nested routes as needed)
│   ├── api/
│   │   └── leads/route.ts        # Lead-capture form submit handler -> Supabase
│   └── layout.tsx                # Shared <html>, fonts, nav/footer wrapper
├── components/
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── WaFloat.tsx                # WhatsApp floating widget
│   ├── Reveal.tsx                 # Intersection Observer scroll-reveal wrapper
│   └── ...section-level components shared across pages
├── lib/
│   └── supabase/                  # Supabase client(s), server + browser
├── styles/
│   └── globals.css                # Ported design-token system from the old main.css
├── assets/  (or app/**/*, per Next.js static asset convention)
│   ├── images/
│   └── video/
├── remotion/                      # Unchanged, still not part of the deployed app
├── CLAUDE.md                      # This file
└── MASTER_PROMPT.md               # Migration plan and completion bar
```

Shared chrome (nav, footer, WhatsApp floating widget) must be **components**, not copy-
pasted per page, that was the biggest structural weakness of the static version and is a
primary reason for this migration.

---

## Brand & Design System

### Identity
- **Brand name:** Voxitron
- **Tone:** Confident, direct, urgent. Speaks to a busy trade or service-business owner, not a tech buyer.
- **Visual direction: restrained blue on a light, cool-tinted canvas.** A light background
  system (`#F7F9FC` page canvas, `#EFF3F9` section alternation, `#FFFFFF` elevated cards)
  carries the page, with one accent blue (`#3860D6`) spent only on actionable elements:
  buttons, links, kickers, stat numbers, and the one inverted `#cta` band at the bottom of
  every page. The palette is light-first, not a dark theme with an accent swapped in.

### Colors
The single source of truth is the `:root` block at the top of `app/globals.css`. Do not
hand-copy these values elsewhere, reference the CSS custom properties instead.

```css
:root {
  /* Backgrounds: light, cool-tinted, not stark white */
  --bg-primary:   #F7F9FC;   /* page canvas */
  --bg-secondary: #EFF3F9;   /* section alternation (proof strip, testimonials) */
  --bg-elevated:  #FFFFFF;   /* cards: feature-item, ui-card, testimonial-card, footer */

  /* Accent: restrained blue, spent only on actionable elements */
  --accent:       #3860D6;
  --accent-ink:   #FFFFFF;   /* text/icons that sit ON the accent */
  --accent-light: rgba(36, 86, 229, 0.06);   /* tinted backgrounds: kickers, ui-msg-ai */
  --accent-glow:  rgba(36, 86, 229, 0.16);   /* focus rings */
  --accent-mid:   rgba(36, 86, 229, 0.22);   /* tinted borders */

  /* Text */
  --text-primary:   #0E1526;  /* near-black, cool tint */
  --text-secondary: #5A6B85;  /* muted slate, body copy */
  --text-muted:     #8C99AC;  /* micro copy, timestamps, placeholders */

  /* Borders */
  --border:     #E4E9F1;
  --border-mid: #D3DAE5;

  /* Secondary colour: quiet slate, used only for the step-number badges.
     Never let it compete with the accent blue. */
  --color-blue: #6B7BA8;
}
```

**Spend the accent carefully.** Blue appears on: the hero accent word, kickers/badges,
primary buttons, stat numbers, section-title accent words, and the one inverted `#cta`
band at the bottom of every page (blue background, white text/button: the single "flip"
moment on the page). It should not appear everywhere at once. The light canvas carries the
page; blue marks what matters.

**Text-on-accent rule.** Anything sitting on a `var(--accent)` background (buttons, nav
CTA, icon chips) uses `color: var(--accent-ink)` (white), for contrast against the blue.

### Typography
```css
--font-mono: var(--font-jetbrains-mono), 'Courier New', monospace;   /* kickers, labels, numbers, timestamps */
--font-body: var(--font-inter), 'Helvetica Neue', sans-serif;        /* headings, body, buttons */

--text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);
--text-sm:   clamp(0.85rem, 1.8vw, 0.875rem);
--text-base: clamp(1rem,    2vw,   1.0625rem);
--text-md:   clamp(1.1rem,  2.5vw, 1.25rem);
--text-lg:   clamp(1.4rem,  3vw,   1.75rem);
--text-xl:   clamp(2rem,    5vw,   3rem);
--text-2xl:  clamp(2.8rem,  7vw,   4.5rem);
--text-3xl:  clamp(3.2rem,  8vw,   5.5rem);
```
Fonts are Inter (body, `--font-inter`) and JetBrains Mono (labels/numbers, `--font-jetbrains-mono`),
loaded via `next/font` in `app/layout.tsx` and exposed as CSS variables that `--font-body`
and `--font-mono` wrap. Heading hierarchy per page: `.hero-title` for the one real page
`<h1>` on pages with a marketing hero, `.section-title` for every `<h2>` subsection, and
`.article-title` for blog post `<h1>`s. No page should have two `.hero-title`-sized
headings, and no subsection should out-rank the hero.

### Spacing
Token scale: `--space-1` (4px) through `--space-10` (128px), plus `--container` (640px,
the standard reading-column max-width), `--container-full` (1100px, wide grid/table
sections), and `--gutter` (`clamp(20px, 5vw, 56px)`, the horizontal page margin used on
every section wrapper). Always use the tokens, never a hardcoded pixel value for
margin/padding/gap in global styles.

**Standard section pattern.** Most sections follow: a wrapper (`<section id="...">` or a
`<Reveal as="section">`) with `padding: var(--space-9) var(--gutter)`, containing either
`.section-inner` (640px, centered, single-column content) or `.section-inner-wide` (1100px,
centered, for grids/tables). A wide section that still wants a narrow, centered
label/title/intro above its grid nests a `.section-inner-wide-header` (640px, centered)
inside the `.section-inner-wide` wrapper, rather than stretching the header across the
full 1100px. Grids collapse to `grid-template-columns: 1fr` below their breakpoint
(mobile-first CSS throughout: base rules are mobile, `@media (min-width: ...)` scales up).

**Fixed-nav clearance.** `.site-nav` is `height: 56px`, fixed to the top. Every page's
first section clears it with `padding-top: calc(56px + var(--space-9))` (the full
photo/mesh `#hero` used by the home page and the 7 product/industry pages) or the shorter
`.page-hero` class (`calc(56px + var(--space-9)) var(--gutter) var(--space-8)`, used by
pricing/compare/about/contact/tools/get-started/privacy, pages with no photo hero). Single-
section pages with nothing below the hero (404, the error boundary, privacy, get-started)
add the `.page-hero.is-full-page` modifier for a `--space-9` bottom instead of `--space-8`.

### Border Radius
Small and consistent: `4px` on buttons/inputs, `6px` on cards, `50%` on avatars/dots.
Nothing above 6px on rectangular elements. The site does not use large, soft "friendly SaaS" radii.

### Shadows
```css
--shadow-sm: 0 1px 2px rgba(14, 21, 38, 0.04), 0 0 0 1px rgba(14, 21, 38, 0.04);
--shadow-md: 0 8px 24px rgba(14, 21, 38, 0.08), 0 0 0 1px rgba(14, 21, 38, 0.05);
```
Light-theme shadows are minimal and tint-based (a soft ink-tinted shadow plus a hairline
border), not heavy black drop shadows, except the deliberate blue-tinted hover glow on
`.feature-item` and `.feature-icon` (a small, intentional exception) and the deeper shadow
under the hero `.ui-card` stack, which needs more separation from the photo behind it.

---

## Copywriting Standard

**Hit a pain point before you sell the fix.** The hero and "The Problem" section on every
page follow PAS: state the **P**roblem in one concrete moment, **A**gitate it with a
sensory, specific detail the reader has actually lived through, then let the product
**S**olve it in one short line. This is deliberate, not just brevity for its own sake:

- **Lead with emotion, follow with logic.** The headline should hit a nerve (a real,
  specific moment of loss), the subhead and body give the rational reason to believe the
  fix works. Don't put the rational case first.
- **Loss aversion beats gain framing.** "They called. No answer. Job's gone." lands harder
  than "Never miss another lead." A concrete loss already happening beats an abstract
  future benefit. Reuse this instinct anywhere a headline or final-CTA title is being
  written or revised.
- **Sensory specificity, not generic claims.** "Your hands are covered in grease and your
  phone's buzzing in your pocket" beats "You're busy and can't answer." Name the actual
  physical moment (up a ladder, mid-service, asleep at 1am), not an abstraction of it.
- **The agitation paragraph still obeys the brevity rules below** (1-2 sentences, max 2
  paragraphs). Visceral does not mean long.

**No blocks of text.** This is the most important brevity rule on this page and the one
most often broken. A landing page is scanned, not read.

- **Paragraphs: 1-2 short sentences.** If a section body paragraph runs past ~20 words,
  cut it. Say the one thing that matters and stop.
- **Never stack more than 2 paragraphs** in a single section body. If there's more to
  say, it belongs in a bullet list or a separate card, not a third paragraph.
- **Bullets over prose.** Feature/benefit detail goes in short bullet fragments, not
  sentences with three subordinate clauses.
- **Specific beats clever.** "Under 60 seconds" not "instantly." "20-minute setup" not
  "quick and easy." Concrete numbers do the persuading.
- **Benefit first, mechanism second.** Lead with what the business owner gets (the job,
  the lead, the quote sent), not how the system technically works.
- **Cut words that don't change the meaning if removed.** "Simply," "really," "very,"
  "in order to," "the fact that." None of them survive a copy pass here.
- **Headlines carry the page.** Five times as many people read the headline as the body.
  Spend the effort there; keep everything under it lean.
- **No em dashes, no decorative arrows.** Never use "—" or "→" anywhere on this site or
  in this file: not in copy, not in code comments, not in buttons. Use a period, comma,
  or colon instead, and drop arrows from buttons entirely ("Get Started", not
  "Get Started →"). This is a hard, zero-exception rule. See the global rule in
  `~/.claude/CLAUDE.md` for why.

---

## Page Structure

Each marketing page follows the same skeleton (see the original `index.html` for the
canonical order, until it's ported into `app/page.tsx`):

```
1. Nav            sticky, logo + 3 page links + "Get Started" CTA
2. Hero           kicker, headline (one accent word), 1-sentence subhead, CTA group, UI mockup (desktop)
3. Industry strip one-line list of industries served (homepage only)
4. Proof strip    3 short trust facts, pipe-separated
5. Stats          3 stat cards (number + <=12-word label + source)
6. The Problem    headline + 2 short paragraphs max, no CTA (let it sit)
7. Services       3 service cards linking to the dedicated agent pages (homepage), or
                   Features grid: 6 feature-item cards + 1 callout (agent pages)
8. How It Works   3 numbered steps, 1-sentence body each
9. Testimonials   3 short quotes (<=2 sentences), name + role
10. Offer/FAQ     offer bullets + 4 FAQ items, 1-2 sentence answers (homepage has offer bullets, agent pages have FAQ only)
11. Final CTA     the one inverted `#cta` band (accent blue bg), headline + CTA group
12. Footer        wordmark, credit, copyright, privacy, email
```

The homepage `.services-grid` renders 3 cards at `repeat(3, 1fr)` from `900px` up (matches
the `.testimonials-grid` breakpoint), single column below that.

Every section keeps an `id` for anchor links between pages (e.g. `/speed-to-lead` links
back to `/#services`). With real routing, cross-page anchor links become plain Next.js
`<Link href="/#services">`, not full-page reloads.

**WhatsApp floating widget**: a fixed circular button, bottom-right corner, present on
every page as a shared `<WaFloat />` component (not copy-pasted markup). Links to
`https://wa.me/2348120907050` with a prefilled greeting message. This is Voxitron's real
WhatsApp Business number, opens in a new tab. If the number ever changes, it now only
needs to change in one component file.

---

## Key Content

### Hero (homepage)
- **Kicker:** AI AGENTS FOR SERVICE BUSINESSES
- **Headline (PAS problem, 3 short lines):** They called. No answer. Job's gone.
- **Subhead (1 sentence, solution):** Voxitron texts them back and sends the quote while you're still mid-job.
- **CTA 1:** Get Started (opens the lead form / links to `mailto:hello@voxitron.com`, per whatever `MASTER_PROMPT.md` locks in for the conversion action)
- **CTA 2:** See all three agents (`#services`)

### Hero headline length rule (hard constraint)
Every hero `<h1>` line must be roughly **≤13 characters**. `.hero-title` uses `--text-3xl`
(up to 88px) inside a 560px-wide `.hero-content` column: past ~13 characters a line wraps
into two, the headline grows to 5+ lines, and on shorter screens the CTA buttons get
pushed below the fold entirely. This has broken in production before. When writing or
editing any hero headline, count characters per authored line before committing, and
verify with a real screenshot if unsure, don't just trust that it "looks short enough."
This constraint does not apply to `.section-title` elsewhere on the page (FAQ, final CTA,
etc.), those are much smaller and wrap harmlessly.

### Problem Stats (used consistently across all 3 pages)
1. **78%**: of customers hire the first business that responds (Harvard Business Review)
2. **7+ hrs**: average time a local business takes to respond to a new enquiry (InsideSales.com)
3. **80%**: drop in lead conversion after 5 minutes of not responding (Lead Response Management Study)

### Services (homepage `#services` section)

**01 · Speed to Lead Agent**, links to `/speed-to-lead`
- Responds to every missed call in under 60 seconds
- Qualifies the lead automatically, before you call back
- Books the appointment straight into your calendar
- Works across SMS, WhatsApp and email

**02 · Automated Quoting Agent**, links to `/quoting-agent`
- Builds a branded, professional quote in minutes
- Asks the right questions to get pricing right first time
- Delivers instantly by SMS and email
- Syncs with your CRM, so nothing falls through the cracks

**03 · WhatsApp Business Agent**, links to `/whatsapp-agent`
- Replies to every message in seconds, 24/7
- Checks stock and pricing in real time
- Books appointments and reservations in chat
- Takes orders and confirms sales

### WhatsApp Business Agent specifics (Nigeria-wide, not restricted to Lagos)
- Currency: Naira (`&#8358;`), not pounds
- Testimonials and locations: spread across Nigeria (Lagos, Abuja, Port Harcourt used
  today), not one city and not UK/US cities
- Stats are real, sourced from web research, not fabricated: 95%+ WhatsApp penetration in
  Nigeria (DataReportal), 67% prefer messaging over calls/email (Meta Business Messaging
  Report), 82% expect a reply within 24 hours (WhatsApp Business Platform)
- Hero visual: a phone-frame WhatsApp mockup (`.phone-frame`), not the `.ui-card` stack
  the other two agent pages use. The chat area plays a looping video, see "Video Asset
  Pipeline" below
- CTAs are `wa.me` links, not the lead form, see the note in Project Overview above

### How It Works
1. We audit your lead response (free)
2. We build and configure your agent (under 48 hours)
3. You start capturing every lead

### Conversion action

The static site used `mailto:hello@voxitron.com` for every CTA with no backend. This
migration adds a real lead-capture form (Speed to Lead and Quoting Agent pages, plus the
homepage) that posts to a Next.js Route Handler and writes to Supabase, so leads land in
a database Voxitron can actually work from instead of an inbox. The WhatsApp Business
Agent page is the deliberate exception and keeps its `wa.me` CTAs. Exact form fields and
whether `mailto:` stays as a secondary option are decided in `MASTER_PROMPT.md` /
during planning, not assumed.

---

## Customer Dashboard (new, part of this migration)

A logged-in area, gated by Supabase Auth, where a Voxitron customer can see activity for
their agent(s). Scope of what the dashboard actually displays (conversation logs, quotes
sent, lead volume, etc.) is defined in `MASTER_PROMPT.md` and should not be assumed here,
it depends on what data the agents themselves expose, which is a separate system from
this marketing/lead repo. Do not build dashboard UI for data that has no real source yet,
stub screens with fake numbers are exactly the kind of "looks done but isn't" output this
migration is trying to avoid.

The full screen-by-screen UI plan (routes, layout, what data each screen shows and why)
is in `DASHBOARD_UI.md`. Read it before building any dashboard route. It is a plan, not
yet-built code, same relationship `MASTER_PROMPT.md` has to the rest of the migration.

---

## Future Pages (Planned)

Each niche gets its own landing page, same design system, different copy, as a new route
under `app/`:

| Route | Niche |
|---|---|
| `/hvac` | HVAC companies |
| `/plumbing` | Plumbing businesses |
| `/roofing` | Roofing contractors |
| `/electrical` | Electricians |

These share the same layout, global styles, and components as the existing pages. Don't
duplicate section markup, extend the shared components.

---

## Video Asset Pipeline (whatsapp-agent hero)

The hero's phone-frame mockup (`.phone-frame`) shows a `<video>` of the WhatsApp
conversation animating in (`assets/video/whatsapp-demo.mp4`, ~600KB, autoplay, muted,
loop, playsinline), with `assets/images/whatsapp-demo-poster.png` as the poster. The
phone bezel, header bar, and input bar around it are plain CSS/markup, only the chat area
itself is video. This is unchanged by the Next.js migration other than moving the asset
into Next.js's static asset handling.

The video is generated with [Remotion](https://remotion.dev) (React-based video
rendering) from the source in `remotion/`. This is a one-time asset-generation step, not
part of the deployed app:

1. `cd remotion && npm install` (do this **outside** the `C:` drive if it's low on space,
   `@remotion/renderer` downloads a ~270MB headless Chromium into
   `node_modules/.remotion`, resolved relative to wherever `remotion/package.json` lives)
2. `npx remotion render src/index.jsx WhatsAppDemo out/whatsapp-demo.mp4 --codec=h264`
3. Copy the output into `assets/video/whatsapp-demo.mp4` (or the Next.js equivalent static path) in this repo
4. Optionally grab a poster frame: `npx remotion still src/index.jsx WhatsAppDemo out/poster.png --frame=230`, copy to `assets/images/whatsapp-demo-poster.png`

To change the conversation, edit `remotion/src/WhatsAppDemo.jsx` (message text, timing,
colours) and re-render. `remotion/node_modules` and `remotion/out` are gitignored, never
commit them, the repo only keeps the small `.jsx` source.

---

## Performance Rules

- No images over 200KB, compress everything (use `next/image` for automatic optimization)
- Lazy load any images below the fold
- Google Fonts loaded via `next/font` with `display: swap` to prevent layout shift
- Target Lighthouse score: 90+ on mobile
- Marketing pages should be statically generated (SSG) or ISR where possible, not
  needlessly server-rendered on every request. The dashboard (authenticated, per-user
  data) is the exception and is expected to be dynamic

---

## Coding Standards

- Semantic HTML inside JSX: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every section keeps an `id` for anchor/smooth-scroll navigation
- CSS custom properties for all colors, spacing, and typography. Never hardcode a hex value or an `rgba()` outside a token
- Mobile-first CSS: base styles for mobile, `@media (min-width: 768px)` for tablet/desktop
- Scroll animations use `Intersection Observer` via a shared `Reveal` component/hook, never a `scroll` event listener
- All external links open in `_blank` with `rel="noopener noreferrer"`
- TypeScript: no `any` used to paper over a type you haven't actually checked; prefer real types from Supabase codegen for DB rows
- Shared markup (nav, footer, WA float, section wrappers) lives in `components/`, never copy-pasted per page. This is a hard requirement of the migration, it's the main thing wrong with the current static site

---

## What Claude Should Never Do

- Do not use PHP, or stand up a separate backend service. All server logic is Next.js Route Handlers against Supabase
- Do not reintroduce the Hostinger hPanel static-upload deployment flow, this repo now deploys to Vercel
- Do not leave a page, route, or button in a state where it looks finished but doesn't work (dead links, forms that don't submit anywhere, "Coming soon" placeholders not asked for). See `MASTER_PROMPT.md`'s completion bar
- Do not copy-paste nav/footer/WA-float markup per page once componentized. One change, one file
- Do not change the accent colour or overall palette without being asked
- Do not write a section body paragraph longer than ~20 words, or stack more than 2 paragraphs in one block. See Copywriting Standard above
- Do not use placeholder lorem ipsum text, or fabricated dashboard data/stats. Always use real Voxitron copy consistent with the tone above, and real data or an honest empty state
- Do not hardcode a colour (hex or rgba) in global styles. Add or reuse a token in `:root` instead
- Do not use em dashes (—) or arrow characters (→) anywhere, ever. See Copywriting Standard above
- Do not delete the original static HTML site until `MASTER_PROMPT.md` says the Next.js app has fully replaced it
