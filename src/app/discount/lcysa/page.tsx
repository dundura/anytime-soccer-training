import type { Metadata } from 'next';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import LCYSAHeadline from './LCYSAHeadline';

export const metadata: Metadata = {
  title: 'LCYSA Members — Exclusive Discount on Anytime Soccer Training',
  description: 'Lower Columbia Youth Soccer Association members get an exclusive discount on Anytime Soccer Training. Help your player train at home with follow-along video sessions.',
};

export default function LCYSADiscountPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-[#059669] px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9917;</span> Exclusive for LCYSA Families — <span className="font-extrabold">Full Year Only $15</span>
                </div>
                <LCYSAHeadline />
                <p className="text-lg text-white mb-8">
                  LCYSA just partnered with <span className="text-white font-bold">Anytime Soccer Training</span>. Easy follow-along video sessions your player can do right at home — just a ball and the drive to improve.
                </p>
                <a
                  href="https://www.anytime-soccer.com/pricing"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
                >
                  Sign Up Now &rarr;
                </a>
              </div>
              <div className="relative">
                {/* Floating badge - above video */}
                <div className="hidden lg:flex mb-4 justify-end">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(220,55,62,0.1)] flex items-center justify-center text-xl">&#9917;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Build Confidence</strong>Master skills at your own pace</div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <iframe
                    src="https://www.youtube.com/embed/LOv6Jbk8Bac?autoplay=0&rel=0"
                    title="Anytime Soccer Training Overview"
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                {/* Floating badge - below video */}
                <div className="hidden lg:flex mt-4 justify-start">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center text-xl">&#128170;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Get More Touches</strong>Improve faster between practices</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOUNT OFFER */}
      <section className="py-4 px-5 bg-white">
        <div className="max-w-[600px] mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Exclusive LCYSA Pricing</h2>
          <p className="text-gray text-lg mb-8">Your club has arranged a special rate for LCYSA families.</p>
          <div className="bg-red/[0.06] border-2 border-red/20 rounded-2xl p-8">
            <div className="flex items-center justify-center gap-3 mb-3">
              <img
                src="https://static.wixstatic.com/media/179751_e13f4814cd5a4fbd90241a7459d7d51f~mv2.png/v1/fill/w_186,h_194,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/179751_e13f4814cd5a4fbd90241a7459d7d51f~mv2.png"
                alt="LCYSA"
                className="w-10 h-10 rounded-lg bg-white p-0.5 object-contain"
              />
              <p className="text-navy font-extrabold text-xl m-0">LCYSA Member Discount</p>
            </div>
            <p className="text-red font-bold text-3xl mb-2">$15 / year per player</p>
            <p className="text-sm text-gray mb-1">That&apos;s just over $1/month for unlimited training sessions.</p>
            <p className="text-sm text-gray">Use code <span className="font-bold text-navy bg-navy/10 px-2 py-1 rounded">LCYSA2026</span> at checkout.</p>
          </div>
        </div>
      </section>

      {/* WHY PARENTS LOVE IT */}
      <section className="py-4 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-4">Why Parents Love It</h2>
          <p className="text-gray text-center text-lg mb-12 max-w-2xl mx-auto">Your player gets better. You don&apos;t have to be the coach at home.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">&#127934;</div>
              <h3 className="text-lg font-bold text-navy mb-2">Follow-Along Sessions</h3>
              <p className="text-gray text-sm leading-relaxed">Your player hits play and follows along. Ball mastery, dribbling, passing, shooting — all broken down step by step.</p>
            </div>
            <div className="bg-background rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">&#128197;</div>
              <h3 className="text-lg font-bold text-navy mb-2">Train Anytime</h3>
              <p className="text-gray text-sm leading-relaxed">No schedule needed. Before practice, after school, on weekends — your player trains when it works for your family.</p>
            </div>
            <div className="bg-background rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">&#128200;</div>
              <h3 className="text-lg font-bold text-navy mb-2">Real Progress</h3>
              <p className="text-gray text-sm leading-relaxed">Track videos completed, time trained, and goals hit. You&apos;ll see the improvement on and off the field.</p>
            </div>
          </div>
        </div>
      </section>

      {/* A LOOK INSIDE THE PROGRAM */}
      <TabbedVideoSection title="A Look Inside the Program" subtitle="See what your player will be doing. Real sessions. Real results." hideCta />

      {/* CTA */}
      <section className="py-4 px-5 bg-background text-center">
        <div className="max-w-[600px] mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-navy mb-4">
            Give your player the extra edge.
          </h2>
          <p className="text-gray text-lg mb-8">
            Hundreds of LCYSA players are already training with Anytime Soccer. Sign up in under 2 minutes.
          </p>
          <a
            href="https://www.anytime-soccer.com/pricing"
            className="bg-red text-white font-bold text-lg py-4 px-10 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
          >
            Sign Up &amp; Use Code LCYSA2026 &rarr;
          </a>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:neil@anytime-soccer.com" className="text-red font-semibold no-underline">neil@anytime-soccer.com</a> &middot; <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
