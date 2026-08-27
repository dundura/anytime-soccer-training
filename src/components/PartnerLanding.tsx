'use client';

import { useState } from 'react';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import PartnerClaimForm from '@/components/PartnerClaimForm';

/**
 * Where a partner's link lands.
 *
 * Deliberately short: a recommendation, one promise, two buttons, the proof
 * strip, and the videos. Somebody arriving here has been sent by a person they
 * trust — they need confirming, not convincing, and every extra section is a
 * chance to leave.
 *
 * The discount lives in a popup rather than on the page. It is being traded for
 * an email, so putting it inline would either give it away or push the two
 * buttons that matter below the fold.
 */

type Partner = { found: boolean; name?: string | null; organization?: string | null; hasDiscount?: boolean; percent?: number };

export default function PartnerLanding({ partner, code }: { partner: Partner; code: string }) {
  const [open, setOpen] = useState(false);

  const who = partner.organization || partner.name || '';
  const percent = partner.percent || 10;
  const ref = code ? `?ref=${code}` : '';
  const demo = `/team-demo-request-anytime-soccer-training${ref}`;
  const pricing = `/pricing${ref}`;

  return (
    <>
      <section className="bg-[#f0f4f8] px-5 py-10 md:py-14">
        <div className="max-w-[820px] mx-auto text-center">
          {who && (
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <span className="text-[#c80b3d]">&#10003;</span>
              <span className="text-sm font-semibold text-navy">Recommended by {who}</span>
            </div>
          )}

          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#c80b3d] mb-2">
            Train anywhere. Improve everywhere.
          </p>
          <h1 className="text-[34px] md:text-[46px] font-extrabold text-navy leading-[1.1] mb-4">
            Give your player <span className="text-[#c80b3d]">the edge.</span>
          </h1>
          <p className="text-[17px] text-gray leading-relaxed max-w-[560px] mx-auto mb-7">
            Short, structured soccer sessions players follow at home &mdash; plus the tools coaches need to assign work and see who actually did it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <a href={demo} className="w-full sm:w-auto bg-[#c80b3d] text-white font-bold text-base px-8 py-3.5 rounded-lg no-underline hover:bg-red-dark transition-colors">
              Request a team demo &rarr;
            </a>
            <a href={pricing} className="w-full sm:w-auto bg-white border-2 border-navy text-navy font-bold text-base px-8 py-3.5 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">
              Start training free
            </a>
          </div>

          {partner.hasDiscount && code && (
            <button onClick={() => setOpen(true)} className="text-sm font-bold text-[#c80b3d] underline underline-offset-4 hover:no-underline">
              Get your {percent}% off code &rarr;
            </button>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-7 text-sm text-gray">
            {['No credit card to start', 'Ages 6–17', '5,000+ videos'].map((p) => (
              <span key={p} className="flex items-center gap-1.5">
                <span className="text-[#c80b3d] font-bold">&#10003;</span> {p}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-6">
        <div className="max-w-[820px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            ['5,000+', 'follow-along videos'],
            ['10–15', 'minutes a day'],
            ['$10', 'per team player, per year'],
            ['Anytime', 'phone, tablet or computer'],
          ].map(([big, small]) => (
            <div key={small}>
              <strong className="block text-white text-2xl font-extrabold">{big}</strong>
              <span className="text-white/60 text-xs">{small}</span>
            </div>
          ))}
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
