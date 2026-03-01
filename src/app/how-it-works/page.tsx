import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How it Works',
  description: 'Learn how Anytime Soccer Training works. Set your goal, pin your plan, press play.',
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Team Training Isn&apos;t Enough</h1>
          <p className="text-xl text-white/80 mb-8">
            Players need a clear system to follow at home. Set a goal, pin a plan, press play.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Join for Free
            </Link>
            <Link href="/team-demo-request-anytime-soccer-training" className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Request Team Demo
            </Link>
          </div>
        </div>
      </section>

      {/* 3-Step System */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">Three Simple Steps</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Set Your Goal',
                desc: 'Choose your improvement areas: ball mastery, juggling, dribbling, or comprehensive training.',
                icon: (
                  <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                ),
              },
              {
                step: '2',
                title: 'Pin Your Plan',
                desc: 'Add sessions to your calendar with daily guidance on exactly what to practice.',
                icon: (
                  <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                ),
              },
              {
                step: '3',
                title: 'Press Play',
                desc: 'Videos include demonstrations, instructions, music, and timers for follow-along training.',
                icon: (
                  <svg className="w-8 h-8 text-red" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                ),
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-red mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-bold text-navy mb-3">{item.title}</h3>
                <p className="text-gray">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
              Start Training Free
            </Link>
          </div>
        </div>
      </section>

      {/* Training Categories */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-navy text-center mb-12">What You&apos;ll Train</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Ball Mastery',
                items: ['1,000 Touch Training', 'One Cone Drills', 'Two Cone Combinations', 'Lateral Movement', 'Dynamic Ball Control'],
                href: '/programs/ball-mastery',
                emoji: '\u26BD',
              },
              {
                title: 'Juggling & Aerial',
                items: ['Beginner to Advanced', 'Partner Juggling', 'Tennis Ball Training', 'Aerial Finishing', 'Ball Control in Air'],
                href: '/programs/juggling',
                emoji: '\uD83C\uDFAA',
              },
              {
                title: 'Dribbling & 1v1',
                items: ['Freestyle Moves', '1v1 Attack Patterns', 'Line Cone Drills', 'Running with Ball', 'Finishing Under Pressure'],
                href: '/programs/dribbling',
                emoji: '\uD83C\uDFC3',
              },
              {
                title: 'Additional Content',
                items: ['Wall Passing', 'Partner Passing', 'Soccer Games', 'Dynamic Warmups', 'Fitness & Conditioning'],
                href: '/programs/wall-passing',
                emoji: '\uD83D\uDCDA',
              },
            ].map((cat) => (
              <Link key={cat.title} href={cat.href} className="bg-background rounded-xl p-6 hover:shadow-md transition-shadow block">
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <h3 className="text-lg font-bold text-navy mb-3">{cat.title}</h3>
                <ul className="space-y-1 text-sm text-gray">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1 h-1 bg-red rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy mb-4">Give Your Team a Training System They&apos;ll Actually Use</h2>
            <p className="text-lg text-gray">Just $6 per player annually</p>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { step: '1', title: 'Assign Training', desc: '5,000+ videos to choose from' },
              { step: '2', title: 'Build Your Team', desc: 'Add players, set goals' },
              { step: '3', title: 'Track Progress', desc: 'Automatic alerts & reports' },
              { step: '4', title: 'Celebrate Wins', desc: 'Leaderboards & achievements' },
              { step: '5', title: 'See the Value', desc: 'Cost-effective pricing' },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl shadow-sm p-6 text-center">
                <div className="w-10 h-10 bg-red text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-navy text-sm mb-1">{item.title}</h3>
                <p className="text-gray text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/team-demo-request-anytime-soccer-training" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-block">
              Request Team Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-navy text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Training?</h2>
          <p className="text-lg text-white/80 mb-8">50,000+ players in 80+ countries trust Anytime Soccer Training.</p>
          <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
            Start Training Free
          </Link>
        </div>
      </section>
    </>
  );
}
