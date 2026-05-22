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
        <div className="bg-red rounded-3xl px-8 py-7 md:py-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(0,0,0,0.1)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
              Memorial Day Weekend Sale
            </h2>
            <p className="text-xl md:text-2xl font-bold text-white/80 mb-6">
              50% off — Ends May 26
              {timeStr && (
                <span className="ml-3 tabular-nums text-red">{timeStr}</span>
              )}
            </p>
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-red px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              Join for Free →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
