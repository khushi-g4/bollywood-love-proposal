import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSceneStore } from "../store/useSceneStore";

const EMOJIS = ["💕", "💖", "✨", "🌸", "💗", "⭐"];
const PARTICLE_COUNT = 28;

interface Particle {
  id: string;
  left: number;
  delay: number;
  duration: number;
  size: number;
  emoji: string;
  drift: number;
}

function useParticles(seed: number): Particle[] {
  return useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: `${seed}-${i}`,
        left: 4 + Math.random() * 92,
        delay: Math.random() * 0.7,
        duration: 2.6 + Math.random() * 2,
        size: 14 + Math.random() * 20,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        drift: (Math.random() - 0.5) * 140,
      })),
    [seed]
  );
}

/** Rising hearts/petals burst + message card, triggered by "Begin Our Story". */
export function Celebration() {
  const celebrating = useSceneStore((s) => s.celebrating);
  const seed = useSceneStore((s) => s.celebrationSeed);
  const setCelebrating = useSceneStore((s) => s.setCelebrating);
  const setIntensity = useSceneStore((s) => s.setIntensity);
  const particles = useParticles(seed);

  function handleClose() {
    setCelebrating(false);
    setIntensity(0.4);
  }

  return (
    <AnimatePresence>
      {celebrating && (
        <motion.div
          className="fixed inset-0 z-40 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute bottom-[-40px] select-none"
                style={{ left: `${p.left}%`, fontSize: p.size }}
                initial={{ y: 0, opacity: 0, x: 0 }}
                animate={{
                  y: -(typeof window !== "undefined" ? window.innerHeight * 1.1 : 900),
                  opacity: [0, 1, 1, 0],
                  x: p.drift,
                }}
                transition={{ duration: p.duration, delay: p.delay, ease: "easeOut" }}
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 flex h-full items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-auto mx-auto max-w-sm rounded-2xl border border-rose-300/25 bg-[#0a0e27]/85 backdrop-blur-xl px-8 py-10 text-center shadow-[0_0_60px_rgba(255,111,156,0.18)]"
            >
              <p className="text-3xl mb-3">💖</p>
              <h2 className="text-glow font-serif text-2xl text-white mb-2">Our Story Begins Now</h2>
              <p className="text-glow-sm text-[#e2e5fa] text-sm mb-6">
                Every star tonight is watching the start of something forever.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleClose}
                className="text-glow-sm rounded-full border border-rose-300/40 px-6 py-2 text-sm tracking-wide text-white hover:bg-rose-300/10 transition-colors"
              >
                Close ✦
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
