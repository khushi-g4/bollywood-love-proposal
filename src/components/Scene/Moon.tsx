import { Float, Sphere } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

import moonTexture from "../../assets/images/moon.jpg";

export default function Moon() {
  const texture = useLoader(TextureLoader, moonTexture);

  return (
    <Float
      speed={1}
      rotationIntensity={0.15}
      floatIntensity={0.5}
    >
      <Sphere args={[0.65, 128, 128]} position={[4.8, 2.6, 0]}>
        <meshStandardMaterial
          map={texture}
          roughness={1}
          metalness={0}
          emissive="#dbeafe"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}