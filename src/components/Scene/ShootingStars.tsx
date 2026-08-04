import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type ShootingStarProps = {
  position: THREE.Vector3;
};

function ShootingStar({ position }: ShootingStarProps) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.position.x += delta * 8;
    ref.current.position.y -= delta * 4;

    if (
      ref.current.position.x > 20 ||
      ref.current.position.y < -12
    ) {
      ref.current.position.x = -20;
      ref.current.position.y = 8 + Math.random() * 8;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.03, 8, 8]} />
      <meshBasicMaterial color="white" />
    </mesh>
  );
}

export default function ShootingStars() {
  const stars = useMemo(
    () =>
      Array.from({ length: 4 }, () => ({
        position: new THREE.Vector3(
          -20 + Math.random() * 10,
          8 + Math.random() * 6,
          -5
        ),
      })),
    []
  );

  return (
    <>
      {stars.map((star, index) => (
        <ShootingStar
          key={index}
          position={star.position}
        />
      ))}
    </>
  );
}