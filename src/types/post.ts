export interface Post {
  id: number;

  title: {
    rendered: string;
  };

  excerpt: {
    rendered: string;
  };

  slug: string;

  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}