import { bride, groom, nikah, tagline, venue } from '../config';
import { fmtDate } from '../utils/format';
import { Crescent, Lantern, Rosette, Stars } from './Ornaments';

export function Hero({ revealed }: { revealed: boolean }) {
  return (
    <header className={`hero ${revealed ? 'is-revealed' : ''}`} id="top">
      <Stars count={90} />
      <Rosette className="hero__rosette" />
      <Lantern className="hero__lantern hero__lantern--l" />
      <Lantern className="hero__lantern hero__lantern--r" />

      <div className="hero__content">
        <Crescent className="hero__crescent hero__item" />
        <p className="hero__bismillah hero__item" lang="ar" dir="rtl">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="hero__lede hero__item">The Nikah of</p>
        <h1 className="hero__names">
          <span className="hero__name hero__name--a">{groom.name}</span>
          <span className="hero__amp hero__name--b" aria-hidden="true">
            &amp;
          </span>
          <span className="hero__name hero__name--c">{bride.name}</span>
        </h1>
        <p className="hero__sub hero__item">{tagline}</p>
        <p className="hero__date hero__item">{fmtDate(nikah.startISO)}</p>
        <p className="hero__place hero__item">{venue.city}</p>
      </div>

      <a className="hero__cue hero__item" href="#verse" aria-label="Scroll down to the invitation details">
        <span />
      </a>
    </header>
  );
}
