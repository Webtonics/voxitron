# KB Ingest Webhook — Frontend Integration Contract

## Endpoint

```
POST https://n8n.srv1194565.hstgr.cloud/webhook/voxitron/kb-ingest
Content-Type: application/json
```

## Auth

Header Auth, server-side calls only — **never expose this in browser/client code**. Header name and secret are pending; Josh/Alex will provide these once the credential is created in n8n. Build the request with a placeholder header for now (e.g. `X-API-Key`) and swap in the real value when given.

## Request body

```json
{
  "customerId": "uuid",
  "documentTitle": "string",
  "sourceType": "paste" | "website" | "file" | "sheet" | "delete",
  "content": "string",        // required if sourceType is "paste"
  "pageUrl": "string",        // required if sourceType is "website"
  "fileUrl": "string",        // required if sourceType is "file" -- see File uploads below
  "googleSheetUrl": "string"  // required if sourceType is "sheet"
}
```

`sourceType: "delete"` only needs `customerId` + `documentTitle` — no content/url/file fields.

## File uploads — important, don't send raw bytes

Upload the file to Supabase Storage **first**, get back a signed URL, send that URL as `fileUrl`. Do not POST the file directly to this webhook.

- The Storage object's filename must keep its real extension (`.pdf` / `.docx`) — the workflow uses that to tell PDF and Word files apart.
- A signed URL is preferred over a public bucket URL, since the signature itself is the access control — no extra auth needed on the n8n side for that download.
- **Implemented in `app/api/knowledge-base/route.ts` (2026-08-2X)**: uploads to a bucket named `kb-uploads`, path `<customerId>/<uuid>.<ext>`, using the service-role client (`lib/supabase/admin.ts`), then generates a 1-hour signed URL. **The `kb-uploads` bucket does not exist yet** — create it in the Supabase dashboard (Storage > New bucket, keep it private/non-public, the signed URL is what grants access) before file-type ingests can work. Paste/website/sheet ingests don't touch Storage and aren't blocked by this.

## Response

Immediate, not the final result:

```json
HTTP 202
{ "jobId": "uuid", "status": "processing" }
```

## Checking the real outcome

Poll (or subscribe via Supabase realtime, your call) the `kb_ingest_jobs` table:

```sql
SELECT status, chunk_count, error_message, completed_at
FROM kb_ingest_jobs
WHERE id = :jobId
```

`status` starts as `'processing'`, ends as either `'success'` (with `chunk_count` set) or `'failed'` (with `error_message` set). Migration for this table is `010_kb_ingest_jobs.sql`, needs to be applied to Supabase before this endpoint will work at all.

## Behavior worth knowing

- **Re-ingesting the same `documentTitle` for the same `customerId` replaces it** — old chunks get deleted automatically first. No need to call delete before uploading a corrected version, just resubmit with the same title.
- `sourceType: "delete"` removes a document without replacing it.
- This endpoint is separate from the existing `KB Upload Form` (n8n's own hosted form, still there for manual/internal use) — same underlying pipeline, this is just the API path built for the dashboard.
