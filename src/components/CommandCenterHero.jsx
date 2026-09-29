export default function CommandCenterHero({
  onViewProjects,
  onContact,
  isHighlighted,
}) {
  return (
    <div className={`cc-panel cc-hero-card ${isHighlighted ? "highlighted" : ""}`}>
      {/* Corner Brackets */}
      <span className="cc-corner-bracket tl" />
      <span className="cc-corner-bracket tr" />
      <span className="cc-corner-bracket bl" />
      <span className="cc-corner-bracket br" />

      <div className="cc-hero-inner">
        {/* Holographic Portrait Viewport */}
        <div className="cc-portrait-frame">
          <img
            src="/deepak-rai.png"
            alt="Deepak Kumar — Full Stack Developer"
            className="cc-portrait-img"
          />
          <div className="cc-holo-scanline" />
        </div>

        {/* Text Content & Action Buttons */}
        <div className="cc-hero-details">
          <span className="cc-hero-greeting">Hello, I&apos;m</span>
          <h1 className="cc-hero-name">Deepak Kumar</h1>
          <span className="cc-hero-role">Full Stack Developer</span>
          <p className="cc-hero-bio">
            I build modern web applications that solve real problems.
          </p>

          <div className="cc-hero-buttons">
            <button
              type="button"
              className="cc-btn-primary"
              onClick={onViewProjects}
              title="View Projects"
            >
              View My Projects
            </button>
            <button
              type="button"
              className="cc-btn-secondary"
              onClick={onContact}
              title="Contact Me"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
