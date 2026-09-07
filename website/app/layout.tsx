import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0E6B5C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://qurus.app"),
  title: {
    default: "Qurus (قُرُوص) — A Calm, Focused Way to Understand the Quran",
    template: "%s | Qurus",
  },
  description:
    "A calm, focused space to read, listen to, and understand the Quran. Built for everyday life with verse-by-verse Arabic, Urdu translations, private notes, and background playback.",
  keywords: [
    "Qurus",
    "Quran app",
    "Quran Android APK",
    "Urdu Quran translation",
    "Arabic recitation",
    "Shamshad Ali Khan",
    "Mishary Rashid Alafasy",
    "Ayah by ayah Quran",
    "background Quran audio",
    "lock screen Quran player",
    "private Quran notes",
    "Hamdan Khubaib",
    "100% on-device privacy",
    "free Quran app no ads",
  ],
  authors: [{ name: "Hamdan Khubaib", url: "https://github.com/GitCoder052023" }],
  creator: "Hamdan Khubaib",
  publisher: "Qurus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/images/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/images/icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qurus.app",
    siteName: "Qurus (قُرُوص)",
    title: "Qurus — A Calm, Focused Way to Understand the Quran",
    description:
      "A calm, focused space to read, listen to, and understand the Quran. Built for everyday life with verse-by-verse Arabic, Urdu translations, private notes, and background playback.",
    images: [
      {
        url: "/images/icon.png",
        width: 1024,
        height: 1024,
        alt: "Qurus Quran Sanctuary Icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qurus (قُرُوص) — A Calm, Focused Way to Understand the Quran",
    description:
      "A calm, focused space to read, listen to, and understand the Quran, with verse-by-verse Arabic, Urdu translations, private notes, and background playback.",
    images: ["/images/icon.png"],
    creator: "@GitCoder052023",
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
  alternates: {
    canonical: "https://qurus.app",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://qurus.app/#application",
      name: "Qurus",
      alternateName: "قُرُوص",
      operatingSystem: "Android 8.0 and up",
      applicationCategory: "LifestyleApplication, EducationalApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      downloadUrl: "https://github.com/GitCoder052023/Qurus/releases/tag/v2.3.0",
      softwareVersion: "2.3.0",
      fileSize: "112MB",
      description:
        "A calm, focused space to read, listen to, and understand the Quran. Built for everyday life with verse-by-verse Arabic, Urdu translations, private notes, and background playback.",
      author: {
        "@type": "Person",
        name: "Hamdan Khubaib",
        url: "https://github.com/GitCoder052023",
      },
      screenshot: "https://qurus.app/images/splash-icon.png",
      license: "https://opensource.org/licenses/MIT",
    },
    {
      "@type": "WebSite",
      "@id": "https://qurus.app/#website",
      url: "https://qurus.app",
      name: "Qurus",
      publisher: {
        "@type": "Person",
        name: "Hamdan Khubaib",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-text-primary antialiased selection:bg-primary-light selection:text-primary">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
