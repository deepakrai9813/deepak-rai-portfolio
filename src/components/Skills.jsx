import { motion } from "framer-motion";
import RevealText from "./RevealText";
import {
  Monitor,
  Server,
  Database,
  Cloud,
  Smartphone,
  CheckCircle,
  Sparkles,
} from "./icons";

const SKILLS = [
  {
    icon: Sparkles,
    title: "AI & ML Integration",
    accent: true,
    desc: "Shipping real products with LLMs — from chat to retrieval.",
    tags: [
      "OpenAI API",
      "Groq LLMs",
      "LangChain",
      "RAG Pipelines",
      "Prompt Engineering",
      "Vector Databases",
      "Hugging Face",
      "Streaming Responses",
    ],
  },
  {
    icon: Monitor,
    title: "Frontend",
    desc: "Interfaces that are fast, accessible, and a joy to use.",
    tags: ["React 19", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Vite", "Redux"],
  },
  {
    icon: Server,
    title: "Backend",
    desc: "Robust APIs and services designed for scale and clarity.",
    tags: [
      "Node.js",
      "Express",
      "NestJS",
      "REST APIs",
      "GraphQL",
      "WebSockets",
      "Firebase Cloud Functions",
      "NextAuth.js",
    ],
  },
  {
    icon: Database,
    title: "Databases",
    desc: "Data models and queries that stay fast as you grow.",
    tags: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Firebase Firestore", "Supabase"],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    desc: "Smooth deploys, monitoring, and infrastructure that just works.",
    tags: ["AWS", "Docker", "CI/CD", "Vercel", "Nginx", "Linux", "Git & GitHub"],
  },
  {
    icon: CheckCircle,
    title: "Testing & Tools",
    desc: "Confidence at every deploy with solid test coverage.",
    tags: ["Jest", "Vitest", "Playwright", "Testing Library", "ESLint", "Figma"],
  },
  {
    icon: Smartphone,
    title: "Mobile",
    desc: "Cross-platform apps that share logic with the web.",
    tags: ["React Native", "Expo", "REST APIs", "Push Notifications"],
  },
];

const EASE = [0.22, 1, 0.36, 1];

export default function Skills() {
  return (
    <section className="skills" id="skills" aria-label="Skills">
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
              <span className="idx">02</span> — Expertise
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "What I bring to the table" }]}
              delay={0.05}
            />
          </div>
        </motion.div>

        <div className="skills__grid">
          {SKILLS.map((s, i) => (
            <motion.div
              className={`skill-card${s.accent ? " skill-card--ai" : ""}`}
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
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
                {s.tags.map((t, j) => (
                  <motion.span
                    className="tag"
                    key={t}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: 0.12 + j * 0.035, ease: EASE }}
                  >
                    {t}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
