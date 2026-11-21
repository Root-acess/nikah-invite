import { RSVP } from '../config';

export interface RsvpPayload {
  name: string;
  attending: 'Yes' | 'No';
  guests: number;
  events: string[];
  meal: 'Veg' | 'Non-veg' | '';
  /** Empty when the guest is not coming to an event that asks for arrival time. */
  arrival: string;
  message: string;
}

export type RsvpMode = 'live' | 'demo';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Sends the reply straight into your Google Form, so every answer lands in the
 * form's Responses sheet. Google does not return a readable response to other
 * websites, so we use "no-cors" and treat a network success as sent.
 * With no formId set, this runs in demo mode and saves nothing.
 */
export async function submitRsvp(p: RsvpPayload): Promise<RsvpMode> {
  if (!RSVP.formId) {
    console.warn('[RSVP] No Google Form configured. Set RSVP.formId in src/config.ts. Reply not saved:', p);
    await sleep(900);
    return 'demo';
  }

  const body = new URLSearchParams();
  const e = RSVP.entries;
  body.set(e.name, p.name);
  body.set(e.attending, p.attending);
  if (p.attending === 'Yes') {
    body.set(e.guests, String(p.guests));
    // A checkbox question takes the same entry once per ticked option.
    p.events.forEach((label) => body.append(e.events, label));
    body.set(e.meal, p.meal);
    if (p.arrival) body.set(e.arrival, p.arrival);
  }
  if (p.message.trim()) body.set(e.message, p.message.trim());

  await fetch(`https://docs.google.com/forms/d/e/${RSVP.formId}/formResponse`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  return 'live';
}
