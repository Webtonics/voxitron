"use client";

import { useEffect, useRef } from "react";
import type { ElementType, ReactNode } from "react";

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  ...props
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  [key: string]: unknown;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);

    // Safety net: if a section is already in view before the observer
    // attaches (or the observer never fires for any reason), don't leave
    // it invisible.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add("is-visible");
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={`reveal ${className}`.trim()} {...props}>
      {children}
    </Tag>
  );
}
