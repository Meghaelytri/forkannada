export default function Header() {
  return (
    <header className="site-header">
      <div className="site-nav">
        <a className="brand" href="/">
          <span className="brand-glyph">ಕ</span>
          <span className="brand-word">For Kannada</span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          <a className="on" href="/lessons">
            Curriculum
          </a>
          <a href="/lessons?type=worksheets">Worksheets</a>
          <a href="/lessons?type=gadegalu">Gadegalu</a>
          <a href="/lessons?type=essays">Essays</a>
          <a href="/lessons?type=letters">Letters</a>
          <a href="/lessons">More</a>
        </nav>

        <div className="nav-actions">
          <a className="nav-search" href="/lessons">
            Search
          </a>
          <a className="nav-cta" href="#free-pack">
            Get free pack
          </a>
        </div>
      </div>
    </header>
  );
}
