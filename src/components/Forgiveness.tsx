import { forgiveness } from '../config';

export function Forgiveness() {
  return (
    <section className="section forgive" aria-labelledby="forgive-h">
      <div className="section__inner">
        <h2 id="forgive-h" className="h2">
          {forgiveness.title}
        </h2>
        <p className="forgive__bismillah" lang="ar" dir="rtl">
          {forgiveness.bismillah}
        </p>
        {forgiveness.paragraphs.map((t) => (
          <p className="forgive__p" key={t}>
            {t}
          </p>
        ))}
        <p className="forgive__end">{forgiveness.ending}</p>
      </div>
    </section>
  );
}
