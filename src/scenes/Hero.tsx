import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.3 }}
        className="text-rose-300/80 tracking-[0.35em] text-xs uppercase mb-6"
      >
        Khushi &amp; Vishal
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-serif text-5xl md:text-7xl text-[#eef1fb]"
      >
        Forever Begins Today
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.4 }}
        className="mt-8 text-[#aab2d8] max-w-md"
      >
        A story written in the stars, for you.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-12 text-[#aab2d8]/60 text-xs tracking-[0.2em] uppercase animate-bounce"
      >
        Scroll to begin
      </motion.div>
    </section>
  );
}
