import { useFrame, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { AdditiveBlending, TextureLoader, type Mesh } from "three";
import lunarColorTexture from "@/assets/images/moon/lroc-color-2k.jpg";
import lunarElevationTexture from "@/assets/images/moon/lroc-elevation-1k.jpg";

export function Moon() {
  const [colorMap, elevationMap] = useLoader(TextureLoader, [lunarColorTexture, lunarElevationTexture]);
  const moonRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!moonRef.current) return;
    const time = clock.getElapsedTime();
    moonRef.current.rotation.y = time * 0.008;
    moonRef.current.position.y = Math.sin(time * 0.12) * 0.035;
  });

  return (
    <group position={[3.35, 1.75, -4.8]}>
      <pointLight position={[1.8, 2.2, 3.8]} color="#d8e8ff" intensity={38} distance={22} decay={2} castShadow />
      <mesh scale={2.85}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial transparent depthWrite={false} blending={AdditiveBlending} vertexShader="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}" fragmentShader="varying vec2 vUv; void main(){float r=length(vUv-.5)*2.;float a=(1.-smoothstep(.26,1.,r))*0.11;gl_FragColor=vec4(.45,.64,1.,a);}" />
      </mesh>
      <mesh ref={moonRef} scale={1.22} rotation={[0.12, -0.65, 0.05]} castShadow receiveShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial map={colorMap} bumpMap={elevationMap} bumpScale={0.075} roughness={0.88} metalness={0} emissive="#07101e" emissiveIntensity={0.12} />
      </mesh>
    </group>
  );
}
