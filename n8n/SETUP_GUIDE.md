# Voxitron WhatsApp Agent + Knowledge Base: Full Setup Guide

One consolidated, start-to-finish walkthrough for getting both n8n workflows live:
`voxitron-whatsapp-agent.json` (replies to customers on WhatsApp) and
`voxitron-kb-ingest.json` (feeds the agent's knowledge so it answers correctly instead of
guessing). Written for someone doing this for the first time, no n8n or Meta experience
assumed.

**Read this top to bottom, in order.** Later steps depend on earlier ones. Each part links
to the deeper-detail doc for that piece (`n8n/README.md`, `n8n/KB_INGEST_README.md`,
`n8n/meta-whatsapp-setup.md`) if you want more background than what's here.

---

## The big picture

```
Customer's WhatsApp  --->  Meta (WhatsApp Cloud API)  --->  n8n webhook
                                                                 |
                                                                 v
                                              voxitron-whatsapp-agent.json
                                          (looks up customer, reads knowledge
                                           base, replies, logs to Supabase)
                                                                 ^
                                                                 |
                                                    reads from Qdrant collection
                                                     kb_<customer's id>
                                                                 ^
                                                                 |
                                              voxitron-kb-ingest.json
                                    (you feed it a document: paste, website
                                     page, PDF/Word file, or Google Sheet)
```

Two systems, one job: the ingest workflow puts knowledge in, the agent workflow pulls
knowledge out to answer customers. Both write to the same Supabase project and the same
Qdrant vector database.

**What you need accounts for, before starting:**

| Service | What it's for | Free tier available? |
|---|---|---|
| Supabase | Database (already set up for this project) | Yes, already in use |
| n8n | Runs both workflows (you said this is already self-hosted and running) | N/A, already have it |
| Meta Business / WhatsApp Cloud API | Sending and receiving WhatsApp messages | Yes, has a free test tier |
| OpenAI | AI replies, embeddings, image/voice understanding | Pay-as-you-go, no free tier |
| Qdrant | Stores the knowledge base as searchable vectors | Yes, free tier or self-hosted |
| CloudConvert | Only needed if you'll upload `.docx` (Word) files to the knowledge base | Yes, small free tier |
| Google Cloud (for Google Sheets) | Only needed if you'll feed the knowledge base from a Google Sheet | Yes, free |

If you don't plan to use Word file uploads or Google Sheets as knowledge sources, skip
CloudConvert and Google Cloud entirely, everything else still works.

---

## Part 1: Supabase database setup

Everything both workflows write to lives in one Supabase project. There are 6 migration
files in `supabase/migrations/`, and they must run **in this exact order** (each one
builds on the last).

### 1.1 Open the SQL Editor

Go to: **https://supabase.com/dashboard/project/ngkavjgrlixqbwatmkod/sql/new**

### 1.2 Run each migration file, in order

For each file below: open it in your editor, copy the **entire contents**, paste into the
Supabase SQL Editor, click **Run**. Then move to the next file.

1. `supabase/migrations/001_leads.sql`
2. `supabase/migrations/002_conversations.sql`
3. `supabase/migrations/003_conversation_escalation.sql`
4. `supabase/migrations/004_conversation_number_attribution.sql`
5. `supabase/migrations/005_message_dedup.sql`
6. `supabase/migrations/006_conversation_uniqueness.sql`

**If you get an error that something "already exists"** (e.g. a policy or table), that
migration was already run in an earlier session, skip it and move to the next one. Most
of these files are safe to re-run (they use `if not exists`), but Postgres policies
aren't, so a policy-already-exists error is expected and harmless if you're resuming
earlier work rather than starting fresh.

### 1.3 Get your Supabase service role key

Both workflows need this to write to the database (it bypasses the security rules regular
users are subject to, since these are trusted backend workflows, not public users).

1. Go to **Project Settings > API** in Supabase.
2. Copy the value under **service_role** (NOT the "anon" key, that's a different,
   public-safe key used by the website itself).
3. Also copy your **Database Password** (Project Settings > Database, or the one you set
   when the project was created) and the **Connection string** host/port/database name
   from the same page.

Keep these somewhere safe, you'll paste them into n8n credentials in Part 3.

---

## Part 2: Meta / WhatsApp Cloud API setup

This is what actually lets messages flow between a customer's phone and your workflow.
Full detail is in `n8n/meta-whatsapp-setup.md`; this section is the condensed version.

### 2.1 Create a Meta Business Account

Go to **business.facebook.com** and create a Business Account for Voxitron (skip if one
already exists). You'll need a Facebook account to administer it, doesn't have to be
personal.

### 2.2 Create a WhatsApp Business Platform app

1. Go to **developers.facebook.com > My Apps > Create App**.
2. Choose **"Business"** as the app type, link it to the Business Account from 2.1.
3. Add the **"WhatsApp"** product to the app.

### 2.3 Add a phone number

1. In the app's **WhatsApp > API Setup** page, either use the free test number Meta
   provides (fine for getting started, limited to a few verified recipient numbers) or add
   a real business number.
2. A real number can't already be active on the regular WhatsApp or WhatsApp Business
   consumer app. Meta walks you through SMS/call verification.
3. **Copy the number's `phone_number_id`** (shown on this page, a long numeric string, not
   the phone number itself). Write this down, you'll need it for Supabase in Part 2.5.

### 2.4 Generate a permanent access token

The default token on the API Setup page expires in 24 hours, fine for a first test, not
for production.

1. Go to **Business Settings > Users > System Users**.
2. Create a System User (e.g. "Voxitron n8n"), role: **Admin**.
3. Assign the WhatsApp app from 2.2 to this System User with full control.
4. Generate a token: select the `whatsapp_business_messaging` and
   `whatsapp_business_management` permissions, no expiration.
5. **Copy this token immediately, Meta only shows it once.** This is your permanent
   access token, used in n8n as `Authorization: Bearer <token>`.

### 2.5 Register Voxitron (or your first customer) in Supabase

Every WhatsApp number needs a row in Supabase linking it to a customer before the agent
will respond to it. Use `supabase/onboarding-template.sql` as a copy-paste template in
the SQL Editor:

1. Create a `customers` row (business name).
2. Create a `customer_whatsapp_numbers` row: the `phone_number_id` from step 2.3 goes in
   the `whatsapp_number` column (yes, that column stores the Meta ID, not the human phone
   number, this is intentional, it's what the webhook payload actually contains).
3. If you want a dashboard login for this customer, follow that file's `customer_members`
   step too (dashboard isn't required for the WhatsApp agent to work).

**If you skip this step**, the agent workflow will receive messages but find no matching
customer, log nothing, and never reply. This is a deliberate safety behavior (never guess
whose message it is), not a bug, see `n8n/README.md`.

---

## Part 3: n8n credentials

Both workflow files use placeholder credential IDs (things like
`REPLACE_WITH_OPENAI_CREDENTIAL_ID`). After importing (Part 4), you'll select a real
credential in each node that has one. Create these credentials **first**, so they're
ready to pick from a dropdown during import.

In n8n: **Settings (or Credentials icon) > Credentials > Add Credential**.

| # | Credential name (suggested) | Type to search for | What to enter | Used by |
|---|---|---|---|---|
| 1 | `Postgres - Supabase Voxitron (service role)` | Postgres | Host/port/database/user from Supabase's connection string (Part 1.3), password = the service role key or DB password from the same page | Both workflows, every database read/write |
| 2 | `WhatsApp Cloud API token` | Header Auth | Header name: `Authorization`. Header value: `Bearer <your Meta token from 2.4>` | WhatsApp agent workflow, every call to Meta |
| 3 | `OpenAi account` | OpenAI API | Your OpenAI API key ([platform.openai.com/api-keys](https://platform.openai.com/api-keys)) | Both workflows, AI replies + embeddings + image/voice understanding |
| 4 | `QdrantApi account` | Qdrant Api | Your Qdrant instance URL + API key | Both workflows, the knowledge base itself |
| 5 | `Qdrant API Key (Header Auth)` | Header Auth | Header name: `api-key` (or whatever your Qdrant instance expects). Value: the same Qdrant API key as #4 | KB ingest workflow only, one specific node that can't use the Qdrant-specific credential type, see note below |
| 6 | `CloudConvert API Key (Header Auth)` | Header Auth | Header name: `Authorization`. Value: `Bearer <your CloudConvert API key>` | KB ingest workflow only, **skip this if you won't upload `.docx` files** |
| 7 | `Voxitron Google Sheets` | Google Sheets OAuth2 API | Follow n8n's OAuth prompt (sign in with the Google account you'll use), needs a Google Cloud project with the Sheets API enabled | KB ingest workflow only, **skip this if you won't use Google Sheets as a source** |

**Why #5 exists alongside #4**: one node in the KB ingest workflow (deleting old
knowledge-base entries before replacing them) calls Qdrant's raw web API directly instead
of through n8n's built-in Qdrant node, and that raw call needs a plain header credential,
not the Qdrant-specific one. Same API key, just entered twice in two different credential
types. Annoying but required.

**Getting a Qdrant instance**, if you don't have one yet: [Qdrant Cloud](https://cloud.qdrant.io)
has a free tier that's enough to start (sign up, create a cluster, copy its URL and API
key). Self-hosting is also an option if you already run infrastructure for this, confirm
which one Area50 (a related prior project) uses if you want to share the same instance.

---

## Part 4: Import and wire up the WhatsApp agent workflow

### 4.1 Import

In n8n: **Workflows > Add workflow > Import from File** (or the **⋯** menu, depending on
your n8n version) → select `n8n/voxitron-whatsapp-agent.json` from this repo.

You should see a workflow named **"Voxitron WhatsApp Agent"** appear with 39 nodes.

### 4.2 Wire in credentials

Click through every node that shows a red/unset credential warning (or check the ones
listed below) and select the matching credential from Part 3:

| Node(s) | Credential to select |
|---|---|
| Load Customer by Number, Check for Duplicate Delivery, Get or Create Conversation (both), Log Inbound Message, Log Outbound Message, Log Unsupported Inbound Message, Log Escalation Reply, Log AI Failure Reply, Flag Conversation: Needs Human, Flag Conversation: AI Failed | Postgres credential (#1) |
| Send WhatsApp Reply, Send Escalation Reply, Send AI Failure Reply, Get Media URL, Download Media Binary | Header Auth: `WhatsApp Cloud API token` (#2) |
| OpenAI Chat Model (feeds AI Agent Reply), Describe Image (GPT-4o Vision), Transcribe Voice Note (Whisper), Embeddings OpenAI | OpenAI API (#3) |
| Qdrant Vector Store | Qdrant Api (#4) |

### 4.3 Set the environment variable

The workflow checks an environment variable to verify Meta's webhook subscription
requests are genuine. In n8n's environment (instance settings, or the `.env` file on the
server it runs on):

```
VOXITRON_WA_VERIFY_TOKEN=<any string you make up>
```

Pick anything, write it down, you'll enter this exact same string into Meta's app
settings in step 4.5. It's not a secret used for message content, just for proving the
webhook subscription handshake is legitimate.

### 4.4 Activate the workflow

Toggle the workflow to **Active** (top right in the n8n editor). Once active, its
production webhook URL becomes live. Find it by opening the **"Meta Verify Webhook"** or
**"Receive WhatsApp Message"** node and copying the **Production URL** shown (both paths
resolve to the same URL, n8n tells them apart by HTTP method).

It will look like: `https://your-n8n-domain/webhook/voxitron/whatsapp`

### 4.5 Register the webhook with Meta

1. In the Meta app (from Part 2.2), go to **WhatsApp > Configuration**.
2. Paste your webhook URL from 4.4 as the **Callback URL**.
3. Paste the exact same string from 4.3 as the **Verify Token**.
4. Click **Verify and Save**. Meta immediately calls your webhook to confirm it's real. If
   this fails, double check the verify token matches exactly (typos, extra spaces) between
   n8n and Meta.
5. **Subscribe to the `messages` webhook field** (just this one, not `messaging_postbacks`
   or others).

### 4.6 Test it end to end

1. From a real phone, send a WhatsApp message to the number from Part 2.3 (if using the
   free test number, that phone must be pre-verified in Meta's API Setup page first).
2. In n8n, check **Executions** for the WhatsApp agent workflow, confirm one ran and
   reached the end without error.
3. In Supabase's SQL Editor, confirm data landed:
   ```sql
   select * from conversations order by started_at desc limit 5;
   select * from messages order by sent_at desc limit 5;
   ```
4. Check your phone, did you get a reply? (It may say it doesn't have an answer yet, if
   the customer's knowledge base is empty, that's expected until you do Part 5. The
   important thing right now is that *a reply arrived at all*.)

**If nothing happens**, the two most common causes: the webhook subscription in 4.5 isn't
actually active, or the System User token from 2.4 is missing a permission. Recheck those
first.

---

## Part 5: Import and wire up the knowledge base ingest workflow

This is what actually teaches the agent about a specific business, without it, every
customer's agent has nothing to answer from and will honestly say "let me get someone to
help" for everything.

### 5.1 Import

Same as before: **Workflows > Add workflow > Import from File** → select
`n8n/voxitron-kb-ingest.json`.

You'll see a workflow named **"Voxitron KB Ingest"** with 33 nodes.

### 5.2 Wire in credentials

| Node(s) | Credential to select |
|---|---|
| Load Customer | Postgres credential (#1), reuse the same one from Part 4 |
| Upsert to Qdrant | Qdrant Api (#4), reuse the same one from Part 4 |
| Delete Existing Chunks for This Title | Header Auth: `Qdrant API Key (Header Auth)` (#5) |
| Embeddings OpenAI | OpenAI API (#3), reuse the same one from Part 4 |
| Convert DOCX to PDF (CloudConvert) | Header Auth: `CloudConvert API Key (Header Auth)` (#6) — **only if you're using Word file uploads** |
| Read Google Sheet | `Voxitron Google Sheets` (#7) — **only if you're using Google Sheets** |

### 5.3 One manual edit required: the Qdrant host URL

Open the **"Delete Existing Chunks for This Title"** node. Its URL field currently reads:

```
https://YOUR_QDRANT_HOST/collections/kb_.../points/delete
```

Replace `YOUR_QDRANT_HOST` with your actual Qdrant instance's hostname (the same host
your Qdrant credential in Part 3 points at). This is the one thing that can't be set via
a credential and must be typed directly into the node.

### 5.4 Activate the workflow

Toggle to **Active**. Open the **"KB Upload Form"** node and copy its **Production URL**,
this is the link you (or whoever on the Voxitron team adds knowledge base content) will
actually use, bookmark it. It's not meant to be public or shared with customers.

### 5.5 Add your first document

1. Find your customer's `id`: in Supabase SQL Editor, run
   `select id, business_name from customers;`
2. Open the form URL from 5.4.
3. Fill in:
   - **Customer ID**: the UUID from step 1
   - **Document title**: something short and clear, e.g. "Price List"
   - **Source Type**: pick one of the 4 (see table below)
   - Only the one matching field for that source type
4. Click **Ingest**. You should get a confirmation message back with a chunk count.

| If Source Type is... | Fill in... |
|---|---|
| Paste text | The **Content** box: paste raw text directly |
| Website page | **Page URL**: one exact page, e.g. `https://example.com/pricing`. Does not crawl the rest of the site, submit each page separately if you need more than one |
| File (PDF or Word) | **File**: upload a `.pdf` or `.docx`. Word files take a few extra seconds (they're converted to PDF first) |
| Google Sheet | **Google Sheet URL**: the full URL. The sheet must be shared with the Google account your credential #7 authenticates as, or the read comes back empty |

### 5.6 Confirm it worked

Message that customer's WhatsApp number (Part 4.6) with a question the document should
answer. The agent should now answer from the real content instead of falling back to "let
me get someone to help."

Repeat step 5.5 for every distinct document a customer wants their agent to know (price
list, delivery policy, FAQ, etc. as **separate submissions** with different titles, not
one giant paste).

---

## Quick troubleshooting

| Symptom | Likely cause | Where to look |
|---|---|---|
| Meta's webhook verification fails at step 4.5 | Verify token typo/mismatch | Compare `VOXITRON_WA_VERIFY_TOKEN` in n8n exactly against what's typed into Meta |
| Message sent, nothing happens at all | Webhook not subscribed to `messages`, or token missing a permission | Redo step 4.5's subscription, recheck step 2.4's token scopes |
| Agent replies but says it can't help / no knowledge | That customer has no knowledge base content yet | Do Part 5 for that customer |
| "No customer found with id..." on ingest | Wrong or mistyped Customer ID | Re-run `select id, business_name from customers;` and copy exactly |
| Word file upload fails | CloudConvert credential missing or account issue | Check credential #6 exists and the CloudConvert account is active |
| Google Sheet read returns nothing | Sheet not shared with the right Google account | Share the sheet with whichever account authorized credential #7 |
| Customer gets a reply twice for one message | Should not happen (deduplication was added specifically for this), if it does, check `messages.wa_message_id` is actually populating | `select wa_message_id from messages order by sent_at desc limit 5;` |
| n8n execution fails with "Referenced node is unexecuted" | A workflow file was hand-edited and a node reference broke | This means the underlying JSON changed since this guide was written, don't hand-edit the exported JSON, re-import fresh |

---

## What's NOT covered by this guide

- **The customer dashboard** (`/login`, `/dashboard`), a separate piece of the project not
  yet built. See `DASHBOARD_UI.md`.
- **Direct alerts to a business owner** when a conversation is flagged (`needs_human`).
  Today that flag is only stored in the database, nothing pings anyone yet, a deliberate,
  not-yet-decided scope gap, see `n8n/README.md`.
- **The embeddable website widget** (chat on a customer's own site, not just WhatsApp),
  also not built yet, see `DASHBOARD_UI.md`'s "Embeddable website widget" section.

If you hit something this guide doesn't explain, the deeper-detail docs are
`n8n/README.md` (WhatsApp agent internals), `n8n/KB_INGEST_README.md` (ingest internals
and known limitations), and `MASTER_PROMPT.md` (the full project history and decisions).
