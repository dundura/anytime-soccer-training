'use client';

import { Fragment, useEffect, useState } from 'react';

/**
 * The CRM.
 *
 * Every account and lead on the portal in one table, with a status set by hand.
 * It grew up inside the coach onboarding portal because that is where it was
 * first built, and it has nothing to do with a coach onboarding themselves — a
 * lead who has never opened the portal still belongs in this list.
 *
 * The three render blocks are the portal's, moved across unchanged. Their
 * `isAdmin && indexFilter === 'crm'` guards are kept and satisfied by the two
 * constants below rather than edited out: this file is 500 lines of dense JSX,
 * and rewriting the guards by hand is how a bracket goes missing.
 */

const API = 'https://api.anytime-soccer.com';
const TOKEN_KEY = 'astPortalToken';
const ADMIN_RETURN_KEY = 'astPortalAdminReturn';
const ADMIN_RETURN_WHO = 'astPortalAdminReturnWho';

type NotificationField = { key: string; label: string; required?: boolean };
type Notification = { key: string; n: number; subject: string; purpose: string; from: string; fields?: NotificationField[] | null };

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

// The day counter: the number that was typed, plus the days since it was typed.
//
// Nothing runs overnight to make this tick. Type 0 today and tomorrow the same
// stored row reads 1, because the subtraction is done when the page renders.
//
// Both ends are floored to midnight before subtracting, so a number set at 11pm
// reads 1 the next morning rather than only after a full 24 hours have run.
const crmDaysShown = (count: number | null, setAt: string | null) => {
  if (count === null || count === undefined) return null;
  if (!setAt) return count;
  const then = new Date(setAt);
  if (Number.isNaN(then.getTime())) return count;
  const midnight = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  const elapsed = Math.round((midnight(new Date()) - midnight(then)) / 86400000);
  return count + Math.max(0, elapsed);
};

export default function CrmAdmin({ token, stageName }: { token: string | null; stageName?: string }) {
  // Reaching this component at all means an admin session; the panel is only
  // rendered behind the console's own sign-in.
  const isAdmin = true;
  const indexFilter = 'crm';

  // The email list each row can send from. Fetched here rather than handed in,
  // so the panel does not depend on anything else having loaded it.
  const [emailSequence, setEmailSequence] = useState<Notification[]>([]);
  useEffect(() => {
    if (!token) return;
    fetch(`${API}/portal-onboarding/notifications`, {
      headers: {
        Authorization: token,
        'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
      },
    })
      .then((r) => r.json())
      .then((d) => {
        if (d?.notifications) setEmailSequence(d.notifications);
      })
      .catch(() => {
        /* the per-row send list is a convenience, not the point of the page */
      });
  }, [token]);

  // Admin-only: the CRM. Every account on the portal in one table, with a
  // status Neil sets by hand.
  //
  // The checklist already says how far through the steps a coach has clicked.
  // It cannot say whether they signed — a coach can finish every step and not
  // buy, or buy on a call before opening the portal — so the status is its own
  // field rather than something derived from progress.
  type CrmCoach = { id: number; coachId: number | null; name: string; club: string; phone: string; email: string; website: string; status: string; notes: string; stageId: number | null; createdAt: string | null; daysCount: number | null; daysSetAt: string | null };
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
  // Which row has its contact details open. Phone, email and website are three
  // more columns the table cannot afford — and on a lead most of them are empty
  // anyway, so they sit behind a + and open on the row being worked.
  const [crmOpenContact, setCrmOpenContact] = useState<number | null>(null);
  // Which row has its email list open, and which send is in flight. Sending
  // from here addresses the CRM row directly - before this, mailing a coach
  // meant signing into their account first.
  const [crmOpenEmail, setCrmOpenEmail] = useState<number | null>(null);
  const [crmSendingKey, setCrmSendingKey] = useState('');
  const [crmSentNote, setCrmSentNote] = useState('');
  const [crmStages, setCrmStages] = useState<CrmStage[]>([]);
  // null = All, the default view. A number is a stage id.
  // 'unstaged' | 'all' | a stage id.
  //
  // Defaults to unstaged, because the job this table is for is CLEARING the
  // queue: the rows that need a decision are the ones nobody has filed yet, and
  // "All" buries them under everything already dealt with.
  const [crmStageView, setCrmStageView] = useState<'unstaged' | 'all' | number>('unstaged');
  const [crmNewStage, setCrmNewStage] = useState('');
  const [crmAddingStage, setCrmAddingStage] = useState(false);
  const [crmConfirmStageDelete, setCrmConfirmStageDelete] = useState<number | null>(null);

  const adminHeaders = () => ({
    Authorization: token || '',
    'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
  });

  // Some emails carry their own inputs — #21 needs the parent sign-up link.
  // The row sent only the key, so the server rejected it with "Fill in: Parent
  // sign-up link" and there was nowhere to type it. Asking here is that box.
  const [askFields, setAskFields] = useState<
    { leadId: number; key: string; subject: string; fields: NotificationField[]; values: Record<string, string> } | null
  >(null);

  const sendCrmEmail = async (leadId: number, key: string, subject: string, values?: Record<string, string>) => {
    if (crmSendingKey) return;
    const notif = emailSequence.find(e => e.key === key);
    const needed = (notif?.fields || []).filter(f => f.required);
    if (needed.length && !values) {
      setAskFields({ leadId, key, subject, fields: notif?.fields || [], values: {} });
      return;
    }
    setAskFields(null);
    setCrmSendingKey(leadId + ':' + key);
    setCrmSentNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/notify-lead`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, key, ...(values || {}) }),
      });
      const data = await res.json().catch(() => ({}));
      // The server names what is missing ("Fill in: Parent sign-up link"). If
      // the field list did not reach the browser, that reply is the only thing
      // that knows — so open the panel from it rather than leaving a dead end.
      if (!res.ok && /^Fill in:/i.test(String(data.error || ''))) {
        const labels = String(data.error).replace(/^Fill in:\s*/i, '').split(',').map(x => x.trim()).filter(Boolean);
        const known = emailSequence.find(e => e.key === key)?.fields;
        setAskFields({
          leadId,
          key,
          subject,
          fields: known?.length
            ? known
            : labels.map(l => ({ key: l.toLowerCase().includes('link') ? 'teamLink' : l.toLowerCase().includes('code') ? 'teamCode' : 'teamName', label: l, required: true })),
          values: values || {},
        });
        setCrmSentNote('');
        return;
      }
      setCrmSentNote(res.ok ? 'Sent "' + subject + '" to ' + data.sentTo : (data.error || 'Could not send that email.'));
    } catch {
      setCrmSentNote('Could not send that email.');
    } finally {
      setCrmSendingKey('');
    }
  };

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
  const saveCrmField = async (id: number, field: 'status' | 'phone' | 'club' | 'name' | 'email' | 'website' | 'notes' | 'stageId' | 'days', value: string | number | null) => {
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
      if (crmStageView === id) setCrmStageView('unstaged');
      setCrmConfirmStageDelete(null);
    } catch {
      setCrmError('Could not delete that stage.');
    }
  };

  // Add a CRM row. Sends nothing unless the box is ticked -- tracking somebody
  // you are not ready to onboard is most of what this table is for.
  const [crmNew, setCrmNew] = useState({ name: '', email: '', club: '', phone: '', website: '' });
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
      setCrmNew({ name: '', email: '', club: '', phone: '', website: '' });
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

  // Set while the admin is looking at somebody else's portal. Read from
  // localStorage on mount rather than passed down, because getting there is a
  // full page load: the token has to be in place before anything fetches.
  const [viewingAs, setViewingAs] = useState('');
  useEffect(() => {
    try {
      if (localStorage.getItem(ADMIN_RETURN_KEY)) {
        setViewingAs(localStorage.getItem(ADMIN_RETURN_WHO) || 'another coach');
      }
    } catch { /* private mode: no banner, and no way in either */ }
  }, []);

  const returnToAdmin = () => {
    try {
      const mine = localStorage.getItem(ADMIN_RETURN_KEY);
      if (mine) localStorage.setItem(TOKEN_KEY, mine);
      localStorage.removeItem(ADMIN_RETURN_KEY);
      localStorage.removeItem(ADMIN_RETURN_WHO);
    } catch { /* nothing to restore */ }
    window.location.href = '/console?view=crm';
  };

  // Open a coach's own portal to see what they see.
  //
  // The admin's own token is kept under a second key first, so coming back is a
  // click rather than signing in again — without it, looking at one coach's
  // screen costs you your own session.
  const openTheirPortal = async (leadId: number, who: string) => {
    if (!token) return;
    setCrmSaving(leadId);
    setCrmError('');
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-impersonate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ leadId }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) {
        setCrmError(data.error || 'Could not open their portal.');
        return;
      }
      localStorage.setItem(ADMIN_RETURN_KEY, token);
      localStorage.setItem(ADMIN_RETURN_WHO, who || data.coach?.email || 'that coach');
      localStorage.setItem(TOKEN_KEY, data.token);
      window.location.href = '/onboarding-portal?view=steps';
    } catch {
      setCrmError('Could not open their portal.');
    } finally {
      setCrmSaving(null);
    }
  };
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

  // Opened as its own menu item, this panel is that one stage and nothing else.
  // The stage picker is hidden with it, because a view called Cold that can be
  // switched to something else is just the CRM with an extra name.
  useEffect(() => {
    if (!stageName || !crmStages.length) return;
    const match = crmStages.find((s) => s.name.toLowerCase() === stageName.toLowerCase());
    if (match) setCrmStageView(match.id);
  }, [stageName, crmStages]);

  const askPanel = askFields && (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4" onClick={() => setAskFields(null)}>
      <div className="bg-white rounded-lg w-full max-w-md p-4" onClick={ev => ev.stopPropagation()}>
        <p className="text-sm font-bold text-navy mb-1">{askFields.subject}</p>
        <p className="text-xs text-gray-500 mb-3">This email needs a little more before it can go.</p>
        {askFields.fields.map(f => (
          <input
            key={f.key}
            value={askFields.values[f.key] || ''}
            onChange={ev => setAskFields(a => (a ? { ...a, values: { ...a.values, [f.key]: ev.target.value } } : a))}
            placeholder={f.required ? `${f.label} (required)` : f.label}
            className="block w-full text-sm border border-gray-300 rounded px-2 py-1.5 mb-2 focus:outline-none focus:border-red"
          />
        ))}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => sendCrmEmail(askFields.leadId, askFields.key, askFields.subject, askFields.values)}
            disabled={askFields.fields.some(f => f.required && !(askFields.values[f.key] || '').trim())}
            className="text-[11px] font-bold uppercase tracking-wide px-4 py-1.5 rounded-full bg-red text-white hover:bg-red-dark disabled:opacity-40"
          >
            Send
          </button>
          <button onClick={() => setAskFields(null)} className="text-[11px] font-semibold text-gray-500 hover:underline">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-4">
      {askPanel}
      {viewingAs && (
        <div className="mb-4 rounded-lg bg-amber-100 border border-amber-300 px-4 py-2 text-xs font-semibold text-amber-900">
          Viewing {viewingAs}&rsquo;s portal.{' '}
          <button onClick={returnToAdmin} className="underline font-bold">
            Back to admin
          </button>
        </div>
      )}

                {isAdmin && indexFilter === 'crm' && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-4 mb-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-amber-700 mb-1">Add a record</p>
                    <p className="text-xs text-amber-800/80 mb-3">
                      A name, a club, or an email &mdash; whichever you have. A lead with no address yet is
                      exactly what this is for. Nothing is sent unless you tick the box.
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
                        placeholder="Email (if you have one)"
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
                      <input
                        value={crmNew.website}
                        onChange={ev => setCrmNew({ ...crmNew, website: ev.target.value })}
                        placeholder="Website"
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
                      disabled={crmAdding || !(crmNew.email.trim() || crmNew.name.trim() || crmNew.club.trim())}
                      className="bg-navy hover:bg-navy-light text-white font-bold py-2.5 px-6 rounded-xl transition-colors disabled:opacity-50"
                    >
                      {crmAdding ? 'Adding\u2026' : crmNewWelcome ? '+ Add record & send welcome' : '+ Add record'}
                    </button>
                    {crmAddResult && <p className="text-green-700 font-semibold text-sm mt-2">&#10003; {crmAddResult}</p>}
                  </div>
                )}

                {isAdmin && indexFilter === 'crm' && (
                  <p className="text-xs text-gray-500 mb-4 px-1">
                    {crmCoaches.length} on the portal{typeof crmStageView === 'number' ? `, ${crmCoaches.filter(c => c.stageId === crmStageView).length} in this stage` : crmStageView === 'unstaged' ? `, ${crmCoaches.filter(c => !c.stageId).length} still to stage` : ''}. Every text cell saves when you click away; status, stage and order save as soon as you change them.
                    Deleting removes the portal account &mdash; an unclaimed one stops being chased by the reminder emails, and a claimed one can sign up again on the same address.
                  </p>
                )}

      <div className="border border-gray-200 rounded-xl overflow-hidden">
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
                      <div className={`flex-wrap items-center gap-2 px-4 py-2 border-b border-gray-100 ${stageName ? 'hidden' : 'flex'}`}>
                        <label className="text-[10px] font-extrabold uppercase tracking-wide text-gray-500">View</label>
                        <select
                          value={typeof crmStageView === 'number' ? String(crmStageView) : crmStageView}
                          onChange={ev => {
                            const v = ev.target.value;
                            setCrmStageView(v === 'unstaged' || v === 'all' ? v : Number(v));
                            setCrmConfirmStageDelete(null);
                          }}
                          className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-bold text-navy bg-white max-w-[170px] focus:outline-none focus:ring-2 focus:ring-amber-300"
                        >
                          <option value="unstaged">Not staged ({crmCoaches.filter(c => !c.stageId).length})</option>
                          <option value="all">All ({crmCoaches.length})</option>
                          {crmStages.map(st => (
                            <option key={st.id} value={st.id}>
                              {st.name} ({crmCoaches.filter(c => c.stageId === st.id).length})
                            </option>
                          ))}
                        </select>

                        {typeof crmStageView === 'number' && (
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
                        const inStage =
                          crmStageView === 'all' ? crmCoaches
                          : crmStageView === 'unstaged' ? crmCoaches.filter(c => !c.stageId)
                          : crmCoaches.filter(c => c.stageId === crmStageView);
                        const shown = needle
                          ? inStage.filter(c => `${c.name} ${c.club} ${c.email}`.toLowerCase().includes(needle))
                          : inStage;
                        if (!shown.length) {
                          const stageName =
                            crmStageView === 'unstaged' ? 'the queue'
                            : crmStages.find(st => st.id === crmStageView)?.name;
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
                                  <th className="px-3 py-2 w-[20%]">Name</th>
                                  <th className="px-3 py-2 w-[18%]">Club</th>
                                  <th className="px-2 py-2 w-[5%] text-center">Contact</th>
                                  <th className="px-3 py-2 w-[14%]">Status</th>
                                  <th className="px-3 py-2 w-[16%]">Stage</th>
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
                                    {/* Phone, email and website behind one control.
                                        A lead usually has none of them — that is the
                                        point of it being a lead — so three mostly
                                        empty columns cost width the table needs for
                                        the things you actually scan. */}
                                    <td className="px-2 py-2 whitespace-nowrap text-center">
                                      <button
                                        onClick={() => setCrmOpenContact(open => (open === c.id ? null : c.id))}
                                        title={c.email || c.phone || c.website || 'Add contact details'}
                                        className={`inline-flex items-center gap-1 text-xs font-bold rounded-full border px-2 py-1 transition-colors ${
                                          crmOpenContact === c.id
                                            ? 'bg-navy text-white border-navy'
                                            : (c.email || c.phone || c.website)
                                              ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                              : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                                        }`}
                                      >
                                        {crmOpenContact === c.id ? '\u2212' : '+'}
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => { setCrmOpenEmail(open => (open === c.id ? null : c.id)); setCrmSentNote(''); }}
                                        title={c.email ? 'Email ' + c.email : 'No email address on this row'}
                                        disabled={!c.email}
                                        className={`ml-1 inline-flex items-center text-xs font-bold rounded-full border px-2 py-1 transition-colors ${
                                          crmOpenEmail === c.id
                                            ? 'bg-navy text-white border-navy'
                                            : c.email
                                              ? 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
                                              : 'bg-white text-gray-300 border-gray-100 cursor-not-allowed'
                                        }`}
                                      >
                                        &#9993;
                                      </button>
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
                                      {/* Only shown when the row has an account
                                          behind it. A button that explains it
                                          cannot work is worse than no button. */}
                                      {(c.coachId || c.email) && (
                                        <button
                                          onClick={() => openTheirPortal(c.id, c.name || c.email)}
                                          disabled={crmSaving === c.id}
                                          title={`Open ${c.name || c.email}'s portal`}
                                          className="text-gray-300 hover:text-navy text-sm leading-none px-1 mr-1 transition-colors"
                                        >
                                          &#128065;
                                        </button>
                                      )}
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
                                  {crmOpenContact === c.id && (
                                    <tr className="bg-blue-50/30">
                                      <td colSpan={9} className="px-3 pb-3 pt-0">
                                        <div className="grid gap-2 sm:grid-cols-3">
                                          <label className="block">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500 mb-1">Phone</span>
                                            <input
                                              defaultValue={c.phone}
                                              placeholder="&mdash;"
                                              onBlur={ev => { if (ev.target.value !== c.phone) saveCrmField(c.id, 'phone', ev.target.value); }}
                                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                          </label>
                                          <label className="block">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500 mb-1">Email</span>
                                            <input
                                              type="email"
                                              defaultValue={c.email}
                                              placeholder="none yet"
                                              onBlur={ev => { if (ev.target.value !== c.email) saveCrmField(c.id, 'email', ev.target.value); }}
                                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-red font-semibold placeholder:text-gray-300 placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                          </label>
                                          <label className="block">
                                            <span className="block text-[10px] font-extrabold uppercase tracking-wide text-gray-500 mb-1">Website</span>
                                            <input
                                              defaultValue={c.website}
                                              placeholder="&mdash;"
                                              onBlur={ev => { if (ev.target.value !== c.website) saveCrmField(c.id, 'website', ev.target.value); }}
                                              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                            />
                                          </label>
                                        </div>
                                        {c.website && (
                                          <a
                                            href={/^https?:\/\//i.test(c.website) ? c.website : `https://${c.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block mt-2 text-xs font-semibold text-red hover:underline"
                                          >
                                            Open {c.website} &rarr;
                                          </a>
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                  {crmOpenEmail === c.id && (
                                    <tr className="bg-gray-50">
                                      <td colSpan={9} className="px-3 pb-3 pt-0">
                                        <p className="text-[10px] font-extrabold uppercase tracking-wide text-gray-500 mb-2">
                                          Send to {c.name || c.email} &mdash; {c.email}
                                        </p>
                                        <div className="grid gap-1.5 sm:grid-cols-2">
                                          {emailSequence.map(e => (
                                            <button
                                              key={e.key}
                                              type="button"
                                              onClick={() => sendCrmEmail(c.id, e.key, e.subject)}
                                              disabled={!!crmSendingKey}
                                              className="text-left bg-white border border-gray-200 rounded-lg px-3 py-2 hover:border-navy disabled:opacity-50 transition-colors"
                                            >
                                              <span className="block text-xs font-bold text-navy">
                                                {crmSendingKey === c.id + ':' + e.key ? 'Sending...' : e.subject}
                                              </span>
                                              <span className="block text-[11px] text-gray-500">#{e.n} &middot; from {e.from}</span>
                                            </button>
                                          ))}
                                        </div>
                                        {crmSentNote && (
                                          <p className="text-[11px] font-semibold text-navy mt-2">{crmSentNote}</p>
                                        )}
                                      </td>
                                    </tr>
                                  )}
                                  {crmOpenNotes === c.id && (
                                    <tr className="bg-amber-50/40">
                                      <td colSpan={9} className="px-3 pb-3 pt-0">
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
    </div>
  );
}
