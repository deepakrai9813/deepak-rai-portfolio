import { useState } from "react";

export default function GitHubActivityHeatmap() {
  const [hoveredCell, setHoveredCell] = useState(null);

  // Generate 52 weeks x 7 days heatmap grid with pseudo-realistic commit intensity
  const weeks = 28; // 28 columns for clean responsive display
  const daysPerWeek = 7;

  const getCommitIntensity = (w, d) => {
    // Generate realistic busy developer patterns
    const seed = (w * 7 + d * 13) % 29;
    if (seed > 24) return 4;
    if (seed > 17) return 3;
    if (seed > 9) return 2;
    if (seed > 3) return 1;
    return 0;
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="activity-heatmap-card">
      {/* Header */}
      <div className="heatmap-header-row">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="heatmap-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
          </div>
          <div>
            <h3 className="heatmap-title">Live Code Velocity &amp; Contribution Heatmap</h3>
            <p className="heatmap-subtitle">1,450+ verified production commits across open-source &amp; client repositories</p>
          </div>
        </div>

        <div className="heatmap-streak-badge">
          <span className="streak-dot" />
          <span>320-DAY DEV STREAK</span>
        </div>
      </div>

      {/* Stats Counter Ribbon */}
      <div className="heatmap-stats-strip">
        <div className="hm-stat-item">
          <span className="hm-stat-num indigo">1,450+</span>
          <span className="hm-stat-lbl">Git Commits</span>
        </div>
        <div className="hm-stat-item">
          <span className="hm-stat-num emerald">99.98%</span>
          <span className="hm-stat-lbl">CI/CD Pass Rate</span>
        </div>
        <div className="hm-stat-item">
          <span className="hm-stat-num coral">4.5x</span>
          <span className="hm-stat-lbl">Deployment Speed</span>
        </div>
        <div className="hm-stat-item">
          <span className="hm-stat-num cyan">&lt; 18ms</span>
          <span className="hm-stat-lbl">p95 Latency</span>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="heatmap-grid-scroll">
        <div className="heatmap-grid-wrapper">
          {Array.from({ length: weeks }).map((_, w) => (
            <div key={w} className="heatmap-week-column">
              {Array.from({ length: daysPerWeek }).map((_, d) => {
                const level = getCommitIntensity(w, d);
                const commitCount = level === 4 ? "8-14" : level === 3 ? "5-7" : level === 2 ? "3-4" : level === 1 ? "1-2" : "0";

                return (
                  <div
                    key={d}
                    className={`heatmap-cell level-${level}`}
                    onMouseEnter={() =>
                      setHoveredCell({
                        week: w + 1,
                        day: days[d],
                        commits: commitCount,
                      })
                    }
                    onMouseLeave={() => setHoveredCell(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap Legend & Tooltip */}
      <div className="heatmap-footer-row">
        <div className="heatmap-tooltip-indicator">
          {hoveredCell ? (
            <span>
              Week {hoveredCell.week} ({hoveredCell.day}): <strong>{hoveredCell.commits} commits</strong>
            </span>
          ) : (
            <span>Hover over any block to inspect daily commit density</span>
          )}
        </div>

        <div className="heatmap-legend">
          <span className="legend-label">Less</span>
          <span className="legend-cell level-0" />
          <span className="legend-cell level-1" />
          <span className="legend-cell level-2" />
          <span className="legend-cell level-3" />
          <span className="legend-cell level-4" />
          <span className="legend-label">More</span>
        </div>
      </div>
    </div>
  );
}
