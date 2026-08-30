import { redirect } from "next/navigation";

/**
 * The inbox is now a single-page split view (see Inbox.tsx): selecting a
 * conversation happens client-side inside /dashboard, it no longer
 * navigates to its own route. This page only exists so an old bookmark or
 * shared link to a specific conversation still lands somewhere useful,
 * it redirects into the inbox with ?open=<id> for Inbox to auto-select.
 */
export default async function ConversationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ customer?: string }>;
}) {
  const { id } = await params;
  const { customer: customerParam } = await searchParams;

  const query = new URLSearchParams();
  if (customerParam) query.set("customer", customerParam);
  query.set("open", id);

  redirect(`/dashboard?${query.toString()}`);
}
