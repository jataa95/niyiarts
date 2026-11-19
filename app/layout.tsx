import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0c0b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={switzer.variable} suppressHydrationWarning>
      <head>
        {/* Runs before first paint: apply the saved/system theme, and skip the
            preloader if it has already played this session */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{d.dataset.theme=localStorage.getItem("niyi-theme")||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}catch(e){d.dataset.theme="light"}})();try{if(sessionStorage.getItem("niyi-seen"))document.documentElement.classList.add("is-ready","no-loader")}catch(e){document.documentElement.classList.add("is-ready","no-loader")}`,
          }}
        />
        <noscript>
          <style>{`.preloader{display:none}html{overflow:auto!important}.home-title h1 span>span,.p-hero img{animation-play-state:running!important}`}</style>
        </noscript>
      </head>
      <body>
        <Preloader />
        <Header />
        {children}
      </body>
    </html>
  );
}
