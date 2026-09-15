import { createAdminClient } from "@/lib/supabase/admin";
import { hashTakeoverToken } from "@/lib/dashboard/takeoverTokens";

export type TakeoverValidation =
  | { ok: true; conversationId: string; tokenId: string }
  | { ok: false; reason: "not_found" | "expired" | "revoked" };

// Shared by the /takeover/[token] page (read) and its reply API route
// (write): both need the same "is this still a live, valid token" check.
// Does NOT mark the token used -- a token is reusable for the length of
// its TTL, since an owner may reply more than once in the same
// conversation. Revoking happens explicitly via "Give back to agent".
export async function validateTakeoverToken(token: string): Promise<TakeoverValidation> {
  const admin = createAdminClient();
  const tokenHash = hashTakeoverToken(token);

  const { data, error } = await admin
    .from("conversation_takeover_tokens")
    .select("id, conversation_id, expires_at, revoked_at")
    .eq("token_hash", tokenHash)
    .single();

  if (error || !data) {
    return { ok: false, reason: "not_found" };
  }

  if (data.revoked_at) {
    return { ok: false, reason: "revoked" };
  }

  if (new Date(data.expires_at).getTime() < Date.now()) {
    return { ok: false, reason: "expired" };
  }

  return { ok: true, conversationId: data.conversation_id, tokenId: data.id };
}
