'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Triggered — the email experience, one journey at a time.
 *
 * Pick a journey, read the emails in the order somebody gets them. The panel
 * used to show all 700 the app can send, behind two dropdowns, and still could
 * not answer the question it exists for: if somebody joins and does nothing
 * else, what do they get?
 *
 * A step is its subject until you ask for more. The email opens underneath it,
 * in the page rather than over it — a step is a thing in a sequence, and a
 * modal takes you out of the sequence to read one.
 *
 * The journeys come from the server, so the next step is a line there rather
 * than a change here.
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

type Journey = { name: string; steps: Step[] };

export default function TriggeredEmails({ token }: { token: string }) {
  const [journeys, setJourneys] = useState<Journey[]>([]);
  const [journey, setJourney] = useState('');
  const [open, setOpen] = useState<string | null>(null);
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
      setJourneys(j.journeys || []);
      setJourney((j.journeys || [])[0]?.name || '');
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

  const steps = journeys.find((j) => j.name === journey)?.steps || [];

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Triggered</span>
        <span className="text-[10px] font-semibold text-amber-700/70">Sent because somebody did something</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        The emails somebody gets, in the order they get them. Read only — the app sends these from its own code.
      </p>

      {error && <p className="text-xs text-red mb-3">{error}</p>}
      {note && <p className="text-xs font-semibold text-green-700 mb-3">{note}</p>}
      {loading && <p className="text-xs text-gray-500">Loading…</p>}

      {!loading && journeys.length > 0 && (
        <>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <select
              value={journey}
              onChange={(e) => {
                setJourney(e.target.value);
                setOpen(null);
              }}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-semibold text-navy bg-white"
            >
              {journeys.map((j) => (
                <option key={j.name} value={j.name}>
                  {j.name}
                </option>
              ))}
            </select>
            <span className="text-xs text-gray-500">
              {steps.length} {steps.length === 1 ? 'email' : 'emails'}
            </span>
          </div>

          {steps.map((step) => (
            <div key={step.key} className="border border-gray-200 rounded-lg overflow-hidden mb-3">
              <div className="px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-gray-500">
                    Email {step.order} — {step.when}
                  </p>
                  <p className="font-bold text-navy text-sm">{step.email?.subject || step.key}</p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => setOpen(open === step.key ? null : step.key)}
                    disabled={!step.email?.html}
                    className="text-xs font-bold text-navy hover:underline disabled:opacity-40 disabled:no-underline"
                  >
                    {open === step.key ? 'Hide' : 'Preview'}
                  </button>
                  <button
                    onClick={() => sendSample(step)}
                    disabled={sending === step.key || !step.email?.html}
                    className="text-xs font-bold text-gray-500 hover:text-navy disabled:opacity-40"
                  >
                    {sending === step.key ? 'Sending…' : 'Send sample'}
                  </button>
                </div>
              </div>

              {open === step.key && (
                <div className="border-t border-gray-200">
                  {step.email?.html ? (
                    /* The email's own HTML, in its own document. Inlined into
                       the page it would inherit the console's styles and fight
                       with them, which is the one thing a preview must not do. */
                    <iframe
                      title={step.email.subject || step.key}
                      srcDoc={step.email.html}
                      sandbox=""
                      className="block w-full min-h-[520px] border-0 bg-white"
                    />
                  ) : (
                    <p className="px-4 py-6 text-xs text-gray-400">{step.error || 'No preview for this one.'}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
