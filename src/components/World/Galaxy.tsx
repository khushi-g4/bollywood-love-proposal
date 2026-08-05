import { useMemo } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry } from "three";
import { createRandom } from "@/lib/random";
import type { WorldProps } from "./types";

function ParticleBand({ count, seed, spiral = false }: { count: number; seed: number; spiral?: boolean }) {
  const geometry = useMemo(() => {
    const random = createRandom(seed);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const progress = i / count;
      const angle = spiral ? progress * Math.PI * 10 + random() * 0.8 : progress * Math.PI * 1.4 - 0.5;
      const spread = spiral ? Math.sqrt(random()) * 3.2 : 4 + random() * 16;
      positions[i * 3] = spiral ? 4.6 + Math.cos(angle) * spread : Math.cos(angle) * spread - 3;
      positions[i * 3 + 1] = spiral ? 3 + Math.sin(angle) * spread * 0.38 : 4.5 + Math.sin(angle) * 2.3 + (random() - 0.5) * 1.1;
      positions[i * 3 + 2] = spiral ? -12 + (random() - 0.5) * 1.4 : -17 + (random() - 0.5) * 5;
      const warm = random();
      colors.set(spiral ? [0.55 + warm * 0.35, 0.35 + warm * 0.2, 0.9] : [0.35 + warm * 0.22, 0.42 + warm * 0.2, 0.95], i * 3);
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("color", new BufferAttribute(colors, 3));
    return result;
  }, [count, seed, spiral]);

  return <points geometry={geometry}><pointsMaterial size={0.075} vertexColors transparent opacity={0.48} depthWrite={false} blending={AdditiveBlending} /></points>;
}

export function Galaxy({ quality }: WorldProps) {
  const multiplier = quality === "high" ? 1 : quality === "medium" ? 0.7 : 0.35;
  return <group><ParticleBand count={Math.floor(1300 * multiplier)} seed={19} /><ParticleBand count={Math.floor(900 * multiplier)} seed={61} spiral /></group>;
}
