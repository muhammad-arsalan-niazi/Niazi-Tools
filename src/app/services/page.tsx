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
  MessageSquare,
  ShoppingCart,
  Database,
  MailOpen,
  Map
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Professional Web & SEO Services | Sargodha | Niazi Tools',
  description: 'Hire Muhammad Arsalan Niazi for expert Next.js custom web development, WordPress E-Commerce, Technical SEO, and Email Marketing. Based in Sargodha, serving globally.',
  keywords: ['web developer Sargodha', 'SEO expert Sargodha', 'email marketing Sargodha', 'custom web development', 'wordpress expert', 'ecommerce developer', 'CRM development', 'local SEO services'],
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
    'description': 'Expert Custom Web Development, WordPress E-Commerce solutions, and aggressive Technical SEO services.',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'Maqam e hayat',
      'addressLocality': 'Sargodha',
      'addressRegion': 'Punjab',
      'postalCode': '40100',
      'addressCountry': 'PK'
    },
    'areaServed': [
      {
        '@type': 'City',
        'name': 'Sargodha'
      },
      {
        '@type': 'State',
        'name': 'Punjab'
      },
      {
        '@type': 'Country',
        'name': 'Pakistan'
      }
    ],
    'sameAs': [
      'https://www.linkedin.com/in/muhammad-arsalan-niazi/',
      'https://www.facebook.com/MuhammadArsalanNiazi.Official/',
      'https://github.com/muhammad-arsalan-niazi'
    ],
    'url': 'https://niazi-tools.vercel.app/services',
    'priceRange': '$$',
    'contactPoint': {
      '@type': 'ContactPoint',
      'contactType': 'customer service',
      'availableLanguage': ['English', 'Urdu']
    },
    'keywords': 'Web Developer Sargodha, SEO Sargodha, Email Marketing Sargodha, WordPress Expert, Custom Web Apps, E-Commerce Developer'
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

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-blue-500/10 border border-primary/20 mb-20 p-8 sm:p-16 md:p-24 text-center shadow-2xl">
        <div className="absolute inset-0 bg-primary/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-50"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline mb-6 tracking-tight leading-tight">
            Scale Your Business with{' '}
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient">
              World-Class Digital Solutions
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            I don't just build websites; I architect incredibly fast, highly-converting digital ecosystems that dominate local Sargodha searches and international markets.
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
      </div>

      {/* Trust / Location Banner */}
      <div className="bg-card border border-border shadow-lg rounded-3xl p-8 mb-24 flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-primary/5 transition-shadow">
        <div className="flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold font-headline mb-4">A Local Partner with Global Standards</h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-0">
            Based locally in <strong>Maqam e hayat, Sargodha</strong>, I deliver silicon-valley grade engineering combined with deep local market understanding. 
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 shrink-0">
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

      {/* Core Expertise (In-House) */}
      <div id="core-services" className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">My Core Development Expertise</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Specialized, high-performance technical services handled directly by me with years of hands-on experience.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-primary/20 hover:border-primary group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-primary/10 p-4 w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Code2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Custom Web Apps</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                Lightning-fast, modern web applications built from scratch using React, Next.js, and Tailwind CSS.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-primary h-5 w-5 shrink-0" /> <span>Next.js App Router & SSR</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-primary h-5 w-5 shrink-0" /> <span>Tailwind CSS Architecture</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-primary h-5 w-5 shrink-0" /> <span>Custom API Integrations</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-blue-500/20 hover:border-blue-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Globe className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-blue-500/10 p-4 w-fit mb-4 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Globe className="text-blue-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">WordPress & CMS</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                Top-rated WordPress expert delivering secure custom themes, headless setups, and robust plugin ecosystems.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-5 w-5 shrink-0" /> <span>Custom Theme Development</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-5 w-5 shrink-0" /> <span>Headless WordPress (GraphQL)</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-blue-500 h-5 w-5 shrink-0" /> <span>Malware Removal & Audits</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-orange-500/20 hover:border-orange-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShoppingCart className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-orange-500/10 p-4 w-fit mb-4 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <ShoppingCart className="text-orange-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">E-Commerce Sites</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                High-converting, scalable online stores optimized for sales, built with WooCommerce or Shopify.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> <span>WooCommerce Optimization</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> <span>Custom Payment Gateways</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-orange-500 h-5 w-5 shrink-0" /> <span>Conversion Rate Optimization</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-emerald-500/20 hover:border-emerald-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-emerald-500/10 p-4 w-fit mb-4 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                <Zap className="text-emerald-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Technical SEO</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                Comprehensive audits, Core Web Vitals optimization, and Local/International ranking strategies.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0" /> <span>100/100 Core Web Vitals</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0" /> <span>JSON-LD Schema Engineering</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0" /> <span>Technical Crawl Audits</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-fuchsia-500/20 hover:border-fuchsia-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-fuchsia-500/10 p-4 w-fit mb-4 group-hover:bg-fuchsia-500 group-hover:text-white transition-colors">
                <Database className="text-fuchsia-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">CRM & SaaS</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                Custom dashboard and internal tool development to manage your business operations securely.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-fuchsia-500 h-5 w-5 shrink-0" /> <span>Custom Admin Dashboards</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-fuchsia-500 h-5 w-5 shrink-0" /> <span>Database Architecture</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-fuchsia-500 h-5 w-5 shrink-0" /> <span>SaaS Multi-tenancy</span></li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:-translate-y-2 border border-red-500/20 hover:border-red-500 group bg-card overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <MailOpen className="w-32 h-32" />
            </div>
            <CardHeader className="relative z-10 pb-4">
              <div className="rounded-xl bg-red-500/10 p-4 w-fit mb-4 group-hover:bg-red-500 group-hover:text-white transition-colors">
                <MailOpen className="text-red-500 group-hover:text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold font-headline">Email Marketing</h3>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-muted-foreground mb-4 leading-relaxed h-20">
                High-ROI email campaigns, automation funnels, and precision list building for targeted outreach.
              </p>
              <ul className="space-y-3 text-sm border-t pt-4">
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-red-500 h-5 w-5 shrink-0" /> <span>Automated Drip Campaigns</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-red-500 h-5 w-5 shrink-0" /> <span>List Segmentation</span></li>
                <li className="flex items-start gap-2 font-medium"><CheckCircle2 className="text-red-500 h-5 w-5 shrink-0" /> <span>A/B Testing & Analytics</span></li>
              </ul>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Mid-Page CTA Banner */}
      <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 mb-24 text-center shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-left max-w-xl">
          <h3 className="text-3xl font-bold font-headline mb-4">Need Something Built Fast?</h3>
          <p className="text-primary-foreground/80 text-lg">My schedule is currently open for one more major project this month. Let's discuss your requirements today before the slot fills up.</p>
        </div>
        <a href="#contact-me" className="w-full md:w-auto shrink-0">
          <Button size="lg" variant="secondary" className="w-full text-lg px-10 h-14 hover:scale-105 transition-transform shadow-lg">
            Get a Free Quote
          </Button>
        </a>
      </div>

      {/* Outsourced / Partner Services */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Complete Agency Solutions</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Through my vetted network of elite professionals, I also offer full-stack agency solutions so you have a single point of contact.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors shadow-sm">
            <div className="bg-purple-500/10 p-3 rounded-lg"><Layout className="text-purple-500 h-8 w-8" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">UI/UX Design</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Stunning, user-centric interfaces designed in Figma before a single line of code is written.</p>
            </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors shadow-sm">
            <div className="bg-amber-500/10 p-3 rounded-lg"><PenTool className="text-amber-500 h-8 w-8" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">Branding & Graphics</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Logos, branding kits, and social media creatives designed by top-tier visual artists.</p>
            </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors shadow-sm">
            <div className="bg-cyan-500/10 p-3 rounded-lg"><Map className="text-cyan-500 h-8 w-8" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">Local SEO / GMB</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Google My Business optimization to dominate local map packs in your city.</p>
            </div>
          </div>
          <div className="bg-card border border-border p-6 rounded-2xl flex flex-col items-start gap-4 hover:border-primary/50 transition-colors shadow-sm">
            <div className="bg-pink-500/10 p-3 rounded-lg"><Megaphone className="text-pink-500 h-8 w-8" /></div>
            <div>
              <h4 className="font-bold text-lg mb-2">Digital Marketing</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">Facebook Ads, Google Ads, and Social Media management to drive immediate traffic.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Author Bio Section - Separated completely from the layout box */}
      <div className="mb-24 relative overflow-hidden bg-muted/30 rounded-3xl p-8 sm:p-12 border border-border/50">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Meet Your Developer</h2>
          <p className="text-muted-foreground text-lg">When you hire me, you get a dedicated technical partner who cares deeply about the success of your business.</p>
        </div>
        <div className="max-w-2xl mx-auto">
           <AuthorBio />
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl md:text-4xl font-bold font-headline mb-8 text-center">Frequently Asked Questions</h2>
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
      <div id="contact-me" className="bg-card border border-primary/20 rounded-3xl p-8 sm:p-16 text-center shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <MessageSquare className="w-64 h-64" />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold font-headline mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
            I am currently accepting new clients. Connect with me directly on LinkedIn or Facebook to discuss your requirements and get a free consultation.
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
