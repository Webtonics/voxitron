"use client";

import { useEffect, useState } from "react";
import {
  INDUSTRY_OPTIONS,
  INDUSTRY_LABELS,
  templateForIndustry,
  type Industry,
  type IndustryConfig,
} from "@/lib/dashboard/industryTemplates";

type Status = "loading" | "idle" | "submitting" | "error" | "success";

type CustomerOption = {
  id: string;
  business_name: string;
  industry: string | null;
  config: IndustryConfig | Record<string, never>;
};

function listToText(items: string[]): string {
  return items.join("\n");
}

function textToList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function OnboardingForm() {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [customerId, setCustomerId] = useState("");
  const [industry, setIndustry] = useState<Industry>("whatsapp-agent");
  const [toneNotes, setToneNotes] = useState("");
  const [questionsText, setQuestionsText] = useState("");
  const [bookingType, setBookingType] = useState("");
  const [bookingInstructions, setBookingInstructions] = useState("");
  const [triggersText, setTriggersText] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const response = await fetch("/api/onboarding");
        const data = await response.json();
        if (cancelled) return;

        if (!response.ok) {
          setStatus("error");
          setMessage(data.error || "Couldn't load customers.");
          return;
        }

        setCustomers(data.customers || []);
        setStatus("idle");
      } catch {
        if (!cancelled) {
          setStatus("error");
          setMessage("Couldn't reach the server.");
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function applyConfig(config: IndustryConfig) {
    setToneNotes(config.tone_notes);
    setQuestionsText(listToText(config.qualification_questions));
    setBookingType(config.booking_flow.type);
    setBookingInstructions(config.booking_flow.instructions);
    setTriggersText(listToText(config.escalation_triggers));
  }

  function handleCustomerChange(id: string) {
    setCustomerId(id);
    const existing = customers.find((c) => c.id === id);
    if (existing && existing.industry && existing.config && "tone_notes" in existing.config) {
      setIndustry(existing.industry as Industry);
      applyConfig(existing.config as IndustryConfig);
    } else {
      applyConfig(templateForIndustry(industry));
    }
  }

  function handleIndustryChange(next: Industry) {
    setIndustry(next);
    applyConfig(templateForIndustry(next));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!customerId) {
      setStatus("error");
      setMessage("Pick a customer first.");
      return;
    }

    setStatus("submitting");
    setMessage("");

    const config: IndustryConfig = {
      tone_notes: toneNotes,
      qualification_questions: textToList(questionsText),
      booking_flow: { type: bookingType, instructions: bookingInstructions },
      escalation_triggers: textToList(triggersText),
    };

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, industry, config }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again.");
        return;
      }

      setStatus("success");
      setMessage("Saved. This customer's agent will use the new config on its next reply.");
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
    }
  }

  if (status === "loading") {
    return <p className="lead-form-hint">Loading customers...</p>;
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-customer">Customer</label>
        <select
          id="onboarding-customer"
          className="lead-form-input"
          required
          value={customerId}
          onChange={(e) => handleCustomerChange(e.target.value)}
        >
          <option value="">Select a customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.business_name}</option>
          ))}
        </select>
        <p className="lead-form-hint">
          The customer row must already exist (created via supabase/onboarding-template.sql Steps 0-1).
        </p>
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-industry">Industry</label>
        <select
          id="onboarding-industry"
          className="lead-form-input"
          required
          value={industry}
          onChange={(e) => handleIndustryChange(e.target.value as Industry)}
        >
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option} value={option}>{INDUSTRY_LABELS[option]}</option>
          ))}
        </select>
        <p className="lead-form-hint">
          Changing this replaces the fields below with that industry&apos;s starting template.
        </p>
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-tone">Tone notes</label>
        <textarea
          id="onboarding-tone"
          className="lead-form-input"
          rows={2}
          value={toneNotes}
          onChange={(e) => setToneNotes(e.target.value)}
          placeholder="How the agent should sound for this business"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-questions">
          Qualification questions (one per line)
        </label>
        <textarea
          id="onboarding-questions"
          className="lead-form-input"
          rows={4}
          value={questionsText}
          onChange={(e) => setQuestionsText(e.target.value)}
          placeholder="What is the customer asking about?"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-booking-type">Booking flow type</label>
        <input
          id="onboarding-booking-type"
          type="text"
          className="lead-form-input"
          value={bookingType}
          onChange={(e) => setBookingType(e.target.value)}
          placeholder="e.g. order, viewing, test_booking"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-booking-instructions">
          Booking flow instructions
        </label>
        <textarea
          id="onboarding-booking-instructions"
          className="lead-form-input"
          rows={3}
          value={bookingInstructions}
          onChange={(e) => setBookingInstructions(e.target.value)}
          placeholder="What the agent should do once it has what it needs"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="onboarding-triggers">
          Escalation triggers (one per line)
        </label>
        <textarea
          id="onboarding-triggers"
          className="lead-form-input"
          rows={3}
          value={triggersText}
          onChange={(e) => setTriggersText(e.target.value)}
          placeholder="When the agent should hand off to a human"
        />
      </div>

      {status === "error" && (
        <p className="lead-form-error" role="alert">{message}</p>
      )}

      {status === "success" && (
        <p className="lead-form-status" role="status">{message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Saving..." : "Save configuration"}
      </button>
    </form>
  );
}
