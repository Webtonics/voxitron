"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "processing" | "error" | "success";
type SourceType = "paste" | "website" | "file" | "sheet" | "delete";

const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  paste: "Paste text",
  website: "Website page",
  file: "File (PDF or Word)",
  sheet: "Google Sheet",
  delete: "Delete Document",
};

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 60 * 2s = 2 minutes: generous for a large file/website fetch, but don't poll forever

export default function KnowledgeBaseForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [sourceType, setSourceType] = useState<SourceType>("paste");
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, []);

  async function pollJob(jobId: string, attempt: number, form: HTMLFormElement) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("kb_ingest_jobs")
      .select("status, chunk_count, error_message")
      .eq("id", jobId)
      .single();

    if (error) {
      setStatus("error");
      setMessage("Lost track of the ingest job. Check the Knowledge Base later to confirm whether it finished.");
      return;
    }

    if (data.status === "success") {
      setStatus("success");
      setMessage(`Ingested (${data.chunk_count ?? "?"} chunk${data.chunk_count === 1 ? "" : "s"}).`);
      form.reset();
      setSourceType("paste");
      return;
    }

    if (data.status === "failed") {
      setStatus("error");
      setMessage(data.error_message || "Ingest failed for an unknown reason.");
      return;
    }

    if (attempt >= MAX_POLL_ATTEMPTS) {
      setStatus("error");
      setMessage("Still processing after 2 minutes. Check the Knowledge Base later, this may still complete.");
      return;
    }

    pollTimeoutRef.current = setTimeout(() => pollJob(jobId, attempt + 1, form), POLL_INTERVAL_MS);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    let response: Response;
    try {
      response = await fetch("/api/knowledge-base", {
        method: "POST",
        body: formData,
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    let data: { jobId?: string; error?: string };
    try {
      data = await response.json();
    } catch {
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return;
    }

    if (!response.ok || !data.jobId) {
      setStatus("error");
      setMessage(data.error || "Something went wrong. Try again.");
      return;
    }

    setStatus("processing");
    setMessage("Processing...");
    pollJob(data.jobId, 1, form);
  }

  const isBusy = status === "submitting" || status === "processing";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="kb-customer-id">Customer ID</label>
        <input
          id="kb-customer-id"
          name="customerId"
          type="text"
          required
          className="lead-form-input"
          placeholder="the customers.id UUID from Supabase"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="kb-title">Document title</label>
        <input
          id="kb-title"
          name="documentTitle"
          type="text"
          required
          className="lead-form-input"
          placeholder="e.g. Price List, Delivery Policy"
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="kb-source-type">Source Type</label>
        <select
          id="kb-source-type"
          name="sourceType"
          required
          className="lead-form-input"
          value={sourceType}
          onChange={(event) => setSourceType(event.target.value as SourceType)}
        >
          {(Object.keys(SOURCE_TYPE_LABELS) as SourceType[]).map((type) => (
            <option key={type} value={type}>{SOURCE_TYPE_LABELS[type]}</option>
          ))}
        </select>
      </div>

      {sourceType === "paste" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="kb-content">Content</label>
          <textarea
            id="kb-content"
            name="content"
            className="lead-form-input"
            rows={6}
            placeholder="The raw text, prices, stock policy, FAQs, whatever the agent should know."
          />
        </div>
      )}

      {sourceType === "website" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="kb-page-url">Page URL</label>
          <input
            id="kb-page-url"
            name="pageUrl"
            type="url"
            className="lead-form-input"
            placeholder="https://example.com/pricing"
          />
        </div>
      )}

      {sourceType === "file" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="kb-file">File</label>
          <input
            id="kb-file"
            name="file"
            type="file"
            accept=".pdf,.docx"
            className="lead-form-input"
          />
        </div>
      )}

      {sourceType === "sheet" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="kb-sheet-url">Google Sheet URL</label>
          <input
            id="kb-sheet-url"
            name="googleSheetUrl"
            type="url"
            className="lead-form-input"
            placeholder="https://docs.google.com/spreadsheets/d/..."
          />
          <p className="lead-form-hint">
            The sheet must already be shared with Voxitron&apos;s Google service account.
          </p>
        </div>
      )}

      {sourceType === "delete" && (
        <p className="lead-form-hint">
          Removes this document title from this customer&apos;s knowledge base. No other fields needed.
        </p>
      )}

      {status === "error" && (
        <p className="lead-form-error" role="alert">{message}</p>
      )}

      {(status === "processing" || status === "success") && (
        <p className="lead-form-status" role="status">{message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={isBusy}>
        {status === "submitting" ? "Submitting..." : status === "processing" ? "Processing..." : "Ingest"}
      </button>
    </form>
  );
}
