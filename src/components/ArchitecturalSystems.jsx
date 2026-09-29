import { useState } from "react";
import { ArrowUpRight, Github, ExternalLink, Zap, Shield, Database, Server } from "./icons";

const SYSTEMS_CATALOG = [
  {
    id: "sentinel",
    index: "SYS-01",
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
    liveUrl: "#lattice",
    isInternalDemo: true,
  },
  {
    id: "san-brothers",
    index: "SYS-02",
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
      "Engineered with strict semantic HTML5, JSON-LD structured metadata graphs for search engine entity extraction, zero-overhead CSS architecture, and a hardened Node.js inquiry pipeline equipped with rate-limiting and cryptographic honeypots against automated crawlers. Achieved rank #1 on Google search for brand terms and established automated digital lead capture.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://sanbrothers.co.in",
  },
  {
    id: "bian-ai",
    index: "SYS-03",
    category: "ai",
    title: "BIAN AI — STUDY ACCELERATOR",
    subtitle: "High-Speed LLM Document Engine & Token Streamer",
    status: "PRODUCTION READY · 250+ T/S",
    tags: ["React", "Groq LLM", "Web Workers", "PDF.js", "SSE Streaming"],
    metrics: [
      { label: "TIME TO FIRST TOKEN", val: "<280ms", sub: "GROQ LLAMA-3 ACCELERATION" },
      { label: "STREAM THROUGHPUT", val: "250+ t/s", sub: "ZERO MAIN-THREAD JANK" },
      { label: "DOCUMENT LIMIT", val: "200+ Pages", sub: "OFF-THREAD WEB WORKER" },
    ],
    architecture:
      "Offloaded heavy PDF binary parsing and text chunking pipelines to dedicated Web Workers, ensuring the browser UI thread maintains locked 60 FPS scrolling. Consumes Groq LLM completions via Server-Sent Events (SSE) with adaptive backpressure buffering, allowing students to converse with 200+ page research papers seamlessly.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://github.com/deepakrai9813",
  },
  {
    id: "leadfinder-ai",
    index: "SYS-04",
    category: "production",
    title: "LEADFINDER AI",
    subtitle: "Relational B2B Prospect Discovery Pipeline",
    status: "ACTIVE SYSTEM · <42MS QUERY",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "App Router"],
    metrics: [
      { label: "QUERY RESOLUTION", val: "<42ms", sub: "COMPOSITE B-TREE INDEXES" },
      { label: "TYPE SAFETY", val: "100%", sub: "END-TO-END TYPESCRIPT" },
      { label: "APP ARCHITECTURE", val: "Next.js 16", sub: "REACT SERVER COMPONENTS" },
    ],
    architecture:
      "Next.js 16 App Router architecture utilizing React Server Components (RSC) to minimize client-side JavaScript bundle sizes. Relational data layer modeled with Prisma ORM on PostgreSQL with indexed full-text search and transactional deduplication, consolidating disparate business registries into a unified dashboard.",
    githubUrl: "https://github.com/deepakrai9813",
    liveUrl: "https://github.com/deepakrai9813",
  },
];

const CATEGORIES = [
  { id: "all", label: "00 // ALL ARCHITECTURES" },
  { id: "concurrency", label: "01 // GO & CONCURRENCY" },
  { id: "production", label: "02 // PRODUCTION DEPLOYMENTS" },
  { id: "ai", label: "03 // AI & DATA PIPELINES" },
];

export default function ArchitecturalSystems() {
  const [filter, setFilter] = useState("all");

  const filteredSystems =
    filter === "all"
      ? SYSTEMS_CATALOG
      : SYSTEMS_CATALOG.filter((s) => s.category === filter);

  return (
    <section id="systems" className="spatial-systems-section">
      <div className="container">
        {/* Section Header */}
        <div className="spatial-section-header">
          <div className="section-kicker">
            <span className="kicker-index">// 03</span>
            <span>VERIFIED PRODUCTION & HIGH-SCALE PLATFORMS</span>
          </div>
          <h2 className="spatial-section-title">
            FLAGSHIP ARCHITECTURAL SYSTEMS
          </h2>
          <p className="spatial-section-desc">
            A curated index of distributed reverse proxies, high-concurrency Go services, and live
            enterprise platforms engineered with deterministic fault tolerance and zero-alloc memory.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="systems-filter-bar">
          <span className="filter-label">CATEGORY FILTER:</span>
          <div className="filter-btn-group">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${filter === cat.id ? "active" : ""}`}
                onClick={() => setFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Systems Grid */}
        <div className="spatial-systems-grid">
          {filteredSystems.map((sys) => (
            <article key={sys.id} className="system-monolith-card">
              {/* Card Header */}
              <div className="card-topline">
                <div className="card-sys-index">
                  <span className="code-badge">{sys.index}</span>
                  <span className="sys-status">{sys.status}</span>
                </div>
                <div className="card-actions-quick">
                  {sys.liveUrl && (
                    <a
                      href={sys.liveUrl}
                      target={sys.isInternalDemo ? "_self" : "_blank"}
                      rel="noreferrer"
                      className="quick-link-btn"
                      title="Inspect Live System"
                    >
                      <span>LIVE</span>
                      <ExternalLink width={12} height={12} />
                    </a>
                  )}
                  <a
                    href={sys.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="quick-link-btn"
                    title="View Source on GitHub"
                  >
                    <span>SOURCE</span>
                    <Github width={12} height={12} />
                  </a>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="card-sys-title">{sys.title}</h3>
              <p className="card-sys-subtitle">{sys.subtitle}</p>

              {/* Verified Metrics Strip */}
              <div className="card-metrics-strip">
                {sys.metrics.map((m, idx) => (
                  <div key={idx} className="metric-chip">
                    <span className="metric-chip-val">{m.val}</span>
                    <span className="metric-chip-lbl">{m.label}</span>
                    <span className="metric-chip-sub">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* Architectural Technical Specification */}
              <div className="card-spec-box">
                <div className="spec-box-header">
                  <span className="spec-dot" />
                  <span className="spec-title">ARCHITECTURAL SPECIFICATION:</span>
                </div>
                <p className="spec-body">{sys.architecture}</p>
              </div>

              {/* Tech Tags */}
              <div className="card-tags-list">
                {sys.tags.map((t, idx) => (
                  <span key={idx} className="sys-tag">
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
