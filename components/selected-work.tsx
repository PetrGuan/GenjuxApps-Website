/* eslint-disable @next/next/no-img-element */

import MotionSafe from "@/components/motion-safe";
import { selectedWork } from "@/lib/studio-content";

export default function SelectedWork() {
  return (
    <section className="studio-section studio-work page-shell" aria-labelledby="studio-work-title">
      <MotionSafe>
        <div className="studio-section-heading">
          <p className="eyebrow">SELECTED WORK</p>
          <h2 id="studio-work-title">Built close to the systems people rely on.</h2>
        </div>
        <div className="studio-work-grid">
          {selectedWork.map((work) => (
            <article className="studio-glass-card studio-work-card" key={work.code}>
              <div className="studio-work-art" data-has-image={Boolean(work.image)}>
                {work.image ? (
                  <img src={work.image} alt={`${work.title} product interface`} />
                ) : (
                  <div className="studio-native-panel" aria-hidden="true">
                    <span>{work.code}</span>
                    <i />
                    <i />
                    <i />
                  </div>
                )}
              </div>
              <div className="studio-work-copy">
                <p className="studio-code">{work.code}</p>
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <ul className="studio-tags" aria-label={`${work.title} technologies`}>
                  {work.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={work.href} className="studio-text-link">
                  Explore {work.title} <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </MotionSafe>
    </section>
  );
}
