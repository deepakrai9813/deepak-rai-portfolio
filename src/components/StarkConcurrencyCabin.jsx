import { useState, useId } from "react";
import { Zap, Activity, ShieldCheck, RefreshCw } from "./icons";

export default function StarkConcurrencyCabin() {
  const [concurrency, setConcurrency] = useState(25000);
  const [strategy, setStrategy] = useState("pool"); // "pool" | "heap"
  const [isOverdriven, setIsOverdriven] = useState(false);
  const sliderId = useId();

  const effectiveConcurrency = isOverdriven ? concurrency * 2 : concurrency;

  // Realistically modeled Go runtime metrics
  const standardHeapMB = parseFloat(((effectiveConcurrency * 1.6) / 1024).toFixed(1));
  const poolHeapMB = parseFloat((1.2 + (effectiveConcurrency / 50000) * 0.6).toFixed(1));
  const activeHeap = strategy === "pool" ? poolHeapMB : standardHeapMB;

  const standardGcPauseMs = parseFloat((8.4 + (effectiveConcurrency / 10000) * 2.8).toFixed(2));
  const poolGcPauseMs = 0.08;
  const activeGcPause = strategy === "pool" ? poolGcPauseMs : standardGcPauseMs;

  const standardQps = Math.round(effectiveConcurrency * 0.95);
  const poolQps = Math.round(effectiveConcurrency * 4.6);
  const activeQps = strategy === "pool" ? poolQps : standardQps;

  const memorySavedPct = Math.round(((standardHeapMB - poolHeapMB) / standardHeapMB) * 100);

  const handleOverdrive = () => {
    setIsOverdriven(true);
    setTimeout(() => setIsOverdriven(false), 2000);
  };

  return (
    <section id="concurrency-cabin" className="stark-cabin-section">
      <div className="container">
        {/* Pipeline Junction Node Entrance */}
        <div className="cabin-pipeline-junction">
          <span className="junction-pipe-feed" />
          <span className="junction-indicator-light" />
          <span className="junction-label">POWER INFEED // REVERSE PROXY PROPULSION BUS</span>
        </div>

        {/* Section Header */}
        <div className="stark-cabin-header">
          <div className="header-kicker">
            <span className="kicker-tag gold">CABIN 02 // PROPULSION BENCH</span>
            <span>SUPERVISED BY BOT: BENCH-MASTER (MK-VI)</span>
          </div>
          <h2 className="cabin-title">
            GO CONCURRENCY &amp; ZERO-ALLOC BENCHMARK
          </h2>
          <p className="cabin-description">
            Experience how lock-free buffer recycling (`sync.Pool`) prevents garbage collector
            stop-the-world pauses and sustains 50,000+ concurrent requests under extreme load.
          </p>
        </div>

        {/* Workbench Chassis */}
        <div className="concurrency-cabin-workbench">
          {/* Controls Bar */}
          <div className="workbench-top-bar">
            <div className="strategy-toggle-group">
              <span className="strategy-heading">BUFFER ENGINE:</span>
              <div className="strategy-buttons">
                <button
                  type="button"
                  className={`btn-strategy ${strategy === "pool" ? "active" : ""}`}
                  onClick={() => setStrategy("pool")}
                >
                  <span className="status-dot green" />
                  <span>01 // DEEPAK&apos;S ZERO-ALLOC sync.Pool</span>
                </button>
                <button
                  type="button"
                  className={`btn-strategy ${strategy === "heap" ? "active" : ""}`}
                  onClick={() => setStrategy("heap")}
                >
                  <span className="status-dot red" />
                  <span>02 // CONVENTIONAL HEAP ALLOCATIONS</span>
                </button>
              </div>
            </div>

            {/* Overdrive Action */}
            <button
              type="button"
              className={`btn-overdrive ${isOverdriven ? "active" : ""}`}
              onClick={handleOverdrive}
            >
              <Zap width={14} height={14} />
              <span>{isOverdriven ? "OVERDRIVE SURGE (2X)!" : "ENGAGE UNIBEAM SURGE"}</span>
            </button>
          </div>

          {/* Slider Container */}
          <div className="slider-dock-container">
            <div className="slider-header">
              <label htmlFor={sliderId} className="slider-title">
                SIMULATED CONCURRENT CONNECTIONS:
              </label>
              <span className="slider-readout">
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
              className="stark-arc-slider"
            />
            <div className="slider-range-legend">
              <span>1,000 (Baseline)</span>
              <span>15,000</span>
              <span>30,000</span>
              <span>50,000 (Maximum Armor Load)</span>
            </div>
          </div>

          {/* Telemetry Grid */}
          <div className="cabin-telemetry-grid">
            {/* Box 1 */}
            <div className="telemetry-pod-card">
              <div className="pod-header">
                <span className="pod-label">HEAP MEMORY FOOTPRINT</span>
                <span className={`pod-badge ${strategy === "pool" ? "green" : "warn"}`}>
                  {strategy === "pool" ? `-${memorySavedPct}% REDUCTION` : "HEAP EXPLOSION"}
                </span>
              </div>
              <div className="pod-big-value">
                {activeHeap} <span className="unit">MB</span>
              </div>
              <div className="pod-bar-meter">
                <div
                  className={`pod-bar-fill ${strategy === "pool" ? "cyan" : "red"}`}
                  style={{ width: `${Math.min((activeHeap / 80) * 100, 100)}%` }}
                />
              </div>
              <p className="pod-detail">
                {strategy === "pool"
                  ? "Pre-allocated byte slices reused across requests via sync.Pool"
                  : "New byte buffers allocated on heap per connection"}
              </p>
            </div>

            {/* Box 2 */}
            <div className="telemetry-pod-card">
              <div className="pod-header">
                <span className="pod-label">GC PAUSE DURATION (P99)</span>
                <span className={`pod-badge ${strategy === "pool" ? "green" : "warn"}`}>
                  {strategy === "pool" ? "ZERO GC PRESSURE" : "STOP-THE-WORLD SPIKE"}
                </span>
              </div>
              <div className="pod-big-value">
                {activeGcPause} <span className="unit">MS</span>
              </div>
              <div className="pod-bar-meter">
                <div
                  className={`pod-bar-fill ${strategy === "pool" ? "cyan" : "red"}`}
                  style={{ width: `${Math.min((activeGcPause / 25) * 100, 100)}%` }}
                />
              </div>
              <p className="pod-detail">
                {strategy === "pool"
                  ? "Near-zero heap allocations eliminate GC trigger sweeps"
                  : "Frequent scavenger sweeps freeze Go worker threads"}
              </p>
            </div>

            {/* Box 3 */}
            <div className="telemetry-pod-card">
              <div className="pod-header">
                <span className="pod-label">THROUGHPUT CAPACITY</span>
                <span className={`pod-badge ${strategy === "pool" ? "green" : "warn"}`}>
                  {strategy === "pool" ? "4.6X EFFICIENCY" : "GC BOTTLENECKED"}
                </span>
              </div>
              <div className="pod-big-value">
                {activeQps.toLocaleString()} <span className="unit">REQ/S</span>
              </div>
              <div className="pod-bar-meter">
                <div
                  className="pod-bar-fill gold"
                  style={{ width: `${Math.min((activeQps / 230000) * 100, 100)}%` }}
                />
              </div>
              <p className="pod-detail">
                {strategy === "pool"
                  ? "100% CPU cycles dedicated to socket I/O dispatch"
                  : "Up to 60% CPU cycles wasted in runtime.mallocgc"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
