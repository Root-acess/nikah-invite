import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../config';

interface SynthHandle {
  ctx: AudioContext;
}

/**
 * Fallback used only when public/audio/nasheed.mp3 is missing:
 * a soft D-minor drone so the music button still does something.
 */
function createSynth(): SynthHandle | null {
  const Ctor: typeof AudioContext | undefined =
    window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;

  const ctx = new Ctor();
  const master = ctx.createGain();
  master.gain.setValueAtTime(0, ctx.currentTime);
  master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 4);
  master.connect(ctx.destination);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1100;
  filter.connect(master);

  [146.83, 220, 293.66, 349.23, 440].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    osc.detune.value = (i - 2) * 5;

    const gain = ctx.createGain();
    gain.gain.value = 0.16;

    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.06 + i * 0.025;
    const depth = ctx.createGain();
    depth.gain.value = 0.1;
    lfo.connect(depth);
    depth.connect(gain.gain);

    osc.connect(gain);
    gain.connect(filter);
    osc.start();
    lfo.start();
  });

  return { ctx };
}

export function useMusic() {
  const fileRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const engineRef = useRef<'file' | 'synth' | null>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(async () => {
    if (engineRef.current === 'synth' && synthRef.current) {
      await synthRef.current.ctx.resume();
      setPlaying(true);
      return;
    }
    if (!fileRef.current) {
      const audio = new Audio(MUSIC.src);
      audio.loop = true;
      audio.volume = MUSIC.volume;
      fileRef.current = audio;
    }
    try {
      await fileRef.current.play();
      engineRef.current = 'file';
      setPlaying(true);
    } catch {
      // File missing or unsupported: fall back to the synthesized drone.
      synthRef.current ??= createSynth();
      if (synthRef.current) {
        engineRef.current = 'synth';
        await synthRef.current.ctx.resume();
        setPlaying(true);
      }
    }
  }, []);

  const pause = useCallback(() => {
    if (engineRef.current === 'file') fileRef.current?.pause();
    if (engineRef.current === 'synth') void synthRef.current?.ctx.suspend();
    setPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    if (playing) pause();
    else void play();
  }, [playing, play, pause]);

  useEffect(
    () => () => {
      fileRef.current?.pause();
      void synthRef.current?.ctx.close();
    },
    [],
  );

  return { playing, start: play, toggle };
}
