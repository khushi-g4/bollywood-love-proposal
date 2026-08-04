import { Canvas } from "@react-three/fiber";
import Moon from "./Moon";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}
    >
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
      />

      <Moon />
    </Canvas>
  );
}