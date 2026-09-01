-- Run this once in the Supabase SQL Editor, after 014_customer_tools.sql.
-- Adds the dashboard's new self-service Settings page: a customer can edit
-- their own business_name and the label on their own WhatsApp numbers.
-- Everything else on `customers` (industry, config) stays Voxitron-only,
-- per 009_customer_config.sql's comment, since those columns drive the live
-- agent's system prompt and aren't safe for a customer to change unassisted.

create policy "Members can update their customer's business name"
  on customers
  for update
  to authenticated
  using (
    id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  )
  with check (
    id in (
      select customer_id from customer_members where auth_user_id = auth.uid()
    )
  );

create policy "Members can update their customer's WhatsApp number labels"
  on customer_whatsapp_numbers
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

-- Both policies allow UPDATE on the whole row at the Postgres level (RLS
-- can't restrict to individual columns), so the write path that actually
-- performs the update (app/api/dashboard/settings/route.ts) is what limits
-- the request to business_name / label specifically, never trusting the
-- client to send only those fields.
