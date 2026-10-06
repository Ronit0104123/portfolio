"use client";

import { useEffect, useRef, useState } from "react";
import { profile, socials, nav } from "@/lib/content";

type Line = { kind: "input" | "output" | "hint"; text: string };

const BOOT_LINES = [
  { cmd: "whoami", out: `${profile.handle} — ${profile.role}` },
  { cmd: "cat status.txt", out: profile.availability },
];

function buildHelp() {
  const routes = nav.map((n) => n.label).join(", ");
  return [
    `available commands: ${routes}, socials, resume, echo <text>, clear, help`,
    "tip: try pressing ↑ for command history, or ⌘K for the command palette",
  ];
}

export function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [booted, setBooted] = useState(false);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
        setLines(instant);
        setBooted(true);
      }, 0);
      return () => {
        cancelledRef.current = true;
        clearTimeout(timer);
      };
    }

    async function play() {
      for (const b of BOOT_LINES) {
        await typeInto(b.cmd, cancelledRef, setLines);
        if (cancelledRef.current) return;
        await wait(180);
        setLines((prev) => [...prev, { kind: "output", text: b.out }]);
        await wait(320);
      }
      if (!cancelledRef.current) setBooted(true);
    }
    play();
    return () => {
      cancelledRef.current = true;
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  function run(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;
    setLines((prev) => [...prev, { kind: "input", text: trimmed }]);
    setHistory((prev) => [...prev, trimmed]);
    setHistIndex(null);

    const [cmd, ...rest] = trimmed.split(" ");
    const arg = rest.join(" ");
    const push = (text: string) =>
      setLines((prev) => [...prev, { kind: "output", text }]);

    switch (cmd.toLowerCase()) {
      case "help":
        buildHelp().forEach(push);
        break;
      case "about":
        push(profile.bio[0]);
        break;
      case "skills":
        push("see the ./skills section below — or run: open skills");
        break;
      case "projects":
        push("see the ./projects section below — or run: open projects");
        break;
      case "experience":
        push("see the ./experience section below — or run: open experience");
        break;
      case "contact":
        push(`reach me at ${socials.email}`);
        break;
      case "socials":
        push(`github: ${socials.github}`);
        if (socials.twitter !== "#") push(`twitter: ${socials.twitter}`);
        push(`linkedin: ${socials.linkedin}`);
        break;
      case "resume":
        if (profile.resumeUrl && profile.resumeUrl !== "#") {
          window.open(profile.resumeUrl, "_blank");
          push("opening resume…");
        } else {
          push("resume link not set yet — check back soon");
        }
        break;
      case "open": {
        const target = nav.find((n) => n.label === arg.toLowerCase());
        if (target) {
          document.querySelector(target.href)?.scrollIntoView({
            behavior: "smooth",
          });
          push(`jumping to ./${target.label}`);
        } else {
          push(`no section named "${arg}"`);
        }
        break;
      }
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
      default:
        push(`command not found: ${cmd} — try "help"`);
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
    <div
      className="h-full max-h-[420px] min-h-[320px] cursor-text overflow-y-auto font-mono text-[13px] leading-relaxed sm:text-sm"
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
            <span className="whitespace-pre-wrap text-text-muted">
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
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-text outline-none"
            aria-label="Terminal command input"
          />
        </div>
      )}
      <div ref={bottomRef} />
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
