'use client';

import { useState } from 'react';

const SAMPLE_INPUTS = { players: 16, numTeams: 1, totalPlayers: 16, fee: 4000, months: 10, fundraising: 0, numCoaches: 1, headCoach: 850, headCoachMonths: 10, specialty: 0, fieldHr: 120, sessions: 2, hrs: 1.5, weeks: 40, league: 4000, insurance: 1920, equipment: 2400, admin: 960, software: 960, marketing: 1440 };
const SAMPLE_RESULTS = { revenue: 64000, playerFees: 64000, fundraising: 0, otherRevenue: 0, coaching: 8500, assistantAnn: 0, specialtyAnn: 0, fieldTraining: 18000, league: 4000, insurance: 1920, equipment: 2400, adminAnn: 19200, marketing: 1440, totalCosts: 55460, net: 8540, cph: 17.27, costPP: 3466, totalHrs: 120 };

async function buildExcelBase64(
  inputs: typeof SAMPLE_INPUTS,
  results: typeof SAMPLE_RESULTS
): Promise<string> {
  const ExcelJS: any = (await import('exceljs')).default;
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Anytime Soccer Training';
  wb.created = new Date();

  const NAVY   = '0F2642';
  const BLUE   = '1E3A5F';
  const LGRAY  = 'F0F4F8';
  const WHITE  = 'FFFFFF';
  const GREEN  = '3B6D11';
  const RED    = 'B91C1C';
  const GOLD   = 'F5A623';
  const BORDER_COLOR = 'D1D5DB';

  const cur = '$"#,##0';
  const pct = '0.0%';
  const num = '#,##0.00';
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const thinBorder = (color = BORDER_COLOR) => ({
    top:    { style: 'thin' as const, color: { argb: 'FF' + color } },
    left:   { style: 'thin' as const, color: { argb: 'FF' + color } },
    bottom: { style: 'thin' as const, color: { argb: 'FF' + color } },
    right:  { style: 'thin' as const, color: { argb: 'FF' + color } },
  });

  function fill(hex: string) {
    return { type: 'pattern' as const, pattern: 'solid' as const, fgColor: { argb: 'FF' + hex } };
  }

  function applyBorder(ws: any, row: number, startCol: number, endCol: number, color = BORDER_COLOR) {
    for (let c = startCol; c <= endCol; c++) {
      const cell = ws.getRow(row).getCell(c);
      cell.border = thinBorder(color);
    }
  }

  function titleRow(ws: any, rowNum: number, label: string, colspan: number) {
    const row = ws.getRow(rowNum);
    row.height = 30;
    const c = row.getCell(1);
    c.value = label;
    c.font   = { bold: true, size: 14, color: { argb: 'FF' + WHITE }, name: 'Calibri' };
    c.fill   = fill(NAVY);
    c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    c.border = thinBorder(NAVY);
    for (let i = 2; i <= colspan; i++) {
      const cc = row.getCell(i);
      cc.fill = fill(NAVY);
      cc.border = thinBorder(NAVY);
    }
    ws.mergeCells(rowNum, 1, rowNum, colspan);
  }

  function sectionRow(ws: any, rowNum: number, label: string, colspan: number) {
    const row = ws.getRow(rowNum);
    row.height = 20;
    const c = row.getCell(1);
    c.value = label;
    c.font   = { bold: true, size: 11, color: { argb: 'FF' + WHITE }, name: 'Calibri' };
    c.fill   = fill(BLUE);
    c.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    c.border = thinBorder(BLUE);
    for (let i = 2; i <= colspan; i++) {
      const cc = row.getCell(i);
      cc.fill = fill(BLUE);
      cc.border = thinBorder(BLUE);
    }
    ws.mergeCells(rowNum, 1, rowNum, colspan);
  }

  function headerRow(ws: any, rowNum: number, labels: string[], alignments: string[] = []) {
    const row = ws.getRow(rowNum);
    row.height = 18;
    labels.forEach((lbl, i) => {
      const c = row.getCell(i + 1);
      c.value = lbl;
      c.font  = { bold: true, size: 10, color: { argb: 'FF' + NAVY }, name: 'Calibri' };
      c.fill  = fill(LGRAY);
      c.alignment = { vertical: 'middle', horizontal: (alignments[i] as any) || 'left', indent: i === 0 ? 1 : 0 };
      c.border = thinBorder();
    });
  }

  function dataRow(ws: any, rowNum: number, values: (string | number | null)[], numFmts: string[] = [], altRow = false) {
    const row = ws.getRow(rowNum);
    row.height = 17;
    values.forEach((v, i) => {
      const c = row.getCell(i + 1);
      if (v !== null) c.value = v;
      if (numFmts[i]) c.numFmt = numFmts[i];
      c.fill = fill(altRow ? LGRAY : WHITE);
      c.alignment = { vertical: 'middle', horizontal: (i === 0 ? 'left' : 'right') as any, indent: i === 0 ? 1 : 0 };
      c.border = thinBorder();
      c.font = { size: 10, name: 'Calibri' };
    });
  }

  function formulaRow(ws: any, rowNum: number, label: string, formula: string, result: number, format: string, isGreen = true, colspan: number, totalCols: number) {
    const row = ws.getRow(rowNum);
    row.height = 20;
    const lc = row.getCell(1);
    lc.value = label;
    lc.font  = { bold: true, size: 11, color: { argb: 'FF' + WHITE }, name: 'Calibri' };
    lc.fill  = fill(isGreen ? GREEN : RED);
    lc.alignment = { vertical: 'middle', horizontal: 'left', indent: 1 };
    lc.border = thinBorder(isGreen ? GREEN : RED);
    for (let i = 2; i < colspan; i++) {
      const cc = row.getCell(i);
      cc.fill = fill(isGreen ? GREEN : RED);
      cc.border = thinBorder(isGreen ? GREEN : RED);
    }
    if (colspan > 1) ws.mergeCells(rowNum, 1, rowNum, colspan - 1);
    const vc = row.getCell(colspan);
    vc.value = { formula, result };
    vc.numFmt = format;
    vc.font   = { bold: true, size: 11, color: { argb: 'FF' + WHITE }, name: 'Calibri' };
    vc.fill   = fill(isGreen ? GREEN : RED);
    vc.alignment = { vertical: 'middle', horizontal: 'right' };
    vc.border = thinBorder(isGreen ? GREEN : RED);
    for (let i = colspan + 1; i <= totalCols; i++) {
      const ec = row.getCell(i);
      ec.fill = fill(isGreen ? GREEN : RED);
      ec.border = thinBorder(isGreen ? GREEN : RED);
    }
  }

  function spacer(ws: any, rowNum: number, cols: number) {
    const row = ws.getRow(rowNum);
    row.height = 6;
    for (let i = 1; i <= cols; i++) {
      row.getCell(i).fill = fill(WHITE);
    }
  }

  // ── SHEET 1: SUMMARY ────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Summary');
    ws.columns = [
      { width: 36 },
      { width: 18 },
    ];

    let r = 1;
    titleRow(ws, r++, '⚽  SOCCER CLUB BUDGET REPORT', 2);
    const subRow = ws.getRow(r++);
    subRow.height = 16;
    const sc = subRow.getCell(1);
    sc.value = `Generated: ${today}`;
    sc.font  = { italic: true, size: 9, color: { argb: 'FF9CA3AF' }, name: 'Calibri' };
    sc.fill  = fill(NAVY);
    sc.border = thinBorder(NAVY);
    ws.getRow(r - 1).getCell(2).fill = fill(NAVY);
    ws.mergeCells(r - 1, 1, r - 1, 2);

    spacer(ws, r++, 2);

    // REVENUE
    sectionRow(ws, r++, 'REVENUE', 2);
    headerRow(ws, r++, ['Line Item', 'Amount'], ['left', 'right']);
    dataRow(ws, r++, ['Player fees', results.playerFees], ['', cur], false);
    dataRow(ws, r++, ['Fundraising', results.fundraising], ['', cur], true);
    dataRow(ws, r++, ['Other revenue', results.otherRevenue], ['', cur], false);
    const revStart = r - 3; const revEnd = r - 1;
    formulaRow(ws, r++, 'Total Revenue', `SUM(B${revStart}:B${revEnd})`, results.revenue, cur, true, 1, 2);

    spacer(ws, r++, 2);

    // EXPENSES
    sectionRow(ws, r++, 'EXPENSES', 2);
    headerRow(ws, r++, ['Line Item', 'Amount'], ['left', 'right']);
    const expStart = r;
    dataRow(ws, r++, ['Coaching staff', results.coaching], ['', cur], false);
    dataRow(ws, r++, ['Field & facilities', results.fieldTraining], ['', cur], true);
    dataRow(ws, r++, ['League & tournaments', results.league], ['', cur], false);
    dataRow(ws, r++, ['Insurance', results.insurance], ['', cur], true);
    dataRow(ws, r++, ['Equipment', results.equipment], ['', cur], false);
    dataRow(ws, r++, ['Admin & software', results.adminAnn], ['', cur], true);
    dataRow(ws, r++, ['Marketing', results.marketing], ['', cur], false);
    const expEnd = r - 1;
    formulaRow(ws, r++, 'Total Costs', `SUM(B${expStart}:B${expEnd})`, results.totalCosts, cur, false, 1, 2);

    spacer(ws, r++, 2);

    // SURPLUS
    const surplus = results.net;
    formulaRow(ws, r++, surplus >= 0 ? '✓ Surplus' : '⚠ Deficit', `B${expStart - 3}-B${expEnd + 1}`, surplus, cur, surplus >= 0, 1, 2);

    spacer(ws, r++, 2);

    // METRICS
    sectionRow(ws, r++, 'METRICS', 2);
    headerRow(ws, r++, ['Metric', 'Value'], ['left', 'right']);
    dataRow(ws, r++, ['Total players', inputs.totalPlayers], ['', '#,##0'], false);
    dataRow(ws, r++, ['Season length (months)', inputs.months], ['', '#,##0'], true);
    dataRow(ws, r++, ['Annual fee per player', inputs.fee], ['', cur], false);
    dataRow(ws, r++, ['Cost per player / year', Math.round(results.costPP)], ['', cur], true);
    dataRow(ws, r++, ['Cost per training hr / player', parseFloat(results.cph.toFixed(2))], ['', num], false);
    dataRow(ws, r++, ['Total training hours / year', Math.round(results.totalHrs)], ['', '#,##0'], true);
  }

  // ── SHEET 2: REVENUE ────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Revenue');
    ws.columns = [{ width: 24 }, { width: 10 }, { width: 20 }, { width: 16 }];
    let r = 1;
    titleRow(ws, r++, 'REVENUE DETAIL', 4);
    spacer(ws, r++, 4);
    sectionRow(ws, r++, 'PROGRAM FEES', 4);
    headerRow(ws, r++, ['Program', 'Players', 'Annual Fee/Player', 'Revenue'], ['left', 'right', 'right', 'right']);
    const pRow = r;
    dataRow(ws, r++, ['Program 1', inputs.players, inputs.fee, null], ['', '#,##0', cur, cur], false);
    ws.getRow(pRow).getCell(4).value = { formula: `B${pRow}*C${pRow}`, result: results.playerFees };
    ws.getRow(pRow).getCell(4).numFmt = cur;
    ws.getRow(pRow).getCell(4).border = thinBorder();
    spacer(ws, r++, 4);
    sectionRow(ws, r++, 'OTHER REVENUE', 4);
    headerRow(ws, r++, ['Source', '', '', 'Amount'], ['left', 'left', 'left', 'right']);
    dataRow(ws, r++, ['Fundraising', '', '', results.fundraising], ['', '', '', cur], false);
    dataRow(ws, r++, ['Other revenue', '', '', results.otherRevenue], ['', '', '', cur], true);
    spacer(ws, r++, 4);
    formulaRow(ws, r++, 'TOTAL REVENUE', `B${pRow}+D${r - 3}+D${r - 2}`, results.revenue, cur, true, 3, 4);
  }

  // ── SHEET 3: COACHING ────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Coaching');
    ws.columns = [{ width: 28 }, { width: 10 }, { width: 16 }, { width: 10 }, { width: 16 }];
    let r = 1;
    titleRow(ws, r++, 'COACHING STAFF', 5);
    spacer(ws, r++, 5);
    headerRow(ws, r++, ['Role / Name', '# Count', 'Monthly $', 'Months', 'Annual'], ['left', 'right', 'right', 'right', 'right']);
    const cRow = r;
    dataRow(ws, r++, ['Coaches', inputs.numCoaches, inputs.headCoach, inputs.headCoachMonths, null], ['', '#,##0', cur, '#,##0', cur], false);
    ws.getRow(cRow).getCell(5).value = { formula: `B${cRow}*C${cRow}*D${cRow}`, result: results.coaching };
    ws.getRow(cRow).getCell(5).numFmt = cur;
    ws.getRow(cRow).getCell(5).border = thinBorder();
    spacer(ws, r++, 5);
    formulaRow(ws, r++, 'TOTAL ANNUAL COACHING COST', `E${cRow}`, results.coaching, cur, true, 4, 5);
  }

  // ── SHEET 4: FACILITIES ──────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Facilities');
    ws.columns = [{ width: 34 }, { width: 16 }, { width: 10 }];
    let r = 1;
    titleRow(ws, r++, 'FACILITIES', 3);
    spacer(ws, r++, 3);
    sectionRow(ws, r++, 'FIELD RENTAL — TRAINING', 3);
    headerRow(ws, r++, ['Parameter', 'Value', ''], ['left', 'right', 'left']);
    const fhr = r; dataRow(ws, r++, ['Cost per hour ($)', inputs.fieldHr, ''], ['', cur, ''], false);
    const fse = r; dataRow(ws, r++, ['Sessions per week', inputs.sessions, ''], ['', '#,##0', ''], true);
    const fhrs = r; dataRow(ws, r++, ['Hours per session', inputs.hrs, ''], ['', num, ''], false);
    const fwk = r; dataRow(ws, r++, ['Training weeks / year', inputs.weeks, ''], ['', '#,##0', ''], true);
    const fCostRow = r;
    dataRow(ws, r++, ['Training field rental', null, ''], ['', cur, ''], false);
    ws.getRow(fCostRow).getCell(2).value = { formula: `B${fhr}*B${fse}*B${fhrs}*B${fwk}`, result: inputs.fieldHr * inputs.sessions * inputs.hrs * inputs.weeks };
    ws.getRow(fCostRow).getCell(2).numFmt = cur;
    ws.getRow(fCostRow).getCell(2).border = thinBorder();
    spacer(ws, r++, 3);
    sectionRow(ws, r++, 'OTHER FACILITY COSTS', 3);
    dataRow(ws, r++, ['Winter / indoor facility', 0, ''], ['', cur, ''], false);
    spacer(ws, r++, 3);
    formulaRow(ws, r++, 'TOTAL FIELD COST', `B${fCostRow}+B${r - 2}`, results.fieldTraining, cur, true, 2, 3);
  }

  // ── SHEET 5: OPERATIONS ──────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Operations');
    ws.columns = [{ width: 34 }, { width: 16 }, { width: 16 }];
    let r = 1;
    titleRow(ws, r++, 'OPERATIONS & OVERHEAD', 3);
    spacer(ws, r++, 3);
    headerRow(ws, r++, ['Line Item', 'Monthly ($)', 'Annual ($)'], ['left', 'right', 'right']);
    const opStart = r;
    dataRow(ws, r++, ['League & tournaments', '', results.league], ['', '', cur], false);
    dataRow(ws, r++, ['Insurance', '', results.insurance], ['', '', cur], true);
    dataRow(ws, r++, ['Equipment', '', results.equipment], ['', '', cur], false);
    const admRow = r;
    dataRow(ws, r++, ['Admin staff', inputs.admin, null], ['', cur, cur], true);
    ws.getRow(admRow).getCell(3).value = { formula: `B${admRow}*${inputs.months}`, result: inputs.admin * inputs.months };
    ws.getRow(admRow).getCell(3).numFmt = cur;
    ws.getRow(admRow).getCell(3).border = thinBorder();
    const swRow = r;
    dataRow(ws, r++, ['Software & platforms', inputs.software, null], ['', cur, cur], false);
    ws.getRow(swRow).getCell(3).value = { formula: `B${swRow}*${inputs.months}`, result: inputs.software * inputs.months };
    ws.getRow(swRow).getCell(3).numFmt = cur;
    ws.getRow(swRow).getCell(3).border = thinBorder();
    dataRow(ws, r++, ['Marketing', '', results.marketing], ['', '', cur], true);
    const opEnd = r - 1;
    spacer(ws, r++, 3);
    formulaRow(ws, r++, 'TOTAL OPERATIONS', `SUM(C${opStart}:C${opEnd})`, results.league + results.insurance + results.equipment + (inputs.admin * inputs.months) + (inputs.software * inputs.months) + results.marketing, cur, true, 2, 3);
  }

  const arrayBuffer = await wb.xlsx.writeBuffer() as ArrayBuffer;
  const bytes = new Uint8Array(arrayBuffer);
  let binary = '';
  bytes.forEach((b: number) => { binary += String.fromCharCode(b); });
  return btoa(binary);
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
