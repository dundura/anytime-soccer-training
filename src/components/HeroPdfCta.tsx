'use client';

import { useState } from 'react';

const SAMPLE_INPUTS = { players: 16, numTeams: 1, totalPlayers: 16, fee: 4000, months: 10, fundraising: 0, numCoaches: 1, headCoach: 850, headCoachMonths: 10, specialty: 0, fieldHr: 120, sessions: 2, hrs: 1.5, weeks: 40, league: 4000, insurance: 1920, equipment: 2400, admin: 960, software: 960, marketing: 1440 };
const SAMPLE_RESULTS = { revenue: 64000, playerFees: 64000, fundraising: 0, otherRevenue: 0, coaching: 8500, assistantAnn: 0, specialtyAnn: 0, fieldTraining: 18000, league: 4000, insurance: 1920, equipment: 2400, adminAnn: 19200, marketing: 1440, totalCosts: 55460, net: 8540, cph: 17.27, costPP: 3466, totalHrs: 120 };

async function buildExcelBase64(
  inputs: typeof SAMPLE_INPUTS,
  results: typeof SAMPLE_RESULTS
): Promise<string> {
  const XLSX = await import('xlsx');
  const wb = XLSX.utils.book_new();
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const fCell = (v: number, f: string) => ({ t: 'n' as const, v, f });

  // ── SUMMARY ──────────────────────────────────────────────────────────
  const sumData: (string | number)[][] = [
    ['SOCCER CLUB BUDGET REPORT', ''],
    [`Generated: ${today}`, ''],
    [''],
    ['REVENUE', ''],
    ['Player fees',           results.playerFees],       // B5
    ['Tournament revenue',    0],                         // B6
    ['Fundraising',           results.fundraising],       // B7
    ['Other revenue',         results.otherRevenue],      // B8
    ['Total Revenue',         results.revenue],           // B9  ← formula
    [''],
    ['EXPENSES', ''],
    ['Coaching staff',        results.coaching],          // B12
    ['Assistant coaches',     results.assistantAnn],      // B13
    ['Specialty coaches',     results.specialtyAnn],      // B14
    ['Field & facilities',    results.fieldTraining],     // B15
    ['League & tournaments',  results.league],            // B16
    ['Insurance',             results.insurance],         // B17
    ['Equipment',             results.equipment],         // B18
    ['Admin & software',      results.adminAnn],          // B19
    ['Marketing',             results.marketing],         // B20
    ['Other expenses',        0],                         // B21
    ['Total Costs',           results.totalCosts],        // B22 ← formula
    [''],
    ['Surplus / Deficit',     results.net],               // B24 ← formula
    [''],
    ['METRICS', ''],
    ['Total players',         inputs.totalPlayers],       // B27
    ['Season length (months)',inputs.months],
    ['Cost per player / year',Math.round(results.costPP)],// B29 ← formula
    ['Cost per training hr / player', parseFloat(results.cph.toFixed(2))],
    ['Total training hours / year',   Math.round(results.totalHrs)],
  ];
  const wsSum = XLSX.utils.aoa_to_sheet(sumData);
  wsSum['B9']  = fCell(results.revenue,    'B5+B6+B7+B8');
  wsSum['B22'] = fCell(results.totalCosts, 'SUM(B12:B21)');
  wsSum['B24'] = fCell(results.net,        'B9-B22');
  wsSum['B29'] = fCell(Math.round(results.costPP), 'IF(B27>0,B22/B27,0)');
  wsSum['!cols'] = [{ wch: 36 }, { wch: 18 }];
  XLSX.utils.book_append_sheet(wb, wsSum, 'Summary');

  // ── REVENUE ───────────────────────────────────────────────────────────
  const revData: (string | number)[][] = [
    ['REVENUE DETAIL', '', '', ''],
    [''],
    ['Program', 'Players', 'Annual Fee / Player', 'Revenue'],
    ['Program 1', inputs.players, inputs.fee, results.playerFees],
    [''],
    ['Other Revenue', '', '', ''],
    ['Tournament revenue', '', '', 0],
    ['Fundraising',        '', '', results.fundraising],
    ['Other revenue',      '', '', results.otherRevenue],
    [''],
    ['TOTAL REVENUE', '', '', results.revenue],
  ];
  const wsRev = XLSX.utils.aoa_to_sheet(revData);
  wsRev['D4']  = fCell(results.playerFees, 'B4*C4');
  wsRev['D11'] = fCell(results.revenue,    'D4+D7+D8+D9');
  wsRev['!cols'] = [{ wch: 22 }, { wch: 10 }, { wch: 20 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsRev, 'Revenue');

  // ── COACHING ──────────────────────────────────────────────────────────
  const coachData: (string | number)[][] = [
    ['COACHING STAFF', '', '', '', ''],
    [''],
    ['Role / Name', '# Count', 'Monthly $', 'Months', 'Annual'],
    ['Coaches', inputs.numCoaches, inputs.headCoach, inputs.headCoachMonths, results.coaching],
    [''],
    ['TOTAL ANNUAL COACHING COST', '', '', '', results.coaching],
  ];
  const wsCoach = XLSX.utils.aoa_to_sheet(coachData);
  wsCoach['E4'] = fCell(results.coaching, 'B4*C4*D4');
  wsCoach['E6'] = fCell(results.coaching, 'SUM(E4:E4)');
  wsCoach['!cols'] = [{ wch: 28 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsCoach, 'Coaching');

  // ── FACILITIES ────────────────────────────────────────────────────────
  const trainingCost = inputs.fieldHr * inputs.sessions * inputs.hrs * inputs.weeks;
  const facData: (string | number)[][] = [
    ['FACILITIES', '', ''],
    [''],
    ['FIELD RENTAL (TRAINING)', '', ''],
    ['Cost per hour ($)',      inputs.fieldHr,  ''],
    ['Sessions per week',      inputs.sessions, ''],
    ['Hours per session',      inputs.hrs,      ''],
    ['Training weeks per year',inputs.weeks,    ''],
    ['Training field rental',  trainingCost,    ''],
    [''],
    ['HOME GAMES', '', ''],
    ['Number of home games',   15,              ''],
    ['Game field rental',      15*2*inputs.fieldHr, ''],
    [''],
    ['Winter / indoor facility', 0,             ''],
    [''],
    ['TOTAL FIELD COST',       results.fieldTraining, ''],
  ];
  const wsFac = XLSX.utils.aoa_to_sheet(facData);
  wsFac['B8']  = fCell(trainingCost,           'B4*B5*B6*B7');
  wsFac['B12'] = fCell(15*2*inputs.fieldHr,    'B11*2*B4');
  wsFac['B16'] = fCell(results.fieldTraining,  'B8+B12+B14');
  wsFac['!cols'] = [{ wch: 34 }, { wch: 16 }, { wch: 10 }];
  XLSX.utils.book_append_sheet(wb, wsFac, 'Facilities');

  // ── OPERATIONS ────────────────────────────────────────────────────────
  const opsData: (string | number)[][] = [
    ['OPERATIONS & OVERHEAD', '', ''],
    [''],
    ['Line Item', 'Monthly ($)', 'Annual ($)'],
    ['League & tournaments',     '', inputs.league],
    ['Insurance',                '', inputs.insurance],
    ['Equipment',                '', inputs.equipment],
    ['Admin staff',              inputs.admin,     inputs.admin * inputs.months],
    ['Software & platforms',     inputs.software,  inputs.software * inputs.months],
    ['Marketing',                '', inputs.marketing],
    ['Other',                    '', 0],
    [''],
    ['TOTAL OPERATIONS', '', results.league + results.insurance + results.equipment + results.adminAnn + results.marketing],
  ];
  const wsOps = XLSX.utils.aoa_to_sheet(opsData);
  wsOps['C7']  = fCell(inputs.admin * inputs.months,    `B7*${inputs.months}`);
  wsOps['C8']  = fCell(inputs.software * inputs.months, `B8*${inputs.months}`);
  wsOps['C12'] = fCell(results.league + results.insurance + results.equipment + results.adminAnn + results.marketing, 'SUM(C4:C10)');
  wsOps['!cols'] = [{ wch: 34 }, { wch: 14 }, { wch: 14 }];
  XLSX.utils.book_append_sheet(wb, wsOps, 'Operations');

  return XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
}

export default function HeroPdfCta() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');

  const handleSend = async () => {
    if (!email || status === 'loading') return;
    setStatus('loading');
    try {
      // Use real calculator data from localStorage snapshot if available, else defaults
      let inputs = SAMPLE_INPUTS;
      let results = SAMPLE_RESULTS;
      try {
        const snap = localStorage.getItem('calc_snapshot');
        if (snap) {
          const parsed = JSON.parse(snap);
          if (parsed.inputs && parsed.results) {
            inputs = parsed.inputs;
            results = parsed.results;
          }
        }
      } catch {}

      const excelBase64 = await buildExcelBase64(inputs, results);

      const res = await fetch('/api/send-budget-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, inputs, results, excelBase64 }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="mt-6 text-white text-[14px] font-medium">
        ✓ Sent! Check your inbox for the PDF &amp; Excel.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="text-white/50 text-[12px] mb-2 uppercase tracking-wider font-semibold">Get a PDF &amp; Excel of your results</div>
      <div className="flex flex-wrap gap-2">
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="flex-1 min-w-[130px] text-[14px] rounded-lg px-3 py-2 bg-white border border-white/20 text-[#111] placeholder-gray-400 outline-none"
        />
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={e => { setEmail(e.target.value); if (status === 'error') setStatus('idle'); }}
          className="flex-1 min-w-[180px] text-[14px] rounded-lg px-3 py-2 bg-white border border-white/20 text-[#111] placeholder-gray-400 outline-none"
        />
        <button
          onClick={handleSend}
          disabled={!email || status === 'loading'}
          className="text-[13px] font-semibold bg-[#DC373E] hover:bg-[#c42f35] text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {status === 'loading' ? 'Sending…' : 'Send PDF & Excel'}
        </button>
      </div>
      {status === 'error' && <div className="text-red-300 text-[12px] mt-2">Something went wrong — try again.</div>}
    </div>
  );
}
