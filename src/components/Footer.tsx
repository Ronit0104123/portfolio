import { profile } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-auto w-full max-w-5xl px-5">
      <div className="flex flex-col justify-between gap-2 border-t border-border py-8 font-mono text-[11px] text-text-dim sm:flex-row">
        <p>
          © {year} {profile.name}. Built in Bengaluru, set in Newsreader &amp; Plex.
        </p>
        <p>
          Press <kbd className="text-text-muted">⌘K</kbd> to get around ·{" "}
          <a
            href={profile.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            source
          </a>
        </p>
      </div>
    </footer>
  );
}
