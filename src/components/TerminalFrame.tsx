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
      className={`overflow-hidden rounded-md border border-border bg-bg-raised ${className}`}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-2 font-mono text-[11px] text-text-dim">
        <span className="truncate">{title}</span>
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          live
        </span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
