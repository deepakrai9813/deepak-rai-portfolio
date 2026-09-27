import { useState, useEffect, useRef } from "react";
import { Zap, Play, RotateCcw, Server, Check, XIcon } from "./icons";

export default function MemoryPoolPlayground({ playClick, playSwitch, playPing }) {
  const [usePool, setUsePool] = useState(true);
  const [goroutines, setGoroutines] = useState(100);
  const [isSimulating, setIsSimulating] = useState(false);
  const [memoryHistory, setMemoryHistory] = useState([2.4, 2.5, 2.4, 2.4, 2.5, 2.4, 2.4, 2.4]);
  const [metrics, setMetrics] = useState({
    allocPerOp: "0 B/op",
    gcPause: "<0.12ms",
    heapTotal: "2.4 MB",
    gcCount: "0 cycles",
  });

  const animRef = useRef(null);

  const runBurst = () => {
    playClick?.();
    setIsSimulating(true);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      setMemoryHistory((prev) => {
        let nextVal;
        if (usePool) {
          // Stays between 2.2 and 2.6 MB
          nextVal = +(2.3 + Math.random() * 0.3).toFixed(1);
        } else {
          // Escalates with goroutines
          const factor = (goroutines / 100) * 12;
          nextVal = +(14.0 + factor + Math.random() * 8).toFixed(1);
        }
        return [...prev.slice(1), nextVal];
      });

      if (step >= 8) {
        clearInterval(interval);
        setIsSimulating(false);
        playPing?.();
      }
    }, 140);
  };

  useEffect(() => {
    if (usePool) {
      setMetrics({
        allocPerOp: "0 B/op (0 allocs)",
        gcPause: "<0.12ms (negligible)",
        heapTotal: "2.4 MB (flat)",
        gcCount: "0 cycles (recycled)",
      });
      setMemoryHistory([2.4, 2.5, 2.4, 2.4, 2.5, 2.4, 2.4, 2.4]);
    } else {
      const scaledHeap = (goroutines * 0.42).toFixed(1);
      const scaledPause = (goroutines * 0.14).toFixed(1);
      setMetrics({
        allocPerOp: "32,768 B/op (1 alloc)",
        gcPause: `${scaledPause}ms (STW latency spike)`,
        heapTotal: `${scaledHeap} MB (bloated)`,
        gcCount: "14 cycles / sec",
      });
      setMemoryHistory([12, 18, 24, 32, 28, 38, 42, +scaledHeap]);
    }
  }, [usePool, goroutines]);

  return (
    <section id="memory-lab" className="modern-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">
            // 02-B. CONCURRENCY &amp; MEMORY BENCH // GO RUNTIME SIMULATOR
          </div>
          <h2 className="section-headline">
            GO CONCURRENCY &amp; SYNC.POOL MEMORY RECYCLER
          </h2>
          <p className="section-subtext">
            Under high-concurrency loads, naive byte buffer allocations cause Stop-The-World (STW) Garbage Collection pauses. 
            Toggle between standard heap allocation and Deepak's zero-alloc <code>sync.Pool</code> implementation to observe memory behavior.
          </p>
        </div>

        {/* Chassis */}
        <div className="sandbox-chassis">
          {/* Header Bar */}
          <div className="sandbox-meta-header">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="led-indicator" style={{ backgroundColor: usePool ? "var(--signal-green)" : "var(--signal-red)" }} />
              <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                GO MEMORY PROFILER: pprof simulation
              </span>
            </div>
            <div style={{ color: "var(--text-dim)", fontFamily: "var(--font-mono)" }}>
              GOROUTINES: <strong>{goroutines} ACTIVE</strong>
            </div>
          </div>

          {/* Interactive Controls Bar */}
          <div className="sandbox-controls-row">
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                className={`tag-solid ${usePool ? "active" : ""}`}
                style={{ padding: "8px 14px", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}
                onClick={() => {
                  playSwitch?.();
                  setUsePool(true);
                }}
              >
                <Check style={{ width: "12px", height: "12px" }} />
                <span>SYNC.POOL ACTIVE (ZERO-ALLOC)</span>
              </button>

              <button
                type="button"
                className={`tag-solid ${!usePool ? "danger" : ""}`}
                style={{ padding: "8px 14px", cursor: "pointer", fontSize: "11px", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px" }}
                onClick={() => {
                  playSwitch?.();
                  setUsePool(false);
                }}
              >
                <XIcon style={{ width: "12px", height: "12px" }} />
                <span>NAIVE HEAP ALLOCATION (GC SPIKES)</span>
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <label style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-med)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>WORKERS:</span>
                <input
                  type="range"
                  min="20"
                  max="500"
                  step="20"
                  value={goroutines}
                  onChange={(e) => {
                    playClick?.();
                    setGoroutines(+e.target.value);
                  }}
                  style={{ cursor: "pointer", accentColor: "var(--signal-green)" }}
                />
                <span style={{ color: "var(--text-high)", fontWeight: 700, minWidth: "40px" }}>{goroutines}</span>
              </label>

              <button
                type="button"
                className="btn-mech-signal"
                style={{ padding: "6px 14px", fontSize: "11px" }}
                onClick={runBurst}
                disabled={isSimulating}
              >
                <Zap style={{ width: "13px", height: "13px" }} />
                <span>{isSimulating ? "SIMULATING..." : "RUN 1,000 REQ BURST"}</span>
              </button>
            </div>
          </div>

          {/* Workbench Grid */}
          <div className="sandbox-workbench-grid">
            {/* Left: Real-time Memory Graph */}
            <div style={{ padding: "24px", borderRight: "1px solid var(--border-base)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)" }}>
                  HEAP MEMORY ALLOCATION (MB) OVER TIME
                </span>
                <span className="tag-solid" style={{ color: usePool ? "var(--signal-green)" : "var(--signal-red)" }}>
                  {metrics.heapTotal}
                </span>
              </div>

              {/* Solid CSS Bar Visualizer (ZERO GRADIENTS) */}
              <div
                style={{
                  height: "140px",
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                  borderBottom: "1px solid var(--border-strong)",
                  paddingBottom: "4px",
                  backgroundColor: "var(--bg-subtle)",
                  padding: "12px",
                }}
              >
                {memoryHistory.map((val, idx) => {
                  const maxVal = 60;
                  const pct = Math.min(100, Math.max(6, (val / maxVal) * 100));
                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: `${pct}%`,
                        backgroundColor: usePool ? "var(--signal-green)" : "var(--signal-red)",
                        transition: "height 0.15s ease",
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "center",
                        paddingTop: "2px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "9px",
                          color: "#000",
                          fontWeight: 700,
                        }}
                      >
                        {val}M
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Code comparison excerpt */}
              <div
                style={{
                  marginTop: "16px",
                  padding: "12px",
                  border: "1px solid var(--border-base)",
                  backgroundColor: "var(--bg-canvas)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-high)",
                  lineHeight: 1.5,
                }}
              >
                {usePool ? (
                  <div>
                    <span style={{ color: "var(--signal-green)" }}>// DEEPAK&apos;S SYNC.POOL RECYCLER</span>
                    <br />
                    <code>buf := bytePool.Get().(*bytes.Buffer)</code>
                    <br />
                    <code>defer bytePool.Put(buf) // zero heap allocation</code>
                  </div>
                ) : (
                  <div>
                    <span style={{ color: "var(--signal-red)" }}>// NAIVE SLICE ALLOCATION</span>
                    <br />
                    <code>buf := make([]byte, 32*1024) // escapes to heap</code>
                    <br />
                    <code>// triggers Go GC STW pauses every 50ms</code>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Telemetry Metrics Table */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", borderBottom: "1px solid var(--border-base)", paddingBottom: "6px" }}>
                  BENCHMARK METRICS (GOLANG MICROBENCH)
                </div>

                <div className="metric-stat-box">
                  <div className="metric-stat-label">ALLOCATION PER REQUEST</div>
                  <div className="metric-stat-value" style={{ color: usePool ? "var(--signal-green)" : "var(--signal-red)" }}>
                    {metrics.allocPerOp}
                  </div>
                </div>

                <div className="metric-stat-box">
                  <div className="metric-stat-label">GARBAGE COLLECTION PAUSE (STW)</div>
                  <div className="metric-stat-value" style={{ color: usePool ? "var(--signal-green)" : "var(--signal-red)" }}>
                    {metrics.gcPause}
                  </div>
                </div>

                <div className="metric-stat-box">
                  <div className="metric-stat-label">RESIDENT HEAP FOOTPRINT</div>
                  <div className="metric-stat-value" style={{ color: usePool ? "var(--signal-green)" : "var(--signal-red)" }}>
                    {metrics.heapTotal}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  padding: "8px 12px",
                  border: "1px solid var(--border-base)",
                  backgroundColor: "var(--bg-subtle)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--text-dim)",
                }}
              >
                PROVEN IN PROJECT SENTINEL REVERSE PROXY // 10,000 CONCURRENT CLIENTS
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
