'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Signup form for the free 7-Day Training Plan — our own, replacing the Go High
 * Level iframe.
 *
 * The surrounding page is one large block of static HTML rendered through
 * dangerouslySetInnerHTML, and the form sits several levels deep inside it.
 * Splitting that string to weave JSX into the middle would leave unclosed tags
 * on either side of the seam, so instead the HTML keeps an empty slot div and
 * this portals into it. The page markup and its CSS are untouched.
 */

const API = 'https://api.anytime-soccer.com';
const SLOT_ID = 'ast-7day-form-slot';

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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
          lastName: lastName.trim(),
          email: email.trim(),
          sequence: '7-day-plan',
          source: '7-day-plan',
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
      <div className="ast-7day-form-done">
        <p className="ast-7day-form-done-title">Check your inbox</p>
        <p>
          Your first session is on its way to <strong>{email}</strong>. If it is not there in a minute or two, have a
          look in your promotions or spam folder.
        </p>
      </div>
    );
  }

  return (
    <form className="ast-7day-form" onSubmit={submit} noValidate>
      <div className="ast-7day-form-row">
        <label className="ast-7day-form-field">
          <span>First name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoComplete="given-name"
            required
          />
        </label>
        <label className="ast-7day-form-field">
          <span>Last name</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            autoComplete="family-name"
          />
        </label>
      </div>
      <label className="ast-7day-form-field">
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
      {error && <p className="ast-7day-form-error">{error}</p>}
      <button type="submit" className="ast-7day-form-button" disabled={busy}>
        {busy ? 'Sending…' : 'Send My Free Plan'}
      </button>
    </form>
  );
}

export default function SevenDayForm() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(SLOT_ID));
  }, []);

  if (!slot) return null;
  return createPortal(<Form />, slot);
}
