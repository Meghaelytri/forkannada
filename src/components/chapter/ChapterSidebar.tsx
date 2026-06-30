import Link from "next/link";
import { AkkiXs } from "@/components/chapter/AkkiMascot";
import { AudioPlayer } from "@/components/chapter/AudioPlayer";
import { getLessonEnglishTitle, getLessonKannadaTitle, lessonHref } from "@/lib/lesson-heading";
import { Lesson } from "@/types/lesson";

type ChapterSidebarProps = {
  lessonTitle: string;
  relatedLessons: Lesson[];
  lessonAudio?: string;
};

export function ChapterSidebar({ lessonTitle, relatedLessons, lessonAudio }: ChapterSidebarProps) {
  const [upNext, ...moreLessons] = relatedLessons;

  return (
    <aside className="ch-side">
      <div className="ch-audio">
        <h3>
          <AkkiXs />
          Akki reads with you
        </h3>
        <p>Tap play and hear the lesson narrated aloud.</p>
        <AudioPlayer title={lessonTitle} audioUrl={lessonAudio} />
      </div>

      {upNext && (
        <div className="ch-side-card">
          <h3>Up next</h3>
          <div className="next-kn">{getLessonKannadaTitle(upNext)}</div>
          {getLessonEnglishTitle(upNext) && <div className="next-en">{getLessonEnglishTitle(upNext)}</div>}
          <div className="next-meta">Lesson / 8 min</div>
          <Link className="btn btn--primary btn--sm" href={lessonHref(upNext)}>
            Continue
          </Link>
        </div>
      )}

      {moreLessons.length > 0 && (
        <div className="ch-side-card">
          <h3>You might also like</h3>
          <ul>
            {moreLessons.slice(0, 3).map((lesson) => (
              <li key={lesson.id}>
                <Link href={lessonHref(lesson)}>{getLessonKannadaTitle(lesson)}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
