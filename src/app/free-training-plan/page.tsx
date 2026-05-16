import type { Metadata } from 'next';
import TrainingPlanBuilder from '@/components/TrainingPlanBuilder';
import TabbedVideoSection from '@/components/TabbedVideoSection';

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

      {/* Social proof */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-3xl font-black text-navy mb-2">50,000+ players. 80+ countries.</div>
          <p className="text-gray-500 text-base">The same video library powering this plan builder is used by youth players, club teams, and coaches around the world.</p>
          <div className="mt-8 grid sm:grid-cols-3 gap-6 text-center">
            {[
              { stat: '5,000+', label: 'Follow-along videos' },
              { stat: '4–18', label: 'Ages supported' },
              { stat: 'Free', label: 'To get started' },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-red">{stat}</div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
