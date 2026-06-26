import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import LessonCard from "@/components/lesson-card";
import { getLessonEnglishTitle, getLessonKannadaTitle } from "@/lib/lesson-heading";
import { getLessonBySlug, getLessonsByFilter } from "@/lib/wordpress";

function renderTerms(lesson: any) {
  const terms = lesson._embedded?.["wp:term"]?.flat() || [];
  const board = terms.find((term: any) => term.taxonomy === "board")?.name;
  const grade = terms.find((term: any) => term.taxonomy === "grade")?.name;
  const type = terms.find((term: any) => term.taxonomy === "lesson_type")?.name;
  return [board && grade && `${board} + ${grade}`, type && type].filter(Boolean) as string[];
}

export default async function LessonDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const lesson = await getLessonBySlug(slug);

  if (!lesson) {
    return (
      <main className="fk-page">
        <Header />
        <section className="lesson-detail-shell">
          <h1>Lesson not found</h1>
        </section>
        <HomeFooter />
      </main>
    );
  }

  const related = await getLessonsByFilter({
    board: lesson._embedded?.["wp:term"]?.flat()?.find((term: any) => term.taxonomy === "board")?.id,
    grade: lesson._embedded?.["wp:term"]?.flat()?.find((term: any) => term.taxonomy === "grade")?.id,
  });

  const image = lesson._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const kannadaTitle = getLessonKannadaTitle(lesson);
  const englishTitle = getLessonEnglishTitle(lesson);
  const terms = renderTerms(lesson);

  return (
    <main className="fk-page">
      <Header />

      <section className="lesson-detail-shell">
        <div className="lesson-detail-grid">
          <article className="lesson-detail-main">
            <p className="meta">Lesson detail</p>
            <h1>{kannadaTitle}</h1>
            {englishTitle && <p className="lesson-detail-english">{englishTitle}</p>}

            <div className="lesson-detail-tags">
              {terms.map((term) => (
                <span className="lesson-chip lesson-chip--primary" key={term}>
                  {term}
                </span>
              ))}
            </div>

            {image && <img className="lesson-detail-image" src={image} alt={kannadaTitle} />}

            <div
              className="lesson-detail-content"
              dangerouslySetInnerHTML={{ __html: lesson.content.rendered }}
            />
          </article>

          <aside className="lesson-detail-aside">
            <div className="lesson-detail-panel">
              <p className="meta">Quick card</p>
              <LessonCard lesson={lesson} />
            </div>
          </aside>
        </div>

        {related.length > 1 && (
          <section className="lesson-related">
            <div className="home-section-title">
              <h2>More lessons from the same board and class</h2>
            </div>

            <div className="lessons-grid">
              {related
                .filter((item: any) => item.id !== lesson.id)
                .slice(0, 3)
                .map((item: any) => (
                  <LessonCard key={item.id} lesson={item} />
                ))}
            </div>
          </section>
        )}
      </section>

      <HomeFooter />
    </main>
  );
}
