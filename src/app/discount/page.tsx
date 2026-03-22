import Link from 'next/link';
import type { Metadata } from 'next';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';
import CoachFeatureCards from '@/components/CoachFeatureCards';
import TabbedVideoSection from '@/components/TabbedVideoSection';

export const metadata: Metadata = {
  title: 'Our Team Uses Anytime Soccer Training — You Should Too',
  description: 'A fellow coach shared this with you. See why their team uses Anytime Soccer Training for home training, homework, and player development.',
};

export default function ReferralPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9889;</span> Recommended by a Fellow Coach
                </div>
                <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                  Our team uses Anytime Soccer Training.<br /><span className="text-red animate-pulse">Yours should too.</span>
                </h1>
                <p className="text-lg text-white/70 mb-8">
                  Mention my name during your demo and get <span className="text-red font-bold">10% off your first year</span>.
                </p>
                <a
                  href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
                >
                  Free Demo &rarr;
                </a>
              </div>
              <div className="relative">
                <AutoplayYouTube videoId="LOv6Jbk8Bac" title="Coach Review of Anytime Soccer Training" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR CLUBS AND TEAMS - identical to /for-coaches */}
      <CoachFeatureCards />

      {/* A LOOK INSIDE THE PROGRAM */}
      <TabbedVideoSection title="A Look Inside the Program" subtitle="A follow-along training system that builds skill and confidence." hideCta />

      {/* PRICING NOTE + REFERRAL OFFER */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-lg text-navy font-semibold mb-2">Starting at just $6 per player per year.</p>
          <p className="text-sm text-gray mb-6">Most clubs cover it. Families barely notice. And the impact on player development is immediate.</p>
          <div className="bg-red/[0.06] border-2 border-red/20 rounded-2xl p-6">
            <p className="text-red font-bold text-lg mb-1">Mention the coach who sent you this</p>
            <p className="text-navy font-extrabold text-2xl mb-2">Get 10% off your first year</p>
            <p className="text-sm text-gray">Just tell us their name during your demo and the discount is applied automatically.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-background text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Ready to try it with your team?
          </h2>
          <p className="text-gray text-lg mb-8">
            The coach who sent you this page is already seeing the difference. A 15-minute demo is all it takes to see if it&apos;s right for your team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
              className="bg-red text-white font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
            >
              Request Free Demo &rarr;
            </a>
            <Link
              href="/for-coaches"
              className="bg-navy text-white font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-navy-light transition-all hover:-translate-y-0.5 inline-block"
            >
              Learn More
            </Link>
          </div>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:neil@anytime-soccer.com" className="text-red font-semibold no-underline">neil@anytime-soccer.com</a> &middot; <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
