"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type Status = "idle" | "submitting" | "error" | "success";

export default function SettingsForm({
  customerId,
  initialBusinessName,
  initialOwnerWhatsappNumber,
  initialOwnerEmail,
}: {
  customerId: string;
  initialBusinessName: string;
  initialOwnerWhatsappNumber: string;
  initialOwnerEmail: string;
}) {
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [ownerWhatsappNumber, setOwnerWhatsappNumber] = useState(initialOwnerWhatsappNumber);
  const [ownerEmail, setOwnerEmail] = useState(initialOwnerEmail);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    let response: Response;
    try {
      response = await fetch("/api/dashboard/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          businessName,
          ownerWhatsappNumber,
          ownerEmail,
        }),
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    let data: { ok?: boolean; error?: string };
    try {
      data = await response.json();
    } catch {
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return;
    }

    if (!response.ok || !data.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Try again.");
      return;
    }

    setStatus("success");
    setMessage("Saved.");
  }

  const isBusy = status === "submitting";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="settings-business-name">Business name</label>
        <input
          id="settings-business-name"
          type="text"
          required
          className="lead-form-input"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="settings-owner-whatsapp">
          Your WhatsApp number <span className="lead-form-hint">for escalation alerts</span>
        </label>
        <input
          id="settings-owner-whatsapp"
          type="tel"
          className="lead-form-input"
          placeholder="+234 812 090 7050"
          value={ownerWhatsappNumber}
          onChange={(e) => setOwnerWhatsappNumber(e.target.value)}
        />
        <p className="lead-form-hint">
          Where your agent messages you when a conversation needs a human.
        </p>
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="settings-owner-email">
          Your email <span className="lead-form-hint">for escalation alerts</span>
        </label>
        <input
          id="settings-owner-email"
          type="email"
          className="lead-form-input"
          placeholder="you@yourbusiness.com"
          value={ownerEmail}
          onChange={(e) => setOwnerEmail(e.target.value)}
        />
      </div>

      {status === "error" && (
        <p className="lead-form-error" role="alert">{message}</p>
      )}

      {status === "success" && (
        <p className="lead-form-status" role="status">{message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={isBusy}>
        {isBusy ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}
