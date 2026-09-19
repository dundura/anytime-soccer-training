import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 5 email's button lands. Same shape as /day-2 deliberately:
 * a parent who has already been here once on Day 2 should not have to work
 * out a second layout.
 */

const VIDEO_ID = '9f262gP1Bvw';

const TIPS = [
  'Two cones, about two steps apart. A pair of shoes works just as well.',
  'Driveway, hallway or backyard — the space between the cones is the whole pitch.',
  'Slow and clean first. Speed is what you add once the touches stop wandering.',
  'Ten minutes. Same two cones tomorrow, one drill further on.',
];

export const metadata: Metadata = {
  title: 'Day 5: Two-Cone Ball Mastery — Anytime Soccer Training',
  description:
    'Day 5 of the free 7-day plan: all it takes is two cones. Watch the session and start training at home today.',
  openGraph: {
    title: 'Day 5: Two-Cone Ball Mastery',
    description: 'All it takes is two cones. It works in a driveway, a hallway, or the backyard.',
    url: 'https://www.anytime-soccer.com/day-5',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Day 5: Two-Cone Ball Mastery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day 5: Two-Cone Ball Mastery',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayFivePage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[820px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 5 of 7</p>
        <h1 className="text-[2rem] md:text-[2.6rem] font-bold text-navy leading-tight mb-3">
          Two-Cone <span className="text-red">Ball Mastery</span>
        </h1>
        <p className="text-[17px] text-navy/70 leading-relaxed mb-8 max-w-[640px]">
          No big yard needed. All it takes is two cones — a driveway, a hallway or the backyard is
          enough. Below is Matthew running some of the drills.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] mb-10">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            className="w-full aspect-video block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Day 5: Two-Cone Ball Mastery"
          />
        </div>

        <div className="bg-white rounded-2xl p-7 md:p-8 shadow-[0_8px_24px_rgba(15,49,84,0.08)] mb-8">
          <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-4">How to start</p>
          <ol className="list-none p-0 m-0 space-y-3">
            {TIPS.map((tip, i) => (
              <li key={tip} className="flex items-start gap-3 text-[15px] md:text-[16px] text-navy leading-snug">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red text-white text-[12px] font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {tip}
              </li>
            ))}
          </ol>
        </div>

        <div className="text-center">
          <Link
            href="https://app.anytime-soccer.com"
            className="inline-block bg-red text-white font-bold text-[16px] px-9 py-4 rounded-xl shadow-[0_8px_20px_rgba(220,55,62,0.3)] hover:opacity-90 transition-opacity"
          >
            Start Day 5 in the app
          </Link>
        </div>

      </div>
    </section>
  );
}
