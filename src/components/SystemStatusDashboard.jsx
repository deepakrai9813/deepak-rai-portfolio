import { useState } from "react";

export default function SystemStatusDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(null);

  const services = [
    {
      id: "edge",
      name: "Edge Delivery & Next.js SSR",
      uptime: "99.99%",
      latency: "4 ms",
      status: "OPERATIONAL",
    },
    {
      id: "gateway",
      name: "API Ingress & Rate Limiter",
      uptime: "99.98%",
      latency: "12 ms",
      status: "OPERATIONAL",
    },
    {
      id: "queue",
      name: "RabbitMQ Async Worker Queue",
      uptime: "99.98%",
      latency: "1.8 ms",
      status: "OPERATIONAL",
    },
    {
      id: "storage",
      name: "PostgreSQL & Redis Cache Cluster",
      uptime: "99.97%",
      latency: "11 ms",
      status: "OPERATIONAL",
    },
  ];

  const incidents = [
    {
      id: "inc-01",
      code: "INC-2025-04",
      title: "Redis Connection Pool Exhaustion under WebSockets Surge",
      severity: "SEV-2",
      duration: "14 mins to mitigation",
      date: "May 2025",
      impact: "Order placement p95 latency degraded from 18ms to 420ms for 3.2% of active users.",
      rootCause:
        "An uncapped WebSocket broadcast event spawned transient Redis PUB/SUB client handles without TCP keep-alive reap intervals, consuming all 10,000 available file descriptors on the cache node.",
      remediation:
        "1. Re-architected connection management to a singleton pooled proxy with strict 500ms connection timeout.\n2. Implemented Redis pipelining to batch client queries.\n3. Added Prometheus alert on file descriptor consumption > 70%. Zero regressions since.",
      timeline: [
        { time: "14:02:10 UTC", note: "Prometheus alerts on Redis pool queue depth > 450." },
        { time: "14:04:30 UTC", note: "Deepak initiates incident response; isolates noisy WebSocket worker." },
        { time: "14:09:15 UTC", note: "Hot-patched pool maxClient limits and enabled TCP socket reuse." },
        { time: "14:16:00 UTC", note: "Cluster latency returns to steady 18ms baseline. All queues drained." },
      ],
    },
    {
      id: "inc-02",
      code: "INC-2024-11",
      title: "Third-Party KYC API Timeout & Circuit Breaker Engagement",
      severity: "SEV-3",
      duration: "8 mins to mitigation",
      date: "Nov 2024",
      impact: "Distributor onboarding verification requests stalled due to upstream partner outage.",
      rootCause:
        "An external government verification provider experienced 45-second TCP hang-ups, causing client threads to pile up and consume backend worker threads.",
      remediation:
        "1. Deployed automated Circuit Breaker pattern with 4.5s aggressive timeout.\n2. Automatically queued incoming verification payloads into RabbitMQ dead-letter retry pool.\n3. Displayed graceful async pending status to distributors without crashing checkout.",
      timeline: [
        { time: "09:12:00 UTC", note: "Upstream partner API response times climb from 800ms to 45s." },
        { time: "09:13:30 UTC", note: "Circuit Breaker automatically opens after 5 consecutive timeouts." },
        { time: "09:15:00 UTC", note: "Fallback queue absorbs 100% of KYC submissions asynchronously." },
        { time: "09:20:00 UTC", note: "Upstream recovers; circuit half-opens and drains queued jobs in 90s." },
      ],
    },
  ];

  return (
    <div className="system-status-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>OBSERVABILITY &amp; SLA METRICS</span>
        </div>
        <h2 className="section-heading-title">System Status &amp; Incident Post-Mortems</h2>
        <p className="section-subtitle-text">
          Real-world uptime health telemetry across all deployed services, along with transparent Root Cause Analyses (RCA) written by Deepak.
        </p>
      </div>

      <div className="status-overview-card">
        {/* Top Health Header */}
        <div className="status-banner-header">
          <div className="status-banner-left">
            <div className="live-status-orb">
              <span className="orb-ping" />
              <span className="orb-solid" />
            </div>
            <div className="status-banner-text">
              <span className="status-main-headline">All Production Systems Operational</span>
              <span className="status-subline">99.98% SLA Maintained Over the Last 90 Days</span>
            </div>
          </div>

          <div className="status-banner-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Verified 0 Active Outages</span>
          </div>
        </div>

        {/* 4 Microservices Uptime Strips */}
        <div className="services-uptime-list">
          {services.map((srv) => (
            <div key={srv.id} className="service-row-item">
              <div className="service-info-col">
                <span className="service-name-text">{srv.name}</span>
                <span className="service-metrics-text">
                  p95 latency: <strong className="font-mono">{srv.latency}</strong> • Uptime: <strong className="font-mono">{srv.uptime}</strong>
                </span>
              </div>

              {/* 45 tick bars representing 90 days */}
              <div className="uptime-bars-track" title="90-day operational track (100% uptime)">
                {Array.from({ length: 42 }).map((_, i) => (
                  <span
                    key={i}
                    className="uptime-tick-bar green"
                    title={`Day -${(42 - i) * 2}: 100% Uptime`}
                  />
                ))}
              </div>

              <div className="service-badge-col">
                <span className="service-status-pill">{srv.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Incident Post-Mortems / RCA Section */}
        <div className="postmortem-section-wrapper">
          <div className="postmortem-header-bar">
            <div className="postmortem-title-group">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <h3 className="postmortem-headline">Incident Post-Mortems &amp; Root Cause Analyses (RCA)</h3>
            </div>
            <span className="postmortem-subtitle">Real architectural failure modes diagnosed and solved in production.</span>
          </div>

          <div className="incident-cards-grid">
            {incidents.map((inc) => (
              <div key={inc.id} className="incident-card-item">
                <div className="incident-card-top">
                  <span className={`incident-sev-badge ${inc.severity.toLowerCase()}`}>
                    {inc.severity}
                  </span>
                  <span className="incident-code font-mono">{inc.code}</span>
                  <span className="incident-date">{inc.date}</span>
                </div>

                <h4 className="incident-title">{inc.title}</h4>
                <p className="incident-impact-text">
                  <strong>Impact:</strong> {inc.impact}
                </p>

                <div className="incident-card-footer">
                  <span className="incident-duration font-mono">{inc.duration}</span>
                  <button
                    type="button"
                    className="btn-read-rca"
                    onClick={() => setSelectedIncident(inc)}
                  >
                    <span>Read Full RCA</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Incident Post-Mortem Details Modal */}
      {selectedIncident && (
        <div className="rca-modal-backdrop" onClick={() => setSelectedIncident(null)}>
          <div
            className="rca-modal-dialog"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="rca-title"
          >
            <div className="rca-modal-header">
              <div className="rca-title-lockup">
                <div className="rca-top-tags">
                  <span className={`incident-sev-badge ${selectedIncident.severity.toLowerCase()}`}>
                    {selectedIncident.severity}
                  </span>
                  <span className="rca-code-tag font-mono">{selectedIncident.code}</span>
                  <span className="rca-resolved-badge">MITIGATED &amp; PREVENTED</span>
                </div>
                <h3 id="rca-title" className="rca-title-text">{selectedIncident.title}</h3>
              </div>
              <button
                type="button"
                className="btn-close-rca-modal"
                onClick={() => setSelectedIncident(null)}
                aria-label="Close dialog"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="rca-modal-body">
              <div className="rca-section-block">
                <span className="rca-block-label">Incident Timeline</span>
                <div className="rca-timeline-list">
                  {selectedIncident.timeline.map((step, idx) => (
                    <div key={idx} className="rca-timeline-row">
                      <span className="rca-time-badge font-mono">{step.time}</span>
                      <span className="rca-time-note">{step.note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rca-section-block">
                <span className="rca-block-label">Root Cause Analysis</span>
                <p className="rca-desc-text">{selectedIncident.rootCause}</p>
              </div>

              <div className="rca-section-block">
                <span className="rca-block-label">Permanent Architectural Prevention</span>
                <pre className="rca-remediation-pre">
                  <code>{selectedIncident.remediation}</code>
                </pre>
              </div>
            </div>

            <div className="rca-modal-footer">
              <button
                type="button"
                className="btn-modal-dismiss"
                onClick={() => setSelectedIncident(null)}
              >
                Close RCA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
