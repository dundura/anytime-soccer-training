import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 2 email's button lands.
 *
 * The seven-day emails have always pointed at the homepage, which asks a
 * parent who came to do one specific thing to go and find it. This page is
 * that one thing: the video, four lines telling them how to start it, and the
 * way into the app. Nothing else, because anything else is a reason to leave.
 */

const VIDEO_ID = 'tascEETaN8A';

const TIPS = [
  'Drop the ball from your hands, one touch, catch it. That is rep one.',
  'Alternate feet every single touch, even while it looks a mess.',
  'Add a thigh, then the chest, then the head — one touch each, back to the feet.',
  'Ten minutes is plenty. Count the best run, beat it tomorrow.',
];

export const metadata: Metadata = {
  title: 'Day 2: Two-Footed Juggle Master — Anytime Soccer Training',
  description:
    'Day 2 of the free 7-day plan: both feet, thighs, chest and head. Watch the session and start juggling today.',
  openGraph: {
    title: 'Day 2: Two-Footed Juggle Master',
    description: 'Both feet, thighs, chest and head. Watch the session and start today.',
    url: 'https://www.anytime-soccer.com/day-2',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Day 2: Two-Footed Juggle Master' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day 2: Two-Footed Juggle Master',
    images: [`https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`],
  },
};

export default function DayTwoPage() {
  return (
    <section className="bg-background py-12 md:py-16 px-6">
      <div className="max-w-[820px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 2 of 7</p>
        <h1 className="text-[2rem] md:text-[2.6rem] font-bold text-navy leading-tight mb-3">
          Two-Footed <span className="text-red">Juggle Master</span>
        </h1>
        <p className="text-[17px] text-navy/70 leading-relaxed mb-8 max-w-[640px]">
          Most kids who juggle are only good with one foot. Today fixes that — both feet, thighs,
          chest and head.
        </p>

        <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(15,49,84,0.15)] mb-10">
          <iframe
            src={`https://www.youtube.com/embed/${VIDEO_ID}`}
            className="w-full aspect-video block"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Day 2: Two-Footed Juggle Master"
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
            Start Day 2 in the app
          </Link>
        </div>

      </div>
    </section>
  );
}
