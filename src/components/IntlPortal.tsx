'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * International requests: the same board as the demo requests (stage pills, a list, a drawer with a
 * timeline) with its own stages and its own email sequence. Somebody abroad asked to post a trip;
 * they move New request -> Contacted -> Post live, or Not now.
 */

const API = 'https://api.anytime-soccer.com';

type Stage = 'New request' | 'Contacted' | 'Post live' | 'Not now';

type Lead = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  location: string | null;
  website: string | null;
  stage: Stage;
  notes: string | null;
  requestedAt: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  lastEmail: string | null;
  lastEmailAt: string | null;
};

type Activity = { id: number; type: string; summary: string | null; body: string | null; occurredAt: string | null };
type SeqEmail = { id: number; emailKey: string; sequence: string; position: number; subject: string; delayDays: number | null };

const STAGE_TINT: Record<string, string> = {
  'New request': 'bg-amber-500 text-white',
  Contacted: 'bg-blue-600 text-white',
  'Post live': 'bg-emerald-600 text-white',
  'Not now': 'bg-gray-400 text-white',
};

const ACTIVITY_ICON: Record<string, string> = {
  email_sent: '✉️',
  call: '📞',
  note: '📝',
  stage_changed: '➡️',
};

const when = (v: string | null) => {
  if (!v) return '—';
  const d = new Date(v);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

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

export default function IntlPortal({ token }: { token: string | null }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [stages, setStages] = useState<Stage[]>([]);
  const [emails, setEmails] = useState<SeqEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [stageFilter, setStageFilter] = useState<Stage>('New request');
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(null);
  const [detail, setDetail] = useState<{ lead: Lead; activities: Activity[] } | null>(null);
  const [busy, setBusy] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [callDraft, setCallDraft] = useState('');
  const [preview, setPreview] = useState<{ row: SeqEmail; subject: string; html: string } | null>(null);
  const [showSequence, setShowSequence] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', organization: '', location: '' });
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

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
      const params = new URLSearchParams();
      if (stageFilter) params.set('stage', stageFilter);
      if (search.trim()) params.set('search', search.trim());
      const res = await fetch(`${API}/intl-portal/leads?${params.toString()}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load the international requests.');
      setLeads(d.leads || []);
      setCounts(d.counts || {});
      setStages(d.stages || []);
      setEmails(d.emails || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the international requests.');
    } finally {
      setLoading(false);
    }
  }, [headers, stageFilter, search]);

  useEffect(() => { load(); }, [load]);

  const openLead = useCallback(async (id: number) => {
    setOpenId(id);
    setDetail(null);
    setPreview(null);
    setNoteDraft('');
    setCallDraft('');
    try {
      const res = await fetch(`${API}/intl-portal/leads/${id}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load that request.');
      setDetail(d);
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Could not load that request.');
      setOpenId(null);
    }
  }, [headers]);

  // Every change goes through here, so the row and the drawer are both re-read from the server.
  const act = useCallback(async (key: string, url: string, init: RequestInit, ok: string) => {
    if (busy) return null;
    setBusy(key);
    try {
      const res = await fetch(url, init);
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'That did not work.');
      flash(ok);
      await load();
      if (openId) await openLead(openId);
      return d;
    } catch (e) {
      flash(e instanceof Error ? e.message : 'That did not work.');
      return null;
    } finally {
      setBusy('');
    }
  }, [busy, load, openId, openLead]);

  const setStage = (lead: Lead, stage: Stage) =>
    act('stage', `${API}/intl-portal/leads/${lead.id}`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ stage }) }, 'Moved to ' + stage);

  const saveField = (lead: Lead, field: string, value: string) =>
    act('field:' + field, `${API}/intl-portal/leads/${lead.id}`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ [field]: value }) }, 'Saved');

  const addNote = (lead: Lead) => {
    if (!noteDraft.trim()) return;
    act('note', `${API}/intl-portal/leads/${lead.id}/note`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ body: noteDraft }) }, 'Note added')
      .then(() => setNoteDraft(''));
  };

  const logCall = (lead: Lead, outcome: string) =>
    act('call', `${API}/intl-portal/leads/${lead.id}/call`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ outcome, body: callDraft }) }, 'Call logged')
      .then(() => setCallDraft(''));

  // Preview first, always: nothing goes to somebody abroad that has not been read.
  const openPreview = async (row: SeqEmail) => {
    setBusy('preview:' + row.id);
    try {
      const res = await fetch(`${API}/newsletters/emails/${row.id}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load that email.');
      setPreview({ row, subject: d.email?.subject || row.subject, html: d.email?.html || '' });
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Could not load that email.');
    } finally {
      setBusy('');
    }
  };

  const sendPreview = (lead: Lead) => {
    if (!preview) return;
    act('send', `${API}/intl-portal/leads/${lead.id}/email`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ emailKey: preview.row.emailKey }) }, 'Sent to ' + lead.email)
      .then(() => setPreview(null));
  };

  const createLead = async () => {
    if (!newLead.name.trim() && !newLead.email.trim() && !newLead.organization.trim()) { flash('A name, an organisation or an email.'); return; }
    const d = await act('create', `${API}/intl-portal/leads`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(newLead) }, 'Added');
    if (d) { setAdding(false); setNewLead({ name: '', email: '', phone: '', organization: '', location: '' }); }
  };

  const remove = async (id: number) => {
    await act('delete', `${API}/intl-portal/leads/${id}`, { method: 'DELETE', headers: headers() }, 'Deleted');
    setConfirmDelete(null);
    setOpenId((cur) => (cur === id ? null : cur));
  };

  const current = detail?.lead || leads.find((l) => l.id === openId) || null;

  // Which emails this person has had, read off their own timeline.
  const sentSubjects = new Set(
    (detail?.activities || []).filter((a) => a.type === 'email_sent').map((a) => String(a.summary || '').split(' → ')[0].toLowerCase())
  );
  const alreadySent = (subject: string) => sentSubjects.has(subject.toLowerCase());

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h2 className="text-lg font-black text-navy">International requests</h2>
        <button onClick={() => setAdding(true)} className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">+ Add a request</button>
      </div>

      {note && <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{note}</div>}
      {error && <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}

      <div className="flex flex-wrap gap-2 mb-3">
        {stages.map((s) => (
          <button
            key={s}
            onClick={() => setStageFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold ${stageFilter === s ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
          >
            {s} ({counts[s] || 0})
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, email, country"
          className="ml-auto px-3 py-1.5 rounded-lg border border-gray-200 text-xs w-full sm:w-64"
        />
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                <th className="text-left px-3 py-2">Who</th>
                <th className="text-left px-3 py-2">Stage</th>
                <th className="text-left px-3 py-2 hidden md:table-cell">Last action</th>
                <th className="px-3 py-2 w-10"><span className="sr-only">Delete</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={4} className="px-3 py-6 text-center text-gray-400 text-xs">Loading…</td></tr>}
              {!loading && leads.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-8 text-center text-gray-400 text-xs">Nobody here.</td></tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} onClick={() => openLead(l.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 py-2.5">
                    <div className="font-bold text-navy">{l.organization || l.name || l.email}</div>
                    <div className="text-[11px] text-gray-500">{[l.name, l.email, l.location].filter(Boolean).join(' · ')}</div>
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${STAGE_TINT[l.stage] || 'bg-gray-200 text-gray-700'}`}>{l.stage}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-xs text-gray-600">
                    {l.lastEmail
                      ? <>{l.lastEmail.split(' → ')[0]}<span className="text-[10px] text-gray-400"> · {ago(l.lastEmailAt)}</span></>
                      : <span className="text-gray-300">&mdash;</span>}
                  </td>
                  <td className="px-3 py-2.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    {confirmDelete === l.id ? (
                      <span className="inline-flex gap-1">
                        <button onClick={() => remove(l.id)} disabled={busy === 'delete'} className="px-2 py-1 rounded-lg bg-red text-white text-[10px] font-bold disabled:opacity-50">Delete</button>
                        <button onClick={() => setConfirmDelete(null)} className="px-2 py-1 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500">Keep</button>
                      </span>
                    ) : (
                      <button onClick={() => setConfirmDelete(l.id)} title="Delete" className="text-gray-300 hover:text-red text-base leading-none px-1">&times;</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The sequence, collapsed until it is asked for */}
      <div className="border border-gray-200 rounded-xl bg-white mt-4 overflow-hidden">
        <button onClick={() => setShowSequence((v) => !v)} className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50">
          <span className="text-xs font-bold uppercase tracking-wide text-navy">
            &#9993;&#65039; The email sequence <span className="text-gray-400 font-semibold normal-case tracking-normal">({emails.length} emails)</span>
          </span>
          <span className="text-gray-400 text-xs">{showSequence ? '▴' : '▾'}</span>
        </button>
        {showSequence && (
          <div className="border-t border-gray-100 divide-y divide-gray-100">
            {emails.map((e, i) => (
              <div key={e.id} className="flex gap-3 px-4 py-3">
                <span className="w-6 h-6 shrink-0 rounded-full bg-navy text-white text-[11px] font-black flex items-center justify-center">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-navy">{e.subject}</div>
                  {e.delayDays ? <div className="text-[11px] text-gray-500 mt-0.5">After {e.delayDays} day{e.delayDays === 1 ? '' : 's'}</div> : null}
                </div>
                <button onClick={() => openPreview(e)} disabled={!!busy} className="shrink-0 self-start px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold hover:bg-gray-200 disabled:opacity-50">
                  {busy === 'preview:' + e.id ? '…' : 'Preview'}
                </button>
              </div>
            ))}
            {!emails.length && <div className="px-4 py-3 text-xs text-gray-400">No emails in the sequence yet.</div>}
          </div>
        )}
      </div>

      {/* Add */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-navy mb-3">Add an international request</h3>
            {(['name', 'email', 'phone', 'organization', 'location'] as const).map((f) => (
              <input
                key={f}
                value={newLead[f]}
                onChange={(e) => setNewLead({ ...newLead, [f]: e.target.value })}
                placeholder={f === 'organization' ? 'Organisation' : f === 'location' ? 'Country' : f[0].toUpperCase() + f.slice(1)}
                className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            ))}
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setAdding(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={createLead} disabled={busy === 'create'} className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold disabled:opacity-50">
                {busy === 'create' ? 'Adding…' : 'Add'}
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
                <div className="text-base font-black text-navy">{current.organization || current.name || current.email}</div>
                <div className="text-[11px] text-gray-500">{[current.name, current.email, current.phone].filter(Boolean).join(' · ')}</div>
              </div>
              <button onClick={() => setOpenId(null)} className="text-gray-400 text-xl leading-none">×</button>
            </div>

            <div className="px-5 py-4 space-y-5">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Stage</div>
                <div className="flex flex-wrap gap-1.5">
                  {stages.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStage(current, s)}
                      disabled={busy === 'stage'}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold disabled:opacity-50 ${current.stage === s ? STAGE_TINT[s] : 'bg-gray-100 text-gray-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {([['organization', 'Organisation'], ['name', 'Contact'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Country'], ['website', 'Website']] as const).map(([f, label]) => (
                  <label key={f} className="block">
                    <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                    <input
                      defaultValue={(current[f] as string) || ''}
                      onBlur={(e) => { if (e.target.value !== ((current[f] as string) || '')) saveField(current, f, e.target.value); }}
                      className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                    />
                  </label>
                ))}
                <label className="block">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Follow up</span>
                  <input
                    type="date"
                    defaultValue={current.nextFollowUpAt ? new Date(current.nextFollowUpAt).toISOString().slice(0, 10) : ''}
                    onBlur={(e) => saveField(current, 'nextFollowUpAt', e.target.value)}
                    className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </label>
              </div>

              {/* The sequence, for this person: opened with a click, previewed before it goes */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">The sequence, for this person</div>
                <div className="space-y-1">
                  {emails.map((e, i) => {
                    const done = alreadySent(e.subject);
                    return (
                      <div key={e.id} className="flex items-center gap-2">
                        <span className={`w-4 text-center text-[11px] ${done ? 'text-emerald-600' : 'text-gray-300'}`}>{done ? '✓' : '○'}</span>
                        <span className={`flex-1 text-[11px] ${done ? 'text-gray-400 line-through' : 'text-navy font-semibold'}`}>{i + 1}. {e.subject}</span>
                        <button
                          onClick={() => openPreview(e)}
                          disabled={!!busy}
                          className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold hover:bg-gray-200 disabled:opacity-50 shrink-0"
                        >
                          {busy === 'preview:' + e.id ? '…' : done ? 'Send again' : 'Send'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Log a call</div>
                <input value={callDraft} onChange={(e) => setCallDraft(e.target.value)} placeholder="What happened?" className="w-full mb-2 px-2 py-1.5 rounded-lg border border-gray-200 text-xs" />
                <div className="flex gap-1.5">
                  {['Spoke', 'No answer', 'Left voicemail'].map((o) => (
                    <button key={o} onClick={() => logCall(current, o)} disabled={busy === 'call'} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold disabled:opacity-50">{o}</button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Add a note</div>
                <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} rows={2} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs" />
                <button onClick={() => addNote(current)} disabled={!noteDraft.trim() || busy === 'note'} className="mt-1 px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">Save note</button>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">History</div>
                {!detail && <div className="text-xs text-gray-400">Loading…</div>}
                {detail && detail.activities.length === 0 && <div className="text-xs text-gray-400">Nothing yet.</div>}
                <div className="space-y-2">
                  {detail?.activities.map((a) => (
                    <div key={a.id} className="flex gap-2">
                      <span className="text-sm leading-5">{ACTIVITY_ICON[a.type] || '•'}</span>
                      <div className="min-w-0">
                        <div className="text-xs text-navy font-semibold break-words">{a.summary}</div>
                        {a.body && a.body !== a.summary && <div className="text-[11px] text-gray-500 whitespace-pre-wrap break-words">{a.body}</div>}
                        <div className="text-[10px] text-gray-400">{when(a.occurredAt)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                {confirmDelete === current.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">Delete this request and its history?</span>
                    <button onClick={() => remove(current.id)} className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold">Delete</button>
                    <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-600">Keep</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(current.id)} className="text-[11px] font-bold text-gray-400 hover:text-red">Delete request</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview: nothing sends until it has been seen */}
      {preview && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
                {openId && current ? 'To ' + (current.email || '') : 'Sample'}
              </div>
              <div className="mt-1 text-sm font-semibold text-navy">{preview.subject}</div>
            </div>
            <div className="px-6 py-5 text-sm" dangerouslySetInnerHTML={{ __html: preview.html }} />
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setPreview(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              {openId && current && (
                <button onClick={() => sendPreview(current)} disabled={busy === 'send' || !current.email} className="px-4 py-2 rounded-lg bg-red text-white text-xs font-bold disabled:opacity-50">
                  {busy === 'send' ? 'Sending…' : 'Send'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
