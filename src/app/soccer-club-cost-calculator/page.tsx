import ClubBudgetCalculator from '@/components/ClubBudgetCalculator';
import HeroPdfCta from '@/components/HeroPdfCta';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Cost of Running a Soccer Club | Anytime Soccer Training',
  description: "See exactly what it costs to run a youth soccer club — coaching, facilities, insurance, and more. Enter the numbers and find out what you're really paying for.",
};

export default function BudgetCalculatorPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-[#0f2642] py-8 md:py-12">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-6">
            Interactive Calculator
          </div>
          <div>

          <h1 className="text-[clamp(28px,4vw,42px)] font-extrabold text-white leading-tight mb-5">
            Do you know the real cost<br />
            <span className="text-[#DC373E]">of running a soccer club?</span>
          </h1>

          <p className="text-white/75 text-[16px] leading-relaxed mb-6 max-w-[560px]">
            Thinking about starting a club? Already running one? Or just tired of hearing parents complain about fees? Plug in your numbers and see exactly what it actually costs — coaching, field time, insurance, admin — all of it.
          </p>

          <HeroPdfCta />

          </div>
        </div>
      </section>

      {/* Calculator */}
      <ClubBudgetCalculator />
    </main>
  );
}
