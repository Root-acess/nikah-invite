import { useId, useMemo } from 'react';
import type { CSSProperties } from 'react';

/** Points for an n-pointed star centred on 0,0. */
export const starPoints = (n: number, outer: number, inner: number, rotDeg = -90): string => {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = ((rotDeg + (i * 180) / n) * Math.PI) / 180;
    pts.push(`${(r * Math.cos(a)).toFixed(2)},${(r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(' ');
};

/** Pointed (mihrab) arch in a 0..1 box. Used for photo frames, clip paths and count tiles. */
export const ARCH_PATH_UNIT = 'M0 1V0.4C0 0.22 0.3 0.18 0.5 0C0.7 0.18 1 0.22 1 0.4V1Z';

const idx = (i: number): CSSProperties => ({ '--i': i }) as CSSProperties;

/** Eight-fold geometric rosette. Draws itself in, then turns slowly in two directions. */
export function Rosette({ className = '' }: { className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg className={`rosette ${className}`} viewBox="-200 -200 400 400" aria-hidden="true" focusable="false">
      <g className="rosette__outer">
        <circle r="194" pathLength={1} style={idx(0)} />
        <circle r="188" pathLength={1} style={idx(1)} />
        <polygon points={starPoints(8, 182, 100)} pathLength={1} style={idx(2)} />
        <polygon points={starPoints(8, 182, 100, -67.5)} pathLength={1} style={idx(3)} />
        <circle r="128" pathLength={1} style={idx(4)} />
      </g>
      <g className="rosette__inner">
        <polygon points={starPoints(8, 122, 66)} pathLength={1} style={idx(5)} />
        {petals.map((deg, i) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-84"
            rx="17"
            ry="40"
            transform={`rotate(${deg})`}
            pathLength={1}
            style={idx(6 + (i % 3))}
          />
        ))}
        <circle r="42" pathLength={1} style={idx(9)} />
        <polygon points={starPoints(8, 40, 20)} pathLength={1} style={idx(10)} />
      </g>
    </svg>
  );
}

export function Crescent({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <defs>
        <mask id={`${id}-m`}>
          <rect width="120" height="120" fill="#fff" />
          <circle cx="80" cy="50" r="40" fill="#000" />
        </mask>
        <radialGradient id={`${id}-g`} cx="40%" cy="50%" r="60%">
          <stop offset="0" stopColor="#F7DC9A" />
          <stop offset="1" stopColor="#E4B95B" />
        </radialGradient>
      </defs>
      <circle cx="58" cy="62" r="46" fill={`url(#${id}-g)`} mask={`url(#${id}-m)`} />
      <polygon points={starPoints(5, 10, 4)} transform="translate(86 48)" fill="#E4B95B" />
    </svg>
  );
}

/** A hanging fanoos lantern. The swing and flicker are done in CSS. */
export function Lantern({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 80 220" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`${id}-g`} cx="50%" cy="50%" r="55%">
          <stop offset="0" stopColor="#FFE9B0" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E4B95B" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <line x1="40" y1="0" x2="40" y2="58" stroke="#CDD6DB" strokeWidth="1" opacity="0.7" />
      <circle cx="40" cy="60" r="3" fill="none" stroke="#E4B95B" />
      <path d="M26 84 L40 64 L54 84 Z" fill="#0D3B34" stroke="#E4B95B" strokeWidth="1.2" />
      <g className="lantern__glow">
        <path d="M22 84 H58 L66 128 L58 172 H22 L14 128 Z" fill={`url(#${id}-g)`} stroke="#E4B95B" strokeWidth="1.4" />
        <polygon points={starPoints(8, 15, 6.5)} transform="translate(40 128)" fill="none" stroke="#06231F" strokeWidth="1.2" />
      </g>
      <path
        d="M32 84 L27 172 M48 84 L53 172 M40 84 V172 M16 128 H64"
        stroke="#E4B95B"
        strokeWidth="0.9"
        fill="none"
        opacity="0.8"
      />
      <path d="M28 172 H52 L46 188 H34 Z" fill="#0D3B34" stroke="#E4B95B" strokeWidth="1.2" />
      <path d="M40 188 V210" stroke="#E4B95B" strokeWidth="1" />
      <circle cx="40" cy="212" r="3" fill="#E4B95B" />
    </svg>
  );
}

export function Divider({ className = '' }: { className?: string }) {
  return (
    <svg className={`divider ${className}`} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <line x1="0" y1="12" x2="96" y2="12" />
      <polygon points={starPoints(8, 10, 4.2)} transform="translate(120 12)" />
      <line x1="144" y1="12" x2="240" y2="12" />
    </svg>
  );
}

/** Deterministic twinkling star field. */
export function Stars({ count = 80 }: { count?: number }) {
  const stars = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    return Array.from({ length: count }, () => ({
      x: rnd() * 100,
      y: rnd() * 100,
      size: rnd() < 0.12 ? 3 : rnd() < 0.5 ? 2 : 1.5,
      delay: rnd() * 6,
      dur: 3 + rnd() * 4,
    }));
  }, [count]);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((s, i) => (
        <span
          key={i}
          className="stars__dot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

export function ArchOutline({ className = '' }: { className?: string }) {
  return (
    <svg className={`arch-outline ${className}`} viewBox="0 0 1 1" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={ARCH_PATH_UNIT} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Hidden SVG that defines the arch clip path used by photo frames. */
export function ArchClipDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH_UNIT} />
        </clipPath>
        <radialGradient id="gate-glow" cx="50%" cy="48%" r="60%">
          <stop offset="0" stopColor="#1A6B5E" stopOpacity="0.9" />
          <stop offset="1" stopColor="#0D3B34" stopOpacity="1" />
        </radialGradient>
      </defs>
    </svg>
  );
}
