'use client';

import { useState, useEffect } from 'react';

const fmt = (n: number) => '$' + Math.round(n).toLocaleString();

type CoachRow = {
  id: number;
  name: string;
  count: number;
  monthly: number;
  months: number;
};

function usePersist<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : defaultValue; } catch { return defaultValue; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }, [key, value]);
  return [value, setValue];
}

const newRow = (): CoachRow => ({ id: Date.now() + Math.random(), name: '', count: 1, monthly: 0, months: 10 });

const inputBase: React.CSSProperties = {
  fontSize: '14px', border: '1px solid #d1d5db', borderRadius: '6px',
  padding: '6px 8px', background: '#fff', color: '#111', outline: 'none',
  textAlign: 'right',
};

export default function CoachSchedule() {
  const [rows, setRows] = usePersist<CoachRow[]>('calc_coachSchedule', [newRow()]);

  const total = rows.reduce((sum, r) => sum + r.count * r.monthly * r.months, 0);

  // Sync total to calculator via localStorage
  useEffect(() => {
    try { localStorage.setItem('calc_coachScheduleTotal', JSON.stringify(total)); } catch {}
  }, [total]);

  const update = (id: number, field: keyof CoachRow, val: string | number) =>
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: val } : r));

  const addRow = () => setRows(prev => [...prev, newRow()]);
  const removeRow = (id: number) => {
    if (rows.length === 1) return;
    setRows(prev => prev.filter(r => r.id !== id));
  };

  const clearAll = () => {
    setRows([newRow()]);
    try { localStorage.removeItem('calc_coachScheduleTotal'); } catch {}
  };

  const downloadExcel = async () => {
    const XLSX = await import('xlsx');
    const wb = XLSX.utils.book_new();

    // Build worksheet data
    const wsData: (string | number)[][] = [
      ['Coach Salary Schedule'],
      [],
      ['Role / Name', '# Count', 'Monthly Salary', 'Months', 'Annual Cost'],
      ...rows.map(r => [
        r.name || 'Unnamed',
        r.count,
        r.monthly,
        r.months,
        r.count * r.monthly * r.months,
      ]),
      [],
      ['Total annual coaching cost', '', '', '', total],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);

    // Column widths
    ws['!cols'] = [{ wch: 28 }, { wch: 10 }, { wch: 16 }, { wch: 10 }, { wch: 16 }];

    // Bold headers
    ['A1', 'A3', 'B3', 'C3', 'D3', 'E3'].forEach(cell => {
      if (ws[cell]) ws[cell].s = { font: { bold: true } };
    });

    XLSX.utils.book_append_sheet(wb, ws, 'Coach Schedule');
    XLSX.writeFile(wb, 'coach-salary-schedule.xlsx');
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto', padding: '1.5rem 1rem 4rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Back link */}
      <a href="/soccer-club-cost-calculator"
        style={{ fontSize: '13px', color: '#6b7280', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
        ← Back to calculator
      </a>

      {/* Header */}
      <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>Coach Salary Schedule</h1>
      <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px', lineHeight: '1.5' }}>
        Add each coach role with its own rate and contract length. The total syncs automatically to the club budget calculator.
      </p>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>

        {/* Column headers */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 72px 110px 80px 110px 36px',
          gap: '8px', padding: '10px 16px', background: '#f9fafb',
          borderBottom: '1px solid #e5e7eb', fontSize: '11px', fontWeight: '600',
          color: '#9ca3af', letterSpacing: '0.07em', textTransform: 'uppercase',
        }}>
          <div>Role / Name</div>
          <div style={{ textAlign: 'right' }}>Count</div>
          <div style={{ textAlign: 'right' }}>Monthly $</div>
          <div style={{ textAlign: 'right' }}>Months</div>
          <div style={{ textAlign: 'right' }}>Annual</div>
          <div />
        </div>

        {rows.map((r, idx) => {
          const annual = r.count * r.monthly * r.months;
          return (
            <div key={r.id} style={{
              display: 'grid', gridTemplateColumns: '1fr 72px 110px 80px 110px 36px',
              gap: '8px', padding: '10px 16px',
              borderBottom: idx < rows.length - 1 ? '1px solid #f0f0f0' : 'none',
              alignItems: 'center',
            }}>
              <input
                value={r.name}
                placeholder="e.g. Head Coach"
                onChange={e => update(r.id, 'name', e.target.value)}
                style={{ ...inputBase, textAlign: 'left', width: '100%' }}
              />
              <input
                type="number" inputMode="numeric"
                value={r.count === 0 ? '' : r.count} placeholder="1" min="0"
                onChange={e => update(r.id, 'count', parseFloat(e.target.value) || 0)}
                style={{ ...inputBase, width: '100%' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '12px', color: '#9ca3af' }}>$</span>
                <input
                  type="number" inputMode="numeric"
                  value={r.monthly === 0 ? '' : r.monthly} placeholder="0" min="0"
                  onChange={e => update(r.id, 'monthly', parseFloat(e.target.value) || 0)}
                  style={{ ...inputBase, flex: 1, minWidth: 0, width: '100%' }}
                />
              </div>
              <input
                type="number" inputMode="numeric"
                value={r.months === 0 ? '' : r.months} placeholder="10" min="0" max="12"
                onChange={e => update(r.id, 'months', parseFloat(e.target.value) || 0)}
                style={{ ...inputBase, width: '100%' }}
              />
              <div style={{
                textAlign: 'right', fontSize: '14px', fontWeight: '600',
                color: annual > 0 ? '#3B6D11' : '#9ca3af', padding: '5px 0',
              }}>
                {annual > 0 ? fmt(annual) : '—'}
              </div>
              <button
                onClick={() => removeRow(r.id)}
                disabled={rows.length === 1}
                style={{
                  background: 'none', border: 'none',
                  cursor: rows.length === 1 ? 'not-allowed' : 'pointer',
                  color: '#d1d5db', fontSize: '16px', padding: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title="Remove row"
              >✕</button>
            </div>
          );
        })}
      </div>

      {/* Add row */}
      <button
        onClick={addRow}
        style={{
          fontSize: '13px', color: '#6b7280', background: 'none',
          border: '1px dashed #d1d5db', borderRadius: '8px', padding: '9px 16px',
          cursor: 'pointer', width: '100%', marginBottom: '20px',
        }}
      >+ Add coach role</button>

      {/* Total bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: '#0f2642', borderRadius: '10px', padding: '14px 20px',
      }}>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff' }}>Total annual coaching cost</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>Synced to budget calculator</div>
        </div>
        <span style={{ fontSize: '22px', fontWeight: '700', color: '#fff' }}>{fmt(total)}</span>
      </div>

      {/* Sync notice */}
      <div style={{
        marginTop: '12px', padding: '10px 14px', background: '#f0fdf4',
        border: '1px solid #bbf7d0', borderRadius: '8px', fontSize: '12px',
        color: '#3B6D11', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '8px',
      }}>
        <span>✓ Total saved &amp; synced to the{' '}
          <a href="/soccer-club-cost-calculator" style={{ color: '#3B6D11', fontWeight: '600' }}>budget calculator</a>
        </span>
        <button
          onClick={clearAll}
          style={{ fontSize: '11px', color: '#9ca3af', background: 'none', border: 'none', cursor: 'pointer', padding: '2px 6px' }}
        >Clear all</button>
      </div>
    </div>
  );
}
