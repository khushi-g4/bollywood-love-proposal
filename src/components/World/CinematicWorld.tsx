import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Suspense } from "react";
import { CanvasRoot } from "@/components/canvas/CanvasRoot";
import { useQualityTier } from "@/hooks/useQualityTier";
import { Atmosphere } from "./Atmosphere";
import { CameraRig } from "./CameraRig";
import { LivingParticles } from "./LivingParticles";
import { Moon } from "./Moon";
import { ShootingStars } from "./ShootingStars";
import { Sky } from "./Sky";
import { StarField } from "./StarField";

export function CinematicWorld() {
  const quality = useQualityTier();
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <CanvasRoot>
        <Suspense fallback={null}>
          <Sky />
          <ambientLight intensity={0.34} color="#92a7d1" />
          <directionalLight position={[5, 6, 8]} intensity={1.8} color="#c9ddff" castShadow />
          <CameraRig />
          <StarField quality={quality} />
          <Moon />
          <Atmosphere quality={quality} />
          <ShootingStars quality={quality} />
          <LivingParticles quality={quality} />
          <EffectComposer multisampling={0} enabled={quality !== "low"}>
            <Bloom intensity={1.1} luminanceThreshold={0.45} luminanceSmoothing={0.55} mipmapBlur />
            <Vignette offset={0.28} darkness={0.78} />
          </EffectComposer>
        </Suspense>
      </CanvasRoot>
    </div>
  );
}
