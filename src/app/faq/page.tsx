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
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[13px] font-bold uppercase tracking-[2px] text-white/80 mb-4 block">FAQ</span>
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-white mb-5">
                Frequently Asked <span className="text-red">Questions</span>
              </h1>
              <p className="text-xl text-white/80 max-w-[600px] mx-auto">
                Answers for players, teams and coaches, with how-to videos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ: pills (Players, Teams, Coaches), side menu with search and topics */}
      <section className="bg-background pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FaqHub />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-background to-white py-8 md:py-10 text-center">
        <div className="max-w-[700px] mx-auto px-5">
          <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy mb-5">Still Have Questions?</h2>
          <p className="text-xl text-[#64748b] mb-8">
            We&apos;re here to help. Reach out anytime.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:neil@anytime-soccer.com"
              className="inline-block font-bold text-base px-8 py-4 rounded-full bg-red text-white! no-underline shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:bg-red-dark hover:-translate-y-0.5 transition-all"
            >
              Email Us
            </a>
            <Link
              href="/pricing"
              className="inline-block font-bold text-base px-8 py-4 rounded-full bg-navy text-white! no-underline shadow-[0_4px_20px_rgba(15,49,84,0.35)] hover:bg-navy-light hover:-translate-y-0.5 transition-all"
            >
              Start Training Free &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
