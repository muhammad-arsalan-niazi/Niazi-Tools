import { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';
import { Github, Facebook, Linkedin, Youtube, Code2, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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
      <PageHeader 
        title="About Niazi Tools & The Author" 
        description="Your all-in-one suite of free, offline-first utilities designed to make your daily text-processing tasks easier and faster. 🚀"
      />

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
                I am a passionate Web Developer and SEO Expert based in <strong>Sargodha, Pakistan</strong>. I built Niazi Tools to provide a fast, secure, and privacy-focused suite of utilities for professionals everywhere.
              </p>
            </div>
          </div>
        </Card>

        {/* CTA Banner */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 text-center shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Briefcase size={120} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-4 relative z-10">Available for WordPress & SEO Projects</h3>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6 relative z-10">
            Need a professional website or want to rank higher on Google? I specialize in delivering high-quality WordPress and SEO solutions. 
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

          </div>
        </div>

      </div>
    </div>
  );
}
