import Link from 'next/link';
import type { Metadata } from 'next';
import CoachFeatureCards from '@/components/CoachFeatureCards';

export const metadata: Metadata = {
  title: 'For Coaches & Clubs',
  description: 'Give your players a structured home training system. 5,000+ follow-along videos, team management tools, and progress tracking — starting at just $6 per player per year.',
};

const reviews = [
  { initials: 'TW', name: 'Tyler Wells', text: '"Affordable and easy to use, no parent supervision required. The library is huge and he can always find something to work on."' },
  { initials: 'JM', name: 'Joseph Marjamaa', text: '"My son was behind the other kids. I don\'t have a soccer background, so I scoured the internet—this was the answer."' },
  { initials: 'OF', name: 'Olga Fawcett', text: '"My girls got more quality touches in 3 days than in the past week! Love the 5 minute videos and goal setting!"' },
];

export default function ForCoachesPage() {
  return (
    <>
      {/* HERO: Copy Left, Video Right */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9889;</span> <span className="text-red">5,000+</span> Follow-Along Videos
                </div>
                <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] mb-5">
                  <span className="text-white">Your players want to improve.</span>{' '}
                  <span className="text-red">Give them a system that works.</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  Team training alone isn&apos;t enough. Players need structured practice at home—but most clubs struggle to assign homework and track if it&apos;s actually getting done.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                    className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                  >
                    Request Team Demo →
                  </a>
                </div>
                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map((i) => (
                        <span key={i} className="inline-flex items-center justify-center w-6 h-6 bg-[#00b67a] text-white text-xs rounded-[3px]">&#9733;</span>
                      ))}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#00b67a] from-50% to-[#dcdce6] to-50% text-white text-xs rounded-[3px]">&#9733;</span>
                    </div>
                    <span className="text-sm font-semibold text-white">4.9 (9,651)</span>
                  </div>
                  <div className="w-px h-8 bg-white/20 hidden sm:block" />
                  <div className="text-sm text-white/60">
                    <strong className="text-white block">Trusted by 50,000+ players</strong>
                    in 80+ countries worldwide
                  </div>
                </div>
              </div>
              <div className="relative">
                {/* Assign Homework - above video */}
                <div className="hidden lg:flex mb-4 justify-end">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(15,49,84,0.1)] flex items-center justify-center text-xl">&#128202;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Assign Homework</strong>Coaches monitor training</div>
                  </div>
                </div>
                <div className="block bg-navy rounded-2xl shadow-[0_25px_80px_rgba(15,49,84,0.15)] overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/LOv6Jbk8Bac"
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Coach AST Review"
                  />
                </div>
                {/* Track Progress - below video */}
                <div className="hidden lg:flex mt-4 justify-start">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center text-xl">&#10003;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Track Progress</strong>See every completed session</div>
                  </div>
                </div>
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

      {/* FEATURE CARDS WITH VIDEOS */}
      <CoachFeatureCards />

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
