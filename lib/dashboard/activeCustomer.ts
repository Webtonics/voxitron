import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

export type CustomerRow = { id: string; business_name: string; industry: string | null };

/**
 * Every customer the logged-in user has dashboard access to, via
 * customer_members. Redirects to /login if there are none (shouldn't
 * happen if middleware.ts and layout.tsx's own check already ran, but a
 * page should never assume that without checking itself).
 */
export async function getUserCustomers(
  supabase: SupabaseClient,
  userId: string
): Promise<CustomerRow[]> {
  const { data: memberships } = await supabase
    .from("customer_members")
    .select("customer_id, customers(id, business_name, industry)")
    .eq("auth_user_id", userId)
    .returns<{ customer_id: string; customers: CustomerRow | CustomerRow[] | null }[]>();

  const customers: CustomerRow[] = (memberships || []).flatMap((m) => {
    if (!m.customers) return [];
    return Array.isArray(m.customers) ? m.customers : [m.customers];
  });

  if (customers.length === 0) {
    redirect("/login");
  }

  return customers;
}

/**
 * Which customer the current dashboard request is scoped to: the
 * `?customer=` search param if the logged-in user actually belongs to that
 * customer, otherwise their first membership. Never trusts the param
 * blindly, even though RLS would ultimately block a cross-tenant read too.
 */
export function resolveActiveCustomer(
  customers: CustomerRow[],
  requestedCustomerId: string | undefined
): CustomerRow {
  const requested = requestedCustomerId
    ? customers.find((c) => c.id === requestedCustomerId)
    : undefined;

  return requested || customers[0];
}
