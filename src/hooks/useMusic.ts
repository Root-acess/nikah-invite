import { useCallback, useEffect, useRef, useState } from 'react';
import { MUSIC } from '../config';

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
  const [playing, setPlaying] = useState(false);

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
      fileRef.current = audio;
    }
    try {
      await fileRef.current.play();
      engineRef.current = 'file';
      setPlaying(true);
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
  }, []);

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
