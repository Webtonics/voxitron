# Voxitron website — master structure prompt for Claude Code

Bolt was used to generate a UI reference (screenshot) only — the structure and copy below come from the confirmed spec and prior work on this project, not from treating Bolt's output as a source of truth. Where Bolt invented something not in that spec, it's corrected below rather than carried forward.

## 0. Decisions needed before Claude Code builds this

Flag these to Josh, don't guess:

1. **Founder name, corrected.** Bolt's /about draft named a founder "Adaeze Okonkwo" — invented, not in any prior spec. The real founder is Josh. Full name still needed for the About page copy (section 4.9 uses "Josh" as a placeholder pending surname) — confirm before shipping.
2. **Comparison table values.** The /compare hub and each /compare/[slug] page render a feature-matrix table (Voxitron vs alternative) as checkmark icons. Icons don't survive a text scrape, so the actual yes/no values per cell aren't captured here. Section 6.6 below proposes values inferred from the competitive intelligence dossier — review and confirm before build.
3. **Lead form destination.** The /contact form and the calculator's lead-capture form need a submission target. Still undecided — direct email, or a Supabase table (could reuse the existing `leads` table from the WhatsApp agent schema, or a separate `website_leads` table). Decide before Claude Code wires up form submission.

## 1. Global structure (persistent across every page)

**Nav** (same on all 12 routes): Logo "Voxitron" → home. Links: WhatsApp Agent, Real Estate, Diagnostic Centers, Pricing, Compare, Lead Calculator, About, Contact. Two persistent header actions: "Book a call" (→ /contact) and "WhatsApp" (→ wa.me deep link).

**Footer** (same on all 12 routes): Logo + one-line description ("WhatsApp AI Lead Agents built on client-owned infrastructure for Lagos businesses.") + "Lagos, Nigeria". Three link columns — Pages (WhatsApp Agent, Real Estate, Diagnostic Centers, Pricing, Compare), Tools & More (Lead Calculator, About, Contact), Get in touch (WhatsApp number, email). Bottom line: "© 2026 Voxitron. Built in Lagos. Your infrastructure, your data, your asset." plus "NDPA (Nigeria Data Protection Act 2023) aligned."

**WhatsApp CTA pattern**: every WhatsApp button deep-links to `https://wa.me/2348120907050` with a page-specific prefilled message (e.g. homepage uses a generic intro line, /real-estate prefills "I run a real estate agency in Lagos...", /diagnostic-centers prefills "I run a diagnostic center in Lagos...", the calculator prefills a line referencing the tool). Build this as a component that takes a `message` prop, not a hardcoded link.

**"Book a discovery call" pattern**: every page ends in a final CTA band with the same two buttons — WhatsApp (page-specific message) and "Book a discovery call" (→ /contact).

## 2. Reusable component inventory

Build these once, reuse across pages, rather than treating each page as bespoke:

| Component | Used on |
|---|---|
| `Hero` (eyebrow label, H1, subhead, two CTAs, optional image/stat strip) | every page |
| `StatBar` (4-stat row) | homepage |
| `OldVsNewComparison` (paired rows: pain → capability) | homepage |
| `SixThingsGrid` / `FiveThingsGrid` (icon + title + one-liner cards) | homepage (6 cards), /whatsapp-agent (5 cards) |
| `ProofPendingSection` ("case study pending" + guarantee bullet list) | homepage, /real-estate, /diagnostic-centers |
| `HowItWorksSteps` (numbered step timeline) | homepage (4 steps, 01–04), /pricing (4 stages, Week 1 / Week 2–3 / Week 3–4 / Ongoing — separate variant, don't merge) |
| `VerticalCard` (image + title + one-liner + link) | homepage (2 cards: Real Estate, Diagnostic Centers) |
| `WhatIsSection` (narrative block, image side) | homepage |
| `ChannelSection` (narrative block, no image) | homepage |
| `FAQAccordion` | homepage, /whatsapp-agent, /real-estate, /diagnostic-centers, /pricing, every /compare/[slug] page |
| `PricingSummaryCards` (2 cards: setup, retainer) | homepage, /pricing (fuller version) |
| `FinalCTA` (band: WhatsApp + Book a call) | every page |
| `PainPointsGrid` (3 cards) | /real-estate, /diagnostic-centers |
| `VerticalFeaturesGrid` (6 feature cards) | /real-estate, /diagnostic-centers, /whatsapp-agent (5-item variant) |
| `DayInLifeTimeline` (time-stamped narrative moments) | /real-estate (5 moments), /diagnostic-centers (5 moments) |
| `OwnershipChecklist` (6-item grid) | /whatsapp-agent |
| `LanguageShowcase` (chat-bubble examples per language) | /whatsapp-agent |
| `ConversationDemo` (mock chat thread) | /whatsapp-agent |
| `NDPAExplainer` (two-fear framing block) | /whatsapp-agent |
| `CompareAtGlanceTable` (multi-column matrix) | /compare hub |
| `CompareCard` (4 cards linking to each comparison) | /compare hub |
| `ComparisonPageTemplate` (full page template, parameterized by competitor) | /compare/receptionist, /compare/diy-n8n-freelancer, /compare/botify, /compare/gohighlevel |
| `CalculatorTool` (4 inputs → 2 outputs, client-side calc, embedded lead form) | /tools/missed-lead-calculator |
| `LeadCaptureForm` | /contact, /tools/missed-lead-calculator (used twice, keep it one component) |
| `ProcessSteps` (post-contact timeline) | /contact |

Building `ComparisonPageTemplate` as one parameterized component (competitor name, what-they're-good-at bullets, where-it-falls-short bullets, comparison table column, 3 FAQ entries) is the single highest-leverage structural decision here — it's currently four near-identical pages.

## 3. Route map

```
/                              Homepage
/whatsapp-agent                Product deep-dive
/real-estate                   Vertical page
/diagnostic-centers            Vertical page
/pricing                       Pricing
/compare                       Comparison hub
/compare/receptionist          Comparison page
/compare/diy-n8n-freelancer    Comparison page
/compare/botify                Comparison page
/compare/gohighlevel           Comparison page
/tools/missed-lead-calculator  Interactive tool + lead capture
/about                         About/trust page
/contact                       Contact + discovery call form
```

## 4. Page-by-page breakdown

### 4.1 Homepage (`/`)

1. **Hero** — eyebrow "Built in Lagos for Lagos businesses." H1 "Never miss a lead on WhatsApp." Subhead: "Voxitron builds AI Lead Agents that answer every inquiry within 60 seconds, qualify against your business logic, and book appointments — on infrastructure you own." CTAs: Chat on WhatsApp / Book a discovery call. Side content: mock phone image + a 3-line status strip ("New lead received" → "Qualified in 47 seconds" → "Booked").
2. **Problem section** — eyebrow "The problem." H2 "The cost of a slow WhatsApp reply in Lagos." Two-paragraph pain narrative (real estate example, diagnostic center example) + closing line "Slow replies aren't a minor inconvenience. They're lost revenue you can't see." Link: "Calculate what slow replies are costing you" → calculator. Secondary line: "Lagos doesn't wait. Neither should your WhatsApp inbox."
3. **OldVsNewComparison** — H2 "The old way vs the Voxitron way." Four paired rows: Manual replies → Instant answers; Generic chatbots → Bespoke qualification; Platform lock-in → You own the infrastructure; Opaque data handling → NDPA-aligned. (Each pair: one-line pain, one-line capability.)
4. **SixThingsGrid** — eyebrow "What your agent does." H2 "Six things, every single time." Cards: Instant response / Smart qualification / Human escalation / Books appointments / Automated follow-ups / You own everything — each with a one-sentence description (see scraped copy above for exact wording).
5. **Why Voxitron is different** — 3 cards: You own the infrastructure / Bespoke qualification logic / Nigerian-language fluency, each with a short paragraph.
6. **ProofPendingSection** — H2 "Proof — as soon as we have it." Explicit statement that borrowed stats won't be used. "Case study pending — first client pilot in progress" + 4-item guarantee list.
7. **HowItWorksSteps** — H2 "How it works." Steps 01–04: Discovery call / Workflow built on your logic / Pilot on your WhatsApp number / Go live with monthly tuning.
8. **VerticalCard x2** — H2 "Built for your industry." Real Estate Agencies card, Diagnostic Centers card, each linking out.
9. **StatBar** — 4 stats: 60s (max response time), 5 (Nigerian languages handled), 72hr (free messaging window used), 100% (infrastructure you own).
10. **WhatIsSection** — H2 "A done-for-you AI automation agency — not a chatbot SaaS." Narrative: what Voxitron builds, the two target verticals, explicit list of what it's not (GoHighLevel reseller, no-code chatbot SaaS, phone-answering utility, generic AI consultancy).
11. **ChannelSection** — H2 "Not a support afterthought. Your primary revenue channel." Narrative on WhatsApp as the buyer journey channel in Lagos.
12. **FAQAccordion** — 5 questions: technical skill needed? / what if Voxitron shuts down? / does it replace my team? / setup timeline? / what does NDPA-aligned mean?
13. **PricingSummaryCards** — Setup ₦150k–₦600k, Retainer ₦50k–₦120k/mo, link to full /pricing.
14. **FinalCTA** — "Stop losing leads to slow replies."

### 4.2 `/whatsapp-agent`

1. **Hero** — eyebrow "The WhatsApp AI Lead Agent." H1 "Your WhatsApp inbox, handled — by an agent that never sleeps." CTAs: "See it in action" (WhatsApp) / Book a discovery call.
2. **FiveThingsGrid** — H2 "What the agent actually does." Answers instantly / Qualifies against your logic / Escalates to a human when uncertain / Books and schedules / Follows up automatically — each with a fuller paragraph than the homepage version.
3. **LanguageShowcase** — H2 "Speaks the way your customers chat." Six example bubbles: English, Pidgin, Yoruba, Igbo, Hausa, and a code-switched example, each with a sample customer message. Closing line on natural language switching.
4. **OwnershipChecklist-as-narrative** (3 cards, not the full 6-item checklist — that's later) — Self-hosted n8n on your server / No platform lock-in / You control your data.
5. **NDPAExplainer** — eyebrow "NDPA (Nigeria Data Protection Act 2023)." H2 "Why self-hosted infrastructure answers two buyer fears at once." Legal framing paragraph, then two labeled fear blocks (Fear 1: Data leakage, Fear 2: The agency vanishes), resolved by one closing paragraph.
6. **ConversationDemo** — H2 "What a real conversation looks like." A 5-turn mock WhatsApp thread (Lekki property inquiry → viewing booked), labeled as a representative example.
7. **OwnershipChecklist** (full 6-item grid) — H2 "The ownership checklist." The n8n instance / All workflows / Your WhatsApp Business API / All conversation data / The qualification logic / The AI model configuration.
8. **FAQAccordion** — 5 questions: complex questions? / wrong answers? / existing WhatsApp number? / after the 72-hour window? / can I see conversations?
9. **FinalCTA** — "See the agent on your WhatsApp number."

### 4.3 `/real-estate`

1. **Hero** — eyebrow "For Lagos Real Estate Agencies." H1 "You're losing listings to the agent who replies first." Image, no dual CTA in hero (CTAs live in final section).
2. **PainPointsGrid** (3 cards) — Cold leads go cold / Missed viewings / Buried under manual replies.
3. **VerticalFeaturesGrid** (6 cards) — H2 "What your AI Lead Agent does for real estate." Viewing bookings / Listing Q&A / Buyer qualification / Diaspora buyer handling / Due-diligence & fraud prevention / Property matching.
4. **ProofPendingSection** — vertical-specific: "Case study pending — first real estate pilot in progress" + 4-item guarantee list (property-specific wording).
5. **DayInLifeTimeline** — H2 "A day with your AI Lead Agent." 5 time-stamped moments, 6:45 AM through 7:00 PM, following a London diaspora inquiry through to overnight bookings.
6. **Diaspora section** — eyebrow "Diaspora buyers." H2 "Your biggest deals are in different time zones." Narrative on time-zone handling, fraud/documentation verification, image.
7. **FAQAccordion** — 4 questions: wrong pricing? / multiple inquiries at once? / negotiation handling? / CRM/calendar integration?
8. **FinalCTA** — "Stop losing listings to faster agencies." (WhatsApp message prefilled with real-estate-specific line.)

### 4.4 `/diagnostic-centers`

Same template shape as /real-estate, vertical content swapped:

1. **Hero** — eyebrow "For Lagos Diagnostic Centers." H1 "Your front desk can't answer every WhatsApp message."
2. **PainPointsGrid** (3 cards) — Manual WhatsApp and phone bookings / Repetitive prep-instruction questions / No website for most single-owner centers.
3. **VerticalFeaturesGrid** (6 cards) — Test booking / Home-sample-pickup scheduling / Result-status queries / Prep instructions / Appointment reminders / Test catalog Q&A.
4. **ProofPendingSection** — "Case study pending — first diagnostic center pilot in progress" + 4-item guarantee list.
5. **DayInLifeTimeline** — 5 moments, 7:00 AM through 8:00 PM (lipid profile booking → home sample pickup → no-show prevention → after-hours booking).
6. **"What actually changes for your center"** — 6-card grid (not present on /real-estate — diagnostic-centers-specific section): front desk stops being a bottleneck / no-shows drop / prep instructions reach every patient / result-status calls disappear / after-hours bookings captured / home sample pickup becomes scalable.
7. **FAQAccordion** — 4 questions: medical advice? / test catalog integration? / lab management system integration? / urgent questions?
8. **FinalCTA** — "Stop losing patients to faster centers."

Note the structural asymmetry: diagnostic-centers has an extra "what changes" section that real-estate doesn't. Keep that — it's earned by the front-desk-operations angle, don't force parity.

### 4.5 `/pricing`

1. **Hero** — eyebrow "No hidden plans or locked features." H1 "Transparent pricing for an asset you own."
2. **PricingCards** (2 cards, fuller than homepage version) — Setup (₦150k–₦600k, one-time, 9-item "what you get" list) and Retainer (₦50k–₦120k/mo, 6-item "what it covers" list). Callout line beneath: Meta fees passed through at cost, no markup.
3. **"What determines your price?"** — short explainer paragraph, link to /contact ("Get a clear quote").
4. **Buying vs not-buying** (2 columns) — "What you're buying" (7 items) vs "What you're not buying" (7 items).
5. **HowItWorksSteps (pricing variant)** — H2 "From discovery call to live agent." Week 1: Discovery & scoping / Week 2–3: Build & configure / Week 3–4: Pilot launch / Ongoing: Monthly retainer. Each with cost/process context, not just the homepage's generic step description.
6. **FAQAccordion** — 4 questions: why a range not a fixed price? / cancelling the retainer? / hidden fees? / payment plans?
7. **FinalCTA** — "Ready to own your lead response system?"

### 4.6 `/compare` (hub)

1. **Hero** — eyebrow "Honest comparisons." H1 "Choose the right way to stop missing leads."
2. **CompareCard x4** — Hiring a Receptionist / A DIY n8n Freelancer or Template / Botify (Generic WhatsApp Chatbot SaaS) / GoHighLevel-Reseller Agencies. Each card: what it's good at (1 line), where it falls short (1 line), link to the full comparison.
3. **CompareAtGlanceTable** — H2 "At a glance." Columns: Voxitron, Receptionist, DIY n8n, Chatbot SaaS, GHL Reseller. Rows: 24/7 instant response, Bespoke qualification logic, You own the infrastructure, Nigerian-language fluency, Human escalation, NDPA-aligned by design, No platform lock-in, Monthly tuning included.

   **Proposed values** (inferred from the competitive dossier — confirm before build):

   | Row | Voxitron | Receptionist | DIY n8n | Chatbot SaaS | GHL Reseller |
   |---|---|---|---|---|---|
   | 24/7 instant response | Yes | No | Partial (if maintained) | Yes | Yes |
   | Bespoke qualification logic | Yes | Yes (human judgment) | Partial (one-off build) | No | Partial |
   | You own the infrastructure | Yes | N/A | Yes | No | No |
   | Nigerian-language fluency | Yes | Depends on staff | Depends on build | No | No |
   | Human escalation | Yes | Yes (is human) | No | Limited | Partial |
   | NDPA-aligned by design | Yes | N/A | No (unless built in) | No | No |
   | No platform lock-in | Yes | N/A | Yes | No | No (GHL-dependent) |
   | Monthly tuning included | Yes | N/A | No | No | Varies by agency |

4. **FinalCTA** — "Want to see what ownership looks like for your business?"

### 4.7 `/compare/[slug]` — template (receptionist, diy-n8n-freelancer, botify, gohighlevel)

One parameterized template, instantiated 4 times:

1. **Hero** — eyebrow "Voxitron vs [Competitor]." H1 is a tension statement specific to that competitor (e.g. for Botify: "A generic chatbot answers questions. Your agent should move leads forward."). Intro paragraph naming what the alternative is for and where Voxitron differs.
2. **Two-column honest assessment** — "What [Competitor] is good at" (3 bullets) / "Where it falls short for this buyer" (3 bullets).
3. **"Why choose Voxitron instead"** — 4-item checklist, vertical-and-NDPA-flavored, consistent across all four pages with minor wording tweaks.
4. **Feature-by-feature table** — same 8 rows as the hub's at-a-glance table, filtered to just Voxitron vs this one competitor.
5. **FAQAccordion** (3 questions, same shape every time) — "Should I just go with [competitor] instead?" / "Can I use both?" / "What if I'm still not sure?"
6. **FinalCTA** — "Ready to compare this with your actual workflow?"

Per-competitor copy already scraped for Botify (section above); apply the same shape to Receptionist, DIY n8n Freelancer, and GoHighLevel using each one's dossier profile for the "good at / falls short" bullets.

### 4.8 `/tools/missed-lead-calculator`

1. **Hero** — eyebrow "Free tool — no signup required." H1 "How much are slow WhatsApp replies costing you?"
2. **CalculatorTool** — 4 inputs (monthly WhatsApp inquiries / typical response time bracket, 5 options / average deal value in ₦ / estimated close rate %) → 2 live outputs ("Estimated monthly impact" revenue-lost figure, "Potential recovery under 60 seconds" figure). Runs client-side, no data sent until form submission.
3. **LeadCaptureForm** (embedded directly under the results) — "Want to stop losing it?" Name*, Business name, WhatsApp number*, Email.
4. **"How to use this calculator"** — 4-step explainer (one per input, how to fill it in honestly).
5. **"What your results mean"** — 3-block explainer: the revenue-lost number, the potential-recovery number, what the calculator does not do (explicit limitations, no overpromising).
6. **FinalCTA** — "Ready to stop losing that revenue?"

### 4.9 `/about`

1. **Hero** — eyebrow "Lagos-based." H1 "We're not an offshore agency with a Lagos landing page." Names founder as Josh (surname pending — see decision #1 above), image of Lagos skyline.
2. **Narrative section** — "Why owned infrastructure beats rented SaaS." 3-paragraph founding story.
3. **"What we believe"** (3 cards) — Owned beats rented / NDPA is a real constraint, not a buzzword / Bespoke logic, not templates.
4. **"What we won't do"** (6-item list) — quote borrowed stats / sell rented SaaS seats / build generic templates / hide pricing / operate as offshore-pretending-local / gesture vaguely at compliance.
5. **"How we work with you"** (4 cards) — We map your process first / You see everything we build / We pilot before you commit / We tune monthly, not set-and-forget.
6. **"Our commitments to you"** (8-item list, checkmark style) — response time, ownership, bespoke logic, NDPA naming, transparent pricing, local team, monthly tuning, honesty about fit.
7. **FinalCTA** — "Want to meet the team?"

### 4.10 `/contact`

1. **Hero** — eyebrow "Let's talk." H1 "Book a discovery call."
2. **Two contact method cards** — WhatsApp (marked "fastest," number, reply-time note) / Email (hello@voxitron.com, reply-time note).
3. **Trust line** — "Based in Lagos — local, named, accountable team," one-line reinforcement.
4. **LeadCaptureForm (discovery call variant)** — Name*, Business name, WhatsApp number*, Email, business type (Real estate / Diagnostic center / Other), rough monthly WhatsApp leads (4 bracket options), free-text "anything else."
5. **ProcessSteps** — H2 "What happens after you reach out." 4 steps: We reply on WhatsApp / We schedule a 20-minute call / You get a fixed quote within 48 hours / You decide, no pressure.
6. **Closing WhatsApp CTA** — "Or just message us now," single WhatsApp button.

## 5. Structural notes for Claude Code

- Every page ends in a `FinalCTA`. Every page opens in a `Hero`. Treat these as the two mandatory slots in the page template; everything else is composed in between.
- `FAQAccordion` appears on 9 of 12 routes. Build it once with a `questions` prop, not per-page.
- The vertical pages (`/real-estate`, `/diagnostic-centers`) and comparison pages (`/compare/[slug]`) are the two clearest candidates for a shared template + content-config pattern rather than four/two separate page files. If the stack is Next.js, `/compare/[slug]/page.tsx` reading from a competitor-config object is the natural structure; the same applies to a `/verticals/[slug]` pattern if a third vertical is ever added.
- `WhatsApp CTA` message text differs by page — implement as a prop, never hardcode the wa.me URL string per instance.
- Nothing here specifies color, type, or layout — that's covered by the Bolt screenshot and the earlier palette work. This document is content and structure only.
