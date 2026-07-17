'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';

type Coach = {
  name: string;
  email: string;
  club: string | null;
  teamName: string | null;
  checklist: Record<string, boolean>;
};

type Step = {
  key: string;
  title: string;
  description: string;
  links?: { label: string; href: string }[];
  needsTeamName?: boolean;
};

const STEPS: Step[] = [
  {
    key: 'survey',
    title: 'Take the Coach Engagement Survey',
    description: 'Tell us about your team so we can tailor the program to your players.',
    links: [{ label: 'View instructions', href: '/get-started-steps/4' }],
  },
  {
    key: 'account',
    title: 'Create your account and add profiles',
    description: 'Create your Anytime Soccer Training account and add a profile for yourself (and your child if they play).',
    links: [
      { label: 'View instructions', href: '/get-started-steps/5' },
      { label: 'Open the app', href: 'https://app.anytime-soccer.com' },
    ],
  },
  {
    key: 'team',
    title: 'Create your team inside the app',
    description: 'Create your team in the app, then enter the team name below — we’ll let Megan know automatically.',
    links: [{ label: 'View instructions', href: '/get-started-steps/6' }],
    needsTeamName: true,
  },
  {
    key: 'intro_email',
    title: 'Send parents the introduction email',
    description: 'Send your parents the introduction email so they know the program is coming.',
    links: [{ label: 'View instructions', href: '/get-started-steps/8' }],
  },
  {
    key: 'parents_informed',
    title: 'Confirm your parents have been informed',
    description: 'Once your parents have heard about the program, confirm here — that’s our green light to start inviting them.',
  },
];

const NEXT_STEPS = [
  'We’ll invite your parents to join the team',
  'We’ll send you and your parents helpful getting-started information',
  'Neil will give you a call to walk through homework and other team features',
];

export default function OnboardingPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [coach, setCoach] = useState<Coach | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'signin' | 'register'>('signin');
  const [form, setForm] = useState({ name: '', email: '', password: '', club: '' });
  const [teamNameInput, setTeamNameInput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [savingStep, setSavingStep] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!saved) { setLoading(false); return; }
    fetch(`${API}/portal-onboarding/state`, { headers: { Authorization: saved } })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => {
        setToken(saved);
        setCoach(data.coach);
        setTeamNameInput(data.coach.teamName || '');
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const submitAuth = async () => {
    setError('');
    setBusy(true);
    try {
      const path = mode === 'register' ? 'register' : 'login';
      const body = mode === 'register'
        ? { name: form.name, email: form.email, password: form.password, club: form.club }
        : { email: form.email, password: form.password };
      const res = await fetch(`${API}/portal-onboarding/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); return; }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setCoach(data.coach);
      setTeamNameInput(data.coach.teamName || '');
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCoach(null);
    setForm({ name: '', email: '', password: '', club: '' });
  };

  const setStep = async (key: string, done: boolean) => {
    if (!coach || !token) return;
    const step = STEPS.find(s => s.key === key);
    if (done && step?.needsTeamName && !teamNameInput.trim()) {
      setError('Please enter your team name first.');
      return;
    }
    setError('');
    setSavingStep(key);
    const checklist = { ...coach.checklist, [key]: done };
    try {
      const res = await fetch(`${API}/portal-onboarding/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          checklist,
          completedStep: done ? key : null,
          teamName: done && step?.needsTeamName ? teamNameInput.trim() : undefined,
        }),
      });
      if (!res.ok) throw new Error();
      setCoach({
        ...coach,
        checklist,
        teamName: done && step?.needsTeamName ? teamNameInput.trim() : coach.teamName,
      });
    } catch {
      setError('Could not save. Please try again.');
    } finally {
      setSavingStep(null);
    }
  };

  const doneCount = coach ? STEPS.filter(s => coach.checklist[s.key]).length : 0;
  const allDone = doneCount === STEPS.length;
  const currentKey = coach ? STEPS.find(s => !coach.checklist[s.key])?.key : undefined;

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                Onboarding Portal
              </span>
              {coach && (
                <button onClick={signOut} className="text-white/60 hover:text-white text-xs font-semibold">
                  Sign out
                </button>
              )}
            </div>
            <h1 className="text-white text-2xl font-extrabold">
              {coach ? `Welcome, ${coach.name.split(' ')[0]}!` : 'Coach Onboarding Portal'}
            </h1>
            {coach ? (
              <p className="text-white/70 text-sm mt-1">
                {coach.teamName ? `Team: ${coach.teamName}` : coach.club ? coach.club : 'Work through each step below — we’re notified as you go.'}
              </p>
            ) : (
              <p className="text-white/70 text-sm mt-1">Sign in to walk through your team setup step by step.</p>
            )}
          </div>

          <div className="px-8 py-8">
            {loading ? (
              <p className="text-gray-700 text-sm">Loading&hellip;</p>
            ) : !coach ? (
              <div>
                {/* Sign in / register tabs */}
                <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6">
                  {(['signin', 'register'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => { setMode(m); setError(''); }}
                      className={`flex-1 py-2.5 text-sm font-bold transition-colors ${mode === m ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {m === 'signin' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                <div className="space-y-3">
                  {mode === 'register' && (
                    <>
                      <input className={inputClass} placeholder="Your name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} />
                      <input className={inputClass} placeholder="Club or organization (optional)" value={form.club}
                        onChange={e => setForm({ ...form, club: e.target.value })} />
                    </>
                  )}
                  <input className={inputClass} type="email" placeholder="Email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })} />
                  <input className={inputClass} type="password" placeholder={mode === 'register' ? 'Choose a password (6+ characters)' : 'Password'} value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    onKeyDown={e => { if (e.key === 'Enter') submitAuth(); }} />

                  {error && <p className="text-red text-sm font-semibold">{error}</p>}

                  <button
                    onClick={submitAuth}
                    disabled={busy}
                    className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {busy ? 'One moment…' : mode === 'register' ? 'Create Account & Start' : 'Sign In'}
                  </button>
                  <p className="text-gray-500 text-xs text-center">
                    This portal login is separate from your Anytime Soccer Training app account.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {/* Progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-navy">{doneCount} of {STEPS.length} steps complete</span>
                    <span className="text-sm font-bold text-red">{Math.round((doneCount / STEPS.length) * 100)}%</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red rounded-full transition-all" style={{ width: `${(doneCount / STEPS.length) * 100}%` }} />
                  </div>
                </div>

                {allDone && (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6">
                    <p className="text-green-800 font-bold mb-1">🎉 You&rsquo;re all set!</p>
                    <p className="text-green-800/80 text-sm">Megan has been notified. Here&rsquo;s what happens next on our side:</p>
                  </div>
                )}

                {error && <p className="text-red text-sm font-semibold mb-4">{error}</p>}

                {/* Steps */}
                <div className="space-y-3">
                  {STEPS.map((step, i) => {
                    const done = !!coach.checklist[step.key];
                    const isCurrent = step.key === currentKey;
                    return (
                      <div key={step.key} className={`border rounded-xl p-5 ${done ? 'border-green-200 bg-green-50/50' : isCurrent ? 'border-red/40 bg-white shadow-sm' : 'border-gray-200 bg-white'}`}>
                        <div className="flex items-start gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-extrabold ${done ? 'bg-green-500 text-white' : isCurrent ? 'bg-red text-white' : 'bg-gray-100 text-gray-500'}`}>
                            {done ? '✓' : i + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-bold text-sm ${done ? 'text-green-800' : 'text-navy'}`}>{step.title}</p>
                            {!done && <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.description}</p>}

                            {!done && step.needsTeamName && (
                              <input
                                className={`${inputClass} mt-3`}
                                placeholder="Your team name in the app"
                                value={teamNameInput}
                                onChange={e => setTeamNameInput(e.target.value)}
                              />
                            )}

                            {!done && (
                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                {(step.links || []).map(l => (
                                  l.href.startsWith('http')
                                    ? <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-navy bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors">{l.label}</a>
                                    : <Link key={l.href} href={l.href} target="_blank" className="text-xs font-bold text-navy bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 hover:bg-blue-100 transition-colors">{l.label}</Link>
                                ))}
                                <button
                                  onClick={() => setStep(step.key, true)}
                                  disabled={savingStep === step.key}
                                  className="text-xs font-bold text-white bg-red hover:bg-red-dark rounded-lg px-4 py-2 transition-colors disabled:opacity-60"
                                >
                                  {savingStep === step.key ? 'Saving…' : 'Mark Complete ✓'}
                                </button>
                              </div>
                            )}

                            {done && (
                              <button onClick={() => setStep(step.key, false)} className="text-xs text-gray-400 hover:text-gray-600 mt-1">
                                Undo
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* What happens next */}
                <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl px-5 py-4">
                  <p className="font-bold text-navy text-sm mb-2">What happens next (we handle these)</p>
                  <ul className="space-y-1.5">
                    {NEXT_STEPS.map(s => (
                      <li key={s} className="text-gray-600 text-sm flex items-start gap-2">
                        <span className="text-red font-bold">→</span> {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-navy rounded-2xl px-8 py-8 text-center text-white">
          <h3 className="text-lg font-bold mb-4">Questions? We&rsquo;re Here to Help!</h3>
          <div className="flex flex-col items-center gap-2">
            <span className="font-semibold text-base">Megan Chambers</span>
            <span className="text-white/70 text-sm">Team Success Manager</span>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-3">
              <a href="mailto:megan@anytime-soccer.com" className="text-white/90 hover:text-white text-sm">
                megan@anytime-soccer.com
              </a>
              <a href="tel:803-431-1028" className="text-white/90 hover:text-white text-sm">
                (M) 803-431-1028
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
