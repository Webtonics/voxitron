-- Run this once in the Supabase SQL Editor, after 025_whatsapp_button.sql.
-- Per-customer settings for the two live-lookup tools wired into n8n's
-- AI Agent Reply node, so each business's agent checks its own calendar and
-- its own product sheet, never another business's.
--
-- calendar_id: the Google Calendar id "Check Calendar Availability" reads
-- (already referenced by that node, but no migration in this repo ever
-- created it, so "if not exists" is safe whether or not it was added by hand).
-- The calendar must be shared with the Google account behind n8n's
-- googleCalendarOAuth2Api credential.
--
-- live_sheet_id: the Google Sheets spreadsheet id (the long id in the sheet's
-- URL, between /d/ and /edit) that "Check Live Sheet" searches for stock and
-- prices. Replaces the hardcoded CONNECT_YOUR_SHEET_ID. Must be shared with
-- the Google account behind n8n's googleSheetsOAuth2Api credential.
--
-- Both stay null for a business with nothing connected; the tools then tell
-- the agent "nothing connected" instead of guessing.

alter table customers
  add column if not exists calendar_id text;

alter table customers
  add column if not exists live_sheet_id text;
