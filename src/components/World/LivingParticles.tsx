import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, type Points } from "three";
import { createRandom, randomInRange } from "@/lib/random";
import type { WorldProps } from "./types";

type ParticleMode = "petal" | "firefly";

function Particles({ count, mode }: { count: number; mode: ParticleMode }) {
  const points = useRef<Points>(null);
  const { geometry, bases, phases } = useMemo(() => {
    const random = createRandom(mode === "petal" ? 711 : 401);
    const positions = new Float32Array(count * 3);
    const bases = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      bases[i * 3] = randomInRange(random, -9, 9);
      bases[i * 3 + 1] = randomInRange(random, mode === "petal" ? -2 : -1.5, 6);
      bases[i * 3 + 2] = randomInRange(random, -1.5, 3);
      positions.set(bases.subarray(i * 3, i * 3 + 3), i * 3);
      phases[i] = random() * Math.PI * 2;
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    return { geometry, bases, phases };
  }, [count, mode]);

  useFrame(({ clock }) => {
    if (!points.current) return;
    const position = points.current.geometry.getAttribute("position") as BufferAttribute;
    const time = clock.getElapsedTime();
    for (let i = 0; i < count; i += 1) {
      const phase = phases[i];
      if (mode === "petal") {
        position.setXYZ(i, bases[i * 3] + Math.sin(time * 0.6 + phase) * 0.85, bases[i * 3 + 1] - ((time * 0.34 + phase) % 8), bases[i * 3 + 2] + Math.cos(time * 0.5 + phase) * 0.6);
      } else {
        position.setXYZ(i, bases[i * 3] + Math.sin(time * 1.1 + phase) * 0.55, bases[i * 3 + 1] + Math.cos(time * 1.4 + phase) * 0.42, bases[i * 3 + 2]);
      }
    }
    position.needsUpdate = true;
  });

  const isPetal = mode === "petal";
  return <points ref={points} geometry={geometry} frustumCulled={false}><pointsMaterial color={isPetal ? "#ffc1da" : "#f8e68c"} size={isPetal ? 0.065 : 0.1} transparent opacity={isPetal ? 0.7 : 0.85} depthWrite={false} blending={AdditiveBlending} /></points>;
}

export function LivingParticles({ quality }: WorldProps) {
  const petalCount = quality === "high" ? 280 : quality === "medium" ? 160 : 60;
  const fireflyCount = quality === "high" ? 95 : quality === "medium" ? 55 : 25;
  return <><Particles count={petalCount} mode="petal" /><Particles count={fireflyCount} mode="firefly" /></>;
}
