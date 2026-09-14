# KB Ingest Webhook — Frontend Integration Contract

## Endpoint

```
POST https://n8n.srv1194565.hstgr.cloud/webhook/voxitron/kb-ingest
Content-Type: application/json
```

## Auth

Header Auth, server-side calls only — **never expose this in browser/client code**. Confirmed 2026-08-30: the "Voxitron Meta" Header Auth credential on the KB Ingest Webhook node checks a bare `Authorization` header (not a custom header name like `X-API-Key`), value is a plain secret string, no `Bearer` prefix. Set the same value as `N8N_KB_INGEST_API_KEY` in this app's environment.

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

The file never passes through this webhook, or through the Next.js app's server at all. Vercel serverless functions cap request bodies at ~4.5MB, so any real PDF/DOCX would 413 if it were proxied through an API route first.

- **Implemented 2026-09-14, `app/api/kb-upload-url/route.ts` + `app/api/knowledge-base/route.ts`**: the browser uploads the file **directly to Supabase Storage** using a signed upload URL, then calls `/api/knowledge-base` with just `{ storagePath, documentTitle, sourceType: "file" }` (no bytes). That route re-derives `customerId` from the session, re-checks `storagePath` starts with `<customerId>/`, mints a 600-second signed **download** URL server-side (service role, `lib/supabase/admin.ts`), and forwards it as `fileUrl` in the payload below.
- Bucket: `kb-uploads`, private, path `<customerId>/<uuid>.<ext>`, path is always server-chosen (see `kb-upload-url/route.ts`), never accepted from the client. Migration: `supabase/migrations/022_kb_uploads_bucket.sql`.
- The Storage object's filename must keep its real extension (`.pdf` / `.docx`) — the workflow uses that to tell PDF and Word files apart.
- A signed URL is preferred over a public bucket URL, since the signature itself is the access control — no extra auth needed on the n8n side for that download.

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
