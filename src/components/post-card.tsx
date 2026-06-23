import Link from "next/link";

type PostCardProps = {
  title: string;
  excerpt: string;
  image?: string;
  slug: string;
};

export default function PostCard({
  title,
  excerpt,
  image,
  slug,
}: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="block border rounded-lg p-6 mb-6"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}

      <h2
        className="text-2xl font-semibold mb-3"
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />

      <div
        dangerouslySetInnerHTML={{
          __html: excerpt,
        }}
      />
    </Link>
  );
}