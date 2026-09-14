"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "sent" | "error";

export default function ForgotPasswordForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    // Show the same success state whether or not the email matches an
    // account, so this form can't be used to check who has a Voxitron login.
    if (error && error.status !== 400) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="lead-form-success">
        <p className="lead-form-success-title">Check your email</p>
        <p className="lead-form-success-body">
          If an account matches that address, we&apos;ve sent a link to reset your password.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="forgot-email">Email</label>
        <input
          id="forgot-email"
          name="email"
          type="email"
          required
          className="lead-form-input"
          autoComplete="email"
        />
      </div>

      {status === "error" && (
        <p className="lead-form-error" role="alert">{errorMessage}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send reset link"}
      </button>
    </form>
  );
}
