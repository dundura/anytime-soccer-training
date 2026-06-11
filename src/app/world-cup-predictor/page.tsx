import type { Metadata } from 'next';
import WorldCupPredictor from '@/components/WorldCupPredictor';
import WorldCupPredictionWall from '@/components/WorldCupPredictionWall';
import WorldCupHeroHeadline from '@/components/WorldCupHeroHeadline';

export const metadata: Metadata = {
  title: 'World Cup 2026 Predictor — Pick Your Champion',
  description:
    'Predict the 2026 World Cup: pick all 12 group winners, your final four, and your champion. Get your Boldness Score plus a free 7-day soccer training plan.',
  openGraph: {
    title: 'World Cup 2026 Predictor — Pick Your Champion',
    description:
      'Pick all 12 group winners, your final four, and your 2026 World Cup champion. Get your Boldness Score — free.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781177188897-n58b0a.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781177188897-n58b0a.png'],
  },
};

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

export default function WorldCupPredictorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-background pt-14 pb-10 md:pt-20 md:pb-14 relative overflow-hidden">
        <div
          className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(220,55,62,0.07)_0%,transparent_65%)] pointer-events-none"
          aria-hidden
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 text-navy">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red" />
                </span>
                The World Cup kicks off today — June 11, 2026
              </div>
              <WorldCupHeroHeadline />
              <p className="text-gray text-xl md:text-2xl font-semibold max-w-2xl mx-auto lg:mx-0 mb-8">
                48 teams. 12 groups. One champion. Build your bracket in 60
                seconds and get your Boldness Score.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <a
                  href="#predictor"
                  className="inline-block bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)]"
                >
                  Make My Prediction 🏆
                </a>
                <a
                  href="#leaderboard"
                  className="inline-block bg-white hover:bg-gray-50 text-navy border border-gray-200 shadow-sm px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5"
                >
                  Live Leaderboard 🏅
                </a>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-2 mt-8 text-gray text-sm font-semibold">
                <span>⚡ Takes about a minute</span>
                <span>🎁 Free 7-day training plan</span>
                <span>📊 Compare with the bookies</span>
              </div>
            </div>
            <div className="relative max-w-md mx-auto lg:max-w-none">
              <div
                className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,192,77,0.25)_0%,transparent_70%)] scale-125 pointer-events-none"
                aria-hidden
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781177188897-n58b0a.png"
                alt="2026 World Cup Predictor — who do you have winning it all?"
                className="relative w-full rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.45)] rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Predictor */}
      <section className="py-10 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorldCupPredictor />
        </div>
      </section>

      {/* Public prediction board */}
      <section id="leaderboard" className="pb-10 md:pb-16 bg-background scroll-mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WorldCupPredictionWall />
        </div>
      </section>

      {/* Brand strip */}
      <section className="pb-16 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">⚽</div>
              <h3 className="text-navy font-black text-lg mb-2">Inspired by the World Cup?</h3>
              <p className="text-gray text-sm leading-relaxed">
                There&apos;s no better month to start training. Anytime Soccer Training has
                5,000+ follow-along videos — your player just presses play.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-navy font-black text-lg mb-2">Trusted worldwide</h3>
              <p className="text-gray text-sm leading-relaxed">
                50,000+ players in 80+ countries train with us — rated 4.9 from
                9,000+ reviews by parents and coaches.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="text-navy font-black text-lg mb-2">Train like the pros</h3>
              <p className="text-gray text-sm leading-relaxed">
                Ball mastery, dribbling, finishing, juggling and more — structured
                programs from beginner to advanced, free to start.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
