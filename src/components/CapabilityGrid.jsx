import { useState } from "react";
import { Server, Database, Monitor, ShieldCheck, Zap } from "./icons";

const CAPABILITIES = [
  {
    category: "01 // SYSTEMS & BACKEND CONCURRENCY",
    icon: Server,
    color: "var(--signal-green)",
    items: [
      {
        name: "Go (Golang)",
        level: "Core Production",
        detail: "Goroutines, buffered channels, sync.RWMutex, sync.Pool zero-alloc slices.",
        verifiedIn: "Project Sentinel",
      },
      {
        name: "Circuit Breakers & Proxies",
        level: "Specialized",
        detail: "Custom 3-state failover loops, sliding-window error rates, buffer rewind.",
        verifiedIn: "Project Sentinel",
      },
      {
        name: "Node.js & Express",
        level: "Production",
        detail: "Asynchronous I/O pipelines, token streaming, rate-limiters, honeypots.",
        verifiedIn: "San Brothers & Bian AI",
      },
      {
        name: "WebSockets & SSE",
        level: "Real-time",
        detail: "Bi-directional 60 FPS live telemetry streaming, backpressure control.",
        verifiedIn: "Sentinel Telemetry",
      },
    ],
  },
  {
    category: "02 // DATABASE & PERSISTENCE",
    icon: Database,
    color: "var(--signal-cyan)",
    items: [
      {
        name: "PostgreSQL",
        level: "Production Relational",
        detail: "ACID transactions, B-Tree composite indexes, connection pooling.",
        verifiedIn: "LeadFinder AI",
      },
      {
        name: "Prisma ORM",
        level: "Type-Safe",
        detail: "Strict schema migrations, relation modeling, transactional batching.",
        verifiedIn: "LeadFinder AI",
      },
      {
        name: "MongoDB",
        level: "Document Store",
        detail: "Document aggregations, flexible document schemas, indexing.",
        verifiedIn: "Backend Pipelines",
      },
      {
        name: "Redis",
        level: "In-Memory",
        detail: "Atomic caching layers, TTL invalidation, distributed session store.",
        verifiedIn: "Infrastructure Cache",
      },
    ],
  },
  {
    category: "03 // FRONTEND & APP ARCHITECTURE",
    icon: Monitor,
    color: "var(--signal-orange)",
    items: [
      {
        name: "React 19 & Next.js 16",
        level: "App Router / RSC",
        detail: "React Server Components, streaming Suspense, sub-second LCP.",
        verifiedIn: "LeadFinder & Portfolio",
      },
      {
        name: "TypeScript (Strict)",
        level: "Type-Safe",
        detail: "Strict compiler flags, discriminated unions, zero 'any' policy.",
        verifiedIn: "LeadFinder AI & Sentinel",
      },
      {
        name: "Web Workers & Streams",
        level: "Off-Thread Computing",
        detail: "Off-thread binary PDF chunking, Groq LLM SSE chunk parsers.",
        verifiedIn: "BIAN AI",
      },
      {
        name: "Design Systems & A11y",
        level: "Tactile Industrial",
        detail: "Zero-gradient Swiss typographic grid, WCAG AAA contrast, hardware physics.",
        verifiedIn: "Portfolio Workstation",
      },
    ],
  },
  {
    category: "04 // CHAOS & RELIABILITY ENGINEERING",
    icon: ShieldCheck,
    color: "var(--signal-amber)",
    items: [
      {
        name: "Toxiproxy Chaos Engine",
        level: "Resilience Testing",
        detail: "Simulating 500ms upstream lag, connection resets, and bandwidth drops.",
        verifiedIn: "Project Sentinel",
      },
      {
        name: "Playwright E2E Matrix",
        level: "Automated Verification",
        detail: "Cross-timezone smoke tests, headless browser flow validation.",
        verifiedIn: "Debe Learning",
      },
      {
        name: "Go Race Detector & Benchmarks",
        level: "Quality Discipline",
        detail: "go test -race, micro-benchmarks measuring allocs/op and ns/op.",
        verifiedIn: "Project Sentinel",
      },
      {
        name: "Linux & Docker",
        level: "Deployment",
        detail: "Containerization, minimal scratch images, environment parity.",
        verifiedIn: "Production CI/CD",
      },
    ],
  },
];

export default function CapabilityGrid({ playPop, playClick }) {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="capabilities" className="modern-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">// 04. TECHNICAL VERIFICATION // CAPABILITY MATRIX</div>
          <h2 className="section-headline">
            ENGINEERING DISCIPLINES &amp; COMPETENCIES
          </h2>
          <p className="section-subtext">
            Not empty lists of framework icons, but verified competencies backed by production code, 
            unit tests, and deployed architectures. Click any capability to view its proof.
          </p>
        </div>

        {/* Chassis */}
        <div className="capability-chassis">
          <div className="capability-grid-layout">
            {CAPABILITIES.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.category} className="capability-column">
                  <div className="capability-col-header">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Icon style={{ width: "14px", height: "14px", color: col.color }} />
                      <span style={{ fontSize: "11px", fontWeight: 700 }}>{col.category}</span>
                    </div>
                  </div>

                  <div className="capability-items-list">
                    {col.items.map((item) => {
                      const isSelected = selectedItem === item.name;
                      return (
                        <div
                          key={item.name}
                          className={`capability-item-card ${isSelected ? "highlighted" : ""}`}
                          onClick={() => {
                            playPop?.();
                            setSelectedItem(isSelected ? null : item.name);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <span className="capability-item-name">{item.name}</span>
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "10px",
                                color: isSelected ? "var(--signal-green)" : "var(--text-dim)",
                                fontWeight: 600,
                              }}
                            >
                              {item.level}
                            </span>
                          </div>

                          <div className="capability-item-detail">{item.detail}</div>

                          <div
                            style={{
                              marginTop: "8px",
                              paddingTop: "6px",
                              borderTop: "1px solid var(--border-subtle)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              color: isSelected ? "var(--signal-green)" : "var(--text-dim)",
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <span>VERIFIED IN:</span>
                            <span style={{ fontWeight: 700 }}>{item.verifiedIn}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Verification Banner */}
          <div
            style={{
              padding: "12px 20px",
              borderTop: "1px solid var(--border-base)",
              backgroundColor: "var(--bg-subtle)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--text-dim)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <span>DISCIPLINE VERIFICATION: 16 CORE CAPABILITIES VALIDATED</span>
            <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
              TESTED VIA GO 1.23 &amp; NODE 22 RUNTIMES
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
