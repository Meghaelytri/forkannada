const grades = [
  "class-1",
  "class-2",
  "class-3",
  "class-4",
  "class-5",
  "class-6",
  "class-7",
  "class-8",
  "class-9",
  "class-10",
];

export default function HomePicker() {
  return (
    <form className="home-picker" action="/lessons">
      <div className="field-group">
        <label className="field-label" htmlFor="board">
          I am in
        </label>
        <select className="field" id="board" name="board" defaultValue="icse">
          <option value="icse">ICSE</option>
          <option value="cbse">CBSE</option>
          <option value="state">State</option>
        </select>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="grade">
          Grade
        </label>
        <select className="field" id="grade" name="grade" defaultValue="class-6">
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade.replace("-", " ").replace(/\b\w/g, (char) => char.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="search">
          Or search
        </label>
        <input
          className="field"
          id="search"
          name="search"
          placeholder="Mallakamba, gadegalu, letter..."
        />
      </div>

      <button className="btn btn-primary btn-lg" type="submit">
        Take me there
      </button>
    </form>
  );
}
