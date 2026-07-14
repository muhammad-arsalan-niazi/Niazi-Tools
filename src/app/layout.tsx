import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { SchemaMarkup } from "@/components/schema-markup";
import { Copyright } from "@/components/copyright";

export const metadata: Metadata = {
  metadataBase: new URL('https://niazi-tools.vercel.app'),
  title: "Niazi Tools | Free Online Utility Toolkit",
  description: "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion. Enhance your productivity with Niazi Tools.",
  keywords: ["text tools", "online utility", "data extractor", "format converter", "productivity tools", "email extractor", "base64 converter", "markdown to html", "text cleaner"],
  authors: [{ name: "Muhammad Arsalan Niazi" }],
  verification: {
    google: "_3fOAM0gtYaEkuUeGIQ91K86BslHXpo5HSpJwMrfkAQ",
  },
  alternates: {
    canonical: '/',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Niazi Tools | Free Online Utility Toolkit",
    description: "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion.",
    url: "https://niazi-tools.vercel.app",
    siteName: "Niazi Tools",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/143963135?v=4",
        width: 800,
        height: 800,
        alt: "Muhammad Arsalan Niazi",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Niazi Tools | Free Online Utility Toolkit",
    description: "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion.",
    images: ["https://avatars.githubusercontent.com/u/143963135?v=4"],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Righteous&display=swap"
          rel="stylesheet"
        ></link>
        <SchemaMarkup />
      </head>
      <body className="font-body antialiased flex flex-col min-h-svh">
        <div className="flex-1">{children}</div>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}

    