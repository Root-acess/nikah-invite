import { poem } from '../config';
import { Divider } from './Ornaments';

export function Words() {
  return (
    <section className="section words" aria-labelledby="words-h">
      <div className="section__inner">
        <h2 id="words-h" className="h2">
          A few words from the heart
        </h2>
        <div className="words__poem" lang="hi-Latn">
          {poem.map((couplet, i) => (
            <p className="words__couplet" key={i}>
              {couplet.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
          ))}
        </div>
        <Divider className="words__divider" />
      </div>
    </section>
  );
}
