import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

export default function World() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
      >
        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.3} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
        />

        <Suspense fallback={null}>
          {/* Moon */}
          {/* Stars */}
          {/* Clouds */}
          {/* Sakura */}
          {/* Fireflies */}
        </Suspense>
      </Canvas>
    </div>
  );
}