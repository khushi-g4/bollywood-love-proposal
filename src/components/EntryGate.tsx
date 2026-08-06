import { useState } from "react";
import type { KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface EntryGateProps {
  onEnter: () => void;
}

/**
 * A soft "tap to begin" curtain shown before the experience starts.
 * Browsers require a real user gesture before audio can play — this doubles
 * as that gesture, framed as part of the romantic moment rather than a
 * technical permission prompt.
 */
export function EntryGate({ onEnter }: EntryGateProps) {
  const [leaving, setLeaving] = useState(false);

  function handleEnter() {
    if (leaving) return;
    setLeaving(true);
    onEnter();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleEnter();
    }
  }

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          role="button"
          tabIndex={0}
          onClick={handleEnter}
          onKeyDown={handleKeyDown}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-[#050814]/85 backdrop-blur-md px-6 text-center cursor-pointer"
          aria-label="Enter"
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-rose-300/80 tracking-[0.35em] text-xs uppercase"
          >
            A moment, for you
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-3xl md:text-5xl text-[#eef1fb]"
          >
            Forever Begins Today
          </motion.h1>

          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-300/50 px-8 py-3 text-sm tracking-[0.15em] uppercase text-[#eef1fb] hover:bg-rose-300/10 transition-colors"
          >
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              ♥
            </motion.span>
            Tap to Enter
          </motion.span>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="text-[#aab2d8]/50 text-xs tracking-widest uppercase"
          >
            Best experienced with sound on
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
