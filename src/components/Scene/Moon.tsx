import { Sphere } from "@react-three/drei";
import { Float } from "@react-three/drei";

export default function Moon() {
  return (
    <Float
      speed={1}
      rotationIntensity={0.15}
      floatIntensity={0.5}
    >
      <Sphere
        args={[0.65, 64, 64]}
        position={[4.8, 2.6, 0]}
      >
        <meshStandardMaterial
          color="#f8f8f8"
          emissive="#dbeafe"
          emissiveIntensity={0.35}
          roughness={0.9}
          metalness={0}
        />
      </Sphere>
    </Float>
  );
}