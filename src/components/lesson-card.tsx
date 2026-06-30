import Link from "next/link";
import { getLessonEnglishTitle, getLessonKannadaTitle, lessonHref } from "@/lib/lesson-heading";
import { Curriculum, Lesson } from "@/types/lesson";

type Props = {
  lesson: Lesson;
  curriculum?: Curriculum;
};

function combineLabels(board?: string, grade?: string) {
  return [board, grade].filter(Boolean).join(" + ");
}

function AudioIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
      <path d="M5 10v4h3l4 3V7L8 10H5Z" fill="currentColor" />
      <path d="M15 9a4 4 0 0 1 0 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17.5 6.5a7 7 0 0 1 0 11" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
      <path d="M6 3.5h8l4 4V20.5H6V3.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 3.5v4h4" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M8 16h2.4a1.5 1.5 0 0 0 0-3H8v3Zm5.1 0h1.1c1.2 0 2-.8 2-2s-.8-2-2-2h-1.1v4Zm5.1 0h2v-1.3h-2V12h2.4V10.7h-3.9V16Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="lesson-mini-icon">
      <path d="M5 12h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m13 6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function LessonCard({ lesson, curriculum }: Props) {
  const image = lesson.featuredImage?.source_url;
  const board = curriculum?.board[0]?.name;
  const grade = curriculum?.grade[0]?.name;
  const type = lesson.lessonType?.name;
  const kannadaTitle = getLessonKannadaTitle(lesson);
  const englishTitle = getLessonEnglishTitle(lesson);

  return (
    <Link href={lessonHref(lesson)} className="lesson-card">
      {image ? (
        <img src={image} alt={kannadaTitle} className="lesson-card-image" />
      ) : (
        <div className="lesson-card-image lesson-card-image--empty" />
      )}

      <div className="lesson-card-body">
        <div className="lesson-card-topline">
          {combineLabels(board, grade) && <span className="lesson-chip lesson-chip--primary">{combineLabels(board, grade)}</span>}
          {type && <span className="lesson-chip">{type}</span>}
        </div>

        <h3 className="lesson-card-title">{kannadaTitle}</h3>
        {englishTitle && <p className="lesson-card-english">{englishTitle}</p>}

        <p className="lesson-card-description">Open the lesson notes, practice material, and reading support.</p>

        <div className="lesson-card-footer">
          <span className="lesson-card-media">
            <span className="lesson-card-media-item">
              <AudioIcon />
              <span>Audio</span>
            </span>
            <span className="lesson-card-media-item">
              <PdfIcon />
              <span>PDF</span>
            </span>
          </span>

          <span className="lesson-card-read">
            <span>Read now</span>
            <ArrowIcon />
          </span>
        </div>
      </div>
    </Link>
  );
}
