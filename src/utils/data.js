// Central Portfolio Content for Deepak Kumar
// Inspired by the Framer Neha Yadav editorial aesthetic & high-impact case study structure

export const PERSONAL_INFO = {
  name: "Deepak Kumar",
  role: "Full Stack Developer",
  location: "Bahadurgarh, Haryana, India",
  email: "deepakkumar740@gmail.com",
  linkedin: "https://linkedin.com/in/deepakrai9813",
  github: "https://github.com/deepakrai9813",
  resumeUrl: "/Deepak-Kumar-Resume.pdf",
  bioHeadline: "Crafting scalable full-stack web applications, distributed cloud backends & intelligent AI systems.",
  bioNarrative:
    "a full stack developer with 3+ years of experience across React, Next.js, Node.js, Cloud Architectures & SaaS. I turn complex engineering problems into clean, high-performance, human-friendly digital products (with chai, deep focus sessions & clean code in between).",
  status: "Available for high-impact roles & projects",
};

export const PROJECTS = [
  {
    id: "san-brothers",
    title: "San Brothers Corporate Solutions",
    year: "2025",
    category: "Web App",
    subCategory: "B2B SaaS",
    role: "Full Stack Lead",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Redis"],
    summary:
      "How we engineered an end-to-end corporate workflow suite to eliminate manual bottlenecks, automate client onboarding, and handle high-traffic financial transactions.",
    impact: [
      { metric: "4.5x", label: "Faster Onboarding" },
      { metric: "60%", label: "Latency Reduction" },
      { metric: "99.9%", label: "Production Uptime" },
    ],
    liveUrl: "https://sanbrothers.in/",
    githubUrl: "https://github.com/deepakrai9813/deepak-rai-portfolio",
    caseStudy: {
      client: "San Brothers Corporate Solutions Pvt. Ltd.",
      timeline: "6 Months",
      overview:
        "San Brothers needed an enterprise-grade digital portal to replace fragmented manual customer onboarding, invoice generation, and account reconciliation workflows. We built a unified platform from scratch using modern React on the frontend and an event-driven Express/Node.js backend with MongoDB.",
      problem:
        "Legacy operational procedures relied on manual spreadsheets and ad-hoc email communication, causing severe backlogs during quarterly closures, reconciliation errors, and slow onboarding times exceeding 7 business days.",
      solution:
        "Architected a centralized role-based web application with automated KYC verification, real-time dashboard analytics, webhook-driven transactional notifications, and distributed Redis caching for instant report queries.",
      architecture: [
        "Frontend: React SPA with optimistic UI updates and Tailwind design tokens",
        "Backend: RESTful microservices with Node.js & Express with JWT security",
        "Database: Sharded MongoDB with aggregation pipelines + Redis caching",
        "DevOps: Automated CI/CD pipeline deployed on cloud infrastructure",
      ],
      deliverables: [
        "Interactive customer onboarding portal with document upload and KYC verification",
        "Administrative dashboard with real-time transaction reconciliation",
        "Automated PDF invoice generation and payment gateway integration",
        "Granular role-based access control (RBAC) with audit logs",
      ],
    },
  },
  {
    id: "leadfinder-ai",
    title: "LeadFinder AI™",
    year: "2025",
    category: "AI Platform",
    subCategory: "Automation",
    role: "Full Stack & AI Engineer",
    tags: ["Next.js", "FastAPI", "LangChain", "OpenAI / Claude", "PostgreSQL", "Docker"],
    summary:
      "Automating high-precision prospect discovery, real-time lead qualification scoring, and multi-channel outreach workflows using intelligent LLM agents.",
    impact: [
      { metric: "10x", label: "Pipeline Velocity" },
      { metric: "85%", label: "Qualification Match" },
      { metric: "3.2k+", label: "Leads Scored/Day" },
    ],
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
    caseStudy: {
      client: "Autonomous B2B Sales Teams",
      timeline: "4 Months",
      overview:
        "Sales teams spend 60% of their working hours manually researching leads, validating emails, and drafting generic outreach messages. LeadFinder AI automates this entire pipeline using autonomous agents.",
      problem:
        "Outbound sales conversion rates were stagnating due to unverified email lists, generic messaging templates, and hours wasted manually qualifying prospects against Ideal Customer Profiles (ICPs).",
      solution:
        "Built an intelligent agentic workflow where asynchronous workers crawl public company data, summarize company value propositions with LLMs, calculate proprietary ICP fit scores, and synthesize personalized email hooks.",
      architecture: [
        "Next.js App Router for high-speed server-rendered dashboard",
        "Python FastAPI backend executing LangChain reasoning chains",
        "PostgreSQL + pgvector for semantic company embeddings search",
        "Celery & Redis worker queue executing parallel web scraping jobs",
      ],
      deliverables: [
        "One-click ICP scoring engine matching prospects to ideal customer profiles",
        "Context-aware AI cold email draft generator with 8 dynamic tone presets",
        "Real-time CSV bulk export and CRM synchronization via REST webhooks",
      ],
    },
  },
  {
    id: "nexus-cloud",
    title: "Nexus Cloud Real-Time Engine",
    year: "2024",
    category: "Distributed System",
    subCategory: "High Concurrency",
    role: "Backend Architect",
    tags: ["Node.js", "WebSockets", "Redis Pub/Sub", "Go", "Docker", "Kubernetes"],
    summary:
      "How we built a high-concurrency event-driven communication backbone capable of processing 50k+ concurrent connections with sub-50ms latency.",
    impact: [
      { metric: "sub-50ms", label: "Message Latency" },
      { metric: "50k+", label: "Concurrent Conns" },
      { metric: "40%", label: "Memory Saved" },
    ],
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
    caseStudy: {
      client: "Enterprise Live Collab Platform",
      timeline: "5 Months",
      overview:
        "Designed to power collaborative canvas applications and real-time chat platforms, Nexus Cloud handles massive socket load without dropped frames or message loss.",
      problem:
        "Single-node monolithic WebSocket servers bottlenecked at 4,000 active connections and experienced severe latency spikes when broadcasting room-wide state changes.",
      solution:
        "Decomposed the monolith into a stateless horizontal WebSocket cluster unified by Redis Pub/Sub channels and a lightweight Go routing gateway.",
      architecture: [
        "Stateless Node.js WebSocket workers scaled dynamically behind HAProxy",
        "Redis cluster distributing pub/sub broadcast channels across server nodes",
        "Protocol Buffers (Protobuf) serialization replacing JSON to slash payload size by 65%",
      ],
      deliverables: [
        "Zero-drop connection migration during rolling cluster updates",
        "Heartbeat telemetry dashboard measuring jitter, packet loss, and channel saturation",
        "Open-source TypeScript client SDK with automatic reconnect backoff",
      ],
    },
  },
  {
    id: "codecraft-studio",
    title: "CodeCraft Cloud Studio",
    year: "2024",
    category: "Developer Tool",
    subCategory: "Cloud IDE",
    role: "Full Stack Engineer",
    tags: ["React", "Monaco Editor", "WebAssembly", "Node.js", "Tailwind CSS"],
    summary:
      "In-browser code execution sandbox with instantaneous compilation, live syntax validation, and an integrated AI pair-programming assistant.",
    impact: [
      { metric: "<200ms", label: "Cold Sandbox Start" },
      { metric: "12+", label: "Languages Supported" },
      { metric: "4.9★", label: "Developer Rating" },
    ],
    liveUrl: "https://github.com/deepakrai9813",
    githubUrl: "https://github.com/deepakrai9813",
    caseStudy: {
      client: "Developer Community",
      timeline: "3 Months",
      overview:
        "Modern developer onboarding often gets stuck in complex local toolchain installations. CodeCraft provides a zero-setup browser sandbox that feels as fast as native desktop editors.",
      problem:
        "Traditional web playgrounds require heavy remote docker containers for every execution, resulting in 4-8 second wait times and costly server infrastructure.",
      solution:
        "Pioneered client-side WebAssembly execution runtimes for JavaScript, Python (Pyodide), and Go, achieving instant sub-200ms code runs directly inside the user's browser sandbox.",
      architecture: [
        "Monaco Editor integration with full language server protocol (LSP) hints",
        "WebAssembly sandbox workers running code safely in isolated web worker threads",
        "Real-time AST parsing for instant syntax error warnings and autocomplete",
      ],
      deliverables: [
        "Split-view interactive code editor and live console output emulator",
        "Instant code snippet shareable links encoded with base64 URLs",
        "Built-in AI code explainer and unit test generator powered by Claude API",
      ],
    },
  },
];

export const SIDE_QUESTS = [
  {
    id: "cyber-pet",
    title: "CyberPet — Vibe Companion",
    year: "2026",
    category: "Interactive Experiment",
    tool: "Web Audio & React State Machine",
    description:
      "An interactive desktop companion that lives in your browser. Poke it, brew it coffee, command it to write code, or let it sleep. Includes custom Web Audio sound effects and developer humor.",
    badge: "Playable Right Here",
    interactive: true,
  },
  {
    id: "api-probe",
    title: "Live Network Latency & Jitter Probe",
    year: "2025",
    category: "Developer Utility",
    tool: "Web Worker & Fetch Timing API",
    description:
      "Client-side diagnostic probe measuring roundtrip times, DNS lookup latency, and jitter variance against edge endpoints across the globe.",
    badge: "Interactive Tool",
    interactive: true,
  },
  {
    id: "glass-ui-gen",
    title: "CSS Glassmorphism Shader Lab",
    year: "2024",
    category: "Open Source Tool",
    tool: "CSS Houdini & Canvas",
    description:
      "Micro-generator for creating layered, high-performance backdrop filters with custom specular highlights and noise textures for web designers.",
    badge: "Open Source",
    interactive: true,
  },
];

export const VISUALS_GALLERY = [
  {
    id: "v-arch",
    title: "Distributed Event Bus & Microservices Architecture",
    subtitle: "High-throughput message pipeline with Redis streams and dead-letter queues",
    category: "System Blueprint",
    accent: "#6366f1",
  },
  {
    id: "v-db",
    title: "Database Partitioning & Read-Replica Topology",
    subtitle: "Zero-downtime MongoDB sharding cluster with automated failover",
    category: "Data Topology",
    accent: "#10b981",
  },
  {
    id: "v-design",
    title: "Design System Tokens & Fluid Typography Hierarchy",
    subtitle: "Atomic component library with responsive fluid scales and dark mode tokens",
    category: "Design System",
    accent: "#f59e0b",
  },
  {
    id: "v-cicd",
    title: "Zero-Downtime Multi-Region CI/CD Pipeline",
    subtitle: "GitHub Actions workflow with canary deployments and automated rollback",
    category: "Cloud DevOps",
    accent: "#3b82f6",
  },
];

export const EXPERIENCE_TIMELINE = [
  {
    id: "exp-san-brothers",
    period: "2023 — Present",
    role: "Full Stack Developer",
    company: "San Brothers Corporate Solutions",
    location: "India",
    type: "Full-Time",
    description:
      "Spearheading the engineering of enterprise customer portals, client reconciliation systems, and high-volume billing engines. Optimized API latency by 60% and slashed client onboarding turnaround time.",
    highlights: [
      "Engineered automated KYC verification pipeline handling 1,500+ daily uploads",
      "Refactored heavy MongoDB aggregation queries, cutting p95 response time from 1.8s to 240ms",
      "Implemented automated CI/CD pipeline reducing deployment cycle from 45 min to under 6 min",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "Redis", "Tailwind CSS"],
  },
  {
    id: "exp-freelance",
    period: "2022 — 2023",
    role: "Independent Full Stack Consultant",
    company: "Global Startups & SaaS Clients",
    location: "Remote",
    type: "Consulting",
    description:
      "Designed and deployed production web applications, custom CRM platforms, and payment integrations for international founders and early-stage companies.",
    highlights: [
      "Built 6+ client production web applications from initial architectural sketch to cloud launch",
      "Integrated Stripe and Razorpay payment gateways with webhook fraud detection",
      "Maintained 100% on-time milestone delivery with 5-star client reviews",
    ],
    skills: ["Next.js", "TypeScript", "REST APIs", "PostgreSQL", "Firebase"],
  },
  {
    id: "exp-open-source",
    period: "2021 — 2022",
    role: "Open Source Contributor & AI Research",
    company: "Developer Community",
    location: "Remote",
    type: "Open Source",
    description:
      "Actively contributed to open-source developer tooling, modern React component ecosystems, and studied emerging LLM agent architectures.",
    highlights: [
      "Authored popular reusable developer utility hooks and micro-libraries",
      "Deep dive into state machines, WebAssembly runtimes, and distributed databases",
    ],
    skills: ["JavaScript (ES6+)", "Git & GitHub", "Docker", "Python"],
  },
];

export const TOOLS_CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "Database",
  "Cloud & DevOps",
  "AI & Tooling",
];

export const TOOLS_DATA = [
  { name: "React", category: "Frontend", level: "Expert", desc: "Hooks, Server Components & Concurrent Mode" },
  { name: "Next.js", category: "Frontend", level: "Advanced", desc: "App Router, SSR, SSG & Edge Middleware" },
  { name: "TypeScript", category: "Frontend", level: "Advanced", desc: "Strict typing, Generics & Type safety" },
  { name: "Tailwind CSS", category: "Frontend", level: "Expert", desc: "Utility-first CSS, custom design systems" },
  { name: "JavaScript (ES6+)", category: "Frontend", level: "Expert", desc: "Async/await, Event Loop, Closures" },
  { name: "HTML5 / CSS3", category: "Frontend", level: "Expert", desc: "Semantic markup, modern CSS grid & flex" },
  
  { name: "Node.js", category: "Backend", level: "Expert", desc: "Event-driven runtime, streams & buffers" },
  { name: "Express.js", category: "Backend", level: "Expert", desc: "RESTful APIs, middleware architecture" },
  { name: "Python", category: "Backend", level: "Advanced", desc: "FastAPI, data parsing, scripting" },
  { name: "WebSockets", category: "Backend", level: "Advanced", desc: "Bidirectional real-time communication" },
  { name: "REST & GraphQL", category: "Backend", level: "Advanced", desc: "API design, schema definitions" },

  { name: "MongoDB", category: "Database", level: "Expert", desc: "Aggregation pipelines, indexing & sharding" },
  { name: "PostgreSQL", category: "Database", level: "Advanced", desc: "Relational queries, ACID transactions" },
  { name: "Redis", category: "Database", level: "Advanced", desc: "In-memory caching, Pub/Sub & queues" },
  { name: "Firebase", category: "Database", level: "Proficient", desc: "Firestore, Authentication & Storage" },

  { name: "Docker", category: "Cloud & DevOps", level: "Advanced", desc: "Multi-stage builds & containerization" },
  { name: "Git & GitHub", category: "Cloud & DevOps", level: "Expert", desc: "Branching strategies, CI/CD Actions" },
  { name: "AWS (S3/EC2)", category: "Cloud & DevOps", level: "Proficient", desc: "Cloud hosting, object storage" },
  { name: "Linux / Bash", category: "Cloud & DevOps", level: "Advanced", desc: "Server configuration, shell automation" },
  { name: "Vercel / Netlify", category: "Cloud & DevOps", level: "Expert", desc: "Zero-config edge deployment" },

  { name: "Claude API", category: "AI & Tooling", level: "Advanced", desc: "Prompt engineering, function calling" },
  { name: "OpenAI SDK", category: "AI & Tooling", level: "Advanced", desc: "Embeddings, RAG & agent chains" },
  { name: "Figma", category: "AI & Tooling", level: "Advanced", desc: "UI prototyping, design tokens, wireframing" },
  { name: "Postman", category: "AI & Tooling", level: "Expert", desc: "API testing, automated mock suites" },
];
