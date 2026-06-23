const grades = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
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
            <option key={grade} value={grade.toLowerCase().replace(" ", "-")}>
              {grade}
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
