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

const inputStyle = { textAlign: 'right' as const, fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px', background: '#fff', color: '#111' };
const rowStyle = { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' };

function NumInput({ value, onChange, width = '92px' }: { value: number; onChange: (v: number) => void; width?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <span style={{ fontSize: '13px', color: '#666' }}>$</span>
      <input type="number" inputMode="numeric" value={value === 0 ? '' : value} placeholder="0" min="0"
        onChange={e => onChange(parseFloat(e.target.value) || 0)}
        style={{ ...inputStyle, width }} />
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', margin: '16px 0 4px' }}>{children}</div>;
}

interface CompEntry { id: number; name: string; cost: number; teams: number; perTeam: boolean }

export default function CompetitionsWorksheet() {
  const [leagueReg, setLeagueReg] = usePersist('cw_leagueReg', 0);
  const [stateCup, setStateCup] = usePersist('cw_stateCup', 0);
  const [stateCupTeams, setStateCupTeams] = usePersist('cw_stateCupTeams', 1);
  const [presidentsCup, setPresidentsCup] = usePersist('cw_presidentsCup', 0);
  const [presidentsCupTeams, setPresidentsCupTeams] = usePersist('cw_presidentsCupTeams', 1);
  const [collegeShowcase, setCollegeShowcase] = usePersist('cw_collegeShowcase', 0);
  const [indoorLeague, setIndoorLeague] = usePersist('cw_indoorLeague', 0);
  const [futsalLeague, setFutsalLeague] = usePersist('cw_futsalLeague', 0);
  const [numCustom, setNumCustom] = usePersist('cw_numCustom', 0);
  const [c1Name, setC1Name] = usePersist<string>('cw_c1Name', '');
  const [c1Cost, setC1Cost] = usePersist('cw_c1Cost', 0);
  const [c1Teams, setC1Teams] = usePersist('cw_c1Teams', 1);
  const [c1PerTeam, setC1PerTeam] = usePersist('cw_c1PerTeam', false);
  const [c2Name, setC2Name] = usePersist<string>('cw_c2Name', '');
  const [c2Cost, setC2Cost] = usePersist('cw_c2Cost', 0);
  const [c2Teams, setC2Teams] = usePersist('cw_c2Teams', 1);
  const [c2PerTeam, setC2PerTeam] = usePersist('cw_c2PerTeam', false);
  const [c3Name, setC3Name] = usePersist<string>('cw_c3Name', '');
  const [c3Cost, setC3Cost] = usePersist('cw_c3Cost', 0);
  const [c3Teams, setC3Teams] = usePersist('cw_c3Teams', 1);
  const [c3PerTeam, setC3PerTeam] = usePersist('cw_c3PerTeam', false);
  const [c4Name, setC4Name] = usePersist<string>('cw_c4Name', '');
  const [c4Cost, setC4Cost] = usePersist('cw_c4Cost', 0);
  const [c4Teams, setC4Teams] = usePersist('cw_c4Teams', 1);
  const [c4PerTeam, setC4PerTeam] = usePersist('cw_c4PerTeam', false);

  const stateCupTotal = stateCup * stateCupTeams;
  const presidentsCupTotal = presidentsCup * presidentsCupTeams;
  const c1Total = c1PerTeam ? c1Cost * c1Teams : c1Cost;
  const c2Total = c2PerTeam ? c2Cost * c2Teams : c2Cost;
  const c3Total = c3PerTeam ? c3Cost * c3Teams : c3Cost;
  const c4Total = c4PerTeam ? c4Cost * c4Teams : c4Cost;

  const total = leagueReg + stateCupTotal + presidentsCupTotal + collegeShowcase + indoorLeague + futsalLeague +
    (numCustom >= 1 ? c1Total : 0) + (numCustom >= 2 ? c2Total : 0) +
    (numCustom >= 3 ? c3Total : 0) + (numCustom >= 4 ? c4Total : 0);

  // Sync total to club calculator
  useEffect(() => {
    try { localStorage.setItem('calc_league', JSON.stringify(total)); } catch {}
  }, [total]);

  const handleReset = () => {
    ['cw_leagueReg','cw_stateCup','cw_stateCupTeams','cw_presidentsCup','cw_presidentsCupTeams','cw_collegeShowcase','cw_indoorLeague','cw_futsalLeague','cw_numCustom','cw_c1Name','cw_c1Cost','cw_c1Teams','cw_c1PerTeam','cw_c2Name','cw_c2Cost','cw_c2Teams','cw_c2PerTeam','cw_c3Name','cw_c3Cost','cw_c3Teams','cw_c3PerTeam','cw_c4Name','cw_c4Cost','cw_c4Teams','cw_c4PerTeam'].forEach(k => localStorage.removeItem(k));
    window.location.reload();
  };

  const customEntries = [
    { name: c1Name, setName: setC1Name, cost: c1Cost, setCost: setC1Cost, teams: c1Teams, setTeams: setC1Teams, perTeam: c1PerTeam, setPerTeam: setC1PerTeam, total: c1Total },
    { name: c2Name, setName: setC2Name, cost: c2Cost, setCost: setC2Cost, teams: c2Teams, setTeams: setC2Teams, perTeam: c2PerTeam, setPerTeam: setC2PerTeam, total: c2Total },
    { name: c3Name, setName: setC3Name, cost: c3Cost, setCost: setC3Cost, teams: c3Teams, setTeams: setC3Teams, perTeam: c3PerTeam, setPerTeam: setC3PerTeam, total: c3Total },
    { name: c4Name, setName: setC4Name, cost: c4Cost, setCost: setC4Cost, teams: c4Teams, setTeams: setC4Teams, perTeam: c4PerTeam, setPerTeam: setC4PerTeam, total: c4Total },
  ];

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto', padding: '1.5rem 1rem 4rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Total summary */}
      <div style={{ background: '#0f2642', borderRadius: '12px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Total competitions & leagues</span>
        <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>{fmt(total)}</span>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '0 1rem 0.75rem', marginBottom: '12px' }}>

        <SectionLabel>League fees</SectionLabel>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#111' }}>League registrations</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>State league, regional, ECNL, DA, etc. — annual total</div>
          </div>
          <NumInput value={leagueReg} onChange={setLeagueReg} />
        </div>

        <SectionLabel>Cup competitions</SectionLabel>

        {/* State Cup */}
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#111' }}>State Cup</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Entry fee per team</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <NumInput value={stateCup} onChange={setStateCup} width="80px" />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>×</span>
            <input type="number" inputMode="numeric" value={stateCupTeams === 0 ? '' : stateCupTeams} placeholder="1" min="1"
              onChange={e => setStateCupTeams(parseFloat(e.target.value) || 1)}
              style={{ ...inputStyle, width: '52px' }} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>teams</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111', minWidth: '60px', textAlign: 'right' }}>{stateCupTotal > 0 ? fmt(stateCupTotal) : '—'}</span>
          </div>
        </div>

        {/* Presidents Cup */}
        <div style={rowStyle}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '14px', color: '#111' }}>Presidents Cup / Regional</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Entry fee per team</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <NumInput value={presidentsCup} onChange={setPresidentsCup} width="80px" />
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>×</span>
            <input type="number" inputMode="numeric" value={presidentsCupTeams === 0 ? '' : presidentsCupTeams} placeholder="1" min="1"
              onChange={e => setPresidentsCupTeams(parseFloat(e.target.value) || 1)}
              style={{ ...inputStyle, width: '52px' }} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>teams</span>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111', minWidth: '60px', textAlign: 'right' }}>{presidentsCupTotal > 0 ? fmt(presidentsCupTotal) : '—'}</span>
          </div>
        </div>

        <SectionLabel>Showcase & alternate leagues</SectionLabel>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={{ fontSize: '14px', color: '#111' }}>College showcase</div><div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Annual total</div></div>
          <NumInput value={collegeShowcase} onChange={setCollegeShowcase} />
        </div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={{ fontSize: '14px', color: '#111' }}>Indoor league</div><div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Annual total</div></div>
          <NumInput value={indoorLeague} onChange={setIndoorLeague} />
        </div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={{ fontSize: '14px', color: '#111' }}>Futsal league</div><div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>Annual total</div></div>
          <NumInput value={futsalLeague} onChange={setFutsalLeague} />
        </div>

        {numCustom > 0 && <SectionLabel>Additional</SectionLabel>}
        {customEntries.slice(0, numCustom).map((c, i) => (
          <div key={i} style={{ ...rowStyle, flexWrap: 'wrap', gap: '8px' }}>
            <input value={c.name} onChange={e => c.setName(e.target.value)} placeholder="Competition name"
              style={{ flex: 1, minWidth: '120px', fontSize: '13px', border: '1px solid #d1d5db', borderRadius: '6px', padding: '5px 8px' }} />
            <NumInput value={c.cost} onChange={c.setCost} width="80px" />
            <label style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280', cursor: 'pointer' }}>
              <input type="checkbox" checked={c.perTeam} onChange={e => c.setPerTeam(e.target.checked)} />
              per team
            </label>
            {c.perTeam && <>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>×</span>
              <input type="number" inputMode="numeric" value={c.teams === 0 ? '' : c.teams} placeholder="1" min="1"
                onChange={e => c.setTeams(parseFloat(e.target.value) || 1)}
                style={{ ...inputStyle, width: '52px' }} />
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>teams</span>
            </>}
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#111', minWidth: '60px', textAlign: 'right' }}>{c.total > 0 ? fmt(c.total) : '—'}</span>
          </div>
        ))}

        {numCustom < 4 && (
          <button onClick={() => setNumCustom(n => Math.min(n + 1, 4))}
            style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280', background: 'none', border: '1px dashed #d1d5db', borderRadius: '6px', padding: '5px 12px', cursor: 'pointer', width: '100%' }}>
            + Add competition / league
          </button>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 4px', fontSize: '12px', color: '#9ca3af', marginTop: '4px', borderTop: '1px solid #f0f0f0' }}>
          <span>Total</span>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#111' }}>{fmt(total)}</span>
        </div>
      </div>

      <div style={{ background: '#EAF3DE', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#3B6D11', marginBottom: '16px' }}>
        ✓ This total auto-syncs to your <a href="/soccer-club-cost-calculator" style={{ fontWeight: '600', color: '#3B6D11' }}>Club Budget Calculator</a> — no need to type it in again.
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={() => window.history.back()} style={{ fontSize: '12px', color: '#6b7280', background: '#f0f0f0', border: 'none', borderRadius: '999px', padding: '5px 14px', cursor: 'pointer' }}>← Back</button>
        <button onClick={handleReset} style={{ fontSize: '12px', color: '#9ca3af', background: '#f0f0f0', border: 'none', borderRadius: '999px', padding: '5px 14px', cursor: 'pointer' }}>↺ Reset</button>
      </div>
    </div>
  );
}
