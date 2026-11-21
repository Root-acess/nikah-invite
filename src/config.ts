import type { Contact, FamilyGroup, GalleryPhoto, Person, RsvpConfig, VenueInfo, WeddingEvent } from './types';

/**
 * Everything you need to edit lives in this file.
 * Times are Indian Standard Time (+05:30).
 */

export const groom: Person = {
  name: 'Iftekhar',
  fullName: 'Sayed Iftekhar Ali',
  parents: 'Beloved son of Sahib Sayed Tahir Ali & Sahiba Sakina Bano',
  avatar: 'groom',
};

export const bride: Person = {
  name: 'Sagufta',
  fullName: 'Sagufta Anjum',
  parents: 'Beloved daughter of Alhajji Mir Sarajul & Alhaja Maherun Nesha',
  avatar: 'bride',
};

export const tagline = 'Two hearts, one promise, a lifetime of togetherness.';

/**
 * The Nikah starts after Namaz-e-Zohar. startISO (1:00 PM) only drives the countdown and the
 * calendar file; guests see the timeLabel. Change startISO if the family wants it earlier or later.
 */
export const nikah: WeddingEvent = {
  id: 'nikah',
  title: 'Nikah',
  arabic: 'نِكَاح',
  startISO: '2026-12-23T13:00:00+05:30',
  endISO: '2026-12-23T16:00:00+05:30',
  timeLabel: 'After Namaz-e-Zohar',
  description: 'The Nikah ceremony, followed by dua, refreshments and lunch.',
};

export const events: WeddingEvent[] = [
  {
    id: 'mehndi',
    title: 'Mehndi',
    arabic: 'مہندی',
    startISO: '2026-12-22T17:00:00+05:30',
    endISO: '2026-12-22T21:00:00+05:30',
    timeLabel: 'Evening',
    description: 'An evening of henna, songs and family, the day before the Nikah.',
  },
  nikah,
];

export const venue: VenueInfo = {
  name: 'Woodland Odisha Restaurant & Convention',
  address: 'State Highway 60, Anantapur, Bhubaneswar, Jagannathpur, Odisha – 751032',
  city: 'Bhubaneswar, Odisha',
  mapQuery: 'Woodland Odisha Restaurant & Convention, State Highway 60, Anantapur, Bhubaneswar, Odisha 751032',
  note: 'About 3 km from Phulnakhara Square. The Mehndi and the Nikah are both held here.',
};

/** "A few words from the heart". One array per couplet. */
export const poem: string[][] = [
  ['Do dilon ka khoobsurat fasana hai,', 'Mohabbat se saja ek naya zamana hai.'],
  ['Har khushi mein aap shaamil ho jaayein,', 'Yahi hamara dil se arz kiya jaana hai.'],
];

export const family = {
  lead: 'With love & best wishes from',
  name: 'The Sayyed family',
  groups: [
    { title: 'Our little ones', names: ['Ameerah', 'Mahenoor', 'Shayan', 'Mehewish'] },
    { title: 'Brothers', names: ['Ateshyam', 'Arbab', 'Aanwar', 'Aamant', 'Arman'] },
    { title: 'Sisters', names: ['Sawa Kanwal', 'Tarranum', 'Zannat'] },
  ] as FamilyGroup[],
  closing: 'and all family members',
};

export const contacts: Contact[] = [
  { name: 'Sayed Mauzam Ali', phone: '93371 85006' },
  { name: 'Sayed Ateshyam Ali', phone: '78281 44411' },
  { name: 'Sayed Iftekhar Ali', phone: '99380 72244' },
];

export const closing = {
  message: 'Your gracious presence, warm wishes and heartfelt blessings will make our celebration truly memorable.',
  line: 'We look forward to celebrating with you.',
};

/**
 * Venue photos. Save your own photos in public/photos/ with these names and they appear automatically.
 * Any file that is missing is skipped, and the whole section hides if none exist.
 */
const photo = (n: number) => `${import.meta.env.BASE_URL}photos/venue-${n}.jpg`;
export const gallery: GalleryPhoto[] = [
  { src: photo(1), alt: 'Woodland Odisha Restaurant & Convention, photo 1', tall: true },
  { src: photo(2), alt: 'Woodland Odisha Restaurant & Convention, photo 2', wide: true },
  { src: photo(3), alt: 'Woodland Odisha Restaurant & Convention, photo 3' },
  { src: photo(4), alt: 'Woodland Odisha Restaurant & Convention, photo 4' },
  { src: photo(5), alt: 'Woodland Odisha Restaurant & Convention, photo 5', tall: true },
  { src: photo(6), alt: 'Woodland Odisha Restaurant & Convention, photo 6', wide: true },
];

export const MUSIC = {
  /** Put your nasheed at public/audio/nasheed.mp3 */
  src: `${import.meta.env.BASE_URL}audio/nasheed.mp3`,
  volume: 0.55,
};

/**
 * Google Form setup (full steps are in README.md).
 * Option labels in the form must match the text below exactly.
 * Attending: Yes / No. Meal: Veg / Non-veg.
 */
export const RSVP: RsvpConfig = {
  formId: '',
  entries: {
    name: 'entry.0000000001',
    attending: 'entry.0000000002',
    guests: 'entry.0000000003',
    events: 'entry.0000000004',
    meal: 'entry.0000000005',
    arrival: 'entry.0000000006',
    message: 'entry.0000000007',
  },
  eventOptions: [
    { label: 'Mehndi, Tuesday 22 December', asksArrival: false },
    { label: 'Nikah and lunch, Wednesday 23 December', asksArrival: true },
  ],
  arrivalSlots: ['Before 12:00 PM', '12:00 PM to 1:30 PM', '1:30 PM to 3:00 PM', 'After 3:00 PM'],
  replyBy: '',
};
