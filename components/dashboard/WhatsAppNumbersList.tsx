"use client";

import { useState } from "react";

export type WhatsAppNumberRow = {
  id: string;
  label: string | null;
  display_number: string | null;
  is_active: boolean;
};

export default function WhatsAppNumbersList({
  customerId,
  numbers,
}: {
  customerId: string;
  numbers: WhatsAppNumberRow[];
}) {
  const [rows, setRows] = useState(numbers);
  const [labelDrafts, setLabelDrafts] = useState<Record<string, string>>(
    Object.fromEntries(numbers.map((n) => [n.id, n.label || ""]))
  );
  const [pendingConfirm, setPendingConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function saveNumber(numberId: string, patch: { isActive?: boolean; label?: string }) {
    setError(null);
    setSaving(numberId);

    let response: Response;
    try {
      response = await fetch("/api/dashboard/whatsapp-numbers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          numberId,
          ...(patch.isActive !== undefined && { isActive: patch.isActive }),
          ...(patch.label !== undefined && { label: patch.label }),
        }),
      });
    } catch {
      setError("Couldn't reach the server. Try again in a moment.");
      setSaving(null);
      setPendingConfirm(null);
      return;
    }

    let data: { ok?: boolean; error?: string };
    try {
      data = await response.json();
    } catch {
      setError("Unexpected response from the server.");
      setSaving(null);
      setPendingConfirm(null);
      return;
    }

    if (!response.ok || !data.ok) {
      setError(data.error || "Couldn't update that number. Try again.");
      setSaving(null);
      setPendingConfirm(null);
      return;
    }

    setRows((prev) =>
      prev.map((n) =>
        n.id === numberId
          ? { ...n, ...(patch.isActive !== undefined && { is_active: patch.isActive }), ...(patch.label !== undefined && { label: patch.label || null }) }
          : n
      )
    );
    setSaving(null);
    setPendingConfirm(null);
  }

  function toggleActive(numberId: string, nextActive: boolean) {
    return saveNumber(numberId, { isActive: nextActive });
  }

  function saveLabel(numberId: string) {
    const current = rows.find((n) => n.id === numberId);
    const draft = (labelDrafts[numberId] ?? "").trim();
    if (draft === (current?.label || "")) return;
    saveNumber(numberId, { label: draft });
  }

  if (rows.length === 0) {
    return (
      <p className="lead-form-hint">
        No WhatsApp numbers set up yet. Contact your Voxitron rep to get one provisioned.
      </p>
    );
  }

  return (
    <div>
      {error && <p className="lead-form-error" role="alert" style={{ marginBottom: "var(--space-3)" }}>{error}</p>}

      <ul className="dashboard-doc-list">
        {rows.map((n) => (
          <li key={n.id} className="dashboard-numbers-row">
            <div className="dashboard-numbers-row-top">
              <div className="dashboard-doc-row-body">
                <span className="dashboard-doc-row-name">{n.display_number || "Number not set yet"}</span>
              </div>

              <span className={`dashboard-kb-status ${n.is_active ? "dashboard-kb-status-success" : "dashboard-kb-status-processing"}`}>
                {n.is_active ? "Active" : "Deactivated"}
              </span>

              {pendingConfirm === n.id ? (
                <div className="dashboard-doc-row-confirm">
                  <span>{n.is_active ? "Deactivate?" : "Reactivate?"}</span>
                  <button
                    type="button"
                    className="dashboard-doc-row-confirm-btn"
                    onClick={() => toggleActive(n.id, !n.is_active)}
                    disabled={saving === n.id}
                  >
                    {saving === n.id ? "Saving..." : n.is_active ? "Deactivate" : "Reactivate"}
                  </button>
                  <button
                    type="button"
                    className="dashboard-doc-row-confirm-btn is-ghost"
                    onClick={() => setPendingConfirm(null)}
                    disabled={saving === n.id}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  className="dashboard-numbers-row-toggle"
                  title={n.is_active ? "Deactivate" : "Reactivate"}
                  aria-label={`${n.is_active ? "Deactivate" : "Reactivate"} ${n.display_number || "this number"}`}
                  onClick={() => setPendingConfirm(n.id)}
                >
                  {n.is_active ? "Deactivate" : "Reactivate"}
                </button>
              )}
            </div>

            <input
              type="text"
              className="lead-form-input dashboard-numbers-row-label-input"
              placeholder="Label, e.g. Main line, Lagos store"
              value={labelDrafts[n.id] ?? ""}
              onChange={(e) => setLabelDrafts((prev) => ({ ...prev, [n.id]: e.target.value }))}
              onBlur={() => saveLabel(n.id)}
              disabled={saving === n.id}
            />
          </li>
        ))}
      </ul>

      <p className="lead-form-hint" style={{ marginTop: "var(--space-3)" }}>
        To add a new number, contact your Voxitron rep. Deactivating a number stops it showing as
        live, it does not delete its conversation history.
      </p>
    </div>
  );
}
