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
        <h4 className="text-xl sm:text-2xl font-bold font-headline mb-3 text-foreground">
          Muhammad Arsalan Niazi
          <span className="block text-sm font-semibold text-primary mt-1 uppercase tracking-wide">Full-Stack Developer & Digital Strategy Expert</span>
        </h4>
        <div className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-5 space-y-2">
          <p>
            I am a Top-Rated Full-Stack Web Developer and Technical SEO Expert based in Sargodha, Pakistan. With years of experience architecting high-performance digital ecosystems, I specialize in transforming complex business requirements into lightning-fast, scalable web applications.
          </p>
          <p>
            My core expertise includes building custom <strong>Next.js & React</strong> applications, developing enterprise-grade <strong>WordPress and E-Commerce</strong> solutions, and engineering <strong>Technical SEO</strong> strategies that dominate global search rankings. Whether you need a complete SaaS platform, a high-converting landing page, or aggressive SEO growth, I deliver silicon-valley grade engineering tailored to your business goals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
          <a href="/services" className="bg-primary text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors shadow-md">
            Hire Me &rarr;
          </a>
          <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-semibold hover:text-[#0A66C2] transition-colors flex items-center gap-2">
            View LinkedIn
          </a>
          <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-semibold hover:text-foreground transition-colors flex items-center gap-2">
            GitHub Portfolio
          </a>
          <a href="https://profiles.wordpress.org/muhammadarsalanniazi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-semibold hover:text-[#21759b] transition-colors flex items-center gap-2">
            WordPress Profile
          </a>
          <a href="https://gravatar.com/muhammadarsalanniazi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-sm font-semibold hover:text-amber-500 transition-colors flex items-center gap-2">
            Gravatar
          </a>
        </div>
      </div>
    </Card>
  );
}
