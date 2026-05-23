import SurveyForm from '@/components/SurveyForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Much Does Your Child Train? | Anytime Soccer Training',
  description: 'Take our free 2-minute survey and find out how your child\'s soccer training compares to other players their age. Get a personalized PDF report.',
};

export default function SurveyPage() {
  return (
    <main>
      <section className="bg-[#0f2642] py-10 md:py-16">
        <div className="max-w-[1100px] mx-auto px-5">

          {/* Top: pill + headline centered */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center bg-[#DC373E] text-white text-[11px] font-bold tracking-widest uppercase rounded px-3 py-1 mb-5">
              Free Training Report
            </div>
            <h1 className="text-[clamp(28px,4vw,52px)] font-extrabold text-white leading-tight">
              How does your child&rsquo;s training compare<br />
              <span className="text-[#DC373E]">to the world&rsquo;s elite?</span>
            </h1>
          </div>

          {/* Bottom: copy left, image right */}
          <div className="flex flex-col md:flex-row items-start gap-10">
            <div className="flex-1 min-w-0">
              <div className="bg-white/10 border border-white/20 rounded-xl px-5 py-5 mb-5">
                <p className="text-white text-[16px] leading-relaxed mb-4">
                  We studied <strong>how much players at top academies around the world train</strong> — MLS Next, ECNL, Manchester City Academy, and more — broken down by age group and training type.
                </p>
                <p className="text-white text-[16px] leading-relaxed mb-4">
                  We combined that research with <strong>responses from our own members</strong> to build a real benchmark every soccer parent can use.
                </p>
                <p className="text-white text-[16px] leading-relaxed mb-4">
                  Fill in your child&rsquo;s training hours below. We&rsquo;ll send you a <strong>free PDF showing exactly how they compare</strong> — broken down by every training category.
                </p>
                <p className="text-white/80 text-[14px] leading-relaxed">
                  The more parents who respond, the more accurate the comparison becomes — <strong>so share it with your team.</strong>
                </p>
              </div>
              <p className="text-white/40 text-[12px]">All submissions are anonymous.</p>
            </div>

            <div className="w-full md:w-[520px] flex-shrink-0 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1779541227299-xijein.png"
                alt="Youth academy players training"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>
      <SurveyForm />
    </main>
  );
}
