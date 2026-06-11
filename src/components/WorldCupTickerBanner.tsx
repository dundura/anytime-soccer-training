'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS: { label: string; href: string }[] = [
  { label: '🏆 NEW: 2026 World Cup Predictor', href: '/world-cup-predictor' },
  { label: '⚽ Pick your champion in 60 seconds', href: '/world-cup-predictor' },
  { label: '🎁 Free 7-day training plan', href: '/world-cup-predictor' },
  { label: '🏅 Live Leaderboard — see fan predictions', href: '/world-cup-predictor#leaderboard' },
  { label: '📊 Get your Boldness Score', href: '/world-cup-predictor' },
];

// Campaign ticker for the World Cup predictor — separate from the
// permanent ebook AnnouncementBanner, shown on the homepage only.
export default function WorldCupTickerBanner() {
  const pathname = usePathname();
  if (pathname !== '/') return null;

  const strip = ITEMS.map((item, i) => (
    <Link
      key={i}
      href={item.href}
      className="inline-flex items-center gap-2 px-6 text-sm font-bold whitespace-nowrap text-white hover:text-[#F4C04D] transition-colors"
    >
      {item.label} <span className="text-[#F4C04D]">★</span>
    </Link>
  ));

  return (
    <div
      className="block bg-navy text-white overflow-hidden relative"
      aria-label="World Cup 2026 Predictor — pick your champion and get a free 7-day training plan"
    >
      <div className="wc-ticker-track flex w-max py-2 hover:[animation-play-state:paused]">
        <div className="flex">{strip}</div>
        <div className="flex" aria-hidden>{strip}</div>
        <div className="flex" aria-hidden>{strip}</div>
      </div>
      <style>{`
        .wc-ticker-track {
          animation: wc-ticker-scroll 30s linear infinite;
        }
        @keyframes wc-ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .wc-ticker-track { animation: none; }
        }
      `}</style>
    </div>
  );
}
