import Link from "next/link";

export default function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="footer-w">
      <div className="home-footer-brand">
        <Link className="brand" href="/">
          <span className="brand-glyph">ಕ</span>
          <span className="brand-word">For Kannada</span>
        </Link>
        <p>
          The friendly Kannada library for students. Made by For Kannada and
          powered by WordPress.
        </p>
      </div>

      <div>
        <h6>Learn</h6>
        <ul>
          <li><Link href="/lessons">Curriculum</Link></li>
          <li><Link href="/lessons?type=worksheet">Worksheets</Link></li>
          <li><Link href="/lessons?type=gadegalu">Gadegalu</Link></li>
          <li><Link href="/lessons?type=essay">Essays</Link></li>
        </ul>
      </div>

      <div>
        <h6>Tools</h6>
        <ul>
          <li><Link href="/lessons?type=letter">Letter templates</Link></li>
          <li><Link href="/lessons?type=grammar">Grammar</Link></li>
          <li><Link href="/lessons?type=question-paper">Q-Papers</Link></li>
          <li><Link href="/lessons?type=story">Q&A Forum</Link></li>
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
     </div> 
    </footer>
  );
}
