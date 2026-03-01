'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-red text-white text-center py-2.5 px-12 relative">
      <Link
        href="/the-most-important-skill-in-youth-soccer"
        className="text-white! no-underline font-bold text-sm md:text-base hover:underline"
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
