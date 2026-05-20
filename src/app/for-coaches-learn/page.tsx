import type { Metadata } from 'next';
import ForCoachesLearnForm from '@/components/ForCoachesLearnForm';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';

export const metadata: Metadata = {
  title: 'Explore Anytime Soccer Training | For Coaches',
  description: 'Give your players a structured home training system. Assign homework, track progress, and keep players motivated — starting free.',
};

export default function ForCoachesLearnPage() {
  return (
    <>
      {/* HERO */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-center">

              {/* Left — copy + form */}
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9889;</span> <span className="text-red">5,000+</span> Follow-Along Videos
                </div>
                <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white leading-tight tracking-tight mb-5">
                  Your players want to improve.<br />
                  <span className="text-red">Give them a system that works.</span>
                </h1>
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  Team training alone isn&apos;t enough. Players need structured practice at home — but most clubs struggle to assign homework and track if it&apos;s actually getting done.
                </p>

                {/* Inline form */}
                <ForCoachesLearnForm />

                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap mt-6">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4].map((i) => (
                        <span key={i} className="inline-flex items-center justify-center w-6 h-6 bg-[#00b67a] text-white text-xs rounded-[3px]">&#9733;</span>
                      ))}
                      <span className="inline-flex items-center justify-center w-6 h-6 bg-gradient-to-r from-[#00b67a] from-50% to-[#dcdce6] to-50% text-white text-xs rounded-[3px]">&#9733;</span>
                    </div>
                    <span className="text-sm font-semibold text-white">4.9 (9,651)</span>
                  </div>
                  <div className="w-px h-8 bg-white/20 hidden sm:block" />
                  <div className="text-sm text-white/60">
                    <strong className="text-white block">Trusted by 50,000+ players</strong>
                    in 80+ countries worldwide
                  </div>
                </div>
              </div>

              {/* Right — video */}
              <div className="relative">
                <div className="hidden lg:flex mb-4 justify-end">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s', animationDelay: '1.5s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(15,49,84,0.1)] flex items-center justify-center text-xl">&#128202;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Assign Homework</strong>Coaches monitor training</div>
                  </div>
                </div>
                <AutoplayYouTube videoId="LOv6Jbk8Bac" title="Coach AST Review" />
                <div className="hidden lg:flex mt-4 justify-start">
                  <div className="flex bg-white rounded-xl px-5 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.25)] items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                    <div className="w-11 h-11 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center text-xl">&#10003;</div>
                    <div className="text-sm text-gray"><strong className="text-navy block">Track Progress</strong>See every completed session</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
