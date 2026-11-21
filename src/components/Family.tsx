import { family } from '../config';

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
            <div className="family__group" key={g.title}>
              <h3 className="family__title">{g.title}</h3>
              <ul className="family__list">
                {g.names.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="family__more">{family.closing}</p>
      </div>
    </section>
  );
}
