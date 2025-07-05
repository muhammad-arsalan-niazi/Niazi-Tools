import type { Metadata } from "next";
import { Github, Facebook, Linkedin } from "lucide-react";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Niazi Tools",
  description: "A tool to quickly process and copy lines of text.",
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
          <div className="mb-4">
            Copyright © {new Date().getFullYear()}{' '}
            <span className="font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
              Niazi Tools
            </span>
            . Made with <span className="text-red-500">❤️</span> in Pakistan by{' '}
            <a
              href="https://github.com/muhammad-arsalan-niazi"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Muhammad Arsalan Niazi
            </a>
            .
          </div>
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
