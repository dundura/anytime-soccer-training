'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';

/**
 * Everybody on any sequence, on one page.
 *
 * The Newsletters panel answers "what is in this sequence"; this answers "where
 * is this person". Somebody who took three lead magnets has three rows, one per
 * sequence, because that is how the subscriber table is keyed — and seeing all
 * three together is usually the point of looking someone up.
 */

const API = 'https://api.anytime-soccer.com';

type Sub = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  sequence: string;
  source: string | null;
  landingPage: string | null;
  status: string;
  signedUpAt: string | null;
  lastSentAt: string | null;
  sentCount: number;
  deliveredCount: number;
  problemCount: number;
  outcome: string | null;
  hiddenAt: string | null;
};

type Sequence = { key: string; label: string; group: string; emails: number; subscribers: number };

type EmailRow = { emailKey: string; sequence: string; subject: string; position: number };

// Few on purpose: a list of twenty statuses is a list nobody keeps up to date.
const OUTCOMES = [
  { key: 'won', label: 'Won', className: 'bg-green-100 text-green-800' },
  { key: 'warm', label: 'Warm', className: 'bg-amber-100 text-amber-800' },
  { key: 'lost', label: 'Lost', className: 'bg-gray-200 text-gray-600' },
] as const;

type SendRow = {
  emailKey: string;
  subject: string;
  status: string;
  error: string | null;
  sentAt: string | null;
  deliveryStatus: string | null;
  deliveryDetail: string | null;
};

export default function NewsletterPeople({ token }: { token: string | null }) {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [sequence, setSequence] = useState('');
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(0);
  const [sends, setSends] = useState<Record<number, SendRow[]>>({});
  const [outcome, setOutcome] = useState('');
  const [showHidden, setShowHidden] = useState(false);
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [busyId, setBusyId] = useState(0);
  const [note, setNote] = useState('');

  const headers = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (sequence) params.set('sequence', sequence);
      if (status) params.set('status', status);
      if (search.trim()) params.set('search', search.trim());
      if (outcome) params.set('outcome', outcome);
      if (showHidden) params.set('hidden', '1');
      const [subsRes, seqRes, emailRes] = await Promise.all([
        fetch(`${API}/newsletters/subscribers?${params.toString()}`, { headers: headers() }),
        fetch(`${API}/newsletters/sequences`, { headers: headers() }),
        fetch(`${API}/newsletters/emails`, { headers: headers() }),
      ]);
      const sj = await subsRes.json().catch(() => ({}));
      const qj = await seqRes.json().catch(() => ({}));
      const ej = await emailRes.json().catch(() => ({}));
      if (!subsRes.ok) throw new Error(sj.error || 'Could not load the list.');
      setSubs(sj.subscribers || []);
      setSequences(qj.sequences || []);
      setEmails(ej.emails || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the list.');
    } finally {
      setLoading(false);
    }
  }, [headers, sequence, status, search, outcome, showHidden]);

  // Search is typed, so it waits; the two pickers fire immediately.
  useEffect(() => {
    const t = setTimeout(load, search ? 350 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  const toggle = async (s: Sub) => {
    if (open === s.id) return setOpen(0);
    setOpen(s.id);
    if (sends[s.id]) return;
    try {
      const res = await fetch(`${API}/newsletters/subscribers/${s.id}`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setSends((m) => ({ ...m, [s.id]: data.sends || [] }));
    } catch {
      /* the timeline is a convenience; a failure here is not worth an alarm */
    }
  };

  const label = (key: string) => sequences.find((s) => s.key === key)?.label || key;

  const patch = async (id: number, body: Record<string, unknown>) => {
    setBusyId(id);
    setNote('');
    try {
      const res = await fetch(`${API}/newsletters/subscribers/${id}`, {
        method: 'POST',
        headers: { ...headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      // Hiding removes the row from a list that is not showing hidden rows;
      // an outcome just updates in place.
      if (body.hidden !== undefined && !showHidden) {
        setSubs((rows) => rows.filter((r) => r.id !== id));
      } else {
        setSubs((rows) => rows.map((r) => (r.id === id ? { ...r, ...data.subscriber } : r)));
      }
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not save that.');
    } finally {
      setBusyId(0);
    }
  };

  const sendOne = async (id: number, emailKey: string) => {
    if (!emailKey) return;
    setBusyId(id);
    setNote('');
    try {
      const res = await fetch(`${API}/newsletters/subscribers/${id}/send`, {
        method: 'POST',
        headers: { ...headers(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailKey }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send that.');
      setNote(`Sent "${data.subject}" to ${data.sentTo}`);
      setSends((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      await load();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not send that.');
    } finally {
      setBusyId(0);
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">People</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Everybody on any sequence</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        One row per person per sequence. Click a row to see every email they were sent.
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <select
          value={sequence}
          onChange={(e) => setSequence(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
        >
          <option value="">All sequences</option>
          {sequences.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label} ({s.subscribers})
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
        >
          <option value="">Any status</option>
          <option value="active">Active</option>
          <option value="unsubscribed">Unsubscribed</option>
        </select>
        <select
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
        >
          <option value="">Any outcome</option>
          {OUTCOMES.map((o) => (
            <option key={o.key} value={o.key}>
              {o.label}
            </option>
          ))}
        </select>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email"
          className="text-xs border border-gray-300 rounded px-2 py-1.5 w-56 focus:outline-none focus:border-red"
        />
        <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 select-none">
          <input type="checkbox" checked={showHidden} onChange={(e) => setShowHidden(e.target.checked)} />
          Show hidden
        </label>
        <span className="text-[11px] font-semibold text-gray-500">
          {loading ? 'Loading…' : `${subs.length} row${subs.length === 1 ? '' : 's'}`}
        </span>
      </div>

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-navy mb-3">{note}</p>}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              {['Name', 'Email', 'Sequence', 'Signed up', 'Sent', 'Delivered', 'Status', 'Outcome', ''].map((h, i) => (
                <th key={h + i} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <Fragment key={s.id}>
                <tr
                  onClick={() => toggle(s)}
                  className={`border-t border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    s.status === 'unsubscribed' ? 'text-gray-400' : ''
                  }`}
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    {[s.firstName, s.lastName].filter(Boolean).join(' ') || '—'}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{s.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{label(s.sequence)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500">{(s.signedUpAt || '').slice(0, 10)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{s.sentCount}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {s.problemCount > 0 ? (
                      <span className="font-semibold text-red">{s.problemCount} bounced</span>
                    ) : s.deliveredCount > 0 ? (
                      <span className="font-semibold text-green-700">{s.deliveredCount}</span>
                    ) : (
                      <span className="text-gray-300">&mdash;</span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {s.status === 'active' ? (
                      <span className="font-semibold text-green-700">Active</span>
                    ) : (
                      <span className="font-semibold text-gray-500">Unsubscribed</span>
                    )}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={s.outcome || ''}
                      disabled={busyId === s.id}
                      onChange={(e) => patch(s.id, { outcome: e.target.value })}
                      className={`text-[11px] font-semibold rounded-full px-2 py-1 border-0 focus:outline-none ${
                        OUTCOMES.find((o) => o.key === s.outcome)?.className || 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <option value="">—</option>
                      {OUTCOMES.map((o) => (
                        <option key={o.key} value={o.key}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                    <span className="flex items-center justify-end gap-2">
                      <select
                        value=""
                        disabled={busyId === s.id || s.status === 'unsubscribed'}
                        onChange={(e) => sendOne(s.id, e.target.value)}
                        className="text-[11px] border border-gray-300 rounded px-2 py-1 max-w-[190px] focus:outline-none focus:border-red disabled:opacity-40"
                      >
                        <option value="">Send an email…</option>
                        {emails.map((e2) => (
                          <option key={e2.emailKey} value={e2.emailKey}>
                            {label(e2.sequence)} · {e2.subject}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => patch(s.id, { hidden: !s.hiddenAt })}
                        disabled={busyId === s.id}
                        className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
                      >
                        {s.hiddenAt ? 'Unhide' : 'Hide'}
                      </button>
                    </span>
                  </td>
                </tr>
                {open === s.id && (
                  <tr key={`${s.id}-sends`} className="bg-gray-50 border-t border-gray-100">
                    <td colSpan={9} className="px-3 py-3">
                      {!sends[s.id] && <p className="text-[11px] text-gray-500 font-semibold">Loading…</p>}
                      {sends[s.id]?.length === 0 && (
                        <p className="text-[11px] text-gray-500 font-semibold">Nothing sent yet.</p>
                      )}
                      {sends[s.id]?.map((n) => (
                        <p key={n.emailKey} className="text-[11px] text-gray-600 mb-0.5">
                          <span className="text-gray-400">{(n.sentAt || '').slice(0, 16).replace('T', ' ')}</span>{' '}
                          {n.subject}{' '}
                          {n.status !== 'sent' ? (
                            <span className="font-semibold text-red">
                              {n.status}
                              {n.error ? ` — ${n.error}` : ''}
                            </span>
                          ) : n.deliveryStatus === 'delivered' ? (
                            <span className="font-semibold text-green-700">delivered</span>
                          ) : n.deliveryStatus ? (
                            <span className="font-semibold text-red">
                              {n.deliveryStatus}
                              {n.deliveryDetail ? ` — ${n.deliveryDetail}` : ''}
                            </span>
                          ) : (
                            <span className="font-semibold text-gray-500">accepted</span>
                          )}
                        </p>
                      ))}
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!loading && !subs.length && (
              <tr>
                <td colSpan={9} className="px-3 py-6 text-center text-gray-500 font-semibold">
                  Nobody matches that.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-500 mt-3">
        <strong>Accepted</strong> means the mail server took it. <strong>Delivered</strong>, <strong>bounced</strong>{' '}
        and <strong>complained</strong> come from Resend and are what actually happened. Anything sent before the
        webhook was connected stays on accepted.
      </p>
    </div>
  );
}
