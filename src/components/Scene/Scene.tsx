import { Canvas } from "@react-three/fiber";

export default function Scene() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 8],
        fov: 45,
      }}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.4} />

      {/* Moon Light */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={2}
        color="#ffffff"
      />
    </Canvas>
  );
}