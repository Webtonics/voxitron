-- Run this once in the Supabase SQL Editor, after 009_customer_config.sql.
-- leads (001_leads.sql) has an INSERT policy for the anon key (the public
-- lead form) but no SELECT policy at all, so /dashboard/leads
-- (DASHBOARD_UI.md, Voxitron-internal only) cannot read leads back through
-- an authenticated user's RLS-scoped session, even Voxitron's own team.
--
-- Since leads has no customer_id (it's pre-tenant, a form submission from a
-- prospective customer, not yet onboarded), this can't be scoped the way
-- every other dashboard SELECT policy is scoped (customer_members join).
-- Instead, this checks a fixed constant: only members of Voxitron's own
-- customers row (its id, set in lib/dashboard/voxitron.ts once Voxitron has
-- actually onboarded itself per supabase/onboarding-template.sql) can read
-- leads. Replace the placeholder UUID below with that real id before
-- running this migration, it will not do anything useful with the
-- placeholder left in place (no row will ever match it).

create policy "Voxitron team can view leads"
  on leads
  for select
  to authenticated
  using (
    exists (
      select 1 from customer_members
      where customer_members.auth_user_id = auth.uid()
        and customer_members.customer_id = '00000000-0000-0000-0000-000000000000'::uuid
        -- ^ REPLACE with Voxitron's real customers.id before running.
    )
  );
