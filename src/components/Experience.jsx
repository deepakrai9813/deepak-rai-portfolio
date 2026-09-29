import { EXPERIENCE_TIMELINE } from "../utils/data";
import { playClick } from "../utils/soundFx";

export default function Experience() {
  return (
    <section id="experience" className="framer-section framer-experience-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">CAREER TIMELINE</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Track record of shipping mission-critical systems and full-stack platforms.
          </p>
        </div>

        {/* Experience Timeline Rows */}
        <div className="experience-timeline">
          {EXPERIENCE_TIMELINE.map((item) => (
            <div key={item.id} className="experience-row">
              <div className="exp-period-col">
                <span className="exp-period">{item.period}</span>
                <span className="exp-type-badge">{item.type}</span>
              </div>

              <div className="exp-content-col">
                <div className="exp-role-header">
                  <h3 className="exp-role">{item.role}</h3>
                  <span className="exp-company">{item.company}</span>
                </div>

                <p className="exp-desc">{item.description}</p>

                <ul className="exp-highlights-list">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="exp-highlight-item">
                      <span className="highlight-bullet">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-skills-row">
                  {item.skills.map((s) => (
                    <span key={s} className="exp-skill-tag" onClick={playClick}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
