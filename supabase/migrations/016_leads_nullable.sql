-- Run this once in the Supabase SQL Editor, after 015_customer_self_edit.sql.
-- /get-started is being rebuilt around a genuine 2-field fallback form (name +
-- WhatsApp number only), for visitors who don't want to switch to WhatsApp
-- directly. That form has no business_name or email to submit, so both
-- columns become nullable here rather than synthesizing fake values to
-- satisfy a NOT NULL constraint. app/api/leads/route.ts still requires both
-- for the fuller lead form used elsewhere (contact, calculator), this
-- migration only relaxes what the database itself allows.

alter table leads alter column business_name drop not null;
alter table leads alter column email drop not null;
