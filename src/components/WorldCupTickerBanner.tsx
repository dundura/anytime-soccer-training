'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ITEMS: { label: string; href: string }[] = [
  { label: '🏆 NEW: 2026 World Cup Predictor', href: '/world-cup-predictor#predictor' },
  { label: '⚽ Pick your World Cup champion in 60 seconds', href: '/world-cup-predictor#predictor' },
  { label: '🏅 Live Leaderboard — see who called it', href: '/world-cup-predictor#leaderboard' },
  { label: '🎯 Make your World Cup prediction — free', href: '/world-cup-predictor#predictor' },
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
      className="inline-flex items-center gap-2 px-6 text-sm font-bold whitespace-nowrap text-black hover:underline"
    >
      {item.label} <span className="text-navy">★</span>
    </Link>
  ));

  return (
    <div
      className="block bg-[#FFD60A] text-black overflow-hidden relative"
      aria-label="World Cup 2026 Predictor — pick your champion"
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
