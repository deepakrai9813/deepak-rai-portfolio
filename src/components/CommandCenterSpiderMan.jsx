import { useState } from "react";

export default function CommandCenterSpiderMan() {
  const [jiggling, setJiggling] = useState(false);

  const handleTrigger = () => {
    setJiggling(true);
    setTimeout(() => setJiggling(false), 900);
  };

  return (
    <div
      className={`cc-spider-corner-bottom ${jiggling ? "jiggling" : ""}`}
      onClick={handleTrigger}
      title="Peter Parker Protocol — Spider-Tech Active"
    >
      {/* Spider-Man Web SVG Matrix */}
      <svg viewBox="0 0 160 160" className="cc-spider-web-matrix">
        <line x1="160" y1="160" x2="0" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="160" y1="160" x2="20" y2="70" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="160" y1="160" x2="70" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="160" y1="160" x2="0" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        <line x1="160" y1="160" x2="120" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

        {/* Web Arcs */}
        <path d="M 120 160 Q 135 135 160 120" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9" />
        <path d="M 80 160 Q 110 110 160 80" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9" />
        <path d="M 40 160 Q 85 85 160 40" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9" />
      </svg>

      {/* Spider-Man Mask Badge */}
      <div className="cc-spider-mask-badge">
        <svg viewBox="0 0 36 44" width="28" height="34" className="cc-spider-mask-svg">
          {/* Mask Shape */}
          <path
            d="M 18,2 C 7,2 2,12 2,24 C 2,34 10,42 18,42 C 26,42 34,34 34,24 C 34,12 29,2 18,2 Z"
            fill="#b91c1c"
            stroke="#ef4444"
            strokeWidth="1.2"
          />
          {/* Web Lines on Mask */}
          <line x1="18" y1="2" x2="18" y2="42" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <line x1="2" y1="24" x2="34" y2="24" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <path d="M 6,14 Q 18,20 30,14" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          <path d="M 6,32 Q 18,28 30,32" fill="none" stroke="rgba(0,0,0,0.5)" strokeWidth="0.8" />
          {/* Left Eye */}
          <path
            d="M 6,18 Q 14,19 16,23 Q 13,28 6,21 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
          />
          {/* Right Eye */}
          <path
            d="M 30,18 Q 22,19 20,23 Q 23,28 30,21 Z"
            fill="#ffffff"
            stroke="#000000"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Iconic Spider-Man Quote */}
      <div className="cc-spider-quote">
        <span>With great code comes great responsibility. 🕷️</span>
      </div>
    </div>
  );
}
