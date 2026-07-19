'use client';

import { useEffect, useRef, useState } from 'react';

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPlayerPortalToken';
const SCREEN_KEY = 'astPlayerPortalScreen';
const ADMIN_KEY = 'astPlayerPortalAdmin';
const SCREENS = ['welcome', 'how', 'steps', 'gettingStarted', 'index'] as const;

type Player = { name: string; email: string; checklist: Record<string, boolean | 'skipped'> };
type Mode = 'signin' | 'register' | 'forgot' | 'reset';
type Screen = 'welcome' | 'how' | 'steps' | 'gettingStarted' | 'index';

const OFFERINGS: React.ReactNode[] = [
  <><strong className="text-navy font-semibold">Get started the right way</strong> — know exactly where to begin.</>,
  <><strong className="text-navy font-semibold">Key features</strong> — training plans, challenges & leaderboards.</>,
  <><strong className="text-navy font-semibold">Get your questions answered</strong> — all in one place.</>,
  <><strong className="text-navy font-semibold">Make the most of the program</strong> — design training plans that fit your needs.</>,
];

const SETUP_TIPS: { icon: string; title: string; body: React.ReactNode }[] = [
  {
    icon: '👤',
    title: 'Player Profiles',
    body: (
      <ol className="space-y-3">
        {[
          <>Add a player profile for each child — <strong className="text-navy font-semibold">up to four</strong>.</>,
          <>Profiles share one login, but can have unique <strong className="text-navy font-semibold">contact emails</strong>.</>,
          <>The contact email <strong className="text-navy font-semibold">receives notifications</strong>.</>,
          <>Archive or delete profiles by clicking <strong className="text-navy font-semibold">Edit</strong>, then <strong className="text-navy font-semibold">Archive Profile</strong>.</>,
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{i + 1}</span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    icon: '🔗',
    title: 'Linking Profiles',
    body: (
      <>
        <p className="mb-3">Often siblings train together. When you <strong className="text-navy font-semibold">link their profiles</strong>, all linked profiles get <strong className="text-navy font-semibold">training credit</strong> for the same session. You can link profiles from your <strong className="text-navy font-semibold">account dashboard</strong>.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784494889184-m244fu.png" alt="Linking profiles from the account dashboard" className="w-full rounded-lg border border-blue-100" />
      </>
    ),
  },
];

const GETTING_STARTED_TIPS: { icon: string; title: string; body: React.ReactNode }[] = [
  {
    icon: '📋',
    title: 'How training is organized',
    body: (
      <>
        <ol className="space-y-3 mb-3">
          {[
            <><strong className="text-navy font-semibold">All Programs</strong> — all skill areas grouped by programs.</>,
            <><strong className="text-navy font-semibold">Curated Curriculum</strong> — programs organized in a recommended order.</>,
            <><strong className="text-navy font-semibold">Custom Folders and Favorites</strong> — create your own video folders.</>,
            <><strong className="text-navy font-semibold">Recurring Training Plans</strong> — recurring sessions that auto update.</>,
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{i + 1}</span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
        <p>We&rsquo;ll cover each — pick what fits you best.</p>
      </>
    ),
  },
  {
    icon: '⚽',
    title: 'All Programs',
    body: (
      <>
        <p className="mb-5">Click <strong className="text-navy font-semibold">All Programs</strong> and start with the core skill areas — <strong className="text-navy font-semibold">Ball Mastery</strong>, <strong className="text-navy font-semibold">Dribbling</strong>, and <strong className="text-navy font-semibold">Wall Passing</strong>:</p>
        <ol className="space-y-5">
          {[
            <><strong className="text-navy font-semibold">1,000 Touch Ball Mastery</strong> &mdash; <strong className="text-navy font-semibold">P1: Toe Taps, Tick Tocks, Stationary</strong>.</>,
            <><strong className="text-navy font-semibold">Ronaldinho Freestyle Dribbling</strong> &mdash; <strong className="text-navy font-semibold">P1: Ronaldinho Freestyle</strong>.</>,
            <><strong className="text-navy font-semibold">101 Wall Passing Drills</strong> &mdash; <strong className="text-navy font-semibold">P1: 101 Wall Passing Part 1</strong>.</>,
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{i + 1}</span>
              <span className="pt-0.5">{item}</span>
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    icon: '📚',
    title: 'Curated Curriculum',
    body: (
      <>
        <p className="mb-3">Puts the programs in a <strong className="text-navy font-semibold">recommended order</strong>.</p>
        <p className="mb-3">For example, Ball Mastery starts with <strong className="text-navy font-semibold">1,000 Touch</strong>, <strong className="text-navy font-semibold">101 Ball Mastery</strong>, <strong className="text-navy font-semibold">One Cone</strong>, <strong className="text-navy font-semibold">Two Cone</strong>, and more — delivering videos in a <strong className="text-navy font-semibold">round robin</strong>.</p>
        <p className="mb-3">We recommend pinning the folders to your <strong className="text-navy font-semibold">Favorites</strong> or <strong className="text-navy font-semibold">My Plan</strong>.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784500898570-vi0r7o.png" alt="Curated Curriculum" className="w-full rounded-lg border border-blue-100" />
      </>
    ),
  },
  {
    icon: '📌',
    title: 'My Plan',
    body: (
      <>
        <p className="mb-3">Save folders and videos into your <strong className="text-navy font-semibold">My Plan</strong> — everything you&rsquo;re working on, all in one place.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784497330132-l6s39e.png" alt="My Plan section" className="w-full rounded-lg border border-blue-100 mb-3" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784497206092-l5kzpb.png" alt="Saving to My Plan" className="w-full rounded-lg border border-blue-100" />
      </>
    ),
  },
  {
    icon: '⭐',
    title: 'My Favorites',
    body: (
      <>
        <p className="mb-2">There are three ways to utilize <strong className="text-navy font-semibold">My Favorites</strong>:</p>
        <ol className="space-y-1.5">
          {['Pinning folders', 'Pinning individual videos', 'Creating custom folders'].map((t, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{i + 1}</span>
              <span className="pt-0.5">{t}</span>
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    icon: '📁',
    title: 'Pinning Folders',
    body: (
      <>
        <p className="mb-3">Click the star button next to any folder to pin it to your favorites.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784500454200-4y689z.png" alt="Star button to pin a folder to favorites" className="w-full rounded-lg border border-blue-100" />
      </>
    ),
  },
  {
    icon: '🎬',
    title: 'Pinning Individual Videos',
    body: (
      <>
        <p className="mb-3">Click inside any folder and pin videos to your favorites.</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1784501113331-r9wyi2.png" alt="Pinning individual videos to favorites" className="w-full rounded-lg border border-blue-100" />
      </>
    ),
  },
  {
    icon: '📁',
    title: 'Custom Folders',
    body: (
      <ol className="space-y-3">
        {[
          <>Click <strong className="text-navy font-semibold">My Favorites</strong> and create a folder.</>,
          <>Click inside any training folder and pin videos to your favorites.</>,
          <>Add those videos to the folder (select all for faster assigning).</>,
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{i + 1}</span>
            <span className="pt-0.5">{item}</span>
          </li>
        ))}
      </ol>
    ),
  },
  {
    icon: '🔁',
    title: 'Recurring Training Plans',
    body: <>Content coming soon.</>,
  },
];

const HOW_IT_WORKS: React.ReactNode[] = [
  <>When you finish a step, hit <strong className="text-navy font-semibold">Mark Complete &#10003;</strong> — this keeps track of what you&rsquo;ve covered and flags when new content is added.</>,
  <>You can <strong className="text-navy font-semibold">skip a step</strong> and come back to it.</>,
  <>Use the <strong className="text-navy font-semibold">Index</strong> to jump to any page and see what you&rsquo;ve covered.</>,
  <>Have a question? Click <strong className="text-navy font-semibold">Ask us here</strong> and we&rsquo;ll be in touch.</>,
];

const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

export default function PlayerPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('signin');
  const [resetToken, setResetToken] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [screen, setScreen] = useState<Screen>('welcome');
  const [setupStep, setSetupStep] = useState(0);
  const [gsStep, setGsStep] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionTitle, setQuestionTitle] = useState('');
  const [sendingQuestion, setSendingQuestion] = useState(false);
  const [questionSent, setQuestionSent] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [completeTarget, setCompleteTarget] = useState<{ key: string; title: string; onAffirm?: () => void } | null>(null);
  const [stepChoice, setStepChoice] = useState<'affirm' | 'question' | null>(null);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [extraEmail, setExtraEmail] = useState('');
  const [pageSent, setPageSent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // On load: pick up a ?reset= link, then restore any saved session.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rt = params.get('reset');
    if (rt) {
      setResetToken(rt);
      setMode('reset');
    }
    if (localStorage.getItem(ADMIN_KEY) === '1') setIsAdmin(true);
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) { setLoading(false); return; }
    fetch(`${API}/player-portal/state`, { headers: { Authorization: saved } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => {
        setToken(saved);
        setPlayer(data.player);
        const view = params.get('view');
        const savedScreen = localStorage.getItem(SCREEN_KEY) as Screen | null;
        if (view === 'steps') setScreen('how');
        else if (view === 'index') setScreen('index');
        else if (savedScreen && (SCREENS as readonly string[]).includes(savedScreen)) setScreen(savedScreen);
        else setScreen('welcome');
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  // Remember the current screen so a page refresh returns the user to it.
  useEffect(() => {
    if (!loading && player) localStorage.setItem(SCREEN_KEY, screen);
  }, [screen, loading, player]);

  const submitAuth = async () => {
    setError(''); setNotice(''); setBusy(true);
    try {
      const path = mode === 'register' ? 'register' : mode === 'forgot' ? 'forgot' : mode === 'reset' ? 'reset' : 'login';
      const body =
        mode === 'register' ? { name: form.name, email: form.email, password: form.password }
        : mode === 'forgot' ? { email: form.email }
        : mode === 'reset' ? { token: resetToken, password: form.password }
        : { email: form.email, password: form.password };
      const res = await fetch(`${API}/player-portal/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');

      if (mode === 'forgot') {
        setNotice(data.message || 'If an account exists for that email, a reset link is on its way.');
        setBusy(false);
        return;
      }
      if (mode === 'reset') {
        // clear the ?reset= param from the URL
        window.history.replaceState({}, '', '/player-portal');
      }
      localStorage.setItem(TOKEN_KEY, data.token);
      if (data.admin) { setIsAdmin(true); localStorage.setItem(ADMIN_KEY, '1'); } else { setIsAdmin(false); localStorage.removeItem(ADMIN_KEY); }
      setToken(data.token);
      setPlayer(data.player);
      setScreen('welcome');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    setIsAdmin(false);
    setToken(null);
    setPlayer(null);
    setMode('signin');
    setForm({ name: '', email: '', password: '' });
    setScreen('welcome');
  };

  const goHome = () => { setScreen('welcome'); setError(''); };

  const isDone = (key: string) => player?.checklist?.[key] === true;

  const saveChecklist = async (next: Record<string, boolean | 'skipped'>) => {
    setPlayer(p => (p ? { ...p, checklist: next } : p));
    if (!token) return;
    try {
      await fetch(`${API}/player-portal/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ checklist: next }),
      });
    } catch { /* non-blocking */ }
  };

  const openQuestion = (title: string) => { setQuestionTitle(title); setQuestionText(''); setQuestionSent(false); setShowQuestion(true); };

  const submitQuestion = async () => {
    if (!token || !questionText.trim()) return;
    setSendingQuestion(true);
    try {
      await fetch(`${API}/player-portal/question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ question: questionText.trim(), stepTitle: questionTitle }),
      });
      setQuestionSent(true);
      setQuestionText('');
    } catch { /* non-blocking */ } finally { setSendingQuestion(false); }
  };

  const openComplete = (key: string, title: string, onAffirm?: () => void) => { setCompleteTarget({ key, title, onAffirm }); setStepChoice(null); setShowComplete(true); };

  const submitComplete = async () => {
    if (!completeTarget || !stepChoice) return;
    setSaving(true);
    if (stepChoice === 'affirm') {
      await saveChecklist({ ...(player?.checklist || {}), [completeTarget.key]: true });
      const cb = completeTarget.onAffirm;
      setShowComplete(false);
      cb?.();
    } else {
      const title = completeTarget.title;
      setShowComplete(false);
      openQuestion(title);
    }
    setSaving(false);
  };

  const emailPage = async (title: string) => {
    if (!token) return;
    setSaving(true);
    try {
      const html = contentRef.current ? contentRef.current.innerHTML : '';
      await fetch(`${API}/player-portal/email-page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ title, html, extraEmail: extraEmail.trim() }),
      });
      setPageSent(true);
      setTimeout(() => setPageSent(false), 6000);
    } catch { /* non-blocking */ } finally { setSaving(false); }
  };

  // Reusable footer: "Ask a question" link + (admin only) email-this-page tool.
  const pageActions = (_key: string, title: string) => (
    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col items-center gap-3">
      <button onClick={() => openQuestion(title)} className="text-sm text-red hover:text-red-dark font-semibold">
        Have a question? Ask us here
      </button>
      {isAdmin && (
        <div className="w-full bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">Admin</p>
          <input
            type="email"
            value={extraEmail}
            onChange={e => setExtraEmail(e.target.value)}
            placeholder="Also send to (optional email)"
            className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
          />
          <button
            onClick={() => emailPage(title)}
            disabled={saving}
            className="bg-navy hover:bg-navy/90 text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-60"
          >
            {saving ? 'Sending…' : '📧 Email This Page to the User'}
          </button>
          {pageSent && <p className="text-green-700 font-semibold text-sm mt-2">✓ Sent{player ? ` to ${player.email}` : ''}</p>}
        </div>
      )}
    </div>
  );

  const resetProgress = async () => {
    if (!token) return;
    if (!window.confirm('Reset your progress and start the guide from the beginning?')) return;
    try {
      await fetch(`${API}/player-portal/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ checklist: {} }),
      });
    } catch { /* non-blocking */ }
    setPlayer(p => (p ? { ...p, checklist: {} } : p));
    setScreen('welcome');
    setError('');
  };

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Hero */}
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={goHome}
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  🏠 Home
                </button>
                {player && screen !== 'index' && (
                  <button
                    onClick={() => { setScreen('index'); setError(''); }}
                    className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                  >
                    Index
                  </button>
                )}
                {player && (
                  <button
                    onClick={resetProgress}
                    className="inline-flex items-center gap-1 bg-white/15 border border-white/30 text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-white/25 transition-colors"
                  >
                    Reset
                  </button>
                )}
              </div>
              {player && (
                <div className="flex items-center gap-2">
                  {isAdmin && <span className="bg-amber-400 text-navy text-[10px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-full">Admin</span>}
                  <button onClick={signOut} className="text-white/60 hover:text-white text-xs font-semibold">
                    Sign out
                  </button>
                </div>
              )}
            </div>
            <h1 className="text-white text-2xl font-extrabold">
              {player ? `Welcome, ${player.name.split(' ')[0]}!` : 'Welcome to Anytime Soccer Training!'}
            </h1>
            {!player && (
              <p className="text-white/70 text-sm mt-1">Sign in to your player portal to get the most out of the program.</p>
            )}
          </div>

          <div className="px-8 py-8">
            {loading ? (
              <p className="text-gray-700 text-sm">Loading&hellip;</p>
            ) : !player ? (
              /* ---------- Auth gate ---------- */
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
                    <input className={inputClass} placeholder="Your name" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })} />
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
            ) : screen === 'index' ? (
              /* ---------- Index ---------- */
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-4">Index</h2>
                <p className="text-gray-600 text-sm mb-4">A table of contents for your portal — jump to any page.</p>
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 divide-y divide-gray-100">
                  <button onClick={() => setScreen('welcome')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">Welcome</span>
                  </button>
                  <button onClick={() => setScreen('how')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">How it Works</span>
                  </button>
                  <button onClick={() => { setSetupStep(0); setScreen('steps'); }} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">Account Setup</span>
                  </button>
                  <button onClick={() => setScreen('gettingStarted')} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left">
                    <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                    <span className="text-sm font-semibold text-red hover:underline">How to Start Your Training</span>
                  </button>
                </div>
                <div className="flex justify-center">
                  <button onClick={() => setScreen('welcome')} className="bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors">
                    ← Back
                  </button>
                </div>
              </div>
            ) : screen === 'welcome' ? (
              /* ---------- Welcome ---------- */
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">Anytime Soccer Training</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This portal helps you <strong className="text-navy font-semibold">maximize your training</strong> and <strong className="text-navy font-semibold">get started on the right foot</strong> — with tips we&rsquo;ve learned along the way.
                </p>
                <p className="text-gray-700 leading-relaxed mb-3">Here&rsquo;s why we built it:</p>

                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-4">
                  <ol className="space-y-4">
                    {OFFERINGS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={() => setScreen('how')}
                  className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors"
                >
                  Get Started &rarr;
                </button>
              </div>
            ) : screen === 'how' ? (
              /* ---------- How it Works ---------- */
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">How it Works</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We&rsquo;ve broken the key features into pages you can reference.</p>

                <div ref={contentRef} className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-6">
                  <ol className="space-y-4">
                    {HOW_IT_WORKS.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-9 h-9 rounded-full bg-navy text-white font-bold text-base">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-2">
                  <button
                    onClick={() => setScreen('welcome')}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => (isDone('how') ? setScreen('steps') : openComplete('how', 'How it Works', () => setScreen('steps')))}
                    className={`w-full sm:w-auto ${isDone('how') ? 'bg-green-600 hover:bg-green-700' : 'bg-red hover:bg-red-dark'} text-white font-bold py-2.5 px-8 rounded-xl transition-colors`}
                  >
                    Next &rarr;
                  </button>
                </div>
                {pageActions('how', 'How it Works')}
              </div>
            ) : screen === 'steps' ? (
              /* ---------- Account Setup ---------- */
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">Account Setup</h2>
                <p className="text-gray-700 leading-relaxed mb-5">By now, you&rsquo;ve already created your account. Below are additional tips.</p>

                <div ref={contentRef} className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-2">
                  <p className="text-navy font-bold mb-2">{SETUP_TIPS[setupStep].icon} {SETUP_TIPS[setupStep].title}</p>
                  <div className="text-gray-700 leading-relaxed">{SETUP_TIPS[setupStep].body}</div>
                </div>
                <p className="text-gray-400 text-xs font-semibold text-center mb-6">Tip {setupStep + 1} of {SETUP_TIPS.length}</p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button
                    onClick={() => { if (setupStep > 0) setSetupStep(setupStep - 1); else setScreen('how'); }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => {
                      const advance = () => { if (setupStep < SETUP_TIPS.length - 1) setSetupStep(setupStep + 1); else setScreen('gettingStarted'); };
                      if (isDone(`accountSetup:${setupStep}`)) advance();
                      else openComplete(`accountSetup:${setupStep}`, `Account Setup — ${SETUP_TIPS[setupStep].title}`, advance);
                    }}
                    className={`w-full sm:w-auto ${isDone(`accountSetup:${setupStep}`) ? 'bg-green-600 hover:bg-green-700' : 'bg-red hover:bg-red-dark'} text-white font-bold py-2.5 px-8 rounded-xl transition-colors`}
                  >
                    Next &rarr;
                  </button>
                </div>
                {pageActions('accountSetup', 'Account Setup')}
              </div>
            ) : (
              /* ---------- Getting Started ---------- */
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">How to Start Your Training</h2>
                <p className="text-gray-700 leading-relaxed mb-5">Getting started is easy — but the best way depends on your preference, so we&rsquo;ll cover a few options.</p>

                <div ref={contentRef} className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-2">
                  <p className="text-navy font-bold mb-2">{GETTING_STARTED_TIPS[gsStep].icon} {GETTING_STARTED_TIPS[gsStep].title}</p>
                  <div className="text-gray-700 leading-relaxed">{GETTING_STARTED_TIPS[gsStep].body}</div>
                </div>
                <p className="text-gray-400 text-xs font-semibold text-center mb-6">Tip {gsStep + 1} of {GETTING_STARTED_TIPS.length}</p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                  <button
                    onClick={() => { if (gsStep > 0) setGsStep(gsStep - 1); else setScreen('steps'); }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    &larr; Back
                  </button>
                  <button
                    onClick={() => {
                      const advance = () => { if (gsStep < GETTING_STARTED_TIPS.length - 1) setGsStep(gsStep + 1); else setScreen('index'); };
                      if (isDone(`gettingStarted:${gsStep}`)) advance();
                      else openComplete(`gettingStarted:${gsStep}`, `How to Start Your Training — ${GETTING_STARTED_TIPS[gsStep].title}`, advance);
                    }}
                    className={`w-full sm:w-auto ${isDone(`gettingStarted:${gsStep}`) ? 'bg-green-600 hover:bg-green-700' : 'bg-red hover:bg-red-dark'} text-white font-bold py-2.5 px-8 rounded-xl transition-colors`}
                  >
                    Next &rarr;
                  </button>
                </div>
                {pageActions('gettingStarted', 'How to Start Your Training')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ask a question modal */}
      {showQuestion && player && (
        <div onClick={() => !sendingQuestion && setShowQuestion(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            {questionSent ? (
              <div className="px-6 py-8 text-center">
                <div className="text-4xl mb-3">&#9989;</div>
                <h2 className="text-navy text-lg font-extrabold mb-2">Question sent!</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">We&rsquo;ve emailed you a copy and will get back to you quickly.</p>
                <button onClick={() => setShowQuestion(false)} className="bg-navy hover:bg-navy/90 text-white font-bold py-2.5 px-8 rounded-xl transition-colors">Done</button>
              </div>
            ) : (
              <>
                <div className="px-6 pt-6 pb-2 text-center">
                  <div className="text-4xl mb-3">&#10067;</div>
                  <h2 className="text-navy text-lg font-extrabold mb-2">Ask us a question</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">We&rsquo;ll email you a copy and get back to you quickly.</p>
                </div>
                <div className="px-6 pt-3 pb-4">
                  <textarea
                    value={questionText}
                    onChange={e => setQuestionText(e.target.value)}
                    rows={4}
                    placeholder="Type your question here…"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red resize-none"
                  />
                </div>
                <div className="flex gap-3 px-6 pb-6">
                  <button onClick={() => setShowQuestion(false)} disabled={sendingQuestion} className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60">Cancel</button>
                  <button onClick={submitQuestion} disabled={sendingQuestion || !questionText.trim()} className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-40">{sendingQuestion ? 'Sending…' : 'Send Question'}</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Step completion modal */}
      {showComplete && player && completeTarget && (
        <div onClick={() => !saving && setShowComplete(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div onClick={e => e.stopPropagation()} className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden">
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="text-4xl mb-3">&#9989;</div>
              <h2 className="text-navy text-lg font-extrabold mb-2">Before you continue</h2>
              <p className="text-gray-600 text-sm leading-relaxed"><strong className="text-navy">{completeTarget.title}</strong></p>
            </div>
            <div className="flex flex-col gap-2 px-6 pt-3 pb-4">
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${stepChoice === 'question' ? 'border-red bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input type="radio" name="playerStepChoice" checked={stepChoice === 'question'} onChange={() => setStepChoice('question')} className="accent-red-600 w-4 h-4" />
                <span className="text-sm font-bold text-navy">I have a question</span>
              </label>
              <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${stepChoice === 'affirm' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                <input type="radio" name="playerStepChoice" checked={stepChoice === 'affirm'} onChange={() => setStepChoice('affirm')} className="accent-green-600 w-4 h-4" />
                <span className="text-sm font-bold text-navy">I understand &#10003;</span>
              </label>
            </div>
            <div className="flex gap-3 px-6 pb-5">
              <button onClick={() => setShowComplete(false)} disabled={saving} className="flex-1 bg-white border-2 border-gray-200 text-navy font-bold py-2.5 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-60">Cancel</button>
              <button onClick={submitComplete} disabled={saving || !stepChoice} className="flex-1 bg-red hover:bg-red-dark text-white font-bold py-2.5 rounded-xl transition-colors disabled:opacity-40">{saving ? 'Saving…' : 'Submit'}</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
