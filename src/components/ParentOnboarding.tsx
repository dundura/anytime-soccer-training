'use client';

import { useRef, useState } from 'react';

/**
 * Parent onboarding — reading the roster before anybody is emailed.
 *
 * Upload a spreadsheet or paste the cells, see exactly what is in it, read the
 * email, then send. The file is parsed on the server so the portal and the
 * sender can never disagree about what a column is called, and the send is
 * gated on a unique key of (email, team code) so a re-uploaded list cannot
 * email the same parent twice.
 */

const API = 'https://api.anytime-soccer.com';

type Row = {
  line: number;
  parentName: string | null;
  playerLastName: string | null;
  email: string | null;
  coachNumber: string | null;
  teamName: string | null;
  teamCode: string | null;
  skip: string | null;
  alreadySent: boolean;
  hasAccount: boolean;
};

type HistoryRow = {
  id: number;
  email: string;
  parentName: string | null;
  teamName: string | null;
  teamCode: string;
  status: string;
  error: string | null;
  sentAt: string | null;
  nudgeSentAt: string | null;
  unsubscribedAt: string | null;
  hasAccount: number;
};

type Preview = {
  fileName: string | null;
  columns: string[];
  counts: { rows: number; sendable: number; skipped: number; withAccount: number };
  teams: { teamCode: string; teamName: string | null; count: number }[];
  rows: Row[];
};

export default function ParentOnboarding({ token }: { token: string | null }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [showSkipped, setShowSkipped] = useState(true);
  const [pasted, setPasted] = useState('');
  const [chosen, setChosen] = useState<Set<number>>(new Set());
  const [emailPreview, setEmailPreview] = useState<{ subject: string; html: string } | null>(null);
  const [testTo, setTestTo] = useState('neil@anytime-soccer.com');
  const [note, setNote] = useState('');
  const [confirming, setConfirming] = useState(false);
  const [sending, setSending] = useState(false);
  const [history, setHistory] = useState<HistoryRow[] | null>(null);

  // A file and pasted cells go to the same endpoint - the server turns both
  // into the same grid, so the two routes in cannot read a column differently.
  const send = async (body: FormData) => {
    setBusy(true);
    setError('');
    setPreview(null);
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/preview`, {
        method: 'POST',
        headers: {
          Authorization: token || '',
          'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
        },
        body,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not read that.');
      setPreview(data);
      selectAll(data);
      setEmailPreview(null);
      setConfirming(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not read that.');
    } finally {
      setBusy(false);
    }
  };

  const upload = (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return send(body);
  };

  const readPasted = () => {
    if (!pasted.trim()) return setError('Paste the rows first, heading row included.');
    const body = new FormData();
    body.append('text', pasted);
    return send(body);
  };

  const adminHeaders = () => ({
    Authorization: token || '',
    'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
  });

  // Everything selectable is selected the moment a file is read: the common
  // case is "send to this whole roster", and unticking is easier than ticking.
  const selectAll = (p: Preview) => setChosen(new Set(p.rows.filter((r) => !r.skip).map((r) => r.line)));

  const toggle = (line: number) =>
    setChosen((prev) => {
      const next = new Set(prev);
      if (next.has(line)) next.delete(line);
      else next.add(line);
      return next;
    });

  const selected = preview ? preview.rows.filter((r) => !r.skip && chosen.has(r.line)) : [];
  const sample = selected[0] || preview?.rows.find((r) => !r.skip) || null;

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

  const loadHistory = async () => {
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/history`, { headers: adminHeaders() });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setHistory(data.sends || []);
    } catch {
      /* the table is a convenience; a failure here is not worth an alarm */
    }
  };

  const sendBatch = async () => {
    if (!selected.length || sending) return;
    setSending(true);
    setNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/parent-onboarding/send`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows: selected }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not send that batch.');
      setNote(`Sent ${data.sent}. Skipped ${data.skipped}. Failed ${data.failed}.`);
      setConfirming(false);
      // Re-read so anybody just emailed shows as already sent rather than
      // still selectable.
      loadHistory();
    } catch (e) {
      setNote(e instanceof Error ? e.message : 'Could not send that batch.');
    } finally {
      setSending(false);
    }
  };

  const rows = preview ? (showSkipped ? preview.rows : preview.rows.filter((r) => !r.skip)) : [];

  return (
    <div className="px-4 py-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Parent onboarding</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Admin only</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Upload the roster to see who would be emailed. Nothing is sent from this screen.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) upload(f);
            e.target.value = '';
          }}
        />
        <button
          onClick={() => fileRef.current?.click()}
          disabled={busy}
          className="text-[11px] font-bold uppercase tracking-wide px-4 py-2 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-50"
        >
          {busy ? 'Reading…' : preview ? 'Choose another file' : 'Choose spreadsheet'}
        </button>
        {preview?.fileName && <span className="text-xs text-gray-600 font-semibold">{preview.fileName}</span>}
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
            placeholder={'PARENT	PLAYER LAST NAME	PARENT EMAIL ADDRESS	COACH NUMBER	TEAM	TEAMCODE'}
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
            {busy ? 'Reading…' : 'Read pasted rows'}
          </button>
        </div>
      </details>

      {error && <p className="text-sm font-semibold text-red mb-4">{error}</p>}

      {preview && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {[
              { label: 'Rows', value: preview.counts.rows },
              { label: 'Would send', value: preview.counts.sendable },
              { label: 'Skipped', value: preview.counts.skipped },
              { label: 'Already have an account', value: preview.counts.withAccount },
            ].map((c) => (
              <div key={c.label} className="border border-gray-200 rounded-lg px-3 py-2">
                <p className="text-xl font-extrabold text-navy leading-none">{c.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-500 mt-1">{c.label}</p>
              </div>
            ))}
          </div>

          {preview.teams.length > 0 && (
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500 mb-1">Team codes in this file</p>
              <div className="flex flex-wrap gap-2">
                {preview.teams.map((t) => (
                  <span key={t.teamCode} className="text-xs bg-gray-100 rounded-full px-3 py-1">
                    <strong className="text-navy">{t.teamName || 'No team name'}</strong>
                    <span className="text-gray-500"> · {t.teamCode} · {t.count}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

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

              <span className="ml-auto flex items-center gap-2">
                {confirming ? (
                  <>
                    <button
                      onClick={sendBatch}
                      disabled={sending}
                      className="text-[10px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-red text-white hover:bg-red-dark disabled:opacity-50"
                    >
                      {sending ? 'Sending…' : `Send to ${selected.length} parents?`}
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
                    Send to {selected.length} selected
                  </button>
                )}
              </span>
            </div>
            {note && <p className="text-xs font-semibold text-navy mt-2">{note}</p>}
            {emailPreview && (
              <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
                <p className="bg-gray-50 px-3 py-2 text-[11px] text-gray-600">
                  <span className="font-bold text-gray-500">Subject:</span> {emailPreview.subject}
                </p>
                <iframe title="Parent welcome" srcDoc={emailPreview.html} className="w-full h-[520px] bg-white" />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-gray-600 mb-2 select-none">
            <input type="checkbox" checked={showSkipped} onChange={(e) => setShowSkipped(e.target.checked)} />
            Show skipped rows
          </label>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  <th className="px-3 py-2"></th>
                  {['#', 'Parent', 'Player', 'Email', 'Team', 'Code', 'Status'].map((h) => (
                    <th key={h} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.line} className={`border-t border-gray-100 ${r.skip ? 'bg-gray-50 text-gray-400' : ''}`}>
                    <td className="px-3 py-2">
                      {!r.skip && (
                        <input type="checkbox" checked={chosen.has(r.line)} onChange={() => toggle(r.line)} />
                      )}
                    </td>
                    <td className="px-3 py-2 text-gray-400">{r.line}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{r.parentName || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{r.playerLastName || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{r.email || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{r.teamName || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-mono">{r.teamCode || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {r.skip ? (
                        <span className="font-semibold text-amber-700">{r.skip}</span>
                      ) : r.hasAccount ? (
                        <span className="font-semibold text-gray-500">Has an account</span>
                      ) : (
                        <span className="font-semibold text-green-700">Would send</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="mt-6">
        <button
          onClick={() => (history ? setHistory(null) : loadHistory())}
          className="text-[11px] font-bold uppercase tracking-wide text-red hover:underline"
        >
          {history ? '▾ Hide what has been sent' : '▸ What has been sent'}
        </button>
        {history && (
          <div className="mt-2 overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-xs">
              <thead className="bg-gray-50 text-gray-500">
                <tr>
                  {['Parent', 'Email', 'Team', 'Code', 'Sent', 'Nudged', 'Signed up'].map((h) => (
                    <th key={h} className="text-left font-bold uppercase tracking-wide px-3 py-2 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id} className="border-t border-gray-100">
                    <td className="px-3 py-2 whitespace-nowrap">{h.parentName || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{h.email}</td>
                    <td className="px-3 py-2 whitespace-nowrap">{h.teamName || '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap font-mono">{h.teamCode}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {h.status === 'sent' ? (h.sentAt || '').slice(0, 10) : <span className="text-red font-semibold">{h.status}</span>}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-gray-500">{h.nudgeSentAt ? (h.nudgeSentAt || '').slice(0, 10) : '—'}</td>
                    <td className="px-3 py-2 whitespace-nowrap">
                      {h.hasAccount ? <span className="font-semibold text-green-700">Yes</span> : <span className="text-gray-400">Not yet</span>}
                    </td>
                  </tr>
                ))}
                {!history.length && (
                  <tr><td colSpan={7} className="px-3 py-6 text-center text-gray-500 font-semibold">Nothing sent yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
