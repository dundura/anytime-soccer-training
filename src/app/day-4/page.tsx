import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 4 email's button lands. Same shape as the other day pages:
 * what it is on the left, the video on the right.
 */

const VIDEO_ID = 'NofobC68onY';

const POINTS = [
  'Training at home that feels like play, not work.',
  'Siblings, parents, teammates — anyone can be the defender.',
  'Beginner to advanced, ten minutes a day.',
  'A ball and a driveway is enough.',
];

export const metadata: Metadata = {
  title: '1v1 Battles Made Easy — Anytime Soccer Training',
  description:
    'The 1v1 Battles series: training at home that feels like a game. 100% follow along — press play and follow the cues.',
  openGraph: {
    title: '1v1 Battles Made Easy',
    description: 'Training at home that feels like play. Press play and follow the cues.',
    url: 'https://www.anytime-soccer.com/day-4',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: '1v1 Battles Made Easy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '1v1 Battles Made Easy',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayFourPage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[1100px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 4 of 7</p>
        <h1 className="text-[1.75rem] md:text-[2.4rem] font-bold text-navy leading-tight mb-8">
          1v1 Battles Made Easy
        </h1>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — what it is and why it is easy */}
          <div className="bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
            <p className="text-[17px] text-navy/70 leading-relaxed mb-6">
              The bit they think is a game. No planning, no guesswork — it is{' '}
              <strong className="text-navy">100% follow along</strong>. Press play, follow the
              cues, build real skill and confidence.
            </p>

            <ul className="list-none p-0 m-0 space-y-3 mb-8">
              {POINTS.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-[15px] md:text-[16px] font-bold text-navy leading-snug">
                  <span className="text-red font-bold flex-shrink-0">&#10003;</span>
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href="https://app.anytime-soccer.com"
              className="inline-block bg-red text-white font-bold text-[16px] px-9 py-4 rounded-xl shadow-[0_8px_20px_rgba(220,55,62,0.3)] hover:opacity-90 transition-opacity"
            >
              Start Day 4
            </Link>
          </div>

          {/* Right — the session */}
          <div className="flex flex-col items-center md:items-end">
            <div className="w-full">
              <div className="w-full bg-white rounded-xl py-2.5 mb-3 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <p className="text-[13px] font-bold uppercase tracking-[2px] text-red text-center">100% follow-along</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                  className="w-full aspect-video block"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="1v1 Battles Made Easy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
