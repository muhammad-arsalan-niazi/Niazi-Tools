import React from 'react';
import Link from 'next/link';
import { Github, Facebook, Linkedin, Youtube, Code2 } from 'lucide-react';
import { Copyright } from './copyright';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto py-12 md:py-16 transition-colors duration-300">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-headline tracking-wider bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
              Niazi Tools
            </h3>
            <p className="text-muted-foreground text-sm">
              Niazi Tools is a premium suite of free, privacy-focused online utilities for text processing, data extraction, and formatting. Built for developers and SEO professionals.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Free Online Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Tool Guides & SEO Blog
                </Link>
              </li>
              <li>
                <Link href="/services" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Professional Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Contact & About
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy-policy" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="group text-muted-foreground hover:text-primary transition-colors text-sm flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-4 group-hover:mr-2 text-blue-500 transition-all duration-300 ease-out">→</span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground">Connect with the Author</h4>
            <div className="flex flex-wrap items-center gap-3">
              <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Github size={20} />
              </a>
              <a href="https://www.facebook.com/MuhammadArsalanNiazi.Official" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Facebook size={20} />
              </a>
              <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://www.youtube.com/@DevArsalan" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Youtube size={20} />
              </a>
              <a href="https://www.kaggle.com/marsalanofficial" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all">
                <Code2 size={20} />
              </a>
            </div>
            <div className="mt-2 text-xs text-muted-foreground space-y-1">
              <p>Top-Rated <strong>WordPress Developer & SEO Expert</strong>.</p>
              <p>Based in <strong>Sargodha, Pakistan</strong>.</p>
              <p>Available for global Web Development and SEO projects.</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t text-center text-sm text-muted-foreground flex flex-col items-center">
          <Copyright />
        </div>
      </div>
    </footer>
  );
}
