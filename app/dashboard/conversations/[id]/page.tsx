import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers, resolveActiveCustomer } from "@/lib/dashboard/activeCustomer";
import ConversationThread from "@/components/dashboard/ConversationThread";

export const metadata: Metadata = { title: "Conversation | Voxitron" };

export default async function ConversationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ customer?: string }>;
}) {
  const { id } = await params;
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
  const customerQuery = customerParam ? `?customer=${customerParam}` : "";

  const { data: conversation } = await supabase
    .from("conversations")
    .select("id, contact_name, contact_phone, customer_id, whatsapp_number_id")
    .eq("id", id)
    .eq("customer_id", active.id)
    .maybeSingle();

  if (!conversation) {
    return (
      <div className="dashboard-page">
        <Link href={`/dashboard${customerQuery}`} className="dashboard-back-link">
          Back to conversations
        </Link>
        <div className="dashboard-empty-state">
          <p>This conversation doesn&apos;t exist, or isn&apos;t part of your account.</p>
        </div>
      </div>
    );
  }

  let numberLabel: string | null = null;
  if (conversation.whatsapp_number_id) {
    const { data: number } = await supabase
      .from("customer_whatsapp_numbers")
      .select("label, whatsapp_number")
      .eq("id", conversation.whatsapp_number_id)
      .maybeSingle();
    numberLabel = number?.label || number?.whatsapp_number || null;
  }

  const { data: messages } = await supabase
    .from("messages")
    .select("id, direction, body, sent_at")
    .eq("conversation_id", conversation.id)
    .order("sent_at", { ascending: true });

  return (
    <div className="dashboard-page">
      <Link href={`/dashboard${customerQuery}`} className="dashboard-back-link">
        Back to conversations
      </Link>

      <div className="dashboard-page-header">
        <h1 className="dashboard-page-title">
          {conversation.contact_name || conversation.contact_phone}
        </h1>
        {numberLabel && <span className="dashboard-page-subtitle">{numberLabel}</span>}
      </div>

      <ConversationThread messages={messages || []} />
    </div>
  );
}
