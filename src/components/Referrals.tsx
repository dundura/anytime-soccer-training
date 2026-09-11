'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Coaches our own players introduced us to.
 *
 * A player taps the bubble in the app, types their coach's email, and the coach
 * gets a note in the family's voice with Megan copied in. This is the board for
 * what happened next: it is the only lead in the building that nobody here
 * started, and the warmest one we get, so it should not live as a row nobody
 * queries.
 *
 * Two columns are the follow-through rather than the referral: which CRM stage
 * the coach sits in, and whether the two-day sequence has them. A blank stage
 * means nobody has touched them yet.
 */

const API = 'https://api.anytime-soccer.com';

type Referral = {
  id: number;
  coachEmail: string;
  coachName: string | null;
  sentAt: string | null;
  playerName: string | null;
  playerEmail: string | null;
  teamName: string | null;
  stage: string | null;
  onSequence: boolean;
};

const when = (v: string | null) => {
  if (!v) return '—';
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
};

const daysSince = (v: string | null) => {
  if (!v) return null;
  const ms = Date.now() - new Date(v).getTime();
  if (Number.isNaN(ms)) return null;
  return Math.max(0, Math.floor(ms / 86400000));
};

export default function Referrals({ token }: { token: string | null }) {
  const [rows, setRows] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/coach-referral/list`, {
        headers: { Authorization: token || '' },
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(d.error || 'Could not load the referrals.');
        return;
      }
      setRows(d.referrals || []);
    } catch {
      setError('Could not load the referrals.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 mb-4">
        <div>
          <h2 className="text-xl font-extrabold text-navy">Referrals</h2>
          <p className="text-sm text-gray-500 mt-1">
            Coaches introduced to us by their own players
          </p>
        </div>
        <button
          onClick={load}
          className="text-xs font-bold text-navy border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>

      {error && <p className="text-sm font-bold text-red-600 mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {!loading && !rows.length && !error && (
        <div className="border border-gray-200 rounded-xl p-10 text-center">
          <div className="text-3xl">🎁</div>
          <p className="mt-3 font-extrabold text-navy">No referrals yet</p>
          <p className="text-sm text-gray-500 mt-1">
            They appear here the moment a player emails their coach from the app.
          </p>
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-[11px] font-extrabold uppercase tracking-wide text-gray-500">
                <th className="px-4 py-3">Coach</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Referred by</th>
                <th className="px-4 py-3">Sent</th>
                <th className="px-4 py-3">Stage</th>
                <th className="px-4 py-3">Sequence</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const days = daysSince(r.sentAt);
                return (
                  <tr key={r.id} className="border-t border-gray-100 align-top">
                    <td className="px-4 py-3">
                      <div className="font-bold text-navy">{r.coachName || '—'}</div>
                      <a
                        href={`mailto:${r.coachEmail}`}
                        className="text-xs text-gray-500 underline break-all"
                      >
                        {r.coachEmail}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{r.teamName || '—'}</td>
                    <td className="px-4 py-3">
                      <div className="text-gray-800">{r.playerName || '—'}</div>
                      {r.playerEmail && (
                        <div className="text-xs text-gray-400 break-all">{r.playerEmail}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                      {when(r.sentAt)}
                      {days !== null && (
                        <div className="text-xs text-gray-400">
                          {days === 0 ? 'today' : `${days}d ago`}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.stage ? (
                        <span className="inline-block rounded-full bg-navy/10 text-navy text-xs font-bold px-2.5 py-1">
                          {r.stage}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">not in CRM</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {r.onSequence ? (
                        <span className="text-xs font-bold text-green-700">on it</span>
                      ) : (
                        <span className="text-xs text-gray-400">no</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
