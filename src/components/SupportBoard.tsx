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
  reminderEmailAt?: string | null;
  triedEmailAt?: string | null;
  bookEmailAt?: string | null;
  emailKind?: string | null;
  emailAt?: string | null;
  tipsEmailAt?: string | null;
  helpFollowUpAt?: string | null;
  bmFollowUpAt?: string | null;
  turnsFollowUpAt?: string | null;
  jugFollowUpAt?: string | null;
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
      { key: 'reviewed', label: 'Email sent', tint: 'bg-amber-500 text-white' },
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
  // Tips and suggestions: add a person by hand.
  const [adding, setAdding] = useState(false);
  const [newPerson, setNewPerson] = useState({ name: '', email: '', lookingFor: '' });
  const [addBusy, setAddBusy] = useState(false);
  // Deleting a row: the row asks, in place, before anything goes.
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Tips and suggestions: which group of replies is open. Both start shut: just the two headers until one is opened.
  const [openGroup, setOpenGroup] = useState<'players' | 'coaches' | null>(null);
  // The Finding Skill areas sub-section inside For players. Shut until opened.
  const [subsOpen, setSubsOpen] = useState<Record<string, boolean>>({});
  // Callbacks: the emails sit under one header, For players or For coaches, whichever this person is. Shut until opened.
  const [callbackGroupOpen, setCallbackGroupOpen] = useState(false);
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

  const sendCallbackEmail = async (row: Row, kind: 'first' | 'reminder' | 'tried') => {
    setSending(true);
    setError('');
    try {
      const res = await fetch(`${API}/${cfg.path}/${row.id}/email`, { method: 'POST', headers: headers(), body: JSON.stringify({ kind }) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not send that email.');
      const at = new Date().toISOString();
      setRows((list) => list.map((x) => (x.id === row.id ? { ...x, [kind === 'first' ? 'firstEmailAt' : kind === 'reminder' ? 'reminderEmailAt' : 'triedEmailAt']: at } : x)));
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

  const addPerson = async () => {
    if (addBusy) return;
    setAddBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}/${cfg.path}`, { method: 'POST', headers: headers(), body: JSON.stringify(newPerson) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not add them.');
      setAdding(false);
      setNewPerson({ name: '', email: '', lookingFor: '' });
      setFilter(cfg.first);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not add them.');
    } finally {
      setAddBusy(false);
    }
  };

  const removeRow = async (id: number) => {
    setDeleting(true);
    setError('');
    try {
      const res = await fetch(`${API}/${cfg.path}/${id}`, { method: 'DELETE', headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not delete that.');
      setRows((list) => list.filter((x) => x.id !== id));
      setConfirmDelete(null);
      if (openId === id) setOpenId(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not delete that.');
    } finally {
      setDeleting(false);
    }
  };

  // The last email that went to this person, and when. The name of the email is the half worth reading in the table.
  const lastEmail = (r: Row): { label: string; at: string } | null => {
    const sent: { label: string; at: string | null | undefined }[] = mode === 'callbacks'
      ? [
        { label: 'Thanks for taking our feedback survey', at: r.firstEmailAt },
        { label: 'A quick reminder', at: r.reminderEmailAt },
        { label: 'I tried to give you a call', at: r.triedEmailAt },
        { label: 'We did not connect', at: r.bookEmailAt },
      ]
      : [
        { label: 'A few finishing tips', at: r.tipsEmailAt },
        { label: 'If you need help', at: r.helpFollowUpAt },
        { label: 'Where to start with Ball Mastery', at: r.bmFollowUpAt },
        { label: 'Where to start with Turns & Escapes', at: r.turnsFollowUpAt },
        { label: 'Where to start with Juggling', at: r.jugFollowUpAt },
        {
        label: ({
          help: 'What would you like help with?', who: 'Player or parent?', dribbling: 'Finding Dribbling', turns: 'Finding Turns & Escapes', finishing: 'Finding Finishing', ballMastery: 'Finding Ball Mastery', juggling: 'Finding Juggling', moves: 'Finding 1v1 Moves', fitness: 'Finding Fitness & Agility',
          plan: 'Creating a training plan', planMostly: 'Mostly understand training plans', mixed: 'Mixed Drills', coachHelp: 'What would you like help with?', coachMostly: 'Some things you may not know', coachCall: 'A quick moment to speak',
          coachPlan: 'Assigning a training plan', coachFolders: 'Assigning training folders', coachChallenges: 'Creating challenges and contests',
        } as Record<string, string>)[r.emailKind || ''] || r.emailKind || '',
        at: r.emailAt,
      }];
    let best: { label: string; at: string } | null = null;
    sent.forEach((e) => {
      if (!e.at || !e.label) return;
      if (!best || new Date(e.at).getTime() > new Date(best.at).getTime()) best = { label: e.label, at: e.at };
    });
    return best;
  };

  const emailRow = (cur: Row, kind: string, label: string) => (
    <div key={kind} className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                                      <div className="min-w-0 flex-1">
                                        <div className="text-xs font-bold text-navy">{label}</div>
                                        <div className="text-[11px] text-gray-500">
                                          {cur.emailKind === kind && cur.emailAt ? 'Sent ' + stamp(cur.emailAt) + ' · ' + ago(cur.emailAt) + ' ago' : 'Not sent'}
                                        </div>
                                      </div>
                                      <button onClick={() => openPreview(cur, kind)} disabled={!!previewing || !cur.childEmail} className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">
                                        {previewing === kind ? 'Opening…' : cur.emailKind === kind ? 'Send again' : 'Send'}
                                      </button>
                                    </div>
  );

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
        <span className="inline-flex gap-2">
          {mode === 'suggestions' && <button onClick={() => setAdding(true)} className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">+ Add a person</button>}
          <button onClick={load} className="px-3 py-2 rounded-lg border border-gray-200 text-gray-700 text-xs font-bold">Refresh</button>
        </span>
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
                <th className="text-left px-3 py-2 hidden md:table-cell">Last email</th>
                <th className="px-3 py-2 w-10"><span className="sr-only">Delete</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-400 text-xs">Loading…</td></tr>}
              {!loading && shown.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-gray-400 text-xs">{filter === cfg.first || filter === '' ? cfg.empty : 'Nothing here.'}</td></tr>
              )}
              {shown.map((r) => (
                <tr key={r.id} onClick={() => { setOpenId(r.id); setNote(r.note || ''); setPreview(null); setSentNote(''); setOpenGroup(null); setSubsOpen({}); setCallbackGroupOpen(false); }} className="cursor-pointer hover:bg-gray-50">
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
                    {(() => {
                      const le = lastEmail(r);
                      return le
                        ? <>{le.label}<span className="text-[10px] text-gray-400"> · {ago(le.at)}</span></>
                        : <span className="text-gray-300">&mdash;</span>;
                    })()}
                  </td>
                  {/* Confirms in the row: the row IS the thing being deleted. stopPropagation, or the click opens the drawer. */}
                  <td className="px-3 py-2.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    {confirmDelete === r.id ? (
                      <span className="inline-flex gap-1">
                        <button onClick={() => removeRow(r.id)} disabled={deleting} className="px-2 py-1 rounded-lg bg-red text-white text-[10px] font-bold disabled:opacity-50">Delete</button>
                        <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500">Keep</button>
                      </span>
                    ) : (
                      <button onClick={() => setConfirmDelete(r.id)} title="Delete this record" className="text-gray-300 hover:text-red text-base leading-none px-1">&times;</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add a person to Tips and suggestions */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-navy mb-3">Add a person</h3>
            <input value={newPerson.name} onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })} placeholder="Name" className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <input value={newPerson.email} onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })} placeholder="Email" className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <textarea value={newPerson.lookingFor} onChange={(e) => setNewPerson({ ...newPerson, lookingFor: e.target.value })} rows={3} placeholder="What they are looking for" className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm" />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setAdding(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={addPerson} disabled={addBusy || !newPerson.name.trim() || !newPerson.email.trim() || !newPerson.lookingFor.trim()} className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold disabled:opacity-50">
                {addBusy ? 'Adding…' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

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
                onClick={() => (mode === 'callbacks' ? sendCallbackEmail(current, preview.kind as 'first' | 'reminder' | 'tried') : sendSuggestionEmail(current, preview.kind))}
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
                  <div className="rounded-xl border border-gray-200 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setCallbackGroupOpen((v) => !v)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-left bg-gray-50 hover:bg-gray-100"
                      aria-expanded={callbackGroupOpen}
                    >
                      <span className="text-[11px] text-gray-400">{callbackGroupOpen ? '▾' : '▸'}</span>
                      <span className="text-sm font-extrabold text-navy">{current.isCoach ? 'For coaches' : 'For players'}</span>
                      <span className="text-[11px] font-bold text-gray-400">4</span>
                    </button>
                    {callbackGroupOpen && (
                      <div className="p-2">
                  <div className="space-y-2">
                    {/* The order they go in. First and "I tried to give you a call" are sent by hand; the reminder and "We did not
                        connect" go by themselves, 12 hours after the one before. */}
                    {([
                      { kind: 'first', label: 'Thanks for taking our feedback survey', at: current.firstEmailAt, auto: false, hint: '' },
                      {
                        kind: 'reminder', label: 'A quick reminder', at: current.reminderEmailAt, auto: true,
                        hint: current.firstEmailAt ? 'Goes out by itself 12 hours after the first email' : 'Goes out by itself 12 hours after you send the first email',
                      },
                      { kind: 'tried', label: 'I tried to give you a call', at: current.triedEmailAt, auto: false, hint: '' },
                      {
                        kind: 'book', label: 'We did not connect', at: current.bookEmailAt, auto: true,
                        hint: current.triedEmailAt ? 'Goes out by itself 12 hours after the "tried to call" email' : 'Goes out by itself 12 hours after you send "I tried to give you a call"',
                      },
                    ]).map((e) => (
                      <div key={e.kind} className="flex flex-wrap items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold text-navy">{e.label}</div>
                          <div className="text-[11px] text-gray-500">
                            {e.at ? 'Sent ' + stamp(e.at) + ' · ' + ago(e.at) + ' ago' : e.auto ? e.hint : 'Not sent yet'}
                          </div>
                        </div>
                        {e.auto ? (
                          <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Automatic</span>
                        ) : (
                          <button onClick={() => openPreview(current, e.kind)} disabled={!!previewing || !current.childEmail} className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">
                            {previewing === e.kind ? 'Opening…' : e.at ? 'Send again' : 'Send'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {mode === 'suggestions' && (
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Reply by email</div>
                  {sentNote && <div className="mb-2 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{sentNote}</div>}
                  {(() => {
                    const groups: { key: 'players' | 'coaches'; title: string; emails: [string, string][]; subs?: { title: string; emails: [string, string][] }[] }[] = [
                      { key: 'players', title: 'For players', emails: [], subs: [{ title: 'Completely lost', emails: [['help', 'What would you like help with?'], ['who', 'Player or parent?']] }, { title: 'Finding training plans', emails: [['plan', 'Creating a training plan'], ['planMostly', 'Mostly understand training plans']] }, { title: 'Finding Skill areas', emails: [['dribbling', 'Finding Dribbling'], ['turns', 'Finding Turns & Escapes'], ['finishing', 'Finding Finishing'], ['ballMastery', 'Finding Ball Mastery'], ['juggling', 'Finding Juggling'], ['moves', 'Finding 1v1 Moves'], ['fitness', 'Finding Fitness & Agility'], ['mixed', 'Mixed Drills']] }] },
                      { key: 'coaches', title: 'For coaches', emails: [['coachHelp', 'What would you like help with?'], ['coachMostly', 'Some things you may not know'], ['coachCall', 'A quick moment to speak']] },
                    ];
                    const shownGroup = openGroup;
                    return (
                      <div className="space-y-2">
                        {groups.map((g) => {
                          const isOpen = shownGroup === g.key;
                          return (
                            <div key={g.key} className="rounded-xl border border-gray-200 overflow-hidden">
                              <button
                                type="button"
                                onClick={() => setOpenGroup(isOpen ? null : g.key)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 text-left bg-gray-50 hover:bg-gray-100"
                                aria-expanded={isOpen}
                              >
                                <span className="text-[11px] text-gray-400">{isOpen ? '▾' : '▸'}</span>
                                <span className="text-sm font-extrabold text-navy">{g.title}</span>
                                <span className="text-[11px] font-bold text-gray-400">{g.emails.length + (g.subs ? g.subs.reduce((n, x) => n + x.emails.length, 0) : 0)}</span>
                              </button>
                              {isOpen && (
                                <div className="space-y-2 p-2">
                                  {g.emails.map(([kind, label]) => emailRow(current, kind, label))}
                                  {g.subs && g.subs.map((sub) => (
                                    <div key={sub.title} className="rounded-xl border border-gray-200 overflow-hidden">
                                      <button
                                        type="button"
                                        onClick={() => setSubsOpen((m) => ({ ...m, [sub.title]: !m[sub.title] }))}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-left bg-gray-50 hover:bg-gray-100"
                                        aria-expanded={!!subsOpen[sub.title]}
                                      >
                                        <span className="text-[11px] text-gray-400">{subsOpen[sub.title] ? '▾' : '▸'}</span>
                                        <span className="text-xs font-extrabold text-navy">{sub.title}</span>
                                        <span className="text-[11px] font-bold text-gray-400">{sub.emails.length}</span>
                                      </button>
                                      {subsOpen[sub.title] && (
                                        <div className="space-y-2 p-2">
                                          {sub.emails.map(([kind, label]) => emailRow(current, kind, label))}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })()}
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

              {current.childId > 0 && (
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
              )}

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
