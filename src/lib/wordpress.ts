const API_URL = process.env.WORDPRESS_API_URL ?? "http://forkannada.local/wp-json/wp/v2";

export async function getLessons() {
  const response = await fetch(`${API_URL}/lesson?_embed`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lessons");
  }

  return response.json();
}

export async function getLessonBySlug(slug: string) {
  const response = await fetch(`${API_URL}/lesson?slug=${slug}&_embed`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lesson");
  }

  const lessons = await response.json();
  return lessons?.[0] ?? null;
}

export async function getBoards() {
  const response = await fetch(`${API_URL}/board`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch boards");
  }

  return response.json();
}

export async function getGrades() {
  const response = await fetch(`${API_URL}/grade`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch grades");
  }

  return response.json();
}

export async function getLessonTypes() {
  const response = await fetch(`${API_URL}/lesson_type`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch lesson types");
  }

  return response.json();
}

type LessonFilters = {
  board?: string | number;
  grade?: string | number;
  type?: string;
  search?: string;
};

export async function getLessonsByFilter(filters: LessonFilters = {}) {
  const lessons = await getLessons();

  const board = normalizeFilterValue(filters.board);
  const grade = normalizeFilterValue(filters.grade);
  const type = normalizeFilterValue(filters.type);
  const search = normalizeFilterValue(filters.search);

  return lessons.filter((lesson: any) => {
    const terms = lesson._embedded?.["wp:term"]?.flat() || [];
    const lessonBoard = terms.find((term: any) => term.taxonomy === "board");
    const lessonGrade = terms.find((term: any) => term.taxonomy === "grade");
    const lessonType = terms.find((term: any) => term.taxonomy === "lesson_type");
    const title = stripHtml(lesson.title?.rendered || "");
    const content = stripHtml(lesson.content?.rendered || "");

    const matchesBoard = !board || matchesTerm(lessonBoard, board);
    const matchesGrade = !grade || matchesTerm(lessonGrade, grade);
    const matchesType = !type || matchesTypeTerm(lessonType, type);
    const matchesSearch =
      !search || title.toLowerCase().includes(search) || content.toLowerCase().includes(search);

    return matchesBoard && matchesGrade && matchesType && matchesSearch;
  });
}

function normalizeFilterValue(value?: string | number) {
  if (value === undefined || value === null || value === "") return "";
  return String(value).trim().toLowerCase();
}

function matchesTerm(term: any, filter: string) {
  if (!term) return false;
  return String(term.id) === filter || normalizeTermValue(term.slug) === filter || normalizeTermValue(term.name) === filter;
}

function matchesTypeTerm(term: any, filter: string) {
  if (!term) return false;
  return matchesTerm(term, filter);
}

function normalizeTermValue(value: string) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function stripHtml(value: string) {
  return String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
