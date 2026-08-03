"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function LeadForm({ defaultAgent }: { defaultAgent?: "speed-to-lead" | "quoting-agent" | "both" }) {
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
      interestedAgent: String(data.get("interestedAgent") || ""),
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
          Check your email, we usually reply within one business day.
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
        <label className="lead-form-label" htmlFor="lead-phone">Phone (optional)</label>
        <input
          id="lead-phone"
          name="phone"
          type="tel"
          className="lead-form-input"
          autoComplete="tel"
        />
      </div>

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

      {status === "error" && (
        <p className="lead-form-error" role="alert">{errorMessage}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Get Started"}
      </button>
    </form>
  );
}
