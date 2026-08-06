import { useSceneStore, type SceneId } from "../store/useSceneStore";

export const SCENE_ORDER: SceneId[] = [
  "hero",
  "story",
  "gallery",
  "letter",
  "reasons",
  "dreams",
  "proposal",
  "celebration",
];

/** Bottom-center Back/Next bar with progress dots. Hidden on the hero + final scene. */
export function Navigation() {
  const currentScene = useSceneStore((s) => s.currentScene);
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene);
  const index = SCENE_ORDER.indexOf(currentScene);
  const dotScenes = SCENE_ORDER.slice(1, -1);

  if (currentScene === "hero" || currentScene === "celebration") return null;

  function goTo(delta: number) {
    const nextIndex = Math.min(Math.max(index + delta, 0), SCENE_ORDER.length - 1);
    setCurrentScene(SCENE_ORDER[nextIndex]);
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 rounded-full border border-white/15 bg-[#050814]/70 backdrop-blur-md px-4 py-2.5 text-glow-sm">
      <button
        type="button"
        onClick={() => goTo(-1)}
        disabled={index <= 0}
        className="text-[#eef1fb] text-sm px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed hover:text-rose-300 transition-colors"
        aria-label="Back"
      >
        ← Back
      </button>

      <div className="flex items-center gap-1.5" aria-hidden>
        {dotScenes.map((id) => (
          <span
            key={id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              id === currentScene ? "w-5 bg-rose-300" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => goTo(1)}
        disabled={index >= SCENE_ORDER.length - 1}
        className="text-[#eef1fb] text-sm px-2 py-1 disabled:opacity-30 disabled:cursor-not-allowed hover:text-rose-300 transition-colors"
        aria-label="Next"
      >
        Next →
      </button>
    </div>
  );
}
