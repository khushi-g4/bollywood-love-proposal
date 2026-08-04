import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export default function TwinklingStars() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const array = [];

    for (let i = 0; i < 800; i++) {
      array.push(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 22,
        -5 - Math.random() * 15
      );
    }

    return new Float32Array(array);
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.y = clock.elapsedTime * 0.01;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.03) * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.12}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}