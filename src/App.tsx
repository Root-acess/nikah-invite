import { useState } from 'react';
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
import { Rsvp } from './components/Rsvp';
import { Footer } from './components/Footer';
import { MusicButton } from './components/MusicButton';
import { useMusic } from './hooks/useMusic';

export default function App() {
  const [opened, setOpened] = useState(false);
  const music = useMusic();

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
      </main>
      <Footer />
      {opened && <MusicButton playing={music.playing} onToggle={music.toggle} />}
    </>
  );
}
