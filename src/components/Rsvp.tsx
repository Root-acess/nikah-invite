import { useState } from 'react';
import type { FormEvent } from 'react';
import { RSVP, contacts } from '../config';
import { telOf } from '../utils/format';
import { submitRsvp } from '../utils/rsvp';
import type { RsvpMode } from '../utils/rsvp';
import { Crescent } from './Ornaments';

type Attending = 'Yes' | 'No' | '';
type Meal = 'Veg' | 'Non-veg' | '';

interface FormState {
  name: string;
  attending: Attending;
  guests: number;
  events: string[];
  meal: Meal;
  arrival: string;
  message: string;
}

type Errors = Partial<Record<'name' | 'attending' | 'events' | 'meal' | 'arrival', string>>;
type Status = 'idle' | 'sending' | 'done' | 'error';

const initial: FormState = { name: '', attending: '', guests: 1, events: [], meal: '', arrival: '', message: '' };
const MAX_GUESTS = 8;

/** Arrival time is only asked for events marked asksArrival (the Nikah day). */
const needsArrival = (events: string[]): boolean =>
  RSVP.eventOptions.some((o) => o.asksArrival && events.includes(o.label));

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = 'Enter your name so we know who is coming.';
  if (!f.attending) e.attending = 'Choose whether you can come.';
  if (f.attending === 'Yes') {
    if (f.events.length === 0) e.events = 'Choose at least one event you will attend.';
    if (!f.meal) e.meal = 'Choose Veg or Non-veg so we can plan the food.';
    if (needsArrival(f.events) && !f.arrival) e.arrival = 'Choose when you expect to arrive.';
  }
  return e;
}

function Contacts() {
  return (
    <div className="contacts">
      <h3 className="contacts__h">Questions? Contact us</h3>
      <ul className="contacts__list">
        {contacts.map((c) => (
          <li className="contacts__item" key={c.phone}>
            <span className="contacts__name">{c.name}</span>
            <a className="contacts__num" href={`tel:${telOf(c.phone)}`}>
              {c.phone}
            </a>
            <a
              className="contacts__wa"
              href={`https://wa.me/${telOf(c.phone).slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Message ${c.name} on WhatsApp`}
            >
              WhatsApp
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Rsvp() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [mode, setMode] = useState<RsvpMode>('live');
  const [sent, setSent] = useState<FormState | null>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    // Clear a field's error as soon as the guest fixes it.
    setErrors((prev) => {
      const next: Record<string, string | undefined> = { ...prev };
      delete next[key];
      return next as Errors;
    });
  };

  // Keep the chosen events in date order, whatever order they were ticked in.
  const toggleEvent = (label: string) => {
    const next = form.events.includes(label) ? form.events.filter((l) => l !== label) : [...form.events, label];
    set('events', RSVP.eventOptions.map((o) => o.label).filter((l) => next.includes(l)));
  };

  const going = form.attending === 'Yes';
  const asksArrival = needsArrival(form.events);

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');
    try {
      const result = await submitRsvp({
        name: form.name.trim(),
        attending: form.attending as 'Yes' | 'No',
        guests: form.guests,
        events: form.events,
        meal: form.meal,
        arrival: asksArrival ? form.arrival : '',
        message: form.message,
      });
      setMode(result);
      setSent({ ...form, arrival: asksArrival ? form.arrival : '' });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  const lede = RSVP.replyBy
    ? `Please reply by ${RSVP.replyBy}. Your answers help us plan the meal and the seating.`
    : 'Please reply so we can plan the meal and the seating.';

  if (status === 'done' && sent) {
    const first = sent.name.trim().split(' ')[0];
    return (
      <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-h">
        <div className="section__inner">
          <div className="rsvp__panel rsvp__done" role="status">
            <Crescent className="rsvp__crescent" />
            <h2 id="rsvp-h" className="h2">
              {sent.attending === 'Yes' ? `JazakAllahu khairan, ${first}` : `We will miss you, ${first}`}
            </h2>
            {sent.attending === 'Yes' ? (
              <>
                <p>We have your reply and look forward to seeing you.</p>
                <dl className="rsvp__summary">
                  <div>
                    <dt>Guests</dt>
                    <dd>{sent.guests}</dd>
                  </div>
                  <div>
                    <dt>Events</dt>
                    <dd>{sent.events.join(' and ')}</dd>
                  </div>
                  <div>
                    <dt>Meal</dt>
                    <dd>{sent.meal}</dd>
                  </div>
                  {sent.arrival && (
                    <div>
                      <dt>Arrival</dt>
                      <dd>{sent.arrival}</dd>
                    </div>
                  )}
                </dl>
              </>
            ) : (
              <p>Thank you for letting us know. You will be in our duas.</p>
            )}
            {mode === 'demo' && (
              <p className="rsvp__demo">
                Demo mode: this reply was not saved. Add your Google Form details in src/config.ts to collect real replies.
              </p>
            )}
          </div>
          <Contacts />
        </div>
      </section>
    );
  }

  return (
    <section className="section rsvp" id="rsvp" aria-labelledby="rsvp-h">
      <div className="section__inner">
        <h2 id="rsvp-h" className="h2">
          Will you join us?
        </h2>
        <p className="rsvp__lede">{lede}</p>

        <form className="rsvp__panel" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="rsvp-name">Your name</label>
            <input
              id="rsvp-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'err-name' : undefined}
            />
            {errors.name && (
              <p className="field__error" id="err-name" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <fieldset className="field">
            <legend>Can you come?</legend>
            <div className="chips">
              {(['Yes', 'No'] as const).map((v) => (
                <label className="chip" key={v}>
                  <input type="radio" name="attending" value={v} checked={form.attending === v} onChange={() => set('attending', v)} />
                  <span>{v === 'Yes' ? 'Yes, I will be there' : 'Sorry, I cannot'}</span>
                </label>
              ))}
            </div>
            {errors.attending && (
              <p className="field__error" role="alert">
                {errors.attending}
              </p>
            )}
          </fieldset>

          <div className={`rsvp__more ${going ? 'is-open' : ''}`}>
            <div className="rsvp__more-inner" inert={!going}>
              <div className="field">
                <span className="field__label" id="guests-label">
                  How many people are coming, including you?
                </span>
                <div className="stepper" role="group" aria-labelledby="guests-label">
                  <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))} aria-label="One fewer guest">
                    &minus;
                  </button>
                  <output aria-live="polite">{form.guests}</output>
                  <button type="button" onClick={() => set('guests', Math.min(MAX_GUESTS, form.guests + 1))} aria-label="One more guest">
                    +
                  </button>
                </div>
              </div>

              <fieldset className="field">
                <legend>Which events will you attend?</legend>
                <div className="chips">
                  {RSVP.eventOptions.map((o) => (
                    <label className="chip" key={o.label}>
                      <input type="checkbox" name="events" value={o.label} checked={form.events.includes(o.label)} onChange={() => toggleEvent(o.label)} />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
                {errors.events && (
                  <p className="field__error" role="alert">
                    {errors.events}
                  </p>
                )}
              </fieldset>

              <fieldset className="field">
                <legend>Meal preference</legend>
                <div className="chips">
                  {(['Veg', 'Non-veg'] as const).map((v) => (
                    <label className="chip" key={v}>
                      <input type="radio" name="meal" value={v} checked={form.meal === v} onChange={() => set('meal', v)} />
                      <span>{v}</span>
                    </label>
                  ))}
                </div>
                {errors.meal && (
                  <p className="field__error" role="alert">
                    {errors.meal}
                  </p>
                )}
              </fieldset>

              {asksArrival && (
                <fieldset className="field">
                  <legend>When will you arrive on 23 December?</legend>
                  <div className="chips">
                    {RSVP.arrivalSlots.map((slot) => (
                      <label className="chip" key={slot}>
                        <input type="radio" name="arrival" value={slot} checked={form.arrival === slot} onChange={() => set('arrival', slot)} />
                        <span>{slot}</span>
                      </label>
                    ))}
                  </div>
                  {errors.arrival && (
                    <p className="field__error" role="alert">
                      {errors.arrival}
                    </p>
                  )}
                </fieldset>
              )}
            </div>
          </div>

          <div className="field">
            <label htmlFor="rsvp-msg">A message or dua for the couple (optional)</label>
            <textarea id="rsvp-msg" rows={3} value={form.message} onChange={(e) => set('message', e.target.value)} />
          </div>

          {status === 'error' && (
            <p className="field__error" role="alert">
              We could not send your reply. Check your connection and press Send reply again.
            </p>
          )}

          <button type="submit" className="btn btn--solid rsvp__submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending' : 'Send reply'}
          </button>
        </form>

        <Contacts />
      </div>
    </section>
  );
}
