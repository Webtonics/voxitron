"use client";

import { useRouter } from "next/navigation";

// Uses ?for= rather than the dashboard's usual ?customer=, which the sidebar
// reads and only understands for customers the logged-in user is a member of.
export default function BuildCustomerPicker({
  customers,
  activeId,
}: {
  customers: { id: string; business_name: string }[];
  activeId: string;
}) {
  const router = useRouter();

  return (
    <div className="lead-form-row">
      <label className="lead-form-label" htmlFor="build-customer">Building for</label>
      <select
        id="build-customer"
        className="lead-form-input"
        value={activeId}
        onChange={(event) => router.push(`/dashboard/build?for=${event.target.value}`)}
      >
        {customers.map((customer) => (
          <option key={customer.id} value={customer.id}>{customer.business_name}</option>
        ))}
      </select>
    </div>
  );
}
