import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-14 pb-6 mt-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-gray-700">
          <div>
            <Link href="/" className="text-xl font-bold text-white mb-3 block">
              🏠 Home<span className="text-green-400">Hacks</span>
            </Link>
            <p className="text-sm text-gray-400">
              Making everyday home life easier with practical, proven tips and
              tricks.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {["Cleaning", "Kitchen", "DIY", "Organization", "Energy"].map(
                (cat) => (
                  <li key={cat}>
                    <Link
                      href={`/?cat=${cat}`}
                      className="hover:text-green-400 transition-colors"
                    >
                      {cat} Hacks
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-green-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-green-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-green-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/unsubscribe"
                  className="hover:text-green-400 transition-colors"
                >
                  Unsubscribe
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 pt-6">
          © 2026 HomeHacks. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
