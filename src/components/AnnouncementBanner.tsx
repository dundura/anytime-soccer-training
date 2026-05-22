'use client';

import { useState } from 'react';
import Link from 'next/link';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);
  const saleActive = Date.now() < SALE_END.getTime();

  if (dismissed) return null;

  if (saleActive) {
    return (
      <div className="bg-navy text-white text-center py-2.5 px-12 relative">
        <Link
          href="/memorial-day-sale"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white! no-underline font-bold text-sm md:text-base hover:underline"
        >
          🎉 <span className="text-red">MEMORIAL DAY SALE</span> — Up to 50% off · Ends May 26 →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white text-lg font-bold bg-transparent border-none cursor-pointer p-1 leading-none"
          aria-label="Dismiss banner"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <div className="bg-red text-white text-center py-2.5 px-12 relative">
      <Link
        href="/the-most-important-skill-in-youth-soccer"
        className="text-white! no-underline font-bold text-base md:text-lg hover:underline"
      >
        ⬇ Download the FREE E-BOOK &ldquo;The Most Important Skill In Youth Soccer&rdquo;
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white text-lg font-bold bg-transparent border-none cursor-pointer p-1 leading-none"
        aria-label="Dismiss banner"
      >
        ✕
      </button>
    </div>
  );
}
