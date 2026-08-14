import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "./icons";

const LANG_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572a5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  "Jupyter Notebook": "#da5b0b",
};

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export default function GitHubStrip() {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let alive = true;
    fetch("https://api.github.com/users/deepakrai9813/repos?sort=updated&per_page=4")
      .then((r) => r.json())
      .then((data) => {
        if (alive && Array.isArray(data)) setRepos(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  if (repos.length === 0) return null;

  return (
    <div className="gh-strip">
      <div className="gh-strip__head">
        <p className="eyebrow">
          <span className="idx">●</span> Latest from GitHub
        </p>
        <a
          href="https://github.com/deepakrai9813"
          target="_blank"
          rel="noreferrer"
          className="gh-strip__link"
        >
          @deepakrai9813 <ExternalLink width={13} height={13} />
        </a>
      </div>

      <div className="gh-strip__grid">
        {repos.map((repo, i) => {
          const lang = repo.language;
          return (
            <motion.a
              className="gh-card"
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="gh-card__top">
                <span className="gh-card__icon">
                  <Github width={15} height={15} />
                </span>
                <span className="gh-card__name">{repo.name}</span>
              </div>
              <p className="gh-card__desc">
                {repo.description || "No description yet."}
              </p>
              <div className="gh-card__meta">
                {lang && (
                  <span>
                    <i
                      style={{
                        background: LANG_COLORS[lang] || "#9d9d94",
                      }}
                    />
                    {lang}
                  </span>
                )}
                <span>★ {repo.stargazers_count}</span>
                <span className="gh-card__updated">{timeAgo(repo.updated_at)}</span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
