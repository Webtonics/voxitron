"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

/**
 * Keyed by initialQuery from the parent (see Inbox.tsx) so a query change
 * that originates elsewhere (segment switch clearing `q`, browser back/
 * forward) remounts this component with the right starting value, instead
 * of syncing local state to a prop via an effect.
 */
export default function InboxSearch({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(initialQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(next: string) {
    setValue(next);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (next.trim()) {
        params.set("q", next.trim());
      } else {
        params.delete("q");
      }
      params.delete("open");
      router.push(`${pathname}?${params.toString()}`);
    }, 300);
  }

  return (
    <div className="dashboard-inbox-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4-4" />
      </svg>
      <input
        type="search"
        placeholder="Search name, number, or message"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        aria-label="Search conversations"
      />
    </div>
  );
}
