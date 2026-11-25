import { nikah, nikahHijri } from '../config';
import { useCountdown } from '../hooks/useCountdown';
import { fmtDate, fmtTime } from '../utils/format';
import { ArchOutline } from './Ornaments';

export function Countdown() {
  const t = useCountdown(nikah.startISO);
  const units = [
    ['Days', t.days],
    ['Hours', t.hours],
    ['Minutes', t.minutes],
    ['Seconds', t.seconds],
  ] as const;

  return (
    <section className="section countdown" aria-labelledby="count-h">
      <div className="section__inner">
        <h2 id="count-h" className="h2">
          {t.done ? 'Alhamdulillah, today is the day' : 'Until the Nikah'}
        </h2>
        <div className="count" role="timer" aria-live="off">
          {units.map(([label, value]) => (
            <div className="count__unit" key={label}>
              <ArchOutline />
              <span className="count__num" key={value}>
                {String(value).padStart(2, '0')}
              </span>
              <span className="count__label">{label}</span>
            </div>
          ))}
        </div>
        <p className="countdown__hijri">
          <span>{nikahHijri.en}</span>
          <span lang="ar" dir="rtl">
            {nikahHijri.ar}
          </span>
        </p>
        <p className="countdown__when">
          {fmtDate(nikah.startISO)}, {nikah.timeLabel ?? `${fmtTime(nikah.startISO)} IST`}
        </p>
      </div>
    </section>
  );
}
