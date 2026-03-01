import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ball Mastery Program',
  description: 'The most comprehensive ball mastery program in the world. 1,000+ follow-along videos.',
};

export default function BallMasteryPage() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ball Mastery</h1>
          <p className="text-xl text-white/80">
            Get thousands of extra touches and improve ball manipulation using all parts of the feet.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold text-navy mb-4">The Most Comprehensive Ball Mastery Program in the World</h2>
              <p className="text-gray mb-6">
                Our ball mastery program features 1,000+ follow-along videos accessible across all devices. Whether you&apos;re a complete beginner or an advanced player, our three-phase system will take your touch to the next level.
              </p>
              <p className="text-gray">Costs less annually than one hour of in-person coaching.</p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="space-y-4">
                {['Basic ball manipulation, balance & coordination', 'Challenging ball manipulation with movement and speed changes', 'Advanced skill, creativity, freestyle & game-like situations'].map((phase, i) => (
                  <div key={phase} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                    <div className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      {i + 1}
                    </div>
                    <p className="text-sm text-gray">{phase}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-navy mb-8 text-center">Six Program Modules</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {['1,000 Touch Ball Mastery', 'One Cone Ball Mastery', 'Two Cone Ball Mastery', 'Three & Four Cone Ball Mastery', 'Dynamic Ball Mastery', 'Freestyle Ball Mastery'].map((module) => (
              <div key={module} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚽</span>
                </div>
                <h3 className="font-bold text-navy">{module}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="https://app.anytimesoccertraining.com/register" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
              Start Ball Mastery Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
