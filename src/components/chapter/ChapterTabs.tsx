"use client";

import { useState } from "react";
import { AudioPlayer } from "@/components/chapter/AudioPlayer";
import { ChapterSidebar } from "@/components/chapter/ChapterSidebar";
import { Lesson } from "@/types/lesson";

type PaneId = "notes" | "worksheet" | "audio" | "qa" | "pdf";

const TABS: { id: PaneId; label: string }[] = [
  { id: "notes", label: "Notes" },
  { id: "worksheet", label: "Worksheet" },
  { id: "audio", label: "Audio" },
  { id: "qa", label: "Q&A" },
  { id: "pdf", label: "Download PDF" },
];

type ChapterTabsProps = {
  lessonTitle: string;
  contentHtml: string;
  excerpt?: string;
  relatedLessons: Lesson[];
  lessonAudio?: string;
  lessonPdf?: string;
};

export function ChapterTabs({
  lessonTitle,
  contentHtml,
  excerpt,
  relatedLessons,
  lessonAudio,
  lessonPdf,
}: ChapterTabsProps) {
  const [activePane, setActivePane] = useState<PaneId>("notes");
  const [fontSize, setFontSize] = useState(16);

  const changeFont = (delta: number) => {
    setFontSize((prev) => Math.max(14, Math.min(22, prev + delta)));
  };

  return (
    <>
      <section className="ch-tabs-wrap" aria-label="Chapter filters">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`tab${activePane === tab.id ? " on" : ""}`}
            onClick={() => setActivePane(tab.id)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
        <div className="font-tools">
          <button className="tab" onClick={() => changeFont(-1)} type="button">A-</button>
          <button className="tab" onClick={() => changeFont(1)} type="button">A+</button>
        </div>
      </section>

      <section className="ch-body">
        <article
          className="ch-content"
          id="reader"
          style={{ "--reader-size": `${fontSize}px` } as React.CSSProperties}
        >
          <div className={`pane${activePane === "notes" ? " active" : ""}`} id="notes">
            {excerpt && <div className="lead" dangerouslySetInnerHTML={{ __html: excerpt }} />}
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>

          <div className={`pane${activePane === "worksheet" ? " active" : ""}`} id="worksheet">
            <div className="worksheet-card">
              <h2>Worksheet</h2>
              <p>Worksheet material appears here when it is connected from WordPress.</p>
            </div>
          </div>

          <div className={`pane${activePane === "audio" ? " active" : ""}`} id="audio">
            <div className="worksheet-card">
              <h2>Audio lesson</h2>
              <AudioPlayer title={lessonTitle} audioUrl={lessonAudio} />
            </div>
          </div>

          <div className={`pane${activePane === "qa" ? " active" : ""}`} id="qa">
            <div className="qa-block">
              <div className="q">Practice questions</div>
              <div className="a">Question and answer material can be connected from WordPress custom fields.</div>
            </div>
          </div>

          <div className={`pane${activePane === "pdf" ? " active" : ""}`} id="pdf">
            <div className="worksheet-card">
              <h2>Download PDF</h2>
              {lessonPdf ? (
                <a className="btn btn--primary" href={lessonPdf}>
                  Download lesson PDF
                </a>
              ) : (
                <p>PDF material appears here when it is connected from WordPress.</p>
              )}
            </div>
          </div>
        </article>

        <ChapterSidebar lessonTitle={lessonTitle} relatedLessons={relatedLessons} lessonAudio={lessonAudio} />
      </section>
    </>
  );
}
