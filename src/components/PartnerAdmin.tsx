'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Partner admin — approve partners, watch the ledger, record a PayPal payout.
 *
 * Money is shown, never edited here. What a partner is owed comes from the
 * commission rows, and the only write that touches a balance is "Mark paid",
 * which closes off everything currently available in one go. A screen that let
 * you type a balance is a screen that stops reconciling.
 */

const API = 'https://api.anytime-soccer.com';

type Partner = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  audience: string | null;
  code: string;
  dashboardToken: string | null;
  status: string;
  payoutMethod: string | null;
  payoutDetail: string | null;
  notes: string | null;
  approvedAt: string | null;
  createdAt: string | null;
  discountCode: string | null;
  clicks: number;
  pendingCents: number;
  availableCents: number;
  paidCents: number;
};

type Settings = {
  id: number;
  individualFixedCents: number;
  teamBasisPoints: number;
  cookieDays: number;
  holdDays: number;
  minimumPayoutCents: number;
  individualPriceIds: string | null;
  teamPriceIds: string | null;
};

type Commission = {
  id: number;
  partnerName: string | null;
  partnerCode: string;
  productType: string | null;
  grossCents: number;
  commissionCents: number;
  status: string;
  availableAt: string | null;
  note: string | null;
  createdAt: string | null;
};

const money = (cents: number | null | undefined) =>
  '$' + ((Number(cents) || 0) / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const day = (v: string | null) => (v ? new Date(v).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—');

const STATUS_TINT: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-700',
  available: 'bg-emerald-100 text-emerald-700',
  paid: 'bg-gray-200 text-gray-600',
  reversed: 'bg-red-100 text-red-700',
  review: 'bg-blue-100 text-blue-700',
};

export default function PartnerAdmin({ token }: { token: string | null }) {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [needsReview, setNeedsReview] = useState(0);
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [showLedger, setShowLedger] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState('');
  const [payFor, setPayFor] = useState<Partner | null>(null);
  const [payRef, setPayRef] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);

  const headers = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token]
  );
  const jsonHeaders = useCallback(() => ({ 'Content-Type': 'application/json', ...headers() }), [headers]);
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(''), 5000); };

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/partner-program/admin/partners`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load the partners.');
      setPartners(d.partners || []);
      setSettings(d.settings || null);
      setNeedsReview(Number(d.needsReview) || 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the partners.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => { load(); }, [load]);

  const loadLedger = useCallback(async () => {
    try {
      const res = await fetch(`${API}/partner-program/admin/commissions`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (res.ok) setCommissions(d.commissions || []);
    } catch { /* the ledger is a panel, not the page */ }
  }, [headers]);

  useEffect(() => { if (showLedger) loadLedger(); }, [showLedger, loadLedger]);

  const act = async (key: string, url: string, init: RequestInit, ok: string) => {
    if (busy) return null;
    setBusy(key);
    try {
      const res = await fetch(url, init);
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'That did not work.');
      flash(ok);
      await load();
      if (showLedger) await loadLedger();
      return d;
    } catch (e) {
      flash(e instanceof Error ? e.message : 'That did not work.');
      return null;
    } finally {
      setBusy('');
    }
  };

  const approve = (p: Partner) =>
    act('approve' + p.id, `${API}/partner-program/admin/partners/${p.id}/approve`, { method: 'POST', headers: headers() },
      'Approved — their link is on its way to them');

  const saveField = (p: Partner, field: string, value: string) =>
    act('field' + p.id, `${API}/partner-program/admin/partners/${p.id}`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ [field]: value }) }, 'Saved');

  const pay = async () => {
    if (!payFor) return;
    const d = await act('pay', `${API}/partner-program/admin/partners/${payFor.id}/pay`,
      { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ method: 'PayPal', reference: payRef }) },
      'Recorded');
    if (d) { setPayFor(null); setPayRef(''); }
  };

  const saveSetting = (field: keyof Settings, value: string) =>
    act('set', `${API}/partner-program/admin/settings`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ [field]: value }) }, 'Rule saved');

  // Stored in cents and basis points, because that is the only way to keep
  // money exact. Shown and typed in dollars and percent, because nobody thinks
  // in basis points.
  const RULE_FIELDS: { f: keyof Settings; label: string; hint: string; scale: number; prefix?: string; suffix?: string }[] = [
    { f: 'individualFixedCents', label: 'Individual', hint: 'Flat, per individual membership', scale: 100, prefix: '$' },
    { f: 'teamBasisPoints', label: 'Team', hint: "Of a team's first payment", scale: 100, suffix: '%' },
    { f: 'minimumPayoutCents', label: 'Minimum payout', hint: 'Below this it rolls to next month', scale: 100, prefix: '$' },
    { f: 'cookieDays', label: 'Cookie', hint: 'How long a click keeps counting', scale: 1, suffix: 'days' },
    { f: 'holdDays', label: 'Hold', hint: 'Before a commission can be paid', scale: 1, suffix: 'days' },
  ];

  // Trailing zeros off: "15" reads as a rule, "15.00" reads as a total.
  const show = (raw: number, scale: number) => String(Number(((Number(raw) || 0) / scale).toFixed(2)));

  const pending = partners.filter((p) => p.status === 'pending');
  const active = partners.filter((p) => p.status !== 'pending');
  const totalAvailable = partners.reduce((a, p) => a + Number(p.availableCents || 0), 0);
  const totalPending = partners.reduce((a, p) => a + Number(p.pendingCents || 0), 0);
  const totalPaid = partners.reduce((a, p) => a + Number(p.paidCents || 0), 0);

  const row = (p: Partner) => (
    <div key={p.id} className="border-t border-gray-100">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer" onClick={() => setOpenId(openId === p.id ? null : p.id)}>
        <div className="min-w-0 flex-1">
          <div className="font-bold text-navy text-sm">{p.name || p.email}</div>
          <div className="text-[11px] text-gray-500">
            {[p.organization, p.email].filter(Boolean).join(' · ')}
          </div>
        </div>
        <code className="text-[11px] font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded">{p.code}</code>
        <div className="text-[11px] text-gray-500 w-16 text-right">{p.clicks} clicks</div>
        <div className="text-xs text-right w-24">
          <div className="text-emerald-700 font-bold">{money(p.availableCents)}</div>
          <div className="text-[10px] text-gray-400">{money(p.pendingCents)} pending</div>
        </div>
        {p.status === 'pending' ? (
          <button
            onClick={(e) => { e.stopPropagation(); approve(p); }}
            disabled={!!busy}
            className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50"
          >
            {busy === 'approve' + p.id ? '…' : 'Approve'}
          </button>
        ) : Number(p.availableCents) > 0 ? (
          <button
            onClick={(e) => { e.stopPropagation(); setPayFor(p); }}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
          >
            Mark paid
          </button>
        ) : (
          <span className="text-[10px] text-gray-300 w-[72px] text-center">—</span>
        )}
      </div>

      {openId === p.id && (
        <div className="px-4 pb-4 bg-gray-50/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            {([['name', 'Name'], ['email', 'Email'], ['phone', 'Phone'], ['organization', 'Club / audience'], ['payoutDetail', 'PayPal address'], ['discountCode', 'Stripe discount code']] as const).map(([f, label]) => (
              <label key={f} className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                <input
                  defaultValue={(p[f] as string) || ''}
                  onBlur={(e) => { if (e.target.value !== ((p[f] as string) || '')) saveField(p, f, e.target.value); }}
                  className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                />
              </label>
            ))}
          </div>
          {p.audience && <div className="text-xs text-gray-600 mb-2 whitespace-pre-wrap">{p.audience}</div>}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
            <span>Link: <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded">https://www.anytime-soccer.com/r/{p.code}</code></span>
            {p.dashboardToken && (
              <a href={`/partner-dashboard?t=${p.dashboardToken}`} target="_blank" rel="noreferrer" className="text-red font-bold hover:underline">
                Their dashboard →
              </a>
            )}
            <span>Lifetime paid {money(p.paidCents)}</span>
            {!p.discountCode && <span className="text-amber-700 font-bold">No Stripe code yet — their page cannot offer a discount</span>}
            <a href={`/partner/${p.code}`} target="_blank" rel="noreferrer" className="text-red font-bold hover:underline">Their landing page →</a>
            {p.status !== 'pending' && (
              <button onClick={() => saveField(p, 'status', p.status === 'active' ? 'paused' : 'active')} className="font-bold text-gray-500 hover:text-red">
                {p.status === 'active' ? 'Pause this partner' : 'Reactivate'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-black text-navy">Partners</h2>
          <p className="text-xs text-gray-500">Referral links, commissions, and PayPal payouts.</p>
        </div>
        <a href="/partner-program" target="_blank" rel="noreferrer" className="text-xs font-bold text-red hover:underline">
          The apply page →
        </a>
      </div>

      {note && <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{note}</div>}
      {error && <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}
      {needsReview > 0 && (
        <div className="mb-3 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold">
          {needsReview} commission{needsReview === 1 ? '' : 's'} could not be priced — the Stripe price is not mapped. Open the ledger to see them.
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {[
          ['Partners', String(active.length), 'text-navy'],
          ['Awaiting approval', String(pending.length), pending.length ? 'text-red' : 'text-gray-400'],
          ['Owed now', money(totalAvailable), 'text-emerald-600'],
          ['Clearing', money(totalPending), 'text-amber-600'],
        ].map(([label, value, tone]) => (
          <div key={label} className="border border-gray-200 rounded-xl px-3 py-2 bg-white">
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</div>
            <div className={`text-xl font-black ${tone}`}>{value}</div>
          </div>
        ))}
      </div>

      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mb-4">
        {loading && <div className="px-4 py-6 text-center text-xs text-gray-400">Loading…</div>}
        {!loading && partners.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-gray-400">
            No partners yet. Share <code className="bg-gray-100 px-1.5 py-0.5 rounded">www.anytime-soccer.com/partner-program</code> to get applications.
          </div>
        )}
        {pending.length > 0 && (
          <>
            <div className="px-4 py-2 bg-red/5 text-[10px] font-bold uppercase tracking-wide text-red">Awaiting approval</div>
            {pending.map(row)}
          </>
        )}
        {active.length > 0 && (
          <>
            {pending.length > 0 && <div className="px-4 py-2 bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">Active</div>}
            {active.map(row)}
          </>
        )}
      </div>

      {/* The rules */}
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mb-4">
        <button onClick={() => setShowRules((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
          <span className="text-xs font-bold uppercase tracking-wide text-navy">⚖️ The rules</span>
          <span className="text-gray-400 text-xs">{showRules ? '▴' : '▾'}</span>
        </button>
        {showRules && settings && (
          <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {RULE_FIELDS.map(({ f, label, hint, scale, prefix, suffix }) => (
              <label key={f} className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                <span className="mt-0.5 flex items-center rounded-lg border border-gray-200 overflow-hidden bg-white">
                  {prefix && <span className="pl-2 text-gray-400 text-xs">{prefix}</span>}
                  <input
                    inputMode="decimal"
                    defaultValue={show(settings[f] as number, scale)}
                    onBlur={(e) => {
                      const typed = Number(e.target.value);
                      if (!Number.isFinite(typed) || typed < 0) { e.target.value = show(settings[f] as number, scale); return; }
                      const stored = Math.round(typed * scale);
                      if (stored !== Number(settings[f])) saveSetting(f, String(stored));
                    }}
                    className="w-full px-2 py-1.5 text-xs outline-none"
                  />
                  {suffix && <span className="pr-2 text-gray-400 text-xs">{suffix}</span>}
                </span>
                <span className="text-[10px] text-gray-400">{hint}</span>
              </label>
            ))}
            <div className="sm:col-span-3 text-[11px] text-gray-500">
              Currently: <strong>{money(settings.individualFixedCents)}</strong> per individual membership, <strong>{Number(settings.teamBasisPoints) / 100}%</strong> of a team&rsquo;s first payment.
              Cleared after <strong>{settings.holdDays} days</strong>, paid over <strong>{money(settings.minimumPayoutCents)}</strong>.
            </div>
          </div>
        )}
      </div>

      {/* The ledger */}
      <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
        <button onClick={() => setShowLedger((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
          <span className="text-xs font-bold uppercase tracking-wide text-navy">
            📒 The ledger <span className="text-gray-400 font-semibold normal-case tracking-normal">(lifetime paid {money(totalPaid)})</span>
          </span>
          <span className="text-gray-400 text-xs">{showLedger ? '▴' : '▾'}</span>
        </button>
        {showLedger && (
          <div className="border-t border-gray-100 overflow-x-auto">
            {commissions.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">Nothing on the ledger yet.</div>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                    <th className="text-left px-3 py-2">Partner</th>
                    <th className="text-left px-3 py-2">What</th>
                    <th className="text-right px-3 py-2">Sale</th>
                    <th className="text-right px-3 py-2">Commission</th>
                    <th className="text-left px-3 py-2">Status</th>
                    <th className="text-left px-3 py-2">Clears</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {commissions.map((c) => (
                    <tr key={c.id}>
                      <td className="px-3 py-2">{c.partnerName || c.partnerCode}</td>
                      <td className="px-3 py-2 text-gray-500">{c.productType || <span className="text-blue-700" title={c.note || ''}>unmapped</span>}</td>
                      <td className="px-3 py-2 text-right text-gray-500">{money(c.grossCents)}</td>
                      <td className="px-3 py-2 text-right font-bold text-navy">{money(c.commissionCents)}</td>
                      <td className="px-3 py-2">
                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${STATUS_TINT[c.status] || 'bg-gray-100 text-gray-600'}`}>{c.status}</span>
                      </td>
                      <td className="px-3 py-2 text-gray-500">{day(c.availableAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Record a payout */}
      {payFor && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setPayFor(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-navy mb-1">Pay {payFor.name || payFor.email}</h3>
            <p className="text-xs text-gray-500 mb-3">
              Send <strong className="text-emerald-700">{money(payFor.availableCents)}</strong> by PayPal to{' '}
              <strong>{payFor.payoutDetail || payFor.email}</strong>, then record it here.
            </p>
            <label className="block mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">PayPal transaction id (optional)</span>
              <input value={payRef} onChange={(e) => setPayRef(e.target.value)} className="w-full mt-0.5 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            </label>
            <p className="text-[11px] text-gray-400 mb-3">
              This closes off everything currently available for them. Anything still clearing stays where it is.
            </p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setPayFor(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={pay} disabled={busy === 'pay'} className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold disabled:opacity-50">
                {busy === 'pay' ? 'Recording…' : 'I have paid them'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
