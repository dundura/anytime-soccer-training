'use client';

import { useState, useEffect } from 'react';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');
const SIGNUP_URL = 'https://app.anytime-soccer.com/auth/registerFree';

const SKILLS = [
  { label: 'Ball Mastery', video: 'https://player.vimeo.com/progressive_redirect/playback/1169251911/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=454345d4a02d6620937239318c150798b6cf0e75d2903f30b26c1c4137b20693' },
  { label: 'Dribbling',    video: 'https://player.vimeo.com/progressive_redirect/playback/1169251905/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=ee829d62eed3d0045bd4b11fc2ed7f144fa87439124fb5870a3db4c757dbed55' },
  { label: 'Juggling',     video: 'https://player.vimeo.com/progressive_redirect/playback/1169251894/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=feae5ad2df7c4f5414d2e19c076b147e83708023db78c3184f4131122bb9c675' },
  { label: 'Passing',      video: 'https://player.vimeo.com/progressive_redirect/playback/1169251868/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=f4368d3f829c7e85e3250c6f4c27a1d1e827fe24261c1b6f59f031ae13b2841d' },
  { label: '1v1',          video: 'https://player.vimeo.com/progressive_redirect/playback/1169251839/rendition/1080p/file.mp4%20%281080p%29.mp4?loc=external&log_user=0&signature=d830cba85f2636bc209aaca55ac8d7a5a30e6900934b27162223c7e9b497a829' },
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
                <h2 className="text-3xl md:text-5xl font-black text-navy mb-2 leading-tight">
                  Memorial Day<br />Weekend Sale
                </h2>
                <p className="text-xl md:text-2xl font-bold text-navy/70">
                  50% off — Ends May 26
                  {timeStr && (
                    <span className="ml-3 font-black text-red">{timeStr}</span>
                  )}
                </p>
              </div>
              {/* CTA */}
              <div className="flex-shrink-0 text-center md:ml-16">
                <a
                  href={SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(220,55,62,0.4)]"
                >
                  Join for Free →
                </a>
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
