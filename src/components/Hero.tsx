"use client";

import { motion } from "framer-motion";
import { profile, socials, facts } from "@/lib/content";
import { TerminalFrame } from "./TerminalFrame";
import { InteractiveTerminal } from "./InteractiveTerminal";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const links = [
    { label: "Résumé", href: profile.resumeUrl, external: true },
    { label: "GitHub", href: socials.github, external: true },
    { label: "LinkedIn", href: socials.linkedin, external: true },
    { label: "Email", href: `mailto:${socials.email}`, external: false },
  ];

  return (
    <section id="top" className="mx-auto max-w-5xl px-5 pt-14 pb-16 sm:pt-24 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-dim">
          {profile.location}
          <span className="mx-2 text-border-hover">/</span>
          {profile.role}
        </p>

        <h1 className="mt-6 font-serif text-[clamp(3.5rem,14vw,7.5rem)] font-normal leading-[0.9] tracking-[-0.03em] text-text">
          Ronit <span className="italic text-accent">Jain</span>
        </h1>

        <p className="mt-8 max-w-2xl font-serif text-[clamp(1.3rem,2.6vw,1.75rem)] leading-snug text-text-muted">
          {profile.tagline}
        </p>

        <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="link text-text"
              >
                {link.label}
                {link.external && <span className="ml-0.5 text-text-dim">↗</span>}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease }}
        className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-6 md:grid-cols-4"
      >
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-dim">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-sm leading-snug text-text">{fact.value}</dd>
          </div>
        ))}
      </motion.dl>

      <motion.figure
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
        className="mt-14"
      >
        <TerminalFrame title={`${profile.handle}@portfolio ~ zsh`}>
          <InteractiveTerminal />
        </TerminalFrame>
        <figcaption className="mt-3 font-mono text-[11px] text-text-dim">
          A working terminal. Type a command, ask a question, or tap one below.
        </figcaption>
      </motion.figure>
    </section>
  );
}
