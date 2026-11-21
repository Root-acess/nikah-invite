const TZ = 'Asia/Kolkata';

export const fmtDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: TZ,
  });

export const fmtShortDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    timeZone: TZ,
  });

/** "93371 85006" becomes "+919337185006" for tel: and WhatsApp links. */
export const telOf = (phone: string): string => `+91${phone.replace(/\s/g, '')}`;

export const fmtTime =(iso: string): string =>
  new Date(iso)
    .toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: TZ })
    .toUpperCase();
