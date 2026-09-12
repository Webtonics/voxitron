-- Run this once in the Supabase SQL Editor, after 017_agent_config_schema.sql.
-- Adds the fields the redesigned dashboard's Overview page needs and that
-- the schema doesn't have yet: a lead/outcome flag per conversation, a
-- denormalised first-reply time, per-customer business hours (for computing
-- "captured after hours"), and a message type so the inbox and Overview can
-- show voice-note/photo treatment instead of only text.
--
-- No write path exists yet for is_lead/outcome/first_reply_seconds/type: the
-- n8n WhatsApp agent workflow (voxitron-whatsapp-agent.json) needs a
-- follow-up edit to actually set them when it writes conversations/messages.
-- Until that lands, these columns default to their "nothing happened yet"
-- values and the dashboard should render its honest empty state for any
-- metric built on them, never a fabricated number.

alter table conversations
  add column if not exists is_lead boolean not null default false;

alter table conversations
  add column if not exists outcome text
    check (outcome in ('booked', 'enquiry', 'complaint', 'spam'));

alter table conversations
  add column if not exists first_reply_seconds integer;

alter table customers
  add column if not exists business_hours jsonb;

alter table messages
  add column if not exists type text not null default 'text'
    check (type in ('text', 'voice', 'photo'));

-- No RLS changes needed: all five columns live on tables already covered by
-- 002_conversations.sql's existing SELECT policies. No insert/update policy
-- is added for authenticated/anon, matching this schema's existing rule that
-- conversations/messages are written only by the n8n workflow's service-role
-- key.
