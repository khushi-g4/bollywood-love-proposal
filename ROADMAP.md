# Forever Begins Today — Implementation Roadmap

**Client:** Khushi, for Vishal
**Stack:** React + Vite + TypeScript + Tailwind v4 + React Three Fiber + Drei + React Three Postprocessing + GSAP + Framer Motion + Lenis + Howler.js + Lucide React

## Architecture

```
src/
  scenes/            → one file per story scene (Hero, OurStory, Gallery, Letter, Reasons, Dreams, Proposal, Celebration)
  components/world/  → the persistent 3D world (Sky, Moon, Stars, Clouds, Fireflies, CherryBlossoms, ShootingStars)
  hooks/             → useWind, useScrollProgress, useReducedMotion, useLenis
  lib/                → audio.ts (Howler setup), motion.ts (shared GSAP/Framer presets)
  store/              → lightweight global state (proposal answered? music playing? current scene?)
```

The 3D world lives in a single fixed `<Canvas>` mounted once in `App.tsx`. It never unmounts. Scroll position (driven by Lenis) is read by the world to adjust camera height, moon brightness, cloud speed, and blossom density — so the environment reacts to where the visitor is in the story, without ever resetting.

## Milestones

Each milestone is built, then checked against the reference images before moving to the next. Nothing proceeds until the previous milestone reads as "cinematic," not "demo."

1. **The World (Scene 1)** — night sky, stars, moon with glow/halo, drifting clouds, fireflies, cherry blossoms, camera breathing, bloom + tone mapping. This is the environment every later scene sits inside. ← **we are building this now**
2. **Opening + Hero (Scenes 2–3)** — loading sequence, title reveal, "Begin Our Story" entrance, Lenis smooth scroll wired in.
3. **Our Story (Scene 4)** — scroll-triggered timeline (Feb 7 → Feb 14 → Mar 6 → breakdowns → Aug 7), GSAP scroll-pinned reveals.
4. **Gallery (Scene 5)** — your real photos, cinematic reveal on scroll/hover.
5. **Letter (Scene 6)** — handwritten-style letter, paper physicality, line-by-line reveal.
6. **Reasons I Love You (Scene 7)** — your real reasons, card reveal choreography.
7. **Future Dreams (Scene 8)** — your real dreams, final pre-proposal beat.
8. **Proposal (Scene 9)** — moon brightens, clouds slow, blossoms increase, music shifts, YES/NO interaction.
9. **Celebration (Scene 10)** — fireworks, final message, replay option.
10. **Polish pass** — responsiveness, reduced-motion, keyboard nav, performance/adaptive quality, deploy.

## What's needed from you before each content milestone
- Milestone 3: exact story text/dates (have them from before — will confirm wording)
- Milestone 4: your actual photos
- Milestone 5: letter wording (draft exists — confirm or rewrite)
- Milestone 6–7: real reasons + real dreams (currently placeholders)
- Milestone 8: final proposal question wording + song file (Mast Magan — can't be auto-embedded for copyright; you'll drop the mp3 in yourself)
