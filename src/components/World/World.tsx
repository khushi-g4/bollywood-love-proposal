import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Sky from "./Sky";
import StarField from "./Stars";

export default function World() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
        }}
      >
        <Suspense fallback={null}>
          <Sky />
          <Suspense fallback={null}>
  <Sky />

  <StarField />

  <ambientLight intensity={0.35} />

  <directionalLight
    position={[5, 5, 5]}
    intensity={1.5}
  />
</Suspense>

          <ambientLight intensity={0.35} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={1.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}