"use client";

import { useEffect, useState, useCallback, useRef } from "react";
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
  email: string | null;
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

const DEFAULT_PARTICIPATION_GOAL = "75";
const DEFAULT_VIDEOS_GOAL = "30";
const DEFAULT_WEEKLY_PLAN: string[][] = [
  ["hasHomework", "demoApp"],
  ["sendEmailReminder", "hasPersonalGoal"],
  ["hasChallenge", "personalChallenge"],
  ["playerRecognition"],
];

const COACH_TASKS = [
  { key: "hasHomework", label: "Assign Homework" },
  { key: "demoApp", label: "Demo App In-Person" },
  { key: "sendEmailReminder", label: "Send Email Reminder" },
  { key: "hasPersonalGoal", label: "Set Player Goals" },
  { key: "hasChallenge", label: "Create Coach's Challenge" },
  { key: "personalChallenge", label: "Create a Personal Challenge" },
  { key: "hasContest", label: "Create a Team Contest", optional: true },
  { key: "setLevelGoal", label: "Set Team Level Goal", optional: true },
  { key: "playerRecognition", label: "Give Player Recognition in Practice", example: "\"Great work on your home training this week, [Name] — I could see it in your touches today!\"" },
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

type EmailForm = { mode: "manager" | "custom"; selectedId: number | null; firstName: string; email: string; sending: boolean; sent: boolean };

function GoalsPanel({ teams, onUpdate, period }: GoalsPanelProps) {
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [emailForms, setEmailForms] = useState<Record<number, EmailForm | null>>({});
  const [openMenus, setOpenMenus] = useState<Record<number, boolean>>({});
  const toggleMenu = (teamId: number) => setOpenMenus(prev => ({ ...prev, [teamId]: !prev[teamId] }));
  const closeMenu = (teamId: number) => setOpenMenus(prev => ({ ...prev, [teamId]: false }));
  const makeDefaults = (t: Team): LocalGoal => ({
    participationGoal: t.participationGoal != null ? String(t.participationGoal) : DEFAULT_PARTICIPATION_GOAL,
    videosPerPlayerGoal: t.videosPerPlayerGoal != null ? String(t.videosPerPlayerGoal) : DEFAULT_VIDEOS_GOAL,
    weeklyPlan: (t.coachWeeklyPlan?.length === 4 && t.coachWeeklyPlan.some(w => w.length > 0)) ? t.coachWeeklyPlan : DEFAULT_WEEKLY_PLAN.map(w => [...w]),
  });

  const [localGoals, setLocalGoals] = useState<Record<number, LocalGoal>>(() =>
    Object.fromEntries(teams.map(t => [t.teamId, makeDefaults(t)]))
  );
  const saveTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const autoSave = (teamId: number, g: LocalGoal) => {
    clearTimeout(saveTimers.current[teamId]);
    saveTimers.current[teamId] = setTimeout(async () => {
      setSaving(prev => ({ ...prev, [teamId]: true }));
      const body: Record<string, unknown> = { coachWeeklyPlan: g.weeklyPlan };
      if (g.participationGoal !== "") body.participationGoal = parseInt(g.participationGoal);
      if (g.videosPerPlayerGoal !== "") body.videosPerPlayerGoal = parseInt(g.videosPerPlayerGoal);
      try {
        await fetch(`${API}/${teamId}/goal`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
        onUpdate(teamId, {
          participationGoal: g.participationGoal !== "" ? parseInt(g.participationGoal) : null,
          videosPerPlayerGoal: g.videosPerPlayerGoal !== "" ? parseInt(g.videosPerPlayerGoal) : null,
          coachWeeklyPlan: g.weeklyPlan,
        });
      } catch {}
      setSaving(prev => ({ ...prev, [teamId]: false }));
    }, 800);
  };

  const toggleTask = (teamId: number, week: number, key: string) => {
    setLocalGoals(prev => {
      const plan = prev[teamId].weeklyPlan.map(w => [...w]);
      const idx = plan[week].indexOf(key);
      if (idx >= 0) plan[week].splice(idx, 1);
      else plan[week].push(key);
      const updated = { ...prev, [teamId]: { ...prev[teamId], weeklyPlan: plan } };
      autoSave(teamId, updated[teamId]);
      return updated;
    });
  };

  const setNumericGoal = (teamId: number, field: "participationGoal" | "videosPerPlayerGoal", val: string) => {
    setLocalGoals(prev => {
      const updated = { ...prev, [teamId]: { ...prev[teamId], [field]: val } };
      autoSave(teamId, updated[teamId]);
      return updated;
    });
  };

  const reset = (t: Team) => {
    const defaults: LocalGoal = {
      participationGoal: DEFAULT_PARTICIPATION_GOAL,
      videosPerPlayerGoal: DEFAULT_VIDEOS_GOAL,
      weeklyPlan: [[], [], [], []],
    };
    setLocalGoals(prev => ({ ...prev, [t.teamId]: defaults }));
    autoSave(t.teamId, defaults);
  };

  const resolvedRecipient = (t: Team, form: EmailForm) => {
    if (form.mode === "manager" && form.selectedId != null) {
      const coach = t.coaches.find(c => c.childId === form.selectedId);
      return { firstName: coach?.name?.split(" ")[0] || "", email: (coach as any)?.email || "" };
    }
    return { firstName: form.firstName, email: form.email };
  };

  const sendEmail = async (t: Team) => {
    const form = emailForms[t.teamId];
    if (!form) return;
    const { firstName, email } = resolvedRecipient(t, form);
    if (!email) return;
    setEmailForms(prev => ({ ...prev, [t.teamId]: { ...form, sending: true } }));
    try {
      const res = await fetch(`${API}/${t.teamId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, period }),
      });
      if (!res.ok) throw new Error(await res.text());
      setEmailForms(prev => ({ ...prev, [t.teamId]: { ...form, sending: false, sent: true } }));
      setTimeout(() => setEmailForms(prev => ({ ...prev, [t.teamId]: null })), 3000);
    } catch (err) {
      alert(`Failed to send: ${err instanceof Error ? err.message : "Server error"}`);
      setEmailForms(prev => ({ ...prev, [t.teamId]: { ...form, sending: false } }));
    }
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
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="min-w-0">
                <div className="font-black text-navy whitespace-nowrap">{t.teamName}</div>
                <div className="text-xs text-gray-400 mt-0.5 whitespace-nowrap">Current participation: <span className={`font-bold ${t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{t.participationRate}%</span></div>
                <div className="flex flex-wrap items-center gap-1.5 mt-2">
                  {[
                    { label: "Assign Homework", val: t.engagementBreakdown.hasHomework },
                    { label: "Create a Team Contest", val: t.engagementBreakdown.hasContest },
                    { label: "Set Player Goals", val: t.engagementBreakdown.hasPersonalGoal },
                    { label: "Create Coach's Challenge", val: t.engagementBreakdown.hasChallenge },
                  ].map(item => (
                    <span key={item.label} className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.val ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {item.val ? "✓" : "✗"} {item.label}
                    </span>
                  ))}
                  <span className={`inline-flex items-center gap-1 text-[11px] font-black px-2 py-0.5 rounded-full ${t.coachEngagementScore === 4 ? "bg-green-50 text-green-700" : "bg-navy/10 text-navy"}`}>
                    Score {t.coachEngagementScore}/4
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {saving[t.teamId] && <span className="text-xs text-navy/40 italic">Saving…</span>}
                {/* Desktop: individual buttons */}
                <button onClick={() => reset(t)}
                  className="hidden sm:inline-flex text-sm font-bold border-2 border-gray-200 text-navy/50 px-3 py-2 rounded-xl hover:border-navy/40 hover:text-navy transition-colors">
                  ↺ Reset
                </button>
                <button onClick={() => setEmailForms(prev => prev[t.teamId] ? { ...prev, [t.teamId]: null } : { ...prev, [t.teamId]: { mode: "manager", selectedId: t.coaches[0]?.childId ?? null, firstName: "", email: "", sending: false, sent: false } })}
                  className="hidden sm:inline-flex text-sm font-bold border-2 border-[#e63946] text-[#e63946] px-4 py-2 rounded-xl hover:bg-[#e63946]/5 transition-colors">
                  ✉ Email
                </button>
                <button onClick={() => downloadPdf(t.teamId)}
                  className="hidden sm:inline-flex text-sm font-bold border-2 border-navy text-navy px-4 py-2 rounded-xl hover:bg-navy/5 transition-colors">
                  ↓ PDF
                </button>
                {/* Mobile: Actions dropdown */}
                <div className="relative sm:hidden">
                  <button onClick={() => toggleMenu(t.teamId)}
                    className="flex items-center gap-1.5 text-sm font-bold border-2 border-gray-200 text-navy/60 px-3 py-2 rounded-xl hover:border-navy/40 hover:text-navy transition-colors bg-white">
                    Actions <span className="text-[10px]">{openMenus[t.teamId] ? "▴" : "▾"}</span>
                  </button>
                  {openMenus[t.teamId] && (
                    <div className="absolute right-0 top-full mt-1 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-20 overflow-hidden">
                      <button onClick={() => { reset(t); closeMenu(t.teamId); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-navy/70 hover:bg-gray-50 transition-colors">
                        ↺ Reset
                      </button>
                      <button onClick={() => { closeMenu(t.teamId); setEmailForms(prev => prev[t.teamId] ? { ...prev, [t.teamId]: null } : { ...prev, [t.teamId]: { mode: "manager", selectedId: t.coaches[0]?.childId ?? null, firstName: "", email: "", sending: false, sent: false } }); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-[#e63946] hover:bg-red-50 transition-colors">
                        ✉ Email PDF
                      </button>
                      <button onClick={() => { downloadPdf(t.teamId); closeMenu(t.teamId); }}
                        className="w-full text-left px-4 py-2.5 text-sm font-semibold text-navy hover:bg-navy/5 transition-colors">
                        ↓ Download PDF
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Email form */}
            {emailForms[t.teamId] && (
              <div className="mb-5 p-4 bg-[#fff5f5] border-2 border-[#e63946]/20 rounded-xl">
                {emailForms[t.teamId]!.sent ? (
                  <p className="text-sm font-bold text-green-600 text-center">✓ Email sent with PDF attached!</p>
                ) : (
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-navy/50 uppercase tracking-wide">Send to</p>
                    {/* Manager radio buttons */}
                    {t.coaches.filter(c => c.email).map(c => (
                      <label key={c.childId} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`email-target-${t.teamId}`}
                          checked={emailForms[t.teamId]!.mode === "manager" && emailForms[t.teamId]!.selectedId === c.childId}
                          onChange={() => setEmailForms(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId]!, mode: "manager", selectedId: c.childId } }))}
                          className="accent-[#e63946]" />
                        <span className="text-sm font-medium text-navy">{c.name}</span>
                      </label>
                    ))}
                    {/* Custom email option */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`email-target-${t.teamId}`}
                        checked={emailForms[t.teamId]!.mode === "custom"}
                        onChange={() => setEmailForms(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId]!, mode: "custom", selectedId: null } }))}
                        className="accent-[#e63946]" />
                      <span className="text-sm font-medium text-navy">Other</span>
                    </label>
                    {emailForms[t.teamId]!.mode === "custom" && (
                      <div className="flex flex-wrap gap-3 pl-5">
                        <input type="text" placeholder="First name" value={emailForms[t.teamId]!.firstName}
                          onChange={e => setEmailForms(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId]!, firstName: e.target.value } }))}
                          className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-36 focus:outline-none focus:border-navy" />
                        <input type="email" placeholder="Email address" value={emailForms[t.teamId]!.email}
                          onChange={e => setEmailForms(prev => ({ ...prev, [t.teamId]: { ...prev[t.teamId]!, email: e.target.value } }))}
                          className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-52 focus:outline-none focus:border-navy" />
                      </div>
                    )}
                    <button onClick={() => sendEmail(t)} disabled={emailForms[t.teamId]!.sending || !resolvedRecipient(t, emailForms[t.teamId]!).email}
                      className="text-sm font-bold bg-[#e63946] text-white px-5 py-2 rounded-xl disabled:opacity-40 hover:bg-[#c1121f] transition-colors">
                      {emailForms[t.teamId]!.sending ? "Sending…" : "Send PDF"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Numeric goals */}
            <div className="flex flex-wrap gap-6 mb-5 pb-5 border-b border-gray-100">
              <div>
                <label className="text-xs font-bold text-navy/50 uppercase tracking-wide block mb-1">Participation Goal</label>
                <div className="flex items-center gap-1">
                  <input type="number" min="0" max="100" value={g.participationGoal}
                    onChange={e => setNumericGoal(t.teamId, "participationGoal", e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-20 focus:outline-none focus:border-navy" placeholder="—" />
                  <span className="text-sm font-bold text-navy">%</span>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-navy/50 uppercase tracking-wide block mb-1">Avg Videos / Player / Month</label>
                <div className="flex items-center gap-1">
                  <input type="number" min="0" value={g.videosPerPlayerGoal}
                    onChange={e => setNumericGoal(t.teamId, "videosPerPlayerGoal", e.target.value)}
                    className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-20 focus:outline-none focus:border-navy" placeholder="—" />
                  <span className="text-sm text-navy/50">videos</span>
                </div>
              </div>
            </div>

            {/* 4-week plan */}
            <div className="text-xs font-bold text-navy/50 uppercase tracking-wide mb-3">4-Week Coaching Plan</div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {([
                ["hasHomework", "demoApp"],
                ["sendEmailReminder", "hasPersonalGoal"],
                ["hasChallenge", "personalChallenge"],
                ["playerRecognition"],
              ] as string[][]).map((recommended, wi) => {
                // Hide tasks already checked in another week
                const visibleTasks = COACH_TASKS.filter(task =>
                  !g.weeklyPlan.some((week, idx) => idx !== wi && week.includes(task.key))
                );
                // Group consecutive tasks by type: recommended, optional, or normal
                type GroupType = "rec" | "opt" | "normal";
                type Group = { type: GroupType; tasks: typeof COACH_TASKS[number][] };
                const groups: Group[] = [];
                for (const task of visibleTasks) {
                  const type: GroupType = recommended.includes(task.key) ? "rec"
                    : ("optional" in task && (task as { optional?: boolean }).optional) ? "opt"
                    : "normal";
                  if (!groups.length || groups[groups.length - 1].type !== type) {
                    groups.push({ type, tasks: [task] });
                  } else {
                    groups[groups.length - 1].tasks.push(task);
                  }
                }
                return (
                  <div key={wi} className="border-2 border-gray-100 rounded-xl p-3">
                    <div className="text-xs font-black text-navy mb-2">Week {wi + 1}</div>
                    <div className="space-y-1.5">
                      {groups.map((group, gi) => {
                        const taskRows = group.tasks.map(task => {
                          const checked = g.weeklyPlan[wi]?.includes(task.key) ?? false;
                          const example = "example" in task ? (task as { example?: string }).example : undefined;
                          return (
                            <div key={task.key}>
                              <label className="flex items-center gap-2 cursor-pointer group">
                                <input type="checkbox" checked={checked}
                                  onChange={() => toggleTask(t.teamId, wi, task.key)}
                                  className="accent-navy w-3.5 h-3.5 shrink-0 cursor-pointer" />
                                <span className={`text-xs leading-tight ${checked ? "text-navy font-semibold" : "text-navy/50"} group-hover:text-navy transition-colors`}>
                                  {task.label}
                                </span>
                              </label>
                              {example && (
                                <p className="ml-5 mt-0.5 text-[10px] italic text-navy/35 leading-tight">{example}</p>
                              )}
                            </div>
                          );
                        });
                        if (group.type === "rec") return (
                          <div key={gi} className="bg-blue-50 rounded-lg px-2 py-1.5 space-y-1.5">
                            {taskRows}
                            <div className="text-[10px] text-blue-400 font-bold uppercase tracking-wide pt-0.5">Recommended</div>
                          </div>
                        );
                        if (group.type === "opt") return (
                          <div key={gi} className="bg-amber-50 rounded-lg px-2 py-1.5 space-y-1.5">
                            {taskRows}
                            <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wide pt-0.5">Optional</div>
                          </div>
                        );
                        return <div key={gi} className="space-y-1.5">{taskRows}</div>;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function CoachRankingTable({ ranking, period }: { ranking: ReturnType<typeof Array.prototype.map>; period: string }) {
  const periodLabel = period === "week" ? "This Week" : period === "month" ? "Month" : period === "year" ? "Year" : "All Time";
  const extraCols = [
    { key: "participation", label: `Participation (${periodLabel})` },
    { key: "hasHomework", label: "Assign Homework" },
    { key: "hasContest", label: "Create a Team Contest" },
    { key: "hasPersonalGoal", label: "Set Player Goals" },
    { key: "hasChallenge", label: "Create Coach's Challenge" },
    { key: "score", label: "Score" },
  ];
  const [mobileCol, setMobileCol] = useState(0);
  const activeCol = extraCols[mobileCol];

  const renderMobileCell = (c: any) => {
    if (activeCol.key === "participation") return <span className={`font-bold ${c.participationRate >= 70 ? "text-green-600" : c.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{c.participationRate}%</span>;
    if (activeCol.key === "score") return <span className="font-black text-navy">{c.coachEngagementScore}/4</span>;
    return <CheckBadge val={c.engagementBreakdown[activeCol.key]} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
      {/* Mobile column cycler */}
      <div className="sm:hidden flex items-center gap-2 px-4 pt-3 pb-2">
        <button onClick={() => setMobileCol(i => (i - 1 + extraCols.length) % extraCols.length)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">‹</button>
        <span className="flex-1 text-center text-xs font-bold text-navy truncate">{activeCol.label}</span>
        <button onClick={() => setMobileCol(i => (i + 1) % extraCols.length)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">›</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-white text-left text-xs uppercase tracking-wide">
            <th className="px-4 py-3 text-center w-12">Rank</th>
            <th className="px-4 py-3">Coach</th>
            {/* Mobile: single active column */}
            <th className="px-4 py-3 text-center sm:hidden">{activeCol.label}</th>
            {/* Desktop: all columns */}
            {extraCols.map(col => (
              <th key={col.key} className="px-4 py-3 text-center hidden sm:table-cell">{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ranking.length === 0 ? (
            <tr><td colSpan={3} className="px-5 py-8 text-center text-navy/40">No coaches found.</td></tr>
          ) : ranking.map((c: any, i: number) => (
            <tr key={`${c.teamId}-${c.childId}`} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
              <td className="px-4 py-3.5 text-center">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black ${i === 0 ? "bg-yellow-400 text-white" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-orange-300 text-white" : "bg-gray-100 text-navy/50"}`}>{i + 1}</span>
              </td>
              <td className="px-4 py-3.5">
                <div className="font-bold text-navy">{c.name}</div>
                <div className="text-xs text-navy/50 mt-0.5">{c.teamName}</div>
              </td>
              {/* Mobile: single active column */}
              <td className="px-4 py-3.5 text-center sm:hidden">{renderMobileCell(c)}</td>
              {/* Desktop: all columns */}
              <td className="px-4 py-3.5 text-center hidden sm:table-cell">
                <span className={`font-bold ${c.participationRate >= 70 ? "text-green-600" : c.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{c.participationRate}%</span>
              </td>
              <td className="px-4 py-3.5 text-center hidden sm:table-cell"><CheckBadge val={c.engagementBreakdown.hasHomework} /></td>
              <td className="px-4 py-3.5 text-center hidden sm:table-cell"><CheckBadge val={c.engagementBreakdown.hasContest} /></td>
              <td className="px-4 py-3.5 text-center hidden sm:table-cell"><CheckBadge val={c.engagementBreakdown.hasPersonalGoal} /></td>
              <td className="px-4 py-3.5 text-center hidden sm:table-cell"><CheckBadge val={c.engagementBreakdown.hasChallenge} /></td>
              <td className="px-4 py-3.5 text-center hidden sm:table-cell"><span className="font-black text-navy">{c.coachEngagementScore}/4</span></td>
            </tr>
          ))}
        </tbody>
      </table>
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

const TABS = ["Overview"] as const;
type Tab = (typeof TABS)[number];

export default function TeamReportPage() {
  const { teamId } = useParams<{ teamId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [teams, setTeams] = useState<Team[]>([]);
  const [addedIds, setAddedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>(() => {
    if (typeof window === "undefined") return "Overview";
    const p = new URLSearchParams(window.location.search).get("tab") as Tab;
    return p && TABS.includes(p) ? p : "Overview";
  });
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [filterTeam, setFilterTeam] = useState("");
  const [period, setPeriod] = useState<"week" | "month" | "year" | "alltime">(() => {
    if (typeof window === "undefined") return "week";
    const p = new URLSearchParams(window.location.search).get("period");
    return (p && ["week", "month", "year", "alltime"].includes(p) ? p : "week") as "week" | "month" | "year" | "alltime";
  });
  const [playerSearch, setPlayerSearch] = useState("");
  const [showGoals, setShowGoals] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("view") === "goals");
  const [showHowTo, setShowHowTo] = useState(() => typeof window !== "undefined" && new URLSearchParams(window.location.search).get("view") === "howto");
  const [howToFilter, setHowToFilter] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

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
            onClick={() => {
              const next = !showGoals;
              setShowGoals(next);
              if (next) setShowHowTo(false);
              const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
              router.replace(buildParams(addedIds, seedId, { view: next ? "goals" : "" }), { scroll: false });
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${showGoals ? "bg-[#e63946] border-[#e63946] text-white" : "border-gray-200 text-navy/60 hover:border-navy/40 bg-white"}`}
          >
            🎯 Coach Goals
          </button>

          {/* How To toggle */}
          <button
            onClick={() => {
              const next = !showHowTo;
              setShowHowTo(next);
              if (next) setShowGoals(false);
              const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
              router.replace(buildParams(addedIds, seedId, { view: next ? "howto" : "" }), { scroll: false });
            }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${showHowTo ? "bg-navy border-navy text-white" : "border-gray-200 text-navy/60 hover:border-navy/40 bg-white"}`}
          >
            📋 How To
          </button>

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

        {showHowTo && (() => {
          const HOW_TO_STEPS = [
            { key: "homework", badge: "1", badgeBg: "bg-navy", badgeText: "text-white", title: "Assign Homework", type: "core",
              how: "Go to your coach's board. Pick the skill areas and folders you want to assign. We recommend keeping it simple — start with 30-day plans or the first folders in the full curriculum. Then next month, assign one of the recurring plans such as the Skill Builder Plan. If you have any questions, email megan@anytime-soccer.com.",
              when: "Do this immediately upon creating the team. You have to show the kids this is important.",
              where: "The coach's board is in the app — log in at app.anytime-soccer.com and you'll find it in the main navigation.",
              why: "Players who receive homework train 3× more often than those who don't. Assign it at the start of each week so players know exactly what to work on.",
              tip: "Not sure where to start? Email neil@anytime-soccer.com and he will assign your first homework on your behalf." },
            { key: "demo", badge: "2", badgeBg: "bg-navy", badgeText: "text-white", title: "Demo App In-Person", type: "core",
              how: "Pull up the app on your phone at practice. Walk players through finding their homework, logging a video, and checking their stats — live, in 2 minutes.",
              when: "First week of the season or at your first team meeting.",
              where: "Announce that you will do a demo, then do it after practice with your phone in hand.",
              why: "Seeing it live removes all friction. A quick in-person demo gets more players active than any email or link you can send.",
              tip: "Bring a Bluetooth speaker and do one of the videos at practice in real time so parents can see exactly how it works." },
            { key: "email", badge: "3", badgeBg: "bg-navy", badgeText: "text-white", title: "Send Email Reminder", type: "core",
              how: "Go to the **New Players** section and click Send Reminder. Then follow up using your team's communication system and include the onboarding link that was sent to help parents get started.",
              when: "After the first week, then send reminders using your discretion.",
              where: "**New Players** section within your team.",
              why: "Constant communication during the first two weeks is crucial to the program's success.",
              tip: "Nominate a parent or assistant coach to be a team liaison to help everyone get signed up during practice." },
            { key: "goals", badge: "4", badgeBg: "bg-navy", badgeText: "text-white", title: "Set Player Goals", type: "core",
              how: "Go to your **Team Hub** and click **Player Goals**. From there, enter a training goal for each period.",
              when: "When a player first joins the team.",
              where: "In the **Player Goals** section from the **Team Hub**.",
              why: "Players with personal goals are significantly more likely to stay active all season. Goals create internal motivation that outlasts any external push.",
              tip: undefined },
            { key: "recognition", badge: "5", badgeBg: "bg-navy", badgeText: "text-white", title: "Give Player Recognition", type: "core",
              how: "At practice, call out one player who trained at home that week. Be specific — mention what you noticed in their footwork or touches.",
              when: "Once per week at practice, consistently every week.",
              where: "In front of the whole team at practice.",
              why: "Public recognition tells every player that home training gets noticed. It's the fastest way to build a training culture that lasts.",
              tip: "Something as simple as letting a player be team captain for the day or pick teams in a scrimmage is all it takes to fuel a kid's motivation — the recognition doesn't have to be big to be powerful." },
            { key: "challenge", badge: "6", badgeBg: "bg-blue-100", badgeText: "text-blue-600", title: "Coach's Challenge", type: "rec",
              how: "Create a weekly challenge in the app for your team — set a video-count target that everyone competes toward.",
              when: "Set it once — after that it's recurring.",
              where: "From the **Team Hub**, click **Coach's Challenge** in the dropdown.",
              why: "Competition drives consistency. Players who are competing check back daily instead of training once and forgetting.",
              tip: undefined },
            { key: "contest", badge: "7", badgeBg: "bg-amber-100", badgeText: "text-amber-500", title: "Create a Team Contest", type: "opt",
              how: "Set up a season-long leaderboard contest with a prize for the top trainer — pizza party, gear, or a team trophy.",
              when: "Near the beginning of the season, once everyone becomes familiar with the app.",
              where: "From the **Team Hub**, click **Team Contest** in the dropdown.",
              why: "A team contest gives players a reason to stay consistent all season, not just in week one. It turns training into an ongoing game.",
              tip: undefined },
            { key: "levelgoal", badge: "8", badgeBg: "bg-amber-100", badgeText: "text-amber-500", title: "Set a Team Level Goal", type: "opt",
              how: "Go to your **Roster** and set a collective milestone for the team — e.g. \"log 1,000 videos this season.\" The more videos your team logs, the higher your team level climbs. Every level earns your team a new professional club name.",
              when: "When the team is created.",
              where: "In the **Roster**.",
              why: "Shared goals create team ownership. Players encourage each other and feel responsible for the collective result, not just their own training — and kids love reaching new levels.",
              tip: undefined },
          ];
          const visible = howToFilter ? HOW_TO_STEPS.filter(s => s.key === howToFilter) : HOW_TO_STEPS;
          return (
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm p-8 mb-6">
                <h2 className="text-2xl font-black text-navy mb-1">How To Use Your Coaching Plan</h2>
                <p className="text-sm text-navy/50 mb-1">Follow these steps week by week to drive player engagement and build great training habits on your team.</p>
                <p className="text-sm text-navy/40 mb-6">Questions? Email <a href="mailto:megan@anytime-soccer.com" className="text-[#e63946] font-semibold hover:underline">megan@anytime-soccer.com</a> or call <a href="tel:8034311082" className="text-[#e63946] font-semibold hover:underline">803-431-1082</a>.</p>

                {/* Pills */}
                <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
                  {HOW_TO_STEPS.map(s => {
                    const active = howToFilter === s.key;
                    const pillColor = s.type === "rec" ? (active ? "bg-blue-600 text-white border-blue-600" : "border-blue-200 text-blue-600 hover:bg-blue-50")
                      : s.type === "opt" ? (active ? "bg-amber-500 text-white border-amber-500" : "border-amber-200 text-amber-600 hover:bg-amber-50")
                      : (active ? "bg-navy text-white border-navy" : "border-gray-200 text-navy/60 hover:border-navy/40 hover:text-navy");
                    return (
                      <button key={s.key} onClick={() => { const next = active ? null : s.key; setHowToFilter(next); setExpandedStep(next); }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${pillColor}`}>
                        <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black ${active ? "bg-white/20" : s.badgeBg} ${active ? "text-white" : s.badgeText}`}>{s.badge}</span>
                        {s.title}
                      </button>
                    );
                  })}
                </div>

                {/* Steps */}
                <div className="space-y-2">
                  {visible.map(s => {
                    const open = expandedStep === s.key;
                    return (
                      <div key={s.key} className="border border-gray-100 rounded-xl overflow-hidden">
                        <button onClick={() => setExpandedStep(open ? null : s.key)}
                          className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                          <span className={`w-7 h-7 rounded-full ${s.badgeBg} ${s.badgeText} text-xs font-black flex items-center justify-center shrink-0`}>{s.badge}</span>
                          <span className="text-sm font-black text-navy flex-1">{s.title}</span>
                          <span className="text-navy/30 text-xs">{open ? "▴" : "▾"}</span>
                        </button>
                        {open && (
                          <div className="px-4 pb-4 pt-1 space-y-3 border-t border-gray-100">
                            {([["How", s.how], ["When", s.when], ["Where", s.where], ["Why", s.why]] as [string, string][]).map(([label, val], i, arr) => (
                              <div key={label}>
                                <div className="flex gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-navy w-10 pt-0.5 shrink-0">{label}</span>
                                  <p className="text-sm text-navy/60 leading-relaxed">{val.split(/(\*\*[^*]+\*\*)/).map((part, j) =>
                                    part.startsWith("**") && part.endsWith("**")
                                      ? <strong key={j} className="font-black text-navy">{part.slice(2, -2)}</strong>
                                      : part
                                  )}</p>
                                </div>
                                {i < arr.length - 1 && <div className="mt-3 border-b border-gray-100" />}
                              </div>
                            ))}
                            {s.tip && (
                              <div className="mt-2 flex gap-2 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
                                <span className="text-yellow-500 text-sm shrink-0">💡</span>
                                <p className="text-sm text-yellow-800 leading-relaxed"><span className="font-black">Pro Tip:</span> {s.tip}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })()}

        {!showHowTo && loading ? (
          <div className="text-center py-20 text-navy/40 font-medium">Loading...</div>
        ) : !showHowTo && teams.length === 0 ? (
          <div className="text-center py-20 text-navy/40 font-medium">No teams loaded.</div>
        ) : !showHowTo ? (
          <>
            {/* OVERVIEW TAB */}
            {tab === "Overview" && !showGoals && (
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

              {/* Coach ranking */}
              <div className="mb-4">
                <CoachRankingTable ranking={filteredRanking} period={period} />
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
        ) : null}
      </div>
    </main>
  );
}
