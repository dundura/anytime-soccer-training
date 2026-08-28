'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Newsletters — the sequences moving off Go High Level.
 *
 * Two tabs, because there are only two questions worth asking: what does the
 * email say, and who has it gone to. The emails are stored as rows in the
 * database rather than as files in the repo, so the preview below is the exact
 * HTML a subscriber received, not a copy of it that can drift.
 */

const API = 'https://api.anytime-soccer.com';

type EmailRow = {
  id: number;
  sequence: string;
  emailKey: string;
  position: number;
  subject: string;
  delayDays: number;
  delayMinutes: number;
  active: number;
  updatedAt: string | null;
  sentCount: number;
};

type Subscriber = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  sequence: string;
  source: string | null;
  landingPage: string | null;
  status: string;
  signedUpAt: string | null;
  unsubscribedAt: string | null;
  lastSentAt: string | null;
  sentCount: number;
};

type Sequence = {
  key: string;
  label: string;
  group: string;
  emails: number;
  subscribers: number;
};

type Send = {
  id: number;
  emailKey: string;
  subject: string | null;
  status: string;
  error: string | null;
  sentAt: string | null;
  position: number | null;
};

const fmt = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';

const fmtTime = (d: string | null) =>
  d ? new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—';

// The gap between signup and this email. Minutes for the first hour because
// the 7-day plan spaces two emails fifteen minutes apart, then hours, then the
// days that most of a sequence is measured in.
const delayLabel = (mins: number) => {
  if (!mins) return 'On signup';
  if (mins < 60) return `${mins} min`;
  if (mins < 1440) {
    const h = Math.round(mins / 60);
    return `${h} hr${h === 1 ? '' : 's'}`;
  }
  const d = Math.round(mins / 1440);
  return `Day ${d}`;
};

const STATUS_TINT: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-700',
  unsubscribed: 'bg-gray-200 text-gray-600',
  bounced: 'bg-red-100 text-red-700',
  sent: 'bg-emerald-100 text-emerald-700',
  sending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

const Pill = ({ value }: { value: string }) => (
  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${STATUS_TINT[value] || 'bg-gray-100 text-gray-600'}`}>
    {value}
  </span>
);

export default function Newsletters({ token }: { token: string | null }) {
  const [tab, setTab] = useState<'emails' | 'subscribers'>('emails');
  const [sequences, setSequences] = useState<Sequence[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [sequence, setSequenceState] = useState('');

  // Mirrored into ?seq= so a refresh lands back on the same one. Written with
  // replaceState rather than a router push: this is which pane you are looking
  // at, not somewhere you navigated to, and it should not fill the back button.
  const setSequence = useCallback((next: string) => {
    setSequenceState(next);
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);
    url.searchParams.set('seq', next);
    window.history.replaceState({}, '', url);
  }, []);
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [subs, setSubs] = useState<Subscriber[]>([]);
  const [counts, setCounts] = useState<{ total: number; active: number; unsubscribed: number } | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
  const [open, setOpen] = useState<{ subscriber: Subscriber; sends: Send[] } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const headers = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token]
  );

  const flash = (m: string) => {
    setNote(m);
    setTimeout(() => setNote(''), 5000);
  };

  const loadSequences = useCallback(async () => {
    try {
      const res = await fetch(`${API}/newsletters/sequences`, { headers: headers() });
      if (!res.ok) throw new Error('Could not load the sequences.');
      const j = await res.json();
      const list: Sequence[] = j.sequences || [];
      setSequences(list);
      setGroups(j.groups && j.groups.length ? j.groups : Array.from(new Set(list.map((x) => x.group))));
      // The URL wins over the default, but only if it names a real sequence.
      const fromUrl =
        typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('seq') : null;
      const valid = fromUrl && list.some((x) => x.key === fromUrl) ? fromUrl : null;
      setSequenceState((cur) => cur || valid || j.defaultSequence || (list[0] && list[0].key) || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the sequences.');
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    loadSequences();
  }, [loadSequences]);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      params.set('sequence', sequence);
      if (statusFilter) params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      const [e, s] = await Promise.all([
        fetch(`${API}/newsletters/emails?sequence=${encodeURIComponent(sequence)}`, { headers: headers() }),
        fetch(`${API}/newsletters/subscribers?${params.toString()}`, { headers: headers() }),
      ]);
      if (!e.ok || !s.ok) throw new Error('Could not load newsletters.');
      const ej = await e.json();
      const sj = await s.json();
      setEmails(ej.emails || []);
      setSubs(sj.subscribers || []);
      setCounts(sj.counts || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load newsletters.');
    } finally {
      setLoading(false);
    }
  }, [headers, search, statusFilter, sequence]);

  useEffect(() => {
    if (sequence) load();
  }, [load, sequence]);

  const showPreview = async (row: EmailRow) => {
    try {
      const res = await fetch(`${API}/newsletters/emails/${row.id}`, { headers: headers() });
      if (!res.ok) throw new Error('Could not load the email.');
      const j = await res.json();
      setPreview({ subject: j.email.subject, html: j.email.html || '' });
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Could not load the email.');
    }
  };

  const sendTest = async (row: EmailRow) => {
    try {
      const res = await fetch(`${API}/newsletters/emails/${row.id}/test`, { method: 'POST', headers: headers() });
      if (!res.ok) throw new Error('Could not send the test.');
      const j = await res.json();
      flash(`Test sent to ${j.to}`);
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Could not send the test.');
    }
  };

  const openSubscriber = async (s: Subscriber) => {
    try {
      const res = await fetch(`${API}/newsletters/subscribers/${s.id}`, { headers: headers() });
      if (!res.ok) throw new Error('Could not load this person.');
      const j = await res.json();
      setOpen({ subscriber: j.subscriber, sends: j.sends || [] });
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Could not load this person.');
    }
  };

  return (
    <div className="mb-6">
      {/* One picker per group. Whichever you choose from wins, and the other
          shows nothing selected - two dropdowns that both claim to hold the
          current value is the fastest way to make a screen confusing. */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4 max-w-4xl">
        {groups.map((group) => {
          const inGroup = sequences.filter((sq) => sq.group === group);
          if (inGroup.length === 0) return null;
          const selectedHere = inGroup.some((sq) => sq.key === sequence);
          return (
            <div key={group}>
              <label
                htmlFor={`seq-${group}`}
                className="block text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1"
              >
                {group}
              </label>
              <div className="relative">
                <select
                  id={`seq-${group}`}
                  value={selectedHere ? sequence : ''}
                  onChange={(ev) => ev.target.value && setSequence(ev.target.value)}
                  className={`w-full appearance-none bg-white border rounded-lg py-2.5 pl-3 pr-9 text-sm font-semibold cursor-pointer hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors ${
                    selectedHere ? 'border-navy text-navy' : 'border-gray-300 text-gray-400'
                  }`}
                >
                  <option value="">{selectedHere ? '' : 'Choose…'}</option>
                  {inGroup.map((sq) => (
                    <option key={sq.key} value={sq.key}>
                      {sq.label} ({sq.emails} email{sq.emails === 1 ? '' : 's'}, {sq.subscribers} signed up)
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 text-xs">&#9662;</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden">
          {(['emails', 'subscribers'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                tab === t ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {t === 'emails' ? 'Emails' : 'Subscribers'}
            </button>
          ))}
        </div>
        {counts && (
          <p className="text-xs text-gray-500">
            <strong className="text-navy">{counts.total || 0}</strong> signed up ·{' '}
            <strong className="text-emerald-700">{counts.active || 0}</strong> active ·{' '}
            {counts.unsubscribed || 0} unsubscribed
          </p>
        )}
        <button onClick={load} className="ml-auto text-xs font-bold text-navy hover:underline">
          Refresh
        </button>
      </div>

      {note && <div className="mb-3 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2 text-sm text-emerald-800">{note}</div>}
      {error && <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-sm text-red-700">{error}</div>}
      {loading && <p className="text-sm text-gray-500 py-4">Loading…</p>}

      {!loading && tab === 'emails' && (
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {emails.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">No emails in this sequence yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
                  <tr>
                    <th className="text-left px-4 py-2 font-bold">#</th>
                    <th className="text-left px-4 py-2 font-bold">Subject</th>
                    <th className="text-left px-4 py-2 font-bold">Sends on</th>
                    <th className="text-left px-4 py-2 font-bold">Sent</th>
                    <th className="px-4 py-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {emails.map((e) => (
                    <tr key={e.id} className={e.active ? '' : 'opacity-50'}>
                      <td className="px-4 py-3 font-bold text-navy">{e.position}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-navy">{e.subject}</p>
                        <p className="text-[11px] text-gray-400">{e.emailKey}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{delayLabel(e.delayMinutes)}</td>
                      <td className="px-4 py-3 text-gray-600">{e.sentCount}</td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => showPreview(e)} className="text-xs font-bold text-navy hover:underline mr-3">
                          Preview
                        </button>
                        <button onClick={() => sendTest(e)} className="text-xs font-bold text-gray-500 hover:underline">
                          Send test
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {!loading && tab === 'subscribers' && (
        <>
          <div className="flex flex-wrap gap-2 mb-3">
            <input
              value={search}
              onChange={(ev) => setSearch(ev.target.value)}
              placeholder="Search name or email"
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-navy/30"
            />
            <select
              value={statusFilter}
              onChange={(ev) => setStatusFilter(ev.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              <option value="active">Active</option>
              <option value="unsubscribed">Unsubscribed</option>
            </select>
          </div>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {subs.length === 0 ? (
              <p className="p-8 text-center text-sm text-gray-500">Nobody has signed up to this one yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-[11px] uppercase tracking-wide text-gray-500">
                    <tr>
                      <th className="text-left px-4 py-2 font-bold">Name</th>
                      <th className="text-left px-4 py-2 font-bold">Email</th>
                      <th className="text-left px-4 py-2 font-bold">Signed up</th>
                      <th className="text-left px-4 py-2 font-bold">Source</th>
                      <th className="text-left px-4 py-2 font-bold">Emails</th>
                      <th className="text-left px-4 py-2 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {subs.map((s) => (
                      <tr key={s.id} onClick={() => openSubscriber(s)} className="cursor-pointer hover:bg-gray-50">
                        <td className="px-4 py-3 font-semibold text-navy">
                          {[s.firstName, s.lastName].filter(Boolean).join(' ') || '—'}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{s.email}</td>
                        <td className="px-4 py-3 text-gray-600">{fmt(s.signedUpAt)}</td>
                        <td className="px-4 py-3 text-gray-600">{s.source || '—'}</td>
                        <td className="px-4 py-3 text-gray-600">{s.sentCount}</td>
                        <td className="px-4 py-3">
                          <Pill value={s.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}

      {/* The email as the subscriber sees it. An iframe because the template
          carries its own <style> block, and letting that loose in the portal
          would restyle the page around it. */}
      {preview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] flex flex-col" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
              <p className="font-bold text-navy text-sm">{preview.subject}</p>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">
                &times;
              </button>
            </div>
            <iframe title="Email preview" srcDoc={preview.html} className="flex-1 w-full min-h-[60vh] rounded-b-xl" sandbox="" />
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-start justify-between px-5 py-4 border-b border-gray-200">
              <div>
                <p className="font-bold text-navy">
                  {[open.subscriber.firstName, open.subscriber.lastName].filter(Boolean).join(' ') || open.subscriber.email}
                </p>
                <p className="text-xs text-gray-500">{open.subscriber.email}</p>
              </div>
              <button onClick={() => setOpen(null)} className="text-gray-400 hover:text-gray-700 text-xl leading-none">
                &times;
              </button>
            </div>
            <div className="px-5 py-4 space-y-1 text-sm text-gray-600 border-b border-gray-100">
              <p>Signed up {fmt(open.subscriber.signedUpAt)} from {open.subscriber.source || 'unknown'}</p>
              {open.subscriber.landingPage && <p className="text-xs text-gray-400">{open.subscriber.landingPage}</p>}
              <p>
                Status <Pill value={open.subscriber.status} />
              </p>
            </div>
            <div className="px-5 py-4">
              <p className="text-[11px] uppercase tracking-wide font-bold text-gray-500 mb-2">Emails sent</p>
              {open.sends.length === 0 ? (
                <p className="text-sm text-gray-500">Nothing sent yet.</p>
              ) : (
                <ul className="space-y-2">
                  {open.sends.map((s) => (
                    <li key={s.id} className="border border-gray-100 rounded-lg px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-navy">{s.subject || s.emailKey}</p>
                        <Pill value={s.status} />
                      </div>
                      <p className="text-[11px] text-gray-400">{fmtTime(s.sentAt)}</p>
                      {s.error && <p className="text-[11px] text-red-600 mt-1">{s.error}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
