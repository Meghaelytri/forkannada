import AkkiMascot from "./akki-mascot";

export default function HeroSection() {
  return (
    <section className="home-hero">
      <div className="home-hero-inner">
        <div>
          <div className="home-greet">
            <AkkiMascot size="sm" />
            <span>Namaskara!</span> Welcome back, friend.
          </div>

          <h1>
            Kannada is <span className="squiggle">fun</span>,
            <br />
            and we will prove it.
          </h1>

          <p className="sub">
            Notes, worksheets, grammar, essays, and chapter support for every
            Kannada learner from Class 1 to Class 10. Made for students,
            helpful for parents.
          </p>

          <p className="sub-kn">ಆಟ ಆಡ್ತಾ ಕನ್ನಡ ಕಲಿಯೋಣ. ಒಟ್ಟಿಗೇ.</p>
        </div>

        <div className="home-hero-art">
          <AkkiMascot />
          <div className="sticker sticker-tl sticker-red">Classes 1-10</div>
          <div className="sticker sticker-br sticker-yellow">
            Free <em>forever</em>
          </div>
        </div>
      </div>
    </section>
  );
}
