import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-green-900 mb-4">
        Contact HomeHacks
      </h1>
      <p className="text-gray-600 text-lg mb-10">
        Have a question, suggestion, or a home hack we should test? We would
        love to hear from you.
      </p>
      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-green-900 mb-3">
          Send us a message
        </h2>
        <p className="text-gray-600 mb-6">
          Tell us what you need help with and our team will get back to you.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
