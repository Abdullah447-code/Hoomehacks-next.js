"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const categories = [
  "Cleaning",
  "Kitchen",
  "DIY",
  "Organization",
  "Energy",
  "Garden",
];
const emojis: Record<string, string> = {
  Cleaning: "🧹",
  Kitchen: "🍳",
  DIY: "🔨",
  Organization: "📦",
  Energy: "💡",
  Garden: "🌿",
};

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "HomeHacks Team",
    imageUrl: "",
    category: "Cleaning",
    emoji: "🧹",
    readTime: "3 min read",
    published: true,
  });

  useEffect(() => {
    fetch("/api/auth")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) router.push("/admin");
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" ? { emoji: emojis[value] || "🏠" } : {}),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSuccess("Post published successfully! 🎉");
      setForm({
        title: "",
        excerpt: "",
        content: "",
        author: "HomeHacks Team",
        imageUrl: "",
        category: "Cleaning",
        emoji: "🧹",
        readTime: "3 min read",
        published: true,
      });
      setTimeout(() => router.push("/admin/posts"), 1500);
    } else {
      const err = await res.json();
      alert("Error: " + err.error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/posts"
          className="text-green-700 hover:underline text-sm"
        >
          ← Back to Posts
        </Link>
      </div>
      <h1 className="text-3xl font-bold text-green-900 mb-8">
        ✍️ Write New Post
      </h1>

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-5 py-4 rounded-xl mb-6 font-medium">
          {success}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white border border-gray-200 rounded-3xl p-8"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Post Title *
          </label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="e.g. 10 Amazing Kitchen Hacks That Save Time"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    placeholder="HomeHacks Team"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cover image URL
                  </label>
                  <input
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
                  />
                </div>
              </div>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Read Time
            </label>
            <input
              name="readTime"
              value={form.readTime}
              onChange={handleChange}
              placeholder="3 min read"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Excerpt (short description) *
          </label>
          <textarea
            name="excerpt"
            value={form.excerpt}
            onChange={handleChange}
            required
            rows={3}
            placeholder="Write a short 1-2 sentence summary of the post..."
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Post Content (HTML supported) *
          </label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={16}
            placeholder="<h2>Step 1 - Title</h2><p>Your content here...</p>"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900 font-mono text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            You can use HTML tags: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;,
            &lt;ul&gt;, &lt;li&gt;
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            name="published"
            checked={form.published}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, published: e.target.checked }))
            }
            className="w-4 h-4 accent-green-700"
          />
          <label
            htmlFor="published"
            className="text-sm font-medium text-gray-700"
          >
            Publish immediately
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-700 text-white font-bold py-4 rounded-xl text-lg hover:bg-green-900 transition-colors disabled:opacity-50"
        >
          {loading ? "Publishing..." : "🚀 Publish Post"}
        </button>
      </form>
    </div>
  );
}
