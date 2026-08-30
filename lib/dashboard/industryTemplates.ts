/**
 * Starting-point AI agent config per industry, used by the onboarding page
 * to pre-fill a new customer's `customers.config` (see
 * supabase/migrations/009_customer_config.sql). Kept in sync with
 * supabase/industry-templates.md, which documents the same templates for
 * anyone still onboarding a customer by hand via
 * supabase/onboarding-template.sql.
 */

export type IndustryConfig = {
  tone_notes: string;
  qualification_questions: string[];
  booking_flow: {
    type: string;
    instructions: string;
  };
  escalation_triggers: string[];
};

export const INDUSTRY_OPTIONS = [
  "whatsapp-agent",
  "real-estate",
  "diagnostic-centre",
  "retail",
  "ecommerce",
  "general",
] as const;

export type Industry = (typeof INDUSTRY_OPTIONS)[number];

export const INDUSTRY_LABELS: Record<Industry, string> = {
  "whatsapp-agent": "WhatsApp Agent (general Nigerian retail/service)",
  "real-estate": "Real Estate (agents and brokers)",
  "diagnostic-centre": "Diagnostic Centre (labs)",
  retail: "Retail (shop owners and market sellers)",
  ecommerce: "Ecommerce (online stores and D2C brands)",
  general: "General (no industry template)",
};

export const INDUSTRY_TEMPLATES: Record<Exclude<Industry, "general">, IndustryConfig> = {
  "whatsapp-agent": {
    tone_notes:
      "Warm, direct, straight to the point. Short texts, common Nigerian phrasing, never robotic or overly formal.",
    qualification_questions: [
      "What product or service are they asking about?",
      "Do they want to buy now, or are they just checking price/availability?",
    ],
    booking_flow: {
      type: "order",
      instructions:
        "Confirm the item, quantity, and price from the knowledge base, then take the order details (delivery or pickup, payment method) in the same chat.",
    },
    escalation_triggers: [
      "Customer wants to negotiate the price",
      "Customer has a complaint about a previous order",
    ],
  },
  "real-estate": {
    tone_notes: "Professional but warm, like a helpful agent, not a call center script.",
    qualification_questions: [
      "Which property or listing are they asking about?",
      "What's their budget range?",
      "Are they paying cash or do they need financing?",
      "What's their timeline to move or buy?",
    ],
    booking_flow: {
      type: "viewing",
      instructions:
        "Once budget, financing status, and timeline are known, offer 2-3 available viewing slots and confirm one directly in the chat. Do not offer a slot before those three are known.",
    },
    escalation_triggers: [
      "Customer wants to negotiate below the listed asking price",
      "Customer asks for legal documents or contract terms",
      "Customer raises a concern about title or ownership verification",
    ],
  },
  "diagnostic-centre": {
    tone_notes:
      "Clear and reassuring. Patients are often anxious, keep answers simple and direct, never clinical jargon.",
    qualification_questions: [
      "Which test or panel are they asking about?",
      "Do they want to come in, or do they need home sample collection?",
    ],
    booking_flow: {
      type: "test_booking",
      instructions:
        "Confirm the test and price from the knowledge base, offer available slots, and once a slot is confirmed, send the relevant prep instructions (fasting, documents needed, etc.) in the same conversation.",
    },
    escalation_triggers: [
      "Customer asks to discuss actual test results (never share clinical results directly in chat)",
      "Customer has a complaint about a previous visit or result delay",
      "Customer asks a clinical question the knowledge base doesn't answer",
    ],
  },
  retail: {
    tone_notes: "Friendly and quick, like messaging a regular customer. Short replies, no long paragraphs.",
    qualification_questions: [
      "Which item are they asking about (with size/color/variant if relevant)?",
      "Are they ready to order, or just checking stock and price?",
    ],
    booking_flow: {
      type: "order",
      instructions:
        "Check real stock before confirming availability. Once the customer confirms what they want, take the order (quantity, delivery or pickup, payment) and log it.",
    },
    escalation_triggers: [
      "Customer wants to negotiate the price",
      "Customer asks about a bulk or wholesale order",
    ],
  },
  ecommerce: {
    tone_notes: "Efficient and reassuring, especially right after an order or payment, customers want confirmation fast.",
    qualification_questions: [
      "Are they asking about a new order, or checking on an existing one?",
      "If existing, do they have an order number or the phone number used to order?",
    ],
    booking_flow: {
      type: "order_confirmation",
      instructions:
        "For a new order, confirm items and total from the knowledge base and take delivery details. For an existing order, answer tracking/status questions directly, don't ask the customer to check anywhere else.",
    },
    escalation_triggers: [
      "Customer wants a refund or return",
      "Customer says an order arrived damaged, wrong, or incomplete",
      "Customer disputes a charge or payment",
    ],
  },
};

export const EMPTY_CONFIG: IndustryConfig = {
  tone_notes: "",
  qualification_questions: [],
  booking_flow: { type: "", instructions: "" },
  escalation_triggers: [],
};

export function templateForIndustry(industry: Industry): IndustryConfig {
  if (industry === "general") return EMPTY_CONFIG;
  return INDUSTRY_TEMPLATES[industry];
}
