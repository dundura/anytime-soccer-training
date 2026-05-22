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
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeStr(`${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  if (Date.now() >= SALE_END.getTime()) return null;

  return (
    <div className="bg-background pt-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl px-8 py-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(220,55,62,0.06)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Text + CTA — left side */}
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black text-navy mb-2 leading-tight">
                Memorial Day<br />Weekend Sale
              </h2>
              <p className="text-xl md:text-2xl font-bold text-navy/70 mb-5">
                50% off — Ends May 26
                {timeStr && (
                  <span className="ml-3 font-black text-red">{timeStr}</span>
                )}
              </p>
              <a
                href={SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(220,55,62,0.4)]"
              >
                Join for Free →
              </a>
              <p className="text-navy/50 text-xs mt-2">Free to join · Upgrades 50% off</p>
            </div>
            {/* Video — far right */}
            <div className="hidden md:block flex-shrink-0 rounded-2xl overflow-hidden h-40 w-28 shadow-lg">
              <video
                src="https://player.vimeo.com/progressive_redirect/playback/1169251911/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=454345d4a02d6620937239318c150798b6cf0e75d2903f30b26c1c4137b20693"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
