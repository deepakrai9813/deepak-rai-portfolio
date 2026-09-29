import { PERSONAL_INFO } from "../utils/data";
import { playClick, playPop } from "../utils/soundFx";

export default function About({ onNavigate }) {
  return (
    <section id="about" className="framer-section framer-about-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">BACKGROUND & PHILOSOPHY</span>
          <h2 className="section-title">About</h2>
          <p className="section-subtitle">
            Engineering since 3+ years from {PERSONAL_INFO.location}.
          </p>
        </div>

        {/* About Main Narrative Grid */}
        <div className="about-grid">
          {/* Column 1: HOW IT STARTED */}
          <div className="about-narrative-card">
            <span className="about-card-badge">HOW IT STARTED</span>
            <h3 className="about-card-title">From Curiosity to Mission-Critical Code</h3>
            <p className="about-card-text">
              I grew up fascinated by how software could turn an empty screen into an interactive universe. What started with tinkering with basic HTML/CSS and building small scripts quickly evolved into a deep obsession with how distributed systems, databases, and network protocols scale under heavy real-world load.
            </p>
            <p className="about-card-text">
              With a solid foundation in computer applications and continuous hands-on experimentation, I found my sweet spot in full-stack engineering—where clean architecture and creative problem-solving converge. Today, I architect and ship end-to-end digital products that balance rigorous engineering reliability with intuitive user experience.
            </p>
          </div>

          {/* Column 2: BEYOND CODE */}
          <div className="about-narrative-card">
            <span className="about-card-badge">BEYOND CODE</span>
            <h3 className="about-card-title">Chai, Keyboards & Continuous Learning</h3>
            <p className="about-card-text">
              Outside the terminal, you'll usually find me experimenting with mechanical keyboard builds, brewing strong masala chai, diving into new AI research papers, or doing street photography.
            </p>
            <p className="about-card-text">
              I also love sharing knowledge and mentoring aspiring developers in local dev circles and open-source communities. I firmly believe the best engineers are those who stay perpetually curious, listen deeply, and build with empathy.
            </p>

            <div className="about-fun-pills">
              <span className="fun-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {PERSONAL_INFO.location}
              </span>
              <span className="fun-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                Chai Enthusiast
              </span>
              <span className="fun-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Fast Learner
              </span>
              <span className="fun-pill">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
                Lo-fi Coding Beats
              </span>
            </div>
          </div>
        </div>

        {/* Developer Snapshot Banner */}
        <div className="about-summary-strip">
          <div className="summary-col">
            <span className="strip-label">CURRENT ROLE</span>
            <span className="strip-val">Full Stack Developer</span>
          </div>
          <div className="summary-col">
            <span className="strip-label">PRIMARY FOCUS</span>
            <span className="strip-val">React, Node.js, Cloud & AI</span>
          </div>
          <div className="summary-col">
            <span className="strip-label">AVAILABILITY</span>
            <span className="strip-val">Open for Opportunities</span>
          </div>
          <div className="summary-action">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Deepak-Kumar-Resume.pdf"
              className="about-resume-btn"
              onClick={playPop}
            >
              <span>Download Resume</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
