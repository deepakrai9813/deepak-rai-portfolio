import { useState } from "react";
import { Zap, ShieldCheck, RotateCcw, Check, ArrowUpRight, Star, Trophy, Activity, Clock, Play } from "./icons";

const FLIGHT_RECORDER_MILESTONES = [
  {
    step: 0,
    time: "T-30s",
    label: "STEADY STATE",
    latency: "12ms",
    cpu: "14%",
    activeRoute: "PRIMARY (:8081)",
    circuitState: "CLOSED",
    statusColor: "var(--signal-green)",
    desc: "Cluster operating in nominal conditions. 48 concurrent goroutines streaming requests with zero alloc byte buffers.",
    transactionsAtRisk: 0,
  },
  {
    step: 1,
    time: "T-10s",
    label: "LATENCY JITTER",
    latency: "340ms",
    cpu: "42%",
    activeRoute: "PRIMARY (:8081)",
    circuitState: "CLOSED",
    statusColor: "var(--signal-amber)",
    desc: "Upstream vendor database latency begins climbing. Sliding window error accumulator begins recording 200ms cutoff breaches.",
    transactionsAtRisk: 12,
  },
  {
    step: 2,
    time: "T-00s",
    label: "SLA THRESHOLD BREACH",
    latency: "940ms",
    cpu: "86%",
    activeRoute: "STALLING ON :8081",
    circuitState: "TRIPPING",
    statusColor: "var(--signal-red)",
    desc: "Upstream dead socket stall! 48 transactions hanging in-flight. Downstream client connections risk catastrophic timeout abort.",
    transactionsAtRisk: 48,
  },
  {
    step: 3,
    time: "T+04s",
    label: "SENTINEL INTERVENTION",
    latency: "18ms",
    cpu: "28%",
    activeRoute: "REROUTING TO :8082",
    circuitState: "OPEN (TRIPPED)",
    statusColor: "var(--signal-cyan)",
    desc: "Sentinel trips circuit breaker in 6ms! io.Seeker rewinds sync.Pool in-flight byte slices and transparently dispatches to Secondary :8082.",
    transactionsAtRisk: 0,
  },
  {
    step: 4,
    time: "T+12s",
    label: "QUORUM RESTORED",
    latency: "14ms",
    cpu: "18%",
    activeRoute: "SECONDARY (:8082)",
    circuitState: "HALF-OPEN PROBE",
    statusColor: "var(--signal-green)",
    desc: "100% of 48 in-flight transactions successfully preserved and returned 200 OK. Background canary probes testing Primary recovery.",
    transactionsAtRisk: 0,
  },
];

export default function IncidentSimulator({ playClick, playAlarm, playSuccessFanfare }) {
  const [selectedAction, setSelectedAction] = useState(null);
  const [resolved, setResolved] = useState(false);
  const [timelineStep, setTimelineStep] = useState(0);

  const handleAction = (actionId) => {
    setSelectedAction(actionId);
    if (actionId === "trip-rewind") {
      setResolved(true);
      setTimelineStep(4);
      playSuccessFanfare?.();
    } else {
      setResolved(false);
      setTimelineStep(2);
      playAlarm?.();
    }
  };

  const handleReset = () => {
    playClick?.();
    setSelectedAction(null);
    setResolved(false);
    setTimelineStep(0);
  };

  const currentTimeline = FLIGHT_RECORDER_MILESTONES[timelineStep];

  return (
    <section id="incident-drill" className="modern-portfolio-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">
            // 05-B. SYSTEMS INCIDENT DRILL // INTERACTIVE FLIGHT RECORDER
          </div>
          <h2 className="section-headline">
            INCIDENT DRILL: CASCAVAL UPSTREAM COLLAPSE
          </h2>
          <p className="section-subtext">
            Test your systems engineering instincts in a live simulated production incident. 
            48 concurrent in-flight transactions are hanging on a stalled upstream API. Scrub the incident flight recorder and choose your mitigation strategy.
          </p>
        </div>

        {/* Chassis */}
        <div
          className="sandbox-chassis futuristic-screen-frame"
          style={{
            borderColor: resolved
              ? "var(--signal-green)"
              : selectedAction
              ? "var(--signal-red)"
              : "var(--border-base)",
          }}
        >
          {/* Header */}
          <div
            className="sandbox-meta-header"
            style={{
              backgroundColor: resolved
                ? "var(--signal-green-bg)"
                : selectedAction
                ? "var(--signal-red-bg)"
                : "var(--bg-subtle)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                className="led-indicator"
                style={{
                  backgroundColor: resolved
                    ? "var(--signal-green)"
                    : selectedAction
                    ? "var(--signal-red)"
                    : "var(--signal-amber)",
                }}
              />
              <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                {resolved
                  ? "INCIDENT MITIGATED: 100% TRANSACTIONS SAVED"
                  : selectedAction
                  ? "OUTAGE COMPOUNDED: REVENUE IMPACT DETECTED"
                  : "SIMULATED ALERT // SEVERITY: CRITICAL (940MS UPSTREAM LAG)"}
              </span>
            </div>

            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
              IN-FLIGHT TRANSACTIONS: <strong>48 PAYLOADS</strong>
            </div>
          </div>

          {/* Interactive Post-Mortem Flight Recorder Timeline */}
          <div className="incident-timeline-strip">
            <div className="timeline-title-row">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Clock style={{ width: "13px", height: "13px", color: "var(--signal-cyan)" }} />
                <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
                  POST-MORTEM FLIGHT RECORDER (SCRUB TIMELINE):
                </span>
              </div>
              <span className="tag-solid active" style={{ borderColor: currentTimeline.statusColor, color: currentTimeline.statusColor }}>
                TIMELINE: {currentTimeline.time} // {currentTimeline.label}
              </span>
            </div>

            {/* Step Milestones */}
            <div className="timeline-milestones-row">
              {FLIGHT_RECORDER_MILESTONES.map((m) => (
                <button
                  key={m.step}
                  type="button"
                  className={`timeline-milestone-btn ${timelineStep === m.step ? "active" : ""}`}
                  onClick={() => {
                    playClick?.();
                    setTimelineStep(m.step);
                  }}
                  style={{
                    borderColor: timelineStep === m.step ? m.statusColor : "var(--border-base)",
                  }}
                >
                  <span className="milestone-time">{m.time}</span>
                  <span className="milestone-label">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Live Scrubbed Telemetry Readout */}
            <div className="timeline-telemetry-readout">
              <div className="timeline-metric-chip">
                <span>LATENCY:</span>
                <strong style={{ color: currentTimeline.statusColor }}>{currentTimeline.latency}</strong>
              </div>
              <div className="timeline-metric-chip">
                <span>CPU LOAD:</span>
                <strong>{currentTimeline.cpu}</strong>
              </div>
              <div className="timeline-metric-chip">
                <span>CIRCUIT STATE:</span>
                <strong style={{ color: currentTimeline.statusColor }}>{currentTimeline.circuitState}</strong>
              </div>
              <div className="timeline-metric-chip">
                <span>ACTIVE ROUTE:</span>
                <strong>{currentTimeline.activeRoute}</strong>
              </div>
              <div className="timeline-metric-chip">
                <span>TRANSACTIONS AT RISK:</span>
                <strong style={{ color: currentTimeline.transactionsAtRisk > 0 ? "var(--signal-red)" : "var(--signal-green)" }}>
                  {currentTimeline.transactionsAtRisk}/48
                </strong>
              </div>
            </div>
            <div className="timeline-desc-box">
              <span>&gt; {currentTimeline.desc}</span>
            </div>
          </div>

          {/* Workbench Grid */}
          <div className="sandbox-workbench-grid">
            {/* Left: Action Levers */}
            <div style={{ padding: "24px", borderRight: "1px solid var(--border-base)" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", marginBottom: "14px" }}>
                CHOOSE INCIDENT REMEDIATION LEVER:
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Lever A */}
                <button
                  type="button"
                  className={`capability-item-card futuristic-chamfer-btn ${selectedAction === "extend-timeout" ? "danger" : ""}`}
                  style={{
                    textAlign: "left",
                    borderColor: selectedAction === "extend-timeout" ? "var(--signal-red)" : "var(--border-subtle)",
                  }}
                  onClick={() => handleAction("extend-timeout")}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-high)", marginBottom: "4px" }}>
                    LEVER A: INCREASE HTTP CLIENT TIMEOUT TO 10,000MS
                  </div>
                  <div style={{ color: "var(--text-dim)", fontSize: "11px" }}>
                    &ldquo;Give the primary upstream more time to finish processing slow requests.&rdquo;
                  </div>
                </button>

                {/* Lever B */}
                <button
                  type="button"
                  className={`capability-item-card futuristic-chamfer-btn ${selectedAction === "restart-pod" ? "danger" : ""}`}
                  style={{
                    textAlign: "left",
                    borderColor: selectedAction === "restart-pod" ? "var(--signal-red)" : "var(--border-subtle)",
                  }}
                  onClick={() => handleAction("restart-pod")}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-high)", marginBottom: "4px" }}>
                    LEVER B: HARD RESTART PROXY INSTANCES
                  </div>
                  <div style={{ color: "var(--text-dim)", fontSize: "11px" }}>
                    &ldquo;Flush system state and restart processes immediately to clear memory.&rdquo;
                  </div>
                </button>

                {/* Lever C */}
                <button
                  type="button"
                  className={`capability-item-card futuristic-chamfer-btn ${selectedAction === "trip-rewind" ? "highlighted" : ""}`}
                  style={{
                    textAlign: "left",
                    borderColor: selectedAction === "trip-rewind" ? "var(--signal-green)" : "var(--border-subtle)",
                    backgroundColor: selectedAction === "trip-rewind" ? "var(--signal-green-bg)" : "var(--bg-subtle)",
                  }}
                  onClick={() => handleAction("trip-rewind")}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-high)", marginBottom: "4px" }}>
                    LEVER C: TRIP SENTINEL CIRCUIT BREAKER + REPLAY SYNC.POOL BUFFERS
                  </div>
                  <div style={{ color: "var(--text-dim)", fontSize: "11px" }}>
                    &ldquo;Isolate stalled upstream instantly. Rewind in-flight byte buffers to warm secondary replica.&rdquo;
                  </div>
                </button>
              </div>

              {selectedAction && (
                <div style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn-mech-outline futuristic-chamfer-btn"
                    style={{ fontSize: "11px", padding: "6px 12px" }}
                    onClick={handleReset}
                  >
                    <RotateCcw style={{ width: "12px", height: "12px" }} />
                    <span>RESET INCIDENT DRILL</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Telemetry Diagnostic Outcome */}
            <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", marginBottom: "14px" }}>
                  INCIDENT DIAGNOSTIC OUTCOME:
                </div>

                {!selectedAction && (
                  <div
                    style={{
                      border: "1px dashed var(--border-strong)",
                      padding: "24px",
                      textAlign: "center",
                      color: "var(--text-dim)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                    }}
                  >
                    SELECT AN ACTION LEVER ON THE LEFT OR SCRUB THE TIMELINE ABOVE.
                  </div>
                )}

                {selectedAction === "extend-timeout" && (
                  <div style={{ border: "1px solid var(--signal-red)", backgroundColor: "var(--signal-red-bg)", padding: "16px" }}>
                    <div style={{ color: "var(--signal-red)", fontWeight: 700, fontSize: "13px", marginBottom: "6px" }}>
                      OUTAGE COMPOUNDED: CONNECTION POOL EXHAUSTION
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-high)", lineHeight: 1.5 }}>
                      Extending timeouts caused all worker goroutines to block waiting on dead sockets. 
                      Connection pools exhausted across the cluster. Incoming requests suffered 504 Gateway Timeouts.
                    </p>
                    <div style={{ marginTop: "10px", fontWeight: 700, color: "var(--signal-red)", fontSize: "11px" }}>
                      TRANSACTIONS LOST: 48/48 (100% DROPPED)
                    </div>
                  </div>
                )}

                {selectedAction === "restart-pod" && (
                  <div style={{ border: "1px solid var(--signal-red)", backgroundColor: "var(--signal-red-bg)", padding: "16px" }}>
                    <div style={{ color: "var(--signal-red)", fontWeight: 700, fontSize: "13px", marginBottom: "6px" }}>
                      DATA LOSS: IN-FLIGHT PAYLOADS PURGED
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-high)", lineHeight: 1.5 }}>
                      Hard restart killed process memory without flushing buffers. All 48 in-flight payment payloads were permanently dropped. 
                      Customers were charged with missing orders.
                    </p>
                    <div style={{ marginTop: "10px", fontWeight: 700, color: "var(--signal-red)", fontSize: "11px" }}>
                      TRANSACTIONS LOST: 48/48 (REVENUE DAMAGED)
                    </div>
                  </div>
                )}

                {selectedAction === "trip-rewind" && (
                  <div style={{ border: "1px solid var(--signal-green)", backgroundColor: "var(--signal-green-bg)", padding: "16px" }}>
                    <div style={{ color: "var(--signal-green)", fontWeight: 700, fontSize: "13px", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                      <Star style={{ width: "14px", height: "14px", fill: "currentColor" }} />
                      <span>MISSION SUCCESS: PERFECT RESILIENCE FAILOVER</span>
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-high)", lineHeight: 1.5 }}>
                      Sentinel tripped within 12ms. The <code>sync.Pool</code> request bodies were rewound using <code>io.Seeker</code> 
                      and dispatched to the secondary backup replica (:8082). All 48 transactions completed successfully with 200 OK!
                    </p>
                    <div style={{ marginTop: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
                      <span className="tag-solid active">
                        <Check style={{ width: "12px", height: "12px" }} />
                        <span>TRANSACTIONS SAVED: 48/48 (0 DROPPED)</span>
                      </span>
                      <span className="tag-solid active">
                        <span>LATENCY: 18MS</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {resolved && (
                <div
                  style={{
                    marginTop: "20px",
                    padding: "12px",
                    border: "1px solid var(--signal-green)",
                    backgroundColor: "var(--bg-canvas)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px" }}>
                    <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>ACCREDITATION UNLOCKED:</span>
                    <br />
                    <span>VERIFIED DISTRIBUTED SYSTEMS ARCHITECT</span>
                  </div>
                  <Trophy style={{ width: "22px", height: "22px", color: "var(--signal-green)" }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
