-- Run this once in the Supabase SQL Editor, after 005_message_dedup.sql.
-- Backs the "find or create conversation" logic with a real database
-- constraint. Found during a 2026-08-13 audit: voxitron-whatsapp-agent.json's
-- "Get or Create Conversation" query used INSERT ... WHERE NOT EXISTS with no
-- transaction and no unique constraint, so two messages from the same
-- contact arriving close together (people commonly send two texts back to
-- back) could both pass the NOT EXISTS check before either INSERT commits,
-- creating two separate conversation rows for what should be one thread.
--
-- A customer can message more than one of a business's numbers over time
-- (rare, but the schema already supports multiple numbers per customer), so
-- this is scoped to (customer_id, contact_phone), one thread per contact per
-- customer, matching what the application code already assumes.

alter table conversations
  add constraint conversations_customer_contact_unique
  unique (customer_id, contact_phone);

-- If this fails with a duplicate-key error, duplicate conversation rows
-- already exist from the race condition above. Find them first:
--   select customer_id, contact_phone, count(*), array_agg(id) from conversations
--   group by customer_id, contact_phone having count(*) > 1;
-- then manually merge each pair's messages onto one conversation id and
-- delete the other before re-running this migration. Not automated here:
-- merging is a judgment call (which id survives, re-pointing messages,
-- keeping the earlier started_at) that shouldn't happen silently in a
-- migration script.
