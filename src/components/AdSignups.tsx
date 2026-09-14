'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Who signed up from a paid ad, and what they did next.
 *
 * Ads Manager says what an ad cost and how many leads the pixel saw. It cannot
 * say whether those people went on to make an account or pay, which is the
 * part that decides whether an ad is worth running again. This joins the two.
 */

const API = 'https://api.anytime-soccer.com';

type Campaign = { source: string; campaign: string; signups: number; accounts: number; paid: number };
type Day = { day: string; signups: number };
type Person = {
  email: string;
  name: string;
  sequence: string;
  signedUpAt: string;
  page: string;
  source: string;
  campaign: string;
  madeAccount: boolean;
  paid: boolean;
  alreadyMember: boolean;
};
type Report = {
  days: number;
  totals: { signups: number; accounts: number; paid: number };
  campaigns: Campaign[];
  daily: Day[];
  people: Person[];
};

const RANGES = [7, 30, 90];

const when = (v: string) =>
  new Date(v).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

const pct = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : '—');

export default function AdSignups({ token }: { token: string | null }) {
  const [days, setDays] = useState(30);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const headers = useCallback(
    () => ({
      Authorization: token || '',
      'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
    }),
    [token],
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API}/newsletters/ad-signups?days=${days}`, { headers: headers() });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || 'Could not load ad signups.');
      setReport(d);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not load ad signups.');
    } finally {
      setLoading(false);
    }
  }, [days, headers]);

  useEffect(() => {
    load();
  }, [load]);

  const t = report?.totals;
  const peak = Math.max(1, ...(report?.daily || []).map((d) => d.signups));

  return (
    <div className="px-4 py-4">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-extrabold text-navy">Ad signups</h2>
        <div className="flex overflow-hidden rounded-full border border-gray-200">
          {RANGES.map((r) => (
            <button
              key={r}
              onClick={() => setDays(r)}
              className={`px-3 py-1 text-xs font-bold ${days === r ? 'bg-navy text-white' : 'bg-white text-gray-600'}`}
            >
              {r} days
            </button>
          ))}
        </div>
        <button onClick={load} className="text-xs font-bold text-gray-500 hover:text-navy">Refresh</button>
      </div>

      {error && <p className="mb-3 text-sm font-semibold text-red">{error}</p>}
      {loading && !report && <p className="text-sm text-gray-400">Loading&hellip;</p>}

      {t && (
        <>
          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Signups from ads', value: t.signups, sub: '' },
              { label: 'Made an app account', value: t.accounts, sub: pct(t.accounts, t.signups) },
              { label: 'Paid', value: t.paid, sub: pct(t.paid, t.signups) },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-gray-200 bg-white px-4 py-3">
                <div className="text-[11px] font-extrabold uppercase tracking-wide text-gray-500">{s.label}</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-extrabold text-navy">{s.value}</span>
                  {s.sub && <span className="text-sm font-bold text-gray-500">{s.sub} of signups</span>}
                </div>
              </div>
            ))}
          </div>

          {!t.signups && (
            <div className="mb-5 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-600">
              No ad signups in the last {report?.days} days. Signups count here when the ad link carries tags, for
              example{' '}
              <code className="rounded bg-gray-100 px-1 text-[12px]">
                ?utm_source=facebook&amp;utm_campaign=7-day-plan
              </code>
              . Facebook also adds its own click id, so untagged ad clicks still show, under &ldquo;no campaign
              tag&rdquo;.
            </div>
          )}

          <h3 className="mb-2 text-sm font-extrabold text-navy">Signups per day</h3>
          <div className="mb-5 overflow-x-auto rounded-xl border border-gray-200 bg-white px-3 py-3">
            <div className="flex h-28 min-w-[480px] items-end gap-[3px]">
              {report!.daily.map((d) => (
                <div
                  key={d.day}
                  title={`${when(d.day + 'T12:00:00Z')}: ${d.signups}`}
                  className="flex-1 rounded-t bg-navy/80"
                  style={{ height: `${d.signups ? Math.max(4, (d.signups / peak) * 100) : 1}%`, opacity: d.signups ? 1 : 0.15 }}
                />
              ))}
            </div>
            <div className="mt-1 flex min-w-[480px] justify-between text-[11px] text-gray-400">
              <span>{when(report!.daily[0].day + 'T12:00:00Z')}</span>
              <span>Today</span>
            </div>
          </div>

          {!!report!.campaigns.length && (
            <>
              <h3 className="mb-2 text-sm font-extrabold text-navy">By campaign</h3>
              <div className="mb-5 overflow-x-auto rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50 text-left">
                      {['Campaign', 'Source', 'Signups', 'Accounts', 'Paid'].map((h) => (
                        <th key={h} className="whitespace-nowrap px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report!.campaigns.map((c) => (
                      <tr key={`${c.source}-${c.campaign}`} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2.5 font-bold text-navy">{c.campaign}</td>
                        <td className="px-3 py-2.5 text-gray-600">{c.source}</td>
                        <td className="px-3 py-2.5 font-bold">{c.signups}</td>
                        <td className="whitespace-nowrap px-3 py-2.5">{c.accounts} <span className="text-gray-400">{pct(c.accounts, c.signups)}</span></td>
                        <td className="whitespace-nowrap px-3 py-2.5">{c.paid} <span className="text-gray-400">{pct(c.paid, c.signups)}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {!!report!.people.length && (
            <>
              <h3 className="mb-2 text-sm font-extrabold text-navy">People</h3>
              <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gray-50 text-left">
                      {['Person', 'Signed up', 'Campaign', 'Page', 'Since'].map((h) => (
                        <th key={h} className="whitespace-nowrap px-3 py-2 text-[11px] font-extrabold uppercase tracking-wide text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {report!.people.map((p) => (
                      <tr key={p.email} className="border-b border-gray-100 last:border-0">
                        <td className="px-3 py-2.5">
                          <div className="font-bold text-navy">{p.name || p.email}</div>
                          {p.name && <div className="text-[12px] text-gray-500">{p.email}</div>}
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-gray-600">{when(p.signedUpAt)}</td>
                        <td className="px-3 py-2.5 text-gray-600">{p.campaign}</td>
                        <td className="px-3 py-2.5 text-gray-600">{p.page}</td>
                        <td className="whitespace-nowrap px-3 py-2.5">
                          {p.paid ? (
                            <span className="inline-block rounded-full border border-green-300 bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-800">Paid</span>
                          ) : p.madeAccount ? (
                            <span className="inline-block rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-bold text-amber-800">Account</span>
                          ) : p.alreadyMember ? (
                            <span className="inline-block rounded-full border border-gray-200 bg-gray-100 px-2 py-0.5 text-[11px] font-bold text-gray-600">Already a member</span>
                          ) : (
                            <span className="text-[12px] text-gray-400">Email list only</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
