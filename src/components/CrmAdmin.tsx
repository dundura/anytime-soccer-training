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
type Notification = { key: string; n: number; subject: string; purpose: string; from: string; auto?: boolean; stage?: string; hidden?: boolean; fields?: NotificationField[] | null };

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
// The order a coach moves through them. Anything a stage does not claim falls
// to Other, so a new email is never silently invisible.
const STAGE_ORDER = [
  'Sending Roster Template',
  'Invoice',
  'Portal & account',
  'Players & parents',
  'Chasing a quiet coach',
  'Other',
];

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
  // Which row is open in the drawer.
  //
  // Contact details, the email sequence and the notes each used to expand as
  // their own sub-row under the table. Three separate toggles meant working a
  // lead was three clicks in three places, and none of them could show what had
  // already been sent. They are one drawer now, the same one the demo board
  // uses, so a lead is opened once and everything about it is in front of you.
  const [crmOpenLead, setCrmOpenLead] = useState<number | null>(null);
  const [crmSendingKey, setCrmSendingKey] = useState('');
  const [crmSentNote, setCrmSentNote] = useState('');

  // The lead's history, and the two boxes that write to it.
  type CrmActivity = { id: number; type: string; summary: string; body: string; occurredAt: string | null };
  const [crmActivity, setCrmActivity] = useState<CrmActivity[]>([]);
  const [crmActivityLoading, setCrmActivityLoading] = useState(false);
  const [crmCallDraft, setCrmCallDraft] = useState('');
  const [crmNoteDraft, setCrmNoteDraft] = useState('');
  const [crmLogging, setCrmLogging] = useState('');
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

  // Preview first, always -- the same rule the demo board follows. An email to
  // a coach is not something to send from a button whose contents you cannot
  // see, and these are sent by hand precisely because they are the ones that
  // have to be right.
  const [crmPreview, setCrmPreview] = useState<
    { leadId: number; key: string; subject: string; html: string; to: string; toName: string; sample?: boolean } | null
  >(null);

  // Whether the sequence panel is open. Closed by default -- it is reference,
  // and the table is what the page is for.
  const [showSequence, setShowSequence] = useState(false);
  // One stage open at a time, and none to begin with.
  const [openStage, setOpenStage] = useState<string | null>(null);
  // And which stage is open inside a lead's drawer, tracked separately so
  // opening one does not move the other.
  const [openLeadStage, setOpenLeadStage] = useState<string | null>(null);

  // Preview from the sequence panel, where no coach is open. Rendered against
  // the first row on the board, the same way the demo board does it: reading
  // the wording against a real coach is the point, and against a blank it just
  // says "Hi there" and tells you nothing.
  const previewSequence = async (key: string, subject: string) => {
    const first = crmCoaches[0];
    if (!first) { setCrmSentNote('Add a coach first — the samples are rendered against a real record.'); return; }
    await openCrmPreview(first.id, key, subject, first.name || first.email, true);
  };

  // Send one email from the sequence to Neil's own inbox. A preview pane is not
  // an email client -- spacing, buttons and call-outs only tell the truth once
  // they are rendered by the thing that will actually render them. Goes to Neil
  // and nobody else, whatever the row it was pressed on.
  const sendSample = async (key: string, subject: string) => {
    if (crmSendingKey) return;
    setCrmSendingKey('sample:' + key);
    setCrmSentNote('');
    try {
      const res = await fetch(`${API}/portal-onboarding/notify-sample`, {
        method: 'POST',
        headers: { ...adminHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      });
      const d = await res.json().catch(() => ({}));
      setCrmSentNote(res.ok ? 'Sample of "' + subject + '" sent to ' + d.sentTo : (d.error || 'Could not send that sample.'));
    } catch {
      setCrmSentNote('Could not send that sample.');
    } finally {
      setCrmSendingKey('');
    }
  };

  const openCrmPreview = async (leadId: number, key: string, subject: string, toName: string, sample = false) => {
    if (crmSendingKey) return;
    setCrmSendingKey(leadId + ':' + key);
    setCrmSentNote('');
    try {
      const res = await fetch(
        `${API}/portal-onboarding/notification-preview-lead?key=${encodeURIComponent(key)}&leadId=${leadId}`,
        { headers: adminHeaders() },
      );
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not build that email.');
      setCrmPreview({ leadId, key, subject: d.subject || subject, html: d.html || '', to: d.to || '', toName, sample });
    } catch (e) {
      setCrmSentNote(e instanceof Error ? e.message : 'Could not build that email.');
    } finally {
      setCrmSendingKey('');
    }
  };

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
      // Only on success: a failed send has to leave the preview open, or the
      // wording that failed disappears along with the chance to fix it.
      if (res.ok) {
        setCrmPreview(null);
        // The server writes the send onto the timeline; re-reading it is what
        // ticks the step in the sequence list behind the drawer.
        if (crmOpenLead === leadId) await refreshCrmActivity(leadId);
      }
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

  // Open a lead in the drawer and read its history.
  //
  // Fetched per lead rather than with the table: forty timelines to render
  // eight rows is a lot of bytes for something only ever read one at a time.
  const openCrmLead = async (id: number) => {
    setCrmOpenLead(id);
    setCrmSentNote('');
    setCrmCallDraft('');
    setCrmNoteDraft('');
    setCrmActivity([]);
    if (!token) return;
    setCrmActivityLoading(true);
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach-activity?leadId=${id}`, { headers: adminHeaders() });
      const d = await res.json().catch(() => ({}));
      if (res.ok) setCrmActivity(d.activities || []);
    } catch {
      /* a history that will not load is not a reason to shut the drawer */
    } finally {
      setCrmActivityLoading(false);
    }
  };

  // Re-read the open lead's history. Called after anything that writes to it,
  // so the timeline and the ticks beside the sequence can never disagree with
  // what the server actually recorded.
  const refreshCrmActivity = async (id: number) => {
    if (!token) return;
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach-activity?leadId=${id}`, { headers: adminHeaders() });
      const d = await res.json().catch(() => ({}));
      if (res.ok) setCrmActivity(d.activities || []);
    } catch { /* leave what is on screen */ }
  };

  const logCrmEntry = async (id: number, type: 'call' | 'note', body: string, outcome?: string) => {
    if (!token || crmLogging) return;
    setCrmLogging(type);
    try {
      const res = await fetch(`${API}/portal-onboarding/admin-coach-activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...adminHeaders() },
        body: JSON.stringify({ leadId: id, type, body, outcome }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) { setCrmSentNote(d.error || 'Could not save that.'); return; }
      if (type === 'call') setCrmCallDraft('');
      if (type === 'note') setCrmNoteDraft('');
      await refreshCrmActivity(id);
    } catch {
      setCrmSentNote('Could not save that.');
    } finally {
      setCrmLogging('');
    }
  };

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

  // Same shape as the demo board's preview: the email as the coach will see
  // it, an editable subject line above it, and Send only from in here.
  const previewPanel = crmPreview && (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4" onClick={() => setCrmPreview(null)}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto" onClick={ev => ev.stopPropagation()}>
        <div className="px-5 py-4 border-b border-gray-100">
          {/* A preview opened from the sequence panel has no recipient -- it is
              rendered against whoever happens to be first on the board so the
              wording can be read against a real record. Saying "To Colton" over
              a sample is how somebody emails the wrong coach. */}
          <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400">
            {crmPreview.sample
              ? <>Sample, rendered against {crmPreview.toName}</>
              : <>To {crmPreview.toName} &mdash; {crmPreview.to}</>}
          </div>
          <input
            value={crmPreview.subject}
            onChange={ev => setCrmPreview(pv => (pv ? { ...pv, subject: ev.target.value } : pv))}
            className="w-full mt-1 px-2 py-1.5 rounded-lg border border-gray-200 text-sm font-semibold text-navy"
          />
        </div>
        {/* The email's own HTML. Rendered rather than described: the point of a
            preview is to see what lands, not a summary of it. */}
        {/* Scrolls sideways inside itself rather than stretching the modal.
            These emails carry fixed-width banners and tables, so without this
            the right edge is simply cut off. */}
        <div className="px-5 py-4 text-sm overflow-x-auto" dangerouslySetInnerHTML={{ __html: crmPreview.html }} />
        <div className="px-5 py-4 border-t border-gray-100 flex justify-end gap-2 sticky bottom-0 bg-white">
          <button onClick={() => setCrmPreview(null)} className="px-3 py-2 rounded-lg border border-gray-200 text-xs font-bold text-gray-600">
            {crmPreview.sample ? 'Close' : 'Cancel'}
          </button>
          {/* No Send on a sample. The recipient is an accident of sort order,
              not a choice, so the button that mails them does not belong here.
              Send lives on the coach's own row, where you picked them. */}
          {!crmPreview.sample && (
            <button
              onClick={() => sendCrmEmail(crmPreview.leadId, crmPreview.key, crmPreview.subject)}
              disabled={!!crmSendingKey}
              className="px-4 py-2 rounded-lg bg-red text-white text-xs font-bold disabled:opacity-50"
            >
              {crmSendingKey ? 'Sending...' : 'Send'}
            </button>
          )}
        </div>
        {crmSentNote && <p className="px-5 pb-4 text-[11px] font-semibold text-navy">{crmSentNote}</p>}
      </div>
    </div>
  );

  // The lead drawer.
  //
  // Everything about one lead in one place, the same shape the demo board uses:
  // who they are at the top, the sequence with a tick against what has already
  // gone, and the history underneath. Sits at z-50 so the email preview, at
  // z-[60], still opens over it.
  const openLead = crmOpenLead === null ? null : crmCoaches.find(c => c.id === crmOpenLead) || null;

  // A step counts as sent when the timeline holds an email under that
  // template's own subject. The preview lets the subject be edited before
  // sending, which is why the server logs the template's line and not the one
  // that actually went out.
  const sentSubjects = new Set(crmActivity.filter(a => a.type === 'email_sent').map(a => a.summary));

  const ACTIVITY_ICON: Record<string, string> = {
    email_sent: '✉️',
    call: '📞',
    note: '📝',
    stage_changed: '➡️',
  };
  const activityWhen = (v: string | null) => {
    if (!v) return '';
    const d = new Date(v);
    if (Number.isNaN(d.getTime())) return '';
    return d.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
  };

  const leadDrawer = openLead && (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setCrmOpenLead(null)}>
      <div className="bg-white w-full max-w-lg h-full overflow-y-auto" onClick={ev => ev.stopPropagation()}>
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-5 py-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-base font-black text-navy truncate">
              {openLead.club || openLead.name || openLead.email || 'Lead'}
            </div>
            <div className="text-[11px] text-gray-500 truncate">
              {[openLead.name, openLead.email, openLead.phone].filter(Boolean).join(' · ') || 'No contact details yet'}
            </div>
          </div>
          <button onClick={() => setCrmOpenLead(null)} className="text-gray-400 text-xl leading-none shrink-0">&times;</button>
        </div>

        <div className="px-5 py-4 space-y-5">
          {/* Status */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Status</div>
            <div className="flex flex-wrap gap-1.5">
              {(crmStatuses.length ? crmStatuses : Object.keys(CRM_STATUS_LABEL)).map(st => (
                <button
                  key={st}
                  onClick={() => saveCrmField(openLead.id, 'status', st)}
                  disabled={crmSaving === openLead.id}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold border disabled:opacity-50 ${
                    openLead.status === st ? CRM_STATUS_CLASS[st] || 'bg-navy text-white border-navy' : 'bg-gray-100 text-gray-600 border-gray-200'
                  }`}
                >
                  {crmLabel(st)}
                </button>
              ))}
            </div>
          </div>

          {/* Stage. Setting one here is what moves the row into that filtered
              view - there is no separate "move to stage" action. */}
          {crmStages.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Stage</div>
              <div className="flex flex-wrap gap-1.5">
                {crmStages.map(st => (
                  <button
                    key={st.id}
                    onClick={() => saveCrmField(openLead.id, 'stageId', openLead.stageId === st.id ? null : st.id)}
                    disabled={crmSaving === openLead.id}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold border disabled:opacity-50 ${
                      openLead.stageId === st.id ? 'bg-navy text-white border-navy' : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    {st.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* The facts, editable in place. Each saves on blur, not on every
              keystroke: a PUT per character races itself and the last response
              back wins rather than the last thing typed. */}
          <div className="grid grid-cols-2 gap-2" key={`lead-${openLead.id}-${crmNonce}`}>
            {([['club', 'Club'], ['name', 'Contact'], ['email', 'Email'], ['phone', 'Phone'], ['website', 'Website']] as const).map(([f, label]) => (
              <label key={f} className="block">
                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">{label}</span>
                <input
                  defaultValue={openLead[f] || ''}
                  placeholder={f === 'email' ? 'none yet' : '—'}
                  onBlur={ev => { if (ev.target.value !== (openLead[f] || '')) saveCrmField(openLead.id, f, ev.target.value); }}
                  className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </label>
            ))}
            <label className="block">
              <span className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Days</span>
              <input
                defaultValue={crmDaysShown(openLead.daysCount, openLead.daysSetAt) ?? ''}
                placeholder="—"
                onBlur={ev => saveCrmField(openLead.id, 'days', ev.target.value.trim() === '' ? null : ev.target.value)}
                className="w-full mt-0.5 px-2 py-1.5 rounded-lg border border-gray-200 text-xs text-navy placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </label>
          </div>

          {openLead.website && (
            <a
              href={/^https?:\/\//i.test(openLead.website) ? openLead.website : `https://${openLead.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-semibold text-red hover:underline"
            >
              Open {openLead.website} &rarr;
            </a>
          )}

          {/* The sequence */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">The sequence, for this lead</div>
            {!openLead.email && (
              <p className="text-[11px] text-gray-500 mb-2">No email address on this row, so nothing can be sent yet.</p>
            )}
            {/* The same stages as the reference panel, so the list you send
                from and the list you plan from are the same list. Hidden
                emails are filtered here too -- they still exist and still
                send, but an email that is out of the way should not be one
                click from going out. */}
            <div className="space-y-2">
              {STAGE_ORDER.map(stage => {
                const inStage = emailSequence.filter(e => (e.stage || 'Other') === stage && !e.hidden);
                if (!inStage.length) return null;
                const doneCount = inStage.filter(e => sentSubjects.has(e.subject)).length;
                const isOpen = openLeadStage === stage;
                return (
                  <div key={stage} className="rounded-lg border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setOpenLeadStage(isOpen ? null : stage)}
                      className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left hover:bg-gray-50"
                    >
                      <span className="text-[10px] text-gray-400">{isOpen ? '▾' : '▸'}</span>
                      <span className="flex-1 text-[11px] font-bold text-navy">{stage}</span>
                      <span className={`text-[10px] font-bold ${doneCount === inStage.length ? 'text-emerald-600' : 'text-gray-400'}`}>
                        {doneCount}/{inStage.length}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="space-y-1 border-t border-gray-100 px-2.5 py-2">
                        {inStage.map(e => {
                          const done = sentSubjects.has(e.subject);
                          return (
                            <div key={e.key} className="flex items-center gap-2">
                              <span className={`w-4 text-center text-[11px] ${done ? 'text-emerald-600' : 'text-gray-300'}`}>
                                {done ? '✓' : '○'}
                              </span>
                              <span className={`flex-1 text-[11px] ${done ? 'text-gray-400 line-through' : 'text-navy font-semibold'}`}>
                                {e.n}. {e.subject}
                                {e.auto && <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">auto</span>}
                              </span>
                              <button
                                onClick={() => openCrmPreview(openLead.id, e.key, e.subject, openLead.name || openLead.email)}
                                disabled={!!crmSendingKey || !openLead.email}
                                className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-[10px] font-bold hover:bg-gray-200 disabled:opacity-40 shrink-0"
                              >
                                {crmSendingKey === openLead.id + ':' + e.key ? '…' : done ? 'Send again' : 'Send'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {crmSentNote && <p className="text-[11px] font-semibold text-navy mt-2">{crmSentNote}</p>}
          </div>

          {/* Log a call */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Log a call</div>
            <input
              value={crmCallDraft}
              onChange={ev => setCrmCallDraft(ev.target.value)}
              placeholder="What happened?"
              className="w-full mb-2 px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <div className="flex gap-1.5">
              {['Spoke', 'No answer', 'Left voicemail'].map(o => (
                <button
                  key={o}
                  onClick={() => logCrmEntry(openLead.id, 'call', crmCallDraft, o)}
                  disabled={crmLogging === 'call'}
                  className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold disabled:opacity-50"
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Add a note - dated, onto the history. */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Add a note</div>
            <textarea
              value={crmNoteDraft}
              onChange={ev => setCrmNoteDraft(ev.target.value)}
              rows={2}
              className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
            <button
              onClick={() => logCrmEntry(openLead.id, 'note', crmNoteDraft)}
              disabled={!crmNoteDraft.trim() || crmLogging === 'note'}
              className="mt-1 px-3 py-1.5 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-40"
            >
              Save note
            </button>
          </div>

          {/* The row's own notes column. Not the same thing as the dated notes
              above: this is the running scratchpad that was on every row before
              there was a history, and it still holds what was written there.
              Kept editable so none of it is stranded. */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">Working notes</div>
            <textarea
              key={`notes-${openLead.id}-${crmNonce}`}
              defaultValue={openLead.notes}
              rows={4}
              placeholder="Calls, what they asked for, what to do next…"
              onBlur={ev => { if (ev.target.value !== openLead.notes) saveCrmField(openLead.id, 'notes', ev.target.value); }}
              className="w-full bg-white border border-amber-200 rounded-lg px-3 py-2 text-xs text-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-300 resize-y"
            />
            <p className="text-[11px] text-gray-500 mt-1">Saves when you click away.</p>
          </div>

          {/* History */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">History</div>
            {crmActivityLoading && <div className="text-xs text-gray-400">Loading&hellip;</div>}
            {!crmActivityLoading && crmActivity.length === 0 && (
              <div className="text-xs text-gray-400">Nothing yet.</div>
            )}
            <div className="space-y-2">
              {crmActivity.map(a => (
                <div key={a.id} className="flex gap-2">
                  <span className="text-sm leading-5">{ACTIVITY_ICON[a.type] || '•'}</span>
                  <div className="min-w-0">
                    <div className="text-xs text-navy font-semibold break-words">{a.summary}</div>
                    {a.body && a.body !== a.summary && (
                      <div className="text-[11px] text-gray-500 whitespace-pre-wrap break-words">{a.body}</div>
                    )}
                    <div className="text-[10px] text-gray-400">{activityWhen(a.occurredAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
            {(openLead.coachId || openLead.email) && (
              <button
                onClick={() => openTheirPortal(openLead.id, openLead.name || openLead.email)}
                disabled={crmSaving === openLead.id}
                className="text-[11px] font-bold text-gray-500 hover:text-navy"
              >
                Open their portal
              </button>
            )}
            {crmConfirmDelete === openLead.id ? (
              <span className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-gray-600">Delete this lead?</span>
                <button
                  onClick={() => { deleteCrmCoach(openLead.id); setCrmOpenLead(null); }}
                  className="px-2.5 py-1 rounded-lg bg-red text-white text-[11px] font-bold"
                >
                  Delete
                </button>
                <button onClick={() => setCrmConfirmDelete(null)} className="px-2.5 py-1 rounded-lg border border-gray-200 text-[11px] font-bold text-gray-600">
                  Keep
                </button>
              </span>
            ) : (
              <button onClick={() => setCrmConfirmDelete(openLead.id)} className="ml-auto text-[11px] font-bold text-gray-400 hover:text-red">
                Delete lead
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="px-4 py-4">
      {askPanel}
      {leadDrawer}
      {previewPanel}
      {viewingAs && (
        <div className="mb-4 rounded-lg bg-amber-100 border border-amber-300 px-4 py-2 text-xs font-semibold text-amber-900">
          Viewing {viewingAs}&rsquo;s portal.{' '}
          <button onClick={returnToAdmin} className="underline font-bold">
            Back to admin
          </button>
        </div>
      )}

                {/* The sequence, laid out the way the demo board lays its own
                    out. The per-row list further down is for sending; this is
                    for reading -- what exists, in what order, who it comes
                    from, and which two send themselves. */}
                {isAdmin && indexFilter === 'crm' && emailSequence.length > 0 && (
                  <div className="border border-gray-200 rounded-xl bg-white mb-4 overflow-hidden">
                    <button
                      onClick={() => setShowSequence(v => !v)}
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                    >
                      <span className="text-xs font-bold uppercase tracking-wide text-navy">
                        &#9993;&#65039; The email sequence{' '}
                        <span className="text-gray-400 font-semibold normal-case tracking-normal">({emailSequence.length} emails)</span>
                      </span>
                      <span className="text-gray-400 text-xs">{showSequence ? '▴' : '▾'}</span>
                    </button>
                    {showSequence && (
                      <div className="border-t border-gray-100">
                        {/* Grouped by stage, collapsed by default. Thirty-one
                            emails in one list is a wall, and the job is always
                            one stage at a time -- so that is what opens. A
                            hidden email still exists and still sends; it is
                            only out of the way while a stage is worked. */}
                        {STAGE_ORDER.map(stage => {
                          const inStage = emailSequence.filter(e => (e.stage || 'Other') === stage && !e.hidden);
                          if (!inStage.length) return null;
                          const isOpen = openStage === stage;
                          return (
                            <div key={stage} className="border-b border-gray-100 last:border-0">
                              <button
                                type="button"
                                onClick={() => setOpenStage(isOpen ? null : stage)}
                                className="flex w-full items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50"
                              >
                                <span className="text-[11px] text-gray-400">{isOpen ? '▾' : '▸'}</span>
                                <span className="text-sm font-extrabold text-navy">{stage}</span>
                                <span className="text-[11px] font-bold text-gray-400">{inStage.length}</span>
                              </button>
                              {isOpen && (
                                <div className="border-t border-gray-100 divide-y divide-gray-100">
                                  {inStage.map(e => (
                                    <div key={e.key} className="flex gap-3 px-4 py-3">
                                      <span className="w-6 h-6 shrink-0 rounded-full bg-navy text-white text-[11px] font-black flex items-center justify-center">{e.n}</span>
                                      <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                          <span className="text-sm font-bold text-navy">{e.subject}</span>
                                          {e.from && <span className="px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-bold">{e.from}</span>}
                                          {e.auto
                                            ? <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">Automatic</span>
                                            : <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">You send it</span>}
                                        </div>
                                      </div>
                                      <div className="shrink-0 self-start flex gap-1.5">
                                        <button
                                          onClick={() => previewSequence(e.key, e.subject)}
                                          disabled={!!crmSendingKey}
                                          className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold hover:bg-gray-200 disabled:opacity-50"
                                        >
                                          Preview
                                        </button>
                                        <button
                                          onClick={() => sendSample(e.key, e.subject)}
                                          disabled={!!crmSendingKey}
                                          title="Send this one to your own inbox"
                                          className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold hover:opacity-90 disabled:opacity-50"
                                        >
                                          {crmSendingKey === 'sample:' + e.key ? 'Sending…' : 'Send sample'}
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                        <div className="px-4 py-3 bg-gray-50 text-[11px] text-gray-500">
                          The automatic ones send themselves. The rest are yours to send from a coach&rsquo;s row, and nothing goes out until you have seen the preview.
                        </div>
                      </div>
                    )}
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
                                    {/* One control, and it opens everything.
                                        Contact details, the sequence, the calls
                                        and the notes all live in the drawer now,
                                        so the table keeps the width it needs for
                                        the columns you actually scan. */}
                                    <td className="px-2 py-2 whitespace-nowrap text-center">
                                      <button
                                        onClick={() => openCrmLead(c.id)}
                                        title={`Open ${c.name || c.club || c.email || 'this lead'}`}
                                        className={`inline-flex items-center text-xs font-bold rounded-full border px-2.5 py-1 transition-colors ${
                                          c.email || c.phone || c.website || c.notes
                                            ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                                        }`}
                                      >
                                        Open
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
                                    {/* The pip, not the notes. A column wide
                                        enough to hold a written-up call would
                                        squeeze every other column flat. This
                                        says whether a row has notes; reading
                                        them is what the drawer is for. */}
                                    <td className="px-3 py-2 whitespace-nowrap text-center">
                                      <button
                                        onClick={() => openCrmLead(c.id)}
                                        title={c.notes ? 'Notes' : 'Add a note'}
                                        className={`inline-flex items-center text-xs font-bold rounded-full border px-2 py-1 transition-colors ${
                                          c.notes
                                            ? 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
                                            : 'bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:text-gray-600'
                                        }`}
                                      >
                                        <span>{c.notes ? '•' : '+'}</span>
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
