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
      
      <div className="grid gap-8 mt-12 animate-in fade-in-50 duration-700">
        
        <div className="bg-card border border-primary/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-primary group-hover:scale-110 transition-transform">01</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-primary flex items-center gap-3">
            <span className="bg-primary/10 text-primary w-10 h-10 rounded-full flex items-center justify-center text-lg">1</span>
            Offline-First Architecture
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            At Niazi Tools, we believe your data belongs to you. <strong>Our tools are designed to work entirely within your web browser.</strong> When you paste text, extract emails, convert data, or use any of our utilities, the processing happens locally on your device. We do not upload, send, or store your input data on our servers.
          </p>
        </div>

        <div className="bg-card border border-blue-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-blue-500 group-hover:scale-110 transition-transform">02</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-blue-500 flex items-center gap-3">
            <span className="bg-blue-500/10 text-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">2</span>
            Information Collection
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            We do not require you to create an account, log in, or provide any personal information to use our tools. The service is completely free and accessible anonymously to ensure your absolute privacy.
          </p>
        </div>

        <div className="bg-card border border-amber-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-amber-500 group-hover:scale-110 transition-transform">03</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-amber-500 flex items-center gap-3">
            <span className="bg-amber-500/10 text-amber-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">3</span>
            Local Storage Usage
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative mb-4">
            To enhance your user experience, we use your browser's Local Storage to save specific preferences and session data, such as:
          </p>
          <ul className="list-disc list-inside text-muted-foreground text-lg space-y-2 z-10 relative ml-4">
            <li>Your selected theme (Dark or Light mode).</li>
            <li>Temporary tool states so you don't lose data if you accidentally refresh the page.</li>
          </ul>
        </div>

        <div className="bg-card border border-emerald-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-emerald-500 group-hover:scale-110 transition-transform">04</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-emerald-500 flex items-center gap-3">
            <span className="bg-emerald-500/10 text-emerald-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">4</span>
            Third-Party Services
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            While our core tools do not collect data, we use standard third-party services for website hosting (Vercel) to monitor website uptime and performance. These services may collect basic, anonymized web traffic data as governed by their respective privacy policies.
          </p>
        </div>

        <div className="bg-card border border-fuchsia-500/20 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 font-headline text-8xl font-black text-fuchsia-500 group-hover:scale-110 transition-transform">05</div>
          <h2 className="text-2xl font-bold font-headline mb-4 text-fuchsia-500 flex items-center gap-3">
            <span className="bg-fuchsia-500/10 text-fuchsia-500 w-10 h-10 rounded-full flex items-center justify-center text-lg">5</span>
            Security
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg z-10 relative">
            Because we do not transmit your input data to a backend server, the risk of data interception or breaches from our end is virtually eliminated. However, we recommend using a secure connection and keeping your browser updated.
          </p>
        </div>

      </div>

      {/* Contact Banner */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 via-background to-blue-500/10 border border-primary/20 rounded-3xl p-8 sm:p-12 text-center shadow-lg animate-in fade-in zoom-in duration-700">
        <h3 className="text-2xl sm:text-3xl font-bold font-headline mb-4">Have Questions About Your Privacy?</h3>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          We are committed to absolute transparency. If you have any concerns about how our offline-first tools operate, feel free to reach out.
        </p>
        <a href="/contact" className="inline-flex items-center justify-center bg-primary text-primary-foreground px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-md w-full sm:w-auto">
          Contact Us Today &rarr;
        </a>
      </div>

    </div>
  );
}
