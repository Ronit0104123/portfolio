"use client";

import { useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      onClick={handleClick}
      className="font-mono text-xs uppercase tracking-[0.14em] text-text-dim transition-colors hover:text-accent"
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}
