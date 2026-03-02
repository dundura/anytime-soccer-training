import Link from 'next/link';
import HeroVideo from '@/components/HeroVideo';
import HeroHeadline from '@/components/HeroHeadline';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import CoachTabbedSection from '@/components/CoachTabbedSection';
import FreeChallengePopup from '@/components/FreeChallengePopup';
import CoachBar from '@/components/CoachBar';
import HomeBlogSection from '@/components/HomeBlogSection';

export default function HomePage() {
  return (
    <>
      <FreeChallengePopup />
      {/* ===== HERO ===== */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9889;</span> <span className="text-red">5,000+</span> Follow-Along Videos
                </div>
                <HeroHeadline />
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  Structured follow-along soccer videos for players who want to improve — and coaches who want to see it happen.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2">
                    Start Training Free <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </Link>
                  <Link href="/team-demo-request-anytime-soccer-training" className="bg-transparent text-white border-2 border-white/60 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white hover:text-navy inline-flex items-center gap-2">
                    Request Team Demo
                  </Link>
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
                <HeroVideo />
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

      {/* ===== COACH BAR ===== */}
      <CoachBar />

      {/* ===== 7-DAY TABBED VIDEO ===== */}
      <TabbedVideoSection />

      {/* ===== COACHES TABBED SECTION ===== */}
      <CoachTabbedSection />

      {/* ===== REVIEWS ===== */}
      <section className="pt-0 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Our Reviews</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Parent Reactions', img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/home/review-1.png', href: 'https://www.instagram.com/reel/C0VSBMCr8a4/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
              { title: 'Coach Reactions', img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/home/review-2.png', href: 'https://www.instagram.com/reel/C2U6xM6rLug/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' },
              { title: 'Club Reactions', img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/home/review-3.png', href: 'https://www.facebook.com/reel/1273977504005434' },
            ].map((review) => (
              <a key={review.title} href={review.href} target="_blank" rel="noopener noreferrer" className="relative rounded-2xl overflow-hidden group block bg-white shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all">
                <img src={review.img} alt={review.title} className="w-full aspect-[4/5] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-red rounded-full flex items-center justify-center text-white text-2xl shadow-[0_4px_20px_rgba(220,55,62,0.4)] group-hover:scale-110 transition-transform">&#9654;</div>
                </div>
                <div className="absolute bottom-6 left-6 text-white font-bold text-lg">{review.title}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== 30-DAY PLAN ===== */}
      <section className="pt-6 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            <span className="text-red">Must-Have Resources for</span> Serious Soccer Parents
          </h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f2642 0%, #1e3a5f 100%)', padding: '60px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '300px' }}>
                <div className="text-[42px] font-extrabold text-white leading-[1.1] mb-2.5">FREE <span className="text-red">30-DAY</span> TRAINING PLAN</div>
                <div className="text-white/80 text-base tracking-[2px] uppercase">Learn. Train. Progress.</div>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[2px] text-red mb-3">Not Sure Where to Start?</p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">GET A FREE 30-DAY PLAN BUILT FOR YOUR PLAYER</h3>
                <p className="text-gray mb-6">No guesswork. Just follow the plan and watch them improve.</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[rgba(16,185,129,0.15)] text-[#10b981] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                    <strong className="text-navy">A personalized training schedule based on your player&apos;s skill level.</strong>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 bg-[rgba(16,185,129,0.15)] text-[#10b981] rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">&#10003;</span>
                    <strong className="text-navy">Step-by-step videos delivered daily — just hit play and train.</strong>
                  </li>
                </ul>
                <Link href="/free-30-day-training-plan" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold transition-all shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-flex items-center gap-2">
                  Get My Free Plan &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MUST-HAVE RESOURCES ===== */}
      <section className="pt-0 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-0 mt-0 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(15,49,84,0.12)] min-h-[480px]">
            <div className="relative">
              <img src="http://media.anytime-soccer.com/wp-content/themes/anytime/images/home/bg-1.png" alt="In-home Soccer Training Guide" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#ECF1F7] p-10 md:p-14 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full border-2 border-navy/10 pointer-events-none" />
              <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border-2 border-navy/5 pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border-2 border-navy/10 pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border-2 border-navy/5 pointer-events-none" />

              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase leading-tight mb-6 relative z-10">
                <span className="text-navy">THE MUST-HAVE GUIDE </span>
                <span className="text-red">TO IN-HOME SOCCER TRAINING</span>
              </h3>
              <p className="text-navy/70 text-lg mb-8 relative z-10">A free ebook packed with practical tips from a passionate soccer parent and coach.</p>
              <div className="relative z-10">
                <Link href="/must-have-guide-for-serious-soccer-parents" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:-translate-y-0.5 inline-flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download Free Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THREE EBOOKS ===== */}
      <section className="pt-0 pb-20 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-12">Three Ebooks Every Parent and Coach Should Read!</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Is Your Club Failing Your Players? 20 Questions Every Parent Should Ask', img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-1.png', cta: 'Download', href: '/20-questions-every-parent-should-ask' },
              { title: 'Your Players Are Watching. Are You Ready?', img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-2.png', cta: 'Show Me How', href: '/become-a-rec-coach-superhero' },
              { title: "The Guest Player Loophole Most Families Don\u2019t Know About", img: 'http://media.anytime-soccer.com/wp-content/themes/anytime/images/ebook/ebook-3.png', cta: 'Get the Guide', href: '/everything-you-need-to-know-about-guest-playing' },
            ].map((ebook) => (
              <div key={ebook.title} className="bg-white rounded-2xl p-8 text-center shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all">
                <img src={ebook.img} alt={ebook.title} className="w-full max-w-[200px] mx-auto mb-6" />
                <h3 className="font-bold text-navy text-lg mb-4">{ebook.title}</h3>
                <Link href={ebook.href} className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-full font-bold transition-all inline-flex items-center gap-2">
                  {ebook.cta} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST FROM THE BLOG ===== */}
      <HomeBlogSection />
    </>
  );
}
