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
  individualBasisPoints: number | null;
  teamBasisPoints: number | null;
  clicks: number;
  pendingCents: number;
  availableCents: number;
  paidCents: number;
};

type Settings = {
  id: number;
  individualFixedCents: number;
  individualBasisPoints: number;
  teamBasisPoints: number;
  cookieDays: number;
  holdDays: number;
  minimumPayoutCents: number;
  individualPriceIds: string | null;
  teamPriceIds: string | null;
};

type Invite = {
  id: number;
  name: string | null;
  email: string | null;
  note: string | null;
  invitedAt: string | null;
  lastSentAt: string | null;
  sendCount: number;
  acceptedAt: string | null;
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
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [inviting, setInviting] = useState(false);
  const [invites, setInvites] = useState<Invite[]>([]);
  const [confirmDropInvite, setConfirmDropInvite] = useState<number | null>(null);
  const [invite, setInvite] = useState({ name: '', email: '', note: '' });

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

  const loadInvites = useCallback(async () => {
    try {
      const res = await fetch(`${API}/partner-program/admin/invites`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (res.ok) setInvites(d.invites || []);
    } catch { /* the invite list is a panel, not the page */ }
  }, [headers]);

  useEffect(() => { load(); loadInvites(); }, [load, loadInvites]);

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
      await loadInvites();
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

  // Refused server-side once they have commission history, so the button says
  // so rather than letting the click fail with a message nobody expects.
  const removePartner = async (p: Partner) => {
    const d = await act('del' + p.id, `${API}/partner-program/admin/partners/${p.id}`, { method: 'DELETE', headers: headers() }, 'Partner deleted');
    if (d) { setConfirmDelete(null); setOpenId(null); }
  };

  const sendInvite = async () => {
    const d = await act('invite', `${API}/partner-program/admin/invite`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(invite) }, 'Invitation sent to ' + invite.email);
    if (d) { setInviting(false); setInvite({ name: '', email: '', note: '' }); }
  };

  const saveSetting = (field: keyof Settings, value: string) =>
    act('set', `${API}/partner-program/admin/settings`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ [field]: value }) }, 'Rule saved');

  // Stored in cents and basis points, because that is the only way to keep
  // money exact. Shown and typed in dollars and percent, because nobody thinks
  // in basis points.
  const RULE_FIELDS: { f: keyof Settings; label: string; hint: string; scale: number; prefix?: string; suffix?: string }[] = [
    { f: 'individualBasisPoints', label: 'Individual', hint: 'Of an individual membership, monthly or annual', scale: 100, suffix: '%' },
    { f: 'teamBasisPoints', label: 'Team', hint: "Of a team's first payment", scale: 100, suffix: '%' },
    { f: 'minimumPayoutCents', label: 'Minimum payout', hint: 'Below this it rolls to next month', scale: 100, prefix: '$' },
    { f: 'cookieDays', label: 'Cookie', hint: '36500 = never expires', scale: 1, suffix: 'days' },
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

          {/* Their own rate, where they have one. Blank means the programme
              rate, so a partner negotiated onto something different keeps it
              when the programme rate moves. */}
          {settings && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              {([
                ['individualBasisPoints', 'Individual %', settings.individualBasisPoints],
                ['teamBasisPoints', 'Team %', settings.teamBasisPoints],
              ] as const).map(([f, label, fallback]) => (
                <label key={f} className="block">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                  <input
                    defaultValue={p[f] != null ? String(Number(p[f]) / 100) : ''}
                    placeholder={String(Number(fallback) / 100)}
                    inputMode="decimal"
                    onBlur={(e) => {
                      const raw = e.target.value.trim();
                      const stored = raw === '' ? '' : String(Math.round(Number(raw) * 100));
                      const now = p[f] != null ? String(p[f]) : '';
                      if (stored !== now) saveField(p, f, stored);
                    }}
                    className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                  <span className="text-[10px] text-gray-400">
                    {p[f] != null ? 'Their own rate' : 'Blank = programme rate'}
                  </span>
                </label>
              ))}
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-500">
            <span>Link: <code className="bg-white border border-gray-200 px-1.5 py-0.5 rounded">https://www.anytime-soccer.com/r/{p.code}</code></span>
            {p.dashboardToken && (
              <a href={`/partner-dashboard?t=${p.dashboardToken}`} target="_blank" rel="noreferrer" className="text-red font-bold hover:underline">
                Their dashboard →
              </a>
            )}
            {p.status === 'active' && (
              <button
                onClick={() => act('welcome' + p.id, `${API}/partner-program/admin/partners/${p.id}/resend-welcome`, { method: 'POST', headers: headers() }, 'Sent to ' + p.email)}
                disabled={!!busy}
                title="Sends their link and the rate they are on right now"
                className="font-bold text-gray-500 hover:text-red disabled:opacity-50"
              >
                {busy === 'welcome' + p.id ? '…' : 'Resend their link & terms'}
              </button>
            )}
            <span>Lifetime paid {money(p.paidCents)}</span>
            {!p.discountCode && <span className="text-amber-700 font-bold">No Stripe code yet — their page cannot offer a discount</span>}
            <a href={`/partner/${p.code}`} target="_blank" rel="noreferrer" className="text-red font-bold hover:underline">Their landing page →</a>
            {p.status !== 'pending' && (
              <button onClick={() => saveField(p, 'status', p.status === 'active' ? 'paused' : 'active')} className="font-bold text-gray-500 hover:text-red">
                {p.status === 'active' ? 'Pause this partner' : 'Reactivate'}
              </button>
            )}
            {confirmDelete === p.id ? (
              <span className="inline-flex items-center gap-2">
                <span className="text-gray-600">Delete {p.name || p.code} for good?</span>
                <button onClick={() => removePartner(p)} disabled={busy === 'del' + p.id} className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold disabled:opacity-50">
                  {busy === 'del' + p.id ? '…' : 'Delete'}
                </button>
                <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-600">Keep</button>
              </span>
            ) : (
              <button
                onClick={() => setConfirmDelete(p.id)}
                title={Number(p.paidCents) || Number(p.pendingCents) || Number(p.availableCents) ? 'They have earned — pause instead' : 'Delete this partner'}
                className="font-bold text-gray-400 hover:text-red"
              >
                Delete partner
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
        <div className="flex items-center gap-3">
          <a href="/partner-program" target="_blank" rel="noreferrer" className="text-xs font-bold text-red hover:underline">
            The apply page →
          </a>
          <button onClick={() => setInviting(true)} className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">
            + Invite a partner
          </button>
        </div>
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
              Currently: <strong>{Number(settings.individualBasisPoints) / 100}%</strong> of an individual membership &mdash; {money(Math.round(5998 * Number(settings.individualBasisPoints) / 10000))} on the $59.98 annual plan, {money(Math.round(998 * Number(settings.individualBasisPoints) / 10000))} on a $9.98 month &mdash; and <strong>{Number(settings.teamBasisPoints) / 100}%</strong> of a team&rsquo;s first payment.
              Cleared after <strong>{settings.holdDays} days</strong>, paid over <strong>{money(settings.minimumPayoutCents)}</strong>
              {Number(settings.cookieDays) >= 3650 ? ', and a link never expires.' : `, and a click counts for ${settings.cookieDays} days.`}
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

      {/* Who has been asked. Separate from the partner list because an
          invitation is not a partner - and this is the only record of who has
          already been approached, which is what stops a second ask. */}
      {invites.length > 0 && (
        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden mb-4">
          <div className="px-4 py-2 bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
            Invitations ({invites.filter((i) => !i.acceptedAt).length} waiting)
          </div>
          {invites.map((i) => (
            <div key={i.id} className="flex flex-wrap items-center gap-3 px-4 py-3 border-t border-gray-100">
              <div className="min-w-0 flex-1">
                <div className="font-bold text-navy text-sm">{i.name || i.email}</div>
                <div className="text-[11px] text-gray-500">
                  {i.email}
                  {i.sendCount > 1 ? ` · sent ${i.sendCount} times` : ''}
                  {i.lastSentAt ? ` · last ${day(i.lastSentAt)}` : ''}
                </div>
              </div>
              {i.acceptedAt ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Applied {day(i.acceptedAt)}</span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">Waiting</span>
              )}
              {!i.acceptedAt && (
                <button
                  onClick={() => act('remind' + i.id, `${API}/partner-program/admin/invites/${i.id}/remind`, { method: 'POST', headers: headers() }, 'Reminder sent to ' + i.email)}
                  disabled={!!busy}
                  className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50"
                >
                  {busy === 'remind' + i.id ? '…' : 'Remind'}
                </button>
              )}
              {confirmDropInvite === i.id ? (
                <span className="inline-flex gap-1">
                  <button
                    onClick={() => act('dropinv' + i.id, `${API}/partner-program/admin/invites/${i.id}`, { method: 'DELETE', headers: headers() }, 'Invitation removed').then(() => setConfirmDropInvite(null))}
                    className="px-2 py-1 rounded-lg bg-red text-white text-[10px] font-bold"
                  >
                    Delete
                  </button>
                  <button onClick={() => setConfirmDropInvite(null)} className="px-2 py-1 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500">Keep</button>
                </span>
              ) : (
                <button onClick={() => setConfirmDropInvite(i.id)} title="Remove this invitation" className="text-gray-300 hover:text-red text-base leading-none px-1">
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Invite. Sends the application page rather than creating a row: an
          invitation nobody accepts should not sit on the board looking like a
          pending application. */}
      {inviting && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setInviting(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-navy mb-1">Invite a partner</h3>
            <p className="text-xs text-gray-500 mb-4">
              They get the terms, what it pays, and a button to apply. Nothing is created until they accept.
            </p>
            <input
              value={invite.name}
              onChange={(e) => setInvite({ ...invite, name: e.target.value })}
              placeholder="Their name"
              className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <input
              value={invite.email}
              onChange={(e) => setInvite({ ...invite, email: e.target.value })}
              placeholder="Their email"
              type="email"
              className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            />
            <textarea
              value={invite.note}
              onChange={(e) => setInvite({ ...invite, note: e.target.value })}
              rows={3}
              placeholder="A line from you (optional) — how you know them, or why you thought of them"
              className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm resize-none"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setInviting(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={sendInvite} disabled={!invite.email.trim() || busy === 'invite'} className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold disabled:opacity-50">
                {busy === 'invite' ? 'Sending…' : 'Send invitation'}
              </button>
            </div>
          </div>
        </div>
      )}

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
