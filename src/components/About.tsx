import { profile, education } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <SectionHeading index="01" title="about" />

      <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-4 text-[15px] leading-relaxed text-text-muted sm:text-base">
          {profile.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-lg border border-border bg-bg-raised/60 p-5 font-mono text-sm">
            <p className="mb-3 text-text-dim">education.json</p>
            <div className="space-y-4">
              {education.map((ed) => (
                <div key={ed.school} className="border-l-2 border-accent-soft pl-3">
                  <p className="text-text">{ed.school}</p>
                  <p className="text-text-muted">{ed.degree}</p>
                  <p className="text-text-dim">{ed.period}</p>
                  {ed.detail && (
                    <p className="mt-1 text-text-dim">{ed.detail}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
