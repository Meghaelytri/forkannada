// import { Curriculum, FeaturedMedia, Lesson, TaxonomyTerm } from "@/types/lesson";

// const API_URL = process.env.WORDPRESS_API_URL ?? "http://for-kannada.local/wp-json/wp/v2";

// type RestRecord = Record<string, unknown>;

// type CurriculumFilters = {
//   board?: string | number;
//   grade?: string | number;
//   book_name?: string | number;
//   academic_year?: string | number;
//   curriculum?: string;
// };

// type LessonFilters = CurriculumFilters & {
//   type?: string | number;
//   search?: string;
// };

// export async function getCurriculums(filters: CurriculumFilters = {}): Promise<Curriculum[]> {
//   const params = new URLSearchParams({ _embed: "1", per_page: "100" });
//   addTaxQuery(params, "board", filters.board);
//   addTaxQuery(params, "grade", filters.grade);
//   addTaxQuery(params, "book_name", filters.book_name);
//   addTaxQuery(params, "academic_year", filters.academic_year);
//   if (filters.curriculum) params.set("slug", filters.curriculum);

//   const records = await fetchWp<RestRecord[]>(`/curriculum?${params.toString()}`);
//   return records.map(normalizeCurriculum);
// }

// export async function getCurriculumBySlug(slug: string): Promise<Curriculum | null> {
//   const params = new URLSearchParams({
//     slug: slugParam(slug),
//     _embed: "1",
//     per_page: "1",
//   });
//   const records = await fetchWp<RestRecord[]>(`/curriculum?${params.toString()}`);
//   return records[0] ? normalizeCurriculum(records[0]) : null;
// }

// export async function getLessonsByCurriculum(curriculum: Curriculum | number): Promise<Lesson[]> {
//   const current = typeof curriculum === "number" ? await getCurriculumById(curriculum) : curriculum;
//   if (!current || current.lessonIds.length === 0) return [];

//   const params = new URLSearchParams({
//     include: current.lessonIds.join(","),
//     orderby: "include",
//     per_page: "100",
//     _embed: "1",
//   });
//   const records = await fetchWp<RestRecord[]>(`/lesson?${params.toString()}`);
//   return records.map(normalizeLesson);
// }

// export async function getLessons(): Promise<Lesson[]> {
//   const records = await fetchWp<RestRecord[]>("/lesson?_embed=1&per_page=100");
//   return records.map(normalizeLesson);
// }

// export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
//   const params = new URLSearchParams({
//     slug: slugParam(slug),
//     _embed: "1",
//     per_page: "1",
//   });
//   const records = await fetchWp<RestRecord[]>(`/lesson?${params.toString()}`);
//   return records[0] ? normalizeLesson(records[0]) : null;
// }

// export async function getLessonsByFilter(filters: LessonFilters = {}): Promise<Lesson[]> {
//   const hasCurriculumFilters = Boolean(filters.board || filters.grade || filters.book_name || filters.academic_year || filters.curriculum);
//   const sourceLessons = hasCurriculumFilters
//     ? uniqueLessons((await Promise.all((await getCurriculums(filters)).map(getLessonsByCurriculum))).flat())
//     : await getLessons();

//   const type = normalizeFilterValue(filters.type);
//   const search = normalizeFilterValue(filters.search);

//   return sourceLessons.filter((lesson) => {
//     const title = stripHtml(lesson.title.rendered).toLowerCase();
//     const content = stripHtml(lesson.content.rendered).toLowerCase();
//     const lessonType = lesson.lessonType;
//     const matchesType = !type || matchesTerm(lessonType, type);
//     const matchesSearch = !search || title.includes(search) || content.includes(search);
//     return matchesType && matchesSearch;
//   });
// }

// export async function getBoards(): Promise<TaxonomyTerm[]> {
//   return getTerms("board");
// }

// export async function getGrades(): Promise<TaxonomyTerm[]> {
//   return getTerms("grade");
// }

// export async function getBookNames(): Promise<TaxonomyTerm[]> {
//   return getTerms("book_name");
// }

// export async function getAcademicYears(): Promise<TaxonomyTerm[]> {
//   return getTerms("academic_year");
// }

// export async function getLessonTypes(): Promise<TaxonomyTerm[]> {
//   return getTerms("lesson_type");
// }

// async function getCurriculumById(id: number): Promise<Curriculum | null> {
//   const record = await fetchWp<RestRecord>(`/curriculum/${id}?_embed=1`);
//   return record ? normalizeCurriculum(record) : null;
// }

// async function getTerms(taxonomy: string): Promise<TaxonomyTerm[]> {
//   const records = await fetchWp<RestRecord[]>(`/${taxonomy}?per_page=100`);
//   return records.map((record) => ({
//     id: numberValue(record.id),
//     name: stringValue(record.name),
//     slug: stringValue(record.slug),
//     taxonomy,
//   }));
// }

// async function fetchWp<T>(path: string): Promise<T> {
//   const response = await fetch(`${API_URL}${path}`, { cache: "no-store" });
//   if (!response.ok) {
//     throw new Error(`WordPress request failed: ${response.status} ${response.statusText}`);
//   }
//   return response.json() as Promise<T>;
// }

// function normalizeCurriculum(record: RestRecord): Curriculum {
//   const termGroups = getEmbeddedTerms(record);
//   const acf = objectValue(record.acf);
//   const embeddedLessons = embeddedAcfPosts(record).map(normalizeLesson);

//   return {
//     id: numberValue(record.id),
//     slug: stringValue(record.slug),
//     link: stringValue(record.link),
//     title: renderedField(record.title),
//     content: renderedField(record.content),
//     board: termsByTaxonomy(termGroups, "board"),
//     grade: termsByTaxonomy(termGroups, "grade"),
//     book_name: termsByTaxonomy(termGroups, "book_name"),
//     academic_year: termsByTaxonomy(termGroups, "academic_year"),
//     lessonIds: numberArray(acf.select_lessons),
//     lessons: embeddedLessons,
//   };
// }

// function normalizeLesson(record: RestRecord): Lesson {
//   const termGroups = getEmbeddedTerms(record);
//   const lessonType = termsByTaxonomy(termGroups, "lesson_type")[0];
//   const featuredImage = featuredMedia(record)[0];

//   return {
//     id: numberValue(record.id),
//     slug: stringValue(record.slug),
//     link: stringValue(record.link),
//     title: renderedField(record.title),
//     content: renderedField(record.content),
//     excerpt: renderedField(record.excerpt),
//     featured_media: numberValue(record.featured_media),
//     featuredImage,
//     lesson_type: numberArray(record.lesson_type),
//     lessonType,
//     acf: objectValue(record.acf),
//     meta: objectValue(record.meta) as Lesson["meta"],
//     english_title: stringValue(record.english_title),
//     _embedded: {
//       "wp:featuredmedia": featuredImage ? [featuredImage] : [],
//       "wp:term": termGroups,
//     },
//   };
// }

// function getEmbeddedTerms(record: RestRecord): TaxonomyTerm[][] {
//   const embedded = objectValue(record._embedded);
//   const termGroups = embedded["wp:term"];
//   if (!Array.isArray(termGroups)) return [];

//   return termGroups.map((group) => {
//     if (!Array.isArray(group)) return [];
//     return group.map((term) => normalizeTerm(objectValue(term))).filter((term) => term.id > 0);
//   });
// }

// function embeddedAcfPosts(record: RestRecord): RestRecord[] {
//   const embedded = objectValue(record._embedded);
//   const posts = embedded["acf:post"];
//   return Array.isArray(posts) ? posts.map((post) => objectValue(post)) : [];
// }

// function featuredMedia(record: RestRecord): FeaturedMedia[] {
//   const embedded = objectValue(record._embedded);
//   const media = embedded["wp:featuredmedia"];
//   if (!Array.isArray(media)) return [];

//   return media.map((item) => {
//     const value = objectValue(item);
//     return {
//       id: numberValue(value.id),
//       source_url: stringValue(value.source_url),
//       alt_text: stringValue(value.alt_text),
//     };
//   }).filter((item) => item.source_url);
// }

// function normalizeTerm(record: RestRecord): TaxonomyTerm {
//   return {
//     id: numberValue(record.id),
//     name: stringValue(record.name),
//     slug: stringValue(record.slug),
//     taxonomy: stringValue(record.taxonomy),
//   };
// }

// function termsByTaxonomy(groups: TaxonomyTerm[][], taxonomy: string): TaxonomyTerm[] {
//   return groups.flat().filter((term) => term.taxonomy === taxonomy);
// }

// function addTaxQuery(params: URLSearchParams, key: string, value?: string | number) {
//   if (value === undefined || value === null || value === "") return;
//   params.set(key, String(value));
// }

// function matchesTerm(term: TaxonomyTerm | undefined, filter: string) {
//   if (!term) return false;
//   return String(term.id) === filter || normalizeTermValue(term.slug) === filter || normalizeTermValue(term.name) === filter;
// }

// function normalizeFilterValue(value?: string | number) {
//   if (value === undefined || value === null || value === "") return "";
//   return String(value).trim().toLowerCase();
// }

// function normalizeTermValue(value?: string) {
//   return String(value || "")
//     .toLowerCase()
//     .replace(/\s+/g, "-")
//     .replace(/[^a-z0-9-]/g, "")
//     .replace(/-+/g, "-")
//     .replace(/^-|-$/g, "");
// }

// function uniqueLessons(lessons: Lesson[]) {
//   const seen = new Set<number>();
//   return lessons.filter((lesson) => {
//     if (seen.has(lesson.id)) return false;
//     seen.add(lesson.id);
//     return true;
//   });
// }

// function slugParam(value: string) {
//   try {
//     return decodeURIComponent(value);
//   } catch {
//     return value;
//   }
// }

// function renderedField(value: unknown) {
//   return { rendered: stringValue(objectValue(value).rendered) };
// }

// function objectValue(value: unknown): RestRecord {
//   return value && typeof value === "object" ? (value as RestRecord) : {};
// }

// function stringValue(value: unknown) {
//   return typeof value === "string" ? value : "";
// }

// function numberValue(value: unknown) {
//   return typeof value === "number" ? value : Number(value) || 0;
// }

// function numberArray(value: unknown) {
//   return Array.isArray(value)
//     ? value.map((item) => numberValue(item)).filter((item) => item > 0)
//     : [];
// }

// function stripHtml(value: string) {
//   return String(value || "")
//     .replace(/<[^>]*>/g, " ")
//     .replace(/&nbsp;/g, " ")
//     .replace(/&amp;/g, "&")
//     .replace(/&quot;/g, '"')
//     .replace(/&#39;/g, "'")
//     .replace(/\s+/g, " ")
//     .trim();
// }
