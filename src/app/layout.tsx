import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "HomeHacks – Smart Tips for Everyday Living",
  description:
    "Discover hundreds of clever home hacks, DIY tricks, cleaning tips, and life hacks to make your home life easier.",
  keywords:
    "home hacks, DIY tips, cleaning hacks, kitchen tricks, home improvement",
  openGraph: {
    siteName: "HomeHacks",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "HomeHacks - Smart Tips for Everyday Living",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try { if (localStorage.getItem("theme") === "dark") document.documentElement.classList.add("dark"); } catch (error) {}',
          }}
        />
        {/* Google AdSense — required in <head> for verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9359782305805940"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9359782305805940"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
