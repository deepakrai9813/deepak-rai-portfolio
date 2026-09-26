import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "./RevealText";
import { ShieldCheck, Sparkles, Monitor, Database, ArrowUpRight, CheckCircle } from "./icons";

const SERVICES = [
  {
    num: "01",
    title: "High-Resilience Systems & API Gateways",
    icon: ShieldCheck,
    tagline: "Custom proxies, circuit breakers, and zero-downtime routing in Go.",
    desc: "I architect fault-tolerant distributed infrastructure that protects platforms from cascading microservice failures. Built from scratch with strict latency cutoffs, rewindable request buffering, low-overhead sync.Pool reuse, and 60 FPS real-time WebSocket telemetry.",
    deliverables: [
      "Custom 3-state Circuit Breaker reverse proxies (Go, sync.RWMutex)",
      "Strict sub-200ms failover with 0 dropped requests",
      "Real-time WebSocket telemetry dashboards (Gorilla WebSocket, React 19)",
      "Automated resilience verification via Toxiproxy chaos engineering",
    ],
  },
  {
    num: "02",
    title: "Production AI & LLM Systems",
    icon: Sparkles,
    tagline: "Token-by-token streaming, contextual retrieval, and intelligent agents.",
    desc: "Moving beyond proof-of-concepts to ship robust AI integrations with real business ROI. Leveraging high-throughput Groq LLMs, OpenAI API, client-side document parsing, and structured output validation for instant user responsiveness.",
    deliverables: [
      "Sub-second streaming LLM inference via Groq & OpenAI APIs",
      "Client-side document ingestion & text chunking (pdf.js)",
      "Contextual RAG pipelines and vector search indexing",
      "Automated lead intelligence, evaluation, and outreach generation",
    ],
  },
  {
    num: "03",
    title: "Creative Full-Stack Web Engineering",
    icon: Monitor,
    tagline: "Pixel-crafted interfaces with buttery-smooth motion and rock-solid state.",
    desc: "End-to-end web applications built with modern React 19 and Next.js 16. Combining aesthetic precision, fluid physics, keyboard-first command centers, and tactile micro-interactions with accessible, SEO-optimized code.",
    deliverables: [
      "Next.js 16 (App Router) & React 19 component architecture",
      "Keyboard-accessible Command Palettes & tactile Web Audio interactions",
      "Technical SEO & OpenGraph markup ranking #1 on Google for brand",
      "Comprehensive end-to-end test coverage with Playwright",
    ],
  },
  {
    num: "04",
    title: "Database Architecture & DevOps",
    icon: Database,
    tagline: "Scalable data schemas, distributed caching, and automated CI/CD.",
    desc: "Clean relational and document data stores that stay performant as query loads grow. Containerized with Docker and deployed with edge caching, automated SSL, and health monitoring.",
    deliverables: [
      "Relational & NoSQL schema design (PostgreSQL, MongoDB, Redis)",
      "Type-safe database workflows with Prisma ORM",
      "Dockerized microservices & multi-stage production builds",
      "CI/CD pipelines, edge deployments on Vercel and AWS",
    ],
  },
];

export default function Services({ playPop, playClick }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="services" id="services" aria-label="Services and capabilities">
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
              <span className="idx">04</span> — Capabilities &amp; Services
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "What I build & deliver" }]}
              delay={0.05}
            />
          </div>
          <span className="services__badge">
            <span className="status-dot" /> Full-Cycle Engineering
          </span>
        </motion.div>

        <div className="services__accordion">
          {SERVICES.map((s, idx) => {
            const isOpen = activeIdx === idx;
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className={`service-row${isOpen ? " is-open" : ""}`}
                onClick={() => {
                  if (!isOpen) {
                    setActiveIdx(idx);
                    playPop?.();
                  }
                }}
              >
                <div className="service-row__header">
                  <span className="service-row__num">{s.num}</span>
                  <div className="service-row__title-wrap">
                    <span className="service-row__icon">
                      <Icon width={20} height={20} />
                    </span>
                    <h3 className="service-row__title">{s.title}</h3>
                  </div>
                  <span className="service-row__tagline">{s.tagline}</span>
                  <button
                    className="service-row__arrow"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIdx(isOpen ? -1 : idx);
                      playClick?.();
                    }}
                    aria-label={`Toggle details for ${s.title}`}
                  >
                    <ArrowUpRight width={18} height={18} />
                  </button>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className="service-row__content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="service-row__desc">{s.desc}</p>
                      <div className="service-row__deliverables">
                        <h4>Key Deliverables &amp; Patterns:</h4>
                        <ul>
                          {s.deliverables.map((item, dIdx) => (
                            <li key={dIdx}>
                              <CheckCircle width={15} height={15} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
