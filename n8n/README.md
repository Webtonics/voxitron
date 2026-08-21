# Voxitron WhatsApp Agent: n8n workflow

`voxitron-whatsapp-agent.json` is an importable n8n workflow. It is **not active and
cannot go live yet**: no WhatsApp Business Cloud API app exists for Voxitron as of
2026-08-04, and this workflow needs real credentials wired in before Meta will deliver
any messages to it. This file gets the workflow logic right and ready; it does not
remove the need for the Meta-side setup below.

**Requires these Supabase migrations applied, in order:**
`supabase/migrations/002_conversations.sql` (the base `customers`/`conversations`/
`messages` schema), `003_conversation_escalation.sql` (adds `conversations.needs_human` /
`escalation_reason`, used by the escalation branch below), `004_conversation_number_attribution.sql`
(adds `conversations.whatsapp_number_id`), `005_message_dedup.sql` (adds
`messages.wa_message_id`, used by the deduplication check below),
`006_conversation_uniqueness.sql` (adds a unique constraint backing the atomic
find-or-create conversation query below), and `009_customer_config.sql` (adds
`customers.industry` / `customers.config`, used by the per-customer system prompt below).

## What it does

1. Handles Meta's webhook verification handshake (`GET`, checks `hub.verify_token`,
   echoes `hub.challenge`).
2. Receives inbound WhatsApp messages (`POST`), acknowledges immediately (Meta requires a
   fast 200 or it disables the webhook), then processes in the background.
3. Ignores non-message events (delivery/read receipts) that Meta sends on the same path.
4. **Splits multi-message payloads into one item per message.** Added 2026-08-13. Meta's
   webhook can legitimately batch more than one message into a single `POST` (documented
   behavior, not rare, e.g. after a connectivity gap is resolved and queued messages
   arrive together). Every extraction node previously hardcoded `messages[0]`, silently
   dropping `messages[1]`, `messages[2]`, etc. A `Split Out` node now turns the array into
   one n8n item per message before any extraction happens, so every message in a batch
   gets processed and replied to.
5. **Deduplicates retried webhook deliveries.** Added 2026-08-13. Meta's Cloud API uses
   at-least-once delivery and retries for up to 7 days with backoff if a delivery is slow
   or fails, meaning the same message can legitimately arrive more than once. `Check for
   Duplicate Delivery` looks up Meta's own message id (`wa_message_id`, requires
   `005_message_dedup.sql`) against already-logged messages before doing anything else; if
   found, the execution stops there rather than generating and sending a second AI reply.
6. Looks up which Voxitron customer owns the WhatsApp number the message arrived on
   (`customer_whatsapp_numbers` in Supabase, joined to `customers`; a customer can have
   more than one number). Stops if no match, never guesses.
7. **Handles text, image, and voice note (audio) messages.** Added 2026-08-12, this
   workflow previously only read `messages[0].text.body` and silently dropped anything
   else. Now:
   - Text messages pass straight through unchanged.
   - Image messages: downloads the photo via the WhatsApp Cloud API's two-step media
     fetch (`GET /{media-id}` for a short-lived URL, then `GET` that URL, both with the
     same bearer token), then describes it with GPT-4o vision. Any caption the customer
     sent alongside the photo is appended to the description, so "here's the shoe, do you
     have it in size 42?" isn't lost.
   - Voice notes: same two-step download, then transcribed with Whisper (`whisper-1`).
     WhatsApp voice notes are Opus-encoded `.ogg`, which Whisper accepts directly.
   - Either way, the result replaces `messageText` before the rest of the pipeline runs,
     so logging and the AI Agent see one consistent field regardless of how the customer
     actually messaged.
   - **Video, document, sticker, and other unsupported message types: escalated to a
     human, not silently dropped.** Added 2026-08-12. `Is Text?` catches anything that's
     neither plain text nor an image/audio message, flags the conversation
     (`conversations.needs_human = true`, `escalation_reason` set to e.g.
     `unsupported_message_type:video`, needs `supabase/migrations/003_conversation_escalation.sql`
     applied first), logs a placeholder inbound message, and sends the customer a fixed
     reply: "I can't view that kind of file yet, sorry. I've let our team know, they'll
     follow up with you shortly." That reply is not AI-generated, there's nothing to
     reason about. Matches the promise already on `/whatsapp-agent`'s FAQ ("It flags the
     chat with the full conversation. You take over."). **No direct notification to the
     business owner is sent** (no email, no internal WhatsApp alert), this was scoped
     deliberately: there's no field anywhere yet for "which number/email to alert",
     confirmed with the user 2026-08-12 as a later decision, not an oversight. The
     dashboard's future conversation list (`DASHBOARD_UI.md`) is where this flag is meant
     to surface once built.
8. **Finds or creates the `conversations` row atomically.** Reworked 2026-08-13: the
   original find-or-create query (`INSERT ... WHERE NOT EXISTS`) had a race, two messages
   from the same contact arriving close together could both pass the existence check
   before either INSERT committed, creating duplicate conversation rows. Now an
   `INSERT ... ON CONFLICT (customer_id, contact_phone) DO UPDATE` upsert, backed by a real
   unique constraint (`006_conversation_uniqueness.sql`), so Postgres itself serializes
   this, no race possible regardless of timing.
9. Logs the inbound message to `messages` (Supabase): the typed text, or the image
   description / voice transcript for media messages, plus `wa_message_id` for the
   deduplication check above.
10. **Builds a per-customer system prompt.** Added 2026-08-21. `customers.config`
    (`009_customer_config.sql`) holds each customer's qualification questions, booking/
    ordering flow instructions, tone notes, and escalation triggers, filled in by Voxitron
    at onboarding (`supabase/onboarding-template.sql` Step 1.5, starting points in
    `supabase/industry-templates.md`). The `Build System Prompt` node assembles these into
    one prompt string, so `AI Agent Reply` below behaves differently per customer/industry
    instead of running one hardcoded prompt for everyone. A customer with no config set
    yet falls back gracefully to just the business name plus the fixed platform-level
    rules (knowledge-base-first, WhatsApp-texting style).
11. Generates a reply with an AI Agent node, using that per-customer system prompt and a
    per-customer Qdrant knowledge-base collection (`kb_<customers.id>`) as a retrieval
    tool, same KB pattern as Area50's WF1. **If this fails after retrying** (OpenAI
    outage, Qdrant down, etc., added 2026-08-13): routes to a fixed fallback reply
    ("Sorry, I'm having trouble right now...") and flags the conversation `needs_human`,
    instead of the customer getting silence with no record of why.
12. Sends the reply back through the WhatsApp Cloud API.
13. Logs the outbound message to `messages` (Supabase).

**Error handling, added 2026-08-13:** every Postgres write, the Meta HTTP calls, and the
OpenAI/vision/transcription calls now retry up to 3 times (2 second gaps) on failure
before giving up, rather than the workflow dying silently on the first transient error.

## Before this can be imported and turned on

### 1. Meta / WhatsApp Business Platform setup (outside n8n, not started yet)
- Create a Meta Business Account and a WhatsApp Business Platform app in Meta Business
  Manager, if one doesn't already exist for Voxitron.
- Register the WhatsApp Business number(s) there, under the same Meta Business Account. A
  customer can have more than one number (confirmed 2026-08-04); each one gets its own row
  in `customer_whatsapp_numbers`, all pointing at the same `customer_id`.
- Generate a permanent access token (System User token, not a 24-hour temporary one).
- Note each number's `phone_number_id`, this is what Meta sends in the webhook payload
  and what must match `customer_whatsapp_numbers.whatsapp_number` in Supabase exactly.
  That column stores the `phone_number_id`, not the human-readable phone number, this
  workflow's `Load Customer by Number` node assumes that.

### 2. n8n credentials to create, then wire into the placeholder node fields below
Every node with `REPLACE_WITH_..._CREDENTIAL_ID` in `voxitron-whatsapp-agent.json` needs
a real n8n credential selected after import:

| Placeholder | Credential type | Notes |
|---|---|---|
| `REPLACE_WITH_SUPABASE_SERVICE_ROLE_CREDENTIAL_ID` | Postgres | Host/port/db/user/password from Supabase project settings, using the **service role** connection, not the anon key. This is what lets the workflow write to `customers`/`conversations`/`messages` despite RLS. Never use this credential anywhere outside n8n. |
| `REPLACE_WITH_OPENAI_CREDENTIAL_ID` | OpenAI API | Same OpenAI account/key pattern as Area50's workflows. |
| `REPLACE_WITH_QDRANT_CREDENTIAL_ID` | QdrantApi | Points at wherever Qdrant is hosted. Confirm with the user whether Voxitron gets its own Qdrant instance/collection namespace or shares infrastructure with Area50, not yet decided. |
| `REPLACE_WITH_META_ACCESS_TOKEN_CREDENTIAL_ID` | Header Auth | Header name `Authorization`, value `Bearer <permanent Meta access token>` from step 1. Used by `Send WhatsApp Reply` and, as of the image/voice note support above, also by `Get Media URL` and `Download Media Binary`, same token, same scopes, nothing extra to provision. |

### 3. n8n environment variable
- `VOXITRON_WA_VERIFY_TOKEN`: any string you choose. Set it in n8n's environment, and
  enter the exact same string as the "Verify Token" when configuring the webhook in Meta
  Business Manager. This is what proves the webhook subscription request actually came
  from Meta.

### 4. Register the webhook URL with Meta
Once imported and credentials are set, the workflow's production webhook URL (both the
`GET` verify path and `POST` receive path resolve to the same
`.../webhook/voxitron/whatsapp` route, n8n routes by HTTP method) goes into Meta Business
Manager's WhatsApp app configuration as the callback URL, alongside the verify token from
step 3.

### 5. Knowledge base ingestion: workflow written, not yet run for any customer
This workflow's Qdrant search step assumes a `kb_<customers.id>` collection already has
each customer's product/pricing/policy documents embedded into it. `n8n/voxitron-kb-ingest.json`
(see `n8n/KB_INGEST_README.md`) is the ingestion workflow that populates it, written
2026-08-12, mirroring Area50's WF5 pattern. It reuses this workflow's Supabase/Qdrant/
OpenAI credentials, no new credential types to create. Until it's imported and actually
run for a given customer, that customer's Qdrant search still returns nothing and the AI
Agent falls back to its "I'll get someone to help" behavior rather than fabricate an
answer, per the system prompt's rule, same as before.

## Known gap this does not fix

As of 2026-08-04, the site's `wa.me` links promise a live AI reply and none exists yet;
messages currently go unanswered. The user was asked whether to pause on this or add an
interim manual-reply stopgap, and chose to proceed with building this workflow instead,
accepting the gap in the meantime. See `MASTER_PROMPT.md`'s Phase 4 section for the full
context if this is picked back up later.
