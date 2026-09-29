import { ArrowUp } from "./icons";

export default function AwwwardsFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="awwwards-footer-wrapper">
      <div className="container">
        {/* Massive Cinematic Signoff */}
        <div className="footer-monumental-signoff">
          <span className="signoff-kicker">NEXT STEPS // GET IN TOUCH</span>
          <h2 className="signoff-headline">
            LET&apos;S BUILD <br />
            SOMETHING <br />
            <span className="signoff-accent">EXTRAORDINARY.</span>
          </h2>
        </div>

        {/* Multi-Column Main Layout */}
        <div className="footer-columns-grid">
          {/* Col 1: Brand & Thesis */}
          <div className="footer-col-brand">
            <span className="brand-monogram">◤ DR ◢</span>
            <div className="brand-name">DEEPAK RAI</div>
            <p className="brand-summary">
              Distributed Systems Architect &amp; Creative Technologist. Specializing in high-concurrency Go
              infrastructure, zero-allocation network proxies, and deterministic cloud platforms.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col-nav">
            <span className="col-header">NAVIGATION</span>
            <a href="#hero" className="col-link">01 // OVERVIEW</a>
            <a href="#neural-core" className="col-link">02 // 3D NEURAL CORE</a>
            <a href="#bento-systems" className="col-link">03 // BENTO SYSTEMS</a>
            <a href="#concurrency-lab" className="col-link">04 // CONCURRENCY LAB</a>
            <a href="#manifesto" className="col-link">05 // MANIFESTO</a>
            <a href="#contact" className="col-link">06 // DIRECT DISPATCH</a>
          </div>

          {/* Col 3: Specifications & Resume */}
          <div className="footer-col-specs">
            <span className="col-header">SPECIFICATIONS</span>
            <span className="spec-badge-text">THREE.JS HARDWARE WEBGL</span>
            <span className="spec-badge-text">UIVERSE MICRO-INTERACTIONS</span>
            <span className="spec-badge-text">AWWWARDS BENTO GRID ARCHITECTURE</span>
            <span className="spec-badge-text">WCAG AAA CONTRAST RATIO</span>
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="spec-download-cta"
            >
              DOWNLOAD RESUME SPEC (PDF) ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-terminal-bar">
          <div className="terminal-copyright">
            © {new Date().getFullYear()} DEEPAK RAI · TOKYO / REMOTE · ALL SYSTEMS OPERATIONAL
          </div>

          <button
            type="button"
            className="uiverse-back-to-top-btn"
            onClick={scrollToTop}
            title="Return to Top of Page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp width={12} height={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
