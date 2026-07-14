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
      <div className="prose prose-slate dark:prose-invert max-w-none animate-in fade-in-50 duration-700 mt-8">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Niazi Tools, you accept and agree to be bound by the terms and provision of this agreement. 
          If you do not agree to abide by these terms, please do not use this service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Niazi Tools provides a suite of free, offline-first web-based utility tools for text processing, data extraction, 
          and formatting. The tools run completely in your browser without sending your data to any external server.
        </p>

        <h2>3. Use License</h2>
        <p>
          Permission is granted to temporarily use the materials (information or software) on Niazi Tools' website for personal, 
          non-commercial, and commercial transitory viewing and usage.
        </p>
        <ul>
          <li>The tools are provided free of charge.</li>
          <li>You may not attempt to decompile or reverse engineer any software contained on the website.</li>
          <li>You may not remove any copyright or other proprietary notations from the materials.</li>
        </ul>

        <h2>4. Disclaimer</h2>
        <p>
          The materials on Niazi Tools are provided on an 'as is' basis. Niazi Tools makes no warranties, expressed or implied, 
          and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions 
          of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
        </p>

        <h2>5. Limitations</h2>
        <p>
          In no event shall Niazi Tools or its suppliers be liable for any damages (including, without limitation, damages for loss 
          of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Niazi Tools, 
          even if Niazi Tools or a Niazi Tools authorized representative has been notified orally or in writing of the possibility of such damage.
        </p>

        <h2>6. Revisions and Errata</h2>
        <p>
          The materials appearing on Niazi Tools could include technical, typographical, or photographic errors. Niazi Tools does 
          not warrant that any of the materials on its website are accurate, complete, or current. Niazi Tools may make changes 
          to the materials contained on its website at any time without notice.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us via our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
        </p>
      </div>
    </div>
  );
}
