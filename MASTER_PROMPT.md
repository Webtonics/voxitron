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
- Supabase Auth wired up: `/login` (and `/signup` if needed, confirm with user), session handling via Supabase's Next.js helpers
- `/dashboard` route, protected: unauthenticated visitors are redirected to `/login`, not shown an empty or broken page
- Dashboard content scope must be confirmed before building, do not invent metrics or screens with no real data source. If the only real data at this point is submitted leads, the dashboard's honest first version is a leads list, not a fabricated analytics view

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

## Open questions to resolve with the user before the relevant phase, not guessed

- Exact lead form fields and validation rules (Phase 3)
- Whether `mailto:` remains as a fallback/secondary option anywhere (Phase 3)
- What the dashboard actually shows, and where that data comes from if it's more than submitted leads (Phase 4)
- Whether customers self-signup for the dashboard or accounts are created manually by Voxitron (Phase 4)
- Exact cutover timing for DNS (Phase 5), this is a production domain change and needs explicit go-ahead

## Working style for this migration

- One phase at a time. Report what's done and what's next in plain terms, don't mark a phase complete if any item in its checklist above isn't actually true
- Commit at the end of each phase (or smaller, logical checkpoints within a phase) so there's always a working state to roll back to
- When a phase surfaces a decision from "Open questions" above, stop and ask rather than assuming
- If existing copy/content needs to change (not just move) to fit the new structure, flag it, don't silently rewrite established copy
