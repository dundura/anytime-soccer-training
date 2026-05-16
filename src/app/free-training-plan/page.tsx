import type { Metadata } from 'next';
import TrainingPlanBuilder from '@/components/TrainingPlanBuilder';
import TabbedVideoSection from '@/components/TabbedVideoSection';
import CoachHeadline from '@/components/CoachHeadline';
import { AutoplayYouTube } from '@/components/AutoplayYouTube';

export const metadata: Metadata = {
  title: 'Free Soccer Training Plan — Anytime Soccer Training',
  description: 'Build a personalized soccer training plan for your player in 60 seconds. Choose skill areas, set your schedule, and get a free PDF emailed to you instantly.',
};

export default function FreeTrainingPlanPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-none animate-pulse">
            Stop Guessing.<br />
            <span className="text-red">Start Training.</span>
          </h1>
          <p className="text-white/70 text-2xl md:text-3xl font-semibold max-w-2xl mx-auto mb-8">
            A personalized plan for your player — free, in 60 seconds.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <TrainingPlanBuilder />
            </div>

            {/* Right: tabbed video section */}
            <div>
              <TabbedVideoSection
                title="Here's What Your Player Will Train"
                subtitle="Every session in your plan is a real follow-along video. Just press play."
                hideCta={true}
              />
            </div>

          </div>
        </div>
      </section>

      {/* For coaches CTA */}
      <section className="pt-6 pb-16 md:pt-8 md:pb-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl px-6 py-16 md:px-12 md:py-20 relative overflow-hidden">
            <div className="absolute -top-1/2 -right-1/5 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(220,55,62,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
                  <span>&#9889;</span> <span className="text-red">5,000+</span> Follow-Along Videos
                </div>
                <CoachHeadline />
                <p className="text-xl text-white/80 mb-8 max-w-[480px]">
                  Team training alone isn&apos;t enough. Players need structured practice at home—but most clubs struggle to assign homework and track if it&apos;s actually getting done.
                </p>
                <div className="flex flex-wrap gap-4 mb-10">
                  <a
                    href="https://anytime-soccer.com/team-demo-request-anytime-soccer-training/"
                    className="bg-red hover:bg-red-dark text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(220,55,62,0.35)] hover:shadow-[0_6px_25px_rgba(220,55,62,0.45)] inline-flex items-center gap-2"
                  >
                    Request Team Demo →
                  </a>
                </div>
                <div className="flex items-center gap-5 pt-6 border-t border-white/15 flex-wrap">
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
    </main>
  );
}
