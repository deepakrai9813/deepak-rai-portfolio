import { ArrowUp, ArrowUpRight, Github } from "./icons";

export default function InstrumentFooter({ playClick }) {
  const scrollToTop = () => {
    playClick?.();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-instrument">
      <div className="container">
        {/* Topline: System Specs & Philosophy */}
        <div className="footer-topline">
          <div>
            <div style={{ fontWeight: 700, color: "var(--text-high)", fontSize: "12px", marginBottom: "4px" }}>
              DEEPAK RAI // TACTICAL ENGINEERING WORKSTATION
            </div>
            <div>
              ZERO-GRADIENT ARCHITECTURE · SWISS GRID · DISTRIBUTED TELEMETRY · GO CONCURRENCY
            </div>
          </div>

          <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
            <a
              href="/Deepak-Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-high)", textDecoration: "underline" }}
              onClick={() => playClick?.()}
            >
              RESUME (PDF)
            </a>
            <span>//</span>
            <a
              href="https://github.com/deepakrai9813"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--text-high)", textDecoration: "underline" }}
              onClick={() => playClick?.()}
            >
              GITHUB
            </a>
            <span>//</span>
            <button
              type="button"
              className="btn-mech-outline"
              style={{ padding: "4px 10px", fontSize: "11px" }}
              onClick={scrollToTop}
            >
              <ArrowUp style={{ width: "12px", height: "12px" }} />
              <span>TOP OF STATION</span>
            </button>
          </div>
        </div>

        {/* Bottomline: Checksum & Revision */}
        <div className="footer-bottomline">
          <div>
            REVISION: <strong>REV-2026.4-SYS</strong> // CHECKSUM: <code>0x9813_SENTINEL_GO</code>
          </div>
          <div>
            BUILT WITH GO 1.23, REACT 19, VITE 6. ZERO VIBE-CODING. 100% VERIFIED SYSTEMS.
          </div>
          <div>
            © 2026 DEEPAK RAI. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
}
