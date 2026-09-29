import { useState } from "react";

export default function CommandCenterExperience({ isHighlighted }) {
  const [botChat, setBotChat] = useState("Shipping new features...");

  const handleBotClick = () => {
    const lines = [
      "Shipping new features...",
      "Uptime verified at 99.99% on Render!",
      "API latency sub-40ms!",
      "MongoDB replica set healthy!",
    ];
    const next = lines[(lines.indexOf(botChat) + 1) % lines.length];
    setBotChat(next);
  };

  return (
    <div className={`cc-panel cc-experience-card ${isHighlighted ? "highlighted" : ""}`}>
      <span className="cc-corner-bracket tl" />
      <span className="cc-corner-bracket tr" />
      <span className="cc-corner-bracket bl" />
      <span className="cc-corner-bracket br" />

      {/* Header */}
      <div className="cc-card-header flex-between">
        <span className="cc-card-title">EXPERIENCE</span>
        <span className="cc-badge-live">● Live</span>
      </div>

      {/* Experience Item */}
      <div className="cc-exp-body">
        <div className="cc-exp-headline">
          <div className="cc-exp-logo">SB</div>
          <div className="cc-exp-firm">
            <span className="cc-exp-company">San Brothers Corporate Solutions</span>
            <span className="cc-exp-role">Full Stack Developer</span>
          </div>
        </div>

        <ul className="cc-exp-bullets">
          <li>• Built company secretary services platform</li>
          <li>• React frontend + MongoDB backend</li>
          <li>• Deployed on Render</li>
        </ul>
      </div>

      {/* Mini Bot on Crate with Speech Bubble & Deployment Tag */}
      <div className="cc-exp-footer-bot">
        <div className="cc-bot-mini-unit" onClick={handleBotClick} title="Click to interact with deploy bot">
          <div className="cc-mini-speech-bubble">
            <span>{botChat}</span>
          </div>
          <div className="cc-mini-bot-figure">
            <span className="cc-bot-head" />
            <span className="cc-bot-torso" />
          </div>
        </div>

        <div className="cc-deploy-tag">
          <span className="cc-deploy-title">DEPLOYMENT</span>
          <span className="cc-deploy-name">RENDER</span>
        </div>
      </div>
    </div>
  );
}
