import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "./RevealText";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  CheckCircle,
  Sparkles,
  ShieldCheck,
  Cpu,
  Layers,
} from "./icons";

const SKILLS = [
  {
    id: "systems",
    icon: ShieldCheck,
    title: "Distributed Systems & Concurrency",
    accent: true,
    category: "Backend & Systems",
    desc: "Low-latency microservices, fault tolerance, and network proxies.",
    tags: [
      "Go (Golang)",
      "Circuit Breakers",
      "Reverse Proxies",
      "Gorilla WebSockets",
      "sync.Pool / sync.Mutex",
      "Toxiproxy Chaos Testing",
      "Sub-200ms SLAs",
      "Buffer Replay",
    ],
  },
  {
    id: "ai",
    icon: Sparkles,
    title: "AI & LLM Integration",
    accent: true,
    category: "AI & LLMs",
    desc: "Production applications powered by state-of-the-art language models.",
    tags: [
      "Groq High-Speed LLMs",
      "OpenAI API",
      "Streaming Responses",
      "RAG Pipelines",
      "pdf.js Text Chunking",
      "Prompt Engineering",
      "Vector Embeddings",
      "Structured Output Validation",
    ],
  },
  {
    id: "frontend",
    icon: Monitor,
    title: "Modern Frontend Engineering",
    category: "Frontend",
    desc: "Accessible, buttery-smooth interfaces built with modern React.",
    tags: [
      "React 19",
      "Next.js 16 (App Router)",
      "TypeScript",
      "JavaScript (ESNext)",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "State Management & WebSockets",
    ],
  },
  {
    id: "backend",
    icon: Server,
    title: "Backend APIs & Microservices",
    category: "Backend & Systems",
    desc: "Type-safe, scalable service architecture and clean REST/WebSocket APIs.",
    tags: [
      "Node.js",
      "Express",
      "NestJS",
      "RESTful Architecture",
      "NextAuth.js (OAuth 2.0)",
      "Firebase Cloud Functions",
      "JWT Security & CORS",
    ],
  },
  {
    id: "databases",
    icon: Database,
    title: "Data Stores & ORMs",
    category: "Databases & Cloud",
    desc: "Schema design, relational consistency, and fast cache layers.",
    tags: [
      "PostgreSQL",
      "MongoDB",
      "Redis Caching",
      "Prisma ORM",
      "Firebase Firestore",
      "Supabase",
    ],
  },
  {
    id: "devops",
    icon: Cloud,
    title: "DevOps & Cloud Infrastructure",
    category: "Databases & Cloud",
    desc: "Predictable, automated deployments with containerization.",
    tags: [
      "Docker & Compose",
      "CI/CD Pipelines",
      "AWS (EC2, S3)",
      "Vercel Edge",
      "Nginx Reverse Proxy",
      "Linux / Bash",
      "Git & GitHub Actions",
    ],
  },
  {
    id: "testing",
    icon: CheckCircle,
    title: "Testing & Quality Assurance",
    category: "Frontend",
    desc: "Automated end-to-end and unit testing for bulletproof releases.",
    tags: [
      "Playwright (E2E)",
      "Vitest",
      "Jest",
      "Testing Library",
      "ESLint & Oxlint",
      "Figma Prototyping",
    ],
  },
];

const CATEGORIES = ["All", "Backend & Systems", "AI & LLMs", "Frontend", "Databases & Cloud"];

const EASE = [0.22, 1, 0.36, 1];

export default function Skills({ onSkillClick, highlightedSkill, playPop }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = useMemo(() => {
    if (activeCategory === "All") return SKILLS;
    return SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="skills" id="skills" aria-label="Technical skills & architecture">
      <div className="container">
        <motion.div
          className="section-head"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <p className="eyebrow">
              <span className="idx">02</span> — Technical Expertise &amp; Tooling
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "Architecture & full-stack mastery" }]}
              delay={0.05}
            />
          </div>
          <span className="skills__hint">
            Click any tag to see related projects in Selected Work
          </span>
        </motion.div>

        {/* Category Pills */}
        <div className="skills__categories" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                className={`filter-pill${isActive ? " is-active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat);
                  playPop?.();
                }}
              >
                {cat}
                {isActive && (
                  <motion.span
                    className="filter-pill-bg"
                    layoutId="skills-category-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <motion.div layout className="skills__grid">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((s, i) => (
              <motion.div
                layout
                className={`skill-card${s.accent ? " skill-card--ai" : ""}`}
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="skill-card__head">
                  <span className={`skill-card__icon${s.accent ? " is-accent" : ""}`}>
                    <s.icon width={22} height={22} />
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>{s.desc}</p>
                  </div>
                </div>
                <div className="skill-card__tags">
                  {s.tags.map((t) => {
                    const isHighlighted = highlightedSkill === t;
                    return (
                      <button
                        className={`tag tag--clickable${isHighlighted ? " is-selected" : ""}`}
                        key={t}
                        onClick={() => {
                          playPop?.();
                          onSkillClick?.(isHighlighted ? null : t);
                        }}
                        title={`Filter projects using ${t}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
