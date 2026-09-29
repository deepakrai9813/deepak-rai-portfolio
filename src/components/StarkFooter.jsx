import { ArrowUp } from "./icons";

export default function StarkFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="stark-footer-wrapper">
      <div className="container">
        {/* Main Footer Block */}
        <div className="stark-footer-grid">
          {/* Brand Column */}
          <div className="footer-firm-column">
            <span className="footer-arc-badge">◤ STARK INDUSTRIES // MARK-85 ◢</span>
            <div className="footer-firm-title">DEEPAK RAI · ARCHITECT</div>
            <p className="footer-firm-desc">
              Full-Stack &amp; Distributed Systems Engineer. Specializing in high-concurrency Go
              infrastructure, zero-allocation network conduits, and deterministic production platforms
              powered by Arc Reactor technology.
            </p>
          </div>

          {/* Cabin Links */}
          <div className="footer-links-column">
            <span className="column-title">SYSTEM CABINS</span>
            <a href="#hero" className="footer-cabin-link">00 // CENTRAL ARC PROCESSOR</a>
            <a href="#projects-cabin" className="footer-cabin-link">01 // STARK ARMORY &amp; PROJECTS</a>
            <a href="#concurrency-cabin" className="footer-cabin-link">02 // PROPULSION &amp; CONCURRENCY</a>
            <a href="#uplink-cabin" className="footer-cabin-link">03 // DIRECT TRANSMISSION UPLINK</a>
          </div>

          {/* Specifications */}
          <div className="footer-links-column">
            <span className="column-title">ARMOR SPECIFICATIONS</span>
            <span className="spec-item-line">THEME: 95% IRON MAN / 5% SPIDER-MAN</span>
            <span className="spec-item-line">J.A.R.V.I.S. REASONING CORE ACTIVE</span>
            <span className="spec-item-line">BOT DUM-E &amp; WORKERS PATROLLING</span>
            <span className="spec-item-line">ARC ENERGY PIPELINES SENSING DATA</span>
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="footer-resume-cta"
            >
              DOWNLOAD RESUME SPEC (PDF) ↗
            </a>
          </div>
        </div>

        {/* Terminal Line */}
        <div className="stark-footer-terminal-row">
          <div className="terminal-note">
            © {new Date().getFullYear()} STARK INDUSTRIES // DEEPAK RAI · TOKYO / REMOTE · ALL CABINS OPERATIONAL
          </div>

          <button
            type="button"
            className="btn-stark-return-top"
            onClick={scrollToTop}
            title="Return to Arc Reactor Core"
          >
            <span>RETURN TO ARC CORE</span>
            <ArrowUp width={12} height={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
