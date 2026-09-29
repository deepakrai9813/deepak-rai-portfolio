import { ArrowUp } from "./icons";

export default function SpatialFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="spatial-footer-wrapper">
      <div className="container">
        {/* Main Footer Row */}
        <div className="spatial-footer-main">
          {/* Brand Info */}
          <div className="footer-brand-block">
            <div className="footer-monogram">◤ DR ◢</div>
            <div className="footer-brand-title">DEEPAK RAI</div>
            <p className="footer-brand-desc">
              Distributed Systems Architect &amp; Backend Engineer specializing in high-concurrency Go
              infrastructure, zero-allocation network proxies, and deterministic cloud platforms.
            </p>
          </div>

          {/* Quick Jump Links */}
          <div className="footer-links-group">
            <span className="footer-col-title">NAVIGATION</span>
            <a href="#hero" className="footer-nav-anchor">01 // INTRODUCTION</a>
            <a href="#lattice" className="footer-nav-anchor">02 // 3D LATTICE</a>
            <a href="#systems" className="footer-nav-anchor">03 // SYSTEMS</a>
            <a href="#benchmark" className="footer-nav-anchor">04 // BENCHMARK</a>
            <a href="#philosophy" className="footer-nav-anchor">05 // PHILOSOPHY</a>
            <a href="#contact" className="footer-nav-anchor">06 // CONTACT</a>
          </div>

          {/* Standards & Specs */}
          <div className="footer-links-group">
            <span className="footer-col-title">SPECIFICATIONS</span>
            <span className="footer-spec-item">STRICT ZERO-GRADIENTS</span>
            <span className="footer-spec-item">SWISS EDITORIAL TYPOGRAPHY</span>
            <span className="footer-spec-item">THREE.JS HARDWARE WEBGL</span>
            <span className="footer-spec-item">WCAG AAA CONTRAST RATIO</span>
            <a
              href="/Deepak-Kumar-Resume.pdf"
              download="Deepak-Kumar-Resume.pdf"
              className="footer-resume-link"
            >
              DOWNLOAD RESUME SPEC (PDF) ↗
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="spatial-footer-bottom">
          <div className="footer-copyright">
            © {new Date().getFullYear()} DEEPAK RAI · ALL SYSTEMS OPERATIONAL · TOKYO / REMOTE
          </div>

          <button
            type="button"
            className="btn-back-to-top"
            onClick={scrollToTop}
            title="Return to Top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp width={12} height={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
