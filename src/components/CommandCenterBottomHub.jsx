import { useState, useEffect } from "react";

export default function CommandCenterBottomHub() {
  const [waveOffset, setWaveOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prev) => (prev + 1) % 100);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleDownloadResume = () => {
    const a = document.createElement("a");
    a.href = "/Deepak-Kumar-Resume.pdf";
    a.download = "Deepak-Kumar-Resume.pdf";
    a.click();
  };

  return (
    <div className="cc-bottom-hub-row">
      {/* 1. DATA FLOW Terminal */}
      <div className="cc-panel cc-data-flow-card">
        <span className="cc-card-title mini">DATA FLOW</span>

        <div className="cc-data-flow-content">
          {/* Animated Waveform Canvas / SVG */}
          <div className="cc-waveform-box">
            <svg viewBox="0 0 160 50" className="cc-waveform-svg">
              <path
                d={`M 0,25 Q 15,${10 + Math.sin(waveOffset * 0.2) * 12} 30,25 T 60,${15 + Math.cos(waveOffset * 0.2) * 12} T 90,${30 + Math.sin(waveOffset * 0.3) * 14} T 120,${20 + Math.cos(waveOffset * 0.25) * 10} T 160,25`}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="1.8"
              />
              <path
                d={`M 0,25 Q 12,${35 + Math.sin(waveOffset * 0.15) * 10} 35,25 T 70,${32 + Math.cos(waveOffset * 0.18) * 10} T 105,${18 + Math.sin(waveOffset * 0.22) * 12} T 140,${28 + Math.cos(waveOffset * 0.2) * 8} T 160,25`}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.2"
                opacity="0.8"
              />
            </svg>
          </div>

          {/* Metrics List */}
          <ul className="cc-flow-metrics">
            <li><span className="dot green" /> Frontend</li>
            <li><span className="dot cyan" /> Backend</li>
            <li><span className="dot green" /> Database</li>
            <li><span className="dot cyan" /> API</li>
            <li><span className="dot gold" /> Users</li>
          </ul>
        </div>
      </div>

      {/* 2. RESUME Download Terminal */}
      <div
        className="cc-panel cc-resume-card"
        onClick={handleDownloadResume}
        title="Download Deepak Kumar's Resume (PDF)"
      >
        <span className="cc-card-title mini">RESUME</span>
        <div className="cc-resume-body">
          <div className="cc-doc-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#38bdf8" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
          </div>
          <div className="cc-resume-text">
            <span className="cc-resume-btn-label">Download</span>
            <span className="cc-resume-btn-sub">My Resume</span>
          </div>
        </div>
      </div>
    </div>
  );
}
