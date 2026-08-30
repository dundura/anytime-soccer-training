'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Cold outreach.
 *
 * Two tabs, because they are two different jobs. Sending is picking people off
 * a list and pressing a button. Working a contact is finding the address that
 * is missing — slower, and nothing to do with the sequence. Mixing them put a
 * queue you cannot act on in the middle of the one you can.
 *
 * The stage lives in the CRM and the sending lives in the newsletter tables.
 * This page is the join; neither side knows about the other.
 */

const API = 'https://api.anytime-soccer.com';

type EmailRow = { id: number; emailKey: string; position: number; subject: string; delayMinutes: number; active: number };
type ColdSequence = { key: string; label: string; group: string };
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
  sentCount?: number;
  signedUpAt?: string | null;
};

const blank = { name: '', club: '', email: '' };

/** The delay as a person would say it. */
function when(mins: number) {
  if (!mins) return 'straight away';
  if (mins < 60) return `after ${mins} min`;
  if (mins < 1440) return `after ${Math.round(mins / 60)} hr`;
  return `after ${Math.round(mins / 1440)} days`;
}

export default function ColdWorkflow({ token }: { token: string | null }) {
  const [tab, setTab] = useState<'send' | 'work'>('send');
  const [emails, setEmails] = useState<EmailRow[]>([]);
  const [sequences, setSequences] = useState<ColdSequence[]>([]);
  const [sequence, setSequence] = useState('');
  const [added, setAdded] = useState<Lead[]>([]);
  const [todo, setTodo] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const [showEmails, setShowEmails] = useState(false);
  const [preview, setPreview] = useState<{ subject: string; html: string } | null>(null);
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
      const res = await fetch(
        `${API}/portal-onboarding/cold${sequence ? `?sequence=${encodeURIComponent(sequence)}` : ''}`,
        { headers: headers() },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the cold list.');
      setEmails(data.emails || []);
      setSequences(data.sequences || []);
      if (!sequence && data.sequence) setSequence(data.sequence);
      setAdded(data.added || []);
      setTodo(data.todo || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the cold list.');
    } finally {
      setLoading(false);
    }
  }, [headers, sequence]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // Ready to go versus missing something. The split is the reason for the tabs.
  const ready = todo.filter((l) => !l.blocked);
  const blocked = todo.filter((l) => l.blocked);
  const selected = ready.filter((l) => chosen.has(l.id));

  // Adding to a sequence whose first email has no delay sends it immediately.
  // The button has to say so, or "add" reads as filing.
  const first = emails.find((e) => e.position === 1);
  const sendsNow = !!first && !first.delayMinutes && !!first.active;

  const enroll = async () => {
    if (!selected.length || busy) return;
    setBusy(true);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/cold/enroll`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({ ids: selected.map((l) => l.id), sequence }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not add those.');
      setNote(`Sent to ${data.enrolled}.${data.skipped ? ` Skipped ${data.skipped}.` : ''}`);
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

  // Filling in a missing address is the whole job of the second tab, so it
  // saves straight from the row rather than sending you to the CRM.
  const patchLead = async (id: number, field: string, value: string) => {
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach`, {
        method: 'PUT',
        headers: headers(),
        body: JSON.stringify({ id, [field]: value }),
      });
      if (!res.ok) throw new Error('Could not save that.');
      await load();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not save that.');
    }
  };

  const openPreview = async (row: EmailRow) => {
    setPreview({ subject: row.subject, html: '' });
    try {
      const res = await fetch(`${API}/newsletters/emails/${row.id}`, { headers: headers() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load that email.');
      setPreview({ subject: data.email?.subject || row.subject, html: data.email?.html || '' });
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not load that email.');
      setPreview(null);
    }
  };

  const toggle = (id: number) =>
    setChosen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  // Dashed rule and a hover, so a borderless field reads as something you can
  // type in rather than as printed text.
  const editable =
    'bg-transparent border-0 border-b border-dashed border-gray-300 hover:bg-amber-50 focus:bg-white ' +
    'focus:border-solid focus:border-red focus:outline-none px-1 py-0.5 rounded-sm text-sm';

  const tabClass = (key: 'send' | 'work') =>
    `px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
      tab === key ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
    }`;

  return (
    <div className="px-4 py-5 max-w-4xl">
      {/* Who am I writing to ------------------------------------------- */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="text-sm font-bold text-navy">Writing to</span>
        <select
          value={sequence}
          onChange={(e) => {
            setSequence(e.target.value);
            setChosen(new Set());
            setConfirming(false);
          }}
          className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:border-red"
        >
          {sequences.map((s2) => (
            <option key={s2.key} value={s2.key}>
              {s2.label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-xs text-gray-500 mb-4">
        {emails.length === 0 ? (
          <span className="text-amber-700 font-semibold">No emails written yet — nobody will receive anything.</span>
        ) : (
          <>
            {emails.length} email{emails.length === 1 ? '' : 's'}, first one {when(first?.delayMinutes ?? 0)}.{' '}
            <button onClick={() => setShowEmails((v) => !v)} className="text-red font-bold hover:underline">
              {showEmails ? 'hide' : 'see them'}
            </button>
          </>
        )}
      </p>

      {showEmails && emails.length > 0 && (
        <ol className="text-xs text-gray-600 border border-gray-200 rounded-lg px-5 py-3 mb-4 list-decimal space-y-1">
          {emails.map((e) => (
            <li key={e.emailKey}>
              <button onClick={() => openPreview(e)} className="text-navy font-semibold hover:underline text-left">
                {e.subject}
              </button>{' '}
              <span className="text-gray-400">— {when(e.delayMinutes)}</span>
            </li>
          ))}
        </ol>
      )}

      <div className="flex border border-gray-200 rounded-lg overflow-hidden w-fit mb-4">
        <button onClick={() => setTab('send')} className={tabClass('send')}>
          Ready ({ready.length})
        </button>
        <button onClick={() => setTab('work')} className={tabClass('work')}>
          To work ({blocked.length})
        </button>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col" onClick={(ev) => ev.stopPropagation()}>
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  From Neil Crawford &lt;hello@mail.anytime-soccer.com&gt;
                </p>
                <p className="text-sm font-bold text-navy truncate">{preview.subject}</p>
              </div>
              <button
                onClick={() => setPreview(null)}
                className="ml-auto text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            {preview.html ? (
              <iframe srcDoc={preview.html} title="Email preview" className="flex-1 w-full min-h-[400px] rounded-b-lg" />
            ) : (
              <p className="text-sm text-gray-500 p-6">Loading…</p>
            )}
          </div>
        </div>
      )}

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-navy mb-3">{note}</p>}
      {loading && <p className="text-sm text-gray-500">Loading…</p>}

      {/* Ready to send --------------------------------------------------- */}
      {tab === 'send' && (
        <>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold text-navy">Ready to send</span>
            <span className="ml-auto flex items-center gap-2">
              {confirming ? (
                <>
                  <button
                    onClick={enroll}
                    disabled={busy}
                    className="text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-red text-white hover:bg-red-dark disabled:opacity-50"
                  >
                    {busy
                      ? 'Sending…'
                      : sendsNow
                        ? `Send "${first?.subject}" to ${selected.length}?`
                        : `Add ${selected.length}?`}
                  </button>
                  <button
                    onClick={() => setConfirming(false)}
                    className="text-[11px] font-semibold text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setConfirming(true)}
                  disabled={!selected.length}
                  className="text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-navy text-white hover:bg-navy-light disabled:opacity-40"
                >
                  {sendsNow ? `Send to ${selected.length}` : `Add ${selected.length}`}
                </button>
              )}
            </span>
          </div>

          <div className="border border-gray-200 rounded-lg mb-6 divide-y divide-gray-100">
            {ready.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={chosen.has(l.id)}
                  onChange={() => toggle(l.id)}
                  className="flex-shrink-0"
                />
                <input
                  defaultValue={l.name || ''}
                  placeholder="Name"
                  onBlur={(e) => e.target.value.trim() !== (l.name || '') && patchLead(l.id, 'name', e.target.value)}
                  className={`${editable} font-semibold text-navy w-32`}
                />
                <input
                  defaultValue={l.club || ''}
                  placeholder="Club"
                  onBlur={(e) => e.target.value.trim() !== (l.club || '') && patchLead(l.id, 'club', e.target.value)}
                  className={`${editable} text-gray-600 flex-1 min-w-[120px]`}
                />
                <input
                  defaultValue={l.email || ''}
                  placeholder="Email"
                  onBlur={(e) => e.target.value.trim() !== (l.email || '') && patchLead(l.id, 'email', e.target.value)}
                  className={`${editable} text-gray-600 w-56`}
                />
              </div>
            ))}
            {!ready.length && !loading && (
              <p className="px-3 py-5 text-center text-sm text-gray-500 font-semibold">Nobody waiting.</p>
            )}
          </div>

          {/* Add ------------------------------------------------------- */}
          <div className="flex flex-wrap gap-2 mb-2">
            {(
              [
                ['name', 'Name'],
                ['club', 'Club'],
                ['email', 'Email'],
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
                className="text-sm border border-gray-300 rounded px-2 py-1.5 flex-1 min-w-[140px] focus:outline-none focus:border-red"
              />
            ))}
            <button
              onClick={addRecord}
              disabled={busy}
              className="text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full border border-gray-300 text-navy hover:bg-gray-50 disabled:opacity-40"
            >
              Add
            </button>
          </div>
          <p className="text-[11px] text-gray-500 mb-6">Added to the list, not sent to. Tick them above when ready.</p>

          {/* Already gone ---------------------------------------------- */}
          <button
            onClick={() => setShowAdded((v) => !v)}
            className="text-[11px] font-bold uppercase tracking-wide text-red hover:underline"
          >
            {showAdded ? '▾' : '▸'} Already sent ({added.length})
          </button>
          {showAdded && (
            <div className="border border-gray-200 rounded-lg mt-2 divide-y divide-gray-100">
              {added.map((l) => (
                <div key={l.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                  <span className="font-semibold text-navy truncate">{l.name || l.club || l.email}</span>
                  <span className="text-gray-500 truncate hidden sm:inline">{l.email}</span>
                  <span className="ml-auto text-xs text-gray-400 whitespace-nowrap">
                    {(l.signedUpAt || '').slice(0, 10)} · {l.sentCount ?? 0} sent
                  </span>
                </div>
              ))}
              {!added.length && <p className="px-3 py-4 text-center text-sm text-gray-500">Nobody yet.</p>}
            </div>
          )}
        </>
      )}

      {/* Needs work ------------------------------------------------------ */}
      {tab === 'work' && (
        <>
          <p className="text-xs text-gray-500 mb-3">
            These cannot be sent to yet. Type the address in and they move to Ready.
          </p>
          <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
            {blocked.map((l) => (
              <div key={l.id} className="flex flex-wrap items-center gap-3 px-3 py-2 text-sm">
                <input
                  defaultValue={l.name || ''}
                  placeholder="Name"
                  onBlur={(e) => e.target.value.trim() !== (l.name || '') && patchLead(l.id, 'name', e.target.value)}
                  className={`${editable} font-semibold text-navy w-32`}
                />
                <input
                  defaultValue={l.club || ''}
                  placeholder="Club"
                  onBlur={(e) => e.target.value.trim() !== (l.club || '') && patchLead(l.id, 'club', e.target.value)}
                  className={`${editable} text-gray-600 flex-1 min-w-[120px]`}
                />
                <input
                  defaultValue={l.email || ''}
                  placeholder="Email address"
                  onBlur={(e) => {
                    const v = e.target.value.trim();
                    if (v && v !== (l.email || '')) patchLead(l.id, 'email', v);
                  }}
                  className={`${editable} w-56`}
                />
                {l.website && (
                  <a
                    href={l.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-red hover:underline whitespace-nowrap"
                  >
                    site ↗
                  </a>
                )}
              </div>
            ))}
            {!blocked.length && !loading && (
              <p className="px-3 py-5 text-center text-sm text-gray-500 font-semibold">Nothing to work.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
