import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import LessonCard from "@/components/lesson-card";
import { getCurriculums, getLessonsByCurriculum } from "@/lib/wordpress";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{
    board?: string;
    grade?: string;
    book_name?: string;
    academic_year?: string;
    curriculum?: string;
    type?: string;
    search?: string;
  }>;
}) {
  const filters = await searchParams;
  const curriculums = await getCurriculums(filters);
  const curriculumLessons = await Promise.all(
    curriculums.map(async (curriculum) => ({
      curriculum,
      lessons: await getLessonsByCurriculum(curriculum),
    }))
  );
  const search = normalize(filters.search);
  const type = normalize(filters.type);
  const cards = curriculumLessons.flatMap(({ curriculum, lessons }) =>
    lessons
      .filter((lesson) => !type || normalize(lesson.lessonType?.slug) === type || normalize(lesson.lessonType?.name) === type)
      .filter((lesson) => {
        if (!search) return true;
        return normalize(stripHtml(lesson.title.rendered)).includes(search) || normalize(stripHtml(lesson.content.rendered)).includes(search);
      })
      .map((lesson) => ({ curriculum, lesson }))
  );

  return (
    <main className="fk-page">
      <Header />
      <section className="lessons-shell">
        <div className="lessons-head">
          <div>
            <p className="meta">Filtered lessons</p>
            <h1>Lessons</h1>
          </div>
          <p className="lessons-summary">{cards.length} lesson{cards.length === 1 ? "" : "s"} found</p>
        </div>

        <div className="lessons-grid">
          {cards.map(({ lesson, curriculum }) => (
            <LessonCard key={`${curriculum.id}-${lesson.id}`} lesson={lesson} curriculum={curriculum} />
          ))}
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}

function normalize(value?: string) {
  return String(value || "").trim().toLowerCase();
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}
