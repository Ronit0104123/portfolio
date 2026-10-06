// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit everything below, nothing else needs to change.
// Every placeholder is marked TODO. Search this file for "TODO" and fill
// each one in with your real details before you deploy for real.
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Your Name", // TODO: your real name
  handle: "yourhandle", // TODO: used in the terminal prompt, e.g. "ronit"
  role: "Software Engineer", // TODO: your current role / title
  tagline:
    "I build things for the web and occasionally for production.", // TODO: one sharp line about what you do
  location: "Earth", // TODO: e.g. "Bengaluru, India"
  availability: "Open to interesting problems", // TODO: e.g. "Open to full-time roles" / "Not looking right now"
  bio: [
    "TODO: Write 2-3 sentences about who you are, what you work on, and what you care about. Be specific — mention real tools, real numbers, real things you've shipped. Avoid vague buzzwords like 'passionate' or 'innovative'.",
    "TODO: A second paragraph works well for interests outside code, or the kind of problems you like solving.",
  ],
  resumeUrl: "#", // TODO: link to a hosted PDF resume, or remove the button in Hero.tsx
  sourceUrl: "https://github.com/Ronit0104123/portfolio", // this site's own repo — shown in the command palette
};

export const socials = {
  github: "https://github.com/yourusername", // TODO
  twitter: "https://twitter.com/yourhandle", // TODO
  linkedin: "https://linkedin.com/in/yourhandle", // TODO
  email: "you@example.com", // TODO
};

export type Skill = { label: string; level?: "core" | "familiar" };
export type SkillGroup = { category: string; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    category: "languages",
    items: [
      { label: "TypeScript", level: "core" },
      { label: "JavaScript", level: "core" },
      { label: "Python", level: "core" },
      { label: "Go", level: "familiar" },
    ],
  },
  {
    category: "frontend",
    items: [
      { label: "React", level: "core" },
      { label: "Next.js", level: "core" },
      { label: "Tailwind CSS", level: "core" },
      { label: "Framer Motion", level: "familiar" },
    ],
  },
  {
    category: "backend",
    items: [
      { label: "Node.js", level: "core" },
      { label: "PostgreSQL", level: "core" },
      { label: "Redis", level: "familiar" },
      { label: "GraphQL", level: "familiar" },
    ],
  },
  {
    category: "tooling",
    items: [
      { label: "Docker", level: "core" },
      { label: "Git", level: "core" },
      { label: "AWS", level: "familiar" },
      { label: "CI/CD", level: "familiar" },
    ],
  },
  // TODO: replace the above with your actual stack — add/remove categories freely
];

export type Project = {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  year: string;
  github?: string;
  live?: string;
  featured?: boolean;
  status?: "active" | "archived" | "wip";
};

export const projects: Project[] = [
  {
    slug: "project-one",
    name: "TODO: Project One",
    description:
      "TODO: A crisp, specific description of what this project does, who it's for, and what makes it non-trivial. One or two sentences — no filler.",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    year: "2026",
    github: "#",
    live: "#",
    featured: true,
    status: "active",
  },
  {
    slug: "project-two",
    name: "TODO: Project Two",
    description:
      "TODO: Same deal — what it is, the hard part you solved, and the outcome (numbers if you have them: users, latency, stars).",
    tags: ["React", "Node.js", "Redis"],
    year: "2025",
    github: "#",
    live: "#",
    featured: true,
    status: "active",
  },
  {
    slug: "project-three",
    name: "TODO: Project Three",
    description:
      "TODO: Third highlighted project. Swap this whole array for your real repos — this file is the only place you need to edit.",
    tags: ["Python", "FastAPI", "Docker"],
    year: "2025",
    github: "#",
    featured: false,
    status: "archived",
  },
  {
    slug: "project-four",
    name: "TODO: Project Four",
    description:
      "TODO: Add as many as you want. Set featured: true to pin it to the top row.",
    tags: ["Go", "gRPC"],
    year: "2024",
    github: "#",
    featured: false,
    status: "wip",
  },
  // TODO: Tip — give me your GitHub username and I'll pull your real repos
  // (name, description, language, stars, links) to replace this array.
];

export type ExperienceEntry = {
  org: string;
  role: string;
  period: string;
  location?: string;
  bullets: string[];
  tags?: string[];
};

export const experience: ExperienceEntry[] = [
  {
    org: "TODO: Company Name",
    role: "TODO: Your Role",
    period: "TODO: Jan 2024 — Present",
    location: "TODO: Remote / City",
    bullets: [
      "TODO: A concrete outcome you drove — include a number where you can (perf gain, users, revenue, team size).",
      "TODO: A second bullet about scope or a system you owned.",
    ],
    tags: ["TypeScript", "AWS"],
  },
  {
    org: "TODO: Previous Company",
    role: "TODO: Your Role",
    period: "TODO: Jun 2022 — Dec 2023",
    location: "TODO: City",
    bullets: [
      "TODO: What you shipped and why it mattered.",
    ],
    tags: ["React", "Node.js"],
  },
  // TODO: replace with your real roles, oldest last or first — your call
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    school: "TODO: University / Institution",
    degree: "TODO: Degree, Major",
    period: "TODO: 2020 — 2024",
    detail: "TODO: GPA, honors, relevant coursework, or leave blank",
  },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];
