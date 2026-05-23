import SurveyForm from '@/components/SurveyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does Your Child Train? | Anytime Soccer Training',
  description: 'Take our free 2-minute survey and find out how your child\'s soccer training compares to other players their age. Get a personalized PDF report.',
};

export default function SurveyPage() {
  return (
    <main>
      <section
        className="relative py-12 md:py-20"
        style={{
          backgroundImage: 'url(https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779541227299-xijein.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0f2642]/80" />

        <div className="relative max-w-[680px] mx-auto px-5">
          <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-6">
            Free Training Report
          </div>
          <h1 className="text-[clamp(28px,4vw,46px)] font-extrabold text-white leading-tight mb-6">
            How much does your child train —<br />
            <span className="text-[#DC373E]">and how does that compare to the best?</span>
          </h1>
          <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-5 mb-5 max-w-[560px]">
            <p className="text-white text-[17px] leading-relaxed mb-4">
              We studied <strong>how much players at top academies around the world train</strong> — MLS Next, ECNL, Manchester City Academy, and more — broken down by age group and training type.
            </p>
            <p className="text-white text-[17px] leading-relaxed mb-4">
              We combined that research with <strong>responses from our own members</strong> to build a real benchmark every soccer parent can use.
            </p>
            <p className="text-white text-[17px] leading-relaxed mb-4">
              Fill in your child&rsquo;s training hours below. We&rsquo;ll send you a <strong>free PDF showing exactly how they compare</strong> — broken down by every training category.
            </p>
            <p className="text-white/85 text-[15px] leading-relaxed">
              The more parents who respond, the more accurate the comparison becomes — <strong>so share it with your team.</strong>
            </p>
          </div>
          <p className="text-white/50 text-[12px] max-w-[560px]">All submissions are anonymous.</p>
        </div>
      </section>
      <SurveyForm />
    </main>
  );
}
