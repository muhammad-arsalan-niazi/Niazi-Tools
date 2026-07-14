import React from 'react';
import { Card } from '@/components/ui/card';

export function AuthorBio() {
  return (
    <Card className="mt-12 p-8 bg-muted/30 border-primary/10 shadow-inner flex flex-col md:flex-row items-center md:items-start gap-6 rounded-2xl">
      <div className="shrink-0">
        <img 
          src="https://avatars.githubusercontent.com/u/143963135?v=4" 
          alt="Muhammad Arsalan Niazi"
          className="w-24 h-24 rounded-full border-2 border-primary/20 shadow-md object-cover"
        />
      </div>
      <div className="text-center md:text-left">
        <h4 className="text-xl font-bold font-headline mb-2">About the Author: Muhammad Arsalan Niazi</h4>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          Muhammad Arsalan Niazi is a Top-Rated Web Developer and Technical SEO Expert based in Sargodha, Pakistan. He specializes in building high-performance Next.js web applications, custom WordPress themes, and enterprise SEO solutions for global clients.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4">
          <a href="/contact" className="text-primary text-sm font-semibold hover:underline">
            Work with me &rarr;
          </a>
          <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-semibold hover:text-primary transition-colors">
            GitHub Profile
          </a>
        </div>
      </div>
    </Card>
  );
}
