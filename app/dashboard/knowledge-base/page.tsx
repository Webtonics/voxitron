import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import KnowledgeBaseForm from "@/components/KnowledgeBaseForm";
import DocumentList, { type DocumentRow } from "@/components/dashboard/DocumentList";
import EmptyState from "@/components/dashboard/EmptyState";

export const metadata: Metadata = { title: "Knowledge Base | Voxitron" };

type KbJob = {
  id: string;
  document_title: string;
  operation: "ingest" | "delete";
  status: "processing" | "success" | "failed";
  chunk_count: number | null;
  error_message: string | null;
  created_at: string;
};

export default async function KnowledgeBasePage({
  searchParams,
}: {
  searchParams: Promise<{ customer?: string }>;
}) {
  const { customer: customerParam } = await searchParams;
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const customers = await getUserCustomers(supabase, user.id);
  const active = resolveActiveCustomer(customers, customerParam);

  const { data: jobs } = await supabase
    .from("kb_ingest_jobs")
    .select("id, document_title, operation, status, chunk_count, error_message, created_at")
    .eq("customer_id", active.id)
    .order("created_at", { ascending: false })
    .limit(100)
    .returns<KbJob[]>();

  // A title is currently in the knowledge base if its most recent
  // successful job was an ingest, not a delete. Derived from the job log
  // itself, there's no separate documents table to read from (the real
  // content lives in n8n's Qdrant, outside this app's reach). Only looks
  // at the last 100 jobs, so a title untouched since before that window
  // won't appear in the delete list, an edge case worth revisiting if a
  // customer's KB grows to that much churn.
  const latestJobByTitle = new Map<string, KbJob>();
  for (const job of jobs || []) {
    if (job.status !== "success") continue;
    if (!latestJobByTitle.has(job.document_title)) {
      latestJobByTitle.set(job.document_title, job);
    }
  }

  const documents: DocumentRow[] = Array.from(latestJobByTitle.values())
    .filter((job) => job.operation === "ingest")
    .map((job) => ({
      title: job.document_title,
      chunkCount: job.chunk_count,
      updatedAt: job.created_at,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  const totalChunks = documents.reduce((sum, d) => sum + (d.chunkCount || 0), 0);
  const recentJobs = (jobs || []).slice(0, 20);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="dashboard-page-title">Knowledge base</h1>
          <p className="dashboard-page-subtitle">
            What your agent knows. It answers from this, so it never guesses.
          </p>
        </div>
      </div>

      <div className="dashboard-kb-layout">
        <div className="dashboard-card">
          {documents.length === 0 ? (
            <div className="dashboard-card-body">
              <EmptyState
                icon={
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                    <path d="M5 4h11l3 3v13H5z" />
                    <path d="M9 9h6M9 13h6" />
                  </svg>
                }
                title="Nothing here yet"
                body="Your agent has nothing to read yet. Add your prices or FAQs so it can answer instead of guessing."
              />
            </div>
          ) : (
            <>
              <div className="dashboard-card-header">
                <span className="dashboard-card-header-title">{documents.length} document{documents.length === 1 ? "" : "s"} loaded</span>
                <span className="dashboard-card-header-meta">{totalChunks} chunks</span>
              </div>
              <div className="dashboard-card-body">
                <DocumentList documents={documents} customerId={active.id} />
              </div>
            </>
          )}

          {recentJobs.length > 0 && (
            <div className="dashboard-card-body dashboard-kb-recent">
              <span className="dashboard-settings-section-title">Recent updates</span>
              <ul className="dashboard-lead-list">
                {recentJobs.map((job) => (
                  <li key={job.id} className="dashboard-lead-row">
                    <div className="dashboard-lead-row-main">
                      <span className="dashboard-lead-row-name">{job.document_title}</span>
                      <span className={`dashboard-kb-status dashboard-kb-status-${job.status}`}>
                        {job.status === "processing" ? "Processing" : job.status === "success" ? "Done" : "Failed"}
                      </span>
                    </div>
                    <div className="dashboard-lead-row-details">
                      <span>{job.operation === "delete" ? "Removed" : "Added or updated"}</span>
                      {job.status === "success" && job.chunk_count != null && (
                        <span>{job.chunk_count} chunk{job.chunk_count === 1 ? "" : "s"}</span>
                      )}
                      {job.status === "failed" && job.error_message && <span>{job.error_message}</span>}
                      <span>{new Date(job.created_at).toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="dashboard-card dashboard-card-body">
          <span className="dashboard-settings-section-title">Add knowledge</span>
          <p className="lead-form-hint" style={{ marginBottom: "var(--space-5)" }}>
            Prices, policies, FAQs, anything the agent should know.
          </p>
          <KnowledgeBaseForm customerId={active.id} />
        </div>
      </div>
    </div>
  );
}
