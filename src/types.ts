export interface Person {
  /** First name, used in big headings. */
  name: string;
  fullName: string;
  parents: string;
  /** Illustrated portrait, saved in public/people/. */
  photo: string;
  /** Where to anchor the picture inside the arch frame (CSS object-position). */
  photoPosition?: string;
}

export interface WeddingEvent {
  id: string;
  title: string;
  arabic: string;
  /** Used for the countdown and the calendar file. */
  startISO: string;
  endISO: string;
  /** Shown to guests instead of a clock time, e.g. "After Namaz-e-Zohar". */
  timeLabel?: string;
  description: string;
  /** Optional picture shown with the event, saved in public/events/. */
  image?: string;
  /** Width and height of that picture in pixels, so the page keeps its shape while it loads. */
  imageSize?: [number, number];
}

export interface VenueInfo {
  /** Heading for this venue block, e.g. "Mehndi & Haldi and Nikah". */
  heading: string;
  /** ids of the events held here (they get an "add to calendar" button). */
  eventIds: string[];
  name: string;
  address: string;
  city: string;
  /** Text Google Maps searches for. */
  mapQuery: string;
  note: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  tall?: boolean;
  wide?: boolean;
}

export interface FamilyMember {
  name: string;
  /** Where the face is in the photo, as a percentage from the left and from the top. */
  x: number;
  y: number;
}

export interface FamilyGroup {
  title: string;
  photo: { src: string; width: number; height: number; alt: string };
  /** Width of the hover area over each face, as a percentage of the photo width. */
  spot: number;
  members: FamilyMember[];
}

export interface Contact {
  name: string;
  /** 10-digit Indian mobile number, spaces allowed. */
  phone: string;
}

export interface RsvpEventOption {
  /** Must match the option text in the Google Form exactly. */
  label: string;
  /** If true, guests who pick this event are asked when they will arrive. */
  asksArrival: boolean;
}

export interface RsvpConfig {
  /** The long ID in https://docs.google.com/forms/d/e/<FORM_ID>/viewform. Leave empty for demo mode. */
  formId: string;
  /** Field IDs from the form's pre-filled link, like "entry.123456789". */
  entries: {
    name: string;
    attending: string;
    guests: string;
    events: string;
    meal: string;
    arrival: string;
    message: string;
  };
  eventOptions: RsvpEventOption[];
  arrivalSlots: string[];
  /** Optional. Leave empty to hide the reply-by sentence. */
  replyBy: string;
}
