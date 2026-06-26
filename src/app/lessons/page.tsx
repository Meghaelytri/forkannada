import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import LessonCard from "@/components/lesson-card";
import { getLessonsByFilter } from "@/lib/wordpress";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{
    board?: string;
    grade?: string;
    type?: string;
    search?: string;
  }>;
}) {
  const filters = await searchParams;
  const lessons = await getLessonsByFilter({
    board: filters.board,
    grade: filters.grade,
    type: filters.type,
    search: filters.search,
  });

  return (
    <main className="fk-page">
      <Header />
      <section className="lessons-shell">
        <div className="lessons-head">
          <div>
            <p className="meta">Filtered lessons</p>
            <h1>Lessons</h1>
          </div>
          <p className="lessons-summary">{lessons.length} lesson{lessons.length === 1 ? "" : "s"} found</p>
        </div>

        <div className="lessons-grid">
          {lessons.map((lesson: any) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
