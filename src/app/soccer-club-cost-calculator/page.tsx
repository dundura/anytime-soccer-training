import ClubBudgetCalculator from '@/components/ClubBudgetCalculator';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Cost of Running a Soccer Club | Anytime Soccer Training',
  description: "See exactly what it costs to run a youth soccer club — coaching, facilities, insurance, and more. Enter the numbers and find out what you're really paying for.",
};

export default function BudgetCalculatorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0f2642] py-14 md:py-20">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-6">
            Interactive Calculator
          </div>
          <div>

          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-white leading-tight mb-5">
            The Soccer Club<br />
            <span className="text-[#DC373E]">Cost Calculator</span>
          </h1>

          <p className="text-white/75 text-[16px] leading-relaxed mb-6 max-w-[560px]">
            Thinking about starting a club? Already running one? Or just tired of hearing parents complain about fees? Plug in your numbers and see exactly what it actually costs — coaching, field time, insurance, admin — all of it.
          </p>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3 mt-10">
            {[
              { val: '$5K–$15K', label: 'Avg. annual fee per player' },
              { val: '$30–$80', label: 'True cost per training hour' },
              { val: '40%+', label: 'Of budget goes to coaching' },
            ].map((s) => (
              <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl p-4 text-center" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <div className="text-white font-bold text-[18px] mb-1">{s.val}</div>
                <div className="text-white/50 text-[11px] leading-snug">{s.label}</div>
              </div>
            ))}
          </div>

          </div>
        </div>
      </section>

      {/* Calculator */}
      <ClubBudgetCalculator />
    </main>
  );
}
