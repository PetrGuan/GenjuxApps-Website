import MotionSafe from "@/components/motion-safe";

export default function StudioContactCta() {
  return (
    <section className="studio-section studio-contact page-shell" aria-labelledby="studio-contact-title">
      <MotionSafe className="studio-contact-panel">
        <p className="eyebrow">NEXT SIGNAL</p>
        <h2 id="studio-contact-title">Have a product worth making carefully?</h2>
        <a href="/contact" className="studio-contact-link">
          Work with Genjux <span aria-hidden="true">→</span>
        </a>
      </MotionSafe>
    </section>
  );
}
