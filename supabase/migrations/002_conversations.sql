-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query),
-- after 001_leads.sql. Adds the schema for the customer dashboard (Phase 4):
-- each Voxitron client (customer) has their own WhatsApp Business number, and
-- every conversation/message the WhatsApp agent handles gets logged here.
--
-- Message shape is adapted from a proven pattern (Area50app's `messages` table):
-- ticket_id -> conversation_id, sender_type -> direction, content -> body,
-- created_at -> sent_at.

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  whatsapp_number text not null unique,
  auth_user_id uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table if not exists conversations (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  contact_name text,
  contact_phone text not null,
  started_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references conversations (id) on delete cascade,
  direction text not null check (direction in ('inbound', 'outbound')),
  body text not null,
  sent_at timestamptz not null default now()
);

create index if not exists conversations_customer_id_idx on conversations (customer_id);
create index if not exists messages_conversation_id_idx on messages (conversation_id);

alter table customers enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- Dashboard users (Supabase Auth) can only see their own customer row.
create policy "Customers can view their own record"
  on customers
  for select
  to authenticated
  using (auth_user_id = auth.uid());

-- Dashboard users can only see conversations belonging to their own customer row.
create policy "Customers can view their own conversations"
  on conversations
  for select
  to authenticated
  using (
    customer_id in (
      select id from customers where auth_user_id = auth.uid()
    )
  );

-- Dashboard users can only see messages inside their own conversations.
create policy "Customers can view their own messages"
  on messages
  for select
  to authenticated
  using (
    conversation_id in (
      select c.id from conversations c
      join customers cu on cu.id = c.customer_id
      where cu.auth_user_id = auth.uid()
    )
  );

-- No insert/update/delete policies are created for the anon or authenticated
-- roles on any of these three tables. Only the n8n workflow writes here, and
-- it must use the Supabase service role key (bypasses RLS by design), never
-- the anon key. Do not add a public INSERT policy to these tables.
