

// app/curriculum/icse/grade/[slug]/page.tsx
// (or place at: app/curriculum/icse/grade-vi/page.tsx)
// Import the CSS module as: import styles from "./grade-hub.module.css"
// and keep grade-hub.module.css alongside this file.

import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import Link from "next/link";
import styles from "./grade-hub.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardVariant = "green" | "red" | "white" | "poem";

interface Chapter {
  id: number;
  chapterNo: string;
  type: "LESSON" | "POEM" | "PLAY";
  titleKannada: string;
  titleEnglish: string;
  duration: string;
  variant: CardVariant;
  completed?: boolean;
  isUpNext?: boolean;
  hasAudio?: boolean;
  showContinue?: boolean;
  typePill?: "poem";
}

// ─── Mock Data (replace with your real data fetching) ─────────────────────────

const chapters: Chapter[] = [
  {
    id: 1,
    chapterNo: "CHAPTER 01",
    type: "LESSON",
    titleKannada: "ದೊಡ್ಡವರ ದಾರಿ",
    titleEnglish: "Doddavara Dari",
    duration: "7 min",
    variant: "green",
    completed: true,
  },
  {
    id: 2,
    chapterNo: "CHAPTER 02",
    type: "LESSON",
    titleKannada: "ಮಂಗಳ ಗ್ರಹದಲ್ಲಿ ಪುಟ್ಟಿ",
    titleEnglish: "Mangala Grahadalli Putti",
    duration: "9 min",
    variant: "green",
    completed: true,
  },
  {
    id: 3,
    chapterNo: "CHAPTER 03",
    type: "LESSON",
    titleKannada: "ಪಂಚತಂತ್ರ",
    titleEnglish: "Panchatantra",
    duration: "8 min",
    variant: "green",
    completed: true,
  },
  {
    id: 4,
    chapterNo: "CHAPTER 04",
    type: "LESSON",
    titleKannada: "ಡಾ ರಾಜಕುಮಾರ್",
    titleEnglish: "Da. Rajakumar",
    duration: "6 min",
    variant: "green",
    completed: true,
  },
  {
    id: 5,
    chapterNo: "CHAPTER 05",
    type: "LESSON",
    titleKannada: "ಧನ್ಯವಾದ ಹೇಳಿದ ಕೊಕ್ಕರೆ",
    titleEnglish: "Dhanyavada Helida Kokkare",
    duration: "7 min",
    variant: "green",
    completed: true,
  },
  {
    id: 6,
    chapterNo: "CHAPTER 06",
    type: "LESSON",
    titleKannada: "ಮಲ್ಲಕಂಬ",
    titleEnglish: "Mallakamba",
    duration: "8 min",
    variant: "red",
    isUpNext: true,
    showContinue: true,
    hasAudio: true,
  },
  {
    id: 7,
    chapterNo: "CHAPTER 07",
    type: "LESSON",
    titleKannada: "ತರಕಾರಿಗಳ ಮೇಳ",
    titleEnglish: "Tarakarigala Mela",
    duration: "8 min",
    variant: "white",
  },
  {
    id: 8,
    chapterNo: "CHAPTER 08",
    type: "LESSON",
    titleKannada: "ಗಂಗವ್ವ ತಾಯಿ",
    titleEnglish: "Gangavva Tayi",
    duration: "8 min",
    variant: "white",
  },
  {
    id: 9,
    chapterNo: "CHAPTER 09",
    type: "POEM",
    titleKannada: "ಪುಣ್ಯಕೋಟಿ",
    titleEnglish: "Punyakoti",
    duration: "5 min",
    variant: "poem",
    typePill: "poem",
  },
];

const totalChapters = 25;
const completedChapters = 7;

// ─── Sub-components ───────────────────────────────────────────────────────────

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
    <div className={cardClass}>
      {/* Meta row */}
      <div className={styles.cardMeta}>
        <span>{chapter.chapterNo}</span>
        <span>·</span>
        <span>{chapter.type}</span>
        {chapter.completed && <span className={styles.checkIcon} />}
        {chapter.isUpNext && (
          <>
            <span>·</span>
            <span className={styles.upNextBadge}>UP NEXT →</span>
          </>
        )}
      </div>

      {/* Titles */}
      <p className={styles.cardTitleKannada}>{chapter.titleKannada}</p>
      <p className={styles.cardTitleEn}>{chapter.titleEnglish}</p>

      {/* Footer */}
      <div className={styles.cardFooter}>
        {chapter.showContinue && (
          <button className={styles.continueBtn}>Continue</button>
        )}
        <span className={styles.timePill}>{chapter.duration}</span>
        {chapter.hasAudio && (
          <span className={styles.audioPill}>Audio</span>
        )}
        {chapter.typePill === "poem" && (
          <span className={styles.poemPill}>Poem</span>
        )}
        {!chapter.showContinue && (
          <span className={styles.iconBtn}>?</span>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GradeHubPage() {
  return (
    <>
      <Header />
   
    <div className={styles.page}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/curriculum">Curriculum</Link>
        <span>›</span>
        <Link href="/curriculum/icse">ICSE</Link>
        <span>›</span>
        <span>Grade VI</span>
      </nav>

      {/* Hero Card */}
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <div className={styles.heroTopRow}>
            <div className={styles.heroLeft}>
              {/* Badges */}
              <div className={styles.heroBadges}>
                <span className={styles.badgeIcse}>ICSE</span>
                <span className={styles.badgeLabel}>
                  Tili Kannada · 2nd Language
                </span>
              </div>

              {/* Grade watermark */}
              <div className={styles.gradeWatermark}>Grade VI</div>

              {/* Subtitle */}
              <p className={styles.heroTitle}>
                ಆರನೇ ತರಗತಿ — ಪಠ್ಯಪುಸ್ತಕದ ಎಲ್ಲ ಪಾಠಗಳು
              </p>

              {/* Stats */}
              <div className={styles.heroStats}>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>12</span>
                  <span className={styles.statLabel}>Lessons (Gadya)</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>8</span>
                  <span className={styles.statLabel}>Poems (Padya)</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>5</span>
                  <span className={styles.statLabel}>Plays + Stories</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statNumber}>12 h</span>
                  <span className={styles.statLabel}>Audio total</span>
                </div>
              </div>

              {/* Progress */}
              <div className={styles.progressSection}>
                <p className={styles.progressLabel}>
                  Your Progress · {completedChapters} of {totalChapters} chapters
                </p>
                <ProgressDots
                  total={totalChapters}
                  completed={completedChapters}
                  current={completedChapters}
                />
              </div>
            </div>

            {/* Mascot */}
            <div className={styles.heroMascot}>ಕ</div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterLeft}>
          <button className={`${styles.filterBtn} ${styles.active}`}>
            All · 25
          </button>
          <button className={styles.filterBtn}>Lessons · 12</button>
          <button className={styles.filterBtn}>Poems · 8</button>
          <button className={styles.filterBtn}>Plays · 5</button>
          <button className={styles.filterBtn}>Worksheets only</button>
          <button className={`${styles.filterBtn} ${styles.audioBtn}`}>
            With audio
          </button>
        </div>
        <button className={styles.sortBtn}>Sort: Textbook order</button>
      </div>

      {/* Chapters Grid */}
      <div className={styles.chaptersGrid}>
        {chapters.map((ch) => (
          <ChapterCard key={ch.id} chapter={ch} />
        ))}
      </div>
    </div>
     <HomeFooter />
     </>
  );
}
