"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import SourceTypeCards, { type SourceTypeOption } from "@/components/dashboard/SourceTypeCards";
import UploadProgress from "@/components/dashboard/UploadProgress";
import { isDebugModeEnabled } from "@/lib/dashboard/debugMode";

type Status = "idle" | "uploading" | "submitting" | "processing" | "error" | "success";
type SourceType = "paste" | "website" | "file" | "sheet";

const SOURCE_TYPE_OPTIONS: (SourceTypeOption & { value: SourceType })[] = [
  { value: "paste", label: "Paste text", hint: "Type or paste it in" },
  { value: "website", label: "Website page", hint: "Pull from a live URL" },
  { value: "file", label: "File, PDF or Word", hint: "Upload a document" },
  { value: "sheet", label: "Google Sheet", hint: "Sync a shared sheet" },
];

const POLL_INTERVAL_MS = 2000;
const MAX_POLL_ATTEMPTS = 60; // 60 * 2s = 2 minutes: generous for a large file/website fetch, but don't poll forever

export default function KnowledgeBaseForm({ customerId }: { customerId: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [messageDebug, setMessageDebug] = useState<unknown>(null);
  const [sourceType, setSourceType] = useState<SourceType>("paste");
  const [uploadPercent, setUploadPercent] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const pollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uploadTickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollTimeoutRef.current) clearTimeout(pollTimeoutRef.current);
      if (uploadTickRef.current) clearInterval(uploadTickRef.current);
    };
  }, []);

  // Supabase's uploadToSignedUrl() doesn't expose byte-level progress, so
  // this simulates a steadily-advancing bar while the PUT is in flight:
  // quick at first, slowing as it approaches 90% so it never claims
  // "done" before the request actually resolves. stopUploadTick snaps to
  // 100% once the real request completes.
  function startUploadTick() {
    setUploadPercent(8);
    uploadTickRef.current = setInterval(() => {
      setUploadPercent((current) => {
        if (current >= 90) return current;
        const step = current < 50 ? 6 : current < 75 ? 3 : 1;
        return Math.min(current + step, 90);
      });
    }, 250);
  }

  function stopUploadTick(finalPercent: number) {
    if (uploadTickRef.current) {
      clearInterval(uploadTickRef.current);
      uploadTickRef.current = null;
    }
    setUploadPercent(finalPercent);
  }

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

  async function submitIngest(
    body: FormData | Record<string, string>,
    debugMode: boolean
  ): Promise<{ ok: true } | { ok: false }> {
    // Force any pending token refresh to finish and its cookie to be
    // written before this request goes out. The file flow can spend
    // several seconds uploading between the /api/kb-upload-url call and
    // this one, long enough for the browser Supabase client's background
    // refresh to fire; without waiting for it here, this fetch can race
    // that refresh and go out with a cookie the server no longer accepts,
    // which is what was producing the 401 on this call specifically (the
    // upload-url call, made right at submit, wasn't racing anything).
    await createClient().auth.getSession();

    let response: Response;
    try {
      response = await fetch("/api/knowledge-base", {
        method: "POST",
        credentials: "same-origin",
        body: body instanceof FormData ? body : JSON.stringify(body),
        headers: {
          ...(body instanceof FormData ? {} : { "Content-Type": "application/json" }),
          ...(debugMode ? { "X-Debug": "1" } : {}),
        },
      });
    } catch {
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return { ok: false };
    }

    let data: { jobId?: string; error?: string; debug?: unknown };
    try {
      data = await response.json();
    } catch {
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return { ok: false };
    }

    if (!response.ok || !data.jobId) {
      setStatus("error");
      setMessage(data.error || "That didn't go through. Check the content and try again.");
      if (debugMode && data.debug) setMessageDebug(data.debug);
      return { ok: false };
    }

    setStatus("processing");
    setMessage("Teaching the agent...");
    pollJob(data.jobId, 1);
    return { ok: true };
  }

  async function handleFileSubmit(event: FormEvent<HTMLFormElement>, debugMode: boolean) {
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    const documentTitle = String(new FormData(form).get("documentTitle") || "");

    if (!file) {
      setStatus("error");
      setMessage("Choose a file to upload.");
      return;
    }

    setStatus("uploading");
    setMessage("Uploading file...");
    startUploadTick();

    let uploadUrlResponse: Response;
    try {
      uploadUrlResponse = await fetch("/api/kb-upload-url", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerId,
          filename: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });
    } catch {
      stopUploadTick(0);
      setStatus("error");
      setMessage("Couldn't reach the server. Try again in a moment.");
      return;
    }

    let uploadUrlData: { path?: string; token?: string; signedUrl?: string; error?: string };
    try {
      uploadUrlData = await uploadUrlResponse.json();
    } catch {
      stopUploadTick(0);
      setStatus("error");
      setMessage("Unexpected response from the server.");
      return;
    }

    if (!uploadUrlResponse.ok || !uploadUrlData.path || !uploadUrlData.token) {
      stopUploadTick(0);
      setStatus("error");
      setMessage(uploadUrlData.error || "Upload failed. Couldn't prepare the file for upload.");
      return;
    }

    const supabase = createClient();
    const { error: uploadError } = await supabase.storage
      .from("kb-uploads")
      .uploadToSignedUrl(uploadUrlData.path, uploadUrlData.token, file);

    if (uploadError) {
      stopUploadTick(0);
      setStatus("error");
      setMessage("Upload failed. Try again.");
      return;
    }

    stopUploadTick(100);
    setStatus("submitting");
    setMessage("Uploaded. Starting ingest...");

    await submitIngest(
      {
        customerId,
        documentTitle,
        sourceType: "file",
        storagePath: uploadUrlData.path,
      },
      debugMode
    );
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");
    setMessageDebug(null);

    const debugMode = isDebugModeEnabled();

    if (sourceType === "file") {
      await handleFileSubmit(event, debugMode);
      return;
    }

    const formData = new FormData(event.currentTarget);
    formData.set("customerId", customerId);
    await submitIngest(formData, debugMode);
  }

  const isBusy = status === "uploading" || status === "submitting" || status === "processing";

  return (
    <form className="lead-form" onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="lead-form-row">
        <label className="lead-form-label">Where it comes from</label>
        <SourceTypeCards
          name="sourceType"
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

      {sourceType === "file" &&
        (status === "uploading" || status === "submitting" || status === "processing" || status === "success") && (
          <UploadProgress stage={status} percent={uploadPercent} />
        )}

      {sourceType !== "file" && (status === "processing" || status === "success") && (
        <p className="lead-form-status" role="status">{message}</p>
      )}

      <button type="submit" className="btn btn-primary" disabled={isBusy}>
        {status === "uploading"
          ? "Uploading..."
          : status === "submitting"
            ? "Submitting..."
            : status === "processing"
              ? "Teaching the agent..."
              : "Teach the agent"}
      </button>
    </form>
  );
}
