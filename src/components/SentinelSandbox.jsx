import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Play, RotateCcw, Zap, Server, Activity, ArrowUpRight } from "./icons";

const STATE_CONFIG = {
  CLOSED: {
    name: "CLOSED",
    label: "NOMINAL (TRAFFIC HEALTHY)",
    color: "var(--signal-green)",
    statusBg: "var(--signal-green-bg)",
    desc: "Primary upstream healthy (12ms latency). Resiliency buffer armed via sync.Pool. All requests flow directly through :8081.",
    target: "PRIMARY_API (:8081)",
  },
  OPEN: {
    name: "OPEN",
    label: "CHAOS TRIPPED (FAILOVER ACTIVE)",
    color: "var(--signal-red)",
    statusBg: "var(--signal-red-bg)",
    desc: "Upstream exceeded 200ms SLA cutoff. Circuit tripped! 100% of in-flight traffic safely rewound from buffer and rerouted to Secondary.",
    target: "SECONDARY_BACKUP (:8082)",
  },
  HALF_OPEN: {
    name: "HALF-OPEN",
    label: "CANARY PROBE ACTIVE",
    color: "var(--signal-amber)",
    statusBg: "var(--signal-amber-bg)",
    desc: "Sending controlled trial probes to test primary recovery before full reconnect. Safeguards downstream against cold thrashing.",
    target: "PROBING PRIMARY (:8081)",
  },
};

export default function SentinelSandbox({
  playClick,
  playSwitch,
  playRelayTrip,
  playRelayReset,
  playPing,
}) {
  const [circuitState, setCircuitState] = useState("CLOSED");
  const [chaosMode, setChaosMode] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [reqCount, setReqCount] = useState(1482);
  const [latency, setLatency] = useState(12);
  const [logs, setLogs] = useState([
    { id: 1, type: "ok", msg: "REQ #1480 · GET /api/v1/health · 200 OK · 14ms · PRIMARY (:8081)" },
    { id: 2, type: "ok", msg: "REQ #1481 · POST /api/v1/order · 200 OK · 11ms · PRIMARY (:8081)" },
    { id: 3, type: "ok", msg: "REQ #1482 · GET /api/v1/metrics · 200 OK · 12ms · PRIMARY (:8081)" },
  ]);

  const intervalRef = useRef(null);
  const failCountRef = useRef(0);

  // Simulation traffic loop
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setReqCount((c) => c + 1);

      if (chaosMode) {
        // High latency triggered by chaos injection
        const currentLat = Math.floor(Math.random() * 40) + 480;
        setLatency(currentLat);
        failCountRef.current += 1;

        if (failCountRef.current >= 2 && circuitState === "CLOSED") {
          setCircuitState("OPEN");
          playRelayTrip?.();
        }

        const newLog = {
          id: Date.now(),
          type: "failover",
          msg: `REQ #${reqCount + 1} · LATENCY >200ms (${currentLat}ms) · REWOUND BUFFER · 200 OK · 18ms · SECONDARY (:8082)`,
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
      } else {
        // Healthy state
        const currentLat = Math.floor(Math.random() * 8) + 10;
        setLatency(currentLat);
        failCountRef.current = 0;

        const methods = ["GET", "POST", "GET", "PUT"];
        const endpoints = ["/api/v1/data", "/api/v1/users", "/api/v1/status", "/api/v1/telemetry"];
        const method = methods[Math.floor(Math.random() * methods.length)];
        const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

        const newLog = {
          id: Date.now(),
          type: circuitState === "OPEN" ? "failover" : "ok",
          msg: `REQ #${reqCount + 1} · ${method} ${endpoint} · 200 OK · ${
            circuitState === "OPEN" ? "18ms · SECONDARY (:8082)" : `${currentLat}ms · PRIMARY (:8081)`
          }`,
        };
        setLogs((prev) => [newLog, ...prev.slice(0, 4)]);
      }
    }, 850);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, chaosMode, circuitState, reqCount, playRelayTrip]);

  const handleInjectChaos = () => {
    playSwitch?.();
    setChaosMode(true);
    failCountRef.current = 2;
    setCircuitState("OPEN");
    playRelayTrip?.();
  };

  const handleResetHealth = () => {
    playSwitch?.();
    setChaosMode(false);
    setCircuitState("HALF_OPEN");
    playPing?.();
    setTimeout(() => {
      setCircuitState("CLOSED");
      playRelayReset?.();
    }, 1600);
  };

  const toggleRunning = () => {
    playClick?.();
    setIsRunning((r) => !r);
  };

  const currentCfg = STATE_CONFIG[circuitState];

  return (
    <section id="sentinel-lab" style={{ marginBottom: "64px" }}>
      <div className="container">
        {/* Section Heading with Swiss Engineering Index */}
        <div className="section-header-block">
          <div className="section-label">
            // 02. INTERACTIVE SYSTEMS LAB // LIVE TEST BENCH
          </div>
          <h2 className="section-headline">
            PROJECT SENTINEL: CIRCUIT BREAKER CHAOS SIMULATOR
          </h2>
          <p className="section-subtext">
            Test the live Go reverse proxy resilience engine directly in your browser. 
            Inject upstream network chaos, observe instantaneous failover transitions, and verify zero dropped requests.
          </p>
        </div>

        {/* Chassis Wrapper */}
        <div className="sandbox-chassis">
          {/* Engineering Metadata Header */}
          <div className="sandbox-meta-header">
            <div className="sandbox-title">
              <span className="led-indicator" style={{ backgroundColor: currentCfg.color }} />
              <span>SYS-SPEC // GO-SENTINEL-PROXY</span>
              <span className="tag-solid" style={{ color: currentCfg.color, borderColor: currentCfg.color }}>
                STATE: {currentCfg.name}
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px", color: "var(--text-dim)" }}>
              <span>PROXY PORT: :8080</span>
              <span>//</span>
              <span>SLA THRESHOLD: 200ms</span>
              <span>//</span>
              <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>DROPPED: 0</span>
            </div>
          </div>

          {/* Interactive Manual Override Deck */}
          <div className="sandbox-controls-row">
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
              MANUAL CHAOS OVERRIDE DECK:
            </div>
            <div className="sandbox-control-btns">
              <button
                type="button"
                className={`btn-mech-outline ${chaosMode ? "active" : ""}`}
                style={{
                  borderColor: chaosMode ? "var(--signal-red)" : "var(--border-strong)",
                  color: chaosMode ? "var(--signal-red)" : "inherit",
                }}
                onClick={handleInjectChaos}
              >
                <Zap style={{ width: "14px", height: "14px" }} />
                <span>[⚡ INJECT 500MS CHAOS LAG]</span>
              </button>

              <button
                type="button"
                className="btn-mech-outline"
                onClick={handleResetHealth}
              >
                <RotateCcw style={{ width: "14px", height: "14px" }} />
                <span>[↺ RESTORE PRIMARY HEALTH]</span>
              </button>

              <button
                type="button"
                className="btn-mech-outline"
                onClick={toggleRunning}
              >
                <Play style={{ width: "12px", height: "12px" }} />
                <span>{isRunning ? "[PAUSE TRAFFIC]" : "[RESUME TRAFFIC]"}</span>
              </button>
            </div>
          </div>

          {/* Split Workbench Grid */}
          <div className="sandbox-workbench-grid">
            {/* Left: Circuit Schematic Routing */}
            <div className="sandbox-circuit-visualizer">
              {/* Circuit State Status Card */}
              <div
                style={{
                  border: `1px solid ${currentCfg.color}`,
                  backgroundColor: currentCfg.statusBg,
                  padding: "16px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: currentCfg.color }}>
                    CIRCUIT STATUS: {currentCfg.label}
                  </div>
                  <span className="tag-solid active" style={{ borderColor: currentCfg.color, color: currentCfg.color }}>
                    ACTIVE ROUTE: {currentCfg.target}
                  </span>
                </div>
                <div style={{ fontSize: "12px", color: "var(--text-high)", lineHeight: 1.5 }}>
                  {currentCfg.desc}
                </div>
              </div>

              {/* Data Flow Pipeline Nodes */}
              <div className="flow-block-container">
                {/* Node 1: Incoming Client Traffic */}
                <div className="circuit-node">
                  <div>
                    <div className="circuit-node-label">INCOMING HTTP TRAFFIC</div>
                    <div className="circuit-node-metric">SYN flood protected · ~45 req/s</div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 700, color: "var(--signal-green)" }}>
                    200 OK
                  </div>
                </div>

                {/* Node 2: Sentinel Reverse Proxy */}
                <div className="circuit-node" style={{ backgroundColor: "var(--bg-subtle)" }}>
                  <div>
                    <div className="circuit-node-label">SENTINEL REVERSE PROXY (:8080)</div>
                    <div className="circuit-node-metric">
                      sync.Pool allocated · Zero-copy rewind buffer armed
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
                    HEAP: 8.4MB
                  </div>
                </div>

                {/* Split Upstreams */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {/* Primary Upstream */}
                  <div className={`circuit-node ${circuitState === "CLOSED" ? "active-route" : "tripped-route"}`}>
                    <div>
                      <div className="circuit-node-label">PRIMARY API (:8081)</div>
                      <div className="circuit-node-metric">
                        {chaosMode ? "512ms [LAG BREACH]" : `${latency}ms [NOMINAL]`}
                      </div>
                    </div>
                    <span className="led-indicator" style={{ backgroundColor: circuitState === "CLOSED" ? "var(--signal-green)" : "var(--signal-red)" }} />
                  </div>

                  {/* Failover Replica */}
                  <div className={`circuit-node ${circuitState !== "CLOSED" ? "active-route" : ""}`}>
                    <div>
                      <div className="circuit-node-label">SECONDARY REPLICA (:8082)</div>
                      <div className="circuit-node-metric">
                        {circuitState !== "CLOSED" ? "18ms [100% FAILOVER]" : "Standby (Warm)"}
                      </div>
                    </div>
                    <span className="led-indicator" style={{ backgroundColor: circuitState !== "CLOSED" ? "var(--signal-green)" : "var(--border-strong)" }} />
                  </div>
                </div>
              </div>

              {/* Zero Packet Loss Buffer Guarantee */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "10px 14px",
                  border: "1px solid var(--border-base)",
                  backgroundColor: "var(--bg-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "var(--text-dim)" }}>REQUEST BUFFER RESILIENCY:</span>
                <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
                  0 DROPPED BYTES ON FAILOVER
                </span>
              </div>
            </div>

            {/* Right: Live Telemetry Terminal Stream */}
            <div className="sandbox-terminal-feed">
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-base)",
                    paddingBottom: "8px",
                    marginBottom: "12px",
                  }}
                >
                  <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                    LIVE PROXY TELEMETRY STREAM
                  </span>
                  <span className="tag-solid active">
                    <span className="led-indicator pulse" />
                    60 FPS WEBSOCKET
                  </span>
                </div>

                <div className="feed-log-window">
                  {logs.map((log) => (
                    <div key={log.id} className={`log-entry ${log.type}`}>
                      <span>&gt; </span>
                      <span>{log.msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project GitHub Source Link */}
              <div
                style={{
                  marginTop: "20px",
                  paddingTop: "12px",
                  borderTop: "1px solid var(--border-base)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ color: "var(--text-dim)", fontSize: "11px" }}>
                  REPO: deepakrai9813/project-sentinel
                </span>
                <a
                  href="https://github.com/deepakrai9813"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mech"
                  style={{ padding: "6px 12px", fontSize: "11px" }}
                  onClick={() => playClick?.()}
                >
                  <span>VIEW GO SOURCE</span>
                  <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
