/**
 * Build the roster template coaches fill in and send back to Megan.
 *
 * Written by a script rather than edited by hand so the thing on the website
 * and the thing in this repo cannot drift, and so a change to it is a diff
 * somebody can read.
 *
 * Two facts about a team are the same on every row of a roster: the coach's
 * phone number, and the age group. They used to be columns, which asked a
 * coach to type the same number thirty times and made every one of those
 * thirty a chance to type it differently. They sit in the heading now, asked
 * once. Everything genuinely per-player stays in the table.
 *
 *   node scripts/build-roster-template.js
 */

const path = require('path');
const ExcelJS = require('exceljs');

const OUT = path.join(__dirname, '..', 'public', 'anytime-soccer-player-signup-form.xlsx');

const NAVY = '000F3154';
const RED = '00DC373E';
const WHITE = '00FFFFFF';
const GREY_TEXT = '005A6472';
const ROW_FILL = '00F4F5F7';
const LINE = '00D9DEE5';

const PLAYER_ROWS = 50;

// Wide enough for a real youth roster at both ends: a 2004 is a high-school
// leaver, a 2022 has just started. Blank is allowed -- the whole point of
// putting it here was that it is optional.
const BIRTH_YEARS = [];
for (let y = 2004; y <= 2022; y++) BIRTH_YEARS.push(y);

const COLUMNS = [
  { header: '#', width: 6 },
  { header: 'PARENT FIRST NAME', width: 22 },
  { header: 'PLAYER FIRST NAME', width: 22 },
  { header: 'PLAYER LAST NAME', width: 22 },
  { header: 'PARENT EMAIL ADDRESS', width: 32 },
  { header: 'TEAM NAME', width: 24 },
  { header: 'COACH OR PLAYER', width: 18 },
];

const LAST_COL = String.fromCharCode(64 + COLUMNS.length); // 'G'

const border = () => ({
  left: { style: 'thin', color: { argb: LINE } },
  right: { style: 'thin', color: { argb: LINE } },
  top: { style: 'thin', color: { argb: LINE } },
  bottom: { style: 'thin', color: { argb: LINE } },
});

const fill = (argb) => ({ type: 'pattern', pattern: 'solid', fgColor: { argb } });

async function build() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'Anytime Soccer Training';
  const ws = wb.addWorksheet('Player Signup Form', {
    views: [{ state: 'frozen', ySplit: 7, showGridLines: false }],
  });

  ws.columns = COLUMNS.map(c => ({ width: c.width }));

  // 1 — the navy title bar.
  ws.mergeCells(`A1:${LAST_COL}1`);
  ws.getRow(1).height = 34;
  Object.assign(ws.getCell('A1'), {
    value: 'ANYTIME SOCCER TRAINING  \u2014  PLAYER SIGNUP FORM',
    font: { name: 'Calibri', bold: true, color: { argb: WHITE }, size: 16 },
    fill: fill(NAVY),
    alignment: { horizontal: 'left', vertical: 'middle', indent: 1 },
  });

  // 2 — the red instruction bar.
  ws.mergeCells(`A2:${LAST_COL}2`);
  ws.getRow(2).height = 22;
  Object.assign(ws.getCell('A2'), {
    value: 'Please return this form as an MS Excel file (.xlsx) only.',
    font: { name: 'Calibri', bold: true, color: { argb: WHITE }, size: 11 },
    fill: fill(RED),
    alignment: { horizontal: 'left', vertical: 'middle', indent: 1 },
  });

  ws.getRow(3).height = 8;

  // 4 and 5 — the two facts that are the same on every row, asked once.
  const heading = (rowNo, label, note) => {
    ws.getRow(rowNo).height = 22;
    const labelCell = ws.getCell(`A${rowNo}`);
    ws.mergeCells(`A${rowNo}:B${rowNo}`);
    Object.assign(labelCell, {
      value: label,
      font: { name: 'Calibri', bold: true, color: { argb: NAVY }, size: 11 },
      alignment: { horizontal: 'left', vertical: 'middle', indent: 1 },
    });
    const input = ws.getCell(`C${rowNo}`);
    Object.assign(input, {
      fill: fill(ROW_FILL),
      border: border(),
      alignment: { horizontal: 'left', vertical: 'middle', indent: 1 },
      font: { name: 'Calibri', size: 11 },
    });
    if (note) {
      ws.mergeCells(`D${rowNo}:${LAST_COL}${rowNo}`);
      Object.assign(ws.getCell(`D${rowNo}`), {
        value: note,
        font: { name: 'Calibri', italic: true, color: { argb: GREY_TEXT }, size: 10 },
        alignment: { horizontal: 'left', vertical: 'middle', indent: 1 },
      });
    }
    return input;
  };

  // Text, not a number: a phone number with a leading zero or a +1 in front of
  // it is not arithmetic, and Excel will happily eat both.
  const phone = heading(4, 'COACH PHONE NUMBER', 'So we can reach you about the roster.');
  phone.numFmt = '@';

  const birthYear = heading(5, 'TEAM BIRTH YEAR', 'Optional \u2014 pick the age group, or leave it blank.');
  birthYear.dataValidation = {
    type: 'list',
    allowBlank: true,
    formulae: [`"${BIRTH_YEARS.join(',')}"`],
    showErrorMessage: true,
    errorTitle: 'Pick a year from the list',
    error: 'Choose one of the birth years, or leave this blank.',
    promptTitle: 'Team birth year',
    prompt: 'The age group this team plays in. Optional.',
  };

  ws.getRow(6).height = 8;

  // 7 — the table header.
  const head = ws.getRow(7);
  head.height = 30;
  COLUMNS.forEach((c, i) => {
    Object.assign(head.getCell(i + 1), {
      value: c.header,
      font: { name: 'Calibri', bold: true, color: { argb: WHITE }, size: 10 },
      fill: fill(NAVY),
      alignment: { horizontal: 'center', vertical: 'middle', wrapText: true },
      border: border(),
    });
  });

  // 8 onwards — the players.
  for (let i = 0; i < PLAYER_ROWS; i++) {
    const rowNo = 8 + i;
    const row = ws.getRow(rowNo);
    row.height = 18;
    for (let c = 1; c <= COLUMNS.length; c++) {
      const cell = row.getCell(c);
      cell.border = border();
      cell.alignment = { horizontal: c === 1 ? 'center' : 'left', vertical: 'middle', indent: c === 1 ? 0 : 1 };
      cell.font = { name: 'Calibri', size: 10, ...(c === 1 ? { bold: true, color: { argb: GREY_TEXT } } : {}) };
      if (c === 1) cell.fill = fill(ROW_FILL);
    }
    row.getCell(1).value = i + 1;
    row.getCell(COLUMNS.length).dataValidation = {
      type: 'list',
      allowBlank: true,
      formulae: ['"Coach,Player"'],
      promptTitle: 'Coach or Player',
      prompt: 'Choose Coach or Player',
    };
  }

  await wb.xlsx.writeFile(OUT);
  console.log(`wrote ${OUT}`);
  console.log(`  columns    : ${COLUMNS.map(c => c.header).join(' | ')}`);
  console.log(`  heading    : coach phone (row 4), team birth year (row 5, ${BIRTH_YEARS[0]}\u2013${BIRTH_YEARS[BIRTH_YEARS.length - 1]}, optional)`);
  console.log(`  player rows: ${PLAYER_ROWS}`);
}

build().catch((e) => { console.error(e); process.exit(1); });
