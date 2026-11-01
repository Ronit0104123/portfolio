import { experience } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <SectionHeading index="04" title="experience" />

      <div className="relative space-y-8 pl-6 sm:pl-8">
        <span
          className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-accent via-accent-2 to-transparent opacity-60"
          aria-hidden="true"
        />
        {experience.map((entry, i) => (
          <Reveal key={entry.org + entry.period} delay={i * 0.08}>
            <div className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent shadow-[0_0_12px_var(--color-accent)] sm:-left-[37px]" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="font-mono text-base font-semibold text-text">
                  {entry.role} <span className="text-text-dim">@</span>{" "}
                  <span className="text-accent">{entry.org}</span>
                </h3>
                <span className="font-mono text-xs text-text-dim">
                  {entry.period}
                </span>
              </div>
              {entry.location && (
                <p className="mt-0.5 font-mono text-xs text-text-dim">
                  {entry.location}
                </p>
              )}
              <ul className="mt-3 space-y-1.5">
                {entry.bullets.map((bullet, bi) => (
                  <li
                    key={bi}
                    className="flex gap-2 text-sm leading-relaxed text-text-muted"
                  >
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-text-dim" />
                    {bullet}
                  </li>
                ))}
              </ul>
              {entry.tags && entry.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
