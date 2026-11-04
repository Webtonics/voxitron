"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Pill from "@/components/dashboard/Pill";
import type { ProviderField } from "@/lib/blocks/types";

export type BlockProviderOption = { id: string; label: string; fields: ProviderField[] };

export type BlockConnection = {
  toolName: string;
  config: Record<string, string>;
  hasSecret: boolean;
  status: "connected" | "error" | "disconnected";
  lastError: string | null;
  lastCheckedAt: string | null;
};

type Status = "idle" | "testing" | "removing" | "error" | "success";

/** One block on the Build screen: pick the tool this customer already uses, fill it in, test it. */
export default function BlockCard({
  customerId,
  blockId,
  label,
  question,
  providers,
  connection,
}: {
  customerId: string;
  blockId: string;
  label: string;
  question: string;
  providers: BlockProviderOption[];
  connection: BlockConnection | null;
}) {
  const router = useRouter();
  const [providerId, setProviderId] = useState(connection?.toolName || providers[0]?.id || "");
  const [values, setValues] = useState<Record<string, string>>(connection?.config || {});
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const provider = providers.find((option) => option.id === providerId);
  const isBusy = status === "testing" || status === "removing";

  async function send(method: "POST" | "DELETE", body: object): Promise<boolean> {
    let response: Response;
    try {
      response = await fetch("/api/dashboard/blocks", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return false;
    }

    const data: { ok?: boolean; error?: string } = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Try again.");
      return false;
    }
    return true;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("testing");
    setMessage("");

    if (await send("POST", { customerId, provider: providerId, fields: values })) {
      setStatus("success");
      setMessage("Tested and saved. The agent can use it now.");
      router.refresh();
    }
  }

  async function handleRemove() {
    setStatus("removing");
    setMessage("");

    if (await send("DELETE", { customerId, block: blockId })) {
      setStatus("idle");
      setValues({});
      router.refresh();
    }
  }

  return (
    <form className="dashboard-card build-block" onSubmit={handleSubmit} noValidate>
      <div className="dashboard-card-header">
        <span className="dashboard-card-header-title">{label}</span>
        {connection?.status === "connected" && <Pill variant="booked">Connected</Pill>}
        {connection?.status === "error" && <Pill variant="needs-you">Needs attention</Pill>}
      </div>

      <div className="dashboard-card-body build-block-body">
        <p className="lead-form-hint">Ask: {question}</p>

        {connection?.status === "error" && connection.lastError && (
          <p className="lead-form-error">{connection.lastError}</p>
        )}

        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor={`${blockId}-provider`}>Their tool</label>
          <select
            id={`${blockId}-provider`}
            className="lead-form-input"
            value={providerId}
            onChange={(event) => setProviderId(event.target.value)}
          >
            {providers.map((option) => (
              <option key={option.id} value={option.id}>{option.label}</option>
            ))}
          </select>
        </div>

        {provider?.fields.map((field) => (
          <div className="lead-form-row" key={field.key}>
            <label className="lead-form-label" htmlFor={`${blockId}-${field.key}`}>
              {field.label} {field.optional && <span className="lead-form-hint">optional</span>}
            </label>
            <input
              id={`${blockId}-${field.key}`}
              type={field.secret ? "password" : "text"}
              autoComplete="off"
              className="lead-form-input"
              placeholder={field.secret && connection?.hasSecret ? "Saved. Leave empty to keep it" : field.placeholder}
              value={values[field.key] || ""}
              onChange={(event) => setValues({ ...values, [field.key]: event.target.value })}
            />
            {field.hint && <p className="lead-form-hint">{field.hint}</p>}
          </div>
        ))}

        {status === "error" && <p className="lead-form-error" role="alert">{message}</p>}
        {status === "success" && <p className="lead-form-status" role="status">{message}</p>}

        <div className="build-block-actions">
          <button type="submit" className="btn btn-primary" disabled={isBusy}>
            {status === "testing" ? "Testing..." : "Test and save"}
          </button>
          {connection && (
            <button type="button" className="btn btn-secondary" disabled={isBusy} onClick={handleRemove}>
              {status === "removing" ? "Removing..." : "Remove"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
