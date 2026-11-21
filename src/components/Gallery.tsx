import { useCallback, useEffect, useState } from 'react';
import { gallery } from '../config';

/**
 * Shows the photos in public/photos/. Missing files are skipped,
 * and the whole section hides until at least one photo exists.
 */
export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const [failed, setFailed] = useState<ReadonlySet<string>>(new Set());

  const photos = gallery.filter((p) => !failed.has(p.src));
  const count = photos.length;

  const markFailed = (src: string) => setFailed((prev) => new Set(prev).add(src));

  const step = useCallback(
    (dir: 1 | -1) => {
      setOpen((i) => (i === null || count === 0 ? i : (i + dir + count) % count));
    },
    [count],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, step]);

  if (count === 0) return null;
  const current = open !== null ? photos[open] : undefined;

  return (
    <section className="section gallery" aria-labelledby="gallery-h">
      <div className="section__inner section__inner--wide">
        <h2 id="gallery-h" className="h2">
          Around the venue
        </h2>
        <div className="gallery__grid">
          {photos.map((p, i) => (
            <button
              type="button"
              key={p.src}
              className={`gallery__tile ${p.tall ? 'is-tall' : ''} ${p.wide ? 'is-wide' : ''}`}
              onClick={() => setOpen(i)}
              aria-label={`Open ${p.alt}`}
            >
              <img src={p.src} alt={p.alt} onError={() => markFailed(p.src)} />
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setOpen(null)}>
          <img className="lightbox__img" src={current.src} alt={current.alt} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="lightbox__btn lightbox__close" onClick={() => setOpen(null)} aria-label="Close photo">
            &times;
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous photo"
          >
            &#8249;
          </button>
          <button
            type="button"
            className="lightbox__btn lightbox__next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next photo"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
}
