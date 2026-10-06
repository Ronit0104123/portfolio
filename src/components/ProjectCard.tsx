"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { GithubIcon } from "./icons";

const statusMap: Record<string, { label: string; color: string }> = {
  active: { label: "active", color: "text-ok" },
  wip: { label: "in progress", color: "text-accent" },
  archived: { label: "archived", color: "text-text-dim" },
};

export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const status = project.status ? statusMap[project.status] : null;

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={`group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-raised/40 p-5 transition-all hover:-translate-y-1 hover:border-border-hover hover:bg-bg-raised ${
        large ? "sm:p-6" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--color-accent-soft), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mb-3 flex items-start justify-between gap-3">
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

      <p className="relative flex-1 text-sm leading-relaxed text-text-muted">
        {project.description}
      </p>

      <div className="relative mt-5 flex flex-wrap items-center justify-between gap-3">
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
