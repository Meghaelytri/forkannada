import Link from "next/link";
import { AkkiMascot } from "@/components/chapter/AkkiMascot";

type ChapterHeroProps = {
  kannadaTitle: string;
  englishTitle?: string;
  boardGradeLabel?: string;
  lessonType?: string;
  featuredImage?: string;
};

export function ChapterHero({
  kannadaTitle,
  englishTitle,
  boardGradeLabel,
  lessonType,
  featuredImage,
}: ChapterHeroProps) {
  return (
    <section className="ch-hero" aria-labelledby="chapter-title">
      <div className="ch-meta-row">
        {boardGradeLabel && <span className="pill pill--soft">{boardGradeLabel}</span>}
        {lessonType && <span className="pill">Lesson / {lessonType}</span>}
        <span className="pill pill--yellow">8 min read</span>
        <span className="pill pill--blue">Audio</span>
        <span className="pill pill--green">Practice ready</span>
      </div>

      <h1 className="ch-title-kn" id="chapter-title">
        {kannadaTitle}
      </h1>
      {englishTitle && <div className="ch-title-en">{englishTitle}</div>}

      <div className="ch-actions">
        <Link className="btn btn--primary" href="#notes">
          Start reading
        </Link>
        <button className="btn btn--accent" type="button">Save</button>
        <button className="btn" type="button">Download PDF</button>
        <button className="btn btn--ghost" type="button">Share</button>
      </div>

      {featuredImage ? (
        <img className="ch-akki" src={featuredImage} alt={kannadaTitle} />
      ) : (
        <AkkiMascot className="ch-akki" />
      )}
    </section>
  );
}
