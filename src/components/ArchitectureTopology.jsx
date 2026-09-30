import { useState } from "react";

export default function ArchitectureTopology() {
  const [activeTier, setActiveTier] = useState("edge");

  const tiers = [
    {
      id: "edge",
      title: "Edge Delivery",
      subtitle: "Global CDN & Next.js 15 SSR",
      latency: "< 5ms",
      details: "Edge caching, DNS routing, and Server Component hydration distributed globally across multi-region edge locations.",
      specs: ["HTTP/3 & Brotli Compression", "Edge Middleware Auth", "Global Asset Pre-fetching"],
    },
    {
      id: "gateway",
      title: "API Gateway",
      subtitle: "HAProxy / Envoy & Rate Limiting",
      latency: "< 12ms",
      details: "Token bucket rate limiting, JWT signature verification, and TLS termination protecting downstream services.",
      specs: ["Strict OpenAPI / Schema Validation", "mTLS Microservice Routing", "Zero-Allocation Buffer Parsing"],
    },
    {
      id: "microservices",
      title: "Distributed Services",
      subtitle: "Event-Driven Node.js & Python Clusters",
      latency: "< 18ms p95",
      details: "Decoupled domain workers handling high concurrency, asynchronous task orchestration, and real-time state machines.",
      specs: ["Clustered Worker Threads", "Automated Health Checks & Circuit Breakers", "Stateless Horizontal Scaling"],
    },
    {
      id: "cache",
      title: "In-Memory Broker",
      subtitle: "Redis Pub/Sub & Distributed Cache",
      latency: "< 2ms",
      details: "Sub-millisecond distributed lock managers, hot key caching, and pub/sub broadcast channels for real-time WebSockets.",
      specs: ["Redis Sentinel Failover", "Sub-50ms Broadcast Latency", "Adaptive Cache Invalidation"],
    },
    {
      id: "persistence",
      title: "Data Persistence",
      subtitle: "MongoDB Sharding & PostgreSQL ACID",
      latency: "< 15ms query",
      details: "Partitioned document collections and relational data models with pgvector semantic search and replica set failover.",
      specs: ["Automated Sharded Balancing", "pgvector Semantic Embeddings", "Zero-Downtime Data Migrations"],
    },
  ];

  const current = tiers.find((t) => t.id === activeTier) || tiers[0];

  return (
    <div className="architecture-topology-card">
      <div className="topology-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent-cyan)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Live System Topology
          </span>
        </div>
        <span className="topology-status-pill">
          <span className="topology-dot" />
          <span>99.98% SLA VERIFIED</span>
        </span>
      </div>

      <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px" }}>
        Interactive blueprint of the production distributed architecture powering my web applications. Click any tier to inspect latency and technical specs:
      </p>

      {/* Tier Pipeline Nodes */}
      <div className="topology-nodes-strip">
        {tiers.map((tier, idx) => (
          <button
            key={tier.id}
            type="button"
            className={`topology-node-btn ${activeTier === tier.id ? "active" : ""}`}
            onClick={() => setActiveTier(tier.id)}
          >
            <div className="node-step-index">0{idx + 1}</div>
            <div className="node-title-txt">{tier.title}</div>
            <div className="node-latency-pill">{tier.latency}</div>
          </button>
        ))}
      </div>

      {/* Active Tier Deep Dive Panel */}
      <div className="topology-detail-panel">
        <div className="detail-top-row">
          <div>
            <h4 className="detail-tier-title">{current.title} &bull; <span style={{ color: "var(--accent-cyan)", fontWeight: "500" }}>{current.subtitle}</span></h4>
            <p className="detail-tier-desc">{current.details}</p>
          </div>
          <div className="detail-latency-stat">
            <span className="latency-lbl">TIER LATENCY</span>
            <span className="latency-val">{current.latency}</span>
          </div>
        </div>

        <div className="detail-specs-grid">
          {current.specs.map((spec, i) => (
            <div key={i} className="spec-tag-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
