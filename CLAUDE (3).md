# CLAUDE.md — Voxitron Coming Soon Page

## Project Overview

Build the **Voxitron** coming soon / waitlist landing page. This is a single-page,
conversion-focused site with one job: **collect email addresses from small business owners
who are losing revenue to missed calls.**

No product yet. No demo. No pricing table. Just a killer headline, visceral pain-point copy,
and an email capture form that converts.

**Market:** Small business owners globally — trades, home services, salons, clinics, restaurants.
Anyone who runs a phone-dependent business and misses calls.  
**Build:** Pure HTML + CSS + Vanilla JS — NO frameworks, NO build tools, NO npm  
**Hosting:** Hostinger (static file — upload and go)  
**Email capture:** Formspree (free tier) — `https://formspree.io/f/YOUR_FORM_ID`  
**WhatsApp:** `https://wa.me/YOUR_NUMBER`

---

## The One Job This Page Has

A plumber. A salon owner. A small clinic. Someone who runs their own business.

They've just missed a call. They know what that probably cost them.
They're Googling "never miss a call again" at 9pm on their phone.

This page appears. It reads their mind. They type their email. Done.

**One form. One submit. One win.**

Everything else — the copy, the design, the animations — exists only to get
that email address entered and submitted.

---

## Design Philosophy — "Focused Signal"

### The Visual Direction: **Clean Dark Urgency**

This page should feel like it was made by someone who is serious about the problem,
not someone trying to impress on Dribbble. Think: the moment before launch.
A countdown. A door that's about to open.

The reference feeling: a cockpit instrument panel at night. Everything that's visible
is there because it matters. Nothing decorative. No noise. Just the information
that tells you whether you're on course.

### The 8 Design Rules

**Rule 1 — One screen. One decision.**
The hero section should be visible without scrolling on any device. The headline,
the subtext, and the email form all fit above the fold. Scrolling reveals proof,
not more pitch.

**Rule 2 — The accent is electric teal.**
`#00E5CC` — appears only on: one word in the headline, the submit button,
the live counter dot, and the email input focus border. Nowhere else.
When teal appears, the eye goes there. That's by design.

**Rule 3 — Dark, but warm-dark.**
Background `#080B0A` — not pure black, not cold blue-black. Slightly warm-dark,
like a room lit by a single monitor. Secondary surfaces `#0F1412`.
This warmth makes the teal pop without feeling clinical.

**Rule 4 — Mono for data, sans for everything else.**
`DM Mono` for numbers, the counter, email placeholder, timestamps.
`DM Sans` for headlines, body copy, button labels.
Two fonts. That's it.

**Rule 5 — The headline does all the work.**
The H1 is enormous. It is the page. Everything else is support.
Make it so precise and specific that the reader feels personally addressed.

**Rule 6 — No cards. No columns. No grid.**
This is a single-column page. Hero → social proof strip → pain copy →
product explanation → email form again → footer. Linear. Focused.
Nothing to look at except the copy.

**Rule 7 — Breathing room earns trust.**
Generous padding. Let the headline breathe. Let the form float.
A page that isn't trying too hard communicates confidence.

**Rule 8 — Mobile is the primary canvas.**
Assume 60% of visitors are on a phone. The H1 is sized for a 390px screen first.
The form input and button are full-width. The submit button is 56px tall minimum.

---

## What NOT to Build

- ❌ `linear-gradient` with purple, blue-purple, or teal-to-purple blends
- ❌ Glassmorphism or `backdrop-filter: blur` on any card or form container
- ❌ Blob animations, floating orbs, morphing shapes
- ❌ `background-clip: text` gradient headlines
- ❌ `Inter`, `Space Grotesk`, `Plus Jakarta Sans`, `Poppins`, `Montserrat`
- ❌ Font Awesome or any icon font — use inline SVG or Unicode only
- ❌ Border-radius above 6px on rectangular elements
- ❌ Feature icons with title and 2-line description in a 3-column grid
- ❌ "innovative", "seamless", "cutting-edge", "revolutionize", "game-changer"
- ❌ A countdown timer (feels gimmicky unless you have a real launch date)
- ❌ Social proof avatars from UI Faces (fake-looking stock faces)
- ❌ The submit button saying "Subscribe" or "Sign Up" — use active copy instead
- ❌ Any animation that runs on load before the visitor has read the headline
- ❌ A nav bar with multiple links — this is a single-action page

---

## Design System

### Color Palette

```css
:root {
  /* Backgrounds */
  --bg-primary:     #080B0A;
  --bg-secondary:   #0F1412;
  --bg-elevated:    #141A18;

  /* The one accent — electric teal */
  --accent:         #00E5CC;
  --accent-dim:     rgba(0, 229, 204, 0.08);
  --accent-glow:    rgba(0, 229, 204, 0.15);

  /* Text */
  --text-primary:   #EDF2F0;
  --text-secondary: #637068;
  --text-muted:     #252E2B;

  /* Borders */
  --border:         #161E1C;
  --border-mid:     #1F2B28;

  /* Input */
  --input-bg:       #111916;
  --input-border:   #1F2B28;

  /* Noise */
  --noise-opacity:  0.025;
}
```

### Typography

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

:root {
  --font-mono: 'DM Mono', 'Courier New', monospace;
  --font-body: 'DM Sans', 'Helvetica Neue', sans-serif;
}
```

### Type Scale

```css
--text-xs:   clamp(0.7rem,  1.5vw, 0.75rem);
--text-sm:   clamp(0.85rem, 1.8vw, 0.875rem);
--text-base: clamp(1rem,    2vw,   1.0625rem);
--text-md:   clamp(1.1rem,  2.5vw, 1.25rem);
--text-lg:   clamp(1.4rem,  3vw,   1.75rem);
--text-xl:   clamp(2rem,    5vw,   3rem);
--text-2xl:  clamp(2.8rem,  7vw,   4.5rem);
--text-3xl:  clamp(3.5rem,  10vw,  6.5rem);
```

### Spacing

```css
--space-1:  4px;   --space-2:  8px;   --space-3:  12px;
--space-4:  16px;  --space-5:  24px;  --space-6:  32px;
--space-7:  48px;  --space-8:  64px;  --space-9:  96px;
--space-10: 128px;

--container:      640px;   /* Narrow — keeps focus */
--container-full: 1080px;
--gutter:         clamp(20px, 5vw, 48px);
```

---

## Animation Specifications

**These are the only animations. Add nothing else.**

### 1. Live Waitlist Counter Dot
Top of page: a teal dot pulses slowly next to `"847 people already waiting"`.
The number is hardcoded — update manually before launch.
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
.dot { animation: pulse 2s ease-in-out infinite; }
```

### 2. Scroll Reveal
Sections below the hero fade in on scroll with `IntersectionObserver`:
`opacity: 0 → 1` + `translateY(12px → 0)` over `0.45s ease-out`.
No stagger beyond 60ms between siblings.

### 3. Form Submit State
On submit: button text changes to `"You're on the list ✓"`, button background dims,
input clears. No page redirect. `fetch()` POST to Formspree. Show 500ms loading state first.

### 4. Input Focus Ring
On email input focus: `2px` teal border fades in with `transition: 0.2s ease`.
A faint teal glow `box-shadow: 0 0 0 4px var(--accent-glow)` appears outside the border.

### 5. Noise Texture
SVG `feTurbulence` noise filter on `body::before` at `--noise-opacity`.
Barely visible but makes the surface feel real, not flat.

---

## File Structure

```
voxitron/
├── index.html          ← Single page — everything lives here
├── assets/
│   ├── css/
│   │   └── main.css    ← All styles (single file is fine for this scope)
│   └── js/
│       └── main.js     ← Form handling, scroll reveal, dot pulse
```

**Build order:** `main.css` → `main.js` → `index.html`

---

## Page Architecture — Section by Section

---

### MINIMAL NAV

No links. No hamburger. Just:

```
LEFT:  VOXITRON   (DM Mono, --text-primary, 1rem, letter-spacing: 0.12em)
RIGHT: ● JOINING NOW   (dot in --accent, label in DM Mono, --text-secondary, 0.75rem)
```

Fixed top, `52px` tall. `bg: rgba(8, 11, 10, 0.85)`. `backdrop-filter: blur(8px)`.
(Exception: blur allowed on nav only — nowhere else on the page.)

The "JOINING NOW" indicator signals: *this is real, people are signing up right now.*

---

### HERO — Above the Fold

**id:** `#hero`  
**Layout:** Single column, centered on desktop, left-aligned on mobile.
Max-width `--container` (640px). Vertically centered in viewport (`100svh`).

**Top to bottom:**

```
KICKER (DM Mono, --text-secondary, --text-xs, letter-spacing: 0.15em, uppercase):
"COMING SOON"

H1 (DM Sans, 600, --text-3xl, --text-primary, line-height: 1.0, letter-spacing: -0.02em):
"You just missed
another call."

  → The word "another" is colored --accent (#00E5CC)

SUBTEXT (DM Sans, 300, --text-md, --text-secondary, line-height: 1.7, max-width: 480px):
"While you were busy running your business, someone called.
They didn't leave a voicemail.
They already called someone else."

FORM (32px below subtext):
[ your@email.com ] [ Get Early Access → ]

  Mobile:  stacked full-width — input on top, button below, 12px gap
  Desktop: flex-row — input fills remaining space, button fixed-width
  Input:   48px tall, --input-bg, 1px solid --input-border, DM Mono, --text-primary, 16px font-size
  Button:  48px tall, --accent background, #080B0A text (dark), DM Sans 600, border-radius: 4px

MICROCOPY (DM Mono, --text-xs, --text-muted, 10px margin-top):
"No spam. No pitches. First access when we launch."
```

**Background:** A faint dot-grid SVG at `1.5% opacity`. `20px` spacing. `1px` dots in `--text-muted`.
No gradient. No blob. The headline and the dark carry the page.

---

### PROOF STRIP

**Layout:** Full-width strip. `--bg-secondary`.
`border-top: 1px solid var(--border)`. `border-bottom: 1px solid var(--border)`.
`padding: 18px var(--gutter)`.

Three short facts. `DM Mono`, `--text-secondary`, `--text-sm`.
On mobile: stacked vertically, center-aligned. On desktop: horizontal flex, pipe-separated.

```
"● 847 on the waitlist"   |   "● Launching Q2 2026"   |   "● Free during beta"
```

The `●` dots are `--accent`. The `|` pipe separators are decorative spans with
`1px solid var(--border-mid)` rendered as `border-left`, `18px` tall, hidden on mobile.

---

### THE PAIN

**id:** `#pain`  
**Layout:** Single column, `--container` max-width, centered. No label. No section number. Just copy.
`padding: var(--space-9) var(--gutter)` top and bottom.

```
H2 (DM Sans, 500, --text-xl, --text-primary, line-height: 1.15, letter-spacing: -0.02em):
"Every missed call is a customer
who decided not to wait."

BODY (DM Sans, 300, --text-base, --text-secondary, line-height: 1.85):
They called because they needed something right now.
When you didn't answer, they didn't think "I'll try again later."
They found the next result and called them instead.

That's not bad luck. That's a broken system.
Your phone can't be your weakest link.
```

No CTA. No button. Let the pain sit.

---

### WHAT VOXITRON DOES

**id:** `#product`  
**Layout:** Single column, `--container` max-width, centered. Not cards. Prose + three punchy lines.

```
LABEL (DM Mono, --text-secondary, --text-xs, letter-spacing: 0.12em, uppercase):
"THE FIX"

H2 (DM Sans, 500, --text-lg, --text-primary, line-height: 1.3):
"Voxitron answers. Texts back.
Captures the lead. Automatically."

BODY (DM Sans, 300, --text-base, --text-secondary, line-height: 1.85):
When a call goes unanswered, Voxitron fires a personalised text message
to that number within seconds. Something human. Something specific to your business.
Not a robot. Not a voicemail. A real text that starts a real conversation.

You see the lead. You follow up when you're ready.
The customer never felt ignored.
```

Below the body — three punches, NOT a feature card grid:

```
→  Missed call detected. Text sent in under 15 seconds.
→  Your name, your tone, your words — not a template.
→  Works while you sleep, drive, or finish the job you're on.
```

Each line: `DM Sans, --text-base, --text-primary`. The `→` is `--accent`.
`16px` gap between lines. A `1px var(--border)` hairline above the block, `32px` of space above it.

---

### EMAIL CAPTURE — REPEATED

**id:** `#waitlist`  
**Layout:** Full-width section, `--bg-secondary`. `border-top: 1px solid var(--border)`.
Single column, centered, max-width `--container`. Generous padding.

```
H2 (DM Sans, 500, --text-xl, --text-primary, text-align: center, line-height: 1.15):
"Be first in line
when we launch."

SUBTEXT (DM Sans, 300, --text-base, --text-secondary, text-align: center, max-width: 420px):
"Early access members get 30 days free.
No credit card. No commitment. Just first."

FORM (centered, same structure as hero form):
[ your@email.com ] [ Get Early Access → ]

MICROCOPY (DM Mono, --text-xs, --text-muted, text-align: center, 10px margin-top):
"Join 847 small business owners already on the list."
```

---

### FOOTER

`border-top: 1px solid var(--border)`. `padding: 24px var(--gutter)`.
Single row on desktop (`space-between`), stacked centered on mobile.

```
LEFT:  VOXITRON   (DM Mono, --text-muted, --text-sm, letter-spacing: 0.12em)
       "A product by Digitalwebtonics"  (DM Sans 300, --text-xs, --text-muted)

RIGHT: © 2026 · Privacy Policy · hello@voxitron.com
       (DM Mono, --text-xs, --text-muted)
```

"Digitalwebtonics" links to `https://digitalwebtonics.com` — `target="_blank" rel="noopener"`.

---

## Copy Rules

**Write for someone who just missed a call 20 minutes ago.**

- Short sentences. Plain words. Real rhythm.
- Specific > vague: "under 15 seconds" not "instantly"
- Pain before solution — always
- Never: "streamline", "empower", "solution", "holistic", "leverage", "game-changer"
- The reader is busy, skeptical, not technically minded
- The copy earns the email. The form just collects it.

---

## Form Technical Implementation

```html
<form class="waitlist-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <input type="email" name="email" placeholder="your@email.com"
         required autocomplete="email" inputmode="email">
  <button type="submit">Get Early Access →</button>
</form>
```

```js
// Async submit — no page reload, inline success state
document.querySelectorAll('.waitlist-form').forEach(form => {
  const btn = form.querySelector('button');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      btn.textContent = "You're on the list ✓";
      btn.style.background = 'var(--bg-elevated)';
      btn.style.color = 'var(--accent)';
      form.querySelector('input').value = '';
    } else {
      btn.textContent = 'Try again →';
      btn.disabled = false;
    }
  });
});
```

Both forms share the class `waitlist-form`. The JS handles both instances automatically.

---

## SEO & Meta

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description"
  content="Voxitron — Never miss a customer call again. AI-powered missed call
  text-back for small businesses. Join the waitlist for early access.">
<meta property="og:title" content="Voxitron — You Just Missed Another Call.">
<meta property="og:description"
  content="When you can't answer, Voxitron texts back in seconds and captures the lead.
  Join the waitlist.">
<meta property="og:image" content="/assets/images/og-image.jpg">
<meta property="og:url" content="https://voxitron.com">
<link rel="canonical" href="https://voxitron.com">
<title>Voxitron — Never Miss a Customer Call Again</title>
```

---

## Performance & Accessibility

- No external JS (Google Fonts CSS only)
- `@media (prefers-reduced-motion: reduce)` disables all animations — wrap all keyframes
- All JS: `<script defer src="assets/js/main.js">`
- Submit button minimum `56px` tall touch target on mobile
- Focus styles: `2px solid var(--accent)` + `2px` outline-offset on all interactive elements
- Email input has a `<label>` (visually hidden if design requires: `clip-path: inset(100%)`)
- Color contrast: all body text minimum `4.5:1` against background
- Email input `font-size: 16px` minimum — prevents iOS auto-zoom on focus

---

## Technical Rules for Claude Code

- No CSS framework. No JS framework. No external dependencies except Google Fonts.
- Semantic HTML5: `<main>`, `<section>`, `<footer>`, `<form>`, `<button>`
- Single CSS file is appropriate — don't over-engineer a one-page site
- CSS custom properties for every color, size, and font — never hardcode values
- Mobile-first: base styles for 390px → `@media (min-width: 768px)` for desktop layout
- Comment every major section block in HTML and CSS clearly

---

## Pre-Launch Checklist

- [ ] Replace `YOUR_FORM_ID` in both Formspree `action` URLs
- [ ] Update waitlist count (`847`) to a real or believable number
- [ ] Update `"Launching Q2 2026"` to real timeline
- [ ] Test form submit on iOS — input must not trigger zoom (requires `font-size: 16px`)
- [ ] Test success state — no page reload, both form instances update inline
- [ ] Confirm dot-grid background is barely perceptible — `1.5% opacity maximum`
- [ ] Search CSS for `border-radius` — nothing above `6px` on non-pill elements
- [ ] Search CSS for `linear-gradient` — should appear 0 times (noise excepted)
- [ ] Confirm `--accent` teal appears in 5 places or fewer total across the page
- [ ] Lighthouse mobile score target: 95+

---

**The final check:**
Read the H1 and the first two sentences out loud.
Does it sound like something a real person wrote to another real person who just missed a call?
If it sounds like marketing copy — rewrite it.
If it sounds like someone who genuinely understands the problem — ship it.
