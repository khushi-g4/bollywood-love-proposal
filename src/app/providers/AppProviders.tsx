import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
