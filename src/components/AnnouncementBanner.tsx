'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-navy text-white text-center py-2.5 px-12 relative">
      <Link
        href="/memorial-day-sale"
        className="text-white! no-underline font-bold text-sm md:text-base hover:underline"
      >
        🇺🇸 <span className="text-red">MEMORIAL DAY SALE</span> — Up to 50% off · Ends May 26 →
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
