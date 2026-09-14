import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import { Subscriber } from "@/lib/models";
import { getEmailFromUnsubscribeToken } from "@/lib/newsletter";

export const dynamic = "force-dynamic";

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const email = token ? getEmailFromUnsubscribeToken(token) : null;

  if (email) {
    await connectDB();
    await Subscriber.updateOne(
      { email },
      { subscribed: false, unsubscribedAt: new Date() },
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 py-20 text-center">
      <div className="text-5xl mb-5">📬</div>
      <h1 className="text-3xl font-bold text-green-900 mb-4">
        Manage your emails
      </h1>
      {email ? (
        <p className="text-gray-600 mb-8">
          You have been unsubscribed from HomeHacks emails.
        </p>
      ) : (
        <>
          <p className="text-gray-600 mb-8">
            Use the unsubscribe link in your HomeHacks email. If you need help,
            contact us directly.
          </p>
          <a
            href="/contact"
            className="inline-block bg-green-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-900 transition-colors"
          >
            Contact HomeHacks
          </a>
        </>
      )}
      <p className="text-sm text-gray-500 mt-8">
        <Link href="/" className="text-green-700 hover:underline">
          Return to HomeHacks
        </Link>
      </p>
    </section>
  );
}
