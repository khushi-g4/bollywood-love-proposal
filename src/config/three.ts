import type { CameraProps, GLProps } from "@react-three/fiber";

export const canvasCamera: CameraProps = { fov: 42, near: 0.1, far: 200, position: [0, 0, 8] };
export const canvasGl: GLProps = { antialias: true, alpha: true, powerPreference: "high-performance" };
