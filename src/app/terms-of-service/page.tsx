import { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Terms of Service | Niazi Tools',
  description: 'Terms of Service for using Niazi Tools online utilities.',
  alternates: {
    canonical: '/terms-of-service',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-6 max-w-4xl py-12">
      <PageHeader 
        title="Terms of Service" 
        description="Please read these terms carefully before using Niazi Tools."
      />
      <div className="grid gap-8 mt-12 animate-in fade-in-50 duration-700">
        
        <div className="bg-card border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-primary group-hover:scale-110 transition-transform">01</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-primary flex items-center gap-3">
            <span className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center text-lg">1</span>
            Acceptance of Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            By accessing and using Niazi Tools, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
          </p>
        </div>

        <div className="bg-card border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-blue-500 group-hover:scale-110 transition-transform">02</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-blue-500 flex items-center gap-3">
            <span className="bg-blue-500/10 text-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">2</span>
            Description of Service
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            Niazi Tools provides a suite of free, offline-first web-based utility tools for text processing, data extraction, and formatting. The tools run completely in your browser without sending your data to any external server.
          </p>
        </div>

        <div className="bg-card border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-amber-500 group-hover:scale-110 transition-transform">03</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-amber-500 flex items-center gap-3">
            <span className="bg-amber-500/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">3</span>
            Use License
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative mb-4">
            Permission is granted to temporarily use the materials (information or software) on Niazi Tools' website for personal, non-commercial, and commercial transitory viewing and usage.
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-lg space-y-2 z-10 relative ml-4">
            <li>The tools are provided completely free of charge.</li>
            <li>You may not attempt to decompile or reverse engineer any software.</li>
            <li>You may not remove any copyright or other proprietary notations.</li>
          </ul>
        </div>

        <div className="bg-card border border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-emerald-500 group-hover:scale-110 transition-transform">04</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-emerald-500 flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">4</span>
            Disclaimer
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            The materials on Niazi Tools are provided on an 'as is' basis. Niazi Tools makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.
          </p>
        </div>

        <div className="bg-card border border-fuchsia-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-fuchsia-500 group-hover:scale-110 transition-transform">05</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-fuchsia-500 flex items-center gap-3">
            <span className="bg-fuchsia-500/10 text-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">5</span>
            Limitations
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            In no event shall Niazi Tools or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Niazi Tools.
          </p>
        </div>

      </div>

      {/* Contact Banner */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 via-background to-blue-500/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center shadow-lg animate-in fade-in zoom-in duration-700">
        <h3 className="text-2xl sm:text-3xl font-bold font-headline mb-4">Have Questions About Our Terms?</h3>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          If you have any questions regarding usage, licenses, or anything else about Niazi Tools, please don't hesitate to contact us.
        </p>
        <a href="/contact" className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-md">
          Contact Us Today &rarr;
        </a>
      </div>

    </div>
  );
}
