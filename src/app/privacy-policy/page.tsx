import { Metadata } from 'next';
import { PageHeader } from '@/components/page-header';

export const metadata: Metadata = {
  title: 'Privacy Policy | Niazi Tools',
  description: 'Privacy Policy for Niazi Tools - We respect your privacy and process all data securely in your browser.',
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-6 max-w-4xl py-12">
      <PageHeader 
        title="Privacy Policy" 
        description="Your privacy is our top priority. Learn how we handle your data."
      />
      
      <div className="prose prose-slate dark:prose-invert max-w-none animate-in fade-in-50 duration-700 mt-8">
        <h2>1. Offline-First Architecture & Data Processing</h2>
        <p>
          At Niazi Tools, we believe your data belongs to you. <strong>Our tools are designed to work entirely within your web browser.</strong> 
          When you paste text, extract emails, convert data, or use any of our utilities, the processing happens locally on your device. 
          We do not upload, send, or store your input data on our servers.
        </p>

        <h2>2. Information Collection</h2>
        <p>
          We do not require you to create an account, log in, or provide any personal information to use our tools. 
          The service is completely free and accessible anonymously.
        </p>

        <h2>3. Local Storage Usage</h2>
        <p>
          To enhance your user experience, we use your browser's Local Storage to save specific preferences and session data, such as:
        </p>
        <ul>
          <li>Your selected theme (Dark or Light mode).</li>
          <li>Temporary tool states (e.g., lists you are currently working on) so you don't lose data if you accidentally refresh the page.</li>
        </ul>
        <p>
          This data remains on your device and is never transmitted to us. You can clear this data at any time by clearing your browser's cache and local storage.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>
          While our core tools do not collect data, we may use standard third-party services for website hosting and analytics (such as Vercel and Google Search Console) 
          to monitor website uptime, performance, and search visibility. These services may collect basic, anonymized web traffic data (like IP addresses, browser types, and referring pages) 
          as governed by their respective privacy policies.
        </p>

        <h2>5. Security</h2>
        <p>
          Because we do not transmit your input data to a backend server, the risk of data interception or breaches from our end is virtually eliminated. 
          However, we recommend using a secure connection and keeping your browser updated to ensure your local environment is safe.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. 
          You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, you can contact us through our <a href="/contact" className="text-primary hover:underline">Contact Page</a>.
        </p>
      </div>
    </div>
  );
}
