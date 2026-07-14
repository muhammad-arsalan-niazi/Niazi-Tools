import { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Github, Facebook, Linkedin, Youtube, Code2, Briefcase, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Contact & About | Niazi Tools',
  description: 'Learn about Niazi Tools and contact Muhammad Arsalan Niazi for Web Development, WordPress, and SEO projects.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-6 max-w-4xl py-12">
      {/* Modern, Floating Contact Hero Section */}
      <div className="relative w-full mb-16 pt-8 pb-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-emerald-500/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-50 dark:opacity-30 animate-pulse duration-[3000ms]"></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold mb-8 border border-emerald-500/20 shadow-sm animate-bounce">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          Let's Build Something Amazing
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-headline mb-6 tracking-tighter leading-none bg-gradient-to-r from-emerald-500 via-primary to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient drop-shadow-xl">
          About & Contact
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
          Your all-in-one suite of free, offline-first utilities designed to make your daily text-processing tasks easier and faster. 🚀
        </p>
      </div>

      <div className="space-y-12 animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
        
        {/* Author Bio Section */}
        <Card className="overflow-hidden shadow-lg border-primary/20">
          <div className="bg-gradient-to-r from-primary/10 via-fuchsia-500/10 to-cyan-400/10 p-8 sm:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="shrink-0">
              <img 
                src="https://avatars.githubusercontent.com/u/143963135?v=4" 
                alt="Muhammad Arsalan Niazi"
                className="w-40 h-40 rounded-full border-4 border-background shadow-xl object-cover"
              />
            </div>
            <div className="text-center md:text-left space-y-4 flex-1">
              <h2 className="text-3xl font-bold font-headline tracking-wide">Muhammad Arsalan Niazi</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                I am a passionate <strong>Web Developer and Technical SEO Expert</strong> based in <strong>Sargodha, Pakistan</strong>. I built Niazi Tools to provide a fast, secure, and privacy-focused suite of utilities for professionals everywhere.
              </p>
              <div className="pt-2">
                <p className="font-semibold text-foreground mb-4">Connect directly for project inquiries:</p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://linkedin.com/in/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2"><Linkedin size={16} /> LinkedIn</Button>
                  </a>
                  <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2"><Github size={16} /> GitHub</Button>
                  </a>
                  <a href="https://profiles.wordpress.org/muhammadarsalanniazi/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2"><Globe size={16} /> WordPress Profile</Button>
                  </a>
                  <a href="https://gravatar.com/muhammadarsalanniazi" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="flex items-center gap-2">Gravatar Profile</Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Detailed Services Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold font-headline mb-6 text-center">My Professional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <Card className="hover:shadow-lg transition-all hover:border-primary/50 group">
              <CardHeader>
                <div className="rounded-lg bg-primary/10 p-3 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <Code2 className="text-primary h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">Custom Next.js Web Apps</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I architect and build lightning-fast, highly scalable, and SEO-optimized modern web applications using Next.js, React, and Tailwind CSS. Perfect for SaaS products, complex dashboards, or specialized toolkits like Niazi Tools.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary/50 group">
              <CardHeader>
                <div className="rounded-lg bg-blue-500/10 p-3 w-fit mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <Globe className="text-blue-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">WordPress Development</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  As a top-rated WordPress expert, I deliver custom theme development, robust plugin integration, and advanced headless WordPress setups. I ensure your site is easy to manage, incredibly fast, and secure against vulnerabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all hover:border-primary/50 group">
              <CardHeader>
                <div className="rounded-lg bg-emerald-500/10 p-3 w-fit mb-4 group-hover:bg-emerald-500/20 transition-colors">
                  <Zap className="text-emerald-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-headline">Technical SEO & Audits</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I don't just build websites; I make them rank. I offer comprehensive technical SEO audits, Core Web Vitals optimization (100/100 PageSpeed scores), JSON-LD Schema implementation, and local/international ranking strategies.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Briefcase size={120} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">Looking for a Top-Rated WordPress & SEO Expert in Sargodha?</h3>
          <p className="text-lg opacity-90 max-w-3xl mx-auto mb-6 relative z-10 leading-relaxed">
            Whether you need a high-converting WordPress website, a complex custom web application, or need to rank higher on Google search results, I specialize in delivering elite, high-performance solutions for clients globally. 
          </p>
          <div className="relative z-10 font-medium text-xl">
            👇 <span className="font-bold underline decoration-2 underline-offset-4">Hire me on LinkedIn</span> or contact me via the links below!
          </div>
        </div>

        {/* Social Links Grid */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Connect With Me</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 border-l-4 border-l-[#0077b5] group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-[#0077b5]/10 text-[#0077b5]">
                    <Linkedin size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">LinkedIn</h4>
                    <p className="text-sm text-muted-foreground mt-1">Professional Network</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-[#0077b5] group-hover:underline">Hire on LinkedIn →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://github.com/muhammad-arsalan-niazi" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 border-l-4 border-l-gray-800 dark:border-l-gray-300 group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                    <Github size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">GitHub</h4>
                    <p className="text-sm text-muted-foreground mt-1">Open Source Code</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:underline">View Projects →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://www.facebook.com/MuhammadArsalanNiazi.Official" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/20 border-l-4 border-l-[#1877F2] group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-[#1877F2]/10 text-[#1877F2]">
                    <Facebook size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Facebook</h4>
                    <p className="text-sm text-muted-foreground mt-1">Updates & Posts</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-[#1877F2] group-hover:underline">Follow Me →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://www.youtube.com/@DevArsalan" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 border-l-4 border-l-[#FF0000] group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-[#FF0000]/10 text-[#FF0000]">
                    <Youtube size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">YouTube</h4>
                    <p className="text-sm text-muted-foreground mt-1">Video Tutorials</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-[#FF0000] group-hover:underline">Subscribe →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://www.kaggle.com/marsalanofficial" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 border-l-4 border-l-[#20BEFF] group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-[#20BEFF]/10 text-[#20BEFF]">
                    <Code2 size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Kaggle</h4>
                    <p className="text-sm text-muted-foreground mt-1">Data Science</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-[#20BEFF] group-hover:underline">View Profile →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://profiles.wordpress.org/muhammadarsalanniazi/" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 border-l-4 border-l-blue-500 group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-blue-500/10 text-blue-500">
                    <Globe size={32} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">WordPress</h4>
                    <p className="text-sm text-muted-foreground mt-1">Official WP Profile</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-blue-500 group-hover:underline">View Contributions →</span>
                </CardContent>
              </Card>
            </a>

            <a href="https://gravatar.com/muhammadarsalanniazi" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20 border-l-4 border-l-amber-500 group-hover:-translate-y-1 bg-card">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className="p-4 rounded-full bg-amber-500/10 text-amber-500">
                    <img src="https://gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" alt="Gravatar" className="w-8 h-8 opacity-75" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Gravatar</h4>
                    <p className="text-sm text-muted-foreground mt-1">Global Avatar</p>
                  </div>
                  <span className="mt-2 text-sm font-semibold text-amber-500 group-hover:underline">View Profile →</span>
                </CardContent>
              </Card>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}
