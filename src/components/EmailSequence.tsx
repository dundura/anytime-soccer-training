'use client';

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
  'Getting the demo booked': 'Demo Request',
  'Sending Roster Template': 'Yes - Send Roster',
  'After the demo': 'Paid Invoice',
  'Confirming with others FAQ': 'FAQ',
};
const shown = (g: string) => SHOWN[g] || g;
const RUN_ORDER = [
  'Before anything', 'Chasing a quiet lead', 'Getting the demo booked', 'Demo booked', 'After Demo Follow-up', 'No - Closing Out',
  'Sending Roster Template', 'Not the coach', 'Invoice', 'After the demo', 'First 3 weeks',
];
const END_ORDER = ['Renewal', 'Special offer', 'Confirming with others FAQ'];

const alreadySent = (label: string, sent: string[]) => {
  const l = label.toLowerCase();
  for (const raw of sent) {
    const s = raw.toLowerCase();
    if (s.includes(l) || l.includes(s.split(' →')[0].split(' sent')[0])) return true;
  }
  return false;
};

export default function EmailSequence({ token }: { token: string | null }) {
  const [emails, setEmails] = useState<Email[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [layout, setLayout] = useState<LayoutRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [showHidden, setShowHidden] = useState(false);
  const [showDeleted, setShowDeleted] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

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
      setEmails(d.emails || []);
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
      const g = (s && s.groupName) || e.group;
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
      if (g === 'Sending Roster Template') list.sort((x, y) => Number(y.key === 'afterDemo') - Number(x.key === 'afterDemo'));
    });
    const names = Array.from(byGroup.keys());
    const known = RUN_ORDER.filter((n) => names.includes(n));
    const end = END_ORDER.filter((n) => names.includes(n));
    const middle = names.filter((n) => !RUN_ORDER.includes(n) && !END_ORDER.includes(n));
    // A group with nothing in it still shows, so an email can be moved into it.
    const order = [...known, ...middle, ...end];
    return { groups: order.map((name) => ({ name, items: byGroup.get(name) || [] })), deleted: gone };
  }, [emails, layout]);

  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  // The furthest email in the sequence this contact has had, or -1 for none yet.
  const positionOf = useCallback((l: Lead) => {
    let at = -1;
    flat.forEach((e, i) => { if (alreadySent(e.label, l.sent)) at = i; });
    return at;
  }, [flat]);

  const visible = leads.filter((l) => !l.seqHiddenAt);
  const hidden = leads.filter((l) => l.seqHiddenAt);
  const notStarted = visible.filter((l) => positionOf(l) < 0);

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
    const next = groups.map((g) => ({ name: g.name, items: g.name === e.group ? [...g.items, e] : g.items }));
    saveLayout(next, deleted.filter((x) => x.key !== e.key), 'Restored');
  };

  // Moving to an email marks that one, and the ones before it in the same group, as done. Nothing is sent.
  const moveContactTo = (l: Lead, target: Email) => {
    const g = groups.find((x) => x.items.some((i) => i.key === target.key));
    if (!g) return;
    const upTo = g.items.slice(0, g.items.findIndex((i) => i.key === target.key) + 1);
    const labels = upTo.filter((e) => !alreadySent(e.label, l.sent)).map((e) => e.label);
    if (!labels.length) { flash('They are already past that email.'); setMenu(null); return; }
    call(`/leads/${l.id}/mark-sent`, { labels }, 'Moved to ' + target.label);
  };

  const moveContactDown = (l: Lead) => {
    const next = flat[positionOf(l) + 1];
    if (!next) { flash('They are at the last email.'); setMenu(null); return; }
    call(`/leads/${l.id}/mark-sent`, { labels: [next.label] }, 'Moved to ' + next.label);
  };

  const hideContact = (l: Lead, hide: boolean) =>
    call(`/leads/${l.id}/seq-hide`, { hidden: hide }, hide ? 'Hidden from this page' : 'Added back');

  const contactName = (l: Lead) => l.organization || l.name || l.email || 'Lead ' + l.id;

  const Menu = ({ id, children }: { id: string; children: ReactNode }) => (
    <div className="relative shrink-0">
      <button
        type="button"
        onClick={(ev) => { ev.stopPropagation(); setMenu(menu === id ? null : id); }}
        className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 text-[11px] font-bold hover:bg-gray-200"
      >
        Actions ▾
      </button>
      {menu === id && (
        <div className="absolute right-0 z-30 mt-1 min-w-[190px] rounded-xl border border-gray-200 bg-white shadow-lg py-1" onClick={(ev) => ev.stopPropagation()}>
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
    <div key={l.id} className="flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-100 pl-3 pr-1 py-0.5">
      <span className="text-[11px] font-bold text-navy truncate max-w-[180px]">{contactName(l)}</span>
      <Menu id={'c' + l.id}>
        <Item onClick={() => moveContactDown(l)}>Move down one email</Item>
        <div className="px-3 py-2 border-t border-gray-100">
          <label className="block text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-1">Move to…</label>
          <select
            defaultValue=""
            onChange={(ev) => { const e = flat.find((x) => x.key === ev.target.value); if (e) moveContactTo(l, e); }}
            className="w-full px-2 py-1.5 rounded-lg border border-gray-200 text-[11px]"
          >
            <option value="" disabled>Pick an email</option>
            {groups.filter((g) => g.items.length).map((g) => (
              <optgroup key={g.name} label={shown(g.name)}>
                {g.items.map((e) => <option key={e.key} value={e.key}>{e.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <Item onClick={() => hideContact(l, true)}>Hide from this page</Item>
      </Menu>
    </div>
  );

  if (loading) return <div className="p-6 text-sm text-gray-500">Loading…</div>;

  return (
    <div className="p-4 sm:p-6" onClick={() => setMenu(null)}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div>
          <h2 className="text-lg font-black text-navy">Email sequence</h2>
          <p className="text-[11px] text-gray-500">Moving a contact marks emails as done. It never sends anything.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowHidden((v) => !v)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold">
            Hidden contacts ({hidden.length})
          </button>
          <button onClick={() => setShowDeleted((v) => !v)} className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold">
            Deleted emails ({deleted.length})
          </button>
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
              <button onClick={() => hideContact(l, false)} disabled={busy} className="px-2.5 py-1 rounded-lg bg-navy text-white text-[11px] font-bold disabled:opacity-50">Add back</button>
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

      <div className="border border-gray-200 rounded-xl overflow-visible">
        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 rounded-t-xl">
          <div className="text-[11px] font-extrabold uppercase tracking-wide text-gray-500">Not started <span className="text-gray-400">({notStarted.length})</span></div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {notStarted.length === 0 && <span className="text-xs text-gray-400">Everyone has had at least one email.</span>}
            {notStarted.map(contactChip)}
          </div>
        </div>

        {groups.map((g) => {
          const open = openGroups[g.name] !== false;
          const here = visible.filter((l) => g.items.some((e) => flat.indexOf(e) === positionOf(l)));
          return (
            <div key={g.name} className="border-b border-gray-100 last:border-0">
              <button
                type="button"
                onClick={() => setOpenGroups((o) => ({ ...o, [g.name]: !open }))}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-gray-50"
              >
                <span className="text-[10px] text-gray-400 w-3">{open ? '▾' : '▸'}</span>
                <span className="flex-1 text-[12px] font-extrabold uppercase tracking-wide text-navy">{shown(g.name)}</span>
                <span className="text-[10px] font-bold text-gray-400">{here.length ? here.length + ' here · ' : ''}{g.items.length} emails</span>
              </button>
              {open && (
                <div className="divide-y divide-gray-100 border-t border-gray-100">
                  {g.items.length === 0 && <p className="px-4 py-3 text-xs text-gray-400">No emails here.</p>}
                  {g.items.map((e, i) => {
                    const at = flat.indexOf(e);
                    const people = visible.filter((l) => positionOf(l) === at);
                    return (
                      <div key={e.key} className={`px-4 py-2.5 ${i % 2 ? 'bg-blue-50/40' : 'bg-white'}`}>
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 shrink-0 rounded-full bg-navy text-white text-[11px] font-black flex items-center justify-center">{i + 1}</span>
                          <span className="flex-1 min-w-0 text-[13px] font-bold text-navy">
                            {e.label}
                            {e.auto && <span className="ml-1.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">auto</span>}
                          </span>
                          <Menu id={'e' + e.key}>
                            <Item onClick={() => moveEmail(g.name, i, -1)}>Move up</Item>
                            <Item onClick={() => moveEmail(g.name, i, 1)}>Move down</Item>
                            <Item danger onClick={() => deleteEmail(e)}>Delete</Item>
                          </Menu>
                        </div>
                        {people.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2 pl-8">{people.map(contactChip)}</div>}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
