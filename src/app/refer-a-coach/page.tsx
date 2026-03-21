import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Share Anytime Soccer Training with a Fellow Coach',
  description: 'You use it. Your players love it. Now share it with a coach you know. Help them give their players the same home training advantage.',
};

export default function ReferACoachPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10 max-w-[640px] mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                <span>&#9889;</span> Coach-to-Coach
              </div>
              <h1 className="text-[clamp(28px,5vw,44px)] font-extrabold leading-[1.1] text-white mb-4">
                You use it. Your players love it.<br /><span className="text-red">Share it with a coach you know.</span>
              </h1>
              <p className="text-lg text-white/70 mb-8">
                Help a fellow coach give their players the same home training advantage yours already have.
              </p>
              <a
                href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
              >
                Send Them a Free Demo &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY COACHES SHARE IT */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            Why coaches share Anytime Soccer Training
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#9917;</div>
              <h3 className="font-bold text-navy text-base mb-2">Players Actually Improve</h3>
              <p className="text-sm text-gray">5,000+ follow-along videos they can do at home. No parent supervision needed.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#128203;</div>
              <h3 className="font-bold text-navy text-base mb-2">Coaches See Everything</h3>
              <p className="text-sm text-gray">Assign homework, track who trained, and see progress — all from one dashboard.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(15,49,84,0.08)] text-center">
              <div className="text-3xl mb-3">&#128176;</div>
              <h3 className="font-bold text-navy text-base mb-2">Affordable for Everyone</h3>
              <p className="text-sm text-gray">Starting at $6/player/year. Most clubs cover it — families barely notice.</p>
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

      {/* HOW IT WORKS */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-10">
            How to share it
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">1</span>
              <div>
                <h3 className="font-bold text-navy mb-1">Send them this page</h3>
                <p className="text-sm text-gray">Forward the link or copy it — they&apos;ll see everything they need.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">2</span>
              <div>
                <h3 className="font-bold text-navy mb-1">They request a free demo</h3>
                <p className="text-sm text-gray">15 minutes. We show them how it works for their team. No pressure.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">3</span>
              <div>
                <h3 className="font-bold text-navy mb-1">Their players start training</h3>
                <p className="text-sm text-gray">Setup takes minutes. Players can start the same day.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-5 bg-white text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Know a coach who&apos;d benefit?
          </h2>
          <p className="text-gray text-lg mb-8">
            Share this page or have them request a demo directly. It takes 15 minutes and it&apos;s free.
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
              Full Coaches Page
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
