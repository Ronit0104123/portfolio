"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { nav, profile, socials } from "@/lib/content";

type Item = {
  id: string;
  label: string;
  hint?: string;
  group: string;
  action: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  function openPalette() {
    setQuery("");
    setIndex(0);
    setOpen(true);
  }

  function closePalette() {
    setOpen(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      if ((e.metaKey || e.ctrlKey) && isK) {
        e.preventDefault();
        if (open) closePalette();
        else openPalette();
      } else if (e.key === "Escape") {
        closePalette();
      }
    }
    function onToggle() {
      if (open) closePalette();
      else openPalette();
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("toggle-command-palette", onToggle);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("toggle-command-palette", onToggle);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const raf = requestAnimationFrame(() => inputRef.current?.focus());
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: Item[] = useMemo(
    () => [
      ...nav.map((n) => ({
        id: `go-${n.label}`,
        label: `Go to ${n.label}`,
        hint: n.href,
        group: "Navigate",
        action: () =>
          document.querySelector(n.href)?.scrollIntoView({ behavior: "smooth" }),
      })),
      {
        id: "copy-email",
        label: "Copy email address",
        hint: socials.email,
        group: "Contact",
        action: () => navigator.clipboard.writeText(socials.email),
      },
      {
        id: "open-github",
        label: "Open GitHub profile",
        group: "Socials",
        action: () => window.open(socials.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "open-twitter",
        label: "Open Twitter / X profile",
        group: "Socials",
        action: () => window.open(socials.twitter, "_blank", "noopener,noreferrer"),
      },
      {
        id: "open-linkedin",
        label: "Open LinkedIn profile",
        group: "Socials",
        action: () => window.open(socials.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "view-source",
        label: "View source of this site",
        group: "Meta",
        action: () =>
          window.open(profile.sourceUrl, "_blank", "noopener,noreferrer"),
      },
      {
        id: "copy-link",
        label: "Copy link to this page",
        group: "Meta",
        action: () => navigator.clipboard.writeText(window.location.href),
      },
    ],
    []
  );

  const filtered = items.filter((i) =>
    `${i.label} ${i.group}`.toLowerCase().includes(query.toLowerCase())
  );

  function run(item: Item) {
    item.action();
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[index]) run(filtered[index]);
    }
  }

  if (!open) return null;

  const groups = filtered.reduce<Record<string, Item[]>>((acc, item) => {
    (acc[item.group] ??= []).push(item);
    return acc;
  }, {});

  let runningIndex = -1;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-lg border border-border bg-bg-raised shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <div className="flex items-center gap-2 border-b border-border px-4 py-3 font-mono text-sm">
          <span className="text-accent">$</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Type a command or search…"
            className="flex-1 bg-transparent text-text outline-none placeholder:text-text-dim"
          />
          <kbd className="rounded border border-border px-1.5 py-0.5 text-[10px] text-text-dim">
            esc
          </kbd>
        </div>
        <div className="max-h-80 overflow-y-auto py-2 font-mono text-sm">
          {filtered.length === 0 && (
            <p className="px-4 py-6 text-center text-text-dim">no matches</p>
          )}
          {Object.entries(groups).map(([group, groupItems]) => (
            <div key={group} className="mb-1">
              <p className="px-4 pb-1 pt-2 text-[11px] uppercase tracking-wider text-text-dim">
                {group}
              </p>
              {groupItems.map((item) => {
                runningIndex++;
                const active = runningIndex === index;
                const i = runningIndex;
                return (
                  <button
                    key={item.id}
                    onMouseEnter={() => setIndex(i)}
                    onClick={() => run(item)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left transition-colors ${
                      active ? "bg-accent-soft text-accent" : "text-text hover:bg-white/[0.03]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hint && (
                      <span className="text-xs text-text-dim">{item.hint}</span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
