'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Honeypot, { useHoneypot } from './Honeypot';

/**
 * The age group calculator.
 *
 * It used to be an inline <script> inside the page HTML, which React renders
 * as inert text — the season dropdown never filled, the submit handler was
 * never attached, and the form did a plain GET, putting the parent's email in
 * the URL and capturing nothing. This is the same calculator as a component,
 * portalled into the slot the page now leaves behind.
 *
 * The class names are the page's own, so its CSS still styles all of it.
 */

const API = 'https://api.anytime-soccer.com';

/** Five seasons starting from this one: "2026 - 2027". */
function seasons(): string[] {
  const year = new Date().getFullYear();
  return Array.from({ length: 5 }, (_, i) => `${year + i} - ${year + i + 1}`);
}

/**
 * The three formation cycles in use.
 *
 * Birth year against the season's END year. A player born before the cutoff
 * month has already had a birthday inside the season, so they land a year up.
 */
function ageGroups(birthDate: string, season: string) {
  const birth = new Date(birthDate);
  const birthYear = birth.getFullYear();
  const birthMonth = birth.getMonth() + 1;
  const endYear = parseInt(season.split(' - ')[1], 10);
  return {
    january: `U${endYear - birthYear}`,
    september: `U${birthMonth < 9 ? endYear - birthYear + 1 : endYear - birthYear}`,
    august: `U${birthMonth < 8 ? endYear - birthYear + 1 : endYear - birthYear}`,
  };
}

function Calculator() {
  const hp = useHoneypot();
  const options = seasons();
  const [parentFirstName, setParentFirstName] = useState('');
  const [playerFirstName, setPlayerFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [season, setSeason] = useState(options[0]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<null | {
    birthDate: string;
    season: string;
    groups: ReturnType<typeof ageGroups>;
  }>(null);

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    setError('');
    if (!parentFirstName.trim()) return setError("Please enter parent's first name");
    if (!playerFirstName.trim()) return setError("Please enter player's first name");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) return setError('Please enter a valid email address');
    if (!birthDate) return setError("Please enter player's birth date");

    const groups = ageGroups(birthDate, season);
    setBusy(true);
    // The answer shows either way. A capture that fails is our problem, not a
    // reason to make somebody fill the form in again.
    try {
      await fetch(`${API}/newsletters/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: parentFirstName.trim(),
          website: hp.value(),
          email: email.trim(),
          sequence: 'calculator',
          source: 'manual',
          landingPage: typeof window !== 'undefined' ? window.location.pathname : null,
        }),
      });
    } catch {
      /* ignore */
    }
    setBusy(false);
    setResult({ birthDate, season, groups });
  };

  if (result) {
    const [y, m, d] = result.birthDate.split('-');
    return (
      <div className="ast-result-section">
        <div className="ast-birth-date-display">{`${m}/${d}/${y}`}</div>
        <h2 className="ast-season-title">{`For the ${result.season} Season:`}</h2>
        <div className="ast-age-groups">
          <div className="ast-age-group-card ast-blue">
            <span className="ast-age-group-label">January 1 - December 31</span>
            <span className="ast-age-badge">{result.groups.january}</span>
          </div>
          <div className="ast-age-group-card ast-red">
            <span className="ast-age-group-label">September 1 - August 31</span>
            <span className="ast-age-badge">{result.groups.september}</span>
          </div>
          <div className="ast-age-group-card ast-navy">
            <span className="ast-age-group-label">August 1 - July 31</span>
            <span className="ast-age-badge">{result.groups.august}</span>
          </div>
        </div>
        <div className="ast-results-footnote">
          <p>
            <strong>Which age group should I use?</strong> It depends on your organization&apos;s formation cycle. Most
            US Soccer organizations use the January 1 - December 31 cycle, but some leagues and clubs use September 1 -
            August 31 (school year) or August 1 - July 31. Check with your club or league to confirm which formation
            cycle they follow.
          </p>
        </div>
        <button type="button" className="ast-submit-button" onClick={() => setResult(null)}>
          Calculate Another
        </button>
      </div>
    );
  }

  const [start, end] = season.split(' - ');

  return (
    <form className="ast-calculator-form" onSubmit={submit} noValidate>
      <Honeypot inputRef={hp.ref} />
      <div className="ast-form-group">
        <label htmlFor="astParentFirstName" className="ast-form-label">Parent First Name</label>
        <input
          type="text"
          id="astParentFirstName"
          className="ast-form-input"
          placeholder="Enter parent's first name"
          value={parentFirstName}
          onChange={(e) => setParentFirstName(e.target.value)}
        />
      </div>
      <div className="ast-form-group">
        <label htmlFor="astPlayerFirstName" className="ast-form-label">Player First Name</label>
        <input
          type="text"
          id="astPlayerFirstName"
          className="ast-form-input"
          placeholder="Enter player's first name"
          value={playerFirstName}
          onChange={(e) => setPlayerFirstName(e.target.value)}
        />
      </div>
      <div className="ast-form-group">
        <label htmlFor="astEmail" className="ast-form-label">Email Address</label>
        <input
          type="email"
          id="astEmail"
          className="ast-form-input"
          placeholder="your.email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="ast-form-group">
        <label htmlFor="astBirthDate" className="ast-form-label">Player&apos;s Birth Date</label>
        <input
          type="date"
          id="astBirthDate"
          className="ast-form-input"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>
      <div className="ast-form-group">
        <label htmlFor="astSeason" className="ast-form-label">Season Year</label>
        <select
          id="astSeason"
          className="ast-form-select"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          {options.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <p className="ast-form-helper">{`Select the season (Fall ${start} / Spring ${end})`}</p>
      </div>
      {error && <div className="ast-error-message">{error}</div>}
      <button type="submit" className="ast-submit-button" disabled={busy}>
        {busy ? 'Calculating…' : 'Calculate Age Group'}
      </button>
    </form>
  );
}

/** Mounts the calculator into the slot left in the page HTML. */
export default function AgeCalculator() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.querySelector<HTMLElement>('[data-age-calculator]'));
  }, []);

  if (!slot) return null;
  return createPortal(<Calculator />, slot);
}
