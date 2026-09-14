import { connectDB } from "@/lib/mongodb";
import { Post } from "@/lib/models";
import AdSlot from "@/components/AdSlot";
import NewsletterForm from "@/components/NewsletterForm";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostImage } from "@/lib/post-images";
import { getSiteUrl } from "@/lib/site-url";

async function getPost(slug: string) {
  await connectDB();
  return await Post.findOne({ slug, published: true }).lean();
}

async function getRelated(category: string, excludeSlug: string) {
  await connectDB();
  return await Post.find({
    category,
    published: true,
    slug: { $ne: excludeSlug },
  })
    .limit(2)
    .lean();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getPost(slug)) as any;
  if (!post) return {};
  const image = getPostImage(post.category, post.imageUrl);
  const siteUrl = getSiteUrl();
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const publishedTime = post.createdAt
    ? new Date(post.createdAt).toISOString()
    : undefined;
  const modifiedTime = post.updatedAt
    ? new Date(post.updatedAt).toISOString()
    : publishedTime;
  return {
    title: `${post.title} | HomeHacks`,
    description: post.excerpt,
    keywords: [post.category, "home hacks", "DIY", "household tips"],
    authors: [{ name: post.author || "HomeHacks Team" }],
    alternates: { canonical: postUrl },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime,
      modifiedTime,
      authors: [post.author || "HomeHacks Team"],
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (await getPost(slug)) as any;
  if (!post) notFound();

  const related = (await getRelated(post.category, post.slug)) as any[];

  const catColors: Record<string, string> = {
    Cleaning: "bg-green-100 text-green-800",
    Kitchen: "bg-orange-100 text-orange-800",
    DIY: "bg-red-100 text-red-800",
    Organization: "bg-purple-100 text-purple-800",
    Energy: "bg-blue-100 text-blue-800",
    Garden: "bg-lime-100 text-lime-800",
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12 items-start">
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: [getPostImage(post.category, post.imageUrl)],
              author: {
                "@type": "Person",
                name: post.author || "HomeHacks Team",
              },
              publisher: { "@type": "Organization", name: "HomeHacks" },
              datePublished: post.createdAt
                ? new Date(post.createdAt).toISOString()
                : undefined,
              dateModified: post.updatedAt
                ? new Date(post.updatedAt).toISOString()
                : undefined,
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${getSiteUrl()}/blog/${post.slug}`,
              },
            }),
          }}
        />
        <div className="text-sm text-gray-400 mb-6">
          <Link href="/" className="text-green-700 hover:underline">
            Home
          </Link>{" "}
          &rsaquo;{" "}
          <Link
            href={`/?cat=${post.category}`}
            className="text-green-700 hover:underline"
          >
            {post.category}
          </Link>{" "}
          &rsaquo; <span>{post.title}</span>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl mb-8">
          <img
            src={getPostImage(post.category, post.imageUrl)}
            alt={post.title}
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-5 left-5 rounded-full bg-black/45 px-4 py-2 text-5xl">
            {post.emoji}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-4 flex-wrap">
          <span
            className={`text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full ${catColors[post.category]}`}
          >
            {post.category}
          </span>
          <span className="text-sm text-gray-500">
            By {post.author || "HomeHacks Team"}
          </span>
          <span className="text-sm text-gray-400">⏱ {post.readTime}</span>
          <span className="text-sm text-gray-400">
            📅{" "}
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 leading-tight">
          {post.title}
        </h1>
        <p className="text-gray-500 text-lg italic border-l-4 border-green-400 pl-4 mb-8">
          {post.excerpt}
        </p>

        <AdSlot size="banner" />

        <div
          className="post-content mt-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="flex gap-3 mt-10 flex-wrap">
          <span className="text-sm font-semibold text-gray-500">Share:</span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`http://localhost:3000/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener"
            className="text-sm px-4 py-2 border rounded-full hover:border-green-500 hover:text-green-700 transition-colors"
          >
            📘 Facebook
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`http://localhost:3000/blog/${post.slug}`)}`}
            target="_blank"
            rel="noopener"
            className="text-sm px-4 py-2 border rounded-full hover:border-green-500 hover:text-green-700 transition-colors"
          >
            🐦 Twitter
          </a>
        </div>

        {related.length > 0 && (
          <section className="mt-14 pt-8 border-t-2 border-gray-200">
            <h2 className="text-xl font-bold mb-6 text-green-900">
              Related Hacks You will Love
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r: any) => (
                <Link
                  key={r._id.toString()}
                  href={`/blog/${r.slug}`}
                  className="flex gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all"
                >
                  <span className="text-3xl">{r.emoji}</span>
                  <div>
                    <p className="font-semibold text-sm text-gray-800 leading-snug">
                      {r.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{r.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <aside className="sticky top-24 space-y-6">
        <AdSlot size="rectangle" />
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="font-bold text-green-900 mb-4 pb-3 border-b-2 border-green-100">
            🔥 Popular Posts
          </h3>
          <ul className="space-y-3">
            {[
              "baking-soda-hacks",
              "fix-leaky-faucet",
              "cut-electric-bill",
              "keep-food-fresh",
              "declutter-home",
            ].map((s) => (
              <li key={s}>
                <Link
                  href={`/blog/${s}`}
                  className="text-sm text-gray-700 hover:text-green-700 transition-colors"
                >
                  {s
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-green-700 text-white rounded-2xl p-6">
          <h3 className="font-bold mb-2">📬 Weekly Hacks</h3>
          <p className="text-sm opacity-80 mb-4">Join 50,000+ readers!</p>
          <NewsletterForm />
        </div>
        <AdSlot size="sidebar" />
      </aside>
    </div>
  );
}
