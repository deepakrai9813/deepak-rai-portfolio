import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  Box,
  Zap,
  ShieldCheck,
  RotateCcw,
  Activity,
  Sliders,
  Play,
  CheckCircle,
  AlertTriangle,
  Crosshair,
  Radio,
  Layers,
  ArrowUpRight,
} from "./icons";

const CLUSTER_NODES = [
  {
    id: "sentinel",
    name: "NODE-01: SENTINEL PROXY",
    port: ":8081",
    color: 0x00d665,
    colorHex: "#00d665",
    radius: 2.8,
    speed: 0.7,
    yOffset: 0.2,
    p99: "12ms",
    throughput: "4,200 req/s",
    status: "HEALTHY",
    type: "REVERSE_PROXY",
    subServices: ["Ingress Filter", "sync.Pool Buffer", "Egress Relay"],
  },
  {
    id: "san-brothers",
    name: "NODE-02: SAN BROTHERS",
    port: ":443",
    color: 0x00b0ff,
    colorHex: "#00b0ff",
    radius: 3.6,
    speed: -0.5,
    yOffset: -0.3,
    p99: "18ms",
    throughput: "1,850 req/s",
    status: "HEALTHY",
    type: "ENTERPRISE_GATEWAY",
    subServices: ["Legal Compliance DB", "Session Pool", "TLS 1.3 Term"],
  },
  {
    id: "bian-ai",
    name: "NODE-03: BIAN AI INFERENCE",
    port: ":8000",
    color: 0xff5500,
    colorHex: "#ff5500",
    radius: 4.4,
    speed: 0.4,
    yOffset: 0.4,
    p99: "42ms",
    throughput: "920 req/s",
    status: "HEALTHY",
    type: "LLM_STREAMER",
    subServices: ["Groq Token Stream", "Web Worker PDF", "Vector Cache"],
  },
  {
    id: "postgres",
    name: "NODE-04: POSTGRESQL SHARD",
    port: ":5432",
    color: 0xf0f2f5,
    colorHex: "#f0f2f5",
    radius: 5.2,
    speed: -0.35,
    yOffset: -0.2,
    p99: "6ms",
    throughput: "6,100 qps",
    status: "HEALTHY",
    type: "ACID_REPLICATION",
    subServices: ["Primary WAL Engine", "Read Replica 01", "Read Replica 02"],
  },
  {
    id: "redis",
    name: "NODE-05: REDIS RING BUFFER",
    port: ":6379",
    color: 0xf59e0b,
    colorHex: "#f59e0b",
    radius: 5.9,
    speed: 0.3,
    yOffset: 0.1,
    p99: "2ms",
    throughput: "12,400 ops",
    status: "HEALTHY",
    type: "MEMORY_CACHE",
    subServices: ["Sliding Ring Buffer", "TTL Purge Daemon", "Replication Hub"],
  },
];

export default function Cluster3DVisualizer({ playClick, playSwitch, playPing, playAlarm }) {
  const mountRef = useRef(null);

  // UI state
  const [viewPreset, setViewPreset] = useState("perspective");
  const [activeNode, setActiveNode] = useState(CLUSTER_NODES[0]);
  const [focusedNodeId, setFocusedNodeId] = useState(null); // When zoomed into a specific node
  const [renderMode, setRenderMode] = useState("wireframe"); // "wireframe" | "pointcloud" | "conduit"
  const [chaosTripped, setChaosTripped] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [packetSpeed, setPacketSpeed] = useState(1);
  const [warpMode, setWarpMode] = useState(false);
  const [telemetryLog, setTelemetryLog] = useState([
    "QUANTUM_CORE: Sentinel 3D Distributed Mesh initialized.",
    "RADAR_RADIAL: 5 orbital planes synchronized with zero jitter.",
    "VOXEL_PIPELINE: 28 real-time packet conduits streaming at 12.4 GHz.",
  ]);

  // Three.js instance refs
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const coreMeshRef = useRef(null);
  const coreGimbalXRef = useRef(null);
  const coreGimbalYRef = useRef(null);
  const coreInnerRef = useRef(null);
  const shockwaveRef = useRef(null);
  const radarSweepRef = useRef(null);
  const laserTargetRef = useRef(null);
  const targetBoxRef = useRef(null);
  const subNodesGroupRef = useRef(null);
  const nodeObjectsRef = useRef([]);
  const packetObjectsRef = useRef([]);
  const conduitLinesRef = useRef([]);
  const animationFrameRef = useRef(null);

  // Mouse interaction refs
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0.25, y: -0.35 });
  const currentRotationRef = useRef({ x: 0.25, y: -0.35 });
  const targetCameraDistanceRef = useRef(8.5);
  const cameraLookTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const currentCameraLookRef = useRef(new THREE.Vector3(0, 0, 0));

  const addLog = useCallback((msg) => {
    const time = new Date().toISOString().substring(11, 19);
    setTelemetryLog((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 5)]);
  }, []);

  // Chaos Injection Trigger
  const handleToggleChaos = () => {
    if (!chaosTripped) {
      playAlarm?.();
      setChaosTripped(true);
      addLog("CHAOS_FAULT: Node-02 circuit tripped! Simulating 500ms latency spike.");
      addLog("SENTINEL_ROUTER: Rerouting packets to Node-01 and Node-04 failover quorum.");
    } else {
      playPing?.();
      setChaosTripped(false);
      if (shockwaveRef.current) {
        shockwaveRef.current.scale.set(0.1, 0.1, 0.1);
        shockwaveRef.current.visible = true;
      }
      addLog("QUORUM_RESTORED: Sentinel consensus healed all nodes to healthy status.");
    }
  };

  // Warp Mode Toggle
  const handleToggleWarp = () => {
    playClick?.();
    const newWarp = !warpMode;
    setWarpMode(newWarp);
    setPacketSpeed(newWarp ? 3.2 : 1);
    if (newWarp) {
      addLog("QUANTUM_WARP: Packet transmission accelerated to 3.2X hyperdrive.");
    } else {
      addLog("WARP_DISENGAGED: Packet stream returned to nominal 1.0X velocity.");
    }
  };

  // Focus directly into a specific node's local 3D sub-cluster
  const handleFocusNode = (node) => {
    playClick?.();
    setActiveNode(node);
    setFocusedNodeId(node.id);
    setAutoRotate(false);
    targetCameraDistanceRef.current = 3.2;
    addLog(`NODE_FOCUS: Zoomed into ${node.name} architecture sub-cluster.`);
  };

  // Reset focus back to global 3D overview
  const handleResetFocus = () => {
    playClick?.();
    setFocusedNodeId(null);
    setAutoRotate(true);
    cameraLookTargetRef.current.set(0, 0, 0);
    targetCameraDistanceRef.current = 8.5;
    targetRotationRef.current = { x: 0.25, y: -0.35 };
    addLog("GLOBAL_VIEW: Reset camera to full 3D distributed systems cluster.");
  };

  // View Preset Handler
  const handleViewPreset = (preset) => {
    playSwitch?.();
    setViewPreset(preset);
    setFocusedNodeId(null);
    cameraLookTargetRef.current.set(0, 0, 0);

    if (preset === "perspective") {
      targetCameraDistanceRef.current = 8.5;
      targetRotationRef.current = { x: 0.25, y: -0.35 };
    } else if (preset === "topdown") {
      targetCameraDistanceRef.current = 10;
      targetRotationRef.current = { x: Math.PI / 2 - 0.01, y: 0 };
    } else if (preset === "core") {
      targetCameraDistanceRef.current = 4.2;
      targetRotationRef.current = { x: 0.1, y: 0.2 };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 560;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, targetCameraDistanceRef.current);
    cameraRef.current = camera;

    // 2. Pure WebGL Renderer (Zero Gradients, Transparent Canvas)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Central Sentinel Gateway Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 3a. Geodesic Icosahedron Core Wireframe
    const coreGeom = new THREE.IcosahedronGeometry(1.0, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x00d665,
      wireframe: true,
      wireframeLinewidth: 1.5,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    coreGroup.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // 3b. Dual Gimbal Gyroscopic Rings
    const gimbalGeom = new THREE.TorusGeometry(1.4, 0.02, 6, 48);
    const gimbalMat = new THREE.MeshBasicMaterial({ color: 0x3d4454 });
    const gimbalX = new THREE.Mesh(gimbalGeom, gimbalMat);
    const gimbalY = new THREE.Mesh(gimbalGeom, gimbalMat);
    gimbalY.rotation.x = Math.PI / 2;
    coreGroup.add(gimbalX);
    coreGroup.add(gimbalY);
    coreGimbalXRef.current = gimbalX;
    coreGimbalYRef.current = gimbalY;

    // 3c. Inner Pulsing Octahedron
    const innerGeom = new THREE.OctahedronGeometry(0.5);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });
    const coreInner = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(coreInner);
    coreInnerRef.current = coreInner;

    // 3d. Expanding Healing Shockwave Ring
    const shockGeom = new THREE.RingGeometry(0.8, 0.9, 32);
    const shockMat = new THREE.MeshBasicMaterial({
      color: 0x00d665,
      side: THREE.DoubleSide,
      wireframe: true,
    });
    const shockMesh = new THREE.Mesh(shockGeom, shockMat);
    shockMesh.rotation.x = Math.PI / 2;
    shockMesh.visible = false;
    scene.add(shockMesh);
    shockwaveRef.current = shockMesh;

    // 3e. Concentric Holographic Radar Scanner Beam (Sweeping Line)
    const radarLineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(6.4, 0, 0),
    ]);
    const radarLineMat = new THREE.LineBasicMaterial({
      color: 0x00d665,
      transparent: true,
      opacity: 0.35,
    });
    const radarSweep = new THREE.Line(radarLineGeom, radarLineMat);
    scene.add(radarSweep);
    radarSweepRef.current = radarSweep;

    // 3f. Active Node Target Lock Laser Line
    const targetLaserGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const targetLaserMat = new THREE.LineBasicMaterial({
      color: 0x00d665,
      linewidth: 2,
    });
    const targetLaser = new THREE.Line(targetLaserGeom, targetLaserMat);
    scene.add(targetLaser);
    laserTargetRef.current = targetLaser;

    // 3g. Active Node Wireframe Target Bracket Box
    const targetBoxGeom = new THREE.BoxGeometry(0.85, 0.85, 0.85);
    const targetBoxMat = new THREE.MeshBasicMaterial({
      color: 0x00d665,
      wireframe: true,
    });
    const targetBox = new THREE.Mesh(targetBoxGeom, targetBoxMat);
    scene.add(targetBox);
    targetBoxRef.current = targetBox;

    // 3h. Sub-Services Satellite Group (Orbiting the focused node)
    const subNodesGroup = new THREE.Group();
    const subNodeGeom = new THREE.OctahedronGeometry(0.12);
    const subNodeMeshes = [];
    for (let s = 0; s < 3; s++) {
      const subMat = new THREE.MeshBasicMaterial({ color: 0x00d665, wireframe: true });
      const subMesh = new THREE.Mesh(subNodeGeom, subMat);
      subNodesGroup.add(subMesh);
      subNodeMeshes.push(subMesh);
    }
    scene.add(subNodesGroup);
    subNodesGroupRef.current = { group: subNodesGroup, meshes: subNodeMeshes };

    // 4. Ground Coordinate Grid (Planar Horizon)
    const gridHelper = new THREE.GridHelper(16, 20, 0x282d38, 0x1e222a);
    gridHelper.position.y = -2.4;
    scene.add(gridHelper);

    // 5. Distributed Systems Nodes (Orbiting 3D Polyhedra)
    const nodeObjects = [];
    const conduitLines = [];

    CLUSTER_NODES.forEach((nodeSpec, idx) => {
      const nodeGroup = new THREE.Group();

      let geom;
      if (idx === 0) geom = new THREE.IcosahedronGeometry(0.38, 0);
      else if (idx === 1) geom = new THREE.DodecahedronGeometry(0.35, 0);
      else if (idx === 2) geom = new THREE.OctahedronGeometry(0.38, 0);
      else if (idx === 3) geom = new THREE.CylinderGeometry(0.3, 0.3, 0.55, 6);
      else geom = new THREE.TorusGeometry(0.28, 0.1, 6, 16);

      const mat = new THREE.MeshBasicMaterial({
        color: nodeSpec.color,
        wireframe: renderMode !== "pointcloud",
        wireframeLinewidth: 1.5,
      });

      const mesh = new THREE.Mesh(geom, mat);
      nodeGroup.add(mesh);

      // Solid micro center core
      const centerDotGeom = new THREE.BoxGeometry(0.1, 0.1, 0.1);
      const centerDotMat = new THREE.MeshBasicMaterial({ color: nodeSpec.color });
      const centerDot = new THREE.Mesh(centerDotGeom, centerDotMat);
      nodeGroup.add(centerDot);

      // Orbit guide ring
      const orbitRingGeom = new THREE.RingGeometry(nodeSpec.radius - 0.02, nodeSpec.radius + 0.02, 64);
      const orbitRingMat = new THREE.MeshBasicMaterial({
        color: 0x1e222a,
        side: THREE.DoubleSide,
      });
      const orbitRing = new THREE.Mesh(orbitRingGeom, orbitRingMat);
      orbitRing.rotation.x = Math.PI / 2;
      orbitRing.position.y = nodeSpec.yOffset;
      scene.add(orbitRing);

      scene.add(nodeGroup);

      // Dynamic Connection Ray Conduit between node and core
      const lineGeom = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 0, 0),
      ]);
      const lineMat = new THREE.LineBasicMaterial({
        color: nodeSpec.color,
        transparent: true,
        opacity: renderMode === "conduit" ? 0.7 : 0.35,
      });
      const conduit = new THREE.Line(lineGeom, lineMat);
      scene.add(conduit);
      conduitLines.push({ conduit, nodeIndex: idx });

      nodeObjects.push({
        group: nodeGroup,
        mesh,
        spec: nodeSpec,
        angle: (idx * (Math.PI * 2)) / CLUSTER_NODES.length,
      });
    });
    nodeObjectsRef.current = nodeObjects;
    conduitLinesRef.current = conduitLines;

    // 6. Live 3D Data Packet Voxel Streams (28 Animated Voxels)
    const packets = [];
    const packetGeom = new THREE.BoxGeometry(0.12, 0.12, 0.12);

    for (let i = 0; i < 28; i++) {
      const nodeIndex = i % CLUSTER_NODES.length;
      const nodeSpec = CLUSTER_NODES[nodeIndex];
      const packetMat = new THREE.MeshBasicMaterial({ color: nodeSpec.color });
      const packetMesh = new THREE.Mesh(packetGeom, packetMat);
      scene.add(packetMesh);

      packets.push({
        mesh: packetMesh,
        nodeIndex,
        progress: (i / 28),
        direction: i % 2 === 0 ? 1 : -1,
        speed: 0.35 + (i % 5) * 0.08,
      });
    }
    packetObjectsRef.current = packets;

    // 7. Ambient Particle Horizon
    const particleCount = 240;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 22;
      particlePositions[i + 1] = (Math.random() - 0.5) * 14;
      particlePositions[i + 2] = (Math.random() - 0.5) * 22;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3d4454,
      size: 0.06,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // 8. Mouse Orbit Controls
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousMousePosRef.current.x;
      const deltaY = e.clientY - previousMousePosRef.current.y;

      targetRotationRef.current.y += deltaX * 0.007;
      targetRotationRef.current.x += deltaY * 0.007;
      targetRotationRef.current.x = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationRef.current.x));

      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      targetCameraDistanceRef.current += e.deltaY * 0.005;
      targetCameraDistanceRef.current = Math.max(2.8, Math.min(14, targetCameraDistanceRef.current));
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    domElement.addEventListener("wheel", handleWheel, { passive: false });

    // 9. Resize Observer
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth camera interpolation
      if (autoRotate && !isDraggingRef.current && !focusedNodeId) {
        targetRotationRef.current.y += 0.22 * delta;
      }

      currentRotationRef.current.x += (targetRotationRef.current.x - currentRotationRef.current.x) * 0.08;
      currentRotationRef.current.y += (targetRotationRef.current.y - currentRotationRef.current.y) * 0.08;

      const dist = targetCameraDistanceRef.current;
      const phi = currentRotationRef.current.x;
      const theta = currentRotationRef.current.y;

      // Handle Camera Look Target (smooth interpolation between Core 0,0,0 and focused Node)
      currentCameraLookRef.current.lerp(cameraLookTargetRef.current, 0.08);

      camera.position.x = currentCameraLookRef.current.x + dist * Math.cos(phi) * Math.sin(theta);
      camera.position.y = currentCameraLookRef.current.y + dist * Math.sin(phi);
      camera.position.z = currentCameraLookRef.current.z + dist * Math.cos(phi) * Math.cos(theta);
      camera.lookAt(currentCameraLookRef.current);

      // Core rotation & pulsing
      const coreSpeed = warpMode ? 2.5 : 1.0;
      if (coreMeshRef.current) {
        coreMeshRef.current.rotation.y = time * 0.6 * coreSpeed;
        coreMeshRef.current.rotation.x = time * 0.3 * coreSpeed;
      }
      if (coreGimbalXRef.current) {
        coreGimbalXRef.current.rotation.z = time * 0.4 * coreSpeed;
      }
      if (coreGimbalYRef.current) {
        coreGimbalYRef.current.rotation.x = time * -0.5 * coreSpeed;
      }
      if (coreInnerRef.current) {
        const pulse = 1.0 + Math.sin(time * (warpMode ? 14 : 6)) * 0.18;
        coreInnerRef.current.scale.set(pulse, pulse, pulse);
        coreInnerRef.current.rotation.y = -time * 0.8 * coreSpeed;
      }

      // Radar beam sweep
      if (radarSweepRef.current) {
        radarSweepRef.current.rotation.y = time * 1.2;
      }

      // Shockwave animation
      if (shockwaveRef.current && shockwaveRef.current.visible) {
        shockwaveRef.current.scale.addScalar(delta * 4.5);
        if (shockwaveRef.current.scale.x > 7.5) {
          shockwaveRef.current.visible = false;
        }
      }

      // Orbiting Nodes position calculation
      nodeObjectsRef.current.forEach((nodeItem, idx) => {
        const spec = nodeItem.spec;
        nodeItem.angle += spec.speed * delta * 0.6 * (warpMode ? 1.8 : 1.0);

        const nx = Math.cos(nodeItem.angle) * spec.radius;
        const nz = Math.sin(nodeItem.angle) * spec.radius;
        const ny = spec.yOffset + Math.sin(time * 2 + idx) * 0.08;

        nodeItem.group.position.set(nx, ny, nz);
        nodeItem.mesh.rotation.y += 0.8 * delta;
        nodeItem.mesh.rotation.x += 0.5 * delta;

        // If this node is focused, update camera look target to follow it
        if (focusedNodeId === spec.id) {
          cameraLookTargetRef.current.set(nx, ny, nz);

          // Update Sub-Services Satellites around focused node
          if (subNodesGroupRef.current) {
            subNodesGroupRef.current.group.position.set(nx, ny, nz);
            subNodesGroupRef.current.group.visible = true;
            subNodesGroupRef.current.meshes.forEach((subM, sIdx) => {
              const sAngle = time * 2 + (sIdx * (Math.PI * 2)) / 3;
              subM.position.set(Math.cos(sAngle) * 0.8, Math.sin(time * 3 + sIdx) * 0.2, Math.sin(sAngle) * 0.8);
              subM.rotation.y += delta * 2;
              subM.material.color.setHex(spec.color);
            });
          }
        }

        // Chaos jitter if tripped on node 1 (San Brothers)
        if (chaosTripped && idx === 1) {
          nodeItem.group.position.x += (Math.random() - 0.5) * 0.12;
          nodeItem.group.position.y += (Math.random() - 0.5) * 0.12;
          nodeItem.mesh.material.color.setHex(0xff3344);
        } else {
          nodeItem.mesh.material.color.setHex(spec.color);
        }

        // Update dynamic conduit line
        if (conduitLinesRef.current[idx]) {
          const conduit = conduitLinesRef.current[idx].conduit;
          const posAttr = conduit.geometry.attributes.position;
          posAttr.setXYZ(0, 0, 0, 0);
          posAttr.setXYZ(1, nx, ny, nz);
          posAttr.needsUpdate = true;

          if (chaosTripped && idx === 1) {
            conduit.material.color.setHex(0xff3344);
            conduit.material.opacity = 0.8;
          } else {
            conduit.material.color.setHex(spec.color);
            conduit.material.opacity = renderMode === "conduit" ? 0.7 : 0.35;
          }
        }

        // Target Lock Laser to Active Node
        if (activeNode.id === spec.id && laserTargetRef.current && targetBoxRef.current) {
          const laserPos = laserTargetRef.current.geometry.attributes.position;
          laserPos.setXYZ(0, 0, 0, 0);
          laserPos.setXYZ(1, nx, ny, nz);
          laserPos.needsUpdate = true;
          laserTargetRef.current.material.color.setHex(spec.color);

          targetBoxRef.current.position.set(nx, ny, nz);
          targetBoxRef.current.rotation.x += delta;
          targetBoxRef.current.rotation.y += delta;
          targetBoxRef.current.material.color.setHex(spec.color);
        }
      });

      if (!focusedNodeId && subNodesGroupRef.current) {
        subNodesGroupRef.current.group.visible = false;
      }

      // Animated 3D Data Packet Voxels
      packetObjectsRef.current.forEach((pkt) => {
        let targetNodeIndex = pkt.nodeIndex;
        if (chaosTripped && targetNodeIndex === 1) {
          targetNodeIndex = 0;
        }

        const nodeItem = nodeObjectsRef.current[targetNodeIndex];
        if (!nodeItem) return;

        pkt.progress += pkt.speed * delta * 0.4 * packetSpeed;
        if (pkt.progress > 1) {
          pkt.progress = 0;
        }

        const nodePos = nodeItem.group.position;
        const t = pkt.direction === 1 ? pkt.progress : 1 - pkt.progress;
        pkt.mesh.position.x = nodePos.x * t;
        pkt.mesh.position.y = nodePos.y * t;
        pkt.mesh.position.z = nodePos.z * t;

        pkt.mesh.rotation.x += delta * (warpMode ? 6 : 2);
        pkt.mesh.rotation.y += delta * (warpMode ? 6 : 2);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      domElement.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [chaosTripped, autoRotate, packetSpeed, warpMode, activeNode, focusedNodeId, renderMode]);

  return (
    <section id="cluster-3d" className="cluster-3d-section">
      <div className="container">
        <div className="cluster-chassis futuristic-screen-frame">
          {/* Header Bar */}
          <div className="cluster-header-bar">
            <div className="cluster-header-left">
              <span className="tag-solid active">
                <span className="led-indicator" />
                3D VOLUMETRIC SYSTEM ENGINE
              </span>
              <span className="cluster-subhead">
                PROJECT SENTINEL // DISTRIBUTED TOPOLOGY &amp; VOXEL ROUTER
              </span>
            </div>
            <div className="cluster-header-right">
              <span>THREE.JS v0.186</span>
              <span>//</span>
              <span>WEBGL ACCELERATED</span>
              <span>//</span>
              <span style={{ color: "var(--signal-green)", fontWeight: 700 }}>
                {warpMode ? "FPS: 60 [WARP MODE]" : "FPS: 60 [NOMINAL]"}
              </span>
            </div>
          </div>

          {/* Main 3D Viewport & Interactive Overlay */}
          <div className="cluster-viewport-wrapper">
            {/* The WebGL Canvas */}
            <div ref={mountRef} className="cluster-three-canvas" />

            {/* Top Tactical Controls Bar */}
            <div className="cluster-overlay-controls">
              {/* Camera Presets & Rendering Style */}
              <div className="cluster-preset-group">
                <button
                  type="button"
                  className={`cluster-preset-btn futuristic-chamfer-btn ${viewPreset === "perspective" && !focusedNodeId ? "active" : ""}`}
                  onClick={() => handleViewPreset("perspective")}
                  title="360° Free Orbital Perspective View"
                >
                  <Box style={{ width: "12px", height: "12px" }} />
                  <span>3D ORBIT</span>
                </button>

                <button
                  type="button"
                  className={`cluster-preset-btn futuristic-chamfer-btn ${viewPreset === "topdown" ? "active" : ""}`}
                  onClick={() => handleViewPreset("topdown")}
                  title="Orthogonal Architectural Plan (Top-Down)"
                >
                  <Activity style={{ width: "12px", height: "12px" }} />
                  <span>2D SCHEMATIC</span>
                </button>

                <button
                  type="button"
                  className={`cluster-preset-btn futuristic-chamfer-btn ${viewPreset === "core" ? "active" : ""}`}
                  onClick={() => handleViewPreset("core")}
                  title="Zoom into Sentinel Gateway Reverse Proxy Core"
                >
                  <Zap style={{ width: "12px", height: "12px" }} />
                  <span>GATEWAY CORE</span>
                </button>

                {/* Return button when zoomed into a node */}
                {focusedNodeId && (
                  <button
                    type="button"
                    className="cluster-preset-btn futuristic-chamfer-btn"
                    style={{ borderColor: "var(--signal-green)", color: "var(--signal-green)" }}
                    onClick={handleResetFocus}
                    title="Return to full cluster overview"
                  >
                    <RotateCcw style={{ width: "12px", height: "12px" }} />
                    <span>OVERVIEW</span>
                  </button>
                )}
              </div>

              {/* Chaos Engineering & Warp Actions */}
              <div className="cluster-chaos-actions">
                <button
                  type="button"
                  className={`cluster-warp-btn futuristic-chamfer-btn ${warpMode ? "active" : ""}`}
                  onClick={handleToggleWarp}
                  title="Toggle Quantum Warp high-velocity packet transmission"
                >
                  <Radio style={{ width: "13px", height: "13px" }} />
                  <span>{warpMode ? "WARP: 3.2X [ACTIVE]" : "WARP SPEED [OFF]"}</span>
                </button>

                <button
                  type="button"
                  className={`cluster-chaos-btn futuristic-chamfer-btn ${chaosTripped ? "tripped" : ""}`}
                  onClick={handleToggleChaos}
                  title="Simulate upstream failure and watch real-time 3D failover rerouting"
                >
                  {chaosTripped ? (
                    <>
                      <AlertTriangle style={{ width: "14px", height: "14px" }} />
                      <span>[!] HEAL QUORUM (RESTORE)</span>
                    </>
                  ) : (
                    <>
                      <Zap style={{ width: "14px", height: "14px" }} />
                      <span>INJECT 3D CHAOS SPIKE</span>
                    </>
                  )}
                </button>

                {/* Auto Rotate Toggle */}
                <button
                  type="button"
                  className={`cluster-util-btn futuristic-chamfer-btn ${autoRotate ? "active" : ""}`}
                  onClick={() => {
                    playClick?.();
                    setAutoRotate(!autoRotate);
                  }}
                  title="Toggle automatic camera orbital rotation"
                >
                  <RotateCcw style={{ width: "13px", height: "13px" }} />
                  <span>{autoRotate ? "ORBIT: ON" : "ORBIT: PAUSED"}</span>
                </button>
              </div>
            </div>

            {/* Left Floating Live Node Telemetry Billboard */}
            <div className="cluster-telemetry-hud futuristic-hud-box">
              <div className="telemetry-hud-header">
                <span className="led-indicator" />
                <span>INSPECTED NODE TELEMETRY</span>
                <span style={{ color: "var(--signal-green)", marginLeft: "auto" }}>
                  {focusedNodeId ? "FOCUS LOCKED" : "TARGET LOCKED"}
                </span>
              </div>

              <div className="cluster-node-selector-strip">
                {CLUSTER_NODES.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    className={`node-pill-btn ${activeNode.id === node.id ? "active" : ""}`}
                    onClick={() => handleFocusNode(node)}
                    title={`Click to fly camera into ${node.name}`}
                    style={{
                      borderLeftColor:
                        chaosTripped && node.id === "san-brothers" ? "#ff3344" : node.colorHex,
                    }}
                  >
                    <span>{node.port}</span>
                  </button>
                ))}
              </div>

              <div className="node-detail-card">
                <div className="node-detail-title-row">
                  <span style={{ fontWeight: 800, color: "var(--text-high)" }}>{activeNode.name}</span>
                  <span
                    className={`node-status-chip ${
                      chaosTripped && activeNode.id === "san-brothers" ? "danger" : "active"
                    }`}
                  >
                    {chaosTripped && activeNode.id === "san-brothers" ? "CIRCUIT OPEN" : "HEALTHY"}
                  </span>
                </div>

                <div className="node-detail-grid">
                  <div className="node-detail-item">
                    <span className="detail-label">p99 LATENCY</span>
                    <span className="detail-val">
                      {chaosTripped && activeNode.id === "san-brothers" ? "540ms [SPIKE]" : activeNode.p99}
                    </span>
                  </div>
                  <div className="node-detail-item">
                    <span className="detail-label">THROUGHPUT</span>
                    <span className="detail-val">
                      {warpMode ? `${parseInt(activeNode.throughput) * 3} req/s [WARP]` : activeNode.throughput}
                    </span>
                  </div>
                  <div className="node-detail-item">
                    <span className="detail-label">NODE ROLE</span>
                    <span className="detail-val">{activeNode.type}</span>
                  </div>
                  <div className="node-detail-item">
                    <span className="detail-label">FAILOVER TARGET</span>
                    <span className="detail-val">NODE-01 (:8081)</span>
                  </div>
                </div>

                {/* Sub-Services Architecture list when node is active */}
                <div className="node-subservices-block">
                  <span className="subservice-title">SUB-CLUSTER COMPONENTS:</span>
                  <div className="subservice-pills">
                    {activeNode.subServices.map((sub, sIdx) => (
                      <span key={sIdx} className="subservice-tag">
                        + {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-Time Telemetry Event Log */}
              <div className="cluster-log-terminal">
                <div className="log-terminal-header">
                  <span>// REAL-TIME 3D PACKET LOG</span>
                </div>
                <div className="log-terminal-body">
                  {telemetryLog.map((log, i) => (
                    <div key={i} className="log-line">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom 3D Instruction Strip */}
            <div className="cluster-bottom-bar">
              <div className="cluster-instruction">
                <span>[CLICK NODE PILL]: FLY-TO ZOOM</span>
                <span>//</span>
                <span>[MOUSE DRAG]: 360° ORBIT</span>
                <span>//</span>
                <span>28 REAL-TIME 3D VOXEL PACKETS STREAMING</span>
              </div>
              <div className="cluster-speed-control">
                <span>PACKET VELOCITY:</span>
                <button
                  type="button"
                  className={packetSpeed === 0.5 ? "speed-btn active" : "speed-btn"}
                  onClick={() => {
                    setWarpMode(false);
                    setPacketSpeed(0.5);
                  }}
                >
                  0.5x
                </button>
                <button
                  type="button"
                  className={packetSpeed === 1 && !warpMode ? "speed-btn active" : "speed-btn"}
                  onClick={() => {
                    setWarpMode(false);
                    setPacketSpeed(1);
                  }}
                >
                  1.0x
                </button>
                <button
                  type="button"
                  className={packetSpeed === 2 ? "speed-btn active" : "speed-btn"}
                  onClick={() => {
                    setWarpMode(false);
                    setPacketSpeed(2);
                  }}
                >
                  2.0x
                </button>
                <button
                  type="button"
                  className={warpMode ? "speed-btn active highlight-warp" : "speed-btn highlight-warp"}
                  onClick={handleToggleWarp}
                >
                  WARP 3.2x
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
