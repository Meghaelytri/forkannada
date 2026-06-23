import AkkiMascot from "./akki-mascot";

export default function HomeCta() {
  return (
    <section className="home-cta">
      <div>
        <h2>
          Get the <em>worksheet pack</em> for your class.
        </h2>
        <p>
          Printable Kannada practice material for students and parents. Choose
          the class, enter an email, and collect the pack when your local
          WordPress form is connected.
        </p>
        <form className="home-cta-form">
          <div className="field-group">
            <label className="field-label" htmlFor="cta-grade">
              Your grade
            </label>
            <select className="field" id="cta-grade" name="grade">
              <option>Class 6</option>
              <option>Class 5</option>
              <option>Class 7</option>
              <option>Class 10</option>
            </select>
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="cta-email">
              Email
            </label>
            <input className="field" id="cta-email" name="email" placeholder="your@email.com" />
          </div>
          <button className="btn btn-primary" type="submit">
            Send it
          </button>
        </form>
      </div>
      <div className="home-cta-art" aria-hidden="true">
        <AkkiMascot mood="celebrate" />
      </div>
    </section>
  );
}
