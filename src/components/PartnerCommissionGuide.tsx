'use client';

import { useState } from 'react';

/**
 * What a partner actually earns, in dollars.
 *
 * "33.34% of an individual membership" is a number nobody can act on. A coach
 * deciding whether to promote this wants to know what one sign-up is worth, so
 * the guide shows the real prices and the real payout beside them.
 *
 * The prices are the ones on the pricing page; the percentages come from the
 * live rules so the guide cannot drift from what the ledger pays.
 */

type Rates = { individualBasisPoints?: number; teamBasisPoints?: number; holdDays?: number; minimumPayoutCents?: number };

const money = (cents: number) =>
  '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// Straight off the pricing page. If these move, so does the guide.
const INDIVIDUAL = [
  ['Annual — first player', 5998],
  ['Annual — each extra player', 1998],
  ['Monthly — first player', 998],
  ['Monthly — each extra player', 399],
] as const;

const TEAM_EXAMPLES = [
  ['A 20-player team', 20 * 1000],
  ['A 40-player team', 40 * 1000],
  ['A 75-player club', 75 * 1000],
] as const;

export default function PartnerCommissionGuide({ rates }: { rates: Rates }) {
  const [open, setOpen] = useState(false);

  const indBps = Number(rates.individualBasisPoints) || 3334;
  const teamBps = Number(rates.teamBasisPoints) || 2000;
  const hold = Number(rates.holdDays) || 30;
  const minPayout = Number(rates.minimumPayoutCents) || 5000;

  const cut = (cents: number, bps: number) => Math.round((cents * bps) / 10000);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-sm font-bold text-[#c80b3d] underline underline-offset-4 hover:no-underline"
      >
        See the commission guide &rarr;
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-[#0f2642] px-6 py-4 flex items-center justify-between">
              <h3 className="text-white font-extrabold text-lg">Commission guide</h3>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-white/60 text-2xl leading-none hover:text-white">
                &times;
              </button>
            </div>

            <div className="px-6 py-5">
              <p className="text-[10px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">
                Individual memberships &mdash; {indBps / 100}% of what they pay
              </p>
              <table className="w-full text-sm mb-6">
                <tbody className="divide-y divide-gray-100">
                  {INDIVIDUAL.map(([label, price]) => (
                    <tr key={label}>
                      <td className="py-2 text-gray w-1/2">{label}</td>
                      <td className="py-2 pl-4 text-left text-gray-400 w-24">{money(price)}</td>
                      <td className="py-2 pl-4 text-left font-extrabold text-navy w-24">{money(cut(price, indBps))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className="text-[10px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">
                Teams &mdash; {teamBps / 100}% of their first payment
              </p>
              <table className="w-full text-sm mb-2">
                <tbody className="divide-y divide-gray-100">
                  {TEAM_EXAMPLES.map(([label, price]) => (
                    <tr key={label}>
                      <td className="py-2 text-gray w-1/2">{label}</td>
                      <td className="py-2 pl-4 text-left text-gray-400 w-24">{money(price)}</td>
                      <td className="py-2 pl-4 text-left font-extrabold text-navy w-24">{money(cut(price, teamBps))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-400 mb-6">
                Teams pay $10 per player per year, so a bigger squad is a bigger commission. Clubs of five or more teams get 20% off, and the commission follows the amount actually paid.
              </p>

              <div className="rounded-xl bg-[#f0f4f8] border border-gray-200 p-4 text-sm text-gray space-y-1.5">
                <p><strong className="text-navy">When it clears.</strong> {hold} days after the sale, so refunds settle first.</p>
                <p><strong className="text-navy">When you are paid.</strong> Monthly by PayPal, once you are over {money(minPayout)}. Below that it rolls into the next month.</p>
                <p><strong className="text-navy">How long you get credit.</strong> Your link does not expire. Someone who clicks today and buys next season still counts as yours.</p>
                <p><strong className="text-navy">Refunds.</strong> If a customer refunds, the commission is reversed in proportion.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
