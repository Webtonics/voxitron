"use client";

import { useState } from "react";

export default function EmbedSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setFailed(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API blocked (e.g. insecure context): the code is still
      // selectable in the block below, so say so instead of failing silently.
      setFailed(true);
    }
  }

  return (
    <div className="wa-btn-snippet">
      <pre className="wa-btn-snippet-code"><code>{code}</code></pre>
      <div className="wa-btn-snippet-actions">
        <button type="button" className="btn btn-secondary wa-btn-snippet-copy" onClick={handleCopy}>
          {copied ? "Copied" : "Copy code"}
        </button>
        {failed && (
          <span className="lead-form-hint" role="status">Couldn&apos;t copy automatically. Select the code and copy it.</span>
        )}
      </div>
    </div>
  );
}
