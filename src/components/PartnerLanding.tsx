'use client';

import { useEffect, useState } from 'react';
import TabbedVideoSection from '@/components/TabbedVideoSection';
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
      {/* Hero: the photo is the background, the copy sits on it. Side by side,
          the image read as decoration next to the text; behind it, the training
          is the first thing seen and the words explain it. */}
      <section className="relative isolate overflow-hidden">
        <img
          src="https://d2vm0l3c6tu9qp.cloudfront.net/Anytime-soccer-camp.webp"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-10 w-full h-full object-cover object-[center_30%]"
        />
        {/* Solid on the left, clearing to the right, so the copy always has the
            contrast it needs without hiding the photo behind it. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f2642] via-[#0f2642]/90 to-[#0f2642]/50" />

        <div className="max-w-[1000px] mx-auto px-5 py-14 md:py-20">
          <div className="max-w-[560px]">
            {who && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-5">
                <span className="text-[#7ec8e3] font-bold">&#10003;</span>
                <span className="text-sm font-semibold text-white">Recommended by {who}</span>
              </div>
            )}

            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] mb-2">
              Exclusive Partnership Offer
            </p>
            <h1 className="text-[34px] md:text-[46px] font-extrabold text-white uppercase tracking-wide leading-[1.1] mb-4">
              Train Smarter.<br /><span className="text-[#7ec8e3]">Anytime.</span>
            </h1>
            <p className="text-[17px] text-white/85 leading-relaxed mb-7">
              {who ? `${who} just partnered with Anytime Soccer Training.` : 'One of our partners sent you here.'} Easy follow-along video sessions your player can do right at home &mdash; just a ball and the drive to improve.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a href={demo} className="text-center bg-[#c80b3d] text-white font-bold text-base px-7 py-3.5 rounded-lg no-underline hover:bg-red-dark transition-colors">
                Request a team demo &rarr;
              </a>
              <a href={pricing} className="text-center bg-white/10 backdrop-blur-sm border-2 border-white/60 text-white font-bold text-base px-7 py-3.5 rounded-lg no-underline hover:bg-white hover:text-navy transition-colors">
                Start training free
              </a>
            </div>

            {partner.hasDiscount && code && (
              <button onClick={() => setOpen(true)} className="text-sm font-bold text-[#7ec8e3] underline underline-offset-4 hover:no-underline">
                Get your {percent}% off code &rarr;
              </button>
            )}

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
