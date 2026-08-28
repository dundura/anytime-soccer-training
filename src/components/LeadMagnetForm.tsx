'use client';

import { useState } from 'react';
import { LEAD_MAGNETS } from '@/lib/leadMagnets';

/**
 * One lead magnet signup form, replacing a Go High Level embed.
 *
 * Mounted directly where a page is real JSX, and portalled into a slot by
 * LeadMagnetForms where the page is a block of raw HTML. Same component either
 * way, so the two routes cannot drift apart.
 */

const API = 'https://api.anytime-soccer.com';

export default function LeadMagnetForm({ formId }: { formId: string }) {
  const magnet = LEAD_MAGNETS[formId];

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  // An id nobody mapped renders nothing rather than an unlabelled form that
  // would file signups under a sequence that does not exist.
  if (!magnet) return null;

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    setError('');
    if (!firstName.trim()) return setError('Please enter your first name.');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setBusy(true);
    try {
      const res = await fetch(`${API}/newsletters/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          sequence: magnet.sequence,
          source: magnet.sequence,
          landingPage: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong. Please try again.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="ast-lead-done">
        <p className="ast-lead-done-title">Check your inbox</p>
        <p>
          It is on its way to <strong>{email}</strong>. If it is not there shortly, have a look in your promotions or
          spam folder.
        </p>
      </div>
    );
  }

  return (
    <form className="ast-lead-form" onSubmit={submit} noValidate>
      <p className="ast-lead-heading">{magnet.heading}</p>
      <label className="ast-lead-field">
        <span>First name</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          autoComplete="given-name"
          required
        />
      </label>
      <label className="ast-lead-field">
        <span>Email address</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          inputMode="email"
          required
        />
      </label>
      {error && <p className="ast-lead-error">{error}</p>}
      <button type="submit" className="ast-lead-button" disabled={busy}>
        {busy ? 'Sending…' : magnet.button}
      </button>
      <p className="ast-lead-note">We respect your privacy. Unsubscribe anytime.</p>
    </form>
  );
}
