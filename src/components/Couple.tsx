import { bride, groom } from '../config';
import type { Person } from '../types';
import { ArchOutline } from './Ornaments';

function Portrait({ person, role }: { person: Person; role: string }) {
  return (
    <figure className="portrait">
      <div className="archframe">
        <div className="archframe__art">
          <img
            className="portrait__img"
            src={person.photo}
            alt={`Illustration of ${person.name}, the ${role}`}
            width={900}
            height={1200}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: person.photoPosition }}
          />
        </div>
        <ArchOutline className="archframe__outline" />
      </div>
      <figcaption className="portrait__cap">
        <span className="portrait__name">{person.fullName}</span>
        <span className="portrait__parents">{person.parents}</span>
      </figcaption>
    </figure>
  );
}

export function Couple() {
  return (
    <section className="section couple" aria-labelledby="couple-h">
      <div className="section__inner section__inner--wide">
        <h2 id="couple-h" className="h2">
          The couple
        </h2>
        <div className="couple__grid">
          <Portrait person={groom} role="groom" />
          <Portrait person={bride} role="bride" />
        </div>
      </div>
    </section>
  );
}
