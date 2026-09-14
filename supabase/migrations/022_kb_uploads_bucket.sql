-- Run this once in the Supabase SQL Editor, after 021_message_media_transcript.sql.
-- Creates the kb-uploads Storage bucket used by app/api/kb-upload-url/route.ts
-- and app/api/knowledge-base/route.ts. Idempotent: safe to re-run.
--
-- Private bucket, no public access. The browser never talks to this bucket
-- directly with the anon key, it always uses a short-lived signed URL minted
-- server-side (service role), so no permissive storage.objects RLS policy is
-- needed here. See kb-ingest-frontend-handoff.md.

insert into storage.buckets (id, name, public, file_size_limit)
values ('kb-uploads', 'kb-uploads', false, 26214400) -- 25MB
on conflict (id) do update set public = false, file_size_limit = 26214400;
