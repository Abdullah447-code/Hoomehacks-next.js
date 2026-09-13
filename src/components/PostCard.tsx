import Link from "next/link";
import { getPostImage } from "@/lib/post-images";

const catColors: Record<string, string> = {
  Cleaning: "bg-green-100 text-green-800",
  Kitchen: "bg-orange-100 text-orange-800",
  DIY: "bg-red-100 text-red-800",
  Organization: "bg-purple-100 text-purple-800",
  Energy: "bg-blue-100 text-blue-800",
  Garden: "bg-lime-100 text-lime-800",
};

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    author?: string;
    imageUrl?: string;
    emoji: string;
    readTime: string;
    createdAt: string;
  };
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-300 hover:-translate-y-1 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img
          src={getPostImage(post.category, post.imageUrl)}
          alt=""
          className="h-full w-full object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-3 py-1 text-3xl">
          {post.emoji}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span
            className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${catColors[post.category] || "bg-gray-100 text-gray-700"}`}
          >
            {post.category}
          </span>
          <span className="text-xs text-gray-400">⏱ {post.readTime}</span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 leading-snug hover:text-green-700 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-xs text-gray-400 mb-2">
          By {post.author || "HomeHacks Team"}
        </p>
        <p className="text-sm text-gray-500 flex-1 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="text-sm font-semibold text-green-700 hover:tracking-wide transition-all"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
