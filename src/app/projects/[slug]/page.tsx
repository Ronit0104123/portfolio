import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, projects } from "@/lib/content";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TerminalFrame } from "@/components/TerminalFrame";
import { GithubIcon } from "@/components/icons";

// Only the slugs in content.ts exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.name} — ${profile.name}`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.description, type: "article" },
    twitter: { title, description: project.description },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Nav home={false} />
      <main id="top" className="mx-auto w-full max-w-3xl flex-1 px-5 py-14 sm:py-20">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 font-mono text-sm text-text-dim transition-colors hover:text-accent"
        >
          <ArrowLeft size={14} />
          cd ../projects
        </Link>

        <header className="mt-8">
          <p className="font-mono text-sm text-accent">{`// ${project.year}`}</p>
          <h1 className="mt-2 font-mono text-4xl font-bold tracking-tight text-text sm:text-5xl">
            {project.name}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-muted sm:text-lg">
            {project.description}
          </p>

          {(project.github || project.live) && (
            <div className="mt-7 flex flex-wrap gap-3 font-mono text-sm">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md bg-accent px-4 py-2.5 font-medium text-bg transition-transform hover:-translate-y-0.5"
                >
                  live site <ArrowUpRight size={15} />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-text transition-colors hover:border-border-hover hover:bg-bg-raised"
                >
                  <GithubIcon size={15} /> source
                </a>
              )}
            </div>
          )}
        </header>

        <TerminalFrame title={`~/projects/${project.slug}/README.md`} className="mt-12">
          <h2 className="font-mono text-sm text-text-dim">## highlights</h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm leading-relaxed text-text-muted sm:text-base">
                <span className="mt-0.5 shrink-0 font-mono text-accent">▹</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <h2 className="mt-8 font-mono text-sm text-text-dim">## stack</h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border px-2 py-0.5 font-mono text-xs text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </TerminalFrame>

        {projects.length > 1 && (
          <nav
            aria-label="More projects"
            className="mt-12 grid gap-3 font-mono text-sm sm:grid-cols-2"
          >
            <Link
              href={`/projects/${prev.slug}`}
              className="group rounded-lg border border-border p-4 transition-colors hover:border-border-hover hover:bg-bg-raised"
            >
              <span className="flex items-center gap-1.5 text-xs text-text-dim">
                <ArrowLeft size={12} /> prev
              </span>
              <span className="mt-1 block text-text group-hover:text-accent">{prev.name}</span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group rounded-lg border border-border p-4 text-right transition-colors hover:border-border-hover hover:bg-bg-raised"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs text-text-dim">
                next <ArrowRight size={12} />
              </span>
              <span className="mt-1 block text-text group-hover:text-accent">{next.name}</span>
            </Link>
          </nav>
        )}
      </main>
      <Footer />
    </>
  );
}
