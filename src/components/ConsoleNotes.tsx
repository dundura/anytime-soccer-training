'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Notes — the console's scratchpad.
 *
 * Things to come back to: a coach to chase, a folder that looked wrong, a
 * decision half made. Deliberately not a task system — no owner, no due date,
 * no project. A note is a line of text with a tick, because anything more
 * becomes a thing to maintain rather than a thing to jot in.
 */

const API = 'https://api.anytime-soccer.com';

type Note = {
  id: number;
  body: string;
  pinned: number;
  doneAt: string | null;
  createdAt: string | null;
  updatedAt: string | null;
};

export default function ConsoleNotes({ token }: { token: string | null }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(0);

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
      const res = await fetch(`${API}/portal-onboarding/notes`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the notes.');
      setNotes(data.notes || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the notes.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const add = async () => {
    const body = draft.trim();
    if (!body || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/notes`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ body }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setNotes((n) => [data.note, ...n]);
      setDraft('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that.');
    } finally {
      setBusy(false);
    }
  };

  const patch = async (id: number, body: Record<string, unknown>) => {
    try {
      const res = await fetch(`${API}/portal-onboarding/notes/${id}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      // Re-sorted server-side, so a tick or a pin moves the note where it now
      // belongs rather than leaving it out of order until a refresh.
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that.');
    }
  };

  const remove = async (id: number) => {
    if (confirmDelete !== id) return setConfirmDelete(id);
    setConfirmDelete(0);
    try {
      const res = await fetch(`${API}/portal-onboarding/notes/${id}/delete`, {
        method: 'POST',
        headers: headers(),
        body: '{}',
      });
      if (!res.ok) throw new Error('Could not delete that.');
      setNotes((n) => n.filter((x) => x.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete that.');
    }
  };

  const open = notes.filter((n) => !n.doneAt);
  const done = notes.filter((n) => n.doneAt);
  const shown = showDone ? notes : open;

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Notes</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Things to come back to</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">Only you see these. Ctrl+Enter saves.</p>

      <textarea
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') add();
        }}
        rows={3}
        placeholder="Chase Ora about her roster…"
        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-red"
      />
      <div className="flex items-center gap-3 mt-2 mb-5">
        <button
          onClick={add}
          disabled={busy || !draft.trim()}
          className="text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Add note'}
        </button>
        {done.length > 0 && (
          <label className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 select-none ml-auto">
            <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} />
            Show done ({done.length})
          </label>
        )}
      </div>

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {!loading && !shown.length && (
        <p className="text-sm text-gray-500 font-semibold py-6 text-center border border-gray-200 rounded-lg">
          Nothing here. Add the first one above.
        </p>
      )}

      <div className="space-y-2">
        {shown.map((n) => (
          <div
            key={n.id}
            className={`border rounded-lg px-3 py-2 flex items-start gap-3 ${
              n.doneAt ? 'border-gray-200 bg-gray-50' : n.pinned ? 'border-amber-300 bg-amber-50' : 'border-gray-200'
            }`}
          >
            <input
              type="checkbox"
              checked={!!n.doneAt}
              onChange={() => patch(n.id, { done: !n.doneAt })}
              className="mt-1 flex-shrink-0"
            />
            <textarea
              defaultValue={n.body}
              rows={Math.max(1, Math.min(8, n.body.split('\n').length))}
              onBlur={(e) => {
                const v = e.target.value.trim();
                if (v && v !== n.body) patch(n.id, { body: v });
              }}
              className={`flex-1 text-sm bg-transparent border-0 resize-y focus:outline-none ${
                n.doneAt ? 'line-through text-gray-400' : 'text-navy'
              }`}
            />
            <span className="flex-shrink-0 flex items-center gap-2">
              <span className="text-[10px] text-gray-400 whitespace-nowrap">
                {(n.createdAt || '').slice(0, 10)}
              </span>
              <button
                onClick={() => patch(n.id, { pinned: !n.pinned })}
                title={n.pinned ? 'Unpin' : 'Pin to the top'}
                className={`text-sm leading-none ${n.pinned ? 'text-amber-500' : 'text-gray-300 hover:text-gray-500'}`}
              >
                ★
              </button>
              <button
                onClick={() => remove(n.id)}
                onBlur={() => setConfirmDelete((d) => (d === n.id ? 0 : d))}
                className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
                  confirmDelete === n.id
                    ? 'bg-red text-white hover:bg-red-dark'
                    : 'border border-gray-300 text-gray-400 hover:bg-gray-50'
                }`}
              >
                {confirmDelete === n.id ? 'Delete?' : '×'}
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
