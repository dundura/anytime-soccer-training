import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dribbling Program | Anytime Soccer Training',
  description: 'The world\'s most comprehensive dribbling program. Build ball control, confidence, and the ability to beat defenders — one short session at a time.',
};

const benefits = [
  {
    title: 'Dedicated Video for Each Move',
    description: 'More reps to master each move. Focus on technique, not wondering what\'s next.',
  },
  {
    title: 'Dedicated Video for Each Foot',
    description: 'Practice right foot only, left foot only, and both feet — a game-changer on the field.',
  },
  {
    title: 'Short 5-10 Minute Sessions',
    description: 'Quick videos that keep kids motivated and coming back.',
  },
  {
    title: 'Use All Surfaces of the Foot',
    description: 'Inside, outside, laces, and sole — every way imaginable.',
  },
  {
    title: 'Beginner to Advanced',
    description: '500+ dribbling videos. Start at any level and grow from there.',
  },
];

export default function DribblingProgramPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden text-center">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h1 className="text-[clamp(32px,5vw,48px)] font-extrabold leading-[1.1] text-white mb-4">
                The World&apos;s Most Comprehensive <span className="text-red">Dribbling Program</span>
              </h1>
              <p className="text-xl text-white/80 max-w-[600px] mx-auto">
                Build ball control, confidence, and the ability to beat defenders — one short session at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO + BENEFITS */}
      <section className="pb-20 bg-background">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Video */}
          <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,49,84,0.1)] bg-black mb-10">
            <iframe
              src="https://www.youtube.com/embed/ZnnUJgu4XJs"
              title="Dribbling Program Overview"
              className="w-full aspect-video border-none block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Benefits */}
          <div className="flex flex-col gap-5 mb-10">
            {benefits.map((benefit, i) => (
              <div key={benefit.title} className="bg-white border-2 border-[#ECF1F7] rounded-2xl p-6 flex gap-4 items-start">
                <span className="w-8 h-8 bg-red text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-lg text-navy mb-1">{benefit.title}</h3>
                  <p className="text-[#6b7280] text-[15px] m-0">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="https://app.anytime-soccer.com/auth/login"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] no-underline"
            >
              Start Day 3 &rarr;
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
