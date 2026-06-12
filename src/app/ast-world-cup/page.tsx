import type { Metadata } from 'next';
import AstWorldCupBracket from '@/components/AstWorldCupBracket';

export const metadata: Metadata = {
  title: 'AST World Cup 2026 — Live Bracket & Standings',
  description:
    'The top 100 Anytime Soccer Training players compete through World Cup–style rounds, June 15 – July 19. Live standings ranked by training time — follow the bracket.',
  openGraph: {
    title: 'AST World Cup 2026 — Live Bracket & Standings',
    description:
      '100 players. One champion. Live standings ranked by training time, June 15 – July 19.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781235168346-h0tgzm.png' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1781235168346-h0tgzm.png'],
  },
};

const bebas = { fontFamily: "'Bebas Neue', sans-serif" };

export default function AstWorldCupPage() {
  return (
    <main>
      <section className="bg-background pt-10 pb-6 md:pt-14 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm px-6 py-10 sm:px-10 md:px-12 md:py-12 text-center relative overflow-hidden">
            <div
              className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-[radial-gradient(circle,rgba(244,192,77,0.10)_0%,transparent_65%)] pointer-events-none"
              aria-hidden
            />
            <div className="relative">
              <p className="text-red text-xs font-bold uppercase tracking-[3px] mb-3">June 15 – July 19, 2026</p>
              <h1 style={bebas} className="text-6xl sm:text-7xl md:text-8xl text-navy leading-[0.9] tracking-wide mb-4">
                The AST <span className="text-red">World Cup</span>
              </h1>
              <p className="text-gray text-xl font-semibold max-w-2xl mx-auto">
                Our Top 100 trainers — plus 50 weekly wildcards — battle through World
                Cup–style rounds, ranked by minutes trained, champion crowned July 19.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 md:pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AstWorldCupBracket />
        </div>
      </section>

      <section className="pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center bg-navy rounded-3xl px-6 py-10 relative overflow-hidden">
            <div
              className="absolute -top-1/2 -right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(220,55,62,0.15)_0%,transparent_70%)] pointer-events-none"
              aria-hidden
            />
            <div className="relative">
              <h2 style={bebas} className="text-white text-3xl sm:text-4xl tracking-wide mb-3">
                Want in next time?
                <br />
                <span className="text-red">Start training today.</span>
              </h2>
              <p className="text-white/65 mb-6">
                The Top 100 is earned one session at a time — 5,000+ follow-along videos,
                free to start.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="/pricing"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)]"
                >
                  Start Training Free →
                </a>
                <a
                  href="/world-cup-predictor"
                  className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-full font-bold text-base transition-colors"
                >
                  Predict the Real World Cup 🏆
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
