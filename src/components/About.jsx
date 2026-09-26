import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import RevealText from "./RevealText";
import CountUp from "./CountUp";
import { CheckCircle, ShieldCheck, Cpu, Terminal, ArrowUpRight } from "./icons";

const STATS = [
  { value: 3, suffix: "+", label: "Years of experience" },
  { value: 15, suffix: "+", label: "Shipped projects" },
  { value: 100, suffix: "%", label: "Production delivery rate" },
  { value: 200, suffix: "ms", label: "Resiliency timeout standard" },
];

const MILESTONES = [
  {
    period: "2024 — Present",
    role: "Full-Stack & Systems Software Engineer",
    organization: "Independent & Open Source",
    summary:
      "Engineering resilient distributed systems, sub-second API proxies, and AI-augmented tools. Built Project Sentinel in Go with custom Circuit Breakers and BIAN AI with Groq LLM streaming.",
    skills: ["Go", "React 19", "Gorilla WebSocket", "Groq LLMs", "Docker", "Toxiproxy"],
  },
  {
    period: "2023 — 2024",
    role: "Production Client Engineer",
    organization: "SAN BROTHERS Corporate Solutions",
    summary:
      "Architected and deployed full-scale corporate compliance web application for a Company Secretary practice serving pan-India clients. Achieved #1 brand search ranking on Google with sub-second page loads.",
    skills: ["Next.js", "Express", "MongoDB", "Technical SEO", "Cloud Deployment"],
  },
  {
    period: "2022 — 2023",
    role: "Full-Stack Engineering & Core CS",
    organization: "Computer Science & Engineering",
    summary:
      "Rigorous foundations in data structures, operating systems, network protocols, and distributed systems. Built full-stack apps and specialized in asynchronous concurrency.",
    skills: ["JavaScript", "TypeScript", "Node.js", "PostgreSQL", "Git"],
  },
];

const PILLARS = [
  {
    icon: ShieldCheck,
    title: "Fault-Tolerant by Default",
    desc: "I build systems that anticipate upstream lag and crashes — using timeouts, circuit breakers, and warm fallbacks so users never see errors.",
  },
  {
    icon: Cpu,
    title: "AI Integration with Real ROI",
    desc: "Beyond hype: streaming tokens, structured output parsing, and embedding pipelines that actually solve concrete user workflows.",
  },
  {
    icon: Terminal,
    title: "End-to-End Ownership",
    desc: "From database normalization and reverse proxies to pixel-perfect micro-interactions and production monitoring, I deliver turnkey results.",
  },
];

export default function About({ playPop }) {
  const [tab, setTab] = useState("story"); // 'story' | 'journey'

  return (
    <section className="about" id="about" aria-label="About Deepak Rai">
      <div className="container">
        <div className="about__grid">
          <motion.div
            className="about__media"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="about__img-wrapper">
              <img src="deepak-rai.png" alt="Deepak Rai — Full-Stack Developer" loading="lazy" />
              <div className="about__img-glow" />
            </div>

            <div className="about__stats">
              {STATS.map((s) => (
                <div className="stat" key={s.label}>
                  <CountUp value={s.value} suffix={s.suffix} />
                  <small>{s.label}</small>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about__body"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow">
              <span className="idx">01</span> — About me &amp; Engineering Philosophy
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "Crafting software that doesn't break." }]}
              delay={0.1}
            />

            {/* Interactive Tab Switcher */}
            <div className="about__tabs" role="tablist">
              <button
                className={`about__tab-btn${tab === "story" ? " is-active" : ""}`}
                onClick={() => {
                  setTab("story");
                  playPop?.();
                }}
                role="tab"
                aria-selected={tab === "story"}
              >
                Philosophy &amp; Focus
              </button>
              <button
                className={`about__tab-btn${tab === "journey" ? " is-active" : ""}`}
                onClick={() => {
                  setTab("journey");
                  playPop?.();
                }}
                role="tab"
                aria-selected={tab === "journey"}
              >
                Engineering Journey &amp; Milestones
              </button>
            </div>

            <AnimatePresence mode="wait">
              {tab === "story" ? (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  <p style={{ marginTop: "1.4rem" }}>
                    Hi, I&apos;m <strong>Deepak Rai</strong> — a software engineer who lives
                    at the intersection of high-performance backend systems and buttery-smooth
                    user interfaces.
                  </p>
                  <p>
                    I believe great software isn&apos;t just about pretty UI or fancy buzzwords;
                    it&apos;s about <strong>resilience under load</strong>, clean data flows,
                    and respectful latency. Whether writing a custom <strong>Go reverse proxy</strong>{" "}
                    with strict sub-200ms failover or architecting full-stack React applications with
                    real-time WebSockets, I obsess over correctness and developer craft.
                  </p>

                  <div className="about__pillars">
                    {PILLARS.map((p) => {
                      const Icon = p.icon;
                      return (
                        <div className="pillar-card" key={p.title}>
                          <span className="pillar-icon">
                            <Icon width={18} height={18} />
                          </span>
                          <div>
                            <h4>{p.title}</h4>
                            <p>{p.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="journey"
                  className="about__timeline"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35 }}
                >
                  {MILESTONES.map((m, idx) => (
                    <div className="timeline-item" key={m.period}>
                      <div className="timeline-marker">
                        <span className="timeline-dot" />
                        {idx !== MILESTONES.length - 1 && <span className="timeline-line" />}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-header">
                          <span className="timeline-period">{m.period}</span>
                          <span className="timeline-org">{m.organization}</span>
                        </div>
                        <h4 className="timeline-role">{m.role}</h4>
                        <p className="timeline-desc">{m.summary}</p>
                        <div className="timeline-skills">
                          {m.skills.map((sk) => (
                            <span className="tag tag--sm" key={sk}>
                              {sk}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
