import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, type Points } from "three";
import { createRandom, randomInRange } from "@/lib/random";
import type { WorldProps } from "./types";

type LayerProps = { count: number; seed: number; size: number; opacity: number; radius: number };

function StarLayer({ count, seed, size, opacity, radius }: LayerProps) {
  const points = useRef<Points>(null);
  const geometry = useMemo(() => {
    const random = createRandom(seed);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const distance = randomInRange(random, radius * 0.55, radius);
      positions.set([
        distance * Math.sin(phi) * Math.cos(theta),
        distance * Math.cos(phi),
        distance * Math.sin(phi) * Math.sin(theta) - 12,
      ], index * 3);
      const warmth = random();
      colors.set([0.72 + warmth * 0.28, 0.8 + warmth * 0.16, 1], index * 3);
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("color", new BufferAttribute(colors, 3));
    return result;
  }, [count, radius, seed]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const pulse = 0.84 + Math.sin(clock.getElapsedTime() * (0.7 + seed * 0.03)) * 0.16;
    (points.current.material as { opacity: number }).opacity = opacity * pulse;
  });

  return (
    <points ref={points} geometry={geometry} frustumCulled={false}>
      <pointsMaterial size={size} sizeAttenuation vertexColors transparent depthWrite={false} blending={AdditiveBlending} opacity={opacity} />
    </points>
  );
}

export function StarField({ quality }: WorldProps) {
  const count = quality === "high" ? 7200 : quality === "medium" ? 6000 : 2400;
  return (
    <group>
      <StarLayer count={Math.floor(count * 0.62)} seed={21} size={0.025} opacity={0.68} radius={42} />
      <StarLayer count={Math.floor(count * 0.29)} seed={47} size={0.042} opacity={0.78} radius={30} />
      <StarLayer count={Math.floor(count * 0.09)} seed={83} size={0.072} opacity={0.95} radius={22} />
    </group>
  );
}
