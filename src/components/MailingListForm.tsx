'use client';

import { useState } from 'react';
import Honeypot, { useHoneypot } from './Honeypot';

/**
 * Mailing list signup. Files into the evergreen sequence.
 *
 * First name and email only. Every field beyond what is genuinely needed costs
 * signups, and the sequence only ever greets them by first name.
 */

const API = 'https://api.anytime-soccer.com';

export default function MailingListForm() {
  const hp = useHoneypot();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

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
          website: hp.value(),
          email: email.trim(),
          sequence: 'evergreen',
          source: 'manual',
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
        <p className="ast-lead-done-title">You are on the list</p>
        <p>
          Thanks for joining. Anything worth sending will land at <strong>{email}</strong>, and nothing that
          is not.
        </p>
      </div>
    );
  }

  return (
    <form className="ast-lead-form" onSubmit={submit} noValidate>
      <Honeypot inputRef={hp.ref} />
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
        {busy ? 'Joining…' : 'Join the list'}
      </button>
      <p className="ast-lead-note">We respect your privacy. Unsubscribe anytime.</p>
    </form>
  );
}
