"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import Select from "@/components/dashboard/Select";
import { isDebugModeEnabled } from "@/lib/dashboard/debugMode";

type Status = "idle" | "submitting" | "processing" | "error" | "success";
type SourceType = "paste" | "website" | "file" | "sheet";

const SOURCE_TYPE_LABELS: Record<SourceType, string> = {
  paste: "Paste text",
  website: "Website page",
  file: "File, PDF or Word",
  sheet: "Google Sheet",
};

const SOURCE_TYPE_OPTIONS = (Object.keys(SOURCE_TYPE_LABELS) as SourceType[]).map((value) => ({
  value,
  label: SOURCE_TYPE_LABELS[value],
}));

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 60 * 2s = 2 minutes: generous for a large file/website fetch, but don't poll forever

export default function KnowledgeBaseForm({ customerId }: { customerId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [messageDebug, setMessageDebug] = useState<unknown>(null);
  const [sourceType, setSourceType] = useState<SourceType>("paste");
  const formRef = useRef<HTMLFormElement>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
    };
  }, []);

  async function pollJob(jobId: string, attempt: number) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("kb_ingest_jobs")
      .select("status, chunk_count, error_message")
      .eq("id", jobId)
      .single();

    if (error) {
      setStatus("error");
      setMessage("Lost track of the job. Check the Knowledge Base later to confirm whether it finished.");
      return;
    }

    if (data.status === "success") {
      setStatus("success");
      setMessage("Added. Your agent knows this now.");
      formRef.current?.reset();
      setSourceType("paste");
      return;
    }

    if (data.status === "failed") {
      setStatus("error");
      setMessage(data.error_message || "That didn't go through. Check the content and try again.");
      return;
    }

    if (attempt >= MAX_POLL_ATTEMPTS) {
      setStatus("error");
      setMessage("Still processing after 2 minutes. Check the Knowledge Base later, this may still complete.");
      return;
    }

    pollTimeoutRef.current = setTimeout(() => pollJob(jobId, attempt + 1), POLL_INTERVAL_MS);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setMessageDebug(null);

    const formData = new FormData(event.currentTarget);
    formData.set("customerId", customerId);
    const debugMode = isDebugModeEnabled();

    let response: Response;
    try {
      response = await fetch("/api/knowledge-base", {
        method: "POST",
        body: formData,
        headers: debugMode ? { "X-Debug": "1" } : undefined,
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    let data: { jobId?: string; error?: string; debug?: unknown };
    try {
      data = await response.json();
    } catch {
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return;
    }

    if (!response.ok || !data.jobId) {
      setStatus("error");
      setMessage(data.error || "That didn't go through. Check the content and try again.");
      if (debugMode && data.debug) setMessageDebug(data.debug);
      return;
    }

    setStatus("processing");
    setMessage("Teaching the agent...");
    pollJob(data.jobId, 1);
  }

  const isBusy = status === "submitting" || status === "processing";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="kb-source-type">Where it comes from</label>
        <Select
          name="sourceType"
          ariaLabel="Where it comes from"
          options={SOURCE_TYPE_OPTIONS}
          value={sourceType}
          onChange={(value) => setSourceType(value as SourceType)}
        />
      </div>

      <div className="lead-form-row">
        <label className="lead-form-label" htmlFor="kb-title">
          Title <span className="lead-form-hint">so you can find it later</span>
        </label>
        <input
          id="kb-title"
          name="documentTitle"
          type="text"
          required
          className="lead-form-input"
          placeholder="e.g. Scan price list"
        />
      </div>

      {sourceType === "paste" && (
        <div className="lead-form-row">
          <label className="lead-form-label" htmlFor="kb-content">Content</label>
          <textarea
            id="kb-content"
            name="content"
            className="lead-form-input"
            rows={6}
            placeholder="Paste the raw text: prices, hours, booking rules, common questions."
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

      {status === "error" && (
        <div>
          <p className="lead-form-error" role="alert">{message}</p>
          {messageDebug !== null && (
            <pre className="dashboard-debug-panel">{JSON.stringify(messageDebug, null, 2)}</pre>
          )}
        </div>
      )}

      {(status === "processing" || status === "success") && (
        <p className="lead-form-status" role="status">{message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={isBusy}>
        {status === "submitting" ? "Submitting..." : status === "processing" ? "Teaching the agent..." : "Teach the agent"}
      </button>
    </form>
  );
}
