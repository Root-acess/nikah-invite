import { useEffect, useState } from 'react';

/** A thumb-reach shortcut to the RSVP form. Hidden while the form is on screen. */
export function ReplyPill() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById('rsvp');
    if (!target || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setHidden(Boolean(entry?.isIntersecting)), { threshold: 0.05 });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <a className={`reply-pill ${hidden ? 'is-hidden' : ''}`} href="#rsvp" aria-hidden={hidden} tabIndex={hidden ? -1 : 0}>
      Reply
    </a>
  );
}
