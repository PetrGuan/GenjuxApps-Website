"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function ProductNodes() {
  const group = useRef<Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.16;
      group.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.24) * 0.08;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[-1.1, 0.45, 0]} rotation={[0.1, -0.28, -0.12]}>
        <boxGeometry args={[1.15, 1.75, 0.08]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[1.1, -0.4, 0.25]} rotation={[-0.08, 0.22, 0.14]}>
        <boxGeometry args={[1.15, 1.75, 0.08]} />
        <meshStandardMaterial color="#ffcf80" emissive="#ffb951" emissiveIntensity={0.22} roughness={0.32} />
      </mesh>
      <line>
        <bufferGeometry>
          <bufferAttribute
            args={[new Float32Array([-1.1, 0.45, 0, 0, 0, 0.12, 1.1, -0.4, 0.25]), 3]}
            attach="attributes-position"
            count={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#f2f2ed" opacity={0.28} transparent />
      </line>
    </group>
  );
}

export default function ConstellationScene() {
  return (
    <Canvas camera={{ fov: 45, position: [0, 0, 5] }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.7} />
      <pointLight intensity={14} position={[2, 3, 3]} />
      <ProductNodes />
    </Canvas>
  );
}
