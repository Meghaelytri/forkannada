import { getLessons } from "@/lib/wordpress";
import { Lesson } from "@/types/lesson";

const fallbackLessons = [
  {
    rank: "01",
    kannada: "ಮಲ್ಲಕಂಬ",
    title: "Mallakamba",
    description: "An exciting lesson about the ancient Indian sport.",
    meta: ["ICSE", "Class 6", "8 min"],
    href: "/lessons",
  },
  {
    rank: "02",
    kannada: "ಸತ್ಯಕ್ಕೆ ಸಾವಿಲ್ಲ",
    title: "Sathyakke Saavilla",
    description: "A proverb every Kannada learner should remember.",
    meta: ["Gadegalu", "Popular"],
    href: "/lessons",
  },
  {
    rank: "03",
    kannada: "ಪುಣ್ಯಕೋಟಿ",
    title: "Punyakoti",
    description: "The classic story of truth, courage, and promise.",
    meta: ["Poem", "Class 6", "5 min"],
    href: "/lessons",
  },
];

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
}

export default async function TrendingLessons() {
  let lessons: Lesson[] = [];

  try {
    lessons = await getLessons();
  } catch {
    lessons = [];
  }

  const liveLessons = lessons.slice(0, 3).map((lesson, index) => {
    const terms = lesson._embedded?.["wp:term"]?.flat() || [];
    const grade = terms.find((term) => term.taxonomy === "grade")?.name;
    const board = terms.find((term) => term.taxonomy === "board")?.name;
    const type = terms.find((term) => term.taxonomy === "lesson_type")?.name;

    return {
      rank: String(index + 1).padStart(2, "0"),
      kannada: "ಕ",
      title: stripHtml(lesson.title.rendered),
      description: "Open the lesson notes, practice material, and reading support.",
      meta: [board, grade, type].filter(Boolean) as string[],
      href: `/lesson/${lesson.slug}`,
    };
  });

  const cards = liveLessons.length ? liveLessons : fallbackLessons;

  return (
    <section className="home-trending">
      <div className="home-section-title">
        <h2>
          This week, students are reading <span className="kn">→</span>
        </h2>
        <span className="meta">
          {liveLessons.length ? "Live from WordPress" : "Preview cards"}
        </span>
      </div>

      <div className="trending-grid">
        {cards.map((card) => (
          <a className="trending-card" href={card.href} key={`${card.rank}-${card.title}`}>
            <span className="trending-rank">{card.rank}</span>
            <div className="trending-meta">
              {card.meta.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="kn-title">{card.kannada}</div>
            <h3 className="en-title">{card.title}</h3>
            <p className="desc">{card.description}</p>
            <div className="footer-row">
              <span>Audio · PDF</span>
              <span className="read">Read now</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
