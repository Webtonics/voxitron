-- Run this once in the Supabase SQL Editor, after 004_conversation_number_attribution.sql.
-- Adds Meta WhatsApp message id storage for deduplication. Meta's Cloud API
-- uses at-least-once delivery: it retries webhook deliveries for up to 7
-- days with backoff if the receiver is slow or briefly down, which means
-- the same inbound message can legitimately arrive more than once. Found
-- during a 2026-08-13 audit of voxitron-whatsapp-agent.json: the workflow
-- already extracted Meta's message id (`waMessageId`) but never stored or
-- checked it, so a retried delivery would silently generate and send a
-- second AI reply to the same customer message.

alter table messages
  add column if not exists wa_message_id text;

-- Partial unique index, not a plain unique column: outbound messages (the
-- agent's own replies) and any messages logged before this column existed
-- have no Meta message id at all, and multiple nulls must be allowed to
-- coexist. Only inbound messages carry a real wa_message_id, and among
-- those, each one must be unique, that's what actually prevents a duplicate
-- webhook delivery from being processed twice.
create unique index if not exists messages_wa_message_id_unique_idx
  on messages (wa_message_id)
  where wa_message_id is not null;
