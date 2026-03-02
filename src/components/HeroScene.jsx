// src/components/HeroScene.jsx – vanilla Three.js for React 18 compatibility
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const lerp = (a, b, t) => a + (b - a) * Math.min(t, 1);

export default function HeroScene({ mouse = { x: 0, y: 0 } }) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshRefs = useRef([]);
  const targetRot = useRef({ x: 0, y: 0 });
  const currentRot = useRef({ x: 0, y: 0 });
  const frameId = useRef(null);
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 5, 5);
    scene.add(dir);
    const pt1 = new THREE.PointLight(0x818cf8, 0.4);
    pt1.position.set(-4, 4, 4);
    scene.add(pt1);
    const pt2 = new THREE.PointLight(0xfbbf24, 0.3);
    pt2.position.set(4, -3, 2);
    scene.add(pt2);

    // Floating wireframe shapes
    const wireframeColors = [0x6366f1, 0x818cf8, 0xa78bfa, 0xc084fc, 0x60a5fa];
    const wireframePositions = [
      [-2.2, 0.8, -2], [2, -0.5, -1.5], [0.5, 1.2, -2.5],
      [-0.8, -1.2, -1.8], [1.8, 0.3, -2.2],
    ];
    const wireframeGeos = [
      new THREE.TorusGeometry(0.6, 0.2, 16, 32),
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.TorusGeometry(0.5, 0.15, 12, 24),
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TorusKnotGeometry(0.25, 0.06, 32, 8),
    ];
    const meshes = [];
    wireframeGeos.forEach((geo, i) => {
      const mat = new THREE.MeshStandardMaterial({
        color: wireframeColors[i],
        wireframe: true,
        transparent: true,
        opacity: 0.3 + (i % 3) * 0.05,
        emissive: wireframeColors[i],
        emissiveIntensity: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(wireframePositions[i][0], wireframePositions[i][1], wireframePositions[i][2]);
      scene.add(mesh);
      meshes.push(mesh);
    });
    meshRefs.current = meshes;

    // Soft blobs (low-poly spheres)
    const blobGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const blobMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.2,
      roughness: 0.6,
      metalness: 0.1,
    });
    const blob1 = new THREE.Mesh(blobGeo, blobMat.clone());
    blob1.position.set(-1.5, -0.3, -3);
    blob1.userData.baseX = -1.5;
    blob1.userData.baseY = -0.3;
    scene.add(blob1);
    meshes.push(blob1);
    const blob2 = new THREE.Mesh(blobGeo, blobMat.clone());
    blob2.material.color.setHex(0xf59e0b);
    blob2.position.set(2, 0.5, -3.5);
    blob2.userData.baseX = 2;
    blob2.userData.baseY = 0.5;
    scene.add(blob2);
    meshes.push(blob2);
    const blob3 = new THREE.Mesh(blobGeo.clone(), blobMat.clone());
    blob3.material.color.setHex(0xa78bfa);
    blob3.scale.setScalar(0.5);
    blob3.position.set(-0.5, 1.5, -3.2);
    blob3.userData.baseX = -0.5;
    blob3.userData.baseY = 1.5;
    scene.add(blob3);
    meshes.push(blob3);

    // Thin ring (orbit-style)
    const ringGeo = new THREE.TorusGeometry(0.9, 0.04, 16, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ring.position.set(0, 0, -4);
    scene.add(ring);
    meshes.push(ring);

    // Particles
    const particleCount = 160;
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 12;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const pointsMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeo, pointsMat);
    scene.add(points);
    meshRefs.current.points = points;

    // Second particle field (amber tint, different spread)
    const particleCount2 = 60;
    const posArray2 = new Float32Array(particleCount2 * 3);
    for (let i = 0; i < particleCount2; i++) {
      posArray2[i * 3] = (Math.random() - 0.5) * 16;
      posArray2[i * 3 + 1] = (Math.random() - 0.5) * 10;
      posArray2[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const pointsGeo2 = new THREE.BufferGeometry();
    pointsGeo2.setAttribute('position', new THREE.BufferAttribute(posArray2, 3));
    const points2 = new THREE.Points(pointsGeo2, new THREE.PointsMaterial({
      size: 0.035,
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    }));
    scene.add(points2);
    meshRefs.current.points2 = points2;

    function animate() {
      frameId.current = requestAnimationFrame(animate);
      const m = mouseRef.current;
      targetRot.current.x = m.y * 0.4;
      targetRot.current.y = m.x * 0.4;
      currentRot.current.x = lerp(currentRot.current.x, targetRot.current.x, 0.08);
      currentRot.current.y = lerp(currentRot.current.y, targetRot.current.y, 0.08);

      meshes.forEach((mesh, i) => {
        if (i < 5) {
          mesh.rotation.x = currentRot.current.x;
          mesh.rotation.y = currentRot.current.y;
          mesh.rotation.z += 0.0015 + i * 0.0003;
        } else if (i >= 5 && i <= 7 && mesh.userData?.baseX != null) {
          mesh.rotation.x += 0.002;
          mesh.rotation.y += 0.0015;
          mesh.position.x = mesh.userData.baseX + m.x * 0.3;
          mesh.position.y = mesh.userData.baseY + m.y * 0.3;
        } else if (i === 8) {
          mesh.rotation.z += 0.0005;
          mesh.rotation.x = Math.PI / 2.5 + m.y * 0.08;
          mesh.rotation.y = m.x * 0.1;
        }
      });
      if (points) {
        points.rotation.y += 0.0008;
        points.rotation.x = m.y * 0.1;
        points.rotation.y += m.x * 0.01;
      }
      const pts2 = meshRefs.current.points2;
      if (pts2) {
        pts2.rotation.x += 0.0004;
        pts2.rotation.y += 0.0006;
        pts2.rotation.z = m.x * 0.05;
      }

      renderer.render(scene, camera);
    }
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    const blob3Geo = blob3.geometry;
    const allGeometries = [...wireframeGeos, blobGeo, blob3Geo, ringGeo, pointsGeo, pointsGeo2];
    return () => {
      window.removeEventListener('resize', onResize);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      allGeometries.forEach((g) => g.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden="true" />;
}
