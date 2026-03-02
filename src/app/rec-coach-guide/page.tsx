import type { Metadata } from 'next';
import RecCoachForm from '@/components/RecCoachForm';

export const metadata: Metadata = {
  title: 'Become a Rec Coach Superhero | Anytime Soccer Training',
  description: 'The only guide you need to run amazing practices — even if you\'ve never coached before. Over 2,000 training videos and 100 soccer games, all 100% follow-along.',
};

export default function RecCoachGuidePage() {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left - Image + Reviews */}
          <div className="flex flex-col gap-6">
            <img
              src="https://img.mailinblue.com/4496497/images/rnb/original/64922e3903607967bf180043.png"
              alt="Become a Rec Coach Superhero"
              className="w-full rounded-2xl shadow-[0_24px_48px_rgba(15,49,84,0.15)]"
            />

            {/* Reviews */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <div className="text-amber-400 text-lg tracking-wider mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                  &ldquo;I volunteered to coach with zero experience. This guide gave me everything I needed to run great practices and actually help the kids improve.&rdquo;
                </p>
                <span className="text-[13px] text-[#6b7280] font-medium">&mdash; Mike D., Rec Coach</span>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-[0_4px_12px_rgba(15,49,84,0.06)]">
                <div className="text-amber-400 text-lg tracking-wider mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-[15px] text-navy leading-relaxed italic mb-2">
                  &ldquo;The kids love practice now and parents keep thanking me. I went from clueless to confident in one week.&rdquo;
                </p>
                <span className="text-[13px] text-[#6b7280] font-medium">&mdash; Jessica W., Volunteer Coach</span>
              </div>
            </div>
          </div>

          {/* Right - Content + Form */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[0_8px_24px_rgba(15,49,84,0.08)]">
            <h1 className="text-[clamp(24px,3vw,32px)] font-extrabold text-navy leading-tight mb-2">
              Become a Rec Coach <span className="text-red">Superhero</span>
            </h1>
            <p className="text-[#6b7280] text-base mb-6 leading-relaxed">
              The only guide you need to run amazing practices — even if you&apos;ve never coached before. Over 2,000 training videos and 100 soccer games, all 100% follow-along.
            </p>

            <ul className="list-none p-0 m-0 mb-6 space-y-2">
              {[
                'Ready-to-use practice plans',
                'Fun drills kids actually enjoy',
                'No soccer experience required',
                'Become the coach every kid loves',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[15px] text-navy font-bold">
                  <span className="text-red font-bold">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Brevo Form */}
            <RecCoachForm />

            <p className="text-center text-[13px] text-[#6b7280] mt-4">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
