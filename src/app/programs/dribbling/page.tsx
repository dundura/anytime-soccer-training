import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dribbling',
  description: 'Master close control, change of direction, and creative moves with Anytime Soccer Training.',
};

export default function DribblingPage() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Dribbling</h1>
          <p className="text-xl text-white/80">
            Master close control, change of direction, and creative moves. Build the confidence to take on any defender.
          </p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {['Freestyle Dribbling', 'Line Cone Drills', 'Running with the Ball', 'Change of Direction', 'Speed Dribbling', 'Dribbling Challenges'].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏃</span>
                </div>
                <h3 className="font-bold text-navy">{item}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/pricing" className="bg-red hover:bg-red-dark text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
              Start Dribbling Training
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
