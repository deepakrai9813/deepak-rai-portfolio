import { useState } from "react";
import { TOOLS_DATA, TOOLS_CATEGORIES } from "../utils/data";
import { playClick, playPop } from "../utils/soundFx";

export default function Tools() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools =
    activeCategory === "All"
      ? TOOLS_DATA
      : TOOLS_DATA.filter((t) => t.category === activeCategory);

  return (
    <section id="tools" className="framer-section framer-tools-section">
      <div className="framer-container">
        {/* Section Header */}
        <div className="framer-section-header">
          <span className="section-eyebrow">TECH STACK</span>
          <h2 className="section-title">Tools</h2>
          <p className="section-subtitle">
            Languages, frameworks, databases, and platforms I work with daily.
          </p>
        </div>

        {/* Category Filters */}
        <div className="tools-filter-bar">
          {TOOLS_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`tool-filter-pill ${activeCategory === cat ? "active" : ""}`}
              onClick={() => {
                playPop();
                setActiveCategory(cat);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tools Cards Grid */}
        <div className="tools-grid">
          {filteredTools.map((tool) => (
            <div
              key={tool.name}
              className="tool-card"
              onClick={playClick}
            >
              <div className="tool-card-header">
                <span className="tool-name">{tool.name}</span>
                <span className={`tool-level-badge level-${tool.level.toLowerCase()}`}>
                  {tool.level}
                </span>
              </div>
              <p className="tool-desc">{tool.desc}</p>
              <div className="tool-cat-footer">
                <span>{tool.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
