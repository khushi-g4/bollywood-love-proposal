import { Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Moon } from "./Moon";
import { StarField, ShootingStars } from "./StarField";
import { Clouds } from "./Clouds";
import { Fireflies } from "./Fireflies";
import { CherryBlossoms } from "./CherryBlossoms";
import { CherryBlossomBranches } from "./CherryBlossomBranches";
import { Horizon } from "./Horizon";
import { useSceneStore } from "../../store/useSceneStore";

/** Subtle breathing camera so nothing ever feels static, plus scroll-driven height/tilt. */
function CameraRig() {
  const scrollProgress = useSceneStore((s) => s.scrollProgress);
  useFrame(({ camera, clock }) => {
    const t = clock.elapsedTime;
    const breathe = Math.sin(t * 0.18) * 0.15;
    camera.position.y = 1.6 + breathe - scrollProgress * 1.2;
    camera.position.x = Math.sin(t * 0.05) * 0.4;
    camera.rotation.z = Math.sin(t * 0.03) * 0.005;
    camera.lookAt(0, 4 - scrollProgress * 2, -20);
  });
  return null;
}

function Ground() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 4;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, "rgba(10,14,39,0)");
    grad.addColorStop(0.15, "rgba(8,11,30,0.6)");
    grad.addColorStop(1, "rgba(4,6,18,1)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -6]}>
      <planeGeometry args={[300, 90]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

export function World() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        camera={{ fov: 55, near: 0.1, far: 300, position: [0, 1.6, 8] }}
      >
        <color attach="background" args={["#050814"]} />
        <fog attach="fog" args={["#0a0e27", 20, 90]} />
        <ambientLight intensity={0.25} color="#3a4a8f" />

        <Suspense fallback={null}>
          <StarField />
          <ShootingStars />
          <Moon />
          <Clouds />
          <Horizon />
          <Fireflies />
          <CherryBlossoms />
          <CherryBlossomBranches />
          <Ground />
        </Suspense>

        <CameraRig />

        <EffectComposer multisampling={0}>
          <Bloom intensity={0.4} luminanceThreshold={0.68} luminanceSmoothing={0.6} mipmapBlur={false} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
