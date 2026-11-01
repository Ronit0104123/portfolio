"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/content";
import { GithubIcon } from "./icons";

export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

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
      className={`glow-border group relative isolate flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-raised/40 p-5 transition-all hover:-translate-y-1 hover:border-transparent hover:bg-bg-raised hover:shadow-[0_20px_60px_-30px_var(--color-accent-2)] ${
        large ? "sm:p-6" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--color-accent-2-soft), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          className={`font-mono font-semibold text-text ${
            large ? "text-lg" : "text-base"
          }`}
        >
          {/* Stretched link: the whole card opens the project page, while the
              icon links below sit above it (relative z-10) and stay clickable. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {project.name}
          </Link>
        </h3>
        <div className="relative z-10 flex shrink-0 items-center gap-3 text-text-dim">
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
              className="rounded border border-accent-2/20 bg-accent-2-soft px-2 py-0.5 font-mono text-[11px] text-accent-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="font-mono text-[11px] text-text-dim transition-colors group-hover:text-accent">
          {project.year} · read more →
        </span>
      </div>
    </div>
  );
}
