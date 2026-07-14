import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toolsList } from '@/content/blog';
import { notFound } from 'next/navigation';
import { AuthorBio } from '@/components/author-bio';

export async function generateStaticParams() {
  return toolsList.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = toolsList.find((t) => t.slug === resolvedParams.slug);
  
  if (!tool) {
    return {
      title: 'Not Found | Niazi Tools',
    };
  }

  return {
    title: `${tool.title} | Niazi Tools`,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: `/blog/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.description,
      type: 'article',
      publishedTime: tool.publishedDate,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tool = toolsList.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': tool.title,
    'description': tool.description,
    'url': `https://niazi-tools.vercel.app/blog/${tool.slug}`,
    'image': 'https://niazi-tools.vercel.app/favicon/android-chrome-512x512.png',
    'datePublished': tool.publishedDate,
    'author': {
      '@type': 'Person',
      'name': 'Muhammad Arsalan Niazi',
      'url': 'https://github.com/muhammad-arsalan-niazi'
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tool.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      }
    }))
  };

  return (
    <div className="container mx-auto px-6 max-w-4xl py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      
      <PageHeader 
        title={tool.title} 
        description={tool.description}
      />

      <Card className="overflow-hidden shadow-xl border-none mb-12 animate-in fade-in-50 duration-700 bg-card">
        {/* CSS-Styled Hero Banner - Reverting to subtle app-like scheme */}
        <div className="h-48 w-full bg-muted/50 border-b flex items-center justify-center p-8 relative">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-headline text-foreground text-center relative z-10 tracking-tight leading-tight">
            {tool.title}
          </h1>
        </div>

        <CardContent className="p-8 sm:p-12 max-w-none">
          <div dangerouslySetInnerHTML={{ __html: tool.content }} />
          
          <div className="mt-12 p-8 bg-muted rounded-2xl text-center shadow-inner border border-primary/10">
            <h3 className="text-2xl font-bold mb-4">Ready to start?</h3>
            <p className="text-muted-foreground mb-6">
              Use this completely free tool right now in your browser. No sign-up required.
            </p>
            <Link href="/">
              <Button size="lg" className="text-lg px-8 shadow-lg shadow-primary/25 hover:-translate-y-1 transition-transform">
                Launch Tool Now &rarr;
              </Button>
            </Link>
          </div>
          
          <AuthorBio />
        </CardContent>
      </Card>
    </div>
  );
}
