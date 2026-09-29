import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Zap, Shield, Database, Server } from "./icons";

const STARK_SYSTEMS = [
  {
    id: "sentinel",
    code: "CABIN-01A",
    botSupervisor: "BOT: PROXY-SENTINEL (MK-V)",
    title: "PROJECT SENTINEL",
    subtitle: "Distributed Fault-Tolerant Reverse Proxy in Go",
    status: "CHAOS TESTED · 0.00% LOSS",
    tags: ["Go", "net/http", "sync.Pool", "Circuit Breaker", "Toxiproxy", "WebSockets"],
    metrics: [
      { label: "PACKET LOSS", val: "0.00%", sub: "UNDER 500MS CHAOS" },
      { label: "MEDIAN LATENCY", val: "12ms", sub: "p99 < 35MS" },
      { label: "MEMORY PROFILE", val: "<4.2MB", sub: "ZERO-ALLOC BUFFER POOL" },
    ],
    architecture:
      "Engineered with Go standard library `net/http` and `sync.RWMutex` for lock-free read paths. Upstream failures are detected via a thread-safe sliding window ring buffer. Request bodies are preserved in a `sync.Pool`-backed memory buffer, enabling seamless rewind (`io.Seeker`) to replay payloads against secondary upstreams upon primary HTTP 504 / timeout with zero dropped transactions.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "#hero",
    isInternalDemo: true,
  },
  {
    id: "san-brothers",
    code: "CABIN-01B",
    botSupervisor: "BOT: SEO-CRAWLER (MK-II)",
    title: "SAN BROTHERS PLATFORM",
    subtitle: "Enterprise Legal Compliance Platform in Production",
    status: "PRODUCTION LIVE · RANK #1",
    tags: ["React", "Node.js", "Express", "SEO Schema", "Production Deployment"],
    metrics: [
      { label: "GOOGLE SEARCH", val: "#1 RANK", sub: "BRAND KEYWORD DOMINANCE" },
      { label: "LCP SPEED", val: "0.74s", sub: "100 LIGHTHOUSE SCORE" },
      { label: "UPTIME MONITOR", val: "99.99%", sub: "PRODUCTION VERIFIED" },
    ],
    architecture:
      "Engineered with strict semantic HTML5, JSON-LD structured metadata graphs for search engine entity extraction, zero-overhead CSS architecture, and a hardened Node.js inquiry pipeline equipped with rate-limiting and cryptographic honeypots against automated crawlers. Achieved rank #1 on Google search for brand terms.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://sanbrothers.co.in",
  },
  {
    id: "bian-ai",
    code: "CABIN-01C",
    botSupervisor: "BOT: LLM-TOKENIZER (MK-III)",
    title: "BIAN AI — STUDY ACCELERATOR",
    subtitle: "High-Speed LLM Document Engine & Token Streamer",
    status: "PRODUCTION READY · 250+ T/S",
    tags: ["React", "Groq LLM", "Web Workers", "PDF.js", "SSE Streaming"],
    metrics: [
      { label: "FIRST TOKEN", val: "<280ms", sub: "GROQ LLAMA-3 ACCELERATION" },
      { label: "THROUGHPUT", val: "250+ t/s", sub: "ZERO MAIN-THREAD JANK" },
      { label: "DOC CAPACITY", val: "200+ Pages", sub: "OFF-THREAD WEB WORKER" },
    ],
    architecture:
      "Offloaded heavy PDF binary parsing and text chunking pipelines to dedicated Web Workers, ensuring the browser UI thread maintains locked 60 FPS scrolling. Consumes Groq LLM completions via Server-Sent Events (SSE) with adaptive backpressure buffering.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://github.com/deepakrai9813",
  },
  {
    id: "leadfinder-ai",
    code: "CABIN-01D",
    botSupervisor: "BOT: PRISMA-INDEXER (MK-I)",
    title: "LEADFINDER AI",
    subtitle: "Relational B2B Prospect Discovery Pipeline",
    status: "ACTIVE SYSTEM · <42MS QUERY",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "App Router"],
    metrics: [
      { label: "QUERY RESOLUTION", val: "<42ms", sub: "COMPOSITE B-TREE INDEX" },
      { label: "TYPE SAFETY", val: "100%", sub: "END-TO-END TYPESCRIPT" },
      { label: "ARCHITECTURE", val: "Next.js 16", sub: "SERVER COMPONENTS" },
    ],
    architecture:
      "Next.js 16 App Router architecture utilizing React Server Components (RSC) to minimize client-side JavaScript bundle sizes. Relational data layer modeled with Prisma ORM on PostgreSQL with indexed full-text search and transactional deduplication.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://github.com/deepakrai9813",
  },
];

export default function StarkProjectsCabin() {
  return (
    <section id="projects-cabin" className="stark-cabin-section">
      <div className="container">
        {/* Pipeline Junction Node Entrance */}
        <div className="cabin-pipeline-junction">
          <span className="junction-pipe-feed" />
          <span className="junction-indicator-light" />
          <span className="junction-label">POWER INFEED // FROM CENTRAL ARC PROCESSOR</span>
        </div>

        {/* Section Header */}
        <div className="stark-cabin-header">
          <div className="header-kicker">
            <span className="kicker-tag crimson">CABIN 01 // STARK ARMORY</span>
            <span>FULL-STACK PRODUCTION &amp; HIGH-SCALE SYSTEMS</span>
          </div>
          <h2 className="cabin-title">
            VERIFIED ARMORY &amp; BACKEND PLATFORMS
          </h2>
          <p className="cabin-description">
            Each full-stack system and reverse proxy is continuously powered by Arc Reactor conduits
            and monitored by dedicated Stark Bot Units in real time.
          </p>
        </div>

        {/* Systems Grid */}
        <div className="stark-systems-grid">
          {STARK_SYSTEMS.map((sys) => (
            <article key={sys.id} className="stark-system-card">
              {/* Card Conduit Coupling Indicator */}
              <div className="card-conduit-coupler">
                <span className="coupler-ring" />
                <span className="coupler-data-stream" />
              </div>

              {/* Card Topbar */}
              <div className="card-stark-topbar">
                <div className="topbar-identifiers">
                  <span className="system-code-pill">{sys.code}</span>
                  <span className="system-bot-tag">{sys.botSupervisor}</span>
                </div>

                <div className="system-links">
                  {sys.liveUrl && (
                    <a
                      href={sys.liveUrl}
                      target={sys.isInternalDemo ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="btn-stark-link"
                      title="Inspect Live Platform"
                    >
                      <span>LIVE</span>
                      <ExternalLink width={11} height={11} />
                    </a>
                  )}
                  <a
                    href={sys.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-stark-link"
                    title="View Source on GitHub"
                  >
                    <span>SOURCE</span>
                    <Github width={11} height={11} />
                  </a>
                </div>
              </div>

              {/* Title & Status */}
              <div className="system-title-block">
                <h3 className="system-name">{sys.title}</h3>
                <span className="system-status-chip">{sys.status}</span>
              </div>
              <p className="system-subtitle">{sys.subtitle}</p>

              {/* Verified Metrics Pod */}
              <div className="system-metrics-pod">
                {sys.metrics.map((m, idx) => (
                  <div key={idx} className="metric-pod-cell">
                    <span className="cell-num">{m.val}</span>
                    <span className="cell-lbl">{m.label}</span>
                    <span className="cell-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Technical Specification */}
              <div className="system-spec-box">
                <div className="spec-title-bar">
                  <span className="spec-dot" />
                  <span className="spec-heading">ARCHITECTURAL SPECIFICATION:</span>
                </div>
                <p className="spec-text">{sys.architecture}</p>
              </div>

              {/* Tech Tags */}
              <div className="system-tags-row">
                {sys.tags.map((t, idx) => (
                  <span key={idx} className="stark-tech-tag">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
