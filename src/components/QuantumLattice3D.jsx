import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, Layers, Activity, RefreshCw } from "./icons";

const TOPOLOGIES = [
  { id: "geodesic", name: "01. GEODESIC QUORUM", desc: "Spherical Raft consensus quorum with uniform node distribution" },
  { id: "torus", name: "02. CONCURRENCY TORUS", desc: "High-throughput token-passing ring for lock-free parallel dispatch" },
  { id: "hypercube", name: "03. DISTRIBUTED MESH", desc: "3D hyper-mesh cluster with redundant multi-path routing" },
];

export default function QuantumLattice3D() {
  const containerRef = useRef(null);
  const [activeTopology, setActiveTopology] = useState("geodesic");
  const [packetCount, setPacketCount] = useState(128);
  const [consensusScore, setConsensusScore] = useState(99.98);
  const [burstActive, setBurstActive] = useState(false);
  const burstTriggerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationFrameId;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 520;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Generate Node Points according to Topology
    const NODE_COUNT = 64;
    const targetPositions = [];
    const currentPositions = [];

    // Helper: calculate positions for different topologies
    const getTopologyPoints = (topo) => {
      const pts = [];
      if (topo === "geodesic") {
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        for (let i = 0; i < NODE_COUNT; i++) {
          const y = 1 - (i / (NODE_COUNT - 1)) * 2;
          const radius = Math.sqrt(1 - y * y);
          const theta = phi * i;
          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;
          pts.push(new THREE.Vector3(x * 12, y * 12, z * 12));
        }
      } else if (topo === "torus") {
        const R = 10; // major radius
        const r = 4.5; // minor radius
        for (let i = 0; i < NODE_COUNT; i++) {
          const u = (i / NODE_COUNT) * Math.PI * 4;
          const v = (i / NODE_COUNT) * Math.PI * 8;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          pts.push(new THREE.Vector3(x, y, z));
        }
      } else {
        // Hypercube mesh
        const dim = 4;
        let idx = 0;
        for (let x = 0; x < dim; x++) {
          for (let y = 0; y < dim; y++) {
            for (let z = 0; z < dim; z++) {
              if (idx < NODE_COUNT) {
                pts.push(
                  new THREE.Vector3(
                    (x - 1.5) * 6,
                    (y - 1.5) * 6,
                    (z - 1.5) * 6
                  )
                );
                idx++;
              }
            }
          }
        }
      }
      return pts;
    };

    const initialPts = getTopologyPoints(activeTopology);
    for (let i = 0; i < NODE_COUNT; i++) {
      targetPositions.push(initialPts[i].clone());
      currentPositions.push(initialPts[i].clone());
    }

    // 3. Three.js Objects: Node Sphere Meshes
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x00d665, // Signal Green (Solid, No Gradient)
      wireframe: false,
    });

    const nodeMeshes = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.copy(currentPositions[i]);
      nodeGroup.add(mesh);
      nodeMeshes.push(mesh);
    }

    // 4. Edges / Filaments
    // Connect nodes within a distance threshold
    const MAX_EDGES = 180;
    const edgePositions = new Float32Array(MAX_EDGES * 6);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x3d4454, // Subtle hairline wireframe
      transparent: true,
      opacity: 0.5,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // 5. Active Dynamic Data Packets (Flying Quanta)
    const PACKET_MAX = 32;
    const packetGeo = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x00b0ff, // Signal Cyan
    });

    const packetMeshes = [];
    const packetRoutes = [];

    for (let p = 0; p < PACKET_MAX; p++) {
      const m = new THREE.Mesh(packetGeo, packetMat);
      scene.add(m);
      packetMeshes.push(m);
      packetRoutes.push({
        sourceIdx: Math.floor(Math.random() * NODE_COUNT),
        targetIdx: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: 0.008 + Math.random() * 0.012,
      });
    }

    // Function to trigger massive packet burst cascade
    burstTriggerRef.current = () => {
      packetRoutes.forEach((route) => {
        route.progress = 0;
        route.speed = 0.04 + Math.random() * 0.04; // 4x speed burst
      });
      // Flash node colors temporarily
      nodeMat.color.setHex(0x00b0ff);
      setTimeout(() => {
        nodeMat.color.setHex(0x00d665);
      }, 1200);
    };

    // 6. Interactive Mouse Orbit & Inertia
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      } else {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = containerRef.current;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // 7. Update Topology Morph Targets when activeTopology changes
    const updateTargetPositions = (topo) => {
      const newPts = getTopologyPoints(topo);
      for (let i = 0; i < NODE_COUNT; i++) {
        if (newPts[i]) {
          targetPositions[i].copy(newPts[i]);
        }
      }
    };

    updateTargetPositions(activeTopology);

    // 8. Main Render Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Gentle auto-rotation + mouse inertia
      targetRotationY += 0.003;
      nodeGroup.rotation.y += (targetRotationY - nodeGroup.rotation.y) * 0.08;
      nodeGroup.rotation.x += (targetRotationX - nodeGroup.rotation.x) * 0.08;
      edgeLines.rotation.copy(nodeGroup.rotation);

      // Smoothly interpolate node positions toward targets (Morphing)
      for (let i = 0; i < NODE_COUNT; i++) {
        currentPositions[i].lerp(targetPositions[i], 0.06);
        nodeMeshes[i].position.copy(currentPositions[i]);
        nodeMeshes[i].rotation.x += 0.01;
        nodeMeshes[i].rotation.y += 0.015;
      }

      // Rebuild Edges dynamically between nearest neighbor nodes
      let edgePtr = 0;
      const positionsArr = edgeGeo.attributes.position.array;
      const thresholdDist = activeTopology === "hypercube" ? 7.5 : 8.5;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (edgePtr < MAX_EDGES * 6) {
            const p1 = currentPositions[i];
            const p2 = currentPositions[j];
            const dist = p1.distanceTo(p2);

            if (dist < thresholdDist) {
              positionsArr[edgePtr++] = p1.x;
              positionsArr[edgePtr++] = p1.y;
              positionsArr[edgePtr++] = p1.z;
              positionsArr[edgePtr++] = p2.x;
              positionsArr[edgePtr++] = p2.y;
              positionsArr[edgePtr++] = p2.z;
            }
          }
        }
      }

      // Zero out unused edges
      while (edgePtr < MAX_EDGES * 6) {
        positionsArr[edgePtr++] = 0;
      }
      edgeGeo.attributes.position.needsUpdate = true;

      // Animate Quanta Packets along edges
      for (let p = 0; p < PACKET_MAX; p++) {
        const route = packetRoutes[p];
        route.progress += route.speed;

        if (route.progress >= 1) {
          route.progress = 0;
          route.sourceIdx = route.targetIdx;
          route.targetIdx = Math.floor(Math.random() * NODE_COUNT);
        }

        const p1 = currentPositions[route.sourceIdx];
        const p2 = currentPositions[route.targetIdx];
        const worldPos = new THREE.Vector3().lerpVectors(p1, p2, route.progress);
        worldPos.applyEuler(nodeGroup.rotation);
        packetMeshes[p].position.copy(worldPos);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (renderer.domElement && dom.contains(renderer.domElement)) {
        dom.removeChild(renderer.domElement);
      }

      scene.clear();
      renderer.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      packetGeo.dispose();
      packetMat.dispose();
    };
  }, [activeTopology]);

  const handleBurst = () => {
    setBurstActive(true);
    burstTriggerRef.current?.();
    setPacketCount((prev) => prev + 128);
    setConsensusScore(100.0);
    setTimeout(() => {
      setBurstActive(false);
      setConsensusScore(99.98);
    }, 1500);
  };

  return (
    <section id="lattice" className="spatial-lattice-section">
      <div className="container">
        {/* Section Header */}
        <div className="spatial-section-header">
          <div className="section-kicker">
            <span className="kicker-index">// 02</span>
            <span>THREE.JS VOLUMETRIC ENGINE · ZERO GRADIENTS</span>
          </div>
          <h2 className="spatial-section-title">
            THE QUANTUM CONSENSUS LATTICE
          </h2>
          <p className="spatial-section-desc">
            An interactive 3D WebGL distributed consensus simulation. 64 interconnected nodes
            executing real-time packet traversal with zero-gradient solid vector rendering. Drag to
            orbit in 3D space, morph topologies, and inject simulated traffic bursts.
          </p>
        </div>

        {/* 3D Visualizer Stage Chassis */}
        <div className="lattice-stage-chassis">
          {/* Top Control Bar */}
          <div className="lattice-topbar">
            <div className="lattice-topology-tabs">
              <span className="topology-label">TOPOLOGY:</span>
              <div className="topology-btn-group">
                {TOPOLOGIES.map((topo) => (
                  <button
                    key={topo.id}
                    type="button"
                    className={`topology-btn ${activeTopology === topo.id ? "active" : ""}`}
                    onClick={() => setActiveTopology(topo.id)}
                    title={topo.desc}
                  >
                    {topo.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Burst Action */}
            <button
              type="button"
              className={`btn-lattice-burst ${burstActive ? "active" : ""}`}
              onClick={handleBurst}
            >
              <Zap width={14} height={14} />
              <span>{burstActive ? "BURST BROADCASTING..." : "INJECT PACKET BURST"}</span>
            </button>
          </div>

          {/* WebGL Canvas Viewport */}
          <div ref={containerRef} className="lattice-canvas-viewport">
            {/* Live Orbit Watermark */}
            <div className="lattice-orbit-tip">
              <span>DRAG TO ORBIT IN 3D SPACE</span>
            </div>

            {/* Live Real-Time Telemetry Overlay */}
            <div className="lattice-telemetry-hud">
              <div className="hud-metric-row">
                <span className="hud-label">ACTIVE QUORUM:</span>
                <span className="hud-val highlight">64 / 64 NODES</span>
              </div>
              <div className="hud-metric-row">
                <span className="hud-label">PACKET DISPATCH:</span>
                <span className="hud-val">{packetCount} PKTS/S</span>
              </div>
              <div className="hud-metric-row">
                <span className="hud-label">CONSENSUS SLA:</span>
                <span className="hud-val highlight">{consensusScore}%</span>
              </div>
              <div className="hud-metric-row">
                <span className="hud-label">FRAME METRIC:</span>
                <span className="hud-val">60.0 FPS</span>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics Strip */}
          <div className="lattice-bottom-strip">
            <div className="strip-item">
              <span className="strip-dot green" />
              <span>CONSENSUS PROTOCOL: HYBRID RAFT + GOSSIP</span>
            </div>
            <div className="strip-item">
              <span className="strip-dot cyan" />
              <span>BUFFER ENGINE: ZERO-ALLOC SLICING</span>
            </div>
            <div className="strip-item">
              <span className="strip-dot green" />
              <span>FAILOVER QUORUM: SUB-10MS DETERMINISTIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
