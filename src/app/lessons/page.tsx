import { getLessonsByFilter } from "@/lib/wordpress";
import LessonCard from "@/components/lesson-card";

export default async function LessonsPage({
  searchParams,
}: {
  searchParams: Promise<{
    board?: string;
    grade?: string;
    type?: string;
  }>;
}) {

  const filters = await searchParams;

  const lessons = await getLessonsByFilter(
    filters.board ? Number(filters.board) : undefined,
    filters.grade ? Number(filters.grade) : undefined,
    filters.type ? Number(filters.type) : undefined
  );

  return (
    <main className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Lessons
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {lessons.map((lesson:any)=>(
          <LessonCard
            key={lesson.id}
            lesson={lesson}
          />
        ))}

      </div>

    </main>
  );
}