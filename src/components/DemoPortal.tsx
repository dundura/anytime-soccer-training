'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Demo Portal — the stage before the CRM.
 *
 * A club asks for a demo and lands here as New. It moves right — Contacted,
 * Demo booked, Trial — until it is Won, at which point one button hands it to
 * the CRM and this board is finished with it. Not now is the other way out.
 *
 * A separate component rather than another branch inside OnboardingPortal:
 * that file is already 2,400 lines carrying the wizard, the checklist and the
 * CRM, and a pipeline with its own drawer, timeline and email sending does not
 * belong wedged into the same render.
 */

const API = 'https://api.anytime-soccer.com';

type Stage = 'New' | 'Contacted' | 'Demo booked' | 'Trial' | 'Won' | 'Not now';

type Lead = {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  location: string | null;
  playerCount: number | null;
  ageGroups: string | null;
  source: string | null;
  stage: Stage;
  notes: string | null;
  estimatedValueCents: number | null;
  requestedAt: string | null;
  lastContactedAt: string | null;
  nextFollowUpAt: string | null;
  demoScheduledAt: string | null;
  crmLeadId: number | null;
};

type Activity = { id: number; type: string; summary: string | null; body: string | null; occurredAt: string | null };
type Template = { key: string; label: string };

const STAGE_TINT: Record<Stage, string> = {
  New: 'bg-red text-white',
  Contacted: 'bg-amber-500 text-white',
  'Demo booked': 'bg-blue-600 text-white',
  Trial: 'bg-violet-600 text-white',
  Won: 'bg-emerald-600 text-white',
  'Not now': 'bg-gray-400 text-white',
};

// A timeline reads as a story only if each kind of entry looks different at a
// glance. The icon is doing the work the type name would otherwise do.
const ACTIVITY_ICON: Record<string, string> = {
  form_submitted: '📥',
  email_sent: '✉️',
  call: '📞',
  note: '📝',
  stage_changed: '➡️',
  demo_booked: '📅',
  follow_up_scheduled: '⏰',
  converted: '🎉',
};

const money = (cents: number | null | undefined) =>
  '$' + Math.round((Number(cents) || 0) / 100).toLocaleString();

const when = (v: string | null) => {
  if (!v) return '—';
  const d = new Date(v);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
};

// "3 days" says more than a date when the question is how long someone has been
// waiting for an answer.
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

export default function DemoPortal({ token }: { token: string | null }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [kpi, setKpi] = useState<Record<string, number>>({});
  const [stages, setStages] = useState<Stage[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const [stageFilter, setStageFilter] = useState<'' | Stage>('');
  const [search, setSearch] = useState('');

  const [openId, setOpenId] = useState<number | null>(null);
  const [detail, setDetail] = useState<{ lead: Lead; activities: Activity[] } | null>(null);
  const [busy, setBusy] = useState('');

  const [noteDraft, setNoteDraft] = useState('');
  const [callDraft, setCallDraft] = useState('');
  const [scheduleAt, setScheduleAt] = useState('');
  const [preview, setPreview] = useState<{ key: string; subject: string; html: string } | null>(null);
  const [adding, setAdding] = useState(false);
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', organization: '', location: '', playerCount: '' });
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
      const res = await fetch(`${API}/demo-portal/leads?${params.toString()}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load the demo leads.');
      setLeads(d.leads || []);
      setCounts(d.counts || {});
      setKpi(d.kpi || {});
      setStages(d.stages || []);
      setTemplates(d.templates || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the demo leads.');
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
    setScheduleAt('');
    try {
      const res = await fetch(`${API}/demo-portal/leads/${id}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load that lead.');
      setDetail(d);
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Could not load that lead.');
      setOpenId(null);
    }
  }, [headers]);

  // Every mutation goes through here so the row in the table and the row in the
  // drawer can never disagree: both are re-read from the server after a change.
  const act = useCallback(async (key: string, url: string, init: RequestInit, ok: string) => {
    if (busy) return;
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
    act('stage', `${API}/demo-portal/leads/${lead.id}`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ stage }) }, 'Moved to ' + stage);

  const saveField = (lead: Lead, field: string, value: string) =>
    act('field:' + field, `${API}/demo-portal/leads/${lead.id}`, { method: 'PATCH', headers: jsonHeaders(), body: JSON.stringify({ [field]: value }) }, 'Saved');

  const addNote = (lead: Lead) => {
    if (!noteDraft.trim()) return;
    act('note', `${API}/demo-portal/leads/${lead.id}/note`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ body: noteDraft }) }, 'Note added')
      .then(() => setNoteDraft(''));
  };

  const logCall = (lead: Lead, outcome: string) =>
    act('call', `${API}/demo-portal/leads/${lead.id}/call`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ outcome, body: callDraft }) }, 'Call logged')
      .then(() => setCallDraft(''));

  const schedule = (lead: Lead) => {
    if (!scheduleAt) return;
    act('schedule', `${API}/demo-portal/leads/${lead.id}/schedule`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ at: scheduleAt }) }, 'Demo booked');
  };

  // Preview first, always. An email to a club is not something to send from a
  // button whose contents you cannot see.
  const openPreview = async (lead: Lead, key: string) => {
    setBusy('preview:' + key);
    try {
      const res = await fetch(`${API}/demo-portal/template/${key}?leadId=${lead.id}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not build that email.');
      setPreview({ key, subject: d.subject, html: d.html });
    } catch (e) {
      flash(e instanceof Error ? e.message : 'Could not build that email.');
    } finally {
      setBusy('');
    }
  };

  const sendPreview = (lead: Lead) => {
    if (!preview) return;
    act('send', `${API}/demo-portal/leads/${lead.id}/email`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify({ template: preview.key, subject: preview.subject }) }, 'Sent to ' + lead.email)
      .then(() => setPreview(null));
  };

  const convert = (lead: Lead) =>
    act('convert', `${API}/demo-portal/leads/${lead.id}/convert`, { method: 'POST', headers: jsonHeaders() }, 'Handed over to the CRM');

  const createLead = async () => {
    if (!newLead.name.trim() && !newLead.email.trim()) { flash('A name or an email, at least.'); return; }
    const d = await act('create', `${API}/demo-portal/leads`, { method: 'POST', headers: jsonHeaders(), body: JSON.stringify(newLead) }, 'Lead added');
    if (d) { setAdding(false); setNewLead({ name: '', email: '', phone: '', organization: '', location: '', playerCount: '' }); }
  };

  const remove = async (id: number) => {
    await act('delete', `${API}/demo-portal/leads/${id}`, { method: 'DELETE', headers: headers() }, 'Lead deleted');
    setConfirmDelete(null);
    setOpenId(null);
  };

  const overdue = (l: Lead) =>
    !!l.nextFollowUpAt && new Date(l.nextFollowUpAt).getTime() < Date.now() && l.stage !== 'Won' && l.stage !== 'Not now';

  const kpiCards = useMemo(() => ([
    { label: 'New', value: Number(kpi.newCount || 0), tone: 'text-red' },
    { label: 'Open', value: Number(kpi.openCount || 0), tone: 'text-navy' },
    { label: 'Overdue', value: Number(kpi.overdueCount || 0), tone: Number(kpi.overdueCount || 0) > 0 ? 'text-red' : 'text-gray-400' },
    { label: 'Won', value: Number(kpi.wonCount || 0), tone: 'text-emerald-600' },
    { label: 'Open value', value: money(kpi.openValueCents), tone: 'text-navy' },
  ]), [kpi]);

  const current = detail?.lead || leads.find((l) => l.id === openId) || null;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-black text-navy">Demo requests</h2>
          <p className="text-xs text-gray-500">Everything before the CRM. Won hands the club over.</p>
        </div>
        <button onClick={() => setAdding(true)} className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">+ Add a lead</button>
      </div>

      {note && <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{note}</div>}
      {error && <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
        {kpiCards.map((c) => (
          <div key={c.label} className="border border-gray-200 rounded-xl px-3 py-2 bg-white">
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{c.label}</div>
            <div className={`text-xl font-black ${c.tone}`}>{c.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <button
          onClick={() => setStageFilter('')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold ${stageFilter === '' ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600'}`}
        >
          All ({leads.length})
        </button>
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
          placeholder="Search name, club, email"
          className="ml-auto px-3 py-1.5 rounded-lg border border-gray-200 text-xs w-full sm:w-64"
        />
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-wide text-gray-500">
                <th className="text-left px-3 py-2">Club / contact</th>
                <th className="text-left px-3 py-2 hidden sm:table-cell">Players</th>
                <th className="text-left px-3 py-2">Stage</th>
                <th className="text-left px-3 py-2 hidden md:table-cell">Waiting</th>
                <th className="text-left px-3 py-2 hidden md:table-cell">Next</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={5} className="px-3 py-6 text-center text-gray-400 text-xs">Loading…</td></tr>}
              {!loading && leads.length === 0 && (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-gray-400 text-xs">No demo requests yet.</td></tr>
              )}
              {leads.map((l) => (
                <tr key={l.id} onClick={() => openLead(l.id)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-3 py-2.5">
                    <div className="font-bold text-navy">{l.organization || l.name || l.email}</div>
                    <div className="text-[11px] text-gray-500">{[l.name, l.email, l.location].filter(Boolean).join(' · ')}</div>
                  </td>
                  <td className="px-3 py-2.5 hidden sm:table-cell text-gray-600">
                    {l.playerCount ? <>{l.playerCount}<span className="text-[10px] text-gray-400"> · {money(l.estimatedValueCents)}/yr</span></> : '—'}
                  </td>
                  <td className="px-3 py-2.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${STAGE_TINT[l.stage] || 'bg-gray-200 text-gray-700'}`}>{l.stage}</span>
                  </td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-gray-500 text-xs">{ago(l.lastContactedAt || l.requestedAt)}</td>
                  <td className="px-3 py-2.5 hidden md:table-cell text-xs">
                    {l.nextFollowUpAt
                      ? <span className={overdue(l) ? 'text-red font-bold' : 'text-gray-500'}>{when(l.nextFollowUpAt)}</span>
                      : <span className="text-gray-300">—</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add a lead */}
      {adding && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setAdding(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-5" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-base font-black text-navy mb-3">Add a demo lead</h3>
            {(['name', 'email', 'phone', 'organization', 'location', 'playerCount'] as const).map((f) => (
              <input
                key={f}
                value={newLead[f]}
                onChange={(e) => setNewLead({ ...newLead, [f]: e.target.value })}
                placeholder={f === 'organization' ? 'Club' : f === 'playerCount' ? 'Players' : f[0].toUpperCase() + f.slice(1)}
                className="w-full mb-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
              />
            ))}
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setAdding(false)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={createLead} disabled={busy === 'create'} className="px-4 py-2 rounded-lg bg-navy text-white text-xs font-bold disabled:opacity-50">
                {busy === 'create' ? 'Adding…' : 'Add lead'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lead drawer */}
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
              {/* Stage */}
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

              {/* Facts, editable in place */}
              <div className="grid grid-cols-2 gap-2">
                {([['organization', 'Club'], ['name', 'Contact'], ['email', 'Email'], ['phone', 'Phone'], ['location', 'Location'], ['ageGroups', 'Age groups']] as const).map(([f, label]) => (
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
                  <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Players</span>
                  <input
                    defaultValue={current.playerCount ?? ''}
                    onBlur={(e) => saveField(current, 'playerCount', e.target.value)}
                    className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs"
                  />
                </label>
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

              {current.playerCount ? (
                <div className="rounded-xl bg-navy/5 border border-navy/10 px-3 py-2 text-xs text-navy">
                  <strong>{current.playerCount} players</strong> at $10 per player, per year — about <strong>{money(current.estimatedValueCents)} a year</strong>.
                </div>
              ) : null}

              {/* Email */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Send an email</div>
                <div className="flex flex-wrap gap-1.5">
                  {templates.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => openPreview(current, t.key)}
                      disabled={!!busy}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold hover:bg-gray-200 disabled:opacity-50"
                    >
                      {busy === 'preview:' + t.key ? '…' : t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Book a demo */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Book the demo</div>
                <div className="flex gap-2">
                  <input type="datetime-local" value={scheduleAt} onChange={(e) => setScheduleAt(e.target.value)} className="flex-1 px-2 py-1.5 rounded-lg border border-gray-200 text-xs" />
                  <button onClick={() => schedule(current)} disabled={!scheduleAt || busy === 'schedule'} className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-bold disabled:opacity-40">Book</button>
                </div>
              </div>

              {/* Call */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Log a call</div>
                <input value={callDraft} onChange={(e) => setCallDraft(e.target.value)} placeholder="What happened?" className="w-full mb-2 px-2 py-1.5 rounded-lg border border-gray-200 text-xs" />
                <div className="flex gap-1.5">
                  {['Spoke', 'No answer', 'Left voicemail'].map((o) => (
                    <button key={o} onClick={() => logCall(current, o)} disabled={busy === 'call'} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold disabled:opacity-50">{o}</button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Add a note</div>
                <textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} rows={2} className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs" />
                <button onClick={() => addNote(current)} disabled={!noteDraft.trim() || busy === 'note'} className="mt-1 px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-40">Save note</button>
              </div>

              {/* Hand over */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3">
                {current.crmLeadId ? (
                  <div className="text-xs text-emerald-800 font-semibold">🎉 In the CRM (lead #{current.crmLeadId}). This board is done with them.</div>
                ) : (
                  <>
                    <div className="text-xs text-emerald-900 font-semibold mb-2">Won it? Hand the club over to the CRM and close this lead.</div>
                    <button onClick={() => convert(current)} disabled={busy === 'convert'} className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-[11px] font-bold disabled:opacity-50">
                      {busy === 'convert' ? 'Handing over…' : 'Mark Won → send to CRM'}
                    </button>
                  </>
                )}
              </div>

              {/* Timeline */}
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
                    <span className="text-xs text-gray-600">Delete this lead and its history?</span>
                    <button onClick={() => remove(current.id)} className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold">Delete</button>
                    <button onClick={() => setConfirmDelete(null)} className="px-2.5 py-1 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-600">Keep</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDelete(current.id)} className="text-[11px] font-bold text-gray-400 hover:text-red">Delete lead</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email preview — nothing sends until this has been seen */}
      {preview && current && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">To {current.email}</div>
              <input
                value={preview.subject}
                onChange={(e) => setPreview({ ...preview, subject: e.target.value })}
                className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold"
              />
            </div>
            <div className="px-5 py-4 text-sm" dangerouslySetInnerHTML={{ __html: preview.html }} />
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setPreview(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">Cancel</button>
              <button onClick={() => sendPreview(current)} disabled={busy === 'send'} className="px-4 py-2 rounded-lg bg-red text-white text-xs font-bold disabled:opacity-50">
                {busy === 'send' ? 'Sending…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
