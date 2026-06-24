// import Header from "@/components/header";
// import HomeFooter from "@/components/home-footer";
// import Link from "next/link";

// function ChapterAkki() {
//   return (
//     <svg
//       className="ch-akki"
//       viewBox="0 0 110 110"
//       role="img"
//       aria-label="Akki reading mascot"
//     >
//       <path
//         d="M55 8c25 0 45 20 47 44 2 28-24 50-52 50-25 0-40-12-42-40C6 34 30 8 55 8Z"
//         fill="#FFD400"
//         stroke="#1F1610"
//         strokeWidth="3"
//       />
//       <text
//         x="54"
//         y="72"
//         fontFamily="var(--font-kannada)"
//         fontSize="60"
//         fontWeight="700"
//         textAnchor="middle"
//         fill="#1F1610"
//       >
//         ಕ
//       </text>
//       <ellipse cx="36" cy="44" rx="5" ry="5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.8" />
//       <ellipse cx="72" cy="44" rx="5" ry="5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.8" />
//       <circle cx="37" cy="47" r="2.2" fill="#1F1610" />
//       <circle cx="73" cy="47" r="2.2" fill="#1F1610" />
//       <g transform="translate(0 78)">
//         <rect x="22" y="0" width="66" height="22" fill="#FFFFFF" stroke="#1F1610" strokeWidth="2.2" rx="2" />
//         <line x1="55" y1="0" x2="55" y2="22" stroke="#1F1610" strokeWidth="2" />
//         <line x1="30" y1="7" x2="48" y2="7" stroke="#1F1610" strokeWidth="1.2" />
//         <line x1="30" y1="13" x2="48" y2="13" stroke="#1F1610" strokeWidth="1.2" />
//         <line x1="62" y1="7" x2="80" y2="7" stroke="#1F1610" strokeWidth="1.2" />
//         <line x1="62" y1="13" x2="80" y2="13" stroke="#1F1610" strokeWidth="1.2" />
//       </g>
//     </svg>
//   );
// }

// function AudioAkki() {
//   return (
//     <svg className="akki-xs" viewBox="0 0 64 64" aria-hidden="true">
//       <path
//         d="M32 5c15 0 27 12 28 27 1 17-15 28-32 28-14 0-23-8-24-24C3 20 17 5 32 5Z"
//         fill="#FFFFFF"
//         stroke="#1F1610"
//         strokeWidth="2.2"
//       />
//       <text
//         x="31"
//         y="43"
//         fontFamily="var(--font-kannada)"
//         fontSize="36"
//         fontWeight="700"
//         textAnchor="middle"
//         fill="#1F1610"
//       >
//         ಕ
//       </text>
//       <ellipse cx="20" cy="25" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
//       <ellipse cx="42" cy="25" rx="3" ry="3.5" fill="#FFFFFF" stroke="#1F1610" strokeWidth="1.2" />
//       <circle cx="21" cy="26" r="1.3" fill="#1F1610" />
//       <circle cx="43" cy="26" r="1.3" fill="#1F1610" />
//       <path d="M8 22C8 12 22 5 31 5c9 0 23 7 23 17" stroke="#FC261C" strokeWidth="3" fill="none" />
//       <rect x="3" y="20" width="8" height="12" rx="2.5" fill="#FC261C" stroke="#1F1610" strokeWidth="1.5" />
//       <rect x="51" y="20" width="8" height="12" rx="2.5" fill="#FC261C" stroke="#1F1610" strokeWidth="1.5" />
//     </svg>
//   );
// }

// export default function ChapterPage() {
//   return (
//     <main className="fk-page chapter-screen">
//       <Header />

//       <section className="chapter-page" aria-labelledby="chapter-title">
//         <div className="fk-breadcrumb">
//           <Link href="/">Home</Link> <span>·</span> <Link href="/lessons">ICSE</Link>{" "}
//           <span>·</span> <Link href="/lessons">Grade VI</Link> <span>·</span>{" "}
//           <strong>Mallakamba</strong>
//         </div>

//         <div className="ch-hero">
//           <div className="ch-meta-row">
//             <span className="pill pill--soft">ICSE · Grade VI</span>
//             <span className="pill">Lesson · Gadya</span>
//             <span className="pill pill--yellow">⏱ 8 min read</span>
//             <span className="pill pill--blue">♪ Audio · 8:42</span>
//             <span className="pill pill--green">12 questions</span>
//           </div>
//           <h1 id="chapter-title" className="ch-title-kn">
//             ಮಲ್ಲಕಂಬ
//           </h1>
//           <div className="ch-title-en">Mallakamba</div>
//           <div className="ch-actions">
//             <button className="btn btn--primary" type="button">
//               ▶ Start reading
//             </button>
//             <button className="btn btn--accent" type="button">
//               ⌘ Save
//             </button>
//             <button className="btn btn--light" type="button">
//               📄 Download PDF
//             </button>
//             <button className="btn btn--ghost" type="button">
//               💬 Share
//             </button>
//           </div>
//           <ChapterAkki />
//         </div>

//         <div className="ch-tabs-wrap" aria-label="Chapter tools">
//           <button className="tab on" type="button">
//             📖 Notes
//           </button>
//           <button className="tab" type="button">
//             ✏ Worksheet · 12
//           </button>
//           <button className="tab" type="button">
//             ♪ Audio
//           </button>
//           <button className="tab" type="button">
//             💬 Q&A · 8
//           </button>
//           <button className="tab" type="button">
//             📄 Download PDF
//           </button>
//           <button className="tab text-size-tab" type="button">
//             A− A+
//           </button>
//         </div>

//         <div className="ch-body">
//           <article className="ch-content">
//             <div className="lead">
//               ಮಲ್ಲಕಂಬವು ಭಾರತದ ಪ್ರಾಚೀನ ಕ್ರೀಡೆಗಳಲ್ಲಿ ಒಂದು. ಇದನ್ನು ಮುಖ್ಯವಾಗಿ
//               ಕರ್ನಾಟಕ ಮತ್ತು ಮಹಾರಾಷ್ಟ್ರದಲ್ಲಿ ಆಡಲಾಗುತ್ತದೆ.
//             </div>

//             <h2>About the lesson</h2>
//             <p>
//               Mallakamba is an ancient Indian sport practiced primarily in
//               Karnataka and Maharashtra. The word combines <em>malla</em>{" "}
//               (wrestler) and <em>khamba</em> (pole). A vertical wooden pole,
//               anointed with castor oil, becomes the gymnast&apos;s apparatus and
//               their opponent.
//             </p>
//             <p>
//               The lesson introduces young readers to the discipline behind the
//               spectacle: the years of practice, the strength required, and why a
//               12th-century court sport still finds students today.
//             </p>

//             <h2>
//               Summary <span className="kn muted-heading">— ಸಾರಾಂಶ</span>
//             </h2>
//             <p className="kn-body">
//               ಮಲ್ಲಕಂಬವು ಒಂದು ವಿಶಿಷ್ಟ ಕ್ರೀಡೆ. ಇದರಲ್ಲಿ ಕಲಾವಿದರು ಕಂಬದ ಮೇಲೆ ವಿವಿಧ
//               ಭಂಗಿಗಳನ್ನು ಪ್ರದರ್ಶಿಸುತ್ತಾರೆ. ಇದು ಶಕ್ತಿ, ಸಮತೋಲನ ಮತ್ತು ಅಚಲತೆಯನ್ನು
//               ಅಗತ್ಯಪಡುತ್ತದೆ.
//             </p>

//             <div className="qa-block">
//               <h3>What does the word &quot;Mallakamba&quot; mean?</h3>
//               <p>
//                 Mallakamba combines two words: <em>malla</em>, meaning wrestler,
//                 and <em>khamba</em>, meaning pole. Together they describe a
//                 wrestler&apos;s pole, the apparatus used for strength training
//                 and performance.
//               </p>
//             </div>

//             <div className="qa-block">
//               <h3>
//                 In which two Indian states is Mallakamba most commonly
//                 practiced?
//               </h3>
//               <p>
//                 Karnataka and Maharashtra are the two states most associated
//                 with the sport. Both have produced national champions and have
//                 active training schools in their major cities.
//               </p>
//             </div>

//             <h2>Vocabulary &amp; pronunciation</h2>
//             <p className="kn vocab">
//               <strong>ಪ್ರಾಚೀನ</strong> (pracina) — ancient ·{" "}
//               <strong>ಕ್ರೀಡೆ</strong> (kride) — sport ·{" "}
//               <strong>ಕಂಬ</strong> (kamba) — pole ·{" "}
//               <strong>ಸಮತೋಲನ</strong> (samatolana) — balance
//             </p>
//           </article>

//           <aside className="ch-side" aria-label="Chapter sidebar">
//             <section className="ch-audio">
//               <h2>
//                 <AudioAkki />
//                 Akki reads with you
//               </h2>
//               <p>Tap play and hear the lesson narrated aloud.</p>
//               <div className="ch-audio-row">
//                 <button className="play-btn" type="button" aria-label="Play Mallakamba audio">
//                   ▶
//                 </button>
//                 <div className="ch-audio-meta">
//                   <strong>Mallakamba</strong>
//                   <span>3:02 / 8:42</span>
//                   <div className="ch-audio-prog" />
//                 </div>
//               </div>
//             </section>

//             <section className="ch-side-card">
//               <h2>Up next in Grade VI</h2>
//               <div className="next-kn">ತರಕಾರಿಗಳ ಮೇಳ</div>
//               <div className="next-en">Tarakarigala Mela</div>
//               <div className="next-meta">Lesson · 8 min</div>
//               <button className="btn btn--primary btn--sm" type="button">
//                 Continue →
//               </button>
//             </section>

//             <section className="ch-side-card">
//               <h2>You might also like</h2>
//               <ul>
//                 <li>Punyakoti — same grade poem</li>
//                 <li>Sport &amp; tradition — theme</li>
//                 <li>Bandedda Mundaragi Bheemaraya — Grade VII</li>
//               </ul>
//             </section>
//           </aside>
//         </div>
//       </section>

//       <HomeFooter />
//     </main>
//   );
// }





import Header from "@/components/header";
import HomeFooter from "@/components/home-footer";
import { ChapterHero } from "@/components/chapter/ChapterHero";
import { ChapterTabs } from "@/components/chapter/ChapterTabs";
import Link from "next/link";

export default function MallakambaChapterPage() {
  return (
    <main className="page-frame">
      <div className="fk">
        <Header />

        <div className="fk-breadcrumb">
          <Link href="/">Home</Link> · <Link href="#">ICSE</Link> ·{" "}
          <Link href="#">Grade VI</Link> · <strong>Mallakamba</strong>
        </div>

        <ChapterHero />
        <ChapterTabs />
      </div>
    </main>
  );
}
