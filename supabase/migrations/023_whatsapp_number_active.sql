-- Run this once in the Supabase SQL Editor, after 022_kb_uploads_bucket.sql.
-- Adds is_active to customer_whatsapp_numbers so a customer can deactivate a
-- number they no longer use from the dashboard (Settings > WhatsApp
-- numbers), without losing the row: conversation history and attribution
-- (conversations.whatsapp_number_id, see 004_conversation_number_attribution.sql)
-- stay intact, and Voxitron keeps the record of which Meta phone_number_id
-- was ever wired up for this customer. A hard delete would lose both.
--
-- Deliberately not a way to "remove" a number's Meta-side provisioning: this
-- column only controls what the dashboard shows as live and, going forward,
-- what n8n should treat as a currently-routable number for this customer.
-- Actually adding a new number still requires Voxitron to provision it in
-- Meta first (see supabase/onboarding-template.sql Step 3), there is no
-- self-serve "add" path yet.

alter table customer_whatsapp_numbers
  add column if not exists is_active boolean not null default true;

-- Customers can already UPDATE their own numbers' `label` (015's policy);
-- is_active is covered by that same row-level UPDATE policy since it's
-- column-level, not a new policy. The write path
-- (app/api/dashboard/settings/route.ts) is what limits which columns a
-- customer request can actually change.
