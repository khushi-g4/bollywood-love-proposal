import { Howl } from "howler";

// Drop your own licensed copy of the track at public/audio/mast-magan.mp3.
// It's intentionally not bundled here — copyrighted audio can't be sourced
// automatically. Everything else (controls, fade, proposal-moment swap) is wired up.
let ambient: Howl | null = null;

export function getAmbientTrack() {
  if (!ambient) {
    ambient = new Howl({
      src: ["/audio/mast-magan.mp3"],
      loop: true,
      volume: 0,
      html5: true,
    });
  }
  return ambient;
}

export function fadeIn(howl: Howl, to = 0.5, duration = 1500) {
  howl.play();
  howl.fade(0, to, duration);
}

export function fadeOut(howl: Howl, duration = 1000) {
  howl.fade(howl.volume(), 0, duration);
  setTimeout(() => howl.pause(), duration);
}
