'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS = [
  '🏆 NEW: 2026 World Cup Predictor',
  '⚽ Pick your champion in 60 seconds',
  '🎁 Free 7-day training plan',
  '📊 Get your Boldness Score',
];

// Campaign ticker for the World Cup predictor — separate from the
// permanent ebook AnnouncementBanner, shown on the homepage only.
export default function WorldCupTickerBanner() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  const strip = ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center gap-2 px-6 text-sm font-bold whitespace-nowrap">
      {item} <span className="text-[#F4C04D]">★</span>
    </span>
  ));

  return (
    <Link
      href="/world-cup-predictor"
      className="block bg-navy text-white overflow-hidden relative group"
      aria-label="World Cup 2026 Predictor — pick your champion and get a free 7-day training plan"
    >
      <div className="wc-ticker-track flex w-max py-2 group-hover:[animation-play-state:paused]">
        <div className="flex">{strip}</div>
        <div className="flex" aria-hidden>{strip}</div>
        <div className="flex" aria-hidden>{strip}</div>
      </div>
      <style>{`
        .wc-ticker-track {
          animation: wc-ticker-scroll 28s linear infinite;
        }
        @keyframes wc-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wc-ticker-track { animation: none; }
        }
      `}</style>
    </Link>
  );
}
