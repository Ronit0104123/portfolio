// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit everything below, nothing else needs to change.
// Remaining placeholders are marked TODO. Search this file for "TODO".
// ─────────────────────────────────────────────────────────────────────────

export const profile = {
  name: "Ronit Jain",
  handle: "ronit",
  role: "Forward Deployed Engineer",
  tagline:
    "I build AI agents that hold real conversations: voice agents for banks and telcos at Gnani.ai, and RAG products on the side.",
  location: "Bengaluru, India",
  availability: "Building voice agents @ Gnani.ai",
  bio: [
    "I'm a Forward Deployed Engineer at Gnani.ai, building voice agents for BFSI and telecom clients like Airtel and L&T Finance, plus Gnani Agent Studio, the internal platform used to configure them. Before that I built AI agents at 100x and was a Google Summer of Code 2025 contributor to the Internet Health Report.",
    "I graduated from BITS Pilani, Goa with a B.E. in Electronics & Instrumentation. On the side I ship AI products end to end (RAG chatbots, a startup-validation engine, a credit score for engineers) and write about AI, startups, and software for 4,000+ followers on LinkedIn.",
  ],
  resumeUrl: "#", // TODO: drop your PDF in /public (e.g. public/resume.pdf) and set this to "/resume.pdf"
  sourceUrl: "https://github.com/Ronit0104123/portfolio",
};

export const socials = {
  github: "https://github.com/Ronit0104123",
  twitter: "#", // TODO: your Twitter/X profile URL
  linkedin: "https://www.linkedin.com/in/ronit-jain0104/",
  email: "ronitj0104@gmail.com",
};

export type SkillGroup = { category: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    category: "languages",
    items: ["JavaScript", "Python", "C++", "SQL", "HTML", "CSS"],
  },
  {
    category: "ai / ml",
    items: ["LangChain", "LangGraph", "RAG", "Embeddings", "Qdrant", "Prompt Engineering"],
  },
  {
    category: "frameworks",
    items: ["React.js", "Node.js", "Express.js", "Vue.js", "Tailwind CSS"],
  },
  {
    category: "data & tools",
    items: ["PostgreSQL", "Supabase", "Neo4j", "Firebase", "Git"],
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
};

export const projects: Project[] = [
  {
    slug: "vouch",
    name: "Vouch",
    description:
      "A portable performance record, basically a credit score for engineers. Employers submit reviews, a Hermes agent turns the free text into a 6-dimension Vouch Score (0–100), and employees control who sees it and can reply.",
    tags: ["React", "Convex", "Hermes Agent", "Dodo Payments"],
    year: "2026",
    github: "https://github.com/Ronit0104123/Vouch",
    live: "https://vouch-eta-ten.vercel.app",
    featured: true,
  },
  {
    slug: "conversa",
    name: "Conversa",
    description:
      "Multi-tenant RAG SaaS for lead generation. Paste a website URL and get an embeddable chatbot that answers visitors from your indexed content and captures leads. Crawled HTML, PDFs and DOCX go into pgvector, and the LangChain agent is covered by 12 unit tests against LLM failure modes.",
    tags: ["FastAPI", "Next.js", "LangChain", "pgvector", "Supabase"],
    year: "2026",
    featured: true,
  },
  {
    slug: "justexecute",
    name: "JustExecute",
    description:
      "Turns a one-sentence startup idea into a market-validation report and a 90-day GTM plan in under 2 minutes. A 5-stage LangGraph state machine runs parallel Tavily searches, and 6 custom retrieval tools ground every claim in Reddit and HN evidence.",
    tags: ["LangGraph", "Groq", "Tavily", "Node.js", "Supabase"],
    year: "2025",
    github: "https://github.com/Ronit0104123/startup-copilot",
    live: "https://startup-copilot-xi.vercel.app",
    featured: true,
  },
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
    period: "Jun 2026 — Present",
    location: "Bengaluru, India",
    bullets: [
      "Built Gnani Agent Studio, an internal platform for configuring BFSI voice agents. A structured QA flow captures requirements and generates system prompts modularly, per product type (personal loan, vehicle loan) and call-flow scenario (PTP, third-party collections), optimized for KV caching.",
      "Matches requirements with embedding retrieval plus LLM confirmation (Azure OpenAI GPT-4o), on a FastAPI/MongoDB + React/TanStack stack.",
      "Developed voice agents for Airtel (collections, DTH) and L&T Finance, with multi-language support and optimized API integrations and call pipelines.",
      "Won 2nd prize among all FDEs in Gnani.ai's company-wide Agent Hackathon.",
    ],
    tags: ["GPT-4o", "FastAPI", "MongoDB", "React", "TanStack"],
  },
  {
    org: "100x",
    role: "AI Agents Developer",
    period: "Aug 2025 — Dec 2025",
    location: "Bengaluru, India",
    bullets: [
      "Built AI agents for candidate sourcing (TrueSearch), NetSuite workflows, and QA/UAT testing, cutting manual testing effort by 80%.",
      "JavaScript-based automation, tuned for reliability over long-running executions.",
    ],
    tags: ["JavaScript", "AI Agents", "NetSuite"],
  },
  {
    org: "Internet Health Report",
    role: "Google Summer of Code 2025 Contributor",
    period: "May 2025 — Aug 2025",
    location: "Remote",
    bullets: [
      "Enhanced IYP Browser, a Vue.js frontend for exploring a Neo4j graph: real-time node expansion, Cypher autocompletion, embeddable widgets, and accessibility visualizations with Plotly.js.",
    ],
    tags: ["Vue.js", "Neo4j", "Cypher", "Plotly.js"],
  },
];

export type EducationEntry = {
  school: string;
  degree?: string;
  period?: string;
  detail?: string;
};

export const education: EducationEntry[] = [
  {
    school: "BITS Pilani, K K Birla Goa Campus",
    degree: "B.E. Electronics & Instrumentation",
    period: "Oct 2022 — Jul 2026",
  },
];

export const nav = [
  { label: "about", href: "#about" },
  { label: "skills", href: "#skills" },
  { label: "projects", href: "#projects" },
  { label: "experience", href: "#experience" },
  { label: "contact", href: "#contact" },
];
