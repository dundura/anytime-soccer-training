import CompetitionsWorksheet from '@/components/CompetitionsWorksheet';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Competitions & Leagues Worksheet | Anytime Soccer Training',
  description: 'Plan all your club competition costs — league fees, state cup, showcases, indoor, futsal, and more. Totals sync automatically to the club budget calculator.',
};

export default function CompetitionsWorksheetPage() {
  return (
    <main>
      <section className="bg-[#0f2642] py-8 md:py-10">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
            Free Worksheet
          </div>
          <h1 className="text-[clamp(24px,4vw,38px)] font-extrabold text-white leading-tight mb-4">
            Competitions & Leagues Worksheet
          </h1>
          <p className="text-white/75 text-[15px] leading-relaxed max-w-[520px]">
            Add every league, cup, showcase, and tournament your club enters. Total syncs automatically to your club budget.
          </p>
        </div>
      </section>
      <CompetitionsWorksheet />
    </main>
  );
}
