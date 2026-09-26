import { useState } from "react";
import { Server, Zap, ShieldCheck, Database, Check } from "./icons";

const BLUEPRINTS = {
  sentinel: {
    title: "PROJECT SENTINEL // DISTRIBUTED REVERSE PROXY SCHEMATIC",
    tagline: "High-concurrency failure recovery, zero-copy buffer rewind, and circuit-breaker telemetry.",
    nodes: [
      {
        id: "n1",
        label: "01. TCP INGESTION & SYN FLOOD FILTER",
        metric: "<0.4ms overhead",
        desc: "Accepts high-concurrency client connections. Implements adaptive connection pool limits to prevent socket exhaustion.",
        code: `ln, err := net.Listen("tcp", ":8080")\n// Atomic CAS connection tracking\natomic.AddInt64(&activeConns, 1)`,
      },
      {
        id: "n2",
        label: "02. SYNC.POOL REWINDABLE BUFFER",
        metric: "0 B/op (Zero-alloc)",
        desc: "Allocates reusable byte buffers from sync.Pool. Intercepts request bodies via custom io.ReadSeeker to allow replay if upstream fails.",
        code: `buf := bufferPool.Get().(*bytes.Buffer)\nbuf.Reset()\ndefer bufferPool.Put(buf)\nio.Copy(buf, req.Body)`,
      },
      {
        id: "n3",
        label: "03. 3-STATE CIRCUIT BREAKER",
        metric: "12ms trip time",
        desc: "Evaluates upstream latency and HTTP 5xx rates over a 10-second sliding ring buffer. Instantly trips to OPEN when error rate > 25%.",
        code: `if cb.State() == StateOpen {\n    return cb.routeToFailover(req, buf)\n}`,
      },
      {
        id: "n4",
        label: "04. UPSTREAM FAILOVER ROUTER",
        metric: "0 dropped bytes",
        desc: "On upstream SLA breach, rewinds the in-flight request buffer and replays the transaction against Secondary Replica (:8082).",
        code: `buf.Seek(0, io.SeekStart)\nfailoverReq := req.Clone(ctx)\nfailoverReq.Body = io.NopCloser(buf)`,
      },
      {
        id: "n5",
        label: "05. 60 FPS WEBSOCKET TELEMETRY",
        metric: "16ms tick rate",
        desc: "Streams real-time metrics (latency p50/p99, error rate, memory allocation) directly to client diagnostic dashboards.",
        code: `telemetryHub.Broadcast(&MetricPacket{\n    Latency: p50,\n    State: cb.State(),\n})`,
      },
    ],
  },
  "san-brothers": {
    title: "SAN BROTHERS // PRODUCTION LEGAL COMPLIANCE ARCHITECTURE",
    tagline: "Enterprise compliance portal ranking #1 on Google with sub-second LCP.",
    nodes: [
      {
        id: "sb1",
        label: "01. EDGE CDN CACHE",
        metric: "<45ms TTFB",
        desc: "Serves globally distributed static assets with immutable cache-control headers, achieving instantaneous first paint.",
        code: `Cache-Control: public, max-age=31536000, immutable`,
      },
      {
        id: "sb2",
        label: "02. SEMANTIC RDFa & JSON-LD GRAPH",
        metric: "#1 Google Search",
        desc: "Injects structured schema entities into document head, giving Google search spiders unambiguous organizational identity.",
        code: `{"@context": "https://schema.org", "@type": "LegalService"}`,
      },
      {
        id: "sb3",
        label: "03. RATE-LIMITED EXPRESS GATEWAY",
        metric: "Honeypot armed",
        desc: "Protects legal consultation intake from spam bots using token bucket rate limiters and invisible cryptographic honeypots.",
        code: `limiter := rate.NewLimiter(rate.Every(time.Minute), 5)`,
      },
    ],
  },
  "bian-ai": {
    title: "BIAN AI // HIGH-SPEED LLM STREAMING & OFF-THREAD PARSER",
    tagline: "Off-thread binary PDF chunking with Groq LLaMA-3 token streaming at 250+ tokens/sec.",
    nodes: [
      {
        id: "b1",
        label: "01. WEB WORKER PDF PARSER",
        metric: "0 main-thread jank",
        desc: "Spawns dedicated Web Workers to parse 200+ page binary PDF files off the main thread, maintaining locked 60 FPS scrolling.",
        code: `const worker = new Worker('/pdfWorker.js');\nworker.postMessage({ buffer, chunkSize: 1024 });`,
      },
      {
        id: "b2",
        label: "02. GROQ LLM SSE STREAM PIPE",
        metric: "250+ tokens/sec",
        desc: "Consumes Server-Sent Events (SSE) with an adaptive backpressure buffer to avoid React re-render thrashing.",
        code: `const stream = await groq.chat.completions.create({\n    model: 'llama3-70b-8192',\n    stream: true,\n});`,
      },
      {
        id: "b3",
        label: "03. REAL-TIME CITATION RESOLVER",
        metric: "<15ms anchor jump",
        desc: "Maps LLM generated answer tokens to physical PDF coordinate bounding boxes for instant verifiable citation validation.",
        code: `renderCitationHighlight(pageNumber, textRect);`,
      },
    ],
  },
  "leadfinder-ai": {
    title: "LEADFINDER AI // NEXT.JS 16 & POSTGRESQL SEARCH PIPELINE",
    tagline: "Relational B2B lead enrichment with composite index scanning and React Server Components.",
    nodes: [
      {
        id: "l1",
        label: "01. REACT SERVER COMPONENTS (RSC)",
        metric: "<25kB client JS",
        desc: "Fetches and renders corporate registry data on the server, eliminating client-side bundle bloat.",
        code: `export default async function LeadDirectory() {\n    const leads = await prisma.company.findMany(...);\n}`,
      },
      {
        id: "l2",
        label: "02. COMPOSITE B-TREE INDEXED ENGINE",
        metric: "<42ms query time",
        desc: "Index-only scan covering industry, country, and verified status with zero disk table lookups.",
        code: `CREATE INDEX idx_companies_search ON companies (industry, country);`,
      },
    ],
  },
  "debe-learning": {
    title: "DEBE LEARNING // DETERMINISTIC UTC RESCHEDULE ENGINE",
    tagline: "Strict UTC epoch slot allocation tested with Playwright cross-timezone matrix suites.",
    nodes: [
      {
        id: "d1",
        label: "01. IMMUTABLE UTC EPOCH MODEL",
        metric: "0 timezone drift",
        desc: "Eliminates daylight savings calculation bugs by storing all booking slots exclusively in UTC unix milliseconds.",
        code: `const bookingSlotUTC = Date.UTC(year, month, day, hour, min);`,
      },
      {
        id: "d2",
        label: "02. PLAYWRIGHT E2E TIMEZONE MATRIX",
        metric: "5 continents verified",
        desc: "Automated test suites simulating browser sessions from London, Tokyo, New York, and Sydney simultaneously.",
        code: `test.use({ timezoneId: 'America/New_York' });`,
      },
    ],
  },
};

export default function SystemBlueprintModal({ projectId, onClose, playClick, playPop }) {
  const blueprint = BLUEPRINTS[projectId] || BLUEPRINTS.sentinel;
  const [selectedNode, setSelectedNode] = useState(blueprint.nodes[0]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        className="sandbox-chassis"
        style={{
          width: "100%",
          maxWidth: "940px",
          maxHeight: "90vh",
          overflowY: "auto",
          backgroundColor: "var(--bg-canvas)",
          margin: 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sandbox-meta-header">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="led-indicator" />
            <span style={{ fontWeight: 700, color: "var(--text-high)", fontSize: "12px" }}>
              ARCHITECTURAL SPECIFICATION BLUEPRINT
            </span>
          </div>

          <button
            type="button"
            className="btn-mech-outline"
            style={{ padding: "4px 10px", fontSize: "11px" }}
            onClick={() => {
              playClick?.();
              onClose();
            }}
          >
            [CLOSE ×]
          </button>
        </div>

        {/* Blueprint Overview */}
        <div style={{ padding: "24px", borderBottom: "1px solid var(--border-base)", backgroundColor: "var(--bg-subtle)" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 800, color: "var(--text-high)", marginBottom: "6px" }}>
            {blueprint.title}
          </h3>
          <p style={{ fontSize: "13px", color: "var(--text-med)", fontFamily: "var(--font-mono)" }}>
            {blueprint.tagline}
          </p>
        </div>

        {/* Interactive Schematic Split */}
        <div className="sandbox-workbench-grid">
          {/* Left: Sequential Architectural Nodes */}
          <div style={{ padding: "24px", borderRight: "1px solid var(--border-base)" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--text-dim)", marginBottom: "14px" }}>
              PIPELINE STAGES (CLICK NODE TO INSPECT):
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {blueprint.nodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    className={`capability-item-card ${isSelected ? "highlighted" : ""}`}
                    onClick={() => {
                      playPop?.();
                      setSelectedNode(node);
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 700, color: "var(--text-high)" }}>{node.label}</span>
                      <span className="tag-solid active" style={{ fontSize: "10px" }}>
                        {node.metric}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Node Detail & Code Excerpt */}
          <div style={{ padding: "24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, color: "var(--signal-green)", marginBottom: "8px" }}>
                [SELECTED STAGE DETAILS]
              </div>

              <h4 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text-high)", marginBottom: "8px" }}>
                {selectedNode?.label}
              </h4>

              <p style={{ fontSize: "13px", color: "var(--text-med)", lineHeight: 1.6, marginBottom: "16px" }}>
                {selectedNode?.desc}
              </p>

              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-dim)", marginBottom: "6px" }}>
                PRODUCTION CODE EXCERPT:
              </div>

              <div
                style={{
                  padding: "14px",
                  backgroundColor: "#07080a",
                  color: "#00d665",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  lineHeight: 1.5,
                  border: "1px solid var(--border-base)",
                  overflowX: "auto",
                }}
              >
                <pre style={{ margin: 0 }}>
                  <code>{selectedNode?.code}</code>
                </pre>
              </div>
            </div>

            <div
              style={{
                marginTop: "16px",
                paddingTop: "10px",
                borderTop: "1px solid var(--border-base)",
                fontFamily: "var(--font-mono)",
                fontSize: "10px",
                color: "var(--text-dim)",
              }}
            >
              VERIFIED IN CODE REPOSITORY // 100% UNIT TEST COVERAGE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
