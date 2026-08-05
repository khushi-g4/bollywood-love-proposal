import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, ShaderMaterial, type Points } from "three";
import { createRandom, randomInRange } from "@/lib/random";
import type { WorldProps } from "./types";

type ParticleMode = "petal" | "firefly";

const vertexShader = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  varying float vPhase;
  void main() {
    vPhase = aPhase + uTime;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (105.0 / max(1.0, -mvPosition.z));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const petalFragmentShader = `
  varying float vPhase;
  void main() {
    vec2 p = gl_PointCoord - 0.5;
    float angle = sin(vPhase * 0.65) * 1.7;
    mat2 rotate = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    p = rotate * p;
    p.x *= 0.72;
    p.y += 0.07 * sin(p.x * 8.0);
    float petal = 1.0 - smoothstep(0.28, 0.5, length(p));
    petal *= 1.0 - smoothstep(0.32, 0.48, abs(p.y + 0.15));
    if (petal < 0.02) discard;
    vec3 blush = mix(vec3(0.68, 0.34, 0.48), vec3(1.0, 0.76, 0.84), gl_PointCoord.y);
    gl_FragColor = vec4(blush, petal * 0.42);
  }
`;

const fireflyFragmentShader = `
  varying float vPhase;
  void main() {
    float r = length(gl_PointCoord - 0.5) * 2.0;
    float glow = pow(max(0.0, 1.0 - r), 2.1);
    float pulse = 0.58 + 0.42 * sin(vPhase * 1.9);
    if (glow * pulse < 0.02) discard;
    gl_FragColor = vec4(vec3(1.0, 0.67, 0.18) * (1.0 + glow), glow * pulse);
  }
`;

function Particles({ count, mode }: { count: number; mode: ParticleMode }) {
  const points = useRef<Points>(null);
  const material = useRef<ShaderMaterial>(null);
  const { geometry, bases, phases } = useMemo(() => {
    const random = createRandom(mode === "petal" ? 711 : 401);
    const positions = new Float32Array(count * 3);
    const bases = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      bases[i * 3] = randomInRange(random, -9, 9);
      bases[i * 3 + 1] = randomInRange(random, mode === "petal" ? -2 : -1.5, 6);
      bases[i * 3 + 2] = randomInRange(random, -1.5, 3);
      positions.set(bases.subarray(i * 3, i * 3 + 3), i * 3);
      phases[i] = random() * Math.PI * 2;
      sizes[i] = mode === "petal" ? randomInRange(random, 0.85, 2.2) : randomInRange(random, 1.35, 2.8);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aSize", new BufferAttribute(sizes, 1));
    geometry.setAttribute("aPhase", new BufferAttribute(phases, 1));
    return { geometry, bases, phases };
  }, [count, mode]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (material.current) material.current.uniforms.uTime.value = time;
    if (!points.current) return;
    const position = points.current.geometry.getAttribute("position") as BufferAttribute;
    for (let i = 0; i < count; i += 1) {
      const phase = phases[i];
      if (mode === "petal") {
        const fall = (time * (0.17 + (phase % 0.13)) + phase) % 9;
        position.setXYZ(i, bases[i * 3] + Math.sin(time * 0.62 + phase) * 1.05 + Math.cos(time * 0.17 + phase) * 0.5, bases[i * 3 + 1] - fall, bases[i * 3 + 2] + Math.cos(time * 0.46 + phase) * 0.85);
      } else {
        position.setXYZ(i, bases[i * 3] + Math.sin(time * (0.72 + phase * 0.08) + phase) * 0.7, bases[i * 3 + 1] + Math.cos(time * (0.94 + phase * 0.05) + phase) * 0.45, bases[i * 3 + 2] + Math.sin(time * 0.35 + phase) * 0.2);
      }
    }
    position.needsUpdate = true;
  });

  return <points ref={points} geometry={geometry} frustumCulled={false}><shaderMaterial ref={material} transparent depthWrite={false} blending={AdditiveBlending} vertexShader={vertexShader} fragmentShader={mode === "petal" ? petalFragmentShader : fireflyFragmentShader} uniforms={{ uTime: { value: 0 } }} /></points>;
}

export function LivingParticles({ quality }: WorldProps) {
  const petalCount = quality === "ultra" ? 360 : quality === "high" ? 260 : quality === "medium" ? 150 : 55;
  const fireflyCount = quality === "ultra" ? 120 : quality === "high" ? 82 : quality === "medium" ? 50 : 22;
  return <><Particles count={petalCount} mode="petal" /><Particles count={fireflyCount} mode="firefly" /></>;
}
