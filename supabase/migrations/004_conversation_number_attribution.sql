-- Run this once in the Supabase SQL Editor, after 003_conversation_escalation.sql.
-- Adds per-number attribution to conversations: which of the customer's
-- WhatsApp numbers a conversation actually came in on. Needed for the
-- dashboard's number filter/switcher (DASHBOARD_UI.md's "Number
-- filter/switcher" section), which was previously listed as an open
-- question because this column didn't exist yet.

alter table conversations
  add column if not exists whatsapp_number_id uuid
    references customer_whatsapp_numbers (id) on delete set null;

-- Nullable, not required: a conversation is still valid and still belongs to
-- the right customer via customer_id even if this is unset (e.g. for any
-- rows logged before this column existed, or a future non-WhatsApp channel
-- like the embeddable web widget planned in DASHBOARD_UI.md, which has no
-- WhatsApp number at all).

create index if not exists conversations_whatsapp_number_id_idx
  on conversations (whatsapp_number_id);
