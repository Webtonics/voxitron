# Voxitron WhatsApp Agent: n8n workflow

`voxitron-whatsapp-agent.json` is an importable n8n workflow. It is **not active and
cannot go live yet**: no WhatsApp Business Cloud API app exists for Voxitron as of
2026-08-04, and this workflow needs real credentials wired in before Meta will deliver
any messages to it. This file gets the workflow logic right and ready; it does not
remove the need for the Meta-side setup below.

## What it does

1. Handles Meta's webhook verification handshake (`GET`, checks `hub.verify_token`,
   echoes `hub.challenge`).
2. Receives inbound WhatsApp messages (`POST`), acknowledges immediately (Meta requires a
   fast 200 or it disables the webhook), then processes in the background.
3. Ignores non-message events (delivery/read receipts) that Meta sends on the same path.
4. Looks up which Voxitron customer owns the WhatsApp number the message arrived on
   (`customers.whatsapp_number` in Supabase). Stops if no match, never guesses.
5. Finds or creates the `conversations` row for that customer + contact phone number.
6. Logs the inbound message to `messages` (Supabase).
7. Generates a reply with an AI Agent node, using a per-customer Qdrant knowledge-base
   collection (`kb_<customers.id>`) as a retrieval tool, same pattern as Area50's WF1.
8. Sends the reply back through the WhatsApp Cloud API.
9. Logs the outbound message to `messages` (Supabase).

## Before this can be imported and turned on

### 1. Meta / WhatsApp Business Platform setup (outside n8n, not started yet)
- Create a Meta Business Account and a WhatsApp Business Platform app in Meta Business
  Manager, if one doesn't already exist for Voxitron.
- Register the WhatsApp Business number(s) there. Each Voxitron customer needs their own
  number under the same Meta Business Account (per the one-number-per-customer decision
  in `MASTER_PROMPT.md`).
- Generate a permanent access token (System User token, not a 24-hour temporary one).
- Note each number's `phone_number_id`, this is what Meta sends in the webhook payload
  and what must match `customers.whatsapp_number` in Supabase exactly. Decide now
  whether `customers.whatsapp_number` stores the human phone number or the
  `phone_number_id`, and be consistent, this workflow's `Load Customer by Number` node
  assumes it's the `phone_number_id`.

### 2. n8n credentials to create, then wire into the placeholder node fields below
Every node with `REPLACE_WITH_..._CREDENTIAL_ID` in `voxitron-whatsapp-agent.json` needs
a real n8n credential selected after import:

| Placeholder | Credential type | Notes |
|---|---|---|
| `REPLACE_WITH_SUPABASE_SERVICE_ROLE_CREDENTIAL_ID` | Postgres | Host/port/db/user/password from Supabase project settings, using the **service role** connection, not the anon key. This is what lets the workflow write to `customers`/`conversations`/`messages` despite RLS. Never use this credential anywhere outside n8n. |
| `REPLACE_WITH_OPENAI_CREDENTIAL_ID` | OpenAI API | Same OpenAI account/key pattern as Area50's workflows. |
| `REPLACE_WITH_QDRANT_CREDENTIAL_ID` | QdrantApi | Points at wherever Qdrant is hosted. Confirm with the user whether Voxitron gets its own Qdrant instance/collection namespace or shares infrastructure with Area50, not yet decided. |
| `REPLACE_WITH_META_ACCESS_TOKEN_CREDENTIAL_ID` | Header Auth | Header name `Authorization`, value `Bearer <permanent Meta access token>` from step 1. |

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

### 5. Knowledge base ingestion: not built yet
This workflow's Qdrant search step assumes a `kb_<customers.id>` collection already has
each customer's product/pricing/policy documents embedded into it. No ingestion workflow
exists yet for Voxitron (Area50's WF5 is the closest reference pattern, but it's scoped
to Area50's own company/document model). Until an ingestion workflow exists and has been
run for a customer, their Qdrant search will simply return nothing and the AI Agent
should fall back to its "I'll get someone to help" behavior rather than fabricate an
answer, per the system prompt's rule. Building that ingestion workflow is separate,
follow-up work.

## Known gap this does not fix

As of 2026-08-04, the site's `wa.me` links promise a live AI reply and none exists yet;
messages currently go unanswered. The user was asked whether to pause on this or add an
interim manual-reply stopgap, and chose to proceed with building this workflow instead,
accepting the gap in the meantime. See `MASTER_PROMPT.md`'s Phase 4 section for the full
context if this is picked back up later.
