'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Honeypot, { useHoneypot } from './Honeypot';
import { landingPageWithCampaign, trackLead } from '@/lib/metaPixel';

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
  const hp = useHoneypot();
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
          website: hp.value(),
          lastName: lastName.trim(),
          email: email.trim(),
          sequence: '7-day-plan',
          source: '7-day-plan',
          landingPage: landingPageWithCampaign(),
        }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong. Please try again.');
      trackLead('7-day-plan');
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
      <Honeypot inputRef={hp.ref} />
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

// Same form on a page that has no portal slot (/free-training-plan). The page
// above carries its own copy of this CSS inside its static HTML, so the styles
// are scoped to a wrapper here and take their colours from the site tokens.
const CARD_CSS = `.ast-7day-card{--ast-navy:#0F3154;--ast-red:#DC373E;font-family:inherit}
.ast-7day-card .ast-7day-form {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.ast-7day-card .ast-7day-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

@media (max-width: 520px) {
  .ast-7day-card .ast-7day-form-row {
    grid-template-columns: 1fr;
  }
}

.ast-7day-card .ast-7day-form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ast-7day-card .ast-7day-form-field span {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--ast-navy);
}

.ast-7day-card .ast-7day-form-field input {
  width: 100%;
  padding: 13px 14px;
  font-size: 1rem;
  font-family: inherit;
  color: var(--ast-navy);
  background: #fff;
  border: 1px solid #d6dbe3;
  border-radius: 8px;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}

.ast-7day-card .ast-7day-form-field input:focus {
  outline: none;
  border-color: var(--ast-navy);
  box-shadow: 0 0 0 3px rgba(15, 49, 84, 0.12);
}

.ast-7day-card .ast-7day-form-button {
  width: 100%;
  padding: 16px 24px;
  margin-top: 4px;
  font-size: 1.0625rem;
  font-weight: 700;
  font-family: inherit;
  color: #fff;
  background: var(--ast-red);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
}

.ast-7day-card .ast-7day-form-button:hover:not(:disabled) {
  background: #c22e35;
  transform: translateY(-1px);
}

.ast-7day-card .ast-7day-form-button:disabled {
  opacity: 0.65;
  cursor: default;
}

.ast-7day-card .ast-7day-form-error {
  margin: 0;
  font-size: 0.875rem;
  color: var(--ast-red);
}

.ast-7day-card .ast-7day-form-done {
  padding: 28px 24px;
  text-align: center;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 10px;
  color: #166534;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.ast-7day-card .ast-7day-form-done-title {
  margin: 0 0 8px;
  font-size: 1.25rem;
  font-weight: 700;
}`;

export function SevenDayFormCard() {
  return (
    <div className="ast-7day-card">
      <style>{CARD_CSS}</style>
      <h2 className="text-3xl md:text-4xl font-black text-navy mb-2">Get Your Free <span className="text-red">7-Day Plan</span></h2>
      <p className="text-gray-500 mb-6">7 daily emails with follow-along video training. Just 10 minutes a day. No credit card required.</p>
      <Form />
      <p className="text-gray-400 text-sm text-center mt-4">We respect your privacy. Unsubscribe anytime.</p>
    </div>
  );
}
