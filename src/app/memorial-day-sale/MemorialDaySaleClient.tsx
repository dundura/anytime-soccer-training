'use client';

import { useState, useEffect } from 'react';

const SALE_END = new Date('2026-05-26T23:59:59-05:00');
const SIGNUP_URL = 'https://app.anytime-soccer.com/auth/registerFree';

interface TimeLeft { d: number; h: number; m: number; s: number }

function calcTime(): TimeLeft | null {
  const diff = SALE_END.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function CountdownLarge({ time }: { time: TimeLeft | null }) {
  if (!time) return <p className="text-white/50 text-base font-semibold">Sale has ended</p>;
  const units = [
    ...(time.d > 0 ? [{ v: time.d, l: 'Days' }] : []),
    { v: time.h, l: 'Hrs' },
    { v: time.m, l: 'Min' },
    { v: time.s, l: 'Sec' },
  ];
  return (
    <div className="flex items-end justify-center gap-1.5">
      {units.map(({ v, l }, i) => (
        <div key={l} className="flex items-end gap-1.5">
          {i > 0 && <span className="text-white/30 text-3xl font-light pb-5">:</span>}
          <div className="text-center">
            <div className="bg-white/10 border border-white/10 rounded-xl px-3 py-2.5 text-4xl md:text-5xl font-black tabular-nums text-white min-w-[68px] md:min-w-[80px]">
              {pad(v)}
            </div>
            <div className="text-[10px] text-white/40 uppercase tracking-[0.15em] mt-1.5">{l}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CountdownInline({ time }: { time: TimeLeft | null }) {
  if (!time) return <span>—</span>;
  return (
    <span className="tabular-nums font-bold">
      {time.d > 0 ? `${time.d}d ` : ''}{pad(time.h)}:{pad(time.m)}:{pad(time.s)}
    </span>
  );
}

export default function MemorialDaySaleClient() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(calcTime());
    const t = setInterval(() => setTime(calcTime()), 1000);
    return () => clearInterval(t);
  }, []);

  const saleActive = time !== null;

  return (
    <div className="pb-20">

      {/* ── Hero ── */}
      <section className="bg-navy relative overflow-hidden py-20 md:py-28 px-4 text-center">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(220,55,62,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-red/20 border border-red/25 text-red px-4 py-1.5 rounded-full text-sm font-bold mb-7">
            🇺🇸 Memorial Day Weekend Sale
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white mb-5 leading-[1.05] tracking-tight">
            Memorial Day<br />
            <span className="text-red">Weekend Sale</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Join free and get 50% off your upgrade — monthly or annual. The biggest sale of the year, for one weekend only.
          </p>

          <div className="mb-10">
            <p className="text-xs text-white/40 uppercase tracking-[0.15em] mb-5">
              {saleActive ? 'Sale ends in' : 'Sale has ended'}
            </p>
            <CountdownLarge time={time} />
          </div>

          {saleActive ? (
            <a href={SIGNUP_URL}
              className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_28px_rgba(220,55,62,0.45)]">
              Join for Free →
            </a>
          ) : (
            <a href={SIGNUP_URL}
              className="inline-flex items-center gap-2 bg-red hover:bg-red-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:-translate-y-0.5 shadow-[0_4px_28px_rgba(220,55,62,0.45)]">
              Join Anytime →
            </a>
          )}

          <p className="text-white/35 text-sm mt-4">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="py-16 md:py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-navy mb-2">Choose Your Plan</h2>
            <p className="text-gray text-base">
              {saleActive
                ? 'Sign up free — 50% off automatically applied when you upgrade.'
                : 'Start free and upgrade anytime.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">

            {/* Monthly */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="font-bold text-navy text-lg mb-0.5">Monthly</div>
              <div className="text-gray text-sm mb-5">Flexible — cancel anytime</div>
              {saleActive ? (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-navy">$4.95</span>
                    <span className="text-gray text-base">/month</span>
                  </div>
                  <div className="flex items-center gap-2 mb-7">
                    <span className="text-gray/60 line-through text-sm">$9.89/month</span>
                    <span className="bg-red text-white text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide">50% OFF</span>
                  </div>
                </>
              ) : (
                <div className="flex items-baseline gap-2 mb-7">
                  <span className="text-5xl font-black text-navy">$9.89</span>
                  <span className="text-gray text-base">/month</span>
                </div>
              )}
              <ul className="space-y-2 mb-7 text-sm text-gray">
                {['5,000+ training videos', 'Weekly structured plans', 'All skill areas', 'Cancel anytime'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-red font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={SIGNUP_URL}
                className="block w-full text-center bg-navy hover:bg-navy-light text-white px-6 py-3.5 rounded-full font-bold text-base transition-all hover:-translate-y-0.5">
                Join for Free
              </a>
            </div>

            {/* Annual */}
            <div className="bg-navy rounded-2xl p-8 relative overflow-hidden shadow-lg">
              <div className="absolute top-5 right-5 bg-red text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                Best Value
              </div>
              <div className="font-bold text-white text-lg mb-0.5">Annual</div>
              <div className="text-white/55 text-sm mb-5">Best savings — billed once a year</div>
              {saleActive ? (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-white">$29.99</span>
                    <span className="text-white/55 text-base">/year</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/35 line-through text-sm">$59.98/year</span>
                    <span className="bg-red text-white text-[11px] font-bold px-2 py-0.5 rounded-full tracking-wide">50% OFF</span>
                  </div>
                  <div className="text-white/40 text-xs mb-7">Just $2.50/month — save over $60</div>
                </>
              ) : (
                <>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-white">$59.98</span>
                    <span className="text-white/55 text-base">/year</span>
                  </div>
                  <div className="text-white/40 text-xs mb-7">Just $5.00/month billed annually</div>
                </>
              )}
              <ul className="space-y-2 mb-7 text-sm text-white/70">
                {['5,000+ training videos', 'Weekly structured plans', 'All skill areas', 'Priority support'].map(f => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-red font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a href={SIGNUP_URL}
                className="block w-full text-center bg-red hover:bg-red-dark text-white px-6 py-3.5 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_18px_rgba(220,55,62,0.4)]">
                Join for Free
              </a>
            </div>
          </div>

          <p className="text-center text-gray text-sm mt-6">
            Start free — 50% off applied automatically when you upgrade.
          </p>
        </div>
      </section>


      {/* ── Sticky Urgency Bar ── */}
      {saleActive && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/8 shadow-[0_-4px_24px_rgba(0,0,0,0.25)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4 py-3 px-4">
            <p className="text-white text-sm font-semibold leading-tight">
              <span className="hidden sm:inline">⚡ Sale ends May 26 — </span>
              <span className="text-red"><CountdownInline time={time} /></span>
              <span className="hidden sm:inline text-white/60"> remaining</span>
            </p>
            <a href={SIGNUP_URL}
              className="bg-red hover:bg-red-dark text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-[0_2px_14px_rgba(220,55,62,0.45)] hover:-translate-y-0.5">
              Join for Free
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
