import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { GithubIcon } from "./icons";

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "active", color: "text-ok" },
  wip: { label: "in progress", color: "text-accent" },
  archived: { label: "archived", color: "text-text-dim" },
};

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
      <SectionHeading index="03" title="projects" />

      <div className="grid gap-5 sm:grid-cols-2">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <ProjectCard project={project} large />
          </Reveal>
        ))}
      </div>

      {rest.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}

function ProjectCard({
  project,
  large = false,
}: {
  project: (typeof projects)[number];
  large?: boolean;
}) {
  const status = project.status ? statusMap[project.status] : null;

  return (
    <div
      className={`group flex h-full flex-col rounded-lg border border-border bg-bg-raised/40 p-5 transition-all hover:-translate-y-1 hover:border-border-hover hover:bg-bg-raised ${
        large ? "sm:p-6" : ""
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          className={`font-mono font-semibold text-text ${
            large ? "text-lg" : "text-base"
          }`}
        >
          {project.name}
        </h3>
        <div className="flex shrink-0 items-center gap-3 text-text-dim">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              className="transition-colors hover:text-accent"
            >
              <GithubIcon size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="transition-colors hover:text-accent"
            >
              <ArrowUpRight size={18} />
            </a>
          )}
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-text-muted">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-text-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-dim">
          {status && <span className={status.color}>● {status.label}</span>}
          <span>{project.year}</span>
        </div>
      </div>
    </div>
  );
}
