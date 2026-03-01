import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '1v1 & Finishing',
  description: 'Learn to beat defenders and finish with precision. Develop attacking skills that win games.',
};

export default function OneVOneFinishingPage() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">1v1 & Finishing</h1>
          <p className="text-xl text-white/80">
            Learn to beat defenders and finish with precision. Develop the attacking skills that win games.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {['1v1 Attack Patterns', '1v1 Games', 'Finishing Combinations', 'Skill Moves', 'Game Situations', 'Finishing Challenges'].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-bold text-navy">{item}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
              Start 1v1 Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
