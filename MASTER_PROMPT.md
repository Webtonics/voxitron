# Master Prompt: Voxitron Static Site to Next.js + Supabase Platform

Read this file in full before doing any migration work. It is the working brief for
turning the current 4-page static HTML site into a Next.js app with real routing, a lead
capture backend, and a customer dashboard, deployed on Vercel. `CLAUDE.md` in this same
directory documents the target architecture and the brand/content system that does not
change; this file governs sequencing and the bar for calling any piece of it "done."

## The one rule that matters most

**Nothing ships half-wired.** No dead links, no buttons that don't do anything, no
"TODO" screens, no form that submits into a void, no nav link to a route that 404s, no
placeholder copy, no fabricated dashboard numbers. If a milestone below can't be
completed fully, it is not done, and the honest move is to say so and stop there, not to
leave a plausible-looking stub in the codebase. A user should never click something on
this site and get nothing back.

Concretely, before any milestone is reported complete:
- Every `<Link>` and `<a>` resolves to a real route or a real external URL, never `#` or `/coming-soon`
- Every form actually submits, actually writes to Supabase, and actually shows the visitor success or a real error, no silent failure
- Every button either does its job or doesn't exist yet, there is no third state
- `npm run build` succeeds with zero errors
- The page has been opened in a real browser (via the dev server) and clicked through, not just type-checked

## Current state (baseline, do not re-derive, verify if in doubt)

- Static site: `index.html`, `speed-to-lead.html`, `quoting-agent.html`, `whatsapp-agent.html`, `assets/css/main.css`, `assets/js/main.js`
- All 4 pages share the stylesheet and script, but nav/footer/WhatsApp-float markup is copy-pasted per file, not componentized
- Every CTA is `mailto:hello@voxitron.com` except `whatsapp-agent.html`, whose CTAs are `wa.me` links (this stays)
- No backend, no database, no auth, no build step
- Hosted by uploading raw files to Hostinger hPanel

## Target state

- Next.js (App Router) + TypeScript app, deployed on Vercel
- Same visual design and brand system (Electric Lime on Navy, DM Sans/DM Mono), ported faithfully, not redesigned
- Shared nav/footer/WA-float as real components
- A working lead-capture form (homepage, Speed to Lead, Quoting Agent) that posts to a Next.js Route Handler and persists to Supabase Postgres
- WhatsApp Business Agent page keeps its `wa.me` CTAs, untouched by the form work
- Supabase Auth-gated `/login` and `/dashboard`
- `voxitron.com` DNS pointed at Vercel

## Phases

Work through these in order. Each phase ends with a working, deployable state, not a
broken intermediate. Do not start a phase until the previous one is genuinely complete
per the rule above.

### Phase 0: Scaffold
- `npx create-next-app` (TypeScript, App Router, ESLint) inside this repo, alongside (not replacing) the existing static files
- Set up `app/layout.tsx` with fonts via `next/font` (DM Sans, DM Mono)
- Port the CSS custom-property token system from `assets/css/main.css` into `styles/globals.css` (or Tailwind config, pick one approach and use it consistently, don't mix)
- Confirm `npm run dev` runs and `npm run build` succeeds on a blank page before writing any real page content

### Phase 1: Homepage parity
- Build `components/Nav.tsx`, `components/Footer.tsx`, `components/WaFloat.tsx`, `components/Reveal.tsx`
- Rebuild `index.html` as `app/page.tsx` using those shared components, matching the existing section order in CLAUDE.md's "Page Structure"
- Pixel/structure parity with the current homepage: every section, every stat, every testimonial, same copy (do not rewrite copy in this phase, that's a separate task)
- CTAs still `mailto:hello@voxitron.com` at this phase, the form comes later, don't half-build it now
- Verify in a real browser: scroll-reveal animates, nav links scroll to the right anchors, responsive at mobile/tablet/desktop widths

### Phase 2: Remaining pages
- `app/speed-to-lead/page.tsx`, `app/quoting-agent/page.tsx`, `app/whatsapp-agent/page.tsx`, reusing the same shared components
- WhatsApp page keeps its `wa.me` CTAs and phone-frame video hero, verify the video/poster asset actually loads and loops from its new Next.js static path
- Cross-page anchor links (e.g. `/speed-to-lead` back to `/#services`) work as real Next.js navigation, not full reloads
- All 4 pages live at their routes, old `.html` files can now redirect or be left as-is until Phase 5, your call, but don't have both live and diverging in content

### Phase 3: Lead capture backend
- Design the lead form fields (name, business, phone/email, which agent, message, whatever's actually needed, confirm with the user if unclear rather than guessing a schema)
- Supabase project: `leads` table, Row Level Security configured correctly (inserts allowed from the API route, no public read of other people's leads)
- `app/api/leads/route.ts` Route Handler: validates input server-side, writes to Supabase, returns a real success/error response
- Form component: client-side validation, loading state, success state, error state, all real, all tested by actually submitting the form in a browser and checking the row lands in Supabase
- Replace `mailto:` CTAs on homepage, Speed to Lead, and Quoting Agent with the real form (or a modal/section that opens it), per what's decided with the user. WhatsApp page is unaffected

### Phase 4: Auth and dashboard

**This phase depends on a system outside this repo, and that system does not exist yet.**
Corrected understanding as of 2026-08-04 (an earlier pass of this file assumed a WhatsApp
n8n workflow already existed and just needed a logging step added; that was wrong):

- **There is no WhatsApp automation at all yet.** The user confirmed messages sent to the
  site's `wa.me` number (2348120907050), the one every WhatsApp Business Agent CTA links
  to, currently go unanswered. Nothing replies. This is a real gap between what
  `/whatsapp-agent` promises ("see the agent reply live") and what actually happens today.
  The user was asked whether to pause and adjust that page's copy until the agent is real,
  or add an interim manual-reply stopgap, and explicitly chose neither: build the n8n
  workflow now, no interim fix, accept the gap in the meantime. Respect that decision, but
  do not lose track of it either, if a future session picks this up, that gap may still be
  open and is worth surfacing again rather than assuming it was quietly resolved.
- **A related but separate n8n project (Area50) exists** with a working web-widget chat
  pipeline (WF1 AI Chat, WF2 AI Suggest, WF5 KB Ingest, WF6 Knowledge Search), reviewed by
  the user 2026-08-04. It uses Qdrant (per-company collections named `kb_{company_id}`,
  OpenAI `text-embedding-ada-002` embeddings) for knowledge-base retrieval, and a LangChain
  agent node for replies. It has no WhatsApp integration and its message logging goes to a
  MongoDB `messages` collection (via something outside those 4 workflow files, never
  located), not Supabase. The user decided: build a new, separate n8n workflow for
  Voxitron's WhatsApp agent rather than adapt Area50's, reusing its Qdrant/KB pattern
  where useful but logging to Supabase (the schema already migrated below), not Mongo.
- **A hardcoded secret was spotted in Area50's WF1 export** (`x-area50-secret` header value,
  in the "Call WF3 - Route Check" and "Call WF4 - Escalate" HTTP Request nodes). Not
  Voxitron's problem to fix, but flagged to the user 2026-08-04; if these workflow JSON
  exports ever get committed to a repo or shared elsewhere, that secret should be rotated
  first.

So Phase 4 is now two things, not one: **first, build the actual WhatsApp agent
automation** (something that has never existed for Voxitron before this point), **and
only then** the dashboard that shows its logged history. Do not let "add logging" framing
from an earlier version of this doc undersell the size of the first part.

Sequencing within Phase 4:

1. **n8n WhatsApp workflow (blocking, built outside this repo's codebase, but the
   importable file lives here).** `n8n/voxitron-whatsapp-agent.json` is a full, ready-to-
   import n8n workflow, written 2026-08-04: handles Meta's webhook verification handshake,
   receives inbound WhatsApp messages, looks up the customer by WhatsApp number, logs the
   inbound message, generates a reply via an AI Agent node backed by a per-customer Qdrant
   knowledge-base collection (same retrieval pattern as Area50's WF1), sends the reply via
   the WhatsApp Cloud API, and logs the outbound message, all to the `customers`/
   `conversations`/`messages` tables below. Full setup checklist (Meta app creation,
   credentials to wire in, environment variable, webhook registration) is in
   `n8n/README.md`, read it before importing. Step-by-step Meta Business/WhatsApp
   Platform app setup (not started as of 2026-08-04) is in
   `n8n/meta-whatsapp-setup.md`. `supabase/onboarding-template.sql` is the copy-paste
   template for creating a customer, granting dashboard logins, and registering WhatsApp
   numbers, used for every customer including Voxitron's own tenant row.

   The user reviewed Area50's actual workflow exports (WF1 AI Chat, WF2 AI Suggest, WF5
   KB Ingest, WF6 Knowledge Search) with the agent on 2026-08-04. Corrected understanding:
   those workflows are the web widget's chat pipeline, not WhatsApp-specific, and use
   Qdrant genuinely (collections named `kb_{company_id}`, OpenAI `text-embedding-ada-002`
   embeddings) via a LangChain agent tool. Message logging in those workflows goes to a
   MongoDB `messages` collection written by something outside those 4 files (never
   located), not to Supabase. The user decided to build a new, separate workflow for
   Voxitron rather than adapt Area50's, reusing the Qdrant/KB retrieval pattern but
   logging to Supabase using the schema below. A hardcoded secret was also spotted in
   Area50's WF1 HTTP Request nodes during this review, flagged to the user, not
   reproduced here, worth rotating in Area50 if those exports are ever shared further.

   Do not attempt to build the dashboard until this workflow is actually live (Meta app
   created, credentials wired, imported, tested) and at least one real conversation has
   landed in `conversations`/`messages`.

   **Known gap, explicitly accepted by the user 2026-08-04, not yet resolved:** there is
   no WhatsApp automation of any kind live today. Messages sent to the site's `wa.me`
   number currently go unanswered, despite `/whatsapp-agent`'s copy promising a live AI
   reply. The user was offered the choice to pause and adjust that page's claims, or add
   an interim manual-reply stopgap, and chose neither, opting to proceed straight to
   building this workflow instead. If a future session resumes this work, check whether
   that gap has since been closed rather than assuming it has.

   Also not yet built: a knowledge-base **ingestion** workflow (mirroring Area50's WF5)
   that would let a Voxitron customer's product/pricing docs actually get embedded into
   their `kb_<customers.id>` Qdrant collection. Without it, the WhatsApp agent's KB search
   returns nothing for every customer, and the system prompt is written to have the AI
   fall back honestly ("I'll get someone to help") rather than fabricate an answer in that
   case, but this is not a substitute for building real ingestion.
2. **Supabase schema for conversations, genuinely multi-tenant. Applied 2026-08-04.**
   `supabase/migrations/002_conversations.sql` has been run against the live Supabase
   project (same one `001_leads.sql` uses). Message shape (`direction`/`body`/`sent_at`)
   is adapted from a proven working pattern in a prior unrelated project (Area50app's
   `messages` table: `sender_type`/`content`/`created_at`), per the user's 2026-08-04
   request to reuse that schema rather than design from scratch.

   **Confirmed with the user 2026-08-04: Voxitron itself is a tenant of its own
   platform**, not just the vendor selling it. Voxitron gets its own row in `customers`,
   its own WhatsApp number(s), its own logged conversations, and its own dashboard access,
   the same tables and RLS as any client, proving the product by actually running on it.
   The user also confirmed two things that shaped the schema:
   - A customer account is not always one login: more than one person on a client's team,
     or more than one person on Voxitron's own team, may need dashboard access to the same
     customer's data. That ruled out a single `auth_user_id` FK on `customers`; the schema
     uses a `customer_members` join table instead.
   - A customer is not always one WhatsApp number either (corrected 2026-08-04, an earlier
     pass of this schema assumed exactly one number per customer). That ruled out a
     `whatsapp_number` column directly on `customers`; numbers live in their own
     `customer_whatsapp_numbers` table, many rows per customer.

   - `customers`: `id`, `business_name`, `created_at`. One row per tenant (a client, or
     Voxitron itself). **Created manually by Voxitron** when onboarding (no public
     self-signup flow), confirmed with the user 2026-07-28.
   - `customer_members`: `id`, `customer_id` (FK), `auth_user_id` (FK to `auth.users`),
     `created_at`, unique on `(customer_id, auth_user_id)`. One row per dashboard login
     granted access to a given customer's data. Voxitron's own team members are added to
     Voxitron's own `customers` row like any other membership.
   - `customer_whatsapp_numbers`: `id`, `customer_id` (FK), `whatsapp_number` (unique,
     stores Meta's `phone_number_id`), `label`, `created_at`. One row per WhatsApp number
     a customer operates; a customer can have several.
   - `conversations`: `id`, `customer_id` (FK), `contact_name`, `contact_phone`,
     `started_at`. One row per WhatsApp thread with an end customer. The n8n workflow
     resolves which customer a conversation belongs to by joining the inbound message's
     `phone_number_id` against `customer_whatsapp_numbers`, then attributes the
     conversation to that number's `customer_id`, regardless of how many numbers that
     customer has.
   - `messages`: `id`, `conversation_id` (FK), `direction` (`inbound`/`outbound`), `body`,
     `sent_at`.
   - RLS: `authenticated` dashboard users can only `SELECT` customers/conversations/
     messages/WhatsApp numbers reachable through a `customer_members` row matching
     `auth.uid()`. **No INSERT/UPDATE/DELETE policy exists for `anon` or `authenticated`
     on any of the five tables.** Only the n8n workflow writes to `conversations`/
     `messages`, using the Supabase **service role key** (never the anon key). `customers`,
     `customer_members`, and `customer_whatsapp_numbers` rows are created manually by
     Voxitron at onboarding (via the Supabase dashboard or a service-role script), not
     through any public insert path. Configuring the n8n service-role connection is the
     actual "n8n logging step" from item 1.
3. **Supabase Auth wired up**: `/login`, session handling via Supabase's Next.js helpers.
   No public `/signup`, accounts are created manually per the onboarding decision above.
4. **`/dashboard` route, protected**: unauthenticated visitors are redirected to
   `/login`, not shown an empty or broken page.
5. **Dashboard content.** Full screen-by-screen spec is in `DASHBOARD_UI.md`, written
   2026-08-04, read it before building any of this: `/login`, `/dashboard` (stats strip +
   per-number filter/switcher + conversation list), `/dashboard/conversations/[id]`
   (message thread), and `/dashboard/leads` (Voxitron-internal only). Every screen in
   that spec is scoped to real schema columns, no invented metrics or screens with no
   data source. If message logging isn't live yet when this phase is picked back up, the
   honest interim version is the leads list from Phase 3, not a fabricated chat UI with
   placeholder conversations. `DASHBOARD_UI.md` also has open questions to resolve before
   or during implementation (login method, per-number conversation attribution needing a
   possible schema addition, manual-reply-from-dashboard explicitly deferred).

### Phase 5: Cutover
- Remove the old static `.html` files and `assets/js/main.js` once the Next.js app has full parity and has been reviewed
- Update `CLAUDE.md` to drop the "migration in progress" framing once this phase lands
- Connect `voxitron.com` DNS to Vercel, confirm the live domain serves the new app correctly
- Update the "Deployment" section of `CLAUDE.md` to describe the Vercel flow (this file, `MASTER_PROMPT.md`, can be deleted or archived once the migration is fully live, at the user's call)

## Decisions already made (don't re-ask)

- Framework: Next.js (App Router), not Remix/Astro/etc.
- Backend: Next.js Route Handlers, not PHP, not a separate service
- Database/Auth: Supabase
- Hosting: Vercel
- Design system, brand, copy tone: unchanged, see `CLAUDE.md`
- WhatsApp Business Agent CTAs stay as `wa.me` links, never converted to the lead form
- Lead form fields (Phase 3): name, business name, email, phone (optional), which agent
  they're interested in (dropdown: Speed to Lead / Quoting Agent / Both)
- Dashboard scope (Phase 4): customers log in and see their real WhatsApp conversation
  history (contact + message log), not a generic analytics dashboard
- Customer/conversation mapping (Phase 4): a customer can have multiple WhatsApp Business
  numbers (corrected 2026-08-04, not one-to-one); conversations are tagged by which
  customer owns the number that received them, via `customer_whatsapp_numbers`
- Dashboard account creation (Phase 4): manual, done by Voxitron at client onboarding, no
  public self-signup flow
- **Multi-tenant, confirmed 2026-08-04**: Voxitron itself is a tenant of its own platform
  (its own `customers` row, WhatsApp number(s), logged conversations, dashboard access),
  not only a vendor selling to others. A customer account supports multiple dashboard
  logins via `customer_members` (a client's team, or Voxitron's own team), not a single
  login per customer. See Phase 4 schema below
- **Corrected 2026-08-04**: no WhatsApp automation exists yet at all, there was no
  existing workflow to add logging to. `n8n/voxitron-whatsapp-agent.json` is the new
  workflow built to fill that gap; see Phase 4 above for full detail and the accepted
  interim gap (wa.me messages currently go unanswered)
- Voxitron's WhatsApp workflow logs to Supabase directly via its own Postgres node using
  the service role key, reusing Area50's Qdrant/KB retrieval pattern but not its Mongo-
  based logging or its `callN8n()` helper (wrong data direction for this use case)

## Open questions to resolve with the user before the relevant phase, not guessed

- Whether `mailto:` remains as a fallback/secondary option anywhere (Phase 3)
- Exact n8n workflow changes needed to log messages to Supabase, and when that work happens (Phase 4, outside this repo)
- Exact cutover timing for DNS (Phase 5), this is a production domain change and needs explicit go-ahead

## Working style for this migration

- One phase at a time. Report what's done and what's next in plain terms, don't mark a phase complete if any item in its checklist above isn't actually true
- Commit at the end of each phase (or smaller, logical checkpoints within a phase) so there's always a working state to roll back to
- When a phase surfaces a decision from "Open questions" above, stop and ask rather than assuming
- If existing copy/content needs to change (not just move) to fit the new structure, flag it, don't silently rewrite established copy
