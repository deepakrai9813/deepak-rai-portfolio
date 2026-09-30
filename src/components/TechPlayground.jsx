import { useState } from "react";

export default function TechPlayground() {
  const [activeCategory, setActiveCategory] = useState("backend");
  const [selectedTechIndex, setSelectedTechIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const categories = [
    { id: "backend", label: "Backend & Systems" },
    { id: "frontend", label: "Frontend & UI" },
    { id: "database", label: "Databases & Cache" },
    { id: "devops", label: "DevOps & Cloud" },
  ];

  const techData = {
    backend: [
      {
        name: "Redis Distributed Mutex Lock",
        tech: "Node.js / Redis",
        benchmark: "< 3.2ms Lock Acquisition",
        tag: "CONCURRENCY CONTROL",
        summary: "Prevents race conditions and double-spending in high-frequency order checkout transactions.",
        code: `// Atomically acquire distributed lock with automatic TTL expiry
async function acquireDistributedLock(client, resourceKey, ttlMs = 5000) {
  const token = crypto.randomUUID();
  const acquired = await client.set(\`lock:\${resourceKey}\`, token, {
    NX: true, // Only set if not already present
    PX: ttlMs // Millisecond precision expiry
  });

  if (!acquired) {
    throw new ConcurrencyConflictError(\`Resource \${resourceKey} is currently locked.\`);
  }

  return {
    release: async () => {
      // Lua script ensures atomic check-and-delete
      const luaScript = \`
        if redis.call("get", KEYS[1]) == ARGV[1] then
          return redis.call("del", KEYS[1])
        else
          return 0
        end
      \`;
      return client.eval(luaScript, { keys: [\`lock:\${resourceKey}\`], arguments: [token] });
    }
  };
}`,
      },
      {
        name: "Event-Driven Worker Queue",
        tech: "RabbitMQ / TypeScript",
        benchmark: "12,000 Jobs/sec Throughput",
        tag: "ASYNC PROCESSING",
        summary: "Decouples resource-heavy tasks (PDF rendering, webhooks, KYC verification) into reliable worker queues.",
        code: `// Resilient consumer with dead-letter queue and automatic backoff
export async function setupResilientQueueConsumer(channel, queueName, handler) {
  await channel.assertQueue(queueName, {
    durable: true,
    deadLetterExchange: 'dlx.orders',
    deadLetterRoutingKey: \`\${queueName}.failed\`
  });

  channel.prefetch(10); // Backpressure control

  channel.consume(queueName, async (msg) => {
    if (!msg) return;
    try {
      const payload = JSON.parse(msg.content.toString());
      await handler(payload);
      channel.ack(msg);
    } catch (err) {
      console.error(\`[Worker Error] Retrying job:\`, err.message);
      channel.nack(msg, false, false); // Route to Dead-Letter Exchange
    }
  });
}`,
      },
    ],
    frontend: [
      {
        name: "Optimistic UI Mutation Hook",
        tech: "React 19 / TanStack Query",
        benchmark: "0ms Perceived Latency",
        tag: "CLIENT ARCHITECTURE",
        summary: "Immediately reflects state updates on client screens while handling graceful rollback if network drops.",
        code: `export function useOptimisticOrderUpdate() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateOrderStatusAPI,
    onMutate: async ({ orderId, nextStatus }) => {
      await queryClient.cancelQueries({ queryKey: ['orders', orderId] });
      const previousSnapshot = queryClient.getQueryData(['orders', orderId]);

      // Instantly update the cache optimistically
      queryClient.setQueryData(['orders', orderId], (old) => ({
        ...old,
        status: nextStatus,
        updatedAt: new Date().toISOString()
      }));

      return { previousSnapshot, orderId };
    },
    onError: (err, newTodo, context) => {
      // Revert back to snapshot if server rejected
      queryClient.setQueryData(['orders', context.orderId], context.previousSnapshot);
    },
    onSettled: (data, error, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: ['orders', orderId] });
    }
  });
}`,
      },
      {
        name: "Virtual Windowing for High-Volume Grids",
        tech: "React 19 / TypeScript",
        benchmark: "60 FPS with 50,000+ Items",
        tag: "PERFORMANCE RENDERING",
        summary: "Calculates viewport geometry to only mount DOM nodes visible on the user's active viewport.",
        code: `export function useVirtualWindow(itemCount, itemHeight, viewportHeight, scrollTop) {
  const overscan = 5;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endIndex = Math.min(
    itemCount - 1,
    Math.floor((scrollTop + viewportHeight) / itemHeight) + overscan
  );

  const visibleItems = [];
  for (let i = startIndex; i <= endIndex; i++) {
    visibleItems.push({
      index: i,
      offsetTop: i * itemHeight
    });
  }

  return {
    totalHeight: itemCount * itemHeight,
    visibleItems,
    startIndex,
    endIndex
  };
}`,
      },
    ],
    database: [
      {
        name: "PostgreSQL Composite Indexing",
        tech: "PostgreSQL / Prisma",
        benchmark: "Query time: 1.85s -> 14ms",
        tag: "INDEX OPTIMIZATION",
        summary: "Eliminates sequential table scans on massive multi-tenant order tables through index covering.",
        code: `-- Avoid full-table sequential scans across 2,000,000+ rows
CREATE INDEX CONCURRENTLY idx_tenant_order_filter
ON orders (tenant_id, status, created_at DESC)
INCLUDE (id, total_amount, dealer_name);

-- Explain Analyze output verifies Index-Only Scan:
-- Index Only Scan using idx_tenant_order_filter on orders
-- Execution Time: 0.084 ms (down from 1,850 ms)`,
      },
      {
        name: "Redis Pipeline Read-Through Cache",
        tech: "Redis / Node.js",
        benchmark: "99.4% Cache Hit Rate",
        tag: "IN-MEMORY CACHE",
        summary: "Batches multiple cache lookups in a single network round-trip using Redis pipelining.",
        code: `export async function batchFetchEntityCache(redisClient, entityIds, fetchFallback) {
  const pipeline = redisClient.multi();
  entityIds.forEach((id) => pipeline.get(\`entity:\${id}\`));
  const rawResults = await pipeline.exec();

  const missingIds = [];
  const results = rawResults.map((val, idx) => {
    if (!val) {
      missingIds.push(entityIds[idx]);
      return null;
    }
    return JSON.parse(val);
  });

  if (missingIds.length > 0) {
    const fetched = await fetchFallback(missingIds);
    // Asynchronously write through in single batch
    const writePipe = redisClient.multi();
    fetched.forEach((item) => writePipe.setEx(\`entity:\${item.id}\`, 3600, JSON.stringify(item)));
    await writePipe.exec();
  }

  return results;
}`,
      },
    ],
    devops: [
      {
        name: "Multi-Stage Alpine Production Container",
        tech: "Docker / Node.js",
        benchmark: "68% Smaller Footprint (112 MB)",
        tag: "CONTAINER HARDENING",
        summary: "Strips build tooling, devDependencies, and root privileges to deliver minimal attack surface.",
        code: `# Stage 1: Build & Prune
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build && npm prune --production

# Stage 2: Hardened Runtime
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs -g 1001 && adduser -S appuser -u 1001
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=15s --timeout=3s CMD wget -qO- http://localhost:8080/health || exit 1
CMD ["node", "dist/index.js"]`,
      },
    ],
  };

  const currentList = techData[activeCategory] || [];
  const currentItem = currentList[selectedTechIndex] || currentList[0];

  const handleCopyCode = () => {
    if (currentItem?.code) {
      navigator.clipboard.writeText(currentItem.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="tech-playground-widget">
      <div className="section-header-lockup">
        <div className="section-tag-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>INTERACTIVE CODE LAB</span>
        </div>
        <h2 className="section-heading-title">Live Architecture & Code Inspector</h2>
        <p className="section-subtitle-text">
          Explore real production patterns, concurrency controllers, and database optimization algorithms I write in active enterprise environments.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="playground-category-pills" role="tablist">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`playground-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => {
              setActiveCategory(cat.id);
              setSelectedTechIndex(0);
            }}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Inspector Card */}
      <div className="playground-inspector-card">
        {/* Left Sidebar: Pattern List */}
        <div className="inspector-sidebar">
          <div className="sidebar-header">
            <span className="sidebar-title">PRODUCTION PATTERNS</span>
            <span className="pattern-count">{currentList.length} Recipes</span>
          </div>
          <div className="patterns-nav-list">
            {currentList.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className={`pattern-select-btn ${selectedTechIndex === idx ? "active" : ""}`}
                onClick={() => setSelectedTechIndex(idx)}
              >
                <div className="pattern-btn-content">
                  <span className="pattern-name">{item.name}</span>
                  <span className="pattern-tech-badge">{item.tech}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Right Panel: Code & Benchmark View */}
        <div className="inspector-code-pane">
          {currentItem && (
            <>
              <div className="code-pane-header">
                <div className="pane-title-group">
                  <span className="code-tag-badge">{currentItem.tag}</span>
                  <h3 className="code-title-text">{currentItem.name}</h3>
                </div>
                <div className="pane-actions-group">
                  <span className="benchmark-pill" title="Verified Production Benchmark">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{currentItem.benchmark}</span>
                  </span>
                  <button
                    type="button"
                    className="btn-copy-code"
                    onClick={handleCopyCode}
                    title="Copy code snippet"
                  >
                    {copied ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span className="copied-text">Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                        </svg>
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="code-summary-box">
                <p>{currentItem.summary}</p>
              </div>

              <div className="code-editor-mock">
                <div className="editor-tab-bar">
                  <span className="window-dot red" />
                  <span className="window-dot yellow" />
                  <span className="window-dot green" />
                  <span className="editor-file-tab">production-snippet.ts</span>
                </div>
                <pre className="syntax-pre-block">
                  <code>{currentItem.code}</code>
                </pre>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
