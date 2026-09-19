import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 5 email's button lands. Same shape as /day-1 and /day-2:
 * what it is on the left, the video on the right.
 */

const VIDEO_ID = '9f262gP1Bvw';

const POINTS = [
  'Two cones, two steps apart. A pair of shoes does the job.',
  'A driveway, a hallway or the backyard is enough.',
  'Beginner to advanced, ten minutes a day.',
  'Short programs, worked through in order.',
];

export const metadata: Metadata = {
  title: 'Two-Cone Ball Mastery — Anytime Soccer Training',
  description:
    'All it takes is two cones. Short follow-along ball mastery sessions that work in a driveway, a hallway or the backyard.',
  openGraph: {
    title: 'Two-Cone Ball Mastery',
    description: 'All it takes is two cones. Press play and follow along.',
    url: 'https://www.anytime-soccer.com/day-5',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Two-Cone Ball Mastery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two-Cone Ball Mastery',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayFivePage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[1100px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 5 of 7</p>
        <h1 className="text-[1.75rem] md:text-[2.4rem] font-bold text-navy leading-tight mb-8">
          Two Cones Is All It Takes
        </h1>

        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* Left — what it is and why it is easy */}
          <div className="bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
            <p className="text-[17px] text-navy/70 leading-relaxed mb-6">
              No big yard needed, and nothing to plan. It is{' '}
              <strong className="text-navy">100% follow along</strong> — your player presses play,
              follows the screen, and builds real technical skill and confidence on the ball.
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
              Start Day 5
            </Link>
          </div>

          {/* Right — the session */}
          <div className="flex flex-col items-center md:items-end">
            <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-3">100% follow-along</p>
            <div className="w-full rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                className="w-full aspect-video block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Two-Cone Ball Mastery"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
