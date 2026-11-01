import { experience } from "@/lib/content";
import { Section } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <Section id="experience" index="03" title="Experience">
      <ol>
        {experience.map((entry, i) => (
          <li key={entry.org + entry.period} className="border-b border-border py-8 first:pt-0">
            <Reveal delay={i * 0.05} className="grid gap-x-6 gap-y-2 sm:grid-cols-[150px_1fr]">
              <div className="font-mono text-xs leading-relaxed text-text-dim">
                <p>{entry.period}</p>
                {entry.location && <p>{entry.location}</p>}
              </div>

              <div>
                <h3 className="font-serif text-2xl leading-tight text-text">
                  {entry.org}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{entry.role}</p>

                <ul className="mt-4 max-w-2xl space-y-2.5">
                  {entry.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex gap-3 leading-relaxed text-text-muted">
                      <span className="select-none text-text-dim">–</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {entry.tags && entry.tags.length > 0 && (
                  <p className="mt-4 font-mono text-xs text-text-dim">
                    {entry.tags.join(" · ")}
                  </p>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
