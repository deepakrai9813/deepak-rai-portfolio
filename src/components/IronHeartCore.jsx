import { useState, useEffect } from "react";
import { useMachineStore } from "../store/useMachineStore";
import { playOverchargeSfx, playUiChirp, playSteamHiss } from "../utils/audioSystem";

export default function IronHeartCore() {
  const { isOvercharged, overchargeReactor, soundEnabled } = useMachineStore();
  const [sparkList, setSparkList] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const sparks = [];
      const count = isOvercharged ? 16 : 8;
      for (let i = 0; i < count; i++) {
        sparks.push({
          id: Math.random(),
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 50,
          size: Math.random() * 2.5 + 1.2,
          color: Math.random() > 0.5 ? "#3ee8ff" : "#f6b93b",
        });
      }
      setSparkList(sparks);
    }, 380);

    return () => clearInterval(interval);
  }, [isOvercharged]);

  const handleCoreClick = () => {
    if (soundEnabled) {
      playOverchargeSfx(true);
      playSteamHiss(true);
      playUiChirp(true, 1300);
    }
    overchargeReactor();
  };

  return (
    <div className="iron-heart-superstructure" aria-label="Iron Heart Quantum Arc Processor">
      {/* 1. Elevated Planning Catwalk (Top Center above reactor) */}
      <div className="planning-catwalk-gantry">
        <div className="planning-badge-bar">
          <span className="planning-pill">PLANNING</span>
          <div className="planning-holo-screen">
            <span className="screen-txt">Next task: Optimize API performance</span>
          </div>
        </div>
        {/* Planning Bots Meeting */}
        <div className="catwalk-bots-roster">
          <div className="stark-armor-bot" title="KUBO (DevOps Specialist)">
            <svg viewBox="0 0 32 36" width="24" height="27">
              {/* Helmet */}
              <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
              {/* Gold faceplate */}
              <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
              {/* Cyan Visor Eyes */}
              <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
              {/* Red Torso */}
              <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
              {/* Miniature Arc Reactor on Chest */}
              <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
            </svg>
          </div>

          <div className="stark-armor-bot" title="ROOT (Backend Engineer)">
            <svg viewBox="0 0 32 36" width="24" height="27">
              <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
              <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
              <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
              <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
              <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
            </svg>
          </div>
        </div>
        <div className="catwalk-steel-girder" />
      </div>

      {/* 2. Maintenance Bay Floating Diagnostic HUD */}
      <div className="maintenance-bay-hud">
        <div className="m-hud-header">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="3">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span className="m-hud-title">MAINTENANCE BAY</span>
        </div>
        <div className="m-hud-rows">
          <div className="m-hud-item">
            <span className="m-check">✓</span>
            <span className="m-label">Temperature:</span>
            <span className={`m-val ${isOvercharged ? "hot" : ""}`}>{isOvercharged ? "420 K" : "310 K"}</span>
          </div>
          <div className="m-hud-item">
            <span className="m-check">✓</span>
            <span className="m-label">Power Output:</span>
            <span className={`m-val ${isOvercharged ? "surge" : ""}`}>{isOvercharged ? "5.58 GW" : "3.85 GW"}</span>
          </div>
          <div className="m-hud-item">
            <span className="m-check">✓</span>
            <span className="m-label">System Health:</span>
            <span className="m-val-pill">98%</span>
          </div>
        </div>
      </div>

      {/* 3. The Central Inverted Triangular "IRON HEART" Processor */}
      <div
        className={`iron-heart-housing ${isOvercharged ? "overcharged" : ""}`}
        onClick={handleCoreClick}
        title="IRON HEART // Click to trigger quantum overcharge surge"
      >
        {/* Pulsing Concentric Energy Rings */}
        <div className="heart-pulse-wave ring-1" />
        <div className="heart-pulse-wave ring-2" />

        {/* Triangular Faceted Arc Die Package with Heavy Multi-Layer Armor */}
        <svg className="iron-heart-svg" viewBox="0 0 260 240" width="250" height="230">
          <defs>
            <filter id="plasmaGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b1" />
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="b2" />
              <feMerge>
                <feMergeNode in="b2" />
                <feMergeNode in="b1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <linearGradient id="starkRedArmor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff4d4a" />
              <stop offset="50%" stopColor="#e8322f" />
              <stop offset="100%" stopColor="#6e0f0d" />
            </linearGradient>

            <linearGradient id="starkGoldHeatsink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d98a2b" />
              <stop offset="50%" stopColor="#ffe699" />
              <stop offset="100%" stopColor="#d98a2b" />
            </linearGradient>

            <radialGradient id="plasmaHeart" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="35%" stopColor="#eafeff" stopOpacity="0.95" />
              <stop offset="65%" stopColor="#3ee8ff" stopOpacity="0.85" />
              <stop offset="90%" stopColor="#0b243e" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#040b14" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Outer Industrial Substrate Ring */}
          <polygon
            points="130,232 15,44 48,16 212,16 245,44"
            fill="#091422"
            stroke="#1d3654"
            strokeWidth="3.5"
          />

          {/* Faceted Stark Red Armor Plates */}
          <polygon
            points="130,218 30,50 56,26 204,26 230,50"
            fill="url(#starkRedArmor)"
            stroke="#f6b93b"
            strokeWidth="2.5"
          />

          {/* Copper Conductor Bus Bars (10 Segment Coils) */}
          {[
            { x1: 65, y1: 22, x2: 65, y2: 32 },
            { x1: 95, y1: 22, x2: 95, y2: 32 },
            { x1: 130, y1: 22, x2: 130, y2: 32 },
            { x1: 165, y1: 22, x2: 165, y2: 32 },
            { x1: 195, y1: 22, x2: 195, y2: 32 },
            { x1: 42, y1: 72, x2: 52, y2: 78 },
            { x1: 68, y1: 120, x2: 78, y2: 126 },
            { x1: 98, y1: 172, x2: 108, y2: 178 },
            { x1: 218, y1: 72, x2: 208, y2: 78 },
            { x1: 192, y1: 120, x2: 182, y2: 126 },
            { x1: 162, y1: 172, x2: 152, y2: 178 },
          ].map((coil, idx) => (
            <line
              key={idx}
              x1={coil.x1}
              y1={coil.y1}
              x2={coil.x2}
              y2={coil.y2}
              stroke="url(#starkGoldHeatsink)"
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}

          {/* Glowing Inner Triangular Frame */}
          <polygon
            points="130,192 56,62 204,62"
            fill="#06101c"
            stroke="#3ee8ff"
            strokeWidth="3.5"
            filter="url(#plasmaGlowFilter)"
          />

          {/* White-Hot Core Plasma Inverted Triangle */}
          <polygon
            points="130,168 76,76 184,76"
            fill="url(#plasmaHeart)"
            filter="url(#plasmaGlowFilter)"
            className="plasma-flame-poly"
          />

          {/* Central Reactor Arc Ring & Core Lens */}
          <circle cx="130,110" r="32" fill="none" stroke="#3ee8ff" strokeWidth="2.5" opacity="0.9" />
          <circle cx="130,110" r="20" fill="none" stroke="#eafeff" strokeWidth="2" />
          <circle cx="130,110" r="10" fill="#ffffff" filter="url(#plasmaGlowFilter)" />
        </svg>

        {/* 4. Two Maintenance Bots Actively Welding on the Rim */}
        <div className="core-welding-bots-layer">
          {/* Left Maintenance Bot */}
          <div className="core-welder-bot left" title="SPARK // Core Flux Calibration">
            <div className="welder-spark-torch left" />
            <svg viewBox="0 0 32 36" width="28" height="32">
              <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
              <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
              <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
              <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
              <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
            </svg>
          </div>

          {/* Right Maintenance Bot */}
          <div className="core-welder-bot right" title="WELDER // Tuning Induction Coils">
            <div className="welder-spark-torch right" />
            <svg viewBox="0 0 32 36" width="28" height="32">
              <polygon points="8,4 24,4 27,16 5,16" fill="#e8322f" stroke="#f6b93b" strokeWidth="1.2" />
              <polygon points="10,6 22,6 24,15 8,15" fill="#f6b93b" />
              <rect x="11" y="9" width="10" height="2.5" rx="1" fill="#3ee8ff" />
              <rect x="7" y="17" width="18" height="13" rx="2" fill="#e8322f" stroke="#f6b93b" strokeWidth="1" />
              <circle cx="16" cy="23" r="2.5" fill="#ffffff" stroke="#3ee8ff" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Welding Sparks Shower */}
        <div className="welding-sparks-host" aria-hidden="true">
          {sparkList.map((s) => (
            <span
              key={s.id}
              className="welding-spark-mote"
              style={{
                left: `calc(50% + ${s.x}px)`,
                top: `calc(38% + ${s.y}px)`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                backgroundColor: s.color,
                boxShadow: `0 0 8px ${s.color}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* 5. Industrial Turbine Dais Platform with Glowing Blue Neon Base */}
      <div className="iron-heart-dais-platform">
        <div className="dais-turbine-vents">
          <span className="vent" />
          <span className="vent" />
          <span className="vent" />
          <span className="vent" />
          <span className="vent" />
        </div>
        <div className="dais-plate-text">
          <span className="dais-brand">IRON HEART</span>
          <span className="dais-sub">Powering My Portfolio</span>
        </div>
      </div>
    </div>
  );
}
