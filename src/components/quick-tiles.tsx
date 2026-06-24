const tiles = [
  { icon: "ಪ", name: "Worksheets", count: "Printable packs", href: "/lessons?type=worksheet" },
  { icon: "★", name: "Gadegalu", count: "200+ proverbs", href: "/lessons?type=gadegalu", feature: true },
  { icon: "ಲ", name: "Letters", count: "Templates", href: "/lessons?type=letter" },
  { icon: "ಬ", name: "Essays", count: "By topic", href: "/lessons?type=essay" },
  { icon: "ಅ", name: "Grammar", count: "Basics", href: "/lessons?type=grammar" },
  { icon: "ಪ್ರ", name: "Q-Papers", count: "Practice", href: "/lessons?type=question-paper" },
];

export default function QuickTiles() {
  return (
    <section className="home-tiles" aria-label="Quick learning resources">
      {tiles.map((tile) => (
        <a
          className={`home-tile${tile.feature ? " is-feature" : ""}`}
          href={tile.href}
          key={tile.name}
        >
          <span className="home-tile-icon">{tile.icon}</span>
          <span className="home-tile-name">{tile.name}</span>
          <span className="home-tile-count">{tile.count}</span>
        </a>
      ))}
    </section>
  );
}
