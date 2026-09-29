import { Shield, Zap, Activity, Cpu } from "./icons";

const PILLARS = [
  {
    num: "01",
    title: "DETERMINISTIC FAULT TOLERANCE",
    subtitle: "Cascading failure is an engineering choice. We choose resilience.",
    body: "Upstream microservices, network links, and cloud providers will inevitably experience degradation. We engineer autonomous 3-state circuit breakers, sliding-window error detection, and rewindable payload buffers that redirect traffic instantly with 0% dropped transactions.",
    badge: "FAIL-SAFE ARCHITECTURE",
    icon: Shield,
  },
  {
    num: "02",
    title: "ZERO-ALLOCATION CONCURRENCY",
    subtitle: "Garbage collection pauses are eliminated by bypassing the heap.",
    body: "In high-throughput services handling 50K+ concurrent connections, frequent memory allocation triggers stop-the-world GC pauses. By employing sync.Pool byte buffers and lock-free atomic primitives, memory churn is collapsed from dozens of megabytes to under 2MB.",
    badge: "HEAP ELIMINATION",
    icon: Zap,
  },
  {
    num: "03",
    title: "RADICAL OBSERVABILITY",
    subtitle: "If you cannot measure tail latency in nanoseconds, you cannot optimize it.",
    body: "Metric extraction, structural request logs, and distributed tracing are baked directly into network hops with zero external runtime bloat. Full visibility into P99 tail spikes, socket reuse, and goroutine pools without expensive third-party APM overhead.",
    badge: "ZERO-BLINDSPOT METRICS",
    icon: Activity,
  },
  {
    num: "04",
    title: "LEAN COMPILED RUNTIMES",
    subtitle: "Preference for standard libraries over bloated dependency sprawl.",
    body: "Massive node_modules and multi-gigabyte Docker containers introduce security vulnerabilities and slow cold starts. We build single statically-linked binaries (often under 10MB) that boot in 15 milliseconds and run anywhere with zero external dependencies.",
    badge: "MINIMALIST CORE",
    icon: Cpu,
  },
];

export default function AwwwardsManifesto() {
  return (
    <section id="manifesto" className="awwwards-manifesto-section">
      <div className="container">
        {/* Section Header */}
        <div className="awwwards-section-header">
          <div className="header-eyebrow">
            <span className="eyebrow-num">// 05</span>
            <span>CORE ARCHITECTURAL DOCTRINE · AWWWARDS MANIFESTO</span>
          </div>
          <h2 className="header-headline">
            THE ARCHITECTURAL MANIFESTO
          </h2>
          <p className="header-description">
            The foundational design tenets guiding every backend architecture, reverse proxy, and
            distributed system we design and deploy into production.
          </p>
        </div>

        {/* 4-Pillars Card Grid */}
        <div className="manifesto-cards-grid">
          {PILLARS.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.num} className="manifesto-card">
                <div className="card-ambient-glow" />

                <div className="manifesto-top-row">
                  <span className="manifesto-index">{p.num} //</span>
                  <span className="uiverse-badge">{p.badge}</span>
                </div>

                <div className="manifesto-icon-box">
                  <Icon width={22} height={22} />
                </div>

                <h3 className="manifesto-title">{p.title}</h3>
                <h4 className="manifesto-subtitle">{p.subtitle}</h4>
                <p className="manifesto-body">{p.body}</p>

                <div className="manifesto-bottom-border" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
