import { Sphere } from "@react-three/drei";

export default function Moon() {
  return (
    <Sphere args={[1, 64, 64]} position={[3, 1.5, 0]}>
      <meshStandardMaterial
        color="#f8f8f8"
        emissive="#dbeafe"
        emissiveIntensity={0.25}
      />
    </Sphere>
  );
}