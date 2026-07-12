import type { Metadata } from "next";
import { Github, Facebook, Linkedin } from "lucide-react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { Copyright } from "@/components/copyright";

export const metadata: Metadata = {
  title: "Niazi Tools | Free Online Utility Toolkit",
  description: "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion. Enhance your productivity with Niazi Tools.",
  keywords: ["text tools", "online utility", "data extractor", "format converter", "productivity tools", "email extractor", "base64 converter", "markdown to html", "text cleaner"],
  authors: [{ name: "Muhammad Arsalan Niazi" }],
  verification: {
    google: "_3fOAM0gtYaEkuUeGIQ91K86BslHXpo5HSpJwMrfkAQ",
  },
  openGraph: {
    title: "Niazi Tools | Free Online Utility Toolkit",
    description: "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion.",
    url: "https://niazi-tools.vercel.app", // Replace with actual URL if known
    siteName: "Niazi Tools",
    locale: "en_US",
    type: "website",
  },
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
      </head>
      <body className="font-body antialiased flex flex-col min-h-svh">
        <div className="flex-1">{children}</div>
        <footer className="text-center p-6 mt-8 text-muted-foreground text-sm border-t">
          <Copyright />
           <div className="flex items-center justify-center gap-3">
              <span className="text-sm text-muted-foreground hidden sm:inline">Follow on</span>
              <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Github className="text-white dark:text-black" />
                </Button>
              </a>
              <a href="https://www.facebook.com/MuhammadArsalanNiazi.Official/" target="_blank" rel="noopener noreferrer" aria-label="Facebook Profile">
                <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Facebook className="text-white dark:text-black" />
                </Button>
              </a>
               <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                 <Button size="icon" className="rounded-full bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all hover:shadow-lg hover:shadow-primary/20">
                  <Linkedin className="text-white dark:text-black" />
                </Button>
              </a>
            </div>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}

    