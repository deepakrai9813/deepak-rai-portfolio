const PREVIEWS = {
  bian: (
    <div className="preview preview--bian">
      <div className="preview__glow preview__glow--1" />
      <div className="preview__glow preview__glow--2" />
      <span className="preview__monogram">BA</span>
      <div className="preview__bian">
        <div className="preview__doc">
          <div className="head">
            <i /> notes.pdf
          </div>
          <span className="line" />
          <span className="line short" />
          <span className="line" />
          <span className="line accent" />
          <span className="line short" />
        </div>
        <div className="preview__chatbox">
          <div className="b">Summarize chapter 3 in 5 bullets ✍️</div>
          <div className="b me">Sure — here are the key ideas…</div>
          <div className="b summary">1. Caching improves latency…</div>
        </div>
      </div>
    </div>
  ),
  leadfinder: (
    <div className="preview preview--leadfinder">
      <div className="preview__glow preview__glow--1" />
      <span className="preview__monogram">LF</span>
      <div className="preview__lead">
        <div className="preview__search">
          <i /> <span>Find businesses without websites…</span>
        </div>
        {[
          { name: "Bella's Bakery", status: "AI Analyzed" },
          { name: "Peak Fitness Gym", status: "AI Analyzed" },
          { name: "Urban Nails Spa", status: "AI Analyzed" },
        ].map((lead) => (
          <div className="preview__leadrow" key={lead.name}>
            <span className="avatar" />
            <span className="meta">
              <span className="l1" />
              <span className="l2" />
            </span>
            <span className="status">{lead.status}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  debe: (
    <div className="preview preview--debe">
      <div className="preview__glow preview__glow--1" />
      <span className="preview__monogram">DL</span>
      <div className="preview__cal">
        <div className="preview__month">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span className="dow" key={`${d}-${i}`}>
              {d}
            </span>
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <span className={`day${i === 8 ? " hot" : ""}${i === 9 ? " locked" : ""}`} key={i}>
              {i + 1}
            </span>
          ))}
        </div>
        <div className="preview__sessions">
          <div className="preview__session">
            <span className="time">4PM</span>
            <span className="info">
              <span className="s1" />
              <span className="s2" />
            </span>
            <span className="resched">Reschedule</span>
          </div>
          <div className="preview__session">
            <span className="time">6PM</span>
            <span className="info">
              <span className="s1" />
              <span className="s2" />
            </span>
            <span className="resched">Reschedule</span>
          </div>
          <div className="preview__session disabled">
            <span className="time">7PM</span>
            <span className="info">
              <span className="s1" />
              <span className="s2" />
            </span>
            <span className="resched">Locked</span>
          </div>
        </div>
      </div>
    </div>
  ),
  sentinel: (
    <div className="preview preview--sentinel">
      <div className="preview__glow preview__glow--1" />
      <div className="preview__glow preview__glow--2" />
      <span className="preview__monogram">PS</span>
      <div className="preview__sentinel">
        <div className="preview__sentinel-top">
          <div className="preview__sentinel-badge">
            <span className="sentinel-dot pulse" /> CIRCUIT: CLOSED
          </div>
          <span className="preview__sentinel-rate">SLA: &lt;200ms · 60 FPS</span>
        </div>
        <div className="preview__sentinel-mesh">
          <div className="preview__sentinel-node active">
            <div className="node-head">
              <span className="node-title">Primary Upstream (:8081)</span>
              <span className="node-ping">12ms · 200 OK</span>
            </div>
            <div className="node-bar">
              <span className="node-fill" style={{ width: "94%" }} />
            </div>
          </div>
          <div className="preview__sentinel-arrow">
            <span>⇄ Auto-Failover Circuit Breaker</span>
          </div>
          <div className="preview__sentinel-node standby">
            <div className="node-head">
              <span className="node-title">Secondary API (:8082)</span>
              <span className="node-ping standby">Warm Standby</span>
            </div>
            <div className="node-bar">
              <span className="node-fill standby" style={{ width: "100%" }} />
            </div>
          </div>
        </div>
        <div className="preview__sentinel-stats">
          <span>sync.Pool Buffer &lt;10MB</span>
          <span>Chaos: 500ms Delay Tested</span>
          <span className="highlight">0 Dropped Requests</span>
        </div>
      </div>
    </div>
  ),
};

export default function ProjectPreview({ variant }) {
  return PREVIEWS[variant] || PREVIEWS.bian;
}
