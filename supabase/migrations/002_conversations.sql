-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query),
-- after 001_leads.sql. Adds the schema for the customer dashboard (Phase 4):
-- each Voxitron client (customer) has one or more WhatsApp Business numbers,
-- and every conversation/message the WhatsApp agent handles gets logged here.
--
-- Multi-tenant: Voxitron itself is a customer of its own platform (its own row
-- in `customers`, its own WhatsApp number(s), its own logged conversations,
-- its own dashboard access), not just a vendor selling to others. Confirmed
-- with the user 2026-08-04. A customer account can have multiple dashboard
-- logins (e.g. more than one person on a client's team, or more than one
-- person on Voxitron's own team), so membership is a join table, not a single
-- FK. A customer can also have more than one WhatsApp number (corrected
-- 2026-08-04, an earlier pass assumed exactly one number per customer), so
-- numbers live in their own table too, not a column on `customers`.

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
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

-- One row per WhatsApp number a customer operates. `whatsapp_number` stores
-- Meta's phone_number_id (what arrives in the webhook payload), not the
-- human-readable phone number, matching what the n8n workflow looks up by.
create table if not exists customer_whatsapp_numbers (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  whatsapp_number text not null unique,
  label text,
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

create index if not exists customer_members_auth_user_id_idx on customer_members (auth_user_id);
create index if not exists customer_whatsapp_numbers_customer_id_idx on customer_whatsapp_numbers (customer_id);
create index if not exists conversations_customer_id_idx on conversations (customer_id);
create index if not exists messages_conversation_id_idx on messages (conversation_id);

alter table customers enable row level security;
alter table customer_members enable row level security;
alter table customer_whatsapp_numbers enable row level security;
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

-- Dashboard users can only see WhatsApp numbers belonging to a customer they're a member of.
create policy "Members can view their customer's WhatsApp numbers"
  on customer_whatsapp_numbers
  for select
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

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
-- roles on any of these five tables. Only the n8n workflow writes to
-- conversations/messages, and it must use the Supabase service role key
-- (bypasses RLS by design), never the anon key. customers, customer_members,
-- and customer_whatsapp_numbers rows are created manually by Voxitron at
-- onboarding (via the Supabase dashboard or a service-role script), not
-- through any public-facing insert path. Do not add a public INSERT policy
-- to any of these tables.
