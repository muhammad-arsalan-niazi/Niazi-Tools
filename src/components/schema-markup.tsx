import React from 'react';

export function SchemaMarkup() {
  const authorData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Muhammad Arsalan Niazi",
    "url": "https://niazi-tools.vercel.app/contact",
    "image": "https://avatars.githubusercontent.com/u/143963135?v=4",
    "jobTitle": "Web Developer & SEO Expert",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Sargodha",
      "addressCountry": "Pakistan"
    },
    "sameAs": [
      "https://github.com/muhammad-arsalan-niazi",
      "https://www.facebook.com/MuhammadArsalanNiazi.Official",
      "https://www.linkedin.com/in/muhammad-arsalan-niazi",
      "https://www.youtube.com/@DevArsalan",
      "https://www.kaggle.com/marsalanofficial"
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Niazi Tools",
    "url": "https://niazi-tools.vercel.app",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "All",
    "description": "A comprehensive collection of free online tools for text processing, data extraction, formatting, and conversion. Built for speed and offline capabilities.",
    "author": {
      "@type": "Person",
      "name": "Muhammad Arsalan Niazi",
      "url": "https://github.com/muhammad-arsalan-niazi"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "125"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Niazi Tools",
    "url": "https://niazi-tools.vercel.app",
    "logo": "https://niazi-tools.vercel.app/favicon/android-chrome-512x512.png",
    "founder": authorData
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
