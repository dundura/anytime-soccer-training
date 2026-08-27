'use client';

import { useState } from 'react';

/**
 * Email in exchange for the partner's discount code.
 *
 * The Fusion page prints its code on the page because it is one club Neil built
 * by hand. Here the code is the thing being traded for the email, so it is
 * never rendered until it has been claimed — and that email is the attribution
 * that survives a different device three months later, which a cookie does not.
 */

const API = 'https://api.anytime-soccer.com';

const INPUT =
  'w-full px-4 py-3 rounded-lg border border-[#7ec8e3]/40 bg-white text-[15px] text-[#1a2a3a] outline-none transition-colors focus:border-[#1a2a3a] focus:ring-2 focus:ring-[#7ec8e3]/30';

export default function PartnerClaimForm({ code, percent, who, demo, pricing, intent }: { code: string; percent: number; who?: string; demo: string; pricing: string; intent?: 'team' | 'player' | null }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [sending, setSending] = useState(false);
  const [given, setGiven] = useState('');
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setError('');
    setSending(true);
    try {
      const res = await fetch(`${API}/partner-program/claim`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, email, name, organization, audience: intent || null }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Something went wrong. Please try again.');
      setGiven(d.discountCode || '');
      setClaimed(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(given);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard blocked; the code is on screen and in their inbox anyway.
    }
  };

  if (claimed && !given) {
    // Claimed before the partner's code was set up. The email is captured -
    // which is the part that matters - and Neil is told to send the code on.
    return (
      <div className="text-center">
        <div className="text-4xl mb-3">&#9917;</div>
        <p className="text-[#1a2a3a] font-bold text-lg mb-1">You are on the list</p>
        <p className="text-sm text-gray">Your {percent}% off code is on its way to your inbox. Keep an eye out for it.</p>
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Now pick your next step</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            {intent === 'player' ? (
              <>
                <a href={pricing} className="flex-1 text-center bg-red text-white font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-red-dark transition-colors">Join for free</a>
                <a href={demo} className="flex-1 text-center bg-white border-2 border-navy text-navy font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">Book a demo</a>
              </>
            ) : (
              <>
                <a href={demo} className="flex-1 text-center bg-red text-white font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-red-dark transition-colors">Book a demo</a>
                <a href={pricing} className="flex-1 text-center bg-white border-2 border-navy text-navy font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">Join for free</a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (given) {
    return (
      <div className="text-center">
        <p className="text-[#1a2a3a] font-bold text-lg mb-1">Here is your code</p>
        <p className="text-sm text-gray mb-4">We have emailed it to you as well.</p>
        <div className="bg-white border-2 border-dashed border-[#1a2a3a] rounded-xl py-5 px-4 mb-4">
          <div className="text-[28px] font-extrabold tracking-[3px] text-[#1a2a3a] break-all">{given}</div>
        </div>
        <button
          onClick={copy}
          className="bg-[#1a2a3a] text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-[#1a2a3a]/90 transition-colors"
        >
          {copied ? 'Copied' : 'Copy code'}
        </button>
        <p className="text-xs text-gray mt-4">
          Enter it at checkout for {percent}% off. It does not expire.
        </p>
        <div className="mt-6 pt-5 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-3">Now pick your next step</p>
          <div className="flex flex-col sm:flex-row gap-2.5">
            {intent === 'player' ? (
              <>
                <a href={pricing} className="flex-1 text-center bg-red text-white font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-red-dark transition-colors">Join for free</a>
                <a href={demo} className="flex-1 text-center bg-white border-2 border-navy text-navy font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">Book a demo</a>
              </>
            ) : (
              <>
                <a href={demo} className="flex-1 text-center bg-red text-white font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-red-dark transition-colors">Book a demo</a>
                <a href={pricing} className="flex-1 text-center bg-white border-2 border-navy text-navy font-bold text-sm px-5 py-3 rounded-lg no-underline hover:bg-navy hover:text-white transition-colors">Join for free</a>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <p className="text-[#1a2a3a] font-extrabold text-xl mb-1">Get {percent}% off</p>
      <p className="text-sm text-gray mb-5">
        {intent === 'team' ? 'For your team. ' : intent === 'player' ? 'For your player. ' : ''}
        Tell us where to send it{who ? <> &mdash; your discount comes courtesy of {who}</> : null}.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={INPUT}
          aria-label="Your name"
        />
        <input
          type="text"
          placeholder={intent === 'player' ? 'Their club (optional)' : 'Club or team'}
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
          className={INPUT}
          aria-label="Club or team"
        />
        <div className="sm:col-span-2">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={INPUT}
            aria-label="Email address"
          />
        </div>
      </div>

      {error && (
        <div className="mt-3 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="w-full mt-4 bg-red text-white font-extrabold text-base uppercase tracking-wider py-3.5 rounded-lg hover:bg-red-dark transition-colors disabled:opacity-60"
      >
        {sending ? 'Sending…' : `Send me my ${percent}% off code`}
      </button>

      <p className="text-[11px] text-gray text-center mt-3">
        One email with your code. No spam.
      </p>
    </form>
  );
}
