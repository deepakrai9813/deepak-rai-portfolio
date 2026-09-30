import { PERSONAL_INFO } from "../utils/data";

export default function Footer({ onOpenPressKit }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="portfolio-footer-bar" role="contentinfo">
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div className="brand-symbol-badge" style={{ width: "26px", height: "26px", fontSize: "11px" }}>
          DK
        </div>
        <div>
          <span>&copy; {currentYear} {PERSONAL_INFO.name}. All rights reserved.</span>
          <span style={{ display: "block", fontSize: "12px", color: "var(--text-faint)" }}>
            Luminous Modernist Architecture &bull; Built with React 19, TypeScript &amp; Vite
          </span>
        </div>
      </div>

      <div className="footer-social-links">
        {onOpenPressKit && (
          <button
            type="button"
            className="footer-link-btn"
            onClick={onOpenPressKit}
            title="Open Executive Bio & Press Kit"
          >
            Press Kit / Bio
          </button>
        )}
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
        >
          GitHub
        </a>
        <a
          href={PERSONAL_INFO.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn profile"
        >
          LinkedIn
        </a>
        <a
          href={PERSONAL_INFO.resumeUrl}
          download="Deepak-Kumar-Resume.pdf"
          aria-label="Download Resume"
        >
          Resume
        </a>
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          aria-label="Send Email"
        >
          Email
        </a>
      </div>
    </footer>
  );
}
