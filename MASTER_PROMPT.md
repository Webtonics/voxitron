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

**This phase depends on a system outside this repo.** The dashboard's whole point is to
show customers their real WhatsApp conversation history. That data currently does not
exist anywhere: the WhatsApp agent runs as an n8n workflow (self-hosted or n8n Cloud, the
user has admin access), and as of this planning pass, that workflow does not log
messages anywhere. Confirmed with the user on 2026-07-28. Building dashboard UI before
this is fixed would violate the "no fabricated data" rule below, don't do it.

Sequencing within Phase 4:

1. **n8n logging step (blocking, done outside this repo's codebase).** The n8n workflow
   that runs the WhatsApp agent needs a step added that writes each inbound/outbound
   message to Supabase (the same project this repo already uses for leads), tagged with
   which customer's WhatsApp number the conversation belongs to. This is n8n
   configuration work (an n8n Postgres/Supabase node added directly to the workflow), not
   Next.js code. Do not attempt to build the dashboard until this is confirmed working
   and at least one real conversation has landed in the `conversations`/`messages` tables
   (see schema below).

   The user asked (2026-07-28) whether code from a prior unrelated project,
   `Area50app`, could be reused here. Investigated and found: Area50 has no actual n8n
   workflow files (its workflows live on a separate n8n VPS, not as files in that repo),
   and its own WhatsApp integration was never finished (`app/api/webhooks/whatsapp/route.ts`
   is stubbed, returns 501; its n8n WhatsApp workflows WF11/WF12 were never built either).
   What Area50 does have is a small reusable pattern, `lib/n8n.ts`'s `callN8n()` helper
   (POST to an n8n webhook route with a shared-secret header, plus a workaround for
   malformed JSON n8n sometimes returns), for when *this* Next.js app needs to call
   *into* n8n. That's the opposite direction from message logging: logging means n8n
   writes to Supabase directly via its own Postgres/Supabase node, this repo isn't
   involved in that data path at all. So nothing was ported for the logging step itself;
   keep the `callN8n()` pattern in mind only if a future feature needs this repo to call
   an n8n webhook.
2. **Supabase schema for conversations** (can be created ahead of the n8n work, since the
   table structure doesn't depend on n8n specifics):
   - `customers`: `id`, `business_name`, `whatsapp_number`, `created_at`. One row per
     Voxitron client. **Created manually by Voxitron** when onboarding a new client (no
     public self-signup flow), confirmed with the user 2026-07-28. Each customer's
     dashboard login (a Supabase Auth user) is linked to their `customers.id`, also set up
     manually at onboarding time.
   - `conversations`: `id`, `customer_id` (FK to `customers.id`), `contact_name`,
     `contact_phone`, `started_at`. One row per WhatsApp thread with an end customer.
     Tagged by which business's WhatsApp number received the message, since each Voxitron
     customer has their own WhatsApp Business number (confirmed with the user 2026-07-28,
     this is how conversations get attributed to the right dashboard).
   - `messages`: `id`, `conversation_id` (FK to `conversations.id`), `direction`
     (`inbound` / `outbound`), `body`, `sent_at`.
   - RLS: a customer's Supabase Auth user can only `SELECT` conversations/messages where
     `conversations.customer_id` matches their own linked `customers.id`. No cross-
     customer read access, ever.
3. **Supabase Auth wired up**: `/login`, session handling via Supabase's Next.js helpers.
   No public `/signup`, accounts are created manually per the onboarding decision above.
4. **`/dashboard` route, protected**: unauthenticated visitors are redirected to
   `/login`, not shown an empty or broken page.
5. **Dashboard content**: a real list of the logged-in customer's conversations, each
   expandable to its message history. Do not invent metrics, analytics, or screens with
   no real data source. If message logging isn't live yet when this phase is picked back
   up, the honest interim version is the leads list from Phase 3, not a fabricated chat
   UI with placeholder conversations.

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
- Customer/conversation mapping (Phase 4): one WhatsApp Business number per customer;
  conversations are tagged by which customer's number received them
- Dashboard account creation (Phase 4): manual, done by Voxitron at client onboarding, no
  public self-signup flow
- The WhatsApp agent runs as an n8n workflow (user has admin access), and does not
  currently log messages anywhere. See Phase 4 above, this is a hard blocker that has to
  be fixed in n8n, not in this repo, before dashboard UI can show real data

## Open questions to resolve with the user before the relevant phase, not guessed

- Whether `mailto:` remains as a fallback/secondary option anywhere (Phase 3)
- Exact n8n workflow changes needed to log messages to Supabase, and when that work happens (Phase 4, outside this repo)
- Exact cutover timing for DNS (Phase 5), this is a production domain change and needs explicit go-ahead

## Working style for this migration

- One phase at a time. Report what's done and what's next in plain terms, don't mark a phase complete if any item in its checklist above isn't actually true
- Commit at the end of each phase (or smaller, logical checkpoints within a phase) so there's always a working state to roll back to
- When a phase surfaces a decision from "Open questions" above, stop and ask rather than assuming
- If existing copy/content needs to change (not just move) to fit the new structure, flag it, don't silently rewrite established copy
