'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Key logins.
 *
 * Passwords are encrypted on the server and are not in the list — one is
 * fetched only when you ask for that row. So an open tab is a list of sites,
 * not a wall of credentials, and a screen share is survivable.
 */

const API = 'https://api.anytime-soccer.com';

type Login = {
  id: number;
  site: string;
  url: string | null;
  username: string | null;
  notes: string | null;
  hasSecret: number;
};

const blank = { site: '', url: '', username: '', secret: '', notes: '' };

export default function ConsoleLogins({ token }: { token: string | null }) {
  const [logins, setLogins] = useState<Login[]>([]);
  const [ready, setReady] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [draft, setDraft] = useState({ ...blank });
  const [busy, setBusy] = useState(false);
  const [shown, setShown] = useState<Record<number, string>>({});
  const [confirmDelete, setConfirmDelete] = useState(0);
  const [search, setSearch] = useState('');

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
      const res = await fetch(`${API}/portal-onboarding/logins`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the logins.');
      setLogins(data.logins || []);
      setReady(data.ready !== false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the logins.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const add = async () => {
    if (!draft.site.trim() || busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/logins`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(draft),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setDraft({ ...blank });
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that.');
    } finally {
      setBusy(false);
    }
  };

  const patch = async (id: number, body: Record<string, unknown>) => {
    try {
      const res = await fetch(`${API}/portal-onboarding/logins/${id}`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not save that.');
      setLogins((rows) => rows.map((r) => (r.id === id ? { ...r, ...data.login } : r)));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save that.');
    }
  };

  const reveal = async (id: number) => {
    if (shown[id] !== undefined) {
      setShown((m) => {
        const next = { ...m };
        delete next[id];
        return next;
      });
      return;
    }
    try {
      const res = await fetch(`${API}/portal-onboarding/logins/${id}/secret`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not read that.');
      setShown((m) => ({ ...m, [id]: data.secret || '' }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read that.');
    }
  };

  const copy = async (id: number) => {
    try {
      let secret = shown[id];
      if (secret === undefined) {
        const res = await fetch(`${API}/portal-onboarding/logins/${id}/secret`, { headers: headers() });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Could not read that.');
        secret = data.secret || '';
      }
      await navigator.clipboard.writeText(secret);
      setError('');
    } catch {
      setError('Could not copy that. Reveal it and copy by hand.');
    }
  };

  const remove = async (id: number) => {
    if (confirmDelete !== id) return setConfirmDelete(id);
    setConfirmDelete(0);
    try {
      const res = await fetch(`${API}/portal-onboarding/logins/${id}/delete`, {
        method: 'POST',
        headers: headers(),
        body: '{}',
      });
      if (!res.ok) throw new Error('Could not delete that.');
      setLogins((rows) => rows.filter((r) => r.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete that.');
    }
  };

  const q = search.trim().toLowerCase();
  const visible = q
    ? logins.filter((l) =>
        [l.site, l.url, l.username, l.notes].some((v) => (v || '').toLowerCase().includes(q)),
      )
    : logins;

  const cell = 'w-full bg-transparent border-0 text-sm text-navy focus:outline-none';

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Key logins</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Admin only</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Passwords are encrypted on the server and only fetched when you press Show.
      </p>

      {!ready && (
        <p className="text-sm font-semibold text-red mb-4">
          The vault key is not set on the server, so nothing can be saved or read yet.
        </p>
      )}

      <div className="border border-gray-200 rounded-lg p-3 mb-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-2">Add a login</p>
        <div className="grid gap-2 sm:grid-cols-5 mb-2">
          {(
            [
              ['site', 'Site *'],
              ['url', 'URL'],
              ['username', 'Username'],
              ['secret', 'Password'],
              ['notes', 'Notes'],
            ] as const
          ).map(([field, label]) => (
            <input
              key={field}
              type={field === 'secret' ? 'password' : 'text'}
              value={draft[field]}
              onChange={(e) => setDraft({ ...draft, [field]: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Enter') add();
              }}
              placeholder={label}
              autoComplete="off"
              className="text-xs border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
            />
          ))}
        </div>
        <button
          onClick={add}
          disabled={busy || !draft.site.trim() || !ready}
          className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-40"
        >
          {busy ? 'Saving…' : 'Add login'}
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="text-xs border border-gray-300 rounded px-2 py-1.5 w-56 mb-3 focus:outline-none focus:border-red"
      />

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {!loading && !visible.length && (
        <p className="text-sm text-gray-500 font-semibold py-6 text-center border border-gray-200 rounded-lg">
          Nothing saved yet.
        </p>
      )}

      {visible.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-lg">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                {['Site', 'URL', 'Username', 'Password', 'Notes', ''].map((h, i) => (
                  <th key={h + i} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visible.map((l) => (
                <tr key={l.id} className="border-t border-gray-100 align-top">
                  <td className="px-3 py-2 min-w-[130px]">
                    <input
                      defaultValue={l.site}
                      onBlur={(e) => e.target.value.trim() !== l.site && patch(l.id, { site: e.target.value })}
                      className={`${cell} font-semibold`}
                    />
                  </td>
                  <td className="px-3 py-2 min-w-[160px]">
                    <input
                      defaultValue={l.url || ''}
                      onBlur={(e) => e.target.value !== (l.url || '') && patch(l.id, { url: e.target.value })}
                      className={cell}
                    />
                    {l.url && (
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-red font-bold hover:underline"
                      >
                        open ↗
                      </a>
                    )}
                  </td>
                  <td className="px-3 py-2 min-w-[140px]">
                    <input
                      defaultValue={l.username || ''}
                      onBlur={(e) =>
                        e.target.value !== (l.username || '') && patch(l.id, { username: e.target.value })
                      }
                      className={cell}
                    />
                  </td>
                  <td className="px-3 py-2 min-w-[190px] whitespace-nowrap">
                    {shown[l.id] !== undefined ? (
                      <input
                        defaultValue={shown[l.id]}
                        onBlur={(e) => e.target.value !== shown[l.id] && patch(l.id, { secret: e.target.value })}
                        className={`${cell} font-mono`}
                      />
                    ) : (
                      <span className="text-gray-400 font-mono">{l.hasSecret ? '••••••••' : '—'}</span>
                    )}
                    <span className="flex items-center gap-2 mt-1">
                      <button onClick={() => reveal(l.id)} className="text-[10px] font-bold text-red hover:underline">
                        {shown[l.id] !== undefined ? 'Hide' : 'Show'}
                      </button>
                      {!!l.hasSecret && (
                        <button onClick={() => copy(l.id)} className="text-[10px] font-bold text-navy hover:underline">
                          Copy
                        </button>
                      )}
                    </span>
                  </td>
                  <td className="px-3 py-2 min-w-[180px]">
                    <textarea
                      defaultValue={l.notes || ''}
                      rows={1}
                      onBlur={(e) => e.target.value !== (l.notes || '') && patch(l.id, { notes: e.target.value })}
                      className={`${cell} resize-y`}
                    />
                  </td>
                  <td className="px-3 py-2 text-right whitespace-nowrap">
                    <button
                      onClick={() => remove(l.id)}
                      onBlur={() => setConfirmDelete((d) => (d === l.id ? 0 : d))}
                      className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${
                        confirmDelete === l.id
                          ? 'bg-red text-white hover:bg-red-dark'
                          : 'border border-gray-300 text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {confirmDelete === l.id ? 'Delete?' : '×'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="text-[11px] text-gray-500 mt-3">
        Encrypted at rest, but the key sits on the same server as the database — this is for the many small
        logins, not for anything that would really hurt to lose.
      </p>
    </div>
  );
}
