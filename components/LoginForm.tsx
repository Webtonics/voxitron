"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "error";

export default function LoginForm() {
  const router = useRouter();
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

    router.push("/dashboard");
    router.refresh();
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
        <label className="lead-form-label" htmlFor="login-password">Password</label>
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
