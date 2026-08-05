import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, TextureLoader, type Mesh, type Texture } from "three";
import moonTexture from "@/assets/images/moon/moon-source.png";

const keyColor = new Color("#00ff00");

function keyedMoonMaterial(texture: Texture) {
  texture.colorSpace = "srgb";
  return {
    transparent: true,
    depthWrite: false,
    onBeforeCompile: (shader: { fragmentShader: string }) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <map_fragment>",
        `#include <map_fragment>
         float keyDistance = distance(diffuseColor.rgb, vec3(${keyColor.r.toFixed(3)}, ${keyColor.g.toFixed(3)}, ${keyColor.b.toFixed(3)}));
         if (keyDistance < 0.32) discard;`,
      );
    },
  };
}

export function Moon() {
  const moon = useLoader(TextureLoader, moonTexture);
  const moonRef = useRef<Mesh>(null);
  const material = useMemo(() => keyedMoonMaterial(moon), [moon]);

  useFrame(({ clock }) => {
    if (moonRef.current) moonRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.03) * 0.015;
  });

  return (
    <group position={[-2.7, 1.55, -4.2]}>
      <pointLight color="#dbe8ff" intensity={8} distance={15} decay={2} />
      <mesh scale={2.45}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color="#9bb7ff" transparent opacity={0.045} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh scale={1.72}>
        <circleGeometry args={[1, 96]} />
        <meshBasicMaterial color="#c6d7ff" transparent opacity={0.09} blending={AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh ref={moonRef} scale={1.15}>
        <planeGeometry args={[2, 2, 1, 1]} />
        <meshBasicMaterial map={moon} {...material} />
      </mesh>
    </group>
  );
}
