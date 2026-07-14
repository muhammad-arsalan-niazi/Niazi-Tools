import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { toolsList } from '@/content/blog';

export const metadata: Metadata = {
  title: 'SEO Tools & Guides | Niazi Tools',
  description: 'Read our comprehensive guides on free online utilities like email extractors, base64 converters, text processing, and more.',
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogIndexPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'Niazi Tools Blog',
    'url': 'https://niazi-tools.vercel.app/blog',
    'description': 'Guides and documentation for all free online utilities by Niazi Tools.',
    'blogPost': toolsList.map(tool => ({
      '@type': 'BlogPosting',
      'headline': tool.title,
      'url': `https://niazi-tools.vercel.app/blog/${tool.slug}`,
      'datePublished': tool.publishedDate
    }))
  };

  return (
    <div className="container mx-auto px-6 max-w-6xl py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader 
        title="SEO Tools & Utility Guides" 
        description="Comprehensive guides on how to boost your productivity using our free, offline-first tools."
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-12 animate-in fade-in-50 duration-700">
        
        {/* Table of Contents - Sticky Sidebar */}
        <div className="lg:w-1/4">
          <Card className="sticky top-6 shadow-md border-primary/10">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-4 text-primary border-b pb-2">Table of Contents</h3>
              <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {toolsList.map(tool => (
                  <li key={tool.slug}>
                    <a href={`#${tool.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors hover:underline line-clamp-1">
                      {tool.title}
                    </a>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Blog Post Cards */}
        <div className="lg:w-3/4 space-y-8">
          {toolsList.map(tool => (
            <Card key={tool.slug} id={tool.slug} className="overflow-hidden shadow-md hover:shadow-lg transition-all group border-primary/10">
              {/* Theme-Aware Banner */}
              <div className="h-32 w-full bg-muted/50 border-b flex items-center justify-center p-6 relative overflow-hidden group-hover:bg-muted transition-colors duration-500">
                <h2 className="text-xl sm:text-2xl font-bold font-headline text-foreground text-center relative z-10">
                  {tool.title}
                </h2>
              </div>
              
              <CardContent className="p-6 sm:p-8">
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {tool.description}
                </p>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                    Free Online Tool
                  </span>
                  <Link href={`/blog/${tool.slug}`} className="text-primary font-semibold hover:underline">
                    Read Guide &rarr;
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
      </div>
    </div>
  );
}
