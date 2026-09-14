"use client";
import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Subscription failed.");
      }

      setEmail("");
      setStatus("success");
      setMessage(result.message);
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Subscription failed. Please try again.",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 justify-center flex-wrap max-w-md mx-auto"
    >
      {status === "success" ? (
        <p className="text-white font-bold text-lg">✅ {message}</p>
      ) : (
        <>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === "sending"}
            className="flex-1 min-w-[200px] px-5 py-3 rounded-full bg-white border-2 border-white text-gray-900 placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-lime-300"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="bg-white text-green-800 font-bold px-7 py-3 rounded-full hover:bg-green-50 transition-colors disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Subscribe Free"}
          </button>
          {status === "error" && (
            <p className="basis-full text-red-100 text-sm">{message}</p>
          )}
        </>
      )}
    </form>
  );
}
