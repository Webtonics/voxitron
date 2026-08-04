-- Voxitron customer onboarding template.
-- Copy this whole file into the Supabase SQL Editor for each new customer
-- (including Voxitron itself, as tenant #1), fill in the placeholders marked
-- <<LIKE_THIS>>, and run it top to bottom. Requires 002_conversations.sql to
-- already be applied.

-- ─────────────────────────────────────────────────────────────
-- STEP 0 (do this in the Supabase dashboard UI, not SQL):
-- Authentication > Users > Add user, or Invite user by email.
-- This creates the row in auth.users that step 2 below links to.
-- Copy the new user's UUID from the dashboard before continuing.
-- ─────────────────────────────────────────────────────────────

-- STEP 1: create the customer (the tenant / account).
insert into customers (business_name)
values ('<<BUSINESS_NAME>>')
returning id;
-- Copy the returned id, you'll need it for every step below.
-- (Or wrap this whole file in a single `with` chain if you prefer, see the
-- worked example at the bottom of this file.)

-- STEP 2: grant a dashboard login access to this customer.
-- auth_user_id is the UUID from Step 0.
insert into customer_members (customer_id, auth_user_id)
values ('<<CUSTOMER_ID_FROM_STEP_1>>', '<<AUTH_USER_ID_FROM_STEP_0>>');

-- Repeat Step 2 (with a different auth_user_id) for every additional team
-- member on this customer's account, e.g. a second person at the same
-- business, or a second Voxitron team member for Voxitron's own tenant row.

-- STEP 3: add the customer's WhatsApp number(s), once known.
-- whatsapp_number stores Meta's phone_number_id (not the human phone
-- number), see n8n/README.md. Skip this step entirely if the number isn't
-- provisioned in Meta yet, add it later with the same statement.
insert into customer_whatsapp_numbers (customer_id, whatsapp_number, label)
values ('<<CUSTOMER_ID_FROM_STEP_1>>', '<<META_PHONE_NUMBER_ID>>', '<<OPTIONAL_LABEL_E.G._MAIN_LINE>>');

-- Repeat Step 3 for each additional number this customer operates.


-- ─────────────────────────────────────────────────────────────
-- WORKED EXAMPLE: all three SQL steps chained in one statement,
-- so you only need to paste in the auth_user_id once. Still requires
-- Step 0 (creating the auth user) to have been done first in the dashboard.
-- ─────────────────────────────────────────────────────────────

-- with new_customer as (
--   insert into customers (business_name)
--   values ('Voxitron')
--   returning id
-- ),
-- new_member as (
--   insert into customer_members (customer_id, auth_user_id)
--   select id, '00000000-0000-0000-0000-000000000000'::uuid from new_customer
--   returning customer_id
-- )
-- insert into customer_whatsapp_numbers (customer_id, whatsapp_number, label)
-- select id, '000000000000000', 'Main line' from new_customer;
