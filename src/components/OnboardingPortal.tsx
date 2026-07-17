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
const STEPS: { key: string; title: string; dataIndex: number; section: string; needsTeamName?: boolean; note?: string; info?: boolean }[] = [
  { key: 'demo', title: 'Book a demo', dataIndex: 0, section: 'Pre-Onboarding' },
  { key: 'roster', title: 'Send us your roster', dataIndex: 1, section: 'Pre-Onboarding' },
  { key: 'invoice', title: 'Pay your invoice', dataIndex: 2, section: 'Pre-Onboarding' },
  { key: 'onboarding_begins', title: 'Onboarding begins!', dataIndex: 11, section: 'Onboarding', info: true },
  { key: 'survey', title: 'Take the Coach Engagement Survey', dataIndex: 3, section: 'Onboarding' },
  { key: 'account', title: 'Create your account and add profiles', dataIndex: 4, section: 'Onboarding' },
  { key: 'team', title: 'Create your team inside the app', dataIndex: 5, section: 'Onboarding' },
  { key: 'intro_email', title: 'Send parents the introduction email', dataIndex: 7, section: 'Onboarding' },
  { key: 'parents_informed', title: 'Confirm your parents have been informed', dataIndex: 8, section: 'Onboarding', note: 'Marking this step complete notifies Megan automatically — that’s our green light to start inviting your parents.' },
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
  const [showIntro, setShowIntro] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

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
        // Stay on the step from the URL after a refresh; otherwise show the welcome page
        const stepParam = parseInt(params.get('step') || '', 10);
        if (stepParam >= 1 && stepParam <= STEPS.length) {
          setWizardIndex(stepParam - 1);
          setShowIntro(false);
        } else {
          setWizardIndex(firstIncomplete(data.coach));
        }
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  // Keep the current step in the URL so a refresh stays on the same page
  useEffect(() => {
    if (!coach || typeof window === 'undefined') return;
    const url = showIntro ? '/onboarding-portal' : `/onboarding-portal?step=${wizardIndex + 1}`;
    window.history.replaceState(null, '', url);
  }, [coach, showIntro, wizardIndex]);

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

  const resetProgress = async () => {
    if (!coach || !token) return;
    setError('');
    setSaving(true);
    try {
      const res = await fetch(`${API}/portal-onboarding/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ checklist: {}, reset: true }),
      });
      if (!res.ok) throw new Error();
      setCoach({ ...coach, checklist: {} });
      setWizardIndex(0);
      setShowIntro(true);
    } catch {
      setError('Could not reset. Please try again.');
    } finally {
      setSaving(false);
      setShowResetConfirm(false);
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
                  {coach ? (showIntro ? 'Welcome' : `Step ${wizardIndex + 1} of ${STEPS.length}`) : 'Onboarding Portal'}
                </span>
                <button
                  onClick={() => { setShowIntro(true); setError(''); }}
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  🏠 Home
                </button>
                <a
                  href="/get-started-faq"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  FAQ
                </a>
                {coach && doneCount > 0 && (
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="inline-flex items-center gap-1 bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-white/25 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
              {coach && (
                <button onClick={signOut} className="text-white/60 hover:text-white text-xs font-semibold">
                  Sign out
                </button>
              )}
            </div>
            <h1 className="text-white text-2xl font-extrabold">
              {coach ? (showIntro ? `Welcome, ${coach.name.split(' ')[0]}!` : step.title) : 'Coach Onboarding Portal'}
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
            ) : showIntro ? (
              <div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to <strong className="text-navy font-semibold">Anytime Soccer Training</strong> — we&rsquo;re excited to have your team!
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Getting set up has two parts: <strong className="text-navy font-semibold">Pre-Onboarding</strong> — a few quick steps before we begin — and <strong className="text-navy font-semibold">Onboarding</strong> — the steps that get your team live in the app.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every step is designed to get your team set up quickly — so your players can start <strong className="text-navy font-semibold">training from day one</strong>.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    When you finish a step, hit <strong className="text-navy font-semibold">Mark Complete ✓</strong> — that notifies our team and keeps things moving. Have a question along the way? Send it to <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold hover:underline">megan@anytime-soccer.com</a> and we&rsquo;ll respond quickly.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
                  {STEPS.map((s, i) => {
                    const done = !!coach.checklist[s.key];
                    const showHeading = i === 0 || STEPS[i - 1].section !== s.section;
                    return (
                      <div key={s.key}>
                        {showHeading && (
                          <div className={`px-4 py-2 bg-gray-50 text-xs font-bold uppercase tracking-wide text-red ${i > 0 ? 'border-t border-gray-200' : ''} border-b border-gray-200`}>
                            {s.section}
                          </div>
                        )}
                        {(() => {
                          const locked = i > firstIncomplete(coach);
                          return (
                            <button
                              onClick={() => { if (!locked) { setWizardIndex(i); setShowIntro(false); setError(''); } }}
                              disabled={locked}
                              title={locked ? 'Complete the previous steps first' : undefined}
                              className={`flex items-center gap-3 w-full text-left px-4 py-3 transition-colors ${!showHeading ? 'border-t border-gray-100' : ''} ${locked ? 'cursor-not-allowed opacity-60' : 'hover:bg-gray-50'}`}
                            >
                              <span className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-extrabold ${done ? 'bg-green-500 text-white' : locked ? 'bg-gray-100 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>
                                {done ? '✓' : locked ? '🔒' : i + 1}
                              </span>
                              <span className={`text-sm font-semibold ${done ? 'text-green-800' : locked ? 'text-gray-400' : 'text-navy'}`}>{s.title}</span>
                            </button>
                          );
                        })()}
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => { setWizardIndex(firstIncomplete(coach)); setShowIntro(false); setError(''); }}
                  className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors mb-4"
                >
                  {doneCount === 0 ? 'Get Started →' : allDone ? 'Review Your Steps →' : 'Pick Up Where You Left Off →'}
                </button>

              </div>
            ) : (
              <div>
                {/* Step dots + progress */}
                <div className="mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {STEPS.map((s, i) => {
                      const done = !!coach.checklist[s.key];
                      const isCurrent = i === wizardIndex;
                      const locked = i > firstIncomplete(coach);
                      return (
                        <button
                          key={s.key}
                          onClick={() => { if (!locked) { setWizardIndex(i); setError(''); } }}
                          disabled={locked}
                          title={locked ? 'Complete the previous steps first' : s.title}
                          className={`w-8 h-8 rounded-full text-xs font-extrabold transition-colors ${done ? 'bg-green-500 text-white' : isCurrent ? 'bg-red text-white' : locked ? 'bg-gray-100 text-gray-300 cursor-not-allowed' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
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

                {step.key === 'onboarding_begins' && (
                  <ul className="mb-6 space-y-3">
                    {STEPS.filter(s2 => s2.section === 'Onboarding' && s2.key !== 'onboarding_begins').map(s2 => {
                      const stepComplete = !!coach.checklist[s2.key];
                      return (
                        <li key={s2.key} className="flex items-start gap-3">
                          <span className="text-red font-bold mt-0.5">✅</span>
                          <span className={stepComplete ? 'font-bold text-green-700 line-through' : 'font-bold text-navy'}>{s2.title}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}

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
                      {saving ? 'Saving…' : step.info ? 'Next →' : 'Mark Complete ✓'}
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

      {/* Reset confirmation modal */}
      {showResetConfirm && (
        <div
          onClick={() => !saving && setShowResetConfirm(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 pt-6 pb-4 text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h2 className="text-navy text-lg font-extrabold mb-2">Reset your progress?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every step will be marked as not done and you&rsquo;ll start from the beginning. Your account stays — only the checkmarks are cleared.
              </p>
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowResetConfirm(false)}
                disabled={saving}
                className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={resetProgress}
                disabled={saving}
                className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-60"
              >
                {saving ? 'Resetting…' : 'Reset'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
