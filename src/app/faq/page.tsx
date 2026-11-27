import Link from 'next/link';
import type { Metadata } from 'next';
import FaqHub from '@/components/FaqHub';
import { FAQ_ENTRIES } from '@/data/faqHub';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers for players, teams and coaches: getting started, pricing, rosters, assigning homework and more, with how-to videos.',
};

// FAQPage structured data so Google can show these answers in search.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ENTRIES.filter((e, i, all) => all.findIndex((x) => x.question === e.question) === i).map((e) => ({
    '@type': 'Question',
    name: e.question,
    acceptedAnswer: { '@type': 'Answer', text: e.answer.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* HERO */}
      <section className="pt-4 pb-6 md:pt-6 md:pb-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-8 md:px-12 md:py-10 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-white">
                Frequently Asked <span className="text-red">Questions</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: pills (Players, Teams, Coaches), side menu with search and topics */}
      <section className="bg-background pb-8 md:pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqHub />
        </div>
      </section>

      {/* CTA: small and centered (Neil 2026-11-26) */}
      <section className="pb-10 md:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-xl bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] px-5 py-5 flex flex-col items-center text-center">
            <h2 className="text-lg md:text-xl font-bold text-navy mb-1 text-center">Still Have Questions?</h2>
            <p className="text-sm text-[#64748b] mb-4 text-center">We&apos;re here to help. Reach out anytime.</p>
            <div className="flex flex-wrap gap-2.5 justify-center">
              <a
                href="mailto:neil@anytime-soccer.com"
                className="inline-block font-bold text-sm px-5 py-2.5 rounded-full bg-red text-white! no-underline hover:bg-red-dark transition-colors"
              >
                Email Us
              </a>
              <Link
                href="/pricing"
                className="inline-block font-bold text-sm px-5 py-2.5 rounded-full bg-navy text-white! no-underline hover:bg-navy-light transition-colors"
              >
                Start Training Free &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
