import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * A slow, wandering wind field. Direction and strength drift over time using
 * layered sine waves so motion never feels mechanical or looped.
 */
export function useWind() {
  const wind = useRef({ x: 0.15, z: 0.05, strength: 1 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    wind.current.x = Math.sin(t * 0.05) * 0.25 + Math.sin(t * 0.013) * 0.1;
    wind.current.z = Math.cos(t * 0.04) * 0.15;
    wind.current.strength = 0.6 + Math.sin(t * 0.07) * 0.4 + 0.4;
  });

  return wind;
}
