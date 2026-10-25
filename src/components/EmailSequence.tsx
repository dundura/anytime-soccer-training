'use client';

import DemoPortal from './DemoPortal';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

/**
 * The email sequence as one page: each group is a heading, each email a row under it, and the contacts sit on the row
 * they have reached. Contacts move down the rows, emails move up and down and can be deleted, contacts can be hidden and
 * brought back. Moving a contact marks emails as done; it never sends anything.
 */

const API = 'https://api.anytime-soccer.com';

type Email = { key: string; label: string; group: string; auto: boolean; onboarding: boolean };
type Lead = { id: number; name: string | null; email: string | null; organization: string | null; stage: string; seqHiddenAt: string | null; sent: string[] };
type LayoutRow = { emailKey: string; groupName: string | null; sortOrder: number; deleted: number };

// The group names the server uses, shown the way the lead drawer shows them, in the order the sequence runs.
const SHOWN: Record<string, string> = {
  'Before anything': 'Before demo',
  'Chasing a quiet lead': 'Chasing to book demo',
  'After Demo Follow-up': 'After demo thank you and one pager',
  'Getting the demo booked': 'Client Contacts Us',
  'Sending Roster Template': 'Roster template sent',
  'After the demo': 'Paid Invoice',
  'Onboarding': 'Invoice Paid - Onboarding Started',
  'Confirming with others FAQ': 'FAQ',
};
export const shown = (g: string) => SHOWN[g] || g;
// Two server groups that are the same stage here.
const ALIAS: Record<string, string> = { 'Confirming with others FAQ': 'FAQ' };
// The three chasers after the demo get a sub-section of their own on this page (the server still files them under After Demo Follow-up).
const KEY_GROUP: Record<string, string> = { demo_questions_check: 'Chasing after demo', demo_tried_calling: 'Chasing after demo', demo_still_interested: 'Chasing after demo', pricing: 'Getting the demo booked', any_questions: 'Final push', your_timing: 'Final push', tried_calling: 'Final push', which_are_you: 'Getting the demo booked', demo_today: 'Chasing a quiet lead', demo_today_tomorrow: 'Chasing a quiet lead', coachReachOut: 'Not the coach', wanted_demo: 'Chasing a quiet lead', cant_make_it: 'Reschedule demo', rebook_later: 'Reschedule demo', sevenToTenDays: 'Follow-up - not received roster yet', rosterNudge: 'Follow-up - not received roster yet', rosterResend: 'Follow-up - not received roster yet', rosterReceived: 'Invoice sent', invoiceReminder: 'Waiting on invoice payment', welcome_received_check: 'Onboarding', onboarding_check_in: 'Onboarding', onboardingComplete: 'Onboarding complete', doItTogether: 'Onboarding', waitingOnCoach: 'Onboarding', paymentReceived: 'Onboarding', won_thank_you: 'Thank you' };
// Names on this page that differ from the email's own title.
const LABEL: Record<string, string> = { book_a_demo: 'Book a demo - emailed us', rosterReceived: 'Thanks for sending your roster - invoice sent' };
const groupOf = (g: string, key?: string) => (key && KEY_GROUP[key]) || ALIAS[g] || g;
const RUN_ORDER = [
  'Getting the demo booked', 'Chasing a quiet lead', 'Demo booked', 'Reschedule demo', 'After Demo Follow-up', 'Chasing after demo', 'Final push',
  'Sending Roster Template', 'Follow-up - not received roster yet', 'Invoice sent', 'Waiting on invoice payment', 'Invoice', 'After the demo', 'Onboarding', 'Onboarding complete', 'Thank you', 'First Follow-up',
];
const END_ORDER = ['Renewal', 'Special offer', 'Not the coach', 'No - Closing Out'];

// Big stages that hold smaller ones as sub-steps (group names as the server has them). Anything not listed stands alone.
const PARENTS: { name: string; subs: string[] }[] = [
  { name: 'Sent Invoice', subs: ['Invoice sent', 'Waiting on invoice payment'] },
  { name: 'Yes - Send Roster', subs: ['Sending Roster Template', 'Follow-up - not received roster yet'] },
  { name: 'Demo Before Roster', subs: ['Getting the demo booked', 'Chasing a quiet lead', 'Demo booked', 'Reschedule demo', 'After Demo Follow-up', 'Chasing after demo', 'Final push'] },
  { name: 'First 3 weeks', subs: ['Thank you', 'First Follow-up'] },
  { name: 'Other', subs: ['FAQ', 'Sending information to decision makers', 'Sending information to parents', 'Renewal', 'Special offer', 'Not the coach'] },
];

// The sequences, and which one each stage belongs to. The console's left menu is built from this.
export const SEQUENCES = ['Demo & Invoicing', 'Onboarding', 'First 3 weeks', 'Other', 'No - Closing Out'];
export const seqOf = (name: string) => (name === 'Demo Before Roster' || name === 'Yes - Send Roster' || name === 'Sent Invoice' ? 'Demo & Invoicing' : name === 'No - Closing Out' ? 'No - Closing Out' : name === 'First 3 weeks' ? 'First 3 weeks' : (name === 'Onboarding' || name === 'Onboarding complete') ? 'Onboarding' : 'Other');
const TOP_STAGES = ['Demo Before Roster', 'Yes - Send Roster', 'Sent Invoice', 'Onboarding', 'Onboarding complete', 'First 3 weeks', 'Other', 'No - Closing Out'];
export const SEQ_TREE = SEQUENCES.map((name) => ({
  name,
  stages: TOP_STAGES.filter((st) => seqOf(st) === name).map((st) => {
    const p = PARENTS.find((x) => x.name === st);
    return { name: st, label: shown(st), big: !!p, subs: p ? p.subs.map((g) => ({ name: g, label: shown(g) })) : [] };
  }),
}));

// A finished email already draws its own 600px card. A plain one is just paragraphs, so the preview sets it in the same kind of card
// instead of leaving it loose on the page.
const previewDoc = (html: string) => {
  if (/max-width:s*600px|width="600"|<html/i.test(html)) return html;
  return '<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif">'
    + '<div style="padding:24px 12px"><div style="max-width:560px;margin:0 auto;background:#fff;border-top:5px solid #F97316;border-radius:12px;padding:28px 32px;font-size:16px;line-height:1.6;color:#334155">'
    + html + '</div></div></body></html>';
};

// Sections that sit inside another section: group name -> their title and the emails they hold.
const NESTED: Record<string, { title: string; keys: string[] }[]> = {
  'Onboarding': [{ title: 'Chasing to finish onboarding', keys: ['welcome_received_check', 'onboarding_check_in', 'doItTogether', 'waitingOnCoach'] }],
};

const MARK = ' → marked as done, not sent';
// What is written when a contact is moved: the title and the key, because some emails share a title.
const markText = (e: Email) => e.label + ' (' + e.key + ')';

// mode 'leads' is the Leads page: everyone, Not started or Started. 'sequence' is the Coach Onboarding stages.
export default function EmailSequence({ token, mode = 'sequence' }: { token: string | null; mode?: 'sequence' | 'leads' }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [layout, setLayout] = useState<LayoutRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  // Which sequence is showing; the console's left menu picks it.
  const [sequence, setSequenceState] = useState(() => {
    try { const v = localStorage.getItem('seqSequence'); return v && SEQUENCES.includes(v) ? v : 'Demo & Invoicing'; } catch { return 'Demo & Invoicing'; }
  });
  // A refresh keeps the sequence that was open.
  const setSequence = (v: string) => {
    setSequenceState(v);
    try { localStorage.setItem('seqSequence', v); } catch { /* storage unavailable */ }
  };
  // The left menu picks a sequence, a stage or a section. It leaves the pick in sessionStorage so a page that was not open yet still gets it.
  useEffect(() => {
    const apply = () => {
      let pick: { seq?: string; stage?: string; big?: boolean; panel?: string } | null = null;
      try { pick = JSON.parse(sessionStorage.getItem('seqNav') || 'null'); sessionStorage.removeItem('seqNav'); } catch { /* storage unavailable */ }
      if (!pick) return;
      // The left menu's Hidden contacts and Deleted emails open their panels.
      if (pick.panel === 'hidden') setShowHidden(true);
      if (pick.panel === 'deleted') setShowDeleted(true);
      if (!pick.seq) return;
      setSequence(pick.seq);
      setStagePop(pick.stage || null);
    };
    apply();
    window.addEventListener('seqnav', apply);
    return () => window.removeEventListener('seqnav', apply);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Opens a stage (a group name) in the sequence it belongs to, and tells the left menu which sequence that is.
  const jumpTo = (groupName: string) => {
    const top = PARENTS.find((x) => x.subs.includes(groupName));
    const seq = seqOf(top ? top.name : groupName);
    if (mode === 'leads') {
      try { sessionStorage.setItem('seqNav', JSON.stringify({ seq, stage: groupName })); window.dispatchEvent(new CustomEvent('seqgo')); } catch { /* storage unavailable */ }
      return;
    }
    setSequence(seq);
    setStagePop(groupName);
    try { window.dispatchEvent(new CustomEvent('seqsync', { detail: seq })); } catch { /* no window */ }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // The Started list can be narrowed to one stage; the table follows.
  // A person's name opens every field on them (the old Leads page drawer); Move is its own button.
  const [detailId, setDetailId] = useState<number | null>(null);
  // Which stages have their table of leads showing.
  const [leadsOpen, setLeadsOpen] = useState<Record<string, boolean>>({});
  const [startedStage, setStartedStage] = useState('');
  const topOf = (groupName: string) => { const p = PARENTS.find((x) => x.subs.includes(groupName)); return p ? p.name : groupName; };
  const stageOfPerson = (l: Lead) => {
    const at = positionOf(l);
    if (at >= 0) { const g = groups.find((x) => x.items.some((e) => e.key === flat[at].key)); return g ? g.name : null; }
    return waitingOf(l);
  };
  const inSeq = (name: string) => seqOf(name) === sequence;
  const [menuAt, setMenuAt] = useState<{ right: number; top?: number; bottom?: number } | null>(null);
  // A fixed menu would float off its button on scroll, so it closes instead.
  useEffect(() => {
    if (!menu) return;
    const close = () => setMenu(null);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [menu]);
  const [showHidden, setShowHidden] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  // Which category is showing. Only the picked one is drawn, so the page stays short.
  // Every stage is on the page and shut until it is opened.
  // The stage showing on its own in a popup.
  // An email waiting for a yes before it really goes out.
  const [sendAsk, setSendAsk] = useState<{ lead: Lead; email: Email; subject: string; html: string; loading: boolean; preview?: boolean } | null>(null);
  // What is open is remembered on this device, so a refresh puts the page back as it was.
  // In the Move popup, which stage is open. undefined = the one the person is in; the rest start collapsed.
  const [popOpen, setPopOpen] = useState<string | null | undefined>(undefined);
  const [stagePop, setStagePopState] = useState<string | null>(() => {
    try { return localStorage.getItem('seqStagePop') || null; } catch { return null; }
  });
  const setStagePop = (v: string | null) => {
    setStagePopState(v);
    try { if (v) localStorage.setItem('seqStagePop', v); else localStorage.removeItem('seqStagePop'); } catch { /* storage unavailable */ }
  };
  const [openGroups, setOpenGroupsState] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('seqOpenGroups') || '{}') || {}; } catch { return {}; }
  });
  const setOpenGroups = (fn: (o: Record<string, boolean>) => Record<string, boolean>) =>
    setOpenGroupsState((o) => {
      const next = fn(o);
      try { localStorage.setItem('seqOpenGroups', JSON.stringify(next)); } catch { /* storage unavailable */ }
      return next;
    });
  // Find a person: type a name and see which stage they are in.
  const [find, setFind] = useState('');
  // The overview popup: every stage and the people in it.
  const [whoPop, setWhoPop] = useState(false);
  // A big stage's pill asks which of its sections to show: all of them or one.
  const [pillPop, setPillPop] = useState<string | null>(null);
  // One Stages pill holds every stage; it opens a list to pick from.
  const [stagesPop, setStagesPop] = useState(false);
  // The Clients pill asks which list: started in the sequence or not started.
  const [clientsPop, setClientsPop] = useState(false);
  // Big stages start shut so only the stages show; the arrow opens the sections inside.
  const [bigOpen, setBigOpen] = useState<Record<string, boolean>>(() => {
    try { return JSON.parse(localStorage.getItem('seqBigOpen') || '{}') || {}; } catch { return {}; }
  });
  const toggleAllBig = () => {
    setBigOpen({});
    try { localStorage.setItem('seqBigOpen', '{}'); } catch { /* the page works without it */ }
  };
  const toggleBig = (name: string, open: boolean) => setBigOpen((o) => {
    const next = { ...o, [name]: open };
    try { localStorage.setItem('seqBigOpen', JSON.stringify(next)); } catch { /* the page works without it */ }
    return next;
  });
  // The email whose contacts are showing in the Open popup.
  const [openEmail, setOpenEmail] = useState<Email | null>(null);
  // The move popup: first pick the person, then pick where to put them.
  const [pop, setPop] = useState<{ lead: Lead | null; search: string; only?: boolean } | null>(null);

  const headers = useCallback(
    () => ({
      'Content-Type': 'application/json',
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token]
  );
  const flash = (m: string) => { setNote(m); setTimeout(() => setNote(''), 4000); };

  const load = useCallback(async () => {
    setError('');
    try {
      const res = await fetch(`${API}/demo-portal/sequence-board`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load the sequence.');
      setEmails(((d.emails || []) as Email[]).map((e) => (LABEL[e.key] ? { ...e, label: LABEL[e.key] } : e)));
      setLeads(d.leads || []);
      setLayout(d.layout || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load the sequence.');
    } finally {
      setLoading(false);
    }
  }, [headers]);
  useEffect(() => { load(); }, [load]);

  // Groups in order, each with its emails in order, with Neil's saved layout laid over the default.
  const { groups, deleted } = useMemo(() => {
    const saved = new Map(layout.map((r) => [r.emailKey, r]));
    const gone: Email[] = [];
    const byGroup = new Map<string, Email[]>();
    emails.forEach((e) => {
      const s = saved.get(e.key);
      if (s && s.deleted) { gone.push(e); return; }
      const g = groupOf((s && s.groupName) || e.group, e.key);
      byGroup.set(g, [...(byGroup.get(g) || []), e]);
    });
    byGroup.forEach((list, g) => {
      const def = list.map((e) => e.key);
      list.sort((a, b) => {
        const sa = saved.get(a.key);
        const sb = saved.get(b.key);
        if (sa && sb) return sa.sortOrder - sb.sortOrder;
        return def.indexOf(a.key) - def.indexOf(b.key);
      });
      // Payment received opens Invoice Paid - Onboarding Started.
      if (g === 'Onboarding' && !saved.has('paymentReceived')) list.sort((x, y) => Number(y.key === 'paymentReceived') - Number(x.key === 'paymentReceived'));
      // The roster resend is number 2 in the roster follow-up.
      if (g === 'Follow-up - not received roster yet' && !saved.has('rosterResend')) {
        const at = list.findIndex((x) => x.key === 'rosterResend');
        if (at >= 0) { const [m] = list.splice(at, 1); list.splice(Math.min(1, list.length), 0, m); }
      }
      // Did you want a quick demo? opens Chasing to book demo.
      if (g === 'Chasing a quiet lead' && !saved.has('wanted_demo')) list.sort((x, y) => Number(y.key === 'wanted_demo') - Number(x.key === 'wanted_demo'));
      // I tried calling you opens Final push.
      if (g === 'Final push' && !saved.has('tried_calling')) list.sort((x, y) => Number(y.key === 'tried_calling') - Number(x.key === 'tried_calling'));
      // Today or tomorrow is number 4 in Before demo.
      if (g === 'Before anything' && !saved.has('demo_today_tomorrow')) {
        const at = list.findIndex((x) => x.key === 'demo_today_tomorrow');
        if (at >= 0) { const [m] = list.splice(at, 1); list.splice(Math.min(3, list.length), 0, m); }
      }
      // Pricing details (auto) is next to last in Client Contacts Us, and Demo, or info for your child? closes it.
      if (g === 'Getting the demo booked' && !saved.has('pricing')) list.sort((x, y) => Number(x.key === 'pricing') - Number(y.key === 'pricing'));
      if (g === 'Getting the demo booked' && !saved.has('which_are_you')) list.sort((x, y) => Number(x.key === 'which_are_you') - Number(y.key === 'which_are_you'));
      if (g === 'Sending Roster Template') list.sort((x, y) => Number(y.key === 'afterDemo') - Number(x.key === 'afterDemo'));
    });
    // First Follow-up has no emails yet, but it still shows so one can be moved into it.
    if (!byGroup.has('First Follow-up')) byGroup.set('First Follow-up', []);
    const names = Array.from(byGroup.keys());
    const known = RUN_ORDER.filter((n) => names.includes(n));
    const end = END_ORDER.filter((n) => names.includes(n));
    const middle = names.filter((n) => !RUN_ORDER.includes(n) && !END_ORDER.includes(n));
    // A group with nothing in it still shows, so an email can be moved into it.
    const order = [...known, ...middle, ...end];
    return { groups: order.map((name) => ({ name, items: byGroup.get(name) || [] })), deleted: gone };
  }, [emails, layout]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // Only what was marked on this page counts. Emails that were really sent do not place anyone in the sequence yet.
  // A marker from before the key was added matches the first email with that title, never a later one.
  const alreadySent = useCallback((e: Email, sent: string[]) => {
    if (sent.includes(markText(e) + MARK)) return true;
    const firstWithTitle = flat.findIndex((x) => x.label === e.label) === flat.indexOf(e);
    return firstWithTitle && sent.includes(e.label + MARK);
  }, [flat]);

  // Where this contact is: the email of their latest move on this page, or -1 for none yet. One place only.
  useEffect(() => { setPopOpen(undefined); }, [pop?.lead?.id]);
  const stageMark = (name: string) => 'Stage: ' + name + ' (stage)';
  const placeOf = useCallback((l: Lead) => {
    let at = -1;
    let stage = null as string | null;
    l.sent.forEach((summary) => {
      const i = flat.findIndex((e) => alreadySent(e, [summary]));
      if (i >= 0) { at = i; stage = null; return; }
      // Marks made when this stage was one section still count: First 3 weeks is now its first section, Thank you.
      const g = groups.find((x) => summary === stageMark(x.name) + MARK || (x.name === 'Thank you' && summary === stageMark('First 3 weeks') + MARK));
      if (g) { at = -1; stage = g.name; }
    });
    return { at, stage };
  }, [flat, groups, alreadySent]);
  const positionOf = useCallback((l: Lead) => placeOf(l).at, [placeOf]);
  // In a stage but not on an email yet: they wait above the first email.
  const waitingOf = useCallback((l: Lead) => placeOf(l).stage, [placeOf]);
  const inStage = (l: Lead, g: { name: string; items: Email[] }) => waitingOf(l) === g.name || g.items.some((e) => flat.indexOf(e) === positionOf(l));

  // View expands one stage on the page and hides the rest.
  const NOT_STARTED = '__not_started';
  const PEOPLE = '__people';
  // The stages in order: a big stage sits where its first sub-step was, with its sub-steps gathered under it.
  const stages = useMemo(() => {
    const out: { name: string; big: boolean; subs: typeof groups }[] = [];
    const used = new Set<string>();
    groups.forEach((g) => {
      if (used.has(g.name)) return;
      const p = PARENTS.find((x) => x.subs.includes(g.name));
      if (!p) { out.push({ name: g.name, big: false, subs: [g] }); used.add(g.name); return; }
      const subs = p.subs.map((n) => groups.find((x) => x.name === n)).filter((x): x is (typeof groups)[number] => !!x);
      subs.forEach((x) => used.add(x.name));
      out.push({ name: p.name, big: true, subs });
    });
    return out;
  }, [groups]);
  const rawFocus = stagePop === NOT_STARTED || stagePop === PEOPLE ? stagePop : (stagePop && (groups.some((g) => g.name === stagePop) || stages.some((st) => st.name === stagePop)) ? stagePop : null);
  const focus = mode === 'leads' ? (rawFocus === PEOPLE ? PEOPLE : NOT_STARTED) : (rawFocus === NOT_STARTED || rawFocus === PEOPLE ? null : rawFocus);
  // One stage at a time keeps the page quiet: a sequence opens on its first stage, the menu picks the others.
  useEffect(() => {
    if (mode !== 'sequence' || focus || !stages.length) return;
    const first = SEQ_TREE.find((q) => q.name === sequence)?.stages[0];
    if (first && stages.some((st) => st.name === first.name)) setStagePop(first.name);
  }, [mode, focus, stages, sequence]); // eslint-disable-line react-hooks/exhaustive-deps
  const visible = leads.filter((l) => !l.seqHiddenAt);
  const hidden = leads.filter((l) => l.seqHiddenAt);
  // The left menu shows these two counts.
  useEffect(() => {
    try { window.dispatchEvent(new CustomEvent('seqcounts', { detail: { hidden: leads.filter((l) => l.seqHiddenAt).length, deleted: deleted.length } })); } catch { /* no window */ }
  }, [leads, deleted]);
  const notStarted = visible.filter((l) => positionOf(l) < 0 && !waitingOf(l));

  const call = async (path: string, body: object, ok: string) => {
    if (busy) return false;
    setBusy(true);
    try {
      const res = await fetch(`${API}/demo-portal${path}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'That did not work.');
      flash(ok);
      await load();
      return true;
    } catch (e) {
      flash(e instanceof Error ? e.message : 'That did not work.');
      return false;
    } finally {
      setBusy(false);
      setMenu(null);
    }
  };

  // Every save writes the whole layout, so the order on the page is the order that is stored.
  const saveLayout = (next: { name: string; items: Email[] }[], gone: Email[], ok: string) => {
    const items = [
      ...next.flatMap((g) => g.items.map((e, i) => ({ key: e.key, group: g.name, order: i, deleted: false }))),
      ...gone.map((e) => ({ key: e.key, group: e.group, order: 0, deleted: true })),
    ];
    return call('/sequence-layout', { items }, ok);
  };

  const moveEmail = (gName: string, idx: number, dir: -1 | 1) => {
    const next = groups.map((g) => ({ name: g.name, items: [...g.items] }));
    const g = next.find((x) => x.name === gName);
    if (!g || idx + dir < 0 || idx + dir >= g.items.length) return;
    [g.items[idx], g.items[idx + dir]] = [g.items[idx + dir], g.items[idx]];
    saveLayout(next, deleted, 'Moved');
  };

  const deleteEmail = (e: Email) => {
    const next = groups.map((g) => ({ name: g.name, items: g.items.filter((x) => x.key !== e.key) }));
    saveLayout(next, [...deleted, e], 'Deleted. It is under Deleted emails if you want it back.');
  };

  const restoreEmail = (e: Email) => {
    const next = groups.map((g) => ({ name: g.name, items: g.name === groupOf(e.group, e.key) ? [...g.items, e] : g.items }));
    saveLayout(next, deleted.filter((x) => x.key !== e.key), 'Restored');
  };

  // Moving puts the contact on that one email, up or down. Nothing is sent.
  const moveContactTo = (l: Lead, target: Email) => {
    if (positionOf(l) === flat.indexOf(target)) { flash('They are already there.'); setMenu(null); return Promise.resolve(false); }
    // Once moved, the page shows only that stage.
    return call(`/leads/${l.id}/mark-sent`, { labels: [markText(target)] }, 'Moved to ' + target.label).then((ok) => { if (ok) setStagePop((groups.find((g) => g.items.some((x) => x.key === target.key)) || { name: target.group }).name); return ok; });
  };

  // One step down the list: the next email in the sequence is marked done. Nothing is sent.
  const moveContactDown = (l: Lead) => {
    const next = flat[positionOf(l) + 1];
    if (!next) { flash('They are at the last email.'); return; }
    call(`/leads/${l.id}/mark-sent`, { labels: [markText(next)] }, 'Moved down to ' + next.label);
  };

  // The email as the club will get it, shown before anything is sent. The subject can be edited, same as on the lead card.
  const openSend = async (l: Lead, e: Email, preview = false) => {
    setSendAsk({ lead: l, email: e, subject: '', html: '', loading: true, preview });
    try {
      const url = e.onboarding
        ? `/leads/${l.id}/onboarding-preview?key=${encodeURIComponent(e.key)}`
        : `/template/${encodeURIComponent(e.key)}?leadId=${l.id}`;
      const res = await fetch(`${API}/demo-portal${url}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not build that email.');
      setSendAsk({ lead: l, email: e, subject: d.subject || '', html: d.html || '', loading: false, preview });
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Could not build that email.');
      setSendAsk(null);
    }
  };

  // The one place an email really goes out. It runs only from the confirm box; moving a contact never gets here.
  const sendNow = async (l: Lead, e: Email, subject: string) => {
    if (busy) return;
    setBusy(true);
    try {
      const url = e.onboarding ? `/leads/${l.id}/onboarding-email` : `/leads/${l.id}/email`;
      const body = e.onboarding ? { key: e.key } : { template: e.key, subject };
      const res = await fetch(`${API}/demo-portal${url}`, { method: 'POST', headers: headers(), body: JSON.stringify(body) });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not send that email.');
      if (positionOf(l) !== flat.indexOf(e)) {
        await fetch(`${API}/demo-portal/leads/${l.id}/mark-sent`, { method: 'POST', headers: headers(), body: JSON.stringify({ labels: [markText(e)] }) });
      }
      flash('Sent to ' + (l.email || contactName(l)));
      setSendAsk(null);
      setPop(null);
      await load();
    } catch (err) {
      flash(err instanceof Error ? err.message : 'Could not send that email.');
    } finally {
      setBusy(false);
    }
  };

  const hideContact = (l: Lead, hide: boolean) =>
    call(`/leads/${l.id}/seq-hide`, { hidden: hide }, hide ? 'Hidden from this page' : 'Added back');

  // Deleting is for good, so the first tap only asks; the second one does it.
  const [delAsk, setDelAsk] = useState<number | null>(null);
  const deleteContact = (l: Lead) => { setPop(null); return call(`/leads/${l.id}/seq-delete`, {}, 'Deleted'); };
  const deleteBtn = (l: Lead, cls = '') => (
    <button
      type="button"
      disabled={busy}
      onClick={(ev) => { ev.stopPropagation(); if (delAsk === l.id) { setDelAsk(null); deleteContact(l); } else setDelAsk(l.id); }}
      className={`shrink-0 px-2.5 py-1 rounded-lg border border-red text-[11px] font-bold disabled:opacity-50 ${delAsk === l.id ? 'bg-red text-white' : 'bg-white text-red'} ${cls}`}
    >
      {delAsk === l.id ? 'Delete for good?' : 'Delete'}
    </button>
  );

  const contactName = (l: Lead) => l.organization || l.name || l.email || 'Lead ' + l.id;

  const Menu = ({ id, children }: { id: string; children: ReactNode }) => (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={(ev) => {
          ev.stopPropagation();
          const r = ev.currentTarget.getBoundingClientRect();
          // Fixed so no parent can clip it; opens upward when the page ends below the button.
          setMenuAt(window.innerHeight - r.bottom < 220 ? { right: window.innerWidth - r.right, bottom: window.innerHeight - r.top + 4 } : { right: window.innerWidth - r.right, top: r.bottom + 4 });
          setMenu(menu === id ? null : id);
        }}
        className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold hover:bg-gray-200"
      >
        Actions ▾
      </button>
      {menu === id && (
        <div style={menuAt || undefined} className="fixed z-50 min-w-[190px] rounded-xl border border-gray-200 bg-white shadow-lg py-1" onClick={(ev) => ev.stopPropagation()}>
          {children}
        </div>
      )}
    </div>
  );
  const Item = ({ onClick, children, danger }: { onClick: () => void; children: ReactNode; danger?: boolean }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={`block w-full text-left px-3 py-2 text-[12px] font-semibold hover:bg-gray-50 disabled:opacity-50 ${danger ? 'text-red' : 'text-navy'}`}
    >
      {children}
    </button>
  );

  const contactChip = (l: Lead) => (
    <button
      key={l.id}
      type="button"
      onClick={(ev) => { ev.stopPropagation(); setPop({ lead: l, search: '' }); }}
      className="rounded-full bg-white border border-blue-300 px-3 py-1 text-[11px] font-bold text-navy truncate max-w-[220px] hover:bg-blue-50"
    >
      {contactName(l)}
    </button>
  );

  // The page has two sections: Leads (who is in these stages) and Sequence (the stages and their emails).
  const [pageOpen, setPageOpen] = useState<{ leads: boolean; sequence: boolean }>({ leads: false, sequence: false });
  const sectionHead = (label: string, note: string, key: 'leads' | 'sequence') => (
    <button
      type="button"
      onClick={() => setPageOpen((o) => ({ ...o, [key]: !o[key] }))}
      className="w-full flex items-center gap-2 px-4 py-2.5 text-left bg-white border border-gray-200 rounded-t-xl"
    >
      <span className="text-[10px] text-gray-400 w-3">{pageOpen[key] ? '▾' : '▸'}</span>
      <span className="flex-1 text-[14px] font-black text-navy">{label}</span>
      <span className="text-[11px] font-normal text-gray-400">{note}</span>
    </button>
  );
  const leadsHere = visible.filter((l) => {
    const g = stageOfPerson(l);
    if (!g) return false;
    if (!inSeq(topOf(g))) return false;
    return !focus || g === focus || topOf(g) === focus;
  });
  const leadsSection = () => (
    <div className="mb-4">
      {sectionHead('Leads', leadsHere.length + (leadsHere.length === 1 ? ' lead' : ' leads'), 'leads')}
      {pageOpen.leads && (
        <div className="border border-t-0 border-gray-200 rounded-b-xl overflow-hidden">
          {leadsHere.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">No one is in {focus ? 'this stage' : 'these stages'} yet.</p>}
          {leadsHere.map((l, i) => {
            const at = positionOf(l);
            const g = stageOfPerson(l) || '';
            return (
              <div key={l.id} className={`flex items-center gap-2 px-4 py-2 ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                <button type="button" onClick={() => setDetailId(l.id)} className="flex-1 min-w-0 text-left">
                  <span className="block truncate text-[13px] font-semibold text-navy">{contactName(l)}</span>
                  <span className="block truncate text-[10px] text-gray-500">{l.name}</span>
                </button>
                <span className="shrink-0 max-w-[45%] truncate text-right text-[11px] font-semibold text-red">{shown(g)}{at >= 0 ? ' · ' + flat[at].label : ' · waiting'}</span>
                <button type="button" onClick={() => setPop({ lead: l, search: '' })} className="shrink-0 px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold">Move</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const popup = () => {
    if (!pop) return null;
    const close = () => setPop(null);
    const q = pop.search.trim().toLowerCase();
    const list = (pop.only ? notStarted : visible).filter((l) => !q || (contactName(l) + ' ' + (l.name || '') + ' ' + (l.email || '')).toLowerCase().includes(q));
    const lead = pop.lead;
    const at = lead ? positionOf(lead) : -1;
    const curStage = lead ? (waitingOf(lead) || (at >= 0 ? (groups.find((g) => g.items.some((e) => flat.indexOf(e) === at)) || { name: null }).name : null)) : null;
    const openStage = popOpen === undefined ? curStage : popOpen;
    const place = lead ? (at >= 0 ? flat[at].label : (waitingOf(lead) ? shown(waitingOf(lead) as string) + ' (waiting)' : 'Not started')) : '';
    let row = 0;
    return (
      <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={close}>
        <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden" onClick={(ev) => ev.stopPropagation()}>
          <div className="px-5 py-4 bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] text-white flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="text-base font-black">{lead ? 'Where should they go?' : 'Move a contact'}</div>
              <div className="text-[11px] text-blue-100 truncate">{lead ? contactName(lead) + ' · now at: ' + place : 'Pick the person first'}</div>
            </div>
            <button onClick={close} className="text-white/70 text-xl leading-none">×</button>
          </div>
          {!lead ? (
            <>
              <div className="px-4 py-3 border-b border-gray-100">
                <input
                  value={pop.search}
                  onChange={(ev) => setPop({ lead: null, search: ev.target.value, only: pop.only })}
                  placeholder="Search name, club, email"
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm"
                  autoFocus
                />
              </div>
              <div className="overflow-y-auto">
                {list.length === 0 && <p className="px-5 py-4 text-sm text-gray-400">No one found.</p>}
                {list.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => setPop({ lead: l, search: '' })}
                    className={`block w-full text-left px-5 py-2.5 text-[13px] font-semibold text-navy ${row++ % 2 ? 'bg-white' : 'bg-blue-100'}`}
                  >
                    {contactName(l)}
                    <span className="block text-[10px] font-normal text-gray-500">{positionOf(l) >= 0 ? 'At: ' + flat[positionOf(l)].label : (waitingOf(l) ? 'Waiting in ' + shown(waitingOf(l) as string) : 'Not started')}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                <button onClick={() => setPop({ lead: null, search: '', only: pop.only })} className="text-[12px] font-bold text-navy">← Pick someone else</button>
                <span className="flex items-center gap-3">
                  <button onClick={() => { hideContact(lead, true); close(); }} disabled={busy} className="text-[12px] font-bold text-red disabled:opacity-50">Hide from this page</button>
                  {deleteBtn(lead)}
                </span>
              </div>
              <div className="overflow-y-auto">
                {groups.filter((g) => g.items.length).map((g, gi) => (
                  <div key={g.name}>
                    <div
                      className={`flex items-center gap-2 pr-3 ${at < 0 && !waitingOf(lead) ? (gi % 2 ? 'py-1.5 bg-white cursor-pointer' : 'py-1.5 bg-blue-100 cursor-pointer') : 'bg-gray-100 cursor-pointer'}`}
                      onClick={at >= 0 || waitingOf(lead) ? () => setPopOpen(openStage === g.name ? null : g.name) : (!busy ? async () => { const ok = await call(`/leads/${lead.id}/mark-sent`, { labels: [stageMark(g.name)] }, 'Placed in ' + shown(g.name)); if (ok) { setStagePop(g.name); close(); } } : undefined)}
                    >
                      <div className={`flex-1 min-w-0 px-5 ${at < 0 && !waitingOf(lead) ? 'py-1.5 text-[13px] font-bold text-navy' : 'py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-gray-500'}`}>{at >= 0 || waitingOf(lead) ? (openStage === g.name ? '▾ ' : '▸ ') : ''}{shown(g.name)}</div>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={async (ev) => { ev.stopPropagation(); const ok = await call(`/leads/${lead.id}/mark-sent`, { labels: [stageMark(g.name)] }, 'Placed in ' + shown(g.name)); if (ok) { setStagePop(g.name); close(); } }}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold normal-case tracking-normal disabled:opacity-50"
                      >
                        Place in stage
                      </button>
                    </div>
                    {/* Someone not in the sequence yet is placed in a stage first; the emails show once they are in one. */}
                    {(at >= 0 || waitingOf(lead)) && openStage === g.name && g.items.map((e) => (
                      <div key={e.key} className={`flex items-center gap-2 pr-3 ${row++ % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                        <div className="flex-1 min-w-0 px-5 py-2.5 text-[13px] font-normal text-navy">
                          {e.label}
                          {positionOf(lead) === flat.indexOf(e) && <span className="ml-2 text-[10px] font-bold text-emerald-600">here now</span>}
                        </div>
                        <button
                          type="button"
                          disabled={busy}
                          onClick={async () => { const ok = await moveContactTo(lead, e); if (ok) close(); }}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50"
                        >
                          Move
                        </button>
                        <button
                          type="button"
                          disabled={busy || !lead.email}
                          onClick={() => openSend(lead, e)}
                          className="shrink-0 px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold disabled:opacity-40"
                        >
                          Send
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const rows = (g: { name: string; items: Email[] }) => {
    const nested = NESTED[g.name] || [];
    const nestedKeys = new Set(nested.flatMap((n) => n.keys));
    const main = g.items.filter((e) => !nestedKeys.has(e.key));
    // Up and down move an email past its neighbour in the list it is drawn in.
    const swapIn = (list: Email[], i: number, dir: -1 | 1) => {
      const other = list[i + dir];
      if (!other) return;
      const next = groups.map((x) => ({ name: x.name, items: [...x.items] }));
      const t = next.find((x) => x.name === g.name);
      if (!t) return;
      const a = t.items.findIndex((x) => x.key === list[i].key);
      const b = t.items.findIndex((x) => x.key === other.key);
      [t.items[a], t.items[b]] = [t.items[b], t.items[a]];
      saveLayout(next, deleted, 'Moved');
    };
    const emailRows = (list: Email[]) => list.map((e, i) => {
              const at = flat.indexOf(e);
              const people = visible.filter((l) => positionOf(l) === at);
              return (
                <div key={e.key} className={`px-4 py-2.5 ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-navy text-white text-[11px] font-black flex items-center justify-center">{i + 1}</span>
                    <span className="flex-1 min-w-0 text-[13px] font-normal text-navy">
                      {e.label}
                      {e.auto && <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">auto</span>}
                    </span>
                    <Menu id={'e' + e.key}>
                      <Item onClick={() => { const l = visible[0] || leads[0]; if (!l) { flash('Add a contact first, the preview is filled in with one.'); return; } openSend(l, e, true); }}>Preview</Item>
                      <Item onClick={() => swapIn(list, i, -1)}>Move up</Item>
                      <Item onClick={() => swapIn(list, i, 1)}>Move down</Item>
                      <Item danger onClick={() => deleteEmail(e)}>Delete</Item>
                    </Menu>
                    <button
                      type="button"
                      onClick={(ev) => { ev.stopPropagation(); setOpenEmail(openEmail && openEmail.key === e.key ? null : e); }}
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-white text-[11px] font-bold ${people.length ? 'bg-red' : 'bg-blue-600'}`}
                    >
                      Open ({people.length}) {openEmail && openEmail.key === e.key ? '▴' : '▾'}
                    </button>
                  </div>
                  {openEmail && openEmail.key === e.key && (
                    <div className="mt-2 ml-8 rounded-lg border border-blue-200 bg-white overflow-hidden">
                      {people.length === 0 && <p className="px-3 py-2 text-xs text-gray-400">No one is at this email yet.</p>}
                      {people.map((l, n) => (
                        <div key={l.id} className={`flex items-center gap-2 px-3 py-2 ${n % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                          <button type="button" onClick={() => setPop({ lead: l, search: '' })} className="flex-1 min-w-0 text-left text-[12px] font-semibold text-navy">
                            {contactName(l)}
                            <span className="block text-[10px] font-normal text-gray-500 truncate">{[l.name, l.email].filter(Boolean).join(' · ')}</span>
                          </button>
                          <button type="button" onClick={() => moveContactDown(l)} disabled={busy} className="shrink-0 px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">Move down ↓</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
    });
    return (
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {g.items.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">No emails here.</p>}
            {visible.filter((l) => waitingOf(l) === g.name).map((l) => (
              <div key={l.id} className="flex items-center gap-2 px-4 py-2 bg-red/10">
                <span className="flex-1 min-w-0 text-[13px] font-semibold text-navy">
                  <span className="block truncate">{contactName(l)}</span>
                  <span className="block truncate text-[10px] font-normal text-gray-500">{[l.name, l.email].filter(Boolean).join(' · ')}</span>
                </span>
                <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-red">Waiting for placement</span>
                <button type="button" onClick={() => setPop({ lead: l, search: '' })} className="shrink-0 px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold">Move</button>
                <button type="button" disabled={busy} onClick={() => hideContact(l, true)} className="shrink-0 px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold disabled:opacity-50">Hide</button>
                {deleteBtn(l)}
              </div>
            ))}
            {emailRows(main)}
            {nested.map((n) => {
              const list = g.items.filter((e) => n.keys.includes(e.key));
              if (!list.length) return null;
              const k = 'nested:' + g.name + ':' + n.title;
              const open = openGroups[k] === true;
              return (
                <div key={k}>
                  <button type="button" onClick={() => setOpenGroups((o) => ({ ...o, [k]: !open }))} className="flex w-full items-center gap-2 pl-8 pr-4 py-2.5 text-left bg-gray-50">
                    <span className="text-[10px] text-gray-400 w-3">{open ? '▾' : '▸'}</span>
                    <span className="flex-1 text-[13px] font-bold text-navy">{n.title}</span>
                    <span className="text-[11px] font-normal text-gray-400">{list.length} {list.length === 1 ? 'email' : 'emails'}</span>
                  </button>
                  {open && <div className="ml-4 border-l-2 border-blue-200 divide-y divide-gray-100">{emailRows(list)}</div>}
                </div>
              );
            })}
          </div>
    );
  };


  const groupBlock = (g: (typeof groups)[number], gi: number, sub: boolean) => {
          const isOpen = focus === g.name || openGroups[g.name] === true;
          return (
          <div key={g.name} className="border-b border-gray-100 last:border-0">
            <div className={`flex items-center gap-2 pr-3 ${gi % 2 ? 'bg-blue-100' : 'bg-white'}`}>
              <button
                type="button"
                onClick={() => setOpenGroups((o) => ({ ...o, [g.name]: !isOpen }))}
                className="flex-1 min-w-0 flex items-center gap-2 px-4 py-2.5 text-left"
              >
                <span className="text-[10px] text-gray-400 w-3">{isOpen ? '▾' : '▸'}</span>
                <span className="flex-1 text-[13px] font-bold text-navy">{shown(g.name)}{g.name === 'Getting the demo booked' ? ' (Auto)' : ''}</span>
                <span className="text-[11px] font-normal text-gray-400">{g.items.length} {g.items.length === 1 ? 'email' : 'emails'}</span>
              </button>
              <button
                type="button"
                onClick={() => setStagePop(focus === g.name ? null : g.name)}
                className={`shrink-0 px-2.5 py-1 rounded-lg text-white text-[11px] font-bold ${visible.some((l) => inStage(l, g)) ? 'bg-red' : 'bg-blue-600'}`}
              >
                {focus === g.name ? 'Show all' : 'View'}
              </button>
            </div>
            {isOpen && (
            rows(g)
            )}
          </div>
          );
  };

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="p-4 sm:p-6" onClick={() => setMenu(null)}>
      {detailId !== null && (() => {
        const dl = leads.find((x) => x.id === detailId);
        const at = dl ? positionOf(dl) : -1;
        const gname = dl ? (at >= 0 ? (groups.find((g) => g.items.some((e) => e.key === flat[at].key)) || { name: '' }).name : (waitingOf(dl) || '')) : '';
        return (
          <DemoPortal
            token={token}
            openOnly={detailId}
            onClose={() => { setDetailId(null); load(); }}
            extra={dl ? (
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">The sequence, for this lead</div>
                <div className="rounded-xl border border-gray-200 px-3 py-2.5 text-[13px] text-navy">
                  {gname ? (<><span className="font-bold">{shown(gname)}</span>{at >= 0 ? ' · ' + flat[at].label : ' · waiting'}</>) : 'Not started'}
                </div>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => { setDetailId(null); setPop({ lead: dl, search: '' }); }} className="px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold">Move</button>
                  {gname && <button type="button" onClick={() => { setDetailId(null); jumpTo(gname); }} className="px-3 py-1.5 rounded-lg border border-gray-200 text-[11px] font-bold text-navy">See this stage</button>}
                </div>
              </div>
            ) : null}
          />
        );
      })()}
      {popup()}
      {clientsPop && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setClientsPop(false)}>
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden" onClick={(ev) => ev.stopPropagation()}>
            <div className="px-5 py-4 bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] text-white flex items-start justify-between gap-3">
              <div className="text-base font-black">Clients</div>
              <button onClick={() => setClientsPop(false)} className="text-white/70 text-xl leading-none">×</button>
            </div>
            <button type="button" onClick={() => { setStagePop(NOT_STARTED); setClientsPop(false); }} className="flex w-full items-center gap-2 text-left px-5 py-3 text-[13px] font-bold text-navy bg-blue-100">
              <span className="flex-1">Not started</span>
              <span className="text-[11px] font-bold text-gray-500">{notStarted.length}</span>
            </button>
            <button type="button" onClick={() => { setStagePop(PEOPLE); setClientsPop(false); }} className="flex w-full items-center gap-2 text-left px-5 py-3 text-[13px] font-bold text-navy bg-white">
              <span className="flex-1">Started</span>
              <span className="text-[11px] font-bold text-gray-500">{visible.length - notStarted.length}</span>
            </button>
          </div>
        </div>
      )}
      {stagesPop && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setStagesPop(false)}>
          <div className="bg-white rounded-2xl w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden" onClick={(ev) => ev.stopPropagation()}>
            <div className="px-5 py-4 bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] text-white flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-base font-black">Stages</div>
                <div className="text-[11px] text-blue-100">Pick one to see just that stage</div>
              </div>
              <button onClick={() => setStagesPop(false)} className="text-white/70 text-xl leading-none">×</button>
            </div>
            <div className="overflow-y-auto">
              <button type="button" onClick={() => { setStagePop(null); setStagesPop(false); }} className="block w-full text-left px-5 py-3 text-[13px] font-bold text-white bg-red">All stages</button>
              {stages.filter((st) => inSeq(st.name)).map((st, i) => {
                const n = visible.filter((l) => st.subs.some((g) => inStage(l, g))).length;
                return (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => { setStagesPop(false); if (st.big) setPillPop(st.name); else setStagePop(st.name); }}
                    className={`flex w-full items-center gap-2 text-left px-5 py-2.5 text-[13px] font-normal text-navy ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}
                  >
                    <span className="flex-1 min-w-0">{i + 1}. {shown(st.name)}{st.big ? ' ▸' : ''}</span>
                    <span className={`shrink-0 text-[11px] font-bold ${n ? 'text-red' : 'text-gray-400'}`}>{n} {n === 1 ? 'person' : 'people'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {pillPop && (() => {
        const st = stages.find((x) => x.name === pillPop);
        if (!st) return null;
        const pick = (name: string | null) => { setStagePop(name); setPillPop(null); };
        return (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setPillPop(null)}>
            <div className="bg-white rounded-2xl w-full max-w-sm max-h-[85vh] flex flex-col overflow-hidden" onClick={(ev) => ev.stopPropagation()}>
              <div className="px-5 py-4 bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] text-white flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-base font-black">{shown(st.name)}</div>
                  <div className="text-[11px] text-blue-100">Show all of it, or just one section</div>
                </div>
                <button onClick={() => setPillPop(null)} className="text-white/70 text-xl leading-none">×</button>
              </div>
              <div className="overflow-y-auto">
                <button type="button" onClick={() => pick(st.name)} className="block w-full text-left px-5 py-3 text-[13px] font-bold text-white bg-red">All sections</button>
                {st.subs.map((g, i) => {
                  const n = visible.filter((l) => inStage(l, g)).length;
                  return (
                    <button key={g.name} type="button" onClick={() => pick(g.name)} className={`flex w-full items-center gap-2 text-left px-5 py-2.5 text-[13px] font-normal text-navy ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                      <span className="flex-1 min-w-0">{shown(g.name)}</span>
                      <span className={`shrink-0 text-[11px] font-bold ${n ? 'text-red' : 'text-gray-400'}`}>{n} {n === 1 ? 'person' : 'people'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
      {whoPop && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4" onClick={() => setWhoPop(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col overflow-hidden" onClick={(ev) => ev.stopPropagation()}>
            <div className="px-5 py-4 bg-gradient-to-br from-[#0f2642] to-[#1e3a5f] text-white flex items-start justify-between gap-3">
              <div className="text-base font-black">Who is where</div>
              <button onClick={() => setWhoPop(false)} className="text-white/70 text-xl leading-none">×</button>
            </div>
            <div className="overflow-y-auto">
              {(() => {
                let row = 0;
                const stages = groups
                  .map((g) => ({ name: shown(g.name), people: visible.filter((l) => inStage(l, g)) }))
                  .filter((st) => st.people.length > 0);
                return (
                  <>
                    <button
                      type="button"
                      onClick={() => { setWhoPop(false); setPop({ lead: null, search: '', only: true }); }}
                      className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-[13px] ${row++ % 2 ? 'bg-white' : 'bg-blue-100'}`}
                    >
                      <span className="font-bold text-red">Not started</span>
                      <span className="text-[11px] text-gray-500">{notStarted.length} people</span>
                    </button>
                    {stages.length === 0 && <p className="px-5 py-4 text-sm text-gray-400">No one has been moved into a stage yet.</p>}
                    {stages.map((st) => (
                      <div key={st.name}>
                        <div className={`flex items-center justify-between px-5 py-2.5 ${row++ % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                          <span className="text-[13px] font-bold text-navy">{st.name}</span>
                          <span className="text-[11px] text-gray-500">{st.people.length} {st.people.length === 1 ? 'person' : 'people'}</span>
                        </div>
                        {st.people.map((l) => (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => { setWhoPop(false); setPop({ lead: l, search: '' }); }}
                            className={`block w-full text-left pl-9 pr-5 py-2 text-[13px] font-normal text-navy ${row++ % 2 ? 'bg-white' : 'bg-blue-100'}`}
                          >
                            {contactName(l)}
                            <span className="block text-[10px] text-gray-500">At: {flat[positionOf(l)].label}</span>
                          </button>
                        ))}
                      </div>
                    ))}
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
      {sendAsk && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setSendAsk(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto" onClick={(ev) => ev.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{sendAsk.preview ? 'Preview, filled in for ' + contactName(sendAsk.lead) + '. Nothing is sent.' : 'To ' + sendAsk.lead.email}</div>
              {sendAsk.email.onboarding || sendAsk.preview ? (
                <div className="mt-1 px-2 py-1.5 text-sm font-semibold text-navy">{sendAsk.subject || sendAsk.email.label}</div>
              ) : (
                <input
                  value={sendAsk.subject}
                  onChange={(ev) => setSendAsk({ ...sendAsk, subject: ev.target.value })}
                  className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold"
                />
              )}
            </div>
            {sendAsk.loading ? (
              <div className="px-6 py-8 text-sm text-gray-400">Loading the email…</div>
            ) : (
              <iframe title="Email preview" srcDoc={previewDoc(sendAsk.html)} sandbox="" className="block w-full border-0 bg-white" style={{ height: '65vh' }} />
            )}
            <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2">
              <button onClick={() => setSendAsk(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">{sendAsk.preview ? 'Close' : 'Cancel'}</button>
              {!sendAsk.preview && <button onClick={() => sendNow(sendAsk.lead, sendAsk.email, sendAsk.subject)} disabled={busy || sendAsk.loading} className="px-4 py-2 rounded-lg bg-red text-white text-xs font-bold disabled:opacity-50">
                {busy ? 'Sending…' : 'Send'}
              </button>}
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-black text-navy">{mode === 'leads' ? '👥 Leads' : '📬 Coach Onboarding: ' + sequence}</h2>
        </div>
      </div>


      {note && <div className="mb-3 px-3 py-2 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">{note}</div>}
      {error && <div className="mb-3 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">{error}</div>}

      {showHidden && (
        <div className="mb-4 rounded-xl border border-gray-200 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Hidden contacts</div>
          {hidden.length === 0 && <p className="text-xs text-gray-400">None hidden.</p>}
          {hidden.map((l) => (
            <div key={l.id} className="flex items-center justify-between py-1">
              <span className="text-xs font-semibold text-navy">{contactName(l)}</span>
              <span className="flex gap-1.5">
                <button onClick={() => hideContact(l, false)} disabled={busy} className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">Add back</button>
                {deleteBtn(l)}
              </span>
            </div>
          ))}
        </div>
      )}

      {showDeleted && (
        <div className="mb-4 rounded-xl border border-gray-200 p-3">
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Deleted emails</div>
          {deleted.length === 0 && <p className="text-xs text-gray-400">None deleted.</p>}
          {deleted.map((e) => (
            <div key={e.key} className="flex items-center justify-between py-1">
              <span className="text-xs font-semibold text-navy">{e.label} <span className="text-gray-400 font-normal">· {shown(e.group)}</span></span>
              <button onClick={() => restoreEmail(e)} disabled={busy} className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">Restore</button>
            </div>
          ))}
        </div>
      )}

      {/* The whole sequence at a glance, in order. Tap one to see just that stage. Red means someone is in it. */}
      <div className="flex flex-wrap gap-1 mb-3">
        {mode === 'leads' && (
        <button
          type="button"
          onClick={() => setClientsPop(true)}
          className={`px-2 py-0.5 rounded-full text-[10px] leading-4 font-semibold text-navy bg-white border border-gray-300 ${focus === NOT_STARTED || focus === PEOPLE ? 'ring-2 ring-navy ring-offset-1' : ''}`}
        >
          Clients Not started ({notStarted.length}) ▾
        </button>
        )}
      </div>

      {mode === 'sequence' && focus && leadsSection()}
      {mode === 'sequence' && focus && sectionHead('Sequence', 'the emails in this stage', 'sequence')}
      <div className={mode === 'sequence' && focus ? (pageOpen.sequence ? 'border border-t-0 border-gray-200 rounded-b-xl overflow-visible' : 'hidden') : 'border border-gray-200 rounded-xl overflow-visible'}>
        {focus === PEOPLE && (
          <div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-gray-100">
              <span className="flex-1 text-[13px] font-bold text-navy">Started</span>
              <select
                value={startedStage}
                onChange={(ev) => setStartedStage(ev.target.value)}
                className="shrink-0 max-w-[45%] px-2 py-1 rounded-lg border border-gray-300 bg-white text-[11px] font-semibold text-navy"
              >
                <option value="">All stages</option>
                {stages.map((st) => {
                  const n = visible.filter((l) => { const g = stageOfPerson(l); return g && topOf(g) === st.name; }).length;
                  return <option key={st.name} value={st.name}>{shown(st.name)} ({n})</option>;
                })}
              </select>
              <span className="text-[11px] font-normal text-gray-400">{[...visible.filter((l) => positionOf(l) < 0 && waitingOf(l)), ...visible.filter((l) => positionOf(l) >= 0)].filter((l) => !startedStage || topOf(stageOfPerson(l) || '') === startedStage).length} contacts</span>
              <button type="button" onClick={() => setStagePop(null)} className="shrink-0 px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold">Show all</button>
            </div>
            {visible.length - notStarted.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">No one has been moved into the sequence yet.</p>}
            {[...visible.filter((l) => positionOf(l) < 0 && waitingOf(l)), ...visible.filter((l) => positionOf(l) >= 0)].filter((l) => !startedStage || topOf(stageOfPerson(l) || '') === startedStage).map((l, i) => {
              const at = positionOf(l);
              const stage = at >= 0 ? groups.find((g) => g.items.some((e) => e.key === flat[at].key)) : null;
              return (
                <div key={l.id} className={`flex items-center ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                <button
                  type="button"
                  onClick={() => setDetailId(l.id)}
                  className="flex flex-1 min-w-0 items-center gap-3 text-left px-4 py-2.5 text-[13px] font-normal text-navy"
                >
                  <span className="flex-1 min-w-0">
                    <span className="block truncate">{contactName(l)}</span>
                    <span className="block truncate text-[10px] text-gray-500">{l.name}</span>
                  </span>
                  <span
                    role="link"
                    onClick={(ev) => { const target = at >= 0 && stage ? stage.name : waitingOf(l); if (target) { ev.stopPropagation(); jumpTo(target); } }}
                    className={`shrink-0 max-w-[55%] text-right text-[11px] font-semibold underline decoration-dotted underline-offset-2 ${at >= 0 ? 'text-red' : 'text-gray-500'}`}
                  >
                    {at >= 0 && stage ? shown(stage.name) + ' · ' + flat[at].label : (waitingOf(l) ? shown(waitingOf(l) as string) + ' · waiting' : 'Waiting for placement')}
                  </span>
                </button>
                <span className="shrink-0 mr-3 flex gap-1.5">
                  <button type="button" onClick={() => setPop({ lead: l, search: '' })} className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold">Move</button>
                  <button type="button" disabled={busy} onClick={() => hideContact(l, true)} className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold disabled:opacity-50">Hide</button>
                  {deleteBtn(l)}
                </span>
                </div>
              );
            })}
          </div>
        )}
        {focus === NOT_STARTED && (
          <div>
            <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-gray-100">
              <span className="flex-1 text-[13px] font-bold text-red">Not started</span>
              <span className="text-[11px] font-normal text-gray-400">{notStarted.length} contacts</span>
              <button type="button" onClick={() => setStagePop(null)} className="shrink-0 px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold">Show all</button>
            </div>
            {notStarted.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">Everyone has been moved into the sequence.</p>}
            {notStarted.map((l, i) => (
              <div key={l.id} className={`flex items-center ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
                <button
                  type="button"
                  onClick={() => setDetailId(l.id)}
                  className="flex-1 min-w-0 block text-left px-4 py-2.5 text-[13px] font-normal text-navy"
                >
                  {contactName(l)}
                  <span className="block truncate text-[10px] text-gray-500">{l.name}</span>
                </button>
                <span className="shrink-0 mr-3 flex gap-1.5">
                  <button type="button" onClick={() => setPop({ lead: l, search: '' })} className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold">Move</button>
                  <button type="button" disabled={busy} onClick={() => hideContact(l, true)} className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold disabled:opacity-50">Hide</button>
                  {deleteBtn(l)}
                </span>
              </div>
            ))}
          </div>
        )}
        {focus !== NOT_STARTED && focus !== PEOPLE && stages
          .filter((st) => inSeq(st.name))
          .filter((st) => !focus || st.name === focus || st.subs.some((g) => g.name === focus))
          .map((st, si) => {
            if (!st.big) return groupBlock(st.subs[0], si, false);
            const only = st.name !== focus && st.subs.some((g) => g.name === focus);
            const people = visible.filter((l) => st.subs.some((g) => inStage(l, g))).length;
            const bigShown = focus === st.name || only || bigOpen[st.name] === true;
            return (
              <div key={st.name} className="border-b border-gray-100 last:border-0">
                {!only && (
                  <div className={`flex items-center gap-2 px-4 py-2.5 ${si % 2 ? 'bg-blue-100' : 'bg-white'}`}>
                    <button
                      type="button"
                      onClick={() => toggleBig(st.name, !bigShown)}
                      className="flex-1 min-w-0 flex items-center gap-2 text-left"
                    >
                      <span className="text-[10px] text-gray-400 w-3">{bigShown ? '▾' : '▸'}</span>
                      <span className="flex-1 text-[13px] font-bold text-navy">{shown(st.name)}</span>
                    </button>
                    <span className="text-[11px] font-normal text-gray-400">{st.subs.length} steps</span>
                    <button
                      type="button"
                      onClick={() => setStagePop(focus === st.name ? null : st.name)}
                      className={`shrink-0 px-2.5 py-1 rounded-lg text-white text-[11px] font-bold ${people ? 'bg-red' : 'bg-blue-600'}`}
                    >
                      {focus === st.name ? 'Show all' : 'View'}
                    </button>
                  </div>
                )}
                {bigShown && (
                  <div className={only ? '' : 'ml-4 border-l-2 border-blue-200'}>
                    {st.subs.filter((g) => !only || g.name === focus).map((g, gi) => groupBlock(g, gi, true))}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
