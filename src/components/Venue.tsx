import { bride, groom, nikah, venue } from '../config';
import { downloadIcs } from '../utils/ics';

export function Venue() {
  const q = encodeURIComponent(venue.mapQuery);
  const embed = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  return (
    <section className="section venue" aria-labelledby="venue-h">
      <div className="section__inner section__inner--wide">
        <h2 id="venue-h" className="h2">
          Where to find us
        </h2>
        <div className="venue__grid">
          <div className="venue__text">
            <p className="venue__city">{venue.city}</p>
            <p className="venue__name">{venue.name}</p>
            <p className="venue__addr">{venue.address}</p>
            <p className="venue__note">{venue.note}</p>
            <div className="venue__actions">
              <a className="btn btn--solid" href={directions} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
              <button
                type="button"
                className="btn"
                onClick={() => downloadIcs(nikah, venue, `Nikah of ${groom.name} and ${bride.name}`)}
              >
                Add Nikah to calendar
              </button>
            </div>
          </div>
          <div className="venue__map">
            <iframe title={`Map showing ${venue.name}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </section>
  );
}
