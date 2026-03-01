import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Programs',
  description: 'Explore Anytime Soccer Training programs: Ball Mastery, Juggling, Dribbling, 1v1 & Finishing, Wall & Passing.',
};

const programs = [
  {
    title: 'Ball Mastery',
    slug: '/programs/ball-mastery',
    description: 'The most comprehensive ball mastery program in the world. Get thousands of extra touches and improve ball manipulation using all parts of the feet.',
    features: ['1,000 Touch Ball Mastery', 'One & Two Cone Variations', 'Lateral Movement', 'Dynamic Ball Mastery', 'Freestyle Ball Mastery'],
  },
  {
    title: 'Juggling & Aerial Control',
    slug: '/programs/juggling',
    description: 'Step-by-step progression from zero to 1,000. Build aerial control, balance, and first touch through structured juggling training.',
    features: ['Beginner to Advanced Progressions', 'Partner Juggling', 'Tennis Ball Training', 'Aerial Control Finishing', 'Ball Control in Air'],
  },
  {
    title: 'Dribbling',
    slug: '/programs/dribbling',
    description: 'Master close control, change of direction, and creative moves. Build the confidence to take on any defender.',
    features: ['Freestyle Dribbling', 'Line Cone Drills', 'Running with the Ball', 'Change of Direction', 'Speed Dribbling'],
  },
  {
    title: '1v1 & Finishing',
    slug: '/programs/1v1-finishing',
    description: 'Learn to beat defenders and finish with precision. Develop the attacking skills that win games.',
    features: ['1v1 Attack Patterns', '1v1 Games', 'Finishing Combinations', 'Skill Moves', 'Game Situations'],
  },
  {
    title: 'Wall & Passing',
    slug: '/programs/wall-passing',
    description: 'Build passing accuracy, first touch, and receiving skills using a wall or rebounder. Perfect for solo training.',
    features: ['Wall Passing Drills', 'Rebounder Training', 'Partner Passing', 'Receiving & Control', 'Dynamic Passing Patterns'],
  },
];

export default function OurProgramsPage() {
  return (
    <>
      <section className="bg-navy text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Become A More Technical Player</h1>
          <p className="text-xl text-white/80 mb-8">
            5,000+ follow-along videos. 100% follow-along format with demonstrations, verbal instructions, music, and timers. No ads.
          </p>
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
            <iframe
              src="https://www.youtube.com/embed/L_EXa-p8n3E"
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Our Programs Overview"
            />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {programs.map((program, i) => (
              <div key={program.slug} className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">{program.title}</h2>
                  <p className="text-gray mb-6">{program.description}</p>
                  <ul className="space-y-2 mb-6">
                    {program.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray">
                        <svg className="w-5 h-5 text-red flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={program.slug} className="bg-red hover:bg-red-dark text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
                    Explore {program.title}
                  </Link>
                </div>
                <div className={`bg-white rounded-xl shadow-md p-8 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="bg-background rounded-lg p-6 text-center">
                    <div className="text-5xl mb-4">{['⚽', '🎪', '🏃', '🎯', '🧱'][i]}</div>
                    <p className="font-bold text-navy">{program.title}</p>
                    <p className="text-sm text-gray mt-1">{program.features.length} program areas</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-red text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Training Today</h2>
          <p className="text-lg text-white/90 mb-8">Access all programs with a free account. No credit card required.</p>
          <Link href="https://app.anytimesoccertraining.com/register" className="bg-white text-red hover:bg-white/90 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block">
            Join for Free
          </Link>
        </div>
      </section>
    </>
  );
}
