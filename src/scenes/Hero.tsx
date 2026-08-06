import { motion } from "framer-motion";
import { useSceneStore } from "../store/useSceneStore";

export function Hero() {
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene);

  return (
    <section className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-glow font-serif text-5xl md:text-7xl text-white"
      >
        Forever Begins Today <span className="text-rose-300">❤</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1 }}
        className="text-glow mt-7 text-[#e2e5fa] max-w-md"
      >
        A story written in the stars, for you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.6 }}
        className="mt-7 flex items-center gap-3 text-rose-200"
      >
        <span className="h-px w-14 bg-rose-200/50" />
        <span className="text-glow-sm text-sm" aria-hidden>
          ♥
        </span>
        <span className="h-px w-14 bg-rose-200/50" />
      </motion.div>

      <motion.button
        type="button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.1 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setCurrentScene("story")}
        className="text-glow-sm mt-9 inline-flex items-center gap-2 rounded-full border border-rose-200/60 bg-[#050814]/25 px-8 py-3 text-sm tracking-wide text-white backdrop-blur-sm hover:bg-rose-300/15 transition-colors"
      >
        Begin Our Story <span aria-hidden>✦</span>
      </motion.button>
    </section>
  );
}
