export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-5 py-6 font-mono text-xs text-text-dim sm:flex-row">
        <p>© {year} — all rights reserved</p>
        <a href="#top" className="transition-colors hover:text-accent">
          $ cd ~/top
        </a>
      </div>
    </footer>
  );
}
