import { useState } from "react";

export default function SpiderWebCorner() {
  const [jiggleLeft, setJiggleLeft] = useState(false);
  const [jiggleRight, setJiggleRight] = useState(false);

  const handleHoverLeft = () => {
    setJiggleLeft(true);
    setTimeout(() => setJiggleLeft(false), 800);
  };

  const handleHoverRight = () => {
    setJiggleRight(true);
    setTimeout(() => setJiggleRight(false), 800);
  };

  return (
    <div className="spider-web-corners-container" aria-hidden="true">
      {/* Top-Left Realistic Web Matrix */}
      <div
        className={`spider-web-anchor left-corner ${jiggleLeft ? "jiggle" : ""}`}
        onMouseEnter={handleHoverLeft}
        title="Spider-Man Web Matrix (5% Peter Parker Tech)"
      >
        <svg viewBox="0 0 160 160" className="web-svg">
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="160" y2="0" className="web-spoke" />
          <line x1="0" y1="0" x2="148" y2="40" className="web-spoke" />
          <line x1="0" y1="0" x2="128" y2="80" className="web-spoke" />
          <line x1="0" y1="0" x2="96" y2="120" className="web-spoke" />
          <line x1="0" y1="0" x2="55" y2="148" className="web-spoke" />
          <line x1="0" y1="0" x2="0" y2="160" className="web-spoke" />

          {/* Web Spiral Arcs */}
          <path d="M 0 30 Q 15 28 28 15 Q 29 5 30 0" className="web-ring ring-1" />
          <path d="M 0 65 Q 35 60 60 35 Q 62 10 65 0" className="web-ring ring-2" />
          <path d="M 0 105 Q 60 98 98 60 Q 100 20 105 0" className="web-ring ring-3" />
          <path d="M 0 148 Q 90 135 135 90 Q 140 30 148 0" className="web-ring ring-4" />
        </svg>
      </div>

      {/* Top-Right Realistic Web Matrix with Hanging Spider Emblem */}
      <div
        className={`spider-web-anchor right-corner ${jiggleRight ? "jiggle" : ""}`}
        onMouseEnter={handleHoverRight}
        title="Spider-Man Web Matrix with Hanging Emblem"
      >
        <svg viewBox="0 0 160 160" className="web-svg flip-x">
          {/* Radial Spokes */}
          <line x1="0" y1="0" x2="160" y2="0" className="web-spoke" />
          <line x1="0" y1="0" x2="148" y2="40" className="web-spoke" />
          <line x1="0" y1="0" x2="128" y2="80" className="web-spoke" />
          <line x1="0" y1="0" x2="96" y2="120" className="web-spoke" />
          <line x1="0" y1="0" x2="55" y2="148" className="web-spoke" />
          <line x1="0" y1="0" x2="0" y2="160" className="web-spoke" />

          {/* Web Spiral Arcs */}
          <path d="M 0 30 Q 15 28 28 15 Q 29 5 30 0" className="web-ring ring-1" />
          <path d="M 0 65 Q 35 60 60 35 Q 62 10 65 0" className="web-ring ring-2" />
          <path d="M 0 105 Q 60 98 98 60 Q 100 20 105 0" className="web-ring ring-3" />
          <path d="M 0 148 Q 90 135 135 90 Q 140 30 148 0" className="web-ring ring-4" />
        </svg>

        {/* Subtle Hanging Spider Filament */}
        <div className="spider-hanging-filament">
          <span className="silk-thread" />
          <div className="mini-spider-emblem">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C10.9 2 10 2.9 10 4V7C8.9 7 8 7.9 8 9V11H6V9C6 7.9 5.1 7 4 7S2 7.9 2 9V13C2 14.1 2.9 15 4 15H6V17C6 18.1 6.9 19 8 19H10V22H14V19H16C17.1 19 18 18.1 18 17V15H20C21.1 15 22 14.1 22 13V9C22 7.9 21.1 7 20 7S18 7.9 18 9V11H16V9C16 7.9 15.1 7 14 7V4C14 2.9 13.1 2 12 2Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
