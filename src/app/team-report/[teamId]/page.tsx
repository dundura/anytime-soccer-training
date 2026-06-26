"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

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
  participationGoal: number | null;
  videosPerPlayerGoal: number | null;
  coachTasksGoal: string[];
  coachWeeklyPlan: string[][];
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

function CheckBadge({ val }: { val: number }) {
  return val
    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-black text-sm">✓</span>
    : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-black text-sm">✕</span>;
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

const COACH_TASKS = [
  { key: "hasHomework", label: "Homework Assigned" },
  { key: "hasContest", label: "Contest Created" },
  { key: "hasPersonalGoal", label: "Personal Goal Set" },
  { key: "hasChallenge", label: "Challenge Set" },
  { key: "demoApp", label: "Demo App In Person" },
  { key: "sendEmailReminder", label: "Send Email Reminder" },
  { key: "setLevelGoal", label: "Set a Level Goal" },
] as const;

type LocalGoal = {
  participationGoal: string;
  videosPerPlayerGoal: string;
  weeklyPlan: string[][];
};

type GoalsPanelProps = {
  teams: Team[];
  onUpdate: (teamId: number, patch: Partial<Pick<Team, "participationGoal" | "videosPerPlayerGoal" | "coachWeeklyPlan">>) => void;
  period: string;
};

function GoalsPanel({ teams, onUpdate, period }: GoalsPanelProps) {
  const [saving, setSaving] = useState<number | null>(null);
  const [localGoals, setLocalGoals] = useState<Record<number, LocalGoal>>(() => Object.fromEntries(teams.map(t => [t.teamId, {
    participationGoal: t.participationGoal != null ? String(t.participationGoal) : "",
    videosPerPlayerGoal: t.videosPerPlayerGoal != null ? String(t.videosPerPlayerGoal) : "",
    weeklyPlan: t.coachWeeklyPlan?.length === 4 ? t.coachWeeklyPlan : [[], [], [], []],
  }])));

  const setTask = (teamId: number, week: number, slot: number, val: string) => {
    setLocalGoals(prev => {
      const plan = prev[teamId].weeklyPlan.map(w => [...w]);
      while (plan[week].length <= slot) plan[week].push("");
      plan[week][slot] = val;
      if (!val) plan[week] = plan[week].filter(Boolean);
      return { ...prev, [teamId]: { ...prev[teamId], weeklyPlan: plan } };
    });
  };

  const save = async (t: Team) => {
    const g = localGoals[t.teamId];
    if (!g) return;
    setSaving(t.teamId);
    const body: Record<string, unknown> = { coachWeeklyPlan: g.weeklyPlan };
    if (g.participationGoal !== "") body.participationGoal = parseInt(g.participationGoal);
    if (g.videosPerPlayerGoal !== "") body.videosPerPlayerGoal = parseInt(g.videosPerPlayerGoal);
    try {
      await fetch(`${API}/${t.teamId}/goal`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      onUpdate(t.teamId, {
        participationGoal: g.participationGoal !== "" ? parseInt(g.participationGoal) : null,
        videosPerPlayerGoal: g.videosPerPlayerGoal !== "" ? parseInt(g.videosPerPlayerGoal) : null,
        coachWeeklyPlan: g.weeklyPlan,
      });
    } catch {}
    setSaving(null);
  };

  const downloadPdf = (teamId: number) => {
    window.open(`${API}/${teamId}/pdf?period=${period}`, "_blank");
  };

  return (
    <div className="space-y-5 mb-6">
      {teams.map(t => {
        const g = localGoals[t.teamId];
        if (!g) return null;
        return (
          <div key={t.teamId} className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-black text-navy">{t.teamName}</div>
                <div className="text-xs text-gray-400 mt-0.5">Current participation: <span className={`font-bold ${t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{t.participationRate}%</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => save(t)} disabled={saving === t.teamId}
                  className="text-sm font-bold bg-navy text-white px-4 py-2 rounded-xl disabled:opacity-50 hover:bg-navy/90 transition-colors">
                  {saving === t.teamId ? "Saving…" : "Save Goals"}
                </button>
                <button onClick={() => downloadPdf(t.teamId)}
                  className="text-sm font-bold border-2 border-navy text-navy px-4 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  ↓ PDF
                </button>
              </div>
            </div>

            {/* Numeric goals */}
            <div className="flex flex-wrap gap-6 mb-5 pb-5 border-b border-gray-100">
              <div>
                <label className="text-xs font-bold text-navy/50 uppercase tracking-wide block mb-1">Participation Goal</label>
                <div className="flex items-center gap-1">
                  <input type="number" min="0" max="100" value={g.participationGoal}
                    onChange={e => setLocalGoals(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId], participationGoal: e.target.value } }))}
                    className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-20 focus:outline-none focus:border-navy" placeholder="—" />
                  <span className="text-sm font-bold text-navy">%</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-navy/50 uppercase tracking-wide block mb-1">Avg Videos / Player / Month</label>
                <div className="flex items-center gap-1">
                  <input type="number" min="0" value={g.videosPerPlayerGoal}
                    onChange={e => setLocalGoals(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId], videosPerPlayerGoal: e.target.value } }))}
                    className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-20 focus:outline-none focus:border-navy" placeholder="—" />
                  <span className="text-sm text-navy/50">videos</span>
                </div>
              </div>
            </div>

            {/* 4-week plan */}
            <div className="text-xs font-bold text-navy/50 uppercase tracking-wide mb-3">4-Week Coaching Plan</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[0, 1, 2, 3].map(wi => (
                <div key={wi} className="border-2 border-gray-100 rounded-xl p-3">
                  <div className="text-xs font-black text-navy mb-2">Week {wi + 1}</div>
                  {[0, 1].map(slot => (
                    <select key={slot}
                      value={g.weeklyPlan[wi]?.[slot] || ""}
                      onChange={e => setTask(t.teamId, wi, slot, e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs text-navy bg-white focus:outline-none focus:border-navy mb-1.5 last:mb-0">
                      <option value="">— No task —</option>
                      {COACH_TASKS.map(task => (
                        <option key={task.key} value={task.key}>{task.label}</option>
                      ))}
                    </select>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TeamSection({ t, teamPlayers, period, forceOpen }: { t: Team; teamPlayers: Player[]; period: string; forceOpen?: boolean }) {
  const [open, setOpen] = useState(false);
  const isOpen = forceOpen || open;
  const tvid = teamPlayers.reduce((s, p) => s + p.videosWatched, 0);
  const tmin = teamPlayers.reduce((s, p) => s + p.trainingMinutes, 0);
  const tact = teamPlayers.filter(p => p.activeThisWeek).length;
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full bg-navy/5 border-b border-gray-100 px-5 py-3 flex flex-wrap items-center gap-x-6 gap-y-1 text-left hover:bg-navy/10 transition-colors"
      >
        <div className="flex items-center gap-2 flex-1">
          <span className="text-navy/40 text-xs">{isOpen ? "▾" : "▸"}</span>
          <span className="font-black text-navy text-sm">{t.teamName}</span>
          {t.createdAt && <span className="text-xs text-gray-400">({formatDate(t.createdAt)})</span>}
        </div>
        <span className="text-xs text-navy/50 font-semibold">{t.activePlayerCount} players</span>
        <span className={`text-xs font-bold ${t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>
          {t.participationRate}% participation
        </span>
        <ScoreDots score={t.coachEngagementScore} breakdown={t.engagementBreakdown} />
      </button>
      {isOpen && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-navy/40 border-b border-gray-100">
              <th className="px-5 py-2">Player</th>
              <th className="px-5 py-2 text-center">Videos</th>
              <th className="px-5 py-2 text-center">Training Time</th>
              <th className="px-5 py-2 text-center">Active</th>
            </tr>
          </thead>
          <tbody>
            {teamPlayers.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-4 text-center text-navy/30 text-xs">No players found.</td></tr>
            ) : teamPlayers.map((p, i) => (
              <tr key={p.childId} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
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
            {teamPlayers.length > 0 && (
              <tr className="bg-navy/5 border-t-2 border-navy/10 font-bold text-navy text-xs uppercase tracking-wide">
                <td className="px-5 py-2.5">Total</td>
                <td className="px-5 py-2.5 text-center">{tvid.toLocaleString()}</td>
                <td className="px-5 py-2.5 text-center">{formatTime(tmin)}</td>
                <td className="px-5 py-2.5 text-center">{tact} / {teamPlayers.length} active</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

const TABS = ["Overview", "Coach Ranking", "Report URL"] as const;
type Tab = (typeof TABS)[number];

export default function TeamReportPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const tabParam = searchParams.get("tab") as Tab;
  const [tab, setTab] = useState<Tab>(tabParam && TABS.includes(tabParam) ? tabParam : "Overview");
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterTeam, setFilterTeam] = useState("");
  const [engagementFilter, setEngagementFilter] = useState<string | null>(null);
  const periodParam = searchParams.get("period");
  const [period, setPeriod] = useState<"week" | "month" | "year" | "alltime">(
    (["week", "month", "year", "alltime"].includes(periodParam || "") ? periodParam : "week") as "week" | "month" | "year" | "alltime"
  );
  const [playerSearch, setPlayerSearch] = useState("");
  const [showGoals, setShowGoals] = useState(false);

  const fetchTeams = useCallback(async (ids: number[], p = "alltime") => {
    if (!ids.length) return;
    setLoading(true);
    try {
      const res = await fetch(`${API}?teams=${ids.join(",")}&period=${p}`);
      const data = await res.json();
      setTeams(data.teams || []);
    } catch (e) { console.error(e); }
    setLoading(false);
  }, []);

  // Init: resolve slug/ID from URL, plus any ?add= params
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let seedId: number | null = null;

      if (/^\d+$/.test(teamId)) {
        seedId = parseInt(teamId);
      } else {
        try {
          const res = await fetch(`${API}/by-slug/${teamId}`);
          const data = await res.json();
          if (data.teams?.[0]) seedId = data.teams[0].teamId;
        } catch {}
      }

      const extra = (searchParams.get("add") || "").split(",").map(Number).filter(n => n > 0);
      const merged = Array.from(new Set([...(seedId ? [seedId] : []), ...extra]));
      setAddedIds(merged);

      if (merged.length) {
        const initPeriod = new URLSearchParams(window.location.search).get("period") || "week";
        const res = await fetch(`${API}?teams=${merged.join(",")}&period=${initPeriod}`);
        const data = await res.json();
        setTeams(data.teams || []);
      }
      setLoading(false);
    };
    init();
  }, [teamId, searchParams]);

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

  const buildParams = (ids: number[], seedId: number, overrides: Record<string,string> = {}) => {
    const extra = ids.filter(id => id !== seedId);
    const current = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (extra.length) current.set("add", extra.join(",")); else current.delete("add");
    Object.entries(overrides).forEach(([k, v]) => v ? current.set(k, v) : current.delete(k));
    const str = current.toString();
    return `/team-report/${teamId}${str ? "?" + str : ""}`;
  };

  const updateUrl = (ids: number[], seedId: number) => {
    router.replace(buildParams(ids, seedId), { scroll: false });
  };

  const addTeam = async (t: SearchResult) => {
    if (addedIds.includes(t.teamId)) { setSearch(""); setSearchResults([]); return; }
    const newIds = [...addedIds, t.teamId];
    setAddedIds(newIds);
    setSearch(""); setSearchResults([]);
    const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
    updateUrl(newIds, seedId);
    await fetchTeams(newIds, period);
  };

  const removeTeam = (id: number) => {
    const newIds = addedIds.filter(x => x !== id);
    setAddedIds(newIds);
    setTeams(prev => prev.filter(t => t.teamId !== id));
    const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
    updateUrl(newIds, seedId);
  };

  const updateSlug = (teamId: number, slug: string) => {
    setTeams(prev => prev.map(t => t.teamId === teamId ? { ...t, reportSlug: slug, teamSlug: slug } : t));
  };

  const updateGoal = (teamId: number, patch: Partial<Pick<Team, "participationGoal" | "videosPerPlayerGoal" | "coachWeeklyPlan">>) => {
    setTeams(prev => prev.map(t => t.teamId === teamId ? { ...t, ...patch } : t));
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
  const engagementFiltered = engagementFilter
    ? filteredRanking.filter(c => c.engagementBreakdown[engagementFilter as keyof EngagementBreakdown] === 1)
    : filteredRanking;

  const allPlayers = filteredTeams
    .flatMap(t => t.players.map(p => ({ ...p, teamName: t.teamName })))
    .filter(p => !playerSearch || p.name.toLowerCase().includes(playerSearch.toLowerCase()))
    .sort((a, b) => b.videosWatched - a.videosWatched);

  const totalPlayers = allPlayers.length;
  const totalVideos = allPlayers.reduce((s, p) => s + p.videosWatched, 0);
  const totalMinutes = allPlayers.reduce((s, p) => s + p.trainingMinutes, 0);
  const avgParticipation = filteredTeams.length > 0
    ? Math.round(filteredTeams.reduce((s, t) => s + t.participationRate, 0) / filteredTeams.length)
    : 0;

  const changePeriod = (p: "week" | "month" | "year" | "alltime") => {
    setPeriod(p);
    fetchTeams(addedIds, p);
    const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
    router.replace(buildParams(addedIds, seedId, { period: p === "week" ? "" : p }), { scroll: false });
  };

  const changeTab = (t: Tab) => {
    setTab(t);
    const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
    router.replace(buildParams(addedIds, seedId, { tab: t === "Overview" ? "" : t }), { scroll: false });
  };

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

        {/* Single controls row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
            {TABS.map(t => (
              <button key={t} onClick={() => changeTab(t)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${tab === t ? "bg-navy text-white shadow" : "text-navy/60 hover:text-navy"}`}>
                {t}
              </button>
            ))}
          </div>

          {/* Goals toggle */}
          <button
            onClick={() => setShowGoals(g => !g)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${showGoals ? "bg-[#e63946] border-[#e63946] text-white" : "border-gray-200 text-navy/60 hover:border-navy/40 bg-white"}`}
          >
            🎯 Coach Goals
          </button>

          <div className="flex-1" />

          {/* Team filter */}
          {teams.length > 1 && (
            <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)} className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-navy bg-white focus:outline-none focus:border-navy">
              <option value="">All Teams</option>
              {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
            </select>
          )}

          {/* Player search */}
          <input
            type="text"
            placeholder="Search players..."
            value={playerSearch}
            onChange={e => setPlayerSearch(e.target.value)}
            className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-navy bg-white w-40"
          />

          {/* Period pills */}
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
            {(["week", "month", "year", "alltime"] as const).map(p => (
              <button key={p} onClick={() => changePeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${period === p ? "bg-navy text-white shadow" : "text-navy/50 hover:text-navy"}`}>
                {p === "alltime" ? "All Time" : p === "year" ? "Year" : p === "month" ? "Month" : "Week"}
              </button>
            ))}
          </div>
        </div>

        {showGoals && teams.length > 0 && (
          <GoalsPanel
            teams={filteredTeams}
            period={period}
            onUpdate={(tid, patch) => updateGoal(tid, patch as Partial<Pick<Team, "participationGoal" | "videosPerPlayerGoal" | "coachWeeklyPlan">>)}
          />
        )}

        {loading ? (
          <div className="text-center py-20 text-navy/40 font-medium">Loading...</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-20 text-navy/40 font-medium">No teams loaded.</div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {tab === "Overview" && (
              <>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Total Players", value: totalPlayers.toLocaleString() },
                  { label: "Total Videos", value: totalVideos.toLocaleString() },
                  { label: "Total Training Time", value: formatTime(totalMinutes) },
                  { label: "Avg Participation", value: `${avgParticipation}%` },
                ].map(card => (
                  <div key={card.label} className="bg-white rounded-2xl shadow-sm px-6 py-5 text-center">
                    <div className="text-2xl font-black text-navy">{card.value}</div>
                    <div className="text-xs text-gray-400 font-semibold mt-1 uppercase tracking-wide">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Per-team: collapsible summary pill + player rows */}
              <div className="space-y-4">
                {filteredTeams.map(t => {
                  const teamPlayers = t.players
                    .filter(p => !playerSearch || p.name.toLowerCase().includes(playerSearch.toLowerCase()))
                    .sort((a, b) => b.videosWatched - a.videosWatched);
                  return (
                    <TeamSection key={t.teamId} t={t} teamPlayers={teamPlayers} period={period} forceOpen={!!playerSearch} />
                  );
                })}
              </div>
              </>
            )}

            {/* COACH RANKING TAB */}
            {tab === "Coach Ranking" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
                {/* Filters */}
                <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
                  <span className="text-xs font-bold text-navy/50 uppercase tracking-wide">Filter:</span>
                  {[
                    { key: "hasHomework", label: "Homework Assigned" },
                    { key: "hasContest", label: "Contest Created" },
                    { key: "hasPersonalGoal", label: "Personal Goal" },
                    { key: "hasChallenge", label: "Challenge Set" },
                  ].map(f => (
                    <button
                      key={f.key}
                      onClick={() => setEngagementFilter(prev => prev === f.key ? null : f.key)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border-2 transition-all ${engagementFilter === f.key ? "bg-navy text-white border-navy" : "border-gray-200 text-navy/60 hover:border-navy/40"}`}
                    >
                      {f.label}
                    </button>
                  ))}
                  {engagementFilter && (
                    <button onClick={() => setEngagementFilter(null)} className="text-xs text-gray-400 hover:text-gray-600 ml-1">Clear</button>
                  )}
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
                      <th className="px-4 py-3 text-center w-12">Rank</th>
                      <th className="px-4 py-3">Coach</th>
                      <th className="px-4 py-3">Team</th>
                      <th className="px-4 py-3 text-center">Participation ({period === "week" ? "This Week" : period === "month" ? "Month" : period === "year" ? "Year" : "All Time"})</th>
                      <th className="px-4 py-3 text-center">Homework Assigned</th>
                      <th className="px-4 py-3 text-center">Contest Created</th>
                      <th className="px-4 py-3 text-center">Personal Goal</th>
                      <th className="px-4 py-3 text-center">Challenge Set</th>
                      <th className="px-4 py-3 text-center">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {engagementFiltered.length === 0 ? (
                      <tr><td colSpan={9} className="px-5 py-8 text-center text-navy/40">No coaches found.</td></tr>
                    ) : engagementFiltered.map((c, i) => (
                      <tr key={`${c.teamId}-${c.childId}`} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-orange-300 text-white" : "bg-gray-100 text-navy/50"}`}>{i + 1}</span>
                        </td>
                        <td className="px-4 py-3.5 font-bold text-navy">{c.name}</td>
                        <td className="px-4 py-3.5 text-navy/60 text-xs">{c.teamName}</td>
                        <td className="px-4 py-3.5 text-center">
                          <span className={`font-bold ${c.participationRate >= 70 ? "text-green-600" : c.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{c.participationRate}%</span>
                        </td>
                        <td className="px-4 py-3.5 text-center"><CheckBadge val={c.engagementBreakdown.hasHomework} /></td>
                        <td className="px-4 py-3.5 text-center"><CheckBadge val={c.engagementBreakdown.hasContest} /></td>
                        <td className="px-4 py-3.5 text-center"><CheckBadge val={c.engagementBreakdown.hasPersonalGoal} /></td>
                        <td className="px-4 py-3.5 text-center"><CheckBadge val={c.engagementBreakdown.hasChallenge} /></td>
                        <td className="px-4 py-3.5 text-center"><span className="font-black text-navy">{c.coachEngagementScore}/4</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* REPORT URL TAB */}
            {tab === "Report URL" && (
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
                      <th className="px-5 py-3">Team</th>
                      <th className="px-5 py-3 text-gray-300">Created</th>
                      <th className="px-5 py-3">Report URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeams.map((t, i) => (
                      <tr key={t.teamId} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-5 py-4">
                          <div className="font-bold text-navy">{t.teamName}</div>
                          {t.createdAt && <div className="text-xs text-gray-400 mt-0.5">({formatDate(t.createdAt)})</div>}
                        </td>
                        <td className="px-5 py-4 text-xs text-gray-400">{t.createdAt ? formatDate(t.createdAt) : "—"}</td>
                        <td className="px-5 py-4"><SlugEditor team={t} onUpdate={(slug) => updateSlug(t.teamId, slug)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </>
        )}
      </div>
    </main>
  );
}
