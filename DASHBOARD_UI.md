# Voxitron Customer Dashboard: UI Spec

Design plan for Phase 4's dashboard (`/login`, `/dashboard`, and nested routes). Nothing
in this file is built yet as of 2026-08-04, this is the spec to build against, same
relationship to Phase 4 that the rest of `MASTER_PROMPT.md` has to the whole migration.
Read `MASTER_PROMPT.md`'s Phase 4 section first, it has the schema, the multi-tenant
model, and the current blockers (no WhatsApp automation live yet, no KB ingestion built).

**Every screen below is scoped to data that actually exists in the schema.** No screen
here shows a metric, chart, or field that doesn't map to a real column in `customers` /
`customer_members` / `customer_whatsapp_numbers` / `conversations` / `messages` / `leads`.
If a future request wants something beyond that, the data source has to exist first, per
CLAUDE.md's "Customer Dashboard" section and the project's hard rule against fabricated
data.

---

## Who sees this

Anyone with a row in `customer_members` linking their Supabase Auth login to a
`customers.id`. That includes Voxitron's own team, logged into Voxitron's own tenant row,
same UI, same routes, no special-cased "admin" dashboard. A person can belong to more
than one customer's `customer_members` (e.g. a Voxitron team member also set up as a
member on a client account for support purposes), see "Multi-customer switching" below.

---

## Routes

```
/login                          Supabase Auth login (email + password or magic link, TBD)
/dashboard                      Overview: stats strip + conversation list
/dashboard/conversations/[id]   Single conversation thread
/dashboard/leads                Leads list (only shown if the logged-in customer is Voxitron itself)
```

`/dashboard` and everything under it redirects unauthenticated visitors to `/login`, not
a blank or broken page. `/dashboard/leads` is Voxitron-internal: the `leads` table has no
`customer_id` (it's raw form submissions, not scoped to a tenant), so it should only be
reachable by members of Voxitron's own `customers` row, not shown to client tenants at
all. Enforce this server-side, not just by hiding a nav link.

---

## `/login`

Plain, matches the marketing site's design system (navy background, lime accent), not a
generic auth-template look.

- Voxitron wordmark, same as the site nav
- Email + password fields (or magic link, decide before building, see "Open questions")
- On success: redirect to `/dashboard`
- On failure: real error message from Supabase Auth, not a generic "something went wrong"
- No "Sign up" link. Accounts are created manually by Voxitron at onboarding
  (`supabase/onboarding-template.sql`), confirmed in `MASTER_PROMPT.md`. If someone lands
  here without an account, the honest message is that access is granted by Voxitron, not
  a self-serve flow.

---

## `/dashboard` (overview)

### Stats strip
Three or four numbers computed live from the logged-in customer's own rows, styled like
the marketing site's `.stats-grid` (numbers in the lime accent, small label underneath).
Only include a stat if it's a straightforward, honest count/aggregate:

- **Conversations**: `count(*) from conversations where customer_id = <this customer>`
- **Messages**: `count(*) from messages` joined through those conversations
- **This week**: same two counts, filtered to `sent_at`/`started_at` in the last 7 days
- Do not add "response time," "satisfaction," "conversion rate," or any metric that
  isn't a direct count/aggregate of logged rows. Those require data this schema doesn't
  capture (nothing logs read receipts, ratings, or outcomes yet).

### Number filter/switcher
Confirmed with the user 2026-08-04: customers can have multiple WhatsApp numbers, and the
dashboard should let them filter by number, not just pool everything.

- A row of tabs or a dropdown above the conversation list, populated from
  `customer_whatsapp_numbers` for this customer (`label` if set, otherwise a shortened
  `whatsapp_number`)
- Default tab: "All numbers" (pooled), matching the stats strip's default scope
- Selecting a number filters both the stats strip and the conversation list below to
  conversations whose messages arrived on that number. This requires conversations to be
  attributable to a specific number, not just a customer, confirm during implementation
  whether that needs a `conversations.whatsapp_number_id` column (schema doesn't have one
  yet, "Open questions" below)
- If the customer has exactly one number, skip the switcher entirely, don't show a
  dropdown with one disabled option

### Conversation list
Below the stats strip and number switcher.

- One row per `conversations` row for this customer (filtered by selected number if any)
- Each row: `contact_name` (fall back to `contact_phone` if no name), a preview of the
  most recent message's `body` (truncated), and a relative timestamp of that message's
  `sent_at`
- Sorted by most recent message first
- Empty state (no conversations yet): a real, honest message, e.g. "No conversations
  yet. Once your WhatsApp agent is live, conversations will show up here." Not a
  fabricated example conversation, not a loading spinner that never resolves
- Clicking a row navigates to `/dashboard/conversations/[id]`

---

## `/dashboard/conversations/[id]`

- Header: `contact_name` / `contact_phone`, and which number the conversation is on
  (`customer_whatsapp_numbers.label` or number)
- Message thread: every `messages` row for this conversation, ordered by `sent_at`.
  Inbound and outbound styled distinctly (reuse the marketing site's `.ui-msg-ai` /
  `.ui-msg-customer` bubble treatment from `globals.css` for visual consistency, inbound
  = customer message styling, outbound = agent message styling)
- No reply box in the first version. The agent replies automatically via the n8n
  workflow; a human takeover/reply-from-dashboard feature is a real feature with its own
  design questions (does a manual reply get sent via WhatsApp Cloud API from here? does
  it pause the AI agent for that conversation?), not assumed or half-built here. Flag it
  as a distinct future feature if wanted, don't bolt on a text input that doesn't
  actually send anything
- 404 (or redirect to `/dashboard` with a message) if the conversation's `customer_id`
  doesn't match the logged-in user's customer, RLS already prevents the query from
  returning another customer's row, but the UI should handle the empty result gracefully,
  not crash

---

## `/dashboard/leads` (Voxitron-internal only)

- Same list-style layout as conversations: one row per `leads` row, name/business/email/
  phone/interested_agent/created_at
- No filter/search in the first version, add one only once lead volume actually justifies
  it
- Gate this route so only members of Voxitron's own `customers` row can reach it. The
  cleanest way: check whether the logged-in user's `customer_members` row(s) include
  Voxitron's own `customers.id` (a known, fixed UUID once Voxitron onboards itself),
  confirm the exact check during implementation

---

## Shared dashboard chrome

Same principle as the marketing site: shared components, not copy-pasted per page.

- `components/dashboard/DashboardNav.tsx`: Voxitron wordmark, customer/business name of
  the active tenant, sign-out button. If the logged-in user belongs to more than one
  customer (see "Multi-customer switching"), this is also where that switcher lives
- `components/dashboard/StatsStrip.tsx`, `ConversationList.tsx`, `ConversationThread.tsx`:
  reusable across `/dashboard` and any future dashboard route that needs them
- Visual language matches the marketing site's design tokens (`globals.css`) exactly:
  navy/lime palette, DM Sans/DM Mono, same spacing scale, same border-radius rules. The
  dashboard should feel like the same product as the marketing pages, not a bolted-on
  generic admin panel

---

## Multi-customer switching

If a logged-in user has more than one `customer_members` row (e.g. a Voxitron team
member who's also a member on a client account, or genuinely runs multiple businesses
through Voxitron), the dashboard needs a way to pick which customer's data is currently
being viewed.

- A dropdown in `DashboardNav`, defaulting to the first/only customer if there's just one
- Switching sets which `customer_id` every query on the page scopes to
- Not needed for the very first build if, in practice, every real account only has one
  membership at launch, but the schema already supports multiple, so don't hardcode an
  assumption of exactly one membership per user anywhere in the dashboard code

---

## Open questions to resolve before or during implementation

- **Login method**: email+password vs. magic link vs. both. Not yet decided with the
  user.
- **Per-number conversation attribution**: the number switcher above assumes a
  conversation can be tied to a specific `customer_whatsapp_numbers` row, but
  `conversations` currently has no such column, only `customer_id`. Either add
  `conversations.whatsapp_number_id` (nullable FK) so the n8n workflow can set it when
  creating/finding a conversation, or confirm with the user that "pooled by default,
  number filter is a nice-to-have for later" is acceptable for the first build. Don't
  silently build the filter UI against a column that doesn't exist.
- **Manual reply from the dashboard**: explicitly out of scope for the first version
  (see `/dashboard/conversations/[id]` above), flag as a distinct future ask if the user
  wants it, don't half-build it.
- **Leads table customer scoping**: currently `leads` has no `customer_id` at all, it's
  pre-tenant (a form submission from a prospective customer, not yet onboarded). The
  `/dashboard/leads` gating logic above assumes "Voxitron-only" via checking
  `customer_members` against Voxitron's own fixed `customers.id`. Confirm this is right
  once Voxitron has actually onboarded itself and that ID is known.
