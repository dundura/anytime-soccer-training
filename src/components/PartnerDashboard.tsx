'use client';

import { useEffect, useState } from 'react';

/**
 * A partner's own view of what they have earned.
 *
 * Opened by a token in a link rather than a password: a partner checking their
 * balance is not worth a login screen, a reset flow and the support that comes
 * with both. The token shows one partner's numbers and nothing else.
 */

const API = 'https://api.anytime-soccer.com';

type Row = { id: number; productType: string | null; grossCents: number; commissionCents: number; status: string; availableAt: string | null; createdAt: string | null };
type Payout = { id: number; amountCents: number; method: string | null; reference: string | null; paidAt: string | null };
type Data = {
  partner: { name: string | null; code: string; status: string; link: string };
  totals: { pendingCents: number; availableCents: number; paidCents: number; conversions: number; clicks: number };
  rules: { individualFixedCents: number; teamBasisPoints: number; holdDays: number; minimumPayoutCents: number; cookieDays: number };
  commissions: Row[];
  payouts: Payout[];
};

const money = (c: number | null | undefined) =>
  '$' + ((Number(c) || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const day = (v: string | null) => (v ? new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—');

const TINT: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  available: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-gray-200 text-gray-600',
  reversed: 'bg-red-100 text-red-700',
  review: 'bg-blue-100 text-blue-700',
};

export default function PartnerDashboard({ token }: { token: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!token) { setError('This link is missing its code.'); return; }
    fetch(`${API}/partner-program/dashboard/${encodeURIComponent(token)}`)
      .then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'We could not find that dashboard.');
        return d;
      })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'We could not find that dashboard.'));
  }, [token]);

  const copy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(data.partner.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard is blocked in some browsers; the link is on screen anyway.
    }
  };

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-5">
        <div className="text-4xl mb-3">🔗</div>
        <p className="text-gray-600">{error}</p>
        <p className="text-gray-400 text-sm mt-2">Check you used the whole link from your approval email.</p>
      </div>
    );
  }
  if (!data) return <div className="text-center py-20 text-gray-400 text-sm">Loading…</div>;

  const { partner, totals, rules, commissions, payouts } = data;

  return (
    <div className="max-w-[880px] mx-auto px-5 py-10">
      <div className="mb-6">
        <h1 className="text-[#0f2642] text-3xl tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          {partner.name ? partner.name.toUpperCase() : 'YOUR'} PARTNER DASHBOARD
        </h1>
        <p className="text-gray-500 text-sm">
          {partner.status === 'active'
            ? 'Your link is live. Anyone who joins through it in the next ' + rules.cookieDays + ' days is credited to you.'
            : 'Your account is ' + partner.status + '.'}
        </p>
      </div>

      <div className="bg-[#0f2642] rounded-2xl p-6 mb-6">
        <div className="text-white/60 text-[11px] font-bold uppercase tracking-wide mb-2">Your link</div>
        <div className="flex flex-wrap items-center gap-3">
          <code className="text-white text-lg font-bold break-all">{partner.link}</code>
          <button onClick={copy} className="px-3 py-1.5 rounded-lg bg-[#c80b3d] text-white text-xs font-bold shrink-0">
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          ['Available now', money(totals.availableCents), 'text-emerald-600'],
          ['Still clearing', money(totals.pendingCents), 'text-amber-600'],
          ['Paid to you', money(totals.paidCents), 'text-[#0f2642]'],
          ['Clicks', String(totals.clicks), 'text-[#0f2642]'],
        ].map(([label, value, tone]) => (
          <div key={label} className="border border-gray-200 rounded-xl px-4 py-3 bg-white">
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</div>
            <div className={`text-2xl font-black ${tone}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-gray-50 border border-gray-200 px-4 py-3 mb-6 text-sm text-gray-600">
        You earn <strong>{money(rules.individualFixedCents)}</strong> per individual membership and{' '}
        <strong>{Number(rules.teamBasisPoints) / 100}%</strong> of a team&rsquo;s first payment. Commissions clear{' '}
        <strong>{rules.holdDays} days</strong> after the sale, and are paid by PayPal once you are over{' '}
        <strong>{money(rules.minimumPayoutCents)}</strong>.
      </div>

      <h2 className="text-[#0f2642] font-black text-sm uppercase tracking-wide mb-2">Your commissions</h2>
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white mb-8">
        {commissions.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-gray-400">
            Nothing yet. Share your link and it will show up here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  <th className="text-left px-4 py-2">Date</th>
                  <th className="text-left px-4 py-2">What</th>
                  <th className="text-right px-4 py-2">You earn</th>
                  <th className="text-left px-4 py-2">Status</th>
                  <th className="text-left px-4 py-2">Clears</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {commissions.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2.5 text-gray-500">{day(c.createdAt)}</td>
                    <td className="px-4 py-2.5">{c.productType === 'team' ? 'Team' : c.productType === 'individual' ? 'Membership' : '—'}</td>
                    <td className="px-4 py-2.5 text-right font-bold text-[#0f2642]">{money(c.commissionCents)}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TINT[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-2.5 text-gray-500">{day(c.availableAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {payouts.length > 0 && (
        <>
          <h2 className="text-[#0f2642] font-black text-sm uppercase tracking-wide mb-2">Payments to you</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
            {payouts.map((p) => (
              <div key={p.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-bold text-[#0f2642]">{money(p.amountCents)}</div>
                  <div className="text-[11px] text-gray-500">{p.method || 'PayPal'}{p.reference ? ' · ' + p.reference : ''}</div>
                </div>
                <div className="text-xs text-gray-500">{day(p.paidAt)}</div>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="text-center text-gray-400 text-xs mt-8">
        Questions? Email <a href="mailto:neil@anytime-soccer.com" className="text-[#c80b3d] font-bold">neil@anytime-soccer.com</a> or call 803-431-1082.
      </p>
    </div>
  );
}
