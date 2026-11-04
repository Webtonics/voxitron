-- Run this only after importing the n8n agent workflow that reads customer_tools
-- (see 027_customer_tools_blocks.sql). The older workflow from commit a3073da
-- selects these two columns, so dropping them first would stop that agent replying.

alter table customers drop column if exists calendar_id;
alter table customers drop column if exists live_sheet_id;
