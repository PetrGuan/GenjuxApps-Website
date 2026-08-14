import MotionSafe from "@/components/motion-safe";
import { openSourceContributions } from "@/lib/studio-content";

export default function OpenSourceContributions() {
  return (
    <section className="studio-section studio-contributions page-shell" aria-label="Open source">
      <MotionSafe>
        <div className="studio-section-heading">
          <p className="eyebrow">OPEN SOURCE</p>
          <h2 id="studio-contributions-title" aria-label="Open-source contributions">Open-source contributions</h2>
          <p className="studio-section-intro">Contributing to the foundations beneath the work.</p>
        </div>
        <ul className="studio-contributions-grid">
          {openSourceContributions.map((contribution) => (
            <li className="studio-glass-card studio-contribution-card" key={contribution.code}>
              <p className="studio-code">{contribution.code}</p>
              <h3>{contribution.title}</h3>
              <p>{contribution.description}</p>
              <ul className="studio-tags" aria-label={`${contribution.title} technologies`}>
                {contribution.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a href={contribution.href} className="studio-text-link">
                View contribution <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </MotionSafe>
    </section>
  );
}
