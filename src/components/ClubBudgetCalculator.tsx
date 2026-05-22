'use client';

import { useState } from 'react';

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
  borderRadius: '12px',
  padding: '1.25rem',
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

function NumInput({ value, onChange, prefix, step }: { value: number; onChange: (v: number) => void; prefix?: string; step?: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {prefix && <span style={prefixStyle}>{prefix}</span>}
      <input
        type="number"
        style={inputStyle}
        value={value === 0 ? '' : value}
        placeholder="0"
        min="0"
        step={step || 1}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
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
  const [email, setEmail] = useState('');
  const [sendStatus, setSendStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const [players, setPlayers] = useState(20);
  const [fee, setFee] = useState(450);
  const [months, setMonths] = useState(10);
  const [fundraising, setFundraising] = useState(0);

  const [numCoaches, setNumCoaches] = useState(2);
  const [headCoach, setHeadCoach] = useState(3000);
  const [specialty, setSpecialty] = useState(800);
  const [offseasonMonths, setOffseasonMonths] = useState(2);

  const [fieldHr, setFieldHr] = useState(120);
  const [sessions, setSessions] = useState(3);
  const [hrs, setHrs] = useState(1.5);
  const [weeks, setWeeks] = useState(40);
  const [gamesField, setGamesField] = useState(2400);

  const [league, setLeague] = useState(4000);
  const [insurance, setInsurance] = useState(2500);
  const [equipment, setEquipment] = useState(3000);
  const [admin, setAdmin] = useState(500);
  const [software, setSoftware] = useState(150);
  const [marketing, setMarketing] = useState(1200);

  const monthlyPayroll = numCoaches * headCoach;
  const playerFees = players * fee * months;
  const revenue = playerFees + fundraising;

  const coaching = monthlyPayroll * months;
  const offseason = monthlyPayroll * offseasonMonths * 0.5;
  const specialtyAnn = specialty * months;
  const fieldTraining = fieldHr * sessions * hrs * weeks;
  const adminAnn = (admin + software) * months;

  const totalCosts =
    coaching + offseason + specialtyAnn + fieldTraining + gamesField +
    league + insurance + equipment + adminAnn + marketing;

  const net = revenue - totalCosts;
  const totalHrs = sessions * hrs * weeks;
  const cph = totalHrs > 0 && players > 0 ? totalCosts / players / totalHrs : 0;
  const costPP = players > 0 ? totalCosts / players : 0;

  const handleSendPdf = async () => {
    if (!email || sendStatus === 'loading') return;
    setSendStatus('loading');
    try {
      const res = await fetch('/api/send-budget-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          inputs: { players, fee, months, fundraising, numCoaches, headCoach, specialty, offseasonMonths, fieldHr, sessions, hrs, weeks, gamesField, league, insurance, equipment, admin, software, marketing },
          results: { revenue, playerFees, fundraising, coaching, offseason, specialtyAnn, fieldTraining, gamesField, league, insurance, equipment, adminAnn, marketing, totalCosts, net, cph, costPP, totalHrs },
        }),
      });
      setSendStatus(res.ok ? 'sent' : 'error');
    } catch {
      setSendStatus('error');
    }
  };

  const barCategories = [
    { label: 'Coaching staff', val: coaching + offseason + specialtyAnn, color: '#1D9E75' },
    { label: 'Field & facilities', val: fieldTraining + gamesField, color: '#378ADD' },
    { label: 'League & tournaments', val: league, color: '#7F77DD' },
    { label: 'Uniforms & equipment', val: equipment, color: '#EF9F27' },
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

      <p style={sectionLabelStyle}>Revenue</p>
      <div style={cardStyle}>
        <Row label="Players on roster" sub="How many players pay fees">
          <NumInput value={players} onChange={setPlayers} />
        </Row>
        <Row label="Monthly fee per player" sub="What each family pays">
          <NumInput value={fee} onChange={setFee} prefix="$" />
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
      </div>

      <p style={sectionLabelStyle}>Coaching staff</p>
      <div style={cardStyle}>
        <Row label="Number of paid coaches" sub="Head + assistants on payroll">
          <NumInput value={numCoaches} onChange={setNumCoaches} />
        </Row>
        <Row label="Head coach monthly salary" sub="Paid coaches, not volunteers">
          <NumInput value={headCoach} onChange={setHeadCoach} prefix="$" />
        </Row>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Monthly coaching payroll</span>
          <span style={{ fontWeight: '500', fontSize: '13px', color: '#111' }}>{fmt(monthlyPayroll)} / month</span>
        </div>
        <Row label="Specialty coaches (GK, fitness, etc.)" sub="Monthly cost total">
          <NumInput value={specialty} onChange={setSpecialty} prefix="$" />
        </Row>
        <Row label="Off-season coach retainer (months)" sub="Months retained at reduced pay (÷2 rate)">
          <NumInput value={offseasonMonths} onChange={setOffseasonMonths} />
        </Row>
      </div>

      <p style={sectionLabelStyle}>Facilities</p>
      <div style={cardStyle}>
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
          <NumInput value={weeks} onChange={setWeeks} />
        </Row>
        <Row label="Tournament field rental (yearly)" sub="Games + tournament days">
          <NumInput value={gamesField} onChange={setGamesField} prefix="$" />
        </Row>
      </div>

      <p style={sectionLabelStyle}>Operations & overhead</p>
      <div style={cardStyle}>
        <Row label="League & tournament entry fees" sub="Annual registrations">
          <NumInput value={league} onChange={setLeague} prefix="$" />
        </Row>
        <Row label="Player & club insurance" sub="Annual premium">
          <NumInput value={insurance} onChange={setInsurance} prefix="$" />
        </Row>
        <Row label="Uniforms & equipment" sub="Kits, balls, cones, goals — annual">
          <NumInput value={equipment} onChange={setEquipment} prefix="$" />
        </Row>
        <Row label="Administrative staff" sub="Club director, registrar — monthly">
          <NumInput value={admin} onChange={setAdmin} prefix="$" />
        </Row>
        <Row label="Software & platforms" sub="Scheduling, payments, comms — monthly">
          <NumInput value={software} onChange={setSoftware} prefix="$" />
        </Row>
        <Row label="Marketing & communications" sub="Website, social, design — annual">
          <NumInput value={marketing} onChange={setMarketing} prefix="$" />
        </Row>
      </div>

      <p style={{ ...sectionLabelStyle, marginTop: '1.5rem' }}>Annual budget summary</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '10px', marginBottom: '16px' }}>
        {[
          { label: 'Total revenue', val: fmt(revenue) },
          { label: 'Total costs', val: fmt(totalCosts) },
          { label: 'Surplus / Deficit', val: (net >= 0 ? '+' : '') + fmt(net), color: net >= 0 ? '#3B6D11' : '#A32D2D' },
        ].map((m) => (
          <div key={m.label} style={{ background: '#f9fafb', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
            <span style={{ fontSize: '18px', fontWeight: '500', color: m.color || '#111', display: 'block' }}>{m.val}</span>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px' }}>{m.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden' }}>
        {[
          { label: 'Revenue', isHeader: true },
          { label: 'Player fees', val: fmt(playerFees), green: true },
          { label: 'Fundraising', val: fmt(fundraising), green: true },
          { label: 'Total revenue', val: fmt(revenue), total: true, green: true },
          { label: 'Expenses', isHeader: true },
          { label: 'Coaching staff', val: fmt(coaching) },
          { label: 'Off-season retention', val: fmt(offseason) },
          { label: 'Specialty coaches', val: fmt(specialtyAnn) },
          { label: 'Field rental (training)', val: fmt(fieldTraining) },
          { label: 'Field rental (games)', val: fmt(gamesField) },
          { label: 'League & tournaments', val: fmt(league) },
          { label: 'Insurance', val: fmt(insurance) },
          { label: 'Uniforms & equipment', val: fmt(equipment) },
          { label: 'Admin & software', val: fmt(adminAnn) },
          { label: 'Marketing & communications', val: fmt(marketing) },
          { label: 'Total costs', val: fmt(totalCosts), total: true },
          { label: 'Net', val: (net >= 0 ? '+' : '') + fmt(net), total: true, netColor: net >= 0 ? '#3B6D11' : '#A32D2D', big: true },
        ].map((row, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: row.isHeader ? '8px 16px' : '10px 16px',
            borderBottom: '1px solid #f0f0f0',
            background: row.isHeader || row.total ? '#f9fafb' : '#fff',
            fontSize: row.big ? '16px' : row.isHeader ? '11px' : '13px',
            fontWeight: row.total || row.isHeader ? '500' : '400',
            letterSpacing: row.isHeader ? '0.06em' : 'normal',
            textTransform: row.isHeader ? 'uppercase' as const : 'none' as const,
            color: row.isHeader ? '#9ca3af' : '#111',
          }}>
            <span>{row.label}</span>
            {row.val && <span style={{ color: row.netColor || (row.green ? '#3B6D11' : '#111') }}>{row.val}</span>}
          </div>
        ))}
      </div>

      <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px 16px', marginTop: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '500', color: '#111' }}>Cost per training hour per player</div>
            <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>The real unit you&apos;re buying</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '24px', fontWeight: '500', color: '#111' }}>{cph > 0 ? '$' + cph.toFixed(2) : '$—'}</span>
            <div style={{ fontSize: '11px', color: '#9ca3af' }}>/ hour / player</div>
          </div>
        </div>
        <div style={{ marginTop: '12px', fontSize: '12px', color: '#6b7280', display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
          <span><strong>{Math.round(totalHrs)}</strong> total training hrs/yr</span>
          <span><strong>{fmt(costPP)}</strong> cost per player/yr</span>
          <span><strong>{fmt(fee * months)}</strong> fee per player/yr</span>
        </div>
      </div>

      <div style={{ borderLeft: `3px solid ${insightBorder}`, padding: '10px 14px', fontSize: '13px', lineHeight: '1.6', marginTop: '12px', background: insightBg, color: insightColor }}>
        {insightText}
      </div>

      <p style={{ ...sectionLabelStyle, marginTop: '1.5rem' }}>Cost breakdown</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {barCategories.map((c) => (
          <div key={c.label}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>
              <span>{c.label}</span>
              <span style={{ fontWeight: '500', color: '#111' }}>{fmt(c.val)}</span>
            </div>
            <div style={{ background: '#f0f0f0', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '4px', background: c.color, width: `${Math.round(c.val / maxBar * 100)}%`, transition: 'width 0.3s ease' }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '28px', background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#111', marginBottom: '4px' }}>Get a PDF copy of these results</div>
        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '14px' }}>Enter your email and we'll send a clean one-page report.</div>
        {sendStatus === 'sent' ? (
          <div style={{ fontSize: '14px', color: '#3B6D11', background: '#EAF3DE', border: '1px solid #639922', borderRadius: '8px', padding: '10px 14px' }}>
            Sent! Check your inbox for the report.
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (sendStatus === 'error') setSendStatus('idle'); }}
              style={{ flex: '1', minWidth: '200px', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '8px', padding: '9px 12px', background: '#fff', color: '#111' }}
            />
            <button
              onClick={handleSendPdf}
              disabled={!email || sendStatus === 'loading'}
              style={{ fontSize: '14px', fontWeight: '600', background: sendStatus === 'loading' ? '#9ca3af' : '#111', color: '#fff', border: 'none', borderRadius: '8px', padding: '9px 20px', cursor: !email || sendStatus === 'loading' ? 'not-allowed' : 'pointer', whiteSpace: 'nowrap' }}
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
