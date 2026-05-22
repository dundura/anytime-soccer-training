'use client';

import { useState, useEffect } from 'react';

function usePersist<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : defaultValue; } catch { return defaultValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

const inputStyle = {
  width: '92px',
  textAlign: 'right' as const,
  fontSize: '14px',
  border: '1px solid #d1d5db',
  borderRadius: '6px',
  padding: '5px 8px',
  background: '#fff',
  color: '#111',
};

const rowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '10px 0',
  borderBottom: '1px solid #f0f0f0',
};

const labelStyle = { flex: 1, fontSize: '14px', color: '#111', minWidth: 0 };
const subStyle = { fontSize: '12px', color: '#888', marginTop: '2px' };
const prefixStyle = { fontSize: '13px', color: '#666' };

const cardStyle = {
  background: '#fff',
  border: '1px solid #e5e7eb',
  borderTop: 'none',
  borderRadius: '0 0 12px 12px',
  padding: '0.75rem 1rem',
  marginBottom: '12px',
};

const sectionLabelStyle = {
  fontSize: '11px',
  fontWeight: '600' as const,
  letterSpacing: '0.08em',
  textTransform: 'uppercase' as const,
  color: '#9ca3af',
  margin: '0 0 10px',
};

function SectionHeader({ label, open, onToggle }: { label: string; open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: '#fff', border: '1px solid #e5e7eb', borderRadius: open ? '12px 12px 0 0' : '12px', cursor: 'pointer', padding: '12px 16px', textAlign: 'left', marginBottom: open ? '0' : '12px' }}
    >
      <span style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>{label}</span>
      <span style={{ fontSize: '14px', color: '#9ca3af', transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', display: 'inline-block' }}>▾</span>
    </button>
  );
}

function NumInput({ value, onChange, prefix, step, max }: { value: number; onChange: (v: number) => void; prefix?: string; step?: number; max?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {prefix && <span style={prefixStyle}>{prefix}</span>}
      <input
        type="number"
        style={inputStyle}
        value={value === 0 ? '' : value}
        placeholder="0"
        min="0"
        max={max}
        step={step || 1}
        onChange={(e) => { const v = parseFloat(e.target.value) || 0; onChange(max !== undefined ? Math.min(v, max) : v); }}
      />
    </div>
  );
}

function OpsRow({ label, sub, value, onChange, revenue }: { label: string; sub: string; value: number; onChange: (v: number) => void; revenue: number }) {
  const pct = revenue > 0 ? +(value / revenue * 100).toFixed(1) : 0;
  return (
    <Row label={label} sub={sub}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'right', marginBottom: '4px' }}>% of rev</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <input
              type="number"
              value={pct === 0 ? '' : pct}
              placeholder="0"
              min="0"
              step="0.1"
              style={{ width: '52px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 6px', background: '#fff', color: '#111' }}
              onChange={(e) => onChange(Math.round(revenue * (parseFloat(e.target.value) || 0) / 100))}
            />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>%</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'right', marginBottom: '4px' }}>$ amount</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>$</span>
            <input
              type="number"
              value={value === 0 ? '' : value}
              placeholder="0"
              min="0"
              step="1"
              style={{ width: '80px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px', background: '#fff', color: '#111' }}
              onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
            />
          </div>
        </div>
      </div>
    </Row>
  );
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={rowStyle}>
      <div style={labelStyle}>
        {label}
        {sub && <div style={subStyle}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

export default function ClubBudgetCalculator() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const [revenueOpen, setRevenueOpen] = usePersist('calc_revenueOpen', true);
  const [coachingOpen, setCoachingOpen] = usePersist('calc_coachingOpen', false);
  const [facilitiesOpen, setFacilitiesOpen] = usePersist('calc_facilitiesOpen', false);
  const [operationsOpen, setOperationsOpen] = usePersist('calc_operationsOpen', false);
  const [ledgerOpen, setLedgerOpen] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const [players, setPlayers] = useState(16);
  const [numTeams, setNumTeams] = useState(1);
  const [fee, setFee] = useState(150);
  const [months, setMonths] = useState(10);
  const [fundraising, setFundraising] = useState(0);

  const [numCoaches, setNumCoaches] = useState(1);
  const [headCoach, setHeadCoach] = useState(850);
  const [headCoachMonths, setHeadCoachMonths] = useState(10);
  const [numAssistants, setNumAssistants] = useState(0);
  const [assistantCoach, setAssistantCoach] = useState(0);
  const [assistantMonths, setAssistantMonths] = useState(10);
  const [specialty, setSpecialty] = useState(0);

  const [fieldHr, setFieldHr] = useState(120);
  const [sessions, setSessions] = useState(3);
  const [hrs, setHrs] = useState(1.5);
  const [weeks, setWeeks] = useState(40);
  const [gamesField, setGamesField] = useState(2400);

  const [league, setLeague] = useState(2400);      // ~8% of $30k
  const [insurance, setInsurance] = useState(1200); // ~4% of $30k
  const [equipment, setEquipment] = useState(1500); // ~5% of $30k
  const [admin, setAdmin] = useState(600);
  const [software, setSoftware] = useState(150);
  const [marketing, setMarketing] = useState(300);
  const [otherOps, setOtherOps] = useState(0);

  const totalPlayers = players * numTeams;
  const monthlyPayroll = numCoaches * headCoach;
  const playerFees = totalPlayers * fee * months;
  const revenue = playerFees + fundraising;

  const coaching = monthlyPayroll * headCoachMonths;
  const assistantAnn = numAssistants * assistantCoach * assistantMonths;
  const specialtyAnn = specialty * months;
  const fieldTraining = fieldHr * sessions * hrs * weeks;
  const adminAnn = (admin + software) * months;

  const totalCosts =
    coaching + assistantAnn + specialtyAnn + fieldTraining +
    league + insurance + equipment + adminAnn + marketing + otherOps;

  const net = revenue - totalCosts;
  const totalHrs = sessions * hrs * weeks;
  const cph = totalHrs > 0 && totalPlayers > 0 ? totalCosts / totalPlayers / totalHrs : 0;
  const costPP = totalPlayers > 0 ? totalCosts / totalPlayers : 0;

  const handleSendPdf = async () => {
    if (!email || sendStatus === 'loading') return;
    setSendStatus('loading');
    try {
      const res = await fetch('/api/send-budget-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, name,
          inputs: { players, numTeams, totalPlayers, fee, months, fundraising, numCoaches, headCoach, headCoachMonths, specialty, fieldHr, sessions, hrs, weeks, league, insurance, equipment, admin, software, marketing },
          results: { revenue, playerFees, fundraising, coaching, assistantAnn, specialtyAnn, fieldTraining, league, insurance, equipment, adminAnn, marketing, totalCosts, net, cph, costPP, totalHrs },
        }),
      });
      setSendStatus(res.ok ? 'sent' : 'error');
    } catch {
      setSendStatus('error');
    }
  };

  const barCategories = [
    { label: 'Coaching staff', val: coaching + assistantAnn + specialtyAnn, color: '#1D9E75' },
    { label: 'Field & facilities', val: fieldTraining, color: '#378ADD' },
    { label: 'League & tournaments', val: league, color: '#7F77DD' },
    { label: 'Equipment', val: equipment, color: '#EF9F27' },
    { label: 'Insurance', val: insurance, color: '#D85A30' },
    { label: 'Admin & software', val: adminAnn, color: '#888780' },
    { label: 'Marketing', val: marketing, color: '#97C459' },
  ].filter((c) => c.val > 0).sort((a, b) => b.val - a.val);

  const maxBar = Math.max(...barCategories.map((c) => c.val), 1);

  let insightBg: string, insightBorder: string, insightColor: string, insightText: string;
  if (net > 0) {
    insightBg = '#EAF3DE'; insightBorder = '#639922'; insightColor = '#27500A';
    insightText = `Surplus of ${fmt(net)} — This club has margin to reinvest in facilities, coaching quality, or player scholarships. Ask where it goes.`;
  } else if (net < -5000) {
    insightBg = '#FCEBEB'; insightBorder = '#E24B4A'; insightColor = '#791F1F';
    const shortfall = players > 0 ? Math.abs(net) / players / months : 0;
    insightText = `Deficit of ${fmt(Math.abs(net))} — The current fee structure doesn't cover operating costs. Fees would need to increase by ${fmt(shortfall)}/player/month to break even.`;
  } else {
    insightBg = '#FAEEDA'; insightBorder = '#BA7517'; insightColor = '#633806';
    insightText = 'Nearly balanced — This budget is close to break-even. A small change in player count or fee could tip it either direction.';
  }

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1rem 1rem 4rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      <div style={{ position: 'sticky', top: '64px', zIndex: 40, background: '#fff', margin: '0 -1rem', padding: '10px 1rem 12px', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <p style={{ ...sectionLabelStyle, margin: 0 }}>Annual budget summary</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setLedgerOpen(true)} style={{ fontSize: '11px', fontWeight: '600', color: '#111', background: '#f0f0f0', border: 'none', borderRadius: '999px', padding: '4px 12px', cursor: 'pointer' }}>📋 Full ledger</button>
            <button onClick={() => setBreakdownOpen(true)} style={{ fontSize: '11px', fontWeight: '600', color: '#111', background: '#f0f0f0', border: 'none', borderRadius: '999px', padding: '4px 12px', cursor: 'pointer' }}>📊 Cost breakdown</button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '10px' }}>
          {[
            { label: 'Total revenue', val: fmt(revenue) },
            { label: 'Total costs', val: fmt(totalCosts) },
            { label: 'Surplus / Deficit', val: (net >= 0 ? '+' : '') + fmt(net), color: net >= 0 ? '#3B6D11' : '#A32D2D', bg: net >= 0 ? '#EAF3DE' : '#FCEBEB' },
          ].map((m) => (
            <div key={m.label} style={{ background: (m as {bg?: string}).bg || '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
              <span style={{ fontSize: '18px', fontWeight: '500', color: m.color || '#111', display: 'block' }}>{m.val}</span>
              <div style={{ fontSize: '11px', color: (m as {bg?: string}).bg ? m.color : '#9ca3af', marginTop: '3px', opacity: 0.7 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <SectionHeader label="Revenue" open={revenueOpen} onToggle={() => setRevenueOpen(o => !o)} />
      {revenueOpen && <div style={cardStyle}>
        <Row label="Players on roster" sub="Per team × number of teams">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textAlign: 'right' }}>Per Team</div>
              <NumInput value={players} onChange={setPlayers} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px', textAlign: 'right' }}># of Teams</div>
              <NumInput value={numTeams} onChange={setNumTeams} />
            </div>
          </div>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total players</span>
          <span style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{totalPlayers} players</span>
        </div>
        <Row label="Monthly fee per player" sub="Average">
          <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'right', marginBottom: '4px' }}>Monthly</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>$</span>
                <input type="number" value={fee === 0 ? '' : fee} placeholder="0" min="0" step="1"
                  style={{ width: '72px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px', background: '#fff', color: '#111' }}
                  onChange={(e) => setFee(parseFloat(e.target.value) || 0)} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#9ca3af', textAlign: 'right', marginBottom: '4px' }}>Annual</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>$</span>
                <input type="number" value={fee * months === 0 ? '' : fee * months} placeholder="0" min="0" step="1"
                  style={{ width: '80px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px', background: '#fff', color: '#111' }}
                  onChange={(e) => setFee(months > 0 ? Math.round((parseFloat(e.target.value) || 0) / months) : 0)} />
              </div>
            </div>
          </div>
        </Row>
        <Row label="Season length (months)" sub="Months fees are collected">
          <NumInput value={months} onChange={setMonths} />
        </Row>
        <Row label="Other revenue" sub="Tournaments, events, sponsorships, donations">
          <NumInput value={fundraising} onChange={setFundraising} prefix="$" />
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total annual revenue</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#3B6D11' }}>{fmt(revenue)}</span>
        </div>
      </div>}

      <SectionHeader label="Coaching staff" open={coachingOpen} onToggle={() => setCoachingOpen(o => !o)} />
      {coachingOpen && <div style={cardStyle}>
        <Row label="Head coach" sub="Count × monthly salary × months">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}># of Coaches</div>
              <NumInput value={numCoaches} onChange={setNumCoaches} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Monthly Salary</div>
              <NumInput value={headCoach} onChange={setHeadCoach} prefix="$" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Months</div>
              <NumInput value={headCoachMonths} onChange={setHeadCoachMonths} max={12} />
            </div>
          </div>
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Monthly coaching payroll</span>
          <span style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{fmt(monthlyPayroll)} / month</span>
        </div>
        <Row label="Assistant coaches" sub="Count × monthly salary × months">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}># of Coaches</div>
              <NumInput value={numAssistants} onChange={setNumAssistants} />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Monthly Salary</div>
              <NumInput value={assistantCoach} onChange={setAssistantCoach} prefix="$" />
            </div>
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>Months</div>
              <NumInput value={assistantMonths} onChange={setAssistantMonths} max={12} />
            </div>
          </div>
        </Row>
        <Row label="Specialty coaches (GK, fitness, etc.)" sub="Monthly cost total">
          <NumInput value={specialty} onChange={setSpecialty} prefix="$" />
        </Row>

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total annual coaching cost</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>{fmt(coaching + assistantAnn + specialtyAnn)}</span>
        </div>
      </div>}

      <SectionHeader label="Facilities" open={facilitiesOpen} onToggle={() => setFacilitiesOpen(o => !o)} />
      {facilitiesOpen && <div style={cardStyle}>
        <Row label="Field rental cost per hour" sub="Market rate even if club owns">
          <NumInput value={fieldHr} onChange={setFieldHr} prefix="$" />
        </Row>
        <Row label="Training sessions per week" sub="Number of weekly practices">
          <NumInput value={sessions} onChange={setSessions} />
        </Row>
        <Row label="Hours per session" sub="Length of each practice">
          <NumInput value={hrs} onChange={setHrs} step={0.5} />
        </Row>
        <Row label="Training weeks per year" sub="Weeks actually on field">
          <NumInput value={weeks} onChange={setWeeks} max={52} />
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total annual field cost</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>{fmt(fieldTraining)}</span>
        </div>
      </div>}

      <SectionHeader label="Operations & overhead" open={operationsOpen} onToggle={() => setOperationsOpen(o => !o)} />
      {operationsOpen && <div style={cardStyle}>
        <OpsRow label="League & tournament entry fees" sub="Annual registrations" value={league} onChange={setLeague} revenue={revenue} />
        <OpsRow label="Player & club insurance" sub="Annual premium" value={insurance} onChange={setInsurance} revenue={revenue} />
        <OpsRow label="Equipment" sub="Kits, balls, cones, goals — annual" value={equipment} onChange={setEquipment} revenue={revenue} />
        <OpsRow label="Administrative staff" sub="Monthly — annualized" value={admin} onChange={setAdmin} revenue={revenue} />
        <OpsRow label="Software & platforms" sub="Monthly — annualized" value={software} onChange={setSoftware} revenue={revenue} />
        <OpsRow label="Marketing & communications" sub="Annual" value={marketing} onChange={setMarketing} revenue={revenue} />
        <OpsRow label="Other" sub="Any additional operating costs" value={otherOps} onChange={setOtherOps} revenue={revenue} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total annual operations cost</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>{fmt(league + insurance + equipment + adminAnn + marketing + otherOps)}</span>
        </div>
      </div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0f2642', borderRadius: '10px', padding: '12px 16px', margin: '4px 0 16px' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Total annual costs</span>
        <span style={{ fontSize: '18px', fontWeight: '700', color: '#fff' }}>{fmt(totalCosts)}</span>
      </div>

      {ledgerOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={() => setLedgerOpen(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '80vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>Full ledger</span>
              <button onClick={() => setLedgerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#9ca3af', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1 }}>
              {[
                { label: 'Revenue', isHeader: true },
                { label: 'Player fees', val: fmt(playerFees), green: true },
                { label: 'Other revenue', val: fmt(fundraising), green: true },
                { label: 'Total revenue', val: fmt(revenue), total: true, green: true },
                { label: 'Expenses', isHeader: true },
                { label: 'Coaching staff', val: fmt(coaching) },
                { label: 'Assistant coaches', val: fmt(assistantAnn) },
                { label: 'Assistant coaches', val: fmt(assistantAnn) },
                { label: 'Specialty coaches', val: fmt(specialtyAnn) },
                { label: 'Field rental (training)', val: fmt(fieldTraining) },
                { label: 'League & tournaments', val: fmt(league) },
                { label: 'Insurance', val: fmt(insurance) },
                { label: 'Equipment', val: fmt(equipment) },
                { label: 'Admin & software', val: fmt(adminAnn) },
                { label: 'Marketing & communications', val: fmt(marketing) },
                { label: 'Total costs', val: fmt(totalCosts), total: true },
                { label: 'Net', val: (net >= 0 ? '+' : '') + fmt(net), total: true, netColor: net >= 0 ? '#3B6D11' : '#A32D2D', big: true },
              ].map((row, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: row.isHeader ? '8px 20px' : '10px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  background: row.isHeader || row.total ? '#f9fafb' : '#fff',
                  fontSize: row.big ? '16px' : row.isHeader ? '11px' : '13px',
                  fontWeight: row.total || row.isHeader ? '500' : '400',
                  letterSpacing: row.isHeader ? '0.06em' : 'normal',
                  textTransform: row.isHeader ? 'uppercase' as const : 'none' as const,
                  color: row.isHeader ? '#9ca3af' : '#111',
                }}>
                  <span>{row.label}</span>
                  {row.val && <span style={{ color: (row as {netColor?: string}).netColor || ((row as {green?: boolean}).green ? '#3B6D11' : '#111') }}>{row.val}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div style={{ borderLeft: `3px solid ${insightBorder}`, padding: '10px 14px', fontSize: '13px', lineHeight: '1.6', marginTop: '12px', background: insightBg, color: insightColor }}>
        {insightText}
      </div>

      {breakdownOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }} onClick={() => setBreakdownOpen(false)}>
          <div style={{ background: '#fff', borderRadius: '16px', width: '100%', maxWidth: '480px', maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#111' }}>Cost breakdown</div>
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>Total costs: <strong style={{ color: '#111' }}>{fmt(totalCosts)}</strong></div>
              </div>
              <button onClick={() => setBreakdownOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#9ca3af', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ overflowY: 'auto', flex: 1, padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {barCategories.map((c) => {
                const pct = totalCosts > 0 ? Math.round(c.val / totalCosts * 100) : 0;
                return (
                  <div key={c.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#374151', marginBottom: '6px' }}>
                      <span>{c.label}</span>
                      <span style={{ fontWeight: '600', color: '#111' }}>{fmt(c.val)} <span style={{ fontWeight: '400', color: '#9ca3af' }}>({pct}%)</span></span>
                    </div>
                    <div style={{ background: '#f0f0f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', borderRadius: '4px', background: c.color, width: `${Math.round(c.val / maxBar * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px', marginTop: '4px', background: '#f9fafb', borderRadius: '10px', padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '500', color: '#111' }}>Cost per training hour per player</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>The real unit you&apos;re buying</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '22px', fontWeight: '600', color: '#111' }}>{cph > 0 ? '$' + cph.toFixed(2) : '$—'}</span>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>/ hour / player</div>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '12px', color: '#6b7280', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <span><strong>{Math.round(totalHrs)}</strong> training hrs/yr</span>
                  <span><strong>{fmt(costPP)}</strong> cost per player/yr</span>
                  <span><strong>{fmt(fee * months)}</strong> fee per player/yr</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '28px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#111', marginBottom: '4px' }}>Get a PDF copy of these results</div>
        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '14px' }}>Enter your email and we'll send a clean one-page report.</div>
        {sendStatus === 'sent' ? (
          <div style={{ fontSize: '14px', color: '#3B6D11', background: '#EAF3DE', border: '1px solid #639922', borderRadius: '8px', padding: '10px 14px' }}>
            Sent! Check your inbox for the report.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ flex: '1', minWidth: '140px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px', background: '#fff', color: '#111' }}
              />
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (sendStatus === 'error') setSendStatus('idle'); }}
                style={{ flex: '1', minWidth: '180px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px', background: '#fff', color: '#111' }}
              />
            </div>
            <button
              onClick={handleSendPdf}
              disabled={!email || sendStatus === 'loading'}
              style={{ fontSize: '14px', fontWeight: '600', background: sendStatus === 'loading' ? '#9ca3af' : '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 20px', cursor: !email || sendStatus === 'loading' ? 'not-allowed' : 'pointer', alignSelf: 'flex-start' }}
            >
              {sendStatus === 'loading' ? 'Sending…' : 'Send PDF'}
            </button>
          </div>
        )}
        {sendStatus === 'error' && (
          <div style={{ fontSize: '12px', color: '#A32D2D', marginTop: '8px' }}>Something went wrong — please try again.</div>
        )}
      </div>

    </div>
  );
}
