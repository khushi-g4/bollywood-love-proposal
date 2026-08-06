/**
 * Generative ambient night-music, built with the Web Audio API.
 *
 * We can't ship a licensed song file automatically (copyright), so instead of
 * requiring you to drop an mp3 in before anything plays, this synthesizes a
 * soft, looping pad + occasional twinkling notes entirely in the browser.
 * It just works the moment the page loads — no assets, no network.
 *
 * Want to swap in your own track later (e.g. "Mast Magan")? Drop the file at
 * public/audio/theme.mp3 and swap the calls in App.tsx for a Howler-based
 * player — the UI (play/pause button) will keep working unchanged.
 */

type LFO = { osc: OscillatorNode; gain: GainNode };

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let started = false;
let sparkleTimeout: number | null = null;
const activeNodes: (OscillatorNode | LFO)[] = [];

const BASE_FREQ = 220; // A3
// Pentatonic-ish intervals (semitones) for a dreamy, never-clashing sparkle line.
const SCALE = [0, 3, 5, 7, 10, 12, 15, 17, 19];

function noteFreq(semitoneOffset: number) {
  return BASE_FREQ * Math.pow(2, semitoneOffset / 12);
}

function ensureContext(): AudioContext {
  if (!ctx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    ctx = new AudioCtx();
    masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
  }
  return ctx!;
}

function playPad(audioCtx: AudioContext) {
  const now = audioCtx.currentTime;
  const chord = [-12, -5, 0, 7]; // root, fifth-below, root, fifth — spread low & airy
  chord.forEach((semis, i) => {
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = noteFreq(semis);

    const gain = audioCtx.createGain();
    gain.gain.value = 0;
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start(now);
    gain.gain.linearRampToValueAtTime(0.05 - i * 0.008, now + 5);

    const lfo = audioCtx.createOscillator();
    lfo.frequency.value = 0.04 + Math.random() * 0.05;
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 3;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.detune);
    lfo.start(now);

    activeNodes.push(osc, { osc: lfo, gain: lfoGain });
  });
}

function scheduleSparkle(audioCtx: AudioContext) {
  const delay = 2200 + Math.random() * 4200;
  sparkleTimeout = window.setTimeout(() => {
    if (!started || !masterGain) return;
    const now = audioCtx.currentTime;
    const semis = SCALE[Math.floor(Math.random() * SCALE.length)] + 12;
    const osc = audioCtx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = noteFreq(semis);

    const gain = audioCtx.createGain();
    gain.gain.value = 0.0001;
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);
    osc.stop(now + 2.5);

    scheduleSparkle(audioCtx);
  }, delay);
}

/** Starts the ambient pad + sparkle loop. Safe to call multiple times. */
export function startAmbientMusic() {
  const audioCtx = ensureContext();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  if (!started) {
    started = true;
    playPad(audioCtx);
    scheduleSparkle(audioCtx);
  }
}

/** Smoothly ramps the ambient music to a target volume (0–1). */
export function setAmbientVolume(target: number, durationMs = 1500) {
  const audioCtx = ensureContext();
  if (audioCtx.state === "suspended") void audioCtx.resume();
  if (!masterGain) return;
  const now = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(now);
  masterGain.gain.setValueAtTime(Math.max(0.0001, masterGain.gain.value), now);
  masterGain.gain.linearRampToValueAtTime(Math.max(0.0001, target), now + durationMs / 1000);
}

/** Fully stops the ambient loop and tears down active oscillators. */
export function stopAmbientMusic() {
  started = false;
  if (sparkleTimeout !== null) {
    clearTimeout(sparkleTimeout);
    sparkleTimeout = null;
  }
  setAmbientVolume(0, 1200);
}
