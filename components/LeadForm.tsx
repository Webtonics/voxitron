"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

type InterestedAgent =
  | "speed-to-lead"
  | "quoting-agent"
  | "both"
  | "whatsapp-agent"
  | "real-estate"
  | "diagnostic-centre"
  | "general";

const MONTHLY_LEAD_BRACKETS = [
  "Fewer than 50",
  "50 - 200",
  "200 - 500",
  "More than 500",
] as const;

type LeadFormProps = {
  defaultAgent?: InterestedAgent;
  /**
   * "simple": original 5-field form (name, business, email, phone, which agent). Used by /get-started.
   * "discovery-call": adds business type, monthly WhatsApp lead volume, and a free-text notes field. Used by /contact and the lead calculator.
   */
  variant?: "simple" | "discovery-call";
  submitLabel?: string;
};

export default function LeadForm({
  defaultAgent,
  variant = "simple",
  submitLabel,
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || ""),
      businessName: String(data.get("businessName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      interestedAgent: String(data.get("interestedAgent") || defaultAgent || "general"),
      businessType: String(data.get("businessType") || ""),
      monthlyWhatsappLeads: String(data.get("monthlyWhatsappLeads") || ""),
      notes: String(data.get("notes") || ""),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Couldn't reach the server. Please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="lead-form-success" role="status">
        <p className="lead-form-success-title">Got it. We&apos;ll be in touch shortly.</p>
        <p className="lead-form-success-body">
          {variant === "discovery-call"
            ? "We reply on WhatsApp first, usually within a few hours."
            : "Check your email, we usually reply within one business day."}
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="lead-name">Name</label>
        <input
          id="lead-name"
          name="name"
          type="text"
          required
          className="lead-form-input"
          autoComplete="name"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="lead-business">Business name</label>
        <input
          id="lead-business"
          name="businessName"
          type="text"
          required
          className="lead-form-input"
          autoComplete="organization"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="lead-email">Email</label>
        <input
          id="lead-email"
          name="email"
          type="email"
          required
          className="lead-form-input"
          autoComplete="email"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="lead-phone">
          {variant === "discovery-call" ? "WhatsApp number" : "Phone (optional)"}
        </label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          required={variant === "discovery-call"}
          className="lead-form-input"
          autoComplete="tel"
        />
      </div>

      {variant === "simple" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="lead-agent">Which agent?</label>
          <select
            id="lead-agent"
            name="interestedAgent"
            required
            className="lead-form-input"
            defaultValue={defaultAgent || ""}
          >
            <option value="" disabled>Select one</option>
            <option value="speed-to-lead">Speed to Lead Agent</option>
            <option value="quoting-agent">Automated Quoting Agent</option>
            <option value="both">Both</option>
          </select>
        </div>
      )}

      {variant === "discovery-call" && (
        <>
          <div className="lead-form-row">
            <label className="lead-form-label" htmlFor="lead-business-type">Business type</label>
            <select
              id="lead-business-type"
              name="businessType"
              className="lead-form-input"
              defaultValue=""
            >
              <option value="" disabled>Select one</option>
              <option value="real-estate">Real estate</option>
              <option value="diagnostic-centre">Diagnostic centre</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="lead-form-row">
            <label className="lead-form-label" htmlFor="lead-monthly-leads">
              Roughly how many WhatsApp enquiries do you get a month?
            </label>
            <select
              id="lead-monthly-leads"
              name="monthlyWhatsappLeads"
              className="lead-form-input"
              defaultValue=""
            >
              <option value="" disabled>Select one</option>
              {MONTHLY_LEAD_BRACKETS.map((bracket) => (
                <option key={bracket} value={bracket}>{bracket}</option>
              ))}
            </select>
          </div>

          <div className="lead-form-row">
            <label className="lead-form-label" htmlFor="lead-notes">Anything else? (optional)</label>
            <textarea
              id="lead-notes"
              name="notes"
              className="lead-form-input"
              rows={3}
            />
          </div>

          <input type="hidden" name="interestedAgent" value={defaultAgent || "general"} />
        </>
      )}

      {status === "error" && (
        <p className="lead-form-error" role="alert">{errorMessage}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : submitLabel || "Get Started"}
      </button>
    </form>
  );
}
