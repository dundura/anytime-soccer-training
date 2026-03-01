import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Anytime Soccer Training',
  description: 'Frequently asked questions about Anytime Soccer Training. Learn about pricing, age ranges, equipment needed, and more.',
};

const faqs = [
  { q: 'Is Anytime Soccer Training really free?', a: 'Yes! You can join for free and access free training sessions forever. Premium plans start at just $59.98/year for individuals and $6/player/year for teams.' },
  { q: 'What age is this for?', a: 'Our training sessions are designed for players ages 4-18, from complete beginners to advanced players.' },
  { q: 'Do I need soccer experience to help my child?', a: 'Not at all. Every video is 100% follow-along — your child just presses play and trains. No coaching experience required.' },
  { q: 'What equipment do I need?', a: 'Just a soccer ball and a small space. Some sessions use cones, but they are optional.' },
  { q: 'How long are the training sessions?', a: 'Sessions range from 5 to 30 minutes. Most popular sessions are 10-15 minutes — perfect for daily training.' },
  { q: 'Can coaches assign homework to their team?', a: 'Yes! Coaches can assign training sessions, set goals, and track player progress automatically.' },
];

export default function FAQPage() {
  return (
    <>
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
                Everything you need to know about Anytime Soccer Training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="bg-background pb-16 md:pb-20">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] group">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-navy text-base md:text-lg list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <svg className="w-5 h-5 text-red flex-shrink-0 ml-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-[15px] text-[#64748b] leading-relaxed -mt-2">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-b from-background to-white py-16 md:py-20 text-center">
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
