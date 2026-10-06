"use client";

import { useState } from "react";
import { Mail, Check } from "lucide-react";

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
      className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5"
    >
      {copied ? <Check size={16} /> : <Mail size={16} />}
      {copied ? "copied to clipboard" : email}
    </button>
  );
}
