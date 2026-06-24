import Link from "next/link";
import { AkkiMascot } from "@/components/chapter/AkkiMascot";

export function ChapterHero() {
  return (
    <section className="ch-hero" aria-labelledby="chapter-title">
      <div className="ch-meta-row">
        <span className="pill pill--soft">ICSE · Grade VI</span>
        <span className="pill">Lesson · Gadya</span>
        <span className="pill pill--yellow">⏱ 8 min read</span>
        <span className="pill pill--blue">♪ Audio · 8:42</span>
        <span className="pill pill--green">12 questions</span>
      </div>

      <h1 className="ch-title-kn" id="chapter-title">
        ಮಲ್ಲಕಂಬ
      </h1>
      <div className="ch-title-en">Mallakamba</div>

      <div className="ch-actions">
        <Link className="btn btn--primary" href="#notes">
          ▶ Start reading
        </Link>
        <button className="btn btn--accent">⌘ Save</button>
        <button className="btn">📄 Download PDF</button>
        <button className="btn btn--ghost">💬 Share</button>
      </div>

      <AkkiMascot className="ch-akki" />
    </section>
  );
}
