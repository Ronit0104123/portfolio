// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit everything below, nothing else needs to change.
// Remaining placeholders are marked TODO. Search this file for "TODO".
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Ronit Jain",
  handle: "ronit",
  role: "Forward Deployed Engineer",
  tagline:
    "Fullstack engineer building AI and LLM-powered products — currently deploying conversational AI at Gnani.ai.",
  location: "India",
  availability: "Building @ Gnani.ai",
  bio: [
    "I'm a fullstack engineer who ended up specializing in AI and LLM-powered applications. I currently work as a Forward Deployed Engineer at Gnani.ai, a conversational AI company — I help deploy and customize their voice bots, speech recognition, and NLP automation directly for enterprise clients.",
    "Outside of work I'm a third-year student at BITS Pilani, Goa Campus, and I spend my free time building things like Vouch (a credit score for developers' work history) and JustExecute (an AI research assistant for evaluating startup ideas) — usually powered by too much coffee and an unreasonable number of open tabs.",
  ],
  resumeUrl: "#", // TODO: link to a hosted PDF resume, or remove the button in Hero.tsx
  sourceUrl: "https://github.com/Ronit0104123/portfolio",
};

export const socials = {
  github: "https://github.com/Ronit0104123",
  twitter: "#", // TODO: your Twitter/X profile URL
  linkedin: "https://www.linkedin.com/in/ronit-jain0104/",
  email: "ronitj0104@gmail.com",
};

export type Skill = { label: string; level?: "core" | "familiar" };
export type SkillGroup = { category: string; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    category: "languages",
    items: [
      { label: "JavaScript", level: "core" },
      { label: "TypeScript", level: "core" },
      { label: "Python", level: "core" },
      { label: "C++", level: "familiar" },
      { label: "C", level: "familiar" },
    ],
  },
  {
    category: "frontend",
    items: [
      { label: "React", level: "core" },
      { label: "Next.js", level: "core" },
      { label: "Vue.js", level: "familiar" },
      { label: "Tailwind CSS", level: "core" },
    ],
  },
  {
    category: "backend & data",
    items: [
      { label: "Node.js / Express", level: "core" },
      { label: "MySQL", level: "core" },
      { label: "Neo4j", level: "familiar" },
      { label: "Supabase", level: "familiar" },
    ],
  },
  {
    category: "ai & tools",
    items: [
      { label: "LangChain / LangGraph", level: "core" },
      { label: "OpenAI API", level: "core" },
      { label: "Git", level: "core" },
      { label: "Figma", level: "familiar" },
    ],
  },
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
    slug: "vouch",
    name: "Vouch",
    description:
      "A credit score for developers' work history — aggregates your real contributions into a single, verifiable trust signal.",
    tags: ["TypeScript", "React", "Next.js"],
    year: "2026",
    github: "https://github.com/Ronit0104123/Vouch",
    live: "https://vouch-eta-ten.vercel.app",
    featured: true,
    status: "active",
  },
  {
    slug: "justexecute",
    name: "JustExecute",
    description:
      "A research assistant that evaluates startup ideas by gathering real-world evidence across market demand, competition, distribution channels, risk, and an execution roadmap.",
    tags: ["React", "Express", "LangGraph", "Supabase", "OpenAI"],
    year: "2026",
    github: "https://github.com/Ronit0104123/startup-copilot",
    live: "https://startup-copilot-xi.vercel.app",
    featured: true,
    status: "active",
  },
  {
    slug: "taskpilot",
    name: "TaskPilot",
    description:
      "A multi-agent CLI that interprets vague requests and orchestrates their completion — intent parsing, clarification, planning, and execution across tasks like finding medicines or planning travel.",
    tags: ["Python", "Multi-agent"],
    year: "2026",
    github: "https://github.com/Ronit0104123/taskpilot-cli",
    featured: false,
    status: "archived",
  },
  {
    slug: "linkedin-clone",
    name: "LinkedIn Clone",
    description:
      "A frontend + backend clone of LinkedIn's core feed and profile experience, built to practice full-stack fundamentals end to end.",
    tags: ["JavaScript", "React"],
    year: "2025",
    github: "https://github.com/Ronit0104123/Linkedin-Clone",
    featured: false,
    status: "archived",
  },
  // Pulled live from https://github.com/Ronit0104123 — edit freely, or ask
  // me to re-sync from GitHub whenever you ship something new.
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
    org: "Gnani.ai",
    role: "Forward Deployed Engineer",
    period: "TODO: start month/year — Present",
    location: "India",
    bullets: [
      "Deploy and customize Gnani.ai's conversational AI stack — voice bots, speech recognition, and NLP automation — directly with enterprise clients.",
      "TODO: add a concrete system you've owned or an outcome you've driven (a client integration, an automation that cut handling time, a number).",
    ],
    tags: ["Conversational AI", "NLP", "Enterprise Deployment"],
  },
  // TODO: add earlier roles or internships here, most recent first.
];

export type EducationEntry = {
  school: string;
  degree: string;
  period: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    school: "BITS Pilani, Goa Campus",
    degree: "TODO: Degree, Major (e.g. B.E. Computer Science)",
    period: "TODO: e.g. 2023 — 2027",
    detail: "",
  },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];
