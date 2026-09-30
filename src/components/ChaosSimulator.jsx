import { useState, useEffect, useRef } from "react";

export default function ChaosSimulator() {
  const [scenario, setScenario] = useState("idle"); // idle, spike, crash, cache_evict
  const [metrics, setMetrics] = useState({
    rps: 1240,
    latency: 18,
    activeWorkers: 3,
    maxWorkers: 3,
    cacheHitRatio: 98.6,
    errorRate: 0.0,
    status: "HEALTHY",
  });
  const [logs, setLogs] = useState([
    { id: 1, time: "19:40:02", level: "info", text: "Cluster initialized: 3 active worker pods healthy." },
    { id: 2, time: "19:40:05", level: "info", text: "Redis cache warm: 12,450 keys loaded, hit ratio 98.6%." },
    { id: 3, time: "19:40:10", level: "success", text: "NGINX API Gateway: Health checks passing across all nodes." },
  ]);

  const logCounterRef = useRef(4);

  const addLog = (level, text) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => [
      ...prev.slice(-6),
      { id: logCounterRef.current++, time: timeStr, level, text },
    ]);
  };

  const handleTriggerSpike = () => {
    setScenario("spike");
    setMetrics({
      rps: 52400,
      latency: 42,
      activeWorkers: 8,
      maxWorkers: 8,
      cacheHitRatio: 99.1,
      errorRate: 0.0,
      status: "AUTO-SCALING",
    });
    addLog("warn", "TRAFFIC SPIKE: 50k+ req/sec detected on /api/v1/orders.");
    addLog("info", "Rate limiter engaged: Token bucket capacity holding steady.");
    addLog("success", "HPA triggered: Worker pool auto-scaled from 3 -> 8 pods in 140ms.");

    setTimeout(() => {
      setMetrics((m) => ({
        ...m,
        latency: 22,
        status: "STABILIZED",
      }));
      addLog("success", "Cluster stabilized: 0 dropped packets, p95 latency 22ms.");
    }, 2400);
  };

  const handleTriggerCrash = () => {
    setScenario("crash");
    setMetrics({
      rps: 1210,
      latency: 38,
      activeWorkers: 2,
      maxWorkers: 3,
      cacheHitRatio: 97.4,
      errorRate: 0.0,
      status: "HEALING",
    });
    addLog("error", "CHAOS MONKEY: Terminated Worker Pod #2 (SIGKILL).");
    addLog("warn", "NGINX: Upstream health check failed for Pod #2. Traffic rerouted.");

    setTimeout(() => {
      setMetrics({
        rps: 1250,
        latency: 18,
        activeWorkers: 3,
        maxWorkers: 3,
        cacheHitRatio: 98.6,
        errorRate: 0.0,
        status: "HEALTHY",
      });
      addLog("success", "Orchestrator: Spawned replacement Worker Pod in 118ms.");
      addLog("info", "All 3 worker pods back in rotation. Cluster 100% nominal.");
    }, 1800);
  };

  const handleTriggerCacheEvict = () => {
    setScenario("cache_evict");
    setMetrics({
      rps: 1240,
      latency: 68,
      activeWorkers: 4,
      maxWorkers: 4,
      cacheHitRatio: 12.0,
      errorRate: 0.0,
      status: "CACHE WARMING",
    });
    addLog("warn", "CACHE PURGE: Redis cache flushed. Stampede prevention active.");
    addLog("info", "Read-replicas absorbing primary queries. Mutex lock preventing dogpiling.");

    setTimeout(() => {
      setMetrics({
        rps: 1260,
        latency: 19,
        activeWorkers: 3,
        maxWorkers: 3,
        cacheHitRatio: 98.8,
        errorRate: 0.0,
        status: "HEALTHY",
      });
      addLog("success", "Pre-warm completed: 10,000 critical keys hydrated in 310ms.");
    }, 2000);
  };

  const handleReset = () => {
    setScenario("idle");
    setMetrics({
      rps: 1250,
      latency: 18,
      activeWorkers: 3,
      maxWorkers: 3,
      cacheHitRatio: 98.6,
      errorRate: 0.0,
      status: "HEALTHY",
    });
    addLog("info", "Reset command issued: Cluster restored to steady baseline.");
  };

  return (
    <div className="chaos-simulator-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span>INTERACTIVE RESILIENCE SIMULATOR</span>
        </div>
        <h2 className="section-heading-title">Cluster Chaos & Spike Simulator</h2>
        <p className="section-subtitle-text">
          Trigger live failure conditions on this simulated distributed cluster to watch auto-healing, rate-limiting, and zero-downtime recovery in action.
        </p>
      </div>

      <div className="chaos-dashboard-card">
        {/* Top Control Bar */}
        <div className="chaos-controls-header">
          <div className="chaos-actions-group">
            <span className="controls-label">Inject Chaos:</span>
            <button
              type="button"
              className={`chaos-btn spike ${scenario === "spike" ? "active" : ""}`}
              onClick={handleTriggerSpike}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>50k Req/s Spike</span>
            </button>
            <button
              type="button"
              className={`chaos-btn crash ${scenario === "crash" ? "active" : ""}`}
              onClick={handleTriggerCrash}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>Kill Worker (Crash)</span>
            </button>
            <button
              type="button"
              className={`chaos-btn evict ${scenario === "cache_evict" ? "active" : ""}`}
              onClick={handleTriggerCacheEvict}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 6h18" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              <span>Purge Redis Cache</span>
            </button>
          </div>

          <button
            type="button"
            className="chaos-btn reset"
            onClick={handleReset}
            title="Reset to baseline"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Live Cluster Metrics Telemetry Bar */}
        <div className="chaos-metrics-strip">
          <div className="chaos-stat-box">
            <span className="stat-label">Throughput</span>
            <div className="stat-value-group">
              <span className="stat-num">{metrics.rps.toLocaleString()}</span>
              <span className="stat-unit">req/sec</span>
            </div>
            <div className="stat-meter-bar">
              <div
                className="stat-meter-fill"
                style={{ width: `${Math.min(100, (metrics.rps / 55000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="chaos-stat-box">
            <span className="stat-label">p95 Latency</span>
            <div className="stat-value-group">
              <span className={`stat-num ${metrics.latency > 35 ? "warning" : ""}`}>{metrics.latency}</span>
              <span className="stat-unit">ms</span>
            </div>
            <div className="stat-meter-bar">
              <div
                className="stat-meter-fill latency"
                style={{ width: `${Math.min(100, (metrics.latency / 100) * 100)}%` }}
              />
            </div>
          </div>

          <div className="chaos-stat-box">
            <span className="stat-label">Worker Pods</span>
            <div className="stat-value-group">
              <span className="stat-num">{metrics.activeWorkers}</span>
              <span className="stat-unit">/ {metrics.maxWorkers} online</span>
            </div>
            <div className="stat-meter-bar">
              <div
                className="stat-meter-fill workers"
                style={{ width: `${(metrics.activeWorkers / 8) * 100}%` }}
              />
            </div>
          </div>

          <div className="chaos-stat-box">
            <span className="stat-label">Cache Hit Ratio</span>
            <div className="stat-value-group">
              <span className={`stat-num ${metrics.cacheHitRatio < 50 ? "danger" : ""}`}>{metrics.cacheHitRatio}%</span>
              <span className="stat-unit">hit rate</span>
            </div>
            <div className="stat-meter-bar">
              <div
                className="stat-meter-fill cache"
                style={{ width: `${metrics.cacheHitRatio}%` }}
              />
            </div>
          </div>

          <div className="chaos-stat-box">
            <span className="stat-label">System Health</span>
            <div className="stat-value-group">
              <span className="stat-status-badge">{metrics.status}</span>
            </div>
            <div className="stat-subtext">Error rate: {metrics.errorRate}%</div>
          </div>
        </div>

        {/* Visual Pipeline Data Flow Diagram */}
        <div className="chaos-visual-pipeline">
          <div className="pipeline-node client">
            <div className="node-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <span className="node-label">Edge Clients</span>
            <span className="node-sublabel">{metrics.rps.toLocaleString()} req/s</span>
          </div>

          <div className="pipeline-flow-connector active">
            <span className="flow-dash-line" />
            <span className="flow-packet-indicator" />
          </div>

          <div className="pipeline-node gateway">
            <div className="node-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
            </div>
            <span className="node-label">NGINX Gateway</span>
            <span className="node-sublabel">Rate Limiter Active</span>
          </div>

          <div className="pipeline-flow-connector active">
            <span className="flow-dash-line" />
            <span className="flow-packet-indicator" />
          </div>

          <div className={`pipeline-node workers ${scenario === "crash" ? "healing" : ""}`}>
            <div className="node-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span className="node-label">Node.js Pods</span>
            <span className="node-sublabel">{metrics.activeWorkers} Worker Instances</span>
          </div>

          <div className="pipeline-flow-connector active">
            <span className="flow-dash-line" />
            <span className="flow-packet-indicator" />
          </div>

          <div className={`pipeline-node cache ${scenario === "cache_evict" ? "purged" : ""}`}>
            <div className="node-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <span className="node-label">Redis Cache</span>
            <span className="node-sublabel">{metrics.cacheHitRatio}% Hit Ratio</span>
          </div>

          <div className="pipeline-flow-connector active">
            <span className="flow-dash-line" />
            <span className="flow-packet-indicator" />
          </div>

          <div className="pipeline-node database">
            <div className="node-icon-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7" />
                <path d="M4 12c0 2.21 3.582 4 8 4s8-1.79 8-4" />
                <ellipse cx="12" cy="7" rx="8" ry="3" />
              </svg>
            </div>
            <span className="node-label">PostgreSQL</span>
            <span className="node-sublabel">Primary + Replicas</span>
          </div>
        </div>

        {/* Live Cluster Event Log Feed */}
        <div className="chaos-log-console">
          <div className="log-console-header">
            <div className="console-dots">
              <span className="dot red" />
              <span className="dot yellow" />
              <span className="dot green" />
            </div>
            <span className="console-title">orchestrator.events.stream</span>
            <span className="console-live-badge">
              <span className="pulse-dot" />
              <span>LIVE</span>
            </span>
          </div>
          <div className="log-rows-container">
            {logs.map((log) => (
              <div key={log.id} className={`log-row-item ${log.level}`}>
                <span className="log-timestamp">[{log.time}]</span>
                <span className={`log-level-badge ${log.level}`}>{log.level.toUpperCase()}</span>
                <span className="log-message-text">{log.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
