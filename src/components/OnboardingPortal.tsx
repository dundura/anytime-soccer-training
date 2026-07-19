'use client';

import { useEffect, useState } from 'react';
import { COACH_ONBOARDING_STEPS } from '@/data/coachOnboardingSteps';
import CoachStepContent from '@/components/CoachStepContent';
import FaqSearch from '@/components/FaqSearch';
import { ONBOARDING_FAQ } from '@/data/onboardingFaq';

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';

type Coach = {
  name: string;
  email: string;
  club: string | null;
  teamName: string | null;
  checklist: Record<string, boolean | 'skipped'>;
};

// Portal steps map onto the full instruction pages (COACH_ONBOARDING_STEPS indices)
const STEPS: { key: string; title: string; dataIndex: number; section: string; needsTeamName?: boolean; note?: string; info?: boolean; tip?: boolean; faqIndex?: number; final?: boolean }[] = [
  { key: 'demo', title: 'Book a demo', dataIndex: 0, section: 'Pre-Onboarding' },
  { key: 'tip_roster', title: 'Roster FAQs', dataIndex: 12, section: 'Pre-Onboarding', tip: true },
  { key: 'roster', title: 'Send us your roster', dataIndex: 1, section: 'Pre-Onboarding' },
  { key: 'invoice', title: 'Pay your invoice', dataIndex: 2, section: 'Pre-Onboarding' },
  { key: 'tip_paywall', title: 'Quick Tip: If a Parent Hits a Paywall', dataIndex: 15, section: 'Pre-Onboarding', tip: true },
  { key: 'onboarding_begins', title: 'Onboarding begins!', dataIndex: 11, section: 'Onboarding', info: true },
  { key: 'survey', title: 'Take the Coaching Engagement Survey', dataIndex: 3, section: 'Onboarding' },
  { key: 'tip_account', title: 'Quick Tip: Accounts & Profiles', dataIndex: 13, section: 'Onboarding', tip: true },
  { key: 'account', title: 'Create your account and add profiles', dataIndex: 4, section: 'Onboarding' },
  { key: 'tip_team', title: 'Quick Tip: Creating Your Team', dataIndex: 14, section: 'Onboarding', tip: true },
  { key: 'team', title: 'Create your team inside the app', dataIndex: 5, section: 'Onboarding' },
  { key: 'intro_email', title: 'Send parents the introduction email', dataIndex: 7, section: 'Onboarding' },
  { key: 'parents_informed', title: 'Reply to Megan with the team name (inside the app) and that your parents have been informed', dataIndex: 8, section: 'Onboarding' },
{ key: 'faq_intro', title: 'Common FAQs', dataIndex: 16, section: 'FAQs', info: true },
  { key: 'faq_emails', title: 'What’s the difference between the login email and the contact email, and how do I update them?', dataIndex: -1, faqIndex: 0, section: 'FAQs', tip: true },
  { key: 'faq_profiles', title: 'What if I have more than one child using the program?', dataIndex: -1, faqIndex: 1, section: 'FAQs', tip: true },
  { key: 'faq_find_team', title: 'Parents can’t find our team when they search — what should I do?', dataIndex: -1, faqIndex: 2, section: 'FAQs', tip: true },
  { key: 'faq_not_on_team', title: 'I see that players have joined the app, but they’re not on my team', dataIndex: -1, faqIndex: 10, section: 'FAQs', tip: true },
  { key: 'faq_add_players', title: 'How do I add players to my team?', dataIndex: -1, faqIndex: 3, section: 'FAQs', tip: true },
  { key: 'faq_remove_players', title: 'How do I remove players from my team?', dataIndex: -1, faqIndex: 4, section: 'FAQs', tip: true },
  { key: 'faq_videos_move', title: 'Do completed videos move with a player to a new team?', dataIndex: -1, faqIndex: 5, section: 'FAQs', tip: true },
  { key: 'faq_assign_hw', title: 'How do I assign homework?', dataIndex: -1, faqIndex: 12, section: 'FAQs', tip: true },
  { key: 'faq_folders', title: 'Assigning folders', dataIndex: -1, faqIndex: 13, section: 'FAQs', tip: true },
  { key: 'faq_assign_plans', title: 'Assigning training plans', dataIndex: -1, faqIndex: 14, section: 'FAQs', tip: true },
  { key: 'faq_plans', title: 'What are the different training plans?', dataIndex: -1, faqIndex: 9, section: 'FAQs', tip: true },
  { key: 'faq_30day', title: 'What are the 30-day plans?', dataIndex: -1, faqIndex: 11, section: 'FAQs', tip: true },
  { key: 'faq_homework', title: 'Which homework do you recommend I start with?', dataIndex: -1, faqIndex: 6, section: 'FAQs', tip: true },
  { key: 'faq_skip_videos', title: 'What happens if kids skip videos?', dataIndex: -1, faqIndex: 7, section: 'FAQs', tip: true },
  { key: 'faq_hw_complete', title: 'I got an email that a homework folder is complete, but the player hasn’t done the videos', dataIndex: -1, faqIndex: 8, section: 'FAQs', tip: true },
  { key: 'faq_low_usage', title: 'My kids have not used the program as much as I expected. Any suggestions?', dataIndex: -1, faqIndex: 15, section: 'FAQs', tip: true },
  { key: 'final_confirm', title: 'Confirm & Finish', dataIndex: 17, section: 'FAQs', final: true },
];

// Tips are unnumbered; numbered position of the step at index i
const stepNumber = (i: number) => STEPS.slice(0, i + 1).filter(x => !x.tip).length;
const NUMBERED_TOTAL = STEPS.filter(x => !x.tip).length;

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
  const [showOverview, setShowOverview] = useState(false);
  const [showIndex, setShowIndex] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);
  const [stepChoice, setStepChoice] = useState<'completed' | 'skipped' | null>(null);
  const [showUnderstandConfirm, setShowUnderstandConfirm] = useState(false);
  const [understandChoice, setUnderstandChoice] = useState<'yes' | 'no' | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);
  const [sendingQuestion, setSendingQuestion] = useState(false);

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
    if (params.get('view') === 'faq') setShowFaq(true);
    const saved = typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null;
    if (!saved) { setLoading(false); return; }
    fetch(`${API}/portal-onboarding/state`, { headers: { Authorization: saved } })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(data => {
        setToken(saved);
        setCoach(data.coach);
        setTeamNameInput(data.coach.teamName || '');
        // Stay on the page from the URL after a refresh; otherwise show the welcome page
        const stepParam = parseInt(params.get('step') || '', 10);
        if (stepParam >= 1 && stepParam <= STEPS.length) {
          setWizardIndex(stepParam - 1);
          setShowIntro(false);
        } else if (params.get('view') === 'steps') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowOverview(true);
        } else if (params.get('view') === 'index') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowIndex(true);
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
    const url = showFaq ? '/onboarding-portal?view=faq' : showIndex ? '/onboarding-portal?view=index' : showOverview ? '/onboarding-portal?view=steps' : showIntro ? '/onboarding-portal' : `/onboarding-portal?step=${wizardIndex + 1}`;
    window.history.replaceState(null, '', url);
  }, [coach, showIntro, showOverview, showIndex, showFaq, wizardIndex]);

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

  const setStep = async (key: string, value: boolean | 'skipped', advance = false, actionOverride?: string) => {
    if (!coach || !token) return;
    const stepDef = STEPS.find(s => s.key === key);
    setError('');
    setSaving(true);
    const checklist = { ...coach.checklist, [key]: value };
    try {
      const res = await fetch(`${API}/portal-onboarding/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({
          checklist,
          completedStep: value === true ? key : null,
          stepAction: actionOverride || (value === true ? 'completed' : value === 'skipped' ? 'skipped' : null),
          stepTitle: stepDef ? stepDef.title : key,
        }),
      });
      if (!res.ok) throw new Error();
      setCoach({ ...coach, checklist });
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

  const submitQuestion = async () => {
    if (!coach || !token || !questionText.trim()) return;
    setSendingQuestion(true);
    setError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ question: questionText.trim(), stepTitle: showIntro || showOverview ? '' : STEPS[wizardIndex].title }),
      });
      if (!res.ok) throw new Error();
      setQuestionText('');
      setShowQuestion(false);
      setQuestionSent(true);
      setTimeout(() => setQuestionSent(false), 6000);
    } catch {
      setError('Could not send your question. Please try again.');
    } finally {
      setSendingQuestion(false);
    }
  };

  const doneCount = coach ? STEPS.filter(s => coach.checklist[s.key]).length : 0;
  const othersDone = coach ? STEPS.filter(s => !s.final).every(s => !!coach.checklist[s.key]) : false;
  const allDone = doneCount === STEPS.length;
  const step = STEPS[wizardIndex];
  const stepState = coach ? coach.checklist[step.key] : undefined;
  const stepDone = !!stepState;
  const stepSkipped = stepState === 'skipped';
  const stepData = step.faqIndex == null ? COACH_ONBOARDING_STEPS[step.dataIndex] : null;

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                {!(showIntro && !showFaq) && !(!coach && !showFaq) && (
                  <span className="inline-block bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full">
                    {showFaq ? 'FAQ' : coach ? (showIndex ? 'Index' : showOverview ? 'Your Steps' : step.tip ? `${step.section} — Quick Tip` : `${step.section} — Step ${stepNumber(wizardIndex)} of ${NUMBERED_TOTAL}`) : 'Onboarding Portal'}
                  </span>
                )}
                <button
                  onClick={() => { setShowIntro(true); setShowOverview(false); setShowIndex(false); setShowFaq(false); setError(''); }}
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  🏠 Home
                </button>
                {coach && !showIndex && (
                  <button
                    onClick={() => { setShowIndex(true); setShowFaq(false); setError(''); }}
                    className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                  >
                    Index
                  </button>
                )}
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
              {showFaq ? 'Frequently Asked Questions' : coach && showIntro ? `Welcome, ${coach.name.split(' ')[0]}!` : 'Coach Onboarding Portal'}
            </h1>
            {!coach && (
              <p className="text-white/70 text-sm mt-1">Sign in to walk through your team setup step by step.</p>
            )}
            {coach && !showIntro && !showOverview && !showIndex && !showFaq && (
              <div className="mt-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-red rounded-full transition-all" style={{ width: `${(doneCount / STEPS.length) * 100}%` }} />
                </div>
                <p className="text-white/60 text-xs font-semibold mt-1.5">{doneCount} of {STEPS.length} steps complete</p>
              </div>
            )}
          </div>

          <div className="px-8 py-8">
            {showFaq ? (
              <div>
                <FaqSearch items={ONBOARDING_FAQ} />
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setShowFaq(false)}
                    className="inline-block bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            ) : showIndex && coach ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-4">Index</h2>
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 divide-y divide-gray-100">
                  <a href="/onboarding-portal" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">Welcome</span>
                  </a>
                  <a href="/onboarding-portal?view=steps" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">How it Works</span>
                  </a>
                  {STEPS.map((st, i) => {
                    const done = !!coach.checklist[st.key];
                    const skipped = coach.checklist[st.key] === 'skipped';
                    return (
                      <a key={st.key} href={`/onboarding-portal?step=${i + 1}`} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                        <span className={`w-6 text-center font-bold text-xs ${skipped ? 'text-amber-500' : done ? 'text-green-600' : 'text-gray-300'}`}>
                          {skipped ? '→' : done ? '✓' : st.tip ? '💡' : stepNumber(i)}
                        </span>
                        <span className="text-sm font-semibold text-red hover:underline">{st.title}</span>
                      </a>
                    );
                  })}
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setShowIndex(false)}
                    className="bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    ← Back
                  </button>
                </div>
              </div>
            ) : loading ? (
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
                <h2 className="text-navy text-xl font-extrabold mb-3">Getting Started</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Welcome to <strong className="text-navy font-semibold">Anytime Soccer Training</strong> — we&rsquo;re excited to have your team!
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">Getting set up has three parts:</p>
                <ol className="space-y-3 mb-4">
                  {[
                    <><strong className="text-navy font-semibold">Pre-Onboarding</strong> — a few quick steps before we begin.</>,
                    <><strong className="text-navy font-semibold">Onboarding</strong> — the steps that get your team live in the app.</>,
                    <><strong className="text-navy font-semibold">FAQs</strong> — answering common questions so you&rsquo;re set up for success.</>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{i + 1}</span>
                      <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                    </li>
                  ))}
                </ol>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Every step is designed to get your team set up quickly — so your players can start <strong className="text-navy font-semibold">training from day one</strong>.
                </p>

                <p className="text-center text-sm text-gray-600 mb-3">
                  Question?{' '}
                  <button onClick={() => { setShowQuestion(true); setError(''); }} className="text-red font-semibold hover:underline">
                    Ask us here
                  </button>
                  {questionSent && <span className="block text-green-700 font-semibold mt-1">✓ Sent — we&rsquo;ll get back to you shortly!</span>}
                </p>
                <button
                  onClick={() => { setShowIntro(false); setShowOverview(true); setError(''); }}
                  className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors mb-4"
                >
                  {doneCount === 0 ? 'Get Started →' : 'Continue →'}
                </button>

              </div>
            ) : showOverview ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">How it Works</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Each step has its own page with everything you need.
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-6">
                <ol className="space-y-4">
                  {[
                    <>When you finish a step, hit <strong className="text-navy font-semibold">Mark Complete ✓</strong> — that notifies our team.</>,
                    <><strong className="text-navy font-semibold">Already done a step?</strong> Mark it complete and move on.</>,
                    <>Up next: request your demo — it&rsquo;s a <strong className="text-navy font-semibold">20-minute Zoom call</strong>.</>,
                    <>Have a question? Click <strong className="text-navy font-semibold">Ask us here</strong> and we&rsquo;ll be in touch.</>,
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white font-bold text-base">
                        {i + 1}
                      </span>
                      <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                    </li>
                  ))}
                </ol>
                </div>
                <p className="text-center text-sm text-gray-600 mb-3">
                  Question?{' '}
                  <button onClick={() => { setShowQuestion(true); setError(''); }} className="text-red font-semibold hover:underline">
                    Ask us here
                  </button>
                  {questionSent && <span className="block text-green-700 font-semibold mt-1">✓ Sent — we&rsquo;ll get back to you shortly!</span>}
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
                  <button
                    onClick={() => { setShowOverview(false); setShowIntro(true); setError(''); }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => { setWizardIndex(firstIncomplete(coach)); setShowOverview(false); setError(''); }}
                    className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-4">{step.title}</h2>

                {stepDone && (
                  <div className={`${stepSkipped ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-200'} border rounded-lg px-4 py-3 mb-6 flex items-center justify-between gap-3 flex-wrap`}>
                    <p className={`${stepSkipped ? 'text-amber-800' : 'text-green-800'} text-sm font-bold`}>
                      {stepSkipped ? '→ You skipped this step' : '✓ You’ve completed this step'}
                    </p>
                    <span className="flex items-center gap-3">
                      {stepSkipped && (
                        <button onClick={() => setStep(step.key, true)} className="text-xs text-amber-800 hover:text-amber-950 font-semibold underline">Mark complete instead</button>
                      )}
                      <button onClick={() => setStep(step.key, false)} className={`text-xs font-semibold ${stepSkipped ? 'text-amber-700/70 hover:text-amber-900' : 'text-green-700/70 hover:text-green-900'}`}>Undo</button>
                    </span>
                  </div>
                )}

                {/* Full step instructions */}
                {stepData ? (
                  <CoachStepContent step={stepData} hideCta />
                ) : step.faqIndex != null ? (
                  <div
                    className="mb-6 space-y-3 text-gray-700 leading-relaxed text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:marker:text-red [&_strong]:text-navy [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: ONBOARDING_FAQ[step.faqIndex].answer }}
                  />
                ) : null}

                {step.key === 'onboarding_begins' && (
                  <ul className="mb-6 space-y-3">
                    {STEPS.filter(s2 => s2.section === 'Onboarding' && s2.key !== 'onboarding_begins' && !s2.tip).map(s2 => {
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

                {/* Ask a question */}
                <p className="text-center text-sm text-gray-600 mb-2">
                  Question?{' '}
                  <button onClick={() => { setShowQuestion(true); setError(''); }} className="text-red font-semibold hover:underline">
                    Ask us here
                  </button>
                  {questionSent && <span className="block text-green-700 font-semibold mt-1">✓ Sent — we&rsquo;ll get back to you shortly!</span>}
                </p>

                {/* Wizard navigation */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      if (wizardIndex === 0) { setShowOverview(true); } else { setWizardIndex(wizardIndex - 1); }
                      setError('');
                    }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                  >
                    ← Back
                  </button>
                  {stepData && stepData.ctaHref && (
                    <a
                      href={stepData!.ctaHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-6 rounded-xl transition-colors text-center"
                    >
                      {stepData!.ctaLabel}
                    </a>
                  )}
                  {step.final ? (
                    stepDone ? (
                      <button disabled className="w-full sm:w-auto bg-green-500 text-white font-bold py-2.5 px-8 rounded-xl cursor-default">
                        🎉 Onboarding Confirmed ✓
                      </button>
                    ) : (
                      <button
                        onClick={() => setStep(step.key, true)}
                        disabled={saving || !othersDone}
                        title={othersDone ? undefined : 'Complete every step to unlock'}
                        className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                      >
                        {saving ? 'Saving…' : othersDone ? 'Confirm — Onboarding Complete ✓' : 'Complete All Steps to Confirm'}
                      </button>
                    )
                  ) : (step.info || step.tip) ? (
                    <>
                      {stepDone && (
                        <button disabled className="w-full sm:w-auto bg-green-500 text-white font-bold py-2.5 px-6 rounded-xl cursor-default">
                          I Understand ✓
                        </button>
                      )}
                      <button
                        onClick={() => {
                          if (stepDone) { if (wizardIndex < STEPS.length - 1) { setWizardIndex(wizardIndex + 1); setError(''); } }
                          else { setUnderstandChoice(null); setShowUnderstandConfirm(true); }
                        }}
                        disabled={saving}
                        className={`w-full sm:w-auto font-bold py-2.5 px-8 rounded-xl transition-colors text-white disabled:opacity-60 ${stepDone ? 'bg-navy hover:bg-navy-light' : 'bg-red hover:bg-red-dark'}`}
                      >
                        {saving ? 'Saving…' : stepDone ? 'Next →' : 'Continue →'}
                      </button>
                    </>
                  ) : !stepDone ? (
                    <button
                      onClick={() => { setStepChoice(null); setShowCompleteConfirm(true); }}
                      disabled={saving}
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Saving…' : 'Continue →'}
                    </button>
                  ) : (
                    <>
                      {!stepSkipped && (
                        <button
                          disabled
                          className="w-full sm:w-auto bg-green-500 text-white font-bold py-2.5 px-6 rounded-xl cursor-default"
                        >
                          I Have Completed This Step ✓
                        </button>
                      )}
                      {wizardIndex < STEPS.length - 1 && (
                        <button
                          onClick={() => { setWizardIndex(wizardIndex + 1); setError(''); }}
                          className="w-full sm:w-auto bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                        >
                          Next →
                        </button>
                      )}
                    </>
                  )}
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

      {/* Ask a question modal */}
      {showQuestion && coach && (
        <div
          onClick={() => !sendingQuestion && setShowQuestion(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="text-4xl mb-3">❓</div>
              <h2 className="text-navy text-lg font-extrabold mb-2">Ask us a question</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We&rsquo;ll email you a copy and get back to you quickly.
              </p>
            </div>
            <div className="px-6 pt-3 pb-4">
              <textarea
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                rows={4}
                placeholder="Type your question here…"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red resize-none"
              />
            </div>
            <div className="flex gap-3 px-6 pb-6">
              <button
                onClick={() => setShowQuestion(false)}
                disabled={sendingQuestion}
                className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={submitQuestion}
                disabled={sendingQuestion || !questionText.trim()}
                className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-40"
              >
                {sendingQuestion ? 'Sending…' : 'Send Question'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Understanding confirmation modal (tips and info pages) */}
      {showUnderstandConfirm && coach && (
        <div
          onClick={() => !saving && setShowUnderstandConfirm(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="text-4xl mb-3">💡</div>
              <h2 className="text-navy text-lg font-extrabold mb-2">Before you continue</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Does <strong className="text-navy">{step.title}</strong> make sense?
              </p>
            </div>
            <div className="flex flex-col gap-2 px-6 pt-3 pb-4">
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${understandChoice === 'no' ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="understandChoice"
                  checked={understandChoice === 'no'}
                  onChange={() => setUnderstandChoice('no')}
                  className="accent-amber-500 w-4 h-4"
                />
                <span className="text-sm font-bold text-navy">I don&rsquo;t understand — please reach out</span>
              </label>
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${understandChoice === 'yes' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="understandChoice"
                  checked={understandChoice === 'yes'}
                  onChange={() => setUnderstandChoice('yes')}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="text-sm font-bold text-navy">I understand ✓</span>
              </label>
            </div>
            <div className="flex gap-3 px-6 pb-5">
              <button
                onClick={() => setShowUnderstandConfirm(false)}
                disabled={saving}
                className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!understandChoice) return;
                  await setStep(step.key, true, true, understandChoice === 'no' ? 'needs_help' : 'completed');
                  setShowUnderstandConfirm(false);
                }}
                disabled={saving || !understandChoice}
                className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step completion confirmation modal */}
      {showCompleteConfirm && coach && (
        <div
          onClick={() => !saving && setShowCompleteConfirm(false)}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
        >
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="text-4xl mb-3">✅</div>
              <h2 className="text-navy text-lg font-extrabold mb-2">Before you continue</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Where are you with <strong className="text-navy">{step.title}</strong>? This lets our team know.
              </p>
            </div>
            <div className="flex flex-col gap-2 px-6 pt-3 pb-4">
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${stepChoice === 'completed' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="stepChoice"
                  checked={stepChoice === 'completed'}
                  onChange={() => setStepChoice('completed')}
                  className="accent-green-600 w-4 h-4"
                />
                <span className="text-sm font-bold text-navy">I have completed this step ✓</span>
              </label>
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${stepChoice === 'skipped' ? 'border-amber-400 bg-amber-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input
                  type="radio"
                  name="stepChoice"
                  checked={stepChoice === 'skipped'}
                  onChange={() => setStepChoice('skipped')}
                  className="accent-amber-500 w-4 h-4"
                />
                <span className="text-sm font-bold text-navy">I&rsquo;m skipping this step →</span>
              </label>
            </div>
            <div className="flex gap-3 px-6 pb-5">
              <button
                onClick={() => setShowCompleteConfirm(false)}
                disabled={saving}
                className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  if (!stepChoice) return;
                  await setStep(step.key, stepChoice === 'completed' ? true : 'skipped', true);
                  setShowCompleteConfirm(false);
                }}
                disabled={saving || !stepChoice}
                className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-40"
              >
                {saving ? 'Saving…' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}

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
