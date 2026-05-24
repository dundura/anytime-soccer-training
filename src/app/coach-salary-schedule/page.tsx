import CoachSchedule from '@/components/CoachSchedule';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Coach Salary Schedule | Anytime Soccer Training',
  description: 'Build a detailed coach salary schedule with multiple roles and rates. Total syncs automatically to the club budget calculator.',
};

export default function CoachSalarySchedulePage() {
  return (
    <main>
      <section className="bg-[#0f2642] py-8 md:py-10">
        <div className="max-w-[700px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
            Budget Tool
          </div>
          <h1 className="text-[clamp(22px,4vw,34px)] font-extrabold text-white leading-tight mb-3">
            Coach Salary Schedule
          </h1>
          <p className="text-white/75 text-[14px] leading-relaxed max-w-[520px]">
            Add each coach role with its own rate and contract length. The total syncs automatically to the club budget calculator.
          </p>
        </div>
      </section>
      <CoachSchedule />
    </main>
  );
}
