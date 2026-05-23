import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elite Soccer Academy Training Data',
  description: 'A data-driven breakdown of training hours, session types, and weekly schedules across elite academies in Argentina, Brazil, and Europe.',
};

const css = `
  .ast-report {
    background: #f8faf9;
    color: #1f2937;
    font-family: var(--font-geist-sans), system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    padding: 0 0 80px;
  }

  .ast-hero {
    background: linear-gradient(135deg, #0f2642 0%, #1a3a5c 100%);
    padding: 48px 24px 44px;
    text-align: center;
  }

  .ast-hero .tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #DC373E;
    background: rgba(220,55,62,0.12);
    border: 1px solid rgba(220,55,62,0.3);
    padding: 4px 12px;
    border-radius: 4px;
    margin-bottom: 16px;
  }

  .ast-hero h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(40px, 8vw, 72px);
    color: #fff;
    line-height: 0.93;
    letter-spacing: 0.02em;
    margin-bottom: 14px;
  }

  .ast-hero h1 span { color: #DC373E; }

  .ast-hero .subtitle {
    color: rgba(255,255,255,0.65);
    font-size: 15px;
    max-width: 560px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .ast-inner {
    max-width: 860px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* SECTION HEADERS */
  .ast-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    color: #0f2642;
    letter-spacing: 0.1em;
    margin: 48px 0 18px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ast-section-title::after {
    content: '';
    flex: 1;
    height: 2px;
    background: #e5e7eb;
  }

  /* AGE CARDS */
  .ast-age-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-left: 4px solid #22c55e;
    border-radius: 12px;
    padding: 20px 22px;
    margin-bottom: 14px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  }

  .ast-age-card:nth-child(2) { border-left-color: #16a34a; }
  .ast-age-card:nth-child(3) { border-left-color: #0891b2; }
  .ast-age-card:nth-child(4) { border-left-color: #DC373E; }

  .ast-age-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 16px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .ast-age-label {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    color: #0f2642;
    letter-spacing: 0.04em;
  }

  .ast-badge {
    font-size: 11px;
    font-weight: 600;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    padding: 3px 10px;
    border-radius: 20px;
    white-space: nowrap;
  }

  .ast-badge.red {
    background: #fff1f2;
    border-color: #fecdd3;
    color: #DC373E;
  }

  /* BARS */
  .ast-training-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 9px;
  }

  .ast-training-label {
    font-size: 12px;
    color: #6b7280;
    width: 150px;
    flex-shrink: 0;
  }

  .ast-bar-wrap {
    flex: 1;
    background: #f3f4f6;
    border-radius: 4px;
    height: 8px;
    overflow: hidden;
  }

  .ast-bar { height: 100%; border-radius: 4px; }
  .ast-bar.green  { background: #22c55e; }
  .ast-bar.blue   { background: #0891b2; }
  .ast-bar.red    { background: #DC373E; }
  .ast-bar.purple { background: #8b5cf6; }
  .ast-bar.yellow { background: #f59e0b; }
  .ast-bar.teal   { background: #0d9488; }

  .ast-bar-hrs {
    font-size: 12px;
    font-weight: 600;
    color: #0f2642;
    width: 44px;
    text-align: right;
    flex-shrink: 0;
  }

  .ast-outside-note {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid #f3f4f6;
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ast-outside-note strong { color: #374151; }

  /* LEGEND */
  .ast-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 30px;
    padding: 14px 18px;
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .ast-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #6b7280;
  }

  .ast-legend-dot {
    width: 10px; height: 10px;
    border-radius: 3px;
    flex-shrink: 0;
  }

  /* INSIGHT GRID */
  .ast-insight-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @media (max-width: 480px) { .ast-insight-grid { grid-template-columns: 1fr; } }

  .ast-insight-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .ast-insight-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px;
    color: #22c55e;
    line-height: 1;
    margin-bottom: 6px;
  }

  .ast-insight-num.red { color: #DC373E; }

  .ast-insight-label { font-size: 13px; color: #6b7280; line-height: 1.5; }

  /* QUOTE */
  .ast-quote {
    border-left: 4px solid #DC373E;
    padding: 16px 20px;
    background: #fff8f8;
    border-radius: 0 10px 10px 0;
    margin: 24px 0;
    font-size: 14px;
    color: #374151;
    font-style: italic;
    line-height: 1.7;
  }

  /* ACADEMY ROWS */
  .ast-academy-grid { display: grid; gap: 10px; }

  .ast-academy-row {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px 18px;
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 14px;
    align-items: start;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  @media (max-width: 500px) { .ast-academy-row { grid-template-columns: 1fr; } }

  .ast-academy-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    color: #0f2642;
    letter-spacing: 0.04em;
  }

  .ast-academy-country { font-size: 11px; color: #9ca3af; margin-top: 2px; }
  .ast-academy-desc { font-size: 13px; color: #6b7280; line-height: 1.6; }
  .ast-academy-desc strong { color: #15803d; }

  /* BOTTOM CARD */
  .ast-bottom-card {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 22px 24px;
    font-size: 14px;
    line-height: 1.85;
    color: #374151;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  /* ── BENCHMARK TABLES ─────────────────────────── */
  .ast-table-block {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    overflow: hidden;
    margin-bottom: 28px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .ast-table-head {
    padding: 18px 20px 14px;
    border-bottom: 1px solid #e5e7eb;
    background: #f8faf9;
  }

  .ast-table-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    color: #0f2642;
    letter-spacing: 0.05em;
    margin-bottom: 4px;
  }

  .ast-table-sub { font-size: 12px; color: #9ca3af; line-height: 1.5; }

  .ast-schedule-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  .ast-schedule {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    min-width: 640px;
  }

  .ast-schedule th {
    background: #f3f4f6;
    color: #374151;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 9px 10px;
    text-align: center;
    white-space: nowrap;
  }

  .ast-schedule th:first-child { text-align: left; min-width: 80px; }

  .ast-schedule td {
    padding: 8px 8px;
    border-bottom: 1px solid #f3f4f6;
    vertical-align: middle;
    text-align: center;
  }

  .ast-schedule td:first-child {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    color: #0f2642;
    letter-spacing: 0.04em;
    text-align: left;
    padding-left: 14px;
    white-space: nowrap;
  }

  .ast-schedule tr:last-child td { border-bottom: none; }
  .ast-schedule tr:nth-child(even) td { background: #fafafa; }

  .ast-cell { display: inline-flex; flex-direction: column; align-items: center; gap: 3px; }
  .ast-cell-label { font-size: 10px; line-height: 1.2; font-weight: 700; white-space: nowrap; }
  .ast-cell-badge {
    font-size: 8px;
    padding: 1px 5px;
    border-radius: 3px;
    letter-spacing: 0.05em;
    font-weight: 700;
    white-space: nowrap;
  }

  .ast-cell.club .ast-cell-label   { color: #15803d; }
  .ast-cell.futsal .ast-cell-label { color: #0369a1; }
  .ast-cell.baby .ast-cell-label   { color: #0284c7; }
  .ast-cell.match .ast-cell-label  { color: #DC373E; }
  .ast-cell.rest .ast-cell-label   { color: #d1d5db; }
  .ast-cell.empty .ast-cell-label  { color: #e5e7eb; }

  .badge-5v5   { background: #fee2e2; color: #DC373E; }
  .badge-7v7   { background: #fef3c7; color: #b45309; }
  .badge-9v9   { background: #ede9fe; color: #7c3aed; }
  .badge-11v11 { background: #dcfce7; color: #15803d; }

  /* UEFA DATA TABLE */
  .ast-data-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 700px; }

  .ast-data-table th {
    background: #f3f4f6;
    color: #374151;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 14px;
    text-align: left;
    white-space: nowrap;
  }

  .ast-data-table td {
    padding: 10px 14px;
    border-bottom: 1px solid #f3f4f6;
    color: #374151;
    vertical-align: top;
  }

  .ast-data-table tr:last-child td { border-bottom: none; }
  .ast-data-table tr:nth-child(even) td { background: #fafafa; }

  .ast-data-table td:nth-child(3),
  .ast-data-table td:nth-child(4),
  .ast-data-table td:nth-child(5) { font-size: 12px; font-weight: 600; white-space: nowrap; }

  .ast-hrs-high { color: #15803d; }
  .ast-hrs-mid  { color: #b45309; }
  .ast-hrs-low  { color: #9ca3af; }

  .ast-club-name { font-family: 'Bebas Neue', sans-serif; font-size: 15px; color: #0f2642; letter-spacing: 0.04em; display: block; }
  .ast-club-country { font-size: 11px; color: #9ca3af; }
  .ast-note-text { font-size: 12px; color: #6b7280; line-height: 1.5; }
  .ast-note-text strong { color: #DC373E; }

  /* KEY FINDINGS */
  .ast-findings {
    background: #fff;
    border: 1px solid #e5e7eb;
    border-radius: 14px;
    overflow: hidden;
    margin-top: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  }

  .ast-findings-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: #DC373E;
    letter-spacing: 0.1em;
    padding: 18px 20px 14px;
    border-bottom: 1px solid #e5e7eb;
    background: #f8faf9;
    margin: 0;
  }

  .ast-findings-table { width: 100%; border-collapse: collapse; }

  .ast-findings-table tr { border-bottom: 1px solid #f3f4f6; }
  .ast-findings-table tr:last-child { border-bottom: none; }
  .ast-findings-table tr:nth-child(even) td { background: #fafafa; }

  .ast-findings-table td {
    padding: 12px 16px;
    font-size: 13px;
    vertical-align: top;
    line-height: 1.6;
  }

  .ast-findings-table td:first-child {
    font-weight: 700;
    color: #0f2642;
    width: 38%;
    border-right: 1px solid #f3f4f6;
  }

  .ast-findings-table td:last-child { color: #6b7280; }

  /* COLLAPSIBLE TABLES */
  .ast-table-block details { display: block; }

  .ast-table-block summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 18px 20px 14px;
    background: #f8faf9;
  }

  .ast-table-block summary::-webkit-details-marker { display: none; }
  .ast-table-block details[open] summary { border-bottom: 1px solid #e5e7eb; }

  .ast-toggle-icon {
    font-size: 16px;
    color: #9ca3af;
    flex-shrink: 0;
    margin-top: 2px;
    transition: transform 0.2s;
  }

  .ast-table-block details[open] .ast-toggle-icon { transform: rotate(180deg); }

  /* FOOTER */
  .ast-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid #e5e7eb;
    font-size: 12px;
    color: #9ca3af;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px;
  }
`;

function Cell({ type, badge }: { type: 'club' | 'futsal' | 'baby' | 'match' | 'rest' | 'empty'; badge?: string }) {
  const labels: Record<string, string> = {
    club: 'Club Training',
    futsal: 'Indoor Futsal',
    baby: 'Indoor Baby',
    match: 'Official Match',
    rest: 'REST DAY',
    empty: '—',
  };
  const badgeClass: Record<string, string> = {
    '5v5': 'badge-5v5',
    '7v7': 'badge-7v7',
    '9v9': 'badge-9v9',
    '11v11': 'badge-11v11',
  };
  return (
    <span className={`ast-cell ${type}`}>
      <span className="ast-cell-label">{labels[type]}</span>
      {badge && <span className={`ast-cell-badge ${badgeClass[badge] || ''}`}>{badge}</span>}
    </span>
  );
}

export default function EliteAcademyReport() {
  return (
    <>
      <style>{css}</style>
      <div className="ast-report">

        {/* ── HERO ── */}
        <div className="ast-hero">
          <div className="tag">// Cliff Notes Report · Elite Youth Development</div>
          <h1>Soccer Academy<br /><span>Training Hours</span></h1>
          <p className="subtitle">A breakdown of training load, session types, and outside hours across age groups at the world&rsquo;s top academies.</p>
        </div>

        <div className="ast-inner">

        {/* ── PERSONAL STORY ── */}
        <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderLeft: '4px solid #DC373E', borderRadius: '0 12px 12px 0', padding: '22px 24px', marginBottom: '36px', marginTop: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#DC373E', marginBottom: '10px' }}>From Neil Crawford · Founder, Anytime Soccer Training</div>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#374151', marginBottom: '14px' }}>
            I spent years obsessing over how the world&rsquo;s best academies develop players — not just as a researcher, but as a dad training my own two sons in the backyard, on turf, anywhere we could find time.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#374151', marginBottom: '14px' }}>
            I broke down schedules from Buenos Aires clubs, São Paulo academies, Ajax, Barcelona, Chelsea — tracking what they did by age, by session type, by week. I wanted to know: <strong style={{ color: '#111827' }}>what does it actually take, hour by hour, to develop an elite player?</strong>
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#374151', marginBottom: '14px' }}>
            Today, my older son trains with <strong style={{ color: '#DC373E' }}>CLT Academy</strong>. My younger son is in their <strong style={{ color: '#DC373E' }}>CLT Discovery Program</strong>. None of that happened by accident — it happened because we understood the game differently than most families around us.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#6b7280' }}>
            This report is everything I wish I had when we started. I hope it helps you.
          </p>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#9ca3af' }}>
            — Neil Crawford &nbsp;·&nbsp; neil@anytime-soccer.com
          </div>
        </div>

        {/* ── LEGEND ── */}
        <div className="ast-legend">
          {[
            { color: '#22c55e', label: 'Ball Mastery' },
            { color: '#38bdf8', label: 'Tactical' },
            { color: '#DC373E', label: 'Strength & Conditioning' },
            { color: '#a78bfa', label: 'Video Analysis' },
            { color: '#fbbf24', label: 'Recovery' },
            { color: '#2dd4bf', label: 'Athletic Movement' },
          ].map(({ color, label }) => (
            <div key={label} className="ast-legend-item">
              <div className="ast-legend-dot" style={{ background: color }} />
              {label}
            </div>
          ))}
        </div>

        {/* ── AGE GROUP BREAKDOWN ── */}
        <div className="ast-section-title">Age Group Breakdown</div>

        <div className="ast-age-card">
          <div className="ast-age-header">
            <div className="ast-age-label">Ages 6–9 · Foundation Phase</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div className="ast-badge">Academy: ~4 hrs/wk</div>
              <div className="ast-badge red">Total w/ Extra: ~5–6 hrs/wk</div>
            </div>
          </div>
          {[['Ball Mastery', 'green', '50%', '2.0 hrs'], ['Tactical Intro', 'blue', '20%', '0.8 hrs'], ['Athletic Movement', 'teal', '30%', '1.2 hrs']].map(([label, cls, w, hrs]) => (
            <div key={label as string} className="ast-training-row">
              <div className="ast-training-label">{label}</div>
              <div className="ast-bar-wrap"><div className={`ast-bar ${cls}`} style={{ width: w as string }} /></div>
              <div className="ast-bar-hrs">{hrs}</div>
            </div>
          ))}
          <div className="ast-outside-note">
            <span>🏡 Outside extras: Backyard/street ball, juggling, wall passing</span>
            <strong>+1–2 hrs/wk</strong>
          </div>
        </div>

        <div className="ast-age-card">
          <div className="ast-age-header">
            <div className="ast-age-label">Ages 10–12 · Pre-Adolescent</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div className="ast-badge">Academy: ~7 hrs/wk</div>
              <div className="ast-badge red">Total w/ Extra: ~9–10 hrs/wk</div>
            </div>
          </div>
          {[['Ball Mastery', 'green', '50%', '3.5 hrs'], ['Tactical Intro', 'blue', '30%', '2.1 hrs'], ['Athletic Movement', 'teal', '20%', '1.4 hrs']].map(([label, cls, w, hrs]) => (
            <div key={label as string} className="ast-training-row">
              <div className="ast-training-label">{label}</div>
              <div className="ast-bar-wrap"><div className={`ast-bar ${cls}`} style={{ width: w as string }} /></div>
              <div className="ast-bar-hrs">{hrs}</div>
            </div>
          ))}
          <div className="ast-outside-note">
            <span>⚽ Outside extras: Ball mastery routines, freestyle, pickup games — <strong>the Messi/Ronaldo age</strong></span>
            <strong>+2–3 hrs/wk</strong>
          </div>
        </div>

        <div className="ast-age-card">
          <div className="ast-age-header">
            <div className="ast-age-label">Ages 13–15 · Early Adolescence</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div className="ast-badge">Academy: ~12 hrs/wk</div>
              <div className="ast-badge red">Total w/ Extra: ~15–17 hrs/wk</div>
            </div>
          </div>
          {[['Ball Mastery', 'green', '35%', '4.2 hrs'], ['Tactical', 'blue', '35%', '4.2 hrs'], ['Strength & Cond.', 'red', '20%', '2.4 hrs'], ['Video Analysis', 'purple', '10%', '1.2 hrs']].map(([label, cls, w, hrs]) => (
            <div key={label as string} className="ast-training-row">
              <div className="ast-training-label">{label}</div>
              <div className="ast-bar-wrap"><div className={`ast-bar ${cls}`} style={{ width: w as string }} /></div>
              <div className="ast-bar-hrs">{hrs}</div>
            </div>
          ))}
          <div className="ast-outside-note">
            <span>💪 Outside extras: Shooting/dribbling drills, intro gym, structured home programs</span>
            <strong>+3–5 hrs/wk</strong>
          </div>
        </div>

        <div className="ast-age-card">
          <div className="ast-age-header">
            <div className="ast-age-label">Ages 16–18 · Elite Development</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <div className="ast-badge">Academy: ~22 hrs/wk</div>
              <div className="ast-badge red">Total w/ Extra: ~27–30 hrs/wk</div>
            </div>
          </div>
          {[['Tactical', 'blue', '40%', '8.8 hrs'], ['Ball Mastery', 'green', '25%', '5.5 hrs'], ['Strength & Cond.', 'red', '25%', '5.5 hrs'], ['Recovery & Science', 'yellow', '10%', '2.2 hrs']].map(([label, cls, w, hrs]) => (
            <div key={label as string} className="ast-training-row">
              <div className="ast-training-label">{label}</div>
              <div className="ast-bar-wrap"><div className={`ast-bar ${cls}`} style={{ width: w as string }} /></div>
              <div className="ast-bar-hrs">{hrs}</div>
            </div>
          ))}
          <div className="ast-outside-note">
            <span>🔬 Outside extras: Personal gym, extra shooting, video self-analysis, recovery discipline</span>
            <strong>+5–8 hrs/wk</strong>
          </div>
        </div>

        {/* ── KEY NUMBERS ── */}
        <div className="ast-section-title">Key Numbers</div>
        <div className="ast-insight-grid">
          {[
            { num: '4→30', label: 'Weekly hours from age 6 to 18 — a near part-time job by late teens', red: false },
            { num: '10,000', label: 'Hours needed to reach mastery. Academy-only players hit this around age 24', red: true },
            { num: '18–19', label: 'Age elite players (Mbappé, Pedri, Gavi) hit mastery — due to extra outside hours from age 8', red: false },
            { num: '6–13', label: 'The critical technical window. World\'s best academies protect ball mastery above all else here', red: true },
          ].map(({ num, label, red }) => (
            <div key={num} className="ast-insight-card">
              <div className={`ast-insight-num ${red ? 'red' : ''}`}>{num}</div>
              <div className="ast-insight-label">{label}</div>
            </div>
          ))}
        </div>

        <div className="ast-quote">
          &ldquo;Ajax and Barcelona credit unstructured play outside sessions as irreplaceable — it builds creativity and decision-making that coached sessions alone cannot replicate.&rdquo;
        </div>

        {/* ── ACADEMY PHILOSOPHIES ── */}
        <div className="ast-section-title">Academy Philosophies</div>
        <div className="ast-academy-grid">
          {[
            { name: 'La Masia', country: '// Barcelona · Spain', desc: <span>Heaviest emphasis on <strong>technical/ball mastery</strong> at all ages. Tactics built entirely around possession. Produced Messi, Xavi, Iniesta.</span> },
            { name: 'Ajax Academy', country: '// Netherlands', desc: <span><strong>TIPS Model</strong> — Technique, Intelligence, Personality, Speed. Cognitive development and decision-making emphasized from early ages.</span> },
            { name: 'Red Bull', country: '// Leipzig & Salzburg', desc: <span>Highest <strong>conditioning load</strong> of any academy. Pressing and athleticism prioritized above technical finesse. Produces high-energy, physically dominant players.</span> },
            { name: 'Clairefontaine', country: '// France · INF', desc: <span>Very <strong>balanced approach</strong>. Strong emphasis on individual technique before group tactics. Produced Mbappé, Zidane.</span> },
          ].map(({ name, country, desc }) => (
            <div key={name} className="ast-academy-row">
              <div>
                <div className="ast-academy-name">{name}</div>
                <div className="ast-academy-country">{country}</div>
              </div>
              <div className="ast-academy-desc">{desc}</div>
            </div>
          ))}
        </div>

        {/* ── BOTTOM LINE ── */}
        <div className="ast-section-title">Bottom Line</div>
        <div className="ast-bottom-card">
          Over-coaching tactics too early stunts creativity. The world&rsquo;s elite academies protect the <strong style={{ color: '#22c55e' }}>technical/ball mastery window between ages 6–13</strong> as sacred. Tactics, strength, and video analysis scale up sharply from 13 onward — but without a strong technical foundation, they mean little.<br /><br />
          The true separator between good and great players is <strong style={{ color: '#DC373E' }}>what they do outside of scheduled sessions</strong> — obsessive ball work, self-analysis, and physical discipline. Every elite player at every top academy shares this trait.
        </div>

        {/* ════════════════════════════════════════════
            ELITE ACADEMY TRAINING BENCHMARKS
        ════════════════════════════════════════════ */}
        <div className="ast-section-title" style={{ marginTop: '60px' }}>Elite Academy Training Benchmarks</div>

        {/* ── TABLE 1: ARGENTINA ── */}
        <div className="ast-table-block">
          <details>
          <summary>
            <div>
              <div className="ast-table-title">🇦🇷 Argentina — Buenos Aires Clubs</div>
              <div className="ast-table-sub">Atletico Huracan · Argentinos Juniors · Vélez Sarsfield · Independiente · San Lorenzo · River Plate · Boca Juniors · Racing Club</div>
            </div>
            <span className="ast-toggle-icon">▾</span>
          </summary>
          <div className="ast-schedule-wrap">
            <table className="ast-schedule">
              <thead>
                <tr>
                  <th>AGE</th>
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>U7/U8/U9</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="baby" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="baby" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="5v5" /></td>
                </tr>
                <tr>
                  <td>U10</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="baby" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="baby" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="5v5" /></td>
                </tr>
                <tr>
                  <td>U11</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="futsal" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="futsal" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="7v7" /></td>
                </tr>
                <tr>
                  <td>U12</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="futsal" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="futsal" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="7v7" /></td>
                </tr>
                <tr>
                  <td>U13</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="futsal" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="9v9" /></td>
                  <td><Cell type="empty" /></td>
                </tr>
                <tr>
                  <td>U14–U18</td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="empty" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="club" /></td>
                  <td><Cell type="match" badge="11v11" /></td>
                  <td><Cell type="rest" /></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#22c55e' }} />Club Training</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#38bdf8' }} />Indoor Futsal (5v5)</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#7dd3fc' }} />Indoor Baby (5v5)</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#DC373E' }} />Official Match</div>
          </div>
          </details>
        </div>

        {/* ── TABLE 2: BRAZIL ── */}
        <div className="ast-table-block">
          <details>
          <summary>
            <div>
              <div className="ast-table-title">🇧🇷 Brazil — São Paulo Clubs</div>
              <div className="ast-table-sub">Corinthians FC · Santos Academy · AC Juventus · Red Bull Bragantino &nbsp;·&nbsp; Note: U7–U10 Futsal via private pay-to-play schools</div>
            </div>
            <span className="ast-toggle-icon">▾</span>
          </summary>
          <div className="ast-schedule-wrap">
            <table className="ast-schedule">
              <thead>
                <tr>
                  <th>AGE</th>
                  {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(d => <th key={d}>{d}</th>)}
                </tr>
              </thead>
              <tbody>
                {[
                  { age: 'U11', fri: 'rest', note: '' },
                  { age: 'U12', fri: 'rest', note: '' },
                  { age: 'U13', fri: 'rest', note: '' },
                  { age: 'U14', fri: 'club', note: '' },
                  { age: 'U15', fri: 'club', note: '*' },
                  { age: 'U16', fri: 'club', note: '*' },
                  { age: 'U17', fri: 'club', note: '*' },
                ].map(({ age, fri, note }) => (
                  <tr key={age}>
                    <td>{age}</td>
                    <td><Cell type="club" /></td>
                    <td><Cell type="club" /></td>
                    <td><Cell type="club" /></td>
                    <td><Cell type="club" /></td>
                    <td><Cell type={fri as 'club' | 'rest'} /></td>
                    <td>
                      <span className="ast-cell match">
                        <span className="ast-cell-label">Futsal Match{note}</span>
                      </span>
                    </td>
                    <td><Cell type="empty" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '10px 16px', borderTop: '1px solid #e5e7eb', fontSize: '11px', color: '#9ca3af' }}>
            * ~50% of U15–U17 players independently play unofficial Futsal away from club on Saturdays
          </div>
          </details>
        </div>

        {/* ── TABLE 3: UEFA GLOBAL ── */}
        <div className="ast-table-block">
          <details>
          <summary>
            <div>
              <div className="ast-table-title">🌍 Global Elite — UEFA Academy Training Hours</div>
              <div className="ast-table-sub">Source: R. Russell, UEFA Football Development Consultant</div>
            </div>
            <span className="ast-toggle-icon">▾</span>
          </summary>
          <div className="ast-schedule-wrap">
            <table className="ast-data-table">
              <thead>
                <tr>
                  <th>CLUB</th>
                  <th>AGE GROUP</th>
                  <th>HRS/WK</th>
                  <th>GAMES/SEASON</th>
                  <th>EST. HRS BY 19</th>
                  <th>KEY NOTES</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { club: 'Real Madrid', country: 'Spain', age: 'U10–U18', hrs: '10–20', hrsClass: 'high', games: '35–45', total: '6,500', notes: 'Residential from 16; strict technical progression' },
                  { club: 'Barcelona', country: 'Spain', age: 'U9–U18', hrs: '10–18', hrsClass: 'high', games: '35–50', total: '6,000', notes: <span>La Masia; <strong>technique-first</strong> above all else</span> },
                  { club: 'AC Milan', country: 'Italy', age: 'U13–U18', hrs: '16–22', hrsClass: 'high', games: '40–48', total: '6,800', notes: 'Physical & tactical; elite conditioning load' },
                  { club: 'Bayern Munich', country: 'Germany', age: 'U12–U18', hrs: '14–20', hrsClass: 'high', games: '38–44', total: '6,200', notes: 'Systematic development; high fitness priority' },
                  { club: 'Ajax', country: 'Netherlands', age: 'U9–U18', hrs: '8–16', hrsClass: 'mid', games: '30–40', total: '5,500', notes: 'TIPS model; cognitive + technical emphasis' },
                  { club: 'FC Twente / Heracles', country: 'Netherlands', age: 'U12–U16', hrs: '10–14', hrsClass: 'mid', games: '32–38', total: '4,800', notes: 'Partner club network; realistic Dutch model' },
                  { club: 'Dinamo Zagreb', country: 'Croatia', age: 'U13–U18', hrs: '12–16', hrsClass: 'mid', games: '34–40', total: '5,200', notes: 'Eastern European intensive model' },
                  { club: 'Rosenborg', country: 'Norway', age: 'U13–U18', hrs: '8–12', hrsClass: 'low', games: '28–34', total: '4,200', notes: 'Nordic model; winter limitations reduce volume' },
                  { club: 'Galatasaray', country: 'Turkey', age: 'U12–U18', hrs: '12–18', hrsClass: 'mid', games: '34–42', total: '5,400', notes: 'Turkish Super League feeder academy' },
                  { club: 'São Paulo FC', country: 'Brazil', age: 'U10–U18', hrs: '14–20', hrsClass: 'high', games: '45–52', total: '7,000', notes: <span><strong>Futsal integration; leads all clubs</strong> in estimated total hrs</span> },
                  { club: 'French Academy (Typical)', country: 'France', age: 'U13–U18', hrs: '15–18', hrsClass: 'high', games: '38–44', total: '5,800', notes: 'INF Clairefontaine model; balanced approach' },
                  { club: 'Bolton Wanderers', country: 'England', age: 'U9–U18', hrs: '8–14', hrsClass: 'mid', games: '30–36', total: '4,500', notes: <span><strong>10–12 wk holiday gap</strong>; nursery club network</span> },
                  { club: 'Chelsea FC', country: 'England', age: 'U9–U18', hrs: '10–16', hrsClass: 'mid', games: '35–42', total: '5,200', notes: 'Elite Category 1; highest English volume' },
                  { club: 'Fulham FC', country: 'England', age: 'U9–U18', hrs: '8–14', hrsClass: 'mid', games: '30–36', total: '4,600', notes: 'Category 1; partner/nursery club networks' },
                ].map(({ club, country, age, hrs, hrsClass, games, total, notes }) => (
                  <tr key={club}>
                    <td>
                      <span className="ast-club-name">{club}</span>
                      <span className="ast-club-country">{country}</span>
                    </td>
                    <td style={{ color: '#6b7280', fontSize: '12px', whiteSpace: 'nowrap' }}>{age}</td>
                    <td className={`ast-hrs-${hrsClass}`}>{hrs}</td>
                    <td style={{ color: '#6b7280' }}>{games}</td>
                    <td className={hrsClass === 'high' ? 'ast-hrs-high' : hrsClass === 'low' ? 'ast-hrs-low' : 'ast-hrs-mid'}>{total}</td>
                    <td className="ast-note-text">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </details>
        </div>

        {/* ── KEY FINDINGS ── */}
        <div className="ast-findings">
          <div className="ast-findings-title">Key Findings</div>
          <table className="ast-findings-table">
            <tbody>
              {[
                ['Small-sided games are the global standard through age 12', 'Every nation studied uses 5v5 (U7–U10) and 7v7 (U11–U12) before transitioning to 11v11 — maximizing ball touches per player.'],
                ['Training hours scale dramatically with age', 'Expect ~4–6 hrs/wk at U8, ~8–12 hrs/wk at U12, ~16–20 hrs/wk at U16, and 20+ hrs/wk at U18 elite level.'],
                ['São Paulo FC leads all clubs in estimated total hours', 'An estimated 7,000+ hrs by age 19, logging 20 hrs/week — driven by year-round Futsal integration alongside club training.'],
                ['Argentina uniquely embeds Futsal into the weekly schedule', 'From U7 through U13, Indoor Baby/Futsal runs in parallel with club training rather than as a separate program.'],
                ['English academies lose 10–12 weeks/year to school holidays', 'vs. roughly 4 weeks in Argentina, Brazil, and Spain — a compounding gap that can total 1,000+ fewer training hours by age 18.'],
                ['Partner and nursery club networks extend identification reach', 'Ajax, Bolton, Fulham, and Chelsea use partner networks to give younger players structured development pathways before formal academy entry.'],
              ].map(([title, detail]) => (
                <tr key={title}>
                  <td>{title}</td>
                  <td>{detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── FOOTER ── */}
        <div className="ast-footer">
          <span>// Anytime Soccer Training · Elite Academy Report</span>
          <span>Compiled 2026</span>
        </div>

        </div>{/* end ast-inner */}
      </div>
    </>
  );
}
