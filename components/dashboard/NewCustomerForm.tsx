"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { INDUSTRY_LABELS, INDUSTRY_OPTIONS } from "@/lib/dashboard/industryTemplates";

type Status = "idle" | "submitting" | "error" | "success";

export default function NewCustomerForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    let response: Response;
    try {
      response = await fetch("/api/dashboard/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    const data: { ok?: boolean; error?: string; customerId?: string; unfinished?: string[] } = await response
      .json()
      .catch(() => ({}));

    if (!response.ok || !data.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Try again.");
      return;
    }

    if (data.unfinished?.length) {
      setStatus("error");
      setMessage(`Customer created, but these still need doing: ${data.unfinished.join(", ")}.`);
    } else {
      setStatus("success");
      setMessage("Customer created. They set their password with Forgot password on the login page.");
      form.reset();
    }

    router.push(`/dashboard/build?for=${data.customerId}`);
    router.refresh();
  }

  return (
    <form className="lead-form build-new-customer" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-business-name">Business name</label>
        <input id="new-business-name" name="businessName" type="text" required className="lead-form-input" />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-industry">Industry</label>
        <select id="new-industry" name="industry" className="lead-form-input" defaultValue="retail">
          {INDUSTRY_OPTIONS.map((industry) => (
            <option key={industry} value={industry}>{INDUSTRY_LABELS[industry]}</option>
          ))}
        </select>
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-login-email">
          Their login email <span className="lead-form-hint">optional</span>
        </label>
        <input id="new-login-email" name="loginEmail" type="email" className="lead-form-input" />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-owner-number">
          Owner&apos;s WhatsApp <span className="lead-form-hint">for alerts when a person is needed</span>
        </label>
        <input id="new-owner-number" name="ownerWhatsappNumber" type="tel" className="lead-form-input" placeholder="+234 801 234 5678" />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-phone-number-id">
          Meta phone number ID <span className="lead-form-hint">optional, add once the number is on the API</span>
        </label>
        <input id="new-phone-number-id" name="phoneNumberId" type="text" inputMode="numeric" className="lead-form-input" />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="new-display-number">
          That number, as people dial it <span className="lead-form-hint">optional</span>
        </label>
        <input id="new-display-number" name="displayNumber" type="tel" className="lead-form-input" placeholder="+234 801 234 5678" />
      </div>

      {status === "error" && <p className="lead-form-error" role="alert">{message}</p>}
      {status === "success" && <p className="lead-form-status" role="status">{message}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Creating..." : "Create customer"}
      </button>
    </form>
  );
}
