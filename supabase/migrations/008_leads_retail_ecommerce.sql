-- Run this once in the Supabase SQL Editor, after 007_leads_extended.sql.
-- Adds Retailers and E-commerce Brands as valid interested_agent values,
-- for the two new industry pages (/retail, /ecommerce). Existing rows and
-- flows are unaffected.

alter table leads drop constraint if exists leads_interested_agent_check;

alter table leads add constraint leads_interested_agent_check
  check (interested_agent in (
    'speed-to-lead', 'quoting-agent', 'both',
    'whatsapp-agent', 'real-estate', 'diagnostic-centre',
    'retail', 'ecommerce', 'general'
  ));
