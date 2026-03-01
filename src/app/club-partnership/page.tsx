import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Club Partnership',
  description: 'Your players want to improve. Give them a system that works. See how clubs use Anytime Soccer Training to develop players faster.',
};

export default function ClubPartnershipPage() {
  return (
    <>
      {/* HERO: Copy Left, Video Right */}
      <section className="py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[clamp(2rem,5vw,3rem)] font-bold text-navy leading-tight mb-5">
                Your players want to improve.<br />
                <span className="text-red">Give them a system that works.</span>
              </h1>
              <p className="text-lg mb-8 text-navy">
                Team training alone isn&apos;t enough. Players need structured practice at home&mdash;but most clubs struggle to assign homework and track if it&apos;s actually getting done.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/team-demo-request-anytime-soccer-training"
                  className="inline-block font-bold text-base px-8 py-4 rounded-full bg-red text-white shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:bg-red-dark hover:-translate-y-0.5 transition-all"
                >
                  Request Team Demo &rarr;
                </Link>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
                <iframe
                  src="https://www.youtube.com/embed/LOv6Jbk8Bac"
                  className="w-full aspect-video block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Club Partnership Overview"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 VIDEO GRID */}
      <section className="bg-background py-16 md:py-20 text-center">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { title: 'For Clubs', videoId: 'HsoTlfJn-RA', benefit: 'Assign homework and track progress.' },
              { title: 'For Players', videoId: '9f262gP1Bvw', benefit: 'Thousands of follow-along sessions like this one.' },
              { title: 'For Parents', videoId: 'SWEwb1UVoFk', benefit: 'No soccer experience needed.' },
            ].map((item) => (
              <div key={item.videoId}>
                <h3 className="text-lg font-bold text-navy mb-3">{item.title}</h3>
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.videoId}`}
                    className="w-full aspect-video block"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={item.title}
                  />
                </div>
                <p className="text-sm text-red font-semibold mt-3">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FACTS */}
      <section className="bg-gradient-to-b from-background to-white py-16 md:py-20 text-center">
        <div className="max-w-[900px] mx-auto px-5">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">The Facts</span>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy mb-8">
            Simple, affordable, <span className="text-red">comprehensive.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: '🎬', text: '5,000+ follow-along training sessions covering everything' },
              { icon: '🆓', text: 'Free to join and access to free training sessions forever' },
              { icon: '💰', text: 'Only $6 per player per year (coaches free) and only pay if parent activates account' },
            ].map((fact) => (
              <div key={fact.icon} className="bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(15,49,84,0.06)]">
                <div className="text-3xl mb-3">{fact.icon}</div>
                <p className="text-[15px] text-navy">
                  <strong>{fact.text.split(' ').slice(0, 3).join(' ')}</strong>{' '}
                  {fact.text.split(' ').slice(3).join(' ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE FOUNDER */}
      <section className="bg-background py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2025/12/coach-scaled.jpg"
                alt="Neil Crawford with his sons"
                className="w-full max-w-md mx-auto rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)]"
              />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
              <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">About the Founder</span>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy mb-8">
                I built this because <span className="text-red">I faced the same problem.</span>
              </h2>
              <p className="text-[17px] text-navy mb-4">
                I&apos;m Neil Crawford&mdash;a soccer dad who watched kids who practiced at home become more confident and stay in the game longer.
              </p>
              <p className="text-[17px] text-navy mb-4">
                But I couldn&apos;t find a program that was affordable, structured, and easy to follow.
              </p>
              <p className="text-[17px] text-navy mb-4">
                As a coach, I had the same frustration: assigning homework with no way to track it. <strong>So I built Anytime Soccer Training:</strong>
              </p>
              <ul className="space-y-2.5 mb-4">
                {['5,000+ follow-along videos', 'Team tools that give coaches full visibility', 'Track player progress automatically'].map((item) => (
                  <li key={item} className="pl-6 relative text-[15px] text-navy before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-sm">
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORY */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-white/80 mb-4 block">Success Story</span>
              <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-white mb-6">
                Pacific FC transformed their <span className="text-red">player development</span>
              </h2>

              <div className="bg-white border-l-4 border-red rounded-r-xl p-5 mb-6">
                <p className="text-base font-semibold text-navy mb-2">
                  &ldquo;Before Anytime, we emailed Youtube videos that were impossible to follow and we didn&apos;t know if the players were doing them.&rdquo;
                </p>
                <span className="text-sm text-red font-semibold">- Filly Afenegus, Director of Coaching</span>
              </div>

              <p className="text-white/90 text-[17px]">
                Now, each team gets <strong>4+ additional hours of touches per week</strong>. Players compete on leaderboards and coaches track progress.
              </p>
            </div>
            <div className="text-center">
              <img
                src="https://pacificfc.org/wp-content/uploads/2025/03/our-blub-image-1024x709.jpeg"
                alt="Pacific FC Team"
                className="w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-gradient-to-b from-background to-white py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">What You Get</span>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy">
              Everything your club needs to <span className="text-red">win at home training</span>
            </h2>
          </div>

          {/* Feature 1 & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">1</div>
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-red mb-3">Free Onboarding (We Do the Work)</h3>
              <p className="font-bold text-navy mb-3">You fill out one form. We handle the rest.</p>
              <ul className="space-y-2.5">
                {['Dedicated specialist for your club', 'All accounts and teams created', 'Ongoing customer support'].map((item) => (
                  <li key={item} className="pl-6 relative text-[15px] text-navy before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-sm">
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2026/01/microsoftteams-image.jpg"
                alt="Anytime Soccer Training App"
                className="max-w-[280px] mx-auto rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)]"
              />
            </div>
          </div>

          {/* Feature 2 & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="text-center order-2 lg:order-1">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2026/01/microsoftteams-image-2.jpg"
                alt="Anytime Soccer Training Step-by-Step Video Guides"
                className="max-w-[280px] mx-auto rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)]"
              />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 order-1 lg:order-2">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">2</div>
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-red mb-3">5,000+ Follow-Along Videos</h3>
              <p className="font-bold text-navy mb-3">Players press play and train.</p>
              <ul className="space-y-2.5">
                {['100% follow-along (not tutorials)', 'Built-in timers, music, and rest breaks', 'Works on any device'].map((item) => (
                  <li key={item} className="pl-6 relative text-[15px] text-navy before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-sm">
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 3 & 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">3</div>
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-red mb-3">Team Management That Works</h3>
              <p className="font-bold text-navy mb-3">Finally know who&apos;s putting in the work at home.</p>
              <ul className="space-y-2.5">
                {['Set training goals for each team', 'Track completions automatically', 'Leaderboards create accountability'].map((item) => (
                  <li key={item} className="pl-6 relative text-[15px] text-navy before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-sm">
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">4</div>
              <h3 className="text-[clamp(1.125rem,3vw,1.5rem)] font-bold text-red mb-3">Pricing That Makes Sense</h3>
              <p className="font-bold text-navy mb-3">A lifetime solution your club can actually afford.</p>
              <ul className="space-y-2.5">
                {['Free forever tier available', 'Full access: just $6/player/year', 'No contracts, cancel anytime'].map((item) => (
                  <li key={item} className="pl-6 relative text-[15px] text-navy before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:font-bold before:text-sm">
                    <strong>{item}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* THE STAKES */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5 text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">The Stakes</span>
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy mb-6">
            Don&apos;t let your players <span className="text-red">fall behind</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-[17px] text-navy mb-6">
            Kids who only touch the ball at team practice get left behind, lose confidence, stop enjoying the game, and some quit altogether.
          </p>
          <p className="max-w-[700px] mx-auto text-[17px] text-navy">
            <strong>Your players deserve a system that helps them improve&mdash;not random YouTube videos and homework no one tracks.</strong>
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-gradient-to-b from-background to-white py-16 md:py-20">
        <div className="max-w-[1000px] mx-auto px-5">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red mb-4 block">What Families Say</span>
            <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy">5.0 &#11088;&#11088;&#11088;&#11088;&#11088; on Google</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { initials: 'TW', name: 'Tyler Wells', text: '"Affordable and easy to use, no parent supervision required. The library is huge and he can always find something to work on."' },
              { initials: 'JM', name: 'Joseph Marjamaa', text: '"My son was behind the other kids. I don\'t have a soccer background, so I scoured the internet—this was the answer."' },
              { initials: 'OF', name: 'Olga Fawcett', text: '"My girls got more quality touches in 3 days than in the past week! Love the 5 minute videos and goal setting!"' },
            ].map((review) => (
              <div key={review.initials} className="bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(15,49,84,0.06)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center font-bold text-navy text-[13px]">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-bold text-navy text-sm">{review.name}</div>
                    <div className="text-amber-500 text-xs">&#11088;&#11088;&#11088;&#11088;&#11088;</div>
                  </div>
                </div>
                <p className="text-[13px] text-slate-500 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-background py-16 md:py-20 text-center">
        <div className="max-w-[700px] mx-auto px-5">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy mb-6">
            Ready to give your players <span className="text-red">a real advantage?</span>
          </h2>
          <p className="text-lg text-slate-500 mb-6">
            Join clubs worldwide who are developing better players and strengthening family relationships&mdash;starting at just $6 per player per year.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link
              href="/team-demo-request-anytime-soccer-training"
              className="inline-block font-bold text-base px-8 py-4 rounded-full bg-red text-white shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:bg-red-dark hover:-translate-y-0.5 transition-all"
            >
              Request Team Demo &rarr;
            </Link>
            <Link
              href="/pricing"
              className="inline-block font-bold text-base px-8 py-4 rounded-full bg-navy text-white shadow-[0_4px_20px_rgba(15,49,84,0.35)] hover:bg-navy-light hover:-translate-y-0.5 transition-all"
            >
              Join for Free
            </Link>
            <a
              href="https://anytime-soccer.com/wp-content/uploads/2026/01/case_study_ebook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-bold text-base px-8 py-4 rounded-full bg-navy text-white shadow-[0_4px_20px_rgba(15,49,84,0.35)] hover:bg-navy-light hover:-translate-y-0.5 transition-all"
            >
              Download Case Study PDF
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white py-16 md:py-20 text-center">
        <div className="max-w-[1000px] mx-auto px-5">
          <h2 className="text-[clamp(1.5rem,4vw,2.25rem)] font-bold text-navy mb-4">Questions? Let&apos;s talk.</h2>
          <p className="text-lg">
            <a href="mailto:neil@anytime-soccer.com" className="text-red font-semibold hover:underline">neil@anytime-soccer.com</a>
            {' '}&middot;{' '}
            <a href="https://www.anytime-soccer.com" className="text-red font-semibold hover:underline">anytime-soccer.com</a>
            {' '}&middot;{' '}
            <a href="tel:803-431-1082" className="text-red font-semibold hover:underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
