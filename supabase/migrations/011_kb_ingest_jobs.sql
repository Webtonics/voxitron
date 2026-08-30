-- Run this once in the Supabase SQL Editor, after 010_leads_dashboard_read.sql.
-- Backs the async KB ingest webhook (n8n/voxitron-kb-ingest.json): the
-- webhook now responds immediately with { jobId, status: "processing" }
-- instead of waiting for the full pipeline (chunking/embedding/upsert can be
-- slow for a large file or website fetch), and the dashboard polls this
-- table for the real outcome. See kb-ingest-frontend-handoff.md.
--
-- n8n creates the row (status 'processing') right after accepting the
-- request, then updates it to 'success' (with chunk_count) or 'failed'
-- (with error_message) once the pipeline finishes, using the Supabase
-- service role, same as every other n8n write in this schema.

-- operation matches the exact column the live n8n workflow writes
-- (Create Ingest Job's INSERT INTO kb_ingest_jobs (customer_id,
-- document_title, operation)), 'ingest' for the 4 add/replace source types
-- collapsed together, 'delete' for a delete. n8n does not distinguish
-- paste/website/file/sheet at the job-row level, only in the request body
-- that produced it, so this table can't answer "which source type was
-- this" and doesn't try to.
create table if not exists kb_ingest_jobs (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  document_title text not null,
  operation text not null check (operation in ('ingest', 'delete')),
  status text not null default 'processing' check (status in ('processing', 'success', 'failed')),
  chunk_count integer,
  error_message text,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);

create index if not exists kb_ingest_jobs_customer_id_idx on kb_ingest_jobs (customer_id);

alter table kb_ingest_jobs enable row level security;

-- Dashboard users can only see ingest jobs for a customer they're a member
-- of. In practice today that's only ever Voxitron's own team (the KB ingest
-- page gates on VOXITRON_CUSTOMER_ID, see lib/dashboard/voxitron.ts), same
-- membership-scoped pattern as every other dashboard SELECT policy.
create policy "Members can view their customer's KB ingest jobs"
  on kb_ingest_jobs
  for select
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

-- No insert/update/delete policy for anon or authenticated. Only the n8n
-- workflow writes to this table, using the Supabase service role key
-- (bypasses RLS), never the anon key. Do not add a public write policy.
