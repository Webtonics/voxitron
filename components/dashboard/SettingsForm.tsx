"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type WhatsAppNumber = { id: string; label: string | null; whatsapp_number: string };

type Status = "idle" | "submitting" | "error" | "success";

export default function SettingsForm({
  customerId,
  initialBusinessName,
  numbers,
}: {
  customerId: string;
  initialBusinessName: string;
  numbers: WhatsAppNumber[];
}) {
  const [businessName, setBusinessName] = useState(initialBusinessName);
  const [labels, setLabels] = useState<Record<string, string>>(
    Object.fromEntries(numbers.map((n) => [n.id, n.label || ""]))
  );
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
        body: JSON.stringify({ customerId, businessName, numberLabels: labels }),
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

      {numbers.map((n) => (
        <div className="lead-form-row" key={n.id}>
          <label className="lead-form-label" htmlFor={`settings-number-${n.id}`}>
            Label for {n.whatsapp_number}
          </label>
          <input
            id={`settings-number-${n.id}`}
            type="text"
            className="lead-form-input"
            placeholder="e.g. Main line, Lagos store"
            value={labels[n.id] ?? ""}
            onChange={(e) => setLabels((prev) => ({ ...prev, [n.id]: e.target.value }))}
          />
        </div>
      ))}

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
