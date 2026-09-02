'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Triggered — the emails the app sends because somebody did something.
 *
 * Pick a person, pick a thing they did, read what they get. That is the only
 * question anybody brings to this page — "if they do nothing but join, what
 * do they get?" — and the first version answered it by printing all 696 emails
 * at once and leaving you to find the answer in the list.
 *
 * Subject, preview, sample. Nothing else on the row on purpose: the file an
 * email is sent from answers a question nobody was asking, and it pushed the
 * subject — the only part you actually read — into the middle of the table.
 *
 * Read only. The app sends these from its own code, and a console that let you
 * edit them would be editing a copy nobody sends.
 */

const API = 'https://api.anytime-soccer.com';

type Trigger = {
  key: string;
  kind: 'template' | 'builder' | 'inline';
  audience: string;
  behavior: string;
  subject: string | null;
};

type Preview = { subject: string; html?: string; source?: string; file?: string };

export default function TriggeredEmails({ token }: { token: string }) {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [audiences, setAudiences] = useState<string[]>([]);
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [audience, setAudience] = useState('');
  const [behavior, setBehavior] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState('');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [showCode, setShowCode] = useState(false);

  // The admin gate on the server reads X-Admin-Token, not the coach token, so
  // both go up together the way every other console panel sends them.
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
    try {
      const res = await fetch(`${API}/newsletters/app-triggers`, { headers: headers() });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Could not load the triggered emails.');
      setTriggers(j.triggers || []);
      setAudiences(j.audiences || []);
      setBehaviors(j.behaviors || []);
      setAudience((j.audiences || [])[0] || '');
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the triggered emails.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    load();
  }, [load]);

  // Only the things this person actually does. A dropdown offering behaviours
  // with nothing behind them is a dropdown that lies about what it knows.
  const theirBehaviors = useMemo(
    () => behaviors.filter((b) => triggers.some((t) => t.audience === audience && t.behavior === b)),
    [behaviors, triggers, audience],
  );

  useEffect(() => {
    if (theirBehaviors.length && !theirBehaviors.includes(behavior)) setBehavior(theirBehaviors[0]);
  }, [theirBehaviors, behavior]);

  const shown = useMemo(
    () => triggers.filter((t) => t.audience === audience && t.behavior === behavior),
    [triggers, audience, behavior],
  );

  const open = async (t: Trigger) => {
    setShowCode(false);
    try {
      const res = await fetch(`${API}/newsletters/app-triggers/${encodeURIComponent(t.key)}`, {
        headers: headers(),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Could not load that email.');
      setPreview({ subject: j.email.subject || t.key, html: j.email.html, source: j.email.source, file: j.email.file });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load that email.');
    }
  };

  const sendSample = async (t: Trigger) => {
    setSending(t.key);
    setNote('');
    try {
      const res = await fetch(`${API}/newsletters/app-triggers/${encodeURIComponent(t.key)}/test`, {
        method: 'POST',
        headers: headers(),
        body: JSON.stringify({}),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Could not send the sample.');
      setNote(`Sample sent to ${j.to}.`);
      setTimeout(() => setNote(''), 6000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send the sample.');
    } finally {
      setSending('');
    }
  };

  const select = 'border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-navy bg-white';

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Triggered</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Sent because somebody did something</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Pick a person and something they did. Read only — the app sends these from its own code.
      </p>

      {error && <p className="text-xs text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-green-700 mb-3">{note}</p>}
      {loading && <p className="text-xs text-gray-500">Loading…</p>}

      {!loading && audiences.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className={select}>
              {audiences.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">…</span>
            <select value={behavior} onChange={(e) => setBehavior(e.target.value)} className={select}>
              {theirBehaviors.map((b) => (
                <option key={b} value={b}>
                  {b.charAt(0).toLowerCase() + b.slice(1)}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              gets {shown.length} {shown.length === 1 ? 'email' : 'emails'}
            </span>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">Subject</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shown.map((t) => (
                  <tr key={t.key}>
                    <td className="px-4 py-3 text-navy font-semibold">{t.subject || t.key}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => open(t)} className="text-xs font-bold text-navy hover:underline">
                        Preview
                      </button>
                      <button
                        onClick={() => sendSample(t)}
                        disabled={sending === t.key}
                        className="ml-4 text-xs font-bold text-gray-500 hover:text-navy disabled:opacity-50"
                      >
                        {sending === t.key ? 'Sending…' : 'Send sample'}
                      </button>
                    </td>
                  </tr>
                ))}
                {shown.length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-4 py-6 text-center text-xs text-gray-400">
                      Nothing is sent for this.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-200 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-bold text-navy text-sm truncate">{preview.subject}</p>
                {preview.file && <p className="text-[11px] text-gray-400 truncate">{preview.file}</p>}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {preview.html && preview.source && (
                  <button
                    onClick={() => setShowCode((v) => !v)}
                    className="text-[11px] font-bold text-gray-500 hover:text-navy"
                  >
                    {showCode ? 'Preview' : 'Code'}
                  </button>
                )}
                <button
                  onClick={() => setPreview(null)}
                  className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  &times;
                </button>
              </div>
            </div>

            {preview.html && !showCode ? (
              <>
                {/* The email's own HTML, in its own document. Inlined into the
                    page it would inherit the console's styles and fight with
                    them, which is the one thing a preview must not do. */}
                <iframe
                  title={preview.subject}
                  srcDoc={preview.html}
                  sandbox=""
                  className="w-full flex-1 min-h-[420px] border-0 bg-white"
                />
                <p className="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-500">
                  Highlighted parts change per recipient.
                </p>
              </>
            ) : (
              <div className="overflow-y-auto p-4">
                <pre className="text-[11px] text-gray-700 whitespace-pre-wrap break-words">{preview.source}</pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
