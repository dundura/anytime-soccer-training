'use client';

import { useState, useEffect } from 'react';

function usePersist<T>(key: string, def: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [v, setV] = useState<T>(() => {
    if (typeof window === 'undefined') return def;
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : def; } catch { return def; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch {} }, [key, v]);
  return [v, setV];
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

function NumRow({ label, sub, value, onChange, prefix = '$' }: { label: string; sub?: string; value: number; onChange: (v: number) => void; prefix?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: '#111' }}>{label}</div>
        {sub && <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{sub}</div>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontSize: '13px', color: '#666' }}>{prefix}</span>
        <input
          type="number"
          inputMode="numeric"
          value={value === 0 ? '' : value}
          placeholder="0"
          min="0"
          onChange={e => onChange(parseFloat(e.target.value) || 0)}
          style={{ width: '100px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px', background: '#fff', color: '#111' }}
        />
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', margin: '16px 0 4px' }}>{children}</div>;
}

export default function TournamentWorksheet() {
  // Revenue — defaults based on a typical 50-team weekend tournament
  const [numTeams, setNumTeams] = usePersist('tw_numTeams', 50);
  const [entryFee, setEntryFee] = usePersist('tw_entryFee', 700);
  const [spectatorFee, setSpectatorFee] = usePersist('tw_spectatorFee', 5);
  const [spectatorCount, setSpectatorCount] = usePersist('tw_spectatorCount', 400);
  const [concessionRev, setConcessionRev] = usePersist('tw_concessionRev', 1500);
  const [sponsorships, setSponsorships] = usePersist('tw_sponsorships', 1000);
  const [otherRev, setOtherRev] = usePersist('tw_otherRev', 0);

  // Expenses — typical 50-team tournament costs
  const [fieldRental, setFieldRental] = usePersist('tw_fieldRental', 4500);
  const [refs, setRefs] = usePersist('tw_refs', 7000);
  const [sanctioning, setSanctioning] = usePersist('tw_sanctioning', 1200);
  const [trophiesMedals, setTrophiesMedals] = usePersist('tw_trophiesMedals', 2500);
  const [insurance, setInsurance] = usePersist('tw_insurance', 600);
  const [staffVolunteer, setStaffVolunteer] = usePersist('tw_staffVolunteer', 1000);
  const [marketing, setMarketing] = usePersist('tw_marketing', 750);
  const [concessionExp, setConcessionExp] = usePersist('tw_concessionExp', 600);
  const [portaPotties, setPortaPotties] = usePersist('tw_portaPotties', 500);
  const [fieldLights, setFieldLights] = usePersist('tw_fieldLights', 0);
  const [firstAid, setFirstAid] = usePersist('tw_firstAid', 400);
  const [otherExp, setOtherExp] = usePersist('tw_otherExp', 0);

  const totalRevenue = numTeams * entryFee + spectatorFee * spectatorCount + concessionRev + sponsorships + otherRev;
  const totalExpenses = fieldRental + refs + sanctioning + trophiesMedals + insurance + staffVolunteer + marketing + concessionExp + portaPotties + fieldLights + firstAid + otherExp;
  const net = totalRevenue - totalExpenses;

  // Sync totals to club calculator so both sheets stay in agreement
  useEffect(() => {
    try {
      localStorage.setItem('calc_tournamentRevenue', JSON.stringify(totalRevenue));
      localStorage.setItem('calc_tournamentExpense', JSON.stringify(totalExpenses));
    } catch {}
  }, [totalRevenue, totalExpenses]);
  const netColor = net >= 0 ? '#3B6D11' : '#A32D2D';
  const netBg = net >= 0 ? '#EAF3DE' : '#FCEBEB';

  const handleReset = () => {
    const keys = ['tw_numTeams','tw_entryFee','tw_spectatorFee','tw_spectatorCount','tw_concessionRev','tw_sponsorships','tw_otherRev','tw_fieldRental','tw_refs','tw_sanctioning','tw_trophiesMedals','tw_insurance','tw_staffVolunteer','tw_marketing','tw_concessionExp','tw_portaPotties','tw_fieldLights','tw_firstAid','tw_otherExp'];
    keys.forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };


  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1.5rem 1rem 4rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Top controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <a href="/soccer-club-cost-calculator" style={{ fontSize: '12px', color: '#6b7280', background: '#f0f0f0', borderRadius: '999px', padding: '5px 14px', textDecoration: 'none', fontWeight: '500' }}>← Back to Calculator</a>
        <button onClick={handleReset} style={{ fontSize: '12px', color: '#9ca3af', background: '#f0f0f0', border: 'none', borderRadius: '999px', padding: '5px 14px', cursor: 'pointer' }}>↺ Reset</button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'Total revenue', val: fmt(totalRevenue), color: '#111', bg: '#f9fafb' },
          { label: 'Total expenses', val: fmt(totalExpenses), color: '#111', bg: '#f9fafb' },
          { label: 'Net', val: (net >= 0 ? '+' : '') + fmt(net), color: netColor, bg: netBg },
        ].map(m => (
          <div key={m.label} style={{ background: m.bg, borderRadius: '10px', padding: '14px', textAlign: 'center', border: `1px solid ${m.bg === '#f9fafb' ? '#e5e7eb' : net >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
            <div style={{ fontSize: '20px', fontWeight: '700', color: m.color }}>{m.val}</div>
            <div style={{ fontSize: '11px', color: m.color === '#111' ? '#9ca3af' : m.color, opacity: 0.8, marginTop: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0 1rem 0.75rem', marginBottom: '12px' }}>
        <SectionLabel>Revenue</SectionLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#111' }}>Team entry fees</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Number of teams × entry fee</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input type="number" inputMode="numeric" value={numTeams === 0 ? '' : numTeams} placeholder="0" min="0"
              onChange={e => setNumTeams(parseFloat(e.target.value) || 0)}
              style={{ width: '60px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px' }} />
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>teams ×</span>
            <span style={{ fontSize: '13px', color: '#666' }}>$</span>
            <input type="number" inputMode="numeric" value={entryFee === 0 ? '' : entryFee} placeholder="0" min="0"
              onChange={e => setEntryFee(parseFloat(e.target.value) || 0)}
              style={{ width: '80px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px' }} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#111' }}>Spectator admission</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Fee × estimated attendance</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>$</span>
            <input type="number" inputMode="numeric" value={spectatorFee === 0 ? '' : spectatorFee} placeholder="0" min="0"
              onChange={e => setSpectatorFee(parseFloat(e.target.value) || 0)}
              style={{ width: '60px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px' }} />
            <span style={{ fontSize: '13px', color: '#9ca3af' }}>× </span>
            <input type="number" inputMode="numeric" value={spectatorCount === 0 ? '' : spectatorCount} placeholder="0" min="0"
              onChange={e => setSpectatorCount(parseFloat(e.target.value) || 0)}
              style={{ width: '70px', textAlign: 'right', fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px' }} />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>ppl</span>
          </div>
        </div>
        <NumRow label="Concession sales" sub="Food, drinks, merchandise" value={concessionRev} onChange={setConcessionRev} />
        <NumRow label="Sponsorships" sub="Banners, naming rights, program ads" value={sponsorships} onChange={setSponsorships} />
        <NumRow label="Other revenue" sub="Donations, raffle, etc." value={otherRev} onChange={setOtherRev} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total revenue</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#3B6D11' }}>{fmt(totalRevenue)}</span>
        </div>
      </div>

      {/* Expenses */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0 1rem 0.75rem', marginBottom: '12px' }}>
        <SectionLabel>Expenses</SectionLabel>
        <NumRow label="Field / facility rental" sub="All fields, days, and setup time" value={fieldRental} onChange={setFieldRental} />
        <NumRow label="Referees" sub="All games, all days" value={refs} onChange={setRefs} />
        <NumRow label="Sanctioning fees" sub="US Club, USYS, state association" value={sanctioning} onChange={setSanctioning} />
        <NumRow label="Trophies & medals" sub="Awards for all divisions" value={trophiesMedals} onChange={setTrophiesMedals} />
        <NumRow label="Insurance" sub="Tournament-specific coverage" value={insurance} onChange={setInsurance} />
        <NumRow label="Staff & volunteer costs" sub="T-shirts, meals, stipends" value={staffVolunteer} onChange={setStaffVolunteer} />
        <NumRow label="Marketing & registration" sub="Flyers, GotSoccer/GotSport fees" value={marketing} onChange={setMarketing} />
        <NumRow label="Concession costs" sub="Food, supplies, equipment" value={concessionExp} onChange={setConcessionExp} />
        <NumRow label="Port-a-potties" sub="Rental and service" value={portaPotties} onChange={setPortaPotties} />
        <NumRow label="Lighting rental" sub="Portable lights if needed" value={fieldLights} onChange={setFieldLights} />
        <NumRow label="First aid / medical" sub="Athletic trainers, supplies" value={firstAid} onChange={setFirstAid} />
        <NumRow label="Other expenses" sub="Anything not listed above" value={otherExp} onChange={setOtherExp} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0 4px', fontSize: '12px', color: '#9ca3af' }}>
          <span>Total expenses</span>
          <span style={{ fontWeight: '600', fontSize: '14px', color: '#111' }}>{fmt(totalExpenses)}</span>
        </div>
      </div>

      {/* Net bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: netBg, border: `1px solid ${net >= 0 ? '#bbf7d0' : '#fecaca'}`, borderRadius: '10px', padding: '14px 16px', marginBottom: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: netColor }}>Net {net >= 0 ? 'profit' : 'loss'}</span>
        <span style={{ fontSize: '22px', fontWeight: '800', color: netColor }}>{(net >= 0 ? '+' : '') + fmt(net)}</span>
      </div>


      <div style={{ marginTop: '20px', fontSize: '13px', color: '#6b7280', textAlign: 'center' }}>
        Want to model your full club budget?{' '}
        <a href="/soccer-club-cost-calculator" style={{ color: '#DC373E', fontWeight: '600', textDecoration: 'none' }}>Club Budget Calculator →</a>
      </div>
    </div>
  );
}
