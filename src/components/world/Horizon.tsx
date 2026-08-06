import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function lightTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255,214,140,1)");
  grad.addColorStop(0.35, "rgba(255,190,110,0.8)");
  grad.addColorStop(1, "rgba(255,190,110,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

/** A gently curving string of warm lights tracing a distant shoreline, like the reference image. */
function ShorelineLights() {
  const texture = useMemo(() => lightTexture(), []);
  const count = 90;
  const positions = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const x = (i / count) * 140 - 70;
      const curve = Math.sin(i * 0.15) * 3 + Math.sin(i * 0.04) * 6;
      const z = -30 + curve;
      const y = -2.4 + Math.sin(i * 0.3) * 0.05;
      pts.push([x, y, z]);
    }
    return pts;
  }, []);
  const refs = useRef<(THREE.Sprite | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    positions.forEach((_, i) => {
      const s = refs.current[i];
      if (!s) return;
      const flicker = 0.7 + 0.3 * Math.sin(t * 1.5 + i * 1.7);
      s.scale.setScalar(0.5 * flicker);
      (s.material as THREE.SpriteMaterial).opacity = 0.55 + flicker * 0.35;
    });
  });

  return (
    <group>
      {positions.map((p, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={p} scale={[0.5, 0.5, 1]}>
          <spriteMaterial
            map={texture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#ffcf8f"
          />
        </sprite>
      ))}
    </group>
  );
}

/** Soft, hazy hill silhouette that gives the ground a horizon instead of a hard flat edge. */
function DistantHills() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#0a0e27";
    ctx.beginPath();
    ctx.moveTo(0, 128);
    ctx.lineTo(0, 70);
    for (let x = 0; x <= 512; x += 16) {
      const y = 60 + Math.sin(x * 0.01) * 10 + Math.sin(x * 0.035) * 6;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(512, 128);
    ctx.closePath();
    ctx.fill();
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh position={[0, 3, -34]}>
      <planeGeometry args={[160, 30]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

export function Horizon() {
  return (
    <group>
      <DistantHills />
      <ShorelineLights />
      <group position={[0, -6, 0]} scale={[1, -0.6, 1]}>
        <ShorelineLights />
      </group>
    </group>
  );
}
