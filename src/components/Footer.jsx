import { useState } from "react";
import { PERSONAL_INFO } from "../utils/data";
import { playClick, playPop, playSuccess } from "../utils/soundFx";

export default function Footer({ onShowToast }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    playSuccess();
    onShowToast("Email copied to clipboard");
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    playPop();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="contact" className="framer-footer-section">
      <div className="framer-container">
        {/* Giant Kinetic Headline (Signature Neha Yadav Design) */}
        <div className="footer-hero-banner">
          <span className="footer-eyebrow">READY TO COLLABORATE?</span>
          <h2 className="footer-giant-title">
            <span className="title-row-1">Let's Build</span>
            <span className="title-row-2">TOGETHER</span>
          </h2>
          <p className="footer-lead-text">
            Have an ambitious engineering project, a high-impact team opening, or just want to connect over software architecture? My inbox is always open.
          </p>
        </div>

        {/* Primary Contact Action Controls */}
        <div className="footer-actions-row">
          <button
            type="button"
            className="footer-email-btn"
            onClick={handleCopyEmail}
          >
            <span className="email-icon">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <span className="email-address">{PERSONAL_INFO.email}</span>
            <span className="copy-badge">{copied ? "Copied" : "Copy"}</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="footer-link-btn"
            onClick={playClick}
          >
            <span>Send Email Direct</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-btn"
            onClick={playClick}
          >
            <span>LinkedIn</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-btn"
            onClick={playClick}
          >
            <span>GitHub</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Deepak-Kumar-Resume.pdf"
            className="footer-link-btn"
            onClick={playPop}
          >
            <span>Download Resume</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Divider */}
        <div className="footer-divider-line" />

        {/* Subfooter */}
        <div className="subfooter-row">
          <div className="subfooter-col">
            <span className="subfooter-name">{PERSONAL_INFO.name}</span>
            <span className="subfooter-role">{PERSONAL_INFO.role}</span>
          </div>

          <div className="subfooter-col center">
            <span className="subfooter-copy">
              © {new Date().getFullYear()} Deepak Kumar. All rights reserved.
            </span>
          </div>

          <div className="subfooter-col right">
            <button
              type="button"
              className="scroll-top-btn"
              onClick={scrollToTop}
              title="Back to Top"
            >
              <span>Back to Top</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
