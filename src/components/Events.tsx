import { events } from '../config';
import { useInView } from '../hooks/useInView';
import type { WeddingEvent } from '../types';
import { fmtDate, fmtTime } from '../utils/format';
import { Icon } from './Icons';

function EventItem({ event, last }: { event: WeddingEvent; last: boolean }) {
  const [ref, inView] = useInView<HTMLLIElement>(0.3);
  return (
    <li ref={ref} className={`timeline__item ${inView ? 'is-in' : ''} ${last ? 'is-last' : ''}`}>
      <span className="timeline__marker" aria-hidden="true" />
      <p className="timeline__ar" lang="ar" dir="rtl">
        {event.arabic}
      </p>
      <h3 className="timeline__title">{event.title}</h3>
      <p className="timeline__when">
        <span className="ico-row">
          <Icon name="calendar" />
          {fmtDate(event.startISO)}
        </span>
        <span className="ico-row">
          <Icon name="clock" />
          {event.timeLabel ?? `${fmtTime(event.startISO)} to ${fmtTime(event.endISO)}`}
        </span>
      </p>
      <p className="timeline__desc">{event.description}</p>
      {event.image ? (
        <img
          className="timeline__pic"
          src={event.image}
          alt={`Illustration of the ${event.title}`}
          width={event.imageSize?.[0]}
          height={event.imageSize?.[1]}
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="timeline__pic timeline__pic--plate" aria-hidden="true">
          <Icon name="dish" />
        </div>
      )}
    </li>
  );
}

export function Events() {
  return (
    <section className="section events" aria-labelledby="events-h">
      <div className="section__inner">
        <h2 id="events-h" className="h2">
          The celebrations
        </h2>
        <ol className="timeline">
          {events.map((e, i) => (
            <EventItem key={e.id} event={e} last={i === events.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}
