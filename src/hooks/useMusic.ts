import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../config';
import { beat } from '../utils/beat';

/** The small part of the YouTube IFrame Player API we use. */
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(volume: number): void;
  destroy(): void;
}

interface YTApi {
  Player: new (
    el: HTMLElement,
    opts: {
      width: number;
      height: number;
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady: () => void;
        onStateChange: (e: { data: number }) => void;
        onError: () => void;
      };
    },
  ) => YTPlayer;
}

declare global {
  interface Window {
    YT?: YTApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

const YT_ENDED = 0;
const YT_GIVE_UP_MS = 8000;

interface SynthHandle {
  ctx: AudioContext;
}

/**
 * Last-resort fallback: a soft D-minor drone, used only when neither the YouTube track
 * nor public/audio/nasheed.mp3 can play, so the music button still does something.
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

type Engine = 'youtube' | 'file' | 'synth';

export function useMusic() {
  const fileRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SynthHandle | null>(null);
  const engineRef = useRef<Engine | null>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const ytReadyRef = useRef(false);
  const ytFailedRef = useRef(!MUSIC.youtubeId);
  const wantPlayRef = useRef(false);
  const analyserRef = useRef<{ ctx: AudioContext; analyser: AnalyserNode } | null>(null);
  const rafRef = useRef(0);
  const [playing, setPlaying] = useState(false);

  /** Publishes the loudness of the vocals as --beat (0 to 1) for glows, and as beat.value for the sparkles. */
  const startBeat = useCallback(() => {
    const a = analyserRef.current;
    if (!a) return;
    const data = new Uint8Array(a.analyser.frequencyBinCount);
    const root = document.documentElement.style;
    let smooth = 0;
    let peak = 0.05;
    let avg = -1;
    let shown = -1;
    const tick = () => {
      a.analyser.getByteFrequencyData(data);
      let sum = 0;
      const bins = 14; // roughly the vocal range at fftSize 256
      for (let i = 0; i < bins; i++) sum += data[i];
      const level = sum / (bins * 255);
      if (avg < 0) avg = level; // start from the first reading, not from silence
      avg += (level - avg) * 0.01; // slow average: what "normal" loudness is for this passage
      peak = Math.max(level, peak * 0.997, avg + 0.02); // adapts to how loud the track is
      const base = avg; // only moments louder than the passage's average count as a beat
      const target = Math.pow(Math.min(1, Math.max(0, (level - base) / (peak - base))), 1.3);
      smooth += (target - smooth) * 0.25;
      const value = Math.min(1, Math.max(0, smooth));
      beat.value = value;
      if (Math.abs(value - shown) > 0.01) {
        shown = value;
        root.setProperty('--beat', value.toFixed(2));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopBeat = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    beat.value = 0;
    document.documentElement.style.setProperty('--beat', '0');
  }, []);

  /** Routes the playing file through an analyser. If anything fails, the music still plays; only the pulse is lost. */
  const attachAnalyser = useCallback(
    async (audio: HTMLAudioElement) => {
      if (analyserRef.current) {
        startBeat();
        return;
      }
      try {
        // Routing audio from another origin (or a file:// page) through an analyser would silence it. Skip the pulse then.
        if (window.location.protocol === 'file:') return;
        if (new URL(audio.currentSrc || audio.src, window.location.href).origin !== window.location.origin) return;
        const Ctor: typeof AudioContext | undefined =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctor) return;
        const ctx = new Ctor();
        await ctx.resume();
        if (ctx.state !== 'running') {
          void ctx.close(); // routing through a stopped context would silence the music
          return;
        }
        const source = ctx.createMediaElementSource(audio);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        analyserRef.current = { ctx, analyser };
        if (!audio.paused) startBeat();
      } catch {
        // Visuals stay calm.
      }
    },
    [startBeat],
  );

  /** mp3 file first, then the synthesized drone. */
  const playLocal = useCallback(async () => {
    if (engineRef.current === 'synth' && synthRef.current) {
      await synthRef.current.ctx.resume();
      setPlaying(true);
      return;
    }
    if (!fileRef.current) {
      const audio = new Audio(MUSIC.src);
      audio.loop = true;
      audio.volume = MUSIC.volume;
      audio.preload = 'metadata';
      fileRef.current = audio;
    }
    try {
      await fileRef.current.play();
      engineRef.current = 'file';
      setPlaying(true);
      void attachAnalyser(fileRef.current);
    } catch {
      synthRef.current ??= createSynth();
      if (synthRef.current) {
        engineRef.current = 'synth';
        await synthRef.current.ctx.resume();
        setPlaying(true);
      } else {
        setPlaying(false);
      }
    }
  }, [attachAnalyser]);

  // Load the YouTube player once, hidden off-screen, so it is ready before the guest taps Open.
  useEffect(() => {
    const videoId = MUSIC.youtubeId;
    if (!videoId) return;

    let cancelled = false;
    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.style.cssText = 'position:fixed;left:-9999px;top:0;width:200px;height:200px;overflow:hidden;pointer-events:none;';
    const slot = document.createElement('div');
    host.appendChild(slot);
    document.body.appendChild(host);

    const fail = () => {
      if (cancelled || ytFailedRef.current) return;
      ytFailedRef.current = true;
      setPlaying(false);
      if (wantPlayRef.current) void playLocal();
    };

    const create = () => {
      if (cancelled || !window.YT || ytRef.current) return;
      const playerVars: Record<string, string | number> = {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        loop: 1,
        playlist: videoId, // a single video only loops when it is also its own playlist
        playsinline: 1,
        rel: 0,
      };
      if (window.location.protocol.startsWith('http')) playerVars.origin = window.location.origin;

      ytRef.current = new window.YT.Player(slot, {
        width: 200,
        height: 200,
        videoId,
        playerVars,
        events: {
          onReady: () => {
            ytReadyRef.current = true;
            ytRef.current?.setVolume(Math.round(MUSIC.volume * 100));
            if (wantPlayRef.current) ytRef.current?.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT_ENDED && wantPlayRef.current) ytRef.current?.playVideo();
          },
          onError: fail,
        },
      });
    };

    if (window.YT?.Player) {
      create();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        create();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        script.onerror = fail;
        document.head.appendChild(script);
      }
    }

    // If YouTube never answers (blocked, offline), fall back instead of staying silent.
    const timer = window.setTimeout(() => {
      if (!ytReadyRef.current) fail();
    }, YT_GIVE_UP_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      ytRef.current?.destroy();
      ytRef.current = null;
      ytReadyRef.current = false;
      host.remove();
    };
  }, [playLocal]);

  const play = useCallback(async () => {
    wantPlayRef.current = true;
    if (!ytFailedRef.current) {
      engineRef.current = 'youtube';
      if (ytReadyRef.current) ytRef.current?.playVideo(); // otherwise onReady starts it
      setPlaying(true);
      return;
    }
    await playLocal();
  }, [playLocal]);

  const pause = useCallback(() => {
    wantPlayRef.current = false;
    if (engineRef.current === 'youtube') ytRef.current?.pauseVideo();
    if (engineRef.current === 'file') fileRef.current?.pause();
    if (engineRef.current === 'synth') void synthRef.current?.ctx.suspend();
    stopBeat();
    setPlaying(false);
  }, [stopBeat]);

  const toggle = useCallback(() => {
    if (playing) pause();
    else void play();
  }, [playing, play, pause]);

  // Phones keep audio running after the guest switches apps or locks the screen. Pause then, resume on return.
  useEffect(() => {
    let resumeOnReturn = false;
    const onVisibility = () => {
      if (document.hidden) {
        resumeOnReturn = wantPlayRef.current;
        if (resumeOnReturn) pause();
      } else if (resumeOnReturn) {
        resumeOnReturn = false;
        void play();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [pause, play]);

  useEffect(
    () => () => {
      fileRef.current?.pause();
      void synthRef.current?.ctx.close();
    },
    [],
  );

  return { playing, start: play, toggle };
}
