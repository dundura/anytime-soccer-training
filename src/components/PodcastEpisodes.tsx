'use client';

// Every episode of the podcast with its public Spotify link, newest first. The list comes from Spotify itself
// through the backend, so a new episode shows up here on its own.
import { useEffect, useMemo, useState } from 'react';

const API = 'https://api.anytime-soccer.com';

type Episode = { title: string; link: string; date: string | null; minutes: number | null };

const when = (iso: string | null) => (iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'America/New_York' }) : '');

export default function PodcastEpisodes({ token }: { token: string }) {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [year, setYear] = useState('All');
  const [copied, setCopied] = useState('');

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const res = await fetch(`${API}/podcast-portal/episodes`, {
          headers: {
            Authorization: token || '',
            'X-Admin-Token': (typeof window !== 'undefined' && localStorage.getItem('astPortalAdminToken')) || '',
          },
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Could not load the episodes.');
        if (live) setEpisodes(data.episodes || []);
      } catch (e) {
        if (live) setError(e instanceof Error ? e.message : 'Could not load the episodes.');
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => { live = false; };
  }, [token]);

  const years = useMemo(() => Array.from(new Set(episodes.map((e) => (e.date || '').slice(0, 4)).filter(Boolean))).sort().reverse(), [episodes]);
  const shown = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return episodes.filter((e) => (year === 'All' || (e.date || '').startsWith(year)) && (!needle || e.title.toLowerCase().includes(needle)));
  }, [episodes, search, year]);

  const copy = async (link: string) => {
    try { await navigator.clipboard.writeText(link); setCopied(link); window.setTimeout(() => setCopied(''), 1500); } catch { /* clipboard blocked */ }
  };

  return (
    <div className="p-5 sm:p-6">
      <h1 className="text-xl font-black text-navy">🎧 Podcast episodes</h1>
      <p className="text-xs text-gray-500 mt-1">{loading ? 'Loading…' : `${shown.length} of ${episodes.length} episodes`}. Tap a title to open it on Spotify.</p>

      <div className="flex flex-wrap gap-2 mt-4">
        <input
          value={search}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder="Search the titles"
          className="flex-1 min-w-[12rem] px-3 py-2 rounded-lg border border-gray-200 text-sm"
        />
        <select value={year} onChange={(ev) => setYear(ev.target.value)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-semibold">
          <option value="All">All years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </div>

      {error && <p className="mt-4 text-sm text-red font-semibold">{error}</p>}

      <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden">
        {!loading && !error && shown.length === 0 && <p className="px-4 py-3 text-sm text-gray-400">No episodes match.</p>}
        {shown.map((e, i) => (
          <div key={e.link} className={`flex items-center gap-3 px-4 py-2.5 ${i % 2 ? 'bg-white' : 'bg-blue-100'}`}>
            <div className="flex-1 min-w-0">
              <a href={e.link} target="_blank" rel="noopener noreferrer" className="block text-[13px] font-semibold text-navy hover:underline">{e.title}</a>
              <span className="block text-[11px] text-gray-500">{when(e.date)}{e.minutes ? ` · ${e.minutes} min` : ''}</span>
            </div>
            <button onClick={() => copy(e.link)} className="shrink-0 px-3 py-1.5 rounded-lg bg-red text-white text-[11px] font-bold">
              {copied === e.link ? 'Copied' : 'Copy link'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
