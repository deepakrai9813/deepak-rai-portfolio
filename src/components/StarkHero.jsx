import { useState, useRef } from "react";
import { ArrowUpRight, Zap, ShieldCheck, Terminal, Cpu } from "./icons";
import ArcReactorCore from "./ArcReactorCore";

export default function StarkHero({ onOvercharge, isOvercharged }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -6;
    const ry = ((x - centerX) / centerX) * 6;
    setTilt({ rx: parseFloat(rx.toFixed(2)), ry: parseFloat(ry.toFixed(2)) });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="stark-hero-section">
      <div className="container">
        {/* Top Stark Industries Header Block */}
        <div className="stark-hero-top-row">
          {/* Left Column: Developer Identity & Core Stats */}
          <div className="stark-identity-column">
            <div className="stark-hud-tag">
              <span className="tag-dot red" />
              <span>STARK INDUSTRIES · MARK-85 // SPIDER-TECH PROTOCOL</span>
            </div>

            <h1 className="stark-main-title">
              DEEPAK RAI <br />
              <span className="title-metallic">FULL-STACK &amp; SYSTEMS ARCHITECT</span>
            </h1>

            <p className="stark-core-summary">
              Architecting high-concurrency Go infrastructure, fault-tolerant network proxies, and
              production full-stack platforms powered by the central Arc Reactor. Committed to
              zero-allocation memory, sub-millisecond tail latencies, and 99.98% verified quorum.
            </p>

            <div className="stark-action-cluster">
              <button
                type="button"
                className="btn-stark-primary"
                onClick={() => scrollTo("projects-cabin")}
              >
                <span>DEPLOY STARK ARMORY</span>
                <span className="btn-arrow">↓</span>
              </button>

              <a
                href="/Deepak-Kumar-Resume.pdf"
                download="Deepak-Kumar-Resume.pdf"
                className="btn-stark-secondary"
                title="Download Deepak Rai Verified Resume Specification"
              >
                <span>DOWNLOAD RESUME (PDF)</span>
                <ArrowUpRight width={14} height={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Deepak's Authentic 2D Photo in Stark Holo-Pod Dossier */}
          <div className="stark-dossier-column">
            <div
              ref={cardRef}
              className="stark-holo-dossier-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              }}
            >
              {/* Corner Armor Brackets */}
              <div className="stark-bracket tl">◤</div>
              <div className="stark-bracket tr">◥</div>
              <div className="stark-bracket bl">◣</div>
              <div className="stark-bracket br">◢</div>

              <div className="dossier-topbar">
                <span className="dossier-id">PILOT DOSSIER // DEEPAK RAI</span>
                <span className="dossier-clearance">STARK LEVEL-7 CLEARANCE</span>
              </div>

              {/* Photo Viewport */}
              <div className="dossier-photo-viewport">
                <img
                  src="/deepak-rai.png"
                  alt="Deepak Rai — Full-Stack & Systems Architect"
                  className="dossier-portrait"
                />

                {/* Holographic HUD Targeting Reticle */}
                <div className="dossier-targeting-hud">
                  <div className="reticle-ring" />
                  <div className="reticle-cross" />
                  <span className="reticle-label">TARGET: ARCHITECT VERIFIED</span>
                </div>

                {/* Floating Armor Chips */}
                <div className="holo-floating-chip chip-1">
                  <span className="chip-code">CORE 01:</span>
                  <span className="chip-name">Go &amp; sync.Pool Buffers</span>
                </div>
                <div className="holo-floating-chip chip-2">
                  <span className="chip-code">CORE 02:</span>
                  <span className="chip-name">99.98% SLA Quorum</span>
                </div>
              </div>

              <div className="dossier-footer">
                <div className="dossier-meta">
                  <span className="meta-dot green" />
                  <span>REACTOR POWER BUS: 100% NOMINAL</span>
                </div>
                <span className="dossier-location">TOKYO / REMOTE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Central Arc Reactor ("Iron Heart") Section in the middle */}
        <div className="stark-hero-center-reactor">
          <div className="reactor-section-divider">
            <span className="divider-line" />
            <span className="divider-label">
              <Zap width={12} height={12} />
              <span>CENTRAL IRON HEART PROCESSOR // ENERGY PIPELINE HUB</span>
              <Zap width={12} height={12} />
            </span>
            <span className="divider-line" />
          </div>

          <ArcReactorCore onOvercharge={onOvercharge} isOvercharged={isOvercharged} />
        </div>
      </div>
    </section>
  );
}
