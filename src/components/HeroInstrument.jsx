import { ShieldCheck, ArrowUpRight, Zap, Play, Activity } from "./icons";

export default function HeroInstrument({ lens, setLens, playClick, playSwitch }) {
  const scrollTo = (id) => {
    playClick?.();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="hero-instrument">
      <div className="container">
        <div className="hero-chassis">
          {/* Engineering Metadata Header Bar */}
          <div className="hero-meta-bar">
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span className="tag-solid active">
                <span className="led-indicator" />
                SYSTEM_STATUS: HEALTHY
              </span>
              <span>DR-SPEC-2026 // COLD-START: &lt;180MS</span>
            </div>
            <div style={{ display: "flex", gap: "16px" }}>
              <span>GO 1.23</span>
              <span>//</span>
              <span>NEXT.JS 16</span>
              <span>//</span>
              <span>POSTGRESQL</span>
              <span>//</span>
              <span>TOXIPROXY CHAOS</span>
            </div>
          </div>

          {/* Primary Split: Dossier and Telemetry Meter Cell */}
          <div className="hero-grid">
            {/* Primary Left Cell: The Dossier & Perspective Content */}
            <div className="hero-primary-cell">
              <div className="hero-kicker">
                <span className="led-indicator" />
                <span>// ENGINEERING DOSSIER // DEEPAK RAI</span>
              </div>

              <h1 className="hero-headline">
                FAULT-TOLERANT SYSTEMS.
                <br />
                <span style={{ color: "var(--signal-green)" }}>HIGH-THROUGHPUT</span> WEB.
              </h1>

              {/* Perspective Lens Adaptive Readout */}
              {lens === "executive" && (
                <div className="hero-lens-banner">
                  <div className="hero-lens-title">
                    <span style={{ color: "var(--signal-green)" }}>[01 / EXECUTIVE PERSPECTIVE]</span>
                    <span>BUSINESS RELIABILITY &amp; PRODUCT VELOCITY</span>
                  </div>
                  <div className="hero-lens-body">
                    I design and ship production-grade digital infrastructure that eliminates revenue-impacting downtime. 
                    Creator of <strong>Project Sentinel</strong> (high-concurrency reverse proxy maintaining 0 dropped requests under cascading failure) 
                    and architect of <strong>San Brothers Corporate Solutions</strong> (enterprise legal compliance platform ranking #1 on Google for brand keywords).
                  </div>
                </div>
              )}

              {lens === "architect" && (
                <div className="hero-lens-banner">
                  <div className="hero-lens-title">
                    <span style={{ color: "var(--signal-cyan)" }}>[02 / ARCHITECTURAL PERSPECTIVE]</span>
                    <span>SYSTEM INTERNALS &amp; CONCURRENCY PRIMITIVES</span>
                  </div>
                  <div className="hero-lens-body">
                    Deep systems focus on Go concurrency models (<code>sync.RWMutex</code>, <code>sync.Pool</code> zero-alloc byte slices, sliding-window failure ring buffers), 
                    zero-dependency HTTP reverse proxies, Toxiproxy chaos injection, off-thread Web Workers, Next.js 16 App Router, and ACID PostgreSQL relational design.
                  </div>
                </div>
              )}

              {lens === "terminal" && (
                <div className="hero-lens-banner">
                  <div className="hero-lens-title">
                    <span style={{ color: "var(--signal-amber)" }}>[03 / TERMINAL PERSPECTIVE]</span>
                    <span>RAW TELEMETRY &amp; INTERACTIVE DIAGNOSTICS</span>
                  </div>
                  <div className="hero-lens-body">
                    Live telemetry link established. Scroll down to execute commands in the live sandbox terminal, inspect memory heap profiles, or run automated chaos injection cycles directly against Project Sentinel.
                  </div>
                </div>
              )}

              <p className="hero-thesis">
                Building resilient software is not an aesthetic choice—it is a rigorous discipline of handling edge cases, 
                eliminating race conditions, and designing deterministic recovery loops before traffic spikes hit production.
              </p>

              {/* Action Buttons with Solid Mechanical Physics */}
              <div className="hero-cta-row">
                <button
                  type="button"
                  className="btn-mech-signal"
                  onClick={() => scrollTo("sentinel-lab")}
                >
                  <Zap style={{ width: "16px", height: "16px" }} />
                  <span>TEST CIRCUIT BREAKER</span>
                </button>

                <a
                  href="/Deepak-Kumar-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mech"
                  download="Deepak-Kumar-Resume.pdf"
                  onClick={() => playClick?.()}
                >
                  <span>DOWNLOAD SPEC (PDF)</span>
                  <ArrowUpRight style={{ width: "14px", height: "14px" }} />
                </a>

                <button
                  type="button"
                  className="btn-mech-outline"
                  onClick={() => scrollTo("biometric-3d")}
                >
                  <Activity style={{ width: "14px", height: "14px", color: "var(--signal-green)" }} />
                  <span>3D LIDAR BIO-SCAN</span>
                </button>

                <button
                  type="button"
                  className="btn-mech-outline"
                  onClick={() => scrollTo("dispatch")}
                >
                  <span>INITIATE DISPATCH</span>
                  <span style={{ opacity: 0.5 }}>//</span>
                </button>
              </div>
            </div>

            {/* Secondary Right Cell: Technical Telemetry Gauges */}
            <div className="hero-telemetry-cell">
              <div>
                <div className="telemetry-header">
                  <span>TELEMETRY GAUGES</span>
                  <span className="tag-solid active">LIVE</span>
                </div>

                <div className="telemetry-gauges-stack">
                  {/* Gauge 1: Uptime / SLA */}
                  <div className="gauge-block">
                    <div className="gauge-label-row">
                      <span>METRIC // 01</span>
                      <span>SYSTEM RESILIENCE</span>
                    </div>
                    <div className="gauge-value-row">
                      <span className="gauge-large-value">99.98%</span>
                      <span className="gauge-unit">UPTIME SLA</span>
                    </div>
                    <div className="gauge-solid-bar">
                      <div className="gauge-solid-fill" style={{ width: "99.98%" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "6px" }}>
                      CHAOS TESTED VIA TOXIPROXY (500MS LATENCY)
                    </div>
                  </div>

                  {/* Gauge 2: Proxy Latency */}
                  <div className="gauge-block">
                    <div className="gauge-label-row">
                      <span>METRIC // 02</span>
                      <span>HTTP PROXY LATENCY</span>
                    </div>
                    <div className="gauge-value-row">
                      <span className="gauge-large-value">12ms</span>
                      <span className="gauge-unit">p50 MEDIAN</span>
                    </div>
                    <div className="gauge-solid-bar">
                      <div className="gauge-solid-fill" style={{ width: "88%", backgroundColor: "var(--signal-green)" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "6px" }}>
                      p99 &lt; 35MS // ZERO DEPENDENCY GO PROXY
                    </div>
                  </div>

                  {/* Gauge 3: Active Production Users */}
                  <div className="gauge-block">
                    <div className="gauge-label-row">
                      <span>METRIC // 03</span>
                      <span>PRODUCTION VOLUME</span>
                    </div>
                    <div className="gauge-value-row">
                      <span className="gauge-large-value">10,000+</span>
                      <span className="gauge-unit">REQUESTS / USERS</span>
                    </div>
                    <div className="gauge-solid-bar">
                      <div className="gauge-solid-fill" style={{ width: "92%", backgroundColor: "var(--signal-cyan)" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "6px" }}>
                      SERVED ACROSS SAN BROTHERS &amp; BIAN AI
                    </div>
                  </div>

                  {/* Gauge 4: Automated Test Pass Rate */}
                  <div className="gauge-block">
                    <div className="gauge-label-row">
                      <span>METRIC // 04</span>
                      <span>TEST PASS RATE</span>
                    </div>
                    <div className="gauge-value-row">
                      <span className="gauge-large-value">100%</span>
                      <span className="gauge-unit">PASS (48/48)</span>
                    </div>
                    <div className="gauge-solid-bar">
                      <div className="gauge-solid-fill" style={{ width: "100%", backgroundColor: "var(--signal-green)" }} />
                    </div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-dim)", marginTop: "6px" }}>
                      PLAYWRIGHT E2E + GO RACE-DETECTOR CLEAN
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick-Action Ticker */}
              <div
                style={{
                  marginTop: "24px",
                  paddingTop: "14px",
                  borderTop: "1px solid var(--border-base)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--text-dim)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>CURRENT LOCATION: NEW DELHI</span>
                <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
