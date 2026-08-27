'use client';

import { useEffect, useState } from 'react';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import HeroVideo from '@/components/HeroVideo';
import PartnerClaimForm from '@/components/PartnerClaimForm';

/**
 * Where a partner's link lands.
 *
 * Deliberately short: a recommendation, one promise, two buttons, three steps
 * and the videos. Somebody arriving here has been sent by a person they trust —
 * they need confirming, not convincing, and every extra section is a chance to
 * leave.
 *
 * The discount lives in a popup rather than on the page. It is being traded for
 * an email, so putting it inline would either give it away or push the two
 * buttons that matter below the fold.
 */

type Partner = { found: boolean; name?: string | null; organization?: string | null; hasDiscount?: boolean; percent?: number };

export default function PartnerLanding({ partner, code }: { partner: Partner; code: string }) {
  const [open, setOpen] = useState(false);

  // The offer opens itself. The visitor was sent here for a discount, so making
  // them hunt for it wastes the referral - and the email is what makes the
  // attribution survive a different device months later.
  //
  // Once per visitor, per partner: a popup that reappears on every visit stops
  // being an offer and starts being an obstacle. Remembered in localStorage,
  // which can throw in private mode, so the whole thing is guarded.
  useEffect(() => {
    if (!partner.hasDiscount || !code) return undefined;
    const key = 'ast_offer_seen_' + code;
    try {
      if (window.localStorage.getItem(key)) return undefined;
    } catch {
      // Storage blocked. Show it - once now is better than never.
    }
    // A beat, so it lands after the page rather than on top of it.
    const t = setTimeout(() => {
      setOpen(true);
      try { window.localStorage.setItem(key, '1'); } catch { /* nothing to do */ }
    }, 900);
    return () => clearTimeout(t);
  }, [partner.hasDiscount, code]);

  const who = partner.organization || partner.name || '';
  const percent = partner.percent || 10;
  const ref = code ? `?ref=${code}` : '';
  const demo = `/team-demo-request-anytime-soccer-training${ref}`;
  const pricing = `/pricing${ref}`;

  return (
    <>
      {/* Hero: the same navy card the homepage uses — rounded panel on the light
          background, copy left, the product playing on the right. A referred
          visitor should land somewhere that looks like the company they were
          just told about, not a one-off page. */}
      <section className="pt-6 pb-12 md:pt-8 md:pb-10 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-14 md:px-12 md:py-16 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
              <div className="relative z-10">
                {who && (
                  <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-5">
                    <span className="text-[#7ec8e3] font-bold">&#10003;</span>
                    <span className="text-sm font-semibold text-white">Recommended by {who}</span>
                  </div>
                )}

                <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] mb-2">
                  Exclusive Partnership Offer
                </p>
                <h1 className="text-[38px] md:text-[52px] font-extrabold text-white uppercase tracking-wide leading-[1.05] mb-5">
                  Train Smarter.<br /><span className="text-[#7ec8e3]">Anytime.</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  {who ? `${who} just partnered with Anytime Soccer Training.` : 'One of our partners sent you here.'} Easy follow-along video sessions your player can do right at home &mdash; just a ball and the drive to improve.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href={pricing} className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center no-underline">
                    Start Training Free &rarr;
                  </a>
                  <a href={demo} className="bg-transparent text-white border-2 border-white/60 px-8 py-4 rounded-full font-bold text-base transition-all hover:bg-white hover:text-navy inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center no-underline">
                    Request Team Demo
                  </a>
                </div>

                {partner.hasDiscount && code && (
                  <button onClick={() => setOpen(true)} className="mt-5 text-sm font-bold text-[#7ec8e3] underline underline-offset-4 hover:no-underline">
                    Get your {percent}% off code &rarr;
                  </button>
                )}
              </div>

              <div className="relative">
                <HeroVideo />
                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap mt-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((i) => (
                        <span key={i} className="inline-flex items-center justify-center w-6 h-6 bg-[#00b67a] text-white text-xs rounded-[3px]">&#9733;</span>
                      ))}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#00b67a] from-50% to-[#dcdce6] to-50% text-white text-xs rounded-[3px]">&#9733;</span>
                    </div>
                    <span className="text-sm font-semibold text-white">4.9 (9,651)</span>
                  </div>
                  <div className="w-px h-8 bg-white/20 hidden sm:block" />
                  <div className="text-sm text-white/60">
                    <strong className="text-white block">Trusted by 50,000+ players</strong>
                    in 80+ countries worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works — three steps in a card of their own. On a flat white
          band the numbers floated; in a bordered panel on a tinted background
          they read as one thing to follow. */}
      <section className="bg-[#f0f4f8] px-5 py-12 md:py-16">
        <div className="max-w-[880px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-[0_6px_28px_rgba(15,38,66,0.08)] px-6 py-10 md:px-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-6">
            {[
              ['Create a free account', 'It is free to start — no credit card.'],
              ['Pick a plan or book a demo', 'Coaches get a walkthrough. Families can start straight away.'],
              ['Train at home', 'Hit play and follow along, ten to fifteen minutes a day.'],
            ].map(([title, body], i) => (
              <div key={title} className="text-center">
                <div className="w-11 h-11 bg-[#c80b3d] text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3 shadow-[0_4px_14px_rgba(200,11,61,0.3)]">
                  {i + 1}
                </div>
                <h3 className="font-bold text-navy mb-1.5">{title}</h3>
                <p className="text-sm text-gray leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TabbedVideoSection
        title="A Look Inside the Program"
        subtitle="See what your player will be doing. Real sessions. Real results."
        hideCta
      />

      {/* The discount, behind a click. */}
      {open && partner.hasDiscount && code && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-2xl w-full max-w-md p-6 sm:p-7 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-4 text-gray-400 text-2xl leading-none hover:text-navy"
            >
              &times;
            </button>
            <PartnerClaimForm code={code} percent={percent} who={who} />
          </div>
        </div>
      )}
    </>
  );
}
