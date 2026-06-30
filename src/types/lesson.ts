export interface RenderedField {
  rendered: string;
}

export interface FeaturedMedia {
  id?: number;
  source_url: string;
  alt_text?: string;
}

export interface TaxonomyTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: "board" | "grade" | "book_name" | "academic_year" | "lesson_type" | string;
}

export interface Lesson {
  id: number;
  slug: string;
  link?: string;
  title: RenderedField;
  content: RenderedField;
  excerpt?: RenderedField;
  featured_media?: number;
  featuredImage?: FeaturedMedia;
  lesson_type?: number[];
  lessonType?: TaxonomyTerm;
  meta?: {
    english_title?: string;
    lesson_audio?: string;
    lesson_pdf?: string;
  };
  acf?: Record<string, unknown>;
  english_title?: string;
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
    "wp:term"?: TaxonomyTerm[][];
  };
}

export interface Curriculum {
  id: number;
  slug: string;
  link?: string;
  title: RenderedField;
  content?: RenderedField;
  board: TaxonomyTerm[];
  grade: TaxonomyTerm[];
  book_name: TaxonomyTerm[];
  academic_year: TaxonomyTerm[];
  lessonIds: number[];
  lessons: Lesson[];
}

export type LessonTerm = TaxonomyTerm;
