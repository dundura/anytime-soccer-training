'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Cold outreach, as a queue rather than a table.
 *
 * Four sections in the order the questions get asked: what will they receive,
 * who has already had it, who is still waiting on something, and where new
 * ones go in. The middle section is collapsed because it only grows — tabs
 * were the other option, and they make you leave the queue to check on it.
 *
 * The stage lives in the CRM and the sending lives in the newsletter tables.
 * This page is the join; neither side knows about the other.
 */

const API = 'https://api.anytime-soccer.com';

type EmailRow = {
  emailKey: string;
  position: number;
  subject: string;
  delayDays: number;
  delayMinutes: number;
  active: number;
};

type Lead = {
  id: number;
  name: string | null;
  club: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  notes: string | null;
  createdAt: string | null;
  blocked?: string | null;
  status?: string;
  sentCount?: number;
  signedUpAt?: string | null;
};

const blank = { name: '', club: '', email: '', phone: '', website: '', notes: '' };

/** "2 days", "5 minutes", "at signup" — the delay as a person would say it. */
function when(mins: number) {
  if (!mins) return 'at signup';
  if (mins < 60) return `+${mins} min`;
  if (mins < 1440) return `+${Math.round(mins / 60)} hr`;
  return `+${Math.round(mins / 1440)} days`;
}

export default function ColdWorkflow({ token }: { token: string | null }) {
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [added, setAdded] = useState<Lead[]>([]);
  const [todo, setTodo] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const [showAdded, setShowAdded] = useState(false);
  const [chosen, setChosen] = useState<Set<number>>(new Set());
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState({ ...blank });

  const headers = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
      'Content-Type': 'application/json',
    }),
    [token],
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/portal-onboarding/cold`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the cold list.');
      setEmails(data.emails || []);
      setAdded(data.added || []);
      setTodo(data.todo || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the cold list.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // Only somebody with an address can be enrolled, so only they can be ticked.
  const ready = todo.filter((l) => !l.blocked);
  const selected = ready.filter((l) => chosen.has(l.id));

  const enroll = async () => {
    if (!selected.length || busy) return;
    setBusy(true);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/cold/enroll`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ ids: selected.map((l) => l.id) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not add those.');
      setNote(`Added ${data.enrolled}.${data.skipped ? ` Skipped ${data.skipped}.` : ''}`);
      setChosen(new Set());
      setConfirming(false);
      await load();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not add those.');
    } finally {
      setBusy(false);
    }
  };

  const addRecord = async () => {
    if (busy) return;
    if (!draft.name.trim() && !draft.club.trim() && !draft.email.trim()) {
      return setNote('A name, a club or an email.');
    }
    setBusy(true);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/cold/add`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not add that.');
      setDraft({ ...blank });
      await load();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not add that.');
    } finally {
      setBusy(false);
    }
  };

  const toggle = (id: number) =>
    setChosen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const heading = 'text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-2';

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Cold</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Outreach queue</span>
      </div>
      <p className="text-xs text-gray-500 mb-5">
        What they get, who has had it, who is still waiting, and where new ones go in.
      </p>

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-navy mb-3">{note}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {/* 1 — the sequence ------------------------------------------------ */}
      <p className={heading}>The sequence ({emails.length})</p>
      <div className="border border-gray-200 rounded-lg mb-6 overflow-x-auto">
        {emails.length === 0 ? (
          <p className="px-3 py-5 text-center text-sm text-gray-500 font-semibold">
            No emails written yet. Nobody added will receive anything until there are.
          </p>
        ) : (
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {['#', 'Subject', 'Sends', 'Live'].map((h) => (
                  <th key={h} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {emails.map((e) => (
                <tr key={e.emailKey} className="border-t border-gray-100">
                  <td className="px-3 py-2 text-gray-400">{e.position}</td>
                  <td className="px-3 py-2 font-semibold text-navy">{e.subject}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500">{when(e.delayMinutes)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {e.active ? (
                      <span className="font-semibold text-green-700">Yes</span>
                    ) : (
                      <span className="text-gray-400">Paused</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 2 — already on it, collapsed ------------------------------------ */}
      <button onClick={() => setShowAdded((v) => !v)} className={`${heading} text-red hover:underline block`}>
        {showAdded ? '▾' : '▸'} On the sequence ({added.length})
      </button>
      {showAdded && (
        <div className="border border-gray-200 rounded-lg mb-6 overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {['Name', 'Club', 'Email', 'Added', 'Sent', 'Status'].map((h) => (
                  <th key={h} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {added.map((l) => (
                <tr key={l.id} className="border-t border-gray-100">
                  <td className="px-3 py-2 whitespace-nowrap">{l.name || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.club || '—'}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{l.email}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-gray-500">{(l.signedUpAt || '').slice(0, 10)}</td>
                  <td className="px-3 py-2">{l.sentCount ?? 0}</td>
                  <td className="px-3 py-2 whitespace-nowrap">
                    {l.status === 'active' ? (
                      <span className="font-semibold text-green-700">Active</span>
                    ) : (
                      <span className="text-gray-500">{l.status}</span>
                    )}
                  </td>
                </tr>
              ))}
              {!added.length && (
                <tr>
                  <td colSpan={6} className="px-3 py-5 text-center text-gray-500 font-semibold">
                    Nobody yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* 3 — the queue --------------------------------------------------- */}
      <div className="flex items-center gap-3 mb-2 mt-6">
        <p className={`${heading} mb-0`}>Still to work ({todo.length})</p>
        <span className="ml-auto flex items-center gap-2">
          {confirming ? (
            <>
              <button
                onClick={enroll}
                disabled={busy}
                className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-red text-white hover:bg-red-dark disabled:opacity-50"
              >
                {busy ? 'Adding…' : `Add ${selected.length} to the sequence?`}
              </button>
              <button onClick={() => setConfirming(false)} className="text-[10px] font-semibold text-gray-500 hover:underline">
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              disabled={!selected.length}
              className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-navy text-white hover:bg-navy-light disabled:opacity-40"
            >
              Add {selected.length} to the sequence
            </button>
          )}
        </span>
      </div>
      <div className="border border-gray-200 rounded-lg mb-6 overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-3 py-2"></th>
              {['Name', 'Club', 'Email', 'Phone', 'Added', 'Blocked by'].map((h) => (
                <th key={h} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todo.map((l) => (
              <tr key={l.id} className={`border-t border-gray-100 ${l.blocked ? 'bg-amber-50' : ''}`}>
                <td className="px-3 py-2">
                  {!l.blocked && (
                    <input type="checkbox" checked={chosen.has(l.id)} onChange={() => toggle(l.id)} />
                  )}
                </td>
                <td className="px-3 py-2 whitespace-nowrap">{l.name || '—'}</td>
                <td className="px-3 py-2 whitespace-nowrap">{l.club || '—'}</td>
                <td className="px-3 py-2 whitespace-nowrap">{l.email || <span className="text-gray-300">—</span>}</td>
                <td className="px-3 py-2 whitespace-nowrap">{l.phone || '—'}</td>
                <td className="px-3 py-2 whitespace-nowrap text-gray-500">{(l.createdAt || '').slice(0, 10)}</td>
                <td className="px-3 py-2 whitespace-nowrap">
                  {l.blocked ? (
                    <span className="font-semibold text-amber-700">{l.blocked}</span>
                  ) : (
                    <span className="font-semibold text-green-700">Ready</span>
                  )}
                </td>
              </tr>
            ))}
            {!todo.length && !loading && (
              <tr>
                <td colSpan={7} className="px-3 py-5 text-center text-gray-500 font-semibold">
                  Queue is clear.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 4 — add ---------------------------------------------------------- */}
      <p className={heading}>Add records</p>
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="grid gap-2 sm:grid-cols-3 mb-2">
          {(
            [
              ['name', 'Name'],
              ['club', 'Club'],
              ['email', 'Email'],
              ['phone', 'Phone'],
              ['website', 'Website'],
              ['notes', 'Notes'],
            ] as const
          ).map(([field, label]) => (
            <input
              key={field}
              value={draft[field]}
              onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') addRecord();
              }}
              placeholder={label}
              className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
            />
          ))}
        </div>
        <button
          onClick={addRecord}
          disabled={busy}
          className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Add record'}
        </button>
        <p className="text-[11px] text-gray-500 mt-2">
          Lands in the Cold stage, not on the sequence. Add them above when they are ready.
        </p>
      </div>
    </div>
  );
}
