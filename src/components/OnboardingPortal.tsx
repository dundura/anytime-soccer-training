'use client';

import { useEffect, useState } from 'react';
import { COACH_ONBOARDING_STEPS } from '@/data/coachOnboardingSteps';
import CoachStepContent from '@/components/CoachStepContent';

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';

type Coach = {
  name: string;
  email: string;
  club: string | null;
  teamName: string | null;
  checklist: Record<string, boolean>;
};

// Portal steps map onto the full instruction pages (COACH_ONBOARDING_STEPS indices)
const STEPS: { key: string; title: string; dataIndex: number; needsTeamName?: boolean; note?: string }[] = [
  { key: 'survey', title: 'Take the Coach Engagement Survey', dataIndex: 3 },
  { key: 'account', title: 'Create your account and add profiles', dataIndex: 4 },
  { key: 'team', title: 'Create your team inside the app', dataIndex: 5, needsTeamName: true, note: 'Enter your team name below — we’ll let Megan know automatically.' },
  { key: 'intro_email', title: 'Send parents the introduction email', dataIndex: 7 },
  { key: 'parents_informed', title: 'Confirm your parents have been informed', dataIndex: 8, note: 'Marking this step complete notifies Megan automatically — that’s our green light to start inviting your parents.' },
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
  const [mode, setMode] = useState<'signin' | 'register' | 'forgot' | 'reset'>('signin');
  const [resetToken, setResetToken] = useState('');
  const [notice, setNotice] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', club: '' });
  const [teamNameInput, setTeamNameInput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [wizardIndex, setWizardIndex] = useState(0);

  const firstIncomplete = (c: Coach) => {
    const idx = STEPS.findIndex(s => !c.checklist[s.key]);
    return idx === -1 ? STEPS.length - 1 : idx;
  };

  // Restore session (or enter reset mode from an emailed link)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rt = params.get('reset');
    if (rt) {
      setResetToken(rt);
      setMode('reset');
      setLoading(false);
      return;
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!saved) { setLoading(false); return; }
    fetch(`${API}/portal-onboarding/state`, { headers: { Authorization: saved } })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => {
        setToken(saved);
        setCoach(data.coach);
        setTeamNameInput(data.coach.teamName || '');
        setWizardIndex(firstIncomplete(data.coach));
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  const submitAuth = async () => {
    setError('');
    setNotice('');
    setBusy(true);
    try {
      const path = mode === 'register' ? 'register' : mode === 'forgot' ? 'forgot' : mode === 'reset' ? 'reset' : 'login';
      const body =
        mode === 'register' ? { name: form.name, email: form.email, password: form.password, club: form.club }
        : mode === 'forgot' ? { email: form.email }
        : mode === 'reset' ? { token: resetToken, password: form.password }
        : { email: form.email, password: form.password };
      const res = await fetch(`${API}/portal-onboarding/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'Something went wrong. Please try again.'); return; }
      if (mode === 'forgot') {
        setNotice(data.message || 'If an account exists for that email, a reset link is on its way.');
        return;
      }
      if (mode === 'reset' && typeof window !== 'undefined') {
        window.history.replaceState(null, '', '/onboarding-portal');
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      setToken(data.token);
      setCoach(data.coach);
      setTeamNameInput(data.coach.teamName || '');
      setWizardIndex(firstIncomplete(data.coach));
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
    setMode('signin');
    setForm({ name: '', email: '', password: '', club: '' });
  };

  const setStep = async (key: string, done: boolean, advance = false) => {
    if (!coach || !token) return;
    const step = STEPS.find(s => s.key === key);
    if (done && step?.needsTeamName && !teamNameInput.trim()) {
      setError('Please enter your team name first.');
      return;
    }
    setError('');
    setSaving(true);
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
      if (advance && wizardIndex < STEPS.length - 1) setWizardIndex(wizardIndex + 1);
    } catch {
      setError('Could not save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const doneCount = coach ? STEPS.filter(s => coach.checklist[s.key]).length : 0;
  const allDone = doneCount === STEPS.length;
  const step = STEPS[wizardIndex];
  const stepDone = coach ? !!coach.checklist[step.key] : false;
  const stepData = COACH_ONBOARDING_STEPS[step.dataIndex];

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                  {coach ? `Step ${wizardIndex + 1} of ${STEPS.length}` : 'Onboarding Portal'}
                </span>
                <a
                  href="/onboarding-portal"
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  🏠 Home
                </a>
              </div>
              {coach && (
                <button onClick={signOut} className="text-white/60 hover:text-white text-xs font-semibold">
                  Sign out
                </button>
              )}
            </div>
            <h1 className="text-white text-2xl font-extrabold">
              {coach ? step.title : 'Coach Onboarding Portal'}
            </h1>
            {!coach && (
              <p className="text-white/70 text-sm mt-1">Sign in to walk through your team setup step by step.</p>
            )}
          </div>

          <div className="px-8 py-8">
            {loading ? (
              <p className="text-gray-700 text-sm">Loading&hellip;</p>
            ) : !coach ? (
              <div>
                {(mode === 'signin' || mode === 'register') ? (
                  <div className="flex border border-gray-200 rounded-lg overflow-hidden mb-6">
                    {(['signin', 'register'] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => { setMode(m); setError(''); setNotice(''); }}
                        className={`flex-1 py-2.5 text-sm font-bold transition-colors ${mode === m ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                      >
                        {m === 'signin' ? 'Sign In' : 'Create Account'}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="mb-6">
                    <p className="font-bold text-navy">{mode === 'forgot' ? 'Reset your password' : 'Choose a new password'}</p>
                    <p className="text-gray-600 text-sm mt-1">
                      {mode === 'forgot'
                        ? 'Enter your email and we’ll send you a reset link.'
                        : 'Enter a new password for your portal account.'}
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {mode === 'register' && (
                    <>
                      <input className={inputClass} placeholder="Your name" value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} />
                      <input className={inputClass} placeholder="Club or organization (optional)" value={form.club}
                        onChange={e => setForm({ ...form, club: e.target.value })} />
                    </>
                  )}
                  {mode !== 'reset' && (
                    <input className={inputClass} type="email" placeholder="Email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })} />
                  )}
                  {mode !== 'forgot' && (
                    <input className={inputClass} type="password" placeholder={mode === 'register' || mode === 'reset' ? 'Choose a password (6+ characters)' : 'Password'} value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      onKeyDown={e => { if (e.key === 'Enter') submitAuth(); }} />
                  )}

                  {error && <p className="text-red text-sm font-semibold">{error}</p>}
                  {notice && <p className="text-green-700 text-sm font-semibold">{notice}</p>}

                  <button
                    onClick={submitAuth}
                    disabled={busy}
                    className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {busy ? 'One moment…'
                      : mode === 'register' ? 'Create Account & Start'
                      : mode === 'forgot' ? 'Send Reset Link'
                      : mode === 'reset' ? 'Set New Password'
                      : 'Sign In'}
                  </button>
                  {mode === 'signin' && (
                    <button onClick={() => { setMode('forgot'); setError(''); setNotice(''); }} className="w-full text-center text-sm text-gray-500 hover:text-navy font-semibold">
                      Forgot password?
                    </button>
                  )}
                  {(mode === 'forgot' || mode === 'reset') && (
                    <button onClick={() => { setMode('signin'); setError(''); setNotice(''); }} className="w-full text-center text-sm text-gray-500 hover:text-navy font-semibold">
                      ← Back to sign in
                    </button>
                  )}
                  <p className="text-gray-500 text-xs text-center">
                    This portal login is separate from your Anytime Soccer Training app account.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                {/* Step dots + progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {STEPS.map((s, i) => {
                      const done = !!coach.checklist[s.key];
                      const isCurrent = i === wizardIndex;
                      return (
                        <button
                          key={s.key}
                          onClick={() => { setWizardIndex(i); setError(''); }}
                          title={s.title}
                          className={`w-9 h-9 rounded-full text-sm font-extrabold transition-colors ${done ? 'bg-green-500 text-white' : isCurrent ? 'bg-red text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                        >
                          {done ? '✓' : i + 1}
                        </button>
                      );
                    })}
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red rounded-full transition-all" style={{ width: `${(doneCount / STEPS.length) * 100}%` }} />
                  </div>
                  <p className="text-center text-xs text-gray-500 font-semibold mt-2">{doneCount} of {STEPS.length} steps complete</p>
                </div>

                {allDone && (
                  <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-4 mb-6">
                    <p className="text-green-800 font-bold mb-1">🎉 You&rsquo;re all set — Megan has been notified!</p>
                    <ul className="mt-2 space-y-1">
                      {NEXT_STEPS.map(s => (
                        <li key={s} className="text-green-800/80 text-sm flex items-start gap-2">
                          <span className="font-bold">→</span> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {stepDone && !allDone && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 mb-6 flex items-center justify-between">
                    <p className="text-green-800 text-sm font-bold">✓ You&rsquo;ve completed this step</p>
                    <button onClick={() => setStep(step.key, false)} className="text-xs text-green-700/70 hover:text-green-900 font-semibold">Undo</button>
                  </div>
                )}

                {/* Full step instructions */}
                <CoachStepContent step={stepData} />

                {step.note && (
                  <p className="text-navy text-sm bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">{step.note}</p>
                )}

                {step.needsTeamName && !stepDone && (
                  <input
                    className={`${inputClass} mb-4`}
                    placeholder="Your team name in the app"
                    value={teamNameInput}
                    onChange={e => setTeamNameInput(e.target.value)}
                  />
                )}

                {error && <p className="text-red text-sm font-semibold mb-4">{error}</p>}

                {/* Wizard navigation */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                  <button
                    onClick={() => { setWizardIndex(Math.max(0, wizardIndex - 1)); setError(''); }}
                    disabled={wizardIndex === 0}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                  >
                    ← Back
                  </button>
                  {!stepDone ? (
                    <button
                      onClick={() => setStep(step.key, true, true)}
                      disabled={saving}
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Saving…' : 'Mark Complete ✓'}
                    </button>
                  ) : wizardIndex < STEPS.length - 1 ? (
                    <button
                      onClick={() => { setWizardIndex(wizardIndex + 1); setError(''); }}
                      className="w-full sm:w-auto bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                    >
                      Next →
                    </button>
                  ) : null}
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
