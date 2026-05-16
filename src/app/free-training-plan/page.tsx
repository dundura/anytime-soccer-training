import type { Metadata } from 'next';
import TrainingPlanBuilder from '@/components/TrainingPlanBuilder';

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
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white">
            <span>🆓</span> Free — no account required
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            Build Your Player&apos;s<br />
            <span className="text-red">Free Training Plan</span>
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
            Pick the skill areas you want to develop, set the schedule, and we&apos;ll email you a personalized PDF plan — built from the same video library used by 50,000+ players worldwide.
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

            {/* Right: what's in the PDF */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-navy mb-2">What&apos;s in the PDF?</h2>
                <p className="text-gray-500 text-sm">A professional training plan document your player can print or follow on their phone.</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: '📋', title: 'Cover page', desc: 'Player name, plan duration, sessions, and skill areas at a glance.' },
                  { icon: '📅', title: 'Full week-by-week schedule', desc: 'Every training day mapped out with specific sessions for each skill area.' },
                  { icon: '💡', title: 'How-to guide', desc: '7 tips for getting the most out of the plan, plus what equipment is needed.' },
                  { icon: '🎯', title: 'Goals page', desc: 'Space to write short-term goals, long-term goals, and a commitment section.' },
                  { icon: '🏆', title: 'Completion section', desc: 'A place to reflect at the end — what changed, what to work on next.' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center text-lg flex-shrink-0">
                      {icon}
                    </div>
                    <div>
                      <div className="font-bold text-navy text-sm">{title}</div>
                      <div className="text-gray-500 text-sm mt-0.5">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* App pitch */}
              <div className="bg-navy rounded-2xl p-6 text-white">
                <div className="text-sm font-bold text-red mb-2 tracking-wider uppercase">Follow the plan inside the app</div>
                <p className="text-white/80 text-sm leading-relaxed mb-4">
                  Every session in your plan is a real follow-along video inside Anytime Soccer Training. Press play, train, and the app tracks your progress automatically.
                </p>
                <a
                  href="https://app.anytime-soccer.com/auth/register"
                  className="inline-flex items-center gap-2 bg-red text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-red-dark transition-colors"
                >
                  Start Free Account →
                </a>
              </div>
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
