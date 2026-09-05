# Voxitron Dashboard — Design & Build Prompt

> How to use this: run `/design:design-system extend voxitron customer dashboard` and paste the brief below, to get the documented component system. OR paste the whole brief into Claude Code (or a fresh Claude session with the repo) to build the actual screens. Feed it alongside `voxitron-brand-foundation.md` — that file is the source of truth; this brief tells you what to apply it to.

---

## Your job

Extend Voxitron's existing brand/design system to its **customer dashboard**, and produce a polished, buildable UI. The dashboard currently applies almost none of the brand identity, so it looks bland and unfinished next to the marketing site. Fix that: make the dashboard look like it was built by the same team, using the same system, as the homepage. Do not invent a new look. Do not produce a generic grey-on-white admin panel.

## Product context (read before designing)

- **Voxitron** is a done-for-you WhatsApp AI agent for Lagos SMBs. A busy, non-technical owner pays Voxitron to set up and run an AI agent on their existing WhatsApp number. The agent replies in seconds, answers prices, books appointments, understands voice notes and photos, and escalates to a human when needed.
- **Primary customer (ICP):** single-owner Lagos diagnostic-centre operators. Non-technical, trust-sensitive, busy. Secondary: real estate.
- **This dashboard is the CUSTOMER's window into their live agent.** Decision: design it **customer-facing and read-mostly** — they log in to *watch conversations, catch escalations, see results, view what the agent knows, and adjust a few settings*. They do NOT configure the agent from scratch, run campaigns, or manage billing here. (If building the Voxitron internal ops view instead, say so — that is a different, denser design with a tenant switcher. Default is the customer view.)
- **Business model is service-led:** Voxitron connects each WhatsApp number manually today (self-serve provisioning is a future phase). So the dashboard is a window on a managed service, not a self-serve control panel.

## The signature — the one thing that makes it feel like Voxitron

The whole brand centres on **"Replied."** — the instant a message gets answered. Carry it into the product everywhere numbers or messages appear:
- **Mono timestamps** on every message (Space Mono), e.g. `01:04`.
- **Amber double-tick `✓✓`** on agent replies (colour `--amber`), the "replied" mark.
- **Mint-tinted bubbles** for the agent's own messages; plain bordered bubbles for the customer.
- Stat/metric figures always in **mono**, e.g. reply time as `00:03`, not "3 seconds".
If the dashboard doesn't show these, it isn't on-brand.

## Design tokens (use these, never hardcode)

```css
--ink:#0B1F2A;        /* base text, dark surfaces (teal-tinted near-black) */
--ink-2:#123040;      /* raised dark surface */
--paper:#FBFAF6;      /* primary background (warm off-white) */
--amber:#E8890C;      /* primary action + the ✓✓ signature */
--amber-press:#C9740A;/* amber hover/pressed */
--teal:#0E7C6B;       /* trust / links / secondary */
--mint:#D9F2EA;       /* agent reply-bubble tint only */
--line:#E7E3DA;       /* borders/dividers on paper */
--muted:#5B6B72;      /* secondary text */
--r-sm:8px; --r-md:14px; --r-lg:22px;
--shadow:0 1px 2px rgba(11,31,42,.06), 0 12px 30px -18px rgba(11,31,42,.25);
```
Type: **Bricolage Grotesque** (display/headings 600–800), **Hanken Grotesk** (body/UI 400–600), **Space Mono** (timestamps, stat figures, the ✓✓). Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64. Radius as above. Prefer a hairline + soft warm shadow over heavy shadows.

## Why the current dashboard feels "less" (fix each)

1. Everything is one flat weight — same background, hairline borders, one text colour, no depth. Give surfaces **real hierarchy**: cards with soft elevation on a slightly deeper paper tone so the list and thread lift off the background.
2. Empty space isn't composed — it reads unfinished. Compose the layout so the eye has a clear primary zone.
3. Stats are naked digits. Rebuild them as proper **metric cards** (mono number, small icon, amber accent, label).
4. The signature is absent. Bring `✓✓`, mono timestamps, and mint agent bubbles into the product.

## Screens & components to design

**App shell**
- Left sidebar: Voxitron wordmark, the tenant/business name, nav (Inbox · Knowledge Base · Settings), sign out pinned bottom. Give it weight and a clear active state so 3 items still feel intentional, not sparse.
- Main content area to the right.

**Inbox (primary screen)**
- Conversation list: cards with avatar (initials), name, last-message snippet, mono time, and badges — a `NEEDS YOU` amber badge for escalations, small icons for voice note / photo. Active row clearly marked.
- Thread view: message bubbles. Customer = plain bordered bubble left. Agent = mint bubble right with mono timestamp + amber `✓✓`. Include the **voice-note-transcribed** treatment (a small "Transcribed" caption under a voice bubble) and the **photo-read** treatment (a "Photo read: …" caption), since those are Voxitron's differentiators. A footer bar: "AI is handling this chat" with a **Take over** button.

**Results / usage strip (top of Inbox or its own row)**
- Replace the two bland zeroes with 4 metric cards that prove value, not vanity: **Conversations handled**, **Messages the AI answered**, **Bookings / leads captured**, **Average reply time** (`00:03`). Optionally an escalations count. Mono figures, brand styling.

**Empty states (critical — every real customer sees this on day one)**
Zero-data must look **designed, not broken**. Never fake data. Design:
- A "you're live" confirmation: "Your agent is live on +234… and watching for messages, day and night."
- A "send a test message to see it reply" nudge (so they feel the product immediately).
- A short setup-confidence checklist, ticked: number connected ✓, knowledge base loaded ✓, agent trained on your business ✓.
- Stats at zero should read "Waiting for your first message", not a hollow `0`.

**Knowledge Base (customer view)**
- A simple list of what the agent knows (loaded documents / sources) with light view/edit. Keep it minimal — this is "see and lightly adjust what your agent knows", not a CMS.

**Settings (customer view)**
- Minimal and read-mostly: business hours, escalation preference, agent tone. No advanced config sprawl.

**Component states to document/build** (for each: default, hover, active, disabled, loading, empty/error where relevant): button (amber primary, teal outline secondary, ghost), card, conversation row, message bubble (in/out), metric tile, badge (needs-you / channel), empty-state block, nav item.

## Hard rules (non-negotiable)

- **No em dashes, no arrows.** House rule.
- **No fabricated content** — no fake conversations, fake metrics, fake testimonials, or placeholder faces. Empty states instead.
- **"Self-hosted" / "dedicated infrastructure" is Enterprise-only** — it must NEVER appear in standard-tier customer UI or copy. Standard framing is "your data is isolated and exportable, NDPA-aware."
- **No "free trial" language anywhere.** The offer is a paid pilot + retainer, not a free trial.
- **No WhatsApp green** as a brand colour (only inside a literal WhatsApp-UI mock).
- **Do not build:** billing/subscriptions, campaigns/broadcasts, sales-pipeline CRM, self-serve WhatsApp connect, or a multi-tenant ops switcher. Those are out of scope for the customer dashboard.
- **Componentise; use tokens, not hardcoded hex/spacing.** Accessibility: body contrast ≥ 4.5:1, keyboard-navigable, ARIA on interactive elements, respect `prefers-reduced-motion`.

## Tech target

Repo is **Next.js (App Router) + TypeScript + Tailwind**, backed by **Supabase**. Existing routes: `/dashboard` (inbox), `/dashboard/conversations/[id]` (thread), `/dashboard/knowledge-base`, `/dashboard/settings`. Data comes from Supabase tables (`customers`, `customer_whatsapp_numbers`, `conversations`, `messages`, `leads`). Reuse/derive from the existing token setup in `globals.css`.

## Process (this is what makes the output good — do not skip)

1. Follow `voxitron-brand-foundation.md` for any choice not pinned here. If still unspecified, decide and state the choice; do not improvise per screen.
2. **Build, then render and screenshot** (desktop + mobile), look at the result, critique it against the "why it feels less" list and the brand's anti-AI checklist, fix, and re-render. Do not one-shot blind.
3. Design **both** the populated state and the day-one empty state.
4. Two-step delivery, matching how the marketing site was done:
   - First, a self-contained **HTML mock** of the dashboard, rendered and screenshot-critiqued, to lock the look.
   - Then port to **Next.js + Tailwind components** against the existing routes.

## Deliverables

1. Extended design-system documentation for the dashboard components (variants, states, tokens used, accessibility) — the `extend` output.
2. The dashboard itself: HTML mock first (with screenshots), then Next.js/Tailwind components.
3. A short list of the decisions and assumptions you made, and anything that needs a human call.

## Anti-AI checklist (run before calling it done)

- [ ] Surfaces have real hierarchy/elevation, not one flat weight.
- [ ] The `✓✓` signature and mono timestamps appear in the product.
- [ ] Metric figures are mono; stats are cards, not naked digits.
- [ ] Day-one empty state looks designed, not broken; no fake data.
- [ ] Palette is only the tokens above; no invented per-screen colours; no WhatsApp green as brand.
- [ ] No em dashes, no arrows, no "free trial", no "self-hosted" in standard UI.
- [ ] Sidebar with 3 items still feels intentional, not sparse.
- [ ] Looks like the same product as the Voxitron marketing site.
