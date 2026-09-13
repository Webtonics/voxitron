-- Run this once in the Supabase SQL Editor, after 020_conversation_resolved.sql.
-- Adds a place to store a voice-note transcript or photo description
-- separately from the original message body, once the n8n workflow is
-- updated to write it (see voxitron-inbox-at-scale.md's channel filter and
-- export requirements). Today, Log Inbound Message overwrites `body` with
-- the transcript/description itself and never sets `type`, so every message
-- lands as type='text' regardless of what the customer actually sent.
--
-- No write path exists yet: this migration only adds the column. The n8n
-- workflow needs its own update (tracked separately, live-workflow-first per
-- the user 2026-09-13) to: (1) set messages.type to 'voice'/'photo' on the
-- media branch instead of leaving it at the 'text' default, and (2) put the
-- transcript/description in `transcript` while keeping `body` as the
-- original caption/placeholder, instead of overwriting body with the
-- transcript. Until that lands, this column stays null for every row and
-- the dashboard should keep treating `body` as the only available text.

alter table messages
  add column if not exists transcript text;

-- No RLS change needed: covered by 002_conversations.sql's existing
-- messages SELECT policy. No insert/update policy for authenticated/anon,
-- same rule as the rest of `messages` (n8n's service-role key only).
