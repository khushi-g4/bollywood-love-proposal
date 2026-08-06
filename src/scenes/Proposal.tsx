import { useState } from "react";
import { motion } from "framer-motion";
import { SceneShell } from "../components/SceneShell";
import { proposalQuestion } from "../content/story";
import { useSceneStore } from "../store/useSceneStore";

export function Proposal() {
  const triggerCelebration = useSceneStore((s) => s.triggerCelebration);
  const setProposalAnswered = useSceneStore((s) => s.setProposalAnswered);
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const [dodges, setDodges] = useState(0);

  function dodgeNo() {
    setNoOffset({
      x: (Math.random() - 0.5) * 140,
      y: (Math.random() - 0.5) * 70,
    });
    setDodges((d) => Math.min(d + 1, 8));
  }

  function handleYes() {
    setProposalAnswered(true);
    setCurrentScene("celebration");
    triggerCelebration();
  }

  return (
    <SceneShell eyebrow="Chapter Six" title="One Last Thing..." maxWidth="max-w-md">
      <p className="text-lg text-[#eef1fb] mb-10">{proposalQuestion}</p>

      <div className="relative flex items-center justify-center gap-6 h-24">
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ scale: 1 + dodges * 0.06 }}
          onClick={handleYes}
          className="rounded-full bg-rose-300 text-[#050814] font-medium px-8 py-3 shadow-[0_0_30px_rgba(255,157,188,0.55)]"
        >
          Yes ♥
        </motion.button>

        <motion.button
          type="button"
          animate={{ x: noOffset.x, y: noOffset.y }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
          onMouseEnter={dodgeNo}
          onClick={dodgeNo}
          className="rounded-full border border-white/25 text-[#eef1fb] px-8 py-3 text-glow-sm"
        >
          No
        </motion.button>
      </div>

      {dodges > 2 && (
        <p className="mt-6 text-xs text-[#c9cfef]/80">
          (No seems to be running away from you...)
        </p>
      )}
    </SceneShell>
  );
}
