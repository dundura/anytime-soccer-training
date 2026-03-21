import Link from 'next/link';
import type { Metadata } from 'next';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';

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
                  Our team is getting better because of this program, which made me think of you. Mention my name during your demo and get <span className="text-red font-bold">10% off your first year</span>.
                </p>
                <a
                  href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
                >
                  See How It Works — Free Demo &rarr;
                </a>
              </div>
              <div className="relative">
                <AutoplayYouTube videoId="LOv6Jbk8Bac" title="Coach Review of Anytime Soccer Training" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOR CLUBS AND TEAMS */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[900px] mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">For Clubs and Teams</span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight mb-3">
            Your Players Are Going Home With No Plan
          </h2>
          <p className="text-gray text-lg mb-12 max-w-[650px] mx-auto">
            Give every player structured homework, real accountability, and a reason to train — without adding a single minute to your practice schedule.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#127919;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Create Teams</h3>
              <p className="text-xs text-gray">Set up your squad in seconds</p>
            </div>
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#128203;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Build Your Roster</h3>
              <p className="text-xs text-gray">Add players and manage your lineup</p>
            </div>
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#128218;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Assign Homework</h3>
              <p className="text-xs text-gray">Send structured training to every player</p>
            </div>
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#127942;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Create Competitions</h3>
              <p className="text-xs text-gray">Drive friendly competition across your team</p>
            </div>
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#128200;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Track Progress</h3>
              <p className="text-xs text-gray">See every completed session in real time</p>
            </div>
            <div className="bg-background rounded-2xl p-6 text-center">
              <div className="text-3xl mb-3">&#128176;</div>
              <h3 className="font-bold text-navy text-sm mb-1">Raise Money</h3>
              <p className="text-xs text-gray">Fund your team through training subscriptions</p>
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
