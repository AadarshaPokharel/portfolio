/**
 * All portfolio copy lives here. Edit text, links and projects in this one
 * file; the section components only render what is defined below.
 * Facts are taken from the public GitHub profile and repo READMEs.
 */

export const SITE = {
  name: "Aadarsha Pokharel",
  role: "React Native Intern",
  tagline: "Final-year CS student building full-stack apps and learning agentic AI.",
  email: "aadarshapokharel3@gmail.com",
  github: "https://github.com/AadarshaPokharel",
  location: "Nepal",
} as const;

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export const HERO = {
  eyebrow: "React Native Intern · Final-year CS",
  headline: SITE.name,
  subtitle:
    "I build full-stack apps across mobile, backend and applied AI, with a focus on financial technology. Just learning, and building in public.",
  primaryCta: { label: "Start exploring →", href: "#about" },
  secondaryCta: { label: "View projects", href: "#projects" },
  steps: [
    { step: "Step 1", title: "About me", body: "Who I am and what I'm into.", href: "#about" },
    { step: "Step 2", title: "Projects", body: "Things I've built.", href: "#projects" },
    { step: "Step 3", title: "Contact", body: "Say hello, I'd love to hear from you.", href: "#contact" },
  ],
} as const;

export const ABOUT = {
  paragraphs: [
    "I'm a final-year Computer Science student and React Native intern. I like building things end to end: a mobile app people can actually use, the API behind it, and the data layer underneath.",
    "Most of my work sits around financial technology and AI-driven systems. Right now I'm sharpening my React Native skills at work and learning agentic AI on the side, usually by building small experiments and putting them on GitHub.",
  ],
  facts: [
    { label: "Role", value: "React Native Intern" },
    { label: "Studying", value: "B.Sc. CSIT, Tribhuvan University" },
    { label: "Focus", value: "Fintech · Mobile · Applied AI" },
    { label: "Learning", value: "Agentic AI" },
    { label: "Based in", value: SITE.location },
  ],
} as const;

export const SKILLS = [
  { group: "Languages", items: ["TypeScript", "Python", "JavaScript"] },
  { group: "Mobile", items: ["React Native", "Expo", "Expo Router", "NativeWind"] },
  { group: "Web", items: ["React", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["FastAPI", "Node.js", "Django"] },
  { group: "Data & ML", items: ["PostgreSQL", "MongoDB", "scikit-learn", "Jupyter"] },
  { group: "Tools", items: ["Git", "Docker"] },
] as const;

export type Project = {
  title: string;
  kind: string;
  status: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
  href: string;
  featured?: boolean;
};

export const PROJECTS: readonly Project[] = [
  {
    title: "MoneyFlow",
    kind: "Mobile + API",
    status: "In progress · phases 1–3 done",
    summary:
      "A personal finance tracker: a React Native (Expo) app backed by a FastAPI + PostgreSQL API.",
    highlights: [
      "Transactions, category budgets with overspend alerts, savings goals and PDF reports",
      "Clerk authentication (email/password and Google OAuth) with JWT verification on the API",
      "Clean-architecture backend: routers, services, repositories, Alembic migrations, pytest suite",
      "Roadmap: wire app to API with React Query, then Redis, RabbitMQ, Kafka, Docker and Kubernetes",
    ],
    stack: ["React Native", "Expo", "TypeScript", "NativeWind", "FastAPI", "PostgreSQL", "SQLAlchemy", "Clerk"],
    href: "https://github.com/AadarshaPokharel/money-flow",
    featured: true,
  },
  {
    title: "IoT Blind Curve Collision Detection",
    kind: "Final year project · Team of 3",
    status: "Completed",
    summary:
      "An IoT early-warning platform: roadside Arduino nodes detect vehicles approaching a blind curve and warn the opposite driver in real time.",
    highlights: [
      "FastAPI + React dashboards for Admin and Policy Maker roles with JWT auth and audit logging",
      "Random Forest collision-risk model (15 features) with an F2-tuned threshold; 99.86% accuracy under simulated sensor noise",
      "Airflow retraining pipeline, MongoDB telemetry storage and a rule-based fallback if the model is unavailable",
      "Documented ML audit covering leakage checks, leave-one-session-out validation and robustness tests",
    ],
    stack: ["Arduino", "FastAPI", "React", "scikit-learn", "MongoDB", "Airflow", "Docker"],
    href: "https://github.com/AadarshaPokharel/fyp",
    featured: true,
  },
  {
    title: "Single AI Agent System",
    kind: "Experiment",
    status: "Learning in public",
    summary: "Hands-on notebooks exploring how a single AI agent is built, as part of learning agentic AI.",
    highlights: [],
    stack: ["Python", "Jupyter"],
    href: "https://github.com/AadarshaPokharel/Single-AI-Agent-System",
  },
  {
    title: "Data Mining & Data Warehousing",
    kind: "Coursework",
    status: "7th semester",
    summary: "Notebooks from my data mining and data warehousing coursework.",
    highlights: [],
    stack: ["Python", "Jupyter"],
    href: "https://github.com/AadarshaPokharel/Data-Mining-and-Data-Warehousing",
  },
];

export const CONTACT = {
  heading: "Let's build something.",
  body: "I'm open to internships and junior roles in mobile and full-stack development. The fastest way to reach me is email.",
} as const;
