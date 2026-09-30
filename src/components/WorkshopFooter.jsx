import contentData from "../data/content.json";
import { useMachineStore } from "../store/useMachineStore";
import { playUiChirp } from "../utils/audioSystem";

export default function WorkshopFooter({ onNavigate }) {
  const { disclaimer, profile } = contentData;
  const { soundEnabled, isOvercharged } = useMachineStore();

  const handleBackToTop = () => {
    if (soundEnabled) playUiChirp(true, 1100);
    onNavigate?.("hero");
  };

  return (
    <footer className="workshop-footer" role="contentinfo">
      <div className="footer-conduit-seal" />

      <div className="footer-content-wrap">
        <div className="footer-top-row">
          <div className="footer-brand">
            <div className="brand-logo-lockup">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3ee8ff" strokeWidth="2">
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
              <span className="footer-brand-title">STARK-DEV-01 // DEEPAK KUMAR</span>
            </div>
            <p className="footer-role-line">
              Full Stack Developer &bull; Distributed Systems &bull; AI Agent Workflows
            </p>
          </div>

          <div className="footer-telemetry-cluster">
            <div className="telemetry-node">
              <span className="key">GRID INTEGRITY:</span>
              <span className={`val ${isOvercharged ? "overcharged" : "nominal"}`}>
                {isOvercharged ? "TURBO (145%)" : "100% NOMINAL"}
              </span>
            </div>
            <div className="telemetry-node">
              <span className="key">LOCATION:</span>
              <span className="val">{profile.location}</span>
            </div>
            <div className="telemetry-node">
              <span className="key">ACTIVE BOTS:</span>
              <span className="val">8 ON PATROL</span>
            </div>
          </div>

          <button
            type="button"
            className="btn-back-to-top"
            onClick={handleBackToTop}
            title="Conduit Booster: Jump back to Reactor Core"
          >
            <span>CONDUIT ASCEND</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
        </div>

        {/* Legal & Marvel Disclaimer */}
        <div className="footer-disclaimer-band">
          <p className="disclaimer-text">
            {disclaimer}
          </p>
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Deepak Kumar. Engineered with React 19, Three.js &amp; Web Audio API. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
