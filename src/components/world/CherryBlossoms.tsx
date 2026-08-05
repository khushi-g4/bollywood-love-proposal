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
  ctx.fillStyle = "#ffc9dc";
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.bezierCurveTo(16, -18, 18, 6, 0, 22);
  ctx.bezierCurveTo(-18, 6, -16, -18, 0, -22);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.beginPath();
  ctx.ellipse(-3, -6, 5, 10, 0.4, 0, Math.PI * 2);
  ctx.fill();
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
