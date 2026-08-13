import MotionSafe from "@/components/motion-safe";
import { studioCapabilities } from "@/lib/studio-content";

export default function StudioCapabilities() {
  return (
    <section className="studio-section studio-capabilities page-shell" aria-labelledby="studio-capabilities-title">
      <MotionSafe>
        <div className="studio-section-heading">
          <p className="eyebrow">CAPABILITIES</p>
          <h2 id="studio-capabilities-title" aria-label="Studio capabilities">
            Engineering for useful, lasting software.
          </h2>
        </div>
        <ul className="studio-capabilities-grid">
          {studioCapabilities.map((capability) => (
            <li className="studio-glass-card studio-capability-card" key={capability.code}>
              <p className="studio-code">{capability.code}</p>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <ul className="studio-tags" aria-label={`${capability.title} technologies`}>
                {capability.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <a href={capability.href} className="studio-text-link">
                Start a conversation <span aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </MotionSafe>
    </section>
  );
}
