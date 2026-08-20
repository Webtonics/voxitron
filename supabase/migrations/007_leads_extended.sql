-- Run this once in the Supabase SQL Editor, after 006_conversation_uniqueness.sql.
-- Extends the leads table for the new WhatsApp/Lagos-primary site structure:
-- /contact and /tools/missed-lead-calculator both submit leads for the new
-- primary offerings (WhatsApp Agent, Real Estate, Diagnostic Centres), not
-- just Speed to Lead / Quoting Agent. Existing /get-started flow is
-- unaffected: all new columns are nullable, and the existing CHECK values
-- stay valid.

alter table leads drop constraint if exists leads_interested_agent_check;

alter table leads add constraint leads_interested_agent_check
  check (interested_agent in (
    'speed-to-lead', 'quoting-agent', 'both',
    'whatsapp-agent', 'real-estate', 'diagnostic-centre', 'general'
  ));

alter table leads add column if not exists business_type text;
alter table leads add column if not exists monthly_whatsapp_leads text;
alter table leads add column if not exists notes text;
