import Link from 'next/link';
import type { Metadata } from 'next';
import FreeResourceHub from '@/components/FreeResourceHub';

export const metadata: Metadata = {
  title: 'Free Resources — Anytime Soccer Training',
  description: 'Free training plans, ebooks, and community groups for soccer players, parents, and coaches.',
  openGraph: {
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779488664768-rftb48.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779488664768-rftb48.png'],
  },
};

export default function FreeResourceHubPage() {
  return (
    <>
      <FreeResourceHub />

      {/* ===== FINAL CTA ===== */}
      <section className="bg-navy py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready for the Full Training Experience?</h2>
          <p className="text-xl text-white/90 mb-8">Access 5,000+ follow-along training videos and take your player&rsquo;s development to the next level.</p>
          <Link href="/pricing" className="bg-white text-navy hover:bg-background font-bold py-4 px-10 rounded-full text-lg transition-all inline-block hover:-translate-y-0.5">
            Join for Free &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
