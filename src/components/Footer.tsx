import { closing } from '../config';
import { Divider } from './Ornaments';

export function Footer() {
  return (
    <footer className="footer">
      <Divider />
      <p className="footer__ar" lang="ar" dir="rtl">
        بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
      </p>
      <p className="footer__en">May Allah bless you both, shower His blessings upon you, and unite you in goodness.</p>
      <p className="footer__msg">{closing.message}</p>
      <p className="footer__families">{closing.line}</p>
    </footer>
  );
}
