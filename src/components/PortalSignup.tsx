'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Account and team, made inside the onboarding portal.
 *
 * New coach: account details, then the team name, then one submit. The server
 * emails a verify link and creates the account and the team when it is
 * clicked, so the portal can only say "check your email" -- never "done".
 * Coach with an account already: email, app password and a team name, and the
 * team is added straight away.
 *
 * Same endpoints and bot check as the app's own sign-up.
 */

const API = 'https://api.anytime-soccer.com';
const TURNSTILE_SITE_KEY = '0x4AAAAAACWJIblAcovDErSK';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
    };
  }
}

type Mode = 'choose' | 'new' | 'kids' | 'team' | 'existing' | 'sent' | 'added';
type Kid = { screenName: string; gender: 'male' | 'female' };
const MAX_KIDS = 3; // four profiles per account, and the coach's own is one of them

const input = 'w-full border-2 border-blue-200 focus:border-navy outline-none rounded-lg px-3 py-2.5 text-navy bg-white';
const label = 'block text-sm font-semibold text-navy mb-1';
const redBtn = 'bg-red text-white font-bold rounded-lg px-5 py-2.5 disabled:opacity-60';
const grayBtn = 'border-2 border-blue-200 text-navy font-bold rounded-lg px-5 py-2.5';

export default function PortalSignup({ defaults }: { defaults?: { name?: string; email?: string; teamName?: string } }) {
  const [mode, setMode] = useState<Mode>('choose');
  const [first, setFirst] = useState((defaults?.name || '').split(' ')[0] || '');
  const [last, setLast] = useState((defaults?.name || '').split(' ').slice(1).join(' '));
  const [email, setEmail] = useState(defaults?.email || '');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [teamName, setTeamName] = useState('');
  const [kids, setKids] = useState<Kid[]>([{ screenName: '', gender: 'male' }]);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [token, setToken] = useState('');
  const [confirmToken, setConfirmToken] = useState('');
  const [resent, setResent] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // The bot check only matters on the screen that creates a new account.
  useEffect(() => {
    if (mode !== 'team') { widgetId.current = null; return; }
    if (!document.getElementById('turnstile-script')) {
      const s = document.createElement('script');
      s.id = 'turnstile-script';
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      s.async = true;
      document.head.appendChild(s);
    }
    const timer = setInterval(() => {
      if (widgetId.current !== null || !window.turnstile || !widgetRef.current) return;
      clearInterval(timer);
      widgetId.current = window.turnstile.render(widgetRef.current, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (t: string) => setToken(t),
        'expired-callback': () => { setToken(''); if (widgetId.current) window.turnstile?.reset(widgetId.current); },
        'error-callback': () => setToken(''),
      });
    }, 100);
    return () => clearInterval(timer);
  }, [mode]);

  // True when the name is free. The server answers 200 `true` for free and 400 `false` for taken;
  // any other failure does not block, since the server checks again when the account is made.
  const nameIsFree = async (name: string) => {
    try {
      const r = await fetch(`${API}/team/check-unique-teamname-signup?name=${encodeURIComponent(name.trim())}`);
      if (r.status === 400) return false;
      if (!r.ok) return true;
      return (await r.json()) !== false;
    } catch { return true; }
  };

  const toTeam = () => {
    setError('');
    if (!first.trim() || !last.trim()) return setError('Enter your first and last name.');
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) return setError('Enter a valid email address.');
    if (password.length < 6) return setError('Pick a password of at least 6 characters.');
    if (password !== confirm) return setError('The two passwords do not match.');
    setMode('kids');
  };

  const createNew = async () => {
    setError('');
    const name = teamName.trim();
    if (!name) return setError('Enter your team name.');
    if (name.length > 25) return setError('Team names are 25 characters or fewer.');
    if (!token) return setError('Please complete the check below first.');
    setBusy(true);
    try {
      if (!(await nameIsFree(name))) { setBusy(false); return setError('That team name is already being used. Please pick another name.'); }
      const r = await fetch(`${API}/stepsregistration/confirmemail`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(), password, parentFirstName: first.trim(), parentLastName: last.trim(),
          role: 'coach', coachGender: 'male', players: kids.filter(k => k.screenName.trim()).map(k => ({ screenName: k.screenName.trim(), gender: k.gender })), teamName: name, promoName: '', turnstileToken: token, fromPortal: true,
        }),
      });
      if (r.ok) {
        try { setConfirmToken((await r.json()).token || ''); } catch { /* resend button just hides */ }
        setMode('sent');
        setBusy(false);
        return;
      }
      let msg = '';
      try { msg = (await r.json()).message || ''; } catch { /* no body */ }
      if (r.status === 400) setError('The bot check failed. Please try again.');
      else if (/already taken/i.test(msg)) { setMode('existing'); setError('You already have an account with that email. Enter your app password to add your team.'); }
      else setError(msg || 'Something went wrong. Please try again.');
      if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current);
      setToken('');
    } catch { setError('Something went wrong. Please try again.'); }
    setBusy(false);
  };

  const addToExisting = async () => {
    setError('');
    if (!email.trim() || !password || !teamName.trim()) return setError('Enter your email, password and team name.');
    setBusy(true);
    try {
      const r = await fetch(`${API}/stepsregistration/portal-add-team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password, teamName: teamName.trim() }),
      });
      if (r.ok) { setPassword(''); setMode('added'); setBusy(false); return; }
      let msg = '';
      try { msg = (await r.json()).message || ''; } catch { /* no body */ }
      setError(msg || 'Something went wrong. Please try again.');
    } catch { setError('Something went wrong. Please try again.'); }
    setBusy(false);
  };

  const resend = async () => {
    setError('');
    try {
      const r = await fetch(`${API}/stepsregistration/resend-confirmation`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ token: confirmToken }),
      });
      if (r.ok) { setResent(true); return; }
      let m = '';
      try { m = (await r.json()).message || ''; } catch { /* no body */ }
      setError(m || 'Could not resend. Please try again.');
    } catch { setError('Could not resend. Please try again.'); }
  };

  const err = error && <p className="text-sm text-red font-semibold mt-3" role="alert">{error}</p>;

  return (
    <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl px-5 py-5">
      {mode === 'choose' && (
        <div>
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="button" className={redBtn} onClick={() => { setError(''); setMode('new'); }}>Create Account</button>
            <button type="button" className={grayBtn} onClick={() => { setError(''); setMode('existing'); }}>I have an account</button>
          </div>
        </div>
      )}

      {mode === 'new' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-3">Create your account</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div><label className={label}>First name</label><input className={input} value={first} onChange={e => setFirst(e.target.value)} autoComplete="given-name" /></div>
            <div><label className={label}>Last name</label><input className={input} value={last} onChange={e => setLast(e.target.value)} autoComplete="family-name" /></div>
          </div>
          <div className="mt-3"><label className={label}>Email</label><input className={input} type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" /></div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div><label className={label}>Password</label><input className={input} type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="new-password" /></div>
            <div><label className={label}>Confirm password</label><input className={input} type="password" value={confirm} onChange={e => setConfirm(e.target.value)} autoComplete="new-password" /></div>
          </div>
          {err}
          <div className="flex gap-3 mt-4">
            <button type="button" className={grayBtn} onClick={() => { setError(''); setMode('choose'); }}>Back</button>
            <button type="button" className={redBtn} onClick={toTeam}>Next</button>
          </div>
        </div>
      )}

      {mode === 'kids' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-1">Add a profile for your child</p>
          <p className="text-gray-600 text-sm mb-3">Each child gets their own profile and screen name. You can add more later.</p>
          {kids.map((k, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 mb-3">
              <input className={input} maxLength={30} placeholder="Screen name" value={k.screenName} onChange={e => setKids(ks => ks.map((x, j) => j === i ? { ...x, screenName: e.target.value } : x))} />
              <div className="flex gap-2 flex-shrink-0">
                {(['male', 'female'] as const).map(g => (
                  <button key={g} type="button" onClick={() => setKids(ks => ks.map((x, j) => j === i ? { ...x, gender: g } : x))}
                    className={`rounded-lg px-4 py-2.5 font-bold border-2 ${k.gender === g ? 'bg-navy text-white border-navy' : 'bg-white text-navy border-blue-200'}`}>{g === 'male' ? 'Boy' : 'Girl'}</button>
                ))}
                {kids.length > 1 && <button type="button" className="text-sm font-semibold text-gray-500 px-2" onClick={() => setKids(ks => ks.filter((_, j) => j !== i))}>Remove</button>}
              </div>
            </div>
          ))}
          {kids.length < MAX_KIDS && <button type="button" className="text-sm font-bold text-navy underline" onClick={() => setKids(ks => [...ks, { screenName: '', gender: 'male' }])}>Add another child</button>}
          {err}
          <div className="flex gap-3 mt-4">
            <button type="button" className={grayBtn} onClick={() => { setError(''); setMode('new'); }}>Back</button>
            <button type="button" className={redBtn} onClick={() => { setError(''); setMode('team'); }}>{kids.some(k => k.screenName.trim()) ? 'Next' : 'Skip'}</button>
          </div>
        </div>
      )}

      {mode === 'team' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-3">Name your team</p>
          <label className={label}>Team name</label>
          <input className={input} maxLength={25} placeholder="Enter team name" value={teamName} onChange={e => setTeamName(e.target.value)} />
          <p className="text-gray-500 text-sm mt-1.5">You can change this later.</p>
          <div ref={widgetRef} className="mt-4" />
          {err}
          <div className="flex gap-3 mt-4">
            <button type="button" className={grayBtn} onClick={() => { setError(''); setMode('kids'); }}>Back</button>
            <button type="button" className={redBtn} disabled={busy} onClick={createNew}>{busy ? 'Creating…' : 'Create my account and team'}</button>
          </div>
        </div>
      )}

      {mode === 'existing' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-1">Add your team</p>
          <p className="text-gray-600 text-sm mb-3">Use the email and password you sign in to the app with.</p>
          <label className={label}>Email</label>
          <input className={input} type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          <div className="mt-3"><label className={label}>App password</label><input className={input} type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" /></div>
          <div className="mt-3"><label className={label}>Team name</label><input className={input} maxLength={25} placeholder="Enter team name" value={teamName} onChange={e => setTeamName(e.target.value)} /></div>
          {err}
          <div className="flex gap-3 mt-4">
            <button type="button" className={grayBtn} onClick={() => { setError(''); setMode('choose'); }}>Back</button>
            <button type="button" className={redBtn} disabled={busy} onClick={addToExisting}>{busy ? 'Adding…' : 'Add my team'}</button>
          </div>
        </div>
      )}

      {mode === 'sent' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-1">Check your email</p>
          <p className="text-gray-700 leading-relaxed">We sent a link to <strong>{email.trim()}</strong>. Open it and click <strong>Verify My Email</strong>. That creates your account, your team <strong>{teamName.trim()}</strong>{kids.some(k => k.screenName.trim()) ? ' and your child\u2019s profile' : ''}, then takes you to the app to sign in.</p>
          <p className="text-gray-600 text-sm mt-2">Nothing yet? Check your spam folder.</p>
          {confirmToken && (resent
            ? <p className="text-sm text-green-700 font-semibold mt-3">Sent again.</p>
            : <button type="button" className={`${grayBtn} mt-3`} onClick={resend}>Resend the email</button>)}
          {err}
        </div>
      )}

      {mode === 'added' && (
        <div>
          <p className="text-navy text-lg font-extrabold mb-1">Your team is created</p>
          <p className="text-gray-700 leading-relaxed"><strong>{teamName.trim()}</strong> is now on your account. You will see it under MY TEAMS when you sign in to the app.</p>
        </div>
      )}
    </div>
  );
}
