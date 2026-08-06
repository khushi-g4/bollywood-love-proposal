import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { useSceneStore } from "../store/useSceneStore";

export function CelebrationScene() {
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene);
  const setProposalAnswered = useSceneStore((s) => s.setProposalAnswered);
  const triggerCelebration = useSceneStore((s) => s.triggerCelebration);

  function handleReplay() {
    setProposalAnswered(false);
    setCurrentScene("hero");
  }

  return (
    <SceneShell eyebrow="Forever" title="Yes, Forever 💍" maxWidth="max-w-md">
      <p className="text-[#eef1fb] mb-8">
        From this night in the stars to every night after — forever begins today.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => triggerCelebration()}
          className="rounded-full border border-rose-300/50 px-6 py-2 text-sm text-[#eef1fb] hover:bg-rose-300/10 transition-colors text-glow-sm"
        >
          Celebrate Again ✦
        </motion.button>
        <motion.button
          type="button"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleReplay}
          className="rounded-full border border-white/25 px-6 py-2 text-sm text-[#eef1fb] hover:bg-white/10 transition-colors text-glow-sm"
        >
          Replay
        </motion.button>
      </div>
    </SceneShell>
  );
}
