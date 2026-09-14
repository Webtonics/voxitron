"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "error";

export default function LoginForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    // A client-side router.push() here raced the auth cookie: Next.js could
    // fetch the dashboard's RSC payload before the browser had actually
    // attached the cookie signInWithPassword just set, so DashboardLayout's
    // getUser() saw no session, bounced back to /login, and the form looked
    // stuck on "Logging in..." (status never left "submitting" on the
    // success path either, compounding it) until a manual reload sent the
    // cookie fresh. A full navigation guarantees the cookie is on the
    // request, so this goes through window.location instead of the router.
    window.location.assign("/dashboard");
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="login-email">Email</label>
        <input
          id="login-email"
          name="email"
          type="email"
          required
          className="lead-form-input"
          autoComplete="email"
        />
      </div>

      <div className="lead-form-row">
        <div className="login-password-row">
          <label className="lead-form-label" htmlFor="login-password">Password</label>
          <Link href="/forgot-password" className="login-inline-link">
            Forgot password?
          </Link>
        </div>
        <input
          id="login-password"
          name="password"
          type="password"
          required
          className="lead-form-input"
          autoComplete="current-password"
        />
      </div>

      {status === "error" && (
        <p className="lead-form-error" role="alert">{errorMessage}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Logging in..." : "Log In"}
      </button>
    </form>
  );
}
