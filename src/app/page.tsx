import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models";
import PostCard from "@/components/PostCard";
import AdSlot from "@/components/AdSlot";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const categories = [
  { name: "Cleaning", icon: "🧹", desc: "Deep clean in half the time" },
  { name: "Kitchen", icon: "🍳", desc: "Save time in the kitchen" },
  { name: "DIY", icon: "🔨", desc: "Fix things yourself" },
  { name: "Organization", icon: "📦", desc: "Declutter every room" },
  { name: "Garden", icon: "🌿", desc: "Grow more with less" },
  { name: "Energy", icon: "💡", desc: "Cut your bills" },
];

async function getPosts(category?: string, search?: string) {
  try {
    await connectDB();
    const query: Record<string, unknown> = category
      ? { category, published: true }
      : { published: true };
    if (search) {
      const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      query.$or = [
        { title: { $regex: escapedSearch, $options: "i" } },
        { excerpt: { $regex: escapedSearch, $options: "i" } },
      ];
    }
    return await Post.find(query).sort({ createdAt: -1 }).lean();
  } catch {
    return [];
  }
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const { cat, q } = await searchParams;
  const posts = await getPosts(cat, q);

  return (
    <>
      {!cat && (
        <section className="bg-gradient-to-br from-green-50 via-lime-50 to-cyan-50 py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-white text-green-700 border border-green-300 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
                ✨ New hacks every week
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-5 leading-tight">
                Clever Hacks for a<br />
                <span className="text-green-500">Smarter Home</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Discover hundreds of easy, affordable tips to clean better,
                organize smarter, and live more comfortably.
              </p>
              <Link
                href="#posts"
                className="bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-900 transition-colors shadow-lg"
              >
                Explore Hacks
              </Link>
            </div>
            <div className="text-center text-[10rem] animate-bounce">🏡</div>
          </div>
        </section>
      )}

      <AdSlot size="banner" />

      <section className="px-6 pt-10">
        <SearchBar />
      </section>

      {!cat && (
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-gray-900 border-b-4 border-green-400 pb-3 inline-block">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {categories.map((c) => (
                <Link
                  key={c.name}
                  href={`/?cat=${c.name}`}
                  className="flex flex-col items-center text-center p-5 rounded-2xl border border-gray-200 hover:border-green-400 hover:bg-green-50 hover:-translate-y-1 transition-all duration-200"
                >
                  <span className="text-4xl mb-3">{c.icon}</span>
                  <h3 className="font-semibold text-sm text-green-900 mb-1">
                    {c.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-tight">
                    {c.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 px-6" id="posts">
        <div className="max-w-6xl mx-auto">
          {!q && posts.length > 0 && (
            <div className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-green-400 pb-3 inline-block mb-8">
                Latest Hacks
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.slice(0, 3).map((post: any) => (
                  <PostCard
                    key={`latest-${post._id.toString()}`}
                    post={{
                      ...post,
                      _id: post._id.toString(),
                      createdAt: post.createdAt?.toString(),
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h2 className="text-2xl font-bold text-gray-900 border-b-4 border-green-400 pb-3 inline-block">
              {q
                ? `Search results for “${q}”`
                : cat
                  ? `${cat} Hacks`
                  : "🔥 Featured Hacks"}
            </h2>
            {cat && (
              <Link href="/" className="text-sm text-green-700 hover:underline">
                ← All categories
              </Link>
            )}
          </div>
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">
                {cat
                  ? categories.find((category) => category.name === cat)
                      ?.icon || "📝"
                  : "🔎"}
              </p>
              <p className="text-gray-900 text-xl font-bold mb-3">
                {cat ? `${cat} hacks are coming soon` : "No hacks found"}
              </p>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                {cat
                  ? "We are testing practical tips for this category and will publish them soon."
                  : `We could not find any posts matching “${q}”. Try a different search.`}
              </p>
              <Link
                href={cat ? "/#posts" : "/"}
                className="text-green-700 font-semibold hover:underline"
              >
                {cat ? "Browse all hacks →" : "Back to Home →"}
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: any, i: number) => (
                <PostCard
                  key={post._id.toString()}
                  post={{
                    ...post,
                    _id: post._id.toString(),
                    createdAt: post.createdAt?.toString(),
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-700 to-green-900 py-20 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">📬 Get Weekly Home Hacks</h2>
        <p className="mb-8 opacity-90 text-lg">
          Join 50,000+ readers who get our best tips every Tuesday morning.
        </p>
        <NewsletterForm />
        <p className="mt-4 text-sm opacity-70">No spam. Unsubscribe anytime.</p>
      </section>

      <AdSlot size="banner" />
    </>
  );
}
