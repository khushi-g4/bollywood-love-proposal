import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}
    >
        {/* We will add lights, moon and stars here */}
    </Canvas>
  );
}