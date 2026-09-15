# Portfolio

A terminal/code-inspired personal portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Fully static, deploys anywhere.

## Editing your content

**Everything you need to change lives in one file: [`src/lib/content.ts`](src/lib/content.ts).**

It's organized into a few exports:

- `profile` — name, role, tagline, bio, location, resume link
- `socials` — GitHub / Twitter / LinkedIn / email
- `skills` — grouped skill categories
- `projects` — your project cards (name, description, tags, links, year, status)
- `experience` — work history entries
- `education` — school entries
- `nav` — the section links in the header (only touch this if you add/remove a whole section)

Every placeholder is marked `TODO:` — search the file for `TODO` and replace them with your real details. No other file needs to change for a content update.

A couple of things worth knowing:

- Set `featured: true` on a project in `projects` to pin it to the larger top row.
- The hero section includes a live, typeable terminal (`src/components/InteractiveTerminal.tsx`) that responds to commands like `help`, `about`, `projects`, `socials`, `resume`, `open <section>`, and `clear` — it reads its answers straight from `content.ts`, so it stays in sync automatically.
- `src/app/opengraph-image.tsx` generates the image shown when the link is shared (e.g. on Twitter/X) — it's built from `profile`, so it updates automatically too.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run start
```

The build output is fully static (no server-side data fetching), so it can be deployed to any static-friendly host.

## Deploying

**Vercel (recommended for Next.js):**

1. Push this repo to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo, and deploy — no config needed.
3. Add a custom domain later from the Vercel project settings if you get one.

**Netlify:** import the repo at [app.netlify.com](https://app.netlify.com/start) — it auto-detects Next.js.

**GitHub Pages:** requires `output: "export"` in `next.config.ts` since Pages only serves static files. Ask for help wiring this up if you go this route — the interactive terminal and animations still work fine as a static export.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://motion.dev/) for scroll reveals
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) + [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) via `next/font`
