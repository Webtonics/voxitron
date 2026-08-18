-- Run this once in the Supabase SQL Editor, after 002_conversations.sql.
-- Adds escalation flagging to conversations: a way for the WhatsApp agent to
-- mark a conversation as needing a human, starting with message types it
-- can't handle yet (video, document, sticker). The dashboard's conversation
-- list (DASHBOARD_UI.md) can surface this as a "needs attention" indicator
-- once that screen is built; this migration only adds the data for it to
-- read, no dashboard UI ships with this migration.
--
-- Scope note: this does NOT add any way to notify a business owner directly
-- (no email/WhatsApp alert), confirmed with the user 2026-08-12 as an
-- explicit "not yet" rather than an oversight. That needs its own schema
-- addition (where to send the alert) and channel decision (WhatsApp vs.
-- email) before it can be built. This migration only adds the flag itself.

alter table conversations
  add column if not exists needs_human boolean not null default false;

alter table conversations
  add column if not exists escalation_reason text;

-- Not a foreign key or enum: escalation_reason is a short human-readable
-- string set by whatever flagged it (e.g. 'unsupported_message_type:video'),
-- kept free-text since the set of reasons will grow as more escalation
-- triggers are added later (negotiation requests, explicit "talk to a
-- human" asks, etc.), none of which exist yet either.

create index if not exists conversations_needs_human_idx
  on conversations (customer_id, needs_human)
  where needs_human = true;
