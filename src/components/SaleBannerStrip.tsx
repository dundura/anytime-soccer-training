'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const SALE_END = new Date('2026-06-02T23:59:59-05:00');
const SIGNUP_URL = 'https://app.anytime-soccer.com/auth/registerFree';

const SKILLS = [
  { label: 'Ball Mastery', video: 'https://vz-61d41acf-acf.b-cdn.net/207aad0d-a703-42a8-a6a4-3974a27be429/play_720p.mp4' },
  { label: 'Dribbling',    video: 'https://vz-61d41acf-acf.b-cdn.net/fdc38f95-1a3d-48ee-ac06-0aef5c925e1d/play_720p.mp4' },
  { label: 'Juggling',     video: 'https://vz-61d41acf-acf.b-cdn.net/686e7576-4a74-4d42-af05-2a4f73aa362a/play_720p.mp4' },
  { label: 'Passing',      video: 'https://vz-61d41acf-acf.b-cdn.net/d3a89428-ecab-493f-a16e-2fb4b87970c5/play_720p.mp4' },
  { label: '1v1',          video: 'https://vz-61d41acf-acf.b-cdn.net/ab40df6d-b4dc-4825-a632-ad8a5f02f764/play_720p.mp4' },
];

function pad(n: number) { return String(n).padStart(2, '0'); }

export default function SaleBannerStrip() {
  const [timeStr, setTimeStr] = useState('');
  const [activeSkill, setActiveSkill] = useState(0);

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
            {/* Text + CTA side by side */}
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Copy */}
              <div className="text-center flex-shrink-0 md:ml-8">
                <h2 className="text-4xl md:text-6xl font-black text-navy mb-2 leading-tight">
                  Offer<br />Extended!
                </h2>
                <p className="text-2xl md:text-3xl font-bold text-navy/70">
                  50% off — Ends June 2
                  {timeStr && (
                    <span className="ml-3 font-black text-red">{timeStr}</span>
                  )}
                </p>
              </div>
              {/* CTA */}
              <div className="flex-shrink-0 text-center md:ml-14">
                <Link
                  href="/memorial-day-sale"
                  className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(220,55,62,0.4)]"
                >
                  Join for Free →
                </Link>
                <p className="text-navy/50 text-xs mt-2">Free to join · <span className="text-red font-bold">Upgrades 50% off</span></p>
              </div>
            </div>
            {/* Skills + Video — far right */}
            <div className="hidden md:flex flex-shrink-0 items-center gap-8">
              {/* Skill tags */}
              <div className="flex flex-col gap-1.5">
                <p className="text-red text-[11px] font-bold uppercase tracking-wider mb-0.5">What&apos;s Inside</p>
                {SKILLS.map((skill, i) => (
                  <button key={skill.label} onClick={() => setActiveSkill(i)}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap text-left transition-colors cursor-pointer border-none ${
                      activeSkill === i
                        ? 'bg-navy text-white'
                        : 'bg-navy/8 text-navy hover:bg-navy/15'
                    }`}>
                    {skill.label}
                  </button>
                ))}
              </div>
              {/* Video — switches on skill click */}
              <div className="rounded-2xl overflow-hidden h-36 w-36 shadow-lg flex-shrink-0">
                <video
                  key={activeSkill}
                  src={SKILLS[activeSkill].video}
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
    </div>
  );
}
