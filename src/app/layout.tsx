import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/data/site-config";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import OpeningPreloader from "@/components/ui/OpeningPreloader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.seo.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.seo.description,
  metadataBase: new URL(SITE_CONFIG.seo.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_CONFIG.seo.siteName,
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
    locale: SITE_CONFIG.seo.locale,
    url: SITE_CONFIG.seo.url,
    images: [
      {
        url: "/assets/sky-high/homepage/images/05-evening-exterior-master.webp",
        width: 1920,
        height: 1080,
        alt: "Sky-High Properties — Premium property consultancy in Kolkata",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.seo.title,
    description: SITE_CONFIG.seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfairDisplay.variable}`}
    >
      <body>
        <OpeningPreloader />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
