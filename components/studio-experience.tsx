import MotionSafe from "@/components/motion-safe";
import { studioExperience } from "@/lib/studio-content";

export default function StudioExperience() {
  return (
    <section className="studio-section studio-experience page-shell" aria-labelledby="studio-experience-title">
      <MotionSafe>
        <div className="studio-section-heading">
          <p className="eyebrow">EXPERIENCE</p>
          <h2 id="studio-experience-title">Experience behind Genjux.</h2>
        </div>
        <ol className="studio-timeline">
          {studioExperience.map((experience, index) => (
            <li key={experience.code}>
              <article className="studio-glass-card studio-timeline-card">
                <p className="studio-code">
                  <span aria-hidden="true">0{index + 1} / </span>
                  {experience.code}
                </p>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
                <ul className="studio-tags" aria-label={`${experience.title} skills`}>
                  {experience.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <a href={experience.href} className="studio-text-link">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </article>
            </li>
          ))}
        </ol>
      </MotionSafe>
    </section>
  );
}
