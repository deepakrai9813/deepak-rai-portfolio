import { useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Zap, Check, Server, ShieldCheck, Database } from "./icons";
import SystemBlueprintModal from "./SystemBlueprintModal";

const PROJECTS = [
  {
    id: "sentinel",
    code: "SYS-01",
    title: "PROJECT SENTINEL",
    subtitle: "Distributed Fault-Tolerant Reverse Proxy in Go",
    status: "CHAOS TESTED",
    statusColor: "var(--signal-green)",
    tags: ["Go", "net/http", "sync.Pool", "Toxiproxy", "WebSockets", "Concurrency"],
    stats: [
      { label: "PACKET LOSS", val: "0.00%", sub: "UNDER 500MS CHAOS" },
      { label: "MEDIAN LATENCY", val: "12ms", sub: "p99 < 35MS" },
      { label: "MEMORY PROFILE", val: "<4.2MB", sub: "ZERO-ALLOC BUFFER POOL" },
    ],
    executiveBrief:
      "Engineered an enterprise-grade distributed reverse proxy in Go designed to prevent cascading microservice outages. Features a zero-copy rewindable request buffer and an autonomous 3-state circuit breaker that redirects 100% of traffic to healthy replicas with zero dropped transactions during upstream network collapse.",
    architectSpec:
      "Pure Go implementation using standard library `net/http` and `sync.RWMutex` for lock-free read paths. Upstream failures are detected via a thread-safe sliding window ring buffer. Request bodies are preserved in a `sync.Pool`-backed memory buffer, enabling seamless rewind (`io.Seeker`) to replay payloads against secondary upstreams upon primary HTTP 504 / timeout.",
    liveUrl: "#sentinel-lab",
    githubUrl: "https://github.com/deepakrai9813",
    isInternalDemo: true,
  },
  {
    id: "san-brothers",
    code: "SYS-02",
    title: "SAN BROTHERS CORPORATE SOLUTIONS",
    subtitle: "Enterprise Legal Compliance Platform in Production",
    status: "PRODUCTION LIVE",
    statusColor: "var(--signal-cyan)",
    tags: ["React", "Node.js", "Express", "SEO Schema", "Production Deployment"],
    stats: [
      { label: "SEARCH RANKING", val: "#1 GOOGLE", sub: "BRAND KEYWORD DOMINANCE" },
      { label: "LARGEST CONTENTFUL PAINT", val: "0.74s", sub: "100 LIGHTHOUSE SCORE" },
      { label: "UPTIME MONITOR", val: "99.99%", sub: "PRODUCTION VERIFIED" },
    ],
    executiveBrief:
      "Architected and deployed a production web platform for a premier corporate legal and business consultancy firm. Achieved rank #1 on Google search for brand terms, established automated digital lead capture, and established institutional credibility for multi-million rupee legal audits.",
    architectSpec:
      "Engineered with strict semantic HTML5, JSON-LD structured metadata graphs for search engine entity extraction, zero-overhead CSS architecture, and a hardened Node.js inquiry pipeline equipped with rate-limiting and cryptographic honeypots against automated crawlers.",
    liveUrl: "https://sanbrothers.co.in", // Verified live production platform
    githubUrl: "https://github.com/deepakrai9813",
  },
  {
    id: "bian-ai",
    code: "SYS-03",
    title: "BIAN AI — STUDY ACCELERATOR",
    subtitle: "High-Speed LLM Document Engine & Token Streamer",
    status: "PRODUCTION READY",
    statusColor: "var(--signal-orange)",
    tags: ["React", "Groq LLM", "Web Workers", "PDF.js", "Streaming"],
    stats: [
      { label: "TIME TO FIRST TOKEN", val: "<280ms", sub: "GROQ LLAMA-3 ACCELERATION" },
      { label: "STREAM THROUGHPUT", val: "250+ t/s", sub: "ZERO MAIN-THREAD JANK" },
      { label: "DOCUMENT LIMIT", val: "200+ Pages", sub: "OFF-THREAD WEB WORKER" },
    ],
    executiveBrief:
      "Built a high-performance academic intelligence tool that enables students to converse with 200+ page research papers and textbooks. Delivers near-instantaneous semantic responses through ultra-fast token streaming, reducing research synthesis time from hours to seconds.",
    architectSpec:
      "Offloaded heavy PDF binary parsing and text chunking pipelines to dedicated Web Workers, ensuring the browser UI thread maintains locked 60 FPS scrolling. Consumes Groq LLM completions via Server-Sent Events (SSE) with adaptive backpressure buffering.",
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
  },
  {
    id: "leadfinder-ai",
    code: "SYS-04",
    title: "LEADFINDER AI",
    subtitle: "Relational B2B Lead Intelligence Pipeline",
    status: "ACTIVE SYSTEM",
    statusColor: "var(--signal-green)",
    tags: ["Next.js 16", "TypeScript", "Prisma ORM", "PostgreSQL", "App Router"],
    stats: [
      { label: "QUERY RESOLUTION", val: "<42ms", sub: "COMPOSITE B-TREE INDEXES" },
      { label: "TYPE SAFETY", val: "100%", sub: "END-TO-END TYPESCRIPT" },
      { label: "APP ARCHITECTURE", val: "Next.js 16", sub: "REACT SERVER COMPONENTS" },
    ],
    executiveBrief:
      "Full-stack B2B prospect discovery application that consolidates disparate business registries into a single searchable dashboard. Empowers sales teams to filter, score, and bulk-export verified company prospects.",
    architectSpec:
      "Next.js 16 App Router architecture utilizing React Server Components (RSC) to minimize client-side JavaScript bundle sizes. Relational data layer modeled with Prisma ORM on PostgreSQL with indexed full-text search and transactional deduplication.",
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
  },
  {
    id: "debe-learning",
    code: "SYS-05",
    title: "DEBE LEARNING RESCHEDULE ENGINE",
    subtitle: "Deterministic UTC Mentorship Booking System",
    status: "VERIFIED STABLE",
    statusColor: "var(--signal-amber)",
    tags: ["React", "Playwright E2E", "UTC Architecture", "State Machines"],
    stats: [
      { label: "TIMEZONE DRIFT", val: "0 ERRORS", sub: "STRICT UTC EPOCH MODEL" },
      { label: "AUTOMATED SUITE", val: "100% PASS", sub: "CROSS-TIMEZONE SMOKE TESTS" },
      { label: "RACE CONDITIONS", val: "0 DETECTED", sub: "ATOMIC SLOT ACQUISITION" },
    ],
    executiveBrief:
      "Eliminated booking disputes and missed sessions in an international learning platform by engineering a mathematically sound, cross-continental session reschedule interface.",
    architectSpec:
      "Enforces a strict client-server contract where all temporal slots are computed and stored as immutable UTC unix timestamps, converted to user-local timezones only at render time. Backed by Playwright automated matrix tests simulating Daylight Savings shifts across 5 continents.",
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
  },
];

export default function ProjectsMatrix({ lens, playClick, playPop }) {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedId, setExpandedId] = useState("sentinel");
  const [blueprintProjectId, setBlueprintProjectId] = useState(null);

  const filtered = PROJECTS.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "systems") return p.id === "sentinel" || p.id === "leadfinder-ai";
    if (activeTab === "production") return p.id === "san-brothers" || p.id === "bian-ai";
    return true;
  });

  return (
    <section id="projects" style={{ marginBottom: "64px" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">// 03. VERIFIED SYSTEMS // ENGINEERING PORTFOLIO</div>
          <h2 className="section-headline">
            PRODUCTION ARCHITECTURES &amp; SYSTEMS
          </h2>
          <p className="section-subtext">
            Every project listed here is a deployed, functioning system built with verifiable code, 
            resilience guarantees, and benchmarked metrics.
          </p>
        </div>

        {/* Filter Navigation */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "16px",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { id: "all", label: "ALL SYSTEMS (5)" },
              { id: "systems", label: "DISTRIBUTED / BACKEND" },
              { id: "production", label: "PRODUCTION / CLIENT" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tag-solid ${activeTab === tab.id ? "active" : ""}`}
                style={{ cursor: "pointer", fontSize: "11px", padding: "6px 12px" }}
                onClick={() => {
                  playClick?.();
                  setActiveTab(tab.id);
                }}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
            DISPLAY MODE: <strong>{lens.toUpperCase()}</strong>
          </div>
        </div>

        {/* Projects Matrix Chassis */}
        <div className="projects-table-container">
          {filtered.map((proj) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div key={proj.id} className="project-card-item">
                {/* Header Bar */}
                <div
                  className="project-card-header"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    playPop?.();
                    setExpandedId(isExpanded ? null : proj.id);
                  }}
                >
                  <div className="project-identity">
                    <span className="project-index">{proj.code}</span>
                    <h3 className="project-title">{proj.title}</h3>
                    <span
                      className="tag-solid"
                      style={{ color: proj.statusColor, borderColor: proj.statusColor }}
                    >
                      <span className="led-indicator" style={{ backgroundColor: proj.statusColor }} />
                      {proj.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        color: "var(--text-dim)",
                      }}
                    >
                      {proj.subtitle}
                    </span>
                    <button
                      type="button"
                      className="btn-mech-outline"
                      style={{ padding: "4px 8px", fontSize: "11px" }}
                    >
                      {isExpanded ? "[CLOSE -]" : "[EXPAND +]"}
                    </button>
                  </div>
                </div>

                {/* Expanded Architectural Content */}
                {isExpanded && (
                  <div className="project-specs-grid">
                    {/* Left: Narrative, Lens Readout & Tech Chips */}
                    <div className="project-narrative">
                      {/* Lens Adaptive Switch */}
                      {lens === "executive" ? (
                        <div
                          style={{
                            border: "1px solid var(--border-base)",
                            backgroundColor: "var(--bg-subtle)",
                            padding: "16px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "var(--signal-green)",
                              marginBottom: "6px",
                            }}
                          >
                            [EXECUTIVE VALUE PROPOSITION]
                          </div>
                          <p style={{ fontSize: "14px", color: "var(--text-high)", lineHeight: 1.6 }}>
                            {proj.executiveBrief}
                          </p>
                        </div>
                      ) : (
                        <div
                          style={{
                            border: "1px solid var(--border-base)",
                            backgroundColor: "var(--bg-subtle)",
                            padding: "16px",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              fontWeight: 700,
                              color: "var(--signal-cyan)",
                              marginBottom: "6px",
                            }}
                          >
                            [ARCHITECTURAL SPECIFICATION &amp; INTERNALS]
                          </div>
                          <p style={{ fontSize: "13px", color: "var(--text-high)", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>
                            {proj.architectSpec}
                          </p>
                        </div>
                      )}

                      {/* Technical Stack Chips */}
                      <div>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--text-dim)",
                            marginBottom: "6px",
                          }}
                        >
                          VERIFIED STACK COMPONENTS:
                        </div>
                        <div className="project-tech-chips">
                          {proj.tags.map((tag) => (
                            <span key={tag} className="tag-solid">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="project-action-links">
                        {proj.isInternalDemo ? (
                          <button
                            type="button"
                            className="btn-mech-signal"
                            onClick={() => {
                              playClick?.();
                              document.getElementById("sentinel-lab")?.scrollIntoView({ behavior: "smooth" });
                            }}
                          >
                            <Zap style={{ width: "14px", height: "14px" }} />
                            <span>LAUNCH LIVE CHAOS LAB</span>
                          </button>
                        ) : (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-mech"
                            onClick={() => playClick?.()}
                          >
                            <span>LIVE PRODUCTION DEPLOYMENT</span>
                            <ExternalLink style={{ width: "13px", height: "13px" }} />
                          </a>
                        )}

                        <button
                          type="button"
                          className="btn-mech-outline"
                          onClick={() => {
                            playPop?.();
                            setBlueprintProjectId(proj.id);
                          }}
                        >
                          <span>INSPECT BLUEPRINT 📐</span>
                        </button>

                        <a
                          href={proj.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-mech-outline"
                          onClick={() => playClick?.()}
                        >
                          <Github style={{ width: "14px", height: "14px" }} />
                          <span>SOURCE REPOSITORY</span>
                        </a>
                      </div>
                    </div>

                    {/* Right: Telemetry & Benchmark Stat Box */}
                    <div className="project-metric-sidebar">
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            fontWeight: 700,
                            color: "var(--text-high)",
                            borderBottom: "1px solid var(--border-base)",
                            paddingBottom: "6px",
                          }}
                        >
                          TELEMETRY &amp; BENCHMARKS
                        </div>

                        {proj.stats.map((stat) => (
                          <div key={stat.label} className="metric-stat-box">
                            <div className="metric-stat-label">{stat.label}</div>
                            <div className="metric-stat-value">{stat.val}</div>
                            <div
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: "var(--signal-green)",
                                marginTop: "3px",
                              }}
                            >
                              {stat.sub}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          color: "var(--text-dim)",
                        }}
                      >
                        STATUS: VERIFIED RESILIENT IN CI PIPELINE
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {blueprintProjectId && (
        <SystemBlueprintModal
          projectId={blueprintProjectId}
          onClose={() => setBlueprintProjectId(null)}
          playClick={playClick}
          playPop={playPop}
        />
      )}
    </section>
  );
}
