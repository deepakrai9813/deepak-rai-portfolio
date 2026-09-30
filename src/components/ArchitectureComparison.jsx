import { useState } from "react";

export default function ArchitectureComparison() {
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState("after");
  const [selectedBottleneck, setSelectedBottleneck] = useState(0);

  const metrics = [
    {
      metric: "p95 API & Query Latency",
      before: "1,850 ms",
      after: "210 ms",
      delta: "8.8x Faster",
      positive: true,
      unit: "Milliseconds",
    },
    {
      metric: "Dealer / Client Onboarding",
      before: "7 Business Days",
      after: "< 12 Minutes",
      delta: "84x Acceleration",
      positive: true,
      unit: "Turnaround Time",
    },
    {
      metric: "Inventory Sync Reliability",
      before: "81.6% (Silent Drops)",
      after: "99.999% (Idempotent)",
      delta: "Zero Data Loss",
      positive: true,
      unit: "Data Consistency",
    },
    {
      metric: "System Availability (SLA)",
      before: "94.2% (Frequent Outages)",
      after: "99.98% (Multi-AZ)",
      delta: "+5.78% Uptime",
      positive: true,
      unit: "Cluster Availability",
    },
  ];

  const architecturalSolutions = [
    {
      title: "N+1 Database Query Elimination",
      tag: "DATABASE ARCHITECTURE",
      problem: "Legacy ORM triggered 200+ unindexed queries per dashboard load, causing table locks.",
      solution: "Engineered single-pass query batching with PostgreSQL covering indexes and Redis read-through caching. Query times dropped from 1.85s to 18ms.",
      code: "CREATE INDEX CONCURRENTLY idx_orders_dealer_status ON orders(dealer_id, status) INCLUDE (total_amount, created_at);",
    },
    {
      title: "Event-Driven Async Order Pipeline",
      tag: "DISTRIBUTED BACKEND",
      problem: "Synchronous HTTP calls blocked order submission whenever invoice PDF generation delayed.",
      solution: "Decoupled checkout with RabbitMQ message queue and Redis distributed locking. Orders acknowledge in < 45ms while workers generate invoices asynchronously.",
      code: "await redisLock.acquire(`lock:order:${orderId}`, 5000);\nawait orderQueue.publish('order.created', payload);",
    },
    {
      title: "Automated KYC & Digital Signature Engine",
      tag: "FULL STACK ENGINE",
      problem: "Manual human verification created a 7-day backlog for distributor onboarding.",
      solution: "Architected real-time optical character recognition, document hashing, and multi-tier approval workflows with React 19 and Node.js microservices.",
      code: "const verifiedPayload = await kycPipeline.verifyDocument(fileStream, {\n  strictChecksum: true,\n  auditTrail: true\n});",
    },
  ];

  return (
    <div className="architecture-comparison-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>ENGINEERING CASE STUDY</span>
        </div>
        <h2 className="section-heading-title">Architecture Modernization: Before vs. After</h2>
        <p className="section-subtitle-text">
          How I transformed San Brothers' fragmented legacy monolith into a resilient, sub-quarter-second distributed platform.
        </p>
      </div>

      {/* 1. Comparison Mode Switcher */}
      <div className="arch-switch-bar">
        <div className="arch-view-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "before"}
            className={`arch-view-btn ${activeTab === "before" ? "active legacy" : ""}`}
            onClick={() => { setActiveTab("before"); setSliderPos(0); }}
          >
            <span className="indicator-dot legacy" />
            <span>Legacy Monolith (Before)</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "split"}
            className={`arch-view-btn ${activeTab === "split" ? "active" : ""}`}
            onClick={() => { setActiveTab("split"); setSliderPos(50); }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="3" x2="12" y2="21" />
              <polyline points="8 8 4 12 8 16" />
              <polyline points="16 8 20 12 16 16" />
            </svg>
            <span>Interactive Split Slider</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "after"}
            className={`arch-view-btn ${activeTab === "after" ? "active modern" : ""}`}
            onClick={() => { setActiveTab("after"); setSliderPos(100); }}
          >
            <span className="indicator-dot modern" />
            <span>Modern Reactive Stack (After)</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Interactive Slider / Split Deck */}
      <div className="arch-cards-split-deck">
        {/* Left Side: Legacy */}
        <div
          className={`arch-side-card legacy-card ${activeTab === "after" ? "dimmed" : ""}`}
          style={{ opacity: activeTab === "after" ? 0.35 : 1 }}
        >
          <div className="card-top-header">
            <span className="arch-status-pill danger">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>LEGACY ARCHITECTURE</span>
            </span>
            <span className="arch-stack-tag">PHP 7.2 • MySQL Monolith • Excel Sync</span>
          </div>

          <h3 className="arch-title">Fragile Synchronous Monolith</h3>
          <p className="arch-description">
            Single virtual private server running unindexed MySQL queries. High concurrency caused table locking, while night inventory batches silently failed without an audit log.
          </p>

          <ul className="arch-feature-list legacy-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Blocking disk I/O and synchronous HTTP requests for PDF invoice generation.</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>Single point of failure (SPOF) server with zero health check or auto-recovery.</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              <span>7-day manual paper onboarding creating massive dealer friction.</span>
            </li>
          </ul>
        </div>

        {/* Right Side: Modernized */}
        <div
          className={`arch-side-card modern-card ${activeTab === "before" ? "dimmed" : ""}`}
          style={{ opacity: activeTab === "before" ? 0.35 : 1 }}
        >
          <div className="card-top-header">
            <span className="arch-status-pill success">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>DEEPAK'S REDESIGNED STACK</span>
            </span>
            <span className="arch-stack-tag">React 19 • Node.js Cluster • Redis • PostgreSQL</span>
          </div>

          <h3 className="arch-title">Event-Driven Reactive Cluster</h3>
          <p className="arch-description">
            Decoupled microservice architecture with Redis distributed caching, RabbitMQ asynchronous job queues, and automated Docker Swarm failover.
          </p>

          <ul className="arch-feature-list modern-list">
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Sub-quarter-second p95 latency via read-through Redis cache and covering indexes.</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Idempotent queue processing with dead-letter queue and real-time audit tracing.</span>
            </li>
            <li>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Automated digital onboarding and KYC verifying distributors in under 12 minutes.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Real-World Verified Metrics Comparison Ribbon */}
      <div className="arch-metrics-ribbon">
        {metrics.map((m, idx) => (
          <div key={idx} className="arch-metric-card">
            <span className="metric-header-title">{m.metric}</span>
            <div className="metric-delta-row">
              <span className="metric-delta-badge">{m.delta}</span>
              <span className="metric-unit-text">{m.unit}</span>
            </div>
            <div className="metric-comparison-flex">
              <div className="metric-sub-col before">
                <span className="sub-col-label">Before</span>
                <span className="sub-col-value">{m.before}</span>
              </div>
              <div className="metric-divider-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
              <div className="metric-sub-col after">
                <span className="sub-col-label">After</span>
                <span className="sub-col-value">{m.after}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Deep-Dive Architectural Solution Selector */}
      <div className="arch-deepdive-deck">
        <h4 className="deepdive-heading">Inspect Architectural Solutions</h4>
        <div className="solution-nav-buttons">
          {architecturalSolutions.map((item, index) => (
            <button
              key={index}
              type="button"
              className={`solution-tab-btn ${selectedBottleneck === index ? "active" : ""}`}
              onClick={() => setSelectedBottleneck(index)}
            >
              <span className="solution-tab-index">0{index + 1}</span>
              <span className="solution-tab-title">{item.title}</span>
            </button>
          ))}
        </div>

        <div className="solution-detail-panel">
          <div className="solution-header-row">
            <span className="solution-tag">{architecturalSolutions[selectedBottleneck].tag}</span>
            <span className="solution-badge-solved">Resolved in Production</span>
          </div>

          <div className="solution-grid-content">
            <div className="solution-text-col">
              <div className="issue-block">
                <span className="issue-label">Problem Encountered:</span>
                <p>{architecturalSolutions[selectedBottleneck].problem}</p>
              </div>
              <div className="fix-block">
                <span className="fix-label">Engineering Implementation:</span>
                <p>{architecturalSolutions[selectedBottleneck].solution}</p>
              </div>
            </div>

            <div className="solution-code-col">
              <div className="code-header-bar">
                <span className="code-header-dot red" />
                <span className="code-header-dot yellow" />
                <span className="code-header-dot green" />
                <span className="code-filename">solution-patch.sql</span>
              </div>
              <pre className="code-snippet-box">
                <code>{architecturalSolutions[selectedBottleneck].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
