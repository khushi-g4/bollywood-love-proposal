import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWind } from "../../hooks/useWind";
import { useSceneStore } from "../../store/useSceneStore";

const COUNT = 220;

function petalTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(32, 32);

  // heart-notched sakura petal silhouette
  ctx.fillStyle = "#ffb9d0";
  ctx.beginPath();
  ctx.moveTo(0, -21);
  ctx.bezierCurveTo(3, -23, 6, -20, 4, -14);
  ctx.bezierCurveTo(14, -10, 19, 4, 8, 16);
  ctx.bezierCurveTo(5, 21, -5, 21, -8, 16);
  ctx.bezierCurveTo(-19, 4, -14, -10, -4, -14);
  ctx.bezierCurveTo(-6, -20, -3, -23, 0, -21);
  ctx.closePath();
  ctx.fill();

  // gradient shading for depth (deeper rose at base, pale tip)
  const shade = ctx.createLinearGradient(0, -21, 0, 20);
  shade.addColorStop(0, "rgba(255,255,255,0.55)");
  shade.addColorStop(0.5, "rgba(255,214,228,0.15)");
  shade.addColorStop(1, "rgba(217,69,119,0.35)");
  ctx.fillStyle = shade;
  ctx.beginPath();
  ctx.moveTo(0, -21);
  ctx.bezierCurveTo(3, -23, 6, -20, 4, -14);
  ctx.bezierCurveTo(14, -10, 19, 4, 8, 16);
  ctx.bezierCurveTo(5, 21, -5, 21, -8, 16);
  ctx.bezierCurveTo(-19, 4, -14, -10, -4, -14);
  ctx.bezierCurveTo(-6, -20, -3, -23, 0, -21);
  ctx.closePath();
  ctx.fill();

  // center vein highlight
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, -16);
  ctx.lineTo(0, 14);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

interface Petal {
  pos: THREE.Vector3;
  rot: THREE.Euler;
  fallSpeed: number;
  swaySpeed: number;
  swayAmp: number;
  spinSpeed: THREE.Vector3;
  offset: number;
  scale: number;
}

export function CherryBlossoms() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const wind = useWind();
  const intensity = useSceneStore((s) => s.intensity);
  const texture = useMemo(() => petalTexture(), []);

  const petals = useMemo<Petal[]>(
    () =>
      Array.from({ length: COUNT }, () => ({
        pos: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(40),
          Math.random() * 30,
          THREE.MathUtils.randFloatSpread(30) - 5
        ),
        rot: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
        fallSpeed: 0.35 + Math.random() * 0.5,
        swaySpeed: 0.4 + Math.random() * 0.6,
        swayAmp: 0.6 + Math.random() * 1.4,
        spinSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2,
          (Math.random() - 0.5) * 1.2
        ),
        offset: Math.random() * Math.PI * 2,
        scale: 0.25 + Math.random() * 0.3,
      })),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const density = 0.5 + intensity * 1.5; // proposal moment increases blossom activity
    const w = wind.current;

    petals.forEach((p, i) => {
      p.pos.y -= p.fallSpeed * delta * (0.6 + density * 0.4);
      p.pos.x += Math.sin(t * p.swaySpeed + p.offset) * p.swayAmp * delta + w.x * delta * w.strength;
      p.pos.z += w.z * delta * w.strength;

      if (p.pos.y < -2) {
        p.pos.y = 26 + Math.random() * 6;
        p.pos.x = THREE.MathUtils.randFloatSpread(40);
        p.pos.z = THREE.MathUtils.randFloatSpread(30) - 5;
      }

      p.rot.x += p.spinSpeed.x * delta;
      p.rot.y += p.spinSpeed.y * delta;
      p.rot.z += p.spinSpeed.z * delta;

      dummy.position.copy(p.pos);
      dummy.rotation.copy(p.rot);
      dummy.scale.setScalar(p.scale * (0.85 + density * 0.15));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
        opacity={0.92}
      />
    </instancedMesh>
  );
}
