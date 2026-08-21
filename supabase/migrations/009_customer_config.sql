-- Run this once in the Supabase SQL Editor, after 008_leads_retail_ecommerce.sql.
-- Adds a per-customer industry classification and a jsonb config blob that the
-- WhatsApp agent (n8n/voxitron-whatsapp-agent.json) reads at runtime to build
-- its system prompt: qualification questions, booking/ordering flow, tone
-- notes, escalation triggers. Filled in by Voxitron at onboarding (see
-- supabase/onboarding-template.sql Step 1.5), never by the customer, no
-- dashboard write path exists to these columns.
--
-- industry uses the same vocabulary as leads.interested_agent
-- (008_leads_retail_ecommerce.sql), plus 'general' for a customer that
-- doesn't map to one of the 5 sold industries.

alter table customers add column if not exists industry text;
alter table customers add column if not exists config jsonb not null default '{}'::jsonb;

alter table customers add constraint customers_industry_check
  check (industry is null or industry in (
    'whatsapp-agent', 'real-estate', 'diagnostic-centre',
    'retail', 'ecommerce', 'general'
  ));

-- No RLS changes needed: config and industry are columns on the existing
-- `customers` table, already covered by 002_conversations.sql's "Members can
-- view their customer record" SELECT policy. No INSERT/UPDATE policy is
-- added here either, matching that file's existing rule that customers rows
-- are written only by Voxitron via the service role, never through a public
-- or authenticated write path.
