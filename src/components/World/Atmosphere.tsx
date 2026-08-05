import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, type Group } from "three";
import type { WorldProps } from "./types";

export function Atmosphere({ quality }: WorldProps) {
  const clouds = useRef<Group>(null);
  const mist = useRef<Group>(null);
  const cloudLayers = useMemo(() => Array.from({ length: quality === "low" ? 3 : 7 }, (_, index) => ({
    x: -9 + index * 3.1,
    y: -2.7 + (index % 3) * 0.65,
    z: -3 - index * 0.35,
    scale: 2.6 + (index % 2) * 1.2,
  })), [quality]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    if (clouds.current) clouds.current.position.x = Math.sin(elapsed * 0.035) * 1.1;
    if (mist.current) mist.current.position.x = Math.cos(elapsed * 0.06) * 0.65;
  });

  return (
    <>
      <fog attach="fog" args={[new Color("#08060d"), 13, 34]} />
      <group ref={clouds}>
        {cloudLayers.map((cloud, index) => (
          <mesh key={index} position={[cloud.x, cloud.y, cloud.z]} scale={[cloud.scale, cloud.scale * 0.35, 1]} rotation={[0, 0, index * 0.15]}>
            <circleGeometry args={[1, 40]} />
            <meshBasicMaterial color={index % 2 ? "#7985a3" : "#454b67"} transparent opacity={0.045} depthWrite={false} blending={AdditiveBlending} />
          </mesh>
        ))}
      </group>
      <group ref={mist} position={[0, -3.5, -1]}>
        {[-6, -2, 2, 6].map((x) => (
          <mesh key={x} position={[x, 0, 0]} scale={[5.5, 0.8, 1]}>
            <circleGeometry args={[1, 48]} />
            <meshBasicMaterial color="#a8b5d7" transparent opacity={0.025} depthWrite={false} blending={AdditiveBlending} />
          </mesh>
        ))}
      </group>
    </>
  );
}
