import { MetadataRoute } from 'next';
import { toolsList } from '@/content/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://niazi-tools.vercel.app';
  const lastModified = new Date();

  const staticPages = [
    '',
    '/blog',
    '/contact',
    '/services',
    '/terms-of-service',
    '/privacy-policy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const blogPages = toolsList.map((tool) => ({
    url: `${baseUrl}/blog/${tool.slug}`,
    lastModified: new Date(tool.publishedDate || lastModified),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
