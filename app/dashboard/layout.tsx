import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { getUserCustomers } from "@/lib/dashboard/activeCustomer";
import { VOXITRON_CUSTOMER_ID } from "@/lib/dashboard/voxitron";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const customers = await getUserCustomers(supabase, user.id);
  const isVoxitronTeam = customers.some((c) => c.id === VOXITRON_CUSTOMER_ID);

  return (
    <div className="dashboard-shell">
      <Sidebar customers={customers} isVoxitronTeam={isVoxitronTeam} />
      <main className="dashboard-main">{children}</main>
    </div>
  );
}
