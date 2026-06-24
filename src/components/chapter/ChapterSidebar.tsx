import { AkkiXs } from "@/components/chapter/AkkiMascot";
import { AudioPlayer } from "@/components/chapter/AudioPlayer";

export function ChapterSidebar() {
  return (
    <aside className="ch-side">
      {/* Audio card */}
      <div className="ch-audio">
        <h3>
          <AkkiXs />
          Akki reads with you
        </h3>
        <p>Tap play and hear the lesson narrated aloud.</p>
        <AudioPlayer />
      </div>

      {/* Up next */}
      <div className="ch-side-card">
        <h3>Up next in Grade VI</h3>
        <div className="next-kn">ತರಕಾರಿಗಳ ಮೇಳ</div>
        <div className="next-en">Tarakarigala Mela</div>
        <div className="next-meta">Lesson · 8 min</div>
        <button className="btn btn--primary btn--sm">Continue →</button>
      </div>

      {/* Related */}
      <div className="ch-side-card">
        <h3>You might also like</h3>
        <ul>
          <li>Punyakoti — same grade poem</li>
          <li>Sport &amp; tradition — theme</li>
          <li>Bandedda Mundaragi Bheemaraya — Grade VII</li>
        </ul>
      </div>
    </aside>
  );
}
