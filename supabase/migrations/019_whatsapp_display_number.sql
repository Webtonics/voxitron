-- Run this once in the Supabase SQL Editor, after 018_dashboard_analytics_fields.sql.
-- Adds a human-readable phone number to customer_whatsapp_numbers.
-- whatsapp_number stores Meta's phone_number_id (see 002_conversations.sql),
-- which is not a phone number a human recognises. Nothing in this schema has
-- ever stored the actual dialable number, so the sidebar and Settings page
-- have been showing the raw Meta id to customers ("Agent live on
-- 1247922868396450", "Label for 1247922868396450"). display_number is the
-- fix: a nullable, free-text field for the number as a person would dial it
-- (e.g. "+234 812 090 7050"), set once at onboarding.
--
-- Nullable and no backfill: existing rows keep showing their current
-- (broken) display until Voxitron fills this in per customer. The dashboard
-- should fall back to the number's label, then hide the line entirely,
-- never fall back to whatsapp_number.

alter table customer_whatsapp_numbers
  add column if not exists display_number text;

-- Customers can already self-edit `label` on their own numbers (see
-- 015_customer_self_edit.sql's policy); display_number is covered by that
-- same UPDATE policy since it's column-level, not a new policy. The write
-- path (app/api/dashboard/settings/route.ts) is what limits which columns a
-- customer request can actually change.
