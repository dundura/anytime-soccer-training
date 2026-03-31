import type { Metadata } from 'next';
import TabbedVideoSection from '@/components/TabbedVideoSection';

export const metadata: Metadata = {
  title: 'Fusion Soccer — Partner Discount on Anytime Soccer Training',
  description: 'Fusion Soccer players and families get a special partner discount on Anytime Soccer Training. Train at home with 5,000+ follow-along video sessions.',
  openGraph: {
    title: 'Fusion Soccer — Partner Discount on Anytime Soccer Training',
    description: 'Fusion Soccer partnered with Anytime Soccer Training. Easy follow-along video sessions your player can do right at home.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774959685241-1scke0.png', width: 1200, height: 630 }],
  },
};

export default function FusionDiscountPage() {
  return (
    <>
      {/* FREE TO JOIN BANNER */}
      <div className="bg-[#7ec8e3] text-[#1a2a3a] text-center py-2.5 px-4 text-sm font-semibold">
        Free to join &middot; 15% off annual upgrades with code <span className="font-extrabold">FUSION2026</span>
      </div>

      {/* HERO */}
      <section className="py-6 md:py-8 bg-[#f0f4f8]">
        <div className="max-w-[900px] mx-auto px-4">
          <div className="bg-[#1a2a3a] rounded-2xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.25)]">
            {/* Top bar */}
            <div className="bg-[#7ec8e3] px-7 py-2.5 text-xs font-bold tracking-widest uppercase text-[#1a2a3a] flex items-center gap-2">
              &#9917; Exclusive Member Offer — Fusion Training Academy &middot; <span className="font-extrabold">15% Off All Plans</span>
            </div>

            <div className="px-6 py-8 md:px-10 md:py-9">
              {/* Logos */}
              <div className="flex flex-wrap items-center gap-4 mb-7">
                <div className="bg-white/[0.08] border border-white/[0.12] rounded-lg px-3 py-2 flex items-center gap-2.5">
                  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774963705818-l5i0cc.png" alt="Fusion" className="w-7 h-7 rounded object-contain" />
                  <span className="text-[13px] font-bold text-white tracking-wide uppercase">Fusion Training Academy</span>
                </div>
                <span className="text-lg text-white/30 font-light">&times;</span>
                <div className="bg-white/[0.08] border border-white/[0.12] rounded-lg px-3 py-2 flex items-center gap-2.5">
                  <img src="https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774958366003-w9xngw.png" alt="AST" className="w-7 h-7 rounded object-contain" />
                  <span className="text-[13px] font-bold text-white tracking-wide uppercase">Anytime Soccer Training</span>
                </div>
              </div>

              {/* Headline */}
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#7ec8e3] mb-2.5">Exclusive Partnership Offer</p>
              <h1 className="text-[32px] md:text-[36px] font-extrabold text-white leading-[1.15] uppercase tracking-wide mb-3">
                Train Smarter.<br /><span className="text-[#7ec8e3]">Anytime.</span>
              </h1>
              <p className="text-[15px] text-white leading-relaxed mb-7 max-w-[520px]">
                Fusion Training Academy families get exclusive access to Anytime Soccer Training — 5,000+ follow-along videos designed to develop youth players at home, on their schedule.
              </p>

              <hr className="border-white/10 mb-6" />

              {/* Perks */}
              <div className="grid grid-cols-2 gap-2.5 mb-7">
                {[
                  '5,000+ training videos',
                  'Ball mastery, dribbling & more',
                  'Personalized training plans',
                  'Train anywhere, anytime',
                  'Built for all skill levels',
                  'Ages 6–18',
                ].map((perk) => (
                  <div key={perk} className="flex items-center gap-2.5 text-[13px] text-white/80">
                    <div className="w-2 h-2 rounded-full bg-[#7ec8e3] shrink-0" />
                    <span className="text-white">{perk}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-4">
                <a
                  href="https://www.anytime-soccer.com/pricing"
                  className="bg-[#7ec8e3] text-[#1a2a3a] text-sm font-extrabold uppercase tracking-wider px-7 py-3 rounded-lg no-underline hover:brightness-110 transition-all"
                >
                  Get Started Free
                </a>
                <span className="text-xs text-white/50">Free to join, 15% off annual upgrades.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOUNT OFFER */}
      <section className="py-2 px-5 bg-[#1a2a3a]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Exclusive Fusion Soccer Discount</h2>
          <p className="text-white/60 text-base mb-4">Fusion Soccer families get 15% off any plan — team or individual.</p>
          <div className="bg-white/[0.06] border-2 border-[#7ec8e3]/20 rounded-2xl p-8">
            <p className="text-[#7ec8e3] font-extrabold text-xl mb-3">15% Off All Plans</p>
            <p className="text-white font-bold text-3xl mb-2">Use Code: FUSION2026</p>
            <p className="text-sm text-white/60 mb-4">Apply at checkout for 15% off monthly or annual plans.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl overflow-hidden text-center">
                <img src="https://images.squarespace-cdn.com/content/v1/5e4a87984b1e7c77342e7371/1746821495147-NKBKSCPAM28BSNTF0Z4A/1098-DSC07129+%282%29.jpg?format=1000w" alt="Team Training" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-navy mb-1">Team Plans</h3>
                  <p className="text-xs text-gray mb-3">Assign homework, track progress, run team training.</p>
                  <a href="https://www.anytime-soccer.com/team-demo-request-anytime-soccer-training" className="inline-block bg-navy text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-navy/90 transition-colors">Book Free Demo</a>
                </div>
              </div>
              <div className="bg-white rounded-xl overflow-hidden text-center">
                <img src="https://d2vm0l3c6tu9qp.cloudfront.net/Anytime-soccer-camp.webp" alt="Individual Training" className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-bold text-navy mb-1">Individual Plans</h3>
                  <p className="text-xs text-gray mb-3">Unlimited videos, progress tracking, and badges.</p>
                  <a href="https://www.anytime-soccer.com/pricing" className="inline-block bg-red text-white text-xs font-bold px-5 py-2 rounded-lg no-underline hover:bg-red-dark transition-colors">Join for Free</a>
                </div>
              </div>
            </div>
            <p className="text-xs text-[#7ec8e3] font-bold mt-4">Start with a free account — when you&apos;re ready to upgrade, enter FUSION2026 at checkout.</p>
          </div>
        </div>
      </section>

      {/* A LOOK INSIDE THE PROGRAM */}
      <TabbedVideoSection title="A Look Inside the Program" subtitle="See what your player will be doing. Real sessions. Real results." hideCta />

      {/* CTA */}
      <section className="px-5 bg-background text-center">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-2">
            Give your players the extra edge.
          </h2>
          <p className="text-gray text-base mb-4">
            Join thousands of players already training with Anytime Soccer Training.
          </p>
          <a
            href="https://www.anytime-soccer.com/pricing"
            className="bg-red text-white font-bold text-lg py-4 px-10 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
          >
            Sign Up &amp; Use Code FUSION2026 &rarr;
          </a>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:megan@anytime-soccer.com" className="text-red font-semibold no-underline">megan@anytime-soccer.com</a> &middot; <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
