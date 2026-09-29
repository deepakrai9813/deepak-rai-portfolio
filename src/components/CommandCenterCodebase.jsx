import { useState } from "react";

export default function CommandCenterCodebase() {
  const [activeTab, setActiveTab] = useState("go");

  return (
    <div className="cc-codebase-cluster">
      {/* 1. CODE BASE Terminal */}
      <div className="cc-panel cc-codebase-card">
        <div className="cc-card-header flex-between">
          <span className="cc-card-title">CODE BASE</span>
          <div className="cc-code-tabs">
            <button
              type="button"
              className={`cc-code-tab ${activeTab === "go" ? "active" : ""}`}
              onClick={() => setActiveTab("go")}
            >
              proxy.go
            </button>
            <button
              type="button"
              className={`cc-code-tab ${activeTab === "react" ? "active" : ""}`}
              onClick={() => setActiveTab("react")}
            >
              App.jsx
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="cc-code-viewport">
          <pre className="cc-code-pre">
            {activeTab === "go" ? (
              <code>
                <span className="c-kw">func</span> <span className="c-fn">ServeHTTP</span>(w, r) &#123;{"\n"}
                {"  "}buf := pool.<span className="c-fn">Get</span>().([]<span className="c-type">byte</span>){"\n"}
                {"  "}<span className="c-kw">defer</span> pool.<span className="c-fn">Put</span>(buf){"\n"}
                {"  "}resp, err := circuit.<span className="c-fn">Exec</span>(r){"\n"}
                {"  "}<span className="c-kw">if</span> err != <span className="c-kw">nil</span> &#123;{"\n"}
                {"    "}w.<span className="c-fn">WriteHeader</span>(503){"\n"}
                {"  "}&#125;{"\n"}
                &#125;
              </code>
            ) : (
              <code>
                <span className="c-kw">export default function</span> &#123;{"\n"}
                {"  "}<span className="c-kw">const</span> core = <span className="c-fn">useArcCore</span>();{"\n"}
                {"  "}<span className="c-kw">return</span> &lt;<span className="c-type">IronHeart</span>{"\n"}
                {"    "}power=&#123;core.power&#125;{"\n"}
                {"    "}efficiency=&#123;<span className="c-num">0.98</span>&#125; /&gt;;{"\n"}
                &#125;
              </code>
            )}
          </pre>

          {/* Sticky Badge: "Code is life! ⚡" */}
          <div className="cc-sticky-badge">
            <span>Code is life! ⚡</span>
          </div>
        </div>
      </div>

      {/* 2. Mini Build/Test/Deploy Server Unit & Coding Bot */}
      <div className="cc-pipeline-desk-unit">
        <div className="cc-ci-rack">
          <div className="ci-line">
            <span className="ci-dot cyan" />
            <span>BUILD</span>
          </div>
          <div className="ci-line">
            <span className="ci-dot gold" />
            <span>TEST</span>
          </div>
          <div className="ci-line">
            <span className="ci-dot crimson" />
            <span>DEPLOY</span>
          </div>
        </div>

        {/* Mini Bot at Laptop */}
        <div className="cc-coder-bot-unit" title="Stark Junior Coder Bot">
          <div className="cc-bot-laptop">
            <span className="cc-laptop-screen" />
            <span className="cc-laptop-base" />
          </div>
          <div className="cc-bot-coder-chassis">
            <span className="cc-coder-head" />
            <span className="cc-coder-body" />
          </div>
        </div>
      </div>
    </div>
  );
}
