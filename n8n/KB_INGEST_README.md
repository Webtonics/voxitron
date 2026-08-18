# Voxitron KB Ingest: n8n workflow

`voxitron-kb-ingest.json` is an importable n8n workflow that fills the gap flagged in
`n8n/README.md`: until now, no workflow existed to actually populate a customer's
`kb_<customers.id>` Qdrant collection, so every WhatsApp agent's knowledge-base search
returned nothing and the agent could only fall back to "I'll get someone to help."

This does not replace a future self-serve upload UI (`/dashboard/embed`'s possible future
"Content" tab, explicitly out of scope per `DASHBOARD_UI.md` until asked for). It's the
interim path for Voxitron's own team to get a real customer's product/pricing/policy
content into their agent's knowledge base today.

## Source types supported

Added 2026-08-13. The form accepts one document at a time from any of these 4 sources,
picked via the "Source Type" dropdown:

1. **Paste text.** Original behavior: paste raw text directly into the form.
2. **Website page.** One exact URL (e.g. a pricing or FAQ page). Fetches just that page,
   does **not** crawl the rest of the site, confirmed with the user 2026-08-13 as the
   intended scope, not a limitation to fix later. Static HTML only, does not render
   JavaScript, a page whose real content loads client-side will extract as empty or
   near-empty.
3. **File (PDF or Word).** Upload a `.pdf` or `.docx` directly. PDFs are extracted
   natively; `.docx` files are converted to PDF first via CloudConvert (see "Credentials"
   below), then extracted the same way.
4. **Google Sheet.** A shared spreadsheet URL. Reads the first sheet's rows (header row as
   column names) and flattens each row into a `column: value | column: value` text line,
   useful for a business that keeps its price list or catalog in a spreadsheet.

**The form always shows all 4 source-specific fields** (Content, Page URL, File, Google
Sheet URL) regardless of which Source Type is selected, only fill in the one that source
type needs, leave the others blank. n8n's Form Trigger doesn't support conditionally
hiding fields based on another field's value within one form (that needs a separate
multi-page `n8n-nodes-base.form` node chained after the trigger, more complexity than
warranted here). A submission missing the field its own Source Type needs is rejected
with a specific error before anything is looked up or ingested.

## What it does, end to end

1. Presents an n8n Form Trigger as a hosted web form, no separate app needed.
2. Validates the Customer ID looks like a UUID, and that the field matching the chosen
   Source Type was actually filled in, before touching the database.
3. Looks up the customer in Supabase (`customers` table). Stops with a clear error if the
   id doesn't match a real row, never creates a Qdrant collection for a customer that
   doesn't exist.
4. Routes to the matching source branch (paste-through, webpage fetch + extract, PDF/DOCX
   extract, or Google Sheet read), each of which resolves the source into a single plain
   text `resolvedContent` field.
5. **Deletes any existing chunks for the same document title first**, via a direct call to
   Qdrant's REST API filtered on the `title` metadata field. Means re-submitting an updated
   "Price List" (from any source type) replaces the old chunks instead of stacking
   duplicates alongside them.
6. Splits `resolvedContent` into ~1200-character chunks with a 150-character overlap (only
   when the content is longer than one chunk), preferring to break at a paragraph gap,
   then a sentence end, then a line break, before falling back to a hard character cut, so
   a sentence or price line isn't split in half across two chunks. Each chunk is prefixed
   with the document title so retrieval keeps that context.
7. Embeds each chunk with `text-embedding-ada-002`, matching the model the WhatsApp
   agent's Qdrant search already assumes (`n8n/voxitron-whatsapp-agent.json`).
8. Upserts each chunk into `kb_<customers.id>`, same collection-naming convention the
   WhatsApp agent workflow reads from. Qdrant creates the collection automatically on
   first insert, no separate provisioning step for a brand-new customer.
9. Responds with a plain confirmation: which document, whose knowledge base, how many
   chunks.

## Before this can be imported and run

### 1. n8n credentials to create, then wire into the placeholder node fields

Every node with `REPLACE_WITH_..._CREDENTIAL_ID` needs a real n8n credential selected
after import. If `voxitron-whatsapp-agent.json` is already imported with these
credentials created, reuse the same ones here rather than creating duplicates:

| Placeholder | Credential type | Notes |
|---|---|---|
| `REPLACE_WITH_SUPABASE_SERVICE_ROLE_CREDENTIAL_ID` | Postgres | Same service-role connection as the WhatsApp agent workflow. Only needs read access to `customers` here (`SELECT id, business_name`), but the service role already has it. |
| `REPLACE_WITH_QDRANT_CREDENTIAL_ID` | QdrantApi | Same Qdrant instance the WhatsApp agent workflow's vector store node points at. Must be the same instance, a chunk embedded into the wrong Qdrant host is invisible to the agent. |
| `REPLACE_WITH_OPENAI_CREDENTIAL_ID` | OpenAI API | Same OpenAI account as the WhatsApp agent workflow's embeddings node. Must use the same embedding model (`text-embedding-ada-002`) both places, mismatched embedding models are not comparable in the same collection. |
| `REPLACE_WITH_QDRANT_HTTP_HEADER_CREDENTIAL_ID` | Header Auth | Used only by the "Delete Existing Chunks for This Title" node. n8n's `QdrantApi` credential type isn't usable by a plain HTTP Request node, so this is a second, separate credential carrying the same Qdrant API key, header name typically `api-key`. **Also replace `YOUR_QDRANT_HOST` in that node's URL** with the actual Qdrant instance hostname, same host the `QdrantApi` credential points at. |
| `REPLACE_WITH_CLOUDCONVERT_CREDENTIAL_ID` | Header Auth | Added 2026-08-13, used only by "Convert DOCX to PDF (CloudConvert)". Needs a [CloudConvert](https://cloudconvert.com) account and API key, header name `Authorization`, value `Bearer <your CloudConvert API key>`. This is a new external dependency and a real per-conversion cost, a deliberate tradeoff chosen over leaving `.docx` unsupported (n8n's built-in file-extraction node handles PDF but not Word documents). Only triggered when a customer's uploaded file is `.docx`, not used at all for `.pdf` uploads or any other source type. |
| `REPLACE_WITH_GOOGLE_SHEETS_OAUTH_CREDENTIAL_ID` | Google Sheets OAuth2 API | Added 2026-08-13, used only by "Read Google Sheet". **Different setup flow from every other credential in these two workflows**: it's OAuth2, not an API key, so it needs a Google Cloud project with the Sheets API enabled and an OAuth consent flow completed once in n8n's credential setup UI, not just a pasted key. See [n8n's Google Sheets credential docs](https://docs.n8n.io/integrations/builtin/credentials/google/). **The target spreadsheet must be shared with (or owned by) whichever Google account you authenticate this credential as**, otherwise the read returns empty rows rather than a clear permission error, worth checking manually the first time a given customer's sheet is used. |

### 2. Activate the workflow and get the form URL
Once credentials are wired in, activate the workflow. The Form Trigger node's production
URL is what Voxitron's team uses to submit a customer's documents, share it internally,
it is not meant to be public (no customer-facing link to it exists anywhere in the site).

## How to use it, per customer

1. Find the customer's `id` in Supabase: `select id, business_name from customers;`
2. Open the form URL, enter the Customer ID and a document title (e.g. "Price List",
   "Delivery Policy"), pick a Source Type, and fill in only the matching field:
   - **Paste text** → the Content field
   - **Website page** → the Page URL field (one exact URL)
   - **File (PDF or Word)** → the File field (upload a `.pdf` or `.docx`)
   - **Google Sheet** → the Google Sheet URL field (must already be shared with the
     Google account n8n's Google Sheets credential authenticates as)
3. Submit. The response confirms how many chunks were ingested, or a specific error if
   something didn't resolve (bad URL, unshared sheet, wrong file type, etc.).
4. Repeat for each distinct document a customer wants their agent to know about (price
   list, FAQ, delivery policy, etc. as separate submissions, not one giant paste, keeps
   `title` metadata meaningful per topic). Different documents can use different source
   types, e.g. a price list from a Google Sheet and a delivery policy pasted as text.
5. Test by messaging that customer's WhatsApp number with a question the document should
   answer, once `voxitron-whatsapp-agent.json` is live end to end (see
   `n8n/meta-whatsapp-setup.md`).

## Known limitations, not fixed by this workflow

- **Re-ingestion matches on exact title text.** Deleting old chunks before inserting new
  ones (see above) filters by exact string match on `title`, so re-submitting "Price List"
  correctly replaces the old "Price List" chunks, but "price list" or "Price List " (typo,
  case, trailing space) would be treated as a different document and leave the original
  chunks in place alongside a new set. Use the exact same title string when updating a
  document, regardless of source type.
- **Website scraping fetches one exact URL, never crawls.** Confirmed 2026-08-13 as the
  intended scope, not a gap: if a customer's info spans several pages, submit each page
  URL as a separate document with its own title.
- **Website scraping doesn't render JavaScript.** A page that loads its real content via
  client-side JS (a single-page app, content behind a "load more" button) will extract as
  empty or near-empty. Works well for typical static business pages (pricing tables, FAQ
  text, about pages).
- **Website text extraction pulls all of `<body>`,** including nav/footer/boilerplate text
  alongside the actual content, not a targeted content-only extraction. Fine for most
  small business pages; a page with heavy chrome may need the CSS selector in "Extract
  Webpage Text" tightened per customer if retrieval quality suffers.
- **DOCX support depends on an external paid service (CloudConvert).** If that account
  lapses or the API key is revoked, `.docx` uploads fail while `.pdf` uploads continue
  working fine (they never touch CloudConvert).
- **Google Sheets reads only the first sheet (`gid=0`)** of a multi-tab spreadsheet, and
  flattens rows into simple text lines, not a smarter per-row or per-column strategy. A
  very large sheet (hundreds of rows) may need each row to land inside one chunk for
  precise lookups to retrieve well, works fine for typical small business catalogs.
- **No file upload retention.** Uploaded PDFs/DOCX files are processed in-memory during
  the workflow run and not stored anywhere afterward, only the extracted text (as
  chunks) persists in Qdrant. Re-running ingestion means re-uploading the file.
- **Voxitron-team-only entry point.** No customer-facing self-serve UI, per
  `DASHBOARD_UI.md`'s explicit scope (a "Content" tab is future work, not assumed here).
- **Chunk size is fixed, not tuned per content type.** 1200 characters (with
  paragraph/sentence-aware boundaries) is a reasonable default for short business
  documents (price lists, FAQs); very long or densely structured documents (large
  catalogs, tables) may retrieve better with different chunking, revisit if retrieval
  quality turns out poor for a specific customer.
