'use client';

import Link from 'next/link';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');

export default function SaleBannerStrip() {
  if (Date.now() >= SALE_END.getTime()) return null;

  return (
    <div className="bg-background pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/memorial-day-sale"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-navy hover:bg-navy-light text-white py-3.5 px-6 rounded-2xl text-center transition-colors group no-underline"
        >
          <span className="text-sm md:text-base font-bold">
            🇺🇸 Memorial Day Sale — <span className="text-red">50% off</span> · Ends May 26
          </span>
          <span className="bg-red text-white text-xs font-bold px-3 py-1 rounded-full group-hover:bg-red-dark transition-colors whitespace-nowrap">
            Shop the Sale →
          </span>
        </Link>
      </div>
    </div>
  );
}
