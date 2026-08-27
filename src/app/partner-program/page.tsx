import type { Metadata } from 'next';
import PartnerApplyForm from '@/components/PartnerApplyForm';

export const metadata: Metadata = {
  title: 'Partner Program',
  description: 'Earn on every club and family you send to Anytime Soccer Training. $15 per membership, 20% of a team\'s first payment.',
};

const TERMS = [
  ['How you earn', 'You get a link. Anyone who joins Anytime Soccer Training through it is credited to you — and it does not expire. A coach who clicks today and signs their club up next season still counts as yours.'],
  ['What it pays', '$15 for every individual annual membership, and 20% of a team\'s first payment. Team payments are usually the larger of the two.'],
  ['When it clears', 'A commission is held for 30 days after the sale so refunds settle first. After that it is available to be paid.'],
  ['How you are paid', 'By PayPal, monthly, once your available balance is over $50. Below that it rolls into the next month rather than being lost.'],
  ['Refunds', 'If a customer refunds, the commission is reversed in proportion. A half refund takes back half.'],
  ['Approval', 'Applications are approved by hand. We will tell you either way.'],
];

export default function PartnerProgramPage() {
  return (
    <div className="bg-gradient-to-br from-[#0f2642] via-[#1a3a5c] to-[#0f2642] py-16 px-5" style={{ fontFamily: "'Source Sans Pro', sans-serif" }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-white text-[clamp(2.2rem,5vw,3rem)] tracking-[2px] mb-2.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            BECOME A <span className="text-[#c80b3d]">PARTNER</span>
          </h1>
          <p className="text-white/80 text-xl max-w-[560px] mx-auto">
            Earn on every family and club you send our way
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="py-2 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { n: '$15', l: 'per individual membership' },
                { n: '20%', l: "of a team's first payment" },
                { n: 'Never', l: 'expires — a click counts for good' },
                { n: 'Monthly', l: 'paid by PayPal' },
              ].map((s) => (
                <div key={s.l} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                  <div className="text-white text-3xl" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>{s.n}</div>
                  <div className="text-white/70 text-sm mt-1">{s.l}</div>
                </div>
              ))}
            </div>

            <h2 className="text-white text-2xl mb-4 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              THE <span className="text-[#c80b3d]">TERMS</span>
            </h2>
            <div className="space-y-4">
              {TERMS.map(([title, body]) => (
                <div key={title}>
                  <div className="text-white font-bold text-[15px]">{title}</div>
                  <p className="text-white/70 text-[15px] leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_25px_50px_rgba(0,0,0,0.3)] order-1 lg:order-2">
            <h2 className="text-[#0f2642] text-3xl text-center mb-2.5 tracking-[1px]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              APPLY TO JOIN
            </h2>
            <p className="text-center text-gray-500 mb-8">Takes a minute. We approve by hand.</p>
            <PartnerApplyForm />
          </div>
        </div>
      </div>
    </div>
  );
}
