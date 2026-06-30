import { Curriculum, TaxonomyTerm } from "@/types/lesson";

type HomePickerProps = {
  curriculums: Curriculum[];
};

export default function HomePicker({ curriculums }: HomePickerProps) {
  const boards = uniqueTerms(curriculums.flatMap((curriculum) => curriculum.board));
  const grades = uniqueTerms(curriculums.flatMap((curriculum) => curriculum.grade));
  const defaultBoard = boards[0]?.id ? String(boards[0].id) : "";
  const defaultGrade = grades[0]?.id ? String(grades[0].id) : "";

  return (
    <form className="home-picker" action="/gradehub">
      <div className="field-group">
        <label className="field-label" htmlFor="board">
          I am in
        </label>
        <select className="field" id="board" name="board" defaultValue={defaultBoard}>
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="grade">
          Grade
        </label>
        <select className="field" id="grade" name="grade" defaultValue={defaultGrade}>
          {grades.map((grade) => (
            <option key={grade.id} value={grade.id}>
              {grade.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label className="field-label" htmlFor="curriculum">
          Curriculum
        </label>
        <select className="field" id="curriculum" name="curriculum" defaultValue="">
          <option value="">Auto match</option>
          {curriculums.map((curriculum) => (
            <option key={curriculum.id} value={curriculum.slug}>
              {stripHtml(curriculum.title.rendered)}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn-primary btn-lg" type="submit">
        Take me there
      </button>
    </form>
  );
}

function uniqueTerms(terms: TaxonomyTerm[]) {
  const seen = new Set<number>();
  return terms.filter((term) => {
    if (seen.has(term.id)) return false;
    seen.add(term.id);
    return true;
  });
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}
