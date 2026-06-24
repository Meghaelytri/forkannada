    "use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/chapter/AudioPlayer";
import { ChapterSidebar } from "@/components/chapter/ChapterSidebar";

type PaneId = "notes" | "worksheet" | "audio" | "qa" | "pdf";

const TABS: { id: PaneId; label: string }[] = [
  { id: "notes",     label: "📖 Notes" },
  { id: "worksheet", label: "✏️ Worksheet · 12" },
  { id: "audio",     label: "♪ Audio" },
  { id: "qa",        label: "💬 Q&A · 8" },
  { id: "pdf",       label: "📄 Download PDF" },
];

export function ChapterTabs() {
  const [activePane, setActivePane] = useState<PaneId>("notes");
  const [fontSize, setFontSize] = useState(16);

  const changeFont = (delta: number) => {
    setFontSize((prev) => Math.max(14, Math.min(22, prev + delta)));
  };

  return (
    <>
      {/* Tab bar */}
      <section className="ch-tabs-wrap" aria-label="Chapter filters">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab${activePane === tab.id ? " on" : ""}`}
            onClick={() => setActivePane(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <div className="font-tools">
          <button className="tab" onClick={() => changeFont(-1)}>A−</button>
          <button className="tab" onClick={() => changeFont(1)}>A+</button>
        </div>
      </section>

      {/* Body: article + sidebar */}
      <section className="ch-body">
        <article
          className="ch-content"
          id="reader"
          style={{ "--reader-size": `${fontSize}px` } as React.CSSProperties}
        >
          {/* ── Notes ── */}
          <div className={`pane${activePane === "notes" ? " active" : ""}`} id="notes">
            <div className="lead">
              ಮಲ್ಲಕಂಬವು ಭಾರತದ ಪ್ರಾಚೀನ ಕ್ರೀಡೆಗಳಲ್ಲಿ ಒಂದು. ಇದನ್ನು ಮುಖ್ಯವಾಗಿ
              ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಆಡಲಾಗುತ್ತದೆ.
            </div>

            <h2>About the lesson</h2>
            <p>
              Mallakamba is an ancient Indian sport practiced primarily in Karnataka
              and Maharashtra. The word combines <em>malla</em> (wrestler) and{" "}
              <em>khamba</em> (pole). A vertical wooden pole, anointed with castor
              oil, becomes the gymnast&apos;s apparatus and their opponent.
            </p>
            <p>
              The lesson introduces young readers to the discipline behind the
              spectacle: the years of practice, the strength required, and why a
              12th-century court sport still finds students today.
            </p>

            <h2>
              Summary{" "}
              <span className="kn-body" style={{ color: "var(--muted)" }}>
                — ಸಾರಾಂಶ
              </span>
            </h2>
            <p className="kn-body">
              ಮಲ್ಲಕಂಬವು ಒಂದು ವಿಶಿಷ್ಟ ಕ್ರೀಡೆ. ಇದರಲ್ಲಿ ಕಲಾವಿದರು ಕಂಬದ ಮೇಲೆ ವಿವಿಧ
              ಭಂಗಿಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತಾರೆ. ಇದು ಶಕ್ತಿ, ಸಮತೋಲನ ಮತ್ತು ಅಚಲತೆಯನ್ನು
              ಅಗತ್ಯವಿಡುತ್ತದೆ.
            </p>

            <div className="qa-block">
              <div className="q">What does the word &ldquo;Mallakamba&rdquo; mean?</div>
              <div className="a">
                &ldquo;Mallakamba&rdquo; combines two words: <em>malla</em>, meaning
                wrestler, and <em>khamba</em>, meaning pole.
              </div>
            </div>

            <div className="qa-block">
              <div className="q">
                In which two Indian states is Mallakamba most commonly practiced?
              </div>
              <div className="a">
                Karnataka and Maharashtra are the two states most associated with the
                sport.
              </div>
            </div>

            <h2>Vocabulary &amp; pronunciation</h2>
            <p className="kn-body">
              <strong>ಪ್ರಾಚೀನ</strong> (prachina) — ancient ·{" "}
              <strong>ಕ್ರೀಡೆ</strong> (kride) — sport ·{" "}
              <strong>ಕಂಬ</strong> (kamba) — pole ·{" "}
              <strong>ಸಮತೋಲನ</strong> (samatolana) — balance
            </p>
          </div>

          {/* ── Worksheet ── */}
          <div className={`pane${activePane === "worksheet" ? " active" : ""}`} id="worksheet">
            <div className="worksheet-card">
              <h2>Worksheet · 12 questions</h2>
              <ol>
                <li>Write the meaning of Mallakamba.</li>
                <li>Name the two states where it is commonly practiced.</li>
                <li>Explain why balance is important in this sport.</li>
                <li>Translate: ಕಂಬ, ಕ್ರೀಡೆ, ಸಮತೋಲನ.</li>
              </ol>
            </div>
          </div>

          {/* ── Audio ── */}
          <div className={`pane${activePane === "audio" ? " active" : ""}`} id="audio">
            <div className="worksheet-card">
              <h2>Audio lesson</h2>
              <p>Audio duration: 8:42. Current progress: 3:02.</p>
              <AudioPlayer />
            </div>
          </div>

          {/* ── Q&A ── */}
          <div className={`pane${activePane === "qa" ? " active" : ""}`} id="qa">
            <div className="qa-block">
              <div className="q">Why is Mallakamba considered difficult?</div>
              <div className="a">
                It needs strength, balance, flexibility, and regular practice.
              </div>
            </div>
            <div className="qa-block">
              <div className="q">What is the main apparatus used?</div>
              <div className="a">A vertical wooden pole is the main apparatus.</div>
            </div>
          </div>

          {/* ── PDF ── */}
          <div className={`pane${activePane === "pdf" ? " active" : ""}`} id="pdf">
            <div className="worksheet-card">
              <h2>Download PDF</h2>
              <p>Connect this button to your chapter PDF field in WordPress.</p>
              <button className="btn btn--primary">📄 Download Mallakamba PDF</button>
            </div>
          </div>
        </article>

        <ChapterSidebar />
      </section>
    </>
  );
}
