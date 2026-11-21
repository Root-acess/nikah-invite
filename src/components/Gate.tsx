import { useEffect, useState } from 'react';
import { bride, groom } from '../config';
import { starPoints } from './Ornaments';

interface GateProps {
  onOpen: () => void;
}

// Pointed arch in a 600x1000 box. The legs run far below the box so the arch always reaches the screen edge.
const ARCH_OUTER = 'M40 3000V500C40 340 210 250 300 80C390 250 560 340 560 500V3000';
const ARCH_INNER = 'M68 3000V506C68 354 224 272 300 126C376 272 532 354 532 506V3000';

function DoorArt() {
  return (
    <svg viewBox="0 0 600 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <path d={`${ARCH_OUTER}Z`} fill="url(#gate-glow)" />
      <path className="gate__line" pathLength={1} d={ARCH_OUTER} strokeWidth="2.4" />
      <path className="gate__line gate__line--late" pathLength={1} d={ARCH_INNER} strokeWidth="1.2" />
      <polygon className="gate__apex" points={starPoints(8, 22, 9)} transform="translate(300 44)" />
    </svg>
  );
}

/**
 * Full-screen entrance: two filigree doors with a mihrab arch.
 * The tap that opens them is also what lets the browser play music.
 */
export function Gate({ onOpen }: GateProps) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (gone) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [gone]);

  if (gone) return null;

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    window.setTimeout(() => setGone(true), 2300);
  };

  return (
    <div className={`gate ${opening ? 'is-opening' : ''}`} role="dialog" aria-label="Wedding invitation">
      <div className="gate__door gate__door--l">
        <DoorArt />
      </div>
      <div className="gate__door gate__door--r">
        <DoorArt />
      </div>

      <div className="gate__center">
        <p className="gate__bismillah" lang="ar" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="gate__names">
          {groom.name} <span>&amp;</span> {bride.name}
        </p>
        <p className="gate__text">invite you to their Nikah</p>
        <button type="button" className="btn btn--solid gate__btn" onClick={open} autoFocus>
          Open invitation
        </button>
        <p className="gate__hint">Turn your sound on. A nasheed will play.</p>
      </div>
    </div>
  );
}
