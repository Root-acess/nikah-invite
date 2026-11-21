import { bride, groom } from '../config';
import { Divider } from './Ornaments';

export function Verse() {
  return (
    <section className="section verse" id="verse" aria-labelledby="verse-h">
      <div className="section__inner">
        <h2 id="verse-h" className="visually-hidden">
          A verse for the couple
        </h2>
        <p className="verse__ar" lang="ar" dir="rtl">
          وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
        </p>
        <p className="verse__en">
          Among His signs is that He created partners for you from among yourselves, so that you may find peace in them,
          and He placed love and mercy between you.
        </p>
        <p className="verse__ref">Surah Ar-Rum, 30:21</p>
        <Divider className="verse__divider" />
        <p className="verse__tag">A celebration of love, family &amp; togetherness</p>
        <p className="verse__invite">
          With the love and blessings of our families, we cordially invite you and your family to grace the auspicious
          occasion of the Nikah ceremony of <strong>{groom.fullName}</strong> with <strong>{bride.fullName}</strong>.
        </p>
      </div>
    </section>
  );
}
