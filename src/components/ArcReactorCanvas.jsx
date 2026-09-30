import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMachineStore } from "../store/useMachineStore";
import { playHeartbeat, playOverchargeSfx } from "../utils/audioSystem";

export default function ArcReactorCanvas() {
  const mountRef = useRef(null);
  const { isOvercharged, powerState, overchargeReactor, soundEnabled } = useMachineStore();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    let width = container.clientWidth || 440;
    let height = container.clientHeight || 440;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    // Renderer with antialias and tone mapping
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0a1220, 1.2);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0x3ee8ff, 3.5, 12, 1.5);
    coreLight.position.set(0, 0, 0.8);
    scene.add(coreLight);

    const rimLight = new THREE.DirectionalLight(0xf6b93b, 1.0);
    rimLight.position.set(5, 5, 4);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x1d3654, 1.2);
    fillLight.position.set(-5, -5, 3);
    scene.add(fillLight);

    // ==========================================
    // 1. PROCESSOR PACKAGE DIE (Steel + Gold Pins)
    // ==========================================
    const packageGroup = new THREE.Group();
    scene.add(packageGroup);

    // Main chamfered substrate plate
    const plateGeo = new THREE.BoxGeometry(4.2, 4.2, 0.22);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0a1220,
      metalness: 0.88,
      roughness: 0.32,
    });
    const plateMesh = new THREE.Mesh(plateGeo, plateMat);
    plateMesh.position.z = -0.11;
    packageGroup.add(plateMesh);

    // Beveled chip die layer
    const dieGeo = new THREE.BoxGeometry(3.6, 3.6, 0.16);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0x0f1c2f,
      metalness: 0.95,
      roughness: 0.25,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.z = 0.04;
    packageGroup.add(dieMesh);

    // Gold Contact Pins around 4 sides
    const pinGeo = new THREE.BoxGeometry(0.06, 0.24, 0.08);
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xf6b93b,
      metalness: 0.98,
      roughness: 0.2,
      emissive: 0x8a6214,
      emissiveIntensity: 0.3,
    });

    const pinCount = 18;
    for (let i = 0; i < pinCount; i++) {
      const offset = (i / (pinCount - 1) - 0.5) * 3.8;
      // Top & Bottom pins
      const pinTop = new THREE.Mesh(pinGeo, pinMat);
      pinTop.position.set(offset, 2.18, -0.06);
      packageGroup.add(pinTop);

      const pinBottom = new THREE.Mesh(pinGeo, pinMat);
      pinBottom.position.set(offset, -2.18, -0.06);
      packageGroup.add(pinBottom);

      // Left & Right pins (rotated 90 deg)
      const pinLeft = new THREE.Mesh(pinGeo, pinMat);
      pinLeft.rotation.z = Math.PI / 2;
      pinLeft.position.set(-2.18, offset, -0.06);
      packageGroup.add(pinLeft);

      const pinRight = new THREE.Mesh(pinGeo, pinMat);
      pinRight.rotation.z = Math.PI / 2;
      pinRight.position.set(2.18, offset, -0.06);
      packageGroup.add(pinRight);
    }

    // Corner Hex Screws
    const screwGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.1, 6);
    const screwMat = new THREE.MeshStandardMaterial({ color: 0x8b9bb4, metalness: 0.9, roughness: 0.3 });
    [
      [-1.85, -1.85],
      [1.85, -1.85],
      [-1.85, 1.85],
      [1.85, 1.85],
    ].forEach(([cx, cy]) => {
      const screw = new THREE.Mesh(screwGeo, screwMat);
      screw.rotation.x = Math.PI / 2;
      screw.position.set(cx, cy, 0.14);
      packageGroup.add(screw);
    });

    // ==========================================
    // 2. CIRCULAR ARC REACTOR CORE
    // ==========================================
    const reactorGroup = new THREE.Group();
    reactorGroup.position.z = 0.15;
    packageGroup.add(reactorGroup);

    // Outer Steel Retaining Collar
    const collarGeo = new THREE.TorusGeometry(1.48, 0.14, 18, 48);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0x1d3654,
      metalness: 0.95,
      roughness: 0.28,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    reactorGroup.add(collarMesh);

    // 10 Copper Coil Segments
    const coilCount = 10;
    const coilGroup = new THREE.Group();
    reactorGroup.add(coilGroup);

    const coilGeo = new THREE.BoxGeometry(0.24, 0.34, 0.26);
    const coilMat = new THREE.MeshStandardMaterial({
      color: 0xd98a2b,
      metalness: 0.92,
      roughness: 0.3,
      emissive: 0x6e3c08,
      emissiveIntensity: 0.25,
    });

    for (let c = 0; c < coilCount; c++) {
      const angle = (c / coilCount) * Math.PI * 2;
      const radius = 1.34;
      const coil = new THREE.Mesh(coilGeo, coilMat);
      coil.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0.08);
      coil.rotation.z = angle + Math.PI / 2;
      coilGroup.add(coil);
    }

    // Emissive Cyan Inner Power Ring
    const innerRingGeo = new THREE.TorusGeometry(1.08, 0.065, 16, 48);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x3ee8ff,
      emissive: 0x3ee8ff,
      emissiveIntensity: 2.2,
      metalness: 0.2,
      roughness: 0.1,
    });
    const innerRingMesh = new THREE.Mesh(innerRingGeo, innerRingMat);
    reactorGroup.add(innerRingMesh);

    // Center Plasma Core Sphere & Disc
    const coreGeo = new THREE.SphereGeometry(0.68, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xeafeff,
      emissive: 0xa6f4ff,
      emissiveIntensity: 3.5,
      roughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.scale.z = 0.45;
    reactorGroup.add(coreMesh);

    // Protective Fresnel Glass Disc Cover
    const glassGeo = new THREE.CylinderGeometry(1.44, 1.44, 0.04, 48);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 0.92,
      transparent: true,
      roughness: 0.14,
      ior: 1.5,
      metalness: 0.1,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.rotation.x = Math.PI / 2;
    glassMesh.position.z = 0.22;
    reactorGroup.add(glassMesh);

    // Rotating Energy Plasma Rings
    const ring1Geo = new THREE.RingGeometry(0.72, 0.82, 32);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x3ee8ff, transparent: true, opacity: 0.65, side: THREE.DoubleSide });
    const plasmaRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    plasmaRing1.position.z = 0.16;
    reactorGroup.add(plasmaRing1);

    const ring2Geo = new THREE.RingGeometry(0.88, 0.96, 32);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x3ee8ff, transparent: true, opacity: 0.45, side: THREE.DoubleSide });
    const plasmaRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    plasmaRing2.position.z = 0.18;
    reactorGroup.add(plasmaRing2);

    // ==========================================
    // 3. SERVICE CATWALK & GANTRY RUNGS
    // ==========================================
    const catwalkGeo = new THREE.RingGeometry(2.35, 2.7, 4); // square catwalk
    const catwalkMat = new THREE.MeshStandardMaterial({
      color: 0x0a1220,
      metalness: 0.85,
      roughness: 0.45,
      wireframe: true,
    });
    const catwalk = new THREE.Mesh(catwalkGeo, catwalkMat);
    catwalk.position.z = 0.08;
    packageGroup.add(catwalk);

    // Shockwave Ring for Overcharge
    const shockwaveGeo = new THREE.RingGeometry(1.5, 1.6, 48);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0xeafeff,
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide,
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.position.z = 0.28;
    reactorGroup.add(shockwaveMesh);

    // Floating Dust Particles
    const dustCount = 45;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 8;
      dustPositions[i + 1] = (Math.random() - 0.5) * 8;
      dustPositions[i + 2] = (Math.random() - 0.5) * 4;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x3ee8ff, size: 0.035, transparent: true, opacity: 0.35 });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // ==========================================
    // 4. ANIMATION LOOP & DOUBLE PULSE (LUB-DUB)
    // ==========================================
    let reqId;
    let shockwaveScale = 1;
    let shockwaveAlpha = 0;
    let lastBeat = 0;
    const beatInterval = 1400; // 1.4s cycle

    const animate = (time) => {
      reqId = requestAnimationFrame(animate);

      // Heartbeat Cycle Timing (lub-dub)
      const now = performance.now();
      const elapsed = (now - lastBeat) % beatInterval;

      // Pulse 1: "lub" at t = 0..200ms
      // Pulse 2: "dub" at t = 240..420ms (60% amplitude)
      let pulseAmp = 1.0;
      if (elapsed < 200) {
        const p1 = elapsed / 200;
        pulseAmp = 1.0 + Math.sin(p1 * Math.PI) * 0.45;
      } else if (elapsed >= 240 && elapsed < 440) {
        const p2 = (elapsed - 240) / 200;
        pulseAmp = 1.0 + Math.sin(p2 * Math.PI) * 0.27; // 60% of primary pulse
      }

      // Check if beat cycle elapsed for visual pulsing
      if (now - lastBeat >= beatInterval) {
        lastBeat = now;
      }


      // Overcharge boost
      const isOC = useMachineStore.getState().isOvercharged;
      const ocMultiplier = isOC ? 1.7 : 1.0;

      // Rotating plasma rings
      plasmaRing1.rotation.z += (isOC ? 0.045 : 0.015);
      plasmaRing2.rotation.z -= (isOC ? 0.055 : 0.02);

      // Core pulsation & lighting
      coreLight.intensity = (2.8 * pulseAmp * ocMultiplier);
      innerRingMat.emissiveIntensity = (2.2 * pulseAmp * ocMultiplier);
      coreMat.emissiveIntensity = (3.5 * pulseAmp * ocMultiplier);

      // Subtle tilt towards pointer
      packageGroup.rotation.y = THREE.MathUtils.lerp(packageGroup.rotation.y, pointerPos.x * 0.14, 0.06);
      packageGroup.rotation.x = THREE.MathUtils.lerp(packageGroup.rotation.x, -pointerPos.y * 0.14, 0.06);

      // Overcharge shockwave expansion
      if (isOC) {
        shockwaveScale += 0.07;
        shockwaveAlpha = Math.max(0, 1 - (shockwaveScale - 1) / 1.8);
        shockwaveMesh.scale.set(shockwaveScale, shockwaveScale, 1);
        shockwaveMat.opacity = shockwaveAlpha;
      } else {
        shockwaveScale = 1;
        shockwaveMat.opacity = 0;
      }

      // Dust motes drift
      dustPoints.rotation.y += 0.0006;
      dustPoints.rotation.x += 0.0004;

      renderer.render(scene, camera);
    };

    // Pointer Parallax Tracker
    const pointerPos = { x: 0, y: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      pointerPos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerPos.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 440;
      height = container.clientHeight || 440;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    reqId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleClickReactor = () => {
    overchargeReactor();
    playOverchargeSfx(soundEnabled);
  };

  return (
    <div
      ref={mountRef}
      className={`arc-reactor-canvas-mount ${isOvercharged ? "overcharge-active" : ""}`}
      onClick={handleClickReactor}
      title="Click Arc Reactor Core to trigger Overcharge Surge (3.85 GW)"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClickReactor();
      }}
    />
  );
}
