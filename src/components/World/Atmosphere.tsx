import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, type Group } from "three";
import type { WorldProps } from "./types";

/** Layered raymarched cloud volumes: no billboard or PNG cloud art. */
export function Atmosphere({ quality }: WorldProps) {
  const cloudBank = useRef<Group>(null);
  const segments = quality === "high" ? 34 : quality === "medium" ? 22 : 12;

  useFrame(({ clock }) => {
    if (cloudBank.current) cloudBank.current.position.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.35;
  });

  return (
    <>
      <fog attach="fog" args={[new Color("#030813"), 12, 36]} />
      <group ref={cloudBank}>
        <Clouds limit={segments * 4} range={40}>
          <Cloud seed={5} bounds={[11, 1.9, 1]} position={[-4.8, -2.15, -3]} segments={segments} volume={4.6} smallestVolume={0.35} growth={7} speed={0.025} fade={18} opacity={0.44} color="#7589aa" />
          <Cloud seed={18} bounds={[8.5, 1.3, 1]} position={[4.4, -1.65, -2.5]} segments={segments} volume={3.7} smallestVolume={0.25} growth={6} speed={0.04} fade={15} opacity={0.37} color="#9fafd0" />
          <Cloud seed={33} bounds={[5.5, 0.9, 0.8]} position={[3.0, 0.75, -4.35]} segments={Math.floor(segments * 0.65)} volume={2.5} smallestVolume={0.2} growth={4} speed={0.018} fade={10} opacity={0.22} color="#c2d1ef" />
        </Clouds>
      </group>
      <mesh position={[0, -4.4, -1.5]} scale={[12, 1.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#617497" transparent opacity={0.025} depthWrite={false} />
      </mesh>
    </>
  );
}
