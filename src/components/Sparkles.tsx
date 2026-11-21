import { useEffect, useRef } from 'react';
import { beat } from '../utils/beat';

interface Mote {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  speed: number;
  star: boolean;
}

/**
 * Slow gold motes drifting upward over the whole page, like lantern sparks.
 * They brighten a little with the music. Skipped for people who prefer reduced motion.
 */
export function Sparkles() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let motes: Mote[] = [];
    let raf = 0;
    let last = performance.now();

    const make = (anywhere: boolean): Mote => {
      const r = 0.8 + Math.random() * 2.2;
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 12,
        r,
        vy: 8 + Math.random() * 22, // pixels per second
        vx: (Math.random() - 0.5) * 8,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 1.6,
        star: r > 2.4,
      };
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 600 ? 22 : 42;
      motes = Array.from({ length: count }, () => make(true));
    };

    const drawStar = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y - r * 2.2);
      ctx.quadraticCurveTo(x, y, x + r * 2.2, y);
      ctx.quadraticCurveTo(x, y, x, y + r * 2.2);
      ctx.quadraticCurveTo(x, y, x - r * 2.2, y);
      ctx.quadraticCurveTo(x, y, x, y - r * 2.2);
      ctx.fill();
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const lift = 1 + beat.value * 1.6;
      ctx.clearRect(0, 0, w, h);

      for (const m of motes) {
        m.y -= m.vy * dt * lift;
        m.x += m.vx * dt + Math.sin(now / 1800 + m.phase) * 4 * dt;
        if (m.y < -12 || m.x < -12 || m.x > w + 12) Object.assign(m, make(false));

        const twinkle = 0.5 + 0.5 * Math.sin(now / 1000 * m.speed + m.phase);
        const alpha = (0.18 + 0.45 * twinkle) * (1 + beat.value * 0.6);

        const halo = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5);
        halo.addColorStop(0, `rgba(244, 214, 140, ${Math.min(1, alpha)})`);
        halo.addColorStop(1, 'rgba(244, 214, 140, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2);
        ctx.fill();

        if (m.star) {
          ctx.fillStyle = `rgba(255, 244, 214, ${Math.min(1, alpha + 0.2)})`;
          drawStar(m.x, m.y, m.r * 0.9);
        }
      }
      raf = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="sparkles" aria-hidden="true" />;
}
