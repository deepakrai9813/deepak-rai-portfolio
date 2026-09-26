import { useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import ProjectPreview from "./ProjectPreview";
import GitHubStrip from "./GitHubStrip";
import RevealText from "./RevealText";
import ProjectModal from "./ProjectModal";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Filter,
  Sparkles,
  Layers,
  ShieldCheck,
  LayoutGrid,
  ListIcon,
} from "./icons";

export const PROJECTS = [
  {
    id: "sentinel",
    num: "01",
    title: "Project Sentinel — Resilient API Gateway & Circuit Breaker",
    repo: "https://github.com/deepakrai9813/project-sentinel",
    live: null,
    variant: "sentinel",
    featured: true,
    wide: true,
    category: "Distributed Systems",
    status: "Flagship Project",
    desc: "A lightweight, fault-tolerant reverse proxy and API gateway with a custom 3-state Circuit Breaker (CLOSED/OPEN/HALF-OPEN) built from scratch in Go. Intercepts upstream latency (>200ms) and diverts 100% of requests to backup with zero dropped traffic, powered by a 60 FPS real-time WebSocket telemetry dashboard.",
    tags: ["Go", "Reverse Proxy", "Circuit Breaker", "Gorilla WebSocket", "React 19", "Toxiproxy", "Docker"],
    metrics: [
      { value: "< 200ms", label: "Failover SLA" },
      { value: "0", label: "Dropped Requests" },
      { value: "< 10 MB", label: "Memory Footprint" },
      { value: "60 FPS", label: "Live Telemetry" },
    ],
    deepDive: {
      problem: "In microservice architectures, a single sluggish or crashing upstream service can back up thread pools and cascade into a complete platform outage.",
      solution: "Engineered a reverse proxy in Go featuring net/http, sync.RWMutex concurrency control, and a custom 3-state Circuit Breaker. If the primary service exceeds 200ms or accumulates 5 consecutive failures, the circuit instantly trips to OPEN, routing traffic to a secondary service with rewound request bodies so no client requests are lost.",
      highlights: [
        "Rewindable request body buffering for POST/PUT payloads to ensure zero data loss during failover.",
        "Buffer reuse via sync.Pool, easily maintaining an 8–10 MB memory footprint well inside 128 MB limits.",
        "Live real-time telemetry streaming metrics over WebSockets to a React 19 UI with request counters and latency gauges.",
        "Resilience verified via automated chaos testing using Toxiproxy (500ms latency injections and 20% packet drops).",
      ],
    },
  },
  {
    id: "san-brothers",
    num: "02",
    title: "SAN BROTHERS Corporate Solutions",
    repo: null,
    live: "https://sanbrotherscorporatesolutions.in",
    image: "projects/san-brothers.jpg",
    featured: true,
    wide: true,
    category: "Full-Stack & Web",
    status: "Live in Production",
    desc: "Production compliance and corporate legal governance platform for a Company Secretary practice serving enterprises across India. Features dedicated corporate service workflows, automated inquiry pipelines, and technical SEO architecture that ranks #1 on Google for its brand.",
    tags: ["Full-Stack", "SEO Architecture", "Production", "Custom Domain", "Rank #1 Google"],
    metrics: [
      { value: "#1", label: "Google Search Rank" },
      { value: "100%", label: "Uptime & Production" },
      { value: "< 1s", label: "Initial Page Load" },
      { value: "Enterprise", label: "Corporate Legal" },
    ],
    deepDive: {
      problem: "Traditional corporate secretarial and legal practices struggle with scattered client inquiries, outdated brochures, and poor online discoverability.",
      solution: "Designed and developed an end-to-end corporate solutions portal with dedicated service pages, streamlined statutory compliance inquiry funnels, and optimized schema markup.",
      highlights: [
        "Architected responsive design with high-contrast accessibility and mobile-first experience.",
        "Structured SEO metadata, sitemaps, and OpenGraph tags to achieve #1 brand search ranking.",
        "Deployed on high-performance infrastructure with automated SSL and edge caching.",
      ],
    },
  },
  {
    id: "bian",
    num: "03",
    title: "BIAN AI — Intelligent Study Assistant",
    repo: "https://github.com/deepakrai9813/AI_PROJECT",
    live: null,
    variant: "bian",
    wide: false,
    category: "AI & LLMs",
    status: "Open Source",
    desc: "Next-gen AI learning companion that parses textbooks and lecture PDFs to deliver token-by-token streaming explanations, contextual chapter summaries, interactive practice quizzes, and spaced-repetition flashcards powered by high-speed Groq LLMs.",
    tags: ["React 19", "Vite", "Express", "Groq LLM", "Streaming API", "pdf.js"],
    metrics: [
      { value: "Instant", label: "Token Streaming" },
      { value: "PDF", label: "Client Ingestion" },
      { value: "Groq", label: "Ultra-fast Inference" },
    ],
    deepDive: {
      problem: "Students spend hours extracting key takeaways from dense 50+ page PDFs, with traditional chat interfaces failing to stream long responses cleanly.",
      solution: "Integrated client-side pdf.js text chunking with a lightweight Node/Express streaming proxy to Groq LLMs for sub-second latency and interactive study modes.",
      highlights: [
        "Real-time token streaming using server-sent chunks for smooth reading without UI freezing.",
        "Automated quiz generator with dynamic score calculation and instant flashcard deck synthesis.",
        "Clean, distraction-free study interface with dark and light study modes.",
      ],
    },
  },
  {
    id: "leadfinder",
    num: "04",
    title: "LeadFinder AI — Automated Business Prospecting",
    repo: "https://github.com/deepakrai9813/leadfinder-ai",
    live: null,
    variant: "leadfinder",
    wide: false,
    category: "AI & LLMs",
    status: "Open Source",
    desc: "AI-powered sales intelligence platform designed to discover brick-and-mortar businesses lacking digital presence, evaluate website gaps via automated LLM analysis, and generate hyper-personalized email and WhatsApp outreach copy.",
    tags: ["Next.js 16", "TypeScript", "Prisma", "NextAuth.js", "Tailwind CSS"],
    metrics: [
      { value: "Next.js 16", label: "App Router" },
      { value: "Prisma", label: "Type-Safe ORM" },
      { value: "Auto-AI", label: "Outreach Generation" },
    ],
    deepDive: {
      problem: "Small agency owners spend tedious hours manual prospecting and writing repetitive cold outreach emails with low response rates.",
      solution: "Engineered a Next.js 16 application with Prisma and PostgreSQL that automates business discovery, website scoring, and tailored pitch generation.",
      highlights: [
        "Google OAuth integration with NextAuth.js for secure session and team management.",
        "Prisma schema with relational models for leads, campaigns, and outreach audit logs.",
        "One-click multi-channel outreach export (Email and WhatsApp ready).",
      ],
    },
  },
  {
    id: "debe",
    num: "05",
    title: "Debe Learning — Session Reschedule Engine",
    repo: "https://github.com/deepakrai9813/debe-learning-tech-intern-assessment",
    live: "https://debe-learning-tech-intern-assessmen.vercel.app",
    variant: "debe",
    wide: false,
    category: "Full-Stack & Web",
    status: "Live Demo",
    desc: "Parent-facing scheduling widget for tutoring sessions — displays upcoming lessons, enforces strict 2-hour lead-time reschedule lockouts, guarantees UTC-safe date calculations, and includes automated Playwright smoke tests.",
    tags: ["Next.js", "TypeScript", "Firebase", "Cloud Functions", "Playwright"],
    metrics: [
      { value: "UTC Safe", label: "Timezone Engine" },
      { value: "100%", label: "TypeScript Strict" },
      { value: "E2E", label: "Playwright Tested" },
    ],
    deepDive: {
      problem: "Last-minute tutoring session cancellations create scheduling chaos and tutor downtime without strict business-rule enforcement.",
      solution: "Implemented an airtight scheduling UI with client/server validation enforcing the 2-hour cutoff rule, cross-timezone consistency, and automated end-to-end tests.",
      highlights: [
        "Comprehensive Playwright smoke tests testing optimistic updates and error state recovery.",
        "Firebase Cloud Functions backing state synchronization with sub-second response times.",
        "Clean UX with visual timeline pills indicating available vs. locked time slots.",
      ],
    },
  },
];

const CATEGORIES = ["All", "Distributed Systems", "Full-Stack & Web", "AI & LLMs"];

export default function Works({
  selectedProjectId,
  onOpenProjectModal,
  highlightedSkill,
  playPop,
  playClick,
}) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalProject, setModalProject] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
  const [hoveredProject, setHoveredProject] = useState(null);
  const listRef = useRef(null);

  // Sync with external trigger (e.g. from CommandPalette)
  const activeModalProject = useMemo(() => {
    if (selectedProjectId) {
      return PROJECTS.find((p) => p.id === selectedProjectId) || null;
    }
    return modalProject;
  }, [selectedProjectId, modalProject]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === "All" || p.category === activeCategory;
      const matchesSkill = !highlightedSkill || p.tags.some((t) =>
        t.toLowerCase().includes(highlightedSkill.toLowerCase())
      );
      return matchesCategory && matchesSkill;
    });
  }, [activeCategory, highlightedSkill]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    playPop?.();
  };

  const handleOpenModal = (project) => {
    setModalProject(project);
    onOpenProjectModal?.(project.id);
    playClick?.();
  };

  const handleCloseModal = () => {
    setModalProject(null);
    onOpenProjectModal?.(null);
  };

  return (
    <section className="works" id="work" aria-label="Selected work">
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
              <span className="idx">03</span> — Selected Work &amp; Architecture
            </p>
            <RevealText
              as="h2"
              className="section-title"
              parts={[{ t: "Engineered for scale & precision" }]}
              delay={0.05}
            />
          </div>

          <div className="works__head-actions">
            {/* View Mode Switcher (Awwwards Dennis Snellenberg Signature) */}
            <div className="works__view-toggle" role="group" aria-label="View mode">
              <button
                className={`view-btn${viewMode === "grid" ? " is-active" : ""}`}
                onClick={() => {
                  setViewMode("grid");
                  playPop?.();
                }}
                title="Grid Card View"
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid width={15} height={15} /> Grid
              </button>
              <button
                className={`view-btn${viewMode === "list" ? " is-active" : ""}`}
                onClick={() => {
                  setViewMode("list");
                  playPop?.();
                }}
                title="Editorial Table View"
                aria-pressed={viewMode === "list"}
              >
                <ListIcon width={15} height={15} /> List
              </button>
            </div>

            <a
              href="https://github.com/deepakrai9813?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
              onClick={playClick}
            >
              <Github width={16} height={16} /> All Repositories
            </a>
          </div>
        </motion.div>

        {/* Filter Pills */}
        <div className="works__filters" role="tablist" aria-label="Project categories">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                className={`filter-pill${isActive ? " is-active" : ""}`}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat === "Distributed Systems" && <ShieldCheck width={14} height={14} />}
                {cat === "AI & LLMs" && <Sparkles width={14} height={14} />}
                {cat}
                {isActive && (
                  <motion.span
                    className="filter-pill-bg"
                    layoutId="filter-pill-bg"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {highlightedSkill && (
          <div className="works__skill-banner">
            <span>
              Filtering by technology: <strong>{highlightedSkill}</strong>
            </span>
            <button
              onClick={() => handleCategoryClick("All")}
              className="btn-clear-filter"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* View Mode Rendering: Grid vs List */}
        {viewMode === "grid" ? (
          <motion.div layout className="works__grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  onDeepDive={() => handleOpenModal(p)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="works__list-view" ref={listRef}>
            <div className="works__list-head">
              <span className="col-idx">#</span>
              <span className="col-name">Project &amp; Overview</span>
              <span className="col-cat">Category</span>
              <span className="col-tags">Key Stack</span>
              <span className="col-action">Case Study</span>
            </div>

            <div className="works__list-rows">
              {filteredProjects.map((p) => (
                <div
                  key={p.id}
                  className="project-row"
                  onClick={() => handleOpenModal(p)}
                  onMouseEnter={() => setHoveredProject(p)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <span className="col-idx">{p.num}</span>
                  <div className="col-name">
                    <h4>
                      {p.title}{" "}
                      {p.status && <span className="row-badge">{p.status}</span>}
                    </h4>
                    <p>{p.desc.slice(0, 110)}…</p>
                  </div>
                  <span className="col-cat">{p.category}</span>
                  <div className="col-tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span className="tag tag--sm" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="col-action">
                    <button className="row-arrow-btn" aria-label="Open case study">
                      <ArrowUpRight width={17} height={17} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating hover thumbnail preview */}
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  className="works__floating-preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  {hoveredProject.image ? (
                    <img src={hoveredProject.image} alt={hoveredProject.title} />
                  ) : (
                    <ProjectPreview variant={hoveredProject.variant} />
                  )}
                  <div className="floating-preview__overlay">
                    <strong>{hoveredProject.title}</strong>
                    <span>Click to open case study</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <GitHubStrip />
      </div>

      <ProjectModal
        project={activeModalProject}
        isOpen={Boolean(activeModalProject)}
        onClose={handleCloseModal}
      />
    </section>
  );
}

function ProjectCard({ project: p, index: i, onDeepDive }) {
  const cardRef = useRef(null);
  const previewRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: previewRef,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const href = p.live || p.repo;

  // Linear-style cursor spotlight effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <motion.article
      layout
      ref={cardRef}
      className={`project project--spotlight${p.wide ? " project--wide" : ""}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.55, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="project__preview"
        ref={previewRef}
        onClick={onDeepDive}
        role="button"
        tabIndex={0}
        aria-label={`Open case study for ${p.title}`}
        onKeyDown={(e) => e.key === "Enter" && onDeepDive()}
      >
        {p.status && (
          <span className="project__badge">
            <i aria-hidden="true" /> {p.status}
          </span>
        )}
        <motion.div className="project__parallax" style={{ y: parallaxY }}>
          {p.image ? (
            <img
              className="project__shot"
              src={p.image}
              alt={`${p.title} preview`}
              loading="lazy"
            />
          ) : (
            <ProjectPreview variant={p.variant} />
          )}
        </motion.div>
        <span className="project__click-hint">
          <Layers width={14} height={14} /> Click for Case Study &amp; Metrics
        </span>
      </div>

      <div className="project__meta">
        <h3 onClick={onDeepDive} role="button" tabIndex={0}>
          {p.title} <span className="project__slash">/</span>
        </h3>
        <button
          className="project__deep-btn"
          onClick={onDeepDive}
          title="Open Case Study & Architecture"
        >
          Case Study <ArrowUpRight width={16} height={16} />
        </button>
      </div>

      <p className="project__desc">{p.desc}</p>

      {/* Metrics mini-bar */}
      {p.metrics && (
        <div className="project__quick-metrics">
          {p.metrics.slice(0, 3).map((m) => (
            <span key={m.label} className="quick-metric">
              <strong>{m.value}</strong> <small>{m.label}</small>
            </span>
          ))}
        </div>
      )}

      <div className="project__links">
        {p.repo && (
          <a href={p.repo} target="_blank" rel="noreferrer">
            <Github width={15} height={15} /> Source
          </a>
        )}
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer" className="live">
            <ExternalLink width={15} height={15} /> Live Project
          </a>
        )}
        <button className="project__link-deep" onClick={onDeepDive}>
          Architecture
        </button>
      </div>

      <div className="project__tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
