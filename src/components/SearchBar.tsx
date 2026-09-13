"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") || "");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    const query = value.trim();
    if (query) params.set("q", query);
    router.push(`/?${params.toString()}#posts`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl gap-2 mx-auto"
      role="search"
    >
      <label htmlFor="site-search" className="sr-only">
        Search home hacks
      </label>
      <input
        id="site-search"
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search cleaning, kitchen, DIY..."
        className="min-w-0 flex-1 rounded-full border border-gray-200 bg-white px-5 py-3 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        className="rounded-full bg-green-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-900"
      >
        Search
      </button>
    </form>
  );
}
