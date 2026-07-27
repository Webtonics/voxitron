# Voxitron: Claude Code Context File

## Project Overview

Voxitron is an **AI agent service agency** that sells three core products:

1. **Speed to Lead Agent**: texts back every missed call in under 60 seconds, 24/7, across SMS, WhatsApp, and email. Targets UK/US trades businesses (plumbing, electrical, HVAC, roofing, salons, clinics, contractors)
2. **Automated Quoting Agent**: collects job details and delivers a branded, professional quote automatically. Same UK/US trades audience as Speed to Lead
3. **WhatsApp Business Agent**: replies to customers, checks stock, books appointments, and takes orders inside WhatsApp, 24/7. Targets Nigerian retail and service businesses nationwide (fashion, food, electronics, salons), not restricted to any one city

This repository is the **Voxitron marketing site**. Four static pages: a homepage that
introduces all three agents, and a dedicated page per agent (`speed-to-lead.html`,
`quoting-agent.html`, `whatsapp-agent.html`) that goes deep on that one product.
The WhatsApp Business Agent's dedicated page carries Nigeria-specific detail (Naira
pricing, testimonials spread across Lagos, Abuja, Port Harcourt); the homepage's teaser
card for it stays general, matching how the other two agents' teaser cards work.

The WhatsApp Business Agent's CTA is different from the other two agents: instead of a
`mailto:` link, every CTA on `whatsapp-agent.html` (nav, hero, final `#cta`) is a
`wa.me` link so a visitor can message Voxitron's own WhatsApp Business number and see the
agent reply live. This is intentional, it's the most credible demo the product can offer.
Don't change these back to `mailto:`.

- **Domain:** `voxitron.com`
- **Hosting:** Hostinger hPanel (shared hosting, no Node.js, no server-side rendering)
- **Output:** Static files only: HTML, CSS, vanilla JS
- **Contact:** `hello@voxitron.com` (every CTA on the site is a `mailto:` link; there is no backend, no form-processing service, no waitlist)

---

## Tech Stack

| Layer | Tech |
|---|---|
| Markup | HTML5 (semantic), one file per page |
| Styling | CSS3 custom properties, flexbox, grid. Single shared stylesheet, no frameworks |
| Scripting | Vanilla JavaScript (ES6+), no jQuery, no bundlers |
| Fonts | Google Fonts: DM Sans (body/display) + DM Mono (labels, numbers, kickers) |
| Icons | Inline SVG, stroke-based, `currentColor` |
| Animations | Intersection Observer API (scroll fade-ins via `.reveal`) |
| Forms | None. Every conversion action is a `mailto:hello@voxitron.com` button |
| Deployment | Upload directly to hPanel File Manager, into `public_html/` |

**No build tools. No npm. No frameworks. Everything must work as raw static files.**
The one exception is `remotion/`, a one-time video-generation tool used to produce
`assets/video/whatsapp-demo.mp4`. It is never installed, run, or referenced by the
deployed site itself, the site only ships the resulting static `.mp4`. See "Video asset
pipeline" below before touching it.

---

## File Structure

```
landing/
├── index.html            # Homepage: hero, problem, all three services, how it works, proof, FAQ
├── speed-to-lead.html     # Dedicated page for the Speed to Lead Agent
├── quoting-agent.html     # Dedicated page for the Automated Quoting Agent
├── whatsapp-agent.html    # Dedicated page for the WhatsApp Business Agent (Nigeria-targeted)
├── assets/
│   ├── css/main.css       # Single shared stylesheet, all 4 pages import this
│   ├── js/main.js         # Scroll-reveal only
│   ├── images/            # og-image, logo, whatsapp-demo-poster.png
│   └── video/             # whatsapp-demo.mp4 (see "Video asset pipeline" below)
├── remotion/               # Source for whatsapp-demo.mp4, NOT part of the deployed site
│   ├── package.json
│   └── src/                # Root.jsx, WhatsAppDemo.jsx, index.jsx
└── CLAUDE.md               # This file
```

All four HTML pages share `assets/css/main.css` and `assets/js/main.js`. Any new page
(a future niche landing page, for example) should do the same. Don't fork the stylesheet
or duplicate inline styles.

---

## Brand & Design System

### Identity
- **Brand name:** Voxitron
- **Tone:** Confident, direct, urgent. Speaks to a busy trade or service-business owner, not a tech buyer.
- **Visual direction: Electric Lime on Navy.** A deep navy-black ground with one bold,
  high-voltage lime accent. Chosen deliberately over a generic "safe SaaS teal": the accent
  should be unmistakable and used sparingly so it keeps its punch (see "Spend the accent
  carefully" below).

### Colors
```css
:root {
  /* Backgrounds */
  --bg-primary:   #0B0F19;   /* deep navy-black, page background, hero */
  --bg-secondary: #121A2B;   /* section alternation (proof strip, testimonials) */
  --bg-elevated:  #161F33;   /* cards: feature-item, ui-card, testimonial-card, footer */

  /* Accent: electric lime, the one bold move on the page */
  --accent:       #CFFF3D;
  --accent-ink:   #0B0F19;   /* dark text/icons that sit ON the accent (never white-on-lime) */
  --accent-light: rgba(207, 255, 61, 0.07);   /* tinted backgrounds: kickers, ui-msg-ai */
  --accent-glow:  rgba(207, 255, 61, 0.18);   /* focus rings */
  --accent-mid:   rgba(207, 255, 61, 0.26);   /* tinted borders */

  /* Text */
  --text-primary:   #EDF1F8;  /* near-white, cool tint */
  --text-secondary: #9AA3B8;  /* muted slate, body copy on dark */
  --text-muted:     #7480A0;  /* micro copy, timestamps, placeholders */

  /* Borders */
  --border:     #1E2536;
  --border-mid: #2B3450;

  /* Secondary colour: quiet periwinkle, used only for the step-number badges.
     Never let it compete with the lime. */
  --color-blue: #8FA6FF;
}
```

**Spend the accent carefully.** Lime appears on: the hero accent word, kickers/badges,
primary buttons, stat numbers, section-title accent words, and the one inverted `#cta`
band at the bottom of every page (lime background, navy text/button: the single "flip"
moment on the page). It should not appear everywhere at once. The navy carries the page;
lime marks what matters.

**Text-on-accent rule.** Anything sitting on a `var(--accent)` background (buttons, nav
CTA, icon chips) uses `color: var(--accent-ink)`, never white. Lime is too light for
white text to read against it.

### Typography
```css
--font-mono: 'DM Mono', 'Courier New', monospace;   /* kickers, labels, numbers, timestamps */
--font-body: 'DM Sans', 'Helvetica Neue', sans-serif; /* headings, body, buttons */

--text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);
--text-sm:   clamp(0.85rem, 1.8vw, 0.875rem);
--text-base: clamp(1rem,    2vw,   1.0625rem);
--text-md:   clamp(1.1rem,  2.5vw, 1.25rem);
--text-lg:   clamp(1.4rem,  3vw,   1.75rem);
--text-xl:   clamp(2rem,    5vw,   3rem);
--text-2xl:  clamp(2.8rem,  7vw,   4.5rem);
--text-3xl:  clamp(3.2rem,  8vw,   5.5rem);
```

### Spacing
Token scale in `main.css`: `--space-1` (4px) through `--space-10` (128px). Always use the
tokens, never a hardcoded pixel value for margin/padding/gap.

### Border Radius
Small and consistent: `4px` on buttons/inputs, `6px` on cards, `50%` on avatars/dots.
Nothing above 6px on rectangular elements. The site does not use large, soft "friendly SaaS" radii.

### Shadows
```css
--shadow-sm: 0 1px 4px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.03);
--shadow-md: 0 10px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.04);
```
Dark-theme shadows are black-based, not colour-tinted, except the deliberate lime-tinted
hover glow on `.feature-item` and `.feature-icon` (a small, intentional exception).

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

- **Paragraphs: 1-2 short sentences.** If a `<p>` inside `.section-body`, `.feature-body`,
  `.service-body`, `.step-body`, `.callout-body`, or `.faq-body` runs past ~20 words,
  cut it. Say the one thing that matters and stop.
- **Never stack more than 2 paragraphs** in a single `.section-body`. If there's more to
  say, it belongs in a bullet list (`.service-list`, `.offer-list`) or a separate card,
  not a third paragraph.
- **Bullets over prose.** Feature/benefit detail goes in short bullet fragments (see
  `.service-list` on the homepage), not sentences with three subordinate clauses.
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

Each page follows the same skeleton (see `index.html` for the canonical order):

```
1. Nav            sticky, logo + 3 page links + "Get Started" mailto CTA
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
11. Final CTA     the one inverted `#cta` band (lime bg), headline + CTA group
12. Footer        wordmark, credit, copyright, privacy, email
```

The homepage `.services-grid` renders 3 cards at `repeat(3, 1fr)` from `900px` up (matches
the `.testimonials-grid` breakpoint), single column below that.

Every section has an `id` for anchor links between pages (e.g. `speed-to-lead.html`
links back to `/#services`).

**WhatsApp floating widget** (`.wa-float`): a fixed circular button, bottom-right corner,
present on all 4 pages right before the closing `</body>`. Links to
`https://wa.me/2348120907050` with a prefilled greeting message. This is Voxitron's real
WhatsApp Business number, opens in a new tab. Keep this markup identical across all pages,
if the number ever changes, update it in all 4 files (there's no shared include on a
static site).

---

## Key Content

### Hero (homepage)
- **Kicker:** AI AGENTS FOR SERVICE BUSINESSES
- **Headline (PAS problem, 3 short lines):** They called. No answer. Job's gone.
- **Subhead (1 sentence, solution):** Voxitron texts them back and sends the quote while you're still mid-job.
- **CTA 1:** Get Started (`mailto:hello@voxitron.com`)
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

**01 · Speed to Lead Agent**, links to `speed-to-lead.html`
- Responds to every missed call in under 60 seconds
- Qualifies the lead automatically, before you call back
- Books the appointment straight into your calendar
- Works across SMS, WhatsApp and email

**02 · Automated Quoting Agent**, links to `quoting-agent.html`
- Builds a branded, professional quote in minutes
- Asks the right questions to get pricing right first time
- Delivers instantly by SMS and email
- Syncs with your CRM, so nothing falls through the cracks

**03 · WhatsApp Business Agent**, links to `whatsapp-agent.html`
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
- CTAs are `wa.me` links, not `mailto:`, see the note in Project Overview above

### How It Works
1. We audit your lead response (free)
2. We build and configure your agent (under 48 hours)
3. You start capturing every lead

### Conversion action
There is no lead-capture form. Every CTA (`nav-cta`, hero, final `#cta` band) is a
`.btn.btn-primary` linking to `mailto:hello@voxitron.com`. Do not reintroduce an email
waitlist form, Formspree, or any other backend-dependent input. This is a fully static
site with zero backend by design.

---

## Deployment: Hostinger hPanel

1. Log in to hPanel, open File Manager
2. Navigate to `public_html/`
3. Upload `index.html`, `speed-to-lead.html`, `quoting-agent.html`, `whatsapp-agent.html`, and the `assets/` folder
4. Ensure `index.html` is at the root: `public_html/index.html`
5. No `.htaccess` changes needed for a static site
6. Clear browser cache after upload to verify the latest version

**Do not put files in subdirectories unless intentional.** The domain root must serve `index.html`.

---

## Future Pages (Planned, Separate HTML Files)

Each niche gets its own landing page, same design system, different copy:

| File | Niche |
|---|---|
| `hvac.html` | HVAC companies |
| `plumbing.html` | Plumbing businesses |
| `roofing.html` | Roofing contractors |
| `electrical.html` | Electricians |

These share `assets/css/main.css` and `assets/js/main.js`. Don't duplicate inline styles.

---

## Video Asset Pipeline (whatsapp-agent.html hero)

The hero's phone-frame mockup (`.phone-frame` in `main.css`) shows a `<video>` of the
WhatsApp conversation animating in (`assets/video/whatsapp-demo.mp4`, ~600KB, autoplay,
muted, loop, playsinline), with `assets/images/whatsapp-demo-poster.png` as the poster.
The phone bezel, header bar, and input bar around it are plain CSS, only the chat area
itself is video.

The video is generated with [Remotion](https://remotion.dev) (React-based video
rendering) from the source in `remotion/`. This is a one-time asset-generation step, not
part of the deployed site:

1. `cd remotion && npm install` (do this **outside** the `C:` drive if it's low on space,
   `@remotion/renderer` downloads a ~270MB headless Chromium into
   `node_modules/.remotion`, resolved relative to wherever `remotion/package.json` lives)
2. `npx remotion render src/index.jsx WhatsAppDemo out/whatsapp-demo.mp4 --codec=h264`
3. Copy the output into `assets/video/whatsapp-demo.mp4` in this repo
4. Optionally grab a poster frame: `npx remotion still src/index.jsx WhatsAppDemo out/poster.png --frame=230`, copy to `assets/images/whatsapp-demo-poster.png`

To change the conversation, edit `remotion/src/WhatsAppDemo.jsx` (message text, timing,
colours) and re-render. `remotion/node_modules` and `remotion/out` are gitignored, never
commit them, the repo only keeps the small `.jsx` source.

---

## Performance Rules

- No images over 200KB, compress everything
- Lazy load any images below the fold (`loading="lazy"`)
- Google Fonts loaded with `display=swap` to prevent layout shift
- No render-blocking scripts: `<script defer>` before `</body>`
- Target Lighthouse score: 90+ on mobile
- Page must be usable with JavaScript disabled (the site has no forms to degrade; nav and CTAs are plain links)

---

## Coding Standards

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every section has an `id` for anchor/smooth-scroll navigation
- CSS custom properties for all colors, spacing, and typography. Never hardcode a hex value or an `rgba()` outside a token
- Mobile-first CSS: base styles for mobile, `@media (min-width: 768px)` for tablet/desktop
- Scroll animations use `Intersection Observer` via the shared `.reveal` class, never a `scroll` event listener
- All external links open in `_blank` with `rel="noopener noreferrer"`

---

## What Claude Should Never Do

- Do not install npm packages or suggest a build process for the deployed site itself.
  `remotion/` is the sole, deliberate exception (see Video Asset Pipeline), and even that
  never ships, only its rendered `.mp4` output does
- Do not use React, Vue, Tailwind, or any CSS framework in the site's own HTML/CSS/JS
- Do not add backend code, a form-processing service (Formspree etc.), or any kind of waitlist/email-capture form. This is a static site with `mailto:` CTAs only
- Do not use `localStorage` or `sessionStorage`
- Do not add cookie banners unless explicitly asked
- Do not change the accent colour or overall palette without being asked
- Do not write a `.section-body`, `.feature-body`, or similar paragraph longer than ~20 words, or stack more than 2 paragraphs in one block. See Copywriting Standard above
- Do not use placeholder lorem ipsum text. Always use real Voxitron copy consistent with the tone above
- Do not hardcode a colour (hex or rgba) in `main.css`. Add or reuse a token in `:root` instead
- Do not use em dashes (—) or arrow characters (→) anywhere, ever. See Copywriting Standard above
