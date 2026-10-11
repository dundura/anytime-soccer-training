'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * The User support pages, laid out like the Coach Onboarding board: a heading, status pills with counts, a search box,
 * a table, and a drawer on the right that opens from a row.
 *
 * Two pages share it. Customer callbacks lists everyone who answered Yes to "Would you like to speak to a member of the
 * team for assistance?" in the monthly check-in. Tips and suggestions lists what people said they could not find (the
 * skill area, or what they wrote under "What were you looking for?"). Nothing is deleted from here.
 */

const API = 'https://api.anytime-soccer.com';

type Mode = 'callbacks' | 'suggestions';
type Row = {
  id: number;
  childId: number;
  month: string;
  createdAt: string;
  isCoach: number;
  howToTrain?: string | null;
  findProgram: string | null;
  lookingFor: string | null;
  assignFolders?: string | null;
  challenges?: string | null;
  wantsHelp?: string | null;
  screenname: string | null;
  firstname: string | null;
  childEmail: string | null;
  status: string;
  note: string | null;
  statusAt: string | null;
  firstEmailAt?: string | null;
  triedEmailAt?: string | null;
  bookEmailAt?: string | null;
  emailKind?: string | null;
  emailAt?: string | null;
};

const CONFIG: Record<Mode, {
  title: string;
  blurb: string;
  path: string;
  listKey: 'callbacks' | 'suggestions';
  statuses: { key: string; label: string; tint: string }[];
  first: string;
  searchHint: string;
  empty: string;
  notePlaceholder: string;
}> = {
  callbacks: {
    title: 'Customer callbacks',
    blurb: 'People who asked to speak to a member of the team.',
    path: 'customer-callbacks',
    listKey: 'callbacks',
    statuses: [
      { key: 'to_call', label: 'To call', tint: 'bg-red text-white' },
      { key: 'called', label: 'Called', tint: 'bg-amber-500 text-white' },
      { key: 'done', label: 'Done', tint: 'bg-emerald-600 text-white' },
    ],
    first: 'to_call',
    searchHint: 'Search name or email',
    empty: 'Nobody is waiting for a call.',
    notePlaceholder: 'Notes from the call',
  },
  suggestions: {
    title: 'Tips and suggestions',
    blurb: 'What people told us they could not find.',
    path: 'customer-callbacks/suggestions',
    listKey: 'suggestions',
    statuses: [
      { key: 'new', label: 'New', tint: 'bg-red text-white' },
      { key: 'reviewed', label: 'Reviewed', tint: 'bg-amber-500 text-white' },
      { key: 'done', label: 'Done', tint: 'bg-emerald-600 text-white' },
    ],
    first: 'new',
    searchHint: 'Search name, email or what they wrote',
    empty: 'No suggestions yet.',
    notePlaceholder: 'What you did about it',
  },
};

const HOW: Record<string, string> = { easy: 'Yes, easily', mostly: 'Mostly', lost: 'Lost' };
const FIND: Record<string, string> = { yes: 'Yes', sometimes: 'Sometimes', no: 'No' };

const ago = (v: string | null) => {
  if (!v) return '';
  const ms = Date.now() - new Date(v).getTime();
  if (isNaN(ms)) return '';
  const mins = Math.floor(ms / 60000);
  if (mins < 60) return mins + 'm';
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs + 'h';
  return Math.floor(hrs / 24) + 'd';
};
const stamp = (v: string) =>
  new Date(v).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

export default function SupportBoard({ token, mode }: { token: string | null; mode: Mode }) {
  const cfg = CONFIG[mode];
  const [rows, setRows] = useState<Row[]>([]);
  const [filter, setFilter] = useState<string>(cfg.first);
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  // Which callback email is waiting on a yes, and which one is going out.
  const [preview, setPreview] = useState<{ kind: string; subject: string; to: string; html: string } | null>(null);
  const [previewing, setPreviewing] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sentNote, setSentNote] = useState('');

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
      const res = await fetch(`${API}/${cfg.path}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load this page.');
      setRows(d[cfg.listKey] || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load this page.');
    } finally {
      setLoading(false);
    }
  }, [cfg.path, cfg.listKey, headers]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async (id: number, patch: { status?: string; note?: string }) => {
    setRows((list) => list.map((r) => (r.id === id ? { ...r, ...patch, statusAt: new Date().toISOString() } : r)));
    try {
      const res = await fetch(`${API}/${cfg.path}/${id}`, { method: 'PATCH', headers: headers(), body: JSON.stringify(patch) });
      if (!res.ok) throw new Error();
    } catch {
      setError('That did not save. Reloading.');
      load();
    }
  };

  const sendCallbackEmail = async (row: Row, kind: 'first' | 'tried') => {
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API}/${cfg.path}/${row.id}/email`, { method: 'POST', headers: headers(), body: JSON.stringify({ kind }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not send that email.');
      const at = new Date().toISOString();
      setRows((list) => list.map((x) => (x.id === row.id ? { ...x, [kind === 'first' ? 'firstEmailAt' : 'triedEmailAt']: at } : x)));
      setSentNote('Sent to ' + (d.sentTo || row.childEmail));
      setPreview(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send that email.');
    } finally {
      setSending(false);
    }
  };

  // Tips and suggestions: a reply by hand, one of three.
  const sendSuggestionEmail = async (row: Row, kind: string) => {
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API}/${cfg.path}/${row.id}/email`, { method: 'POST', headers: headers(), body: JSON.stringify({ kind }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not send that email.');
      setRows((list) => list.map((x) => (x.id === row.id ? { ...x, emailKind: kind, emailAt: new Date().toISOString() } : x)));
      setSentNote('Sent to ' + (d.sentTo || row.childEmail));
      setPreview(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send that email.');
    } finally {
      setSending(false);
    }
  };

  // Every email is looked at before it goes: this fetches it as it would be sent, shows it, and the Send is in the preview.
  const openPreview = async (row: Row, kind: string) => {
    setPreviewing(kind);
    setError('');
    setSentNote('');
    try {
      const res = await fetch(`${API}/${cfg.path}/${row.id}/preview`, { method: 'POST', headers: headers(), body: JSON.stringify({ kind }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not build the preview.');
      setPreview({ kind, subject: d.subject, to: d.to, html: d.html });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not build the preview.');
    } finally {
      setPreviewing(null);
    }
  };

  const nameOf = (r: Row) => r.screenname || r.firstname || 'Unknown';
  const counts: Record<string, number> = {};
  rows.forEach((r) => { counts[r.status] = (counts[r.status] || 0) + 1; });
  const q = search.trim().toLowerCase();
  const shown = rows.filter((r) => {
    if (filter && r.status !== filter) return false;
    if (!q) return true;
    return [nameOf(r), r.childEmail, r.lookingFor].filter(Boolean).join(' ').toLowerCase().includes(q);
  });
  const current = rows.find((r) => r.id === openId) || null;
  const tintOf = (s: string) => cfg.statuses.find((x) => x.key === s)?.tint || 'bg-gray-200 text-gray-700';
  const labelOf = (s: string) => cfg.statuses.find((x) => x.key === s)?.label || s;

  const answers = (r: Row) => {
    const out: [string, string][] = [];
    out.push([r.isCoach ? 'Assign a plan' : 'Create a plan', HOW[r.howToTrain || ''] || '—']);
    if (r.isCoach) {
      out.push(['Assign folders', HOW[r.assignFolders || ''] || '—']);
      out.push(['Challenges and contests', HOW[r.challenges || ''] || '—']);
    } else {
      out.push(['Finds the videos', FIND[r.findProgram || ''] || '—']);
    }
    return out;
  };

  return (
    <div className="mb-6 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h2 className="text-lg font-black text-navy">{cfg.title}</h2>
        <button onClick={load} className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">Refresh</button>
      </div>
      <p className="text-xs text-gray-500 mb-4">{cfg.blurb}</p>

      {error && <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}

      <div className="flex flex-wrap gap-2 mb-3">
        {cfg.statuses.map((s) => (
          <button
            key={s.key}
            onClick={() => setFilter(s.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold ${filter === s.key ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {s.label} ({counts[s.key] || 0})
          </button>
        ))}
        <button
          onClick={() => setFilter('')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold ${filter === '' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          All ({rows.length})
        </button>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={cfg.searchHint}
          className="ml-auto px-3 py-1.5 rounded-lg border border-gray-200 text-xs w-full sm:w-64"
        />
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                <th className="text-left px-3 py-2">Person</th>
                <th className="text-left px-3 py-2 hidden sm:table-cell">{mode === 'suggestions' ? 'Looking for / check-in' : 'Check-in'}</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2 hidden md:table-cell">Asked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={4} className="px-3 py-6 text-center text-gray-400 text-xs">Loading…</td></tr>}
              {!loading && shown.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-8 text-center text-gray-400 text-xs">{filter === cfg.first || filter === '' ? cfg.empty : 'Nothing here.'}</td></tr>
              )}
              {shown.map((r) => (
                <tr key={r.id} onClick={() => { setOpenId(r.id); setNote(r.note || ''); setPreview(null); setSentNote(''); }} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 py-2.5">
                    <div className="font-bold text-navy">
                      {nameOf(r)}
                      {r.isCoach ? <span className="ml-2 align-middle px-1.5 py-0.5 rounded-full bg-navy text-white text-[9px] font-bold uppercase">Coach</span> : null}
                    </div>
                    <div className="text-[11px] text-gray-500">{r.childEmail || ''}</div>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell text-gray-600 text-xs">
                    {mode === 'suggestions' && r.lookingFor
                      ? r.lookingFor
                      : answers(r).map(([k, v]) => `${k}: ${v}`).join(' · ')}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${tintOf(r.status)}`}>{labelOf(r.status)}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-xs text-gray-600">
                    {stamp(r.createdAt)}<span className="text-[10px] text-gray-400"> · {ago(r.createdAt)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email preview: nothing goes until Send is pressed in here */}
      {preview && current && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-3 border-b border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">From Neil Crawford</div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">To {preview.to || 'no email address'}</div>
              <div className="mt-1 text-sm font-semibold text-navy">{preview.subject}</div>
            </div>
            <iframe title="Email preview" srcDoc={preview.html} className="w-full flex-1 min-h-[360px] border-0 bg-gray-50" />
            <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setPreview(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button
                onClick={() => (mode === 'callbacks' ? sendCallbackEmail(current, preview.kind as 'first' | 'tried') : sendSuggestionEmail(current, preview.kind))}
                disabled={sending || !preview.to}
                className="px-4 py-2 rounded-lg bg-red text-white text-xs font-bold disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer */}
      {openId && current && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setOpenId(null)}>
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between gap-3">
              <div>
                <div className="text-base font-black text-navy">{nameOf(current)}</div>
                <div className="text-[11px] text-gray-500 select-all">{current.childEmail || ''}</div>
              </div>
              <button onClick={() => setOpenId(null)} className="text-gray-400 text-xl leading-none">×</button>
            </div>

            <div className="px-5 py-4 space-y-5">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Status</div>
                <div className="flex flex-wrap gap-1.5">
                  {cfg.statuses.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => save(current.id, { status: s.key })}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${current.status === s.key ? s.tint : 'bg-gray-100 text-gray-600'}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'callbacks' && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Email</div>
                  {sentNote && <div className="mb-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{sentNote}</div>}
                  <div className="space-y-2">
                    {([
                      ['first', 'Thanks for taking our feedback survey', current.firstEmailAt],
                      ['tried', 'I tried to give you a call', current.triedEmailAt],
                    ] as const).map(([kind, label, sentAt]) => (
                      <div key={kind} className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-navy">{label}</div>
                          <div className="text-[11px] text-gray-500">{sentAt ? 'Sent ' + stamp(sentAt) + ' · ' + ago(sentAt) + ' ago' : 'Not sent yet'}</div>
                        </div>
                        <button onClick={() => openPreview(current, kind)} disabled={!!previewing || !current.childEmail} className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">
                            {previewing === kind ? 'Opening…' : sentAt ? 'Send again' : 'Send'}
                          </button>
                      </div>
                    ))}
                    {/* The third goes by itself, 12 hours after the second. */}
                    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-navy">We did not connect</div>
                        <div className="text-[11px] text-gray-500">
                          {current.bookEmailAt
                            ? 'Sent ' + stamp(current.bookEmailAt) + ' · ' + ago(current.bookEmailAt) + ' ago'
                            : current.triedEmailAt
                              ? 'Goes out by itself 12 hours after the "tried to call" email'
                              : 'Goes out by itself 12 hours after you send "I tried to give you a call"'}
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Automatic</span>
                    </div>
                  </div>
                </div>
              )}

              {mode === 'suggestions' && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Reply by email</div>
                  {sentNote && <div className="mb-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{sentNote}</div>}
                  <div className="space-y-2">
                    {([
                      ['dribbling', 'Finding Dribbling'],
                      ['turns', 'Finding Turns & Escapes'],
                      ['plan', 'Creating a training plan'],
                    ] as const).map(([kind, label]) => (
                      <div key={kind} className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-navy">{label}</div>
                          <div className="text-[11px] text-gray-500">
                            {current.emailKind === kind && current.emailAt ? 'Sent ' + stamp(current.emailAt) + ' · ' + ago(current.emailAt) + ' ago' : 'Not sent'}
                          </div>
                        </div>
                        <button onClick={() => openPreview(current, kind)} disabled={!!previewing || !current.childEmail} className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">
                            {previewing === kind ? 'Opening…' : current.emailKind === kind ? 'Send again' : 'Send'}
                          </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Asked</span>
                  <div className="mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs">{stamp(current.createdAt)}</div>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Account</span>
                  <div className="mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs">{current.isCoach ? 'Coach' : 'Player'}</div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Their check-in</div>
                <div className="rounded-xl border border-gray-200 divide-y divide-gray-100">
                  {answers(current).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-bold text-navy">{v}</span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between gap-3 px-3 py-2 text-xs">
                    <span className="text-gray-500">Speak to the team</span>
                    <span className={`font-bold ${current.wantsHelp === 'yes' || mode === 'callbacks' ? 'text-red' : 'text-navy'}`}>
                      {current.wantsHelp === 'yes' || mode === 'callbacks' ? 'Yes' : 'Not at the moment'}
                    </span>
                  </div>
                </div>
              </div>

              {current.lookingFor && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">They were looking for</div>
                  <div className="rounded-xl bg-navy/5 border border-navy/10 px-3 py-2 text-sm text-navy font-semibold">{current.lookingFor}</div>
                </div>
              )}

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Notes</div>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  onBlur={() => { if (note !== (current.note || '')) save(current.id, { note }); }}
                  rows={5}
                  placeholder={cfg.notePlaceholder}
                  className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
