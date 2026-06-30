import Link from "next/link";
import { ChapterHero } from "@/components/chapter/ChapterHero";
import { ChapterTabs } from "@/components/chapter/ChapterTabs";
import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import { getLessonEnglishTitle, getLessonKannadaTitle } from "@/lib/lesson-heading";
import { getCurriculums, getLessonBySlug, getLessonsByCurriculum } from "@/lib/wordpress";

function combineLabels(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" / ");
}

function stripHtml(value?: string) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function acfString(acf: Record<string, unknown> | undefined, key: string) {
  const value = acf?.[key];
  return typeof value === "string" ? value : "";
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
      <main className="page-frame">
        <div className="fk">
          <Header />
          <section className="lesson-detail-shell">
            <h1>Lesson not found</h1>
          </section>
          <HomeFooter />
        </div>
      </main>
    );
  }

  const curriculums = await getCurriculums();
  const currentCurriculum = curriculums.find((curriculum) => curriculum.lessonIds.includes(lesson.id));
  const relatedLessons = currentCurriculum
    ? (await getLessonsByCurriculum(currentCurriculum)).filter((item) => item.id !== lesson.id).slice(0, 4)
    : [];

  const kannadaTitle = getLessonKannadaTitle(lesson);
  const englishTitle = getLessonEnglishTitle(lesson);
  const boardGradeLabel = combineLabels(
    currentCurriculum?.board[0]?.name,
    currentCurriculum?.grade[0]?.name,
    currentCurriculum?.book_name[0]?.name,
    currentCurriculum?.academic_year[0]?.name
  );
  const excerpt = stripHtml(lesson.excerpt?.rendered) ? lesson.excerpt?.rendered : undefined;
  const lessonAudio = lesson.meta?.lesson_audio || acfString(lesson.acf, "lesson_audio");
  const lessonPdf =
    lesson.meta?.lesson_pdf ||
    acfString(lesson.acf, "lesson_pdf") ||
    acfString(lesson.acf, "add_pdf_worksheets_here");

  return (
    <main className="page-frame">
      <div className="fk">
        <Header />

        <div className="fk-breadcrumb">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/gradehub">Curriculum</Link>
          {currentCurriculum && (
            <>
              <span> / </span>
              <Link href={`/gradehub?curriculum=${currentCurriculum.slug}`}>{stripHtml(currentCurriculum.title.rendered)}</Link>
            </>
          )}
          <strong> / {kannadaTitle}</strong>
        </div>

        <ChapterHero
          kannadaTitle={kannadaTitle}
          englishTitle={englishTitle}
          boardGradeLabel={boardGradeLabel}
          lessonType={lesson.lessonType?.name}
          featuredImage={lesson.featuredImage?.source_url}
        />
        <ChapterTabs
          lessonTitle={englishTitle || kannadaTitle}
          contentHtml={lesson.content.rendered}
          excerpt={excerpt}
          relatedLessons={relatedLessons}
          lessonAudio={lessonAudio}
          lessonPdf={lessonPdf}
        />
        <HomeFooter />
      </div>
    </main>
  );
}
