"use client";

import { useEffect, useRef, useState } from "react";
import {
  profile,
  socials,
  nav,
  skills,
  projects,
  experience,
} from "@/lib/content";

type Line = { kind: "input" | "output" | "hint"; text: string };

const BOOT_LINES = [
  { cmd: "whoami", out: `${profile.handle} — ${profile.role}` },
  { cmd: "cat status.txt", out: profile.availability },
];

const BOOT_HINT = 'type "help", ask a question, or tap a command below';

// One-tap commands shown under the terminal for visitors who won't type.
const QUICK_COMMANDS = ["about", "projects", "skills", "experience", "resume", "contact"];

// Plain-English questions ("what have you built?") map to a command by keyword.
const KEYWORDS: [RegExp, string][] = [
  [/resume|cv/, "resume"],
  [/skill|stack|tech|tools|languages/, "skills"],
  [/project|built|build|made|portfolio/, "projects"],
  [/experience|job|work|career|company|intern/, "experience"],
  [/social|github|linkedin|twitter|\bx\b/, "socials"],
  [/contact|email|mail|hire|reach|talk|call/, "contact"],
  [/about|who|yourself|you do|intro/, "about"],
];

function buildHelp() {
  return [
    "commands:",
    "  about, projects, skills, experience  — read about me",
    "  resume, contact, socials             — get in touch",
    "  ls, cd <section>                     — jump around the page",
    "  clear, help",
    'or just ask in plain English, e.g. "what have you built?"',
  ];
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const cancelledRef = { current: false };

    if (reduceMotion) {
      const timer = setTimeout(() => {
        if (cancelledRef.current) return;
        const instant: Line[] = BOOT_LINES.flatMap((b) => [
          { kind: "input" as const, text: b.cmd },
          { kind: "output" as const, text: b.out },
        ]);
        setLines([...instant, { kind: "hint", text: BOOT_HINT }]);
        setBooted(true);
      }, 0);
      return () => {
        cancelledRef.current = true;
        clearTimeout(timer);
      };
    }

    async function play() {
      // Start clean: a cancelled earlier run (React dev double-mount) may have left a line.
      setLines([]);
      for (const b of BOOT_LINES) {
        await typeInto(b.cmd, cancelledRef, setLines);
        if (cancelledRef.current) return;
        await wait(180);
        setLines((prev) => [...prev, { kind: "output", text: b.out }]);
        await wait(320);
      }
      if (cancelledRef.current) return;
      setLines((prev) => [...prev, { kind: "hint", text: BOOT_HINT }]);
      setBooted(true);
    }
    play();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  // Scroll only the terminal itself, so it never yanks the page away from a section `cd` jumped to.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function run(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setLines((prev) => [...prev, { kind: "input", text: trimmed }]);
    setHistory((prev) => [...prev, trimmed]);
    setHistIndex(null);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");
    const push = (text: string) =>
      setLines((prev) => [...prev, { kind: "output", text }]);

    const jumpTo = (section: string) => {
      const name = section.toLowerCase().replace(/^\.?\/+|\/+$/g, "");
      if (["", "~", "..", "/"].includes(name)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        push("back to the top");
        return;
      }
      const target = nav.find((n) => n.label === name);
      if (target) {
        document.querySelector(target.href)?.scrollIntoView({
          behavior: "smooth",
        });
        push(`jumping to ./${target.label}`);
      } else {
        push(`no section named "${section}" — try: ls`);
      }
    };

    const execute = (name: string) => {
      switch (name) {
        case "help":
          buildHelp().forEach(push);
          return true;
        case "about":
        case "whoami":
          push(profile.bio[0]);
          return true;
        case "skills":
          skills.forEach((g) => push(`${g.category}: ${g.items.join(", ")}`));
          return true;
        case "projects":
          projects.forEach((p) =>
            push(`${p.name} (${p.year}) — ${p.description.split(". ")[0]}`)
          );
          push("→ cd projects for links and details");
          return true;
        case "experience":
          experience.forEach((e) => push(`${e.role} @ ${e.org} · ${e.period}`));
          push("→ cd experience for details");
          return true;
        case "contact":
          push(`email: ${socials.email}`);
          push("→ cd contact, or run: socials");
          return true;
        case "socials":
          push(`github: ${socials.github}`);
          if (socials.twitter !== "#") push(`twitter: ${socials.twitter}`);
          push(`linkedin: ${socials.linkedin}`);
          return true;
        case "resume":
          if (profile.resumeUrl && profile.resumeUrl !== "#") {
            window.open(profile.resumeUrl, "_blank");
            push("opening resume…");
          } else {
            push("resume link not set yet — check back soon");
          }
          return true;
        default:
          return false;
      }
    };

    switch (cmd.toLowerCase()) {
      case "ls":
        push(nav.map((n) => `${n.label}/`).join("  "));
        break;
      case "cd":
      case "open":
        jumpTo(arg);
        break;
      case "echo":
        push(arg || "");
        break;
      case "sudo":
        if (arg.toLowerCase().includes("rm -rf")) {
          push("deleting your portfolio… just kidding. nice try.");
        } else {
          push("nice try. permission denied.");
        }
        break;
      case "matrix":
        push("wake up…");
        window.dispatchEvent(new Event("trigger-matrix-rain"));
        break;
      case "clear":
        setLines([]);
        return;
      case "date":
        push(new Date().toString());
        break;
      default: {
        if (execute(cmd.toLowerCase())) break;
        const question = trimmed.toLowerCase();
        const match = KEYWORDS.find(([pattern]) => pattern.test(question));
        if (match) {
          execute(match[1]);
        } else {
          push(`not sure what "${trimmed}" means — tap a command below or type "help"`);
        }
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(value);
      setValue("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const nextIndex =
        histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(nextIndex);
      setValue(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === null) return;
      const nextIndex = histIndex + 1;
      if (nextIndex >= history.length) {
        setHistIndex(null);
        setValue("");
      } else {
        setHistIndex(nextIndex);
        setValue(history[nextIndex]);
      }
    }
  }

  return (
    <div className="flex flex-col font-mono text-[13px] leading-relaxed sm:text-sm">
      <div
        ref={scrollRef}
        className="h-full max-h-[340px] min-h-[200px] cursor-text overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            {line.kind === "input" ? (
              <>
                <span className="shrink-0 text-accent">
                  {profile.handle}@portfolio
                  <span className="text-text-dim">:~$</span>
                </span>
                <span className="text-text">{line.text}</span>
              </>
            ) : (
              <span
                className={`whitespace-pre-wrap ${
                  line.kind === "hint" ? "text-accent/80" : "text-text-muted"
                }`}
              >
                {line.text}
              </span>
            )}
          </div>
        ))}

        {booted && (
          <div className="flex items-center gap-2">
            <span className="shrink-0 text-accent">
              {profile.handle}@portfolio<span className="text-text-dim">:~$</span>
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="try: projects"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent text-text outline-none placeholder:text-text-dim"
              aria-label="Terminal command input"
            />
          </div>
        )}
      </div>

      {booted && (
        <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
          {QUICK_COMMANDS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => run(c)}
              className="rounded-md border border-border px-2.5 py-1 text-xs text-text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {c}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function typeInto(
  cmd: string,
  cancelledRef: { current: boolean },
  setLines: React.Dispatch<React.SetStateAction<Line[]>>
) {
  setLines((prev) => [...prev, { kind: "input", text: "" }]);
  for (let i = 0; i < cmd.length; i++) {
    if (cancelledRef.current) return;
    await wait(28);
    setLines((prev) => {
      const copy = [...prev];
      copy[copy.length - 1] = { kind: "input", text: cmd.slice(0, i + 1) };
      return copy;
    });
  }
}
