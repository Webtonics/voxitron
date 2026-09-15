-- Run this once in the Supabase SQL Editor, after 023_whatsapp_number_active.sql.
-- Adds the seamless, no-login "Take over" flow: a business owner pinged on
-- WhatsApp/email about an escalated conversation can open a signed,
-- single-conversation link and reply without ever logging into the
-- dashboard. See project memory "project_takeover_flow" for the design
-- decisions behind this (AskUserQuestion, 2026-09-13/14/15).
--
-- Two pieces:
-- 1. conversations.ai_paused: the single source of truth both this repo
--    and n8n check before the AI is allowed to reply to a conversation.
--    Auto-set true the moment needs_human flips true (trigger below, no
--    n8n edit required for that half) and whenever a human sends a reply
--    (dashboard "Take over" or the magic-link takeover page, both write
--    this directly). Cleared only by an explicit "Give back to agent".
-- 2. conversation_takeover_tokens: short-lived, single-conversation,
--    single-purpose tokens. Not a Supabase Auth session, deliberately: a
--    leaked link exposes exactly one conversation's thread, not the whole
--    dashboard. Looked up and validated server-side with the admin
--    (service-role) client, since a visitor here has no Supabase session
--    at all for RLS to key off of.

alter table conversations
  add column if not exists ai_paused boolean not null default false;

alter table conversations
  add column if not exists ai_paused_at timestamptz;

-- Auto-pause on escalation: n8n doesn't need to set ai_paused itself, this
-- trigger does it the moment needs_human goes false -> true, from ANY
-- escalation reason (unsupported message type, AI failure, send failure,
-- or a future explicit "talk to a human" trigger) -- confirmed with the
-- user 2026-09-15 that escalating alone should silence the AI immediately,
-- not just once a human actually replies.
create or replace function conversations_pause_ai_on_escalation()
returns trigger as $$
begin
  if new.needs_human = true and old.needs_human = false then
    new.ai_paused := true;
    new.ai_paused_at := now();
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_conversations_pause_ai_on_escalation on conversations;
create trigger trg_conversations_pause_ai_on_escalation
  before update on conversations
  for each row
  execute function conversations_pause_ai_on_escalation();

create table if not exists conversation_takeover_tokens (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations (id) on delete cascade,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  used_at timestamptz,
  revoked_at timestamptz
);

-- The token itself is never stored, only its SHA-256 hash (same reasoning
-- as storing a password hash, not the password): anyone with read access
-- to this table, including a Supabase dashboard viewer, must not be able
-- to reconstruct a live, working link from it. The API route that issues
-- the token hashes it before this insert and hashes an incoming token the
-- same way before the lookup below.
create index if not exists conversation_takeover_tokens_conversation_id_idx
  on conversation_takeover_tokens (conversation_id);

alter table conversation_takeover_tokens enable row level security;

-- No SELECT/INSERT/UPDATE policy for authenticated or anon: this table is
-- read and written exclusively by API routes using the service-role
-- (admin) client, which bypasses RLS by design. A visitor on the
-- /takeover/[token] page never has a Supabase session, and a logged-in
-- dashboard user has no legitimate reason to read another customer's raw
-- token hashes, so there is no policy that should ever grant access here.
