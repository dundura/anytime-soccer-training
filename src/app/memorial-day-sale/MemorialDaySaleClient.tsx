'use client';

import { useState, useEffect } from 'react';
import TabbedVideoSection from '@/components/TabbedVideoSection';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');
const SIGNUP_URL = 'https://app.anytime-soccer.com/auth/registerFree';

function useTimeLeft() {
  const [t, setT] = useState('');
  useEffect(() => {
    function tick() {
      const diff = SALE_END.getTime() - Date.now();
      if (diff <= 0) { setT(''); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      const pad = (n: number) => String(n).padStart(2, '0');
      setT(`${pad(d)}:${pad(h)}:${pad(m)}:${pad(s)}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export default function MemorialDaySaleClient() {
  const timeLeft = useTimeLeft();
  const saleActive = SALE_END.getTime() > Date.now();

  return (
    <>
      {/* HERO */}
      <section className="py-6 md:py-8 bg-background">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-navy rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            {/* Accent bar */}
            <div className="bg-red px-7 py-2.5 text-xs font-bold tracking-widest uppercase text-white flex items-center gap-2">
              ⚽ Memorial Day Weekend Sale &middot; <span className="font-extrabold">50% Off All Plans</span>
              {timeLeft && <span className="ml-auto font-mono font-normal tracking-normal normal-case text-white/70">{timeLeft}</span>}
            </div>

            <div className="px-6 py-8 md:px-10 md:py-9 grid md:grid-cols-[1fr_auto] gap-8 items-start">
              {/* Left: text + perks + CTA */}
              <div>
                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-red mb-2.5">Exclusive Offer</p>
                <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
                <h1 className="text-[32px] md:text-[42px] font-extrabold text-white leading-[1.15] uppercase tracking-wide mb-3"
                  style={{ animation: 'fadeUp 0.6s ease both' }}>
                  Kick Off Your<br />
                  <span className="text-red" style={{ animation: 'fadeUp 0.9s ease both', display: 'inline-block' }}>Best Summer Yet.</span>
                </h1>
                <p className="text-[15px] text-white/80 leading-relaxed mb-7 max-w-[520px]">
                  Easy follow-along video sessions your player can do right at home — just a ball and the drive to improve. 5,000+ Training Sessions, any age, any level.
                </p>

                <hr className="border-white/10 mb-6" />

                {/* CTA */}
                <div className="flex items-center gap-4 flex-wrap">
                  <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                    className="bg-red text-white text-sm font-extrabold uppercase tracking-wider px-7 py-3 rounded-lg no-underline hover:bg-red-dark transition-all">
                    {saleActive ? 'Join for Free →' : 'Join Anytime →'}
                  </a>
                  <span className="text-xs text-white/50">Free to join · 50% off upgrades.</span>
                </div>
              </div>

              {/* Right: countdown */}
              {saleActive && timeLeft && (
                <div className="hidden md:flex flex-col items-center justify-center bg-white rounded-xl px-6 py-6 min-w-[160px] text-center shadow-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-navy/40 mb-3">Sale Ends In</p>
                  <div className="text-4xl font-black text-navy tabular-nums tracking-tight leading-none mb-1">
                    {timeLeft.split(':').slice(0,2).join(':')}
                  </div>
                  <div className="text-xl font-black text-red tabular-nums tracking-tight">
                    :{timeLeft.split(':').slice(2).join(':')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-8 px-5 bg-[#e8f0f8]">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-10 h-10 bg-red text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3">1</div>
              <h3 className="font-bold text-navy mb-1">Create a Free Account</h3>
              <p className="text-sm text-gray">Sign up at anytime-soccer.com — it&apos;s completely free to start.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-red text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3">2</div>
              <h3 className="font-bold text-navy mb-1">Explore the App</h3>
              <p className="text-sm text-gray">Browse 5,000+ videos, follow training plans, and track progress.</p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 bg-red text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3">3</div>
              <h3 className="font-bold text-navy mb-1">Upgrade at 50% Off</h3>
              <p className="text-sm text-gray">Use code <span className="font-bold">MDAY2026</span> at checkout before May 26 to lock in 50% off.</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-block bg-navy text-white font-bold text-sm px-7 py-3 rounded-lg no-underline hover:bg-navy-light transition-colors">
              Get Started Free &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-8 px-5 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-2">Memorial Day Sale Pricing</h2>
          <p className="text-gray text-base mb-6">50% off all upgrades — join free and save before May 26.</p>
          <div className="bg-background border-2 border-red/20 rounded-2xl p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Monthly */}
              <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="text-navy font-bold text-base mb-1">Monthly</div>
                <div className="text-gray text-xs mb-4">Cancel anytime</div>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-4xl font-black text-navy">$4.95</span>
                  <span className="text-gray text-sm">/month</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-5">
                  <span className="text-gray/60 line-through text-xs">$9.89/month</span>
                  <span className="bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">50% OFF</span>
                </div>
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-navy text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-navy-light transition-colors">
                  Join for Free
                </a>
              </div>
              {/* Annual */}
              <div className="bg-navy rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-3 right-3 bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Best Value</div>
                <div className="text-white font-bold text-base mb-1">Annual</div>
                <div className="text-white/50 text-xs mb-4">Billed once a year</div>
                <div className="flex items-baseline justify-center gap-2 mb-1">
                  <span className="text-4xl font-black text-white">$29.99</span>
                  <span className="text-white/50 text-sm">/year</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-white/35 line-through text-xs">$59.98/year</span>
                  <span className="bg-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full">50% OFF</span>
                </div>
                <div className="text-white/40 text-[11px] mb-5">Just $2.50/month</div>
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
                  className="inline-block bg-red text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-red-dark transition-colors">
                  Join for Free
                </a>
              </div>
            </div>
            <p className="text-xs text-navy font-bold mt-5">Start free — use code <span className="text-red">MDAY2026</span> at checkout before May 26 to get 50% off.</p>
          </div>
        </div>
      </section>

      {/* A LOOK INSIDE */}
      <TabbedVideoSection title="A Look Inside the Program" subtitle="Real sessions. Real results. Just hit play and follow along." hideCta />

      {/* FINAL CTA */}
      <section className="px-5 pb-12 bg-background text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
            {saleActive ? 'Sale ends May 26 — don\'t miss it.' : 'Give your players the extra edge.'}
          </h2>
          <p className="text-gray text-base mb-4">
            Join thousands of players already training with Anytime Soccer Training.
          </p>
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
            className="bg-red text-white font-bold text-lg py-4 px-10 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block">
            {saleActive ? 'Join for Free — 50% Off →' : 'Join Anytime →'}
          </a>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a> &middot; <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>

      {/* STICKY BAR */}
      {saleActive && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 shadow-[0_-4px_24px_rgba(0,0,0,0.2)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 py-3 px-4">
            <p className="text-white text-sm font-semibold">
              ⚡ Sale ends May 26{timeLeft && <span className="text-red tabular-nums ml-2">{timeLeft}</span>}
            </p>
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer"
              className="bg-red hover:bg-red-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap">
              Join for Free →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
