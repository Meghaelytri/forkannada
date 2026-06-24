import { Lesson } from "@/types/lesson";

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

export function getLessonKannadaTitle(lesson: Lesson) {
  return stripHtml(lesson.title.rendered);
}

export function getLessonEnglishTitle(lesson: Lesson) {
  return stripHtml(lesson.english_title || lesson.meta?.english_title || slugToTitle(lesson.slug));
}

function slugToTitle(slug: string) {
  const text = String(slug || "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "";
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
