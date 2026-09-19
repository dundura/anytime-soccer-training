import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 1 email's button lands.
 *
 * Reads as the Ball Mastery Program rather than as day one of something: a
 * parent arriving from the email wants to know what they are being sent to,
 * and "day 1" answers a different question.
 *
 * The clip is a short, so it is portrait. Framed at 9:16 and capped in width
 * rather than dropped into the 16:9 box the other day pages use, which would
 * have shown it as a thin strip between two black walls.
 */

const VIDEO_ID = 'nFpQqFwrGcY';

const POINTS = [
  'Every move, 100% follow along.',
  'Over 1,500 drills, beginner to advanced.',
  'Short programs, worked through in order.',
  'A ball and a driveway is enough.',
];

export const metadata: Metadata = {
  title: 'Anytime Soccer Training Ball Mastery Program',
  description:
    'Every popular ball mastery move, made 100% follow along. Over 1,500 drills, beginner to advanced, in many short easy-to-follow programs.',
  openGraph: {
    title: 'Anytime Soccer Training Ball Mastery Program',
    description: 'Every popular ball mastery move, made 100% follow along. Press play and copy what is on the screen.',
    url: 'https://www.anytime-soccer.com/day-1',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Anytime Soccer Training Ball Mastery Program' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anytime Soccer Training Ball Mastery Program',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayOnePage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[1100px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 1 of 7</p>
        <h1 className="text-[1.75rem] md:text-[2.4rem] font-bold text-navy leading-tight mb-8">
          Ball Mastery Made Easy
        </h1>

        <div className="grid md:grid-cols-[1fr_340px] gap-10 lg:gap-14 items-start">

          {/* Left — what it is and why it is easy */}
          <div className="bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
            <p className="text-[17px] text-navy/70 leading-relaxed mb-6">
              Every move your player wants, made{' '}
              <strong className="text-navy">100% follow along</strong>. Press play, follow the
              screen, build real skill and confidence.
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
              Start Day 1
            </Link>
          </div>

          {/* Right — a move, followed along */}
          <div className="flex flex-col items-center md:items-end">
            <div className="w-full max-w-[340px]">
              <div className="w-full bg-white rounded-xl py-2.5 mb-3 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <p className="text-[13px] font-bold uppercase tracking-[2px] text-red text-center">100% follow-along</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)]">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEO_ID}`}
                className="w-full aspect-[9/16] block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Anytime Soccer Training Ball Mastery Program"
              />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
