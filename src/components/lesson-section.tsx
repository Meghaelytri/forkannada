import { getCurriculums, getLessonsByCurriculum } from "@/lib/wordpress";
import LessonCard from "./lesson-card";

export default async function LessonSection() {
  const curriculums = await getCurriculums();
  const groups = await Promise.all(
    curriculums.map(async (curriculum) => ({
      curriculum,
      lessons: await getLessonsByCurriculum(curriculum),
    }))
  );

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-8">Latest Lessons</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {groups.flatMap(({ curriculum, lessons }) =>
            lessons.map((lesson) => (
              <LessonCard
                key={`${curriculum.id}-${lesson.id}`}
                lesson={lesson}
                curriculum={curriculum}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
