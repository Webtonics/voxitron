-- Run this once in the Supabase SQL Editor, after 011_kb_ingest_jobs.sql.
-- Fixes a mismatch caught right after 011 was applied: it created
-- kb_ingest_jobs.source_type as `not null`, but the live n8n workflow
-- (n8n/voxitron-kb-ingest.json, "Create Ingest Job" node) actually inserts
-- INTO kb_ingest_jobs (customer_id, document_title, operation) -- an
-- `operation` column ('ingest' or 'delete'), no source_type at all. Every
-- insert from the real workflow would fail against 011's schema as
-- originally applied.
--
-- Safe to run even though 011 already created the table: source_type is
-- dropped (nothing has been able to write a row yet, since the workflow
-- was never compatible with it) and operation is added in its place.

alter table kb_ingest_jobs drop column if exists source_type;

alter table kb_ingest_jobs add column if not exists operation text
  check (operation in ('ingest', 'delete'));

update kb_ingest_jobs set operation = 'ingest' where operation is null;

alter table kb_ingest_jobs alter column operation set not null;
