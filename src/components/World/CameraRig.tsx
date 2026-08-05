import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export function CameraRig() {
  useFrame(({ camera, pointer, clock }, delta) => {
    const drift = clock.getElapsedTime();
    const targetX = pointer.x * 0.035 + Math.sin(drift * 0.045) * 0.018;
    const targetY = pointer.y * 0.02 + Math.cos(drift * 0.05) * 0.012;

    camera.position.x = MathUtils.damp(camera.position.x, targetX, 0.45, delta);
    camera.position.y = MathUtils.damp(camera.position.y, targetY, 0.45, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
