import { useState } from "react";
import { Mail, MapPin, Linkedin, Github, Check, Copy } from "./icons";

export default function CommandCenterContact({ isHighlighted }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("deepakkumar740@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <div className={`cc-panel cc-contact-card ${isHighlighted ? "highlighted" : ""}`}>
      <span className="cc-corner-bracket tl" />
      <span className="cc-corner-bracket tr" />
      <span className="cc-corner-bracket bl" />
      <span className="cc-corner-bracket br" />

      {/* Header */}
      <div className="cc-card-header">
        <span className="cc-card-title">CONTACT</span>
      </div>

      {/* Contact Entries */}
      <div className="cc-contact-list">
        {/* Email */}
        <div
          className="cc-contact-item clickable"
          onClick={handleCopyEmail}
          title="Click to copy email"
        >
          <div className="cc-contact-icon">
            <Mail width={14} height={14} />
          </div>
          <div className="cc-contact-info">
            <span className="cc-contact-label">Email</span>
            <span className="cc-contact-val">
              {copied ? "Copied to clipboard!" : "deepakkumar740@gmail.com"}
            </span>
          </div>
          <span className="cc-copy-indicator">{copied ? <Check width={12} height={12} /> : <Copy width={12} height={12} />}</span>
        </div>

        {/* Location */}
        <div className="cc-contact-item">
          <div className="cc-contact-icon">
            <MapPin width={14} height={14} />
          </div>
          <div className="cc-contact-info">
            <span className="cc-contact-label">Location</span>
            <span className="cc-contact-val">Bahadurgarh, Haryana</span>
          </div>
        </div>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/deepak-kumar"
          target="_blank"
          rel="noreferrer"
          className="cc-contact-item link"
        >
          <div className="cc-contact-icon">
            <Linkedin width={14} height={14} />
          </div>
          <div className="cc-contact-info">
            <span className="cc-contact-label">LinkedIn</span>
            <span className="cc-contact-val">linkedin.com/in/deepak-kumar</span>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/deepakrai9813"
          target="_blank"
          rel="noreferrer"
          className="cc-contact-item link"
        >
          <div className="cc-contact-icon">
            <Github width={14} height={14} />
          </div>
          <div className="cc-contact-info">
            <span className="cc-contact-label">GitHub</span>
            <span className="cc-contact-val">github.com/deepakrai9813</span>
          </div>
        </a>
      </div>
    </div>
  );
}
