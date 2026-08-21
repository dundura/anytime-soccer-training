import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Roster Template | Anytime Soccer Training',
  description:
    'Download the Anytime Soccer Training player signup form. One row per player — we use it to invite your families to the platform.',
};

const FILE = '/anytime-soccer-player-signup-form.xlsx';

const COLUMNS: { name: string; note: string }[] = [
  { name: 'Parent First Name', note: 'Who the invite is addressed to.' },
  { name: 'Player First Name', note: "The player's name as they'll see it in the app." },
  { name: 'Player Last Name', note: 'Helps us tell two Jacks apart.' },
  { name: 'Parent Email Address', note: 'The one that matters — this is where the invite goes.' },
  { name: 'Team Name', note: 'Exactly as you want it to appear on the team.' },
  { name: 'Coach Phone Number', note: 'So we can reach you if something looks off.' },
  { name: 'Coach or Player', note: 'Pick one from the dropdown. Coaches get a free account.' },
  { name: 'Birth Year', note: 'Four digits — 2014, not 14.' },
];

export default function RosterTemplatePage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-[#0f2642] py-10 md:py-12">
        <div className="max-w-[760px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
            Roster Template
          </div>
          <h1 className="text-[clamp(24px,4vw,38px)] font-extrabold text-white leading-tight mb-4">
            Player Signup Form
          </h1>
          <p className="text-white/75 text-[15px] leading-relaxed max-w-[560px] mb-7">
            One row per player. We use this to invite your families to the platform.
          </p>

          {/* The whole reason this page exists. It has to be the first thing you can act on. */}
          <a
            href={FILE}
            download
            className="inline-flex items-center gap-2 bg-[#DC373E] hover:bg-[#b92d33] text-white font-bold text-[15px] px-7 py-3.5 rounded-xl transition-colors"
          >
            ⬇ Download the Excel Template
          </a>
          <p className="text-white/50 text-[13px] mt-3">
            Excel workbook (.xlsx) &middot; 50 rows &middot; opens in Excel, Numbers or Google Sheets
          </p>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-12 md:py-14 bg-white">
        <div className="max-w-[760px] mx-auto px-5">
          <h2 className="text-[#0f2642] text-xl font-extrabold mb-5">How to fill it in</h2>

          <ol className="space-y-4 mb-10">
            {[
              <>
                <strong className="text-[#0f2642]">Download the file</strong> and open it in Excel,
                Numbers, or Google Sheets. It is yours &mdash; there is nothing to request access to
                and no copy to make.
              </>,
              <>
                <strong className="text-[#0f2642]">Add one row per player.</strong> The parent email
                is the important one: that is the address the invitation goes to.
              </>,
              <>
                <strong className="text-[#0f2642]">Add yourself as a Coach.</strong> Use the{' '}
                <em>Coach or Player</em> dropdown. Every team gets one free coach account.
              </>,
              <>
                <strong className="text-[#0f2642]">Send it back as an Excel file (.xlsx).</strong>{' '}
                Reply to any email from Megan with it attached, or send it to{' '}
                <a href="mailto:megan@anytime-soccer.com" className="text-[#DC373E] font-semibold hover:underline">
                  megan@anytime-soccer.com
                </a>
                .
              </>,
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0f2642] text-white font-bold text-sm">
                  {i + 1}
                </span>
                <span className="text-gray-700 leading-relaxed pt-1">{item}</span>
              </li>
            ))}
          </ol>

          <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-xl px-5 py-4 mb-10">
            <p className="text-[#166534] font-bold text-sm mb-1">Partial rosters are fine.</p>
            <p className="text-[#166534] text-sm leading-relaxed">
              Send what you have and the rest whenever you have it. Coaches on the same club can send
              theirs at different times &mdash; nothing waits on everyone being ready at once.
            </p>
          </div>

          <h2 className="text-[#0f2642] text-xl font-extrabold mb-4">What each column is for</h2>
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-10">
            <table className="w-full text-left text-sm">
              <tbody className="divide-y divide-gray-100">
                {COLUMNS.map(col => (
                  <tr key={col.name}>
                    <td className="px-4 py-3 font-bold text-[#0f2642] align-top whitespace-nowrap">
                      {col.name}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{col.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#f4f5f7] rounded-xl px-5 py-5 text-center">
            <p className="text-gray-700 text-sm mb-4">
              Ready when you are &mdash; grab the template and send it over.
            </p>
            <a
              href={FILE}
              download
              className="inline-flex items-center gap-2 bg-[#0f2642] hover:opacity-90 text-white font-bold text-[15px] px-7 py-3 rounded-xl transition-opacity"
            >
              ⬇ Download the Excel Template
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
