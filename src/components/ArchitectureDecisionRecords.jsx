import { useState } from "react";

export default function ArchitectureDecisionRecords() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedADR, setSelectedADR] = useState(null);

  const adrs = [
    {
      id: "adr-001",
      code: "ADR-001",
      category: "distributed",
      title: "Redis Streams vs. Apache Kafka for Event-Driven Order Processing",
      status: "ACCEPTED & IN PRODUCTION",
      date: "2024",
      context:
        "San Brothers required reliable asynchronous order processing, inventory sync, and dealer push notifications across ~50,000 events/day. We evaluated whether to introduce an Apache Kafka cluster or leverage Redis Streams on our existing caching tier.",
      decision:
        "We chose Redis Streams with persistent Consumer Groups (XADD, XREADGROUP, XACK) over Apache Kafka.",
      rationale:
        "1. Operational Overhead: Kafka requires ZooKeeper or KRaft cluster nodes, consuming significant memory and DevOps maintenance. Redis was already tuned in our stack.\n2. Throughput Fit: Redis Streams easily handles 100k+ ops/sec with < 2ms latency, exceeding our requirements by 10x.\n3. Memory Footprint: Co-locating queue buffers with our Redis cluster lowered infrastructure costs by 65%.",
      consequences:
        "1. Positive: Sub-millisecond queuing latency, zero JVM heap tuning, dead-letter message recovery.\n2. Trade-off: Message retention window capped at 7 days in memory, with cold snapshots exported to S3 for audit compliance.",
    },
    {
      id: "adr-002",
      code: "ADR-002",
      category: "distributed",
      title: "Decoupling Synchronous Monolith via RabbitMQ & Dead-Letter Exchanges",
      status: "ACCEPTED & IN PRODUCTION",
      date: "2024",
      context:
        "Legacy PHP checkout executed synchronous PDF generation, email dispatches, and third-party accounting webhooks inside the user's HTTP request cycle, causing periodic 504 Gateway Timeouts under traffic spikes.",
      decision:
        "We decoupled the checkout pipeline into asynchronous RabbitMQ worker exchanges with dedicated Dead-Letter Queues (DLQ) and exponential backoff.",
      rationale:
        "1. Request Isolation: HTTP order endpoints acknowledge in < 45ms immediately after database insert and queue publish.\n2. Failure Isolation: If the accounting API hangs, user checkout remains completely uninterrupted while background workers retry gracefully.\n3. Poison Pill Protection: Failed jobs automatically reroute to DLX for manual inspection without stalling the active worker pool.",
      consequences:
        "1. Positive: Zero 504 timeouts during flash order events; 100% audit durability.\n2. Trade-off: Required implementing idempotency keys on all consumers to prevent duplicate processing.",
    },
    {
      id: "adr-003",
      category: "frontend",
      code: "ADR-003",
      title: "React 19 Server Components & Actions vs. Client-Side Hydration",
      status: "ACCEPTED & IN PRODUCTION",
      date: "2025",
      context:
        "Distributor dashboards contained heavy analytics charts, catalog grids, and complex state libraries. Initial JavaScript bundle size reached 480KB, causing 2.4s first contentful paint (FCP) on mobile 4G networks.",
      decision:
        "Migrated server-rendered data grids and data mutations to React Server Components (RSC) and Server Actions.",
      rationale:
        "1. Bundle Reduction: Database queries and markdown parsing remain on the server, shaving 180KB of client JS.\n2. Zero Waterfall Fetches: Server Components fetch catalog data in a single round-trip directly beside the database.\n3. Optimistic Actions: Coupled Server Actions with useOptimistic to deliver instant 0ms perceived feedback on distributor order toggles.",
      consequences:
        "1. Positive: Lighthouse performance score jumped from 68 to 98; FCP reduced to 0.6s.\n2. Trade-off: Requires strict separation between client components ('use client') and server trees.",
    },
    {
      id: "adr-004",
      category: "database",
      code: "ADR-004",
      title: "PostgreSQL JSONB with GIN Indexing vs. MongoDB for KYC Verification",
      status: "ACCEPTED & IN PRODUCTION",
      date: "2025",
      context:
        "Distributor KYC verification payloads contain dynamic semi-structured document fields that change depending on legal entity type. We evaluated storing KYC data in MongoDB vs PostgreSQL JSONB.",
      decision:
        "Adopted PostgreSQL with JSONB columns and Generalized Inverted Indexes (GIN) instead of a dual-database MongoDB architecture.",
      rationale:
        "1. ACID Consistency: Distributor KYC verification directly unlocks credit limits and ledger transactions; keeping documents in PostgreSQL guarantees atomic multi-table transactions without two-phase commit overhead.\n2. GIN Index Performance: PostgreSQL GIN indexes on JSONB fields deliver sub-millisecond lookups on arbitrary nested keys.\n3. Operational Simplicity: A single PostgreSQL cluster manages relational orders, ledgers, and semi-structured KYC files.",
      consequences:
        "1. Positive: Eliminates distributed transaction failures and dual-database sync complexity.\n2. Trade-off: JSONB update operations rewrite the whole document column, so frequently updated telemetry is kept in separate columns.",
    },
  ];

  const filteredADRs =
    activeCategory === "all"
      ? adrs
      : adrs.filter((a) => a.category === activeCategory);

  return (
    <div className="adr-catalog-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
          </svg>
          <span>STAFF ENGINEERING ARTIFACTS</span>
        </div>
        <h2 className="section-heading-title">Architecture Decision Records (ADRs)</h2>
        <p className="section-subtitle-text">
          How I make high-stakes architectural choices: evaluating trade-offs, rejecting anti-patterns, and documenting rationale for production scale.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="adr-filter-bar">
        <div className="adr-filter-pills" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "all"}
            className={`adr-pill-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All ADRs ({adrs.length})
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "distributed"}
            className={`adr-pill-btn ${activeCategory === "distributed" ? "active" : ""}`}
            onClick={() => setActiveCategory("distributed")}
          >
            Distributed Systems
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "database"}
            className={`adr-pill-btn ${activeCategory === "database" ? "active" : ""}`}
            onClick={() => setActiveCategory("database")}
          >
            Databases &amp; Storage
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === "frontend"}
            className={`adr-pill-btn ${activeCategory === "frontend" ? "active" : ""}`}
            onClick={() => setActiveCategory("frontend")}
          >
            Frontend Architecture
          </button>
        </div>
      </div>

      {/* ADRs Cards Grid */}
      <div className="adr-cards-grid">
        {filteredADRs.map((adr) => (
          <div key={adr.id} className="adr-card-item">
            <div className="adr-card-header">
              <span className="adr-code-badge font-mono">{adr.code}</span>
              <span className="adr-status-pill success">{adr.status}</span>
              <span className="adr-date-tag">{adr.date}</span>
            </div>

            <h3 className="adr-card-title">{adr.title}</h3>

            <div className="adr-summary-block">
              <span className="summary-label">Decision Summary:</span>
              <p className="summary-text">{adr.decision}</p>
            </div>

            <div className="adr-card-footer">
              <button
                type="button"
                className="btn-read-adr"
                onClick={() => setSelectedADR(adr)}
              >
                <span>Read Full Decision Record</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ADR Full Details Modal */}
      {selectedADR && (
        <div className="adr-modal-backdrop" onClick={() => setSelectedADR(null)}>
          <div
            className="adr-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="adr-dialog-title"
          >
            <div className="adr-modal-header">
              <div className="adr-header-title-lockup">
                <div className="adr-badge-row">
                  <span className="adr-code-badge font-mono">{selectedADR.code}</span>
                  <span className="adr-status-pill success">{selectedADR.status}</span>
                </div>
                <h3 id="adr-dialog-title" className="adr-dialog-title">
                  {selectedADR.title}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close-adr-modal"
                onClick={() => setSelectedADR(null)}
                aria-label="Close dialog"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="adr-modal-body">
              <div className="adr-section">
                <span className="adr-section-heading">Context &amp; Problem Statement</span>
                <p className="adr-body-text">{selectedADR.context}</p>
              </div>

              <div className="adr-section">
                <span className="adr-section-heading">Decision &amp; Architectural Choice</span>
                <div className="adr-decision-highlight-box">
                  <p className="adr-decision-text">{selectedADR.decision}</p>
                </div>
              </div>

              <div className="adr-section">
                <span className="adr-section-heading">Technical Rationale &amp; Trade-Offs Evaluated</span>
                <pre className="adr-rationale-pre">
                  <code>{selectedADR.rationale}</code>
                </pre>
              </div>

              <div className="adr-section">
                <span className="adr-section-heading">Consequences &amp; Production Results</span>
                <pre className="adr-rationale-pre">
                  <code>{selectedADR.consequences}</code>
                </pre>
              </div>
            </div>

            <div className="adr-modal-footer">
              <button
                type="button"
                className="btn-modal-dismiss"
                onClick={() => setSelectedADR(null)}
              >
                Close ADR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
