'use client';

import { useState, useEffect } from 'react';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');
const SIGNUP_URL = 'https://app.anytime-soccer.com/auth/registerFree';

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function SaleBannerStrip() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    function tick() {
      const diff = SALE_END.getTime() - Date.now();
      if (diff <= 0) { setTimeStr(''); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeStr(`${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (Date.now() >= SALE_END.getTime()) return null;

  return (
    <div className="bg-background pt-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center gap-3 bg-navy text-white py-3.5 px-6 rounded-2xl">
          <span className="text-sm md:text-base font-bold">
            Memorial Day Weekend Sale — <span className="text-red">50% off</span> · Ends May 26
            {timeStr && <span className="tabular-nums text-white/70"> · {timeStr}</span>}
          </span>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red hover:bg-red-dark text-white text-xs font-bold px-3 py-1 rounded-full transition-colors whitespace-nowrap"
          >
            Join for Free →
          </a>
        </div>
      </div>
    </div>
  );
}
