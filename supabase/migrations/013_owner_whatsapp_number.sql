-- Run this once in the Supabase SQL Editor, after 012_kb_ingest_jobs_operation_column.sql.
-- Adds the schema addition 003_conversation_escalation.sql flagged as needed
-- but out of scope: a place to send an owner-notification alert when a
-- conversation is flagged needs_human. The dashboard's settings screen
-- writes these columns so the business owner can enter their own WhatsApp
-- number and/or email; n8n's owner-notification step
-- (voxitron-whatsapp-agent.json) reads them per customer_id when a
-- conversation needs escalating, sending to whichever channel(s) are set.
--
-- Both nullable, independently: a customer can set one, both, or neither.
-- A customer who hasn't set either yet gets no owner notification, same
-- silent-gap behavior as before this migration, not a regression.

alter table customers
  add column if not exists owner_whatsapp_number text;

alter table customers
  add column if not exists owner_email text;

-- No RLS changes needed: owner_whatsapp_number is a column on the existing
-- `customers` table, already covered by 002_conversations.sql's "Members
-- can view their customer record" SELECT policy. A write path (the
-- dashboard settings form) is separate follow-up work, not part of this
-- migration.
