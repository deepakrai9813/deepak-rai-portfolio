import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Zap, Shield, Database, Server } from "./icons";

const SYSTEMS_DATA = [
  {
    id: "sentinel",
    code: "SYS-01",
    featured: true,
    category: "concurrency",
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
    liveUrl: "#neural-core",
    isInternalDemo: true,
  },
  {
    id: "san-brothers",
    code: "SYS-02",
    featured: false,
    category: "production",
    title: "SAN BROTHERS PLATFORM",
    subtitle: "Enterprise Legal Compliance Platform in Production",
    status: "PRODUCTION LIVE · RANK #1",
    tags: ["React", "Node.js", "Express", "SEO Schema", "Production Deployment"],
    metrics: [
      { label: "GOOGLE SEARCH", val: "#1 RANK", sub: "BRAND KEYWORD DOMINANCE" },
      { label: "LARGEST CONTENTFUL PAINT", val: "0.74s", sub: "100 LIGHTHOUSE SCORE" },
      { label: "UPTIME MONITOR", val: "99.99%", sub: "PRODUCTION VERIFIED" },
    ],
    architecture:
      "Engineered with strict semantic HTML5, JSON-LD structured metadata graphs for search engine entity extraction, zero-overhead CSS architecture, and a hardened Node.js inquiry pipeline equipped with rate-limiting and cryptographic honeypots against automated crawlers. Achieved rank #1 on Google search for brand terms.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://sanbrothers.co.in",
  },
  {
    id: "bian-ai",
    code: "SYS-03",
    featured: false,
    category: "ai",
    title: "BIAN AI — STUDY ACCELERATOR",
    subtitle: "High-Speed LLM Document Engine & Token Streamer",
    status: "PRODUCTION READY · 250+ T/S",
    tags: ["React", "Groq LLM", "Web Workers", "PDF.js", "SSE Streaming"],
    metrics: [
      { label: "FIRST TOKEN", val: "<280ms", sub: "GROQ ACCELERATION" },
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
    code: "SYS-04",
    featured: false,
    category: "production",
    title: "LEADFINDER AI",
    subtitle: "Relational B2B Prospect Discovery Pipeline",
    status: "ACTIVE SYSTEM · <42MS QUERY",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "App Router"],
    metrics: [
      { label: "QUERY RESOLUTION", val: "<42ms", sub: "COMPOSITE B-TREE" },
      { label: "TYPE SAFETY", val: "100%", sub: "END-TO-END TYPESCRIPT" },
      { label: "ARCHITECTURE", val: "Next.js 16", sub: "SERVER COMPONENTS" },
    ],
    architecture:
      "Next.js 16 App Router architecture utilizing React Server Components (RSC) to minimize client-side JavaScript bundle sizes. Relational data layer modeled with Prisma ORM on PostgreSQL with indexed full-text search and transactional deduplication.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://github.com/deepakrai9813",
  },
];

const FILTER_CATEGORIES = [
  { id: "all", label: "00 // ALL BENTO ARCHITECTURES" },
  { id: "concurrency", label: "01 // GO & CONCURRENCY" },
  { id: "production", label: "02 // PRODUCTION DEPLOYMENTS" },
  { id: "ai", label: "03 // AI & DATA PIPELINES" },
];

export default function AwwwardsBentoGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSystems =
    activeFilter === "all"
      ? SYSTEMS_DATA
      : SYSTEMS_DATA.filter((s) => s.category === activeFilter);

  return (
    <section id="bento-systems" className="awwwards-bento-section">
      <div className="container">
        {/* Section Header */}
        <div className="awwwards-section-header">
          <div className="header-eyebrow">
            <span className="eyebrow-num">// 03</span>
            <span>VERIFIED PRODUCTION &amp; HIGH-SCALE SYSTEMS</span>
          </div>
          <h2 className="header-headline">
            THE BENTO ARCHITECTURAL EXHIBITION
          </h2>
          <p className="header-description">
            A curated gallery of distributed reverse proxies, high-concurrency Go services, and live
            enterprise platforms engineered with deterministic fault tolerance and zero-alloc memory.
          </p>
        </div>

        {/* Filter Category Toolbar */}
        <div className="bento-filter-row">
          <span className="filter-prompt">FILTER BY DOMAIN:</span>
          <div className="filter-pill-cluster">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`uiverse-filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="awwwards-bento-grid">
          {filteredSystems.map((item) => (
            <article
              key={item.id}
              className={`bento-cell-card ${item.featured ? "span-two" : ""}`}
            >
              {/* Card Top Line */}
              <div className="bento-card-topbar">
                <div className="bento-code-group">
                  <span className="bento-code-tag">{item.code}</span>
                  <span className="bento-status-badge">{item.status}</span>
                </div>
                <div className="bento-card-actions">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target={item.isInternalDemo ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="bento-action-link"
                      title="Inspect Live System"
                    >
                      <span>LIVE</span>
                      <ExternalLink width={12} height={12} />
                    </a>
                  )}
                  <a
                    href={item.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bento-action-link"
                    title="View Source on GitHub"
                  >
                    <span>SOURCE</span>
                    <Github width={12} height={12} />
                  </a>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="bento-item-title">{item.title}</h3>
              <p className="bento-item-subtitle">{item.subtitle}</p>

              {/* Verified Metrics Strip */}
              <div className="bento-metric-triad">
                {item.metrics.map((m, idx) => (
                  <div key={idx} className="bento-metric-cell">
                    <span className="metric-cell-val">{m.val}</span>
                    <span className="metric-cell-lbl">{m.label}</span>
                    <span className="metric-cell-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Technical Specification */}
              <div className="bento-spec-inset">
                <div className="spec-inset-header">
                  <span className="spec-indicator-dot" />
                  <span className="spec-header-title">ARCHITECTURAL SPECIFICATION:</span>
                </div>
                <p className="spec-inset-text">{item.architecture}</p>
              </div>

              {/* Tech Tags */}
              <div className="bento-tags-cluster">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="uiverse-tech-chip">
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
