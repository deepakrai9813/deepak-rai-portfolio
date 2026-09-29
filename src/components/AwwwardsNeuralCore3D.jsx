import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Zap, Layers, Activity, RefreshCw } from "./icons";

const TOPOLOGY_MODES = [
  { id: "geodesic", label: "01. GEODESIC QUORUM", desc: "Spherical Raft consensus quorum with uniform node distribution" },
  { id: "torus", label: "02. CONCURRENCY TORUS", desc: "High-throughput token-passing ring for lock-free parallel dispatch" },
  { id: "hypercube", label: "03. DISTRIBUTED MESH", desc: "3D hyper-mesh cluster with redundant multi-path routing" },
];

export default function AwwwardsNeuralCore3D() {
  const containerRef = useRef(null);
  const [activeTopology, setActiveTopology] = useState("geodesic");
  const [packetRate, setPacketRate] = useState(128);
  const [consensusSLA, setConsensusSLA] = useState(99.98);
  const [isBursting, setIsBursting] = useState(false);
  const triggerBurstRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animId;
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight || 520;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 1000);
    camera.position.z = 32;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Topology Node Coordinates
    const NODE_COUNT = 64;
    const targetPositions = [];
    const currentPositions = [];

    const calculateTopology = (topo) => {
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
        const R = 10;
        const r = 4.5;
        for (let i = 0; i < NODE_COUNT; i++) {
          const u = (i / NODE_COUNT) * Math.PI * 4;
          const v = (i / NODE_COUNT) * Math.PI * 8;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          pts.push(new THREE.Vector3(x, y, z));
        }
      } else {
        // Hypercube
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

    const initialPoints = calculateTopology(activeTopology);
    for (let i = 0; i < NODE_COUNT; i++) {
      targetPositions.push(initialPoints[i].clone());
      currentPositions.push(initialPoints[i].clone());
    }

    // 3. Node Meshes Group
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff, // Cyber Cyan
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
    const MAX_EDGES = 180;
    const edgePositions = new Float32Array(MAX_EDGES * 6);
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));

    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x384259,
      transparent: true,
      opacity: 0.6,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    scene.add(edgeLines);

    // 5. Flying Data Quanta Packets
    const PACKET_MAX = 32;
    const packetGeo = new THREE.BoxGeometry(0.32, 0.32, 0.32);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x00ff9d, // Matrix Emerald
    });

    const packetMeshes = [];
    const packetRoutes = [];

    for (let p = 0; p < PACKET_MAX; p++) {
      const pm = new THREE.Mesh(packetGeo, packetMat);
      scene.add(pm);
      packetMeshes.push(pm);
      packetRoutes.push({
        sourceIdx: Math.floor(Math.random() * NODE_COUNT),
        targetIdx: Math.floor(Math.random() * NODE_COUNT),
        progress: Math.random(),
        speed: 0.009 + Math.random() * 0.012,
      });
    }

    triggerBurstRef.current = () => {
      packetRoutes.forEach((route) => {
        route.progress = 0;
        route.speed = 0.045 + Math.random() * 0.04;
      });
      nodeMat.color.setHex(0x00ff9d);
      setTimeout(() => {
        nodeMat.color.setHex(0x00f0ff);
      }, 1400);
    };

    // 6. Interactive 3D Drag Orbit
    let targetRotX = 0;
    let targetRotY = 0;
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;

    const onPointerDown = (e) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        targetRotY += deltaX * 0.006;
        targetRotX += deltaY * 0.006;
        prevX = e.clientX;
        prevY = e.clientY;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = containerRef.current;
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    // Update target positions on topology change
    const updateTopologyTargets = (topo) => {
      const newPts = calculateTopology(topo);
      for (let i = 0; i < NODE_COUNT; i++) {
        if (newPts[i]) targetPositions[i].copy(newPts[i]);
      }
    };

    updateTopologyTargets(activeTopology);

    // 7. Render Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth auto-rotation + inertia
      targetRotY += 0.0025;
      nodeGroup.rotation.y += (targetRotY - nodeGroup.rotation.y) * 0.08;
      nodeGroup.rotation.x += (targetRotX - nodeGroup.rotation.x) * 0.08;
      edgeLines.rotation.copy(nodeGroup.rotation);

      // Interpolate nodes toward target positions (Morphing)
      for (let i = 0; i < NODE_COUNT; i++) {
        currentPositions[i].lerp(targetPositions[i], 0.06);
        nodeMeshes[i].position.copy(currentPositions[i]);
        nodeMeshes[i].rotation.x += 0.01;
        nodeMeshes[i].rotation.y += 0.014;
      }

      // Rebuild dynamic edges between nearest neighbors
      let ptr = 0;
      const posArr = edgeGeo.attributes.position.array;
      const threshold = activeTopology === "hypercube" ? 7.5 : 8.5;

      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          if (ptr < MAX_EDGES * 6) {
            const p1 = currentPositions[i];
            const p2 = currentPositions[j];
            if (p1.distanceTo(p2) < threshold) {
              posArr[ptr++] = p1.x;
              posArr[ptr++] = p1.y;
              posArr[ptr++] = p1.z;
              posArr[ptr++] = p2.x;
              posArr[ptr++] = p2.y;
              posArr[ptr++] = p2.z;
            }
          }
        }
      }

      while (ptr < MAX_EDGES * 6) {
        posArr[ptr++] = 0;
      }
      edgeGeo.attributes.position.needsUpdate = true;

      // Animate packet quanta
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

    // 8. Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 520;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
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
    setIsBursting(true);
    triggerBurstRef.current?.();
    setPacketRate((prev) => prev + 128);
    setConsensusSLA(100.0);
    setTimeout(() => {
      setIsBursting(false);
      setConsensusSLA(99.98);
    }, 1500);
  };

  return (
    <section id="neural-core" className="awwwards-neural-section">
      <div className="container">
        {/* Section Header */}
        <div className="awwwards-section-header">
          <div className="header-eyebrow">
            <span className="eyebrow-num">// 02</span>
            <span>THREE.JS VOLUMETRIC ENGINE · HARDWARE ACCELERATED</span>
          </div>
          <h2 className="header-headline">
            THE QUANTUM CONSENSUS LATTICE
          </h2>
          <p className="header-description">
            An interactive 3D WebGL distributed consensus simulation. 64 interconnected nodes
            executing real-time packet traversal. Drag to orbit in 3D space, morph topologies, and
            inject simulated traffic bursts with zero frame drops.
          </p>
        </div>

        {/* 3D Stage Container Chassis */}
        <div className="neural-stage-chassis">
          {/* Top Control Bar */}
          <div className="stage-topbar">
            <div className="topology-selection-group">
              <span className="topology-label">TOPOLOGY:</span>
              <div className="topology-buttons-row">
                {TOPOLOGY_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    className={`uiverse-tab-btn ${activeTopology === mode.id ? "active" : ""}`}
                    onClick={() => setActiveTopology(mode.id)}
                    title={mode.desc}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Uiverse Chaos Burst Action Button */}
            <button
              type="button"
              className={`uiverse-burst-btn ${isBursting ? "bursting" : ""}`}
              onClick={handleBurst}
            >
              <Zap width={14} height={14} />
              <span>{isBursting ? "BURST DISPATCHING..." : "INJECT PACKET BURST"}</span>
            </button>
          </div>

          {/* WebGL Canvas Viewport */}
          <div ref={containerRef} className="stage-webgl-viewport">
            {/* Orbit Helper Tip */}
            <div className="stage-orbit-hint">
              <span>DRAG TO ORBIT IN 3D SPACE</span>
            </div>

            {/* Awwwards Telemetry Overlay HUD */}
            <div className="stage-telemetry-hud">
              <div className="hud-line">
                <span className="hud-k">ACTIVE QUORUM:</span>
                <span className="hud-v highlight">64 / 64 NODES</span>
              </div>
              <div className="hud-line">
                <span className="hud-k">PACKET DISPATCH:</span>
                <span className="hud-v">{packetRate} PKTS/S</span>
              </div>
              <div className="hud-line">
                <span className="hud-k">CONSENSUS SLA:</span>
                <span className="hud-v highlight">{consensusSLA}%</span>
              </div>
              <div className="hud-line">
                <span className="hud-k">PERFORMANCE:</span>
                <span className="hud-v">60.0 FPS</span>
              </div>
            </div>
          </div>

          {/* Bottom Diagnostics Strip */}
          <div className="stage-bottom-meta">
            <div className="meta-pill">
              <span className="meta-dot cyan" />
              <span>PROTOCOL: RAFT + GOSSIP QUORUM</span>
            </div>
            <div className="meta-pill">
              <span className="meta-dot emerald" />
              <span>BUFFER ENGINE: ZERO-ALLOC SLICING</span>
            </div>
            <div className="meta-pill">
              <span className="meta-dot cyan" />
              <span>FAILOVER QUORUM: SUB-10MS DETERMINISTIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
