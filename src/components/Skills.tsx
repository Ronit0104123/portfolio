import { skills } from "@/lib/content";
import { Section } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <Reveal>
        <dl>
          {skills.map((group) => (
            <div
              key={group.category}
              className="grid gap-x-6 gap-y-1 border-b border-border py-4 first:pt-0 grid-cols-1 sm:grid-cols-[140px_1fr]"
            >
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-text-dim sm:pt-0.5">
                {group.category}
              </dt>
              <dd className="flex min-w-0 flex-wrap gap-y-1 text-text">
                {group.items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < group.items.length - 1 && (
                      <span className="mx-2 text-text-dim">/</span>
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
