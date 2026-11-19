import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { site } from "@/lib/content";
import "./globals.css";

const switzer = localFont({
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400" },
    { path: "./fonts/Switzer-500.woff2", weight: "500" },
    { path: "./fonts/Switzer-600.woff2", weight: "600" },
    { path: "./fonts/Switzer-700.woff2", weight: "700" },
    { path: "./fonts/Switzer-800.woff2", weight: "800" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.studio}`,
    template: `%s — ${site.name}`,
  },
  description: site.bio[0],
  openGraph: {
    title: `${site.name} — ${site.studio}`,
    description: site.intro,
    images: ["/works/the-unwritten.jpg"],
    type: "website",
  },
  twitter: { card: "summary_large_image", site: "@niyi_art" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={switzer.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
