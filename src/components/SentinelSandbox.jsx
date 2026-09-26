import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Play, RotateCcw, Zap, Server, Activity, ArrowUpRight, Compass, Radio, CheckCircle, AlertTriangle } from "./icons";

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

const GLOBAL_REGIONS = [
  { id: "delhi", name: "NEW DELHI (HQ CORE)", code: "AP-SOUTH-1", x: 68, y: 46, ping: "1.2ms", status: "PRIMARY CORE", color: "#00d665" },
  { id: "frankfurt", name: "FRANKFURT GATEWAY", code: "EU-CENTRAL-1", x: 48, y: 32, ping: "118ms", status: "ACTIVE EDGE", color: "#00b0ff" },
  { id: "virginia", name: "N. VIRGINIA SHARD", code: "US-EAST-1", x: 24, y: 36, ping: "182ms", status: "ACID REPLICA", color: "#f0f2f5" },
  { id: "tokyo", name: "TOKYO CACHE", code: "AP-NORTHEAST-1", x: 86, y: 38, ping: "44ms", status: "RING BUFFER", color: "#f59e0b" },
  { id: "singapore", name: "SINGAPORE RELAY", code: "AP-SOUTHEAST-1", x: 74, y: 62, ping: "38ms", status: "AI WORKER", color: "#ff5500" },
];

export default function SentinelSandbox({
  playClick,
  playSwitch,
  playRelayTrip,
  playRelayReset,
  playPing,
}) {
  const [activeTab, setActiveTab] = useState("pipeline"); // "pipeline" | "global-mesh"
  const [circuitState, setCircuitState] = useState("CLOSED");
  const [chaosMode, setChaosMode] = useState(false);
  const [isRunning, setIsRunning] = useState(true);
  const [reqCount, setReqCount] = useState(1482);
  const [latency, setLatency] = useState(12);
  const [cableSevered, setCableSevered] = useState(false);
  const [globalBurstActive, setGlobalBurstActive] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(GLOBAL_REGIONS[0]);
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

  const handleSeverCable = () => {
    playSwitch?.();
    setCableSevered(!cableSevered);
  };

  const handleGlobalBurst = () => {
    playPing?.();
    setGlobalBurstActive(true);
    setTimeout(() => setGlobalBurstActive(false), 2400);
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
            PROJECT SENTINEL: REVERSE PROXY &amp; DISTRIBUTED QUORUM
          </h2>
          <p className="section-subtext">
            Test the live Go reverse proxy resilience engine directly in your browser. 
            Inject upstream network chaos, observe instantaneous failover transitions, and inspect worldwide multi-region routing.
          </p>
        </div>

        {/* Chassis Wrapper */}
        <div className="sandbox-chassis futuristic-screen-frame">
          {/* Engineering Metadata Header with Tab Selector */}
          <div className="sandbox-meta-header">
            <div className="sandbox-title">
              <span className="led-indicator" style={{ backgroundColor: currentCfg.color }} />
              <span>SYS-SPEC // GO-SENTINEL-PROXY</span>
              <span className="tag-solid" style={{ color: currentCfg.color, borderColor: currentCfg.color }}>
                STATE: {currentCfg.name}
              </span>
            </div>

            {/* Futuristic Tab Switcher */}
            <div className="sandbox-tab-group">
              <button
                type="button"
                className={`sandbox-tab-btn ${activeTab === "pipeline" ? "active" : ""}`}
                onClick={() => {
                  playClick?.();
                  setActiveTab("pipeline");
                }}
              >
                <span>01. CIRCUIT PIPELINE</span>
              </button>
              <button
                type="button"
                className={`sandbox-tab-btn ${activeTab === "global-mesh" ? "active" : ""}`}
                onClick={() => {
                  playClick?.();
                  setActiveTab("global-mesh");
                }}
              >
                <Compass style={{ width: "12px", height: "12px" }} />
                <span>02. GLOBAL TOPOLOGY RADAR</span>
              </button>
            </div>

            <div style={{ display: "flex", gap: "14px", color: "var(--text-dim)", fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              <span>PROXY: :8080</span>
              <span>//</span>
              <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>DROPPED: 0.00%</span>
            </div>
          </div>

          {/* TAB 1: CIRCUIT PIPELINE (Default Bench) */}
          {activeTab === "pipeline" && (
            <>
              {/* Interactive Manual Override Deck */}
              <div className="sandbox-controls-row">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)" }}>
                  MANUAL CHAOS OVERRIDE DECK:
                </div>
                <div className="sandbox-control-btns">
                  <button
                    type="button"
                    className={`btn-mech-outline futuristic-chamfer-btn ${chaosMode ? "active" : ""}`}
                    style={{
                      borderColor: chaosMode ? "var(--signal-red)" : "var(--border-strong)",
                      color: chaosMode ? "var(--signal-red)" : "inherit",
                    }}
                    onClick={handleInjectChaos}
                  >
                    <Zap style={{ width: "14px", height: "14px" }} />
                    <span>INJECT 500MS CHAOS LAG</span>
                  </button>

                  <button
                    type="button"
                    className="btn-mech-outline futuristic-chamfer-btn"
                    onClick={handleResetHealth}
                  >
                    <RotateCcw style={{ width: "14px", height: "14px" }} />
                    <span>RESTORE PRIMARY HEALTH</span>
                  </button>

                  <button
                    type="button"
                    className="btn-mech-outline futuristic-chamfer-btn"
                    onClick={toggleRunning}
                  >
                    <Play style={{ width: "12px", height: "12px" }} />
                    <span>{isRunning ? "PAUSE TRAFFIC" : "RESUME TRAFFIC"}</span>
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
                      className="btn-mech futuristic-chamfer-btn"
                      style={{ padding: "6px 12px", fontSize: "11px" }}
                      onClick={() => playClick?.()}
                    >
                      <span>VIEW GO SOURCE</span>
                      <ArrowUpRight style={{ width: "12px", height: "12px" }} />
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: GLOBAL MULTI-REGION TOPOLOGY RADAR MAP */}
          {activeTab === "global-mesh" && (
            <div className="global-radar-wrapper">
              {/* Radar Controls Toolbar */}
              <div className="radar-controls-toolbar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="led-indicator pulse" />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-high)" }}>
                    BGP ANYCAST EDGE RADAR // GLOBAL DRIFT: &lt;0.5MS
                  </span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    className={`btn-mech-outline futuristic-chamfer-btn ${cableSevered ? "active" : ""}`}
                    style={{
                      borderColor: cableSevered ? "var(--signal-red)" : "var(--border-strong)",
                      color: cableSevered ? "var(--signal-red)" : "inherit",
                    }}
                    onClick={handleSeverCable}
                    title="Simulate sub-sea cable severance between Virginia and Frankfurt"
                  >
                    <AlertTriangle style={{ width: "13px", height: "13px" }} />
                    <span>{cableSevered ? "CABLE CUT // BGP REROUTED" : "SEVER TRANSATLANTIC CABLE"}</span>
                  </button>

                  <button
                    type="button"
                    className="btn-mech-signal futuristic-chamfer-btn"
                    onClick={handleGlobalBurst}
                    title="Simulate 50,000 synthetic requests firing across all global regions"
                  >
                    <Zap style={{ width: "13px", height: "13px" }} />
                    <span>SIMULATE 50K GLOBAL BURST</span>
                  </button>
                </div>
              </div>

              {/* The Cybernetic Planar World Grid Map */}
              <div className="global-map-canvas-frame">
                <svg viewBox="0 0 1000 480" className="global-map-svg" preserveAspectRatio="none">
                  {/* Cybernetic Coordinate Grid Lines */}
                  {[80, 160, 240, 320, 400].map((y) => (
                    <line key={`y-${y}`} x1="0" y1={y} x2="1000" y2={y} stroke="var(--border-subtle)" strokeWidth="0.8" strokeDasharray="3,3" />
                  ))}
                  {[150, 300, 450, 600, 750, 900].map((x) => (
                    <line key={`x-${x}`} x1={x} y1="0" x2={x} y2="480" stroke="var(--border-subtle)" strokeWidth="0.8" strokeDasharray="3,3" />
                  ))}

                  {/* Intercontinental Laser Data Conduits */}
                  {/* Virginia to Frankfurt (Transatlantic) */}
                  <line
                    x1="240"
                    y1="172"
                    x2="480"
                    y2="153"
                    stroke={cableSevered ? "var(--signal-red)" : "var(--signal-green)"}
                    strokeWidth={cableSevered ? "1.5" : "2"}
                    strokeDasharray={cableSevered ? "6,6" : "none"}
                    opacity={cableSevered ? 0.6 : 0.85}
                  />

                  {/* Frankfurt to New Delhi */}
                  <line x1="480" y1="153" x2="680" y2="220" stroke="var(--signal-green)" strokeWidth="2" opacity="0.85" />

                  {/* New Delhi to Singapore */}
                  <line x1="680" y1="220" x2="740" y2="297" stroke="var(--signal-cyan)" strokeWidth="2" opacity="0.85" />

                  {/* Singapore to Tokyo */}
                  <line x1="740" y1="297" x2="860" y2="182" stroke="var(--signal-amber)" strokeWidth="2" opacity="0.85" />

                  {/* Tokyo to Virginia (Transpacific failover ring) */}
                  <line
                    x1="860"
                    y1="182"
                    x2="240"
                    y2="172"
                    stroke={cableSevered ? "var(--signal-green)" : "var(--border-strong)"}
                    strokeWidth={cableSevered ? "2.5" : "1.2"}
                    strokeDasharray="4,4"
                    opacity={cableSevered ? 1 : 0.4}
                  />

                  {/* Active Travelling Data Pulses */}
                  {(globalBurstActive || !cableSevered) && (
                    <>
                      <circle cx="360" cy="162" r="4" fill="var(--signal-green)" />
                      <circle cx="580" cy="186" r="4" fill="var(--signal-green)" />
                      <circle cx="710" cy="258" r="4" fill="var(--signal-cyan)" />
                      <circle cx="800" cy="240" r="4" fill="var(--signal-amber)" />
                    </>
                  )}

                  {/* Severed Cable Alert Beacon */}
                  {cableSevered && (
                    <g transform="translate(360, 162)">
                      <circle cx="0" cy="0" r="14" fill="none" stroke="var(--signal-red)" strokeWidth="1.5" />
                      <text x="0" y="24" fill="var(--signal-red)" fontSize="10" fontFamily="var(--font-mono)" fontWeight="700" textAnchor="middle">
                        [!] CABLE SEVERED // 0% DROP
                      </text>
                    </g>
                  )}
                </svg>

                {/* Interactive Regional Hotspot Badges */}
                {GLOBAL_REGIONS.map((region) => (
                  <button
                    key={region.id}
                    type="button"
                    className={`global-region-hotspot ${selectedRegion.id === region.id ? "active" : ""}`}
                    style={{ left: `${region.x}%`, top: `${region.y}%` }}
                    onClick={() => {
                      playClick?.();
                      setSelectedRegion(region);
                    }}
                  >
                    <span className="region-beacon-core" style={{ backgroundColor: region.color }} />
                    <span className="region-beacon-ring" style={{ borderColor: region.color }} />
                    <div className="region-info-tag">
                      <span className="region-code-name">{region.code}</span>
                      <span className="region-ping-val" style={{ color: region.color }}>
                        {region.ping}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Inspected Region Telemetry Bar */}
              <div className="global-region-inspector-bar">
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span className="led-indicator" style={{ backgroundColor: selectedRegion.color }} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 800, color: "var(--text-high)" }}>
                    {selectedRegion.name} // [{selectedRegion.code}]
                  </span>
                  <span className="tag-solid active" style={{ borderColor: selectedRegion.color, color: selectedRegion.color }}>
                    ROLE: {selectedRegion.status}
                  </span>
                </div>

                <div className="region-spec-values">
                  <span>PING RTT: <strong style={{ color: selectedRegion.color }}>{selectedRegion.ping}</strong></span>
                  <span>//</span>
                  <span>BGP PATH: OPTIMAL</span>
                  <span>//</span>
                  <span>FAILOVER QUORUM: 5/5</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
