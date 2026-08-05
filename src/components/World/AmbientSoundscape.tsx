import { useEffect } from "react";

function createNoiseBuffer(context: AudioContext, seconds: number) {
  const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < data.length; index += 1) data[index] = Math.random() * 2 - 1;
  return buffer;
}

/** Browser-safe, procedural night ambience. It begins only after a user gesture. */
export function AmbientSoundscape() {
  useEffect(() => {
    let context: AudioContext | undefined;
    const sources: AudioBufferSourceNode[] = [];
    const intervals: number[] = [];

    const start = () => {
      if (context) return;
      context = new AudioContext();
      const master = context.createGain();
      master.gain.value = 0.028;
      master.connect(context.destination);

      const makeNoiseLayer = (frequency: number, gain: number) => {
        const source = context!.createBufferSource();
        const filter = context!.createBiquadFilter();
        const volume = context!.createGain();
        source.buffer = createNoiseBuffer(context!, 3);
        source.loop = true;
        filter.type = "lowpass";
        filter.frequency.value = frequency;
        volume.gain.value = gain;
        source.connect(filter).connect(volume).connect(master);
        source.start();
        sources.push(source);
      };

      makeNoiseLayer(380, 0.22); // distant wind
      makeNoiseLayer(1200, 0.035); // distant water and leaves

      const cricket = (frequency: number, offset: number) => {
        const oscillator = context!.createOscillator();
        const pulse = context!.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        pulse.gain.value = 0.0001;
        oscillator.connect(pulse).connect(master);
        oscillator.start();
        const tick = () => {
          const now = context!.currentTime;
          pulse.gain.cancelScheduledValues(now);
          pulse.gain.setValueAtTime(0.0001, now);
          pulse.gain.linearRampToValueAtTime(0.018, now + 0.015);
          pulse.gain.exponentialRampToValueAtTime(0.0001, now + 0.09 + offset);
        };
        tick();
        return window.setInterval(tick, 760 + offset * 460);
      };

      intervals.push(cricket(3850, 0.03), cricket(4420, 0.17));
    };

    window.addEventListener("pointerdown", start, { once: true });
    return () => {
      window.removeEventListener("pointerdown", start);
      intervals.forEach((interval) => window.clearInterval(interval));
      sources.forEach((source) => source.stop());
      context?.close();
    };
  }, []);

  return null;
}
