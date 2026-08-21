'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { COACH_ONBOARDING_STEPS } from '@/data/coachOnboardingSteps';
import { DIRECTOR_ONBOARDING_STEPS } from '@/data/directorOnboardingSteps';
import CoachStepContent from '@/components/CoachStepContent';
import FaqSearch from '@/components/FaqSearch';
import { ONBOARDING_FAQ } from '@/data/onboardingFaq';

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';

type Audience = 'coach' | 'director';

type Coach = {
  name: string;
  email: string;
  club: string | null;
  teamName: string | null;
  // Absent on accounts created before the director path existed — treated as
  // 'coach' everywhere, so old rows keep the flow they signed up for.
  audience?: Audience;
  checklist: Record<string, boolean | 'skipped'>;
};

type PortalStep = { key: string; title: string; dataIndex: number; section: string; needsTeamName?: boolean; note?: string; info?: boolean; tip?: boolean; faqIndex?: number; final?: boolean; plainNext?: boolean; bonus?: boolean; quiz?: { prompt: string; options: string[] }; checks?: { prompt: string; items: string[] }; ack?: { label: string } };

// Portal steps map onto the full instruction pages (COACH_ONBOARDING_STEPS indices)
const COACH_PORTAL_STEPS: PortalStep[] = [
  { key: 'demo', title: 'Book a demo', dataIndex: 0, section: 'Pre-Onboarding',
    quiz: { prompt: 'Which applies to you?', options: [
      'I already attended a demo',
      'I don’t plan to attend a demo',
    ] },
    ack: { label: 'I understand Neil will call once onboarding is complete, to walk through homework and the rest of the team features' } },
  { key: 'expectations', title: 'What are your expectations?', dataIndex: -1, faqIndex: 28, section: 'Pre-Onboarding', info: true, quiz: { prompt: 'Which best describes your expectations for your team?', options: ['Training outside practice is an expectation I’ve set — I’m aiming for 75%+ engagement, and if it’s slow I’ll use the competition features to boost it.', 'My team is motivated. It’s optional, but I’m excited to see how they respond, and I’ll do some of the competition features.', 'Optional — if they train, great; if not, no pressure.'] } },
  { key: 'roster_intro', title: 'Overview: Upgrading Players', dataIndex: 22, section: 'Pre-Onboarding', info: true, quiz: { prompt: 'Confirm before continuing:', options: ['I understand that within 7 days of a player joining my team, I need to apply a free access slot to their account'] } },
  { key: 'tip_roster', title: 'Roster FAQs', dataIndex: 12, section: 'Pre-Onboarding', tip: true },
  { key: 'roster', title: 'Send us your roster', dataIndex: 1, section: 'Pre-Onboarding', quiz: { prompt: 'How would you like your players added?', options: ['I’m sending my roster', 'Send me an invite link instead — I won’t be sending a roster'] } },
  { key: 'invoice', title: 'Pay your invoice', dataIndex: -1, section: 'Pre-Onboarding', quiz: { prompt: 'How is your team getting set up?', options: ['I paid the invoice', 'I will purchase slots inside the app (after onboarding steps complete)', 'My club paid the invoice'] } },
  { key: 'onboarding_begins', title: 'Onboarding begins!', dataIndex: 11, section: 'Onboarding', info: true },
  { key: 'survey', title: 'Take the Coaching Engagement Survey', dataIndex: 3, section: 'Onboarding', quiz: { prompt: 'Confirm before continuing:', options: ['I completed the engagement survey'] } },
  { key: 'account', title: 'Create your account', dataIndex: 4, section: 'Onboarding', quiz: { prompt: 'Confirm before continuing:', options: ['I created my account'] } },
  { key: 'add_profiles', title: 'Add profiles', dataIndex: 21, section: 'Onboarding', quiz: { prompt: 'Confirm before continuing:', options: ['I added a profile for myself and my children'] } },
  { key: 'team', title: 'Create your team inside the app', dataIndex: 5, section: 'Onboarding', quiz: { prompt: 'Confirm before continuing:', options: ['I created my team(s) inside the app'] } },
  { key: 'intro_email', title: 'Send parents the introduction email', dataIndex: 7, section: 'Onboarding' },
  { key: 'faq_low_usage', title: 'Participation is lower than expected - what can I do?', dataIndex: -1, faqIndex: 24, section: 'FAQs', tip: true, quiz: { prompt: 'Confirm before continuing:', options: ['I understand the highest engagement comes when coaches and parents set goals and stay actively involved'] } },
  { key: 'commit_contest', title: '1. Start a team contest', dataIndex: -1, faqIndex: 25, section: 'FAQs', tip: true, quiz: { prompt: 'I plan to start a team contest.', options: ['Yes', 'No'] } },
  { key: 'commit_goals', title: '2. Set personal player challenges', dataIndex: -1, faqIndex: 26, section: 'FAQs', tip: true, quiz: { prompt: 'I plan set personal challenges.', options: ['Yes', 'No'] } },
  { key: 'commit_demo', title: '3. Show the app at training', dataIndex: -1, faqIndex: 27, section: 'FAQs', tip: true, quiz: { prompt: 'I plan to discuss the app at training.', options: ['Yes', 'No'] } },
  // Sits immediately before Confirm & Finish: the coach ticks off what they
  // have actually done, so "ready to start" is something the portal records
  // rather than a reply sitting in Megan's inbox.
  { key: 'ready_check', title: 'Confirm what you have done', dataIndex: -1, section: 'FAQs',
    checks: { prompt: 'Tick each one you have completed:', items: [
      'I created my account',
      'I created my team inside the app',
      'I notified the parents',
    ] },
    // The choice is a radio, not a fourth checkbox: "ready now" and "ready
    // later" are mutually exclusive, and this answer is what tells us whether
    // to start inviting parents.
    quiz: { prompt: 'Which of these is true?', options: [
      'I am ready to get started',
      'I am completing onboarding but will email Megan when ready',
    ] } },
  { key: 'final_confirm', title: 'Confirm & Finish', dataIndex: 16, section: 'FAQs', final: true },
  { key: 'payment_overview', title: 'How payment works - New Teams', dataIndex: 17, section: 'Bonus', info: true, bonus: true },
  { key: 'club_payment', title: 'How Payment Works - Club Pays', dataIndex: 18, section: 'Bonus', info: true, bonus: true },
  { key: 'renewing', title: 'How Payment Works - Renewing teams', dataIndex: 19, section: 'Bonus', info: true, bonus: true },
  { key: 'paying-additional', title: 'Paying for new players', dataIndex: 20, section: 'Bonus', info: true, bonus: true },
  { key: 'adding_players_reminder', title: 'Quick reminder on adding players', dataIndex: 24, section: 'Bonus', info: true, bonus: true },
  { key: 'tip_paywall', title: 'Bonus Tip: If a Parent Hits a Paywall', dataIndex: 15, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_emails', title: 'What’s the difference between the login email and the contact email, and how do I update them?', dataIndex: -1, faqIndex: 0, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_videos_move', title: 'Do completed videos move with a player to a new team?', dataIndex: -1, faqIndex: 5, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_assign_hw', title: 'How do I assign homework?', dataIndex: -1, faqIndex: 12, section: 'Bonus', tip: true, bonus: true, plainNext: true },
  { key: 'faq_folders', title: 'About Program Folders', dataIndex: -1, faqIndex: 13, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_assign_plans', title: 'Types of Plans', dataIndex: -1, faqIndex: 14, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_weekly', title: 'More on Weekly Plans', dataIndex: -1, faqIndex: 21, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_30day', title: 'More on 30-Day Plans', dataIndex: -1, faqIndex: 11, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_custom', title: 'More on Custom Plans', dataIndex: -1, faqIndex: 22, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_equipment', title: 'Do my players need equipment and a lot of space?', dataIndex: -1, faqIndex: 17, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_skip_videos', title: 'What happens if kids skip videos?', dataIndex: -1, faqIndex: 7, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_hw_complete', title: 'I got an email that a homework folder is complete, but the player hasn’t done the videos', dataIndex: -1, faqIndex: 8, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_profiles', title: 'What if I have more than one child using the program?', dataIndex: -1, faqIndex: 1, section: 'Bonus', tip: true, bonus: true },
  { key: 'bonus_coach_contact', title: 'Coach Contact', dataIndex: -1, faqIndex: 29, section: 'Bonus', tip: true, bonus: true },
  { key: 'bonus_parent_emails', title: 'Parent Emails & Roster', dataIndex: -1, faqIndex: 30, section: 'Bonus', tip: true, bonus: true },
  { key: 'bonus_more_emails', title: 'More on Emails', dataIndex: -1, faqIndex: 31, section: 'Bonus', tip: true, bonus: true },
  { key: 'bonus_adding_later', title: 'Adding Players Later', dataIndex: -1, faqIndex: 32, section: 'Bonus', tip: true, bonus: true },
  { key: 'bonus_player_turnover', title: 'Player Turnover', dataIndex: -1, faqIndex: 33, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_homework', title: 'Which homework do you recommend I start with?', dataIndex: -1, faqIndex: 6, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_coach_habits', title: 'Successful coaches', dataIndex: -1, faqIndex: 18, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_struggle', title: 'Coaches who struggle', dataIndex: -1, faqIndex: 23, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_find_team', title: 'Parents can’t find our team — what should I do?', dataIndex: -1, faqIndex: 2, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_not_on_team', title: 'Players have joined the app, but they’re not on my team', dataIndex: -1, faqIndex: 10, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_add_players', title: 'How do I add players to my team?', dataIndex: -1, faqIndex: 3, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_remove_players', title: 'How do I remove players from my team?', dataIndex: -1, faqIndex: 4, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_managers', title: 'Can my team have multiple team managers?', dataIndex: -1, faqIndex: 16, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_folders_assign', title: 'How to Assign Homework', dataIndex: -1, faqIndex: 19, section: 'Bonus', tip: true, bonus: true },
  { key: 'faq_team_name', title: 'How do I change my team name?', dataIndex: -1, faqIndex: 34, section: 'Bonus', tip: true, bonus: true },
];

// The club-director path. Short on purpose: a director arriving here is
// deciding, not setting up, so it answers what it costs and what expanding
// involves rather than walking them through app configuration. Their coaches
// each get the coach path above once the club commits.
const DIRECTOR_PORTAL_STEPS: PortalStep[] = [
  { key: 'dir_pricing', title: 'How pricing works', dataIndex: 1, section: 'Your Club', ack: { label: 'I understand' } },
  { key: 'dir_payment', title: 'Steps to Get Started', dataIndex: 2, section: 'Your Club' },
  { key: 'dir_onboarding', title: 'How Coach Onboarding Works', dataIndex: 3, section: 'Your Club', info: true, ack: { label: 'I understand' } },
  { key: 'dir_seasons', title: 'Adding and removing players each season', dataIndex: 4, section: 'Your Club', info: true },
  { key: 'final_confirm', title: 'Talk to Megan', dataIndex: 5, section: 'Rolling Out', final: true },
];

// Tips are unnumbered; numbered position of the step at index i
const stepNumber = (steps: PortalStep[], i: number) => steps.slice(0, i + 1).filter(x => !x.tip && !x.bonus).length;
const numberedTotal = (steps: PortalStep[]) => steps.filter(x => !x.tip && !x.bonus).length;

// A step that is really several steps, walked one at a time inside the page.
//
// `lead` is the thing being done and `items` are what you need to know about
// it, but they all render as one numbered list — the lead just comes first and
// in bold. A section with no lead simply starts at its first item, which is how
// the roster page has always read and what keeps it unchanged here.
type StepSection = {
  heading: string;
  overview?: string;
  lead?: string;
  items: string[];
  note?: string;
  // A closing recap of the whole step, shown on the section that carries it.
  // Three screens in, the sequence is the thing that has to have landed, and
  // the acknowledgement underneath is asking about exactly this list.
  recap?: string[];
};

const ROSTER_SECTIONS: StepSection[] = [
  { heading: 'Before You Start', items: [
    'Roster templates are for teams joining for the first time and teams with several roster changes.',
    'Renewing members can <strong>submit a roster or add new players inside the app and purchase their slots.</strong>',
    'See the bonus section for roster template FAQs.',
  ] },
];

// Club portal — Steps to Get Started. Three things a club does, in order, one
// screen each. What the invoice covers belongs WITH paying it: "$8 from player
// 76" is the answer to "what am I signing up for", and a club reading the
// invoice step is asking exactly that.
// Each line leads with what it IS in bold, then says what that means. A club
// reading this is scanning for the shape of the commitment, and a wall of
// full sentences makes them read all of it to find any of it.
const PAYMENT_SECTIONS: StepSection[] = [
  {
    heading: 'Submitting Your Rosters',
    overview: 'We provide the roster template &mdash; it&rsquo;s what we use to invite families to join.',
    lead: '<strong>Submit Roster</strong> &mdash; coaches or your club rep send one for each team.',
    items: [
      '<strong>Partial rosters are fine</strong> &mdash; coaches can send theirs at different times.',
      '<strong>Inviting families</strong> &mdash; we send the invites ourselves, once your roster is in.',
    ],
  },
  {
    heading: 'Paying the Invoice',
    overview: 'Pay the invoice online, and we apply free access slots to each coach&rsquo;s profile.',
    lead: '<strong>Pay the Invoice</strong> &mdash; we send it for your first two teams.',
    items: [
      '<strong>Additional players</strong> &mdash; we charge the card on file once they activate their account.',
      '<strong>Pay for players who train</strong> &mdash; you are only charged for the ones actually using the program.',
    ],
  },
  {
    heading: 'Upgrade Your Players',
    overview: 'Coaches apply free access slots to the players on their team.',
    items: [
      '<strong>We add the slots</strong> &mdash; once the invoice is paid, they go on your coach&rsquo;s profile.',
      '<strong>The coach applies them</strong> &mdash; as they join the team.',
    ],
  },
  {
    // The last screen is the sequence itself, ticked off line by line. A single
    // "I understand" under a list is one click that says nothing about whether
    // the list was read; five say which parts were.
    heading: 'I Understand the Steps',
    items: [],
    recap: [
      'Club/Coach submits roster',
      'Club pays invoice',
      'AST adds free access slots',
      'Coach applies the free slots to players on the team',
      'Club is only paying for players who actually use the program',
    ],
  },
];

// Keyed by step, so adding another in-page stepper is one entry here rather
// than another `step.key === ...` special case threaded through the wizard.
const STEP_SECTIONS: Record<string, StepSection[]> = {
  tip_roster: ROSTER_SECTIONS,
  dir_payment: PAYMENT_SECTIONS,
};

// The notification sequence is served by the backend (GET
// /portal-onboarding/notifications) rather than duplicated here — a second copy
// of each subject went stale the moment a template was edited.
// CRM status vocabulary. The backend owns the list (it validates against its
// own copy and sends it down with the coaches); this only supplies the wording
// and colour, and falls back gracefully so a status added server-side shows up
// here as itself rather than as a blank cell.
const CRM_STATUS_LABEL: Record<string, string> = {
  not_started: 'Not started',
  in_process: 'In process',
  won: 'Won',
  lost: 'Lost',
  on_hold: 'On hold',
};
const CRM_STATUS_CLASS: Record<string, string> = {
  not_started: 'bg-gray-100 text-gray-600 border-gray-200',
  in_process: 'bg-amber-100 text-amber-800 border-amber-300',
  won: 'bg-green-100 text-green-800 border-green-300',
  lost: 'bg-red/10 text-red border-red/30',
  on_hold: 'bg-blue-100 text-blue-800 border-blue-300',
};
const crmLabel = (s: string) => CRM_STATUS_LABEL[s] || s.replace(/_/g, ' ');

type Notification = { key: string; n: number; subject: string; purpose: string; from: string };

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
  // Which path a NEW account is signing up for. An existing account's audience
  // comes from the server, so this only matters on the register screen.
  // The route is chosen after signing in, not at signup, so every account —
  // including the ones that existed before the club path — gets the choice and
  // can change it later. Shown as the first screen once a session loads.
  const [showRoutePick, setShowRoutePick] = useState(false);
  const [teamNameInput, setTeamNameInput] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const [wizardIndex, setWizardIndex] = useState(0);
  const [rosterSection, setRosterSection] = useState(0);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [ackChecked, setAckChecked] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<string>('');
  const [showIntro, setShowIntro] = useState(true);
  const [showIndex, setShowIndex] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questionSent, setQuestionSent] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [missingSent, setMissingSent] = useState(false);
  const [indexFilter, setIndexFilter] = useState<'all' | 'outstanding' | 'notifications' | 'crm'>('all');
  const [showIndexInfo, setShowIndexInfo] = useState(false);
  // Before We Start has to be read, not scrolled past, so Next waits on it.
  // Skip still goes straight through — an acknowledgement nobody can decline
  // is not an acknowledgement.
  const [indexInfoAck, setIndexInfoAck] = useState(false);
  const [extraEmail, setExtraEmail] = useState('');
  const [pageSent, setPageSent] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sendingQuestion, setSendingQuestion] = useState(false);

  const firstIncomplete = (c: Coach) => {
    const idx = STEPS.findIndex(s => !c.checklist[s.key] && !s.bonus);
    // When every required step is done, land on Confirm & Finish (not a bonus page after it).
    return idx === -1 ? STEPS.findIndex(s => s.final) : idx;
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
    if (typeof window !== 'undefined' && localStorage.getItem('astPortalAdmin') === '1') setIsAdmin(true);
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
        } else if (params.get('view') === 'steps' || params.get('view') === 'indexinfo') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowIndexInfo(true);
        } else if (params.get('view') === 'index') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowIndex(true);
        } else if (params.get('view') === 'notifications') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowIndex(true);
          setIndexFilter('notifications');
        } else if (params.get('view') === 'crm') {
          setWizardIndex(firstIncomplete(data.coach));
          setShowIntro(false);
          setShowIndex(true);
          setIndexFilter('crm');
        } else {
          setWizardIndex(firstIncomplete(data.coach));
        }
      })
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { setRosterSection(0); setQuizAnswer(''); setCheckedItems([]); setAckChecked(false); }, [wizardIndex]);

  // Keep the current step in the URL so a refresh stays on the same page
  useEffect(() => {
    if (!coach || typeof window === 'undefined') return;
    const url = showFaq ? '/onboarding-portal?view=faq' : showIndex ? (indexFilter === 'notifications' ? '/onboarding-portal?view=notifications' : indexFilter === 'crm' ? '/onboarding-portal?view=crm' : '/onboarding-portal?view=index') : showIndexInfo ? '/onboarding-portal?view=indexinfo' : showIntro ? '/onboarding-portal' : `/onboarding-portal?step=${wizardIndex + 1}`;
    window.history.replaceState(null, '', url);
  }, [coach, showIntro, showIndex, showIndexInfo, showFaq, wizardIndex, indexFilter]);

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
      if (data.admin) {
        setIsAdmin(true);
        localStorage.setItem('astPortalAdmin', '1');
        if (data.adminToken) localStorage.setItem('astPortalAdminToken', data.adminToken);
      } else {
        setIsAdmin(false);
        localStorage.removeItem('astPortalAdmin');
        localStorage.removeItem('astPortalAdminToken');
      }
      setToken(data.token);
      setCoach(data.coach);
      setTeamNameInput(data.coach.teamName || '');
      setWizardIndex(firstIncomplete(data.coach));
      // Ask which route on the way in. Every account gets it, including the
      // ones that predate the club path, and the current choice is preselected
      // so a returning coach is one click from where they were.
      setShowRoutePick(true);
    } catch {
      setError('Could not reach the server. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  // Admin-only: the email sequence, from the backend.
  const [emailSequence, setEmailSequence] = useState<Notification[]>([]);
  useEffect(() => {
    if (!isAdmin || !token) return;
    fetch(`${API}/portal-onboarding/notifications`, {
      headers: { Authorization: token, 'X-Admin-Token': localStorage.getItem('astPortalAdminToken') || '' },
    })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (d?.notifications) setEmailSequence(d.notifications); })
      .catch(() => {});
  }, [isAdmin, token]);

  // Admin-only: expand one notification to read the copy. Fetched from the
  // backend rather than duplicated here, so the preview always matches what
  // the send would actually produce.
  const [openPreview, setOpenPreview] = useState('');
  const [previews, setPreviews] = useState<Record<string, { subject: string; html: string; from: string; replyTo: string | null; to: string; cc: string | null; live: boolean }>>({});
  const [previewLoading, setPreviewLoading] = useState('');
  const togglePreview = async (key: string) => {
    if (openPreview === key) { setOpenPreview(''); return; }
    setOpenPreview(key);
    if (previews[key] || !token) return;
    setPreviewLoading(key);
    try {
      const res = await fetch(`${API}/portal-onboarding/notification-preview?key=${encodeURIComponent(key)}`, {
        headers: { Authorization: token, 'X-Admin-Token': localStorage.getItem('astPortalAdminToken') || '' },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) setPreviews(p => ({ ...p, [key]: data }));
      else setNotifyError(data.error || 'Could not load that preview.');
    } catch {
      setNotifyError('Could not load that preview.');
    } finally {
      setPreviewLoading('');
    }
  };

  // Admin-only: create a coach's portal account. The account is created
  // unclaimed (no password) and the welcome email fires in the same action, so
  // the coach still signs up themselves on the same email later.
  const [newCoach, setNewCoach] = useState({ name: '', email: '', club: '', phone: '', masterPassword: '' });
  const [creating, setCreating] = useState(false);
  const [createResult, setCreateResult] = useState('');
  const [createError, setCreateError] = useState('');
  const createCoach = async () => {
    if (creating) return;
    setCreating(true);
    setCreateResult('');
    setCreateError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoach),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setCreateError(data.error || 'Could not create that account.'); return; }
      setCreateResult(
        data.live
          ? `Created ${data.created} — welcome email sent to them.`
          : `Created ${data.created} — welcome email went to ${data.welcomeSentTo}, NOT to the coach.`
      );
      setNewCoach(c => ({ name: '', email: '', club: '', phone: '', masterPassword: c.masterPassword }));
    } catch {
      setCreateError('Could not create that account.');
    } finally {
      setCreating(false);
    }
  };

  // Admin-only: the CRM. Every account on the portal in one table, with a
  // status Neil sets by hand.
  //
  // The checklist already says how far through the steps a coach has clicked.
  // It cannot say whether they signed — a coach can finish every step and not
  // buy, or buy on a call before opening the portal — so the status is its own
  // field rather than something derived from progress.
  type CrmCoach = { id: number; name: string; club: string; phone: string; email: string; status: string; notes: string; stageId: number | null; createdAt: string | null };
  type CrmStage = { id: number; name: string; sortOrder: number };
  const [crmCoaches, setCrmCoaches] = useState<CrmCoach[]>([]);
  const [crmStatuses, setCrmStatuses] = useState<string[]>([]);
  const [crmLoading, setCrmLoading] = useState(false);
  const [crmError, setCrmError] = useState('');
  const [crmSaving, setCrmSaving] = useState<number | null>(null);
  const [crmSearch, setCrmSearch] = useState('');
  // Bumped to remount the row inputs when a save is rejected, so an
  // uncontrolled cell cannot keep displaying a value the server refused.
  const [crmNonce, setCrmNonce] = useState(0);
  // Which row has its notes open. One at a time, like the notification
  // previews above -- several open notes turn the table back into a wall of
  // text, which is the thing the toggle exists to prevent.
  const [crmOpenNotes, setCrmOpenNotes] = useState<number | null>(null);
  const [crmStages, setCrmStages] = useState<CrmStage[]>([]);
  // null = All, the default view. A number is a stage id.
  const [crmStageView, setCrmStageView] = useState<number | null>(null);
  const [crmNewStage, setCrmNewStage] = useState('');
  const [crmAddingStage, setCrmAddingStage] = useState(false);
  const [crmConfirmStageDelete, setCrmConfirmStageDelete] = useState<number | null>(null);

  const adminHeaders = () => ({
    Authorization: token || '',
    'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
  });

  useEffect(() => {
    if (!isAdmin || !token || indexFilter !== 'crm') return;
    setCrmLoading(true);
    setCrmError('');
    fetch(`${API}/portal-onboarding/admin-coaches`, { headers: adminHeaders() })
      .then(async r => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'Could not load the coach list.');
        return d;
      })
      .then(d => { setCrmCoaches(d.coaches || []); setCrmStatuses(d.statuses || []); setCrmStages(d.stages || []); })
      .catch(e => setCrmError(e.message))
      .finally(() => setCrmLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin, token, indexFilter]);

  // One field at a time. Sending only what changed means two tabs editing
  // different columns of the same coach cannot overwrite each other.
  const saveCrmField = async (id: number, field: 'status' | 'phone' | 'club' | 'name' | 'email' | 'notes' | 'stageId', value: string | number | null) => {
    if (!token) return;
    setCrmSaving(id);
    setCrmError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ id, [field]: value }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCrmError(data.error || 'Could not save that change.');
        // The inputs are uncontrolled, so a rejected value would sit in the
        // cell looking saved. Remount the row to put the stored value back.
        setCrmNonce(n => n + 1);
        return;
      }
      setCrmCoaches(list => list.map(c => (c.id === id ? data.coach : c)));
    } catch {
      setCrmError('Could not save that change.');
      setCrmNonce(n => n + 1);
    } finally {
      setCrmSaving(null);
    }
  };

  const addCrmStage = async () => {
    const name = crmNewStage.trim();
    if (!name || !token || crmAddingStage) return;
    setCrmAddingStage(true);
    setCrmError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-stage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ name }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setCrmError(data.error || 'Could not add that stage.'); return; }
      setCrmStages(data.stages || []);
      setCrmNewStage('');
    } catch {
      setCrmError('Could not add that stage.');
    } finally {
      setCrmAddingStage(false);
    }
  };

  // Deleting a stage empties it, it does not delete the people in it — they
  // fall back to no stage and are still in All.
  const deleteCrmStage = async (id: number) => {
    if (!token) return;
    setCrmError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-stage`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setCrmError(data.error || 'Could not delete that stage.'); return; }
      setCrmStages(data.stages || []);
      setCrmCoaches(list => list.map(c => (c.stageId === id ? { ...c, stageId: null } : c)));
      if (crmStageView === id) setCrmStageView(null);
      setCrmConfirmStageDelete(null);
    } catch {
      setCrmError('Could not delete that stage.');
    }
  };

  // Add a CRM row. Sends nothing unless the box is ticked -- tracking somebody
  // you are not ready to onboard is most of what this table is for.
  const [crmNew, setCrmNew] = useState({ name: '', email: '', club: '', phone: '' });
  const [crmNewWelcome, setCrmNewWelcome] = useState(false);
  const [crmAdding, setCrmAdding] = useState(false);
  const [crmAddResult, setCrmAddResult] = useState('');
  const addCrmCoach = async () => {
    if (!token || crmAdding || !crmNew.email.trim()) return;
    setCrmAdding(true);
    setCrmError('');
    setCrmAddResult('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ ...crmNew, sendWelcome: crmNewWelcome }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setCrmError(data.error || 'Could not add that record.'); return; }
      // Straight to the top: an unarranged row is what the backend sorts first
      // anyway, so this matches where a reload would put it.
      setCrmCoaches(list => [data.coach, ...list]);
      setCrmAddResult(
        data.welcomeSentTo
          ? (data.live
              ? `Added ${data.coach.email} — welcome email sent to them.`
              : `Added ${data.coach.email} — welcome went to ${data.welcomeSentTo}, NOT to them.`)
          : `Added ${data.coach.email} — nothing emailed.`
      );
      setCrmNew({ name: '', email: '', club: '', phone: '' });
      setCrmNewWelcome(false);
    } catch {
      setCrmError('Could not add that record.');
    } finally {
      setCrmAdding(false);
    }
  };

  // Move a row one place within the list currently on screen, then persist the
  // WHOLE order. Swapping against the visible neighbour is what makes this
  // behave under a stage filter or a search: the row lands where the eye
  // expects it, and the hidden rows keep their relative places.
  const moveCrmCoach = async (visible: CrmCoach[], id: number, dir: -1 | 1) => {
    const at = visible.findIndex(c => c.id === id);
    const neighbour = visible[at + dir];
    if (!neighbour || !token) return;

    const next = [...crmCoaches];
    const a = next.findIndex(c => c.id === id);
    const b = next.findIndex(c => c.id === neighbour.id);
    if (a < 0 || b < 0) return;
    [next[a], next[b]] = [next[b], next[a]];
    setCrmCoaches(next);

    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach-order`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ ids: next.map(c => c.id) }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setCrmError(data.error || 'Could not save that order.');
        setCrmCoaches(crmCoaches);
      }
    } catch {
      setCrmError('Could not save that order.');
      setCrmCoaches(crmCoaches);
    }
  };

  // Delete is two clicks, not a browser confirm(): the row asks in place and
  // the second click does it. Nothing else in this portal opens a modal for a
  // single action, and a native dialog blocks the whole page.
  const [crmConfirmDelete, setCrmConfirmDelete] = useState<number | null>(null);
  const deleteCrmCoach = async (id: number) => {
    if (!token) return;
    setCrmSaving(id);
    setCrmError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ id }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setCrmError(data.error || 'Could not delete that coach.'); return; }
      setCrmCoaches(list => list.filter(c => c.id !== id));
      setCrmConfirmDelete(null);
    } catch {
      setCrmError('Could not delete that coach.');
    } finally {
      setCrmSaving(null);
    }
  };

  // Admin-only: resend one onboarding notification to the coach whose session
  // is open. The admin token is separate from the coach token on purpose — the
  // coach holds the coach token too.
  const [notifySending, setNotifySending] = useState('');
  const [notifySent, setNotifySent] = useState('');
  const [notifyError, setNotifyError] = useState('');
  const sendNotification = async (key: string) => {
    if (!token || notifySending) return;
    setNotifySending(key);
    setNotifySent('');
    setNotifyError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          'X-Admin-Token': localStorage.getItem('astPortalAdminToken') || '',
        },
        body: JSON.stringify({ key }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotifyError(res.status === 403
          ? 'Admin sign-in required — sign out and sign back in with the master password.'
          : (data.error || 'Could not send that email.'));
        return;
      }
      setNotifySent(data.sentTo || key);
    } catch {
      setNotifyError('Could not send that email.');
    } finally {
      setNotifySending('');
    }
  };

  const signOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('astPortalAdmin');
    localStorage.removeItem('astPortalAdminToken');
    setIsAdmin(false);
    setToken(null);
    setCoach(null);
    setMode('signin');
    setForm({ name: '', email: '', password: '', club: '' });
  };

  // notify: only the completion popup sends the per-step email. Plain Next
  // navigation saves progress but must never trigger a notification.
  const setStep = async (key: string, value: boolean | 'skipped', advance = false, actionOverride?: string, notify = false, answer?: string) => {
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
          // The backend emails only when both stepAction and stepTitle are present.
          stepAction: notify ? (actionOverride || (value === true ? 'completed' : value === 'skipped' ? 'skipped' : null)) : null,
          stepTitle: notify ? (stepDef ? stepDef.title : key) : null,
          stepAnswer: notify && answer ? answer : null,
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

  const emailMissing = async () => {
    if (!coach || !token) return;
    setSaving(true);
    setError('');
    try {
      const missing = STEPS.filter(st => !st.final && !st.bonus && coach.checklist[st.key] !== true).map(st => st.title);
      const res = await fetch(`${API}/portal-onboarding/email-missing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ missing, extraEmail: extraEmail.trim() }),
      });
      if (!res.ok) throw new Error();
      setMissingSent(true);
      setTimeout(() => setMissingSent(false), 6000);
    } catch {
      setError('Could not send. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const emailPage = async () => {
    if (!coach || !token) return;
    setSaving(true);
    setError('');
    try {
      let html = contentRef.current ? contentRef.current.innerHTML : '';
      if (stepData && stepData.ctaHref) {
        html += `<p style="text-align:center;margin-top:16px;"><a href="${stepData.ctaHref}" style="color:#DC373E;font-weight:700;">${stepData.ctaLabel || 'Open link'}</a></p>`;
      }
      const res = await fetch(`${API}/portal-onboarding/email-page`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ title: step.title, html, extraEmail: extraEmail.trim() }),
      });
      if (!res.ok) throw new Error();
      setPageSent(true);
      setTimeout(() => setPageSent(false), 6000);
    } catch {
      setError('Could not send. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Picking a route saves it, so it sticks across logins and devices. The
  // checklist is sent unchanged — this endpoint only writes the audience when
  // one is present, so nothing else moves.
  const chooseRoute = async (next: Audience) => {
    if (!coach || !token) return;
    setError('');
    setCoach({ ...coach, audience: next });
    setShowRoutePick(false);
    setWizardIndex(0);
    setShowIntro(true);
    try {
      await fetch(`${API}/portal-onboarding/checklist`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify({ checklist: coach.checklist, audience: next }),
      });
    } catch {
      // Non-fatal: the choice already applies for this session, and the next
      // save will carry it. Losing it silently is better than blocking entry.
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
        body: JSON.stringify({ question: questionText.trim(), stepTitle: showIntro ? '' : STEPS[wizardIndex].title }),
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

  // One portal, two audiences. Everything below reads `STEPS` and `STEP_DATA`
  // without caring which path it is on — only these three lines switch.
  const audience: Audience = coach?.audience === 'director' ? 'director' : 'coach';
  const STEPS = audience === 'director' ? DIRECTOR_PORTAL_STEPS : COACH_PORTAL_STEPS;
  const STEP_DATA = audience === 'director' ? DIRECTOR_ONBOARDING_STEPS : COACH_ONBOARDING_STEPS;
  const NUMBERED_TOTAL = numberedTotal(STEPS);

  // Progress is measured against the steps a coach actually has to do. Bonus
  // pages are optional reference, so counting them meant finishing everything
  // required still showed well short of 100%.
  const REQUIRED_STEPS = STEPS.filter(s => !s.bonus);
  const doneCount = coach ? REQUIRED_STEPS.filter(s => coach.checklist[s.key]).length : 0;
  const othersDone = coach ? STEPS.filter(s => !s.final && !s.bonus).every(s => coach.checklist[s.key] === true) : false;
  const allDone = doneCount === REQUIRED_STEPS.length;
  const step = STEPS[wizardIndex];
  const stepState = coach ? coach.checklist[step.key] : undefined;
  const stepDone = !!stepState;
  const stepSkipped = stepState === 'skipped';
  const stepData = step.faqIndex == null ? STEP_DATA[step.dataIndex] : null;
  const stepSections = STEP_SECTIONS[step.key];
  const isSectionStepper = !!stepSections;
  // The Onboarding Begins page lists the steps still to do as checkboxes, and
  // every one has to be ticked. It is a gated step, so like the radio steps it
  // saves straight through rather than opening the confirm popup.
  const beginsItems = step.key === 'onboarding_begins'
    ? STEPS.filter(s2 => s2.section === 'Onboarding' && s2.key !== 'onboarding_begins' && !s2.tip).map(s2 => s2.title)
    : [];
  const beginsUnmet = !!beginsItems.length && !beginsItems.every(t => checkedItems.includes(t));
  const rosterLast = (stepSections?.length || 1) - 1;
  // The recap on the screen currently showing, and whether it is still
  // outstanding. Next waits on it the same way the checklist steps wait on
  // theirs — a page that asks you to confirm each line has to mean it.
  const activeRecap = isSectionStepper ? stepSections?.[rosterSection]?.recap : undefined;
  const recapUnmet = !!activeRecap?.length && !activeRecap.every(r => checkedItems.includes(r));

  const inputClass = 'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-navy placeholder:text-gray focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red';

  // The portal is a max-w-2xl reading column: right for a wizard, far too
  // narrow for a table. The CRM tab gets the full width of the page instead
  // of being squeezed into the same column as the step list.
  const wideView = showIndex && isAdmin && indexFilter === 'crm';

  return (
    <section className="py-16 bg-background min-h-screen">
      <div className={`${wideView ? 'max-w-[1600px]' : 'max-w-2xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowIntro(true); setShowIndexInfo(false); setShowIndex(false); setShowFaq(false); setError(''); }}
                  className="inline-flex items-center gap-1 bg-red text-white text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full hover:bg-red-dark transition-colors"
                >
                  🏠 Home
                </button>
                {coach && !showIndex && (
                  <button
                    onClick={() => { setShowIndex(true); setShowIndexInfo(false); setShowFaq(false); setError(''); }}
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
              {showFaq ? 'Frequently Asked Questions' : coach && showIntro ? `Welcome, ${coach.name.split(' ')[0]}!` : audience === 'director' ? 'Club Portal' : 'Anytime Soccer Onboarding Portal'}
            </h1>
            {!coach && (
              <p className="text-white/70 text-sm mt-1">Sign in to walk through your team setup step by step.</p>
            )}
            {coach && !showIntro && !showIndexInfo && !showIndex && !showFaq && (
              <div className="mt-4">
                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-red rounded-full transition-all" style={{ width: `${(doneCount / REQUIRED_STEPS.length) * 100}%` }} />
                </div>
                <p className="text-white/60 text-xs font-semibold mt-1.5">{Math.round((doneCount / REQUIRED_STEPS.length) * 100)}% complete</p>
              </div>
            )}
          </div>

          <div className={`${wideView ? 'px-4 sm:px-6' : 'px-8'} py-8`}>
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
                {(() => {
                  const remaining = STEPS.filter(s => !s.final && !s.bonus && coach.checklist[s.key] !== true).length;
                  return remaining > 0 ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
                      <span className="text-xl">📋</span>
                      <p className="text-sm text-amber-800 font-semibold">
                        {remaining} step{remaining === 1 ? '' : 's'} still outstanding — tap any <span className="text-red">To do</span> step below to jump in.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
                      <span className="text-xl">✓</span>
                      <p className="text-sm text-green-800 font-semibold">All steps complete — nice work!</p>
                    </div>
                  );
                })()}
                <div className={`flex border border-gray-200 rounded-lg overflow-hidden mb-4 ${isAdmin ? 'max-w-xl' : 'max-w-xs'}`}>
                  {(isAdmin ? (['all', 'outstanding', 'notifications', 'crm'] as const) : (['all', 'outstanding'] as const)).map(f => (
                    <button
                      key={f}
                      onClick={() => setIndexFilter(f)}
                      className={`flex-1 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${indexFilter === f ? 'bg-navy text-white' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
                    >
                      {f === 'all' ? 'All steps' : f === 'outstanding' ? 'Outstanding' : f === 'notifications' ? 'Notifications' : 'CRM'}
                    </button>
                  ))}
                </div>
                <div className="border border-gray-200 rounded-xl overflow-hidden mb-6 divide-y divide-gray-100">
                  {indexFilter === 'all' && (
                    <>
                      <a href="/onboarding-portal" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                        <span className="w-6 text-center text-gray-300 font-bold text-xs">•</span>
                        <span className="text-sm font-semibold text-red hover:underline">Welcome</span>
                      </a>
                    </>
                  )}
                  {indexFilter !== 'notifications' && indexFilter !== 'crm' && STEPS.map((st, i) => {
                    const done = coach.checklist[st.key] === true;
                    const skipped = coach.checklist[st.key] === 'skipped';
                    const outstanding = !done && !skipped;
                    if (indexFilter === 'outstanding' && (done || st.bonus)) return null;
                    return (
                      <a key={st.key} href={`/onboarding-portal?step=${i + 1}`} className={`flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${outstanding ? 'bg-red/5' : ''}`}>
                        <span className={`w-6 text-center font-bold text-xs ${st.bonus ? 'text-amber-500' : skipped ? 'text-amber-500' : done ? 'text-green-600' : 'text-gray-300'}`}>
                          {st.bonus ? '★' : skipped ? '→' : done ? '✓' : st.tip ? '💡' : stepNumber(STEPS, i)}
                        </span>
                        <span className={`text-sm font-semibold hover:underline ${st.bonus ? 'text-navy' : done ? 'text-gray-400' : 'text-red'}`}>{st.title}</span>
                        {st.bonus ? (
                          <span className="ml-auto flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">★ Bonus</span>
                        ) : !st.final && (
                          <span className={`ml-auto flex-shrink-0 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${done ? 'bg-green-100 text-green-700' : skipped ? 'bg-amber-100 text-amber-700' : 'bg-red/10 text-red'}`}>
                            {done ? 'Done' : skipped ? 'Skipped' : 'To do'}
                          </span>
                        )}
                      </a>
                    );
                  })}
                  {indexFilter === 'outstanding' && STEPS.every(s => coach.checklist[s.key] === true) && (
                    <p className="px-4 py-6 text-center text-sm text-gray-500 font-semibold">🎉 Nothing outstanding — every step is complete!</p>
                  )}
                  {isAdmin && indexFilter === 'notifications' && (
                    <>
                      <div className="flex items-center gap-2 px-4 py-2 bg-amber-50">
                        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">Notifications</span>
                        <span className="text-[10px] font-semibold text-amber-700/70">Admin only · sends to {coach.email}</span>
                      </div>
                      {!emailSequence.length && (
                        <p className="px-4 py-6 text-center text-sm text-gray-500 font-semibold">Loading the sequence…</p>
                      )}
                      {emailSequence.map(e => (
                        <div key={e.n}>
                          <div className="flex items-start gap-3 px-4 py-3">
                            <span className="w-6 text-center font-bold text-xs text-amber-500 pt-0.5">✉</span>
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-navy">{e.subject}</span>
                              <span className="block text-xs text-gray-500 mt-0.5">{e.purpose}</span>
                              <button
                                onClick={() => togglePreview(e.key)}
                                className="mt-1 text-[10px] font-bold uppercase tracking-wide text-red hover:underline"
                              >
                                {openPreview === e.key ? '▾ Close copy' : '▸ View copy'}
                              </button>
                            </span>
                            <span className="ml-auto flex-shrink-0 flex flex-col items-end gap-1">
                              <button
                                onClick={() => sendNotification(e.key)}
                                disabled={!!notifySending}
                                className="text-[10px] font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-navy text-white hover:bg-navy-light transition-colors disabled:opacity-50"
                              >
                                {notifySending === e.key ? 'Sending…' : 'Send'}
                              </button>
                              {notifySent && notifySending !== e.key && (
                                <span className="text-[10px] font-semibold text-green-700 text-right">✓ Sent to {notifySent}</span>
                              )}
                              {notifyError && (
                                <span className="text-[10px] font-semibold text-red text-right">{notifyError}</span>
                              )}
                            </span>
                          </div>
                          {openPreview === e.key && (
                            <div className="px-4 pb-4">
                              {previewLoading === e.key && <p className="text-xs text-gray-500 font-semibold">Loading…</p>}
                              {previews[e.key] && (
                                <div className="border border-gray-200 rounded-lg overflow-hidden">
                                  <div className="bg-gray-50 px-3 py-2 text-[11px] text-gray-600 space-y-0.5">
                                    <p><span className="font-bold text-gray-500">From:</span> {previews[e.key].from}</p>
                                    {previews[e.key].replyTo && <p><span className="font-bold text-gray-500">Reply-To:</span> {previews[e.key].replyTo}</p>}
                                    <p><span className="font-bold text-gray-500">To:</span> {previews[e.key].to}{previews[e.key].cc ? ` · CC ${previews[e.key].cc}` : ''}</p>
                                    <p><span className="font-bold text-gray-500">Subject:</span> {previews[e.key].subject}</p>
                                    {!previews[e.key].live && (
                                      <p className="text-amber-700 font-semibold">Sends are not live — this goes to Neil, not the coach.</p>
                                    )}
                                  </div>
                                  {/* The email is a fixed 600px table, which
                                      overflows this panel. Scale it down rather
                                      than side-scroll: the iframe is laid out
                                      wider than the box and shrunk to fit, so
                                      the whole width is visible at once. */}
                                  <div className="overflow-hidden bg-white" style={{ height: 600 }}>
                                    <iframe
                                      title={`Preview: ${e.subject}`}
                                      srcDoc={previews[e.key].html}
                                      scrolling="no"
                                      className="bg-white border-0"
                                      style={{ width: '143%', height: 858, transform: 'scale(0.7)', transformOrigin: 'top left' }}
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                  {isAdmin && indexFilter === 'crm' && (
                    <>
                      <div className="flex flex-wrap items-center gap-2 px-4 py-2 bg-amber-50">
                        <span className="text-[10px] font-extrabold uppercase tracking-wide text-amber-700">CRM</span>
                        <span className="text-[10px] font-semibold text-amber-700/70">Admin only &middot; everyone on the portal</span>
                        <input
                          value={crmSearch}
                          onChange={ev => setCrmSearch(ev.target.value)}
                          placeholder="Filter by name, club or email"
                          className="ml-auto w-full sm:w-64 border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-navy placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                        />
                      </div>
                      {/* One dropdown, not a row of pills. Pills grow with the
                          pipeline and push the search box off the line; a
                          select stays one control however many stages exist.
                          Remove acts on whatever is selected, so there is no
                          per-stage × cluttering the list either. */}
                      <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-gray-100">
                        <label className="text-[10px] font-extrabold uppercase tracking-wide text-gray-500">View</label>
                        <select
                          value={crmStageView === null ? '' : String(crmStageView)}
                          onChange={ev => { setCrmStageView(ev.target.value === '' ? null : Number(ev.target.value)); setCrmConfirmStageDelete(null); }}
                          className="border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-navy bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                        >
                          <option value="">All ({crmCoaches.length})</option>
                          {crmStages.map(st => (
                            <option key={st.id} value={st.id}>
                              {st.name} ({crmCoaches.filter(c => c.stageId === st.id).length})
                            </option>
                          ))}
                        </select>

                        {crmStageView !== null && (
                          crmConfirmStageDelete === crmStageView ? (
                            <span className="inline-flex items-center gap-1">
                              <button
                                onClick={() => deleteCrmStage(crmStageView)}
                                className="text-[10px] font-extrabold uppercase tracking-wide bg-red text-white rounded-full px-2.5 py-1 hover:bg-red-dark transition-colors"
                              >
                                Remove stage
                              </button>
                              <button
                                onClick={() => setCrmConfirmStageDelete(null)}
                                className="text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-navy px-1"
                              >
                                Cancel
                              </button>
                            </span>
                          ) : (
                            <button
                              onClick={() => setCrmConfirmStageDelete(crmStageView)}
                              title="Remove this stage — the people in it stay, they just go back to no stage"
                              className="text-[10px] font-bold uppercase tracking-wide text-gray-400 hover:text-red px-1 transition-colors"
                            >
                              Remove
                            </button>
                          )
                        )}

                        <span className="inline-flex items-center gap-1 ml-auto">
                          <input
                            value={crmNewStage}
                            onChange={ev => setCrmNewStage(ev.target.value)}
                            onKeyDown={ev => { if (ev.key === 'Enter') addCrmStage(); }}
                            placeholder="New stage"
                            className="w-32 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                          />
                          <button
                            onClick={addCrmStage}
                            disabled={!crmNewStage.trim() || crmAddingStage}
                            className="text-xs font-bold rounded-lg border border-navy text-navy px-2.5 py-1.5 hover:bg-navy hover:text-white transition-colors disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-navy"
                          >
                            {crmAddingStage ? 'Adding\u2026' : '+ Add'}
                          </button>
                        </span>
                      </div>
                      {crmError && <p className="px-4 py-3 text-sm font-semibold text-red">{crmError}</p>}
                      {crmLoading && <p className="px-4 py-6 text-center text-sm text-gray-500 font-semibold">Loading the coach list&hellip;</p>}
                      {!crmLoading && !crmCoaches.length && !crmError && (
                        <p className="px-4 py-6 text-center text-sm text-gray-500 font-semibold">Nobody on the portal yet.</p>
                      )}
                      {!crmLoading && !!crmCoaches.length && (() => {
                        const needle = crmSearch.trim().toLowerCase();
                        const inStage = crmStageView === null
                          ? crmCoaches
                          : crmCoaches.filter(c => c.stageId === crmStageView);
                        const shown = needle
                          ? inStage.filter(c => `${c.name} ${c.club} ${c.email}`.toLowerCase().includes(needle))
                          : inStage;
                        if (!shown.length) {
                          const stageName = crmStages.find(st => st.id === crmStageView)?.name;
                          return (
                            <p className="px-4 py-6 text-center text-sm text-gray-500 font-semibold">
                              {needle
                                ? <>Nobody matches &ldquo;{crmSearch}&rdquo;{stageName ? ` in ${stageName}` : ''}.</>
                                : <>Nothing in {stageName || 'this view'} yet.</>}
                            </p>
                          );
                        }
                        const cellInput = 'w-full bg-transparent border border-transparent hover:border-gray-200 focus:border-amber-300 focus:bg-white rounded px-2 py-1 focus:outline-none';
                        return (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                              <thead>
                                <tr className="bg-gray-50 text-[10px] font-extrabold uppercase tracking-wide text-gray-500">
                                  <th className="px-1 py-2 w-[3%] text-center">&nbsp;</th>
                                  <th className="px-3 py-2 w-[14%]">Name</th>
                                  <th className="px-3 py-2 w-[15%]">Club</th>
                                  <th className="px-3 py-2 w-[10%]">Phone</th>
                                  <th className="px-3 py-2 w-[21%]">Email</th>
                                  <th className="px-3 py-2 w-[10%]">Status</th>
                                  <th className="px-3 py-2 w-[12%]">Stage</th>
                                  <th className="px-3 py-2 w-[8%]">Added</th>
                                  <th className="px-3 py-2 w-[4%] text-center">Notes</th>
                                  <th className="px-3 py-2 w-[3%] text-right">&nbsp;</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-100">
                                {shown.map((c, i) => (
                                  <Fragment key={`${c.id}-${crmNonce}`}>
                                  <tr className={`align-middle ${crmSaving === c.id ? 'opacity-60' : ''}`}>
                                    {/* Order is hand-set and saved whole, so what
                                        is stored is always exactly what is on
                                        screen. Arrows rather than drag: a table
                                        with editable cells in every column has
                                        nowhere left to grab. */}
                                    <td className="px-1 py-2 whitespace-nowrap text-center">
                                      <span className="inline-flex flex-col leading-none">
                                        <button
                                          onClick={() => moveCrmCoach(shown, c.id, -1)}
                                          disabled={i === 0}
                                          title="Move up"
                                          className="text-[9px] text-gray-300 hover:text-navy disabled:opacity-0 transition-colors"
                                        >
                                          &#9650;
                                        </button>
                                        <button
                                          onClick={() => moveCrmCoach(shown, c.id, 1)}
                                          disabled={i === shown.length - 1}
                                          title="Move down"
                                          className="text-[9px] text-gray-300 hover:text-navy disabled:opacity-0 transition-colors"
                                        >
                                          &#9660;
                                        </button>
                                      </span>
                                    </td>
                                    {/* Every text cell saves on blur, not on each
                                        keystroke: a PUT per character races itself and
                                        the last response back wins rather than the last
                                        thing typed. */}
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <input
                                        defaultValue={c.name}
                                        placeholder="&mdash;"
                                        onBlur={ev => { if (ev.target.value !== c.name) saveCrmField(c.id, 'name', ev.target.value); }}
                                        className={`${cellInput} font-semibold text-navy placeholder:text-gray-300`}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <input
                                        defaultValue={c.club}
                                        placeholder="&mdash;"
                                        onBlur={ev => { if (ev.target.value !== c.club) saveCrmField(c.id, 'club', ev.target.value); }}
                                        className={`${cellInput} text-gray-700 placeholder:text-gray-300`}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <input
                                        defaultValue={c.phone}
                                        placeholder="&mdash;"
                                        onBlur={ev => { if (ev.target.value !== c.phone) saveCrmField(c.id, 'phone', ev.target.value); }}
                                        className={`${cellInput} text-gray-700 placeholder:text-gray-300`}
                                      />
                                    </td>
                                    {/* An address that wraps is unreadable and unusable
                                        for copying. The cell never wraps; the table
                                        scrolls sideways instead if the window is small. */}
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <input
                                        type="email"
                                        defaultValue={c.email}
                                        onBlur={ev => { if (ev.target.value !== c.email) saveCrmField(c.id, 'email', ev.target.value); }}
                                        className={`${cellInput} text-red font-semibold`}
                                      />
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <select
                                        value={c.status}
                                        onChange={ev => saveCrmField(c.id, 'status', ev.target.value)}
                                        className={`text-xs font-bold rounded-full border px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-300 ${CRM_STATUS_CLASS[c.status] || 'bg-gray-100 text-gray-600 border-gray-200'}`}
                                      >
                                        {(crmStatuses.length ? crmStatuses : Object.keys(CRM_STATUS_LABEL)).map(st => (
                                          <option key={st} value={st}>{crmLabel(st)}</option>
                                        ))}
                                      </select>
                                    </td>
                                    {/* Setting a stage here is what moves the row
                                        into that filtered view — there is no
                                        separate "move to stage" action. */}
                                    <td className="px-3 py-2 whitespace-nowrap">
                                      <select
                                        value={c.stageId === null ? '' : String(c.stageId)}
                                        onChange={ev => saveCrmField(c.id, 'stageId', ev.target.value === '' ? null : Number(ev.target.value))}
                                        className={`text-xs font-bold rounded-full border px-2.5 py-1 focus:outline-none focus:ring-2 focus:ring-amber-300 ${
                                          c.stageId === null ? 'bg-white text-gray-400 border-gray-200' : 'bg-navy/5 text-navy border-navy/30'
                                        }`}
                                      >
                                        <option value="">&mdash;</option>
                                        {crmStages.map(st => (
                                          <option key={st.id} value={st.id}>{st.name}</option>
                                        ))}
                                      </select>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-gray-500 text-xs">
                                      {c.createdAt
                                        ? new Date(c.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
                                        : '\u2014'}
                                    </td>
                                    {/* The toggle, not the notes. A column wide
                                        enough to hold a written-up call would
                                        squeeze every other column flat, so the
                                        notes live in a sub-row that is closed
                                        until asked for. The pip says a row has
                                        notes without opening it. */}
                                    <td className="px-3 py-2 whitespace-nowrap text-center">
                                      <button
                                        onClick={() => setCrmOpenNotes(open => (open === c.id ? null : c.id))}
                                        title={c.notes ? 'Notes' : 'Add a note'}
                                        className={`inline-flex items-center gap-1 text-xs font-bold rounded-full border px-2 py-1 transition-colors ${
                                          crmOpenNotes === c.id
                                            ? 'bg-navy text-white border-navy'
                                            : c.notes
                                              ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                                        }`}
                                      >
                                        <span>{crmOpenNotes === c.id ? '\u25be' : '\u25b8'}</span>
                                        <span>{c.notes ? '\u2022' : '+'}</span>
                                      </button>
                                    </td>
                                    <td className="px-3 py-2 whitespace-nowrap text-right">
                                      {crmConfirmDelete === c.id ? (
                                        <span className="inline-flex items-center gap-1">
                                          <button
                                            onClick={() => deleteCrmCoach(c.id)}
                                            className="text-[10px] font-extrabold uppercase tracking-wide bg-red text-white rounded-full px-2.5 py-1 hover:bg-red-dark transition-colors"
                                          >
                                            Delete
                                          </button>
                                          <button
                                            onClick={() => setCrmConfirmDelete(null)}
                                            className="text-[10px] font-bold uppercase tracking-wide text-gray-500 hover:text-navy px-1"
                                          >
                                            Cancel
                                          </button>
                                        </span>
                                      ) : (
                                        <button
                                          onClick={() => setCrmConfirmDelete(c.id)}
                                          title={`Delete ${c.email}`}
                                          className="text-gray-300 hover:text-red text-base leading-none px-1 transition-colors"
                                        >
                                          &times;
                                        </button>
                                      )}
                                    </td>
                                  </tr>
                                  {crmOpenNotes === c.id && (
                                    <tr className="bg-amber-50/40">
                                      <td colSpan={10} className="px-3 pb-3 pt-0">
                                        <label className="block text-[10px] font-extrabold uppercase tracking-wide text-amber-700 mb-1">
                                          Notes &mdash; {c.name || c.email}
                                        </label>
                                        <textarea
                                          defaultValue={c.notes}
                                          rows={5}
                                          placeholder="Calls, what they asked for, what to do next\u2026"
                                          onBlur={ev => { if (ev.target.value !== c.notes) saveCrmField(c.id, 'notes', ev.target.value); }}
                                          className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y"
                                        />
                                        <p className="text-[11px] text-gray-500 mt-1">Saves when you click away.</p>
                                      </td>
                                    </tr>
                                  )}
                                  </Fragment>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        );
                      })()}
                    </>
                  )}
                </div>
                {isAdmin && indexFilter === 'crm' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-1">Add a record</p>
                    <p className="text-xs text-amber-800/80 mb-3">
                      Email is the only thing required &mdash; everything else can be filled in later, in the table.
                      Nothing is sent unless you tick the box.
                    </p>
                    <div className="grid gap-2 sm:grid-cols-4 mb-3">
                      <input
                        value={crmNew.name}
                        onChange={ev => setCrmNew({ ...crmNew, name: ev.target.value })}
                        placeholder="Name"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        type="email"
                        value={crmNew.email}
                        onChange={ev => setCrmNew({ ...crmNew, email: ev.target.value })}
                        onKeyDown={ev => { if (ev.key === 'Enter') addCrmCoach(); }}
                        placeholder="Email (required)"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        value={crmNew.club}
                        onChange={ev => setCrmNew({ ...crmNew, club: ev.target.value })}
                        placeholder="Club"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        value={crmNew.phone}
                        onChange={ev => setCrmNew({ ...crmNew, phone: ev.target.value })}
                        placeholder="Phone"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                    </div>
                    <label className="flex items-start gap-2 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={crmNewWelcome}
                        onChange={ev => setCrmNewWelcome(ev.target.checked)}
                        className="mt-0.5"
                      />
                      <span className="text-xs text-amber-900">
                        <span className="font-bold">Also send the welcome email.</span>{' '}
                        Starts the onboarding sequence &mdash; they get email 1 now, and the 24-hour reminder if they
                        haven&rsquo;t signed up by tomorrow. Leave this off to just track them.
                      </span>
                    </label>
                    <button
                      onClick={addCrmCoach}
                      disabled={crmAdding || !crmNew.email.trim()}
                      className="bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {crmAdding ? 'Adding\u2026' : crmNewWelcome ? '+ Add record & send welcome' : '+ Add record'}
                    </button>
                    {crmAddResult && <p className="text-green-700 font-semibold text-sm mt-2">&#10003; {crmAddResult}</p>}
                  </div>
                )}
                {isAdmin && indexFilter === 'crm' && (
                  <p className="text-xs text-gray-500 mb-4 px-1">
                    {crmCoaches.length} on the portal{crmStageView !== null ? `, ${crmCoaches.filter(c => c.stageId === crmStageView).length} in this stage` : ''}. Every text cell saves when you click away; status, stage and order save as soon as you change them.
                    Deleting removes the portal account &mdash; an unclaimed one stops being chased by the reminder emails, and a claimed one can sign up again on the same address.
                  </p>
                )}
                {isAdmin && indexFilter === 'notifications' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-1">Create a coach&rsquo;s account</p>
                    <p className="text-xs text-amber-800/80 mb-3">Creates the account unclaimed and sends the welcome email. They still sign up themselves on the same email.</p>
                    <div className="grid gap-2 sm:grid-cols-2 mb-2">
                      <input
                        value={newCoach.name}
                        onChange={ev => setNewCoach({ ...newCoach, name: ev.target.value })}
                        placeholder="Coach name"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        type="email"
                        value={newCoach.email}
                        onChange={ev => setNewCoach({ ...newCoach, email: ev.target.value })}
                        placeholder="Coach email"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        value={newCoach.club}
                        onChange={ev => setNewCoach({ ...newCoach, club: ev.target.value })}
                        placeholder="Club (optional)"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        value={newCoach.phone}
                        onChange={ev => setNewCoach({ ...newCoach, phone: ev.target.value })}
                        placeholder="Phone (optional)"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                      <input
                        type="password"
                        value={newCoach.masterPassword}
                        onChange={ev => setNewCoach({ ...newCoach, masterPassword: ev.target.value })}
                        placeholder="Super admin password"
                        className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                      />
                    </div>
                    <button
                      onClick={createCoach}
                      disabled={creating || !newCoach.name.trim() || !newCoach.email.trim() || !newCoach.masterPassword}
                      className="bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {creating ? 'Creating…' : 'Create account & send welcome'}
                    </button>
                    {createResult && <p className="text-green-700 font-semibold text-sm mt-2">✓ {createResult}</p>}
                    {createError && <p className="text-red font-semibold text-sm mt-2">{createError}</p>}
                  </div>
                )}
                {isAdmin && indexFilter !== 'notifications' && indexFilter !== 'crm' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-4 text-center">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2">Admin</p>
                    <input
                      type="email"
                      value={extraEmail}
                      onChange={e => setExtraEmail(e.target.value)}
                      placeholder="Also send to (optional email)"
                      className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                      onClick={emailMissing}
                      disabled={saving}
                      className="bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Sending…' : '📧 Email Missing Steps to Coach'}
                    </button>
                    {missingSent && <p className="text-green-700 font-semibold text-sm mt-2">✓ Sent to {coach.email}</p>}
                  </div>
                )}
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
            ) : showRoutePick ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">What brings you here?</h2>
                <p className="text-gray-700 leading-relaxed mb-5">
                  Pick the one that fits.
                </p>
                <div className="space-y-3 mb-6">
                  {([
                    {
                      value: 'coach',
                      label: 'I’m onboarding my team',
                      hint: 'This walks you through getting your team live — roster, payment, parents, the lot.',
                    },
                    {
                      value: 'director',
                      label: 'I’m bringing my club on',
                      hint: 'You’re exploring AST for your club. Here’s what it covers: pricing, team onboarding, and getting set up.',
                    },
                  ] as const).map(opt => {
                    const current = audience === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => chooseRoute(opt.value)}
                        className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-colors ${current ? 'border-navy bg-blue-50' : 'border-gray-200 bg-white hover:border-navy hover:bg-gray-50'}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="font-bold text-navy">{opt.label}</span>
                          {current && <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-navy text-white">Current</span>}
                        </span>
                        <span className="block text-sm text-gray-600 mt-1 leading-relaxed">{opt.hint}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : showIntro ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">{audience === 'director' ? 'Bringing Your Club On' : 'Getting Started'}</h2>
                {/* Coach path only — the club path opens straight into what it
                    covers, so the welcome line does not sit above it twice. */}
                {audience !== 'director' && (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    Welcome to <strong className="text-navy font-semibold">Anytime Soccer Training</strong>!
                  </p>
                )}
                <p className="text-gray-700 leading-relaxed mb-3">
                  {audience === 'director' ? 'This covers three things:' : 'Getting set up has three parts:'}
                </p>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-4">
                  <ol className="space-y-4">
                    {(audience === 'director' ? [
                      <><strong className="text-navy font-semibold">Pricing</strong> — per-player rates, and the club rate.</>,
                      <><strong className="text-navy font-semibold">Team onboarding</strong> — how teams are created and rosters submitted.</>,
                      <><strong className="text-navy font-semibold">Getting set up</strong> — getting your coaches and parents going.</>,
                    ] : [
                      <><strong className="text-navy font-semibold">Pre-Onboarding</strong> — a few quick steps before we begin.</>,
                      <><strong className="text-navy font-semibold">Onboarding</strong> — the steps that get your team live in the app.</>,
                      <><strong className="text-navy font-semibold">FAQs</strong> — answering common questions.</>,
                    ]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <button
                  onClick={() => {
                    setShowIntro(false);
                    setError('');
                    // Starting means starting at the beginning. wizardIndex is
                    // seeded with the first *incomplete* step, which counts a
                    // skipped step as handled — so someone who skipped page one
                    // and came back via Home was dropped onto page three.
                    // Continue still resumes; only Get Started resets.
                    if (doneCount === 0) setWizardIndex(0);
                    // The club path skips the key-steps page: its three bullets
                    // above already say the same thing, so it read as a repeat.
                    if (audience !== 'director') setShowIndexInfo(true);
                  }}
                  className="w-full bg-red hover:bg-red-dark text-white font-bold py-3 rounded-xl transition-colors mb-3"
                >
                  {doneCount === 0 ? 'Get Started →' : 'Continue →'}
                </button>

                <button
                  onClick={() => { setShowIntro(false); setShowRoutePick(true); setError(''); }}
                  className="w-full text-center text-sm text-gray-500 hover:text-navy font-semibold"
                >
                  {audience === 'director' ? 'Onboarding a team instead?' : 'Bringing a whole club on instead?'}
                </button>

              </div>
            ) : showIndexInfo ? (
              <div>
                <h2 className="text-navy text-xl font-extrabold mb-3">Before We Start</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Here&rsquo;s how to get your team set up.
                </p>
                {/* Coach path only — the club path skips this screen, so there is
                    no director variant to keep in step here. */}
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-4">
                  <ol className="space-y-4">
                    {[
                      <><strong className="text-navy font-semibold">Add players.</strong> Send roster (new teams), or invite players yourself.</>,
                      <><strong className="text-navy font-semibold">Pay for access.</strong> Pay invoice and/or per player in the app.</>,
                      <><strong className="text-navy font-semibold">Complete this portal.</strong> Includes the engagement survey.</>,
                      <><strong className="text-navy font-semibold">Notify parents.</strong> Edit and share our welcome email.</>,
                      <><strong className="text-navy font-semibold">Confirm you're ready.</strong> Tell us you're ready to start.</>,
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{i + 1}</span>
                        <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <label className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 mb-4 cursor-pointer transition-colors ${indexInfoAck ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <input
                    type="radio"
                    name="indexInfoAck"
                    checked={indexInfoAck}
                    onChange={() => setIndexInfoAck(true)}
                    className="w-4 h-4 accent-green-600"
                  />
                  <span className="text-sm font-bold text-navy">I understand</span>
                </label>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-4">
                  <button
                    onClick={() => { setShowIndexInfo(false); setShowIntro(true); setError(''); }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => { setShowIndexInfo(false); setWizardIndex(0); setError(''); }}
                    className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    onClick={() => { setWizardIndex(firstIncomplete(coach)); setShowIndexInfo(false); setError(''); }}
                    disabled={!indexInfoAck}
                    className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {step.bonus && (
                  <span className="inline-block text-[10px] font-extrabold uppercase tracking-wide px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 mb-2">★ Optional bonus — not required to finish</span>
                )}
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
                <div ref={contentRef}>
                {isSectionStepper && stepSections ? (
                  <div className="mb-6">
                    {[rosterSection].map(si => {
                      const sec = stepSections[si];
                      return (
                        <div key={si}>
                          {/* Heading and overview sit on the page, not inside
                              the tinted box — same shape as every other step,
                              where the box holds the list and only the list. */}
                          {/* Same treatment as "The Rate" and the other step
                              eyebrows: red, uppercase, 13px, extrabold. */}
                          <h3 className="text-[13px] font-extrabold uppercase tracking-wide text-red mb-2.5">{sec.heading.replace('&amp;', '&')}</h3>
                          {sec.overview && (
                            <p className="text-gray-700 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: sec.overview }} />
                          )}
                          {(sec.lead || !!sec.items.length) && (
                          <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-5 mb-4">
                          {/* The lead is line 1 of the same list, not a badge
                              with bullets hanging off it — every line on the
                              screen counts 1, 2, 3, and reads the same weight
                              as the ones after it. */}
                          <ol className="space-y-3">
                            {(sec.lead ? [sec.lead, ...sec.items] : sec.items).map((it, ii) => (
                              <li key={ii} className="flex items-start gap-3">
                                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-navy text-white font-bold text-sm">{ii + 1}</span>
                                <span className="text-gray-700 leading-relaxed pt-1 [&_strong]:text-navy" dangerouslySetInnerHTML={{ __html: it }} />
                              </li>
                            ))}
                          </ol>
                          {sec.note && (
                            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 mt-3">
                              <p className="text-sm text-red font-semibold" dangerouslySetInnerHTML={{ __html: sec.note }} />
                            </div>
                          )}
                          </div>
                          )}
                          {!!sec.recap?.length && (
                            <ol className="space-y-2 mb-4">
                              {sec.recap.map((r, ri) => {
                                const on = checkedItems.includes(r);
                                return (
                                  <li key={ri}>
                                    <label className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${on ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                                      <input
                                        type="radio"
                                        name={`recap-${si}-${ri}`}
                                        checked={on}
                                        onChange={() => setCheckedItems(prev => prev.includes(r) ? prev : [...prev, r])}
                                        className="accent-green-600 w-4 h-4 mt-0.5"
                                      />
                                      <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-navy text-white font-bold text-xs">{ri + 1}</span>
                                      <span className="text-navy text-sm font-bold leading-relaxed" dangerouslySetInnerHTML={{ __html: r }} />
                                    </label>
                                  </li>
                                );
                              })}
                            </ol>
                          )}
                        </div>
                      );
                    })}
                    <p className="text-center text-xs text-gray-500 font-semibold">Step {rosterSection + 1} of {stepSections.length}</p>
                  </div>
                ) : stepData ? (
                  <CoachStepContent step={stepData} hideCta />
                ) : step.faqIndex != null ? (
                  <div
                    className="mb-6 space-y-3 text-gray-700 leading-relaxed text-sm [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:marker:text-red [&_strong]:text-navy [&_strong]:font-semibold"
                    dangerouslySetInnerHTML={{ __html: ONBOARDING_FAQ[step.faqIndex]?.answer || '' }}
                  />
                ) : null}

                {step.checks && (
                  <div className="mb-6">
                    <p className="text-navy font-semibold text-base leading-relaxed mb-4">{step.checks.prompt}</p>
                    {stepDone ? (
                      <p className="text-green-700 font-semibold text-sm">✓ Thanks — we have this recorded.</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {step.checks.items.map(item => {
                          const on = checkedItems.includes(item);
                          return (
                            <label
                              key={item}
                              className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${on ? 'border-red bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                            >
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() => setCheckedItems(prev => on ? prev.filter(i => i !== item) : [...prev, item])}
                                className="accent-red-600 w-4 h-4"
                              />
                              <span className="text-sm font-bold text-navy">{item}</span>
                            </label>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
                {/* A radio, not a checkbox: this is an acknowledgement, and a
                    box you can untick invites the reading that it is optional.
                    On a step walked in sections it waits for the last one —
                    asking someone to confirm they understand on screen 1 of 3
                    is asking before they have been told. */}
                {step.ack && !stepDone && (!isSectionStepper || rosterSection === rosterLast) && (
                  <div className="mb-6">
                    <label className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${ackChecked ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                      <input
                        type="radio"
                        name="stepAck"
                        checked={ackChecked}
                        onChange={() => setAckChecked(true)}
                        className="accent-green-600 w-4 h-4 mt-0.5"
                      />
                      <span className="text-sm font-bold text-navy">{step.ack.label}</span>
                    </label>
                  </div>
                )}
                {step.quiz && (
                  <div className="mb-6">
                    <p className="text-navy font-semibold text-base leading-relaxed mb-4">{step.quiz.prompt}</p>
                    {stepDone ? (
                      <p className="text-green-700 font-semibold text-sm">✓ Thanks — your answer has been recorded.</p>
                    ) : (
                      <div className="flex flex-col gap-2">
                        {step.quiz.options.map(opt => (
                          <label
                            key={opt}
                            className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${quizAnswer === opt ? 'border-red bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                          >
                            <input
                              type="radio"
                              name="quizAnswer"
                              checked={quizAnswer === opt}
                              onChange={() => setQuizAnswer(opt)}
                              className="accent-red-600 w-4 h-4"
                            />
                            <span className="text-sm font-bold text-navy">{opt}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {step.key === 'onboarding_begins' && (
                  <div className="mb-6 flex flex-col gap-2">
                    {STEPS.filter(s2 => s2.section === 'Onboarding' && s2.key !== 'onboarding_begins' && !s2.tip).map(s2 => {
                      const on = checkedItems.includes(s2.title);
                      return (
                        <label
                          key={s2.key}
                          className={`flex items-start gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-colors ${on ? 'border-red bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                        >
                          <input
                            type="checkbox"
                            checked={on}
                            onChange={() => setCheckedItems(prev => on ? prev.filter(i => i !== s2.title) : [...prev, s2.title])}
                            className="accent-red-600 w-4 h-4 mt-0.5"
                            disabled={stepDone}
                          />
                          <span className="text-sm font-bold text-navy">{s2.title}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {step.note && (
                  <p className="text-navy text-sm bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">{step.note}</p>
                )}
                </div>

                {step.needsTeamName && !stepDone && (
                  <input
                    className={`${inputClass} mb-4`}
                    placeholder="Your team name in the app"
                    value={teamNameInput}
                    onChange={e => setTeamNameInput(e.target.value)}
                  />
                )}

                {error && <p className="text-red text-sm font-semibold mb-4">{error}</p>}

                {isAdmin && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-2 text-center">Admin</p>
                    <input
                      type="email"
                      value={extraEmail}
                      onChange={e => setExtraEmail(e.target.value)}
                      placeholder="Also send to (optional email)"
                      className="w-full border border-amber-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-400 mb-3 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    />
                    <button
                      onClick={emailPage}
                      disabled={saving}
                      className="w-full bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-60"
                    >
                      {saving ? 'Sending…' : '📧 Email This Page to Coach'}
                    </button>
                    {pageSent && <p className="text-green-700 font-semibold text-sm mt-2 text-center">✓ Sent to {coach.email}</p>}
                  </div>
                )}

                {/* Wizard navigation */}
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      if (isSectionStepper && rosterSection > 0) { setRosterSection(rosterSection - 1); }
                      else if (wizardIndex === 0) { setShowIndexInfo(true); }
                      else { setWizardIndex(wizardIndex - 1); }
                      setError('');
                    }}
                    className="w-full sm:w-auto bg-white border-2 border-navy text-navy hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                  >
                    ← Back
                  </button>
                  {/* Skip is on every page, both paths included. Any page can
                      be one that does not apply to you, and a page you cannot
                      move past without answering it is a page you leave.
                      On the last page there is nothing ahead, so it goes to the
                      Index rather than nowhere. */}
                  <button
                    onClick={() => {
                      if (wizardIndex < STEPS.length - 1) { setWizardIndex(wizardIndex + 1); }
                      else { setShowIndex(true); }
                      setError('');
                    }}
                    className="w-full sm:w-auto bg-white border-2 border-gray-300 text-gray-500 hover:bg-gray-50 font-bold py-2.5 px-8 rounded-xl transition-colors"
                  >
                    {step.final && wizardIndex < STEPS.length - 1 ? 'Bonus →' : 'Skip'}
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
                  ) : isSectionStepper && rosterSection < rosterLast ? (
                    // An in-page stepper: one section per screen, green Next
                    // between them. The step itself is not complete until the
                    // last section, where the normal red Next takes over.
                    <button
                      onClick={() => { setRosterSection(rosterSection + 1); setError(''); }}
                      className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                    >
                      Next →
                    </button>
                  ) : step.quiz ? (
                    // Quiz page: Next submits the selected answer (goes in the email).
                    <button
                      onClick={() => { if (stepDone) { if (wizardIndex < STEPS.length - 1) { setWizardIndex(wizardIndex + 1); setError(''); } } else { setStep(step.key, true, true, undefined, true, step.checks ? `${quizAnswer}${checkedItems.length ? ' — confirmed: ' + checkedItems.join(', ') : ''}` : step.ack ? `${quizAnswer} — acknowledged: ${step.ack.label}` : quizAnswer); } }}
                      disabled={saving || (!stepDone && (!quizAnswer || (!!step.ack && !ackChecked)))}
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                    >
                      {saving ? 'Saving…' : 'Next →'}
                    </button>
                  ) : step.bonus ? (
                    // Bonus reference pages: plain Next to browse, no completion popup.
                    wizardIndex < STEPS.length - 1 ? (
                      <button
                        onClick={() => { setWizardIndex(wizardIndex + 1); setError(''); }}
                        className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors"
                      >
                        Next →
                      </button>
                    ) : null
                  ) : beginsItems.length ? (
                    <button
                      onClick={() => { if (stepDone) { if (wizardIndex < STEPS.length - 1) { setWizardIndex(wizardIndex + 1); setError(''); } } else { setStep(step.key, true, true, undefined, true, `confirmed: ${checkedItems.join(', ')}`); } }}
                      disabled={saving || (!stepDone && beginsUnmet)}
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                    >
                      {saving ? 'Saving…' : 'Next →'}
                    </button>
                  ) : (
                    // No gate on this step: Next marks it done and moves on.
                    //
                    // This used to open a confirm dialog with the same two
                    // choices on every page. A modal that asks the identical
                    // question each time stops being read, and pages that need
                    // an actual answer carry their own radio buttons inline —
                    // where the question can be about that page.
                    //
                    // Still notifies, exactly as confirming in the dialog did,
                    // so Megan's view of who has done what is unchanged.
                    <button
                      onClick={() => { if (stepDone) { if (wizardIndex < STEPS.length - 1) { setWizardIndex(wizardIndex + 1); setError(''); } } else { setStep(step.key, true, true, undefined, true, step.ack ? `acknowledged: ${step.ack.label}` : undefined); } }}
                      disabled={saving || (!stepDone && ((!!step.ack && !ackChecked) || recapUnmet))}
                      className="w-full sm:w-auto bg-red hover:bg-red-dark text-white font-bold py-2.5 px-8 rounded-xl transition-colors disabled:opacity-40"
                    >
                      {saving ? 'Saving…' : 'Next →'}
                    </button>
                  )}
                </div>
                <p className="text-center text-xs font-bold text-gray-400 mt-4">{wizardIndex + 1}</p>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-navy rounded-2xl px-8 py-8 text-center text-white">
          <h3 className="text-lg font-bold mb-4">Questions?</h3>
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
