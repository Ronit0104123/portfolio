import { projects } from "@/lib/content";
import { Section } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="projects" index="02" title="Projects">
      <ol>
        {projects.map((project, i) => (
          <li key={project.slug} className="group border-b border-border py-8 first:pt-0">
            <Reveal delay={i * 0.05}>
              <ProjectCard project={project} index={i + 1} />
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
