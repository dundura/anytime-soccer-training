'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * A partner's own view of what they have earned.
 *
 * Built on the layout from the partner-program mockup — share banner, metric
 * cards, the two ways to earn, a referrals table and the next payout — but
 * saying only true things. The mockup promises an automatic bank transfer on
 * the 1st and 30-day tracking; here it is PayPal, sent by hand, and the link
 * does not expire. A dashboard that overstates the deal is worse than no
 * dashboard, because a partner finds out at the moment they were expecting money.
 *
 * Opened by a token in a link rather than a password: a partner checking their
 * balance is not worth a login screen, a reset flow and the support both bring.
 */

const API = 'https://api.anytime-soccer.com';

type Row = { id: number; productType: string | null; grossCents: number; commissionCents: number; status: string; availableAt: string | null; createdAt: string | null };
type Payout = { id: number; amountCents: number; method: string | null; reference: string | null; paidAt: string | null };
type Claim = { id: number; name: string | null; email: string | null; organization: string | null; audience: string | null; claimedAt: string | null };
type Data = {
  partner: { name: string | null; code: string; status: string; link: string };
  totals: { pendingCents: number; availableCents: number; paidCents: number; conversions: number; clicks: number; claims: number };
  rules: { individualBasisPoints: number; teamBasisPoints: number; holdDays: number; minimumPayoutCents: number; cookieDays: number };
  commissions: Row[];
  payouts: Payout[];
  claims: Claim[];
};

const money = (c: number | null | undefined) =>
  '$' + ((Number(c) || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const day = (v: string | null) => (v ? new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—');

const TINT: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  available: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-gray-200 text-gray-600',
  reversed: 'bg-red-100 text-red-700',
  review: 'bg-blue-100 text-blue-700',
};

const LABEL: Record<string, string> = { pending: 'Clearing', available: 'Ready', paid: 'Paid', reversed: 'Reversed', review: 'In review' };

export default function PartnerDashboard({ token }: { token: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<'all' | 'team' | 'individual'>('all');
  const [editing, setEditing] = useState(false);
  const [draftCode, setDraftCode] = useState('');
  const [saving, setSaving] = useState(false);
  const [codeError, setCodeError] = useState('');

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

  // Six months of earnings, built from the rows we already have rather than a
  // second endpoint. Reversed commissions are excluded: a bar should show what
  // was earned, not what was booked and taken back.
  const months = useMemo(() => {
    if (!data) return [];
    const out: { label: string; cents: number }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({ label: d.toLocaleDateString('en-US', { month: 'short' }), cents: 0 });
    }
    data.commissions.forEach((c) => {
      if (c.status === 'reversed' || !c.createdAt) return;
      const d = new Date(c.createdAt);
      const idx = 5 - ((now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth()));
      if (idx >= 0 && idx < 6) out[idx].cents += Number(c.commissionCents) || 0;
    });
    return out;
  }, [data]);

  // Renaming is a real decision, not a preference: the old link stops crediting
  // them the moment this saves, so anywhere they have already posted it goes
  // dead. The warning sits next to the button rather than in a confirm dialog,
  // where it would be clicked through.
  const saveCode = async () => {
    if (saving || !data) return;
    const wanted = draftCode.trim().toUpperCase();
    if (!/^[A-Z0-9]{4,24}$/.test(wanted)) {
      setCodeError('Use 4 to 24 letters and numbers, nothing else.');
      return;
    }
    setSaving(true);
    setCodeError('');
    try {
      const res = await fetch(`${API}/partner-program/dashboard/${encodeURIComponent(token)}/code`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: wanted }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not change that link.');
      setData({ ...data, partner: { ...data.partner, code: d.code, link: d.link } });
      setEditing(false);
    } catch (e) {
      setCodeError(e instanceof Error ? e.message : 'Could not change that link.');
    } finally {
      setSaving(false);
    }
  };

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

  const { partner, totals, rules, commissions, payouts, claims = [] } = data;
  const available = Number(totals.availableCents) || 0;
  const minimum = Number(rules.minimumPayoutCents) || 0;
  const pctToMin = minimum > 0 ? Math.min(100, Math.round((available / minimum) * 100)) : 100;
  const teamEarnings = commissions.filter((c) => c.productType === 'team' && c.status !== 'reversed').reduce((a, c) => a + Number(c.commissionCents), 0);
  const indEarnings = commissions.filter((c) => c.productType === 'individual' && c.status !== 'reversed').reduce((a, c) => a + Number(c.commissionCents), 0);
  const peak = Math.max(1, ...months.map((m) => m.cents));
  const shown = commissions.filter((c) => tab === 'all' || c.productType === tab);

  return (
    <div className="bg-[#f0f4f8] min-h-screen">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-5 py-8">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-400">Partner portal</p>
            <h1 className="text-[#1a2a3a] text-[28px] font-extrabold leading-tight">
              Welcome back{partner.name ? `, ${partner.name.split(' ')[0]}` : ''}
            </h1>
          </div>
          <span className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full ${partner.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
            <span className={`w-2 h-2 rounded-full ${partner.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
            {partner.status === 'active' ? 'Link active' : partner.status}
          </span>
        </div>

        {/* Share banner */}
        <section className="bg-[#1a2a3a] rounded-2xl p-6 sm:p-7 mb-5 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
          <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] mb-1.5">Your unique referral link</p>
          <h2 className="text-white text-xl sm:text-2xl font-extrabold mb-1">Share soccer training. Earn every time.</h2>
          <p className="text-white/60 text-sm mb-4">
            Teams and families who buy through your link are credited to you{rules.cookieDays >= 3650 ? ' — and it never expires' : ''}.
          </p>
          {editing ? (
            <div className="bg-white/[0.08] border border-white/[0.12] rounded-xl px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/50 text-sm">anytime-soccer.com/r/</span>
                <input
                  autoFocus
                  value={draftCode}
                  onChange={(e) => setDraftCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => { if (e.key === 'Enter') saveCode(); if (e.key === 'Escape') setEditing(false); }}
                  maxLength={24}
                  className="flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm font-bold outline-none focus:border-[#7ec8e3]"
                  aria-label="Your referral code"
                />
                <button onClick={saveCode} disabled={saving} className="bg-[#7ec8e3] text-[#1a2a3a] text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-lg disabled:opacity-50">
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button onClick={() => { setEditing(false); setCodeError(''); }} className="text-white/50 text-xs font-bold px-2">
                  Cancel
                </button>
              </div>
              {codeError && <p className="text-[#ff9a9a] text-xs mt-2">{codeError}</p>}
              <p className="text-white/50 text-xs mt-2">
                Anywhere you have already shared the old link stops counting the moment you save.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3 bg-white/[0.08] border border-white/[0.12] rounded-xl px-4 py-3">
              <code className="text-white text-sm sm:text-base font-bold break-all flex-1 min-w-0">{partner.link}</code>
              <button onClick={copy} className="bg-[#7ec8e3] text-[#1a2a3a] text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-lg shrink-0 hover:brightness-110 transition-all">
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button
                onClick={() => { setDraftCode(partner.code); setEditing(true); }}
                className="text-white/60 text-xs font-bold underline underline-offset-4 hover:text-white shrink-0"
              >
                Change it
              </button>
            </div>
          )}
        </section>

        {/* Metrics */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {[
            { label: 'Available now', value: money(available), note: available >= minimum ? 'Ready to be paid' : `${money(minimum - available)} to the ${money(minimum)} minimum`, tone: 'text-emerald-600' },
            { label: 'Still clearing', value: money(totals.pendingCents), note: `Clears ${rules.holdDays} days after the sale`, tone: 'text-amber-600' },
            { label: 'Paid to you', value: money(totals.paidCents), note: payouts.length ? `Last on ${day(payouts[0].paidAt)}` : 'Nothing paid yet', tone: 'text-[#1a2a3a]' },
            { label: 'People reached', value: String(totals.claims || totals.clicks), note: `${totals.clicks} clicks, ${totals.conversions} became customers`, tone: 'text-[#1a2a3a]' },
          ].map((m) => (
            <article key={m.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-4">
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">{m.label}</div>
              <strong className={`block text-2xl font-black ${m.tone}`}>{m.value}</strong>
              <small className="text-[11px] text-gray-400 leading-tight block mt-1">{m.note}</small>
            </article>
          ))}
        </section>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-4 mb-5">
          {/* Earnings */}
          <article className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400">Earnings</p>
            <h3 className="text-[#1a2a3a] font-extrabold text-lg mb-4">Your last six months</h3>
            <div className="flex items-end gap-2 h-[140px] mb-3">
              {months.map((m, i) => (
                <div key={m.label + i} className="flex-1 flex flex-col items-center justify-end gap-1.5">
                  <span className="text-[10px] font-bold text-gray-400">{m.cents ? money(m.cents).replace('.00', '') : ''}</span>
                  <span
                    className={`w-full rounded-t-md ${i === months.length - 1 ? 'bg-[#1a2a3a]' : 'bg-[#7ec8e3]'}`}
                    style={{ height: `${Math.max(4, Math.round((m.cents / peak) * 100))}px` }}
                  />
                  <small className="text-[10px] text-gray-400">{m.label}</small>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
              {[['Team', teamEarnings], ['Individual', indEarnings], ['Total earned', teamEarnings + indEarnings]].map(([label, cents]) => (
                <div key={String(label)}>
                  <span className="block text-[10px] uppercase tracking-wide text-gray-400 font-bold">{label}</span>
                  <strong className="text-[#1a2a3a] text-sm">{money(Number(cents))}</strong>
                </div>
              ))}
            </div>
          </article>

          {/* Two ways to earn */}
          <article className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400">Your rewards</p>
            <h3 className="text-[#1a2a3a] font-extrabold text-lg mb-4">Two ways to earn</h3>

            <div className="rounded-xl border-2 border-[#7ec8e3] bg-[#e8f4f8] p-4 mb-3 relative">
              <span className="absolute top-3 right-3 text-[9px] font-extrabold uppercase tracking-wide bg-[#1a2a3a] text-white px-2 py-0.5 rounded">Best value</span>
              <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">Team licences</span>
              <strong className="block text-xl font-extrabold text-[#1a2a3a]">{Number(rules.teamBasisPoints) / 100}% commission</strong>
              <small className="text-xs text-gray-500">On the first team payment</small>
            </div>

            <div className="rounded-xl border border-gray-200 p-4 mb-3">
              <span className="block text-[10px] font-bold uppercase tracking-wide text-gray-500">Individual plans</span>
              <strong className="block text-xl font-extrabold text-[#1a2a3a]">{Number(rules.individualBasisPoints) / 100}% commission</strong>
              <small className="text-xs text-gray-500">Of every membership, monthly or annual</small>
            </div>

            <div className="flex gap-2.5 rounded-xl bg-gray-50 border border-gray-200 p-3">
              <span className="text-base leading-none">🛡️</span>
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong className="text-[#1a2a3a]">
                  {rules.cookieDays >= 3650 ? 'Tracking never expires' : `${rules.cookieDays}-day tracking`}
                </strong>
                <br />
                {rules.cookieDays >= 3650
                  ? 'Someone who clicks today and buys next season still counts as yours.'
                  : `If someone clicks today and buys within ${rules.cookieDays} days, you get the credit.`}
              </p>
            </div>
          </article>
        </div>

        {/* Referrals */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div>
              <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400">Recent activity</p>
              <h3 className="text-[#1a2a3a] font-extrabold text-lg">Your referrals</h3>
            </div>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {(['all', 'team', 'individual'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3 py-1.5 text-xs font-bold capitalize ${tab === t ? 'bg-[#1a2a3a] text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}
                >
                  {t === 'all' ? 'All' : t === 'team' ? 'Teams' : 'Individuals'}
                </button>
              ))}
            </div>
          </div>

          {shown.length === 0 ? (
            <div className="py-10 text-center text-sm text-gray-400">
              {commissions.length === 0 ? 'Nothing yet. Share your link and it will show up here.' : 'Nothing in this tab.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] font-bold uppercase tracking-wide text-gray-400 border-b border-gray-100">
                    <th className="text-left py-2">What</th>
                    <th className="text-left py-2">Date</th>
                    <th className="text-right py-2">Sale</th>
                    <th className="text-right py-2">You earned</th>
                    <th className="text-left py-2 pl-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {shown.map((c) => (
                    <tr key={c.id}>
                      <td className="py-2.5 font-semibold text-[#1a2a3a]">
                        {c.productType === 'team' ? 'Team licence' : c.productType === 'individual' ? 'Individual membership' : 'Being reviewed'}
                      </td>
                      <td className="py-2.5 text-gray-500">{day(c.createdAt)}</td>
                      <td className="py-2.5 text-right text-gray-500">{money(c.grossCents)}</td>
                      <td className="py-2.5 text-right font-extrabold text-[#1a2a3a]">{money(c.commissionCents)}</td>
                      <td className="py-2.5 pl-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${TINT[c.status] || 'bg-gray-100 text-gray-600'}`}>
                          {LABEL[c.status] || c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Who took the offer. The step between a click and a sale, and the only
          part of the funnel a partner can act on: these are people they know. */}
      {claims.length > 0 && (
        <section className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400">Your referrals</p>
          <h3 className="text-[#1a2a3a] font-extrabold text-lg mb-3">Who claimed your offer</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] font-bold uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="text-left py-2">Name</th>
                  <th className="text-left py-2">Club or team</th>
                  <th className="text-left py-2">Looking for</th>
                  <th className="text-left py-2">Claimed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {claims.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5">
                      <span className="font-semibold text-[#1a2a3a] block">{c.name || '—'}</span>
                      <span className="text-[11px] text-gray-500">{c.email}</span>
                    </td>
                    <td className="py-2.5 text-gray-500">{c.organization || '—'}</td>
                    <td className="py-2.5 text-gray-500">
                      {c.audience === 'team' ? 'A team' : c.audience === 'player' ? 'One player' : '—'}
                    </td>
                    <td className="py-2.5 text-gray-500">{day(c.claimedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-gray-400 mt-3">
            Claiming the code is not a purchase. These appear above as commissions once they buy.
          </p>
        </section>
      )}

      {/* Next payout */}
        <section className="bg-white border border-gray-200 rounded-2xl p-5 mb-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-[200px]">
              <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400">Next payout</p>
              <h3 className="text-[#1a2a3a] font-extrabold text-lg">
                {available >= minimum && available > 0 ? 'Ready to be paid' : 'Building up'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {available >= minimum && available > 0
                  ? <><strong>{money(available)}</strong> goes out by PayPal on the next monthly run.</>
                  : <>Payouts go out monthly by PayPal once you are over <strong>{money(minimum)}</strong>. Anything below that rolls into the next month rather than being lost.</>}
              </p>
            </div>
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-gray-500 font-semibold">Towards the minimum</span>
                <strong className="text-[#1a2a3a]">{money(available)} / {money(minimum)}</strong>
              </div>
              <div className="h-2.5 rounded-full bg-gray-100 overflow-hidden">
                <div className={`h-full rounded-full ${pctToMin >= 100 ? 'bg-emerald-500' : 'bg-[#7ec8e3]'}`} style={{ width: `${pctToMin}%` }} />
              </div>
            </div>
          </div>

          {payouts.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-bold tracking-wide uppercase text-gray-400 mb-2">Paid to you so far</p>
              {payouts.map((p) => (
                <div key={p.id} className="flex items-center justify-between py-1.5">
                  <div>
                    <strong className="text-[#1a2a3a] text-sm">{money(p.amountCents)}</strong>
                    <span className="text-[11px] text-gray-500 ml-2">{p.method || 'PayPal'}{p.reference ? ' · ' + p.reference : ''}</span>
                  </div>
                  <span className="text-xs text-gray-500">{day(p.paidAt)}</span>
                </div>
              ))}
            </div>
          )}
        </section>

        <p className="text-center text-gray-400 text-xs pb-6">
          Keep this page to yourself — the link is the only thing protecting your numbers.<br />
          Questions? <a href="mailto:megan@anytime-soccer.com" className="text-red font-bold">megan@anytime-soccer.com</a> · 803-431-1082
        </p>
      </div>
    </div>
  );
}
