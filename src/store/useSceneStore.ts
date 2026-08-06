import { create } from "zustand";

export type SceneId =
  | "hero"
  | "story"
  | "gallery"
  | "letter"
  | "reasons"
  | "dreams"
  | "proposal"
  | "celebration";

interface SceneState {
  currentScene: SceneId;
  setCurrentScene: (s: SceneId) => void;
  scrollProgress: number; // 0 -> 1 across the whole page
  setScrollProgress: (p: number) => void;
  proposalAnswered: boolean;
  setProposalAnswered: (v: boolean) => void;
  musicPlaying: boolean;
  setMusicPlaying: (v: boolean) => void;
  intensity: number; // 0 -> 1, drives moon brightness / cloud speed / blossom density
  setIntensity: (v: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  currentScene: "hero",
  setCurrentScene: (currentScene) => set({ currentScene }),
  scrollProgress: 0,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  proposalAnswered: false,
  setProposalAnswered: (proposalAnswered) => set({ proposalAnswered }),
  musicPlaying: false,
  setMusicPlaying: (musicPlaying) => set({ musicPlaying }),
  intensity: 0.4,
  setIntensity: (intensity) => set({ intensity }),
}));
