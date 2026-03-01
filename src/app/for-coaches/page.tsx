import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Coaches & Clubs',
  description: 'Give your players a structured home training system. 5,000+ follow-along videos, team management tools, and progress tracking — starting at just $6 per player per year.',
};

const facts = [
  { icon: '🎬', text: '5,000+ follow-along training sessions covering everything' },
  { icon: '🆓', text: 'Free to join and access to free training sessions forever' },
  { icon: '💰', text: 'Only $6 per player per year (coaches free) and only pay if parent activates account' },
];

const reviews = [
  { initials: 'TW', name: 'Tyler Wells', text: '"Affordable and easy to use, no parent supervision required. The library is huge and he can always find something to work on."' },
  { initials: 'JM', name: 'Joseph Marjamaa', text: '"My son was behind the other kids. I don\'t have a soccer background, so I scoured the internet—this was the answer."' },
  { initials: 'OF', name: 'Olga Fawcett', text: '"My girls got more quality touches in 3 days than in the past week! Love the 5 minute videos and goal setting!"' },
];

export default function ForCoachesPage() {
  return (
    <>
      {/* HERO: Copy Left, Video Right */}
      <section className="py-16 px-5 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-navy leading-tight mb-5">
                Your Player Wants to Get Better.<br />
                <span className="text-red">Give Them a System That Works.</span>
              </h1>
              <p className="text-lg mb-4">
                Practice ends. Improvement doesn&apos;t have to.
              </p>
              <p className="text-base text-[#64748b] mb-4">
                Most players go home with zero structure — no plan, no accountability, no way to track if the work is getting done. Coaches can&apos;t assign homework. Parents don&apos;t know what to do. Players fall behind.
              </p>
              <p className="text-base text-[#64748b] mb-8">
                Anytime Soccer Training gives your player a proven daily system — follow-along videos, structured plans, and progress tracking — so every minute at home counts.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                  className="bg-red text-white! font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
                >
                  Request Team Demo →
                </a>
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
                <iframe
                  src="https://www.youtube.com/embed/LOv6Jbk8Bac"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full aspect-video border-none block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 VIDEO GRID */}
      <section className="py-16 px-5 bg-background text-center">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { title: 'For Clubs', src: 'https://www.youtube.com/embed/HsoTlfJn-RA?si=CkvGY5nj_4FmNERN', benefit: 'Assign homework and track progress.' },
              { title: 'For Players', src: 'https://www.youtube.com/embed/9f262gP1Bvw?si=EvUXGSicHrppE9j8', benefit: 'Thousands of follow-along sessions like this one.' },
              { title: 'For Parents', src: 'https://www.youtube.com/embed/SWEwb1UVoFk?si=6z-Gr77Ibdy0QpEP', benefit: 'No soccer experience needed.' },
            ].map((video) => (
              <div key={video.title}>
                <h3 className="text-lg font-bold text-navy mb-3">{video.title}</h3>
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
                  <iframe
                    src={video.src}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video border-none block"
                  />
                </div>
                <p className="text-sm text-red font-semibold mt-3">{video.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE FACTS */}
      <section className="py-16 px-5 bg-gradient-to-b from-background to-white text-center">
        <div className="max-w-[900px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">The Facts</span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
            Simple, affordable, <span className="text-red">comprehensive.</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {facts.map((fact) => (
              <div key={fact.icon} className="bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(15,49,84,0.06)]">
                <div className="text-[32px] mb-3">{fact.icon}</div>
                <p className="text-[15px] text-navy m-0" dangerouslySetInnerHTML={{ __html: fact.text.replace(/^([^<]+?)\s/, '<strong>$1</strong> ') }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT THE FOUNDER */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2025/12/coach-scaled.jpg"
                alt="Neil Crawford with his sons"
                className="max-w-full rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)]"
              />
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
              <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">About the Founder</span>
              <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
                I built this because <span className="text-red">I faced the same problem.</span>
              </h2>
              <p className="text-[17px]">
                I&apos;m Neil Crawford—a soccer dad who watched kids who practiced at home become more confident and stay in the game longer. But I couldn&apos;t find a program that was affordable, structured, and easy to follow.
              </p>
              <p className="text-[17px]">
                As a coach, I had the same frustration: assigning homework with no way to track it. <strong>So I built Anytime Soccer Training:</strong>
              </p>
              <ul className="list-none p-0 m-0 mt-4 space-y-2.5">
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold">5,000+ follow-along videos</li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold">Team tools that give coaches full visibility</li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold">Track player progress automatically</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORY */}
      <section className="py-16 px-5 bg-navy">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-[2px] text-white/80 block mb-3">Success Story</span>
              <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-white leading-tight">
                Pacific FC transformed their <span className="text-red">player development</span>
              </h2>

              <div className="bg-white border-l-4 border-red py-5 px-6 rounded-r-xl my-6">
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
                className="max-w-full rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="py-16 px-5 bg-gradient-to-b from-background to-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">What You Get</span>
            <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
              Everything your club needs to <span className="text-red">win at home training</span>
            </h2>
          </div>

          {/* Feature 1 & Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">1</div>
              <h3 className="text-[clamp(18px,3vw,24px)] font-bold text-red mb-3">Free Onboarding (We Do the Work)</h3>
              <p><strong>You fill out one form. We handle the rest.</strong></p>
              <ul className="list-none p-0 m-0 mt-4 space-y-2.5">
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Dedicated specialist for your club</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>All accounts and teams created</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Ongoing customer support</strong></li>
              </ul>
            </div>
            <div className="text-center">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2026/01/microsoftteams-image.jpg"
                alt="Anytime Soccer Training App"
                className="max-w-[280px] rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)] mx-auto"
              />
            </div>
          </div>

          {/* Feature 2 & Image */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="text-center md:order-first">
              <img
                src="https://anytime-soccer.com/wp-content/uploads/2026/01/microsoftteams-image-2.jpg"
                alt="Anytime Soccer Training Step-by-Step Video Guides"
                className="max-w-[280px] rounded-2xl shadow-[0_20px_60px_rgba(15,49,84,0.15)] mx-auto"
              />
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">2</div>
              <h3 className="text-[clamp(18px,3vw,24px)] font-bold text-red mb-3">5,000+ Follow-Along Videos</h3>
              <p><strong>Players press play and train.</strong></p>
              <ul className="list-none p-0 m-0 mt-4 space-y-2.5">
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>100% follow-along (not tutorials)</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Built-in timers, music, and rest breaks</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Works on any device</strong></li>
              </ul>
            </div>
          </div>

          {/* Feature 3 & 4 */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">3</div>
              <h3 className="text-[clamp(18px,3vw,24px)] font-bold text-red mb-3">Team Management That Works</h3>
              <p><strong>Finally know who&apos;s putting in the work at home.</strong></p>
              <ul className="list-none p-0 m-0 mt-4 space-y-2.5">
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Set training goals for each team</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Track completions automatically</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Leaderboards create accountability</strong></li>
              </ul>
            </div>
            <div className="bg-white border border-[#e2e8f0] rounded-2xl p-8">
              <div className="w-12 h-12 bg-red rounded-[10px] flex items-center justify-center text-2xl font-extrabold text-white mb-4">4</div>
              <h3 className="text-[clamp(18px,3vw,24px)] font-bold text-red mb-3">Pricing That Makes Sense</h3>
              <p><strong>A lifetime solution your club can actually afford.</strong></p>
              <ul className="list-none p-0 m-0 mt-4 space-y-2.5">
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Free forever tier available</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>Full access: just $6/player/year</strong></li>
                <li className="pl-6 relative text-[15px] before:content-['✓'] before:absolute before:left-0 before:text-emerald-500 before:text-sm before:font-bold"><strong>No contracts, cancel anytime</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* AVOID FAILURE */}
      <section className="py-16 px-5 bg-white text-center">
        <div className="max-w-[1000px] mx-auto">
          <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">The Stakes</span>
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
            Don&apos;t let your players <span className="text-red">fall behind</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-[17px] mb-6">
            Kids who only touch the ball at team practice get left behind, lose confidence, stop enjoying the game, and some quit altogether.
          </p>
          <p className="max-w-[700px] mx-auto text-[17px]">
            <strong>Your players deserve a system that helps them improve—not random YouTube videos and homework no one tracks.</strong>
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-16 px-5 bg-gradient-to-b from-background to-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-[2px] text-red block mb-3">What Families Say</span>
            <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">5.0 ⭐⭐⭐⭐⭐ on Google</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {reviews.map((review) => (
              <div key={review.initials} className="bg-white rounded-xl p-5 shadow-[0_2px_12px_rgba(15,49,84,0.06)]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center font-bold text-navy text-[13px]">
                    {review.initials}
                  </div>
                  <div>
                    <div className="font-bold text-navy text-sm">{review.name}</div>
                    <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
                  </div>
                </div>
                <p className="text-[13px] text-[#64748b] leading-relaxed m-0">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-5 bg-background text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
            Ready to give your players <span className="text-red">a real advantage?</span>
          </h2>
          <p className="text-lg text-[#64748b] mb-6">
            Join clubs worldwide who are developing better players and strengthening family relationships—starting at just $6 per player per year.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
              className="bg-red text-white! font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
            >
              Request Team Demo →
            </a>
            <Link
              href="/pricing"
              className="bg-navy text-white! font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(15,49,84,0.35)] inline-block"
            >
              Join for Free
            </Link>
            <a
              href="https://anytime-soccer.com/wp-content/uploads/2026/01/case_study_ebook.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-navy text-white! font-bold text-base py-4 px-8 rounded-full no-underline hover:bg-navy-light transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(15,49,84,0.35)] inline-block"
            >
              Download Case Study PDF
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 px-5 bg-white text-center">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">Questions? Let&apos;s talk.</h2>
          <p className="text-lg">
            <a href="mailto:neil@anytime-soccer.com" className="text-red no-underline font-semibold">neil@anytime-soccer.com</a>
            {' · '}
            <a href="https://www.anytime-soccer.com" className="text-red no-underline font-semibold">anytime-soccer.com</a>
            {' · '}
            <a href="tel:803-431-1082" className="text-red no-underline font-semibold">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
