import { useFrame } from "@react-three/fiber";
import { MathUtils } from "three";

export function CameraRig() {
  useFrame(({ camera, pointer, clock }, delta) => {
    const drift = clock.getElapsedTime();
    const targetX = pointer.x * 0.24 + Math.sin(drift * 0.08) * 0.12;
    const targetY = pointer.y * 0.16 + Math.cos(drift * 0.1) * 0.08;

    camera.position.x = MathUtils.damp(camera.position.x, targetX, 1.2, delta);
    camera.position.y = MathUtils.damp(camera.position.y, targetY, 1.2, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
