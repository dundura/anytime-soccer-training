'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Phase one, on a board.
 *
 * Every coach who asked for a roster or gave an estimate, which branch they
 * took, and where they have got to. Before this the answer to "who is stuck?"
 * lived in Megan's inbox, which is how 45 live prospects came to be sitting in
 * `in_process` with no onboarding email ever sent to them.
 *
 * Two columns are decisions rather than facts — the roster arrived, the
 * invoice went out. Both are toggles, so a mis-click is undone by clicking
 * again rather than by asking somebody.
 */

const API = 'https://api.anytime-soccer.com';

type Request = {
  id: number;
  name: string;
  email: string;
  phone: string;
  teamName: string;
  choice: 'roster' | 'estimate';
  estimatedPlayers: number | null;
  tipsSentAt: string | null;
  reminderSentAt: string | null;
  rosterReceivedAt: string | null;
  invoicedAt: string | null;
  createdAt: string | null;
};

const when = (v: string | null) => {
  if (!v) return null;
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

// How long they have been waiting. The number that says who to chase.
const daysSince = (v: string | null) => {
  if (!v) return null;
  const ms = Date.now() - new Date(v).getTime();
  if (Number.isNaN(ms)) return null;
  return Math.floor(ms / 86400000);
};

export default function RosterRequests({ token }: { token: string | null }) {
  const [rows, setRows] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<number | null>(null);
  const [showDone, setShowDone] = useState(false);

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
      const res = await fetch(`${API}/roster-request/list`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load the roster requests.');
      setRows(d.requests || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the roster requests.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    load();
  }, [load]);

  const mark = async (id: number, field: 'rosterReceivedAt' | 'invoicedAt') => {
    if (busy) return;
    setBusy(id);
    try {
      const res = await fetch(`${API}/roster-request/mark`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...headers() },
        body: JSON.stringify({ id, field }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setError(d.error || 'Could not save that.'); return; }
      setRows(list => list.map(r => (r.id === id ? { ...r, [field]: d[field] ?? null } : r)));
    } catch {
      setError('Could not save that.');
    } finally {
      setBusy(null);
    }
  };

  // Done means paid for: the roster is in and the invoice has gone.
  const isDone = (r: Request) => Boolean(r.invoicedAt) && (r.choice === 'estimate' || Boolean(r.rosterReceivedAt));
  const open = rows.filter(r => !isDone(r));
  const done = rows.filter(isDone);
  const shown = showDone ? done : open;

  const pill = (text: string, tone: 'red' | 'amber' | 'green' | 'grey') => {
    const tones = {
      red: 'bg-red/10 text-red border-red/30',
      amber: 'bg-amber-100 text-amber-800 border-amber-300',
      green: 'bg-green-100 text-green-800 border-green-300',
      grey: 'bg-gray-100 text-gray-600 border-gray-200',
    };
    return <span className={`inline-block rounded-full border px-2 py-0.5 text-[11px] font-bold ${tones[tone]}`}>{text}</span>;
  };

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-extrabold text-navy">Roster requests</h2>
        <div className="flex overflow-hidden rounded-full border border-gray-200">
          <button
            onClick={() => setShowDone(false)}
            className={`px-3 py-1 text-xs font-bold ${!showDone ? 'bg-navy text-white' : 'bg-white text-gray-600'}`}
          >
            Open ({open.length})
          </button>
          <button
            onClick={() => setShowDone(true)}
            className={`px-3 py-1 text-xs font-bold ${showDone ? 'bg-navy text-white' : 'bg-white text-gray-600'}`}
          >
            Done ({done.length})
          </button>
        </div>
        <button onClick={load} className="text-xs font-bold text-gray-500 hover:text-navy">Refresh</button>
      </div>

      {error && <p className="mb-3 text-sm font-semibold text-red">{error}</p>}
      {loading && <p className="text-sm text-gray-400">Loading&hellip;</p>}
      {!loading && !shown.length && (
        <p className="text-sm text-gray-400">
          {showDone ? 'Nothing finished yet.' : 'Nothing waiting. Everyone who asked has been dealt with.'}
        </p>
      )}

      {!!shown.length && (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50 text-left">
                {['Coach', 'Asked for', 'Waiting', 'Sent', 'Roster in', 'Invoiced'].map(h => (
                  <th key={h} className="whitespace-nowrap px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shown.map(r => {
                const waiting = daysSince(r.createdAt);
                return (
                  <tr key={r.id} className="border-b border-gray-100 last:border-0">
                    <td className="px-3 py-2.5">
                      <div className="font-bold text-navy">{r.name || r.email}</div>
                      <div className="text-[12px] text-gray-500">
                        {[r.teamName, r.email, r.phone].filter(Boolean).join(' · ')}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      {r.choice === 'roster'
                        ? pill('Roster', 'grey')
                        : pill(`Link · ${r.estimatedPlayers ?? '?'} players`, 'grey')}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-gray-600">
                      {waiting === null ? '—' : waiting === 0 ? 'today' : `${waiting}d`}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        {r.tipsSentAt && pill('Tips', 'grey')}
                        {r.reminderSentAt ? pill('Chased', 'amber') : null}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      {r.choice === 'estimate' ? (
                        <span className="text-[12px] text-gray-400">n/a</span>
                      ) : (
                        <button
                          onClick={() => mark(r.id, 'rosterReceivedAt')}
                          disabled={busy === r.id}
                          title={r.rosterReceivedAt ? 'Click to undo' : 'Mark the roster as received'}
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-bold disabled:opacity-50 ${
                            r.rosterReceivedAt
                              ? 'border-green-300 bg-green-100 text-green-800'
                              : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                          }`}
                        >
                          {r.rosterReceivedAt ? `In ${when(r.rosterReceivedAt)}` : 'Mark in'}
                        </button>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5">
                      <button
                        onClick={() => mark(r.id, 'invoicedAt')}
                        disabled={busy === r.id}
                        title={r.invoicedAt ? 'Click to undo' : 'Mark the invoice as sent'}
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-bold disabled:opacity-50 ${
                          r.invoicedAt
                            ? 'border-green-300 bg-green-100 text-green-800'
                            : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300'
                        }`}
                      >
                        {r.invoicedAt ? `Sent ${when(r.invoicedAt)}` : 'Mark sent'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-3 text-[12px] leading-relaxed text-gray-500">
        Marking a roster in also stops the automatic 48-hour chase &mdash; the same thing the button in
        Megan&rsquo;s notification email does.
      </p>
    </div>
  );
}
