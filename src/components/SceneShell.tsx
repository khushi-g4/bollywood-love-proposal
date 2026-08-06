import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SceneShellProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  maxWidth?: string;
}

/**
 * Every non-hero scene renders inside this: a frosted card that sits over
 * the 3D scene, giving text a real background to read against instead of
 * floating directly on the sky. Keeps typography/contrast consistent
 * across the whole site.
 */
export function SceneShell({ eyebrow, title, children, maxWidth = "max-w-xl" }: SceneShellProps) {
  return (
    <div className="relative z-10 h-screen w-screen flex items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full ${maxWidth} max-h-[76vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#050814]/55 backdrop-blur-md px-6 py-10 sm:px-10 sm:py-12 text-center shadow-[0_0_80px_rgba(0,0,0,0.4)]`}
      >
        {eyebrow && (
          <p className="text-glow-sm text-rose-200 tracking-[0.3em] text-xs uppercase mb-4">
            {eyebrow}
          </p>
        )}
        <h2 className="text-glow font-serif text-3xl sm:text-4xl text-white mb-6">{title}</h2>
        <div className="text-glow text-[#e7eaff] leading-relaxed">{children}</div>
      </motion.div>
    </div>
  );
}
