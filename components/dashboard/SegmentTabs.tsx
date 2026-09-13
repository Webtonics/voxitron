"use client";

import { useTransition } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export type Segment = "needs-you" | "active" | "leads" | "all" | "closed";

const LABELS: Record<Segment, string> = {
  "needs-you": "Needs you",
  active: "Active",
  leads: "Leads",
  all: "All",
  closed: "Closed",
};

export default function SegmentTabs({
  segment,
  counts,
  onPendingChange,
}: {
  segment: Segment;
  counts: Record<Segment, number>;
  onPendingChange?: (pending: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  function goTo(next: Segment) {
    if (next === segment) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("seg", next);
    params.delete("open");
    onPendingChange?.(true);
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div
      className={`dashboard-segment-tabs${isPending ? " is-pending" : ""}`}
      role="tablist"
      aria-label="Inbox segments"
      aria-busy={isPending}
    >
      {(Object.keys(LABELS) as Segment[]).map((key) => (
        <button
          key={key}
          type="button"
          role="tab"
          aria-selected={segment === key}
          disabled={isPending}
          className={`dashboard-segment-tab${segment === key ? " is-active" : ""}${key === "needs-you" ? " is-alert" : ""}`}
          onClick={() => goTo(key)}
        >
          {LABELS[key]}
          <span className="dashboard-segment-tab-count">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
