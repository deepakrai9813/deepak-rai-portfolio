import { useState } from "react";

export default function VibeWidget() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div className="vibe-floating-widget" title="Current coding focus track">
      <div className="vibe-icon-wrapper" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <div className="vibe-equalizer-bars">
            <span className="eq-bar bar-1" />
            <span className="eq-bar bar-2" />
            <span className="eq-bar bar-3" />
            <span className="eq-bar bar-4" />
          </div>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
      </div>

      <div className="vibe-text-info">
        <span className="vibe-label">CODING FOCUS // 128 BPM</span>
        <span className="vibe-track">Deep Work &bull; Event-Driven Microservices</span>
      </div>

      <div className="vibe-badge-pill">
        <span>IN THE ZONE</span>
      </div>
    </div>
  );
}
