'use client';

import { useState } from 'react';

/**
 * The team demo request form.
 *
 * Replaces the Go High Level iframe that used to sit here. That form collected
 * into a system nothing we own can read, so a demo request was invisible until
 * someone opened GHL; this one posts to our own endpoint, lands in the demo
 * portal, emails Neil and acknowledges the club within seconds.
 *
 * Deliberately short. Every field beyond the four that matter is a reason not
 * to finish, and the rest of the conversation happens on a call anyway.
 */

const API = 'https://api.anytime-soccer.com';

type Field = { name: string; label: string; type?: string; required?: boolean; placeholder?: string; half?: boolean };

const FIELDS: Field[] = [
  { name: 'name', label: 'Your name', required: true, placeholder: 'Coach or director', half: true },
  { name: 'organization', label: 'Club or team', required: true, placeholder: 'e.g. Raleigh United FC', half: true },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@yourclub.com', half: true },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 555-5555', half: true },
  { name: 'playerCount', label: 'How many players?', type: 'number', placeholder: 'e.g. 40', half: true },
  { name: 'ageGroups', label: 'Age groups', placeholder: 'e.g. U9–U14', half: true },
  { name: 'location', label: 'Where are you based?', placeholder: 'City, State' },
];

const INPUT =
  'w-full px-4 py-3 rounded-lg border border-gray-200 text-[15px] text-[#0f2642] outline-none transition-colors focus:border-[#c80b3d] focus:ring-2 focus:ring-[#c80b3d]/15';

export default function DemoRequestForm() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError('');
    setSending(true);
    try {
      const res = await fetch(`${API}/demo-portal/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          source: 'Demo page',
          landingPage: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Something went wrong. Please try again.');
      setDone(true);
    } catch (err) {
      // The club is looking at a form that just failed, so give them the one
      // thing that always works instead of asking them to try again forever.
      setError(err instanceof Error ? err.message : 'Something went wrong. Call or email us instead.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">&#9917;</div>
        <h3 className="text-[#0f2642] text-2xl mb-3 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          GOT IT — THANK YOU
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-[340px] mx-auto">
          Neil will come back to you personally, usually the same day. Check your inbox for a confirmation.
        </p>
        <p className="text-gray-500 text-sm mt-5">
          In a hurry? Call <a href="tel:+18034311082" className="text-[#c80b3d] font-bold">803-431-1082</a>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.half ? '' : 'sm:col-span-2'}>
            <label htmlFor={f.name} className="block text-[13px] font-bold text-[#0f2642] mb-1.5">
              {f.label}
              {f.required && <span className="text-[#c80b3d]"> *</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type || 'text'}
              required={f.required}
              placeholder={f.placeholder}
              value={values[f.name] || ''}
              onChange={(e) => set(f.name, e.target.value)}
              className={INPUT}
              {...(f.type === 'number' ? { min: 1, inputMode: 'numeric' as const } : {})}
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="block text-[13px] font-bold text-[#0f2642] mb-1.5">
            Anything you want to cover?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="Optional — what would make this worth your 15 minutes?"
            value={values.notes || ''}
            onChange={(e) => set('notes', e.target.value)}
            className={INPUT + ' resize-none'}
          />
        </div>
      </div>

      {error && (
        <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error} You can always reach Neil on{' '}
          <a href="tel:+18034311082" className="font-bold underline">803-431-1082</a>.
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full mt-6 py-4 rounded-lg bg-[#c80b3d] text-white text-lg tracking-[1px] transition-all hover:bg-[#a80932] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {sending ? 'SENDING…' : 'REQUEST MY FREE DEMO'}
      </button>

    </form>
  );
}
