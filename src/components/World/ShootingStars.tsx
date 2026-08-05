import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Group, Mesh, Vector3 } from "three";
import type { WorldProps } from "./types";

function ShootingStar() {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);
  const trail = useMemo(() => [new Vector3(-2.15, 0.72, 0), new Vector3(-0.5, 0.17, 0), new Vector3(0, 0, 0)], []);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const period = 29;
    const cycle = (clock.getElapsedTime() + 6.5) % period;
    const duration = 0.82;
    const active = cycle < duration;
    group.current.visible = active;
    if (!active) return;
    const progress = cycle / duration;
    group.current.position.set(-8 + progress * 16, 4.9 - progress * 6.1, -4.6);
    if (head.current) head.current.scale.setScalar(0.8 + Math.sin(progress * Math.PI) * 0.55);
  });

  return (
    <group ref={group} visible={false}>
      <Line points={trail} color="#9fc8ff" transparent opacity={0.16} lineWidth={1.1} />
      <Line points={[trail[1], trail[2]]} color="#e9f5ff" transparent opacity={0.7} lineWidth={1.6} />
      <mesh ref={head}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#f5fbff" toneMapped={false} transparent opacity={0.98} blending={AdditiveBlending} />
      </mesh>
      <pointLight color="#b9dcff" intensity={2.4} distance={2.8} decay={2} />
    </group>
  );
}

export function ShootingStars({ quality }: WorldProps) {
  return quality === "low" ? null : <ShootingStar />;
}
