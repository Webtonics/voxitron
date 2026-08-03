-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text not null,
  email text not null,
  phone text,
  interested_agent text not null check (interested_agent in ('speed-to-lead', 'quoting-agent', 'both')),
  created_at timestamptz not null default now()
);

alter table leads enable row level security;

-- Allow inserts from anyone using the anon key (the public lead form).
-- No SELECT policy is created, so the anon key can never read leads back.
create policy "Anyone can submit a lead"
  on leads
  for insert
  to anon
  with check (true);
