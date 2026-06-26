"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";

const API = "https://api.anytime-soccer.com/api/public/team-report";

interface Player {
  childId: number;
  name: string;
  videosWatched: number;
  trainingMinutes: number;
  activeThisWeek: boolean;
}

interface Coach {
  childId: number;
  name: string;
  role: string;
}

interface EngagementBreakdown {
  hasContest: number;
  hasPersonalGoal: number;
  hasChallenge: number;
  hasHomework: number;
}

interface Team {
  teamId: number;
  teamName: string;
  teamSlug: string;
  reportSlug: string | null;
  createdAt: string;
  activePlayerCount: number;
  participationRate: number;
  coachEngagementScore: number;
  engagementBreakdown: EngagementBreakdown;
  coaches: Coach[];
  players: Player[];
}

interface SearchResult {
  teamId: number;
  teamName: string;
  teamSlug: string;
}

function ScoreDots({ score, breakdown }: { score: number; breakdown: EngagementBreakdown }) {
  const items = [
    { label: "Contest", val: breakdown.hasContest },
    { label: "Goal", val: breakdown.hasPersonalGoal },
    { label: "Challenge", val: breakdown.hasChallenge },
    { label: "Homework", val: breakdown.hasHomework },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {items.map((item) => (
        <div key={item.label} title={item.label} className={`w-2.5 h-2.5 rounded-full ${item.val ? "bg-green-500" : "bg-gray-200"}`} />
      ))}
      <span className="ml-1 text-sm font-bold text-navy">{score}/4</span>
    </div>
  );
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function SlugEditor({ team, onUpdate }: { team: Team; onUpdate: (slug: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(team.reportSlug || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const currentUrl = `https://www.anytime-soccer.com/team-report/${team.reportSlug || team.teamId}`;

  const save = async () => {
    if (!value.trim()) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${API}/${team.teamId}/slug`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: value.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save"); setSaving(false); return; }
      onUpdate(data.slug);
      setEditing(false);
    } catch {
      setError("Network error");
    }
    setSaving(false);
  };

  if (!editing) {
    return (
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-gray-400 font-mono break-all">{currentUrl}</span>
        <button
          onClick={() => { setValue(team.reportSlug || ""); setEditing(true); setError(""); }}
          className="text-xs text-navy/50 hover:text-navy border border-gray-200 rounded-lg px-2 py-0.5 transition-colors"
        >
          Edit URL
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(currentUrl)}
          className="text-xs text-navy/50 hover:text-navy border border-gray-200 rounded-lg px-2 py-0.5 transition-colors"
        >
          Copy
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs text-gray-400">anytime-soccer.com/team-report/</span>
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
        className="border-2 border-navy rounded-lg px-2 py-0.5 text-xs font-mono w-40 focus:outline-none"
        placeholder="your-slug"
      />
      <button onClick={save} disabled={saving} className="text-xs bg-navy text-white rounded-lg px-3 py-1 font-bold disabled:opacity-50">
        {saving ? "Saving…" : "Save"}
      </button>
      <button onClick={() => setEditing(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

const TABS = ["Summary", "Detail", "Coach Ranking"] as const;
type Tab = (typeof TABS)[number];

export default function TeamReportPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("Summary");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterTeam, setFilterTeam] = useState("");

  const fetchTeams = useCallback(async (ids: number[]) => {
    if (!ids.length) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}?teams=${ids.join(",")}`);
      const data = await res.json();
      setTeams(data.teams || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  // Init: resolve slug or ID, load from localStorage
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let seedId: number | null = null;

      if (/^\d+$/.test(teamId)) {
        seedId = parseInt(teamId);
      } else {
        // resolve slug → teamId
        try {
          const res = await fetch(`${API}/by-slug/${teamId}`);
          const data = await res.json();
          if (data.teams?.[0]) seedId = data.teams[0].teamId;
        } catch {}
      }

      const stored: number[] = JSON.parse(localStorage.getItem("docTeamIds") || "[]");
      const merged = Array.from(new Set([...(seedId ? [seedId] : []), ...stored].filter(n => n > 0)));
      setAddedIds(merged);
      localStorage.setItem("docTeamIds", JSON.stringify(merged));

      if (merged.length) {
        const res = await fetch(`${API}?teams=${merged.join(",")}`);
        const data = await res.json();
        setTeams(data.teams || []);
      }
      setLoading(false);
    };
    init();
  }, [teamId]);

  // Search
  useEffect(() => {
    if (search.length < 2) { setSearchResults([]); return; }
    const timeout = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(`${API}/search?q=${encodeURIComponent(search)}`);
        const data = await res.json();
        setSearchResults(data.teams || []);
      } catch {}
      setSearchLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const addTeam = async (t: SearchResult) => {
    if (addedIds.includes(t.teamId)) { setSearch(""); setSearchResults([]); return; }
    const newIds = [...addedIds, t.teamId];
    setAddedIds(newIds);
    localStorage.setItem("docTeamIds", JSON.stringify(newIds));
    setSearch(""); setSearchResults([]);
    await fetchTeams(newIds);
  };

  const removeTeam = (id: number) => {
    const newIds = addedIds.filter(x => x !== id);
    setAddedIds(newIds);
    setTeams(prev => prev.filter(t => t.teamId !== id));
    localStorage.setItem("docTeamIds", JSON.stringify(newIds));
  };

  const updateSlug = (teamId: number, slug: string) => {
    setTeams(prev => prev.map(t => t.teamId === teamId ? { ...t, reportSlug: slug, teamSlug: slug } : t));
  };

  const filteredTeams = filterTeam ? teams.filter(t => t.teamId === parseInt(filterTeam)) : teams;

  const coachRanking = teams
    .flatMap(t => t.coaches.map(c => ({
      ...c, teamName: t.teamName, teamId: t.teamId,
      coachEngagementScore: t.coachEngagementScore,
      engagementBreakdown: t.engagementBreakdown,
      participationRate: t.participationRate,
    })))
    .sort((a, b) => b.coachEngagementScore - a.coachEngagementScore);

  const filteredRanking = filterTeam ? coachRanking.filter(c => c.teamId === parseInt(filterTeam)) : coachRanking;

  const allPlayers = filteredTeams
    .flatMap(t => t.players.map(p => ({ ...p, teamName: t.teamName })))
    .sort((a, b) => b.videosWatched - a.videosWatched);

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <div className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black uppercase tracking-tight">DOC Team Report</h1>
          <p className="text-white/60 text-sm mt-1">Director of Coaching dashboard — coach rankings &amp; player engagement</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search + Add Teams */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[220px]">
              <input
                type="text"
                placeholder="Search to add a team..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-navy pr-10"
              />
              {searchLoading && <div className="absolute right-3 top-3 w-4 h-4 border-2 border-navy border-t-transparent rounded-full animate-spin" />}
              {searchResults.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {searchResults.map(r => (
                    <button key={r.teamId} onClick={() => addTeam(r)} className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#f5f7fa] text-navy font-medium border-b last:border-0">
                      {r.teamName}
                      {addedIds.includes(r.teamId) && <span className="ml-2 text-xs text-gray-400">already added</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {teams.map(t => (
                <span key={t.teamId} className="inline-flex items-center gap-1.5 bg-navy/10 text-navy text-xs font-bold px-3 py-1.5 rounded-full">
                  {t.teamName}
                  <button onClick={() => removeTeam(t.teamId)} className="hover:text-red transition-colors text-navy/50 ml-0.5">✕</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mb-4 bg-white rounded-xl p-1 w-fit shadow-sm">
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-navy text-white shadow" : "text-navy/60 hover:text-navy"}`}>
              {t}
            </button>
          ))}
        </div>

        {teams.length > 1 && (
          <div className="mb-4">
            <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)} className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-medium text-navy bg-white focus:outline-none focus:border-navy">
              <option value="">All Teams</option>
              {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
            </select>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-navy/40 font-medium">Loading...</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-20 text-navy/40 font-medium">No teams loaded.</div>
        ) : (
          <>
            {/* SUMMARY TAB */}
            {tab === "Summary" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
                      <th className="px-5 py-3">Team</th>
                      <th className="px-5 py-3 text-center">Players</th>
                      <th className="px-5 py-3 text-center">Participation (7d)</th>
                      <th className="px-5 py-3">Coach Engagement</th>
                      <th className="px-5 py-3">Report URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeams.map((t, i) => (
                      <tr key={t.teamId} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-5 py-3.5">
                          <div className="font-bold text-navy">{t.teamName}</div>
                          {t.createdAt && <div className="text-xs text-gray-400 mt-0.5">({formatDate(t.createdAt)})</div>}
                        </td>
                        <td className="px-5 py-3.5 text-center text-navy/70">{t.activePlayerCount}</td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`font-bold ${t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>
                            {t.participationRate}%
                          </span>
                        </td>
                        <td className="px-5 py-3.5"><ScoreDots score={t.coachEngagementScore} breakdown={t.engagementBreakdown} /></td>
                        <td className="px-5 py-3.5"><SlugEditor team={t} onUpdate={(slug) => updateSlug(t.teamId, slug)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* DETAIL TAB */}
            {tab === "Detail" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
                      <th className="px-5 py-3">Team</th>
                      <th className="px-5 py-3">Player</th>
                      <th className="px-5 py-3 text-center">Videos</th>
                      <th className="px-5 py-3 text-center">Training Time</th>
                      <th className="px-5 py-3 text-center">Active This Week</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPlayers.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-navy/40">No players found.</td></tr>
                    ) : allPlayers.map((p, i) => (
                      <tr key={`${p.teamName}-${p.childId}`} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-5 py-3 text-navy/60 text-xs">{p.teamName}</td>
                        <td className="px-5 py-3 font-semibold text-navy">{p.name}</td>
                        <td className="px-5 py-3 text-center text-navy/70">{p.videosWatched.toLocaleString()}</td>
                        <td className="px-5 py-3 text-center text-navy/70">{formatTime(p.trainingMinutes)}</td>
                        <td className="px-5 py-3 text-center">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.activeThisWeek ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                            {p.activeThisWeek ? "Yes" : "No"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* COACH RANKING TAB */}
            {tab === "Coach Ranking" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
                      <th className="px-5 py-3 text-center w-12">Rank</th>
                      <th className="px-5 py-3">Coach</th>
                      <th className="px-5 py-3">Team</th>
                      <th className="px-5 py-3 text-center">Participation (7d)</th>
                      <th className="px-5 py-3">Engagement Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRanking.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-navy/40">No coaches found.</td></tr>
                    ) : filteredRanking.map((c, i) => (
                      <tr key={`${c.teamId}-${c.childId}`} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-orange-300 text-white" : "bg-gray-100 text-navy/50"}`}>{i + 1}</span>
                        </td>
                        <td className="px-5 py-3.5 font-bold text-navy">{c.name}</td>
                        <td className="px-5 py-3.5">
                          <div className="text-navy/60 text-xs">{c.teamName}</div>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          <span className={`font-bold ${c.participationRate >= 70 ? "text-green-600" : c.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{c.participationRate}%</span>
                        </td>
                        <td className="px-5 py-3.5"><ScoreDots score={c.coachEngagementScore} breakdown={c.engagementBreakdown} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3 text-xs text-navy/50">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Contest created</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Personal goal set</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Challenge set</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> Homework assigned</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200 inline-block" /> Not completed</span>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
