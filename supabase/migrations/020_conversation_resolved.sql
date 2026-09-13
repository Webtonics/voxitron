-- Run this once in the Supabase SQL Editor, after 019_whatsapp_display_number.sql.
-- Adds the "Closed" segment to the redesigned Inbox (voxitron-inbox-at-scale.md):
-- a conversation can be marked resolved by the customer from the dashboard,
-- separate from needs_human (which the agent sets) and is_lead/outcome
-- (which n8n doesn't write yet). resolved is the one flag a dashboard user
-- can set themselves today.

alter table conversations
  add column if not exists resolved boolean not null default false;

alter table conversations
  add column if not exists resolved_at timestamptz;

create index if not exists conversations_resolved_idx
  on conversations (customer_id, resolved);

-- Dashboard users can mark their own customer's conversations
-- resolved/reopened. Everything else on `conversations` stays written only
-- by the n8n workflow's service-role key, per 002_conversations.sql's
-- existing rule; this policy is scoped to UPDATE only (no insert/delete),
-- and the write path (app/api/dashboard/conversations/[id]/resolve/route.ts)
-- limits the request to the resolved/resolved_at columns specifically,
-- never trusting the client to send anything else.
create policy "Members can resolve their customer's conversations"
  on conversations
  for update
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  )
  with check (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );
