"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Message could not be sent.");
      setForm({ name: "", email: "", message: "" });
      setStatus("success");
      setFeedback(result.message);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error ? error.message : "Message could not be sent.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        required
        type="text"
        placeholder="Your name"
        value={form.name}
        onChange={(event) => setForm({ ...form, name: event.target.value })}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
      />
      <input
        required
        type="email"
        placeholder="Your email"
        value={form.email}
        onChange={(event) => setForm({ ...form, email: event.target.value })}
        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
      />
      <textarea
        required
        rows={6}
        placeholder="How can we help?"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        className="w-full resize-none rounded-xl border-2 border-gray-200 px-4 py-3 text-gray-900 focus:border-green-500 focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-xl bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-900 disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
      {feedback && (
        <p
          className={
            status === "error"
              ? "text-sm text-red-600"
              : "text-sm text-green-700"
          }
        >
          {feedback}
        </p>
      )}
    </form>
  );
}
