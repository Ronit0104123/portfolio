"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/content";
import { TerminalFrame } from "./TerminalFrame";
import { InteractiveTerminal } from "./InteractiveTerminal";

export function Hero() {
  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-5xl flex-col gap-10 px-5 pt-16 pb-20 sm:pt-24 lg:flex-row lg:items-center lg:gap-8 lg:pt-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[540px] bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1"
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-bg-raised px-3 py-1 font-mono text-xs text-text-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-ok" />
          {profile.availability}
        </div>

        <h1 className="font-mono text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-xl text-text-muted sm:text-2xl">
          {profile.role}
          <span className="text-text-dim"> · {profile.location}</span>
        </p>
        <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">
          {profile.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-sm">
          <a
            href="#projects"
            className="rounded-md bg-accent px-4 py-2.5 font-medium text-bg transition-transform hover:-translate-y-0.5"
          >
            view projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-border px-4 py-2.5 text-text transition-colors hover:border-border-hover hover:bg-bg-raised"
          >
            get in touch
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:max-w-md"
      >
        <TerminalFrame title={`${profile.handle}@portfolio — zsh`}>
          <InteractiveTerminal />
        </TerminalFrame>
      </motion.div>
    </section>
  );
}
