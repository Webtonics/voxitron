-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query),
-- after 001_leads.sql. Adds the schema for the customer dashboard (Phase 4):
-- each Voxitron client (customer) has their own WhatsApp Business number, and
-- every conversation/message the WhatsApp agent handles gets logged here.
--
-- Multi-tenant: Voxitron itself is a customer of its own platform (its own row
-- in `customers`, its own WhatsApp number, its own logged conversations, its
-- own dashboard access), not just a vendor selling to others. Confirmed with
-- the user 2026-08-04. A customer account can have multiple dashboard logins
-- (e.g. more than one person on a client's team, or more than one person on
-- Voxitron's own team), so membership is a join table, not a single FK.
--
-- Message shape is adapted from a proven pattern (Area50app's `messages` table):
-- ticket_id -> conversation_id, sender_type -> direction, content -> body,
-- created_at -> sent_at.

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  whatsapp_number text not null unique,
  created_at timestamptz not null default now()
);

-- One row per (customer, dashboard login). Lets a customer (including Voxitron
-- itself) have more than one team member with dashboard access.
create table if not exists customer_members (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  auth_user_id uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (customer_id, auth_user_id)
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

create index if not exists customer_members_auth_user_id_idx on customer_members (auth_user_id);
create index if not exists conversations_customer_id_idx on conversations (customer_id);
create index if not exists messages_conversation_id_idx on messages (conversation_id);

alter table customers enable row level security;
alter table customer_members enable row level security;
alter table conversations enable row level security;
alter table messages enable row level security;

-- Dashboard users can only see customer rows they're a member of.
create policy "Members can view their customer record"
  on customers
  for select
  to authenticated
  using (
    id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

-- Dashboard users can see their own membership rows (who else is on their
-- team is not exposed here, just "am I a member of this customer").
create policy "Members can view their own membership"
  on customer_members
  for select
  to authenticated
  using (auth_user_id = auth.uid());

-- Dashboard users can only see conversations belonging to a customer they're a member of.
create policy "Members can view their customer's conversations"
  on conversations
  for select
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

-- Dashboard users can only see messages inside conversations they have access to.
create policy "Members can view their customer's messages"
  on messages
  for select
  to authenticated
  using (
    conversation_id in (
      select c.id from conversations c
      join customer_members cm on cm.customer_id = c.customer_id
      where cm.auth_user_id = auth.uid()
    )
  );

-- No insert/update/delete policies are created for the anon or authenticated
-- roles on customers/conversations/messages. Only the n8n workflow writes to
-- conversations/messages, and it must use the Supabase service role key
-- (bypasses RLS by design), never the anon key. customers and customer_members
-- rows are created manually by Voxitron at onboarding (via the Supabase
-- dashboard or a service-role script), not through any public-facing insert
-- path. Do not add a public INSERT policy to any of these four tables.
