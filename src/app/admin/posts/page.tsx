"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  category: string;
  emoji: string;
  readTime: string;
  published: boolean;
  createdAt: string;
  slug: string;
}

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push("/admin");
          return;
        }
        fetchPosts();
      });
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await fetch("/api/posts");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    } else {
      router.push("/admin");
    }
    setLoading(false);
  };

  const deletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    setPosts(posts.filter((p) => p._id !== id));
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-green-700 text-lg">
        Loading posts...
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-green-900">📝 Manage Posts</h1>
          <p className="text-gray-500 mt-1">
            {posts.length} total posts in database
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/new"
            className="bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-900 transition-colors"
          >
            + New Post
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/auth", { method: "DELETE" });
              router.push("/admin");
            }}
            className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">📭</p>
          <p className="text-gray-500 text-lg mb-4">No posts yet!</p>
          <Link
            href="/admin/new"
            className="bg-green-700 text-white font-bold px-6 py-3 rounded-xl hover:bg-green-900 transition-colors"
          >
            Create First Post
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl p-5 flex items-center gap-4 hover:border-green-300 transition-colors"
            >
              <span className="text-3xl">{post.emoji}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {post.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-400">{post.readTime}</span>
                  <span className="text-xs text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/blog/${post.slug}`}
                  target="_blank"
                  className="text-xs px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  👁 View
                </Link>
                <button
                  onClick={() => deletePost(post._id)}
                  className="text-xs px-3 py-1.5 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
