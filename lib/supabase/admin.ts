import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client. Bypasses RLS, same as the Postgres
 * credential n8n's workflows use (see n8n/README.md). Server-only: never
 * import this from a Client Component or expose SUPABASE_SERVICE_ROLE_KEY
 * to the browser. Callers must do their own auth/authorization check
 * before using it, this client trusts every query it's given.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must both be set to use the admin client."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
