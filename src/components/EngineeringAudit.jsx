import { useState } from "react";
import { ShieldCheck, Zap, Server, Check, XIcon } from "./icons";

const COMPARISON_ROWS = [
  {
    category: "FAILURE RESILIENCE",
    standard: "Uncaught 504 errors trigger cascading downstream failure. In-flight payloads dropped. Hope-based uptime.",
    deepak: "Autonomous 3-state Circuit Breaker. Rewindable request bodies via sync.Pool replay in-flight bytes to replicas with 0 dropped transactions.",
    verdict: "0% PACKET LOSS",
  },
  {
    category: "CONCURRENCY & MEMORY",
    standard: "Unbounded Promise.all() exhausts Node.js event loop. Naive byte slices trigger frequent GC STW pauses (15ms+).",
    deepak: "Worker pool with bounded Go channels, atomic CAS operations, and sync.Pool buffer recycling. Zero heap escapes.",
    verdict: "<4.2MB HEAP",
  },
  {
    category: "DATABASE ARCHITECTURE",
    standard: "Naive ORM calls with N+1 relational penalties, missing table indexes, and full-table scans on production tables.",
    deepak: "Strict ACID isolation, composite B-Tree indexing, execution plan profiling (EXPLAIN ANALYZE), sub-45ms query resolution.",
    verdict: "SUB-45MS QUERIES",
  },
  {
    category: "TESTING DISCIPLINE",
    standard: "Trivial unit tests with mock stubs that pass in CI while production breaks on first real network anomaly.",
    deepak: "Toxiproxy chaos latency injection (500ms), automated Playwright cross-timezone matrices, and go test -race clean.",
    verdict: "CHAOS TESTED",
  },
  {
    category: "PERFORMANCE & DESIGN",
    standard: "Heavy 4MB JavaScript bundles, template vibe-coded gradient meshes, 2.8s LCP, main-thread freezing on document parsing.",
    deepak: "Zero-gradient Swiss typography, 0.74s LCP, 100 Lighthouse score, and off-thread Web Workers for heavy parsing.",
    verdict: "100 LIGHTHOUSE",
  },
];

const CODE_EXAMPLES = {
  resilience: {
    title: "CIRCUIT BREAKER BUFFER REWIND (GO)",
    code: `// Deepak Rai — Project Sentinel Circuit Breaker & Rewind Buffer
func (cb *CircuitBreaker) Execute(req *http.Request, bodyBuf *bytes.Buffer) (*http.Response, error) {
    if !cb.AllowRequest() {
        // Circuit is OPEN: Route instantly to secondary replica without stalling client
        return cb.failoverClient.Do(cb.cloneRequest(req, bodyBuf))
    }
    
    // Attempt Primary with buffered rewindable body
    resp, err := cb.primaryClient.Do(req)
    if err != nil || resp.StatusCode >= 500 {
        cb.RecordFailure()
        // Rewind buffer bytes without allocating new memory
        bodyBuf.Reset() 
        return cb.failoverClient.Do(cb.cloneRequest(req, bodyBuf))
    }
    
    cb.RecordSuccess()
    return resp, nil
}`,
  },
  concurrency: {
    title: "BOUNDED WORKER POOL & SYNC.POOL (GO)",
    code: `// Deepak Rai — Zero-Alloc Buffered Proxy Pipeline
var bufferPool = sync.Pool{
    New: func() any {
        return bytes.NewBuffer(make([]byte, 0, 32*1024))
    },
}

func StreamProxy(w http.ResponseWriter, r *http.Request) {
    buf := bufferPool.Get().(*bytes.Buffer)
    buf.Reset()
    defer bufferPool.Put(buf) // Returned to pool: 0 heap escape, 0 GC pause
    
    _, err := io.Copy(buf, r.Body)
    if err != nil {
        http.Error(w, "stream read error", http.StatusBadRequest)
        return
    }
    // Forward payload downstream...
}`,
  },
  database: {
    title: "COMPOSITE INDEXED QUERY PROFILE (SQL)",
    code: `-- Deepak Rai — Relational Search Optimization (LeadFinder AI)
CREATE INDEX CONCURRENTLY idx_companies_search_covering 
ON companies (industry, country, employee_count) 
INCLUDE (company_name, domain_verified, lead_score);

-- Query plan executes as Index-Only Scan with 0 heap fetches:
EXPLAIN (ANALYZE, BUFFERS)
SELECT company_name, domain_verified, lead_score
FROM companies
WHERE industry = 'FINTECH' AND country = 'US'
ORDER BY lead_score DESC
LIMIT 50;
-- Execution time: 1.42ms (reduced from 312ms)`,
  },
};

export default function EngineeringAudit({ playClick, playPop }) {
  const [activeCodeTab, setActiveCodeTab] = useState("resilience");

  return (
    <section id="audit" style={{ marginBottom: "64px" }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-label">
            // 04-B. CODE AUDIT &amp; RIGOR // TECHNICAL COMPARISON
          </div>
          <h2 className="section-headline">
            THE SYSTEMS AUDIT: STANDARD VS. DEEPAK RAI
          </h2>
          <p className="section-subtext">
            Compare conventional full-stack development patterns against Deepak&apos;s systems engineering discipline. 
            Real resilience is measured in dropped packets, memory leaks, and query execution plans.
          </p>
        </div>

        {/* Audit Table Chassis */}
        <div className="sandbox-chassis" style={{ marginBottom: "32px" }}>
          <div className="sandbox-meta-header">
            <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
              TECHNICAL COMPARISON MATRIX // STANDARDS AUDIT
            </span>
            <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
              VERIFIED ARCHITECT LEVEL
            </span>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: "12px" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--bg-subtle)", borderBottom: "1px solid var(--border-base)", textAlign: "left" }}>
                  <th style={{ padding: "14px 18px", color: "var(--text-dim)", width: "22%" }}>DISCIPLINE</th>
                  <th style={{ padding: "14px 18px", color: "var(--signal-red)", width: "38%" }}>CONVENTIONAL DEV PATTERN</th>
                  <th style={{ padding: "14px 18px", color: "var(--signal-green)", width: "40%" }}>DEEPAK RAI ARCHITECTURE</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={row.category}
                    style={{
                      borderBottom: "1px solid var(--border-subtle)",
                      backgroundColor: idx % 2 === 0 ? "var(--bg-surface)" : "var(--bg-subtle)",
                    }}
                  >
                    <td style={{ padding: "16px 18px", fontWeight: 700, color: "var(--text-high)" }}>
                      <div>{row.category}</div>
                      <span className="tag-solid active" style={{ marginTop: "6px", fontSize: "10px" }}>
                        {row.verdict}
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px", color: "var(--text-med)", lineHeight: 1.5 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <XIcon style={{ width: "12px", height: "12px", color: "var(--signal-red)", flexShrink: 0 }} />
                        <span>{row.standard}</span>
                      </span>
                    </td>
                    <td style={{ padding: "16px 18px", color: "var(--text-high)", lineHeight: 1.5 }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                        <Check style={{ width: "12px", height: "12px", color: "var(--signal-green)", flexShrink: 0 }} />
                        <span>{row.deepak}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inspectable Production Code Artifacts */}
        <div className="sandbox-chassis">
          <div className="sandbox-meta-header">
            <span style={{ fontWeight: 700, color: "var(--text-high)" }}>
              CODE ARTIFACT INSPECTOR: {CODE_EXAMPLES[activeCodeTab].title}
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              {Object.keys(CODE_EXAMPLES).map((key) => (
                <button
                  key={key}
                  type="button"
                  className={`tag-solid ${activeCodeTab === key ? "active" : ""}`}
                  style={{ cursor: "pointer", fontSize: "11px" }}
                  onClick={() => {
                    playPop?.();
                    setActiveCodeTab(key);
                  }}
                >
                  [{key.toUpperCase()}]
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              backgroundColor: "#07080a",
              color: "#00d665",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              lineHeight: 1.6,
              overflowX: "auto",
            }}
          >
            <pre style={{ margin: 0 }}>
              <code>{CODE_EXAMPLES[activeCodeTab].code}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
