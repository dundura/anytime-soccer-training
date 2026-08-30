'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Parent onboarding — the welcome email a team's parents get.
 *
 * An upload is kept, not held in the browser. Loading a roster puts everybody
 * on a staged list that survives a refresh, so correcting a name, adding a
 * second team and sending can happen on different days. Sending is a separate,
 * confirmed action against that list.
 *
 * The file is parsed on the server so the portal and the sender can never
 * disagree about what a column is called, and the list carries a unique key of
 * (email, team code) so the same parent cannot be emailed the same code twice.
 */

const API = 'https://api.anytime-soccer.com';

type Person = {
  id: number;
  email: string;
  parentName: string | null;
  playerLastName: string | null;
  teamName: string | null;
  teamCode: string;
  status: string;
  error: string | null;
  sentAt: string | null;
  nudgeSentAt: string | null;
  unsubscribedAt: string | null;
  hasAccount: number;
};

type Team = { teamCode: string; teamName: string | null; count: number };

type SkippedRow = {
  line: number;
  parentName: string | null;
  email: string | null;
  teamName: string | null;
  teamCode: string | null;
  skip: string | null;
};

type UploadResult = {
  fileName: string | null;
  staged: number;
  counts: { rows: number; sendable: number; skipped: number };
  columns: Partial<Record<'parentName' | 'playerLastName' | 'email' | 'coachNumber' | 'teamName' | 'teamCode', number>>;
  headings: string[];
  rows: SkippedRow[];
};

export default function ParentOnboarding({ token }: { token: string | null }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const [staged, setStaged] = useState<Person[]>([]);
  const [sends, setSends] = useState<Person[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [upload, setUpload] = useState<UploadResult | null>(null);
  const [pasted, setPasted] = useState('');
  const [teamFilter, setTeamFilter] = useState('');
  const [chosen, setChosen] = useState<Set<number>>(new Set());
  const [emailPreview, setEmailPreview] = useState<{ subject: string; html: string } | null>(null);
  const [testTo, setTestTo] = useState('neil@anytime-soccer.com');
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [nudging, setNudging] = useState(0);
  const [deleting, setDeleting] = useState(0);

  const adminHeaders = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token],
  );

  const load = useCallback(async () => {
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/list`, { headers: adminHeaders() });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the list.');
      setStaged(data.staged || []);
      setSends(data.sends || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the list.');
    } finally {
      setLoaded(true);
    }
  }, [adminHeaders]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const inTeam = (p: Person) => !teamFilter || p.teamCode === teamFilter;
  // One list. Sending changes a row's status rather than moving it somewhere
  // else - "who is on this roster and where are they up to" is one question.
  const everyone = [...staged, ...sends].sort((a, b) => b.id - a.id);
  const visible = everyone.filter(inTeam);
  const unsent = visible.filter((p) => p.status === 'staged');

  // Built from staged and sent together: a team whose list has already gone out
  // still needs a chip, or the filter disappears the moment you press send.
  const allTeams: Team[] = (() => {
    const seen = new Map<string, Team>();
    for (const p of [...staged, ...sends]) {
      const found = seen.get(p.teamCode);
      if (found) found.count += 1;
      else seen.set(p.teamCode, { teamCode: p.teamCode, teamName: p.teamName, count: 1 });
    }
    return [...seen.values()];
  })();

  // Everything on screen is ticked whenever the list or the team changes:
  // "send to this team" is the common case, and unticking a few is easier than
  // ticking twenty.
  useEffect(() => {
    setChosen(new Set(staged.filter((p) => !teamFilter || p.teamCode === teamFilter).map((p) => p.id)));
    setConfirming(false);
  }, [staged, teamFilter]);

  const selected = unsent.filter((p) => chosen.has(p.id));
  const sample = selected[0] || visible[0] || null;

  const read = async (body: FormData) => {
    setBusy(true);
    setError('');
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/preview`, {
        method: 'POST',
        headers: adminHeaders(),
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not read that.');
      setUpload(data);
      const notAddedCount = data.counts.rows - data.staged;
      setNote(
        `${data.staged} added to the list${notAddedCount ? `, ${notAddedCount} not added` : ''}.`,
      );
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read that.');
    } finally {
      setBusy(false);
    }
  };

  const uploadFile = (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return read(body);
  };

  const readPasted = () => {
    if (!pasted.trim()) return setError('Paste the rows first, heading row included.');
    const body = new FormData();
    body.append('text', pasted);
    return read(body);
  };

  const showEmail = async () => {
    if (emailPreview) return setEmailPreview(null);
    const params = new URLSearchParams({
      parentName: sample?.parentName || 'Neil',
      teamName: sample?.teamName || 'Your Team',
      teamCode: sample?.teamCode || 'TEAMCODE',
    });
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/preview-email?${params}`, {
        headers: adminHeaders(),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not load the preview.');
      setEmailPreview(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the preview.');
    }
  };

  const sendTest = async () => {
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/test`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testTo,
          parentName: sample?.parentName || 'Neil',
          teamName: sample?.teamName || 'Your Team',
          teamCode: sample?.teamCode || 'TEAMCODE',
        }),
      });
      const data = await res.json().catch(() => ({}));
      setNote(res.ok ? `Test sent to ${data.sentTo}` : data.error || 'Could not send that test.');
    } catch {
      setNote('Could not send that test.');
    }
  };

  const sendBatch = async (ids?: number[]) => {
    const list = ids || selected.map((p) => p.id);
    if (!list.length || sending) return;
    setSending(true);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/send`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: list }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send that batch.');
      setNote(`Sent ${data.sent}.${data.failed ? ` Failed ${data.failed}.` : ''}`);
      setConfirming(false);
      await load();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not send that batch.');
    } finally {
      setSending(false);
    }
  };

  const sendReminder = async (id: number) => {
    if (nudging) return;
    setNudging(id);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/nudge`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      setNote(res.ok ? `Reminder sent to ${data.sentTo}` : data.error || 'Could not send that reminder.');
      if (res.ok) await load();
    } catch {
      setNote('Could not send that reminder.');
    } finally {
      setNudging(0);
    }
  };

  // Delete asks once. Removing the row also clears the block on re-sending.
  const removeRecord = async (id: number) => {
    if (deleting !== id) return setDeleting(id);
    setDeleting(0);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/delete`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not delete that.');
      setStaged((rows) => rows.filter((r) => r.id !== id));
      setSends((rows) => rows.filter((r) => r.id !== id));
      setNote('Deleted. That address can be loaded again.');
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not delete that.');
    }
  };

  // A roster whose two headings sit over the wrong columns is common enough
  // that re-editing the spreadsheet is the wrong answer. Staged rows only.
  const swapColumns = async () => {
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/swap`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify(teamFilter ? { teamCode: teamFilter } : {}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not swap those columns.');
      setTeamFilter('');
      await load();
      setNote('Team and code swapped.');
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not swap those columns.');
    }
  };

  const toggle = (id: number) =>
    setChosen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const notAdded = upload ? upload.rows.filter((r) => r.skip) : [];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Parent onboarding</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Admin only</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">Load a roster onto the list. It stays here until you send it.</p>

      {/* ---- loading ---- */}
      <div className="flex items-center gap-3 mb-3">
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) uploadFile(f);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-50"
        >
          {busy ? 'Reading…' : 'Add a spreadsheet'}
        </button>
        {upload?.fileName && <span className="text-xs text-gray-600 font-semibold">{upload.fileName}</span>}
      </div>

      <details className="mb-4">
        <summary className="text-[11px] font-bold uppercase tracking-wide text-red cursor-pointer">
          or paste the rows
        </summary>
        <div className="mt-2">
          <textarea
            value={pasted}
            onChange={(e) => setPasted(e.target.value)}
            rows={6}
            placeholder={'PARENT\tPLAYER LAST NAME\tPARENT EMAIL ADDRESS\tCOACH NUMBER\tTEAM\tTEAMCODE'}
            className="w-full text-xs font-mono border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red"
          />
          <p className="text-[11px] text-gray-500 mt-1">
            Copy the cells straight out of the sheet, heading row included.
          </p>
          <button
            onClick={readPasted}
            disabled={busy}
            className="mt-2 text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            {busy ? 'Reading…' : 'Add pasted rows'}
          </button>
        </div>
      </details>

      {error && <p className="text-sm font-semibold text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-navy mb-3">{note}</p>}

      {/* ---- what the last file could not use ---- */}
      {upload && (
        <details className="mb-4">
          <summary className="text-[10px] font-bold uppercase tracking-wide text-gray-500 cursor-pointer">
            Last file: {upload.counts.rows} rows, {upload.staged} added
            {notAdded.length ? `, ${notAdded.length} not added` : ''}
          </summary>
          <div className="mt-2 flex flex-wrap gap-2 mb-2">
            {(
              [
                ['Parent', 'parentName'],
                ['Player', 'playerLastName'],
                ['Email', 'email'],
                ['Coach', 'coachNumber'],
                ['Team', 'teamName'],
                ['Code', 'teamCode'],
              ] as const
            ).map(([label, field]) => {
              const idx = upload.columns[field];
              return (
                <span key={field} className="text-[11px] bg-gray-100 rounded px-2 py-1">
                  <strong className="text-navy">{label}</strong>
                  <span className="text-gray-500">
                    {' '}
                    &larr; {idx === undefined ? 'not found' : upload.headings[idx] || `column ${idx + 1}`}
                  </span>
                </span>
              );
            })}
          </div>
          {notAdded.map((r) => (
            <p key={r.line} className="text-[11px] text-gray-500">
              Row {r.line}: {r.email || 'no email'} — <span className="text-amber-700 font-semibold">{r.skip}</span>
            </p>
          ))}
        </details>
      )}

      {/* ---- the list ---- */}
      {loaded && !everyone.length && (
        <p className="text-sm text-gray-500 font-semibold py-6 text-center border border-gray-200 rounded-lg">
          Nobody on the list yet. Add a spreadsheet above.
        </p>
      )}

      {everyone.length > 0 && (
        <>
          <div className="border border-gray-200 rounded-lg p-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={showEmail}
                className="text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-navy hover:bg-gray-50"
              >
                {emailPreview ? 'Hide the email' : 'Read the email'}
              </button>
              <input
                value={testTo}
                onChange={(e) => setTestTo(e.target.value)}
                className="text-xs border border-gray-300 rounded px-2 py-1.5 w-56 focus:outline-none focus:border-red"
              />
              <button
                onClick={sendTest}
                className="text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-navy hover:bg-gray-50"
              >
                Send me one
              </button>
              <button
                onClick={swapColumns}
                title="Use this when the Team column shows the code and the Code column shows the name"
                className="text-[10px] font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border border-gray-300 text-gray-500 hover:bg-gray-50"
              >
                Swap team &amp; code
              </button>

              <span className="ml-auto flex items-center gap-2">
                {confirming ? (
                  <>
                    <button
                      onClick={() => sendBatch()}
                      disabled={sending}
                      className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-red text-white hover:bg-red-dark disabled:opacity-50"
                    >
                      {sending ? 'Sending…' : `Send to ${selected.length} parents?`}
                    </button>
                    <button
                      onClick={() => setConfirming(false)}
                      className="text-[10px] font-semibold text-gray-500 hover:underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setConfirming(true)}
                    disabled={!selected.length}
                    className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-navy text-white hover:bg-navy-light disabled:opacity-40"
                  >
                    Send to {selected.length} selected
                  </button>
                )}
              </span>
            </div>
            {emailPreview && (
              <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                <p className="bg-gray-50 px-3 py-2 text-[11px] text-gray-600">
                  <span className="font-bold text-gray-500">Subject:</span> {emailPreview.subject}
                </p>
                <iframe title="Parent welcome" srcDoc={emailPreview.html} className="w-full h-[520px] bg-white" />
              </div>
            )}
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-3 py-2"></th>
                  {['Parent', 'Player', 'Email', 'Team', 'Code', 'Status', 'Nudged', 'Signed up', ''].map((h, i) => (
                    <th key={h + i} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((p) => {
                  const isStaged = p.status === 'staged';
                  return (
                    <tr key={p.id} className={`border-t border-gray-100 ${p.hasAccount ? 'bg-green-50' : ''}`}>
                      <td className="px-3 py-2">
                        {isStaged && (
                          <input type="checkbox" checked={chosen.has(p.id)} onChange={() => toggle(p.id)} />
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">{p.parentName || '—'}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{p.playerLastName || '—'}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{p.email}</td>
                      <td className="px-3 py-2 whitespace-nowrap">{p.teamName || '—'}</td>
                      <td className="px-3 py-2 whitespace-nowrap font-mono">{p.teamCode || '—'}</td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {isStaged ? (
                          <span className="text-gray-300">&mdash;</span>
                        ) : p.status === 'sent' ? (
                          <span className="font-semibold text-navy">Sent {(p.sentAt || '').slice(0, 10)}</span>
                        ) : (
                          <span className="font-semibold text-red">{p.status}</span>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-gray-500">
                        {p.nudgeSentAt ? p.nudgeSentAt.slice(0, 10) : '—'}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap">
                        {p.hasAccount ? (
                          <span className="font-semibold text-green-700">Yes</span>
                        ) : (
                          <span className="text-gray-400">Not yet</span>
                        )}
                      </td>
                      <td className="px-3 py-2 whitespace-nowrap text-right">
                        <span className="flex items-center justify-end gap-2">
                          {isStaged ? (
                            <button
                              onClick={() => sendBatch([p.id])}
                              disabled={sending}
                              className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-gray-300 text-navy hover:bg-gray-50 disabled:opacity-40"
                            >
                              Send
                            </button>
                          ) : (
                            p.status === 'sent' &&
                            !p.unsubscribedAt && (
                              <button
                                onClick={() => sendReminder(p.id)}
                                disabled={!!nudging}
                                className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full border border-gray-300 text-navy hover:bg-gray-50 disabled:opacity-40"
                              >
                                {nudging === p.id ? 'Sending…' : p.nudgeSentAt ? 'Remind again' : 'Remind'}
                              </button>
                            )
                          )}
                          <button
                            onClick={() => removeRecord(p.id)}
                            onBlur={() => setDeleting((d) => (d === p.id ? 0 : d))}
                            className={`text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full transition-colors ${
                              deleting === p.id
                                ? 'bg-red text-white hover:bg-red-dark'
                                : 'border border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {deleting === p.id ? 'Delete?' : 'Delete'}
                          </button>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
