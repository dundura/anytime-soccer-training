import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 1 email's button lands. Same shape as /day-2 and /day-5.
 */

const VIDEO_ID = 'L_EXa-p8n3E';

const TIPS = [
  'A ball and a flat patch of ground. That is the whole kit list.',
  'Both feet from the first touch — the weak one is the point of the week.',
  'Touches over speed. Quiet feet close to the ball beat fast and wild.',
  'Ten minutes today. Turning up tomorrow is what makes it work.',
];

export const metadata: Metadata = {
  title: 'Day 1: Ball Mastery — Anytime Soccer Training',
  description:
    'Day 1 of the free 7-day plan: ball mastery, the foundation everything else sits on. Watch the session and start today.',
  openGraph: {
    title: 'Day 1: Ball Mastery',
    description: 'The foundation of confidence and control. Watch the session and start today.',
    url: 'https://www.anytime-soccer.com/day-1',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Day 1: Ball Mastery' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day 1: Ball Mastery',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayOnePage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[820px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 1 of 7</p>
        <h1 className="text-[2rem] md:text-[2.6rem] font-bold text-navy leading-tight mb-3">
          Ball <span className="text-red">Mastery</span>
        </h1>
        <p className="text-[17px] text-navy/70 leading-relaxed mb-8 max-w-[640px]">
          Today your player starts doing what most never do — training on their own. Ball mastery is
          the difference between a player who receives the ball and looks up, and one who receives it
          and panics.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] mb-10">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            className="w-full aspect-video block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Day 1: Ball Mastery"
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
            Start Day 1 in the app
          </Link>
        </div>

      </div>
    </section>
  );
}
