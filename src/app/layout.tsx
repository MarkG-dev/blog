import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { websiteSchema } from "@/lib/schema";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Gentle Future",
    template: "%s — Gentle Future",
  },
  description:
    "An editorial platform covering the shift from maximum functionality to maximum well-being in design and technology.",
  metadataBase: new URL("https://gentlefuture.co"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gentlefuture.co",
    siteName: "Gentle Future",
    title: "Gentle Future",
    description:
      "Covering the shift from maximum functionality to maximum well-being.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gentle Future",
    description:
      "Covering the shift from maximum functionality to maximum well-being.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Gentle Future"
          href="/feed.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
      </head>
      <body className="font-sans bg-gf-black text-gf-text min-h-screen">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
