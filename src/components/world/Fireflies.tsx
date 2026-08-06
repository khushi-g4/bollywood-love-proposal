import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 90;

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, "rgba(255,224,150,1)");
  grad.addColorStop(0.25, "rgba(255,200,110,0.9)");
  grad.addColorStop(0.6, "rgba(227,184,115,0.25)");
  grad.addColorStop(1, "rgba(227,184,115,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

export function Fireflies() {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useMemo(() => glowTexture(), []);

  const data = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        base: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(40),
          Math.random() * 2.2 - 0.8,
          THREE.MathUtils.randFloatSpread(26) - 6
        ),
        speed: 0.25 + Math.random() * 0.45,
        offset: Math.random() * Math.PI * 2,
        radius: 0.7 + Math.random() * 1.4,
        baseScale: 0.16 + Math.random() * 0.16,
      })),
    []
  );

  const refs = useRef<(THREE.Sprite | null)[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    data.forEach((f, i) => {
      const sprite = refs.current[i];
      if (!sprite) return;
      const angle = t * f.speed + f.offset;
      sprite.position.set(
        f.base.x + Math.cos(angle) * f.radius,
        f.base.y + Math.sin(angle * 1.3) * 0.45 + Math.sin(t * 0.4 + f.offset) * 0.3,
        f.base.z + Math.sin(angle) * f.radius
      );
      const pulse = 0.5 + 0.5 * Math.sin(t * 2.2 + f.offset * 3);
      const s = f.baseScale * (0.6 + pulse * 0.8);
      sprite.scale.set(s, s, 1);
      (sprite.material as THREE.SpriteMaterial).opacity = 0.35 + pulse * 0.4;
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((f, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={f.base}>
          <spriteMaterial
            map={texture}
            transparent
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#ffdca0"
          />
        </sprite>
      ))}
    </group>
  );
}
