export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-footer-brand">
        <a className="brand" href="/">
          <span className="brand-glyph">ಕ</span>
          <span className="brand-word">For Kannada</span>
        </a>
        <p>
          The friendly Kannada library for students. Made by For Kannada and
          powered by WordPress.
        </p>
      </div>

      <div>
        <h6>Learn</h6>
        <ul>
          <li><a href="/lessons">Curriculum</a></li>
          <li><a href="/lessons?type=worksheet">Worksheets</a></li>
          <li><a href="/lessons?type=gadegalu">Gadegalu</a></li>
          <li><a href="/lessons?type=essay">Essays</a></li>
        </ul>
      </div>

      <div>
        <h6>Tools</h6>
        <ul>
          <li><a href="/lessons?type=letter">Letter templates</a></li>
          <li><a href="/lessons?type=grammar">Grammar</a></li>
          <li><a href="/lessons?type=question-paper">Q-Papers</a></li>
          <li><a href="/lessons?type=story">Q&A Forum</a></li>
        </ul>
      </div>

      <div>
        <h6>About</h6>
        <ul>
          <li><a href="/about">Our story</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/newsletter">Newsletter</a></li>
          <li><a href="/privacy-policy">Privacy</a></li>
        </ul>
      </div>
    </footer>
  );
}
