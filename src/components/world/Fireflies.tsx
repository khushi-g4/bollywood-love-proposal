import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 60;

export function Fireflies() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const data = useMemo(
    () =>
      Array.from({ length: COUNT }, () => ({
        base: new THREE.Vector3(
          THREE.MathUtils.randFloatSpread(30),
          Math.random() * 4 + 0.3,
          THREE.MathUtils.randFloatSpread(20) - 4
        ),
        speed: 0.3 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2,
        radius: 0.6 + Math.random() * 1.2,
      })),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    data.forEach((f, i) => {
      const angle = t * f.speed + f.offset;
      const x = f.base.x + Math.cos(angle) * f.radius;
      const y = f.base.y + Math.sin(angle * 1.3) * 0.4 + Math.sin(t * 0.4 + f.offset) * 0.3;
      const z = f.base.z + Math.sin(angle) * f.radius;
      dummy.position.set(x, y, z);
      const pulse = 0.6 + 0.4 * Math.sin(t * 2 + f.offset * 3);
      dummy.scale.setScalar(pulse * 0.06);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#e3b873" toneMapped={false} />
    </instancedMesh>
  );
}
