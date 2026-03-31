import type { Metadata } from 'next';
import TabbedVideoSection from '@/components/TabbedVideoSection';

export const metadata: Metadata = {
  title: 'Fusion Soccer — Partner Discount on Anytime Soccer Training',
  description: 'Fusion Soccer players and families get a special partner discount on Anytime Soccer Training. Train at home with 5,000+ follow-along video sessions.',
  openGraph: {
    title: 'Fusion Soccer — Partner Discount on Anytime Soccer Training',
    description: 'Fusion Soccer partnered with Anytime Soccer Training. Easy follow-along video sessions your player can do right at home.',
    images: [{ url: 'https://d2vm0l3c6tu9qp.cloudfront.net/soccer-directory/uploads/1774188137866-rgte84.webp', width: 1200, height: 630 }],
  },
};

export default function FusionDiscountPage() {
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
                  <span>&#9917;</span> Fusion Soccer Exclusive — <span className="font-extrabold">15% Off All Plans</span>
                </div>
                <h1 className="text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.1] text-white mb-6">
                  Train at Home.<br />
                  <span className="text-red">Get Better Every Day.</span>
                </h1>
                <p className="text-lg text-white mb-8">
                  Fusion Soccer partnered with <span className="text-white font-bold">Anytime Soccer Training</span> to give your players access to 5,000+ follow-along video sessions they can do right at home — just a ball and the drive to improve.
                </p>
                <a
                  href="https://www.anytime-soccer.com/pricing"
                  className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block no-underline"
                >
                  Get Started &rarr;
                </a>
              </div>
              <div className="relative">
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
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">Exclusive Fusion Soccer Discount</h2>
          <p className="text-gray text-lg mb-8">Fusion Soccer families get 15% off any plan — team or individual.</p>
          <div className="bg-red/[0.06] border-2 border-red/20 rounded-2xl p-8">
            <p className="text-navy font-extrabold text-xl mb-3">15% Off All Plans</p>
            <p className="text-red font-bold text-3xl mb-2">Use Code: FUSION2026</p>
            <p className="text-sm text-gray mb-4">Apply at checkout for 15% off monthly or annual plans.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">&#128101;</div>
                <h3 className="text-sm font-bold text-navy mb-1">Team Plans</h3>
                <p className="text-xs text-gray">Assign homework, track progress, run team training.</p>
              </div>
              <div className="bg-white rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">&#9917;</div>
                <h3 className="text-sm font-bold text-navy mb-1">Individual Plans</h3>
                <p className="text-xs text-gray">Unlimited videos, progress tracking, and badges.</p>
              </div>
            </div>
            <p className="text-xs text-red font-bold mt-4">Start with a free account — when you&apos;re ready to upgrade, enter FUSION2026 at checkout.</p>
          </div>
        </div>
      </section>

      {/* WHY PARENTS LOVE IT */}
      <section className="py-4 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-navy text-center mb-4">Why Players &amp; Coaches Love It</h2>
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
            Give your players the extra edge.
          </h2>
          <p className="text-gray text-lg mb-8">
            Join thousands of players already training with Anytime Soccer Training.
          </p>
          <a
            href="https://www.anytime-soccer.com/pricing"
            className="bg-red text-white font-bold text-lg py-4 px-10 rounded-full no-underline hover:bg-red-dark transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] inline-block"
          >
            Sign Up &amp; Use Code FUSION2026 &rarr;
          </a>
          <p className="text-sm text-gray mt-6">
            Questions? <a href="mailto:info@anytime-soccer.com" className="text-red font-semibold no-underline">info@anytime-soccer.com</a> &middot; <a href="tel:803-431-1082" className="text-red font-semibold no-underline">803-431-1082</a>
          </p>
        </div>
      </section>
    </>
  );
}
