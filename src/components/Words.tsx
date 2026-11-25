import { quote } from '../config';
import { Divider } from './Ornaments';

export function Words() {
  return (
    <section className="section words" aria-labelledby="words-h">
      <div className="section__inner">
        <h2 id="words-h" className="h2">
          A few words from the heart
        </h2>
        <blockquote className="words__poem">
          <p className="words__couplet">{quote}</p>
        </blockquote>
        <Divider className="words__divider" />
      </div>
    </section>
  );
}
