import Link from "next/link";

const entries = [
  {
    product: "Bebilog",
    title: "iOS launch",
    description: "Private baby tracking with on-device Smart Log, insights, and everyday care records.",
  },
  {
    product: "Nautilus",
    title: "iOS and iPadOS launch",
    description: "A quiet Hacker News reader with private summaries, briefing queues, and offline reading.",
  },
];

export default function ChangelogPage() {
  return (
    <section className="page-shell information-page">
      <p className="eyebrow">CHANGELOG / 002</p>
      <h1>Shipped with care.</h1>
      <div className="changelog-list">
        {entries.map((entry) => (
          <article key={entry.product}>
            <p className="eyebrow">{entry.product}</p>
            <h2>{entry.title}</h2>
            <p>{entry.description}</p>
          </article>
        ))}
      </div>
      <Link href="/#products" className="text-link">
        View all products <span aria-hidden="true">→</span>
      </Link>
    </section>
  );
}
