import { useState } from "react";

export default function QueryOptimizerVisualizer() {
  const [selectedScenario, setSelectedScenario] = useState("orders");
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(true);

  const scenarios = {
    orders: {
      id: "orders",
      title: "Multi-Tenant Order Status Filtering",
      table: "orders (2,410,500 rows)",
      problem: "Sequential full-table scan locking database CPU during peak distributor dashboard traffic.",
      unoptimizedQuery: `SELECT id, dealer_id, total_amount, created_at
FROM orders
WHERE tenant_id = 'tn_7701' AND status = 'COMPLETED'
ORDER BY created_at DESC
LIMIT 50;`,
      unoptimizedPlan: `Limit (cost=48210.40..48210.52 rows=50 width=48)
  -> Sort (cost=48210.40..48216.42 rows=2410 width=48)
        Sort Key: created_at DESC
        Sort Method: external merge  Disk: 18420kB
        -> Seq Scan on orders (cost=0.00..48120.00 rows=2410 width=48)
              Filter: ((tenant_id = 'tn_7701') AND (status = 'COMPLETED'))
              Rows Removed by Filter: 2408090
Planning Time: 0.184 ms
Execution Time: 1842.150 ms`,
      unoptimizedTime: "1,842.15 ms",
      unoptimizedRows: "2,410,500 scanned",
      unoptimizedMemory: "480 MB Buffer",
      optimizedQuery: `-- Deepak's Optimized Composite B-Tree Covering Index
CREATE INDEX CONCURRENTLY idx_orders_tenant_status_cover
ON orders (tenant_id, status, created_at DESC)
INCLUDE (id, dealer_id, total_amount);`,
      optimizedPlan: `Limit (cost=0.43..8.45 rows=50 width=48)
  -> Index Only Scan using idx_orders_tenant_status_cover on orders
        Index Cond: ((tenant_id = 'tn_7701') AND (status = 'COMPLETED'))
        Heap Fetches: 0
Planning Time: 0.092 ms
Execution Time: 0.082 ms`,
      optimizedTime: "0.082 ms",
      optimizedRows: "50 rows fetched",
      optimizedMemory: "16 KB Buffer",
      speedup: "22,465x Faster",
      strategy: "Composite B-Tree Covering Index with INCLUDE clause to eliminate heap lookups and sorting in memory.",
    },
    inventory: {
      id: "inventory",
      title: "Warehouse Inventory Stock Aggregation",
      table: "stock_ledgers (850,000 rows)",
      problem: "Aggregating warehouse stock across SKU variations required expensive hash aggregate scans on raw rows.",
      unoptimizedQuery: `SELECT sku, SUM(quantity_change) as on_hand
FROM stock_ledgers
WHERE warehouse_id = 'wh_delhi_01'
GROUP BY sku
HAVING SUM(quantity_change) > 0;`,
      unoptimizedPlan: `HashAggregate (cost=19420.00..19480.00 rows=6000 width=36)
  Group Key: sku
  Filter: (sum(quantity_change) > 0)
  -> Seq Scan on stock_ledgers (cost=0.00..15170.00 rows=850000 width=24)
        Filter: (warehouse_id = 'wh_delhi_01')
        Rows Removed by Filter: 720000
Planning Time: 0.240 ms
Execution Time: 485.400 ms`,
      unoptimizedTime: "485.40 ms",
      unoptimizedRows: "850,000 scanned",
      unoptimizedMemory: "94 MB Buffer",
      optimizedQuery: `-- Partial covering index + Materialized stock balance view
CREATE INDEX CONCURRENTLY idx_stock_warehouse_sku_qty
ON stock_ledgers (warehouse_id, sku)
INCLUDE (quantity_change);`,
      optimizedPlan: `GroupAggregate (cost=0.42..124.50 rows=1200 width=36)
  Group Key: sku
  Filter: (sum(quantity_change) > 0)
  -> Index Only Scan using idx_stock_warehouse_sku_qty on stock_ledgers
        Index Cond: (warehouse_id = 'wh_delhi_01')
Planning Time: 0.075 ms
Execution Time: 2.120 ms`,
      optimizedTime: "2.12 ms",
      optimizedRows: "1,200 entries",
      optimizedMemory: "64 KB Buffer",
      speedup: "229x Faster",
      strategy: "Index-ordered pipeline grouping eliminating hash table overhead and scanning only relevant warehouse partitions.",
    },
    kyc: {
      id: "kyc",
      title: "Distributor KYC Document Hash Lookup",
      table: "kyc_documents (320,000 rows)",
      problem: "Verification workers checking duplicate national IDs triggered full text table scans on unindexed SHA256 hashes.",
      unoptimizedQuery: `SELECT distributor_id, document_type, verified_at
FROM kyc_documents
WHERE document_hash = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
AND status = 'VERIFIED';`,
      unoptimizedPlan: `Seq Scan on kyc_documents (cost=0.00..12840.00 rows=1 width=64)
  Filter: ((status = 'VERIFIED') AND (document_hash = 'e3b0c442...'))
  Rows Removed by Filter: 319999
Planning Time: 0.110 ms
Execution Time: 218.600 ms`,
      unoptimizedTime: "218.60 ms",
      unoptimizedRows: "320,000 scanned",
      unoptimizedMemory: "52 MB Buffer",
      optimizedQuery: `-- Unique Hash Index with Partial Predicate
CREATE UNIQUE INDEX CONCURRENTLY idx_kyc_verified_hash
ON kyc_documents (document_hash)
WHERE status = 'VERIFIED';`,
      optimizedPlan: `Index Scan using idx_kyc_verified_hash on kyc_documents (cost=0.28..4.30 rows=1 width=64)
  Index Cond: (document_hash = 'e3b0c442...')
Planning Time: 0.060 ms
Execution Time: 0.045 ms`,
      optimizedTime: "0.045 ms",
      optimizedRows: "1 row fetched",
      optimizedMemory: "8 KB Buffer",
      speedup: "4,857x Faster",
      strategy: "Partial unique B-tree index indexing only verified documents, keeping index size 75% smaller and instant in L1 cache.",
    },
  };

  const current = scenarios[selectedScenario] || scenarios.orders;

  const handleRunExecution = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
    }, 600);
  };

  return (
    <div className="query-optimizer-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          </svg>
          <span>DATABASE PERFORMANCE TUNING</span>
        </div>
        <h2 className="section-heading-title">Database Query Optimizer &amp; Plan Visualizer</h2>
        <p className="section-subtitle-text">
          Compare unindexed sequential scans versus optimized composite covering indexes with live execution plan metrics.
        </p>
      </div>

      <div className="optimizer-main-card">
        {/* Scenario Switcher Tabs */}
        <div className="optimizer-scenario-bar">
          <div className="scenario-pills-row" role="tablist">
            {Object.values(scenarios).map((s) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={selectedScenario === s.id}
                className={`scenario-pill-btn ${selectedScenario === s.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedScenario(s.id);
                  setHasExecuted(true);
                }}
              >
                <span>{s.title}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            className="btn-run-explain"
            onClick={handleRunExecution}
            disabled={isExecuting}
            title="Execute EXPLAIN ANALYZE comparison"
          >
            {isExecuting ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin">
                  <line x1="12" y1="2" x2="12" y2="6" />
                  <line x1="12" y1="18" x2="12" y2="22" />
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                  <line x1="2" y1="12" x2="6" y2="12" />
                  <line x1="18" y1="12" x2="22" y2="12" />
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                </svg>
                <span>Analyzing Plan...</span>
              </>
            ) : (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                <span>Run EXPLAIN ANALYZE</span>
              </>
            )}
          </button>
        </div>

        {/* Target Table Scope Bar */}
        <div className="optimizer-target-banner">
          <div className="target-meta-left">
            <span className="target-label">Target Dataset:</span>
            <span className="target-name font-mono">{current.table}</span>
          </div>
          <div className="target-speedup-badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>{current.speedup}</span>
          </div>
        </div>

        {/* Side-by-Side Execution Comparison Grid */}
        <div className="optimizer-comparison-grid">
          {/* Unoptimized Column */}
          <div className="plan-column unoptimized">
            <div className="plan-col-header">
              <div className="col-title-group">
                <span className="plan-type-pill danger">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <span>UNINDEXED SCAN (BEFORE)</span>
                </span>
                <span className="col-subtext">Sequential full table scan with heavy memory sorting</span>
              </div>
            </div>

            <div className="metrics-summary-bar danger">
              <div className="metric-cell">
                <span className="lbl">Exec Time</span>
                <span className="val danger">{current.unoptimizedTime}</span>
              </div>
              <div className="metric-cell">
                <span className="lbl">Row Filtering</span>
                <span className="val">{current.unoptimizedRows}</span>
              </div>
              <div className="metric-cell">
                <span className="lbl">Buffer Overhead</span>
                <span className="val">{current.unoptimizedMemory}</span>
              </div>
            </div>

            <div className="code-box-wrapper">
              <div className="code-box-header">
                <span className="header-label">SQL QUERY</span>
              </div>
              <pre className="query-code-pre">
                <code>{current.unoptimizedQuery}</code>
              </pre>
            </div>

            <div className="code-box-wrapper plan-box">
              <div className="code-box-header">
                <span className="header-label">EXPLAIN ANALYZE OUTPUT</span>
              </div>
              <pre className="plan-output-pre">
                <code>{current.unoptimizedPlan}</code>
              </pre>
            </div>
          </div>

          {/* Optimized Column */}
          <div className="plan-column optimized">
            <div className="plan-col-header">
              <div className="col-title-group">
                <span className="plan-type-pill success">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>DEEPAK'S COVERING INDEX (AFTER)</span>
                </span>
                <span className="col-subtext">Zero-heap fetch index scan with sub-millisecond return</span>
              </div>
            </div>

            <div className="metrics-summary-bar success">
              <div className="metric-cell">
                <span className="lbl">Exec Time</span>
                <span className="val success">{current.optimizedTime}</span>
              </div>
              <div className="metric-cell">
                <span className="lbl">Row Filtering</span>
                <span className="val">{current.optimizedRows}</span>
              </div>
              <div className="metric-cell">
                <span className="lbl">Buffer Overhead</span>
                <span className="val">{current.optimizedMemory}</span>
              </div>
            </div>

            <div className="code-box-wrapper">
              <div className="code-box-header">
                <span className="header-label">INDEX DEFINITION</span>
              </div>
              <pre className="query-code-pre success">
                <code>{current.optimizedQuery}</code>
              </pre>
            </div>

            <div className="code-box-wrapper plan-box">
              <div className="code-box-header">
                <span className="header-label">OPTIMIZED EXPLAIN OUTPUT</span>
              </div>
              <pre className="plan-output-pre success">
                <code>{current.optimizedPlan}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* Strategy Breakdown Card */}
        <div className="optimizer-strategy-footer">
          <div className="strategy-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 11 12 14 22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span className="strategy-title">Index Engineering Strategy:</span>
          </div>
          <p className="strategy-text">{current.strategy}</p>
        </div>
      </div>
    </div>
  );
}
