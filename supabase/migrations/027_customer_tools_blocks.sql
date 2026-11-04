-- Run this once in the Supabase SQL Editor, after 025 or 026. It works whether
-- or not 026_customer_agent_tools.sql was ever run, so skip 026 if it wasn't.
--
-- Makes customer_tools (014) the one place a customer's connected tools live.
-- 026 put calendar_id and live_sheet_id on customers as columns, which is the
-- exact thing 014 was written to avoid: a migration for every new tool. Those
-- values move here, and the agent's tools now read from here (lib/blocks/).
-- 028 drops the old columns once the new n8n workflow is imported.
--
-- block is what the agent can do (stock, bookings, crm). tool_name is which
-- tool does it for this customer (google_sheets, google_calendar, hubspot).
-- One tool per block per customer, so the agent never has to choose. Free text
-- on purpose, same reasoning as tool_name in 014: a new tool is a new row and a
-- new provider in lib/blocks/registry.ts, never a schema change.

alter table customer_tools add column if not exists block text;

update customer_tools
set block = case tool_name
  when 'google_sheets' then 'stock'
  when 'google_calendar' then 'bookings'
  when 'hubspot' then 'crm'
  else tool_name
end
where block is null;

alter table customer_tools alter column block set not null;

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'customer_tools_customer_block_key') then
    alter table customer_tools add constraint customer_tools_customer_block_key unique (customer_id, block);
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'customers' and column_name = 'live_sheet_id'
  ) then
    execute $sql$
      insert into customer_tools (customer_id, block, tool_name, config)
      select id, 'stock', 'google_sheets', jsonb_build_object('sheet_id', live_sheet_id)
      from customers
      where coalesce(live_sheet_id, '') <> ''
      on conflict do nothing
    $sql$;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'customers' and column_name = 'calendar_id'
  ) then
    execute $sql$
      insert into customer_tools (customer_id, block, tool_name, config)
      select id, 'bookings', 'google_calendar', jsonb_build_object('calendar_id', calendar_id)
      from customers
      where coalesce(calendar_id, '') <> ''
      on conflict do nothing
    $sql$;
  end if;
end $$;

-- 014 lets a customer's dashboard users read their own rows, which included the
-- credentials column. Those are encrypted now (lib/blocks/secrets.ts), but they
-- still have no business reaching a browser, so members can read everything but
-- that one column. The service role, used by the app's server code, is unaffected.
revoke select on customer_tools from anon, authenticated;
grant select (id, customer_id, block, tool_name, config, status, last_checked_at, last_error, connected_at, updated_at)
  on customer_tools to authenticated;
