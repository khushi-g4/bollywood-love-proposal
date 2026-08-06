import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { World } from "./components/world/World";
import { Hero } from "./scenes/Hero";
import { OurStory } from "./scenes/OurStory";
import { Gallery } from "./scenes/Gallery";
import { Letter } from "./scenes/Letter";
import { Reasons } from "./scenes/Reasons";
import { Dreams } from "./scenes/Dreams";
import { Proposal } from "./scenes/Proposal";
import { CelebrationScene } from "./scenes/CelebrationScene";
import { EntryGate } from "./components/EntryGate";
import { Celebration } from "./components/Celebration";
import { Navigation } from "./components/Navigation";
import { startAmbientMusic, setAmbientVolume } from "./lib/audio";
import { useSceneStore } from "./store/useSceneStore";

function SceneManager() {
  const currentScene = useSceneStore((s) => s.currentScene);

  return (
    <main className="relative h-screen w-screen">
      <AnimatePresence mode="wait">
        <div key={currentScene} className="absolute inset-0">
          {currentScene === "hero" && <Hero />}
          {currentScene === "story" && <OurStory />}
          {currentScene === "gallery" && <Gallery />}
          {currentScene === "letter" && <Letter />}
          {currentScene === "reasons" && <Reasons />}
          {currentScene === "dreams" && <Dreams />}
          {currentScene === "proposal" && <Proposal />}
          {currentScene === "celebration" && <CelebrationScene />}
        </div>
      </AnimatePresence>
    </main>
  );
}

function App() {
  const musicPlaying = useSceneStore((s) => s.musicPlaying);
  const setMusicPlaying = useSceneStore((s) => s.setMusicPlaying);
  const currentScene = useSceneStore((s) => s.currentScene);
  const setCurrentScene = useSceneStore((s) => s.setCurrentScene);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) return;
    if (musicPlaying) {
      startAmbientMusic();
      setAmbientVolume(0.35);
    } else {
      setAmbientVolume(0);
    }
  }, [musicPlaying, entered]);

  function handleEnter() {
    setEntered(true);
    setMusicPlaying(true);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <World />

      {/* Vignette: darkens edges/center slightly so every scene's text reads clearly
          without hiding the 3D scene behind it. */}
      <div className="fixed inset-0 z-[5] pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(2,4,12,0.1),rgba(2,4,12,0.5)_100%)]" />

      <EntryGate onEnter={handleEnter} />
      <Celebration />

      {entered && (
        <>
          <button
            type="button"
            onClick={() => setMusicPlaying(!musicPlaying)}
            className="text-glow-sm fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[#eef1fb] flex items-center justify-center hover:border-rose-300/60 transition-colors"
            aria-label={musicPlaying ? "Pause music" : "Play music"}
          >
            {musicPlaying ? "❚❚" : "♪"}
          </button>

          {currentScene !== "hero" && (
            <button
              type="button"
              onClick={() => setCurrentScene("hero")}
              className="text-glow-sm fixed top-6 left-6 z-50 w-11 h-11 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[#eef1fb] flex items-center justify-center hover:border-rose-300/60 transition-colors"
              aria-label="Return to start"
            >
              ♥
            </button>
          )}

          <Navigation />
        </>
      )}

      <SceneManager />
    </div>
  );
}

export default App;
