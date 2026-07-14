import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { toolsList } from '@/content/blog';
import blogHeroImage from '@/content/blog/Niazi Tools - Blog Post.avif';

export const metadata: Metadata = {
  title: 'SEO Tools & Guides | Niazi Tools',
  description: 'Read our comprehensive guides on free online utilities like email extractors, base64 converters, text processing, and more.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'SEO Tools & Guides | Niazi Tools',
    description: 'Read our comprehensive guides on free online utilities like email extractors, base64 converters, text processing, and more.',
    images: [
      {
        url: `https://niazi-tools.vercel.app${blogHeroImage.src}`,
        width: blogHeroImage.width,
        height: blogHeroImage.height,
        alt: 'Niazi Tools Blog',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Tools & Guides | Niazi Tools',
    description: 'Read our comprehensive guides on free online utilities like email extractors, base64 converters, text processing, and more.',
    images: [`https://niazi-tools.vercel.app${blogHeroImage.src}`],
  }
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
      'datePublished': tool.publishedDate,
      'author': {
        '@type': 'Person',
        'name': 'Muhammad Arsalan Niazi',
        'url': 'https://niazi-tools.vercel.app/contact'
      },
      'image': `https://niazi-tools.vercel.app${blogHeroImage.src}`
    }))
  };

  return (
    <div className="container mx-auto px-6 max-w-6xl py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Modern, Floating Blog Hero Section */}
      <div className="relative w-full mb-16 pt-8 pb-12 flex flex-col items-center text-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-64 bg-fuchsia-500/20 blur-[100px] rounded-full -z-10 pointer-events-none opacity-50 dark:opacity-30 animate-pulse"></div>
        
        {/* Decorative moving bubbles */}
        <div className="absolute top-10 left-[10%] w-24 h-24 bg-primary/20 rounded-full blur-xl -z-10 pointer-events-none animate-bounce" style={{ animationDuration: '4s' }}></div>
        <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-cyan-400/20 rounded-full blur-xl -z-10 pointer-events-none animate-pulse" style={{ animationDuration: '5s' }}></div>
        <div className="absolute top-20 right-[25%] w-16 h-16 bg-fuchsia-500/30 rounded-full blur-lg -z-10 pointer-events-none animate-bounce" style={{ animationDuration: '3s' }}></div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 text-sm font-bold mb-8 border border-fuchsia-500/20 shadow-sm animate-bounce">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-fuchsia-500"></span>
          </span>
          Latest Guides & Tutorials
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-headline mb-6 tracking-tighter leading-none bg-gradient-to-r from-fuchsia-500 via-primary to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-animated-gradient drop-shadow-xl">
          SEO Tools & Utility Guides
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
          Comprehensive guides on how to boost your productivity using our free, offline-first tools.
        </p>
      </div>

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
              <div className="h-40 w-full relative border-b overflow-hidden group-hover:opacity-90 transition-opacity duration-500">
                <img 
                  src={blogHeroImage.src} 
                  alt="Tech Background"
                  className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-40"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
                <div className="absolute inset-0 flex items-end justify-start p-6">
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-foreground relative z-10 drop-shadow-md line-clamp-2">
                    {tool.title}
                  </h2>
                </div>
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
