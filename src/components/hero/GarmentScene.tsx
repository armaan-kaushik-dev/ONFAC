'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { Center, ContactShadows, Environment, Float, Lightformer, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { heroProgress } from '@/lib/hero-progress';

const MODEL_URL = '/models/shirt.glb';

/** Deep enough to read as dyed leather rather than flat brand red. */
const GARMENT_RED = '#a8131a';

function Garment(props: ThreeElements['group']) {
  const { scene } = useGLTF(MODEL_URL);
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });

  // The GLB ships an untinted lambert-ish material with only normal + AO maps,
  // so the colourway is ours to set — and the relief maps still do the work.
  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;
      mat.color = new THREE.Color(GARMENT_RED);
      mat.roughness = 0.62;
      mat.metalness = 0.02;
      mat.envMapIntensity = 0.85;
      if (mat.normalScale) mat.normalScale.set(0.85, 0.85);
      mat.needsUpdate = true;
    });
  }, [scene]);

  useFrame((state) => {
    if (!group.current) return;

    // A garment reads better swaying on a hanger than spinning on a turntable.
    const t = state.clock.elapsedTime;
    const p = heroProgress.value;

    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.05;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.05;

    // Pointer lean fades out as the camera dives in, so the scroll owns the
    // framing near the end instead of fighting the mouse.
    const lean = 1 - p;
    group.current.rotation.y =
      Math.sin(t * 0.32) * 0.55 * lean + pointer.current.x * 0.45 * lean + p * 0.55;
    group.current.rotation.z = Math.sin(t * 0.24) * 0.045 * lean;
    group.current.rotation.x = pointer.current.y * -0.14 * lean;
  });

  return (
    <group ref={group} {...props}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Drives the spatial zoom: scroll dollies the camera from a full product shot
 * right up into the weave, so the hero dissolves into fabric before handing off
 * to the next section. Lerped rather than set directly so it stays smooth even
 * when ScrollTrigger delivers progress in coarse steps.
 */
function CameraRig() {
  useFrame((state, delta) => {
    const p = heroProgress.value;
    // easeInCubic: the approach starts gently, then rushes — reads as depth.
    const eased = p * p * p;

    const targetZ = THREE.MathUtils.lerp(5.6, 0.85, eased);
    const targetY = THREE.MathUtils.lerp(0.2, 0.62, p);
    const targetFov = THREE.MathUtils.lerp(30, 46, eased);

    // Frame-rate independent smoothing.
    const k = 1 - Math.pow(0.0015, delta);
    const cam = state.camera as THREE.PerspectiveCamera;
    cam.position.z += (targetZ - cam.position.z) * k;
    cam.position.y += (targetY - cam.position.y) * k;

    if (Math.abs(cam.fov - targetFov) > 0.01) {
      cam.fov += (targetFov - cam.fov) * k;
      cam.updateProjectionMatrix();
    }
  });

  return null;
}

/**
 * Fully procedural lighting — no HDR fetched over the network, so the hero
 * never waits on a CDN and renders identically offline.
 */
function Rig() {
  return (
    <Environment resolution={256} frames={1}>
      <color attach="background" args={['#0a0a0a']} />
      {/* Key: broad soft white from front-top so the fabric folds read */}
      <Lightformer intensity={2.6} form="rect" scale={[10, 10, 1]} position={[0, 5, 6]} />
      {/* Red rim from camera-left, tying the product to the accent */}
      <Lightformer
        intensity={5}
        color="#ff2d20"
        form="rect"
        scale={[3, 8, 1]}
        position={[-6, 1, 2]}
        rotation={[0, Math.PI / 2, 0]}
      />
      {/* Warm kicker from camera-right */}
      <Lightformer
        intensity={2.8}
        color="#ff6a3d"
        form="rect"
        scale={[3, 8, 1]}
        position={[6, 0, 1]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      {/* Cool bounce underneath keeps the shadow side off pure black */}
      <Lightformer intensity={0.9} color="#8899ff" form="circle" scale={6} position={[0, -5, 2]} />
    </Environment>
  );
}

export default function GarmentScene() {
  return (
    <Canvas
      // Cap DPR: past ~1.75 the extra pixels cost frames and buy nothing here.
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0.2, 5.6], fov: 30 }}
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.8} floatingRange={[-0.07, 0.07]}>
          {/* The GLB is ~0.6 world units tall, so centre it and scale up. */}
          <Center position={[0.42, 0.34, 0]}>
            <Garment scale={3.0} />
          </Center>
        </Float>

        <ContactShadows
          position={[0, -1.15, 0]}
          opacity={0.5}
          scale={9}
          blur={3}
          far={3.2}
          // Half-res shadow map: it is a soft blurred blob, nobody can tell.
          resolution={256}
          color="#000000"
        />
        <Rig />
        <CameraRig />
      </Suspense>

      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
