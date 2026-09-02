'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Triggered — the emails the app sends because somebody did something.
 *
 * One behaviour at a time, chosen from a dropdown. The question people bring
 * to this page is always about a single moment — "what does a parent get when
 * they join?" — and the earlier version answered that by printing all 696
 * emails at once and leaving you to find it. Joining the app comes first
 * because it is the first thing anybody does.
 *
 * Read only by design. The app sends these from its own code, and a console
 * that let you edit them would be editing a copy nobody sends.
 */

const API = 'https://api.anytime-soccer.com';

type Trigger = {
  key: string;
  kind: 'template' | 'builder' | 'inline';
  behavior: string;
  subject: string | null;
  sentFrom: string[];
  unused: boolean;
};

type Preview = { subject: string; html?: string; source?: string; file?: string };

const KIND_LABEL: Record<Trigger['kind'], string> = {
  template: 'template',
  builder: 'built in code',
  inline: 'written in the route',
};

export default function TriggeredEmails({ token }: { token: string }) {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [behaviors, setBehaviors] = useState<string[]>([]);
  const [behavior, setBehavior] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [showCode, setShowCode] = useState(false);

  // The admin gate on the server reads X-Admin-Token, not the coach token, so
  // both go up together the way every other console panel sends them. Sending
  // only the bearer token is a guaranteed 403.
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
      // The server says why — "Admin sign-in required." reads very differently
      // from a scan that failed, and a fixed sentence hides both.
      if (!res.ok) throw new Error(j.error || 'Could not load the triggered emails.');
      setTriggers(j.triggers || []);
      setBehaviors(j.behaviors || []);
      setBehavior((j.behaviors || [])[0] || '');
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

  const shown = useMemo(() => triggers.filter((t) => t.behavior === behavior), [triggers, behavior]);

  const open = async (t: Trigger) => {
    setShowCode(false);
    try {
      const res = await fetch(`${API}/newsletters/app-triggers/${encodeURIComponent(t.key)}`, {
        headers: headers(),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Could not load that email.');
      setPreview({
        subject: j.email.subject || t.key,
        html: j.email.html,
        source: j.email.source,
        file: j.email.file,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load that email.');
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Triggered</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Sent because somebody did something</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Pick what somebody did. Read only — the app sends these from its own code.
      </p>

      {error && <p className="text-xs text-red mb-3">{error}</p>}
      {loading && <p className="text-xs text-gray-500">Loading…</p>}

      {!loading && behaviors.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label htmlFor="behavior" className="text-xs font-bold text-navy">
              Somebody has…
            </label>
            <select
              id="behavior"
              value={behavior}
              onChange={(e) => setBehavior(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-navy bg-white"
            >
              {behaviors.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              {shown.length} {shown.length === 1 ? 'email' : 'emails'}
            </span>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="w-full text-sm min-w-[640px]">
              <thead className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-4 py-2 font-semibold">Email</th>
                  <th className="px-4 py-2 font-semibold">Sent from</th>
                  <th className="px-4 py-2 font-semibold">Subject</th>
                  <th className="px-4 py-2" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {shown.map((t) => (
                  <tr key={t.key}>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-navy">{t.key}</p>
                      <p className="text-[11px] text-gray-400">{KIND_LABEL[t.kind]}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-[11px]">
                      {t.unused ? (
                        <span className="font-semibold text-amber-700">nothing sends this</span>
                      ) : (
                        t.sentFrom.slice(0, 2).join(', ') +
                        (t.sentFrom.length > 2 ? ` +${t.sentFrom.length - 2}` : '')
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {t.subject || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => open(t)} className="text-xs font-bold text-navy hover:underline">
                        Preview
                      </button>
                    </td>
                  </tr>
                ))}
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
                {/* An email built in code is only readable if you can see which
                    file it came out of — the subject alone does not locate it. */}
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
