import { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Moon } from "./Moon";
import { StarField, ShootingStars } from "./StarField";
import { Clouds } from "./Clouds";
import { Fireflies } from "./Fireflies";
import { CherryBlossoms } from "./CherryBlossoms";
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
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, -10]}>
      <planeGeometry args={[300, 300]} />
      <meshStandardMaterial color="#050814" roughness={1} />
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
          <Fireflies />
          <CherryBlossoms />
          <Ground />
        </Suspense>

        <CameraRig />
      </Canvas>
    </div>
  );
}