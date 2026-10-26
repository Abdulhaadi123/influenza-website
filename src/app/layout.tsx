import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Sora (SIL Open Font License), self-hosted: a geometric grotesque close to the
// app's Figma type, with no request to Google at page load.
const sora = localFont({
  src: "./fonts/sora-latin-wght.woff2",
  weight: "100 800",
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Influenza AI: create your own AI influencer",
  description:
    "Create AI influencers, produce product videos and bring them to life with motion. Coming soon to Android.",
  applicationName: "Influenza AI",
  openGraph: {
    title: "Influenza AI",
    description: "Create AI influencers, produce product videos and bring them to life with motion.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07061c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={sora.variable}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-night"
        >
          Skip to content
        </a>
        <div className="glows" aria-hidden="true" />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
