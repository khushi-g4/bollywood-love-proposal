import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Draws a dense, full blossoming tree crown: layered twigs + rich clustered blossom canopy. */
function branchTexture(mirror: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 768;
  canvas.height = 768;
  const ctx = canvas.getContext("2d")!;
  ctx.translate(mirror ? 768 : 0, 0);
  ctx.scale(mirror ? -1 : 1, 1);

  // trunk + branches
  ctx.strokeStyle = "#1c1418";
  ctx.lineCap = "round";
  function branch(x: number, y: number, angle: number, len: number, width: number, depth: number) {
    if (depth <= 0 || len < 10) return;
    const x2 = x + Math.cos(angle) * len;
    const y2 = y + Math.sin(angle) * len;
    ctx.lineWidth = width;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    branch(x2, y2, angle + 0.35 + Math.random() * 0.25, len * 0.74, width * 0.72, depth - 1);
    branch(x2, y2, angle - 0.42 - Math.random() * 0.22, len * 0.68, width * 0.66, depth - 1);
    if (Math.random() > 0.4) {
      branch(x2, y2, angle + (Math.random() - 0.5) * 0.35, len * 0.55, width * 0.5, depth - 1);
    }
  }
  branch(60, 730, -1.2, 320, 22, 7);
  branch(10, 500, -0.15, 260, 16, 6);
  branch(30, 620, -0.55, 240, 15, 6);

  // rich blossom canopy — many overlapping clusters for fullness
  function blossomCluster(x: number, y: number, r: number, count: number) {
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const d = Math.random() * r;
      const px = x + Math.cos(a) * d;
      const py = y + Math.sin(a) * d;
      const size = 8 + Math.random() * 16;
      const hue = Math.random() > 0.5 ? "232,150,178" : "224,128,164";
      const grad = ctx.createRadialGradient(px, py, 0, px, py, size);
      grad.addColorStop(0, `rgba(${hue},0.95)`);
      grad.addColorStop(0.55, `rgba(${hue},0.7)`);
      grad.addColorStop(1, `rgba(${hue},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  const clusterCenters = [
    [120, 380], [220, 260], [90, 500], [280, 180], [60, 220],
    [300, 380], [180, 500], [340, 280], [30, 380], [200, 620],
    [340, 500], [110, 630], [260, 560], [40, 130], [380, 200],
    [150, 150], [370, 400], [260, 100],
  ];
  clusterCenters.forEach(([x, y]) => blossomCluster(x, y, 70, 22));

  return new THREE.CanvasTexture(canvas);
}

function Branch({
  position,
  rotation,
  scale,
  mirror,
  swaySpeed,
  swayAmount,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  mirror: boolean;
  swaySpeed: number;
  swayAmount: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const texture = useMemo(() => branchTexture(mirror), [mirror]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.z = rotation[2] + Math.sin(t * swaySpeed) * swayAmount;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <planeGeometry args={[7, 7]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

/** Full blossoming canopy on the left, a smaller accent on the right — mirrors the reference composition. */
export function CherryBlossomBranches() {
  return (
    <group>
      <Branch
        position={[-7.5, 3.2, -1]}
        rotation={[0, 0, 0.08]}
        scale={2.6}
        mirror={false}
        swaySpeed={0.1}
        swayAmount={0.015}
      />
      <Branch
        position={[-8.5, 1.5, 2]}
        rotation={[0, 0, -0.05]}
        scale={1.6}
        mirror={false}
        swaySpeed={0.13}
        swayAmount={0.02}
      />
      <Branch
        position={[8.2, 5.4, 1]}
        rotation={[0, 0, -0.1]}
        scale={1.3}
        mirror={true}
        swaySpeed={0.09}
        swayAmount={0.015}
      />
    </group>
  );
}
