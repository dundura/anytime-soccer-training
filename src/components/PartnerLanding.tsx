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
      {/* Hero: copy on the left, the thing being sold on the right. A wall of
          centred text asks a visitor to imagine it; a photo of a player doing
          the training shows them. */}
      <section className="bg-[#f0f4f8] px-5 py-10 md:py-14">
        <div className="max-w-[1000px] mx-auto grid md:grid-cols-[1.1fr_1fr] gap-8 md:gap-12 items-center">
          <div>
            {who && (
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-5 shadow-sm">
                <span className="text-[#c80b3d] font-bold">&#10003;</span>
                <span className="text-sm font-semibold text-navy">Recommended by {who}</span>
              </div>
            )}

            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#c80b3d] mb-2">
              Train anywhere. Improve everywhere.
            </p>
            <h1 className="text-[34px] md:text-[44px] font-extrabold text-navy leading-[1.1] mb-4">
              Give your player <span className="text-[#c80b3d]">the edge.</span>
            </h1>
            <p className="text-[17px] text-gray leading-relaxed mb-7">
              Short, structured soccer sessions players follow at home &mdash; plus the tools coaches need to assign work and see who actually did it.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <a href={demo} className="text-center bg-[#c80b3d] text-white font-bold text-base px-7 py-3.5 rounded-lg no-underline hover:bg-red-dark transition-colors">
                Request a team demo &rarr;
              </a>
              <a href={pricing} className="text-center bg-white border-2 border-navy text-navy font-bold text-base px-7 py-3.5 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">
                Start training free
              </a>
            </div>

            {partner.hasDiscount && code && (
              <button onClick={() => setOpen(true)} className="text-sm font-bold text-[#c80b3d] underline underline-offset-4 hover:no-underline">
                Get your {percent}% off code &rarr;
              </button>
            )}

            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-7 text-sm text-gray">
              {['No credit card to start', 'Ages 6–17', '5,000+ videos'].map((p) => (
                <span key={p} className="flex items-center gap-1.5">
                  <span className="text-[#c80b3d] font-bold">&#10003;</span> {p}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.18)]">
            <img
              src="https://d2vm0l3c6tu9qp.cloudfront.net/Anytime-soccer-camp.webp"
              alt="A young player following an at-home training session"
              className="w-full h-[260px] md:h-[380px] object-cover object-[center_30%]"
            />
          </div>
        </div>
      </section>

      {/* How it works — three steps, no more. */}
      <section className="bg-white px-5 py-10">
        <div className="max-w-[820px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              ['Create a free account', "It is free to start — no credit card."],
              ['Pick a plan or book a demo', 'Coaches get a walkthrough. Families can start straight away.'],
              ['Train at home', 'Hit play and follow along, ten to fifteen minutes a day.'],
            ].map(([title, body], i) => (
              <div key={title} className="text-center">
                <div className="w-10 h-10 bg-[#c80b3d] text-white rounded-full flex items-center justify-center font-extrabold text-lg mx-auto mb-3">{i + 1}</div>
                <h3 className="font-bold text-navy mb-1">{title}</h3>
                <p className="text-sm text-gray">{body}</p>
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
