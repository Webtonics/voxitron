"use client";

export type UploadProgressStage = "uploading" | "submitting" | "processing" | "success";

const STAGE_LABEL: Record<UploadProgressStage, string> = {
  uploading: "Uploading file",
  submitting: "Starting ingest",
  processing: "Teaching the agent",
  success: "Added",
};

// Coarse checkpoints for a bar with no real byte-level progress source
// (Supabase's uploadToSignedUrl doesn't expose upload progress). Each
// stage jumps to its floor immediately so the bar always moves forward,
// never backward, as the flow advances.
const STAGE_FLOOR: Record<UploadProgressStage, number> = {
  uploading: 10,
  submitting: 55,
  processing: 65,
  success: 100,
};

export default function UploadProgress({
  stage,
  percent,
}: {
  stage: UploadProgressStage;
  percent: number;
}) {
  const displayPercent = Math.max(STAGE_FLOOR[stage], Math.min(percent, 100));
  const isIndeterminate = stage === "processing";

  return (
    <div className="upload-progress" role="status" aria-live="polite">
      <div className="upload-progress-header">
        <span className="upload-progress-label">
          {stage === "success" ? "Added. Your agent knows this now." : `${STAGE_LABEL[stage]}...`}
        </span>
        {!isIndeterminate && stage !== "success" && (
          <span className="upload-progress-percent">{Math.round(displayPercent)}%</span>
        )}
      </div>
      <div
        className={`upload-progress-track${isIndeterminate ? " is-indeterminate" : ""}`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={isIndeterminate ? undefined : Math.round(displayPercent)}
      >
        <div
          className={`upload-progress-fill${stage === "success" ? " is-complete" : ""}`}
          style={isIndeterminate ? undefined : { width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}
