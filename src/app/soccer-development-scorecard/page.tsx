import type { Metadata } from 'next';
import LeadMagnetForm from '@/components/LeadMagnetForm';

export const metadata: Metadata = {
  title: 'Soccer Development Scorecard — Anytime Soccer Training',
  description:
    "A free scorecard for soccer parents: what to watch and count in your player's games, and how to see whether they are really getting better.",
  openGraph: {
    title: 'Soccer Development Scorecard',
    description: "What to watch and count in your player's games, and how to see whether they are really getting better. Free for soccer parents.",
    url: 'https://www.anytime-soccer.com/soccer-development-scorecard',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1789415806547-qjc8h3.png', width: 1672, height: 941, alt: 'Soccer Development Scorecard' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Soccer Development Scorecard',
    images: ['https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1789415806547-qjc8h3.png'],
  },
};

export default function SoccerDevelopmentScorecardPage() {
  return (
    <>
      <section className="bg-background py-16 px-6 min-h-screen">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left — Cover + what is inside */}
            <div className="flex flex-col gap-6">
              <div>
                <img
                  src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1789415806547-qjc8h3.png"
                  alt="Soccer Development Scorecard"
                  className="w-full rounded-2xl shadow-[0_24px_48px_rgba(15,49,84,0.15)]"
                />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-3">What&rsquo;s inside</p>
                <ul className="list-none p-0 m-0 space-y-2.5">
                  {[
                    'Team counts: passes in a row, switches of play, shots on target',
                    'Individual counts for every position, plus defenders and goalkeepers',
                    'Space for observations, and every term explained in plain English',
                    'A simple way to compare games weeks and months apart',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-navy leading-snug">
                      <span className="text-red font-bold">&#10003;</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Form Content */}
            <div className="bg-white rounded-2xl p-10 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
              <h2 className="text-[1.75rem] font-bold text-navy leading-tight mb-3">
                The Soccer Development <span className="text-red">Scorecard</span>
              </h2>
              <p className="text-gray mb-4 text-base leading-relaxed">
                How many times has your player&rsquo;s team won, and you still had a feeling that nothing was really
                getting better? Or lost, and you saw real progress?
              </p>
              <p className="text-gray mb-6 text-base leading-relaxed">
                The scoreboard tells you who won. This free scorecard shows you what to watch and count from the
                sideline, so you can see whether your player is actually developing.
              </p>

              <ul className="list-none p-0 mb-6 space-y-2">
                {[
                  'Know what development looks like in a game',
                  'Compare your player only to themselves',
                  'No soccer expertise needed',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[15px] text-navy font-bold">
                    <span className="text-red font-bold">&#10003;</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="my-6">
                <LeadMagnetForm formId="development-scorecard" />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
