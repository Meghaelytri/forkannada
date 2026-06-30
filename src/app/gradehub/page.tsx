import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import { getLessonKannadaTitle, lessonHref } from "@/lib/lesson-heading";
import { getCurriculumBySlug, getCurriculums, getLessonsByCurriculum } from "@/lib/wordpress";
import { Lesson } from "@/types/lesson";
import Link from "next/link";
import styles from "./grade-hub.module.css";

type CardVariant = "green" | "red" | "white" | "poem";

interface Chapter {
  id: number;
  href: string;
  chapterNo: string;
  type: string;
  titleKannada: string;
  titleEnglish: string;
  duration: string;
  variant: CardVariant;
  isUpNext?: boolean;
  hasAudio?: boolean;
  showContinue?: boolean;
  typePill?: "poem";
}

function ProgressDots({
  total,
  completed,
  current,
}: {
  total: number;
  completed: number;
  current: number;
}) {
  return (
    <div className={styles.progressDots}>
      {Array.from({ length: total }).map((_, i) => {
        let cls = styles.dot;
        if (i < completed) cls += " " + styles.completed;
        else if (i === current) cls += " " + styles.current;
        else cls += " " + styles.upcoming;
        return <span key={i} className={cls} />;
      })}
    </div>
  );
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  let cardClass = styles.chapterCard;
  if (chapter.variant === "red") cardClass += " " + styles.redCard;
  else if (chapter.variant === "white") cardClass += " " + styles.whiteCard;
  else if (chapter.variant === "poem") cardClass += " " + styles.poemCard;

  return (
    <Link href={chapter.href} className={cardClass}>
      <div className={styles.cardMeta}>
        <span>{chapter.chapterNo}</span>
        <span>/</span>
        <span>{chapter.type}</span>
        {chapter.isUpNext && (
          <>
            <span>/</span>
            <span className={styles.upNextBadge}>UP NEXT</span>
          </>
        )}
      </div>

      <p className={styles.cardTitleKannada}>{chapter.titleKannada}</p>
      {chapter.titleEnglish && <p className={styles.cardTitleEn}>{chapter.titleEnglish}</p>}

      <div className={styles.cardFooter}>
        {chapter.showContinue && <span className={styles.continueBtn}>Continue</span>}
        <span className={styles.timePill}>{chapter.duration}</span>
        {chapter.hasAudio && <span className={styles.audioPill}>Audio</span>}
        {chapter.typePill === "poem" && <span className={styles.poemPill}>Poem</span>}
        {!chapter.showContinue && <span className={styles.iconBtn}>?</span>}
      </div>
    </Link>
  );
}

export default async function GradeHubPage({
  searchParams,
}: {
  searchParams: Promise<{
    board?: string;
    grade?: string;
    book_name?: string;
    academic_year?: string;
    curriculum?: string;
  }>;
}) {
  const filters = await searchParams;
  const curriculum = await resolveCurriculum(filters);
  const lessons = curriculum ? await getLessonsByCurriculum(curriculum) : [];
  const chapters = lessons.map(toChapter);
  const lessonCount = chapters.filter((chapter) => chapter.type === "LESSON").length;
  const poemCount = chapters.filter((chapter) => chapter.type === "POEM").length;
  const storyCount = chapters.filter((chapter) => chapter.type !== "LESSON" && chapter.type !== "POEM").length;
  const totalChapters = Math.max(chapters.length, 1);
  const completedChapters = 0;
  const board = curriculum?.board[0];
  const grade = curriculum?.grade[0];
  const book = curriculum?.book_name[0];

  return (
    <>
      <Header />

      <div className={styles.page}>
        <nav className={styles.breadcrumb}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/gradehub">Curriculum</Link>
          {board && <span>/ {board.name}</span>}
          {grade && <span>/ {grade.name}</span>}
        </nav>

        <section className={styles.heroSection}>
          <div className={styles.heroCard}>
            <div className={styles.heroTopRow}>
              <div className={styles.heroLeft}>
                <div className={styles.heroBadges}>
                  {board && <span className={styles.badgeIcse}>{board.name}</span>}
                  {book && <span className={styles.badgeLabel}>{book.name}</span>}
                </div>

                <div className={styles.gradeWatermark}>{grade?.name || "Grade"}</div>

                <p className={styles.heroTitle}>
                  {curriculum ? stripHtml(curriculum.title.rendered) : "No matching curriculum found"}
                </p>

                <div className={styles.heroStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{lessonCount}</span>
                    <span className={styles.statLabel}>Lessons</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{poemCount}</span>
                    <span className={styles.statLabel}>Poems</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{storyCount}</span>
                    <span className={styles.statLabel}>Stories</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statNumber}>{chapters.length}</span>
                    <span className={styles.statLabel}>Total</span>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <p className={styles.progressLabel}>
                    Your Progress / {completedChapters} of {chapters.length} chapters
                  </p>
                  <ProgressDots
                    total={totalChapters}
                    completed={completedChapters}
                    current={completedChapters}
                  />
                </div>
              </div>

              <div className={styles.heroMascot}>ಕ</div>
            </div>
          </div>
        </section>

        <div className={styles.filterBar}>
          <div className={styles.filterLeft}>
            <button className={`${styles.filterBtn} ${styles.active}`}>All / {chapters.length}</button>
            <button className={styles.filterBtn}>Lessons / {lessonCount}</button>
            <button className={styles.filterBtn}>Poems / {poemCount}</button>
            <button className={styles.filterBtn}>Stories / {storyCount}</button>
            <button className={`${styles.filterBtn} ${styles.audioBtn}`}>With audio</button>
          </div>
          <button className={styles.sortBtn}>Sort: Textbook order</button>
        </div>

        <div className={styles.chaptersGrid}>
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
      </div>
      <HomeFooter />
    </>
  );
}

async function resolveCurriculum(filters: {
  board?: string;
  grade?: string;
  book_name?: string;
  academic_year?: string;
  curriculum?: string;
}) {
  if (filters.curriculum) {
    const bySlug = await getCurriculumBySlug(filters.curriculum);
    if (bySlug) return bySlug;
  }

  const curriculums = await getCurriculums(filters);
  return curriculums[0] || null;
}

function toChapter(lesson: Lesson, index: number): Chapter {
  const typeName = lesson.lessonType?.name || "Lesson";
  const isPoem = /poem/i.test(typeName);
  const isStory = /story/i.test(typeName);

  return {
    id: lesson.id,
    href: lessonHref(lesson),
    chapterNo: `CHAPTER ${String(index + 1).padStart(2, "0")}`,
    type: isPoem ? "POEM" : isStory ? "STORY" : "LESSON",
    titleKannada: getLessonKannadaTitle(lesson),
    titleEnglish: "",
    duration: "8 min",
    variant: index === 0 ? "red" : isPoem ? "poem" : index % 2 === 0 ? "green" : "white",
    isUpNext: index === 0,
    showContinue: index === 0,
    hasAudio: Boolean(lesson.meta?.lesson_audio),
    typePill: isPoem ? "poem" : undefined,
  };
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}
