import { PERSONAL_INFO } from "../utils/data";

export default function Footer() {
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
            Obsidian Dark Architecture &bull; Built with React &amp; Tailwind CSS
          </span>
        </div>
      </div>

      <div className="footer-social-links">
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
