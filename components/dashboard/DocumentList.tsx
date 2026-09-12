"use client";

import { useState } from "react";
import { isDebugModeEnabled } from "@/lib/dashboard/debugMode";

export type DocumentRow = {
  title: string;
  chunkCount: number | null;
  updatedAt: string;
};

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days === 0) return "today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  return weeks < 5 ? `${weeks} week${weeks === 1 ? "" : "s"} ago` : `${Math.floor(days / 30)} months ago`;
}

export default function DocumentList({
  documents,
  customerId,
}: {
  documents: DocumentRow[];
  customerId: string;
}) {
  const [removing, setRemoving] = useState<string | null>(null);
  const [pendingRemoval, setPendingRemoval] = useState<string | null>(null);
  const [rows, setRows] = useState(documents);
  const [error, setError] = useState<string | null>(null);
  const [errorDebug, setErrorDebug] = useState<unknown>(null);

  async function confirmRemove(title: string) {
    setRemoving(title);
    setError(null);
    setErrorDebug(null);

    const formData = new FormData();
    formData.set("customerId", customerId);
    formData.set("documentTitle", title);
    formData.set("sourceType", "delete");

    const debugMode = isDebugModeEnabled();

    try {
      const response = await fetch("/api/knowledge-base", {
        method: "POST",
        body: formData,
        headers: debugMode ? { "X-Debug": "1" } : undefined,
      });
      const data = await response.json();
      if (!response.ok || !data.jobId) {
        if (debugMode && data.debug) setErrorDebug(data.debug);
        throw new Error(data.error || "Something went wrong.");
      }
      setRows((prev) => prev.filter((d) => d.title !== title));
    } catch (err) {
      setError(err instanceof Error ? err.message : "That didn't go through. Check the content and try again.");
    } finally {
      setRemoving(null);
      setPendingRemoval(null);
    }
  }

  if (rows.length === 0) {
    return <p className="lead-form-hint">Nothing left in your knowledge base.</p>;
  }

  return (
    <div>
      {error && (
        <div style={{ marginBottom: "var(--space-3)" }}>
          <p className="lead-form-error" role="alert">{error}</p>
          {errorDebug !== null && (
            <pre className="dashboard-debug-panel">{JSON.stringify(errorDebug, null, 2)}</pre>
          )}
        </div>
      )}
      <ul className="dashboard-doc-list">
        {rows.map((doc) => (
          <li key={doc.title} className="dashboard-doc-row">
            <span className="dashboard-doc-row-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                <path d="M5 4h11l3 3v13H5z" />
                <path d="M9 9h6M9 13h6" />
              </svg>
            </span>
            <div className="dashboard-doc-row-body">
              <span className="dashboard-doc-row-name">{doc.title}</span>
              <span className="dashboard-doc-row-meta mono">
                Updated {timeAgo(doc.updatedAt)}
                {doc.chunkCount != null && ` · ${doc.chunkCount} chunk${doc.chunkCount === 1 ? "" : "s"}`}
              </span>
            </div>
            {pendingRemoval === doc.title ? (
              <div className="dashboard-doc-row-confirm">
                <span>Remove?</span>
                <button
                  type="button"
                  className="dashboard-doc-row-confirm-btn"
                  onClick={() => confirmRemove(doc.title)}
                  disabled={removing === doc.title}
                >
                  {removing === doc.title ? "Removing..." : "Remove"}
                </button>
                <button
                  type="button"
                  className="dashboard-doc-row-confirm-btn is-ghost"
                  onClick={() => setPendingRemoval(null)}
                  disabled={removing === doc.title}
                >
                  Keep it
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="dashboard-doc-row-remove"
                title="Remove"
                aria-label={`Remove ${doc.title}`}
                onClick={() => setPendingRemoval(doc.title)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                  <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" />
                </svg>
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
