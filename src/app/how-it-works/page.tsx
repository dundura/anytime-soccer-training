import Link from 'next/link';
import type { Metadata } from 'next';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';

export const metadata: Metadata = {
  title: 'How it Works',
  description: 'Learn how Anytime Soccer Training works. Set your goal, pin your plan, press play. 5,000+ follow-along training videos.',
};

const skillCategories = [
  {
    title: '⚽ Ball Mastery',
    videoId: 'JRfulrCeTlM',
    videoSi: '3ItEMmkeY39UH6N-',
    items: ['1,000 Touch Training', 'One Cone Drills', 'Two Cone Combinations', 'Lateral Movement', 'Dynamic Ball Control'],
  },
  {
    title: '🏋️ Juggling & Aerial Control',
    videoId: 'tascEETaN8A',
    items: ['Beginner to Advanced Progressions', 'Partner Juggling', 'Tennis Ball Training', 'Aerial Finishing', 'Ball Control in Air'],
  },
  {
    title: '🏃 Dribbling & 1v1 Moves',
    videoId: 'l5yHsvwNXfs',
    items: ['Freestyle Moves', '1v1 Attack Patterns', 'Line Cone Drills', 'Running with Ball', 'Finishing Under Pressure'],
  },
  {
    title: '🎬 Thousands More Videos',
    videoId: 'mKefeI8Efs0',
    items: ['Wall Passing', 'Partner Passing', 'Soccer Games', 'Dynamic Warmups', 'Fitness & Conditioning'],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": "How Anytime Soccer Training Works",
          "description": "See how players use Anytime Soccer Training to follow structured programs at home. Set a goal, pin a plan, press play.",
          "thumbnailUrl": "https://img.youtube.com/vi/fkHIe88Cwqo/maxresdefault.jpg",
          "embedUrl": "https://www.youtube.com/embed/fkHIe88Cwqo",
          "uploadDate": "2024-01-01",
        }) }}
      />
      {/* HERO SECTION */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="relative z-10">
                <h1 className="text-[clamp(40px,5vw,56px)] font-extrabold leading-[1.1] mb-5">
                  <span className="text-white">Your Player Wants to Be Great.</span>{' '}
                  <span className="text-white">Two Hours a Week Won&apos;t Get Them There.</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  Team practice isn&apos;t enough to develop elite skills. AST gives players a structured home training system so they improve every day — not just on the field.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center">
                    Join for Free &rarr;
                  </Link>
                </div>
              </div>
              <div className="relative">
<AutoplayYouTube videoId="fkHIe88Cwqo" title="How Anytime Soccer Training Works" />
                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap mt-4">
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

      {/* HOW EASY IT IS - 3 STEPS */}
      <section className="bg-background pt-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy">Three Steps to Better Training</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 md:p-12 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-[60px] items-center">
              {/* LEFT: 3 STEPS */}
              <div>
                {[
                  { step: '1', title: 'Set Your Goal', desc: 'Choose what you want to improve—ball mastery, juggling, dribbling, or all of it.' },
                  { step: '2', title: 'Pin Your Plan', desc: 'Add training sessions to your calendar. The system tells you exactly what to do each day.' },
                  { step: '3', title: 'Press Play', desc: 'Every video includes demonstrations, instructions, music, and timers. Just follow along.' },
                ].map((item) => (
                  <div key={item.step} className="mb-6">
                    <h3 className="text-xl font-bold text-navy flex items-center gap-3 mb-2">
                      <span className="inline-flex w-9 h-9 min-w-[36px] bg-red rounded-full items-center justify-center text-lg font-extrabold text-white flex-shrink-0">
                        {item.step}
                      </span>
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-navy ml-12">{item.desc}</p>
                  </div>
                ))}

                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link
                    href="/pricing"
                    className="inline-block font-bold text-base px-8 py-4 rounded-full bg-red text-white! no-underline shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:bg-red-dark hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center"
                  >
                    Start Training Free →
                  </Link>
                </div>
              </div>

              {/* RIGHT: VIDEO */}
              <div>
                <div className="rounded-[20px] overflow-hidden shadow-[0_25px_80px_rgba(15,49,84,0.15)]">
                  <iframe
                    src="https://www.youtube.com/embed/R__kQPcB2EM?si=z9fBCg2ddkFX3BeB"
                    className="w-full aspect-video block border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Three Steps to Better Training"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILL CATEGORIES */}
      <section className="bg-background pt-2 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy">Master Every Aspect of the Game</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat.videoId}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(15,49,84,0.12)] transition-all"
              >
                <h3 className="text-[clamp(20px,3vw,28px)] font-bold text-navy mb-3">{cat.title}</h3>
                <div className="rounded-[20px] overflow-hidden shadow-[0_25px_80px_rgba(15,49,84,0.15)] mb-6">
                  <iframe
                    src={`https://www.youtube.com/embed/${cat.videoId}${cat.videoSi ? `?si=${cat.videoSi}` : ''}`}
                    className="w-full aspect-video block border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={cat.title}
                  />
                </div>
                <ul className="space-y-3 list-none p-0">
                  {cat.items.map((item) => (
                    <li key={item} className="pl-8 relative text-[15px] text-navy">
                      <span className="absolute left-0 w-5 h-5 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TRAINING */}
      <section className="pt-4 pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-4 block">Featured Training</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-navy">Training Session of the Month</h2>
          </div>

          <div className="max-w-[800px] mx-auto">
            <div className="rounded-[20px] overflow-hidden shadow-[0_25px_80px_rgba(15,49,84,0.15)] mb-6">
              <iframe
                src="https://www.youtube.com/embed/zULXabRsxco"
                className="w-full aspect-video block border-none"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Training Session of the Month"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(15,49,84,0.08)]">
              <h3 className="text-[clamp(20px,3vw,28px)] font-bold text-navy mb-4">What&apos;s Included:</h3>
              <ul className="space-y-3 list-none p-0 mb-6">
                {['100% Follow-along', 'Slow motion demo for every move', 'Autocompletion tracking', 'Every skill area'].map((item) => (
                  <li key={item} className="pl-8 relative text-[15px] text-navy">
                    <span className="absolute left-0 w-5 h-5 bg-emerald-500/15 text-emerald-500 rounded-full flex items-center justify-center text-xs font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/pricing"
                className="block w-full text-center font-bold text-base px-8 py-4 rounded-full bg-red text-white! no-underline shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:bg-red-dark hover:-translate-y-0.5 transition-all mt-6"
              >
                Start Training Today →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
