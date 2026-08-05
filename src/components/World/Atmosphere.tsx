import { Cloud, Clouds } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Color, type Group } from "three";
import type { WorldProps } from "./types";

/** Layered raymarched cloud volumes: no billboard or PNG cloud art. */
export function Atmosphere({ quality }: WorldProps) {
  const cloudBank = useRef<Group>(null);
  const segments = quality === "ultra" ? 26 : quality === "high" ? 18 : quality === "medium" ? 13 : 8;

  useFrame(({ clock }) => {
    if (cloudBank.current) cloudBank.current.position.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.35;
  });

  return (
    <>
      <fog attach="fog" args={[new Color("#030813"), 12, 36]} />
      <group ref={cloudBank}>
        <Clouds limit={segments * 3} range={34}>
          <Cloud seed={5} bounds={[7.2, 1.15, 0.8]} position={[-5.3, -2.7, -3]} segments={segments} volume={3.1} smallestVolume={0.3} growth={6} speed={0.018} fade={16} opacity={0.18} color="#53627c" />
          <Cloud seed={18} bounds={[5.7, 0.95, 0.75]} position={[5.2, -2.4, -2.7]} segments={segments} volume={2.8} smallestVolume={0.25} growth={5} speed={0.028} fade={14} opacity={0.16} color="#647494" />
          <Cloud seed={71} bounds={[2.6, 0.28, 0.45]} position={[3.35, 1.22, -3.55]} segments={Math.floor(segments * 0.55)} volume={1.05} smallestVolume={0.16} growth={2.3} speed={0.01} fade={7} opacity={0.075} color="#b4c7e7" />
        </Clouds>
      </group>
      <mesh position={[0, -4.4, -1.5]} scale={[12, 1.4, 1]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial color="#617497" transparent opacity={0.025} depthWrite={false} />
      </mesh>
    </>
  );
}
