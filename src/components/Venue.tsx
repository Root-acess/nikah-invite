import { bride, events, groom, venues } from '../config';
import type { VenueInfo } from '../types';
import { downloadIcs } from '../utils/ics';
import { Icon } from './Icons';

function VenueBlock({ venue }: { venue: VenueInfo }) {
  const q = encodeURIComponent(venue.mapQuery);
  const embed = `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
  const here = events.filter((e) => venue.eventIds.includes(e.id));

  return (
    <div className="venue__block">
      <h3 className="venue__heading">{venue.heading}</h3>
      <div className="venue__grid">
        <div className="venue__text">
          <p className="venue__city">{venue.city}</p>
          <p className="venue__name">{venue.name}</p>
          <p className="venue__addr">
            <Icon name="pin" />
            <span>{venue.address}</span>
          </p>
          <p className="venue__note">{venue.note}</p>
          <div className="venue__actions">
            <a className="btn btn--solid" href={directions} target="_blank" rel="noopener noreferrer">
              <Icon name="navigate" />
              Get directions
            </a>
            {here.map((e) => (
              <button
                key={e.id}
                type="button"
                className="btn"
                onClick={() => downloadIcs(e, venue, `${e.title}: ${groom.name} & ${bride.name}`)}
              >
                <Icon name="calendar" />
                Add {e.title} to calendar
              </button>
            ))}
          </div>
        </div>
        <div className="venue__map">
          <iframe title={`Map showing ${venue.name}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </div>
  );
}

export function Venue() {
  return (
    <section className="section venue" aria-labelledby="venue-h">
      <div className="section__inner section__inner--wide">
        <h2 id="venue-h" className="h2">
          Where to find us
        </h2>
        {venues.map((v) => (
          <VenueBlock key={v.name} venue={v} />
        ))}
      </div>
    </section>
  );
}
