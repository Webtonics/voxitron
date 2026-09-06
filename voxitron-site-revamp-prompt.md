# Voxitron Site Revamp — Claude Code Prompt

> How to use: open this in **Claude Code** with the voxitron.com Next.js repo. Attach two files as source-of-truth references: `voxitron-brand-foundation.md` (the brand system) and `voxitron-homepage-demo.html` (the target look — a corrected, on-brand homepage already built to these rules; treat it as the reference implementation to port from). Work on the `dev` branch, keep the build green, commit in logical chunks.

---

## Mission

Revamp the entire voxitron.com site (Next.js App Router + TypeScript + Tailwind, Supabase backend). Three goals, in priority order:

1. **Fix false/off-model claims** that are live right now and will damage sales and investor diligence.
2. **Apply the brand system consistently** and remove the generic "AI-built site" tells, using `voxitron-homepage-demo.html` as the reference for the intended look.
3. **Build a proper missed-revenue calculator** and surface it site-wide.

The bar is pitch-ready and ad-ready, not "MVP." Honest, distinctive, consistent across every page.

## Product context (do not drift from this)

- Voxitron is a **done-for-you** WhatsApp AI agent for Lagos SMBs. Service-led: Voxitron sets up and runs the agent for the client. Not self-serve.
- **Beachhead vertical: diagnostic centres** (single-owner, non-technical, trust-sensitive). Secondary: real estate. Retail/e-commerce exist but are not the lead.
- **The offer is a paid pilot, not a free trial:** a 2-week pilot (default ₦50,000, adjustable) with a "only pay the next month if it books" performance framing, and founding-customer pricing for the first 10 centres. There is NO free trial.
- Real, shippable capabilities: agent replies, KB, **voice-note understanding, image/photo understanding**, human handoff, per-client data isolation, NDPA-aware. Integrations (CRM/inventory/ERP/payment) are a **foundation/roadmap**, not live for standard clients.
- House brand rules: no em dashes, no arrows, no fabricated data, componentise, Nigerian-plain copy.

---

## PART 1 — Critical claims sweep (do this first, it's global and it's the point)

Search every page, component, meta tag, and JSON/config for these and fix them everywhere:

1. **Remove "self-hosted / you own the infrastructure / own everything / own the data and infrastructure / rent a seat / data held hostage"** from ALL standard-tier surfaces: homepage meta description + OG/Twitter tags, hero, the "What is Voxitron" block, all FAQ answers, and the **Starter and Growth** pricing bullets (Starter currently says "Self-hosted infrastructure, under your control" — remove it).
   - Replace with the true standard-tier story: **your data is isolated and private per business, exportable any time, NDPA-aware, no lock-in, Meta fees at cost.**
   - Keep dedicated-infrastructure language ONLY on the **Enterprise** tier ("Dedicated infrastructure, isolated from other clients" is correct there).
2. **Kill "Free Trial" and "30 days free" everywhere** (nav button, homepage, diagnostic page, get-started, any CTA/meta). The site must tell ONE offer story that matches the pricing page (setup fee + monthly retainer). Replace the free-trial CTA with the **pilot** (see Part 2).
3. **"NDPA-compliant" → "NDPA-aware"** globally (you have not done a formal compliance assessment; don't claim one).
4. **Integrations honesty:** on Pricing, move "CRM or inventory integration" and "CRM/ERP/payment integrations" to Enterprise/roadmap framing, or remove from standard tiers. Do not present unbuilt integrations as shipped features.
5. **Remove the "within 48 hours" setup promise** (get-started page). Use the honest managed timeline: "We build and connect it for you. Live on your existing number in about a week."

## PART 2 — Offer & CTA overhaul

- **Primary CTA site-wide, one consistent label:** lead with the demo ("See it reply" / "Chat on WhatsApp", opening `wa.me/2348120907050`), and make the **pilot** the primary conversion CTA in pricing, get-started, and the final CTA: **"Try it 2 weeks. Only pay if it books."** (Amber, per brand.)
- **Nav has ONE primary CTA**, identical on every page (currently the homepage shows "Free Trial" while the diagnostic page shows "Chat on WhatsApp" — unify them).
- **Secondary CTA everywhere:** **"What would slow replies cost you?"** → links to the calculator (Part 4).
- **Founding-customer scarcity line** under the primary CTA on homepage + pricing: "First 10 diagnostic centres lock in launch pricing." Use a real, editable count, never a fabricated one.
- **Rebuild `/get-started`:** remove the long cold form and the free-trial/48h copy. Make it demo-first (message the live agent and watch it reply), then the pilot offer. If a form remains, two fields max (Name + WhatsApp number).

## PART 3 — Design & brand pass

Apply `voxitron-brand-foundation.md` tokens/type/signature, and match the look of `voxitron-homepage-demo.html`.

- **Tokens:** ink `#0B1F2A`, paper `#FBFAF6`, amber `#E8890C` (+press `#C9740A`), teal `#0E7C6B`, mint `#D9F2EA`, line `#E7E3DA`, muted `#5B6B72`; radius 8/14/22; soft warm shadow. Fonts: Bricolage Grotesque (display), Hanken Grotesk (body), Space Mono (timestamps/figures/`✓✓`). Put these in the token layer (`globals.css` / Tailwind theme) and derive everything from them, no hardcoded hex.
- **Kill every generic stock photo.** The Unsplash hero images (`images.unsplash.com/...`) on the homepage, diagnostic page, and other pages are the #1 "AI site" tell and violate the brand doc. Replace with the **rendered chat-device / live thread** treatment from the demo file, or a real anonymised WhatsApp capture. No stock people/desks.
- **Fix the headline gimmick:** remove the manual double-spaces in "Never leave  a customer  on read." Let headlines wrap naturally. Stop reusing the identical "Never leave X on read" line across every vertical page — give each vertical its own specific headline.
- **Reduce ALL-CAPS eyebrows** to a few meaningful ones per page (currently on nearly every section).
- **De-template the vertical pages.** They currently run the default AI spine (THE PROBLEM → BEFORE/AFTER → WHAT IT DOES → HOW IT WORKS → FAQ). Reorder/merge as the homepage does; lead diagnostics with a real booking thread and the voice/photo capability.
- **Bring the signature into every page:** mono timestamps, amber `✓✓`, mint agent bubbles, the "Replied." motif.
- **Consistency fixes:** reconcile the WhatsApp usage stat (homepage says 96.5%, diagnostic says 95%+ — pick one, cite one source). Verify the 67% / 82% patient stats on the diagnostic page trace to a real citable source; if they can't be sourced, remove them (do not ship unsourced stats).
- **Honest placeholders:** where real product shots don't exist, keep a clearly-labelled placeholder, but prioritise replacing the hero-level ones with real captures since the agent is live.
- **Accessibility:** body contrast ≥ 4.5:1, keyboard-navigable, ARIA on interactive elements, `prefers-reduced-motion` respected, scroll-reveal defaults to visible (never invisible-on-slow-connection).

## PART 4 — The calculator (revamp `/tools/missed-lead-calculator` + embed it)

Build a genuinely useful **missed-revenue calculator**, on-brand, honest, Naira-denominated.

- **Purpose:** show an owner the revenue they lose to slow/after-hours WhatsApp replies, using THEIR numbers (not invented benchmarks).
- **Inputs (sliders + number fields, sensible editable defaults clearly labelled as assumptions, not claims):**
  - Enquiries received per day (or week)
  - Share that arrive after hours / when you're busy (%)
  - Average value of one booking/test/order (₦)
  - Share of after-hours enquiries you currently lose (%) — default conservative
- **Output:** estimated **lost bookings/month** and **lost revenue/month and /year**, big mono `₦` figures, updating live. Keep the math visible and conservative; do not inflate. One honest line: "With an agent replying instantly, most after-hours enquiries are recoverable" — no fabricated recovery-rate promise.
- **CTA in the result:** the pilot ("Try it 2 weeks. Only pay if it books") + "Chat on WhatsApp".
- **Design:** brand tokens, mono numbers, amber accent, mobile-first, no external stock imagery.
- **Surfacing:** it is the **secondary CTA site-wide**; embed a compact version as a section on the homepage and the diagnostic page, full version at `/tools/missed-lead-calculator`.
- **No fabricated stats inside the tool.** It runs on the user's own inputs. Any default is labelled "editable assumption."

## PART 5 — Per-route checklist

Apply Parts 1-3 to every route, plus the specifics:

- `/` homepage: diagnostics-led hero example (booking thread), voice/photo section, honest offer, calculator embed, single nav CTA. (Flip point: if you want the homepage to stay broad/horizontal rather than diagnostics-led, that's a one-line call — default is diagnostics-led since it's the ad target.)
- `/diagnostic-centre`: strongest page (it's the ad landing page). Real booking thread, voice/photo, safe clinical FAQ (keep the "notifies but doesn't send clinical results in chat" answer — it's good), de-templated spine.
- `/real-estate`, `/retail`, `/ecommerce`, `/whatsapp-agent`: brand pass, own headlines, offer + claims sweep.
- `/pricing`: strip self-hosted from Starter/Growth, fix integrations framing, keep the honest "typical prices / what you're buying vs not / Meta fees at cost / cancel anytime" structure (it's strong), reconcile to the pilot offer.
- `/get-started`: rebuilt per Part 2.
- `/compare` + `/compare/[slug]`: audit every competitor claim for truth; lead with what Voxitron does, not only what others lack; no unbuilt-integration claims.
- `/about`, `/contact`, `/privacy`: brand pass, claims sweep, consistent nav/footer/CTA.
- `/blog` + posts: brand pass; check any post that describes the 24h window as unconditionally free (drifts after the Oct 1 2026 Meta pricing change) and any misattributed speed-to-lead stats.
- `/speed-to-lead`, `/quoting-agent`: keep out of primary nav (legacy), but still run the claims sweep so nothing off-model is live.
- `error.tsx`, `global-error.tsx`, `not-found.tsx`: on-brand, human copy.
- Global nav + footer: one primary CTA, calculator as secondary, consistent everywhere.

## Hard rules (non-negotiable)

- No em dashes, no arrows, no fabricated data (no fake testimonials, metrics, screenshots, or faces).
- No "self-hosted / dedicated infrastructure" outside Enterprise. No "free trial" anywhere. No "NDPA-compliant" (use "aware").
- No WhatsApp green as a brand colour (only inside a literal WhatsApp-UI mock).
- No unbuilt integrations presented as shipped.
- Componentise; reuse existing components; use tokens not hardcoded values; keep the build green; don't break existing routes or Supabase reads.

## Process (this is what makes the output good — do not skip)

1. Follow `voxitron-brand-foundation.md` for any unspecified choice; match `voxitron-homepage-demo.html` for the look. If still unspecified, decide and state it.
2. Do Part 1 (claims sweep) first as a focused pass, then design, then the calculator, then per-page.
3. **Render and screenshot each major page (desktop + mobile), review against the anti-AI checklist below, fix, re-render.** Do not one-shot blind.
4. Commit in logical chunks on `dev` with clear messages; keep `main` untouched until reviewed.

## Deliverables

1. The updated Next.js codebase (edits in place, componentised).
2. The revamped calculator (route + embeds).
3. Screenshots of each major page, desktop and mobile.
4. A short changelog: what was removed (the false claims), what changed, and any decision/assumption you made or anything needing a human call (e.g. the founding-customer count, unverifiable stats you removed).

## Anti-AI checklist (run before done, every page)

- [ ] No generic stock photos; real product/chat shown or honest labelled placeholder.
- [ ] No "self-hosted" outside Enterprise; no "free trial"; no "NDPA-compliant"; no em dashes/arrows.
- [ ] One offer story site-wide, matching the pricing page; one consistent primary nav CTA.
- [ ] Headlines wrap naturally (no manual-space gimmick); vertical pages have distinct headlines and are not the default section spine.
- [ ] The `✓✓` + mono-timestamp signature appears; stat figures are mono; stats are reconciled and sourced.
- [ ] Calculator runs on user inputs, no fabricated benchmarks, pilot CTA in the result.
- [ ] Palette is only the brand tokens; scroll-reveal defaults visible; contrast ≥ 4.5:1.
- [ ] Looks like one coherent product, matching the demo file.
