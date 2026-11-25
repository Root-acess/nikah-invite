export type IconName = 'phone' | 'whatsapp' | 'calendar' | 'clock' | 'pin' | 'navigate' | 'dish';

const PATHS: Record<IconName, string> = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z',
  whatsapp: 'M3 21l1.6-4.6A9 9 0 1112 21a9 9 0 01-4.4-1.2L3 21z M9 8.5c0 3 3 6 6 6l1-1.5-2-1-1 .8a4 4 0 01-2-2l.8-1-1-2L9 8.5z',
  calendar: 'M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z M3 10h18 M8 3v4 M16 3v4',
  clock: 'M12 3a9 9 0 100 18 9 9 0 000-18z M12 7v5l3 2',
  pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z M12 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
  navigate: 'M3 11l18-8-8 18-2-8-8-2z',
  dish: 'M3 18h18 M5 18a7 7 0 0114 0 M12 8V6 M10 6h4',
};

/** Small outline icons that take the colour of the text next to them. */
export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      width="1.15em"
      height="1.15em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
