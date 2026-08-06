import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "../../store/useSceneStore";

function makeCloudTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext("2d")!;
  for (let i = 0; i < 6; i++) {
    const x = 60 + Math.random() * 136;
    const y = 90 + Math.random() * 76;
    const r = 40 + Math.random() * 50;
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
    grad.addColorStop(0, "rgba(255,255,255,0.5)");
    grad.addColorStop(0.5, "rgba(255,255,255,0.18)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

interface CloudPuffProps {
  basePos: [number, number, number];
  scale: number;
  speed: number;
}

function CloudPuff({ basePos, scale, speed }: CloudPuffProps) {
  const ref = useRef<THREE.Sprite>(null);
  const texture = useMemo(() => makeCloudTexture(), []);
  const intensity = useSceneStore((s) => s.intensity);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const drift = (t * speed * (0.3 + intensity * 0.5)) % 140;
    ref.current.position.x = basePos[0] - drift + 70;
    ref.current.position.y = basePos[1] + Math.sin(t * 0.05 + basePos[2]) * 0.6;
  });

  return (
    <sprite ref={ref} position={basePos} scale={[scale, scale * 0.55, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        depthWrite={false}
        opacity={0.5}
        color="#dfe4ff"
      />
    </sprite>
  );
}

export function Clouds() {
  const puffs = useMemo(
    () =>
      Array.from({ length: 10 }, () => ({
        basePos: [
          THREE.MathUtils.randFloatSpread(120),
          6 + Math.random() * 10,
          -25 - Math.random() * 20,
        ] as [number, number, number],
        scale: 20 + Math.random() * 20,
        speed: 0.4 + Math.random() * 0.5,
      })),
    []
  );

  return (
    <group>
      {puffs.map((p, i) => (
        <CloudPuff key={`cloud-${i}`} {...p} />
      ))}
    </group>
  );
}
