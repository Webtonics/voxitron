"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "checking" | "ready" | "invalid" | "submitting" | "done" | "error";

export default function ResetPasswordForm() {
  const [status, setStatus] = useState<Status>("checking");
  const [errorMessage, setErrorMessage] = useState("");

  // The email link lands here with a recovery code Supabase exchanges for a
  // session automatically (detectSessionInUrl, on by default for the browser
  // client). We just wait for that session, or for the PASSWORD_RECOVERY
  // event, before letting the form submit, otherwise updateUser has nothing
  // to act on and a visitor who opens this page directly gets a dead form
  // instead of a clear "link expired" message.
  useEffect(() => {
    const supabase = createClient();
    let settled = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        settled = true;
        setStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !settled) {
        settled = true;
        setStatus("ready");
      }
    });

    const timeout = setTimeout(() => {
      if (!settled) setStatus("invalid");
    }, 3000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const data = new FormData(event.currentTarget);
    const password = String(data.get("password") || "");
    const confirmPassword = String(data.get("confirmPassword") || "");

    if (password !== confirmPassword) {
      setStatus("error");
      setErrorMessage("Passwords don't match.");
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setErrorMessage(error.message);
      return;
    }

    // Full navigation, not router.push, for the same cookie-timing reason
    // as LoginForm: it guarantees the session cookie updateUser just wrote
    // is actually on the request that loads the dashboard.
    setStatus("done");
    setTimeout(() => {
      window.location.assign("/dashboard");
    }, 1500);
  }

  if (status === "checking") {
    return <p className="lead-form-status">Checking your reset link...</p>;
  }

  if (status === "invalid") {
    return (
      <div className="lead-form-success">
        <p className="lead-form-success-title">This link has expired</p>
        <p className="lead-form-success-body">
          Reset links only work once and expire after a while. Request a new one from
          the forgot password page.
        </p>
        <a href="/forgot-password" className="login-back-link">
          Request a new link
        </a>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="lead-form-success">
        <p className="lead-form-success-title">Password updated</p>
        <p className="lead-form-success-body">Taking you to your dashboard...</p>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="reset-password">New password</label>
        <input
          id="reset-password"
          name="password"
          type="password"
          required
          minLength={8}
          className="lead-form-input"
          autoComplete="new-password"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="reset-confirm-password">Confirm password</label>
        <input
          id="reset-confirm-password"
          name="confirmPassword"
          type="password"
          required
          minLength={8}
          className="lead-form-input"
          autoComplete="new-password"
        />
      </div>

      {status === "error" && (
        <p className="lead-form-error" role="alert">{errorMessage}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Updating..." : "Update password"}
      </button>
    </form>
  );
}
