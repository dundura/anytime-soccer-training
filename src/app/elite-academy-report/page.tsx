import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Elite Soccer Academy Training Data',
  description: 'A data-driven breakdown of training hours, session types, and weekly schedules across elite academies in Argentina, Brazil, and Europe.',
};

const css = `
  .ast-report {
    background: #071524;
    color: #d8e8f8;
    font-family: var(--font-geist-sans), system-ui, sans-serif;
    font-size: 14px;
    line-height: 1.6;
    padding: 32px 20px 80px;
    max-width: 820px;
    margin: 0 auto;
  }

  .ast-report .tag {
    font-family: 'Courier New', monospace;
    font-size: 10px;
    color: #DC373E;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .ast-report h1 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(38px, 8vw, 68px);
    color: #eef5ff;
    line-height: 0.93;
    letter-spacing: 0.02em;
    margin-bottom: 12px;
  }

  .ast-report h1 span { color: #DC373E; }

  .ast-report .subtitle {
    color: #5a7a9a;
    font-size: 13px;
    font-weight: 300;
    max-width: 580px;
  }

  .ast-header {
    border-bottom: 1px solid #1a3050;
    padding-bottom: 24px;
    margin-bottom: 36px;
  }

  /* SECTION HEADERS */
  .ast-section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    color: #DC373E;
    letter-spacing: 0.12em;
    margin: 44px 0 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .ast-section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #1a3050;
  }

  /* AGE CARDS */
  .ast-age-card {
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-left: 3px solid #22c55e;
    border-radius: 6px;
    padding: 20px 22px;
    margin-bottom: 14px;
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
    color: #eef5ff;
    letter-spacing: 0.05em;
  }

  .ast-badge {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    background: rgba(34,197,94,0.09);
    border: 1px solid rgba(34,197,94,0.22);
    color: #22c55e;
    padding: 4px 10px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .ast-badge.red {
    background: rgba(220,55,62,0.1);
    border-color: rgba(220,55,62,0.28);
    color: #DC373E;
  }

  .ast-badge.blue {
    background: rgba(8,145,178,0.1);
    border-color: rgba(8,145,178,0.28);
    color: #38bdf8;
  }

  /* BARS */
  .ast-training-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 9px;
  }

  .ast-training-label {
    font-size: 11px;
    color: #5a7a9a;
    width: 150px;
    flex-shrink: 0;
    font-family: 'Courier New', monospace;
  }

  .ast-bar-wrap {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border-radius: 2px;
    height: 6px;
    overflow: hidden;
  }

  .ast-bar {
    height: 100%;
    border-radius: 2px;
  }

  .ast-bar.green  { background: #22c55e; }
  .ast-bar.blue   { background: #38bdf8; }
  .ast-bar.red    { background: #DC373E; }
  .ast-bar.purple { background: #a78bfa; }
  .ast-bar.yellow { background: #fbbf24; }
  .ast-bar.teal   { background: #2dd4bf; }

  .ast-bar-hrs {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    color: #eef5ff;
    width: 44px;
    text-align: right;
    flex-shrink: 0;
  }

  .ast-outside-note {
    margin-top: 14px;
    padding-top: 12px;
    border-top: 1px solid #1a3050;
    font-size: 12px;
    color: #5a7a9a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
  }

  .ast-outside-note strong { color: #d8e8f8; }

  /* LEGEND */
  .ast-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin-bottom: 30px;
    padding: 14px 18px;
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-radius: 6px;
  }

  .ast-legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: #5a7a9a;
    font-family: 'Courier New', monospace;
  }

  .ast-legend-dot {
    width: 8px; height: 8px;
    border-radius: 2px;
    flex-shrink: 0;
  }

  /* INSIGHT GRID */
  .ast-insight-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 480px) {
    .ast-insight-grid { grid-template-columns: 1fr; }
  }

  .ast-insight-card {
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-radius: 6px;
    padding: 18px;
  }

  .ast-insight-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px;
    color: #22c55e;
    line-height: 1;
    margin-bottom: 4px;
  }

  .ast-insight-num.red { color: #DC373E; }

  .ast-insight-label {
    font-size: 12px;
    color: #5a7a9a;
    line-height: 1.4;
  }

  /* QUOTE */
  .ast-quote {
    border-left: 3px solid #22c55e;
    padding: 14px 20px;
    background: rgba(34,197,94,0.05);
    border-radius: 0 6px 6px 0;
    margin: 22px 0;
    font-size: 13px;
    color: #d8e8f8;
    font-style: italic;
    line-height: 1.7;
  }

  /* ACADEMY ROWS */
  .ast-academy-grid { display: grid; gap: 10px; }

  .ast-academy-row {
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-radius: 6px;
    padding: 14px 18px;
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 12px;
    align-items: start;
  }

  @media (max-width: 500px) {
    .ast-academy-row { grid-template-columns: 1fr; }
  }

  .ast-academy-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 17px;
    color: #eef5ff;
    letter-spacing: 0.05em;
  }

  .ast-academy-country {
    font-size: 10px;
    color: #5a7a9a;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.1em;
    margin-top: 2px;
  }

  .ast-academy-desc { font-size: 12px; color: #5a7a9a; line-height: 1.6; }
  .ast-academy-desc strong { color: #22c55e; }

  /* BOTTOM CARD */
  .ast-bottom-card {
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-radius: 6px;
    padding: 20px 22px;
    font-size: 13px;
    line-height: 1.9;
    color: #d8e8f8;
  }

  /* ── BENCHMARK TABLES ─────────────────────────── */

  .ast-table-block {
    background: #0c1e30;
    border: 1px solid #1a3050;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 28px;
  }

  .ast-table-head {
    padding: 16px 20px 12px;
    border-bottom: 1px solid #1a3050;
    background: #091828;
  }

  .ast-table-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 18px;
    color: #eef5ff;
    letter-spacing: 0.06em;
    margin-bottom: 4px;
  }

  .ast-table-sub {
    font-size: 11px;
    color: #5a7a9a;
    font-family: 'Courier New', monospace;
    line-height: 1.5;
  }

  .ast-schedule-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }

  .ast-schedule {
    width: 100%;
    border-collapse: collapse;
    font-size: 11px;
    min-width: 640px;
  }

  .ast-schedule th {
    background: #071524;
    color: #5a7a9a;
    font-family: 'Courier New', monospace;
    font-weight: 500;
    font-size: 10px;
    letter-spacing: 0.1em;
    padding: 8px 10px;
    text-align: center;
    border-bottom: 1px solid #1a3050;
    white-space: nowrap;
  }

  .ast-schedule th:first-child { text-align: left; min-width: 80px; }

  .ast-schedule td {
    padding: 7px 8px;
    border-bottom: 1px solid #0f2a40;
    vertical-align: middle;
    text-align: center;
  }

  .ast-schedule td:first-child {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 14px;
    color: #eef5ff;
    letter-spacing: 0.05em;
    text-align: left;
    padding-left: 12px;
    white-space: nowrap;
  }

  .ast-schedule tr:last-child td { border-bottom: none; }
  .ast-schedule tr:nth-child(even) td { background: rgba(255,255,255,0.018); }

  .ast-cell {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
  }

  .ast-cell-label {
    font-size: 10px;
    line-height: 1.2;
    font-weight: 600;
    white-space: nowrap;
  }

  .ast-cell-badge {
    font-family: 'Courier New', monospace;
    font-size: 8px;
    padding: 1px 5px;
    border-radius: 2px;
    letter-spacing: 0.05em;
    font-weight: 700;
    white-space: nowrap;
  }

  .ast-cell.club .ast-cell-label   { color: #22c55e; }
  .ast-cell.futsal .ast-cell-label { color: #38bdf8; }
  .ast-cell.baby .ast-cell-label   { color: #7dd3fc; }
  .ast-cell.match .ast-cell-label  { color: #DC373E; }
  .ast-cell.rest .ast-cell-label   { color: #374151; }
  .ast-cell.empty .ast-cell-label  { color: #1e3550; }

  .badge-5v5   { background: rgba(220,55,62,0.15); color: #DC373E; border: 1px solid rgba(220,55,62,0.3); }
  .badge-7v7   { background: rgba(251,191,36,0.12); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
  .badge-9v9   { background: rgba(167,139,250,0.12); color: #a78bfa; border: 1px solid rgba(167,139,250,0.3); }
  .badge-11v11 { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.25); }

  /* UEFA DATA TABLE */
  .ast-data-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 700px; }

  .ast-data-table th {
    background: #071524;
    color: #5a7a9a;
    font-family: 'Courier New', monospace;
    font-size: 10px;
    letter-spacing: 0.08em;
    font-weight: 500;
    padding: 9px 12px;
    text-align: left;
    border-bottom: 1px solid #1a3050;
    white-space: nowrap;
  }

  .ast-data-table td {
    padding: 9px 12px;
    border-bottom: 1px solid #0f2a40;
    color: #d8e8f8;
    vertical-align: top;
  }

  .ast-data-table tr:last-child td { border-bottom: none; }
  .ast-data-table tr:nth-child(even) td { background: rgba(255,255,255,0.02); }

  .ast-data-table td:nth-child(3),
  .ast-data-table td:nth-child(4),
  .ast-data-table td:nth-child(5) {
    font-family: 'Courier New', monospace;
    font-size: 11px;
    white-space: nowrap;
  }

  .ast-hrs-high { color: #22c55e; font-weight: 700; }
  .ast-hrs-mid  { color: #fbbf24; font-weight: 600; }
  .ast-hrs-low  { color: #5a7a9a; }

  .ast-club-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 15px;
    color: #eef5ff;
    letter-spacing: 0.05em;
    display: block;
  }

  .ast-club-country {
    font-size: 10px;
    color: #3a5a7a;
    font-family: 'Courier New', monospace;
  }

  .ast-note-text { font-size: 11px; color: #5a7a9a; line-height: 1.5; }
  .ast-note-text strong { color: #DC373E; }

  /* KEY FINDINGS */
  .ast-findings {
    background: #091828;
    border: 1px solid #1a3050;
    border-left: 3px solid #DC373E;
    border-radius: 0 8px 8px 0;
    padding: 20px 22px;
    margin-top: 6px;
  }

  .ast-findings-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px;
    color: #DC373E;
    letter-spacing: 0.1em;
    margin-bottom: 14px;
  }

  .ast-findings ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ast-findings li {
    display: flex;
    gap: 10px;
    font-size: 13px;
    color: #8aaac8;
    line-height: 1.5;
  }

  .ast-findings li::before {
    content: '→';
    color: #DC373E;
    font-family: 'Courier New', monospace;
    flex-shrink: 0;
    margin-top: 1px;
  }

  .ast-findings li strong { color: #d8e8f8; }

  /* FOOTER */
  .ast-footer {
    margin-top: 48px;
    padding-top: 20px;
    border-top: 1px solid #1a3050;
    font-size: 11px;
    color: #3a5a7a;
    font-family: 'Courier New', monospace;
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

        {/* ── HEADER ── */}
        <div className="ast-header">
          <div className="tag">// Cliff Notes Report · Elite Youth Development</div>
          <h1>Soccer Academy<br /><span>Training Hours</span></h1>
          <p className="subtitle">A breakdown of training load, session types, and outside hours across age groups at the world&rsquo;s top academies.</p>
        </div>

        {/* ── PERSONAL STORY ── */}
        <div style={{ background: '#0c1e30', border: '1px solid #1a3050', borderLeft: '3px solid #DC373E', borderRadius: '0 8px 8px 0', padding: '22px 24px', marginBottom: '36px' }}>
          <div style={{ fontFamily: 'Courier New, monospace', fontSize: '10px', color: '#DC373E', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '10px' }}>// From Neil Crawford · Founder, Anytime Soccer Training</div>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#d8e8f8', marginBottom: '14px' }}>
            I spent years obsessing over how the world&rsquo;s best academies develop players — not just as a researcher, but as a dad training my own two sons in the backyard, on turf, anywhere we could find time.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#d8e8f8', marginBottom: '14px' }}>
            I broke down schedules from Buenos Aires clubs, São Paulo academies, Ajax, Barcelona, Chelsea — tracking what they did by age, by session type, by week. I wanted to know: <strong style={{ color: '#eef5ff' }}>what does it actually take, hour by hour, to develop an elite player?</strong>
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#d8e8f8', marginBottom: '14px' }}>
            Today, my older son trains with <strong style={{ color: '#22c55e' }}>CLT Academy</strong>. My younger son is in their <strong style={{ color: '#22c55e' }}>Discovery Program</strong>. None of that happened by accident — it happened because we understood the game differently than most families around us.
          </p>
          <p style={{ fontSize: '14px', lineHeight: '1.85', color: '#8aaac8' }}>
            This report is everything I wish I had when we started. I hope it helps you.
          </p>
          <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #1a3050', fontSize: '12px', color: '#5a7a9a', fontFamily: 'Courier New, monospace' }}>
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
          <div className="ast-table-head">
            <div className="ast-table-title">🇦🇷 Argentina — Buenos Aires Clubs</div>
            <div className="ast-table-sub">Atletico Huracan · Argentinos Juniors · Vélez Sarsfield · Independiente · San Lorenzo · River Plate · Boca Juniors · Racing Club</div>
          </div>
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
          <div style={{ padding: '10px 16px', borderTop: '1px solid #1a3050', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#22c55e' }} />Club Training</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#38bdf8' }} />Indoor Futsal (5v5)</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#7dd3fc' }} />Indoor Baby (5v5)</div>
            <div className="ast-legend-item"><div className="ast-legend-dot" style={{ background: '#DC373E' }} />Official Match</div>
          </div>
        </div>

        {/* ── TABLE 2: BRAZIL ── */}
        <div className="ast-table-block">
          <div className="ast-table-head">
            <div className="ast-table-title">🇧🇷 Brazil — São Paulo Clubs</div>
            <div className="ast-table-sub">Corinthians FC · Santos Academy · AC Juventus · Red Bull Bragantino &nbsp;·&nbsp; Note: U7–U10 Futsal via private pay-to-play schools</div>
          </div>
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
          <div style={{ padding: '10px 16px', borderTop: '1px solid #1a3050', fontSize: '11px', color: '#5a7a9a', fontFamily: 'Courier New, monospace' }}>
            * ~50% of U15–U17 players independently play unofficial Futsal away from club on Saturdays
          </div>
        </div>

        {/* ── TABLE 3: UEFA GLOBAL ── */}
        <div className="ast-table-block">
          <div className="ast-table-head">
            <div className="ast-table-title">🌍 Global Elite — UEFA Academy Training Hours</div>
            <div className="ast-table-sub">Source: R. Russell, UEFA Football Development Consultant</div>
          </div>
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
                    <td style={{ color: '#8aaac8', fontSize: '12px', whiteSpace: 'nowrap' }}>{age}</td>
                    <td className={`ast-hrs-${hrsClass}`}>{hrs}</td>
                    <td style={{ color: '#8aaac8' }}>{games}</td>
                    <td className={hrsClass === 'high' ? 'ast-hrs-high' : hrsClass === 'low' ? 'ast-hrs-low' : 'ast-hrs-mid'}>{total}</td>
                    <td className="ast-note-text">{notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── KEY FINDINGS ── */}
        <div className="ast-findings">
          <div className="ast-findings-title">// KEY FINDINGS</div>
          <ul>
            <li><strong>Small-sided games are the global standard through age 12.</strong> Every nation studied uses 5v5 (U7–U10) and 7v7 (U11–U12) before transitioning to 11v11 — maximizing ball touches per player.</li>
            <li><strong>Training hours scale dramatically with age.</strong> Expect ~4–6 hrs/wk at U8, ~8–12 hrs/wk at U12, ~16–20 hrs/wk at U16, and 20+ hrs/wk at U18 elite level.</li>
            <li><strong>São Paulo FC leads all clubs</strong> at an estimated 7,000+ total hours by age 19, logging 20 hrs/week — driven by year-round Futsal integration alongside club training.</li>
            <li><strong>Argentina uniquely embeds Futsal (Indoor Baby/Futsal) into the weekly schedule</strong> from U7 through U13, running it in parallel with club training rather than as a separate program.</li>
            <li><strong>English academies lose 10–12 weeks/year to school holidays</strong> vs. roughly 4 weeks in Argentina, Brazil, and Spain — a compounding gap that can total 1,000+ fewer training hours by age 18.</li>
            <li><strong>Partner and nursery club networks</strong> (Ajax, Bolton, Fulham, Chelsea) extend each club&rsquo;s identification reach and give younger players structured development pathways before formal academy entry.</li>
          </ul>
        </div>

        {/* ── FOOTER ── */}
        <div className="ast-footer">
          <span>// Anytime Soccer Training · Elite Academy Report</span>
          <span>Compiled 2026</span>
        </div>

      </div>
    </>
  );
}
