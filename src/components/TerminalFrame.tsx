import type { ReactNode } from "react";

export function TerminalFrame({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-bg-raised/70 backdrop-blur-sm shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_20px_60px_-20px_rgba(0,0,0,0.6)] overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-border bg-white/[0.02] px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 font-mono text-xs text-text-dim truncate">
          {title}
        </span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
