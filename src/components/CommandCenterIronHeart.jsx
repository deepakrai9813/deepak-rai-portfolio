import { useState } from "react";
import { Zap } from "./icons";

export default function CommandCenterIronHeart({ isOvercharged, onOvercharge }) {
  const [planningChat, setPlanningChat] = useState("Next task: Optimize API performance.");
  const [maintenanceStats, setMaintenanceStats] = useState({
    temp: "Optimal",
    power: "100%",
    health: "98%",
  });

  const handlePlanningClick = () => {
    const tasks = [
      "Next task: Optimize API performance.",
      "Next task: Run Toxiproxy latency benchmarks.",
      "Next task: Implement zero-alloc buffer pooling.",
      "Next task: Deploy production release to Render.",
    ];
    const next = tasks[(tasks.indexOf(planningChat) + 1) % tasks.length];
    setPlanningChat(next);
  };

  return (
    <div className="cc-center-stage">
      {/* 1. Elevated Planning Platform with Catwalk Bot */}
      <div className="cc-planning-station" onClick={handlePlanningClick} title="Click to view next task">
        <div className="cc-planning-bubble">
          <span>{planningChat}</span>
        </div>
        <div className="cc-planning-hud">
          <span className="cc-planning-badge">PLANNING</span>
          <div className="cc-planning-console">
            <span className="cc-console-screen" />
            <div className="cc-mini-catwalk-bot">
              <span className="cc-catwalk-head" />
              <span className="cc-catwalk-body" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pipe Code Emblem (< />) */}
      <div className="cc-pipe-code-badge" title="Code Pipeline Active">
        <span>&lt;/&gt;</span>
      </div>

      {/* 3. Maintenance Bay HUD Card (Mounted directly above Iron Heart) */}
      <div className="cc-panel cc-maintenance-card">
        <div className="cc-maintenance-title">MAINTENANCE BAY</div>
        <div className="cc-maintenance-items">
          <div className="cc-m-item">
            <span className="cc-check-icon">✓</span>
            <span className="cc-m-label">Temperature:</span>
            <span className="cc-m-val">{maintenanceStats.temp}</span>
          </div>
          <div className="cc-m-item">
            <span className="cc-check-icon">✓</span>
            <span className="cc-m-label">Power Output:</span>
            <span className="cc-m-val">{maintenanceStats.power}</span>
          </div>
          <div className="cc-m-item">
            <span className="cc-check-icon">✓</span>
            <span className="cc-m-label">System Health</span>
            <span className="cc-m-val green">{maintenanceStats.health}</span>
          </div>
        </div>
      </div>

      {/* 4. Triangular Arc Reactor ("IRON HEART") */}
      <div
        className={`cc-iron-heart-container ${isOvercharged ? "overcharged" : ""}`}
        onClick={onOvercharge}
        title="Click to boost Iron Heart Unibeam Power"
      >
        {/* Two Mini Bot Welders working on top of the reactor */}
        <div className="cc-reactor-welder left">
          <span className="cc-welder-body" />
          <span className="cc-welder-torch spark-left" />
        </div>
        <div className="cc-reactor-welder right">
          <span className="cc-welder-body" />
          <span className="cc-welder-torch spark-right" />
        </div>

        {/* Triangular Arc Reactor Housing */}
        <div className="cc-reactor-triangle-casing">
          {/* Outer Red/Crimson Armor Ring with Heat Fins */}
          <div className="cc-reactor-fins-ring" />

          {/* Glowing Triangular Core */}
          <div className="cc-reactor-tri-core">
            <div className="cc-tri-inner-glow" />
            <div className="cc-tri-frame">
              <svg viewBox="0 0 100 100" className="cc-tri-svg">
                <polygon points="50,15 90,85 10,85" className="cc-tri-poly-outer" />
                <polygon points="50,28 78,80 22,80" className="cc-tri-poly-mid" />
                <polygon points="50,42 66,74 34,74" className="cc-tri-poly-inner" />
              </svg>
            </div>
            <div className="cc-core-heartbeat-emitter" />
          </div>
        </div>

        {/* Base Plaque */}
        <div className="cc-iron-heart-plaque">
          <span className="cc-plaque-title">IRON HEART</span>
          <span className="cc-plaque-sub">Powering My Portfolio</span>
        </div>
      </div>
    </div>
  );
}
