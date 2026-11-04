"use client";

import { useEffect, useState } from "react";
import { nav, profile } from "@/lib/content";

export function Nav() {
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      // Nothing is "current" while the hero is on screen.
      if (window.scrollY < 300) setActive("");
    };
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
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 text-sm">
        <a
          href="#top"
          className="font-serif text-xl text-text transition-colors hover:text-accent"
        >
          {profile.name}
        </a>

        <ul className="hidden items-center gap-6 sm:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`capitalize transition-colors ${
                  active === item.href
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
            className="hidden font-mono text-xs text-text-dim transition-colors hover:text-text sm:block"
            aria-label="Open command palette"
          >
            ⌘K
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-text-muted hover:text-text sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="flex flex-col border-t border-border px-5 py-2 sm:hidden">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-serif text-2xl capitalize text-text-muted hover:text-text"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event("toggle-command-palette"));
              }}
              className="block w-full py-2.5 text-left font-serif text-2xl text-text-muted hover:text-text"
            >
              Search
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
