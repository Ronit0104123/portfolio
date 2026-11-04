import type { ReactNode } from "react";

// Editorial section: a small sticky label in the left column, content on the right.
export function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-16 px-5">
      <div className="grid gap-6 border-t border-border py-14 sm:py-20 md:grid-cols-[160px_1fr] md:gap-10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-dim md:sticky md:top-24">
            <span className="text-accent">{index}</span>
            <span className="mx-2">/</span>
            <span className="text-text-muted">{title}</span>
          </p>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
