'use client';

import { useCallback, useEffect, useState } from 'react';
import ColdWorkflow from './ColdWorkflow';
import SupportBoard from './SupportBoard';
import ConsoleLogins from './ConsoleLogins';
import ConsoleNotes from './ConsoleNotes';
import CrmAdmin from './CrmAdmin';
import EmailSequence, { SEQ_TREE } from './EmailSequence';
import PodcastPortal from './PodcastPortal';
import IntlPortal from './IntlPortal';
import CollabPortal from './CollabPortal';
import SnmContactPortal from './SnmContactPortal';
import Referrals from './Referrals';
import Newsletters from './Newsletters';
import TriggeredEmails from './TriggeredEmails';
import AdSignups from './AdSignups';
import AllContent from './AllContent';
import NewsletterPeople from './NewsletterPeople';
import ParentOnboarding from './ParentOnboarding';
import PartnerAdmin from './PartnerAdmin';

/**
 * The admin console.
 *
 * These tools grew up inside the coach onboarding portal because that is where
 * the first one was built, and they no longer have anything to do with a coach
 * onboarding themselves. Sending a newsletter, loading a team's parents and
 * reading the demo board are day-to-day admin, not a step in somebody's setup.
 *
 * Nothing on the backend changed to make this possible: `isAdminRequest` only
 * checks the signed X-Admin-Token, so an admin session here is a complete one.
 * The coach token is still sent where a component asks for it, because two of
 * the panels were written against the portal's shape.
 *
 * Not linked from anywhere and noindex'd. It is reached by typing the address.
 */

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';
const ADMIN_KEY = 'astPortalAdminToken';

// The work first, the scratchpad and the vault last: they are things you reach
// for occasionally, not the reason the console is open.
const GROUPS = [
  // Grouped the way the work runs, not alphabetically: a flat list of thirteen
  // made you remember which one you wanted before you could find it. The
  // pipeline is on top and open, because it is why the console is open; the
  // rest are folded away until you go looking for them.
  {
    group: 'Coach Onboarding',
    rows: [
      { key: 'sequence', label: 'Coach Onboarding', icon: '🎬' },
      { key: 'crm', label: 'Coach CRM', icon: '📇' },
    ],
  },
  {
    group: 'Leads',
    rows: [{ key: 'leads', label: 'Leads', icon: '👥' }],
  },
  {
    group: 'Getting them started',
    rows: [{ key: 'parent-onboarding', label: 'Parent onboarding', icon: '👪' }],
  },
  // People who asked for help. The monthly check-in asks "would you like to speak to a member of the team", and a Yes
  // becomes a callback to make.
  {
    group: 'User support',
    rows: [
      { key: 'callbacks', label: 'CRM customer callbacks', icon: '📞' },
      { key: 'suggestions', label: 'Tips and suggestions', icon: '💡' },
    ],
  },
  {
    group: 'Outreach',
    rows: [
      { key: 'referrals', label: 'Referrals', icon: '🎁' },
      { key: 'podcast', label: 'Podcast guests', icon: '🎙️' },
      { key: 'intl', label: 'International posts', icon: '🌍' },
      { key: 'collab', label: 'Collaboration requests', icon: '🤝' },
      { key: 'partners', label: 'Partners', icon: '🤝' },
      { key: 'snm-contact', label: 'Soccer Near Me contact', icon: '📍' },
      { key: 'ad-signups', label: 'Ad signups', icon: '📈' },
    ],
  },
  {
    group: 'What we send',
    rows: [
      { key: 'newsletters', label: 'Newsletters', icon: '✉' },
      { key: 'triggered', label: 'Triggered', icon: '⚡' },
      { key: 'people', label: 'People', icon: '🧑' },
    ],
  },
  {
    group: 'Admin',
    rows: [
      { key: 'notes', label: 'Notes', icon: '📝' },
      { key: 'logins', label: 'Key logins', icon: '🔑' },
      { key: 'content', label: 'All content', icon: '🗂️' },
    ],
  },
] as const;

// The one that starts open. Everything else is a click away.
const OPEN_BY_DEFAULT = 'Coach Onboarding';

// Their pages still open, but the nested menu under the Coach Onboarding heading replaces the rows.
const HIDDEN_ROWS = ['sequence', 'crm'];

// The headings carry no key, so the view type is only the rows you can open.
type ViewKey = (typeof GROUPS)[number]['rows'][number]['key'];

// Which heading a view sits under -- so a ?view= link opens its group rather
// than landing on a panel whose row is folded out of sight.
const groupOf = (key: string) =>
  GROUPS.find((g) => g.rows.some((r) => r.key === key))?.group || OPEN_BY_DEFAULT;

export default function Console() {
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [view, setView] = useState<ViewKey>('newsletters');
  const [openGroups, setOpenGroups] = useState<string[]>([OPEN_BY_DEFAULT, groupOf('newsletters')]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  // The view lives in the address bar, so a reload lands where you were and a
  // panel can be linked to directly.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(TOKEN_KEY);
    const admin = localStorage.getItem(ADMIN_KEY);
    if (stored && admin) setToken(stored);
    const asked = new URLSearchParams(window.location.search).get('view');
    // Cold was one page before it split into four; old links open the first.
    const wanted = asked === 'cold' ? 'cold-fb' : asked === 'demos' ? 'sequence' : asked;
    if (wanted && GROUPS.some((g) => g.rows.some((r) => r.key === wanted))) {
      setView(wanted as ViewKey);
      setOpenGroups((open) => (open.includes(groupOf(wanted)) ? open : [...open, groupOf(wanted)]));
    }
    setReady(true);
  }, []);

  const go = useCallback((next: ViewKey) => {
    setView(next);
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', `/console?view=${next}`);
    }
  }, []);

  // The Coach Onboarding rows in the left menu: a sequence, a stage in it, or a section of a big stage.
  // Remembered on this device, so a refresh puts the menu back as it was.
  const saved = (k: string, d: string) => { try { return localStorage.getItem(k) || d; } catch { return d; } };
  const [navSeq, setNavSeqState] = useState<string>(() => (typeof window === 'undefined' ? 'Demo & Invoicing' : SEQ_TREE.some((q) => q.name === saved('consoleNavSeq', '')) ? saved('consoleNavSeq', '') : 'Demo & Invoicing'));
  const setNavSeq = (v: string) => { setNavSeqState(v); try { localStorage.setItem('consoleNavSeq', v); } catch { /* storage unavailable */ } };
  // Folded rows: a sequence the person shut, and the big stages whose sections are showing (they start shut).
  const list = (k: string): string[] => { try { return JSON.parse(localStorage.getItem(k) || '[]') || []; } catch { return []; } };
  const [seqShut, setSeqShutState] = useState<string[]>(() => (typeof window === 'undefined' ? [] : list('consoleNavShut')));
  const [subsOpen, setSubsOpenState] = useState<string[]>(() => (typeof window === 'undefined' ? [] : list('consoleNavSubs')));
  const keep = (k: string, v: string[]) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };
  const setSeqShut = (f: (l: string[]) => string[]) => setSeqShutState((l) => { const n = f(l); keep('consoleNavShut', n); return n; });
  const setSubsOpen = (f: (l: string[]) => string[]) => setSubsOpenState((l) => { const n = f(l); keep('consoleNavSubs', n); return n; });
  const flip = (list: string[], v: string) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const pick = (seq: string, stage?: string, big?: boolean) => {
    setNavSeq(seq);
    try { sessionStorage.setItem('seqNav', JSON.stringify({ seq, stage, big })); } catch { /* storage unavailable */ }
    go('sequence');
    if (typeof window !== 'undefined') window.dispatchEvent(new Event('seqnav'));
  };

  // The sequence page jumped somewhere (a person's stage link): keep the menu in step.
  // A stage link on the Leads page: go to Coach Onboarding, then let it pick up the stage.
  useEffect(() => {
    const go2 = () => { go('sequence'); window.setTimeout(() => window.dispatchEvent(new Event('seqnav')), 50); };
    window.addEventListener('seqgo', go2);
    return () => window.removeEventListener('seqgo', go2);
  }, [go]);
  useEffect(() => {
    const sync = (ev: Event) => { const seq = (ev as CustomEvent<string>).detail; if (seq) { setNavSeq(seq); setSeqShut((l) => l.filter((x) => x !== seq)); } };
    window.addEventListener('seqsync', sync);
    return () => window.removeEventListener('seqsync', sync);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const signIn = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not sign you in.');
      // An account that is not an admin gets no token here rather than a
      // half-working console: every panel would 403 on its first request.
      if (!data.admin || !data.adminToken) throw new Error('That account is not an admin.');
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(ADMIN_KEY, data.adminToken);
      localStorage.setItem('astPortalAdmin', '1');
      setToken(data.token);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not sign you in.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem('astPortalAdmin');
    setToken(null);
  };

  if (!ready) return null;

  if (!token) {
    return (
      <section className="min-h-[70vh] bg-background flex items-center justify-center px-4 py-16">
        <form
          onSubmit={signIn}
          className="w-full max-w-sm bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] p-8"
        >
          <h1 className="text-xl font-extrabold text-navy mb-1">Console</h1>
          <p className="text-xs text-gray-500 mb-6">Admin sign-in.</p>
          <label className="block mb-3">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red"
            />
          </label>
          <label className="block mb-5">
            <span className="block text-[11px] font-bold uppercase tracking-wide text-gray-500 mb-1">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full text-sm border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-red"
            />
          </label>
          {error && <p className="text-sm font-semibold text-red mb-4">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full bg-red hover:bg-red-dark text-white font-bold text-sm py-3 rounded-full transition-colors disabled:opacity-50"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="bg-background min-h-[70vh] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-4">
          <h1 className="text-xl font-extrabold text-navy m-0">Console</h1>
          <button onClick={signOut} className="ml-auto text-[11px] font-semibold text-gray-500 hover:underline">
            Sign out
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <nav className="md:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
              {GROUPS.map((g, i) => {
                const open = openGroups.includes(g.group);
                return (
                  <div key={g.group} className={i === 0 ? '' : 'border-t border-gray-100'}>
                    <button
                      onClick={() =>
                        setOpenGroups((list) =>
                          list.includes(g.group) ? list.filter((n) => n !== g.group) : [...list, g.group]
                        )
                      }
                      className="w-full flex items-center gap-2 px-4 pt-4 pb-2 text-left text-[10px] font-extrabold uppercase tracking-[0.12em] text-gray-400 hover:text-navy"
                    >
                      <span className="w-2 text-[8px] leading-none">{open ? '▼' : '▶'}</span>
                      {g.group}
                    </button>
                    {open &&
                      g.rows.filter((v) => !HIDDEN_ROWS.includes(v.key)).map((v) => (                        <button
                          key={v.key}
                          onClick={() => go(v.key)}
                          className={`w-full text-left px-4 py-2.5 text-sm font-semibold flex items-center gap-3 transition-colors ${
                            view === v.key ? 'bg-navy text-white' : 'text-navy hover:bg-gray-50'
                          }`}
                        >
                          <span className="w-5 text-center">{v.icon}</span>
                          {v.label}
                        </button>
                      ))}
                    {open && g.group === 'Coach Onboarding' && (
                      <div className="pb-2">
                        {SEQ_TREE.map((q) => (
                          <div key={q.name}>
                            <button
                              onClick={() => { if (navSeq === q.name) setSeqShut((l) => flip(l, q.name)); else { setSeqShut((l) => l.filter((x) => x !== q.name)); pick(q.name); } }}
                              className={`w-full flex items-center gap-1.5 text-left pl-9 pr-4 py-1.5 text-[13px] font-bold ${navSeq === q.name ? 'text-red' : 'text-navy'} hover:bg-gray-50`}
                            >
                              <span className="w-2 text-[8px] leading-none">{q.stages.length === 0 ? '' : navSeq === q.name && !seqShut.includes(q.name) ? '▼' : '▶'}</span>
                              {q.name}
                            </button>
                            {/* One stage in the sequence: the sequence is the stage, so its sections sit straight under it. */}
                            {navSeq === q.name && !seqShut.includes(q.name) && q.stages.length === 1 && q.stages[0].subs.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={() => pick(q.name, sub.name)}
                                className="w-full text-left pl-16 pr-4 py-1 text-[12px] font-semibold text-gray-700 hover:bg-gray-50"
                              >
                                {sub.label}
                              </button>
                            ))}
                            {navSeq === q.name && !seqShut.includes(q.name) && q.stages.length !== 1 && q.stages.map((st) => (
                              <div key={st.name}>
                                <div className="flex items-center hover:bg-gray-50">
                                  <button
                                    onClick={() => setSubsOpen((l) => flip(l, st.name))}
                                    aria-label={subsOpen.includes(st.name) ? 'Fold sections' : 'Show sections'}
                                    className="w-[4.5rem] shrink-0 pl-12 text-left text-[8px] leading-none text-gray-400"
                                  >
                                    {st.subs.length ? (subsOpen.includes(st.name) ? '▼' : '▶') : ''}
                                  </button>
                                  <button
                                    onClick={() => pick(q.name, st.name, st.big)}
                                    className="flex-1 min-w-0 text-left pr-4 py-1 text-[12px] font-semibold text-gray-700"
                                  >
                                    {st.label}
                                  </button>
                                </div>
                                {subsOpen.includes(st.name) && st.subs.map((sub) => (
                                  <button
                                    key={sub.name}
                                    onClick={() => pick(q.name, sub.name)}
                                    className="w-full text-left pl-20 pr-4 py-0.5 text-[11px] font-normal text-gray-500 hover:bg-gray-50"
                                  >
                                    {sub.label}
                                  </button>
                                ))}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="flex-1 min-w-0 bg-white rounded-2xl shadow-[0_4px_20px_rgba(15,49,84,0.08)] overflow-hidden">
            {view === 'notes' && <ConsoleNotes token={token} />}
            {view === 'logins' && <ConsoleLogins token={token} />}
            {view === 'newsletters' && <Newsletters token={token} />}
            {view === 'triggered' && <TriggeredEmails token={token} />}
            {view === 'people' && <NewsletterPeople token={token} />}
            {view === 'crm' && <CrmAdmin token={token} />}
            {view === 'callbacks' && <SupportBoard key="callbacks" token={token} mode="callbacks" />}
            {view === 'suggestions' && <SupportBoard key="suggestions" token={token} mode="suggestions" />}
            {view === 'podcast' && <PodcastPortal token={token} />}
            {view === 'intl' && <IntlPortal token={token} />}
            {view === 'collab' && <CollabPortal token={token} />}
            {view === 'snm-contact' && <SnmContactPortal token={token} />}
            {view === 'parent-onboarding' && <ParentOnboarding token={token} />}
                        {view === 'sequence' && <EmailSequence key="seq" token={token} />}
            {view === 'leads' && <EmailSequence key="leads" token={token} mode="leads" />}
            {view === 'referrals' && <Referrals token={token} />}
            {view === 'partners' && <PartnerAdmin token={token} />}
            {view === 'ad-signups' && <AdSignups token={token} />}
            {view === 'content' && <AllContent />}
          </div>
        </div>
      </div>
    </section>
  );
}
