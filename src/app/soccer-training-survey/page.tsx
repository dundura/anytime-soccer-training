import SurveyForm from '@/components/SurveyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does Your Child Train? | Anytime Soccer Training',
  description: 'Take our free 2-minute survey and find out how your child\'s soccer training compares to other players their age. Get a personalized PDF report.',
};

export default function SurveyPage() {
  return (
    <main>
      <section className="bg-[#0f2642] py-8 md:py-12">
        <div className="max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-6">
            Free Training Report
          </div>
          <h1 className="text-[clamp(26px,4vw,42px)] font-extrabold text-white leading-tight mb-5">
            &ldquo;How much should my child<br />
            <span className="text-[#DC373E]">be training in soccer?&rdquo;</span>
          </h1>
          <p className="text-white/75 text-[16px] leading-relaxed mb-4 max-w-[560px]">
            It&rsquo;s one of the most common questions we get from parents — and honestly, there&rsquo;s no single right answer. So we decided to collect the data.
          </p>
          <p className="text-white/75 text-[16px] leading-relaxed max-w-[560px]">
            Fill in your child&rsquo;s training hours below. We&rsquo;ll send you a free PDF showing exactly how they compare to other players their age — broken down by training type.
          </p>
        </div>
      </section>
      <SurveyForm />
    </main>
  );
}
