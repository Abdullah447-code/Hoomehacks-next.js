import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function AboutPage() {
  const stats = [
    { icon: "📝", value: "200+", label: "Published Articles" },
    { icon: "👥", value: "50K+", label: "Monthly Readers" },
    { icon: "⭐", value: "4.9", label: "Reader Rating" },
    { icon: "💡", value: "100%", label: "Tested Tips" },
  ];
  return (
    <>
      <section className="bg-gradient-to-br from-green-50 to-lime-50 py-20 px-6 text-center">
        <div className="text-7xl mb-6">🏡</div>
        <h1 className="text-4xl font-bold text-green-900 mb-4">
          About HomeHacks
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto text-lg">
          We believe a happier home does not require expensive products — just
          clever tips and a little know-how.
        </p>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-2xl font-bold text-green-900 mb-5">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              HomeHacks was founded with a simple goal: to make everyday home
              life easier for everyone. We research, test, and share only the
              most effective home tips that actually work.
            </p>
            <p className="text-gray-600 mb-4">
              Whether you are dealing with a stubborn stain, trying to stretch
              your grocery budget, or looking for clever ways to organize your
              space — we have got you covered.
            </p>
            <p className="text-gray-600">
              Every hack on our site is tested before we publish it. No fluff,
              no fake tips — just real solutions for real homes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="about-stat-card rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-2">{s.icon}</div>
                <div className="text-3xl font-bold text-green-900">
                  {s.value}
                </div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-700 to-green-900 py-16 px-6 text-white text-center">
        <h2 className="text-3xl font-bold mb-3">📬 Stay in the Loop</h2>
        <p className="mb-8 opacity-90">
          Get our best home hacks delivered to your inbox every week.
        </p>
        <NewsletterForm />
      </section>
    </>
  );
}
