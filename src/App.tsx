import { useEffect, useState } from 'react';
import { ArchClipDefs } from './components/Ornaments';
import { Gate } from './components/Gate';
import { Hero } from './components/Hero';
import { Verse } from './components/Verse';
import { Countdown } from './components/Countdown';
import { Couple } from './components/Couple';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { Venue } from './components/Venue';
import { Words } from './components/Words';
import { Family } from './components/Family';
import { Forgiveness } from './components/Forgiveness';
import { Rsvp } from './components/Rsvp';
import { Footer } from './components/Footer';
import { MusicButton } from './components/MusicButton';
import { ReplyPill } from './components/ReplyPill';
import { Sparkles } from './components/Sparkles';
import { useMusic } from './hooks/useMusic';

/** Things that glide in as they scroll into view, with the group's own order as the stagger. */
const REVEAL_SELECTOR = [
  '.section__inner > :not(.timeline):not(.visually-hidden):not(.venue__grid):not(.couple__grid):not(.family__groups):not(.gallery__grid):not(.count):not(.contacts)',
  '.couple__grid > *',
  '.count__unit',
  '.venue__grid > *',
  '.family__group',
  '.gallery__tile',
  '.contacts__item',
  '.contacts__h',
].join(',');

function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    els.forEach((el) => {
      const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
      el.style.setProperty('--d', `${Math.min(index, 6) * 90}ms`);
      el.classList.add('rv');
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic();
  useScrollReveal();

  // Browsers only allow sound after a tap, so music starts when the gate is opened.
  const handleOpen = () => {
    setOpened(true);
    void music.start();
  };

  return (
    <>
      <ArchClipDefs />
      <Gate onOpen={handleOpen} />
      <Hero revealed={opened} />
      <main>
        <Verse />
        <Countdown />
        <Couple />
        <Events />
        <Venue />
        <Gallery />
        <Words />
        <Family />
        <Rsvp />
        <Forgiveness />
      </main>
      <Footer />
      {opened && <Sparkles />}
      {opened && <ReplyPill />}
      {opened && <MusicButton playing={music.playing} onToggle={music.toggle} />}
    </>
  );
}
