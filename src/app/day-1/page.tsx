import type { Metadata } from 'next';
import Link from 'next/link';

/**
 * Where the Day 1 email's button lands. Same shape as /day-2 and /day-5.
 */

const VIDEO_ID = 'L_EXa-p8n3E';

export const metadata: Metadata = {
  title: 'Anytime Soccer Training Ball Mastery Program',
  description:
    'Many smaller ball mastery programs, each an easy-to-follow series from beginner to advanced — over 500 drills, all in a space the size of a driveway.',
  openGraph: {
    title: 'Anytime Soccer Training Ball Mastery Program',
    description: 'Many short ball mastery programs, beginner to advanced. Press play and follow along.',
    url: 'https://www.anytime-soccer.com/day-1',
    images: [{ url: `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`, width: 1280, height: 720, alt: 'Day 1: Ball Mastery' }],
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
      <div className="max-w-[820px] mx-auto">

        <p className="text-[13px] font-bold uppercase tracking-[2px] text-red mb-2">Day 1 of 7</p>
        <h1 className="text-[1.75rem] md:text-[2.4rem] font-bold text-navy leading-tight mb-3">
          Anytime Soccer Training <span className="text-red">Ball Mastery Program</span>
        </h1>
        <p className="text-[17px] text-navy/70 leading-relaxed mb-8 max-w-[640px]">
          It is not one long list of videos. It is many smaller ball mastery programs, each a short
          series your player works through in order — beginner right up to advanced, over 500 drills
          across all of them.
        </p>
        <p className="text-[17px] text-navy/70 leading-relaxed mb-8 max-w-[640px]">
          Every one is easy to follow: press play, copy what is on the screen, come back tomorrow.
          No planning, no equipment beyond a ball and a few square feet.
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
