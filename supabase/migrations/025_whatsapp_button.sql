-- Run this once in the Supabase SQL Editor, after 024_conversation_takeover.sql.
-- Adds the dashboard's "WhatsApp button" feature: a customer configures a
-- floating WhatsApp button, pastes one <script> tag on their own website
-- (public/wa-button.js), and visitors who click it land in WhatsApp with a
-- greeting prefilled, talking to the customer's existing Voxitron agent.
--
-- whatsapp_buttons.id is the public identifier baked into the embed snippet,
-- deliberately separate from customer_id so the snippet never exposes the
-- internal tenant id. It is not a secret: the only thing it unlocks is the
-- button's public config (a phone number already shown on the customer's
-- own site) and the click counter, which app/api/whatsapp-button/[id]/click
-- rate limits per visitor.

create table if not exists whatsapp_buttons (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references customers (id) on delete cascade,
  whatsapp_number_id uuid references customer_whatsapp_numbers (id) on delete set null,
  greeting text not null default 'Hi, I found you on your website.',
  tooltip text,
  position text not null default 'right' check (position in ('right', 'left')),
  color_mode text not null default 'whatsapp' check (color_mode in ('whatsapp', 'brand')),
  brand_color text check (brand_color is null or brand_color ~ '^#[0-9A-Fa-f]{6}$'),
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- One row per click. No raw IP or user agent is stored: visitor_hash is an
-- HMAC of ip + user agent + the current UTC day, so it can't be reversed or
-- linked across days. It only exists so the click route can rate limit.
-- page_path is host + path with the query string stripped (query strings
-- often carry tracking ids or emails).
create table if not exists whatsapp_button_clicks (
  id uuid primary key default gen_random_uuid(),
  button_id uuid not null references whatsapp_buttons (id) on delete cascade,
  clicked_at timestamptz not null default now(),
  page_path text,
  visitor_hash text
);

create index if not exists whatsapp_button_clicks_button_clicked_idx
  on whatsapp_button_clicks (button_id, clicked_at desc);

alter table whatsapp_buttons enable row level security;
alter table whatsapp_button_clicks enable row level security;

create policy "Members can read their customer's WhatsApp button"
  on whatsapp_buttons
  for select
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

create policy "Members can create their customer's WhatsApp button"
  on whatsapp_buttons
  for insert
  to authenticated
  with check (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

create policy "Members can update their customer's WhatsApp button"
  on whatsapp_buttons
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

create policy "Members can read their customer's WhatsApp button clicks"
  on whatsapp_button_clicks
  for select
  to authenticated
  using (
    button_id in (
      select b.id from whatsapp_buttons b
      join customer_members m on m.customer_id = b.customer_id
      where m.auth_user_id = auth.uid()
    )
  );

-- No public (anon) policies on either table. The public config and click
-- routes (app/api/whatsapp-button/[id]/*) use the service-role client and do
-- their own checks, same as the other public routes in this app. Clicks are
-- never written by an authenticated customer, only by that click route.
