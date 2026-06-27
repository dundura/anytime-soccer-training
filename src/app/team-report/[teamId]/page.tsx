"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const API = "https://api.anytime-soccer.com/api/public/team-report";

// Club/org slugs â†’ list of team IDs (add more teams per org as needed)
const CLUB_SLUGS: Record<string, number[]> = {
  pacificfc: [846],
};

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
  hasPersonalChallenge: number;
  eng_email: number;
  eng_demo: number;
  eng_personal_challenge: number;
  eng_level_goal: number;
  eng_recognition: number;
  eng_mvp: number;
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
    ? <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 font-black text-sm">âœ“</span>
    : <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-100 text-red-500 font-black text-sm">âœ•</span>;
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
        {saving ? "Savingâ€¦" : "Save"}
      </button>
      <button onClick={() => setEditing(false)} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}

const CHECKLIST_ITEMS: Array<{ num: number; key: string; label: string; auto: boolean; link?: string }> = [
  { num: 1,  key: "hasHomework",            label: "Assign Homework",                     auto: true,  link: "https://app.anytime-soccer.com/teams/dashboard?nav=coach-board" },
  { num: 2,  key: "eng_email_reminder",    label: "Send Email Reminder",                 auto: false },
  { num: 3,  key: "eng_demo",              label: "Demo App In-Person",                  auto: false },
  { num: 4,  key: "hasPersonalGoal",       label: "Set Player Goals",                    auto: true,  link: "https://app.anytime-soccer.com/teams/dashboard?nav=players" },
  { num: 5,  key: "hasChallenge",          label: "Create Coach's Challenge",            auto: true,  link: "https://app.anytime-soccer.com/teams/dashboard?nav=challenge" },
  { num: 6,  key: "eng_personal_challenge", label: "Create a Personal Challenge",       auto: false },
  { num: 7,  key: "hasContest",            label: "Create a Team Contest",               auto: true,  link: "https://app.anytime-soccer.com/teams/dashboard?nav=contest" },
  { num: 8,  key: "eng_level_goal",        label: "Set Team Level Goal",                 auto: false },
  { num: 9,  key: "eng_recognition",       label: "Give Player Recognition in Practice", auto: false },
  { num: 10, key: "eng_mvp",               label: "Nominate an MVP",                     auto: false },
];

function HowToContent() {
  const [howToFilter, setHowToFilter] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const HOW_TO_STEPS = [
    { key: "homework", badge: "1", badgeBg: "bg-navy", badgeText: "text-white", title: "Assign Homework", type: "core",
      how: "Go to your coach's board. Pick the skill areas and folders you want to assign. We recommend keeping it simple â€” start with 30-day plans or the first folders in the full curriculum. Then next month, assign one of the recurring plans such as the Skill Builder Plan. If you have any questions, email megan@anytime-soccer.com.",
      when: "Do this immediately upon creating the team. You have to show the kids this is important.",
      where: "The coach's board is in the app â€” log in at app.anytime-soccer.com and you'll find it in the main navigation.",
      why: "Players who receive homework train 3Ã— more often than those who don't. Assign it at the start of each week so players know exactly what to work on.",
      tip: "Not sure where to start? Email neil@anytime-soccer.com and he will assign your first homework on your behalf." },
    { key: "demo", badge: "2", badgeBg: "bg-navy", badgeText: "text-white", title: "Demo App In-Person", type: "core",
      how: "Pull up the app on your phone at practice. Walk players through finding their homework, logging a video, and checking their stats â€” live, in 2 minutes.",
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
      how: "At practice, call out one player who trained at home that week. Be specific â€” mention what you noticed in their footwork or touches.",
      when: "Once per week at practice, consistently every week.",
      where: "In front of the whole team at practice.",
      why: "Public recognition tells every player that home training gets noticed. It's the fastest way to build a training culture that lasts.",
      tip: "Something as simple as letting a player be team captain for the day or pick teams in a scrimmage is all it takes to fuel a kid's motivation â€” the recognition doesn't have to be big to be powerful." },
    { key: "challenge", badge: "6", badgeBg: "bg-navy", badgeText: "text-white", title: "Create Coach's Challenge", type: "rec",
      how: "Create a weekly challenge in the app for your team â€” set a video-count target that everyone competes toward.",
      when: "Set it once â€” after that it's recurring.",
      where: "From the **Team Hub**, click **Coach's Challenge** in the dropdown.",
      why: "Competition drives consistency. Players who are competing check back daily instead of training once and forgetting.",
      tip: undefined },
    { key: "personalChallenge", badge: "7", badgeBg: "bg-navy", badgeText: "text-white", title: "Create a Personal Challenge", type: "rec",
      how: "Set up a challenge just for one player â€” give them a specific target to hit on their own, separate from the team challenge.",
      when: "Any time you want to give an individual player extra motivation.",
      where: "From the **Team Hub**, click **Coach's Challenge** in the dropdown and assign it to a single player.",
      why: "Personal challenges meet players where they are. A tailored goal feels more achievable and more meaningful than a group target.",
      tip: undefined },
    { key: "contest", badge: "8", badgeBg: "bg-navy", badgeText: "text-white", title: "Create a Team Contest", type: "opt",
      how: "Set up a season-long leaderboard contest with a prize for the top trainer â€” pizza party, gear, or a team trophy.",
      when: "Near the beginning of the season, once everyone becomes familiar with the app.",
      where: "From the **Team Hub**, click **Team Contest** in the dropdown.",
      why: "A team contest gives players a reason to stay consistent all season, not just in week one. It turns training into an ongoing game.",
      tip: undefined },
    { key: "levelgoal", badge: "9", badgeBg: "bg-navy", badgeText: "text-white", title: "Set a Team Level Goal", type: "opt",
      how: "Go to your **Roster** and set a collective milestone for the team â€” e.g. \"log 1,000 videos this season.\" The more videos your team logs, the higher your team level climbs. Every level earns your team a new professional club name.",
      when: "When the team is created.",
      where: "In the **Roster**.",
      why: "Shared goals create team ownership. Players encourage each other and feel responsible for the collective result, not just their own training â€” and kids love reaching new levels.",
      tip: undefined },
  ];
  const visible = howToFilter ? HOW_TO_STEPS.filter(s => s.key === howToFilter) : HOW_TO_STEPS;
  return (
    <div>
      <div className="p-6">
        <h2 className="text-2xl font-black text-navy mb-1">How to Increase Engagement</h2>
        <p className="text-sm text-navy/50 mb-1">Follow these steps week by week to drive player engagement and build great training habits on your team.</p>
        <p className="text-sm text-navy/40 mb-6">Questions? Email <a href="mailto:megan@anytime-soccer.com" className="text-[#e63946] font-semibold hover:underline">megan@anytime-soccer.com</a> or call <a href="tel:8034311082" className="text-[#e63946] font-semibold hover:underline">803-431-1082</a>.</p>
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
          {HOW_TO_STEPS.map(s => {
            const active = howToFilter === s.key;
            const pillColor = s.type === "rec" ? (active ? "bg-blue-600 text-white border-blue-600" : "border-blue-200 text-navy hover:bg-blue-50")
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
        <div className="space-y-2">
          {visible.map(s => {
            const open = expandedStep === s.key;
            return (
              <div key={s.key} className="border border-gray-100 rounded-xl overflow-hidden">
                <button onClick={() => setExpandedStep(open ? null : s.key)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left">
                  <span className={`w-7 h-7 rounded-full ${s.badgeBg} ${s.badgeText} text-xs font-black flex items-center justify-center shrink-0`}>{s.badge}</span>
                  <span className="text-sm font-black text-navy flex-1">{s.title}</span>
                  <span className="text-navy/30 text-xs">{open ? "â–´" : "â–¾"}</span>
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
                        <span className="text-yellow-500 text-sm shrink-0">ðŸ’¡</span>
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
}

type GoalsPanelProps = {
  teams: Team[];
  onUpdate: (teamId: number, patch: Partial<Pick<Team, "participationGoal" | "videosPerPlayerGoal" | "coachWeeklyPlan">>) => void;
  period: string;
};

type EmailForm = { mode: "manager" | "custom"; selectedId: number | null; firstName: string; email: string; sending: boolean; sent: boolean };

const PAGE_SIZE = 10;

function CoachEngagementView({ ranking, period, teams, onUpdate }: { ranking: any[]; period: string; teams: Team[]; onUpdate: GoalsPanelProps["onUpdate"] }) {
  const [emailForms, setEmailForms] = useState<Record<number, EmailForm | null>>({});
  const [showHowTo, setShowHowTo] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [actionTeamId, setActionTeamId] = useState<number | null>(null);
  const [mobileColIdx, setMobileColIdx] = useState(0);
  const [goals, setGoals] = useState<{ participation: string; videosPerMonth: string }>(() => {
    if (typeof window === "undefined") return { participation: "", videosPerMonth: "" };
    try { const s = localStorage.getItem("doc-engagement-goals"); return s ? JSON.parse(s) : { participation: "", videosPerMonth: "" }; } catch { return { participation: "", videosPerMonth: "" }; }
  });

  const saveGoal = (key: keyof typeof goals, val: string) => {
    const next = { ...goals, [key]: val };
    setGoals(next);
    localStorage.setItem("doc-engagement-goals", JSON.stringify(next));
  };

  const totalPages = Math.ceil(teams.length / PAGE_SIZE);
  const visibleTeams = showAll ? teams : teams.slice(pageIndex * PAGE_SIZE, (pageIndex + 1) * PAGE_SIZE);

  const isChecked = (t: Team, item: (typeof CHECKLIST_ITEMS)[number]) => {
    return !!(t.engagementBreakdown as unknown as Record<string, number>)[item.key];
  };

  const resolvedRecipient = (t: Team, form: EmailForm) => {
    if (form.mode === "manager" && form.selectedId != null) {
      const coach = t.coaches.find(c => c.childId === form.selectedId);
      return { firstName: coach?.name?.split(" ")[0] || "", email: (coach as any)?.email || "" };
    }
    return { firstName: form.firstName, email: form.email };
  };

  const sendEmailPlan = async (t: Team) => {
    const form = emailForms[t.teamId];
    if (!form) return;
    const { firstName, email } = resolvedRecipient(t, form);
    if (!email) return;
    setEmailForms(f => ({ ...f, [t.teamId]: { ...form, sending: true } }));
    try {
      const res = await fetch(`${API}/${t.teamId}/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, period }),
      });
      if (!res.ok) throw new Error(await res.text());
      setEmailForms(f => ({ ...f, [t.teamId]: { ...form, sending: false, sent: true } }));
      setTimeout(() => setEmailForms(f => ({ ...f, [t.teamId]: null })), 3000);
    } catch (err) {
      alert(`Failed to send: ${err instanceof Error ? err.message : "Server error"}`);
      setEmailForms(f => ({ ...f, [t.teamId]: { ...form, sending: false } }));
    }
  };

  if (!teams.length) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {teams.length > PAGE_SIZE && (
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              {!showAll && (
                <>
                  <button
                    onClick={() => setPageIndex(i => Math.max(0, i - 1))}
                    disabled={pageIndex === 0}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border-2 border-gray-200 text-navy/50 hover:border-navy/30 hover:text-navy disabled:opacity-30 transition-colors"
                  >← Prev</button>
                  <span className="text-xs text-gray-400 font-medium">{pageIndex + 1} / {totalPages}</span>
                  <button
                    onClick={() => setPageIndex(i => Math.min(totalPages - 1, i + 1))}
                    disabled={pageIndex === totalPages - 1}
                    className="text-xs font-bold px-2.5 py-1 rounded-lg border-2 border-gray-200 text-navy/50 hover:border-navy/30 hover:text-navy disabled:opacity-30 transition-colors"
                  >Next →</button>
                </>
              )}
            </div>
            <button
              onClick={() => { setShowAll(a => !a); setPageIndex(0); }}
              className="text-xs font-bold text-[#e63946] hover:underline"
            >{showAll ? "Show less" : `Show all ${teams.length}`}</button>
          </div>
        )}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-dashed border-gray-200 bg-gray-50/40 flex-wrap">
          <span className="text-[10px] font-bold text-navy/30 uppercase tracking-widest shrink-0">Goals</span>
          <div className="flex items-center gap-1.5">
            <input type="number" min="0" max="100" value={goals.participation} onChange={e => saveGoal("participation", e.target.value)}
              placeholder="70"
              className="w-12 text-center border-2 border-gray-200 rounded-lg px-1 py-1 text-sm font-bold text-navy focus:outline-none focus:border-navy" />
            <span className="text-xs text-gray-400">% participation</span>
          </div>
          <div className="flex items-center gap-1.5">
            <input type="number" min="0" value={goals.videosPerMonth} onChange={e => saveGoal("videosPerMonth", e.target.value)}
              placeholder="8"
              className="w-12 text-center border-2 border-gray-200 rounded-lg px-1 py-1 text-sm font-bold text-navy focus:outline-none focus:border-navy" />
            <span className="text-xs text-gray-400">vid/mo avg/player</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <select
              value={actionTeamId ?? ""}
              onChange={e => setActionTeamId(e.target.value ? Number(e.target.value) : null)}
              className="border-2 border-gray-200 rounded-lg px-2 py-1 text-xs font-medium text-navy bg-white focus:outline-none focus:border-navy"
            >
              <option value="">Select team…</option>
              {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
            </select>
            <button
              disabled={!actionTeamId}
              onClick={() => { if (!actionTeamId) return; const t = teams.find(x => x.teamId === actionTeamId); if (!t) return; setEmailForms(f => ({ ...f, [actionTeamId]: f[actionTeamId] ? null : { mode: "manager", selectedId: t.coaches[0]?.childId ?? null, firstName: "", email: "", sending: false, sent: false } })); }}
              className="text-xs font-bold border border-[#e63946] text-[#e63946] px-2.5 py-1 rounded-lg hover:bg-[#e63946]/5 disabled:opacity-30 transition-colors">✉ Email</button>
            <button
              disabled={!actionTeamId}
              onClick={() => { if (!actionTeamId) return; const params = new URLSearchParams({ period }); if (goals.participation) params.set("participation_goal", goals.participation); if (goals.videosPerMonth) params.set("videos_goal", goals.videosPerMonth); window.open(`${API}/${actionTeamId}/pdf?${params}`, "_blank"); }}
              className="text-xs font-bold border border-gray-200 text-navy/50 px-2.5 py-1 rounded-lg hover:border-navy/30 hover:text-navy disabled:opacity-30 transition-colors">↓ PDF</button>
          </div>
        </div>
        {/* Mobile column cycler */}
        {(() => {
          const mobileCols = [
            { key: "score", label: "Score" },
            { key: "participation", label: "Participation" },
            { key: "weeklyTraining", label: "Weekly Training" },
            ...CHECKLIST_ITEMS.map(item => ({ key: item.key, label: `${item.num}. ${item.label}` })),
          ];
          const activeCol = mobileCols[mobileColIdx];
          const renderMobileCell = (t: Team) => {
            const pGoal = goals.participation ? parseInt(goals.participation) : null;
            const totalTime = t.players.reduce((s, p) => s + p.trainingMinutes, 0);
            if (activeCol.key === "score") { const s = CHECKLIST_ITEMS.filter(item => isChecked(t, item)).length; const pct = Math.round((s / CHECKLIST_ITEMS.length) * 100); return <span className={`text-sm font-bold ${pct >= 80 ? "text-green-600" : pct >= 40 ? "text-yellow-600" : "text-red-500"}`}>{pct}%</span>; }
            if (activeCol.key === "participation") return <span className={`text-sm font-bold ${pGoal ? (t.participationRate >= pGoal ? "text-green-600" : "text-red-500") : t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{t.participationRate}%</span>;
            if (activeCol.key === "weeklyTraining") return <span className="text-sm font-bold text-navy">{formatTime(totalTime)}</span>;
            const item = CHECKLIST_ITEMS.find(it => it.key === activeCol.key);
            if (!item) return null;
            const done = isChecked(t, item);
            return <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-300"}`}>{done ? "✓" : "○"}</span>;
          };
          return (
            <>
              <div className="sm:hidden flex items-center gap-2 px-4 pt-3 pb-2">
                <button onClick={() => setMobileColIdx(i => (i - 1 + mobileCols.length) % mobileCols.length)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">{"<"}</button>
                <span className="flex-1 text-center text-xs font-bold text-navy truncate">{activeCol.label}</span>
                <button onClick={() => setMobileColIdx(i => (i + 1) % mobileCols.length)}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">{">"}</button>
              </div>
              <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="sticky left-0 bg-white z-10" />
                    <th className="sm:hidden" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell px-3 py-2 text-center text-xs font-black text-navy uppercase tracking-wide border-l border-gray-100 bg-navy/5" colSpan={CHECKLIST_ITEMS.length}>Coach Engagement Tracker</th>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <th className="sticky left-0 bg-white z-10" />
                    <th className="sm:hidden" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell" />
                    <th className="hidden sm:table-cell px-3 py-1 text-center text-[9px] font-black text-emerald-700 uppercase tracking-widest border-l border-gray-100 bg-emerald-50/70" colSpan={3}>Getting Started</th>
                    <th className="hidden sm:table-cell px-3 py-1 text-center text-[9px] font-black text-blue-700 uppercase tracking-widest border-l border-gray-100 bg-blue-50/70" colSpan={3}>Promoting Competitions</th>
                    <th className="hidden sm:table-cell px-3 py-1 text-center text-[9px] font-black text-purple-700 uppercase tracking-widest border-l border-gray-100 bg-purple-50/70" colSpan={CHECKLIST_ITEMS.length - 6}>Team Culture</th>
                  </tr>
                  <tr className="border-b-2 border-gray-100">
                    <th className="px-4 py-3 text-left text-xs font-bold text-navy/40 uppercase tracking-wide sticky left-0 bg-white z-10" style={{ minWidth: "160px" }}>Team</th>
                    {/* Mobile: active column only */}
                    <th className="sm:hidden px-3 py-3 text-center border-l border-gray-100 text-xs font-bold text-navy/40 uppercase tracking-wide">{activeCol.label}</th>
                    {/* Desktop: all columns */}
                    <th className="hidden sm:table-cell px-3 py-3 text-center border-l border-gray-100 text-xs font-bold text-navy/40 uppercase tracking-wide" style={{ minWidth: "70px" }}>Score</th>
                    <th className="hidden sm:table-cell px-3 py-3 text-center border-l border-gray-100 text-xs font-bold text-navy/40 uppercase tracking-wide" style={{ minWidth: "80px" }}>Participation</th>
                    <th className="hidden sm:table-cell px-3 py-3 text-center border-l border-gray-100 text-xs font-bold text-navy/40 uppercase tracking-wide" style={{ minWidth: "90px" }}>Weekly Training</th>
                    {CHECKLIST_ITEMS.map(item => (
                      <th key={item.key} className="hidden sm:table-cell px-2 py-3 text-center border-l border-gray-100 align-top" style={{ minWidth: "90px" }}>
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-xs font-black text-navy/40">{item.num}</span>
                          <span className="text-[9px] font-semibold text-navy/40 leading-tight text-center px-0.5">{item.label}</span>
                          {item.auto && <span className="text-[8px] bg-gray-100 text-navy/30 rounded px-1 font-bold leading-tight">A</span>}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visibleTeams.map((t, i) => {
                    const totalTime = t.players.reduce((s, p) => s + p.trainingMinutes, 0);
                    const pGoal = goals.participation ? parseInt(goals.participation) : null;
                    return (
                      <tr key={t.teamId} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/60"}>
                        <td className="px-4 py-3 border-b border-gray-50 sticky left-0 z-10" style={{ background: i % 2 === 0 ? "#fff" : "#f9fafb" }}>
                          <div className="font-black text-navy text-sm leading-tight">{t.teamName}</div>
                          {t.coaches.length > 0 && (
                            <div className="text-[10px] text-navy/40 mt-0.5">{t.coaches.map(c => c.name).join(", ")}</div>
                          )}
                        </td>
                        {/* Mobile: active column only */}
                        <td className="sm:hidden px-3 py-3 border-b border-gray-50 border-l border-l-gray-100 text-center">{renderMobileCell(t)}</td>
                        {/* Desktop: all columns */}
                        <td className="hidden sm:table-cell px-3 py-3 border-b border-gray-50 border-l border-l-gray-100 text-center">
                          {(() => { const s = CHECKLIST_ITEMS.filter(item => isChecked(t, item)).length; const pct = Math.round((s / CHECKLIST_ITEMS.length) * 100); return <span className={`text-sm font-bold ${pct >= 80 ? "text-green-600" : pct >= 40 ? "text-yellow-600" : "text-red-500"}`}>{pct}%</span>; })()}
                        </td>
                        <td className="hidden sm:table-cell px-3 py-3 border-b border-gray-50 border-l border-l-gray-100 text-center">
                          <span className={`text-sm font-bold ${pGoal ? (t.participationRate >= pGoal ? "text-green-600" : "text-red-500") : t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>{t.participationRate}%</span>
                        </td>
                        <td className="hidden sm:table-cell px-3 py-3 border-b border-gray-50 border-l border-l-gray-100 text-center">
                          <span className="text-sm font-bold text-navy">{formatTime(totalTime)}</span>
                        </td>
                        {CHECKLIST_ITEMS.map(item => {
                          const done = isChecked(t, item);
                          return (
                            <td key={item.key} className="hidden sm:table-cell px-2 py-3 border-b border-gray-50 border-l border-l-gray-100 text-center">
                              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${done ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-300"}`}>
                                {done ? "✓" : "○"}
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              </div>
            </>
          );
        })()}

        {/* Email form — single active team */}
        {teams.map(t => {
          const form = emailForms[t.teamId];
          if (!form) return null;
          return (
            <div key={t.teamId} className="px-5 py-4 bg-red-50 border-t border-red-100">
              <p className="text-xs font-black text-navy mb-2">Send plan to — {t.teamName}</p>
              {form.sent ? (
                <p className="text-sm font-bold text-green-600">✓ Email sent!</p>
              ) : (
                <div className="space-y-2">
                  {t.coaches.filter(c => c.email).map(c => (
                    <label key={c.childId} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name={`email-${t.teamId}`}
                        checked={form.mode === "manager" && form.selectedId === c.childId}
                        onChange={() => setEmailForms(f => ({ ...f, [t.teamId]: { ...form, mode: "manager", selectedId: c.childId } }))}
                        className="accent-[#e63946]" />
                      <span className="text-sm text-navy">{c.name}</span>
                    </label>
                  ))}
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`email-${t.teamId}`}
                      checked={form.mode === "custom"}
                      onChange={() => setEmailForms(f => ({ ...f, [t.teamId]: { ...form, mode: "custom", selectedId: null } }))}
                      className="accent-[#e63946]" />
                    <span className="text-sm text-navy">Other</span>
                  </label>
                  {form.mode === "custom" && (
                    <div className="flex flex-wrap gap-2 pl-5">
                      <input type="text" placeholder="First name" value={form.firstName}
                        onChange={e => setEmailForms(f => ({ ...f, [t.teamId]: { ...form, firstName: e.target.value } }))}
                        className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-32 focus:outline-none focus:border-navy" />
                      <input type="email" placeholder="Email address" value={form.email}
                        onChange={e => setEmailForms(f => ({ ...f, [t.teamId]: { ...form, email: e.target.value } }))}
                        className="border-2 border-gray-200 rounded-lg px-3 py-1.5 text-sm w-48 focus:outline-none focus:border-navy" />
                    </div>
                  )}
                  <button onClick={() => sendEmailPlan(t)}
                    disabled={form.sending || !resolvedRecipient(t, form).email}
                    className="text-sm font-bold bg-[#e63946] text-white px-4 py-1.5 rounded-lg disabled:opacity-40 hover:bg-[#c1121f] transition-colors">
                    {form.sending ? "Sending..." : "Send"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <div className="px-4 py-2 text-[10px] text-[#e63946] border-t border-gray-100">
          Engagement reflects actual in-app activity — to update Goals, visit the New Players tab within your team.
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <button onClick={() => setShowHowTo(h => !h)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors">
          <span className="font-black text-navy text-sm">How to Increase Engagement</span>
          <span className="text-navy/30 text-xs">{showHowTo ? "▴" : "▾"}</span>
        </button>
        {showHowTo && <HowToContent />}
      </div>
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
          className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">â€¹</button>
        <span className="flex-1 text-center text-xs font-bold text-navy truncate">{activeCol.label}</span>
        <button onClick={() => setMobileCol(i => (i + 1) % extraCols.length)}
          className="w-7 h-7 flex items-center justify-center rounded-lg border-2 border-gray-200 text-navy/60 font-bold hover:border-navy/40 transition-colors text-sm">â€º</button>
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
        className="w-full bg-navy/5 border-b border-gray-100 px-5 py-3 text-left hover:bg-navy/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-navy/40 text-xs">{isOpen ? "v" : ">"}</span>
          <span className="font-black text-navy text-sm">{t.teamName}</span>
          {t.createdAt && <span className="text-xs text-gray-400">({formatDate(t.createdAt)})</span>}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 pl-5">
          <span className="text-xs text-navy/50 font-semibold">{t.activePlayerCount} players</span>
          <span className={`text-xs font-bold ${t.participationRate >= 70 ? "text-green-600" : t.participationRate >= 40 ? "text-yellow-600" : "text-red-500"}`}>
            {t.participationRate}% participation
          </span>
        </div>
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
  const [yearFilter, setYearFilter] = useState<string>("");
  const [filterTeam, setFilterTeam] = useState("");
  const [period, setPeriod] = useState<"week" | "month" | "year" | "alltime">(() => {
    if (typeof window === "undefined") return "week";
    const p = new URLSearchParams(window.location.search).get("period");
    return (p && ["week", "month", "year", "alltime"].includes(p) ? p : "week") as "week" | "month" | "year" | "alltime";
  });
  const [playerSearch, setPlayerSearch] = useState("");
  const [showGoals, setShowGoals] = useState(() => searchParams.get("view") === "goals");
  const [showHowTo, setShowHowTo] = useState(() => searchParams.get("view") === "howto");
  const [howToFilter, setHowToFilter] = useState<string | null>(null);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const fetchTeams = useCallback(async (ids: number[], p = "alltime", initialLoad = false) => {
    if (!ids.length) return;
    if (initialLoad) setLoading(true);
    try {
      const res = await fetch(`${API}?teams=${ids.join(",")}&period=${p}`);
      const data = await res.json();
      setTeams(data.teams || []);
    } catch (e) { console.error(e); }
    if (initialLoad) setLoading(false);
  }, []);

  // Init: resolve slug/ID from URL, plus any ?add= params
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      let seedId: number | null = null;

      let clubIds: number[] | null = null;
      if (/^\d+$/.test(teamId)) {
        seedId = parseInt(teamId);
      } else if (CLUB_SLUGS[teamId]) {
        clubIds = CLUB_SLUGS[teamId];
      } else {
        try {
          const res = await fetch(`${API}/by-slug/${teamId}`);
          const data = await res.json();
          if (data.teams?.[0]) seedId = data.teams[0].teamId;
        } catch {}
      }

      const extra = (searchParams.get("add") || "").split(",").map(Number).filter(n => n > 0);
      const merged = Array.from(new Set([...(clubIds ?? (seedId ? [seedId] : [])), ...extra]));
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId]);

  // Search
  useEffect(() => {
    if (search.length < 2) { setSearchResults([]); return; }
    const timeout = setTimeout(async () => {
      setSearchLoading(true);
      try {
        const url = `${API}/search?q=${encodeURIComponent(search)}${yearFilter ? `&year=${yearFilter}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();
        setSearchResults(data.teams || []);
      } catch {}
      setSearchLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, yearFilter]);

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
    setShowGoals(false);
    setShowHowTo(false);
    const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0);
    router.replace(buildParams(addedIds, seedId, { tab: t === "Overview" ? "" : t, view: "" }), { scroll: false });
  };

  return (
    <main className="min-h-screen bg-[#f5f7fa]">
      <div className="bg-navy text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black uppercase tracking-tight">DOC Team Report</h1>
          <p className="text-white/60 text-sm mt-1">Director of Coaching dashboard â€” coach rankings &amp; player engagement</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search + Add Teams */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <select
              value={yearFilter}
              onChange={e => { setYearFilter(e.target.value); setSearchResults([]); }}
              className="border-2 border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-navy text-navy font-medium bg-white"
            >
              <option value="">All years</option>
              {Array.from({ length: new Date().getFullYear() - 2019 }, (_, i) => new Date().getFullYear() - i).map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
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
                  <button onClick={() => removeTeam(t.teamId)} className="hover:text-red transition-colors text-navy/50 ml-0.5">&times;</button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Single controls row */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Main view buttons */}
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm">
            <button
              onClick={() => { const next = !showGoals; setShowGoals(next); setShowHowTo(false); const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0); router.replace(buildParams(addedIds, seedId, { view: next ? "goals" : "" }), { scroll: false }); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${showGoals ? "bg-[#e63946] text-white shadow" : "text-navy/60 hover:text-navy"}`}
            >
              Coach Engagement
            </button>
            <button
              onClick={() => { setShowGoals(false); setShowHowTo(false); const seedId = /^\d+$/.test(teamId) ? parseInt(teamId) : (teams[0]?.teamId ?? 0); router.replace(buildParams(addedIds, seedId, { view: "" }), { scroll: false }); }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${!showGoals && !showHowTo ? "bg-navy text-white shadow" : "text-navy/60 hover:text-navy"}`}
            >
              Player Engagement
            </button>
          </div>

          {/* Team filter */}
          {teams.length > 1 && (
            <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)} className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm font-medium text-navy bg-white focus:outline-none focus:border-navy">
              <option value="">All Teams</option>
              {teams.map(t => <option key={t.teamId} value={t.teamId}>{t.teamName}</option>)}
            </select>
          )}

          {/* Player search (player engagement only) */}
          {!showGoals && (
            <input
              type="text"
              placeholder="Search players..."
              value={playerSearch}
              onChange={e => setPlayerSearch(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-navy bg-white w-40"
            />
          )}
        </div>

        {/* Period pills â€” player engagement only */}
        {!showGoals && (
          <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm mb-4 w-fit">
            {(["week", "month", "year", "alltime"] as const).map(p => (
              <button key={p} onClick={() => changePeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${period === p ? "bg-navy text-white shadow" : "text-navy/50 hover:text-navy"}`}>
                {p === "alltime" ? "All Time" : p === "year" ? "Year" : p === "month" ? "Month" : "Week"}
              </button>
            ))}
          </div>
        )}

        {showGoals && (
          <CoachEngagementView
            ranking={filteredRanking}
            period={period}
            teams={filteredTeams}
            onUpdate={(tid, patch) => updateGoal(tid, patch as Partial<Pick<Team, "participationGoal" | "videosPerPlayerGoal" | "coachWeeklyPlan">>)}
          />
        )}

        {false && (() => {
          const HOW_TO_STEPS = [
            { key: "homework", badge: "1", badgeBg: "bg-navy", badgeText: "text-white", title: "Assign Homework", type: "core",
              how: "Go to your coach's board. Pick the skill areas and folders you want to assign. We recommend keeping it simple â€” start with 30-day plans or the first folders in the full curriculum. Then next month, assign one of the recurring plans such as the Skill Builder Plan. If you have any questions, email megan@anytime-soccer.com.",
              when: "Do this immediately upon creating the team. You have to show the kids this is important.",
              where: "The coach's board is in the app â€” log in at app.anytime-soccer.com and you'll find it in the main navigation.",
              why: "Players who receive homework train 3Ã— more often than those who don't. Assign it at the start of each week so players know exactly what to work on.",
              tip: "Not sure where to start? Email neil@anytime-soccer.com and he will assign your first homework on your behalf." },
            { key: "demo", badge: "2", badgeBg: "bg-navy", badgeText: "text-white", title: "Demo App In-Person", type: "core",
              how: "Pull up the app on your phone at practice. Walk players through finding their homework, logging a video, and checking their stats â€” live, in 2 minutes.",
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
              how: "At practice, call out one player who trained at home that week. Be specific â€” mention what you noticed in their footwork or touches.",
              when: "Once per week at practice, consistently every week.",
              where: "In front of the whole team at practice.",
              why: "Public recognition tells every player that home training gets noticed. It's the fastest way to build a training culture that lasts.",
              tip: "Something as simple as letting a player be team captain for the day or pick teams in a scrimmage is all it takes to fuel a kid's motivation â€” the recognition doesn't have to be big to be powerful." },
            { key: "challenge", badge: "6", badgeBg: "bg-navy", badgeText: "text-white", title: "Create Coach's Challenge", type: "rec",
              how: "Create a weekly challenge in the app for your team â€” set a video-count target that everyone competes toward.",
              when: "Set it once â€” after that it's recurring.",
              where: "From the **Team Hub**, click **Coach's Challenge** in the dropdown.",
              why: "Competition drives consistency. Players who are competing check back daily instead of training once and forgetting.",
              tip: undefined },
            { key: "personalChallenge", badge: "7", badgeBg: "bg-navy", badgeText: "text-white", title: "Create a Personal Challenge", type: "rec",
              how: "Set up a challenge just for one player â€” give them a specific target to hit on their own, separate from the team challenge.",
              when: "Any time you want to give an individual player extra motivation.",
              where: "From the **Team Hub**, click **Coach's Challenge** in the dropdown and assign it to a single player.",
              why: "Personal challenges meet players where they are. A tailored goal feels more achievable and more meaningful than a group target.",
              tip: undefined },
            { key: "contest", badge: "8", badgeBg: "bg-navy", badgeText: "text-white", title: "Create a Team Contest", type: "opt",
              how: "Set up a season-long leaderboard contest with a prize for the top trainer â€” pizza party, gear, or a team trophy.",
              when: "Near the beginning of the season, once everyone becomes familiar with the app.",
              where: "From the **Team Hub**, click **Team Contest** in the dropdown.",
              why: "A team contest gives players a reason to stay consistent all season, not just in week one. It turns training into an ongoing game.",
              tip: undefined },
            { key: "levelgoal", badge: "9", badgeBg: "bg-navy", badgeText: "text-white", title: "Set a Team Level Goal", type: "opt",
              how: "Go to your **Roster** and set a collective milestone for the team â€” e.g. \"log 1,000 videos this season.\" The more videos your team logs, the higher your team level climbs. Every level earns your team a new professional club name.",
              when: "When the team is created.",
              where: "In the **Roster**.",
              why: "Shared goals create team ownership. Players encourage each other and feel responsible for the collective result, not just their own training â€” and kids love reaching new levels.",
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
                    const pillColor = s.type === "rec" ? (active ? "bg-blue-600 text-white border-blue-600" : "border-blue-200 text-navy hover:bg-blue-50")
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
                          <span className="text-navy/30 text-xs">{open ? "â–´" : "â–¾"}</span>
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
                                <span className="text-yellow-500 text-sm shrink-0">ðŸ’¡</span>
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

        {loading ? (
          <div className="text-center py-20 text-navy/40 font-medium">Loading...</div>
        ) : teams.length === 0 ? (
          <div className="text-center py-20 text-navy/40 font-medium">No teams loaded.</div>
        ) : (
          <>
            {/* OVERVIEW TAB */}
            {!showGoals && (
              <>
              {/* Summary cards */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4">
                {[
                  { label: "Total Players", value: totalPlayers.toLocaleString() },
                  { label: "Total Videos", value: totalVideos.toLocaleString() },
                  { label: "Total Training Time", value: formatTime(totalMinutes) },
                  { label: "Avg Participation", value: `${avgParticipation}%` },
                ].map(card => (
                  <div key={card.label} className="bg-white rounded-xl sm:rounded-2xl shadow-sm px-2 py-3 sm:px-6 sm:py-5 text-center">
                    <div className="text-base sm:text-2xl font-black text-navy">{card.value}</div>
                    <div className="text-[10px] sm:text-xs text-gray-400 font-semibold mt-0.5 sm:mt-1 uppercase tracking-wide leading-tight">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* Flat player table */}
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-wide text-navy/40 border-b border-gray-100">
                      <th className="px-5 py-2">Player</th>
                      <th className="px-5 py-2">Team</th>
                      <th className="px-5 py-2 text-center">Videos</th>
                      <th className="px-5 py-2 text-center">Training Time</th>
                      <th className="px-5 py-2 text-center">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allPlayers.length === 0 ? (
                      <tr><td colSpan={5} className="px-5 py-8 text-center text-navy/30 text-xs">No players found.</td></tr>
                    ) : allPlayers.map((p, i) => (
                      <tr key={`${p.childId}-${(p as any).teamName}`} className={i % 2 === 0 ? "bg-white" : "bg-[#f9fafb]"}>
                        <td className="px-5 py-3 font-semibold text-navy">{p.name}</td>
                        <td className="px-5 py-3 text-xs text-navy/50">{(p as any).teamName}</td>
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
              </>
            )}


          </>
        )}
      </div>
    </main>
  );
}
