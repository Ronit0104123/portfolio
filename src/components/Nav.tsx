"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-bg/85 backdrop-blur-md border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 font-mono text-sm">
        <a
          href="#top"
          className="flex items-center gap-1.5 text-text hover:text-accent transition-colors"
        >
          <span className="text-accent">~</span>
          <span className="text-text-dim">/</span>
          <span>{profile.handle}</span>
        </a>

        <ul className="hidden items-center gap-1 sm:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`rounded px-3 py-1.5 transition-colors ${
                  active === item.href
                    ? "text-accent bg-accent-soft"
                    : "text-text-muted hover:text-text hover:bg-white/[0.04]"
                }`}
              >
                ./{item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
            className="hidden items-center gap-1.5 rounded border border-border px-2 py-1 text-xs text-text-dim transition-colors hover:border-border-hover hover:text-text sm:flex"
            aria-label="Open command palette"
          >
            <span>search</span>
            <kbd className="rounded border border-border bg-bg px-1 text-[10px]">
              ⌘K
            </kbd>
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="sm:hidden text-text-muted hover:text-text"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "[x]" : "[menu]"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-border px-5 py-3 font-mono text-sm sm:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-text-muted hover:bg-white/[0.04] hover:text-text"
              >
                ./{item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("toggle-command-palette"));
              }}
              className="block w-full rounded px-3 py-2 text-left text-text-muted hover:bg-white/[0.04] hover:text-text"
            >
              ./search
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
