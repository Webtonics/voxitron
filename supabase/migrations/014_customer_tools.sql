-- Run this once in the Supabase SQL Editor, after 013_owner_whatsapp_number.sql.
-- Adds per-customer tool connections for the WhatsApp agent (n8n's AI Agent
-- node): live Google Sheets search today, Google Calendar, Odoo, Zoho CRM,
-- or any other third-party system a given customer needs, later. Confirmed
-- with the user 2026-08-27: this is not a dashboard-configurable on/off
-- flag per tool (a boolean column per tool means a migration every time a
-- new tool exists), and a row's mere existence is not enough either,
-- "enabled" without a real, working connection is meaningless. A
-- customer_tools row IS the live connection: n8n reads it to both decide a
-- tool is active for that customer AND to actually use it. This is an
-- n8n/backend-managed concern, not dashboard UI, per the user.
--
-- Built Lego-style, confirmed with the user 2026-08-27: not shaped around
-- any one vendor's auth pattern, so a brand new tool type (client V needs
-- Odoo, client W needs Zoho CRM, the next customer needs something no one
-- has heard of yet) plugs into the same table with zero schema change.
-- Concretely: no access_token/refresh_token columns, those only fit
-- OAuth2-shaped tools (Google's pattern), and Odoo (username + API key) and
-- Zoho CRM (OAuth2, but region-locked accounts.zoho.com/.eu/.in with its
-- own client_id/client_secret per app) don't share that shape with Google
-- or with each other. Every credential, of whatever shape a given tool
-- needs, lives in `credentials` instead.
--
-- tool_name is free text, not an enum: adding a new tool type is an insert,
-- never a schema change. config is non-secret settings shaped differently
-- per tool_name (e.g. google_sheets: {sheet_id, sheet_tab}, odoo: {base_url,
-- database}, zoho_crm: {api_domain}), read by whichever n8n tool node
-- implements that tool_name. credentials is secret material, also shaped
-- per tool_name (e.g. google_sheets/zoho_crm: {access_token, refresh_token,
-- expires_at}, odoo: {username, api_key}), kept in its own column rather
-- than mixed into config so the two can eventually get different handling
-- (e.g. encryption, redaction in a future admin view) without a reshape.
--
-- status/last_checked_at/last_error track connection health independent of
-- OAuth token expiry, since an Odoo API key or Zoho account can break for
-- reasons that have nothing to do with a token expiring (revoked key,
-- changed password, suspended account). n8n (or a future health-check job)
-- updates these when a call using this connection succeeds or fails, so a
-- broken connection is visible instead of failing silently until someone
-- notices agent replies are wrong.
--
-- Encrypt `credentials` at rest before any real customer OAuth token or API
-- key lands here, confirmed with the user: these are real customer
-- credentials, treat them like passwords, not like a long-lived personal
-- API token.

create table if not exists customer_tools (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers (id) on delete cascade,
  tool_name text not null,
  config jsonb not null default '{}'::jsonb,
  credentials jsonb not null default '{}'::jsonb,
  status text not null default 'connected' check (status in ('connected', 'error', 'disconnected')),
  last_checked_at timestamptz,
  last_error text,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (customer_id, tool_name)
);

create index if not exists customer_tools_customer_id_idx on customer_tools (customer_id);

alter table customer_tools enable row level security;

-- Dashboard users can view their customer's tool connections (e.g. a future
-- "connected tools" status list showing status/last_error), scoped the same
-- way as every other membership-based SELECT policy. No insert/update/
-- delete policy for anon or authenticated: connecting/disconnecting a tool
-- is an n8n/backend flow (OAuth callback, service-role write), never a
-- public or direct dashboard write path, per the user 2026-08-27.
create policy "Members can view their customer's tool connections"
  on customer_tools
  for select
  to authenticated
  using (
    customer_id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );
