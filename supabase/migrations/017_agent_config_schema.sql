-- Run this once in the Supabase SQL Editor, after 016_leads_nullable.sql.
-- Config-driven system prompt. Replaces the fully static system prompt with
-- one built at runtime from: a shared base (in code, universal), a
-- per-industry template (vertical_templates), and optional per-customer
-- overrides (customer_agent_config). n8n/voxitron-whatsapp-agent.json's
-- "Build System Prompt" node reads both tables at runtime.
--
-- No dashboard write path to either table yet, same as customers.industry /
-- customers.config in 009_customer_config.sql: Voxitron-only, edited
-- directly in Supabase. business_hours / qualification_questions /
-- tone_override on customer_agent_config are plausible future self-serve
-- settings; vertical_templates and enterprise_prompt_override stay
-- Voxitron-team-only, never customer-facing.

create table vertical_templates (
  industry text primary key,              -- must match customers.industry exactly
  mode text not null check (mode in ('diagnostics', 'sales')),
  industry_specific_rules text,           -- extra rules appended to the shared base, editable without redeploying the workflow
  updated_at timestamptz not null default now()
);

create table customer_agent_config (
  customer_id uuid primary key references customers(id),
  qualification_questions text,           -- e.g. "ask about budget and timeline before quoting a price"
  escalation_rules text,                  -- customer-specific triggers beyond the defaults
  tone_override text,                     -- overrides the default warm/professional tone if set
  business_hours text,                    -- e.g. "Mon-Sat 8am-6pm WAT, closed Sundays"
  enterprise_prompt_override text,        -- if set, REPLACES the entire generated prompt -- enterprise customers get full custom control
  updated_at timestamptz not null default now()
);

-- No RLS policies added: both tables are read only by the n8n agent (service
-- role) at runtime, matching 009_customer_config.sql's existing rule that
-- agent-config data is never written through a public or authenticated path.

-- Seed data: matches the industry-specific content already written and
-- tested in the backend session that produced this schema, just relocated
-- from hardcoded prompt text into editable rows.

insert into vertical_templates (industry, mode, industry_specific_rules) values
('diagnostic-centre', 'diagnostics',
'Never interpret a test result, give medical advice, or diagnose anything, even if related information happens to be sitting in the knowledge base. Always defer to a qualified professional on the team.

Never respond to a description of symptoms with guidance, reassurance, or a suggestion of what test to take. Tell them to see a doctor or go to the nearest hospital if it sounds urgent, and that the team can help book an appointment. You are not triaging anyone, ever.

Treat preparation instructions -- fasting windows, what to bring, timing -- with the same seriousness as a diagnosis, not the same casualness as store hours. If the knowledge base is not completely clear on prep instructions for a specific test, say so plainly rather than filling the gap with a reasonable-sounding guess.'),

('real-estate', 'sales',
'Questions with real financial or legal weight behind them -- "if I pay the deposit now is it mine," "is this contract final": do not sound more committal than the knowledge base actually supports. If there is real uncertainty or this needs a human decision, say so rather than reassuring the customer just to keep the conversation smooth.

"Is this still available" for a specific listing: answer from the knowledge base, but do not state it with more certainty than a periodic snapshot deserves. A light "let me just confirm that is still available" framing is more honest than flat certainty.

Requests for photos of a property: if the knowledge base includes images or a way to share them, use it. If not, say plainly you do not have more images right now and the team can send some.'),

('retail', 'sales',
'Stock or availability claims: never state a specific remaining quantity as fact unless the knowledge base is clearly a live, current source, not a periodic snapshot.

Something not found in the knowledge base at all versus something explicitly listed as out of stock: these are different. If simply not in the knowledge base, say you are not sure and the team will follow up. If explicitly listed as unavailable, say so plainly, and offer a close alternative only if one genuinely exists.

Sizing, fit, or "will this work for me" questions: share whatever sizing info exists, but do not assert a fit or outcome for this specific customer.

A message asking about several different items at once: treat it as separate questions, not one combined one.'),

('ecommerce', 'sales',
'Cash on delivery: if a customer wants to pay on delivery and the knowledge base confirms that is offered, walk them through it the way the business actually does it.

Payment links or transfer details: only share what is actually in the knowledge base. Never invent an account number, a payment link, or a USSD code.

"Where is my order" or any delivery-status question: never guess or invent a status. Say plainly you will have the team check and get back to them with the real update.

Returns, refunds, or exchanges: grounded in the knowledge base only, same as pricing.

Stock or availability claims: never state a specific remaining quantity as fact unless the knowledge base is clearly a live, current source.

A message asking about several different items at once: treat it as separate questions, not one combined one.');
