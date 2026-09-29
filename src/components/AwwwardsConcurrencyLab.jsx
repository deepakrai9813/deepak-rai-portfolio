import { useState, useId } from "react";
import { Zap, Activity, ShieldCheck, RefreshCw } from "./icons";

export default function AwwwardsConcurrencyLab() {
  const [concurrency, setConcurrency] = useState(25000);
  const [mode, setMode] = useState("pool"); // "pool" | "standard"
  const [isSpiking, setIsSpiking] = useState(false);
  const sliderId = useId();

  const effectiveConcurrency = isSpiking ? concurrency * 2 : concurrency;

  // Realistically modeled Go runtime metrics
  const standardHeapMB = parseFloat(((effectiveConcurrency * 1.6) / 1024).toFixed(1));
  const poolHeapMB = parseFloat((1.2 + (effectiveConcurrency / 50000) * 0.6).toFixed(1));
  const activeHeap = mode === "pool" ? poolHeapMB : standardHeapMB;

  const standardGcPauseMs = parseFloat((8.4 + (effectiveConcurrency / 10000) * 2.8).toFixed(2));
  const poolGcPauseMs = 0.08;
  const activeGcPause = mode === "pool" ? poolGcPauseMs : standardGcPauseMs;

  const standardQps = Math.round(effectiveConcurrency * 0.95);
  const poolQps = Math.round(effectiveConcurrency * 4.6);
  const activeQps = mode === "pool" ? poolQps : standardQps;

  const memorySavedPct = Math.round(((standardHeapMB - poolHeapMB) / standardHeapMB) * 100);

  const handleSpike = () => {
    setIsSpiking(true);
    setTimeout(() => setIsSpiking(false), 1800);
  };

  return (
    <section id="concurrency-lab" className="awwwards-lab-section">
      <div className="container">
        {/* Section Header */}
        <div className="awwwards-section-header">
          <div className="header-eyebrow">
            <span className="eyebrow-num">// 04</span>
            <span>INTERACTIVE RUNTIME PROFILER · UIVERSE SLIDER LAB</span>
          </div>
          <h2 className="header-headline">
            CONCURRENCY &amp; ZERO-ALLOC LAB
          </h2>
          <p className="header-description">
            Experience how lock-free buffer recycling (`sync.Pool`) prevents garbage collection
            stop-the-world pauses and collapses memory footprint under heavy concurrency in Go.
          </p>
        </div>

        {/* Workbench Chassis */}
        <div className="lab-workbench-chassis">
          {/* Controls Bar */}
          <div className="lab-controls-bar">
            {/* Memory Strategy Toggle */}
            <div className="lab-strategy-selector">
              <span className="strategy-label">MEMORY STRATEGY:</span>
              <div className="strategy-btn-group">
                <button
                  type="button"
                  className={`uiverse-strategy-btn ${mode === "pool" ? "active" : ""}`}
                  onClick={() => setMode("pool")}
                >
                  <span className="strategy-dot green" />
                  <span>01 // DEEPAK'S ZERO-ALLOC sync.Pool</span>
                </button>
                <button
                  type="button"
                  className={`uiverse-strategy-btn ${mode === "standard" ? "active" : ""}`}
                  onClick={() => setMode("standard")}
                >
                  <span className="strategy-dot red" />
                  <span>02 // CONVENTIONAL HEAP ALLOCATION</span>
                </button>
              </div>
            </div>

            {/* Spike Test Button */}
            <button
              type="button"
              className={`uiverse-spike-action-btn ${isSpiking ? "active" : ""}`}
              onClick={handleSpike}
            >
              <Zap width={14} height={14} />
              <span>{isSpiking ? "SPIKE SIMULATING (2X)..." : "TRIGGER 2X TRAFFIC SPIKE"}</span>
            </button>
          </div>

          {/* Uiverse Slider Box */}
          <div className="lab-slider-container">
            <div className="slider-label-row">
              <label htmlFor={sliderId} className="slider-caption">
                SIMULATED CONCURRENT CONNECTIONS:
              </label>
              <span className="slider-counter">
                {effectiveConcurrency.toLocaleString()} GOROUTINES
              </span>
            </div>
            <input
              id={sliderId}
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="uiverse-neon-slider"
            />
            <div className="slider-legend-row">
              <span>1,000 (Baseline)</span>
              <span>15,000</span>
              <span>30,000</span>
              <span>50,000 (Heavy Burst)</span>
            </div>
          </div>

          {/* Real-Time Metrics Telemetry Triad */}
          <div className="lab-telemetry-triad">
            {/* Metric 1 */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="card-k">HEAP MEMORY FOOTPRINT</span>
                <span className={`card-badge ${mode === "pool" ? "green" : "warn"}`}>
                  {mode === "pool" ? `-${memorySavedPct}% REDUCTION` : "HEAP EXPLOSION"}
                </span>
              </div>
              <div className="card-big-metric">
                {activeHeap} <span className="metric-unit">MB</span>
              </div>
              <div className="uiverse-bar-track">
                <div
                  className={`uiverse-bar-fill ${mode === "pool" ? "green" : "red"}`}
                  style={{ width: `${Math.min((activeHeap / 80) * 100, 100)}%` }}
                />
              </div>
              <p className="card-desc-note">
                {mode === "pool"
                  ? "Pre-allocated byte slices reused across requests"
                  : "New byte buffers allocated on heap per connection"}
              </p>
            </div>

            {/* Metric 2 */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="card-k">GC PAUSE DURATION (P99)</span>
                <span className={`card-badge ${mode === "pool" ? "green" : "warn"}`}>
                  {mode === "pool" ? "ZERO GC PRESSURE" : "STOP-THE-WORLD SPIKE"}
                </span>
              </div>
              <div className="card-big-metric">
                {activeGcPause} <span className="metric-unit">MS</span>
              </div>
              <div className="uiverse-bar-track">
                <div
                  className={`uiverse-bar-fill ${mode === "pool" ? "green" : "red"}`}
                  style={{ width: `${Math.min((activeGcPause / 25) * 100, 100)}%` }}
                />
              </div>
              <p className="card-desc-note">
                {mode === "pool"
                  ? "Near-zero heap allocations eliminate GC trigger sweeps"
                  : "Frequent scavenger sweeps freeze Go worker threads"}
              </p>
            </div>

            {/* Metric 3 */}
            <div className="telemetry-card">
              <div className="telemetry-card-top">
                <span className="card-k">THROUGHPUT CAPACITY</span>
                <span className={`card-badge ${mode === "pool" ? "green" : "warn"}`}>
                  {mode === "pool" ? "4.6X EFFICIENCY" : "GC BOTTLENECKED"}
                </span>
              </div>
              <div className="card-big-metric">
                {activeQps.toLocaleString()} <span className="metric-unit">REQ/S</span>
              </div>
              <div className="uiverse-bar-track">
                <div
                  className="uiverse-bar-fill green"
                  style={{ width: `${Math.min((activeQps / 230000) * 100, 100)}%` }}
                />
              </div>
              <p className="card-desc-note">
                {mode === "pool"
                  ? "100% CPU cycles dedicated to socket I/O dispatch"
                  : "Up to 60% CPU cycles wasted in runtime.mallocgc"}
              </p>
            </div>
          </div>

          {/* Verdict Inset */}
          <div className="lab-verdict-inset">
            <span className="verdict-tag">ENGINEERING VERDICT:</span>
            <p className="verdict-content">
              In high-scale systems like <strong>Project Sentinel</strong>, treating memory
              allocation as a primary architectural primitive rather than an afterthought enables
              sub-millisecond tail latencies and allows a single lean Go binary to handle over 50,000
              concurrent streams on commodity cloud instances.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
