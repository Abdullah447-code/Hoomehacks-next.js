import Link from "next/link";

export default function PrivacyPage() {
  return (
    <article className="max-w-3xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-green-900 mb-6">Privacy Policy</h1>
      <p className="mb-6">
        HomeHacks respects your privacy. We collect only the information needed
        to operate the website and send newsletter emails when you request them.
      </p>
      <h2 className="text-2xl font-bold text-green-900 mt-10 mb-3">Contact</h2>
      <p>
        If you have a privacy question, please use our{" "}
        <Link className="text-green-700 underline" href="/contact">
          contact form
        </Link>
        .
      </p>
    </article>
  );
}
