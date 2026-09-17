"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const STRAND_COLOR_A = "#0e9d6e";
const STRAND_COLOR_B = "#6d4fc4";
const RUNG_COLOR = "#7691b8";

const TURNS = 4.5;
const NODES_PER_TURN = 10;
const NODE_COUNT = Math.round(TURNS * NODES_PER_TURN);
const RADIUS = 1.15;
const HEIGHT = 8.5;
// Worst-case distance from the group's origin to any node, across every rotation
// the helix spins through, plus a margin so it never touches the frame edge.
const BOUNDING_RADIUS = Math.sqrt(RADIUS * RADIUS + (HEIGHT / 2) * (HEIGHT / 2)) + 0.9;

function FitCamera() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    const aspect = size.width / size.height;
    const verticalFov = (perspective.fov * Math.PI) / 180;
    // Distance required so the bounding sphere fits inside both the vertical
    // and horizontal frustum, whichever is tighter for the current aspect ratio.
    const distance = (BOUNDING_RADIUS / Math.tan(verticalFov / 2)) * Math.max(1, 1 / aspect);
    // Mutating the camera in place is the standard react-three-fiber pattern for
    // imperative updates outside the render loop; it isn't React state.
    // eslint-disable-next-line react-hooks/immutability
    perspective.position.z = distance;
    perspective.updateProjectionMatrix();
  }, [camera, size]);

  return null;
}

function useHelixNodes() {
  return useMemo(() => {
    const strandA: THREE.Vector3[] = [];
    const strandB: THREE.Vector3[] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const t = i / (NODE_COUNT - 1);
      const angle = t * TURNS * Math.PI * 2;
      const y = t * HEIGHT - HEIGHT / 2;
      strandA.push(new THREE.Vector3(Math.cos(angle) * RADIUS, y, Math.sin(angle) * RADIUS));
      strandB.push(
        new THREE.Vector3(Math.cos(angle + Math.PI) * RADIUS, y, Math.sin(angle + Math.PI) * RADIUS)
      );
    }
    return { strandA, strandB };
  }, []);
}

function Rungs({ strandA, strandB }: { strandA: THREE.Vector3[]; strandB: THREE.Vector3[] }) {
  const rungs = useMemo(
    () =>
      strandA
        .map((a, i) => ({ a, b: strandB[i] }))
        .filter((_, i) => i % 3 === 0),
    [strandA, strandB]
  );

  return (
    <>
      {rungs.map(({ a, b }, i) => {
        const mid = a.clone().lerp(b, 0.5);
        const dist = a.distanceTo(b);
        const dir = b.clone().sub(a).normalize();
        const quaternion = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir
        );
        return (
          <mesh key={i} position={mid} quaternion={quaternion}>
            <cylinderGeometry args={[0.02, 0.02, dist, 6]} />
            <meshStandardMaterial color={RUNG_COLOR} transparent opacity={0.35} />
          </mesh>
        );
      })}
    </>
  );
}

function Strand({ points, color }: { points: THREE.Vector3[]; color: string }) {
  return (
    <>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.11, 16, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      ))}
    </>
  );
}

function HelixGroup() {
  const groupRef = useRef<THREE.Group>(null);
  const { strandA, strandB } = useHelixNodes();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  return (
    <group ref={groupRef} rotation={[0.35, 0, 0.15]}>
      <Strand points={strandA} color={STRAND_COLOR_A} />
      <Strand points={strandB} color={STRAND_COLOR_B} />
      <Rungs strandA={strandA} strandB={strandB} />
    </group>
  );
}

export default function DnaHelix3D({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 4, 5]} intensity={1.1} />
        <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#8b6fd6" />
        <FitCamera />
        <HelixGroup />
      </Canvas>
    </div>
  );
}
