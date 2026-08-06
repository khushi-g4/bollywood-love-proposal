import { useEffect, useRef } from "react";
import { World } from "./components/world/World";
import { Hero } from "./scenes/Hero";
import { useLenisScroll } from "./hooks/useLenis";
import { getAmbientTrack, fadeIn, fadeOut } from "./lib/audio";
import { useSceneStore } from "./store/useSceneStore";

function App() {
  useLenisScroll();
  const musicPlaying = useSceneStore((s) => s.musicPlaying);
  const setMusicPlaying = useSceneStore((s) => s.setMusicPlaying);
  const trackRef = useRef(getAmbientTrack());

  useEffect(() => {
    const track = trackRef.current;
    if (musicPlaying) fadeIn(track);
    else fadeOut(track);
  }, [musicPlaying]);

  return (
    <div className="relative">
      <World />

      <button
        onClick={() => setMusicPlaying(!musicPlaying)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-[#eef1fb] flex items-center justify-center hover:border-rose-300/60 transition-colors"
        aria-label={musicPlaying ? "Pause music" : "Play music"}
      >
        {musicPlaying ? "❚❚" : "♪"}
      </button>

      <main className="relative">
        <Hero />
        {/* Milestone 2+ scenes (OurStory, Gallery, Letter, Reasons, Dreams, Proposal, Celebration)
            mount here in order, once approved. */}
        <section className="h-screen flex items-center justify-center relative z-10">
          <p className="text-[#aab2d8]/50 text-sm tracking-widest uppercase">
            Milestone 1 — The World. Next: Opening + Hero polish, then Our Story.
          </p>
        </section>
      </main>
    </div>
  );
}

export default App;
