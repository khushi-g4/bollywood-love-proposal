import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const STAR_COUNT = 7000;

/** A soft diagonal glow band suggesting the Milky Way, sitting behind the stars. */
function MilkyWayBand() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createLinearGradient(0, 0, 0, 128);
    grad.addColorStop(0, "rgba(180,190,255,0)");
    grad.addColorStop(0.5, "rgba(200,205,255,0.22)");
    grad.addColorStop(1, "rgba(180,190,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 128);
    // add fine noise speckles for texture
    for (let i = 0; i < 900; i++) {
      const x = Math.random() * 512;
      const y = 40 + (Math.random() - 0.5) * 70 * (1 - Math.abs(Math.random() - 0.5));
      const a = Math.random() * 0.5;
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fillRect(x, y, 1, 1);
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh rotation={[0, 0, 0.55]} position={[10, 20, -55]}>
      <planeGeometry args={[130, 34]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function StarField() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, phases, sizes] = useMemo(() => {
    const positions = new Float32Array(STAR_COUNT * 3);
    const phases = new Float32Array(STAR_COUNT);
    const sizes = new Float32Array(STAR_COUNT);
    for (let i = 0; i < STAR_COUNT; i++) {
      const radius = 60 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(THREE.MathUtils.randFloatSpread(2) * 0.5 + 0.5);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = Math.abs(radius * Math.cos(phi)) * 0.6 + 2;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta) - 20;
      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = Math.random() * 1.6 + 0.3;
    }
    return [positions, phases, sizes];
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        attribute float aPhase;
        attribute float aSize;
        uniform float uTime;
        varying float vTwinkle;
        void main() {
          vTwinkle = 0.5 + 0.5 * sin(uTime * (0.6 + aPhase * 0.1) + aPhase * 6.2831);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, d) * (0.35 + vTwinkle * 0.65);
          gl_FragColor = vec4(vec3(1.0, 0.98, 0.92), alpha);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    material.uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.002;
    }
  });

  return (
    <>
      <MilkyWayBand />
      <points ref={pointsRef} material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        </bufferGeometry>
      </points>
    </>
  );
}

/** Rare, fast streaks across the sky. */
export function ShootingStars({ frequency = 6000 }: { frequency?: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const active = useRef(false);
  const progress = useRef(0);
  const nextAt = useRef(performance.now() + Math.random() * frequency);
  const start = useRef(new THREE.Vector3());
  const dir = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const now = performance.now();
    if (!active.current && now > nextAt.current) {
      active.current = true;
      progress.current = 0;
      start.current.set(
        THREE.MathUtils.randFloatSpread(60) + 20,
        30 + Math.random() * 15,
        -30 - Math.random() * 20
      );
      dir.current.set(-1, -0.4, 0.1).normalize();
    }
    if (active.current && groupRef.current) {
      progress.current += delta * 1.6;
      const p = start.current.clone().add(dir.current.clone().multiplyScalar(progress.current * 20));
      groupRef.current.position.copy(p);
      groupRef.current.visible = true;
      (groupRef.current.children[0] as THREE.Mesh).scale.setScalar(
        Math.sin(Math.min(progress.current * 3, Math.PI))
      );
      if (progress.current > 1.2) {
        active.current = false;
        nextAt.current = now + Math.random() * frequency + 2000;
        groupRef.current.visible = false;
      }
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh rotation={[0, 0, Math.PI / 3.2]}>
        <planeGeometry args={[3, 0.03]} />
        <meshBasicMaterial color="#fff8e8" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}
