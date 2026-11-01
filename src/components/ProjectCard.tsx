import type { Project } from "@/lib/content";

// One row of the project index: number, name and pitch, stack, and links.
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="grid gap-x-6 gap-y-3 sm:grid-cols-[48px_1fr]">
      <span className="font-mono text-xs text-text-dim sm:pt-3">
        {String(index).padStart(2, "0")}
      </span>

      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
          <h3 className="font-serif text-3xl leading-tight text-text transition-colors group-hover:text-accent sm:text-4xl">
            {project.name}
          </h3>
          <span className="font-mono text-xs text-text-dim">{project.year}</span>
        </div>

        <p className="mt-3 max-w-2xl leading-relaxed text-text-muted">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <p className="font-mono text-xs text-text-dim">{project.tags.join(" · ")}</p>
          <div className="flex gap-5 text-sm">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-text"
              >
                Visit<span className="ml-0.5 text-text-dim">↗</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link text-text"
              >
                Code<span className="ml-0.5 text-text-dim">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
