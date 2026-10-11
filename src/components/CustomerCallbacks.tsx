'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * CRM customer callbacks.
 *
 * Everyone who answers Yes to "Would you like to speak to a member of the team for assistance?" in the monthly
 * check-in lands here as a callback to make. Each one carries what they said in the check-in, a status (to call,
 * called, done) and a note for what was said on the call.
 */

const API = 'https://api.anytime-soccer.com';

type Status = 'to_call' | 'called' | 'done';
type Callback = {
  id: number;
  childId: number;
  month: string;
  createdAt: string;
  isCoach: number;
  howToTrain: string | null;
  findProgram: string | null;
  lookingFor: string | null;
  assignFolders: string | null;
  challenges: string | null;
  screenname: string | null;
  firstname: string | null;
  lastname: string | null;
  childEmail: string | null;
  status: Status;
  note: string | null;
  statusAt: string | null;
};

const TABS: { key: Status | 'all'; label: string }[] = [
  { key: 'to_call', label: 'To call' },
  { key: 'called', label: 'Called' },
  { key: 'done', label: 'Done' },
  { key: 'all', label: 'All' },
];
const STATUS_LABEL: Record<Status, string> = { to_call: 'To call', called: 'Called', done: 'Done' };
const STATUS_STYLE: Record<Status, string> = {
  to_call: 'bg-red/10 text-red',
  called: 'bg-amber-100 text-amber-800',
  done: 'bg-emerald-100 text-emerald-800',
};
const HOW: Record<string, string> = { easy: 'Yes, easily', mostly: 'Mostly', lost: 'Lost' };
const FIND: Record<string, string> = { yes: 'Yes', sometimes: 'Sometimes', no: 'No' };

const when = (v: string) =>
  new Date(v).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function CustomerCallbacks({ token }: { token: string | null }) {
  const [rows, setRows] = useState<Callback[]>([]);
  const [tab, setTab] = useState<Status | 'all'>('to_call');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notes, setNotes] = useState<Record<number, string>>({});

  const headers = useCallback(
    () => ({
      'Content-Type': 'application/json',
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/customer-callbacks`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load callbacks.');
      setRows(d.callbacks || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load callbacks.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (id: number, patch: { status?: Status; note?: string }) => {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, ...patch, statusAt: new Date().toISOString() } : r)));
    try {
      const res = await fetch(`${API}/customer-callbacks/${id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(patch) });
      if (!res.ok) throw new Error();
    } catch {
      setError('That did not save. Reloading.');
      load();
    }
  };

  const shown = rows.filter((r) => tab === 'all' || r.status === tab);
  const count = (s: Status) => rows.filter((r) => r.status === s).length;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-wrap items-center gap-3 mb-1">
        <h2 className="text-lg font-extrabold text-navy m-0">CRM customer callbacks</h2>
        <button onClick={load} className="ml-auto text-xs font-bold text-gray-500 hover:text-navy">
          Refresh
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        People who asked to speak to a member of the team in the monthly check-in.
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              tab === t.key ? 'bg-navy text-white' : 'bg-gray-100 text-navy hover:bg-gray-200'
            }`}
          >
            {t.label}
            {t.key !== 'all' && <span className="ml-1.5 opacity-70">{count(t.key)}</span>}
          </button>
        ))}
      </div>

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}
      {!loading && shown.length === 0 && (
        <p className="text-sm text-gray-500 py-8 text-center">
          {tab === 'to_call' ? 'Nobody is waiting for a call.' : 'Nothing here.'}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {shown.map((r) => {
          const name = r.screenname || [r.firstname, r.lastname].filter(Boolean).join(' ') || 'Unknown';
          const note = notes[r.id] !== undefined ? notes[r.id] : r.note || '';
          return (
            <div key={r.id} className="border border-gray-200 rounded-xl p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-extrabold text-navy">{name}</span>
                {r.isCoach ? (
                  <span className="text-[10px] font-extrabold uppercase tracking-wide bg-navy text-white rounded-full px-2 py-0.5">Coach</span>
                ) : null}
                <span className={`text-[10px] font-extrabold uppercase tracking-wide rounded-full px-2 py-0.5 ${STATUS_STYLE[r.status]}`}>
                  {STATUS_LABEL[r.status]}
                </span>
                <span className="ml-auto text-xs text-gray-500">{when(r.createdAt)}</span>
              </div>
              {r.childEmail && <div className="text-xs text-gray-600 mt-1 select-all">{r.childEmail}</div>}

              <div className="text-xs text-gray-600 mt-2 flex flex-wrap gap-x-4 gap-y-1">
                <span>
                  {r.isCoach ? 'Assign a plan' : 'Create a plan'}: <b className="text-navy">{HOW[r.howToTrain || ''] || '—'}</b>
                </span>
                {r.isCoach ? (
                  <>
                    <span>Assign folders: <b className="text-navy">{HOW[r.assignFolders || ''] || '—'}</b></span>
                    <span>Challenges: <b className="text-navy">{HOW[r.challenges || ''] || '—'}</b></span>
                  </>
                ) : (
                  <span>Finds videos: <b className="text-navy">{FIND[r.findProgram || ''] || '—'}</b></span>
                )}
                {r.lookingFor && <span>Looking for: <b className="text-navy">{r.lookingFor}</b></span>}
              </div>

              <textarea
                value={note}
                onChange={(e) => setNotes((n) => ({ ...n, [r.id]: e.target.value }))}
                onBlur={() => {
                  if (notes[r.id] !== undefined && notes[r.id] !== (r.note || '')) save(r.id, { note: notes[r.id] });
                }}
                rows={2}
                placeholder="Notes from the call"
                className="w-full mt-3 text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red"
              />

              <div className="flex flex-wrap gap-2 mt-3">
                {(['to_call', 'called', 'done'] as Status[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => save(r.id, { status: s })}
                    disabled={r.status === s}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                      r.status === s ? 'bg-navy text-white' : 'bg-gray-100 text-navy hover:bg-gray-200'
                    }`}
                  >
                    {s === 'to_call' ? 'Back to call' : s === 'called' ? 'Mark called' : 'Mark done'}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
