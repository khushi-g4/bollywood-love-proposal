import { Canvas } from "@react-three/fiber";
import type { PropsWithChildren } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { canvasCamera, canvasGl } from "@/config/three";

/** Shared WebGL boundary; cinematic scene content belongs to feature modules. */
export function CanvasRoot({ children }: PropsWithChildren) {
  return (
    <Canvas
      camera={canvasCamera}
      dpr={[1, 1.75]}
      gl={canvasGl}
      shadows="soft"
      aria-label="Decorative cinematic background"
      onCreated={({ gl }) => {
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.15;
        gl.outputColorSpace = SRGBColorSpace;
      }}
    >
      {children}
    </Canvas>
  );
}
