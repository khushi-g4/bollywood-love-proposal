import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, Color, ShaderMaterial } from "three";
import { createRandom, randomInRange } from "@/lib/random";
import type { WorldProps } from "./types";

const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  varying vec3 vColor;
  varying float vTwinkle;
  uniform float uTime;
  void main() {
    vColor = color;
    vTwinkle = 0.72 + 0.28 * sin(uTime * (0.55 + fract(aPhase) * 1.45) + aPhase * 6.28318);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (118.0 / max(1.0, -mvPosition.z));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  varying vec3 vColor;
  varying float vTwinkle;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float distanceFromCenter = length(p);
    float core = 1.0 - smoothstep(0.10, 0.48, distanceFromCenter);
    float halo = 1.0 - smoothstep(0.0, 0.5, distanceFromCenter);
    float alpha = core * vTwinkle + halo * 0.20;
    if (alpha < 0.012) discard;
    gl_FragColor = vec4(vColor * (1.0 + core * 0.65), alpha);
  }
`;

type LayerProps = { count: number; seed: number; size: [number, number]; opacity: number; radius: number };

function StarLayer({ count, seed, size, opacity, radius }: LayerProps) {
  const material = useRef<ShaderMaterial>(null);
  const geometry = useMemo(() => {
    const random = createRandom(seed);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const distance = randomInRange(random, radius * 0.58, radius);
      positions.set([distance * Math.sin(phi) * Math.cos(theta), distance * Math.cos(phi), distance * Math.sin(phi) * Math.sin(theta) - 12], index * 3);
      const temperature = random();
      const color = temperature > 0.84 ? new Color("#ffe4bd") : temperature < 0.14 ? new Color("#a9c9ff") : new Color("#f4f7ff");
      colors.set([color.r, color.g, color.b], index * 3);
      sizes[index] = randomInRange(random, size[0], size[1]) * (random() > 0.985 ? 2.2 : 1);
      phases[index] = random();
    }
    const result = new BufferGeometry();
    result.setAttribute("position", new BufferAttribute(positions, 3));
    result.setAttribute("color", new BufferAttribute(colors, 3));
    result.setAttribute("aSize", new BufferAttribute(sizes, 1));
    result.setAttribute("aPhase", new BufferAttribute(phases, 1));
    return result;
  }, [count, radius, seed, size]);

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial ref={material} vertexColors transparent depthWrite={false} depthTest blending={AdditiveBlending} vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{ uTime: { value: 0 } }} opacity={opacity} />
    </points>
  );
}

export function StarField({ quality }: WorldProps) {
  const count = quality === "high" ? 5600 : quality === "medium" ? 4200 : 1900;
  return <group><StarLayer count={Math.floor(count * 0.7)} seed={21} size={[0.55, 1.15]} opacity={0.55} radius={44} /><StarLayer count={Math.floor(count * 0.24)} seed={47} size={[0.9, 1.8]} opacity={0.75} radius={30} /><StarLayer count={Math.floor(count * 0.06)} seed={83} size={[1.5, 2.8]} opacity={0.9} radius={22} /></group>;
}
