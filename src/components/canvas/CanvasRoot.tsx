import { Canvas } from "@react-three/fiber";
import type { PropsWithChildren } from "react";
import { canvasCamera, canvasGl } from "@/config/three";

/** Shared WebGL boundary; cinematic scene content belongs to feature modules. */
export function CanvasRoot({ children }: PropsWithChildren) {
  return (
    <Canvas camera={canvasCamera} dpr={[1, 2]} gl={canvasGl} shadows="soft" aria-label="Decorative cinematic background">
      {children}
    </Canvas>
  );
}
