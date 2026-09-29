import { useState } from "react";
import { VISUALS_GALLERY } from "../utils/data";
import { playClick, playPop } from "../utils/soundFx";

export default function Visuals() {
  const [selectedVisual, setSelectedVisual] = useState(null);

  return (
    <section id="visuals" className="framer-section framer-visuals-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">BLUEPRINTS & CRAFT</span>
          <h2 className="section-title">NOW SOME VISUALS</h2>
          <p className="section-subtitle">
            System architecture blueprints, distributed topologies & interface design tokens.
          </p>
        </div>

        {/* Visual Cards Grid */}
        <div className="visuals-grid">
          {VISUALS_GALLERY.map((v) => (
            <div
              key={v.id}
              className="visual-card"
              onClick={() => {
                playPop();
                setSelectedVisual(v);
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setSelectedVisual(v);
              }}
              title="Click to expand architecture diagram"
            >
              {/* Graphic Display Area */}
              <div className="visual-graphic-container">
                <div
                  className="visual-glow-orb"
                  style={{ background: v.accent }}
                />
                
                {/* Vector Diagram Art */}
                <div className="visual-svg-canvas">
                  {v.id === "v-arch" && (
                    <svg viewBox="0 0 300 160" className="v-art-svg">
                      <rect x="20" y="20" width="70" height="40" rx="8" fill="#1e1e24" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="55" y="44" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="Space Grotesk">Clients</text>
                      
                      <path d="M 90 40 L 130 40" stroke="#6366f1" strokeWidth="2" strokeDasharray="3,3" />
                      
                      <rect x="130" y="15" width="80" height="50" rx="8" fill="#1e1e24" stroke="#818cf8" strokeWidth="1.5" />
                      <text x="170" y="38" fill="#fff" fontSize="10" textAnchor="middle" fontFamily="Space Grotesk">Event Bus</text>
                      <text x="170" y="52" fill="#818cf8" fontSize="8" textAnchor="middle">Redis PubSub</text>
                      
                      <path d="M 210 40 L 250 40" stroke="#818cf8" strokeWidth="2" />
                      
                      <rect x="250" y="20" width="40" height="40" rx="8" fill="#1e1e24" stroke="#a5b4fc" strokeWidth="1.5" />
                      <text x="270" y="44" fill="#fff" fontSize="9" textAnchor="middle">API</text>
                      
                      <circle cx="170" cy="115" r="25" fill="#1e1e24" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="170" y="118" fill="#c7d2fe" fontSize="8" textAnchor="middle">Workers</text>
                      
                      <line x1="170" y1="65" x2="170" y2="90" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" />
                    </svg>
                  )}

                  {v.id === "v-db" && (
                    <svg viewBox="0 0 300 160" className="v-art-svg">
                      <ellipse cx="150" cy="30" rx="45" ry="12" fill="#1e1e24" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M 105 30 V 55 A 45 12 0 0 0 195 55 V 30" fill="#1e1e24" stroke="#10b981" strokeWidth="1.5" />
                      <text x="150" y="46" fill="#fff" fontSize="9" textAnchor="middle" fontFamily="Space Grotesk">Primary Shard</text>

                      <path d="M 125 55 L 75 105" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />
                      <path d="M 175 55 L 225 105" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3,3" />

                      <ellipse cx="75" cy="115" rx="35" ry="10" fill="#1e1e24" stroke="#34d399" strokeWidth="1.5" />
                      <path d="M 40 115 V 135 A 35 10 0 0 0 110 135 V 115" fill="#1e1e24" stroke="#34d399" strokeWidth="1.5" />
                      <text x="75" y="128" fill="#a7f3d0" fontSize="8" textAnchor="middle">Replica A</text>

                      <ellipse cx="225" cy="115" rx="35" ry="10" fill="#1e1e24" stroke="#34d399" strokeWidth="1.5" />
                      <path d="M 190 115 V 135 A 35 10 0 0 0 260 135 V 115" fill="#1e1e24" stroke="#34d399" strokeWidth="1.5" />
                      <text x="225" y="128" fill="#a7f3d0" fontSize="8" textAnchor="middle">Replica B</text>
                    </svg>
                  )}

                  {v.id === "v-design" && (
                    <svg viewBox="0 0 300 160" className="v-art-svg">
                      <rect x="25" y="25" width="60" height="25" rx="6" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="55" y="41" fill="#fef3c7" fontSize="8" textAnchor="middle">--font-display</text>

                      <rect x="95" y="25" width="60" height="25" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                      <text x="125" y="41" fill="#d1fae5" fontSize="8" textAnchor="middle">--color-bg</text>

                      <rect x="165" y="25" width="60" height="25" rx="6" fill="#6366f1" fillOpacity="0.2" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="195" y="41" fill="#e0e7ff" fontSize="8" textAnchor="middle">--spacing-md</text>

                      <rect x="235" y="25" width="45" height="25" rx="6" fill="#ec4899" fillOpacity="0.2" stroke="#ec4899" strokeWidth="1.5" />
                      <text x="257" y="41" fill="#fce7f3" fontSize="8" textAnchor="middle">--radius</text>

                      <rect x="30" y="75" width="240" height="60" rx="10" fill="#18181b" stroke="#3f3f46" strokeWidth="1" />
                      <circle cx="55" cy="105" r="14" fill="#f59e0b" />
                      <line x1="85" y1="98" x2="230" y2="98" stroke="#71717a" strokeWidth="4" strokeLinecap="round" />
                      <line x1="85" y1="112" x2="180" y2="112" stroke="#52525b" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  )}

                  {v.id === "v-cicd" && (
                    <svg viewBox="0 0 300 160" className="v-art-svg">
                      <circle cx="45" cy="80" r="18" fill="#1e1e24" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="45" y="83" fill="#bfdbfe" fontSize="8" textAnchor="middle">Git Push</text>

                      <line x1="63" y1="80" x2="105" y2="80" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3,3" />

                      <rect x="105" y="60" width="55" height="40" rx="6" fill="#1e1e24" stroke="#60a5fa" strokeWidth="1.5" />
                      <text x="132" y="78" fill="#fff" fontSize="8" textAnchor="middle">Linter &amp;</text>
                      <text x="132" y="90" fill="#60a5fa" fontSize="8" textAnchor="middle">Test Suite</text>

                      <line x1="160" y1="80" x2="200" y2="80" stroke="#60a5fa" strokeWidth="1.5" />

                      <rect x="200" y="60" width="55" height="40" rx="6" fill="#1e1e24" stroke="#93c5fd" strokeWidth="1.5" />
                      <text x="227" y="78" fill="#fff" fontSize="8" textAnchor="middle">Docker</text>
                      <text x="227" y="90" fill="#93c5fd" fontSize="8" textAnchor="middle">Build</text>

                      <path d="M 255 80 L 275 80" stroke="#93c5fd" strokeWidth="1.5" />
                      <circle cx="282" cy="80" r="5" fill="#10b981" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Card Meta Info */}
              <div className="visual-info">
                <span className="visual-cat">{v.category}</span>
                <h3 className="visual-title">{v.title}</h3>
                <p className="visual-sub">{v.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expanded Diagram Modal */}
      {selectedVisual && (
        <div
          className="visual-lightbox-overlay"
          onClick={() => {
            playClick();
            setSelectedVisual(null);
          }}
        >
          <div
            className="visual-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lightbox-header">
              <div>
                <span className="lightbox-cat">{selectedVisual.category}</span>
                <h3 className="lightbox-title">{selectedVisual.title}</h3>
              </div>
              <button
                type="button"
                className="lightbox-close-btn"
                onClick={() => setSelectedVisual(null)}
              >
                ✕
              </button>
            </div>
            <p className="lightbox-desc">{selectedVisual.subtitle}</p>
            <div className="lightbox-canvas-placeholder">
              <span className="blueprint-status">ARCHITECTURE BLUEPRINT VERIFIED</span>
              <p>
                Full production topology deployed in production across Kubernetes clusters, Redis caching layers, and automated zero-downtime rolling release pipelines.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
