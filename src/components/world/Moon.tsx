import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useSceneStore } from "../../store/useSceneStore";

/**
 * NASA-referenced procedural moon: a sphere with a fresnel rim-light shader
 * for the atmospheric halo, plus a soft sprite glow behind it for bloom to grab.
 */
export function Moon({ position = [10, 6, -18] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Sprite>(null);
  const intensity = useSceneStore((s) => s.intensity);

  const moonMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColorLit: { value: new THREE.Color("#f4f0e6") },
        uColorShadow: { value: new THREE.Color("#7d7a72") },
        uBrightness: { value: 1.0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewPosition = -mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 uColorLit;
        uniform vec3 uColorShadow;
        uniform float uBrightness;
        varying vec3 vNormal;
        varying vec3 vViewPosition;
        void main() {
          vec3 viewDir = normalize(vViewPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
          float lightTerm = max(dot(vNormal, normalize(vec3(0.4, 0.5, 0.8))), 0.0);
          vec3 base = mix(uColorShadow, uColorLit, lightTerm);
          vec3 rim = uColorLit * fresnel * 1.4;
          gl_FragColor = vec4((base + rim) * uBrightness, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Very slow rotation, camera-breathing scale
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.01;
    }
    moonMaterial.uniforms.uBrightness.value = 0.85 + intensity * 0.5 + Math.sin(t * 0.15) * 0.03;
    if (glowRef.current) {
      const s = 9 + intensity * 3 + Math.sin(t * 0.2) * 0.3;
      glowRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={position}>
      <sprite ref={glowRef} scale={[9, 9, 1]}>
        <spriteMaterial
          transparent
          depthWrite={false}
          color="#fff6e0"
          opacity={0.35}
          map={useMemo(() => {
            const canvas = document.createElement("canvas");
            canvas.width = canvas.height = 256;
            const ctx = canvas.getContext("2d")!;
            const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            grad.addColorStop(0, "rgba(255,246,224,0.9)");
            grad.addColorStop(0.4, "rgba(255,246,224,0.25)");
            grad.addColorStop(1, "rgba(255,246,224,0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
            return new THREE.CanvasTexture(canvas);
          }, [])}
        />
      </sprite>
      <mesh ref={meshRef} material={moonMaterial}>
        <sphereGeometry args={[2.4, 64, 64]} />
      </mesh>
      <pointLight color="#fff6e0" intensity={2.5} distance={60} decay={2} />
    </group>
  );
}
