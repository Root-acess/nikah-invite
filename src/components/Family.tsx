import { useState } from 'react';
import type { CSSProperties } from 'react';
import { family } from '../config';
import type { FamilyGroup } from '../types';

/** A group photo. Hover (or tap) a face to see the name. The names also sit below, for everyone. */
function GroupPhoto({ group }: { group: FamilyGroup }) {
  const [active, setActive] = useState<number | null>(null);
  const { photo } = group;

  return (
    <div className="family__group">
      <h3 className="family__title">{group.title}</h3>
      <div className="groupphoto" onClick={() => setActive(null)} style={{ '--spot': `${group.spot}%` } as CSSProperties}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
        {group.members.map((m, i) => (
          <button
            type="button"
            key={m.name}
            className={`spot ${active === i ? 'is-active' : ''}`}
            style={{ left: `${m.x}%`, top: `${m.y}%` }}
            aria-label={m.name}
            aria-pressed={active === i}
            onClick={(e) => {
              e.stopPropagation();
              setActive(active === i ? null : i);
            }}
          >
            <span className="spot__name">{m.name}</span>
          </button>
        ))}
      </div>
      <ul className="family__list">
        {group.members.map((m, i) => (
          <li key={m.name} className={active === i ? 'is-active' : ''} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Family() {
  return (
    <section className="section family" aria-labelledby="family-h">
      <div className="section__inner section__inner--wide">
        <p className="family__lead">{family.lead}</p>
        <h2 id="family-h" className="h2 family__name">
          {family.name}
        </h2>
        <div className="family__groups">
          {family.groups.map((g) => (
            <GroupPhoto key={g.title} group={g} />
          ))}
        </div>
        <p className="family__more">{family.closing}</p>
      </div>
    </section>
  );
}
