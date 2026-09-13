"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [themeReady, setThemeReady] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedDarkMode = savedTheme === "dark";
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle("dark", savedDarkMode);
    setThemeReady(true);
  }, []);

  useEffect(() => {
    if (!themeReady) return;
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode, themeReady]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-green-900"
        >
          <span>🏠</span>
          <span>
            Home<span className="text-green-500">Hacks</span>
          </span>
        </Link>
        <nav
          className={`${menuOpen ? "flex" : "hidden"} md:flex absolute md:static top-full left-0 right-0 bg-white md:bg-transparent border-b md:border-0 p-4 md:p-0 flex-col md:flex-row gap-2 md:gap-1`}
        >
          {[
            ["Home", "/"],
            ["Cleaning", "/?cat=Cleaning"],
            ["Kitchen", "/?cat=Kitchen"],
            ["DIY", "/?cat=DIY"],
            ["Organization", "/?cat=Organization"],
            ["About", "/about"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-green-50 hover:text-green-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <button
            className="w-10 h-10 rounded-full border border-gray-200 text-lg hover:bg-green-50 transition-colors"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={
              darkMode ? "Switch to bright mode" : "Switch to dark mode"
            }
            title={darkMode ? "Bright mode" : "Dark mode"}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
            <span className="block w-6 h-0.5 bg-gray-700 transition-all"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
