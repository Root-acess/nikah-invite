import type { Contact, FamilyGroup, GalleryPhoto, Person, RsvpConfig, VenueInfo, WeddingEvent } from './types';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

/**
 * Everything you need to edit lives in this file.
 * Times are Indian Standard Time (+05:30).
 */

export const groom: Person = {
  name: 'Iftekhar',
  fullName: 'Sayed Iftekhar Ali',
  parents: 'Beloved son of Sahib Sayed Tahir Ali & Sahiba Sakina Bano',
  photo: asset('people/groom.jpg'),
  photoPosition: '50% 18%',
};

export const bride: Person = {
  name: 'Sagufta',
  fullName: 'Sagufta Anjum',
  parents: 'Beloved daughter of Alhajji Mir Sarajul & Alhaja Maherun Nesha',
  photo: asset('people/bride.jpg'),
  photoPosition: '50% 12%',
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
  image: asset('events/nikah.jpg'),
  imageSize: [1200, 675],
};

/** Shown under the countdown. Written from the tabular / Umm al-Qura calendars; the date can differ by a day with moon sighting. */
export const nikahHijri = { en: '14 Rajab 1448 AH', ar: '١٤ رجب المرجب ١٤٤٨ هـ' };

export const walima: WeddingEvent = {
  id: 'walima',
  title: 'Walima',
  arabic: 'وَلِيمَة',
  startISO: '2027-01-02T19:30:00+05:30',
  endISO: '2027-01-02T22:30:00+05:30',
  timeLabel: '7:30 PM onwards',
  description: 'A grand celebration of love, family and togetherness. Guest arrival and reception, followed by dinner.',
};

export const events: WeddingEvent[] = [
  {
    id: 'mehndi',
    title: 'Mehndi & Haldi',
    arabic: 'مہندی اور ہلدی',
    startISO: '2026-12-22T17:00:00+05:30',
    endISO: '2026-12-22T21:00:00+05:30',
    timeLabel: 'Evening',
    description:
      'An evening of haldi, laughter and togetherness, celebrating love and cherished family bonds before the Nikah.',
    image: asset('events/mehndi-haldi.jpg'),
    imageSize: [1200, 800],
  },
  nikah,
  walima,
];

export const venues: VenueInfo[] = [
  {
    heading: 'Mehndi & Haldi and Nikah',
    eventIds: ['mehndi', 'nikah'],
    name: 'Woodland Odisha Restaurant & Convention',
    address: 'State Highway 60, Anantapur, Bhubaneswar, Jagannathpur, Odisha – 751032',
    city: 'Bhubaneswar, Odisha',
    mapQuery: 'Woodland Odisha Restaurant & Convention, State Highway 60, Anantapur, Bhubaneswar, Odisha 751032',
    note: 'About 3 km from Phulnakhara Square. The Mehndi & Haldi and the Nikah are both held here.',
  },
  {
    heading: 'Walima',
    eventIds: ['walima'],
    name: 'Aiwaan-E-Shaahi Marriage Hall & Banquet',
    address: 'Anand Bhawan Lane, Rourkela – 769901',
    city: 'Rourkela, Odisha',
    mapQuery: 'Aiwaan-E-Shaahi Marriage Hall & Banquet, Anand Bhawan Lane, Rourkela 769901',
    note: 'A unit of The Green Olive.',
  },
];

/** "A few words from the heart". */
export const quote = 'To love and be loved is to feel the sun from both sides.';

/** Shown near the end of the page. Edit freely. */
export const forgiveness = {
  title: 'A humble request for forgiveness',
  bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  paragraphs: [
    'As we begin this beautiful journey with the blessings of Almighty Allah, we humbly seek your forgiveness for anything that may have caused you hurt, inconvenience or displeasure.',
    'If, at any time before, during or after the Nikah celebrations, our words, actions or circumstances have unintentionally or otherwise caused any hurt; if there has been any misunderstanding, miscommunication, delay in response, inconvenience or shortcoming in our arrangements or hospitality, we sincerely seek your pardon.',
    'Whatever may have been the reason, whether intentional or unintentional, known or unknown, we request you to kindly overlook our shortcomings and forgive us with an open heart.',
  ],
  // The text you sent stopped at "Your love, ..." so this last line is a placeholder. Replace it with the real one.
  ending: 'Your love, prayers and kindness mean everything to us.',
};

export const family = {
  lead: 'With love & best wishes from',
  name: 'The Sayyed family',
  /**
   * Each member's x / y is where their face sits in the photo (percent from left, percent from top).
   * The names are matched to the faces in the order I guessed, so check them against the photos.
   */
  groups: [
    {
      title: 'Our little ones',
      photo: { src: asset('family/little-ones.jpg'), width: 1200, height: 960, alt: 'The little ones of the Sayyed family' },
      spot: 11,
      members: [
        { name: 'Ameerah', x: 30, y: 24 },
        { name: 'Mahenoor', x: 49, y: 38 },
        { name: 'Shayan', x: 64.5, y: 20.5 },
        { name: 'Mehewish', x: 81, y: 47.5 },
      ],
    },
    {
      title: 'Brothers',
      photo: { src: asset('family/brothers.jpg'), width: 1400, height: 788, alt: 'The brothers of the Sayyed family' },
      spot: 8,
      members: [
        { name: 'Ateshyam', x: 19.3, y: 18.6 },
        { name: 'Mujahid', x: 37.7, y: 15.4 },
        { name: 'Arbab', x: 60.4, y: 15.4 },
        { name: 'Aanwar', x: 80.3, y: 15.9 },
        { name: 'Aamant', x: 29.5, y: 46.8 },
        { name: 'Arman', x: 50.4, y: 44.1 },
        { name: 'Saddam', x: 72.4, y: 46.8 },
      ],
    },
    {
      title: 'Sisters',
      photo: { src: asset('family/sisters.jpg'), width: 1400, height: 788, alt: 'The sisters of the Sayyed family' },
      spot: 8,
      members: [
        { name: 'Sahin Mirza', x: 34.1, y: 15.9 },
        { name: 'Sawa Kanwal', x: 63.7, y: 15.9 },
        { name: 'Tarranum', x: 44, y: 39.3 },
        { name: 'Zannat', x: 56.5, y: 40.4 },
      ],
    },
  ] as FamilyGroup[],
  closing: 'and all family members & friends',
};

export const contacts: Contact[] = [
  { name: 'Sayed Mauzam Ali', phone: '93371 85006' },
  { name: 'Sayed Ateshyam Ali', phone: '78281 44411' },
  { name: 'Sayed Iftekhar Ali', phone: '99380 72244' },
  { name: 'Sayed Arbab Ali', phone: '82498 30390' },
];

export const closing = {
  message:
    'Your presence is the finest gift, your smiles the loveliest blessing, and your company the making of memories we shall treasure.',
  line: 'We look forward to welcoming you and celebrating this special occasion together.',
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
  /**
   * Optional YouTube video ID (the part after v= in a YouTube link). Leave '' to use the audio file below.
   * If a video is set but YouTube cannot play it, the page falls back to the file.
   */
  youtubeId: '',
  /** The nasheed. Replace public/audio/nasheed.mp3 to change the music. */
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
    { label: 'Mehndi & Haldi, Tuesday 22 December', asksArrival: false },
    { label: 'Nikah and lunch, Wednesday 23 December', asksArrival: true },
    { label: 'Walima, Saturday 2 January', asksArrival: false },
  ],
  arrivalSlots: ['Before 12:00 PM', '12:00 PM to 1:30 PM', '1:30 PM to 3:00 PM', 'After 3:00 PM'],
  replyBy: '',
};
