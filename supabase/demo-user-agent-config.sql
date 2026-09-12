-- Adds a customer_agent_config row for the existing demo customer created by
-- supabase/demo-user.sql, so its agent's prompt exercises the new
-- config-driven path (017_agent_config_schema.sql) instead of falling back
-- to the shared base prompt with no per-customer layer.
--
-- Note: demo-user.sql sets this customer's industry to 'whatsapp-agent',
-- which has no matching row in vertical_templates (seeded only for
-- diagnostic-centre, real-estate, retail, ecommerce). Its agent prompt will
-- still be shared base + this customer_agent_config row, just with no
-- industry_specific_rules layer, until/unless its industry is changed to one
-- of the four seeded verticals or a 'whatsapp-agent' template row is added.
--
-- Requires 017_agent_config_schema.sql to already be applied, and
-- demo-user.sql to have already been run (looks the customer up by the same
-- auth_user_id demo-user.sql links, no need to paste a customer_id by hand).

insert into customer_agent_config (
  customer_id,
  qualification_questions,
  escalation_rules,
  tone_override,
  business_hours
)
select customer_id,
  'What product or service are they asking about? Do they want to buy now, or are they just checking price/availability?',
  'Customer wants to negotiate the price. Customer has a complaint about a previous order.',
  'Warm, direct, straight to the point. Short texts, common Nigerian phrasing.',
  'Mon-Sat 8am-6pm WAT, closed Sundays'
from customer_members
where auth_user_id = '30100858-001f-42f9-9e90-7afa29ef8eb4'::uuid
on conflict (customer_id) do update set
  qualification_questions = excluded.qualification_questions,
  escalation_rules = excluded.escalation_rules,
  tone_override = excluded.tone_override,
  business_hours = excluded.business_hours,
  updated_at = now();
