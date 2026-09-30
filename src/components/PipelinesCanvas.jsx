import { useEffect, useRef, useState } from "react";
import { useMachineStore } from "../store/useMachineStore";

export default function PipelinesCanvas() {
  const { heartbeatTick, isOvercharged, powerLevel } = useMachineStore();
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger pulse wave on heartbeat tick
  useEffect(() => {
    setPulseKey((k) => k + 1);
  }, [heartbeatTick]);

  return (
    <div className="pipelines-overlay" aria-hidden="true">
      <svg className="pipelines-svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          {/* Cyan Data Glow */}
          <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gold Power Glow */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Red Control Glow */}
          <filter id="redGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse animation gradients */}
          <linearGradient id="cyanDataStream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3ee8ff" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#eafeff" stopOpacity="1" />
            <stop offset="100%" stopColor="#3ee8ff" stopOpacity="0.3" />
          </linearGradient>

          <linearGradient id="goldPowerStream" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f6b93b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#fff1c2" stopOpacity="1" />
            <stop offset="100%" stopColor="#d98a2b" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* 1. CENTRAL SPINE PIPELINES (Running down entire height) */}
        {/* Main Central Power Conduit (Gold) */}
        <path
          d="M 50% 380 L 50% 100%"
          className={`pipe-trunk pipe-gold ${isOvercharged ? "overcharged" : ""}`}
        />

        {/* Left Data Bus Conduit (Cyan) */}
        <path
          d="M calc(50% - 16px) 380 L calc(50% - 16px) 100%"
          className="pipe-trunk pipe-cyan"
        />

        {/* Right Telemetry Line (Crimson) */}
        <path
          d="M calc(50% + 16px) 380 L calc(50% + 16px) 100%"
          className="pipe-trunk pipe-red"
        />

        {/* 2. LATERAL BRANCHES FEEDING SECTORS */}
        {/* Branch 1: Reactor to Hero Diagnostics (Left & Right) */}
        <path d="M 50% 360 L 32% 360 L 32% 280" className="pipe-branch pipe-cyan" />
        <path d="M 50% 360 L 68% 360 L 68% 280" className="pipe-branch pipe-gold" />

        {/* Branch 2: Feeding Sector 02 (Skills Workshop) */}
        <path d="M calc(50% - 16px) 960 L 14% 960 L 14% 1100" className="pipe-branch pipe-cyan" />
        <path d="M 50% 980 L 34% 980 L 34% 1100" className="pipe-branch pipe-gold" />
        <path d="M 50% 980 L 66% 980 L 66% 1100" className="pipe-branch pipe-gold" />
        <path d="M calc(50% + 16px) 960 L 86% 960 L 86% 1100" className="pipe-branch pipe-cyan" />

        {/* Branch 3: Feeding Sector 03 (Projects Bay) */}
        <path d="M calc(50% - 16px) 1800 L 16% 1800 L 16% 1960" className="pipe-branch pipe-cyan" />
        <path d="M 50% 1820 L 50% 1820" className="pipe-branch pipe-gold" />
        <path d="M calc(50% + 16px) 1800 L 84% 1800 L 84% 1960" className="pipe-branch pipe-cyan" />

        {/* Branch 4: Feeding Sector 04 (Experience Bay) */}
        <path d="M calc(50% - 16px) 2750 L 22% 2750 L 22% 2880" className="pipe-branch pipe-gold" />
        <path d="M calc(50% + 16px) 2750 L 78% 2750 L 78% 2880" className="pipe-branch pipe-red" />

        {/* Branch 5: Feeding Sector 05 (Contact Terminal) */}
        <path d="M calc(50% - 16px) 3600 L 28% 3600 L 28% 3720" className="pipe-branch pipe-cyan" />
        <path d="M calc(50% + 16px) 3600 L 72% 3600 L 72% 3720" className="pipe-branch pipe-gold" />
      </svg>

      {/* Animated Traveling Data Packets on Conduits */}
      <div className="packet-track track-left" aria-hidden="true">
        <div className={`data-packet pkt-json ${isOvercharged ? "turbo" : ""}`}>
          <span className="packet-dot cyan" />
          <span className="packet-tag">JSON</span>
        </div>
        <div className={`data-packet pkt-sql ${isOvercharged ? "turbo" : ""}`}>
          <span className="packet-dot cyan" />
          <span className="packet-tag">SQL</span>
        </div>
        <div className={`data-packet pkt-jwt ${isOvercharged ? "turbo" : ""}`}>
          <span className="packet-dot red" />
          <span className="packet-tag">JWT</span>
        </div>
      </div>

      <div className="packet-track track-right" aria-hidden="true">
        <div className={`data-packet pkt-post ${isOvercharged ? "turbo" : ""}`}>
          <span className="packet-dot gold" />
          <span className="packet-tag">POST</span>
        </div>
        <div className={`data-packet pkt-ci ${isOvercharged ? "turbo" : ""}`}>
          <span className="packet-dot gold" />
          <span className="packet-tag">CI/CD</span>
        </div>
      </div>

      {/* Heartbeat Wave Surge Overlay */}
      <div key={pulseKey} className={`heartbeat-surge-wave ${isOvercharged ? "overcharge-surge" : ""}`} />
    </div>
  );
}
