"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FBFAF6",
          color: "#0B1F2A",
          fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "440px" }}>
          <p
            style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              color: "#5B6B72",
              marginBottom: "16px",
            }}
          >
            VOXITRON
          </p>
          <h1 style={{ fontSize: "2rem", fontWeight: 500, margin: "0 0 16px" }}>
            Something broke on our end.
          </h1>
          <p style={{ color: "#5B6B72", fontSize: "1rem", lineHeight: 1.5, margin: "0 0 32px" }}>
            Try again in a moment, or email us if it keeps happening.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                background: "#E8890C",
                color: "#FFFFFF",
                border: "none",
                borderRadius: "14px",
                padding: "12px 24px",
                fontSize: "0.9375rem",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                background: "transparent",
                color: "#0B1F2A",
                border: "1px solid #E7E3DA",
                borderRadius: "14px",
                padding: "12px 24px",
                fontSize: "0.9375rem",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
