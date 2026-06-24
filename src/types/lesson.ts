export interface Lesson {
  id: number;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt?: {
    rendered: string;
  };
  meta?: {
    english_title?: string;
  };
  english_title?: string;
  _embedded?: {
    "wp:featuredmedia"?: [
      {
        source_url: string;
      }
    ];
    "wp:term"?: Array<
      Array<{
        id: number;
        name: string;
        taxonomy: string;
      }>
    >;
  };
}
