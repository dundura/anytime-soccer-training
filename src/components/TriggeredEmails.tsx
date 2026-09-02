'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Triggered — the email experience, one step at a time.
 *
 * The first email somebody gets when they join, and nothing else. The panel
 * used to show all 697 the app can send, behind two dropdowns, and still could
 * not answer the question it exists for: if somebody joins and does nothing
 * else, what do they get? Answering that for one step beats listing every
 * email and leaving the answer in there somewhere.
 *
 * The steps come from the server, so adding the second one is a line there
 * rather than a change here.
 *
 * Read only. The app sends these from its own code.
 */

const API = 'https://api.anytime-soccer.com';

type Step = {
  order: number;
  when: string;
  key: string;
  email?: { subject: string | null; html?: string; file?: string };
  error?: string;
};

export default function TriggeredEmails({ token }: { token: string }) {
  const [steps, setSteps] = useState<Step[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState('');

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
      const res = await fetch(`${API}/newsletters/app-journey`, { headers: headers() });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Could not load the email experience.');
      setSteps(j.steps || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the email experience.');
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    load();
  }, [load]);

  const sendSample = async (step: Step) => {
    setSending(step.key);
    setNote('');
    try {
      const res = await fetch(`${API}/newsletters/app-triggers/${encodeURIComponent(step.key)}/test`, {
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

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Triggered</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Sent because somebody did something</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        What a player gets when they join the app. Read only — the app sends these from its own code.
      </p>

      {error && <p className="text-xs text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-green-700 mb-3">{note}</p>}
      {loading && <p className="text-xs text-gray-500">Loading…</p>}

      {!loading &&
        steps.map((step) => (
          <div key={step.key} className="border border-gray-200 rounded-lg overflow-hidden mb-4">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                  Email {step.order} — {step.when}
                </p>
                <p className="font-bold text-navy text-sm truncate">{step.email?.subject || step.key}</p>
              </div>
              <button
                onClick={() => sendSample(step)}
                disabled={sending === step.key || !step.email?.html}
                className="shrink-0 text-xs font-bold text-navy hover:underline disabled:opacity-40 disabled:no-underline"
              >
                {sending === step.key ? 'Sending…' : 'Send sample'}
              </button>
            </div>

            {step.email?.html ? (
              /* The email's own HTML, in its own document. Inlined into the page
                 it would inherit the console's styles and fight with them, which
                 is the one thing a preview must not do. */
              <iframe
                title={step.email.subject || step.key}
                srcDoc={step.email.html}
                sandbox=""
                className="w-full min-h-[360px] border-0 bg-white"
              />
            ) : (
              <p className="px-4 py-6 text-xs text-gray-400">{step.error || 'No preview for this one.'}</p>
            )}

            <p className="px-4 py-2 border-t border-gray-200 text-[11px] text-gray-500">
              Highlighted parts change per recipient.
            </p>
          </div>
        ))}
    </div>
  );
}
