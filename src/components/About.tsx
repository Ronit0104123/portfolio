import { profile, education } from "@/lib/content";
import { Section } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <Section id="about" index="01" title="About">
      <Reveal className="max-w-2xl space-y-5 font-serif text-[1.3rem] leading-relaxed text-text sm:text-[1.4rem]">
        {profile.bio.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
          Education
        </h3>
        <ul className="mt-3">
          {education.map((ed) => (
            <li
              key={ed.school}
              className="grid gap-x-6 gap-y-0.5 border-b border-border py-4 sm:grid-cols-[1fr_auto]"
            >
              <div>
                <p className="text-text">{ed.school}</p>
                {ed.degree && <p className="text-sm text-text-muted">{ed.degree}</p>}
                {ed.detail && <p className="text-sm text-text-dim">{ed.detail}</p>}
              </div>
              {ed.period && (
                <p className="font-mono text-xs text-text-dim sm:pt-1">{ed.period}</p>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
