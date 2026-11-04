import { createAdminClient } from "@/lib/supabase/admin";
import { decryptSecret } from "@/lib/blocks/secrets";
import { BlockError, type BlockId, type Connection } from "@/lib/blocks/types";

export type ToolRow = {
  id: string;
  customer_id: string;
  block: BlockId;
  tool_name: string;
  config: Record<string, string>;
  credentials: { secret?: string };
  status: "connected" | "error" | "disconnected";
  last_error: string | null;
  last_checked_at: string | null;
};

export const TOOL_COLUMNS = "id, customer_id, block, tool_name, config, credentials, status, last_error, last_checked_at";

export function connectionFrom(row: Pick<ToolRow, "config" | "credentials">): Connection {
  return {
    config: row.config,
    secret: row.credentials.secret ? decryptSecret(row.credentials.secret) : null,
  };
}

/** Logs instead of throwing: the outcome being reported has already happened, and this mustn't change it. */
export async function recordHealth(toolId: string, problem: string | null): Promise<void> {
  const now = new Date().toISOString();
  const { error } = await createAdminClient()
    .from("customer_tools")
    .update({ status: problem ? "error" : "connected", last_error: problem, last_checked_at: now, updated_at: now })
    .eq("id", toolId);

  if (error) console.error("Failed to record a tool connection's health:", error);
}

/** What to store and show for a failed call: the provider's own message if it's a known problem. */
export function problemMessage(error: unknown): string {
  if (error instanceof BlockError) return error.message;
  console.error("Unexpected error in a tool connection:", error);
  return "Something unexpected went wrong with this connection.";
}
