import { motion } from "framer-motion";

export default function BlackScreen() {
  return (
    <motion.div
      className="fixed inset-0 bg-black z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{
        duration: 2.5,
        delay: 1,
        ease: "easeInOut",
      }}
    />
  );
}