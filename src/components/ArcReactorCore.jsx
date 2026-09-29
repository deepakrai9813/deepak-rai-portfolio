import { useState, useEffect } from "react";
import { Zap, ShieldCheck, RefreshCw, Cpu, Activity } from "./icons";

export default function ArcReactorCore({ onOvercharge, isOvercharged }) {
  const [powerOutput, setPowerOutput] = useState(3.84);
  const [coreStatus, setCoreStatus] = useState("OPTIMAL (3.84 GJ/s)");
  const [isScanning, setIsScanning] = useState(false);
  const [maintenanceLog, setMaintenanceLog] = useState([
    "Palladium coil calibration: 100% verified",
    "Energy conduit transfer active across 5 cabins",
    "Zero packet jitter on distributed pipeline bus",
  ]);

  // Periodic simulated maintenance log update
  useEffect(() => {
    const interval = setInterval(() => {
      const logs = [
        "Thermal dispersion nominal across Stark conduits",
        "Conduit throughput sustained: 50,000+ QPS",
        "Harmonic resonance locked at 120.4 MHz",
        "Backup quantum capacitors 100% primed",
        "Bot DUM-E: Re-torqued induction coil #04",
      ];
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setMaintenanceLog((prev) => [randomLog, prev[0], prev[1]]);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleMaintenanceScan = () => {
    setIsScanning(true);
    setMaintenanceLog((prev) => [
      "DIAGNOSTIC SCAN INITIATED: Full coil integrity verified",
      ...prev.slice(0, 2),
    ]);
    setTimeout(() => setIsScanning(false), 2400);
  };

  const handleBoost = () => {
    onOvercharge?.();
    setPowerOutput(7.68);
    setCoreStatus("UNIBEAM OVERCHARGE (7.68 GJ/s)");
    setMaintenanceLog((prev) => [
      "OVERCHARGE PROTOCOL ENGAGED: Energy pulse accelerated!",
      ...prev.slice(0, 2),
    ]);
    setTimeout(() => {
      setPowerOutput(3.84);
      setCoreStatus("OPTIMAL (3.84 GJ/s)");
    }, 2500);
  };

  return (
    <div className="arc-reactor-central-stage">
      {/* Visual Pipeline Conduits Branching from the Reactor */}
      <div className="conduit-emitter-nodes">
        <span className="emitter-line left-line" />
        <span className="emitter-line right-line" />
        <span className="emitter-line top-line" />
        <span className="emitter-line bottom-line" />
      </div>

      <div className="arc-reactor-grid-layout">
        {/* The Central Realistic Arc Reactor ("Iron Heart") */}
        <div className={`arc-reactor-heart ${isOvercharged ? "overcharged" : ""}`}>
          <div className="reactor-outer-casing">
            {/* Outer Rotational Ring with Segments */}
            <div className="reactor-rotating-ring outer" />
            <div className="reactor-rotating-ring inner" />

            {/* Electromagnetic Copper Coils Array */}
            <div className="reactor-coils-array">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="reactor-copper-coil"
                  style={{ transform: `rotate(${i * 36}deg)` }}
                >
                  <span className="coil-core" />
                  <span className="coil-wire" />
                </div>
              ))}
            </div>

            {/* Central Palladium Energy Heart */}
            <div className="reactor-palladium-center">
              <div className="reactor-inner-glow" />
              <div className="reactor-tri-segment" />
              <div className="reactor-heartbeat-emitter" />
              <div className="reactor-plasma-sparkles" />
            </div>

            {/* Active Laser Inspection Beam from Bot */}
            {isScanning && <div className="bot-laser-inspection-ray" />}
          </div>

          {/* Reactor Title & Real-Time Energy Readout */}
          <div className="reactor-telemetry-badge">
            <span className="badge-pulse-dot" />
            <span className="badge-energy-val">ARC CORE: {powerOutput} GJ/S</span>
            <span className="badge-energy-status">{coreStatus}</span>
          </div>

          <div className="reactor-actions-row">
            <button
              type="button"
              className={`btn-reactor-boost ${isOvercharged ? "active" : ""}`}
              onClick={handleBoost}
              title="Trigger Unibeam Energy Overcharge"
            >
              <Zap width={14} height={14} />
              <span>{isOvercharged ? "OVERCHARGED!" : "OVERCHARGE ARC CORE"}</span>
            </button>
          </div>
        </div>

        {/* Maintenance Bay Cabin (Directly alongside the Iron Heart) */}
        <div className="stark-cabin-card maintenance-bay">
          <div className="cabin-header">
            <div className="cabin-title-group">
              <span className="cabin-badge gold">CABIN 00 // POWER CORE</span>
              <h4 className="cabin-name">ARC MAINTENANCE BAY</h4>
            </div>
            <span className="cabin-status-led live" />
          </div>

          {/* Dedicated Maintenance Bot (DUM-E // MK-VII) */}
          <div className="maintenance-bot-display">
            <div className={`bot-avatar-chassis ${isScanning ? "scanning" : ""}`}>
              <div className="bot-head">
                <span className="bot-eye-glow" />
                <span className="bot-sensor-dish" />
              </div>
              <div className="bot-mechanical-arm">
                <span className="arm-joint-upper" />
                <span className="arm-joint-lower" />
                <span className="bot-tool-claw" />
              </div>
              <div className="bot-base-treads">
                <span className="tread-track" />
              </div>
            </div>

            <div className="bot-profile-info">
              <div className="bot-name">BOT UNIT: DUM-E (MK-VII)</div>
              <div className="bot-role">PRIMARY ARC REACTOR INSPECTOR</div>
              <p className="bot-dialogue">
                &ldquo;Monitoring thermal dispersion and quantum plasma containment. All 10 copper
                induction coils operating at 99.98% efficiency.&rdquo;
              </p>
            </div>
          </div>

          {/* Live Diagnostic Logs */}
          <div className="maintenance-log-terminal">
            <div className="log-terminal-header">
              <Activity width={12} height={12} />
              <span>REAL-TIME DIAGNOSTIC BUS:</span>
            </div>
            <ul className="log-entries-list">
              {maintenanceLog.map((log, idx) => (
                <li key={idx} className="log-entry">
                  <span className="log-timestamp">&gt;</span>
                  <span className="log-text">{log}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bot Action Trigger */}
          <button
            type="button"
            className="btn-cabin-action"
            onClick={handleMaintenanceScan}
            disabled={isScanning}
          >
            <ShieldCheck width={14} height={14} />
            <span>{isScanning ? "SCANNING COILS IN 3D..." : "RUN FULL DIAGNOSTIC SCAN"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
