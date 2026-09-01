'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Triggered — the emails the app sends because somebody did something.
 *
 * These live as template files rather than as rows in the newsletter tables,
 * so they were the one body of mail with nowhere to read it: the only way to
 * know what a coach receives when a player marks a folder done was to open the
 * HTML on the server. They are grouped by the part of the app that fires them,
 * and each row states the action and who receives it, because the trigger is
 * the part you cannot recover by looking at the template.
 *
 * Read only by design. The app sends these from its own code, and a console
 * that let you edit them would be editing a copy nobody sends.
 */

const API = 'https://api.anytime-soccer.com';

type Trigger = {
  key: string;
  kind: 'template' | 'builder';
  area: string;
  subject: string | null;
  sentFrom: string[];
  unused: boolean;
};

export default function TriggeredEmails({ token }: { token: string }) {
  const [triggers, setTriggers] = useState<Trigger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ subject: string; html?: string; source?: string } | null>(null);

  const headers = useCallback(
    () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),
    [token],
  );

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/newsletters/app-triggers`, { headers: headers() });
      if (!res.ok) throw new Error('Could not load the triggered emails.');
      const j = await res.json();
      setTriggers(j.triggers || []);
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

  const showPreview = async (t: Trigger) => {
    try {
      const res = await fetch(`${API}/newsletters/app-triggers/${t.key}`, { headers: headers() });
      if (!res.ok) throw new Error('Could not load that email.');
      const j = await res.json();
      setPreview({ subject: j.email.subject || t.key, html: j.email.html, source: j.email.source });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load that email.');
    }
  };

  const areas = Array.from(new Set(triggers.map((t) => t.area)));

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Triggered</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Sent because somebody did something</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Every email the app can send, found by scanning the templates and the builders rather than from a list that
        would go stale. Read only — the app sends these from its own code.
      </p>

      {error && <p className="text-xs text-red mb-3">{error}</p>}
      {loading && <p className="text-xs text-gray-500">Loading…</p>}

      {!loading &&
        areas.map((area) => (
          <div key={area} className="mb-6">
            <h3 className="text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-2">{area}</h3>
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
                  {triggers
                    .filter((t) => t.area === area)
                    .map((t) => (
                      <tr key={t.key}>
                        <td className="px-4 py-3">
                          <p className="font-semibold text-navy">{t.key}</p>
                          <p className="text-[11px] text-gray-400">
                            {t.kind === 'builder' ? 'built in code' : 'template'}
                          </p>
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
                          <button
                            onClick={() => showPreview(t)}
                            className="text-xs font-bold text-navy hover:underline"
                          >
                            {t.kind === 'builder' ? 'View code' : 'Preview'}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <p className="font-bold text-navy text-sm">{preview.subject}</p>
              <button onClick={() => setPreview(null)} className="text-gray-400 hover:text-gray-600 text-lg leading-none">
                &times;
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {preview.html ? (
                <div dangerouslySetInnerHTML={{ __html: preview.html }} />
              ) : (
                /* A builder writes its HTML in code, so there is nothing to
                   render without running it - show the source rather than an
                   empty box that looks like a broken preview. */
                <pre className="text-[11px] text-gray-700 whitespace-pre-wrap break-words">{preview.source}</pre>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
