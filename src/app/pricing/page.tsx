import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Anytime Soccer Training pricing plans. Free Forever, All Access, and Teams plans available.',
};

export default function PricingPage() {
  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Affordable Pricing</h1>
          <p className="text-lg text-white/80">Train at home for less than the cost of one private lesson per year.</p>
        </div>
      </section>

      <section className="py-16 -mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Forever */}
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col">
              <h2 className="text-2xl font-bold text-navy mb-2">Free Forever</h2>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy">$0</span>
                <span className="text-gray ml-1">/forever</span>
              </div>
              <ul className="space-y-3 text-gray mb-8 flex-1">
                {['Dozens of free videos', 'Ball mastery & dribbling content', 'Games & 1v1 challenges', 'Free 7-day training plan', 'No credit card required'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://app.anytimesoccertraining.com/register" className="bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors block">
                Get Started
              </Link>
            </div>

            {/* All Access */}
            <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col ring-2 ring-red relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red text-white text-xs font-bold px-4 py-1 rounded-full">MOST POPULAR</span>
              <h2 className="text-2xl font-bold text-navy mb-2">All Access</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold text-navy">$5.00</span>
                <span className="text-gray ml-1">/month</span>
              </div>
              <p className="text-sm text-gray mb-1">$59.98/year (save 49%)</p>
              <p className="text-sm text-gray mb-6">or $9.89/month billed monthly</p>
              <ul className="space-y-3 text-gray mb-8 flex-1">
                {['5,000+ training videos', '100+ challenges', 'Goals & progress tracking', 'Coach assignments', 'All programs included', 'Cancel anytime'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors block">
                Start Free Trial
              </Link>
            </div>

            {/* Teams */}
            <div className="bg-white rounded-xl shadow-md p-8 flex flex-col">
              <h2 className="text-2xl font-bold text-navy mb-2">Teams</h2>
              <div className="mb-2">
                <span className="text-4xl font-bold text-navy">$6</span>
                <span className="text-gray ml-1">/player/year</span>
              </div>
              <p className="text-sm text-gray mb-6">Minimum 10 players</p>
              <ul className="space-y-3 text-gray mb-8 flex-1">
                {['All Access for every player', 'Team goals & reports', 'Progress tracking dashboard', 'Auto homework reminders', 'Dedicated team support'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/team-demo-request-anytime-soccer-training" className="bg-navy hover:bg-navy-light text-white px-6 py-3 rounded-lg font-semibold text-center transition-colors block">
                Request Demo
              </Link>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
            <h3 className="text-xl font-bold text-navy mb-2">Multiple Players?</h3>
            <p className="text-gray">Extra players at $3.99/month or $19.98/year &mdash; save 58% when switching to annual.</p>
          </div>
        </div>
      </section>
    </>
  );
}
