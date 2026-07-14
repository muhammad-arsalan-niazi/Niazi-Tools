import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuthorBio } from '@/components/author-bio';
import { 
  Code2, 
  Globe, 
  Zap, 
  Layout, 
  PenTool, 
  Megaphone,
  CheckCircle2,
  Facebook,
  Linkedin,
  MapPin,
  Clock,
  MessageSquare
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Web & SEO Services | Niazi Tools',
  description: 'Hire Muhammad Arsalan Niazi for expert Next.js custom web development, WordPress solutions, Technical SEO, UI/UX Design, and Graphic Design. Based in Sargodha, serving globally.',
  keywords: ['web development services', 'wordpress expert', 'technical SEO', 'Sargodha web developer', 'hire nextjs developer', 'graphic design services'],
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Muhammad Arsalan Niazi - Web & SEO Expert',
    'image': 'https://avatars.githubusercontent.com/u/143963135?v=4',
    'description': 'Expert Custom Web Development, WordPress solutions, and Technical SEO services.',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Sargodha',
      'addressRegion': 'Punjab',
      'addressCountry': 'PK'
    },
    'url': 'https://niazi-tools.vercel.app/services',
    'priceRange': '$$',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Urdu']
    }
  };

  const faqs = [
    {
      question: "What is your typical turnaround time for a custom Next.js web application?",
      answer: "Turnaround times vary based on the complexity of the project. A standard multi-page business website takes 2-3 weeks, while complex SaaS dashboards may take 1-2 months. I prioritize writing clean, scalable, and fast code over rushing to completion."
    },
    {
      question: "Do you offer ongoing SEO maintenance after the website is built?",
      answer: "Yes! Building the website is just the first step. I offer monthly Technical SEO retainers where I constantly monitor Core Web Vitals, implement Schema markups, optimize content, and ensure you outrank your competitors locally and globally."
    },
    {
      question: "I see Graphic Design and Digital Marketing listed. Do you do this yourself?",
      answer: "While my core expertise is in Code and Technical SEO, I have partnered with a highly vetted team of expert Graphic Designers, UI/UX Specialists, and Digital Marketers. You deal directly with me as your single point of contact, ensuring premium quality across all deliverables."
    },
    {
      question: "Where are you based, and do you work with international clients?",
      answer: "I am based in Sargodha, Pakistan, but I work with clients all over the world! Using modern communication tools, time zones are never an issue. I ensure daily updates and crystal clear communication."
    }
  ];

  return (
    <div className="container mx-auto px-6 max-w-6xl py-12 animate-in fade-in-50 duration-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <PageHeader title="Professional Services" />

      {/* Hero Section */}
      <div className="text-center mb-20 max-w-3xl mx-auto mt-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 tracking-tight leading-tight">
          Scale Your Business with{' '}
          <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
            World-Class Digital Solutions
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed">
          I don't just build websites; I build incredibly fast, SEO-optimized digital experiences that turn your visitors into paying customers. Let's build your next big thing.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact-me">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 shadow-lg shadow-primary/25 hover:-translate-y-1 transition-transform">
              Hire Me Today
            </Button>
          </a>
          <a href="#core-services">
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 hover:bg-muted">
              Explore Services
            </Button>
          </a>
        </div>
      </div>

      {/* Core Expertise (In-House) */}
      <div id="core-services" className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline mb-4">My Core Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Specialized, high-performance technical services handled directly by me with years of hands-on experience.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-primary/20 hover:border-primary group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Custom Next.js Web Apps</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I architect lightning-fast, highly scalable, and modern web applications using React, Next.js, and Tailwind CSS. Perfect for SaaS products and specialized toolkits.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary h-4 w-4" /> Server-Side Rendering (SSR)</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary h-4 w-4" /> React & Tailwind CSS</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-primary h-4 w-4" /> Custom APIs & Integrations</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-500/20 hover:border-blue-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10">
              <div className="rounded-xl bg-blue-500/10 p-4 w-fit mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Globe className="text-blue-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">WordPress Development</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                As a top-rated WordPress expert, I deliver custom theme development, robust plugin integration, and advanced, ultra-secure headless WordPress setups.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-4 w-4" /> Custom Theme & Plugin Dev</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-4 w-4" /> Speed & Security Audits</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-4 w-4" /> E-Commerce (WooCommerce)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-emerald-500/20 hover:border-emerald-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10">
              <div className="rounded-xl bg-emerald-500/10 p-4 w-fit mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Zap className="text-emerald-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Technical SEO & Audits</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I don't just build websites; I make them rank on Google. I offer comprehensive audits, Core Web Vitals optimization, and Local/International ranking strategies.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-4 w-4" /> Core Web Vitals (100/100)</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-4 w-4" /> JSON-LD Schema Markup</li>
                <li className="flex items-center gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-4 w-4" /> Keyword & Competitor Analysis</li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Outsourced / Partner Services */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-headline mb-4">Complete Agency Solutions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Through my vetted network of elite professionals, I also offer full-stack agency solutions so you don't have to hire multiple freelancers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted/50 border border-border p-6 rounded-2xl flex items-start gap-4 hover:bg-muted transition-colors">
            <div className="bg-fuchsia-500/10 p-3 rounded-lg"><Layout className="text-fuchsia-500 h-6 w-6" /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">UI/UX Design</h4>
              <p className="text-sm text-muted-foreground">Stunning, user-centric interfaces designed in Figma before a single line of code is written.</p>
            </div>
          </div>
          <div className="bg-muted/50 border border-border p-6 rounded-2xl flex items-start gap-4 hover:bg-muted transition-colors">
            <div className="bg-amber-500/10 p-3 rounded-lg"><PenTool className="text-amber-500 h-6 w-6" /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">Graphic Design</h4>
              <p className="text-sm text-muted-foreground">Logos, branding kits, and social media creatives designed by top-tier visual artists.</p>
            </div>
          </div>
          <div className="bg-muted/50 border border-border p-6 rounded-2xl flex items-start gap-4 hover:bg-muted transition-colors">
            <div className="bg-purple-500/10 p-3 rounded-lg"><Megaphone className="text-purple-500 h-6 w-6" /></div>
            <div>
              <h4 className="font-bold text-lg mb-1">Digital Marketing</h4>
              <p className="text-sm text-muted-foreground">Facebook Ads, Google Ads, and Social Media management to drive immediate traffic.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / Location Banner */}
      <div className="bg-card border border-border shadow-lg rounded-3xl p-8 sm:p-12 mb-24 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold font-headline mb-4">Why Work With Me?</h2>
          <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
            I am a dedicated professional based in <strong>Sargodha, Pakistan</strong>, known for delivering international-quality work with unmatched communication and reliability. When you hire me, you get a partner who cares about your business success, not just a coder.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full"><MapPin className="text-primary h-6 w-6" /></div>
              <span className="font-medium text-lg">Sargodha, PK</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-full"><Clock className="text-primary h-6 w-6" /></div>
              <span className="font-medium text-lg">Global Timezones</span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/3">
          {/* Re-use the existing AuthorBio component to build trust */}
          <AuthorBio />
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold font-headline mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border/50 rounded-xl p-6 bg-card shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-xl text-foreground mb-3 flex items-start gap-3">
                <span className="text-primary text-2xl leading-none font-headline">Q.</span>
                {faq.question}
              </h3>
              <p className="text-muted-foreground pl-9 text-base">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Final CTA Lead Capture */}
      <div id="contact-me" className="bg-gradient-to-br from-primary/10 via-background to-blue-500/10 border border-primary/20 rounded-3xl p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <MessageSquare className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold font-headline mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            I am currently accepting new clients. Connect with me on LinkedIn or Facebook to discuss your project requirements and get a free consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="https://www.linkedin.com/in/muhammad-arsalan-niazi/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-[#0A66C2]/20 h-14 text-lg px-8">
                <Linkedin className="mr-3 h-6 w-6" /> Connect on LinkedIn
              </Button>
            </a>
            <a href="https://www.facebook.com/MuhammadArsalanNiazi.Official/" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-[#1877F2] hover:bg-[#0C58C2] text-white shadow-lg shadow-[#1877F2]/20 h-14 text-lg px-8">
                <Facebook className="mr-3 h-6 w-6" /> Message on Facebook
              </Button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
