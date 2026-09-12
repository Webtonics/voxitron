const STORAGE_KEY = "voxitron-dashboard-debug";

/**
 * Voxitron-team-only "show me the real error" switch. Off by default:
 * customer-facing screens always show the friendly one-line error. When on,
 * forms that talk to n8n/Supabase send X-Debug: 1 and render whatever the
 * server hands back (status, raw response body) instead of the friendly
 * copy. Stored in localStorage, never sent to a customer's browser as a
 * default-on setting, and never read server-side to change response shape
 * unless the request itself opted in via the header.
 */
export function isDebugModeEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function setDebugModeEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  } catch {
    // Best-effort only; a private window or blocked storage just keeps debug mode off.
  }
}
