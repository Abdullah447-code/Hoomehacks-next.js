"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin/posts");
    } else {
      setError("Wrong password! Try again.");
    }
    setLoading(false);
  };

  const handleSeed = async () => {
    setLoading(true);
    const res = await fetch("/api/seed", { method: "POST" });
    const data = await res.json();
    alert(data.message || data.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🏠</div>
          <h1 className="text-2xl font-bold text-green-900">HomeHacks Admin</h1>
          <p className="text-gray-500 mt-1">
            Enter password to access dashboard
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-900"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-900 transition-colors disabled:opacity-50"
          >
            {loading ? "Checking..." : "Login to Admin"}
          </button>
        </form>
        <div className="mt-6 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400 mb-3">
            First time? Seed the database with sample posts:
          </p>
          <button
            onClick={handleSeed}
            disabled={loading}
            className="text-sm text-green-700 underline hover:text-green-900"
          >
            🌱 Seed Sample Posts
          </button>
        </div>
      </div>
    </div>
  );
}
