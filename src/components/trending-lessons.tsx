import { getLessonEnglishTitle, getLessonKannadaTitle } from "@/lib/lesson-heading";
import { getLessons } from "@/lib/wordpress";
import { Lesson } from "@/types/lesson";

const fallbackLessons = [
  {
    rank: "01",
    kannada: "Mallakamba",
    english: "Mallakamba",
    description: "An exciting lesson about the ancient Indian sport.",
    meta: ["ICSE + Class 6", "Worksheet"],
    href: "/lessons",
  },
  {
    rank: "02",
    kannada: "Sathyakke Saavilla",
    english: "Sathyakke Saavilla",
    description: "A proverb every Kannada learner should remember.",
    meta: ["Gadegalu", "Popular"],
    href: "/lessons",
  },
  {
    rank: "03",
    kannada: "Punyakoti",
    english: "Punyakoti",
    description: "The classic story of truth, courage, and promise.",
    meta: ["Story + Class 6", "Reading"],
    href: "/lessons",
  },
];

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
      kannada: getLessonKannadaTitle(lesson),
      english: getLessonEnglishTitle(lesson),
      description: "Open the lesson notes, practice material, and reading support.",
      meta: [[board, grade].filter(Boolean).join(" + "), type].filter(Boolean) as string[],
      href: `/lesson/${lesson.slug}`,
    };
  });

  const cards = liveLessons.length ? liveLessons : fallbackLessons;

  return (
    <section className="home-trending">
      <div className="home-section-title">
        <h2>
          This week, students are reading <span className="kn">{String.fromCharCode(8594)}</span>
        </h2>
        <span className="meta">{liveLessons.length ? "Current lessons" : "Preview cards"}</span>
      </div>

      <div className="trending-grid">
        {cards.map((card) => (
          <a className="trending-card" href={card.href} key={`${card.rank}-${card.kannada}`}>
            <span className="trending-rank">{card.rank}</span>
            <div className="trending-meta">
              {card.meta.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="kn-title">{card.kannada}</div>
            <h3 className="en-title">{card.english}</h3>
            <p className="desc">{card.description}</p>
            <div className="footer-row">
              <span className="footer-row-media">
                <span className="footer-row-item">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
                    <path d="M5 10v4h3l4 3V7L8 10H5Z" fill="currentColor" />
                    <path d="M15 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  Audio
                </span>
                <span className="footer-row-item">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
                    <path d="M6 3.5h8l4 4V20.5H6V3.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M14 3.5v4h4" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                  PDF
                </span>
              </span>
              <span className="read">
                Read now
                <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
                  <path d="M5 12h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="m13 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
