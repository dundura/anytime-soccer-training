import type { Metadata } from 'next';
import ForCoachesLearnForm from '@/components/ForCoachesLearnForm';
import ClubInfoForm from '@/components/ClubInfoForm';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';
import CoachFeatureCards from '@/components/CoachFeatureCards';
import WhoIsItForTabs from '@/components/WhoIsItForTabs';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Explore Anytime Soccer Training | For Coaches',
  description: 'Give your players a structured home training system. Assign homework, track progress, and keep players motivated — starting free.',
};

const reviews = [
  { initials: 'TW', name: 'Tyler Wells', text: '"Affordable and easy to use, no parent supervision required. The library is huge and he can always find something to work on."' },
  { initials: 'JM', name: 'Joseph Marjamaa', text: '"My son was behind the other kids. I don\'t have a soccer background, so I scoured the internet—this was the answer."' },
  { initials: 'OF', name: 'Olga Fawcett', text: '"My girls got more quality touches in 3 days than in the past week! Love the 5 minute videos and goal setting!"' },
];

export default function ForCoachesLearnPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left — copy + form */}
              <div className="relative z-10">
                <h1 className="text-[clamp(22px,2.8vw,34px)] font-extrabold text-white leading-tight tracking-tight mb-5">
                  Learn why coaches choose<br />
                  <span className="text-red">Anytime Soccer Training.</span>
                </h1>

                <ForCoachesLearnForm />
              </div>

              {/* Right — video, with the social proof sitting under it */}
              <div className="relative">
                <AutoplayYouTube videoId="LOv6Jbk8Bac" title="Coach AST Review" />

                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap mt-6">
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

            </div>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <WhoIsItForTabs />

      {/* FEATURE CARDS */}
      <CoachFeatureCards />

      {/* ABOUT THE FOUNDER */}
      <section className="py-16 px-5 bg-background">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <img
                src="https://media.anytime-soccer.com/wp-content/uploads/2025/12/coach-scaled.jpg"
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

      {/* CLUB SETUP */}
      <section className="py-16 px-5 bg-[#f0f4f8] text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight mb-3">
            Looking to get your <span className="text-red">whole club</span> set up?
          </h2>
          <p className="text-lg text-[#64748b] mb-8">
            Leave your details and Megan, our Team Success Manager, will walk you through onboarding, club pricing, and the steps to get your teams going.
          </p>
          <ClubInfoForm />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 px-5 bg-background text-center">
        <div className="max-w-[700px] mx-auto">
          <h2 className="text-[clamp(24px,4vw,36px)] font-bold text-navy leading-tight">
            Ready to give your players <span className="text-red">a real advantage?</span>
          </h2>
          <p className="text-lg text-[#64748b] mb-6">
            Join clubs worldwide who are developing better players and strengthening family relationships—$10 per player per year, 20% off with 5+ teams.
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
              href="https://media.anytime-soccer.com/wp-content/uploads/2026/01/case_study_ebook.pdf"
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
