export default function PrivacyPage() {
  const contactEmail = process.env.SMTP_USER || "hello@homehacks.example";

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 text-gray-700">
      <h1 className="text-4xl font-bold text-green-900 mb-6">Privacy Policy</h1>
      <p className="mb-6">
        HomeHacks respects your privacy. We collect only the information needed
        to operate the website and send newsletter emails when you request them.
      </p>
      <h2 className="text-2xl font-bold text-green-900 mt-10 mb-3">
        Newsletter
      </h2>
      <p className="mb-6">
        When you subscribe, your email address is used to send HomeHacks updates
        and welcome messages. We do not sell your email address.
      </p>
      <h2 className="text-2xl font-bold text-green-900 mt-10 mb-3">Contact</h2>
      <p>
        If you have a privacy question, email{" "}
        <a className="text-green-700 underline" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
        .
      </p>
    </article>
  );
}
