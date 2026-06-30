import { getLessonEnglishTitle, getLessonKannadaTitle, lessonHref } from "@/lib/lesson-heading";
import { getLessonsByCurriculum } from "@/lib/wordpress";
import { Curriculum, Lesson } from "@/types/lesson";

type TrendingLessonsProps = {
  curriculums: Curriculum[];
};

type TrendingCard = {
  rank: string;
  lesson: Lesson;
  curriculum: Curriculum;
};

export default async function TrendingLessons({ curriculums }: TrendingLessonsProps) {
  const lessonGroups = await Promise.all(curriculums.map(async (curriculum) => ({
    curriculum,
    lessons: await getLessonsByCurriculum(curriculum),
  })));

  const cards: TrendingCard[] = lessonGroups
    .flatMap(({ curriculum, lessons }) => lessons.map((lesson) => ({ curriculum, lesson })))
    .slice(0, 3)
    .map((item, index) => ({
      ...item,
      rank: String(index + 1).padStart(2, "0"),
    }));

  return (
    <section className="home-trending">
      <div className="home-section-title">
        <h2>
          This week, students are reading <span className="kn">{String.fromCharCode(8594)}</span>
        </h2>
        <span className="meta">From WordPress</span>
      </div>

      <div className="trending-grid">
        {cards.map((card) => {
          const board = card.curriculum.board[0]?.name;
          const grade = card.curriculum.grade[0]?.name;
          const type = card.lesson.lessonType?.name;
          const meta = [[board, grade].filter(Boolean).join(" + "), type].filter(Boolean);

          return (
            <a className="trending-card" href={lessonHref(card.lesson)} key={`${card.rank}-${card.lesson.id}`}>
              <span className="trending-rank">{card.rank}</span>
              <div className="trending-meta">
                {meta.map((item) => (
                  <span className="pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="kn-title">{getLessonKannadaTitle(card.lesson)}</div>
              {getLessonEnglishTitle(card.lesson) && <h3 className="en-title">{getLessonEnglishTitle(card.lesson)}</h3>}
              <p className="desc">Open the lesson notes, practice material, and reading support.</p>
              <div className="footer-row">
                <span className="footer-row-media">
                  <span className="footer-row-item">Audio</span>
                  <span className="footer-row-item">PDF</span>
                </span>
                <span className="read">Read now {String.fromCharCode(8594)}</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
