import Link from 'next/link';
import type { Metadata } from 'next';

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
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-[640px] mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                <span>&#9889;</span> Recommended by a Fellow Coach
              </div>
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                Our team uses Anytime Soccer Training.<br /><span className="text-red">Yours should too.</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                A coach you know sent you this because it&apos;s working for their players. 5,000+ follow-along videos, team homework tools, and progress tracking — all in one place.
              </p>
              <a
                href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
              >
                See How It Works — Free Demo &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT OUR TEAM GETS */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-3">
            Here&apos;s what our team gets from it
          </h2>
          <p className="text-center text-gray mb-10">And why we think you&apos;d love it too.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#9917;</div>
              <h3 className="font-bold text-navy text-base mb-2">Our Players Train at Home</h3>
              <p className="text-sm text-gray">5,000+ follow-along videos they actually do on their own. No parent supervision needed.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#128203;</div>
              <h3 className="font-bold text-navy text-base mb-2">We Assign &amp; Track Homework</h3>
              <p className="text-sm text-gray">We pin homework from the Coach&apos;s Board and see exactly who trained and for how long.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#128200;</div>
              <h3 className="font-bold text-navy text-base mb-2">Players Are More Prepared</h3>
              <p className="text-sm text-gray">They show up to practice with more touches, more confidence, and better habits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-12 px-5 bg-navy">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="bg-white border-l-4 border-red py-6 px-8 rounded-r-xl text-left">
            <p className="text-base font-semibold text-navy mb-2">
              &ldquo;Before Anytime, we emailed YouTube videos that were impossible to follow and we didn&apos;t know if the players were doing them. Now each team gets 4+ additional hours of touches per week.&rdquo;
            </p>
            <span className="text-sm text-red font-semibold">- Filly Afenegus, Director of Coaching, Pacific FC</span>
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            Getting your team set up is easy
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <div>
                <h3 className="font-bold text-navy mb-1">Request a free demo</h3>
                <p className="text-sm text-gray">15 minutes. We&apos;ll walk you through everything and answer any questions.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <div>
                <h3 className="font-bold text-navy mb-1">Set up your team</h3>
                <p className="text-sm text-gray">Takes a few minutes. Share a team code with your players and they&apos;re in.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <div>
                <h3 className="font-bold text-navy mb-1">Start assigning homework</h3>
                <p className="text-sm text-gray">Pick from 5,000+ videos. Your players train at home. You see the results.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING NOTE */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <p className="text-lg text-navy font-semibold mb-2">Starting at just $6 per player per year.</p>
          <p className="text-sm text-gray">Most clubs cover it. Families barely notice. And the impact on player development is immediate.</p>
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
