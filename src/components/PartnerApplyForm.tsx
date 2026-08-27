'use client';

import { useState } from 'react';

/**
 * Partner application.
 *
 * Asks for the PayPal address separately from the contact email on purpose:
 * the address someone gets paid at is frequently not the one they write to you
 * from, and a payout to the wrong PayPal is not easily undone.
 */

const API = 'https://api.anytime-soccer.com';

const INPUT =
  'w-full px-4 py-3 rounded-lg border border-gray-200 text-[15px] text-[#0f2642] outline-none transition-colors focus:border-[#c80b3d] focus:ring-2 focus:ring-[#c80b3d]/15';

export default function PartnerApplyForm() {
  const [v, setV] = useState<Record<string, string>>({});
  const [terms, setTerms] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, val: string) => setV((p) => ({ ...p, [k]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!terms) { setError('You need to accept the program terms.'); return; }
    setError('');
    setSending(true);
    try {
      const res = await fetch(`${API}/partner-program/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...v, termsAccepted: true }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Something went wrong. Please try again.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  if (done) {
    return (
      <div className="text-center py-10">
        <div className="text-5xl mb-4">&#129309;</div>
        <h3 className="text-[#0f2642] text-2xl mb-3 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
          APPLICATION RECEIVED
        </h3>
        <p className="text-gray-600 leading-relaxed max-w-[340px] mx-auto">
          We review these by hand. Once you are approved we will email you your link and a dashboard to track what you have earned.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([
          ['name', 'Your name', 'text', true, 'First and last', true],
          ['email', 'Email', 'email', true, 'you@example.com', true],
          ['phone', 'Phone', 'tel', false, '(555) 555-5555', true],
          ['paypalEmail', 'PayPal address', 'email', true, 'Where we send your payouts', true],
          ['organization', 'Club, team or channel', 'text', false, 'Who you are connected to', false],
        ] as const).map(([name, label, type, required, placeholder, half]) => (
          <div key={name} className={half ? '' : 'sm:col-span-2'}>
            <label htmlFor={name} className="block text-[13px] font-bold text-[#0f2642] mb-1.5">
              {label}{required && <span className="text-[#c80b3d]"> *</span>}
            </label>
            <input
              id={name}
              type={type}
              required={required}
              placeholder={placeholder}
              value={v[name] || ''}
              onChange={(e) => set(name, e.target.value)}
              className={INPUT}
            />
          </div>
        ))}
        <div className="sm:col-span-2">
          <label htmlFor="audience" className="block text-[13px] font-bold text-[#0f2642] mb-1.5">
            Who would you be sending us?
          </label>
          <textarea
            id="audience"
            rows={3}
            placeholder="Coaches you know, a club you work with, your following — whatever it is."
            value={v.audience || ''}
            onChange={(e) => set('audience', e.target.value)}
            className={INPUT + ' resize-none'}
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 mt-5 cursor-pointer">
        <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} className="mt-1 accent-[#c80b3d] w-4 h-4" />
        <span className="text-[14px] text-gray-600 leading-relaxed">
          I have read the program terms and agree to them — including that self-referrals and bidding on the Anytime Soccer Training brand name end the partnership.
        </span>
      </label>

      {error && (
        <div className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full mt-6 py-4 rounded-lg bg-[#c80b3d] text-white text-lg tracking-[1px] transition-all hover:bg-[#a80932] disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        {sending ? 'SENDING…' : 'APPLY TO BE A PARTNER'}
      </button>
    </form>
  );
}
